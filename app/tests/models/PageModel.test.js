import expect from 'expect';

import PageModel from 'app/models/PageModel';

describe('PageModel', () => {
    it('should construct water page', (done) => {
        var pageModel = new PageModel();
        
        pageModel.waterConstructor().then((results) => {
            expect(pageModel.water).toExist();
            done();
        });
    });
});
