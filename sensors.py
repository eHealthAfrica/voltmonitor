__author__ = 'ado'

import couchdb
from couchdb.mapping import Document, TextField
import config


class Sensor(Document):
    sensor_sn = TextField()
    logger_sn = TextField()
    location = TextField()
    gps = TextField()
    sensor_name = TextField()
    sensor_tag = TextField()


def sensors():
    return {
        "EHA1": {"sensor": "Scaled Series (S-FS-TRMSA 10509728:10469134-1), V, volts-active",
                 "sensor-sn": "10469134-1", "gps": "11.995840,8.549367", "location": "Kano", "logger-sn": "10509728"},
        "EHA2": {"sensor": "Scaled Series (S-FS-TRMSA 10509737:10469153-1), V, volts-active",
                 "sensor-sn": "10469153-1", "gps": "10.321056,9.830772", "location": "Bauchi", "logger-sn": "10509737"},
        "EHA3": {"sensor": "Scaled Series (S-FS-TRMSA 10509738:10469137-1), V, volts-active",
                 "sensor-sn": "10469137-1", "gps": "10.312661,9.845853", "location": "Bauchi-Bauchi",
                 "logger-sn": "10509738"},
        "EHA4": {"sensor": "Scaled Series (S-FS-TRMSA 10509735:10469150-1), V, volts-active",
                 "sensor-sn": "10469150-1", "gps": "10.402389,10.406942", "location": "Bauchi-Kirfi",
                 "logger-sn": "10509735"},
        "EHA5": {"sensor": "Scaled Series (S-FS-TRMSA 10509739:10469154-1), V, volts-active",
                 "sensor-sn": "10469154-1", "gps": "10.270664,10.338078", "location": "Bauchi-Alkaleri",
                 "logger-sn": "10509739"},
        "EHA6": {"sensor": "Scaled Series (S-FS-TRMSA 10509733:10469128-1), V, volts-active",
                 "sensor-sn": "10469128-1", "gps": "11.406611,10.016453", "location": "Bauchi-Shira",
                 "logger-sn": "10509733"},
        "EHA7": {"sensor": "Scaled Series (S-FS-TRMSA 10509732:10469152-1), V, volts-active",
                 "sensor-sn": "10469152-1", "gps": "11.674906,10.196256", "location": "Bauchi-Azare-Katagum",
                 "logger-sn": "10509732"},
        "EHA8": {"sensor": "Scaled Series (S-FS-TRMSA 10513773:10469146-1), V, volts-active",
                 "sensor-sn": "10469146-1", "gps": "11.003314,10.408611", "location": "Bauchi-Darazo",
                 "logger-sn": "10513773"},
        "EHA9": {"sensor": "Scaled Series (S-FS-TRMSA 10513774:10469132-1), V, volts-active",
                 "sensor-sn": "10469132-1", "gps": "11.091378,9.571906", "location": "Bauchi-Ningi",
                 "logger-sn": "10513774"},
        "EHA10": {"sensor": "Scaled Series (S-FS-TRMSA 10513770:10469148-1), V, volts-active",
                  "sensor-sn": "10469148-1", "gps": "12.000092,8.521945", "location": "Kano-Murtala_Mohammed",
                  "logger-sn": "10513770"},
        "EHA11": {"sensor": "Scaled Series (S-FS-TRMSA 10513776:10469156-1), V, volts-active",
                  "sensor-sn": "10469156-1", "gps": "11.983687,8.474622", "location": "Kano-Gwale_NPI",
                  "logger-sn": "10513776"},
        "EHA12": {"sensor": "Scaled Series (S-FS-TRMSA 10509729:10469127-1), V, volts-active",
                  "sensor-sn": "10469127-1", "gps": "12.737280,8.079860", "location": "Katsina-Ingawa_Yandoma",
                  "logger-sn": "10509729"},
        "EHA13": {"sensor": "Scaled Series (S-FS-TRMSA 10513777:10469130-1), V, volts-active",
                  "sensor-sn": "10469130-1", "gps": "11.988400,8.518390", "location": "Kano-Hasiya_Bayero",
                  "logger-sn": "10513777"},
        "EHA14": {"sensor": "Scaled Series (S-FS-TRMSA 10513768:10469135-1), V, volts-active",
                  "sensor-sn": "10469135-1", "gps": "11.989892,8.541760", "location": "Kano-Gwale_GH",
                  "logger-sn": "10513768"},
        "EHA15": {"sensor": "Scaled Series (S-FS-TRMSA 10509734:10469138-1), V, volts-active",
                  "sensor-sn": "10469138-1", "gps": "11.700956,8.128664", "location": "Kano-Kiru",
                  "logger-sn": "10509734"},
        "EHA16": {"sensor": "Scaled Series (S-FS-TRMSA 10513767:10469136-1), V, volts-active",
                  "sensor-sn": "10469136-1", "gps": "12.027480,8.550857", "location": "Kano-Nassarawa",
                  "logger-sn": "10513767"},
        "EHA19": {"sensor": "Scaled Series (S-FS-TRMSA 10513769:10469129-1), V, volts-active",
                  "sensor-sn": "10469129-1", "gps": "12.849653,7.708848", "location": "Katsina-Rimi",
                  "logger-sn": "10513769"},
        "EHA20": {"sensor": "Scaled Series (S-FS-TRMSA 10513775:10469133-1), V, volts-active",
                  "sensor-sn": "10469133-1", "gps": "12.637835,8.048998", "location": "Katsina-Ingawa",
                  "logger-sn": "10513775"},
        "EHA21": {"sensor": "Scaled Series (S-FS-TRMSA 10509736:10469131-1), V, volts-active",
                  "sensor-sn": "10469131-1", "gps": "12.910397,7.600802", "location": "Katsina-Batagarawa",
                  "logger-sn": "10509736"},
        "EHA22": {"sensor": "Scaled Series (S-FS-TRMSA 10513772:10469144-1), V, volts-active",
                  "sensor-sn": "10469144-1", "gps": "12.770540,7.262695", "location": "Katsina-Batsari",
                  "logger-sn": "10513772"},
        "EHA23": {"sensor": "Scaled Series (S-FS-TRMSA 10513766:10469147-1), V, volts-active",
                  "sensor-sn": "10469147-1", "gps": "12.988670,7.584780", "location": "Katsina",
                  "logger-sn": "10513766"},
        "EHA24": {"sensor": "Scaled Series (S-FS-TRMSA 10509730:10469155-1), V, volts-active",
                  "sensor-sn": "10469155-1", "gps": "13.094983,7.226023", "location": "Katsina-Jibia",
                  "logger-sn": "10509730"},
    }


def sensors_to_couch():
    # configure couchdb server and DBs
    db_server = couchdb.Server(config.db_url)
    db_server.resource.credentials = (config.db_user, config.db_pwd)
    db_sensors = db_server['db-sensors']

    # get processed=False documents from db
    sensor_map_fun = '''
        function(doc) {
            if(doc.sensor_sn) {
               emit(doc.sensor_sn);
            }
        }
    '''

    # load sensors from config
    for k, v in sensors().items():
        if db_sensors.query(sensor_map_fun, key=v['sensor-sn']):
            print("sensor %s found" % v['sensor-sn'])
        else:
            doc = Sensor(sensor_sn=v['sensor-sn'], logger_sn=v['logger-sn'], location=v['location'], gps=v['gps'],
                         sensor_name=v['sensor'], sensor_tag=k)
            doc.store(db_sensors)

    return True


def sensors_from_couch():
    # configure couchdb server and DBs
    db_server = couchdb.Server('http://localhost:5984/')
    db_server.resource.credentials = ('admin', 'admin')
    db_sensors = db_server['db-sensors']

    # TODO: load sensors from couch for use in daily processing

    return True

if __name__ == "__main__":
    sensors_to_couch()