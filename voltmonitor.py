__author__ = 'ado'

import csv
import json
import glob
import os
import datetime
import re
import couchdb
from couchdb.mapping import Document, TextField, DateTimeField, BooleanField, IntegerField
from uuid import uuid4
from sensors import sensors
import config


class Volts(Document):
    sensor_sn = TextField()
    logger_sn = IntegerField()
    location = TextField()
    gps = TextField()
    date = DateTimeField()
    volts = TextField()


class VoltLogFiles(Document):
    date = TextField()
    processed = BooleanField()


def get_logfile_date(filename):
    # match date elements from filename

    regex = re.compile("(?P<year>\d\d\d\d)_(?P<month>\d\d)_(?P<day>\d\d)")
    r = regex.search(filename)
    results = r.groupdict()

    logfile_date = datetime.date(int(results['year']), int(results['month']), int(results['day']))

    return logfile_date


def new_logfiles(log_dir, db):
    batch_csv_files = os.path.join(log_dir, '*.csv')
    log_files_not_in_db = []

    # get dates from ddoc/view
    date_map_fun ='''
        function(doc) {
            if(doc.date) {
               emit(doc.date);
            }
        }
    '''

    for csv_file in glob.glob(batch_csv_files):
        # get log date from filename
        logfile_date = get_logfile_date(csv_file)
        # search db for a VoltLogFiles document where date = logfile_date
        if db.query(date_map_fun, key=logfile_date.strftime("%Y-%m-%d")):
            print("log file %s found" % logfile_date.strftime("%Y-%m-%d"))
        else:
            log_files_not_in_db.append({"file": csv_file, "date": logfile_date.strftime("%Y-%m-%d")})

    return log_files_not_in_db


def create_logfile(log, db):
    doc = VoltLogFiles(date=log['date'], processed=False)
    doc.store(db)

    # open file object
    f = open(log['file'], 'r')
    try:
        db.put_attachment(doc, f)
    finally:
        f.close()

    print (doc)

    return True


def process_logfile_data(filename, doc, logdb, voltsdb):
    data_output_dir = config.log_file_download_path

    out_file_path = (os.path.join(data_output_dir, filename))
    out_file = open(out_file_path, 'wb')
    out_file.write(logdb.get_attachment(doc, filename).read())
    out_file.close()

    devices = sensors()

    with open(out_file_path, "r") as input_file:
        in_csv = csv.DictReader(input_file, delimiter=',')

        for line in in_csv:
            print(line)
            try:
                dt = datetime.datetime.strptime(line['Date'], "%m/%d/%y %H:%M:%S")

                for k, v in devices.items():
                    if v['sensor'] in line:
                        volts_doc = Volts(sensor_sn=v['sensor-sn'], gps=v['gps'], location=v['location'],
                                          logger_sn=v['logger-sn'], date=dt, volts=line[v['sensor']])
                        print(volts_doc)
                        volts_doc.store(voltsdb)
            except Exception as e:
                print(e)

    return True


def process_logfiles(db, volts_db):
    # get processed=False documents from db
    processed_map_fun ='''
        function(doc) {
            if(doc.processed !=  true) {
               emit(doc.processed);
            }
        }
    '''
    # search db for a VoltLogFiles document where date = logfile_date
    for row in db.query(processed_map_fun):
        log_doc = db.get(row.id)
        # print(log_doc.get('_attachments'))

        for attachment in log_doc.get('_attachments'):
            print("%s" % attachment)
            process_logfile_data(attachment, log_doc, db, volts_db)

        # mark doc processed=True
        volts_log_file = VoltLogFiles.load(db, log_doc.id)
        volts_log_file.processed = True
        volts_log_file.store(db)

    return True

if __name__ == "__main__":
    data_input_dir = config.log_file_path

    # configure couchdb server and DBs
    db_server = couchdb.Server(config.db_url)
    db_server.resource.credentials = (config.db_user, config.db_pwd)
    db_volts = db_server['volts']
    db_volts_logfiles = db_server['volts-logfiles']


    # Check data directory for new CSV files uploaded by hobolink
    new_log_files = new_logfiles(data_input_dir, db_volts_logfiles)
    # for each new log file, create Doc and put_attachment
    for logfile in new_log_files:
        create_logfile(logfile, db_volts_logfiles)

    # process log files in couchdb
    process_logfiles(db_volts_logfiles, db_volts)