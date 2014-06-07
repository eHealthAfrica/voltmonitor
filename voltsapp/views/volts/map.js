function(doc) {
    if(doc.logger_sn && doc.location && doc.volts && doc.date) {
        emit(doc.logger_sn, [doc.location,doc.volts,doc.date])
    }
}