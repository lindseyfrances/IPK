import { topoToGeojson } from './../api/helpers';
import * as actions from './../actions/index';

export default class PathOverlay {
    constructor(map, overlay, options ) {
        this.map = map;
        this.sourceName = overlay.id;
        this.dispatch = options.dispatch || null;
        this.hover = overlay.hover || false;
        this.paint = options.paint || function() {
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
        if (this.dispatch) {
            if (this.hover) {
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
                this.dispatch(actions.addLayer({
                    id: this.sourceName + '-hover',
                    visible: true
                }));
            }
            this.dispatch(actions.addLayer({
                id: this.sourceName + '-fill',
                visible: true 
            }));
            this.dispatch(actions.addLayer({
                id: this.sourceName + '-border',
                visible: true 
            }));
        }
    }

    //init hover events
    initMouseMove() {
        if (this.hover) {
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

    
}
