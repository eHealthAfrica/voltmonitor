library('scales')

source("helpers.R")
options(scipen=999999)

data <- read_outage_data("10509737")

outages <- construct_outage_data(data)

# Printing summary data to console
outage_share <- as.numeric(sum(outages$duration)) / as.numeric(difftime(max(data$ts),
                                                                        min(data$ts), 
                                                                        units="secs"))

max_out <- outages[outages$duration == max(outages$duration),]
z <- difftime(max_out$outage_end, max_out$outage_start)

cat(paste("Network was down",
            percent(outage_share),
            "of time\n\n"))

cat(paste("Longest outage happened between",
          max_out$outage_start,
          "and",
          max_out$outage_end,
          "and lasted",
          round(z, digits=2),
          units(z),
          "\n\n"))

cat("Number of outages by time, min:")
print(table(outages$bucket))

hist(outages$duration,
     main="Distribution of blackout time\nat Kano measurement post",
     xlab = "duration, sec")
