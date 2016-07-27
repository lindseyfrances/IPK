import expect from 'expect';
import * as reducers from 'app/reducers/reducers';

import df from 'deep-freeze-strict';

//var df = require('deep-freeze-strict');

describe('Reducers', () => {
    //describe('whereAmI Reducer', () => {
        //it('should change where I am', () => {
            //var state = {
                //layer: 'water',
                //page: 3
            //};
            //var action = {
                //type: 'SET_WHERE_I_AM',
                //loc: {
                    //layer: 'none',
                    //page: 1
                //}
            //};

            //var res = reducers.whereAmIReducer(state, action);
            //expect(res).toEqual(action.loc);
        //});
    //});

    describe('data reducer', () => {
        it('should add data', () => {
            var state = {initialKey: {aProp: 'aVal', anotherProp: 1}};
            var data = {someProp: 'someVal', otherProp: 3};
            var action = {
                type: 'ADD_DATA',
                key: 'someKey',
                data: data
            };

            var res = reducers.dataReducer(df(state), df(action));
            console.log(res[action.key]);        

            console.log(res.initialKey);
            expect(res[action.key]).toEqual(action.data);

            expect(res.initialKey.aProp).toBe('aVal');
        });
    });

    describe('layerReducer', () => {
        it('should add map layer', () => {
            var layers = {
                someLayer: {
                    key: 'someLayer',
                    visible: false
                },
                anotherLayer: {
                    key: 'anotherLayer',
                    visible: true
                }
            };
            var action = {
                type: 'ADD_MAP_LAYER',
                key: 'aThirdLayer',
                name: 'a third layer name'
            };

            var res = reducers.layerReducer(df(layers), df(action));
            
            expect(res.aThirdLayer).toExist();
            expect(res.someLayer.visible).toBe(false);
        });

        it('should update state on toggleLayer', () => {
            var layers = {
                someLayer: {
                    key: 'someLayer',
                    visible: false
                },
                anotherLayer: {
                    key: 'anotherLayer',
                    visible: true
                }
            };
            var action = {
                type: 'TOGGLE_MAP_LAYER',
                key: 'someLayer',
            };

            var res = reducers.layerReducer(df(layers), df(action));
            
            expect(res.someLayer.visible).toEqual(true);
        });

        it('should toggle layer off on toggle when layer is currently visible', () => {
            var layers = {
                someLayer: {
                    key: 'someLayer',
                    visible: true
                }
            };
            var action = {
                type: 'TOGGLE_MAP_LAYER',
                key: 'someLayer',
            };

            var res = reducers.layerReducer(df(layers), df(action));
            
            expect(res.someLayer.visible).toEqual(false);
        });
    });
    //describe('mapReducer', () => {
        //it('should change location', () => {
            //var action = {
                //type: 'CHANGE_MAP_POSITION',
                //position: {
                    //center: [-30, 25],
                    //zoom: 12
                //}
            //};
            //var res = reducers.mapReducer(null, action);
            
            //expect(res).toEqual(action.position);
        //});
    //});
});
