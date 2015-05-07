/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/* global describe, it, beforeEach */
'use strict';
import Immutable from 'immutable';
import { expect } from 'chai';
import { createMockActionContext } from 'fluxible/utils';
import MockService from 'fluxible-plugin-fetchr/utils/MockServiceManager';
import DocStore from '../../../stores/DocStore';
import routes from '../../../configs/routes.js';
import docResponse from '../../fixtures/doc-response.js';
import mockery from 'mockery';

let MockContext = createMockActionContext({
    stores: [DocStore]
});

describe('routes', function () {
    let context;

    beforeEach(function () {
        context = createMockActionContext({
            stores: [DocStore]
        });;
        context.service = new MockService();
        context.service.setService('docs', function (method, params, config, callback) {
            if (params.emulateError) {
                return callback(new Error('Things went sour.'));
            }

            callback(null, docResponse);
        });
        context.service.setService('api', function (method, params, config, callback) {
            if (params.emulateError) {
                return callback(new Error('Things went sour.'));
            }

            callback(null, docResponse);
        });
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });
    });

    afterEach(function () {
        mockery.disable();
        mockery.deregisterAll();
    });

    it('should execute the home action', function (done) {
        let params = Immutable.fromJS({
            githubPath: 'foo/bar.md'
        });

        context.executeAction(routes.home.action, params, function (err) {
            if (err) {
                return done(err);
            }

            let docs = context.getStore(DocStore).getAll();
            expect(docs).to.be.an('object');
            done();
        });
    });

    it('should execute the docs action (without type param)', function (done) {
        let params = Immutable.fromJS({
            githubPath: 'foo/bar.md'
        });

        context.executeAction(routes.quickStart.action, params, function (err) {
            if (err) {
                return done(err);
            }

            let docs = context.getStore(DocStore).getAll();
            expect(docs).to.be.an('object');
            done();
        });
    });
});
