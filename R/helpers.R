library("rjson")

read_outage_data <- function(key_id){
  json_file <- ""
  if(missing(key_id)){
    json_file = "http://voltmonitor.ehealth.org.ng/volts/_design/volts/_view/volts"
  } else {
    json_file <- paste("http://voltmonitor.ehealth.org.ng/volts/_design/volts/_view/volts?key=",
                       key_id,
                       sep="")    
  }
 
  # Reading data from json file
  data <- fromJSON(paste(readLines(json_file), collapse=""))
  data <- data$rows
  #Converting JSON structure to plain dataframe
  data <- unlist(data)
  data <- matrix(data, ncol=5,byrow=TRUE)
  data <- as.data.frame(data)
  names(data) <- c("id", "key", "name", "voltage", "timestamp")
  
  #Explicitly converting columns to necessary types
  data$voltage <- as.numeric(as.character(data$voltage))
  data$id <- as.character(data$id)
  data$timestamp <- as.character(data$timestamp)
  
  #Sorting dataframe by timestamp
  data$ts <- strptime(data$timestamp, "%Y-%m-%dT%H:%M:%S")
  data <- data[with(data, order(timestamp)), ]
  data
}

construct_outage_data <- function(data){
  outages <- data.frame(outage_start = NA, outage_end = NA,key=NA,name=NA, id_start = NA, id_end = NA) 
  vector <- rep(NA, 6)
  names(vector) <- colnames(outages)
  # dataset is counstructed using read_outage function
  for(i in 1:(nrow(data) - 1)) {
    if(data[i,4] < 10) {
      if(is.na(vector["outage_start"])) {
        vector["outage_start"] <- data[i,"timestamp"]
        vector["id_start"] <- data[i,"id"]
      }
      
      if(data[i+1,4] > 10) {
        vector["outage_end"] <- data[i,"timestamp"]
        vector["id_end"] <- data[i,"id"]
        vector["key"] <- as.character(data[i,"key"])
        vector["name"] <- as.character(data[i,"name"])
        outages <- rbind(outages, vector)
        vector <- rep(NA, 6)
        names(vector) <- colnames(outages)
      }
    }
  }
  
  # Tidying outages dataframe: removing first row + converting timestamp columns to posix type
  outages <- outages[-1,]
  outages$outage_start <- strptime(outages$outage_start, "%Y-%m-%dT%H:%M:%S")
  outages$outage_end <- strptime(outages$outage_end, "%Y-%m-%dT%H:%M:%S")
  outages$duration <- as.numeric(outages$outage_end - outages$outage_start ) #In SECONDS
  dur_breaks <- c(-1,10,30,60,120,240,Inf) * 60 # label by outage duration is in MINUTES 
  dur_labels <- c("<=10","(10,30]","(30,60]","(60,120]","(120,240]",">240")
  outages$bucket <- cut(outages$duration, dur_breaks,dig.lab=10, labels = dur_labels)
  outages
}

