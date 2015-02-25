/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');
var FluxibleMixin = require('fluxible').Mixin;

var Component = React.createClass({
    mixins: [ FluxibleMixin ],
    render: function () {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>{this.getStore(ApplicationStore).getPageTitle()}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css" />
                    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/grids-responsive-min.css" />
                    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" />
                    <link rel="stylesheet" href="/public/css/theme.css" />
                    <script dangerouslySetInnerHTML={{__html: this.props.tracking}}></script>
                </head>
                <body>
                    <section id="docsapp" dangerouslySetInnerHTML={{__html: this.props.markup}}></section>
                    <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                     <div className="footer l-box pure-g">
                        <div className="pure-u-1 pure-u-md-1-2">
                            All code on this site is licensed
                            under the <a href="https://github.com/yahoo/fluxible.io/blob/master/LICENSE.md">Yahoo BSD License</a>,
                            unless otherwise stated.
                        </div>
                        <div className="pure-u-1 pure-u-md-1-2 copyright">
                            &copy; 2015 Yahoo Inc. All rights reserved.
                        </div>
                     </div>
                    <script src={this.props.assets.common}></script>
                    <script src={this.props.assets.main}></script>
                </body>
            </html>
        );
    }
});

module.exports = Component;
