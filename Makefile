#
# Makefile
# jamiecharry, 2016-06-17 15:36
#

all:
	rm -rf app/data/build/*
	rm -rf dist/data/*

	make app/data/build/WATER_QUALITY_COMPLAINTS.json
	make app/data/build/NYC_RESERVOIR_LOCATIONS.json
	make app/data/build/WBDHU8.json

app/data/build/WATER_QUALITY_COMPLAINTS.json: app/data/src/Water_Quality_complaints_Scrubbed_2014_2016.csv
	mkdir -p $(dir $@)
	node_modules/.bin/topojson \
		-x longitude \
		-y latitude \
		-o $@\
		-p \
		-- $<
	cp app/data/build/WATER_QUALITY_COMPLAINTS.json dist/data/WATER_QUALITY_COMPLAINTS.json

app/data/build/NYC_RESERVOIR_LOCATIONS.json: app/data/src/nyc_reservoir_locations.csv
	mkdir -p $(dir $@)
	node_modules/.bin/topojson \
		-x longitude \
		-y latitude \
		-o $@\
		-p \
		-- $<
	cp app/data/build/NYC_RESERVOIR_LOCATIONS.json dist/data/NYC_RESERVOIR_LOCATIONS.json

app/data/build/WBDHU8.shp: app/data/src/WBDShape/WBDHU8.shp
	mkdir -p $(dir $@)
	ogr2ogr \
		-f 'ESRI Shapefile' \
		-t_srs EPSG:4326 \
		$@ \
		$<

app/data/build/WBDHU8.json: app/data/build/WBDHU8.shp
	mkdir -p $(dir $@)
	node_modules/.bin/topojson \
		-o $@ \
		--simplify-proportion=0.01\
		-p \
		-- $<
	cp $@ dist/data/WBDHU8.json

# vim:ft=make
#
