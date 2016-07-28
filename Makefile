#
# Makefile
# jamiecharry, 2016-06-17 15:36
#

all:
	rm -rf app/data/build/*
	rm -rf dist/data/*
	mkdir -p app/data/build
	make app/data/build/WATER_QUALITY_COMPLAINTS.json
	make app/data/build/NYC_RESERVOIR_LOCATIONS.json
	make app/data/build/WBDHU8.json
	make app/data/build/NYC_RESERVOIRS.json
	make app/data/build/GLYNWOOD.json

app/data/build/WATER_QUALITY_COMPLAINTS.json: app/data/src/WATER_QUALITY_COMPLAINTS.csv
	mkdir -p $(dir $@)
	node_modules/.bin/topojson \
		-x longitude \
		-y latitude \
		-o $@\
		-p \
		-- $<
	aws s3api put-object --bucket no-free-lunch-data --key "data/$(@F)" --body $@ --acl public-read --metadata name="311 Water Quality Complaints",layer=water

app/data/build/NYC_RESERVOIR_LOCATIONS.json: app/data/src/NYC_RESERVOIR_LOCATIONS.csv
	mkdir -p $(dir $@)
	node_modules/.bin/topojson \
		-x longitude \
		-y latitude \
		-o $@\
		-p \
		-- $<
	aws s3api put-object --bucket no-free-lunch-data --key "data/$(@F)" --body $@ --acl public-read --metadata name="NYC Reservoirs",layer=water

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
	aws s3api put-object --bucket no-free-lunch-data --key "data/$(@F)" --body $@ --acl public-read --metadata name="NYS Watershed Boundaries",layer=water

app/data/build/NYC_RESERVOIRS.shp: app/data/src/NYC_RESERVOIRS/NYC_RESERVOIRS.shp
	mkdir -p $(dir $@)
	ogr2ogr \
		-f 'ESRI Shapefile' \
		-s_srs EPSG:26918 \
		-t_srs EPSG:4326 \
		$@ \
		$<

app/data/build/NYC_RESERVOIRS.json: app/data/build/NYC_RESERVOIRS.shp
	mkdir -p $(dir $@)
	node_modules/.bin/topojson \
		-o $@ \
		-e app/data/src/NYC_RESERVOIR_LOCATIONS.csv \
		--id-property=NAME,name \
		-p popupContent=popupContent \
		-- $<
	aws s3api put-object --bucket no-free-lunch-data --key "data/$(@F)" --body $@ --acl public-read --metadata name="NYC RESERVOIRS",layer=water

app/data/build/GLYNWOOD.json: app/data/src/GLYNWOOD.csv
	mkdir -p $(dir $@)
	node_modules/.bin/csv2geojson \
		-lat latitude \
		-lon longitude \
		$< > $@
	aws s3api put-object --bucket no-free-lunch-data --key "data/$(@F)" --body $@ --acl public-read --metadata name=Glynwood,layer=agriculture

# vim:ft=make
#
