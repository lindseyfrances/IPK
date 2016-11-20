/* global describe it beforeEach */
import expect from 'expect';
import * as reducers from 'app/reducers/reducers';

import df from 'deep-freeze-strict';

describe('Reducers', () => {
    describe('projectsReducer', () => {
        let projects = {};

        beforeEach(() => {
            projects = { '581e9f369f13a2b8530f5d99': { _id: '581e9f369f13a2b8530f5d99', name: 'The Brooklyn Food Coalition', id: 'prj4', category: 'Community Activism', keywords: [], categoryDisplay: 'Community Activism', link: 'http://brooklynfoodcoalition.org/', pointType: 'point', locationType: 'HQ', latitude: 40.673388, longitude: -73.9701312, mappable: 'Y', address: '17 Eastern Parkway, 5th Floor, Brooklyn, NY 11238', description: 'The Brooklyn Food Coalition helps people with strategies, resources and practical solutions for building a healthy, resilient and sustainable life.', notes: '', shortDesc: 'The Brooklyn Food Coalition helps people with strategies, resources and practical solutions for building a healthy, resilient and sustainable life.', connections: ['581e9f369f13a2b8530f5d99', '581e9f369f13a2b8530f5d8d', '581e9f369f13a2b8530f5d90', '581e9f369f13a2b8530f5d8e', '581e9f369f13a2b8530f5d92'], locations: [''] } };
        });

        it('should update project properties', () => {
            const action = {
                type: 'UPDATE_PROJECT',
                id: '581e9f369f13a2b8530f5d99',
                updates: {
                    connections: ['1234', '5678'],
                    notes: 'a new note',
                    mappable: 'N'
                }
            };

            const res = reducers.projectsReducer(df(projects), df(action));
            expect(res[action.id].connections).toEqual(action.updates.connections);
            expect(res[action.id].notes).toEqual(action.updates.notes);
        });

        it('should initialize project list', () => {
            const prjsFromMongo = Object.keys(projects).map((id) => {
                return projects[id];
            });
            const action = {
                type: 'INITIALIZE_PROJECT_LIST',
                projects: prjsFromMongo
            };

            const res = reducers.projectsReducer(df({}), df(action));
            expect(res).toEqual(projects);
        });
    });
});
