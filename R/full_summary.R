library('scales')
library("ggplot2")
source("helpers.R")
options(scipen=999999)

critical_threshold <- 8 * 60 * 60
#data <- read_outage_data()
full_outage <- by(data, data$key, construct_outage_data)
full_outage <- do.call("rbind", full_outage)

# Writing summary of voltage measurements
cat("Quantiles of voltage size:\n")
print(quantile(data$voltage))

hist(data$voltage,
     main="Distribution of grid voltage",
     xlab="voltage")

p <- ggplot(data, aes(voltage)) + 
  geom_histogram(binwidth = 30) + 
  facet_wrap(~name, scales="free") +
  ggtitle("Distribution of grid voltage by measure post") +
  theme(axis.title.x = element_blank(),
        axis.title.y = element_blank())
print(p)

# Writing summary of full outage data to console
cat("\nTotal number of blackouts:",
    nrow(full_outage))
cat("\nMedian blackout time:",
    median(full_outage$duration)/60, 
    "minutes")
cat("\nBlackout distribution by time interval, minutes:\n")
print(table(full_outage$bucket))

cat(paste("\nNumber of outages > 8 hrs: ",
          sum(full_outage$duration >= critical_threshold)))
cat("\n")

cat(paste("It is ",
          percent(sum(full_outage$duration >= critical_threshold)/nrow(full_outage)),
          "of total number of times there was a blackout"))

critical_outages <- by(full_outage, 
                       full_outage$name, 
                       function(ds){sum(ds$duration >= critical_threshold)/nrow(ds)})

critical_outages <- rbind(critical_outages)

critical_outages <- data.frame(t(critical_outages))
critical_outages$name <- row.names(critical_outages)
colnames(critical_outages) <- c("share", "name")
critical_outages <- transform(critical_outages, 
          name = reorder(name, share))
p <- ggplot(critical_outages, 
            aes(y = share,
                x = name)) +
  geom_bar(stat="identity", binwidth = 30) +
  coord_flip() +
  scale_y_continuous(labels=percent) +
  ggtitle(expression(
    atop("Blackouts that lasted > 8h", 
         atop(italic("as % of total blackouts"), "")))) +
  theme(axis.title.x = element_blank(),
        axis.title.y = element_blank(),
        axis.text.x = element_text(color="black"),
        axis.text.y = element_text(color="black"),
        panel.grid.major.x = element_line(colour = 'gray'),
        panel.grid.minor = element_blank(),
        panel.background = element_rect(fill = "white"))

print(p)

q <- ggplot(full_outage, aes(duration)) + 
  geom_histogram(binwidth = 30) + 
  facet_wrap(~name, scales="free") +
  ggtitle("Distribution of blackout duration by measure post") +
  theme(axis.title.x = element_blank(),
        axis.title.y = element_blank())
print(q)

cat("\nCheck the graphs")

