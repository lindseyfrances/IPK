import { topoToGeojson } from './../api/helpers';

export default class PathOverlay {
    constructor(map, overlay, paint) {
        this.map = map;
        this.sourceName = overlay.id;
        this.paint = paint || function() {
            return {
                'fill-color': '#fabfab',
                'fill-opacity': 0.3
            };
        };

        this.data = topoToGeojson(overlay.data);
        this.addSource(this.sourceName, this.data);
        this.addLayer(this.sourceName);
        this.initMouseMove();
    }

    addSource(title, data) {
        this.map.addSource(title, {
            type: 'geojson',
            data: data
        });
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
        this.map.addLayer({
            id: title + '-hover',
            type: 'fill',
            source: title,
            paint: {
                'fill-color': '#abfabf',
                'fill-opacity': 0.3
            },
            filter: ['==', 'NAME', '']
        });
    }

    //init hover events
    initMouseMove() {
        this.map.on('mousemove', (e) => {
           var features = this.map.queryRenderedFeatures(e.point, {
               layers: [this.sourceName + '-fill']
           });

           if (features.length) {
               this.map.setFilter(this.sourceName + '-hover', ['==', 'NAME', features[0].properties.NAME]); 
           } else {
               this.map.setFilter(this.sourceName + '-hover', ['==', 'NAME', '']);
           }
        });
    }

    
}
