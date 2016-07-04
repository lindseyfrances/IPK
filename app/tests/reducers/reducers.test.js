import expect from 'expect';
import * as reducers from 'app/reducers/reducers';

import df from 'deep-freeze-strict';
//var df = require('deep-freeze-strict');

describe('Reducers', () => {
    describe('whereAmI Reducer', () => {
        it('should change where I am', () => {
            var state = {
                layer: 'water',
                page: 3
            };
            var action = {
                type: 'SET_WHERE_I_AM',
                loc: {
                    layer: 'none',
                    page: 1
                }
            };

            var res = reducers.whereAmIReducer(state, action);
            expect(res).toEqual(action.loc);
        });
    });

    describe('mapReducer', () => {
        it('should change location', () => {
            var action = {
                type: 'CHANGE_MAP_POSITION',
                position: {
                    center: [-30, 25],
                    zoom: 12
                }
            };
            var res = reducers.mapReducer(null, action);
            
            expect(res).toEqual(action.position);
        });
    });
});
