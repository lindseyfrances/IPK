import { topoToGeojson } from 'app/api/helpers';
import * as actions from 'app/actions/actions';
import d3 from 'd3';

export default class PathOverlay {
    constructor(map, source, layer, options = {}) {
        console.log(source);
        this.map = map;
        this.name = source.id;
        this.source = source;
        this.layer = layer;
        this.layers = [];
        this.isVisible = false;
        this.hover = options.hover || false;
        this.paint = options.paint || function() {
            return {
                'fill-color': '#fabfab',
                'fill-opacity': 0.3
            };
        };
        

        this.data = topoToGeojson(source.data);
        this.addSource(this.name, this.data);
        this.addLayer(this.name, this.data);
        //this.initMouseMove();
    }

    addSource(title, data) {
        this.map.addSource(title, {
            type: 'geojson',
            data: data
        });
    }

    removeSource() {
        this.map.removeSource(this.name);
    }

    fitBounds() {
        this.map.fitBounds(d3.geo.bounds(this.data));
    }
    addLayer(title) {
        this.map.addLayer({
            id: title + '-fill',
            type: 'fill',
            source: title,
            interactive: true,
            paint: this.paint()
        });
        this.map.addLayer({
            id: title + '-border',
            type: 'line',
            source: title,
            paint: {
                'line-color': '#abfabf',
                'line-width': 2
            }
        });
        this.layers = [title + '-fill', title + '-border'];
    }

    hideLayer() {
        var that = this;
        this.layers.forEach((layer) => {
            this.map.setLayoutProperty(layer, 'visibility', 'none');
        });
    }

    showLayer() {
        var that = this;
        this.layers.forEach((layer) => {
            this.map.setLayoutProperty(layer, 'visibility', 'visible');
        });
    }

    //init hover events
    initMouseMove() {
        if (this.hover) {
            this.map.on('mousemove', (e) => {
               var features = this.map.queryRenderedFeatures(e.point, {
                   layers: [this.name+ '-fill']
               });

               if (features.length) {
                   this.map.setFilter(this.name + '-hover', ['==', 'NAME', features[0].properties.NAME]); 
               } else {
                   this.map.setFilter(this.name + '-hover', ['==', 'NAME', '']);
               }
            });
        }
    }

    
}
