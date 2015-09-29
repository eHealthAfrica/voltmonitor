function(head, req) {
  start({
    headers: {
      'Content-Type' : 'text/csv; charset=utf-8'
    }
  })

  var row
  while (row = getRow()) {
    sendRow(row)
  }

  function sendRow(row) {
    var values = [row.key].concat(row.value)
    send(values.map(sanitizeValue).join(',') + '\n')
  }

  function sanitizeValue(value) {
    if (!value) return '""'

    return String(value)
      .replace(/\"/g,'""')
      .replace(/^|$/g,'"')
  }
}
