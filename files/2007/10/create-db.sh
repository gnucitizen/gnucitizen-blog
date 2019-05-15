#!/bin/bash
wget http://www.maxmind.com/download/geoip/database/GeoIPCountryCSV.zip
unzip GeoIPCountryCSV.zip
cat GeoIPCountryWhois.csv | sed -r -e 's/"//g' | awk -F ',' '{ print $5","$1","$2 }' | sort | uniq > __blocks
cat __blocks | cut -d ',' -f1 | sort | uniq > __countr
cat __countr | while read C
do
	grep $C __blocks | cut -d ',' -f2- > country-$C.csv
done
rm -rf GeoIPCountryCSV.zip
rm -rf GeoIPCountryWhois.csv
