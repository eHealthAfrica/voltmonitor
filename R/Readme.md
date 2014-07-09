Summary of outage data
========================================================

This is a directory with R scripts that pull outage data from [voltmonitor](http://voltmonitor.ehealth.org.ng), calculates summary figures and generates plots.

Prerequisites
--------------

* Machine is connected to the internet
* R language is installed http://www.r-project.org
* RStudio is installed http://www.rstudio.com/products/rstudio/download/
* Following libraries are installed via `install.packages` command: 
  * rjson
  * ggplot2
  * reshape
  
Getting started
-----------------
* Launch RStudio
* Create new project in RStudio from version control
* Select Git as version control, add `git@github.com:eHealthAfrica/voltmonitor.git` as repository URL
* Open either `full_summary.R` or `single_summary.R` and click _Source_ button on upper right corner.
  
Project structure
------------------
* `full_summary.R` -- downloads __all__ measument data from all posts, calculates summary figures and draws plots.
* `single_summary.R` -- downloads measurement data from one of measument posts. Currently measumenet post id is hardcoded to 10509737
* `helpers.R` -- file with functions extracted to a separate place.

Deliverables.
------------
__Single summary:__

* Time when voltage was less than 10 volts as % of time between earliest and latest measurement
* Start and end timestamp of longest outage, its length
* Breakdown of number of outages by time interval.

__Full summary__
* Distribution of voltages by voltage interval
* Total number of outages (voltage <= 10V)
* Median blackout time
* Distribution of blackout time by time interval
* Number of outages that lasted >8h, their share as % of total number of blackouts
* Barplot of share of blackouts that lasted > 8h by measurement post
* Barplot of share of voltage measurements by voltage interval and measurement post
