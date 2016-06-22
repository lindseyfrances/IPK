var expect = require('expect');
var reducers = require('./../../reducers/index');

var df = require('deep-freeze-strict');

describe('Reducers', () => {
    describe('layerReducer', () => {
        it('should properly remove layers when action is dispatched', () => {

            var layers = {
                'TEST_LAYER': true,
                'ANOTHER_LAYER': false
            };

            var action = {
                type: 'REMOVE_LAYER',
                id: 'TEST_LAYER'
            };

            var res = reducers.layerReducer(layers, action);

            expect(res['TEST_LAYER']).toEqual(undefined);
            expect(res['ANOTHER_LAYER']).toEqual(false);
        });

        it('should add layer', () => {
            var layers = {
                'TEST_LAYER': true
            };
            var action = {
                type: 'ADD_LAYER',
                layer: {
                    id: 'LAYER_TO_ADD',
                    visible: true
                }
            };

            var res = reducers.layerReducer(df(layers), df(action));

            expect(res['TEST_LAYER']).toEqual(true);
            expect(res['LAYER_TO_ADD']).toEqual(true);
        });
    });

});
