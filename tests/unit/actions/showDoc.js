/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/* global describe, it, beforeEach */
'use strict';
import {expect} from 'chai';
import MockContextLib from 'fluxible/utils/MockActionContext';
import MockService from 'fluxible-plugin-fetchr/utils/MockServiceManager';
import DocStore from '../../../stores/DocStore';
import showDoc from '../../../actions/showDoc';
import docResponse from '../../fixtures/doc-response.js';

let MockContext = MockContextLib();
MockContext.Dispatcher.registerStore(DocStore);

describe('controller actions', function () {
    let context;

    beforeEach(function () {
        context = new MockContext();
        context.service = new MockService();
        context.service.setService('docs', function (method, params, config, callback) {
            if (params.emulateError) {
                return callback(new Error('Things went sour.'));
            }

            callback(null, docResponse);
        });
    });

    it('should load data from the service', function (done) {
        let params = {
            config: {
                githubPath: '/docs/quick-start.md'
            }
        };

        context.executeAction(showDoc, params, function (err) {
            if (err) {
                return done(err);
            }

            let docs = context.getStore(DocStore).getAll();
            expect(docs).to.be.an('object');

            done();
        });
    });

    it('should load data from the cache', function (done) {
        let params = {
            config: {
                githubPath: '/docs/quick-start.md'
            }
        };

        context.executeAction(showDoc, params, function (err) {
            if (err) {
                return done(err);
            }

            let doc = context.getStore(DocStore).getCurrent();
            expect(doc).to.be.an('object');

            // execute again
            context.executeAction(showDoc, params, function (err) {
                if (err) {
                    return done(err);
                }

                done();
            });
        });
    });

    it('should handle a service error', function (done) {
        let params = {
            resource: 'docs',
            key: '/docs/slow-start.md',
            emulateError: true
        };

        context.executeAction(showDoc, params, function (err) {
            expect(err).to.be.an('object');
            done();
        });
    });
});

