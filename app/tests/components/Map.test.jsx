/* global describe it */

import React from 'react';
import expect from 'expect';
import df from 'deep-freeze-strict';

import Map from 'app/components/Map';

describe('Map', () => {
    it('should exist', () => {
        expect(Map).toExist();
    });
});
