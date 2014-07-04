library('scales')
library("ggplot2")
source("helpers.R")
options(scipen=999999)

critical_threshold <- 8 * 60 * 60
data <- read_outage_data()
full_outage <- by(data, data$key, construct_outage_data)
full_outage <- do.call("rbind", full_outage)

# Summary of voltage measurements throughout all posts
cat("Voltage distribution by intervals:\n")
summary <- table(data$bucket)/nrow(data)
summary <-as.data.frame(summary)
summary$Freq <- percent(summary$Freq)
colnames(summary) <- c('Interval', "Share")
print(summary, row.names=F)

#Plotting share of voltage summary buckets by measurement post
buckets_by_post <- by(data, data$name, function(x){table(x$bucket)/nrow(x)})
buckets_by_post <- do.call(rbind, buckets_by_post)
buckets_by_post <- as.data.frame(buckets_by_post)
buckets_by_post <- buckets_by_post[with(buckets_by_post, order(buckets_by_post[,"<=100V"])),]
buckets_by_post$name <- row.names(buckets_by_post)
order_vector <- buckets_by_post$name
row.names(buckets_by_post) <- NULL
buckets_by_post <- melt(buckets_by_post)

buckets_by_post$n_n <- factor(buckets_by_post$name, levels=order_vector)

q <- ggplot(buckets_by_post, aes(x=n_n, y=value, order=n_n)) +
  geom_bar(stat="identity",aes(fill=variable)) +
  coord_flip() +
  ggtitle(expression(
    atop("Share of voltage measurements", 
         atop(italic("by post and group"), "")))) +
  scale_y_continuous(labels=percent) +
  scale_fill_manual(values=c("#d73027","#fc8d59","#fee090","#e0f3f8","#91bfdb","#4575b4"),
                    name="Voltage group") +
  theme(axis.title.x = element_blank(),
        axis.title.y = element_blank(),
        axis.text.x = element_text(colour = 'black'),
        axis.text.y = element_text(colour = 'black'),
        panel.grid.major.x = element_line(colour = 'gray'),
        panel.grid.minor = element_blank(),
        panel.background = element_rect(fill = "white"))

print(q)

# Writing summary of full outage data to console
cat("\nTotal number of blackouts:",
    nrow(full_outage))
cat("\nMedian blackout time:",
    median(full_outage$duration)/60, 
    "minutes")
cat("\n\nBlackout distribution by time interval:\n")
summary <- table(full_outage$bucket)/nrow(data)
summary <-as.data.frame(summary)
summary$Freq <- percent(summary$Freq)
colnames(summary) <- c('Interval, minutes', "Share")
print(summary, row.names=F)

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

#Plotting outages > 8h by measurement post
p <- ggplot(critical_outages, 
            aes(y = share,
                x = name)) +
  geom_bar(stat="identity") +
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

cat("\nCheck the graphs")

