function(doc) {
    if(doc.logger_sn && doc.location && doc.volts && doc.date) {
        emit(doc.logger_sn, [doc.location,doc.volts,doc.date])
    }
}

function(doc) {
    if(doc.logger_sn && doc.volts && doc.date) {
        var date = new Date(doc.date);
        var year = date.getFullYear()
        var month = date.getMonth()
        var day = date.getDate()
        var hours = date.getHours()
        emit([doc.logger_sn,year,month,day,hours],parseFloat(doc.volts))
    }
}

function(keys, values, rereduce) {
    if (!rereduce){
        var length = values.length
        var max = Math.max.apply(null, values);
        var min = Math.min.apply(null, values);
        return [sum(values) / length, max, min]
    }else{
        var length = sum(values.map(function(v){return v[1]}))
        var avg = sum(values.map(function(v){
            return v[0] * (v[1] / length)
            }))
	var max = function(values) {
                           return Math.max.apply(null, values);
                  }
        var min = function(values) {
                           return Math.min.apply(null, values);
                  }
        return [avg, max, min]
    }
}

function(doc) {
    if(doc.logger_sn && doc.volts && doc.date) {
        var date = new Date(doc.date);
        var year = date.getFullYear()
        var month = date.getMonth()
        var day = date.getDate()
        var hours = date.getHours()
        emit([parseInt(doc.logger_sn),year,month,day,hours],parseFloat(doc.volts))
    }
}

function(keys, values, rereduce) {
    if (!rereduce){
        var length = values.length
        var max = Math.max.apply(null, values);
        var min = Math.min.apply(null, values);
        var dar = keys[0][0].slice(1,5);
        var date = new Date(dar[0],dar[1],dar[2],dar[3]);
        // return [sum(values) / length, max, min]
        return {date: date, avg: sum(values) / length, max: max, min: min}
    }else{
        var length = sum(values.map(function(v){return v[1]}))
        var avg = sum(values.map(function(v){
            return v[0] * (v[1] / length)
            }))
	var max = function(values) {
                           return Math.max.apply(null, values);
                  }
        var min = function(values) {
                           return Math.min.apply(null, values);
                  }
        return [avg, max, min]
    }
}