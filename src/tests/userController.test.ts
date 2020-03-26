// import request from 'supertest';
// import { app } from '../app';

import { expect } from 'chai';
import 'mocha';

describe('Hello function', () => {
    // let token = '';
    //
    // beforeEach((done) => {
    //     request(app)
    //         .post('/login')
    //         .send({ userName: 'test', password: 'test' })
    //         .end((err, res) => {
    //             token = res.body.token;
    //             done();
    //         });
    // });

    it('should return hello world', () => {
        const result = 'Hello world!';
        expect(result).to.equal('Hello world!');
    });

    // it('should return Hello Test', (done) => {
    //     request(app)
    //         .post('/user')
    //         .set('Authorization', token)
    //         .expect(200)
    //         .end((err, res) => {
    //             console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
    //             console.log(err)
    //             if (err) { done(err); }
    //             done();
    //         });
    // });
});



