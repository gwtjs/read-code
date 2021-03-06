/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOM
 */

/* globals __REACT_DEVTOOLS_GLOBAL_HOOK__*/

'use strict';

var ReactDOMComponentTree = require('ReactDOMComponentTree');
var ReactDefaultInjection = require('ReactDefaultInjection');
var ReactMount = require('ReactMount');
var ReactPerf = require('ReactPerf');
var ReactReconciler = require('ReactReconciler');
var ReactUpdates = require('ReactUpdates');
var ReactVersion = require('ReactVersion');

var findDOMNode = require('findDOMNode');
var getNativeComponentFromComposite = require('getNativeComponentFromComposite');
var renderSubtreeIntoContainer = require('renderSubtreeIntoContainer');
var warning = require('warning');

ReactDefaultInjection.inject();

var render = ReactPerf.measure('React', 'render', ReactMount.render);

var React = {
  findDOMNode: findDOMNode,
  render: render,
  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
  version: ReactVersion,

  /* eslint-disable camelcase */
  unstable_batchedUpdates: ReactUpdates.batchedUpdates,
  unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer,
  /* eslint-enable camelcase */
};
module.exports = React;
