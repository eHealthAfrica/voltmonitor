function(doc) {
  if(doc.logger_sn && doc.volts && doc.volts !== '0.0' && doc.date) {
    emit(doc.logger_sn, [doc.volts,doc.date])
  }
}
