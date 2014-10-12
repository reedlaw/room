/**
 * React v0.9.0
 */
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.React=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule AutoFocusMixin
 * @typechecks static-only
 */

"use strict";

var AutoFocusMixin = {
  componentDidMount: function() {
    if (this.props.autoFocus) {
      this.getDOMNode().focus();
    }
  }
};

module.exports = AutoFocusMixin;

},{}],2:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule CSSProperty
 */

"use strict";

/**
 * CSS properties which accept numbers but are not in units of "px".
 */
var isUnitlessNumber = {
  columnCount: true,
  fillOpacity: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true,
  zoom: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function(prop) {
  prefixes.forEach(function(prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */
var shorthandPropertyExpansions = {
  background: {
    backgroundImage: true,
    backgroundPosition: true,
    backgroundRepeat: true,
    backgroundColor: true
  },
  border: {
    borderWidth: true,
    borderStyle: true,
    borderColor: true
  },
  borderBottom: {
    borderBottomWidth: true,
    borderBottomStyle: true,
    borderBottomColor: true
  },
  borderLeft: {
    borderLeftWidth: true,
    borderLeftStyle: true,
    borderLeftColor: true
  },
  borderRight: {
    borderRightWidth: true,
    borderRightStyle: true,
    borderRightColor: true
  },
  borderTop: {
    borderTopWidth: true,
    borderTopStyle: true,
    borderTopColor: true
  },
  font: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    fontFamily: true
  }
};

var CSSProperty = {
  isUnitlessNumber: isUnitlessNumber,
  shorthandPropertyExpansions: shorthandPropertyExpansions
};

module.exports = CSSProperty;

},{}],3:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule CSSPropertyOperations
 * @typechecks static-only
 */

"use strict";

var CSSProperty = require("./CSSProperty");

var dangerousStyleValue = require("./dangerousStyleValue");
var escapeTextForBrowser = require("./escapeTextForBrowser");
var hyphenate = require("./hyphenate");
var memoizeStringOnly = require("./memoizeStringOnly");

var processStyleName = memoizeStringOnly(function(styleName) {
  return escapeTextForBrowser(hyphenate(styleName));
});

/**
 * Operations for dealing with CSS properties.
 */
var CSSPropertyOperations = {

  /**
   * Serializes a mapping of style properties for use as inline styles:
   *
   *   > createMarkupForStyles({width: '200px', height: 0})
   *   "width:200px;height:0;"
   *
   * Undefined values are ignored so that declarative programming is easier.
   *
   * @param {object} styles
   * @return {?string}
   */
  createMarkupForStyles: function(styles) {
    var serialized = '';
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var styleValue = styles[styleName];
      if (styleValue != null) {
        serialized += processStyleName(styleName) + ':';
        serialized += dangerousStyleValue(styleName, styleValue) + ';';
      }
    }
    return serialized || null;
  },

  /**
   * Sets the value for multiple styles on a node.  If a value is specified as
   * '' (empty string), the corresponding style property will be unset.
   *
   * @param {DOMElement} node
   * @param {object} styles
   */
  setValueForStyles: function(node, styles) {
    var style = node.style;
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var styleValue = dangerousStyleValue(styleName, styles[styleName]);
      if (styleValue) {
        style[styleName] = styleValue;
      } else {
        var expansion = CSSProperty.shorthandPropertyExpansions[styleName];
        if (expansion) {
          // Shorthand property that IE8 won't like unsetting, so unset each
          // component to placate it
          for (var individualStyleName in expansion) {
            style[individualStyleName] = '';
          }
        } else {
          style[styleName] = '';
        }
      }
    }
  }

};

module.exports = CSSPropertyOperations;

},{"./CSSProperty":2,"./dangerousStyleValue":94,"./escapeTextForBrowser":96,"./hyphenate":107,"./memoizeStringOnly":116}],4:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ChangeEventPlugin
 */

"use strict";

var EventConstants = require("./EventConstants");
var EventPluginHub = require("./EventPluginHub");
var EventPropagators = require("./EventPropagators");
var ExecutionEnvironment = require("./ExecutionEnvironment");
var ReactUpdates = require("./ReactUpdates");
var SyntheticEvent = require("./SyntheticEvent");

var isEventSupported = require("./isEventSupported");
var isTextInputElement = require("./isTextInputElement");
var keyOf = require("./keyOf");

var topLevelTypes = EventConstants.topLevelTypes;

var eventTypes = {
  change: {
    phasedRegistrationNames: {
      bubbled: keyOf({onChange: null}),
      captured: keyOf({onChangeCapture: null})
    },
    dependencies: [
      topLevelTypes.topBlur,
      topLevelTypes.topChange,
      topLevelTypes.topClick,
      topLevelTypes.topFocus,
      topLevelTypes.topInput,
      topLevelTypes.topKeyDown,
      topLevelTypes.topKeyUp,
      topLevelTypes.topSelectionChange
    ]
  }
};

/**
 * For IE shims
 */
var activeElement = null;
var activeElementID = null;
var activeElementValue = null;
var activeElementValueProp = null;

/**
 * SECTION: handle `change` event
 */
function shouldUseChangeEvent(elem) {
  return (
    elem.nodeName === 'SELECT' ||
    (elem.nodeName === 'INPUT' && elem.type === 'file')
  );
}

var doesChangeEventBubble = false;
if (ExecutionEnvironment.canUseDOM) {
  // See `handleChange` comment below
  doesChangeEventBubble = isEventSupported('change') && (
    !('documentMode' in document) || document.documentMode > 8
  );
}

function manualDispatchChangeEvent(nativeEvent) {
  var event = SyntheticEvent.getPooled(
    eventTypes.change,
    activeElementID,
    nativeEvent
  );
  EventPropagators.accumulateTwoPhaseDispatches(event);

  // If change and propertychange bubbled, we'd just bind to it like all the
  // other events and have it go through ReactEventTopLevelCallback. Since it
  // doesn't, we manually listen for the events and so we have to enqueue and
  // process the abstract event manually.
  //
  // Batching is necessary here in order to ensure that all event handlers run
  // before the next rerender (including event handlers attached to ancestor
  // elements instead of directly on the input). Without this, controlled
  // components don't work properly in conjunction with event bubbling because
  // the component is rerendered and the value reverted before all the event
  // handlers can run. See https://github.com/facebook/react/issues/708.
  ReactUpdates.batchedUpdates(runEventInBatch, event);
}

function runEventInBatch(event) {
  EventPluginHub.enqueueEvents(event);
  EventPluginHub.processEventQueue();
}

function startWatchingForChangeEventIE8(target, targetID) {
  activeElement = target;
  activeElementID = targetID;
  activeElement.attachEvent('onchange', manualDispatchChangeEvent);
}

function stopWatchingForChangeEventIE8() {
  if (!activeElement) {
    return;
  }
  activeElement.detachEvent('onchange', manualDispatchChangeEvent);
  activeElement = null;
  activeElementID = null;
}

function getTargetIDForChangeEvent(
    topLevelType,
    topLevelTarget,
    topLevelTargetID) {
  if (topLevelType === topLevelTypes.topChange) {
    return topLevelTargetID;
  }
}
function handleEventsForChangeEventIE8(
    topLevelType,
    topLevelTarget,
    topLevelTargetID) {
  if (topLevelType === topLevelTypes.topFocus) {
    // stopWatching() should be a noop here but we call it just in case we
    // missed a blur event somehow.
    stopWatchingForChangeEventIE8();
    startWatchingForChangeEventIE8(topLevelTarget, topLevelTargetID);
  } else if (topLevelType === topLevelTypes.topBlur) {
    stopWatchingForChangeEventIE8();
  }
}


/**
 * SECTION: handle `input` event
 */
var isInputEventSupported = false;
if (ExecutionEnvironment.canUseDOM) {
  // IE9 claims to support the input event but fails to trigger it when
  // deleting text, so we ignore its input events
  isInputEventSupported = isEventSupported('input') && (
    !('documentMode' in document) || document.documentMode > 9
  );
}

/**
 * (For old IE.) Replacement getter/setter for the `value` property that gets
 * set on the active element.
 */
var newValueProp =  {
  get: function() {
    return activeElementValueProp.get.call(this);
  },
  set: function(val) {
    // Cast to a string so we can do equality checks.
    activeElementValue = '' + val;
    activeElementValueProp.set.call(this, val);
  }
};

/**
 * (For old IE.) Starts tracking propertychange events on the passed-in element
 * and override the value property so that we can distinguish user events from
 * value changes in JS.
 */
function startWatchingForValueChange(target, targetID) {
  activeElement = target;
  activeElementID = targetID;
  activeElementValue = target.value;
  activeElementValueProp = Object.getOwnPropertyDescriptor(
    target.constructor.prototype,
    'value'
  );

  Object.defineProperty(activeElement, 'value', newValueProp);
  activeElement.attachEvent('onpropertychange', handlePropertyChange);
}

/**
 * (For old IE.) Removes the event listeners from the currently-tracked element,
 * if any exists.
 */
function stopWatchingForValueChange() {
  if (!activeElement) {
    return;
  }

  // delete restores the original property definition
  delete activeElement.value;
  activeElement.detachEvent('onpropertychange', handlePropertyChange);

  activeElement = null;
  activeElementID = null;
  activeElementValue = null;
  activeElementValueProp = null;
}

/**
 * (For old IE.) Handles a propertychange event, sending a `change` event if
 * the value of the active element has changed.
 */
function handlePropertyChange(nativeEvent) {
  if (nativeEvent.propertyName !== 'value') {
    return;
  }
  var value = nativeEvent.srcElement.value;
  if (value === activeElementValue) {
    return;
  }
  activeElementValue = value;

  manualDispatchChangeEvent(nativeEvent);
}

/**
 * If a `change` event should be fired, returns the target's ID.
 */
function getTargetIDForInputEvent(
    topLevelType,
    topLevelTarget,
    topLevelTargetID) {
  if (topLevelType === topLevelTypes.topInput) {
    // In modern browsers (i.e., not IE8 or IE9), the input event is exactly
    // what we want so fall through here and trigger an abstract event
    return topLevelTargetID;
  }
}

// For IE8 and IE9.
function handleEventsForInputEventIE(
    topLevelType,
    topLevelTarget,
    topLevelTargetID) {
  if (topLevelType === topLevelTypes.topFocus) {
    // In IE8, we can capture almost all .value changes by adding a
    // propertychange handler and looking for events with propertyName
    // equal to 'value'
    // In IE9, propertychange fires for most input events but is buggy and
    // doesn't fire when text is deleted, but conveniently, selectionchange
    // appears to fire in all of the remaining cases so we catch those and
    // forward the event if the value has changed
    // In either case, we don't want to call the event handler if the value
    // is changed from JS so we redefine a setter for `.value` that updates
    // our activeElementValue variable, allowing us to ignore those changes
    //
    // stopWatching() should be a noop here but we call it just in case we
    // missed a blur event somehow.
    stopWatchingForValueChange();
    startWatchingForValueChange(topLevelTarget, topLevelTargetID);
  } else if (topLevelType === topLevelTypes.topBlur) {
    stopWatchingForValueChange();
  }
}

// For IE8 and IE9.
function getTargetIDForInputEventIE(
    topLevelType,
    topLevelTarget,
    topLevelTargetID) {
  if (topLevelType === topLevelTypes.topSelectionChange ||
      topLevelType === topLevelTypes.topKeyUp ||
      topLevelType === topLevelTypes.topKeyDown) {
    // On the selectionchange event, the target is just document which isn't
    // helpful for us so just check activeElement instead.
    //
    // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
    // propertychange on the first input event after setting `value` from a
    // script and fires only keydown, keypress, keyup. Catching keyup usually
    // gets it and catching keydown lets us fire an event for the first
    // keystroke if user does a key repeat (it'll be a little delayed: right
    // before the second keystroke). Other input methods (e.g., paste) seem to
    // fire selectionchange normally.
    if (activeElement && activeElement.value !== activeElementValue) {
      activeElementValue = activeElement.value;
      return activeElementID;
    }
  }
}


/**
 * SECTION: handle `click` event
 */
function shouldUseClickEvent(elem) {
  // Use the `click` event to detect changes to checkbox and radio inputs.
  // This approach works across all browsers, whereas `change` does not fire
  // until `blur` in IE8.
  return (
    elem.nodeName === 'INPUT' &&
    (elem.type === 'checkbox' || elem.type === 'radio')
  );
}

function getTargetIDForClickEvent(
    topLevelType,
    topLevelTarget,
    topLevelTargetID) {
  if (topLevelType === topLevelTypes.topClick) {
    return topLevelTargetID;
  }
}

/**
 * This plugin creates an `onChange` event that normalizes change events
 * across form elements. This event fires at a time when it's possible to
 * change the element's value without seeing a flicker.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - select
 */
var ChangeEventPlugin = {

  eventTypes: eventTypes,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {

    var getTargetIDFunc, handleEventFunc;
    if (shouldUseChangeEvent(topLevelTarget)) {
      if (doesChangeEventBubble) {
        getTargetIDFunc = getTargetIDForChangeEvent;
      } else {
        handleEventFunc = handleEventsForChangeEventIE8;
      }
    } else if (isTextInputElement(topLevelTarget)) {
      if (isInputEventSupported) {
        getTargetIDFunc = getTargetIDForInputEvent;
      } else {
        getTargetIDFunc = getTargetIDForInputEventIE;
        handleEventFunc = handleEventsForInputEventIE;
      }
    } else if (shouldUseClickEvent(topLevelTarget)) {
      getTargetIDFunc = getTargetIDForClickEvent;
    }

    if (getTargetIDFunc) {
      var targetID = getTargetIDFunc(
        topLevelType,
        topLevelTarget,
        topLevelTargetID
      );
      if (targetID) {
        var event = SyntheticEvent.getPooled(
          eventTypes.change,
          targetID,
          nativeEvent
        );
        EventPropagators.accumulateTwoPhaseDispatches(event);
        return event;
      }
    }

    if (handleEventFunc) {
      handleEventFunc(
        topLevelType,
        topLevelTarget,
        topLevelTargetID
      );
    }
  }

};

module.exports = ChangeEventPlugin;

},{"./EventConstants":14,"./EventPluginHub":16,"./EventPropagators":19,"./ExecutionEnvironment":20,"./ReactUpdates":70,"./SyntheticEvent":77,"./isEventSupported":109,"./isTextInputElement":111,"./keyOf":115}],5:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ClientReactRootIndex
 * @typechecks
 */

"use strict";

var nextReactRootIndex = 0;

var ClientReactRootIndex = {
  createReactRootIndex: function() {
    return nextReactRootIndex++;
  }
};

module.exports = ClientReactRootIndex;

},{}],6:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule CompositionEventPlugin
 * @typechecks static-only
 */

"use strict";

var EventConstants = require("./EventConstants");
var EventPropagators = require("./EventPropagators");
var ExecutionEnvironment = require("./ExecutionEnvironment");
var ReactInputSelection = require("./ReactInputSelection");
var SyntheticCompositionEvent = require("./SyntheticCompositionEvent");

var getTextContentAccessor = require("./getTextContentAccessor");
var keyOf = require("./keyOf");

var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
var START_KEYCODE = 229;

var useCompositionEvent = (
  ExecutionEnvironment.canUseDOM &&
  'CompositionEvent' in window
);

// In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. In Korean, for example,
// the compositionend event contains only one character regardless of
// how many characters have been composed since compositionstart.
// We therefore use the fallback data while still using the native
// events as triggers.
var useFallbackData = (
  !useCompositionEvent ||
  'documentMode' in document && document.documentMode > 8
);

var topLevelTypes = EventConstants.topLevelTypes;
var currentComposition = null;

// Events and their corresponding property names.
var eventTypes = {
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf({onCompositionEnd: null}),
      captured: keyOf({onCompositionEndCapture: null})
    },
    dependencies: [
      topLevelTypes.topBlur,
      topLevelTypes.topCompositionEnd,
      topLevelTypes.topKeyDown,
      topLevelTypes.topKeyPress,
      topLevelTypes.topKeyUp,
      topLevelTypes.topMouseDown
    ]
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({onCompositionStart: null}),
      captured: keyOf({onCompositionStartCapture: null})
    },
    dependencies: [
      topLevelTypes.topBlur,
      topLevelTypes.topCompositionStart,
      topLevelTypes.topKeyDown,
      topLevelTypes.topKeyPress,
      topLevelTypes.topKeyUp,
      topLevelTypes.topMouseDown
    ]
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: keyOf({onCompositionUpdate: null}),
      captured: keyOf({onCompositionUpdateCapture: null})
    },
    dependencies: [
      topLevelTypes.topBlur,
      topLevelTypes.topCompositionUpdate,
      topLevelTypes.topKeyDown,
      topLevelTypes.topKeyPress,
      topLevelTypes.topKeyUp,
      topLevelTypes.topMouseDown
    ]
  }
};

/**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */
function getCompositionEventType(topLevelType) {
  switch (topLevelType) {
    case topLevelTypes.topCompositionStart:
      return eventTypes.compositionStart;
    case topLevelTypes.topCompositionEnd:
      return eventTypes.compositionEnd;
    case topLevelTypes.topCompositionUpdate:
      return eventTypes.compositionUpdate;
  }
}

/**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackStart(topLevelType, nativeEvent) {
  return (
    topLevelType === topLevelTypes.topKeyDown &&
    nativeEvent.keyCode === START_KEYCODE
  );
}

/**
 * Does our fallback mode think that this event is the end of composition?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case topLevelTypes.topKeyUp:
      // Command keys insert or clear IME input.
      return (END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1);
    case topLevelTypes.topKeyDown:
      // Expect IME keyCode on each keydown. If we get any other
      // code we must have exited earlier.
      return (nativeEvent.keyCode !== START_KEYCODE);
    case topLevelTypes.topKeyPress:
    case topLevelTypes.topMouseDown:
    case topLevelTypes.topBlur:
      // Events are not possible without cancelling IME.
      return true;
    default:
      return false;
  }
}

/**
 * Helper class stores information about selection and document state
 * so we can figure out what changed at a later date.
 *
 * @param {DOMEventTarget} root
 */
function FallbackCompositionState(root) {
  this.root = root;
  this.startSelection = ReactInputSelection.getSelection(root);
  this.startValue = this.getText();
}

/**
 * Get current text of input.
 *
 * @return {string}
 */
FallbackCompositionState.prototype.getText = function() {
  return this.root.value || this.root[getTextContentAccessor()];
};

/**
 * Text that has changed since the start of composition.
 *
 * @return {string}
 */
FallbackCompositionState.prototype.getData = function() {
  var endValue = this.getText();
  var prefixLength = this.startSelection.start;
  var suffixLength = this.startValue.length - this.startSelection.end;

  return endValue.substr(
    prefixLength,
    endValue.length - suffixLength - prefixLength
  );
};

/**
 * This plugin creates `onCompositionStart`, `onCompositionUpdate` and
 * `onCompositionEnd` events on inputs, textareas and contentEditable
 * nodes.
 */
var CompositionEventPlugin = {

  eventTypes: eventTypes,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {

    var eventType;
    var data;

    if (useCompositionEvent) {
      eventType = getCompositionEventType(topLevelType);
    } else if (!currentComposition) {
      if (isFallbackStart(topLevelType, nativeEvent)) {
        eventType = eventTypes.compositionStart;
      }
    } else if (isFallbackEnd(topLevelType, nativeEvent)) {
      eventType = eventTypes.compositionEnd;
    }

    if (useFallbackData) {
      // The current composition is stored statically and must not be
      // overwritten while composition continues.
      if (!currentComposition && eventType === eventTypes.compositionStart) {
        currentComposition = new FallbackCompositionState(topLevelTarget);
      } else if (eventType === eventTypes.compositionEnd) {
        if (currentComposition) {
          data = currentComposition.getData();
          currentComposition = null;
        }
      }
    }

    if (eventType) {
      var event = SyntheticCompositionEvent.getPooled(
        eventType,
        topLevelTargetID,
        nativeEvent
      );
      if (data) {
        // Inject data generated from fallback path into the synthetic event.
        // This matches the property of native CompositionEventInterface.
        event.data = data;
      }
      EventPropagators.accumulateTwoPhaseDispatches(event);
      return event;
    }
  }
};

module.exports = CompositionEventPlugin;

},{"./EventConstants":14,"./EventPropagators":19,"./ExecutionEnvironment":20,"./ReactInputSelection":52,"./SyntheticCompositionEvent":75,"./getTextContentAccessor":105,"./keyOf":115}],7:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule DOMChildrenOperations
 * @typechecks static-only
 */

"use strict";

var Danger = require("./Danger");
var ReactMultiChildUpdateTypes = require("./ReactMultiChildUpdateTypes");

var getTextContentAccessor = require("./getTextContentAccessor");

/**
 * The DOM property to use when setting text content.
 *
 * @type {string}
 * @private
 */
var textContentAccessor = getTextContentAccessor();

/**
 * Inserts `childNode` as a child of `parentNode` at the `index`.
 *
 * @param {DOMElement} parentNode Parent node in which to insert.
 * @param {DOMElement} childNode Child node to insert.
 * @param {number} index Index at which to insert the child.
 * @internal
 */
function insertChildAt(parentNode, childNode, index) {
  var childNodes = parentNode.childNodes;
  if (childNodes[index] === childNode) {
    return;
  }
  // If `childNode` is already a child of `parentNode`, remove it so that
  // computing `childNodes[index]` takes into account the removal.
  if (childNode.parentNode === parentNode) {
    parentNode.removeChild(childNode);
  }
  if (index >= childNodes.length) {
    parentNode.appendChild(childNode);
  } else {
    parentNode.insertBefore(childNode, childNodes[index]);
  }
}

/**
 * Sets the text content of `node` to `text`.
 *
 * @param {DOMElement} node Node to change
 * @param {string} text New text content
 */
var updateTextContent;
if (textContentAccessor === 'textContent') {
  updateTextContent = function(node, text) {
    node.textContent = text;
  };
} else {
  updateTextContent = function(node, text) {
    // In order to preserve newlines correctly, we can't use .innerText to set
    // the contents (see #1080), so we empty the element then append a text node
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
    if (text) {
      var doc = node.ownerDocument || document;
      node.appendChild(doc.createTextNode(text));
    }
  };
}

/**
 * Operations for updating with DOM children.
 */
var DOMChildrenOperations = {

  dangerouslyReplaceNodeWithMarkup: Danger.dangerouslyReplaceNodeWithMarkup,

  updateTextContent: updateTextContent,

  /**
   * Updates a component's children by processing a series of updates. The
   * update configurations are each expected to have a `parentNode` property.
   *
   * @param {array<object>} updates List of update configurations.
   * @param {array<string>} markupList List of markup strings.
   * @internal
   */
  processUpdates: function(updates, markupList) {
    var update;
    // Mapping from parent IDs to initial child orderings.
    var initialChildren = null;
    // List of children that will be moved or removed.
    var updatedChildren = null;

    for (var i = 0; update = updates[i]; i++) {
      if (update.type === ReactMultiChildUpdateTypes.MOVE_EXISTING ||
          update.type === ReactMultiChildUpdateTypes.REMOVE_NODE) {
        var updatedIndex = update.fromIndex;
        var updatedChild = update.parentNode.childNodes[updatedIndex];
        var parentID = update.parentID;

        initialChildren = initialChildren || {};
        initialChildren[parentID] = initialChildren[parentID] || [];
        initialChildren[parentID][updatedIndex] = updatedChild;

        updatedChildren = updatedChildren || [];
        updatedChildren.push(updatedChild);
      }
    }

    var renderedMarkup = Danger.dangerouslyRenderMarkup(markupList);

    // Remove updated children first so that `toIndex` is consistent.
    if (updatedChildren) {
      for (var j = 0; j < updatedChildren.length; j++) {
        updatedChildren[j].parentNode.removeChild(updatedChildren[j]);
      }
    }

    for (var k = 0; update = updates[k]; k++) {
      switch (update.type) {
        case ReactMultiChildUpdateTypes.INSERT_MARKUP:
          insertChildAt(
            update.parentNode,
            renderedMarkup[update.markupIndex],
            update.toIndex
          );
          break;
        case ReactMultiChildUpdateTypes.MOVE_EXISTING:
          insertChildAt(
            update.parentNode,
            initialChildren[update.parentID][update.fromIndex],
            update.toIndex
          );
          break;
        case ReactMultiChildUpdateTypes.TEXT_CONTENT:
          updateTextContent(
            update.parentNode,
            update.textContent
          );
          break;
        case ReactMultiChildUpdateTypes.REMOVE_NODE:
          // Already removed by the for-loop above.
          break;
      }
    }
  }

};

module.exports = DOMChildrenOperations;

},{"./Danger":10,"./ReactMultiChildUpdateTypes":58,"./getTextContentAccessor":105}],8:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule DOMProperty
 * @typechecks static-only
 */

/*jslint bitwise: true */

"use strict";

var invariant = require("./invariant");

var DOMPropertyInjection = {
  /**
   * Mapping from normalized, camelcased property names to a configuration that
   * specifies how the associated DOM property should be accessed or rendered.
   */
  MUST_USE_ATTRIBUTE: 0x1,
  MUST_USE_PROPERTY: 0x2,
  HAS_SIDE_EFFECTS: 0x4,
  HAS_BOOLEAN_VALUE: 0x8,
  HAS_POSITIVE_NUMERIC_VALUE: 0x10,

  /**
   * Inject some specialized knowledge about the DOM. This takes a config object
   * with the following properties:
   *
   * isCustomAttribute: function that given an attribute name will return true
   * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
   * attributes where it's impossible to enumerate all of the possible
   * attribute names,
   *
   * Properties: object mapping DOM property name to one of the
   * DOMPropertyInjection constants or null. If your attribute isn't in here,
   * it won't get written to the DOM.
   *
   * DOMAttributeNames: object mapping React attribute name to the DOM
   * attribute name. Attribute names not specified use the **lowercase**
   * normalized name.
   *
   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
   * Property names not specified use the normalized name.
   *
   * DOMMutationMethods: Properties that require special mutation methods. If
   * `value` is undefined, the mutation method should unset the property.
   *
   * @param {object} domPropertyConfig the config as described above.
   */
  injectDOMPropertyConfig: function(domPropertyConfig) {
    var Properties = domPropertyConfig.Properties || {};
    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
    var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

    if (domPropertyConfig.isCustomAttribute) {
      DOMProperty._isCustomAttributeFunctions.push(
        domPropertyConfig.isCustomAttribute
      );
    }

    for (var propName in Properties) {
      ("production" !== "development" ? invariant(
        !DOMProperty.isStandardName[propName],
        'injectDOMPropertyConfig(...): You\'re trying to inject DOM property ' +
        '\'%s\' which has already been injected. You may be accidentally ' +
        'injecting the same DOM property config twice, or you may be ' +
        'injecting two configs that have conflicting property names.',
        propName
      ) : invariant(!DOMProperty.isStandardName[propName]));

      DOMProperty.isStandardName[propName] = true;

      var lowerCased = propName.toLowerCase();
      DOMProperty.getPossibleStandardName[lowerCased] = propName;

      var attributeName = DOMAttributeNames[propName];
      if (attributeName) {
        DOMProperty.getPossibleStandardName[attributeName] = propName;
      }

      DOMProperty.getAttributeName[propName] = attributeName || lowerCased;

      DOMProperty.getPropertyName[propName] =
        DOMPropertyNames[propName] || propName;

      var mutationMethod = DOMMutationMethods[propName];
      if (mutationMethod) {
        DOMProperty.getMutationMethod[propName] = mutationMethod;
      }

      var propConfig = Properties[propName];
      DOMProperty.mustUseAttribute[propName] =
        propConfig & DOMPropertyInjection.MUST_USE_ATTRIBUTE;
      DOMProperty.mustUseProperty[propName] =
        propConfig & DOMPropertyInjection.MUST_USE_PROPERTY;
      DOMProperty.hasSideEffects[propName] =
        propConfig & DOMPropertyInjection.HAS_SIDE_EFFECTS;
      DOMProperty.hasBooleanValue[propName] =
        propConfig & DOMPropertyInjection.HAS_BOOLEAN_VALUE;
      DOMProperty.hasPositiveNumericValue[propName] =
        propConfig & DOMPropertyInjection.HAS_POSITIVE_NUMERIC_VALUE;

      ("production" !== "development" ? invariant(
        !DOMProperty.mustUseAttribute[propName] ||
          !DOMProperty.mustUseProperty[propName],
        'DOMProperty: Cannot require using both attribute and property: %s',
        propName
      ) : invariant(!DOMProperty.mustUseAttribute[propName] ||
        !DOMProperty.mustUseProperty[propName]));
      ("production" !== "development" ? invariant(
        DOMProperty.mustUseProperty[propName] ||
          !DOMProperty.hasSideEffects[propName],
        'DOMProperty: Properties that have side effects must use property: %s',
        propName
      ) : invariant(DOMProperty.mustUseProperty[propName] ||
        !DOMProperty.hasSideEffects[propName]));
      ("production" !== "development" ? invariant(
        !DOMProperty.hasBooleanValue[propName] ||
          !DOMProperty.hasPositiveNumericValue[propName],
        'DOMProperty: Cannot have both boolean and positive numeric value: %s',
        propName
      ) : invariant(!DOMProperty.hasBooleanValue[propName] ||
        !DOMProperty.hasPositiveNumericValue[propName]));
    }
  }
};
var defaultValueCache = {};

/**
 * DOMProperty exports lookup objects that can be used like functions:
 *
 *   > DOMProperty.isValid['id']
 *   true
 *   > DOMProperty.isValid['foobar']
 *   undefined
 *
 * Although this may be confusing, it performs better in general.
 *
 * @see http://jsperf.com/key-exists
 * @see http://jsperf.com/key-missing
 */
var DOMProperty = {

  ID_ATTRIBUTE_NAME: 'data-reactid',

  /**
   * Checks whether a property name is a standard property.
   * @type {Object}
   */
  isStandardName: {},

  /**
   * Mapping from lowercase property names to the properly cased version, used
   * to warn in the case of missing properties.
   * @type {Object}
   */
  getPossibleStandardName: {},

  /**
   * Mapping from normalized names to attribute names that differ. Attribute
   * names are used when rendering markup or with `*Attribute()`.
   * @type {Object}
   */
  getAttributeName: {},

  /**
   * Mapping from normalized names to properties on DOM node instances.
   * (This includes properties that mutate due to external factors.)
   * @type {Object}
   */
  getPropertyName: {},

  /**
   * Mapping from normalized names to mutation methods. This will only exist if
   * mutation cannot be set simply by the property or `setAttribute()`.
   * @type {Object}
   */
  getMutationMethod: {},

  /**
   * Whether the property must be accessed and mutated as an object property.
   * @type {Object}
   */
  mustUseAttribute: {},

  /**
   * Whether the property must be accessed and mutated using `*Attribute()`.
   * (This includes anything that fails `<propName> in <element>`.)
   * @type {Object}
   */
  mustUseProperty: {},

  /**
   * Whether or not setting a value causes side effects such as triggering
   * resources to be loaded or text selection changes. We must ensure that
   * the value is only set if it has changed.
   * @type {Object}
   */
  hasSideEffects: {},

  /**
   * Whether the property should be removed when set to a falsey value.
   * @type {Object}
   */
  hasBooleanValue: {},

  /**
   * Whether the property must be positive numeric or parse as a positive
   * numeric and should be removed when set to a falsey value.
   * @type {Object}
   */
  hasPositiveNumericValue: {},

  /**
   * All of the isCustomAttribute() functions that have been injected.
   */
  _isCustomAttributeFunctions: [],

  /**
   * Checks whether a property name is a custom attribute.
   * @method
   */
  isCustomAttribute: function(attributeName) {
    return DOMProperty._isCustomAttributeFunctions.some(
      function(isCustomAttributeFn) {
        return isCustomAttributeFn.call(null, attributeName);
      }
    );
  },

  /**
   * Returns the default property value for a DOM property (i.e., not an
   * attribute). Most default values are '' or false, but not all. Worse yet,
   * some (in particular, `type`) vary depending on the type of element.
   *
   * TODO: Is it better to grab all the possible properties when creating an
   * element to avoid having to create the same element twice?
   */
  getDefaultValueForProperty: function(nodeName, prop) {
    var nodeDefaults = defaultValueCache[nodeName];
    var testElement;
    if (!nodeDefaults) {
      defaultValueCache[nodeName] = nodeDefaults = {};
    }
    if (!(prop in nodeDefaults)) {
      testElement = document.createElement(nodeName);
      nodeDefaults[prop] = testElement[prop];
    }
    return nodeDefaults[prop];
  },

  injection: DOMPropertyInjection
};

module.exports = DOMProperty;

},{"./invariant":108}],9:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule DOMPropertyOperations
 * @typechecks static-only
 */

"use strict";

var DOMProperty = require("./DOMProperty");

var escapeTextForBrowser = require("./escapeTextForBrowser");
var memoizeStringOnly = require("./memoizeStringOnly");

function shouldIgnoreValue(name, value) {
  return value == null ||
    DOMProperty.hasBooleanValue[name] && !value ||
    DOMProperty.hasPositiveNumericValue[name] && (isNaN(value) || value < 1);
}

var processAttributeNameAndPrefix = memoizeStringOnly(function(name) {
  return escapeTextForBrowser(name) + '="';
});

if ("production" !== "development") {
  var reactProps = {
    children: true,
    dangerouslySetInnerHTML: true,
    key: true,
    ref: true
  };
  var warnedProperties = {};

  var warnUnknownProperty = function(name) {
    if (reactProps[name] || warnedProperties[name]) {
      return;
    }

    warnedProperties[name] = true;
    var lowerCasedName = name.toLowerCase();

    // data-* attributes should be lowercase; suggest the lowercase version
    var standardName = DOMProperty.isCustomAttribute(lowerCasedName) ?
      lowerCasedName : DOMProperty.getPossibleStandardName[lowerCasedName];

    // For now, only warn when we have a suggested correction. This prevents
    // logging too much when using transferPropsTo.
    if (standardName != null) {
      console.warn(
        'Unknown DOM property ' + name + '. Did you mean ' + standardName + '?'
      );
    }

  };
}

/**
 * Operations for dealing with DOM properties.
 */
var DOMPropertyOperations = {

  /**
   * Creates markup for the ID property.
   *
   * @param {string} id Unescaped ID.
   * @return {string} Markup string.
   */
  createMarkupForID: function(id) {
    return processAttributeNameAndPrefix(DOMProperty.ID_ATTRIBUTE_NAME) +
      escapeTextForBrowser(id) + '"';
  },

  /**
   * Creates markup for a property.
   *
   * @param {string} name
   * @param {*} value
   * @return {?string} Markup string, or null if the property was invalid.
   */
  createMarkupForProperty: function(name, value) {
    if (DOMProperty.isStandardName[name]) {
      if (shouldIgnoreValue(name, value)) {
        return '';
      }
      var attributeName = DOMProperty.getAttributeName[name];
      if (DOMProperty.hasBooleanValue[name]) {
        return escapeTextForBrowser(attributeName);
      }
      return processAttributeNameAndPrefix(attributeName) +
        escapeTextForBrowser(value) + '"';
    } else if (DOMProperty.isCustomAttribute(name)) {
      if (value == null) {
        return '';
      }
      return processAttributeNameAndPrefix(name) +
        escapeTextForBrowser(value) + '"';
    } else if ("production" !== "development") {
      warnUnknownProperty(name);
    }
    return null;
  },

  /**
   * Sets the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   * @param {*} value
   */
  setValueForProperty: function(node, name, value) {
    if (DOMProperty.isStandardName[name]) {
      var mutationMethod = DOMProperty.getMutationMethod[name];
      if (mutationMethod) {
        mutationMethod(node, value);
      } else if (shouldIgnoreValue(name, value)) {
        this.deleteValueForProperty(node, name);
      } else if (DOMProperty.mustUseAttribute[name]) {
        node.setAttribute(DOMProperty.getAttributeName[name], '' + value);
      } else {
        var propName = DOMProperty.getPropertyName[name];
        if (!DOMProperty.hasSideEffects[name] || node[propName] !== value) {
          node[propName] = value;
        }
      }
    } else if (DOMProperty.isCustomAttribute(name)) {
      if (value == null) {
        node.removeAttribute(DOMProperty.getAttributeName[name]);
      } else {
        node.setAttribute(name, '' + value);
      }
    } else if ("production" !== "development") {
      warnUnknownProperty(name);
    }
  },

  /**
   * Deletes the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   */
  deleteValueForProperty: function(node, name) {
    if (DOMProperty.isStandardName[name]) {
      var mutationMethod = DOMProperty.getMutationMethod[name];
      if (mutationMethod) {
        mutationMethod(node, undefined);
      } else if (DOMProperty.mustUseAttribute[name]) {
        node.removeAttribute(DOMProperty.getAttributeName[name]);
      } else {
        var propName = DOMProperty.getPropertyName[name];
        var defaultValue = DOMProperty.getDefaultValueForProperty(
          node.nodeName,
          name
        );
        if (!DOMProperty.hasSideEffects[name] ||
            node[propName] !== defaultValue) {
          node[propName] = defaultValue;
        }
      }
    } else if (DOMProperty.isCustomAttribute(name)) {
      node.removeAttribute(name);
    } else if ("production" !== "development") {
      warnUnknownProperty(name);
    }
  }

};

module.exports = DOMPropertyOperations;

},{"./DOMProperty":8,"./escapeTextForBrowser":96,"./memoizeStringOnly":116}],10:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule Danger
 * @typechecks static-only
 */

/*jslint evil: true, sub: true */

"use strict";

var ExecutionEnvironment = require("./ExecutionEnvironment");

var createNodesFromMarkup = require("./createNodesFromMarkup");
var emptyFunction = require("./emptyFunction");
var getMarkupWrap = require("./getMarkupWrap");
var invariant = require("./invariant");

var OPEN_TAG_NAME_EXP = /^(<[^ \/>]+)/;
var RESULT_INDEX_ATTR = 'data-danger-index';

/**
 * Extracts the `nodeName` from a string of markup.
 *
 * NOTE: Extracting the `nodeName` does not require a regular expression match
 * because we make assumptions about React-generated markup (i.e. there are no
 * spaces surrounding the opening tag and there is at least one attribute).
 *
 * @param {string} markup String of markup.
 * @return {string} Node name of the supplied markup.
 * @see http://jsperf.com/extract-nodename
 */
function getNodeName(markup) {
  return markup.substring(1, markup.indexOf(' '));
}

var Danger = {

  /**
   * Renders markup into an array of nodes. The markup is expected to render
   * into a list of root nodes. Also, the length of `resultList` and
   * `markupList` should be the same.
   *
   * @param {array<string>} markupList List of markup strings to render.
   * @return {array<DOMElement>} List of rendered nodes.
   * @internal
   */
  dangerouslyRenderMarkup: function(markupList) {
    ("production" !== "development" ? invariant(
      ExecutionEnvironment.canUseDOM,
      'dangerouslyRenderMarkup(...): Cannot render markup in a Worker ' +
      'thread. This is likely a bug in the framework. Please report ' +
      'immediately.'
    ) : invariant(ExecutionEnvironment.canUseDOM));
    var nodeName;
    var markupByNodeName = {};
    // Group markup by `nodeName` if a wrap is necessary, else by '*'.
    for (var i = 0; i < markupList.length; i++) {
      ("production" !== "development" ? invariant(
        markupList[i],
        'dangerouslyRenderMarkup(...): Missing markup.'
      ) : invariant(markupList[i]));
      nodeName = getNodeName(markupList[i]);
      nodeName = getMarkupWrap(nodeName) ? nodeName : '*';
      markupByNodeName[nodeName] = markupByNodeName[nodeName] || [];
      markupByNodeName[nodeName][i] = markupList[i];
    }
    var resultList = [];
    var resultListAssignmentCount = 0;
    for (nodeName in markupByNodeName) {
      if (!markupByNodeName.hasOwnProperty(nodeName)) {
        continue;
      }
      var markupListByNodeName = markupByNodeName[nodeName];

      // This for-in loop skips the holes of the sparse array. The order of
      // iteration should follow the order of assignment, which happens to match
      // numerical index order, but we don't rely on that.
      for (var resultIndex in markupListByNodeName) {
        if (markupListByNodeName.hasOwnProperty(resultIndex)) {
          var markup = markupListByNodeName[resultIndex];

          // Push the requested markup with an additional RESULT_INDEX_ATTR
          // attribute.  If the markup does not start with a < character, it
          // will be discarded below (with an appropriate console.error).
          markupListByNodeName[resultIndex] = markup.replace(
            OPEN_TAG_NAME_EXP,
            // This index will be parsed back out below.
            '$1 ' + RESULT_INDEX_ATTR + '="' + resultIndex + '" '
          );
        }
      }

      // Render each group of markup with similar wrapping `nodeName`.
      var renderNodes = createNodesFromMarkup(
        markupListByNodeName.join(''),
        emptyFunction // Do nothing special with <script> tags.
      );

      for (i = 0; i < renderNodes.length; ++i) {
        var renderNode = renderNodes[i];
        if (renderNode.hasAttribute &&
            renderNode.hasAttribute(RESULT_INDEX_ATTR)) {

          resultIndex = +renderNode.getAttribute(RESULT_INDEX_ATTR);
          renderNode.removeAttribute(RESULT_INDEX_ATTR);

          ("production" !== "development" ? invariant(
            !resultList.hasOwnProperty(resultIndex),
            'Danger: Assigning to an already-occupied result index.'
          ) : invariant(!resultList.hasOwnProperty(resultIndex)));

          resultList[resultIndex] = renderNode;

          // This should match resultList.length and markupList.length when
          // we're done.
          resultListAssignmentCount += 1;

        } else if ("production" !== "development") {
          console.error(
            "Danger: Discarding unexpected node:",
            renderNode
          );
        }
      }
    }

    // Although resultList was populated out of order, it should now be a dense
    // array.
    ("production" !== "development" ? invariant(
      resultListAssignmentCount === resultList.length,
      'Danger: Did not assign to every index of resultList.'
    ) : invariant(resultListAssignmentCount === resultList.length));

    ("production" !== "development" ? invariant(
      resultList.length === markupList.length,
      'Danger: Expected markup to render %s nodes, but rendered %s.',
      markupList.length,
      resultList.length
    ) : invariant(resultList.length === markupList.length));

    return resultList;
  },

  /**
   * Replaces a node with a string of markup at its current position within its
   * parent. The markup must render into a single root node.
   *
   * @param {DOMElement} oldChild Child node to replace.
   * @param {string} markup Markup to render in place of the child node.
   * @internal
   */
  dangerouslyReplaceNodeWithMarkup: function(oldChild, markup) {
    ("production" !== "development" ? invariant(
      ExecutionEnvironment.canUseDOM,
      'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a ' +
      'worker thread. This is likely a bug in the framework. Please report ' +
      'immediately.'
    ) : invariant(ExecutionEnvironment.canUseDOM));
    ("production" !== "development" ? invariant(markup, 'dangerouslyReplaceNodeWithMarkup(...): Missing markup.') : invariant(markup));
    ("production" !== "development" ? invariant(
      oldChild.tagName.toLowerCase() !== 'html',
      'dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the ' +
      '<html> node. This is because browser quirks make this unreliable ' +
      'and/or slow. If you want to render to the root you must use ' +
      'server rendering. See renderComponentToString().'
    ) : invariant(oldChild.tagName.toLowerCase() !== 'html'));

    var newChild = createNodesFromMarkup(markup, emptyFunction)[0];
    oldChild.parentNode.replaceChild(newChild, oldChild);
  }

};

module.exports = Danger;

},{"./ExecutionEnvironment":20,"./createNodesFromMarkup":92,"./emptyFunction":95,"./getMarkupWrap":102,"./invariant":108}],11:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule DefaultDOMPropertyConfig
 */

/*jslint bitwise: true*/

"use strict";

var DOMProperty = require("./DOMProperty");

var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
var HAS_SIDE_EFFECTS = DOMProperty.injection.HAS_SIDE_EFFECTS;
var HAS_POSITIVE_NUMERIC_VALUE =
  DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;

var DefaultDOMPropertyConfig = {
  isCustomAttribute: RegExp.prototype.test.bind(
    /^(data|aria)-[a-z_][a-z\d_.\-]*$/
  ),
  Properties: {
    /**
     * Standard Properties
     */
    accept: null,
    accessKey: null,
    action: null,
    allowFullScreen: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    allowTransparency: MUST_USE_ATTRIBUTE,
    alt: null,
    async: HAS_BOOLEAN_VALUE,
    autoComplete: null,
    // autoFocus is polyfilled/normalized by AutoFocusMixin
    // autoFocus: HAS_BOOLEAN_VALUE,
    autoPlay: HAS_BOOLEAN_VALUE,
    cellPadding: null,
    cellSpacing: null,
    charSet: MUST_USE_ATTRIBUTE,
    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    className: MUST_USE_PROPERTY,
    cols: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    colSpan: null,
    content: null,
    contentEditable: null,
    contextMenu: MUST_USE_ATTRIBUTE,
    controls: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    crossOrigin: null,
    data: null, // For `<object />` acts as `src`.
    dateTime: MUST_USE_ATTRIBUTE,
    defer: HAS_BOOLEAN_VALUE,
    dir: null,
    disabled: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    download: null,
    draggable: null,
    encType: null,
    form: MUST_USE_ATTRIBUTE,
    formNoValidate: HAS_BOOLEAN_VALUE,
    frameBorder: MUST_USE_ATTRIBUTE,
    height: MUST_USE_ATTRIBUTE,
    hidden: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    href: null,
    hrefLang: null,
    htmlFor: null,
    httpEquiv: null,
    icon: null,
    id: MUST_USE_PROPERTY,
    label: null,
    lang: null,
    list: null,
    loop: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    max: null,
    maxLength: MUST_USE_ATTRIBUTE,
    mediaGroup: null,
    method: null,
    min: null,
    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    name: null,
    noValidate: HAS_BOOLEAN_VALUE,
    pattern: null,
    placeholder: null,
    poster: null,
    preload: null,
    radioGroup: null,
    readOnly: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    rel: null,
    required: HAS_BOOLEAN_VALUE,
    role: MUST_USE_ATTRIBUTE,
    rows: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    rowSpan: null,
    sandbox: null,
    scope: null,
    scrollLeft: MUST_USE_PROPERTY,
    scrollTop: MUST_USE_PROPERTY,
    seamless: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    size: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    span: HAS_POSITIVE_NUMERIC_VALUE,
    spellCheck: null,
    src: null,
    srcDoc: MUST_USE_PROPERTY,
    step: null,
    style: null,
    tabIndex: null,
    target: null,
    title: null,
    type: null,
    value: MUST_USE_PROPERTY | HAS_SIDE_EFFECTS,
    width: MUST_USE_ATTRIBUTE,
    wmode: MUST_USE_ATTRIBUTE,

    /**
     * Non-standard Properties
     */
    autoCapitalize: null, // Supported in Mobile Safari for keyboard hints
    autoCorrect: null, // Supported in Mobile Safari for keyboard hints
    property: null, // Supports OG in meta tags

    /**
     * SVG Properties
     */
    cx: MUST_USE_ATTRIBUTE,
    cy: MUST_USE_ATTRIBUTE,
    d: MUST_USE_ATTRIBUTE,
    fill: MUST_USE_ATTRIBUTE,
    fx: MUST_USE_ATTRIBUTE,
    fy: MUST_USE_ATTRIBUTE,
    gradientTransform: MUST_USE_ATTRIBUTE,
    gradientUnits: MUST_USE_ATTRIBUTE,
    offset: MUST_USE_ATTRIBUTE,
    points: MUST_USE_ATTRIBUTE,
    r: MUST_USE_ATTRIBUTE,
    rx: MUST_USE_ATTRIBUTE,
    ry: MUST_USE_ATTRIBUTE,
    spreadMethod: MUST_USE_ATTRIBUTE,
    stopColor: MUST_USE_ATTRIBUTE,
    stopOpacity: MUST_USE_ATTRIBUTE,
    stroke: MUST_USE_ATTRIBUTE,
    strokeLinecap: MUST_USE_ATTRIBUTE,
    strokeWidth: MUST_USE_ATTRIBUTE,
    transform: MUST_USE_ATTRIBUTE,
    version: MUST_USE_ATTRIBUTE,
    viewBox: MUST_USE_ATTRIBUTE,
    x1: MUST_USE_ATTRIBUTE,
    x2: MUST_USE_ATTRIBUTE,
    x: MUST_USE_ATTRIBUTE,
    y1: MUST_USE_ATTRIBUTE,
    y2: MUST_USE_ATTRIBUTE,
    y: MUST_USE_ATTRIBUTE
  },
  DOMAttributeNames: {
    className: 'class',
    gradientTransform: 'gradientTransform',
    gradientUnits: 'gradientUnits',
    htmlFor: 'for',
    spreadMethod: 'spreadMethod',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strokeLinecap: 'stroke-linecap',
    strokeWidth: 'stroke-width',
    viewBox: 'viewBox'
  },
  DOMPropertyNames: {
    autoCapitalize: 'autocapitalize',
    autoComplete: 'autocomplete',
    autoCorrect: 'autocorrect',
    autoFocus: 'autofocus',
    autoPlay: 'autoplay',
    encType: 'enctype',
    hrefLang: 'hreflang',
    radioGroup: 'radiogroup',
    spellCheck: 'spellcheck',
    srcDoc: 'srcdoc'
  },
  DOMMutationMethods: {
    /**
     * Setting `className` to null may cause it to be set to the string "null".
     *
     * @param {DOMElement} node
     * @param {*} value
     */
    className: function(node, value) {
      node.className = value || '';
    }
  }
};

module.exports = DefaultDOMPropertyConfig;

},{"./DOMProperty":8}],12:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule DefaultEventPluginOrder
 */

"use strict";

 var keyOf = require("./keyOf");

/**
 * Module that is injectable into `EventPluginHub`, that specifies a
 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
 * plugins, without having to package every one of them. This is better than
 * having plugins be ordered in the same order that they are injected because
 * that ordering would be influenced by the packaging order.
 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
 */
var DefaultEventPluginOrder = [
  keyOf({ResponderEventPlugin: null}),
  keyOf({SimpleEventPlugin: null}),
  keyOf({TapEventPlugin: null}),
  keyOf({EnterLeaveEventPlugin: null}),
  keyOf({ChangeEventPlugin: null}),
  keyOf({SelectEventPlugin: null}),
  keyOf({CompositionEventPlugin: null}),
  keyOf({AnalyticsEventPlugin: null}),
  keyOf({MobileSafariClickEventPlugin: null})
];

module.exports = DefaultEventPluginOrder;

},{"./keyOf":115}],13:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EnterLeaveEventPlugin
 * @typechecks static-only
 */

"use strict";

var EventConstants = require("./EventConstants");
var EventPropagators = require("./EventPropagators");
var SyntheticMouseEvent = require("./SyntheticMouseEvent");

var ReactMount = require("./ReactMount");
var keyOf = require("./keyOf");

var topLevelTypes = EventConstants.topLevelTypes;
var getFirstReactDOM = ReactMount.getFirstReactDOM;

var eventTypes = {
  mouseEnter: {
    registrationName: keyOf({onMouseEnter: null}),
    dependencies: [
      topLevelTypes.topMouseOut,
      topLevelTypes.topMouseOver
    ]
  },
  mouseLeave: {
    registrationName: keyOf({onMouseLeave: null}),
    dependencies: [
      topLevelTypes.topMouseOut,
      topLevelTypes.topMouseOver
    ]
  }
};

var extractedEvents = [null, null];

var EnterLeaveEventPlugin = {

  eventTypes: eventTypes,

  /**
   * For almost every interaction we care about, there will be both a top-level
   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
   * we do not extract duplicate events. However, moving the mouse into the
   * browser from outside will not fire a `mouseout` event. In this case, we use
   * the `mouseover` top-level event.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {
    if (topLevelType === topLevelTypes.topMouseOver &&
        (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
      return null;
    }
    if (topLevelType !== topLevelTypes.topMouseOut &&
        topLevelType !== topLevelTypes.topMouseOver) {
      // Must not be a mouse in or mouse out - ignoring.
      return null;
    }

    var win;
    if (topLevelTarget.window === topLevelTarget) {
      // `topLevelTarget` is probably a window object.
      win = topLevelTarget;
    } else {
      // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
      var doc = topLevelTarget.ownerDocument;
      if (doc) {
        win = doc.defaultView || doc.parentWindow;
      } else {
        win = window;
      }
    }

    var from, to;
    if (topLevelType === topLevelTypes.topMouseOut) {
      from = topLevelTarget;
      to =
        getFirstReactDOM(nativeEvent.relatedTarget || nativeEvent.toElement) ||
        win;
    } else {
      from = win;
      to = topLevelTarget;
    }

    if (from === to) {
      // Nothing pertains to our managed components.
      return null;
    }

    var fromID = from ? ReactMount.getID(from) : '';
    var toID = to ? ReactMount.getID(to) : '';

    var leave = SyntheticMouseEvent.getPooled(
      eventTypes.mouseLeave,
      fromID,
      nativeEvent
    );
    leave.type = 'mouseleave';
    leave.target = from;
    leave.relatedTarget = to;

    var enter = SyntheticMouseEvent.getPooled(
      eventTypes.mouseEnter,
      toID,
      nativeEvent
    );
    enter.type = 'mouseenter';
    enter.target = to;
    enter.relatedTarget = from;

    EventPropagators.accumulateEnterLeaveDispatches(leave, enter, fromID, toID);

    extractedEvents[0] = leave;
    extractedEvents[1] = enter;

    return extractedEvents;
  }

};

module.exports = EnterLeaveEventPlugin;

},{"./EventConstants":14,"./EventPropagators":19,"./ReactMount":55,"./SyntheticMouseEvent":80,"./keyOf":115}],14:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventConstants
 */

"use strict";

var keyMirror = require("./keyMirror");

var PropagationPhases = keyMirror({bubbled: null, captured: null});

/**
 * Types of raw signals from the browser caught at the top level.
 */
var topLevelTypes = keyMirror({
  topBlur: null,
  topChange: null,
  topClick: null,
  topCompositionEnd: null,
  topCompositionStart: null,
  topCompositionUpdate: null,
  topContextMenu: null,
  topCopy: null,
  topCut: null,
  topDoubleClick: null,
  topDrag: null,
  topDragEnd: null,
  topDragEnter: null,
  topDragExit: null,
  topDragLeave: null,
  topDragOver: null,
  topDragStart: null,
  topDrop: null,
  topError: null,
  topFocus: null,
  topInput: null,
  topKeyDown: null,
  topKeyPress: null,
  topKeyUp: null,
  topLoad: null,
  topMouseDown: null,
  topMouseMove: null,
  topMouseOut: null,
  topMouseOver: null,
  topMouseUp: null,
  topPaste: null,
  topReset: null,
  topScroll: null,
  topSelectionChange: null,
  topSubmit: null,
  topTouchCancel: null,
  topTouchEnd: null,
  topTouchMove: null,
  topTouchStart: null,
  topWheel: null
});

var EventConstants = {
  topLevelTypes: topLevelTypes,
  PropagationPhases: PropagationPhases
};

module.exports = EventConstants;

},{"./keyMirror":114}],15:[function(require,module,exports){
/**
 * @providesModule EventListener
 */

var emptyFunction = require("./emptyFunction");

/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function() {
          target.detachEvent(eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function(target, eventType, callback) {
    if (!target.addEventListener) {
      if ("production" !== "development") {
        console.error(
          'Attempted to listen to events during the capture phase on a ' +
          'browser that does not support the capture phase. Your application ' +
          'will not receive some events.'
        );
      }
      return {
        remove: emptyFunction
      };
    } else {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    }
  }
};

module.exports = EventListener;

},{"./emptyFunction":95}],16:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventPluginHub
 */

"use strict";

var EventPluginRegistry = require("./EventPluginRegistry");
var EventPluginUtils = require("./EventPluginUtils");
var ExecutionEnvironment = require("./ExecutionEnvironment");

var accumulate = require("./accumulate");
var forEachAccumulated = require("./forEachAccumulated");
var invariant = require("./invariant");
var isEventSupported = require("./isEventSupported");

/**
 * Internal store for event listeners
 */
var listenerBank = {};

/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */
var eventQueue = null;

/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @private
 */
var executeDispatchesAndRelease = function(event) {
  if (event) {
    var executeDispatch = EventPluginUtils.executeDispatch;
    // Plugins can provide custom behavior when dispatching events.
    var PluginModule = EventPluginRegistry.getPluginModuleForEvent(event);
    if (PluginModule && PluginModule.executeDispatch) {
      executeDispatch = PluginModule.executeDispatch;
    }
    EventPluginUtils.executeDispatchesInOrder(event, executeDispatch);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};

/**
 * - `InstanceHandle`: [required] Module that performs logical traversals of DOM
 *   hierarchy given ids of the logical DOM elements involved.
 */
var InstanceHandle = null;

function validateInstanceHandle() {
  var invalid = !InstanceHandle||
    !InstanceHandle.traverseTwoPhase ||
    !InstanceHandle.traverseEnterLeave;
  if (invalid) {
    throw new Error('InstanceHandle not injected before use!');
  }
}

/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */
var EventPluginHub = {

  /**
   * Methods for injecting dependencies.
   */
  injection: {

    /**
     * @param {object} InjectedMount
     * @public
     */
    injectMount: EventPluginUtils.injection.injectMount,

    /**
     * @param {object} InjectedInstanceHandle
     * @public
     */
    injectInstanceHandle: function(InjectedInstanceHandle) {
      InstanceHandle = InjectedInstanceHandle;
      if ("production" !== "development") {
        validateInstanceHandle();
      }
    },

    getInstanceHandle: function() {
      if ("production" !== "development") {
        validateInstanceHandle();
      }
      return InstanceHandle;
    },

    /**
     * @param {array} InjectedEventPluginOrder
     * @public
     */
    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,

    /**
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     */
    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName

  },

  eventNameDispatchConfigs: EventPluginRegistry.eventNameDispatchConfigs,

  registrationNameModules: EventPluginRegistry.registrationNameModules,

  /**
   * Stores `listener` at `listenerBank[registrationName][id]`. Is idempotent.
   *
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {?function} listener The callback to store.
   */
  putListener: function(id, registrationName, listener) {
    ("production" !== "development" ? invariant(
      ExecutionEnvironment.canUseDOM,
      'Cannot call putListener() in a non-DOM environment.'
    ) : invariant(ExecutionEnvironment.canUseDOM));
    ("production" !== "development" ? invariant(
      !listener || typeof listener === 'function',
      'Expected %s listener to be a function, instead got type %s',
      registrationName, typeof listener
    ) : invariant(!listener || typeof listener === 'function'));

    if ("production" !== "development") {
      // IE8 has no API for event capturing and the `onScroll` event doesn't
      // bubble.
      if (registrationName === 'onScroll' &&
          !isEventSupported('scroll', true)) {
        console.warn('This browser doesn\'t support the `onScroll` event');
      }
    }
    var bankForRegistrationName =
      listenerBank[registrationName] || (listenerBank[registrationName] = {});
    bankForRegistrationName[id] = listener;
  },

  /**
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @return {?function} The stored callback.
   */
  getListener: function(id, registrationName) {
    var bankForRegistrationName = listenerBank[registrationName];
    return bankForRegistrationName && bankForRegistrationName[id];
  },

  /**
   * Deletes a listener from the registration bank.
   *
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   */
  deleteListener: function(id, registrationName) {
    var bankForRegistrationName = listenerBank[registrationName];
    if (bankForRegistrationName) {
      delete bankForRegistrationName[id];
    }
  },

  /**
   * Deletes all listeners for the DOM element with the supplied ID.
   *
   * @param {string} id ID of the DOM element.
   */
  deleteAllListeners: function(id) {
    for (var registrationName in listenerBank) {
      delete listenerBank[registrationName][id];
    }
  },

  /**
   * Allows registered plugins an opportunity to extract events from top-level
   * native browser events.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @internal
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {
    var events;
    var plugins = EventPluginRegistry.plugins;
    for (var i = 0, l = plugins.length; i < l; i++) {
      // Not every plugin in the ordering may be loaded at runtime.
      var possiblePlugin = plugins[i];
      if (possiblePlugin) {
        var extractedEvents = possiblePlugin.extractEvents(
          topLevelType,
          topLevelTarget,
          topLevelTargetID,
          nativeEvent
        );
        if (extractedEvents) {
          events = accumulate(events, extractedEvents);
        }
      }
    }
    return events;
  },

  /**
   * Enqueues a synthetic event that should be dispatched when
   * `processEventQueue` is invoked.
   *
   * @param {*} events An accumulation of synthetic events.
   * @internal
   */
  enqueueEvents: function(events) {
    if (events) {
      eventQueue = accumulate(eventQueue, events);
    }
  },

  /**
   * Dispatches all synthetic events on the event queue.
   *
   * @internal
   */
  processEventQueue: function() {
    // Set `eventQueue` to null before processing it so that we can tell if more
    // events get enqueued while processing.
    var processingEventQueue = eventQueue;
    eventQueue = null;
    forEachAccumulated(processingEventQueue, executeDispatchesAndRelease);
    ("production" !== "development" ? invariant(
      !eventQueue,
      'processEventQueue(): Additional events were enqueued while processing ' +
      'an event queue. Support for this has not yet been implemented.'
    ) : invariant(!eventQueue));
  },

  /**
   * These are needed for tests only. Do not use!
   */
  __purge: function() {
    listenerBank = {};
  },

  __getListenerBank: function() {
    return listenerBank;
  }

};

module.exports = EventPluginHub;

},{"./EventPluginRegistry":17,"./EventPluginUtils":18,"./ExecutionEnvironment":20,"./accumulate":86,"./forEachAccumulated":98,"./invariant":108,"./isEventSupported":109}],17:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventPluginRegistry
 * @typechecks static-only
 */

"use strict";

var invariant = require("./invariant");

/**
 * Injectable ordering of event plugins.
 */
var EventPluginOrder = null;

/**
 * Injectable mapping from names to event plugin modules.
 */
var namesToPlugins = {};

/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */
function recomputePluginOrdering() {
  if (!EventPluginOrder) {
    // Wait until an `EventPluginOrder` is injected.
    return;
  }
  for (var pluginName in namesToPlugins) {
    var PluginModule = namesToPlugins[pluginName];
    var pluginIndex = EventPluginOrder.indexOf(pluginName);
    ("production" !== "development" ? invariant(
      pluginIndex > -1,
      'EventPluginRegistry: Cannot inject event plugins that do not exist in ' +
      'the plugin ordering, `%s`.',
      pluginName
    ) : invariant(pluginIndex > -1));
    if (EventPluginRegistry.plugins[pluginIndex]) {
      continue;
    }
    ("production" !== "development" ? invariant(
      PluginModule.extractEvents,
      'EventPluginRegistry: Event plugins must implement an `extractEvents` ' +
      'method, but `%s` does not.',
      pluginName
    ) : invariant(PluginModule.extractEvents));
    EventPluginRegistry.plugins[pluginIndex] = PluginModule;
    var publishedEvents = PluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      ("production" !== "development" ? invariant(
        publishEventForPlugin(
          publishedEvents[eventName],
          PluginModule,
          eventName
        ),
        'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',
        eventName,
        pluginName
      ) : invariant(publishEventForPlugin(
        publishedEvents[eventName],
        PluginModule,
        eventName
      )));
    }
  }
}

/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */
function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {
  ("production" !== "development" ? invariant(
    !EventPluginRegistry.eventNameDispatchConfigs[eventName],
    'EventPluginHub: More than one plugin attempted to publish the same ' +
    'event name, `%s`.',
    eventName
  ) : invariant(!EventPluginRegistry.eventNameDispatchConfigs[eventName]));
  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;

  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        publishRegistrationName(
          phasedRegistrationName,
          PluginModule,
          eventName
        );
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(
      dispatchConfig.registrationName,
      PluginModule,
      eventName
    );
    return true;
  }
  return false;
}

/**
 * Publishes a registration name that is used to identify dispatched events and
 * can be used with `EventPluginHub.putListener` to register listeners.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */
function publishRegistrationName(registrationName, PluginModule, eventName) {
  ("production" !== "development" ? invariant(
    !EventPluginRegistry.registrationNameModules[registrationName],
    'EventPluginHub: More than one plugin attempted to publish the same ' +
    'registration name, `%s`.',
    registrationName
  ) : invariant(!EventPluginRegistry.registrationNameModules[registrationName]));
  EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
  EventPluginRegistry.registrationNameDependencies[registrationName] =
    PluginModule.eventTypes[eventName].dependencies;
}

/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */
var EventPluginRegistry = {

  /**
   * Ordered list of injected plugins.
   */
  plugins: [],

  /**
   * Mapping from event name to dispatch config
   */
  eventNameDispatchConfigs: {},

  /**
   * Mapping from registration name to plugin module
   */
  registrationNameModules: {},

  /**
   * Mapping from registration name to event name
   */
  registrationNameDependencies: {},

  /**
   * Injects an ordering of plugins (by plugin name). This allows the ordering
   * to be decoupled from injection of the actual plugins so that ordering is
   * always deterministic regardless of packaging, on-the-fly injection, etc.
   *
   * @param {array} InjectedEventPluginOrder
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginOrder}
   */
  injectEventPluginOrder: function(InjectedEventPluginOrder) {
    ("production" !== "development" ? invariant(
      !EventPluginOrder,
      'EventPluginRegistry: Cannot inject event plugin ordering more than once.'
    ) : invariant(!EventPluginOrder));
    // Clone the ordering so it cannot be dynamically mutated.
    EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
    recomputePluginOrdering();
  },

  /**
   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
   * in the ordering injected by `injectEventPluginOrder`.
   *
   * Plugins can be injected as part of page initialization or on-the-fly.
   *
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginsByName}
   */
  injectEventPluginsByName: function(injectedNamesToPlugins) {
    var isOrderingDirty = false;
    for (var pluginName in injectedNamesToPlugins) {
      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        continue;
      }
      var PluginModule = injectedNamesToPlugins[pluginName];
      if (namesToPlugins[pluginName] !== PluginModule) {
        ("production" !== "development" ? invariant(
          !namesToPlugins[pluginName],
          'EventPluginRegistry: Cannot inject two different event plugins ' +
          'using the same name, `%s`.',
          pluginName
        ) : invariant(!namesToPlugins[pluginName]));
        namesToPlugins[pluginName] = PluginModule;
        isOrderingDirty = true;
      }
    }
    if (isOrderingDirty) {
      recomputePluginOrdering();
    }
  },

  /**
   * Looks up the plugin for the supplied event.
   *
   * @param {object} event A synthetic event.
   * @return {?object} The plugin that created the supplied event.
   * @internal
   */
  getPluginModuleForEvent: function(event) {
    var dispatchConfig = event.dispatchConfig;
    if (dispatchConfig.registrationName) {
      return EventPluginRegistry.registrationNameModules[
        dispatchConfig.registrationName
      ] || null;
    }
    for (var phase in dispatchConfig.phasedRegistrationNames) {
      if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
        continue;
      }
      var PluginModule = EventPluginRegistry.registrationNameModules[
        dispatchConfig.phasedRegistrationNames[phase]
      ];
      if (PluginModule) {
        return PluginModule;
      }
    }
    return null;
  },

  /**
   * Exposed for unit testing.
   * @private
   */
  _resetEventPlugins: function() {
    EventPluginOrder = null;
    for (var pluginName in namesToPlugins) {
      if (namesToPlugins.hasOwnProperty(pluginName)) {
        delete namesToPlugins[pluginName];
      }
    }
    EventPluginRegistry.plugins.length = 0;

    var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
    for (var eventName in eventNameDispatchConfigs) {
      if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
        delete eventNameDispatchConfigs[eventName];
      }
    }

    var registrationNameModules = EventPluginRegistry.registrationNameModules;
    for (var registrationName in registrationNameModules) {
      if (registrationNameModules.hasOwnProperty(registrationName)) {
        delete registrationNameModules[registrationName];
      }
    }
  }

};

module.exports = EventPluginRegistry;

},{"./invariant":108}],18:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventPluginUtils
 */

"use strict";

var EventConstants = require("./EventConstants");

var invariant = require("./invariant");

/**
 * Injected dependencies:
 */

/**
 * - `Mount`: [required] Module that can convert between React dom IDs and
 *   actual node references.
 */
var injection = {
  Mount: null,
  injectMount: function(InjectedMount) {
    injection.Mount = InjectedMount;
    if ("production" !== "development") {
      ("production" !== "development" ? invariant(
        InjectedMount && InjectedMount.getNode,
        'EventPluginUtils.injection.injectMount(...): Injected Mount module ' +
        'is missing getNode.'
      ) : invariant(InjectedMount && InjectedMount.getNode));
    }
  }
};

var topLevelTypes = EventConstants.topLevelTypes;

function isEndish(topLevelType) {
  return topLevelType === topLevelTypes.topMouseUp ||
         topLevelType === topLevelTypes.topTouchEnd ||
         topLevelType === topLevelTypes.topTouchCancel;
}

function isMoveish(topLevelType) {
  return topLevelType === topLevelTypes.topMouseMove ||
         topLevelType === topLevelTypes.topTouchMove;
}
function isStartish(topLevelType) {
  return topLevelType === topLevelTypes.topMouseDown ||
         topLevelType === topLevelTypes.topTouchStart;
}


var validateEventDispatches;
if ("production" !== "development") {
  validateEventDispatches = function(event) {
    var dispatchListeners = event._dispatchListeners;
    var dispatchIDs = event._dispatchIDs;

    var listenersIsArr = Array.isArray(dispatchListeners);
    var idsIsArr = Array.isArray(dispatchIDs);
    var IDsLen = idsIsArr ? dispatchIDs.length : dispatchIDs ? 1 : 0;
    var listenersLen = listenersIsArr ?
      dispatchListeners.length :
      dispatchListeners ? 1 : 0;

    ("production" !== "development" ? invariant(
      idsIsArr === listenersIsArr && IDsLen === listenersLen,
      'EventPluginUtils: Invalid `event`.'
    ) : invariant(idsIsArr === listenersIsArr && IDsLen === listenersLen));
  };
}

/**
 * Invokes `cb(event, listener, id)`. Avoids using call if no scope is
 * provided. The `(listener,id)` pair effectively forms the "dispatch" but are
 * kept separate to conserve memory.
 */
function forEachEventDispatch(event, cb) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchIDs = event._dispatchIDs;
  if ("production" !== "development") {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and IDs are two parallel arrays that are always in sync.
      cb(event, dispatchListeners[i], dispatchIDs[i]);
    }
  } else if (dispatchListeners) {
    cb(event, dispatchListeners, dispatchIDs);
  }
}

/**
 * Default implementation of PluginModule.executeDispatch().
 * @param {SyntheticEvent} SyntheticEvent to handle
 * @param {function} Application-level callback
 * @param {string} domID DOM id to pass to the callback.
 */
function executeDispatch(event, listener, domID) {
  event.currentTarget = injection.Mount.getNode(domID);
  var returnValue = listener(event, domID);
  event.currentTarget = null;
  return returnValue;
}

/**
 * Standard/simple iteration through an event's collected dispatches.
 */
function executeDispatchesInOrder(event, executeDispatch) {
  forEachEventDispatch(event, executeDispatch);
  event._dispatchListeners = null;
  event._dispatchIDs = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches, but stops
 * at the first dispatch execution returning true, and returns that id.
 *
 * @return id of the first dispatch execution who's listener returns true, or
 * null if no listener returned true.
 */
function executeDispatchesInOrderStopAtTrue(event) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchIDs = event._dispatchIDs;
  if ("production" !== "development") {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and IDs are two parallel arrays that are always in sync.
      if (dispatchListeners[i](event, dispatchIDs[i])) {
        return dispatchIDs[i];
      }
    }
  } else if (dispatchListeners) {
    if (dispatchListeners(event, dispatchIDs)) {
      return dispatchIDs;
    }
  }
  return null;
}

/**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return The return value of executing the single dispatch.
 */
function executeDirectDispatch(event) {
  if ("production" !== "development") {
    validateEventDispatches(event);
  }
  var dispatchListener = event._dispatchListeners;
  var dispatchID = event._dispatchIDs;
  ("production" !== "development" ? invariant(
    !Array.isArray(dispatchListener),
    'executeDirectDispatch(...): Invalid `event`.'
  ) : invariant(!Array.isArray(dispatchListener)));
  var res = dispatchListener ?
    dispatchListener(event, dispatchID) :
    null;
  event._dispatchListeners = null;
  event._dispatchIDs = null;
  return res;
}

/**
 * @param {SyntheticEvent} event
 * @return {bool} True iff number of dispatches accumulated is greater than 0.
 */
function hasDispatches(event) {
  return !!event._dispatchListeners;
}

/**
 * General utilities that are useful in creating custom Event Plugins.
 */
var EventPluginUtils = {
  isEndish: isEndish,
  isMoveish: isMoveish,
  isStartish: isStartish,

  executeDirectDispatch: executeDirectDispatch,
  executeDispatch: executeDispatch,
  executeDispatchesInOrder: executeDispatchesInOrder,
  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
  hasDispatches: hasDispatches,
  injection: injection,
  useTouchEvents: false
};

module.exports = EventPluginUtils;

},{"./EventConstants":14,"./invariant":108}],19:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventPropagators
 */

"use strict";

var EventConstants = require("./EventConstants");
var EventPluginHub = require("./EventPluginHub");

var accumulate = require("./accumulate");
var forEachAccumulated = require("./forEachAccumulated");

var PropagationPhases = EventConstants.PropagationPhases;
var getListener = EventPluginHub.getListener;

/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */
function listenerAtPhase(id, event, propagationPhase) {
  var registrationName =
    event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return getListener(id, registrationName);
}

/**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */
function accumulateDirectionalDispatches(domID, upwards, event) {
  if ("production" !== "development") {
    if (!domID) {
      throw new Error('Dispatching id must not be null');
    }
  }
  var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
  var listener = listenerAtPhase(domID, event, phase);
  if (listener) {
    event._dispatchListeners = accumulate(event._dispatchListeners, listener);
    event._dispatchIDs = accumulate(event._dispatchIDs, domID);
  }
}

/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We can not perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(
      event.dispatchMarker,
      accumulateDirectionalDispatches,
      event
    );
  }
}


/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */
function accumulateDispatches(id, ignoredDirection, event) {
  if (event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = getListener(id, registrationName);
    if (listener) {
      event._dispatchListeners = accumulate(event._dispatchListeners, listener);
      event._dispatchIDs = accumulate(event._dispatchIDs, id);
    }
  }
}

/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */
function accumulateDirectDispatchesSingle(event) {
  if (event && event.dispatchConfig.registrationName) {
    accumulateDispatches(event.dispatchMarker, null, event);
  }
}

function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}

function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
  EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(
    fromID,
    toID,
    accumulateDispatches,
    leave,
    enter
  );
}


function accumulateDirectDispatches(events) {
  forEachAccumulated(events, accumulateDirectDispatchesSingle);
}



/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing event a
 * single one.
 *
 * @constructor EventPropagators
 */
var EventPropagators = {
  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
  accumulateDirectDispatches: accumulateDirectDispatches,
  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
};

module.exports = EventPropagators;

},{"./EventConstants":14,"./EventPluginHub":16,"./accumulate":86,"./forEachAccumulated":98}],20:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ExecutionEnvironment
 */

/*jslint evil: true */

"use strict";

var canUseDOM = typeof window !== 'undefined';

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners:
    canUseDOM && (window.addEventListener || window.attachEvent),

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

},{}],21:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule LinkedValueUtils
 * @typechecks static-only
 */

"use strict";

var ReactPropTypes = require("./ReactPropTypes");

var invariant = require("./invariant");

var hasReadOnlyValue = {
  'button': true,
  'checkbox': true,
  'image': true,
  'hidden': true,
  'radio': true,
  'reset': true,
  'submit': true
};

function _assertSingleLink(input) {
  ("production" !== "development" ? invariant(
      input.props.checkedLink == null || input.props.valueLink == null,
      'Cannot provide a checkedLink and a valueLink. If you want to use ' +
      'checkedLink, you probably don\'t want to use valueLink and vice versa.'
  ) : invariant(input.props.checkedLink == null || input.props.valueLink == null));
}
function _assertValueLink(input) {
  _assertSingleLink(input);
  ("production" !== "development" ? invariant(
    input.props.value == null && input.props.onChange == null,
    'Cannot provide a valueLink and a value or onChange event. If you want ' +
    'to use value or onChange, you probably don\'t want to use valueLink.'
  ) : invariant(input.props.value == null && input.props.onChange == null));
}

function _assertCheckedLink(input) {
  _assertSingleLink(input);
  ("production" !== "development" ? invariant(
    input.props.checked == null && input.props.onChange == null,
    'Cannot provide a checkedLink and a checked property or onChange event. ' +
    'If you want to use checked or onChange, you probably don\'t want to ' +
    'use checkedLink'
  ) : invariant(input.props.checked == null && input.props.onChange == null));
}

/**
 * @param {SyntheticEvent} e change event to handle
 */
function _handleLinkedValueChange(e) {
  /*jshint validthis:true */
  this.props.valueLink.requestChange(e.target.value);
}

/**
  * @param {SyntheticEvent} e change event to handle
  */
function _handleLinkedCheckChange(e) {
  /*jshint validthis:true */
  this.props.checkedLink.requestChange(e.target.checked);
}

/**
 * Provide a linked `value` attribute for controlled forms. You should not use
 * this outside of the ReactDOM controlled form components.
 */
var LinkedValueUtils = {
  Mixin: {
    propTypes: {
      value: function(props, propName, componentName) {
        if ("production" !== "development") {
          if (props[propName] &&
              !hasReadOnlyValue[props.type] &&
              !props.onChange &&
              !props.readOnly &&
              !props.disabled) {
            console.warn(
              'You provided a `value` prop to a form field without an ' +
              '`onChange` handler. This will render a read-only field. If ' +
              'the field should be mutable use `defaultValue`. Otherwise, ' +
              'set either `onChange` or `readOnly`.'
            );
          }
        }
      },
      checked: function(props, propName, componentName) {
        if ("production" !== "development") {
          if (props[propName] &&
              !props.onChange &&
              !props.readOnly &&
              !props.disabled) {
            console.warn(
              'You provided a `checked` prop to a form field without an ' +
              '`onChange` handler. This will render a read-only field. If ' +
              'the field should be mutable use `defaultChecked`. Otherwise, ' +
              'set either `onChange` or `readOnly`.'
            );
          }
        }
      },
      onChange: ReactPropTypes.func
    }
  },

  /**
   * @param {ReactComponent} input Form component
   * @return {*} current value of the input either from value prop or link.
   */
  getValue: function(input) {
    if (input.props.valueLink) {
      _assertValueLink(input);
      return input.props.valueLink.value;
    }
    return input.props.value;
  },

  /**
   * @param {ReactComponent} input Form component
   * @return {*} current checked status of the input either from checked prop
   *             or link.
   */
  getChecked: function(input) {
    if (input.props.checkedLink) {
      _assertCheckedLink(input);
      return input.props.checkedLink.value;
    }
    return input.props.checked;
  },

  /**
   * @param {ReactComponent} input Form component
   * @return {function} change callback either from onChange prop or link.
   */
  getOnChange: function(input) {
    if (input.props.valueLink) {
      _assertValueLink(input);
      return _handleLinkedValueChange;
    } else if (input.props.checkedLink) {
      _assertCheckedLink(input);
      return _handleLinkedCheckChange;
    }
    return input.props.onChange;
  }
};

module.exports = LinkedValueUtils;

},{"./ReactPropTypes":64,"./invariant":108}],22:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule MobileSafariClickEventPlugin
 * @typechecks static-only
 */

"use strict";

var EventConstants = require("./EventConstants");

var emptyFunction = require("./emptyFunction");

var topLevelTypes = EventConstants.topLevelTypes;

/**
 * Mobile Safari does not fire properly bubble click events on non-interactive
 * elements, which means delegated click listeners do not fire. The workaround
 * for this bug involves attaching an empty click listener on the target node.
 *
 * This particular plugin works around the bug by attaching an empty click
 * listener on `touchstart` (which does fire on every element).
 */
var MobileSafariClickEventPlugin = {

  eventTypes: null,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {
    if (topLevelType === topLevelTypes.topTouchStart) {
      var target = nativeEvent.target;
      if (target && !target.onclick) {
        target.onclick = emptyFunction;
      }
    }
  }

};

module.exports = MobileSafariClickEventPlugin;

},{"./EventConstants":14,"./emptyFunction":95}],23:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule PooledClass
 */

"use strict";

var invariant = require("./invariant");

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function(copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function(a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function(a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fiveArgumentPooler = function(a1, a2, a3, a4, a5) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4, a5);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4, a5);
  }
};

var standardReleaser = function(instance) {
  var Klass = this;
  ("production" !== "development" ? invariant(
    instance instanceof Klass,
    'Trying to release an instance into a pool of a different type.'
  ) : invariant(instance instanceof Klass));
  if (instance.destructor) {
    instance.destructor();
  }
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances (optional).
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function(CopyConstructor, pooler) {
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fiveArgumentPooler: fiveArgumentPooler
};

module.exports = PooledClass;

},{"./invariant":108}],24:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule React
 */

"use strict";

var DOMPropertyOperations = require("./DOMPropertyOperations");
var EventPluginUtils = require("./EventPluginUtils");
var ReactChildren = require("./ReactChildren");
var ReactComponent = require("./ReactComponent");
var ReactCompositeComponent = require("./ReactCompositeComponent");
var ReactContext = require("./ReactContext");
var ReactCurrentOwner = require("./ReactCurrentOwner");
var ReactDOM = require("./ReactDOM");
var ReactDOMComponent = require("./ReactDOMComponent");
var ReactDefaultInjection = require("./ReactDefaultInjection");
var ReactInstanceHandles = require("./ReactInstanceHandles");
var ReactMount = require("./ReactMount");
var ReactMultiChild = require("./ReactMultiChild");
var ReactPerf = require("./ReactPerf");
var ReactPropTypes = require("./ReactPropTypes");
var ReactServerRendering = require("./ReactServerRendering");
var ReactTextComponent = require("./ReactTextComponent");

var onlyChild = require("./onlyChild");

ReactDefaultInjection.inject();

var React = {
  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    only: onlyChild
  },
  DOM: ReactDOM,
  PropTypes: ReactPropTypes,
  initializeTouchEvents: function(shouldUseTouch) {
    EventPluginUtils.useTouchEvents = shouldUseTouch;
  },
  createClass: ReactCompositeComponent.createClass,
  constructAndRenderComponent: ReactMount.constructAndRenderComponent,
  constructAndRenderComponentByID: ReactMount.constructAndRenderComponentByID,
  renderComponent: ReactPerf.measure(
    'React',
    'renderComponent',
    ReactMount.renderComponent
  ),
  renderComponentToString: ReactServerRendering.renderComponentToString,
  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
  isValidClass: ReactCompositeComponent.isValidClass,
  isValidComponent: ReactComponent.isValidComponent,
  withContext: ReactContext.withContext,
  __internals: {
    Component: ReactComponent,
    CurrentOwner: ReactCurrentOwner,
    DOMComponent: ReactDOMComponent,
    DOMPropertyOperations: DOMPropertyOperations,
    InstanceHandles: ReactInstanceHandles,
    Mount: ReactMount,
    MultiChild: ReactMultiChild,
    TextComponent: ReactTextComponent
  }
};

if ("production" !== "development") {
  var ExecutionEnvironment = require("./ExecutionEnvironment");
  if (ExecutionEnvironment.canUseDOM &&
      window.top === window.self &&
      navigator.userAgent.indexOf('Chrome') > -1) {
    console.debug(
      'Download the React DevTools for a better development experience: ' +
      'http://fb.me/react-devtools'
    );
  }
}

// Version exists only in the open-source version of React, not in Facebook's
// internal version.
React.version = '0.9.0';

module.exports = React;

},{"./DOMPropertyOperations":9,"./EventPluginUtils":18,"./ExecutionEnvironment":20,"./ReactChildren":25,"./ReactComponent":26,"./ReactCompositeComponent":29,"./ReactContext":30,"./ReactCurrentOwner":31,"./ReactDOM":32,"./ReactDOMComponent":34,"./ReactDefaultInjection":44,"./ReactInstanceHandles":53,"./ReactMount":55,"./ReactMultiChild":57,"./ReactPerf":60,"./ReactPropTypes":64,"./ReactServerRendering":68,"./ReactTextComponent":69,"./onlyChild":123}],25:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactChildren
 */

"use strict";

var PooledClass = require("./PooledClass");

var invariant = require("./invariant");
var traverseAllChildren = require("./traverseAllChildren");

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var threeArgumentPooler = PooledClass.threeArgumentPooler;

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.forEachFunction = forEachFunction;
  this.forEachContext = forEachContext;
}
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(traverseContext, child, name, i) {
  var forEachBookKeeping = traverseContext;
  forEachBookKeeping.forEachFunction.call(
    forEachBookKeeping.forEachContext, child, i);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc.
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }

  var traverseContext =
    ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, mapFunction, mapContext) {
  this.mapResult = mapResult;
  this.mapFunction = mapFunction;
  this.mapContext = mapContext;
}
PooledClass.addPoolingTo(MapBookKeeping, threeArgumentPooler);

function mapSingleChildIntoContext(traverseContext, child, name, i) {
  var mapBookKeeping = traverseContext;
  var mapResult = mapBookKeeping.mapResult;
  var mappedChild =
    mapBookKeeping.mapFunction.call(mapBookKeeping.mapContext, child, i);
  // We found a component instance
  ("production" !== "development" ? invariant(
    !mapResult.hasOwnProperty(name),
    'ReactChildren.map(...): Encountered two children with the same key, ' +
    '`%s`. Children keys must be unique.',
    name
  ) : invariant(!mapResult.hasOwnProperty(name)));
  mapResult[name] = mappedChild;
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * TODO: This may likely break any calls to `ReactChildren.map` that were
 * previously relying on the fact that we guarded against null children.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} mapFunction.
 * @param {*} mapContext Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }

  var mapResult = {};
  var traverseContext = MapBookKeeping.getPooled(mapResult, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
  return mapResult;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren
};

module.exports = ReactChildren;

},{"./PooledClass":23,"./invariant":108,"./traverseAllChildren":128}],26:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactComponent
 */

"use strict";

var ReactComponentEnvironment = require("./ReactComponentEnvironment");
var ReactCurrentOwner = require("./ReactCurrentOwner");
var ReactOwner = require("./ReactOwner");
var ReactUpdates = require("./ReactUpdates");

var invariant = require("./invariant");
var keyMirror = require("./keyMirror");
var merge = require("./merge");

/**
 * Every React component is in one of these life cycles.
 */
var ComponentLifeCycle = keyMirror({
  /**
   * Mounted components have a DOM node representation and are capable of
   * receiving new props.
   */
  MOUNTED: null,
  /**
   * Unmounted components are inactive and cannot receive new props.
   */
  UNMOUNTED: null
});

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */

var ownerHasExplicitKeyWarning = {};
var ownerHasPropertyWarning = {};

var NUMERIC_PROPERTY_REGEX = /^\d+$/;

/**
 * Warn if the component doesn't have an explicit key assigned to it.
 * This component is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it.
 *
 * @internal
 * @param {ReactComponent} component Component that requires a key.
 */
function validateExplicitKey(component) {
  if (component.__keyValidated__ || component.props.key != null) {
    return;
  }
  component.__keyValidated__ = true;

  // We can't provide friendly warnings for top level components.
  if (!ReactCurrentOwner.current) {
    return;
  }

  // Name of the component whose render method tried to pass children.
  var currentName = ReactCurrentOwner.current.constructor.displayName;
  if (ownerHasExplicitKeyWarning.hasOwnProperty(currentName)) {
    return;
  }
  ownerHasExplicitKeyWarning[currentName] = true;

  var message = 'Each child in an array should have a unique "key" prop. ' +
                'Check the render method of ' + currentName + '.';
  if (!component.isOwnedBy(ReactCurrentOwner.current)) {
    // Name of the component that originally created this child.
    var childOwnerName =
      component._owner &&
      component._owner.constructor.displayName;

    // Usually the current owner is the offender, but if it accepts
    // children as a property, it may be the creator of the child that's
    // responsible for assigning it a key.
    message += ' It was passed a child from ' + childOwnerName + '.';
  }

  message += ' See http://fb.me/react-warning-keys for more information.';
  console.warn(message);
}

/**
 * Warn if the key is being defined as an object property but has an incorrect
 * value.
 *
 * @internal
 * @param {string} name Property name of the key.
 * @param {ReactComponent} component Component that requires a key.
 */
function validatePropertyKey(name) {
  if (NUMERIC_PROPERTY_REGEX.test(name)) {
    // Name of the component whose render method tried to pass children.
    var currentName = ReactCurrentOwner.current.constructor.displayName;
    if (ownerHasPropertyWarning.hasOwnProperty(currentName)) {
      return;
    }
    ownerHasPropertyWarning[currentName] = true;

    console.warn(
      'Child objects should have non-numeric keys so ordering is preserved. ' +
      'Check the render method of ' + currentName + '. ' +
      'See http://fb.me/react-warning-keys for more information.'
    );
  }
}

/**
 * Ensure that every component either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {*} component Statically passed child of any type.
 * @return {boolean}
 */
function validateChildKeys(component) {
  if (Array.isArray(component)) {
    for (var i = 0; i < component.length; i++) {
      var child = component[i];
      if (ReactComponent.isValidComponent(child)) {
        validateExplicitKey(child);
      }
    }
  } else if (ReactComponent.isValidComponent(component)) {
    // This component was passed in a valid location.
    component.__keyValidated__ = true;
  } else if (component && typeof component === 'object') {
    for (var name in component) {
      validatePropertyKey(name, component);
    }
  }
}

/**
 * Components are the basic units of composition in React.
 *
 * Every component accepts a set of keyed input parameters known as "props" that
 * are initialized by the constructor. Once a component is mounted, the props
 * can be mutated using `setProps` or `replaceProps`.
 *
 * Every component is capable of the following operations:
 *
 *   `mountComponent`
 *     Initializes the component, renders markup, and registers event listeners.
 *
 *   `receiveComponent`
 *     Updates the rendered DOM nodes to match the given component.
 *
 *   `unmountComponent`
 *     Releases any resources allocated by this component.
 *
 * Components can also be "owned" by other components. Being owned by another
 * component means being constructed by that component. This is different from
 * being the child of a component, which means having a DOM representation that
 * is a child of the DOM representation of that component.
 *
 * @class ReactComponent
 */
var ReactComponent = {

  /**
   * @param {?object} object
   * @return {boolean} True if `object` is a valid component.
   * @final
   */
  isValidComponent: function(object) {
    if (!object || !object.type || !object.type.prototype) {
      return false;
    }
    // This is the safer way of duck checking the type of instance this is.
    // The object can be a generic descriptor but the type property refers to
    // the constructor and it's prototype can be used to inspect the type that
    // will actually get mounted.
    var prototype = object.type.prototype;
    return (
      typeof prototype.mountComponentIntoNode === 'function' &&
      typeof prototype.receiveComponent === 'function'
    );
  },

  /**
   * @internal
   */
  LifeCycle: ComponentLifeCycle,

  /**
   * Injected module that provides ability to mutate individual properties.
   * Injected into the base class because many different subclasses need access
   * to this.
   *
   * @internal
   */
  BackendIDOperations: ReactComponentEnvironment.BackendIDOperations,

  /**
   * Optionally injectable environment dependent cleanup hook. (server vs.
   * browser etc). Example: A browser system caches DOM nodes based on component
   * ID and must remove that cache entry when this instance is unmounted.
   *
   * @private
   */
  unmountIDFromEnvironment: ReactComponentEnvironment.unmountIDFromEnvironment,

  /**
   * The "image" of a component tree, is the platform specific (typically
   * serialized) data that represents a tree of lower level UI building blocks.
   * On the web, this "image" is HTML markup which describes a construction of
   * low level `div` and `span` nodes. Other platforms may have different
   * encoding of this "image". This must be injected.
   *
   * @private
   */
  mountImageIntoNode: ReactComponentEnvironment.mountImageIntoNode,

  /**
   * React references `ReactReconcileTransaction` using this property in order
   * to allow dependency injection.
   *
   * @internal
   */
  ReactReconcileTransaction:
    ReactComponentEnvironment.ReactReconcileTransaction,

  /**
   * Base functionality for every ReactComponent constructor. Mixed into the
   * `ReactComponent` prototype, but exposed statically for easy access.
   *
   * @lends {ReactComponent.prototype}
   */
  Mixin: merge(ReactComponentEnvironment.Mixin, {

    /**
     * Checks whether or not this component is mounted.
     *
     * @return {boolean} True if mounted, false otherwise.
     * @final
     * @protected
     */
    isMounted: function() {
      return this._lifeCycleState === ComponentLifeCycle.MOUNTED;
    },

    /**
     * Sets a subset of the props.
     *
     * @param {object} partialProps Subset of the next props.
     * @param {?function} callback Called after props are updated.
     * @final
     * @public
     */
    setProps: function(partialProps, callback) {
      // Merge with `_pendingProps` if it exists, otherwise with existing props.
      this.replaceProps(
        merge(this._pendingProps || this.props, partialProps),
        callback
      );
    },

    /**
     * Replaces all of the props.
     *
     * @param {object} props New props.
     * @param {?function} callback Called after props are updated.
     * @final
     * @public
     */
    replaceProps: function(props, callback) {
      ("production" !== "development" ? invariant(
        this.isMounted(),
        'replaceProps(...): Can only update a mounted component.'
      ) : invariant(this.isMounted()));
      ("production" !== "development" ? invariant(
        this._mountDepth === 0,
        'replaceProps(...): You called `setProps` or `replaceProps` on a ' +
        'component with a parent. This is an anti-pattern since props will ' +
        'get reactively updated when rendered. Instead, change the owner\'s ' +
        '`render` method to pass the correct value as props to the component ' +
        'where it is created.'
      ) : invariant(this._mountDepth === 0));
      this._pendingProps = props;
      ReactUpdates.enqueueUpdate(this, callback);
    },

    /**
     * Base constructor for all React components.
     *
     * Subclasses that override this method should make sure to invoke
     * `ReactComponent.Mixin.construct.call(this, ...)`.
     *
     * @param {?object} initialProps
     * @param {*} children
     * @internal
     */
    construct: function(initialProps, children) {
      this.props = initialProps || {};
      // Record the component responsible for creating this component.
      this._owner = ReactCurrentOwner.current;
      // All components start unmounted.
      this._lifeCycleState = ComponentLifeCycle.UNMOUNTED;

      this._pendingProps = null;
      this._pendingCallbacks = null;

      // Unlike _pendingProps and _pendingCallbacks, we won't use null to
      // indicate that nothing is pending because it's possible for a component
      // to have a null owner. Instead, an owner change is pending when
      // this._owner !== this._pendingOwner.
      this._pendingOwner = this._owner;

      // Children can be more than one argument
      var childrenLength = arguments.length - 1;
      if (childrenLength === 1) {
        if ("production" !== "development") {
          validateChildKeys(children);
        }
        this.props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          if ("production" !== "development") {
            validateChildKeys(arguments[i + 1]);
          }
          childArray[i] = arguments[i + 1];
        }
        this.props.children = childArray;
      }
    },

    /**
     * Initializes the component, renders markup, and registers event listeners.
     *
     * NOTE: This does not insert any nodes into the DOM.
     *
     * Subclasses that override this method should make sure to invoke
     * `ReactComponent.Mixin.mountComponent.call(this, ...)`.
     *
     * @param {string} rootID DOM ID of the root node.
     * @param {ReactReconcileTransaction} transaction
     * @param {number} mountDepth number of components in the owner hierarchy.
     * @return {?string} Rendered markup to be inserted into the DOM.
     * @internal
     */
    mountComponent: function(rootID, transaction, mountDepth) {
      ("production" !== "development" ? invariant(
        !this.isMounted(),
        'mountComponent(%s, ...): Can only mount an unmounted component. ' +
        'Make sure to avoid storing components between renders or reusing a ' +
        'single component instance in multiple places.',
        rootID
      ) : invariant(!this.isMounted()));
      var props = this.props;
      if (props.ref != null) {
        ReactOwner.addComponentAsRefTo(this, props.ref, this._owner);
      }
      this._rootNodeID = rootID;
      this._lifeCycleState = ComponentLifeCycle.MOUNTED;
      this._mountDepth = mountDepth;
      // Effectively: return '';
    },

    /**
     * Releases any resources allocated by `mountComponent`.
     *
     * NOTE: This does not remove any nodes from the DOM.
     *
     * Subclasses that override this method should make sure to invoke
     * `ReactComponent.Mixin.unmountComponent.call(this)`.
     *
     * @internal
     */
    unmountComponent: function() {
      ("production" !== "development" ? invariant(
        this.isMounted(),
        'unmountComponent(): Can only unmount a mounted component.'
      ) : invariant(this.isMounted()));
      var props = this.props;
      if (props.ref != null) {
        ReactOwner.removeComponentAsRefFrom(this, props.ref, this._owner);
      }
      ReactComponent.unmountIDFromEnvironment(this._rootNodeID);
      this._rootNodeID = null;
      this._lifeCycleState = ComponentLifeCycle.UNMOUNTED;
    },

    /**
     * Given a new instance of this component, updates the rendered DOM nodes
     * as if that instance was rendered instead.
     *
     * Subclasses that override this method should make sure to invoke
     * `ReactComponent.Mixin.receiveComponent.call(this, ...)`.
     *
     * @param {object} nextComponent Next set of properties.
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    receiveComponent: function(nextComponent, transaction) {
      ("production" !== "development" ? invariant(
        this.isMounted(),
        'receiveComponent(...): Can only update a mounted component.'
      ) : invariant(this.isMounted()));
      this._pendingOwner = nextComponent._owner;
      this._pendingProps = nextComponent.props;
      this._performUpdateIfNecessary(transaction);
    },

    /**
     * Call `_performUpdateIfNecessary` within a new transaction.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    performUpdateIfNecessary: function() {
      var transaction = ReactComponent.ReactReconcileTransaction.getPooled();
      transaction.perform(this._performUpdateIfNecessary, this, transaction);
      ReactComponent.ReactReconcileTransaction.release(transaction);
    },

    /**
     * If `_pendingProps` is set, update the component.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    _performUpdateIfNecessary: function(transaction) {
      if (this._pendingProps == null) {
        return;
      }
      var prevProps = this.props;
      var prevOwner = this._owner;
      this.props = this._pendingProps;
      this._owner = this._pendingOwner;
      this._pendingProps = null;
      this.updateComponent(transaction, prevProps, prevOwner);
    },

    /**
     * Updates the component's currently mounted representation.
     *
     * @param {ReactReconcileTransaction} transaction
     * @param {object} prevProps
     * @internal
     */
    updateComponent: function(transaction, prevProps, prevOwner) {
      var props = this.props;
      // If either the owner or a `ref` has changed, make sure the newest owner
      // has stored a reference to `this`, and the previous owner (if different)
      // has forgotten the reference to `this`.
      if (this._owner !== prevOwner || props.ref !== prevProps.ref) {
        if (prevProps.ref != null) {
          ReactOwner.removeComponentAsRefFrom(
            this, prevProps.ref, prevOwner
          );
        }
        // Correct, even if the owner is the same, and only the ref has changed.
        if (props.ref != null) {
          ReactOwner.addComponentAsRefTo(this, props.ref, this._owner);
        }
      }
    },

    /**
     * Mounts this component and inserts it into the DOM.
     *
     * @param {string} rootID DOM ID of the root node.
     * @param {DOMElement} container DOM element to mount into.
     * @param {boolean} shouldReuseMarkup If true, do not insert markup
     * @final
     * @internal
     * @see {ReactMount.renderComponent}
     */
    mountComponentIntoNode: function(rootID, container, shouldReuseMarkup) {
      var transaction = ReactComponent.ReactReconcileTransaction.getPooled();
      transaction.perform(
        this._mountComponentIntoNode,
        this,
        rootID,
        container,
        transaction,
        shouldReuseMarkup
      );
      ReactComponent.ReactReconcileTransaction.release(transaction);
    },

    /**
     * @param {string} rootID DOM ID of the root node.
     * @param {DOMElement} container DOM element to mount into.
     * @param {ReactReconcileTransaction} transaction
     * @param {boolean} shouldReuseMarkup If true, do not insert markup
     * @final
     * @private
     */
    _mountComponentIntoNode: function(
        rootID,
        container,
        transaction,
        shouldReuseMarkup) {
      var markup = this.mountComponent(rootID, transaction, 0);
      ReactComponent.mountImageIntoNode(markup, container, shouldReuseMarkup);
    },

    /**
     * Checks if this component is owned by the supplied `owner` component.
     *
     * @param {ReactComponent} owner Component to check.
     * @return {boolean} True if `owners` owns this component.
     * @final
     * @internal
     */
    isOwnedBy: function(owner) {
      return this._owner === owner;
    },

    /**
     * Gets another component, that shares the same owner as this one, by ref.
     *
     * @param {string} ref of a sibling Component.
     * @return {?ReactComponent} the actual sibling Component.
     * @final
     * @internal
     */
    getSiblingByRef: function(ref) {
      var owner = this._owner;
      if (!owner || !owner.refs) {
        return null;
      }
      return owner.refs[ref];
    }
  })
};

module.exports = ReactComponent;

},{"./ReactComponentEnvironment":28,"./ReactCurrentOwner":31,"./ReactOwner":59,"./ReactUpdates":70,"./invariant":108,"./keyMirror":114,"./merge":117}],27:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactComponentBrowserEnvironment
 */

/*jslint evil: true */

"use strict";

var ReactDOMIDOperations = require("./ReactDOMIDOperations");
var ReactMarkupChecksum = require("./ReactMarkupChecksum");
var ReactMount = require("./ReactMount");
var ReactPerf = require("./ReactPerf");
var ReactReconcileTransaction = require("./ReactReconcileTransaction");

var getReactRootElementInContainer = require("./getReactRootElementInContainer");
var invariant = require("./invariant");


var ELEMENT_NODE_TYPE = 1;
var DOC_NODE_TYPE = 9;


/**
 * Abstracts away all functionality of `ReactComponent` requires knowledge of
 * the browser context.
 */
var ReactComponentBrowserEnvironment = {
  /**
   * Mixed into every component instance.
   */
  Mixin: {
    /**
     * Returns the DOM node rendered by this component.
     *
     * @return {DOMElement} The root node of this component.
     * @final
     * @protected
     */
    getDOMNode: function() {
      ("production" !== "development" ? invariant(
        this.isMounted(),
        'getDOMNode(): A component must be mounted to have a DOM node.'
      ) : invariant(this.isMounted()));
      return ReactMount.getNode(this._rootNodeID);
    }
  },

  ReactReconcileTransaction: ReactReconcileTransaction,

  BackendIDOperations: ReactDOMIDOperations,

  /**
   * If a particular environment requires that some resources be cleaned up,
   * specify this in the injected Mixin. In the DOM, we would likely want to
   * purge any cached node ID lookups.
   *
   * @private
   */
  unmountIDFromEnvironment: function(rootNodeID) {
    ReactMount.purgeID(rootNodeID);
  },

  /**
   * @param {string} markup Markup string to place into the DOM Element.
   * @param {DOMElement} container DOM Element to insert markup into.
   * @param {boolean} shouldReuseMarkup Should reuse the existing markup in the
   * container if possible.
   */
  mountImageIntoNode: ReactPerf.measure(
    'ReactComponentBrowserEnvironment',
    'mountImageIntoNode',
    function(markup, container, shouldReuseMarkup) {
      ("production" !== "development" ? invariant(
        container && (
          container.nodeType === ELEMENT_NODE_TYPE ||
            container.nodeType === DOC_NODE_TYPE
        ),
        'mountComponentIntoNode(...): Target container is not valid.'
      ) : invariant(container && (
        container.nodeType === ELEMENT_NODE_TYPE ||
          container.nodeType === DOC_NODE_TYPE
      )));

      if (shouldReuseMarkup) {
        if (ReactMarkupChecksum.canReuseMarkup(
          markup,
          getReactRootElementInContainer(container))) {
          return;
        } else {
          ("production" !== "development" ? invariant(
            container.nodeType !== DOC_NODE_TYPE,
            'You\'re trying to render a component to the document using ' +
            'server rendering but the checksum was invalid. This usually ' +
            'means you rendered a different component type or props on ' +
            'the client from the one on the server, or your render() ' +
            'methods are impure. React cannot handle this case due to ' +
            'cross-browser quirks by rendering at the document root. You ' +
            'should look for environment dependent code in your components ' +
            'and ensure the props are the same client and server side.'
          ) : invariant(container.nodeType !== DOC_NODE_TYPE));

          if ("production" !== "development") {
            console.warn(
              'React attempted to use reuse markup in a container but the ' +
              'checksum was invalid. This generally means that you are ' +
              'using server rendering and the markup generated on the ' +
              'server was not what the client was expecting. React injected' +
              'new markup to compensate which works but you have lost many ' +
              'of the benefits of server rendering. Instead, figure out ' +
              'why the markup being generated is different on the client ' +
              'or server.'
            );
          }
        }
      }

      ("production" !== "development" ? invariant(
        container.nodeType !== DOC_NODE_TYPE,
        'You\'re trying to render a component to the document but ' +
          'you didn\'t use server rendering. We can\'t do this ' +
          'without using server rendering due to cross-browser quirks. ' +
          'See renderComponentToString() for server rendering.'
      ) : invariant(container.nodeType !== DOC_NODE_TYPE));

      // Asynchronously inject markup by ensuring that the container is not in
      // the document when settings its `innerHTML`.
      var parent = container.parentNode;
      if (parent) {
        var next = container.nextSibling;
        parent.removeChild(container);
        container.innerHTML = markup;
        if (next) {
          parent.insertBefore(container, next);
        } else {
          parent.appendChild(container);
        }
      } else {
        container.innerHTML = markup;
      }
    }
  )
};

module.exports = ReactComponentBrowserEnvironment;

},{"./ReactDOMIDOperations":36,"./ReactMarkupChecksum":54,"./ReactMount":55,"./ReactPerf":60,"./ReactReconcileTransaction":66,"./getReactRootElementInContainer":104,"./invariant":108}],28:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactComponentEnvironment
 */

"use strict";

var ReactComponentBrowserEnvironment =
  require("./ReactComponentBrowserEnvironment");

var ReactComponentEnvironment = ReactComponentBrowserEnvironment;

module.exports = ReactComponentEnvironment;

},{"./ReactComponentBrowserEnvironment":27}],29:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactCompositeComponent
 */

"use strict";

var ReactComponent = require("./ReactComponent");
var ReactContext = require("./ReactContext");
var ReactCurrentOwner = require("./ReactCurrentOwner");
var ReactErrorUtils = require("./ReactErrorUtils");
var ReactOwner = require("./ReactOwner");
var ReactPerf = require("./ReactPerf");
var ReactPropTransferer = require("./ReactPropTransferer");
var ReactPropTypeLocations = require("./ReactPropTypeLocations");
var ReactPropTypeLocationNames = require("./ReactPropTypeLocationNames");
var ReactUpdates = require("./ReactUpdates");

var invariant = require("./invariant");
var keyMirror = require("./keyMirror");
var merge = require("./merge");
var mixInto = require("./mixInto");
var objMap = require("./objMap");
var shouldUpdateReactComponent = require("./shouldUpdateReactComponent");

/**
 * Policies that describe methods in `ReactCompositeComponentInterface`.
 */
var SpecPolicy = keyMirror({
  /**
   * These methods may be defined only once by the class specification or mixin.
   */
  DEFINE_ONCE: null,
  /**
   * These methods may be defined by both the class specification and mixins.
   * Subsequent definitions will be chained. These methods must return void.
   */
  DEFINE_MANY: null,
  /**
   * These methods are overriding the base ReactCompositeComponent class.
   */
  OVERRIDE_BASE: null,
  /**
   * These methods are similar to DEFINE_MANY, except we assume they return
   * objects. We try to merge the keys of the return values of all the mixed in
   * functions. If there is a key conflict we throw.
   */
  DEFINE_MANY_MERGED: null
});

/**
 * Composite components are higher-level components that compose other composite
 * or native components.
 *
 * To create a new type of `ReactCompositeComponent`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactCompositeComponentInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will available on the prototype.
 *
 * @interface ReactCompositeComponentInterface
 * @internal
 */
var ReactCompositeComponentInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
  mixins: SpecPolicy.DEFINE_MANY,

  /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   *
   * @type {object}
   * @optional
   */
  statics: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */
  propTypes: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of context types for this component.
   *
   * @type {object}
   * @optional
   */
  contextTypes: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of context types this component sets for its children.
   *
   * @type {object}
   * @optional
   */
  childContextTypes: SpecPolicy.DEFINE_MANY,

  // ==== Definition methods ====

  /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */
  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * @return {object}
   * @optional
   */
  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @nosideeffects
   * @required
   */
  render: SpecPolicy.DEFINE_ONCE,



  // ==== Delegate methods ====

  /**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */
  componentWillMount: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidMount: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */
  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */
  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

  /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
  componentWillUpdate: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidUpdate: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */
  componentWillUnmount: SpecPolicy.DEFINE_MANY,



  // ==== Advanced methods ====

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
  updateComponent: SpecPolicy.OVERRIDE_BASE

};

/**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared like instance properties in the specification
 * when defining classes using `React.createClass`, they are actually static
 * and are accessible on the constructor instead of the prototype. Despite
 * being static, they must be defined outside of the "statics" key under
 * which all other static methods are defined.
 */
var RESERVED_SPEC_KEYS = {
  displayName: function(ConvenienceConstructor, displayName) {
    ConvenienceConstructor.componentConstructor.displayName = displayName;
  },
  mixins: function(ConvenienceConstructor, mixins) {
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        mixSpecIntoComponent(ConvenienceConstructor, mixins[i]);
      }
    }
  },
  childContextTypes: function(ConvenienceConstructor, childContextTypes) {
    var Constructor = ConvenienceConstructor.componentConstructor;
    validateTypeDef(
      Constructor,
      childContextTypes,
      ReactPropTypeLocations.childContext
    );
    Constructor.childContextTypes = merge(
      Constructor.childContextTypes,
      childContextTypes
    );
  },
  contextTypes: function(ConvenienceConstructor, contextTypes) {
    var Constructor = ConvenienceConstructor.componentConstructor;
    validateTypeDef(
      Constructor,
      contextTypes,
      ReactPropTypeLocations.context
    );
    Constructor.contextTypes = merge(Constructor.contextTypes, contextTypes);
  },
  propTypes: function(ConvenienceConstructor, propTypes) {
    var Constructor = ConvenienceConstructor.componentConstructor;
    validateTypeDef(
      Constructor,
      propTypes,
      ReactPropTypeLocations.prop
    );
    Constructor.propTypes = merge(Constructor.propTypes, propTypes);
  },
  statics: function(ConvenienceConstructor, statics) {
    mixStaticSpecIntoComponent(ConvenienceConstructor, statics);
  }
};

function validateTypeDef(Constructor, typeDef, location) {
  for (var propName in typeDef) {
    if (typeDef.hasOwnProperty(propName)) {
      ("production" !== "development" ? invariant(
        typeof typeDef[propName] == 'function',
        '%s: %s type `%s` is invalid; it must be a function, usually from ' +
        'React.PropTypes.',
        Constructor.displayName || 'ReactCompositeComponent',
        ReactPropTypeLocationNames[location],
        propName
      ) : invariant(typeof typeDef[propName] == 'function'));
    }
  }
}

function validateMethodOverride(proto, name) {
  var specPolicy = ReactCompositeComponentInterface[name];

  // Disallow overriding of base class methods unless explicitly allowed.
  if (ReactCompositeComponentMixin.hasOwnProperty(name)) {
    ("production" !== "development" ? invariant(
      specPolicy === SpecPolicy.OVERRIDE_BASE,
      'ReactCompositeComponentInterface: You are attempting to override ' +
      '`%s` from your class specification. Ensure that your method names ' +
      'do not overlap with React methods.',
      name
    ) : invariant(specPolicy === SpecPolicy.OVERRIDE_BASE));
  }

  // Disallow defining methods more than once unless explicitly allowed.
  if (proto.hasOwnProperty(name)) {
    ("production" !== "development" ? invariant(
      specPolicy === SpecPolicy.DEFINE_MANY ||
      specPolicy === SpecPolicy.DEFINE_MANY_MERGED,
      'ReactCompositeComponentInterface: You are attempting to define ' +
      '`%s` on your component more than once. This conflict may be due ' +
      'to a mixin.',
      name
    ) : invariant(specPolicy === SpecPolicy.DEFINE_MANY ||
    specPolicy === SpecPolicy.DEFINE_MANY_MERGED));
  }
}

function validateLifeCycleOnReplaceState(instance) {
  var compositeLifeCycleState = instance._compositeLifeCycleState;
  ("production" !== "development" ? invariant(
    instance.isMounted() ||
      compositeLifeCycleState === CompositeLifeCycle.MOUNTING,
    'replaceState(...): Can only update a mounted or mounting component.'
  ) : invariant(instance.isMounted() ||
    compositeLifeCycleState === CompositeLifeCycle.MOUNTING));
  ("production" !== "development" ? invariant(compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_STATE,
    'replaceState(...): Cannot update during an existing state transition ' +
    '(such as within `render`). This could potentially cause an infinite ' +
    'loop so it is forbidden.'
  ) : invariant(compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_STATE));
  ("production" !== "development" ? invariant(compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING,
    'replaceState(...): Cannot update while unmounting component. This ' +
    'usually means you called setState() on an unmounted component.'
  ) : invariant(compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING));
}

/**
 * Custom version of `mixInto` which handles policy validation and reserved
 * specification keys when building `ReactCompositeComponent` classses.
 */
function mixSpecIntoComponent(ConvenienceConstructor, spec) {
  ("production" !== "development" ? invariant(
    !isValidClass(spec),
    'ReactCompositeComponent: You\'re attempting to ' +
    'use a component class as a mixin. Instead, just use a regular object.'
  ) : invariant(!isValidClass(spec)));
  ("production" !== "development" ? invariant(
    !ReactComponent.isValidComponent(spec),
    'ReactCompositeComponent: You\'re attempting to ' +
    'use a component as a mixin. Instead, just use a regular object.'
  ) : invariant(!ReactComponent.isValidComponent(spec)));

  var Constructor = ConvenienceConstructor.componentConstructor;
  var proto = Constructor.prototype;
  for (var name in spec) {
    var property = spec[name];
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    validateMethodOverride(proto, name);

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](ConvenienceConstructor, property);
    } else {
      // Setup methods on prototype:
      // The following member methods should not be automatically bound:
      // 1. Expected ReactCompositeComponent methods (in the "interface").
      // 2. Overridden methods (that were mixed in).
      var isCompositeComponentMethod = name in ReactCompositeComponentInterface;
      var isInherited = name in proto;
      var markedDontBind = property && property.__reactDontBind;
      var isFunction = typeof property === 'function';
      var shouldAutoBind =
        isFunction &&
        !isCompositeComponentMethod &&
        !isInherited &&
        !markedDontBind;

      if (shouldAutoBind) {
        if (!proto.__reactAutoBindMap) {
          proto.__reactAutoBindMap = {};
        }
        proto.__reactAutoBindMap[name] = property;
        proto[name] = property;
      } else {
        if (isInherited) {
          // For methods which are defined more than once, call the existing
          // methods before calling the new property.
          if (ReactCompositeComponentInterface[name] ===
              SpecPolicy.DEFINE_MANY_MERGED) {
            proto[name] = createMergedResultFunction(proto[name], property);
          } else {
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property;
        }
      }
    }
  }
}

function mixStaticSpecIntoComponent(ConvenienceConstructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name) || !property) {
      return;
    }

    var isInherited = name in ConvenienceConstructor;
    var result = property;
    if (isInherited) {
      var existingProperty = ConvenienceConstructor[name];
      var existingType = typeof existingProperty;
      var propertyType = typeof property;
      ("production" !== "development" ? invariant(
        existingType === 'function' && propertyType === 'function',
        'ReactCompositeComponent: You are attempting to define ' +
        '`%s` on your component more than once, but that is only supported ' +
        'for functions, which are chained together. This conflict may be ' +
        'due to a mixin.',
        name
      ) : invariant(existingType === 'function' && propertyType === 'function'));
      result = createChainedFunction(existingProperty, property);
    }
    ConvenienceConstructor[name] = result;
    ConvenienceConstructor.componentConstructor[name] = result;
  }
}

/**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
function mergeObjectsWithNoDuplicateKeys(one, two) {
  ("production" !== "development" ? invariant(
    one && two && typeof one === 'object' && typeof two === 'object',
    'mergeObjectsWithNoDuplicateKeys(): Cannot merge non-objects'
  ) : invariant(one && two && typeof one === 'object' && typeof two === 'object'));

  objMap(two, function(value, key) {
    ("production" !== "development" ? invariant(
      one[key] === undefined,
      'mergeObjectsWithNoDuplicateKeys(): ' +
      'Tried to merge two objects with the same key: %s',
      key
    ) : invariant(one[key] === undefined));
    one[key] = value;
  });
  return one;
}

/**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createMergedResultFunction(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    return mergeObjectsWithNoDuplicateKeys(a, b);
  };
}

/**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createChainedFunction(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

if ("production" !== "development") {

  var unmountedPropertyWhitelist = {
    constructor: true,
    construct: true,
    isOwnedBy: true, // should be deprecated but can have code mod (internal)
    mountComponent: true,
    mountComponentIntoNode: true,
    props: true,
    type: true,
    _checkPropTypes: true,
    _mountComponentIntoNode: true,
    _processContext: true
  };

  var hasWarnedOnComponentType = {};

  var warnIfUnmounted = function(instance, key) {
    if (instance.__hasBeenMounted) {
      return;
    }
    var name = instance.constructor.displayName || 'Unknown';
    var owner = ReactCurrentOwner.current;
    var ownerName = (owner && owner.constructor.displayName) || 'Unknown';
    var warningKey = key + '|' + name + '|' + ownerName;
    if (hasWarnedOnComponentType.hasOwnProperty(warningKey)) {
      // We have already warned for this combination. Skip it this time.
      return;
    }
    hasWarnedOnComponentType[warningKey] = true;

    var context = owner ? ' in ' + ownerName + '.' : ' at the top level.';
    var staticMethodExample = '<' + name + ' />.type.' + key + '(...)';

    console.warn(
      'Invalid access to component property "' + key + '" on ' + name +
      context + ' See http://fb.me/react-warning-descriptors .' +
      ' Use a static method instead: ' + staticMethodExample
    );
  };

  var defineMembraneProperty = function(membrane, prototype, key) {
    Object.defineProperty(membrane, key, {

      configurable: false,
      enumerable: true,

      get: function() {
        if (this !== membrane) {
          // When this is accessed through a prototype chain we need to check if
          // this component was mounted.
          warnIfUnmounted(this, key);
        }
        return prototype[key];
      },

      set: function(value) {
        if (this !== membrane) {
          // When this is accessed through a prototype chain, we first check if
          // this component was mounted. Then we define a value on "this"
          // instance, effectively disabling the membrane on that prototype
          // chain.
          warnIfUnmounted(this, key);
          Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value
          });
        } else {
          // Otherwise, this should modify the prototype
          prototype[key] = value;
        }
      }

    });
  };

  /**
   * Creates a membrane prototype which wraps the original prototype. If any
   * property is accessed in an unmounted state, a warning is issued.
   *
   * @param {object} prototype Original prototype.
   * @return {object} The membrane prototype.
   * @private
   */
  var createMountWarningMembrane = function(prototype) {
    try {
      var membrane = Object.create(prototype);
      for (var key in prototype) {
        if (unmountedPropertyWhitelist.hasOwnProperty(key)) {
          continue;
        }
        defineMembraneProperty(membrane, prototype, key);
      }

      membrane.mountComponent = function() {
        this.__hasBeenMounted = true;
        return prototype.mountComponent.apply(this, arguments);
      };

      return membrane;
    } catch(x) {
      // In IE8 define property will fail on non-DOM objects. If anything in
      // the membrane creation fails, we'll bail out and just use the prototype
      // without warnings.
      return prototype;
    }
  };

}

/**
 * `ReactCompositeComponent` maintains an auxiliary life cycle state in
 * `this._compositeLifeCycleState` (which can be null).
 *
 * This is different from the life cycle state maintained by `ReactComponent` in
 * `this._lifeCycleState`. The following diagram shows how the states overlap in
 * time. There are times when the CompositeLifeCycle is null - at those times it
 * is only meaningful to look at ComponentLifeCycle alone.
 *
 * Top Row: ReactComponent.ComponentLifeCycle
 * Low Row: ReactComponent.CompositeLifeCycle
 *
 * +-------+------------------------------------------------------+--------+
 * |  UN   |                    MOUNTED                           |   UN   |
 * |MOUNTED|                                                      | MOUNTED|
 * +-------+------------------------------------------------------+--------+
 * |       ^--------+   +------+   +------+   +------+   +--------^        |
 * |       |        |   |      |   |      |   |      |   |        |        |
 * |    0--|MOUNTING|-0-|RECEIV|-0-|RECEIV|-0-|RECEIV|-0-|   UN   |--->0   |
 * |       |        |   |PROPS |   | PROPS|   | STATE|   |MOUNTING|        |
 * |       |        |   |      |   |      |   |      |   |        |        |
 * |       |        |   |      |   |      |   |      |   |        |        |
 * |       +--------+   +------+   +------+   +------+   +--------+        |
 * |       |                                                      |        |
 * +-------+------------------------------------------------------+--------+
 */
var CompositeLifeCycle = keyMirror({
  /**
   * Components in the process of being mounted respond to state changes
   * differently.
   */
  MOUNTING: null,
  /**
   * Components in the process of being unmounted are guarded against state
   * changes.
   */
  UNMOUNTING: null,
  /**
   * Components that are mounted and receiving new props respond to state
   * changes differently.
   */
  RECEIVING_PROPS: null,
  /**
   * Components that are mounted and receiving new state are guarded against
   * additional state changes.
   */
  RECEIVING_STATE: null
});

/**
 * @lends {ReactCompositeComponent.prototype}
 */
var ReactCompositeComponentMixin = {

  /**
   * Base constructor for all composite component.
   *
   * @param {?object} initialProps
   * @param {*} children
   * @final
   * @internal
   */
  construct: function(initialProps, children) {
    // Children can be either an array or more than one argument
    ReactComponent.Mixin.construct.apply(this, arguments);

    this.state = null;
    this._pendingState = null;

    this.context = this._processContext(ReactContext.current);
    this._currentContext = ReactContext.current;
    this._pendingContext = null;

    this._compositeLifeCycleState = null;
  },

  /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function() {
    return ReactComponent.Mixin.isMounted.call(this) &&
      this._compositeLifeCycleState !== CompositeLifeCycle.MOUNTING;
  },

  /**
   * Initializes the component, renders markup, and registers event listeners.
   *
   * @param {string} rootID DOM ID of the root node.
   * @param {ReactReconcileTransaction} transaction
   * @param {number} mountDepth number of components in the owner hierarchy
   * @return {?string} Rendered markup to be inserted into the DOM.
   * @final
   * @internal
   */
  mountComponent: ReactPerf.measure(
    'ReactCompositeComponent',
    'mountComponent',
    function(rootID, transaction, mountDepth) {
      ReactComponent.Mixin.mountComponent.call(
        this,
        rootID,
        transaction,
        mountDepth
      );
      this._compositeLifeCycleState = CompositeLifeCycle.MOUNTING;

      this._defaultProps = this.getDefaultProps ? this.getDefaultProps() : null;
      this.props = this._processProps(this.props);

      if (this.__reactAutoBindMap) {
        this._bindAutoBindMethods();
      }

      this.state = this.getInitialState ? this.getInitialState() : null;
      ("production" !== "development" ? invariant(
        typeof this.state === 'object' && !Array.isArray(this.state),
        '%s.getInitialState(): must return an object or null',
        this.constructor.displayName || 'ReactCompositeComponent'
      ) : invariant(typeof this.state === 'object' && !Array.isArray(this.state)));

      this._pendingState = null;
      this._pendingForceUpdate = false;

      if (this.componentWillMount) {
        this.componentWillMount();
        // When mounting, calls to `setState` by `componentWillMount` will set
        // `this._pendingState` without triggering a re-render.
        if (this._pendingState) {
          this.state = this._pendingState;
          this._pendingState = null;
        }
      }

      this._renderedComponent = this._renderValidatedComponent();

      // Done with mounting, `setState` will now trigger UI changes.
      this._compositeLifeCycleState = null;
      var markup = this._renderedComponent.mountComponent(
        rootID,
        transaction,
        mountDepth + 1
      );
      if (this.componentDidMount) {
        transaction.getReactMountReady().enqueue(this, this.componentDidMount);
      }
      return markup;
    }
  ),

  /**
   * Releases any resources allocated by `mountComponent`.
   *
   * @final
   * @internal
   */
  unmountComponent: function() {
    this._compositeLifeCycleState = CompositeLifeCycle.UNMOUNTING;
    if (this.componentWillUnmount) {
      this.componentWillUnmount();
    }
    this._compositeLifeCycleState = null;

    this._defaultProps = null;

    this._renderedComponent.unmountComponent();
    this._renderedComponent = null;

    ReactComponent.Mixin.unmountComponent.call(this);

    if (this.refs) {
      this.refs = null;
    }

    // Some existing components rely on this.props even after they've been
    // destroyed (in event handlers).
    // TODO: this.props = null;
    // TODO: this.state = null;
  },

  /**
   * Sets a subset of the state. Always use this or `replaceState` to mutate
   * state. You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * There is no guarantee that calls to `setState` will run synchronously,
   * as they may eventually be batched together.  You can provide an optional
   * callback that will be executed when the call to setState is actually
   * completed.
   *
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after state is updated.
   * @final
   * @protected
   */
  setState: function(partialState, callback) {
    ("production" !== "development" ? invariant(
      typeof partialState === 'object' || partialState == null,
      'setState(...): takes an object of state variables to update.'
    ) : invariant(typeof partialState === 'object' || partialState == null));
    if ("production" !== "development") {
      if (partialState == null) {
        console.warn(
          'setState(...): You passed an undefined or null state object; ' +
          'instead, use forceUpdate().'
        );
      }
    }
    // Merge with `_pendingState` if it exists, otherwise with existing state.
    this.replaceState(
      merge(this._pendingState || this.state, partialState),
      callback
    );
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {object} completeState Next state.
   * @param {?function} callback Called after state is updated.
   * @final
   * @protected
   */
  replaceState: function(completeState, callback) {
    validateLifeCycleOnReplaceState(this);
    this._pendingState = completeState;
    ReactUpdates.enqueueUpdate(this, callback);
  },

  /**
   * Filters the context object to only contain keys specified in
   * `contextTypes`, and asserts that they are valid.
   *
   * @param {object} context
   * @return {?object}
   * @private
   */
  _processContext: function(context) {
    var maskedContext = null;
    var contextTypes = this.constructor.contextTypes;
    if (contextTypes) {
      maskedContext = {};
      for (var contextName in contextTypes) {
        maskedContext[contextName] = context[contextName];
      }
      if ("production" !== "development") {
        this._checkPropTypes(
          contextTypes,
          maskedContext,
          ReactPropTypeLocations.context
        );
      }
    }
    return maskedContext;
  },

  /**
   * @param {object} currentContext
   * @return {object}
   * @private
   */
  _processChildContext: function(currentContext) {
    var childContext = this.getChildContext && this.getChildContext();
    var displayName = this.constructor.displayName || 'ReactCompositeComponent';
    if (childContext) {
      ("production" !== "development" ? invariant(
        typeof this.constructor.childContextTypes === 'object',
        '%s.getChildContext(): childContextTypes must be defined in order to ' +
        'use getChildContext().',
        displayName
      ) : invariant(typeof this.constructor.childContextTypes === 'object'));
      if ("production" !== "development") {
        this._checkPropTypes(
          this.constructor.childContextTypes,
          childContext,
          ReactPropTypeLocations.childContext
        );
      }
      for (var name in childContext) {
        ("production" !== "development" ? invariant(
          name in this.constructor.childContextTypes,
          '%s.getChildContext(): key "%s" is not defined in childContextTypes.',
          displayName,
          name
        ) : invariant(name in this.constructor.childContextTypes));
      }
      return merge(currentContext, childContext);
    }
    return currentContext;
  },

  /**
   * Processes props by setting default values for unspecified props and
   * asserting that the props are valid. Does not mutate its argument; returns
   * a new props object with defaults merged in.
   *
   * @param {object} newProps
   * @return {object}
   * @private
   */
  _processProps: function(newProps) {
    var props = merge(newProps);
    var defaultProps = this._defaultProps;
    for (var propName in defaultProps) {
      if (typeof props[propName] === 'undefined') {
        props[propName] = defaultProps[propName];
      }
    }
    if ("production" !== "development") {
      var propTypes = this.constructor.propTypes;
      if (propTypes) {
        this._checkPropTypes(propTypes, props, ReactPropTypeLocations.prop);
      }
    }
    return props;
  },

  /**
   * Assert that the props are valid
   *
   * @param {object} propTypes Map of prop name to a ReactPropType
   * @param {object} props
   * @param {string} location e.g. "prop", "context", "child context"
   * @private
   */
  _checkPropTypes: function(propTypes, props, location) {
    var componentName = this.constructor.displayName;
    for (var propName in propTypes) {
      if (propTypes.hasOwnProperty(propName)) {
        propTypes[propName](props, propName, componentName, location);
      }
    }
  },

  performUpdateIfNecessary: function() {
    var compositeLifeCycleState = this._compositeLifeCycleState;
    // Do not trigger a state transition if we are in the middle of mounting or
    // receiving props because both of those will already be doing this.
    if (compositeLifeCycleState === CompositeLifeCycle.MOUNTING ||
        compositeLifeCycleState === CompositeLifeCycle.RECEIVING_PROPS) {
      return;
    }
    ReactComponent.Mixin.performUpdateIfNecessary.call(this);
  },

  /**
   * If any of `_pendingProps`, `_pendingState`, or `_pendingForceUpdate` is
   * set, update the component.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  _performUpdateIfNecessary: function(transaction) {
    if (this._pendingProps == null &&
        this._pendingState == null &&
        this._pendingContext == null &&
        !this._pendingForceUpdate) {
      return;
    }

    var nextFullContext = this._pendingContext || this._currentContext;
    var nextContext = this._processContext(nextFullContext);
    this._pendingContext = null;

    var nextProps = this.props;
    if (this._pendingProps != null) {
      nextProps = this._processProps(this._pendingProps);
      this._pendingProps = null;

      this._compositeLifeCycleState = CompositeLifeCycle.RECEIVING_PROPS;
      if (this.componentWillReceiveProps) {
        this.componentWillReceiveProps(nextProps, nextContext);
      }
    }

    this._compositeLifeCycleState = CompositeLifeCycle.RECEIVING_STATE;

    // Unlike props, state, and context, we specifically don't want to set
    // _pendingOwner to null here because it's possible for a component to have
    // a null owner, so we instead make `this._owner === this._pendingOwner`
    // mean that there's no owner change pending.
    var nextOwner = this._pendingOwner;

    var nextState = this._pendingState || this.state;
    this._pendingState = null;

    try {
      if (this._pendingForceUpdate ||
          !this.shouldComponentUpdate ||
          this.shouldComponentUpdate(nextProps, nextState, nextContext)) {
        this._pendingForceUpdate = false;
        // Will set `this.props`, `this.state` and `this.context`.
        this._performComponentUpdate(
          nextProps,
          nextOwner,
          nextState,
          nextFullContext,
          nextContext,
          transaction
        );
      } else {
        // If it's determined that a component should not update, we still want
        // to set props and state.
        this.props = nextProps;
        this._owner = nextOwner;
        this.state = nextState;
        this._currentContext = nextFullContext;
        this.context = nextContext;
      }
    } finally {
      this._compositeLifeCycleState = null;
    }
  },

  /**
   * Merges new props and state, notifies delegate methods of update and
   * performs update.
   *
   * @param {object} nextProps Next object to set as properties.
   * @param {?ReactComponent} nextOwner Next component to set as owner
   * @param {?object} nextState Next object to set as state.
   * @param {?object} nextFullContext Next object to set as _currentContext.
   * @param {?object} nextContext Next object to set as context.
   * @param {ReactReconcileTransaction} transaction
   * @private
   */
  _performComponentUpdate: function(
    nextProps,
    nextOwner,
    nextState,
    nextFullContext,
    nextContext,
    transaction
  ) {
    var prevProps = this.props;
    var prevOwner = this._owner;
    var prevState = this.state;
    var prevContext = this.context;

    if (this.componentWillUpdate) {
      this.componentWillUpdate(nextProps, nextState, nextContext);
    }

    this.props = nextProps;
    this._owner = nextOwner;
    this.state = nextState;
    this._currentContext = nextFullContext;
    this.context = nextContext;

    this.updateComponent(
      transaction,
      prevProps,
      prevOwner,
      prevState,
      prevContext
    );

    if (this.componentDidUpdate) {
      transaction.getReactMountReady().enqueue(
        this,
        this.componentDidUpdate.bind(this, prevProps, prevState, prevContext)
      );
    }
  },

  receiveComponent: function(nextComponent, transaction) {
    if (nextComponent === this) {
      // Since props and context are immutable after the component is
      // mounted, we can do a cheap identity compare here to determine
      // if this is a superfluous reconcile.
      return;
    }

    this._pendingContext = nextComponent._currentContext;
    ReactComponent.Mixin.receiveComponent.call(
      this,
      nextComponent,
      transaction
    );
  },

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @param {object} prevProps
   * @param {?ReactComponent} prevOwner
   * @param {?object} prevState
   * @param {?object} prevContext
   * @internal
   * @overridable
   */
  updateComponent: ReactPerf.measure(
    'ReactCompositeComponent',
    'updateComponent',
    function(transaction, prevProps, prevOwner, prevState, prevContext) {
      ReactComponent.Mixin.updateComponent.call(
        this,
        transaction,
        prevProps,
        prevOwner
      );
      var prevComponent = this._renderedComponent;
      var nextComponent = this._renderValidatedComponent();
      if (shouldUpdateReactComponent(prevComponent, nextComponent)) {
        prevComponent.receiveComponent(nextComponent, transaction);
      } else {
        // These two IDs are actually the same! But nothing should rely on that.
        var thisID = this._rootNodeID;
        var prevComponentID = prevComponent._rootNodeID;
        prevComponent.unmountComponent();
        this._renderedComponent = nextComponent;
        var nextMarkup = nextComponent.mountComponent(
          thisID,
          transaction,
          this._mountDepth + 1
        );
        ReactComponent.BackendIDOperations.dangerouslyReplaceNodeWithMarkupByID(
          prevComponentID,
          nextMarkup
        );
      }
    }
  ),

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldUpdateComponent`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {?function} callback Called after update is complete.
   * @final
   * @protected
   */
  forceUpdate: function(callback) {
    var compositeLifeCycleState = this._compositeLifeCycleState;
    ("production" !== "development" ? invariant(
      this.isMounted() ||
        compositeLifeCycleState === CompositeLifeCycle.MOUNTING,
      'forceUpdate(...): Can only force an update on mounted or mounting ' +
        'components.'
    ) : invariant(this.isMounted() ||
      compositeLifeCycleState === CompositeLifeCycle.MOUNTING));
    ("production" !== "development" ? invariant(
      compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_STATE &&
      compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING,
      'forceUpdate(...): Cannot force an update while unmounting component ' +
      'or during an existing state transition (such as within `render`).'
    ) : invariant(compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_STATE &&
    compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING));
    this._pendingForceUpdate = true;
    ReactUpdates.enqueueUpdate(this, callback);
  },

  /**
   * @private
   */
  _renderValidatedComponent: ReactPerf.measure(
    'ReactCompositeComponent',
    '_renderValidatedComponent',
    function() {
      var renderedComponent;
      var previousContext = ReactContext.current;
      ReactContext.current = this._processChildContext(this._currentContext);
      ReactCurrentOwner.current = this;
      try {
        renderedComponent = this.render();
      } finally {
        ReactContext.current = previousContext;
        ReactCurrentOwner.current = null;
      }
      ("production" !== "development" ? invariant(
        ReactComponent.isValidComponent(renderedComponent),
        '%s.render(): A valid ReactComponent must be returned. You may have ' +
          'returned null, undefined, an array, or some other invalid object.',
        this.constructor.displayName || 'ReactCompositeComponent'
      ) : invariant(ReactComponent.isValidComponent(renderedComponent)));
      return renderedComponent;
    }
  ),

  /**
   * @private
   */
  _bindAutoBindMethods: function() {
    for (var autoBindKey in this.__reactAutoBindMap) {
      if (!this.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
        continue;
      }
      var method = this.__reactAutoBindMap[autoBindKey];
      this[autoBindKey] = this._bindAutoBindMethod(ReactErrorUtils.guard(
        method,
        this.constructor.displayName + '.' + autoBindKey
      ));
    }
  },

  /**
   * Binds a method to the component.
   *
   * @param {function} method Method to be bound.
   * @private
   */
  _bindAutoBindMethod: function(method) {
    var component = this;
    var boundMethod = function() {
      return method.apply(component, arguments);
    };
    if ("production" !== "development") {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function(newThis ) {var args=Array.prototype.slice.call(arguments,1);
        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          console.warn(
            'bind(): React component methods may only be bound to the ' +
            'component instance. See ' + componentName
          );
        } else if (!args.length) {
          console.warn(
            'bind(): You are binding a component method to the component. ' +
            'React does this for you automatically in a high-performance ' +
            'way, so you can safely remove this call. See ' + componentName
          );
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }
};

var ReactCompositeComponentBase = function() {};
mixInto(ReactCompositeComponentBase, ReactComponent.Mixin);
mixInto(ReactCompositeComponentBase, ReactOwner.Mixin);
mixInto(ReactCompositeComponentBase, ReactPropTransferer.Mixin);
mixInto(ReactCompositeComponentBase, ReactCompositeComponentMixin);

/**
 * Checks if a value is a valid component constructor.
 *
 * @param {*}
 * @return {boolean}
 * @public
 */
function isValidClass(componentClass) {
  return componentClass instanceof Function &&
         'componentConstructor' in componentClass &&
         componentClass.componentConstructor instanceof Function;
}
/**
 * Module for creating composite components.
 *
 * @class ReactCompositeComponent
 * @extends ReactComponent
 * @extends ReactOwner
 * @extends ReactPropTransferer
 */
var ReactCompositeComponent = {

  LifeCycle: CompositeLifeCycle,

  Base: ReactCompositeComponentBase,

  /**
   * Creates a composite component class given a class specification.
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  createClass: function(spec) {
    var Constructor = function() {};
    Constructor.prototype = new ReactCompositeComponentBase();
    Constructor.prototype.constructor = Constructor;

    var ConvenienceConstructor = function(props, children) {
      var instance = new Constructor();
      instance.construct.apply(instance, arguments);
      return instance;
    };
    ConvenienceConstructor.componentConstructor = Constructor;
    Constructor.ConvenienceConstructor = ConvenienceConstructor;
    ConvenienceConstructor.originalSpec = spec;

    mixSpecIntoComponent(ConvenienceConstructor, spec);

    ("production" !== "development" ? invariant(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    ) : invariant(Constructor.prototype.render));

    if ("production" !== "development") {
      if (Constructor.prototype.componentShouldUpdate) {
        console.warn(
          (spec.displayName || 'A component') + ' has a method called ' +
          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
          'The name is phrased as a question because the function is ' +
          'expected to return a value.'
         );
      }
    }

    // Expose the convience constructor on the prototype so that it can be
    // easily accessed on descriptors. E.g. <Foo />.type === Foo.type and for
    // static methods like <Foo />.type.staticMethod();
    // This should not be named constructor since this may not be the function
    // that created the descriptor, and it may not even be a constructor.
    ConvenienceConstructor.type = Constructor;
    Constructor.prototype.type = Constructor;

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactCompositeComponentInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    if ("production" !== "development") {
      Constructor.prototype = createMountWarningMembrane(Constructor.prototype);
    }

    return ConvenienceConstructor;
  },

  isValidClass: isValidClass
};

module.exports = ReactCompositeComponent;

},{"./ReactComponent":26,"./ReactContext":30,"./ReactCurrentOwner":31,"./ReactErrorUtils":47,"./ReactOwner":59,"./ReactPerf":60,"./ReactPropTransferer":61,"./ReactPropTypeLocationNames":62,"./ReactPropTypeLocations":63,"./ReactUpdates":70,"./invariant":108,"./keyMirror":114,"./merge":117,"./mixInto":120,"./objMap":121,"./shouldUpdateReactComponent":126}],30:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactContext
 */

"use strict";

var merge = require("./merge");

/**
 * Keeps track of the current context.
 *
 * The context is automatically passed down the component ownership hierarchy
 * and is accessible via `this.context` on ReactCompositeComponents.
 */
var ReactContext = {

  /**
   * @internal
   * @type {object}
   */
  current: {},

  /**
   * Temporarily extends the current context while executing scopedCallback.
   *
   * A typical use case might look like
   *
   *  render: function() {
   *    var children = ReactContext.withContext({foo: 'foo'} () => (
   *
   *    ));
   *    return <div>{children}</div>;
   *  }
   *
   * @param {object} newContext New context to merge into the existing context
   * @param {function} scopedCallback Callback to run with the new context
   * @return {ReactComponent|array<ReactComponent>}
   */
  withContext: function(newContext, scopedCallback) {
    var result;
    var previousContext = ReactContext.current;
    ReactContext.current = merge(previousContext, newContext);
    try {
      result = scopedCallback();
    } finally {
      ReactContext.current = previousContext;
    }
    return result;
  }

};

module.exports = ReactContext;

},{"./merge":117}],31:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactCurrentOwner
 */

"use strict";

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 *
 * The depth indicate how many composite components are above this render level.
 */
var ReactCurrentOwner = {

  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null

};

module.exports = ReactCurrentOwner;

},{}],32:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOM
 * @typechecks static-only
 */

"use strict";

var ReactDOMComponent = require("./ReactDOMComponent");

var mergeInto = require("./mergeInto");
var objMapKeyVal = require("./objMapKeyVal");

/**
 * Creates a new React class that is idempotent and capable of containing other
 * React components. It accepts event listeners and DOM properties that are
 * valid according to `DOMProperty`.
 *
 *  - Event listeners: `onClick`, `onMouseDown`, etc.
 *  - DOM properties: `className`, `name`, `title`, etc.
 *
 * The `style` property functions differently from the DOM API. It accepts an
 * object mapping of style properties to values.
 *
 * @param {string} tag Tag name (e.g. `div`).
 * @param {boolean} omitClose True if the close tag should be omitted.
 * @private
 */
function createDOMComponentClass(tag, omitClose) {
  var Constructor = function() {};
  Constructor.prototype = new ReactDOMComponent(tag, omitClose);
  Constructor.prototype.constructor = Constructor;
  Constructor.displayName = tag;

  var ConvenienceConstructor = function(props, children) {
    var instance = new Constructor();
    instance.construct.apply(instance, arguments);
    return instance;
  };

  // Expose the constructor on the ConvenienceConstructor and prototype so that
  // it can be easily easily accessed on descriptors.
  // E.g. <div />.type === div.type
  ConvenienceConstructor.type = Constructor;
  Constructor.prototype.type = Constructor;

  Constructor.ConvenienceConstructor = ConvenienceConstructor;
  ConvenienceConstructor.componentConstructor = Constructor;
  return ConvenienceConstructor;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOM = objMapKeyVal({
  a: false,
  abbr: false,
  address: false,
  area: false,
  article: false,
  aside: false,
  audio: false,
  b: false,
  base: false,
  bdi: false,
  bdo: false,
  big: false,
  blockquote: false,
  body: false,
  br: true,
  button: false,
  canvas: false,
  caption: false,
  cite: false,
  code: false,
  col: true,
  colgroup: false,
  data: false,
  datalist: false,
  dd: false,
  del: false,
  details: false,
  dfn: false,
  div: false,
  dl: false,
  dt: false,
  em: false,
  embed: true,
  fieldset: false,
  figcaption: false,
  figure: false,
  footer: false,
  form: false, // NOTE: Injected, see `ReactDOMForm`.
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  head: false,
  header: false,
  hr: true,
  html: false,
  i: false,
  iframe: false,
  img: true,
  input: true,
  ins: false,
  kbd: false,
  keygen: true,
  label: false,
  legend: false,
  li: false,
  link: false,
  main: false,
  map: false,
  mark: false,
  menu: false,
  menuitem: false, // NOTE: Close tag should be omitted, but causes problems.
  meta: true,
  meter: false,
  nav: false,
  noscript: false,
  object: false,
  ol: false,
  optgroup: false,
  option: false,
  output: false,
  p: false,
  param: true,
  pre: false,
  progress: false,
  q: false,
  rp: false,
  rt: false,
  ruby: false,
  s: false,
  samp: false,
  script: false,
  section: false,
  select: false,
  small: false,
  source: false,
  span: false,
  strong: false,
  style: false,
  sub: false,
  summary: false,
  sup: false,
  table: false,
  tbody: false,
  td: false,
  textarea: false, // NOTE: Injected, see `ReactDOMTextarea`.
  tfoot: false,
  th: false,
  thead: false,
  time: false,
  title: false,
  tr: false,
  track: true,
  u: false,
  ul: false,
  'var': false,
  video: false,
  wbr: false,

  // SVG
  circle: false,
  defs: false,
  g: false,
  line: false,
  linearGradient: false,
  path: false,
  polygon: false,
  polyline: false,
  radialGradient: false,
  rect: false,
  stop: false,
  svg: false,
  text: false
}, createDOMComponentClass);

var injection = {
  injectComponentClasses: function(componentClasses) {
    mergeInto(ReactDOM, componentClasses);
  }
};

ReactDOM.injection = injection;

module.exports = ReactDOM;

},{"./ReactDOMComponent":34,"./mergeInto":119,"./objMapKeyVal":122}],33:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMButton
 */

"use strict";

var AutoFocusMixin = require("./AutoFocusMixin");
var ReactCompositeComponent = require("./ReactCompositeComponent");
var ReactDOM = require("./ReactDOM");

var keyMirror = require("./keyMirror");

// Store a reference to the <button> `ReactDOMComponent`.
var button = ReactDOM.button;

var mouseListenerNames = keyMirror({
  onClick: true,
  onDoubleClick: true,
  onMouseDown: true,
  onMouseMove: true,
  onMouseUp: true,
  onClickCapture: true,
  onDoubleClickCapture: true,
  onMouseDownCapture: true,
  onMouseMoveCapture: true,
  onMouseUpCapture: true
});

/**
 * Implements a <button> native component that does not receive mouse events
 * when `disabled` is set.
 */
var ReactDOMButton = ReactCompositeComponent.createClass({
  displayName: 'ReactDOMButton',

  mixins: [AutoFocusMixin],

  render: function() {
    var props = {};

    // Copy the props; except the mouse listeners if we're disabled
    for (var key in this.props) {
      if (this.props.hasOwnProperty(key) &&
          (!this.props.disabled || !mouseListenerNames[key])) {
        props[key] = this.props[key];
      }
    }

    return button(props, this.props.children);
  }

});

module.exports = ReactDOMButton;

},{"./AutoFocusMixin":1,"./ReactCompositeComponent":29,"./ReactDOM":32,"./keyMirror":114}],34:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMComponent
 * @typechecks static-only
 */

"use strict";

var CSSPropertyOperations = require("./CSSPropertyOperations");
var DOMProperty = require("./DOMProperty");
var DOMPropertyOperations = require("./DOMPropertyOperations");
var ReactComponent = require("./ReactComponent");
var ReactEventEmitter = require("./ReactEventEmitter");
var ReactMount = require("./ReactMount");
var ReactMultiChild = require("./ReactMultiChild");
var ReactPerf = require("./ReactPerf");

var escapeTextForBrowser = require("./escapeTextForBrowser");
var invariant = require("./invariant");
var keyOf = require("./keyOf");
var merge = require("./merge");
var mixInto = require("./mixInto");

var deleteListener = ReactEventEmitter.deleteListener;
var listenTo = ReactEventEmitter.listenTo;
var registrationNameModules = ReactEventEmitter.registrationNameModules;

// For quickly matching children type, to test if can be treated as content.
var CONTENT_TYPES = {'string': true, 'number': true};

var STYLE = keyOf({style: null});

var ELEMENT_NODE_TYPE = 1;

/**
 * @param {?object} props
 */
function assertValidProps(props) {
  if (!props) {
    return;
  }
  // Note the use of `==` which checks for null or undefined.
  ("production" !== "development" ? invariant(
    props.children == null || props.dangerouslySetInnerHTML == null,
    'Can only set one of `children` or `props.dangerouslySetInnerHTML`.'
  ) : invariant(props.children == null || props.dangerouslySetInnerHTML == null));
  ("production" !== "development" ? invariant(
    props.style == null || typeof props.style === 'object',
    'The `style` prop expects a mapping from style properties to values, ' +
    'not a string.'
  ) : invariant(props.style == null || typeof props.style === 'object'));
}

function putListener(id, registrationName, listener, transaction) {
  var container = ReactMount.findReactContainerForID(id);
  if (container) {
    var doc = container.nodeType === ELEMENT_NODE_TYPE ?
      container.ownerDocument :
      container;
    listenTo(registrationName, doc);
  }
  transaction.getPutListenerQueue().enqueuePutListener(
    id,
    registrationName,
    listener
  );
}


/**
 * @constructor ReactDOMComponent
 * @extends ReactComponent
 * @extends ReactMultiChild
 */
function ReactDOMComponent(tag, omitClose) {
  this._tagOpen = '<' + tag;
  this._tagClose = omitClose ? '' : '</' + tag + '>';
  this.tagName = tag.toUpperCase();
}

ReactDOMComponent.Mixin = {

  /**
   * Generates root tag markup then recurses. This method has side effects and
   * is not idempotent.
   *
   * @internal
   * @param {string} rootID The root DOM ID for this node.
   * @param {ReactReconcileTransaction} transaction
   * @param {number} mountDepth number of components in the owner hierarchy
   * @return {string} The computed markup.
   */
  mountComponent: ReactPerf.measure(
    'ReactDOMComponent',
    'mountComponent',
    function(rootID, transaction, mountDepth) {
      ReactComponent.Mixin.mountComponent.call(
        this,
        rootID,
        transaction,
        mountDepth
      );
      assertValidProps(this.props);
      return (
        this._createOpenTagMarkupAndPutListeners(transaction) +
        this._createContentMarkup(transaction) +
        this._tagClose
      );
    }
  ),

  /**
   * Creates markup for the open tag and all attributes.
   *
   * This method has side effects because events get registered.
   *
   * Iterating over object properties is faster than iterating over arrays.
   * @see http://jsperf.com/obj-vs-arr-iteration
   *
   * @private
   * @param {ReactReconcileTransaction} transaction
   * @return {string} Markup of opening tag.
   */
  _createOpenTagMarkupAndPutListeners: function(transaction) {
    var props = this.props;
    var ret = this._tagOpen;

    for (var propKey in props) {
      if (!props.hasOwnProperty(propKey)) {
        continue;
      }
      var propValue = props[propKey];
      if (propValue == null) {
        continue;
      }
      if (registrationNameModules[propKey]) {
        putListener(this._rootNodeID, propKey, propValue, transaction);
      } else {
        if (propKey === STYLE) {
          if (propValue) {
            propValue = props.style = merge(props.style);
          }
          propValue = CSSPropertyOperations.createMarkupForStyles(propValue);
        }
        var markup =
          DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
        if (markup) {
          ret += ' ' + markup;
        }
      }
    }

    var idMarkup = DOMPropertyOperations.createMarkupForID(this._rootNodeID);
    return ret + ' ' + idMarkup + '>';
  },

  /**
   * Creates markup for the content between the tags.
   *
   * @private
   * @param {ReactReconcileTransaction} transaction
   * @return {string} Content markup.
   */
  _createContentMarkup: function(transaction) {
    // Intentional use of != to avoid catching zero/false.
    var innerHTML = this.props.dangerouslySetInnerHTML;
    if (innerHTML != null) {
      if (innerHTML.__html != null) {
        return innerHTML.__html;
      }
    } else {
      var contentToUse =
        CONTENT_TYPES[typeof this.props.children] ? this.props.children : null;
      var childrenToUse = contentToUse != null ? null : this.props.children;
      if (contentToUse != null) {
        return escapeTextForBrowser(contentToUse);
      } else if (childrenToUse != null) {
        var mountImages = this.mountChildren(
          childrenToUse,
          transaction
        );
        return mountImages.join('');
      }
    }
    return '';
  },

  receiveComponent: function(nextComponent, transaction) {
    assertValidProps(nextComponent.props);
    ReactComponent.Mixin.receiveComponent.call(
      this,
      nextComponent,
      transaction
    );
  },

  /**
   * Updates a native DOM component after it has already been allocated and
   * attached to the DOM. Reconciles the root DOM node, then recurses.
   *
   * @param {ReactReconcileTransaction} transaction
   * @param {object} prevProps
   * @internal
   * @overridable
   */
  updateComponent: ReactPerf.measure(
    'ReactDOMComponent',
    'updateComponent',
    function(transaction, prevProps, prevOwner) {
      ReactComponent.Mixin.updateComponent.call(
        this,
        transaction,
        prevProps,
        prevOwner
      );
      this._updateDOMProperties(prevProps, transaction);
      this._updateDOMChildren(prevProps, transaction);
    }
  ),

  /**
   * Reconciles the properties by detecting differences in property values and
   * updating the DOM as necessary. This function is probably the single most
   * critical path for performance optimization.
   *
   * TODO: Benchmark whether checking for changed values in memory actually
   *       improves performance (especially statically positioned elements).
   * TODO: Benchmark the effects of putting this at the top since 99% of props
   *       do not change for a given reconciliation.
   * TODO: Benchmark areas that can be improved with caching.
   *
   * @private
   * @param {object} lastProps
   * @param {ReactReconcileTransaction} transaction
   */
  _updateDOMProperties: function(lastProps, transaction) {
    var nextProps = this.props;
    var propKey;
    var styleName;
    var styleUpdates;
    for (propKey in lastProps) {
      if (nextProps.hasOwnProperty(propKey) ||
         !lastProps.hasOwnProperty(propKey)) {
        continue;
      }
      if (propKey === STYLE) {
        var lastStyle = lastProps[propKey];
        for (styleName in lastStyle) {
          if (lastStyle.hasOwnProperty(styleName)) {
            styleUpdates = styleUpdates || {};
            styleUpdates[styleName] = '';
          }
        }
      } else if (registrationNameModules[propKey]) {
        deleteListener(this._rootNodeID, propKey);
      } else if (
          DOMProperty.isStandardName[propKey] ||
          DOMProperty.isCustomAttribute(propKey)) {
        ReactComponent.BackendIDOperations.deletePropertyByID(
          this._rootNodeID,
          propKey
        );
      }
    }
    for (propKey in nextProps) {
      var nextProp = nextProps[propKey];
      var lastProp = lastProps[propKey];
      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp) {
        continue;
      }
      if (propKey === STYLE) {
        if (nextProp) {
          nextProp = nextProps.style = merge(nextProp);
        }
        if (lastProp) {
          // Unset styles on `lastProp` but not on `nextProp`.
          for (styleName in lastProp) {
            if (lastProp.hasOwnProperty(styleName) &&
                !nextProp.hasOwnProperty(styleName)) {
              styleUpdates = styleUpdates || {};
              styleUpdates[styleName] = '';
            }
          }
          // Update styles that changed since `lastProp`.
          for (styleName in nextProp) {
            if (nextProp.hasOwnProperty(styleName) &&
                lastProp[styleName] !== nextProp[styleName]) {
              styleUpdates = styleUpdates || {};
              styleUpdates[styleName] = nextProp[styleName];
            }
          }
        } else {
          // Relies on `updateStylesByID` not mutating `styleUpdates`.
          styleUpdates = nextProp;
        }
      } else if (registrationNameModules[propKey]) {
        putListener(this._rootNodeID, propKey, nextProp, transaction);
      } else if (
          DOMProperty.isStandardName[propKey] ||
          DOMProperty.isCustomAttribute(propKey)) {
        ReactComponent.BackendIDOperations.updatePropertyByID(
          this._rootNodeID,
          propKey,
          nextProp
        );
      }
    }
    if (styleUpdates) {
      ReactComponent.BackendIDOperations.updateStylesByID(
        this._rootNodeID,
        styleUpdates
      );
    }
  },

  /**
   * Reconciles the children with the various properties that affect the
   * children content.
   *
   * @param {object} lastProps
   * @param {ReactReconcileTransaction} transaction
   */
  _updateDOMChildren: function(lastProps, transaction) {
    var nextProps = this.props;

    var lastContent =
      CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
    var nextContent =
      CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;

    var lastHtml =
      lastProps.dangerouslySetInnerHTML &&
      lastProps.dangerouslySetInnerHTML.__html;
    var nextHtml =
      nextProps.dangerouslySetInnerHTML &&
      nextProps.dangerouslySetInnerHTML.__html;

    // Note the use of `!=` which checks for null or undefined.
    var lastChildren = lastContent != null ? null : lastProps.children;
    var nextChildren = nextContent != null ? null : nextProps.children;

    // If we're switching from children to content/html or vice versa, remove
    // the old content
    var lastHasContentOrHtml = lastContent != null || lastHtml != null;
    var nextHasContentOrHtml = nextContent != null || nextHtml != null;
    if (lastChildren != null && nextChildren == null) {
      this.updateChildren(null, transaction);
    } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
      this.updateTextContent('');
    }

    if (nextContent != null) {
      if (lastContent !== nextContent) {
        this.updateTextContent('' + nextContent);
      }
    } else if (nextHtml != null) {
      if (lastHtml !== nextHtml) {
        ReactComponent.BackendIDOperations.updateInnerHTMLByID(
          this._rootNodeID,
          nextHtml
        );
      }
    } else if (nextChildren != null) {
      this.updateChildren(nextChildren, transaction);
    }
  },

  /**
   * Destroys all event registrations for this instance. Does not remove from
   * the DOM. That must be done by the parent.
   *
   * @internal
   */
  unmountComponent: function() {
    this.unmountChildren();
    ReactEventEmitter.deleteAllListeners(this._rootNodeID);
    ReactComponent.Mixin.unmountComponent.call(this);
  }

};

mixInto(ReactDOMComponent, ReactComponent.Mixin);
mixInto(ReactDOMComponent, ReactDOMComponent.Mixin);
mixInto(ReactDOMComponent, ReactMultiChild.Mixin);

module.exports = ReactDOMComponent;

},{"./CSSPropertyOperations":3,"./DOMProperty":8,"./DOMPropertyOperations":9,"./ReactComponent":26,"./ReactEventEmitter":48,"./ReactMount":55,"./ReactMultiChild":57,"./ReactPerf":60,"./escapeTextForBrowser":96,"./invariant":108,"./keyOf":115,"./merge":117,"./mixInto":120}],35:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMForm
 */

"use strict";

var ReactCompositeComponent = require("./ReactCompositeComponent");
var ReactDOM = require("./ReactDOM");
var ReactEventEmitter = require("./ReactEventEmitter");
var EventConstants = require("./EventConstants");

// Store a reference to the <form> `ReactDOMComponent`.
var form = ReactDOM.form;

/**
 * Since onSubmit doesn't bubble OR capture on the top level in IE8, we need
 * to capture it on the <form> element itself. There are lots of hacks we could
 * do to accomplish this, but the most reliable is to make <form> a
 * composite component and use `componentDidMount` to attach the event handlers.
 */
var ReactDOMForm = ReactCompositeComponent.createClass({
  displayName: 'ReactDOMForm',

  render: function() {
    // TODO: Instead of using `ReactDOM` directly, we should use JSX. However,
    // `jshint` fails to parse JSX so in order for linting to work in the open
    // source repo, we need to just use `ReactDOM.form`.
    return this.transferPropsTo(form(null, this.props.children));
  },

  componentDidMount: function() {
    ReactEventEmitter.trapBubbledEvent(
      EventConstants.topLevelTypes.topReset,
      'reset',
      this.getDOMNode()
    );
    ReactEventEmitter.trapBubbledEvent(
      EventConstants.topLevelTypes.topSubmit,
      'submit',
      this.getDOMNode()
    );
  }
});

module.exports = ReactDOMForm;

},{"./EventConstants":14,"./ReactCompositeComponent":29,"./ReactDOM":32,"./ReactEventEmitter":48}],36:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMIDOperations
 * @typechecks static-only
 */

/*jslint evil: true */

"use strict";

var CSSPropertyOperations = require("./CSSPropertyOperations");
var DOMChildrenOperations = require("./DOMChildrenOperations");
var DOMPropertyOperations = require("./DOMPropertyOperations");
var ReactMount = require("./ReactMount");
var ReactPerf = require("./ReactPerf");

var invariant = require("./invariant");

/**
 * Errors for properties that should not be updated with `updatePropertyById()`.
 *
 * @type {object}
 * @private
 */
var INVALID_PROPERTY_ERRORS = {
  dangerouslySetInnerHTML:
    '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
  style: '`style` must be set using `updateStylesByID()`.'
};

var useWhitespaceWorkaround;

/**
 * Operations used to process updates to DOM nodes. This is made injectable via
 * `ReactComponent.BackendIDOperations`.
 */
var ReactDOMIDOperations = {

  /**
   * Updates a DOM node with new property values. This should only be used to
   * update DOM properties in `DOMProperty`.
   *
   * @param {string} id ID of the node to update.
   * @param {string} name A valid property name, see `DOMProperty`.
   * @param {*} value New value of the property.
   * @internal
   */
  updatePropertyByID: ReactPerf.measure(
    'ReactDOMIDOperations',
    'updatePropertyByID',
    function(id, name, value) {
      var node = ReactMount.getNode(id);
      ("production" !== "development" ? invariant(
        !INVALID_PROPERTY_ERRORS.hasOwnProperty(name),
        'updatePropertyByID(...): %s',
        INVALID_PROPERTY_ERRORS[name]
      ) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));

      // If we're updating to null or undefined, we should remove the property
      // from the DOM node instead of inadvertantly setting to a string. This
      // brings us in line with the same behavior we have on initial render.
      if (value != null) {
        DOMPropertyOperations.setValueForProperty(node, name, value);
      } else {
        DOMPropertyOperations.deleteValueForProperty(node, name);
      }
    }
  ),

  /**
   * Updates a DOM node to remove a property. This should only be used to remove
   * DOM properties in `DOMProperty`.
   *
   * @param {string} id ID of the node to update.
   * @param {string} name A property name to remove, see `DOMProperty`.
   * @internal
   */
  deletePropertyByID: ReactPerf.measure(
    'ReactDOMIDOperations',
    'deletePropertyByID',
    function(id, name, value) {
      var node = ReactMount.getNode(id);
      ("production" !== "development" ? invariant(
        !INVALID_PROPERTY_ERRORS.hasOwnProperty(name),
        'updatePropertyByID(...): %s',
        INVALID_PROPERTY_ERRORS[name]
      ) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));
      DOMPropertyOperations.deleteValueForProperty(node, name, value);
    }
  ),

  /**
   * Updates a DOM node with new style values. If a value is specified as '',
   * the corresponding style property will be unset.
   *
   * @param {string} id ID of the node to update.
   * @param {object} styles Mapping from styles to values.
   * @internal
   */
  updateStylesByID: ReactPerf.measure(
    'ReactDOMIDOperations',
    'updateStylesByID',
    function(id, styles) {
      var node = ReactMount.getNode(id);
      CSSPropertyOperations.setValueForStyles(node, styles);
    }
  ),

  /**
   * Updates a DOM node's innerHTML.
   *
   * @param {string} id ID of the node to update.
   * @param {string} html An HTML string.
   * @internal
   */
  updateInnerHTMLByID: ReactPerf.measure(
    'ReactDOMIDOperations',
    'updateInnerHTMLByID',
    function(id, html) {
      var node = ReactMount.getNode(id);

      // IE8: When updating a just created node with innerHTML only leading
      // whitespace is removed. When updating an existing node with innerHTML
      // whitespace in root TextNodes is also collapsed.
      // @see quirksmode.org/bugreports/archives/2004/11/innerhtml_and_t.html

      if (useWhitespaceWorkaround === undefined) {
        // Feature detection; only IE8 is known to behave improperly like this.
        var temp = document.createElement('div');
        temp.innerHTML = ' ';
        useWhitespaceWorkaround = temp.innerHTML === '';
      }

      if (useWhitespaceWorkaround) {
        // Magic theory: IE8 supposedly differentiates between added and updated
        // nodes when processing innerHTML, innerHTML on updated nodes suffers
        // from worse whitespace behavior. Re-adding a node like this triggers
        // the initial and more favorable whitespace behavior.
        node.parentNode.replaceChild(node, node);
      }

      if (useWhitespaceWorkaround && html.match(/^[ \r\n\t\f]/)) {
        // Recover leading whitespace by temporarily prepending any character.
        // \uFEFF has the potential advantage of being zero-width/invisible.
        node.innerHTML = '\uFEFF' + html;
        node.firstChild.deleteData(0, 1);
      } else {
        node.innerHTML = html;
      }
    }
  ),

  /**
   * Updates a DOM node's text content set by `props.content`.
   *
   * @param {string} id ID of the node to update.
   * @param {string} content Text content.
   * @internal
   */
  updateTextContentByID: ReactPerf.measure(
    'ReactDOMIDOperations',
    'updateTextContentByID',
    function(id, content) {
      var node = ReactMount.getNode(id);
      DOMChildrenOperations.updateTextContent(node, content);
    }
  ),

  /**
   * Replaces a DOM node that exists in the document with markup.
   *
   * @param {string} id ID of child to be replaced.
   * @param {string} markup Dangerous markup to inject in place of child.
   * @internal
   * @see {Danger.dangerouslyReplaceNodeWithMarkup}
   */
  dangerouslyReplaceNodeWithMarkupByID: ReactPerf.measure(
    'ReactDOMIDOperations',
    'dangerouslyReplaceNodeWithMarkupByID',
    function(id, markup) {
      var node = ReactMount.getNode(id);
      DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node, markup);
    }
  ),

  /**
   * Updates a component's children by processing a series of updates.
   *
   * @param {array<object>} updates List of update configurations.
   * @param {array<string>} markup List of markup strings.
   * @internal
   */
  dangerouslyProcessChildrenUpdates: ReactPerf.measure(
    'ReactDOMIDOperations',
    'dangerouslyProcessChildrenUpdates',
    function(updates, markup) {
      for (var i = 0; i < updates.length; i++) {
        updates[i].parentNode = ReactMount.getNode(updates[i].parentID);
      }
      DOMChildrenOperations.processUpdates(updates, markup);
    }
  )
};

module.exports = ReactDOMIDOperations;

},{"./CSSPropertyOperations":3,"./DOMChildrenOperations":7,"./DOMPropertyOperations":9,"./ReactMount":55,"./ReactPerf":60,"./invariant":108}],37:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMImg
 */

"use strict";

var ReactCompositeComponent = require("./ReactCompositeComponent");
var ReactDOM = require("./ReactDOM");
var ReactEventEmitter = require("./ReactEventEmitter");
var EventConstants = require("./EventConstants");

// Store a reference to the <img> `ReactDOMComponent`.
var img = ReactDOM.img;

/**
 * Since onLoad doesn't bubble OR capture on the top level in IE8, we need to
 * capture it on the <img> element itself. There are lots of hacks we could do
 * to accomplish this, but the most reliable is to make <img> a composite
 * component and use `componentDidMount` to attach the event handlers.
 */
var ReactDOMImg = ReactCompositeComponent.createClass({
  displayName: 'ReactDOMImg',
  tagName: 'IMG',

  render: function() {
    return img(this.props);
  },

  componentDidMount: function() {
    var node = this.getDOMNode();
    ReactEventEmitter.trapBubbledEvent(
      EventConstants.topLevelTypes.topLoad,
      'load',
      node
    );
    ReactEventEmitter.trapBubbledEvent(
      EventConstants.topLevelTypes.topError,
      'error',
      node
    );
  }
});

module.exports = ReactDOMImg;

},{"./EventConstants":14,"./ReactCompositeComponent":29,"./ReactDOM":32,"./ReactEventEmitter":48}],38:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMInput
 */

"use strict";

var AutoFocusMixin = require("./AutoFocusMixin");
var DOMPropertyOperations = require("./DOMPropertyOperations");
var LinkedValueUtils = require("./LinkedValueUtils");
var ReactCompositeComponent = require("./ReactCompositeComponent");
var ReactDOM = require("./ReactDOM");
var ReactMount = require("./ReactMount");

var invariant = require("./invariant");
var merge = require("./merge");

// Store a reference to the <input> `ReactDOMComponent`.
var input = ReactDOM.input;

var instancesByReactID = {};

/**
 * Implements an <input> native component that allows setting these optional
 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
 *
 * If `checked` or `value` are not supplied (or null/undefined), user actions
 * that affect the checked state or value will trigger updates to the element.
 *
 * If they are supplied (and not null/undefined), the rendered element will not
 * trigger updates to the element. Instead, the props must change in order for
 * the rendered element to be updated.
 *
 * The rendered element will be initialized as unchecked (or `defaultChecked`)
 * with an empty value (or `defaultValue`).
 *
 * @see http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
 */
var ReactDOMInput = ReactCompositeComponent.createClass({
  displayName: 'ReactDOMInput',

  mixins: [AutoFocusMixin, LinkedValueUtils.Mixin],

  getInitialState: function() {
    var defaultValue = this.props.defaultValue;
    return {
      checked: this.props.defaultChecked || false,
      value: defaultValue != null ? defaultValue : null
    };
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onChange` handler.
    return !this._isChanging;
  },

  render: function() {
    // Clone `this.props` so we don't mutate the input.
    var props = merge(this.props);

    props.defaultChecked = null;
    props.defaultValue = null;

    var value = LinkedValueUtils.getValue(this);
    props.value = value != null ? value : this.state.value;

    var checked = LinkedValueUtils.getChecked(this);
    props.checked = checked != null ? checked : this.state.checked;

    props.onChange = this._handleChange;

    return input(props, this.props.children);
  },

  componentDidMount: function() {
    var id = ReactMount.getID(this.getDOMNode());
    instancesByReactID[id] = this;
  },

  componentWillUnmount: function() {
    var rootNode = this.getDOMNode();
    var id = ReactMount.getID(rootNode);
    delete instancesByReactID[id];
  },

  componentDidUpdate: function(prevProps, prevState, prevContext) {
    var rootNode = this.getDOMNode();
    if (this.props.checked != null) {
      DOMPropertyOperations.setValueForProperty(
        rootNode,
        'checked',
        this.props.checked || false
      );
    }

    var value = LinkedValueUtils.getValue(this);
    if (value != null) {
      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
    }
  },

  _handleChange: function(event) {
    var returnValue;
    var onChange = LinkedValueUtils.getOnChange(this);
    if (onChange) {
      this._isChanging = true;
      returnValue = onChange.call(this, event);
      this._isChanging = false;
    }
    this.setState({
      checked: event.target.checked,
      value: event.target.value
    });

    var name = this.props.name;
    if (this.props.type === 'radio' && name != null) {
      var rootNode = this.getDOMNode();
      var queryRoot = rootNode;

      while (queryRoot.parentNode) {
        queryRoot = queryRoot.parentNode;
      }

      // If `rootNode.form` was non-null, then we could try `form.elements`,
      // but that sometimes behaves strangely in IE8. We could also try using
      // `form.getElementsByName`, but that will only return direct children
      // and won't include inputs that use the HTML5 `form=` attribute. Since
      // the input might not even be in a form, let's just use the global
      // `querySelectorAll` to ensure we don't miss anything.
      var group = queryRoot.querySelectorAll(
        'input[name=' + JSON.stringify('' + name) + '][type="radio"]');

      for (var i = 0, groupLen = group.length; i < groupLen; i++) {
        var otherNode = group[i];
        if (otherNode === rootNode ||
            otherNode.form !== rootNode.form) {
          continue;
        }
        var otherID = ReactMount.getID(otherNode);
        ("production" !== "development" ? invariant(
          otherID,
          'ReactDOMInput: Mixing React and non-React radio inputs with the ' +
          'same `name` is not supported.'
        ) : invariant(otherID));
        var otherInstance = instancesByReactID[otherID];
        ("production" !== "development" ? invariant(
          otherInstance,
          'ReactDOMInput: Unknown radio button ID %s.',
          otherID
        ) : invariant(otherInstance));
        // In some cases, this will actually change the `checked` state value.
        // In other cases, there's no change but this forces a reconcile upon
        // which componentDidUpdate will reset the DOM property to whatever it
        // should be.
        otherInstance.setState({
          checked: false
        });
      }
    }

    return returnValue;
  }

});

module.exports = ReactDOMInput;

},{"./AutoFocusMixin":1,"./DOMPropertyOperations":9,"./LinkedValueUtils":21,"./ReactCompositeComponent":29,"./ReactDOM":32,"./ReactMount":55,"./invariant":108,"./merge":117}],39:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMOption
 */

"use strict";

var ReactCompositeComponent = require("./ReactCompositeComponent");
var ReactDOM = require("./ReactDOM");

// Store a reference to the <option> `ReactDOMComponent`.
var option = ReactDOM.option;

/**
 * Implements an <option> native component that warns when `selected` is set.
 */
var ReactDOMOption = ReactCompositeComponent.createClass({
  displayName: 'ReactDOMOption',

  componentWillMount: function() {
    // TODO (yungsters): Remove support for `selected` in <option>.
    if (this.props.selected != null) {
      if ("production" !== "development") {
        console.warn(
          'Use the `defaultValue` or `value` props on <select> instead of ' +
          'setting `selected` on <option>.'
        );
      }
    }
  },

  render: function() {
    return option(this.props, this.props.children);
  }

});

module.exports = ReactDOMOption;

},{"./ReactCompositeComponent":29,"./ReactDOM":32}],40:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMSelect
 */

"use strict";

var AutoFocusMixin = require("./AutoFocusMixin");
var LinkedValueUtils = require("./LinkedValueUtils");
var ReactCompositeComponent = require("./ReactCompositeComponent");
var ReactDOM = require("./ReactDOM");

var invariant = require("./invariant");
var merge = require("./merge");

// Store a reference to the <select> `ReactDOMComponent`.
var select = ReactDOM.select;

/**
 * Validation function for `value` and `defaultValue`.
 * @private
 */
function selectValueType(props, propName, componentName) {
  if (props[propName] == null) {
    return;
  }
  if (props.multiple) {
    ("production" !== "development" ? invariant(
      Array.isArray(props[propName]),
      'The `%s` prop supplied to <select> must be an array if `multiple` is ' +
      'true.',
      propName
    ) : invariant(Array.isArray(props[propName])));
  } else {
    ("production" !== "development" ? invariant(
      !Array.isArray(props[propName]),
      'The `%s` prop supplied to <select> must be a scalar value if ' +
      '`multiple` is false.',
      propName
    ) : invariant(!Array.isArray(props[propName])));
  }
}

/**
 * If `value` is supplied, updates <option> elements on mount and update.
 * @param {ReactComponent} component Instance of ReactDOMSelect
 * @param {?*} propValue For uncontrolled components, null/undefined. For
 * controlled components, a string (or with `multiple`, a list of strings).
 * @private
 */
function updateOptions(component, propValue) {
  var multiple = component.props.multiple;
  var value = propValue != null ? propValue : component.state.value;
  var options = component.getDOMNode().options;
  var selectedValue, i, l;
  if (multiple) {
    selectedValue = {};
    for (i = 0, l = value.length; i < l; ++i) {
      selectedValue['' + value[i]] = true;
    }
  } else {
    selectedValue = '' + value;
  }
  for (i = 0, l = options.length; i < l; i++) {
    var selected = multiple ?
      selectedValue.hasOwnProperty(options[i].value) :
      options[i].value === selectedValue;

    if (selected !== options[i].selected) {
      options[i].selected = selected;
    }
  }
}

/**
 * Implements a <select> native component that allows optionally setting the
 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
 * string. If `multiple` is true, the prop must be an array of strings.
 *
 * If `value` is not supplied (or null/undefined), user actions that change the
 * selected option will trigger updates to the rendered options.
 *
 * If it is supplied (and not null/undefined), the rendered options will not
 * update in response to user actions. Instead, the `value` prop must change in
 * order for the rendered options to update.
 *
 * If `defaultValue` is provided, any options with the supplied values will be
 * selected.
 */
var ReactDOMSelect = ReactCompositeComponent.createClass({
  displayName: 'ReactDOMSelect',

  mixins: [AutoFocusMixin, LinkedValueUtils.Mixin],

  propTypes: {
    defaultValue: selectValueType,
    value: selectValueType
  },

  getInitialState: function() {
    return {value: this.props.defaultValue || (this.props.multiple ? [] : '')};
  },

  componentWillReceiveProps: function(nextProps) {
    if (!this.props.multiple && nextProps.multiple) {
      this.setState({value: [this.state.value]});
    } else if (this.props.multiple && !nextProps.multiple) {
      this.setState({value: this.state.value[0]});
    }
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onChange` handler.
    return !this._isChanging;
  },

  render: function() {
    // Clone `this.props` so we don't mutate the input.
    var props = merge(this.props);

    props.onChange = this._handleChange;
    props.value = null;

    return select(props, this.props.children);
  },

  componentDidMount: function() {
    updateOptions(this, LinkedValueUtils.getValue(this));
  },

  componentDidUpdate: function() {
    var value = LinkedValueUtils.getValue(this);
    if (value != null) {
      updateOptions(this, value);
    }
  },

  _handleChange: function(event) {
    var returnValue;
    var onChange = LinkedValueUtils.getOnChange(this);
    if (onChange) {
      this._isChanging = true;
      returnValue = onChange.call(this, event);
      this._isChanging = false;
    }

    var selectedValue;
    if (this.props.multiple) {
      selectedValue = [];
      var options = event.target.options;
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          selectedValue.push(options[i].value);
        }
      }
    } else {
      selectedValue = event.target.value;
    }

    this.setState({value: selectedValue});
    return returnValue;
  }

});

module.exports = ReactDOMSelect;

},{"./AutoFocusMixin":1,"./LinkedValueUtils":21,"./ReactCompositeComponent":29,"./ReactDOM":32,"./invariant":108,"./merge":117}],41:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMSelection
 */

"use strict";

var getNodeForCharacterOffset = require("./getNodeForCharacterOffset");
var getTextContentAccessor = require("./getTextContentAccessor");

/**
 * Get the appropriate anchor and focus node/offset pairs for IE.
 *
 * The catch here is that IE's selection API doesn't provide information
 * about whether the selection is forward or backward, so we have to
 * behave as though it's always forward.
 *
 * IE text differs from modern selection in that it behaves as though
 * block elements end with a new line. This means character offsets will
 * differ between the two APIs.
 *
 * @param {DOMElement} node
 * @return {object}
 */
function getIEOffsets(node) {
  var selection = document.selection;
  var selectedRange = selection.createRange();
  var selectedLength = selectedRange.text.length;

  // Duplicate selection so we can move range without breaking user selection.
  var fromStart = selectedRange.duplicate();
  fromStart.moveToElementText(node);
  fromStart.setEndPoint('EndToStart', selectedRange);

  var startOffset = fromStart.text.length;
  var endOffset = startOffset + selectedLength;

  return {
    start: startOffset,
    end: endOffset
  };
}

/**
 * @param {DOMElement} node
 * @return {?object}
 */
function getModernOffsets(node) {
  var selection = window.getSelection();

  if (selection.rangeCount === 0) {
    return null;
  }

  var anchorNode = selection.anchorNode;
  var anchorOffset = selection.anchorOffset;
  var focusNode = selection.focusNode;
  var focusOffset = selection.focusOffset;

  var currentRange = selection.getRangeAt(0);
  var rangeLength = currentRange.toString().length;

  var tempRange = currentRange.cloneRange();
  tempRange.selectNodeContents(node);
  tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);

  var start = tempRange.toString().length;
  var end = start + rangeLength;

  // Detect whether the selection is backward.
  var detectionRange = document.createRange();
  detectionRange.setStart(anchorNode, anchorOffset);
  detectionRange.setEnd(focusNode, focusOffset);
  var isBackward = detectionRange.collapsed;
  detectionRange.detach();

  return {
    start: isBackward ? end : start,
    end: isBackward ? start : end
  };
}

/**
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */
function setIEOffsets(node, offsets) {
  var range = document.selection.createRange().duplicate();
  var start, end;

  if (typeof offsets.end === 'undefined') {
    start = offsets.start;
    end = start;
  } else if (offsets.start > offsets.end) {
    start = offsets.end;
    end = offsets.start;
  } else {
    start = offsets.start;
    end = offsets.end;
  }

  range.moveToElementText(node);
  range.moveStart('character', start);
  range.setEndPoint('EndToStart', range);
  range.moveEnd('character', end - start);
  range.select();
}

/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 *
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */
function setModernOffsets(node, offsets) {
  var selection = window.getSelection();

  var length = node[getTextContentAccessor()].length;
  var start = Math.min(offsets.start, length);
  var end = typeof offsets.end === 'undefined' ?
            start : Math.min(offsets.end, length);

  // IE 11 uses modern selection, but doesn't support the extend method.
  // Flip backward selections, so we can set with a single range.
  if (!selection.extend && start > end) {
    var temp = end;
    end = start;
    start = temp;
  }

  var startMarker = getNodeForCharacterOffset(node, start);
  var endMarker = getNodeForCharacterOffset(node, end);

  if (startMarker && endMarker) {
    var range = document.createRange();
    range.setStart(startMarker.node, startMarker.offset);
    selection.removeAllRanges();

    if (start > end) {
      selection.addRange(range);
      selection.extend(endMarker.node, endMarker.offset);
    } else {
      range.setEnd(endMarker.node, endMarker.offset);
      selection.addRange(range);
    }

    range.detach();
  }
}

var ReactDOMSelection = {
  /**
   * @param {DOMElement} node
   */
  getOffsets: function(node) {
    var getOffsets = document.selection ? getIEOffsets : getModernOffsets;
    return getOffsets(node);
  },

  /**
   * @param {DOMElement|DOMTextNode} node
   * @param {object} offsets
   */
  setOffsets: function(node, offsets) {
    var setOffsets = document.selection ? setIEOffsets : setModernOffsets;
    setOffsets(node, offsets);
  }
};

module.exports = ReactDOMSelection;

},{"./getNodeForCharacterOffset":103,"./getTextContentAccessor":105}],42:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMTextarea
 */

"use strict";

var AutoFocusMixin = require("./AutoFocusMixin");
var DOMPropertyOperations = require("./DOMPropertyOperations");
var LinkedValueUtils = require("./LinkedValueUtils");
var ReactCompositeComponent = require("./ReactCompositeComponent");
var ReactDOM = require("./ReactDOM");

var invariant = require("./invariant");
var merge = require("./merge");

// Store a reference to the <textarea> `ReactDOMComponent`.
var textarea = ReactDOM.textarea;

/**
 * Implements a <textarea> native component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */
var ReactDOMTextarea = ReactCompositeComponent.createClass({
  displayName: 'ReactDOMTextarea',

  mixins: [AutoFocusMixin, LinkedValueUtils.Mixin],

  getInitialState: function() {
    var defaultValue = this.props.defaultValue;
    // TODO (yungsters): Remove support for children content in <textarea>.
    var children = this.props.children;
    if (children != null) {
      if ("production" !== "development") {
        console.warn(
          'Use the `defaultValue` or `value` props instead of setting ' +
          'children on <textarea>.'
        );
      }
      ("production" !== "development" ? invariant(
        defaultValue == null,
        'If you supply `defaultValue` on a <textarea>, do not pass children.'
      ) : invariant(defaultValue == null));
      if (Array.isArray(children)) {
        ("production" !== "development" ? invariant(
          children.length <= 1,
          '<textarea> can only have at most one child.'
        ) : invariant(children.length <= 1));
        children = children[0];
      }

      defaultValue = '' + children;
    }
    if (defaultValue == null) {
      defaultValue = '';
    }
    var value = LinkedValueUtils.getValue(this);
    return {
      // We save the initial value so that `ReactDOMComponent` doesn't update
      // `textContent` (unnecessary since we update value).
      // The initial value can be a boolean or object so that's why it's
      // forced to be a string.
      initialValue: '' + (value != null ? value : defaultValue),
      value: defaultValue
    };
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onChange` handler.
    return !this._isChanging;
  },

  render: function() {
    // Clone `this.props` so we don't mutate the input.
    var props = merge(this.props);
    var value = LinkedValueUtils.getValue(this);

    ("production" !== "development" ? invariant(
      props.dangerouslySetInnerHTML == null,
      '`dangerouslySetInnerHTML` does not make sense on <textarea>.'
    ) : invariant(props.dangerouslySetInnerHTML == null));

    props.defaultValue = null;
    props.value = value != null ? value : this.state.value;
    props.onChange = this._handleChange;

    // Always set children to the same thing. In IE9, the selection range will
    // get reset if `textContent` is mutated.
    return textarea(props, this.state.initialValue);
  },

  componentDidUpdate: function(prevProps, prevState, prevContext) {
    var value = LinkedValueUtils.getValue(this);
    if (value != null) {
      var rootNode = this.getDOMNode();
      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
    }
  },

  _handleChange: function(event) {
    var returnValue;
    var onChange = LinkedValueUtils.getOnChange(this);
    if (onChange) {
      this._isChanging = true;
      returnValue = onChange.call(this, event);
      this._isChanging = false;
    }
    this.setState({value: event.target.value});
    return returnValue;
  }

});

module.exports = ReactDOMTextarea;

},{"./AutoFocusMixin":1,"./DOMPropertyOperations":9,"./LinkedValueUtils":21,"./ReactCompositeComponent":29,"./ReactDOM":32,"./invariant":108,"./merge":117}],43:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDefaultBatchingStrategy
 */

"use strict";

var ReactUpdates = require("./ReactUpdates");
var Transaction = require("./Transaction");

var emptyFunction = require("./emptyFunction");
var mixInto = require("./mixInto");

var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: function() {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
  }
};

var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
};

var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];

function ReactDefaultBatchingStrategyTransaction() {
  this.reinitializeTransaction();
}

mixInto(ReactDefaultBatchingStrategyTransaction, Transaction.Mixin);
mixInto(ReactDefaultBatchingStrategyTransaction, {
  getTransactionWrappers: function() {
    return TRANSACTION_WRAPPERS;
  }
});

var transaction = new ReactDefaultBatchingStrategyTransaction();

var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  /**
   * Call the provided function in a context within which calls to `setState`
   * and friends are batched such that components aren't updated unnecessarily.
   */
  batchedUpdates: function(callback, param) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

    // The code is written this way to avoid extra allocations
    if (alreadyBatchingUpdates) {
      callback(param);
    } else {
      transaction.perform(callback, null, param);
    }
  }
};

module.exports = ReactDefaultBatchingStrategy;

},{"./ReactUpdates":70,"./Transaction":84,"./emptyFunction":95,"./mixInto":120}],44:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDefaultInjection
 */

"use strict";

var ReactInjection = require("./ReactInjection");

var ExecutionEnvironment = require("./ExecutionEnvironment");

var DefaultDOMPropertyConfig = require("./DefaultDOMPropertyConfig");

var ChangeEventPlugin = require("./ChangeEventPlugin");
var ClientReactRootIndex = require("./ClientReactRootIndex");
var CompositionEventPlugin = require("./CompositionEventPlugin");
var DefaultEventPluginOrder = require("./DefaultEventPluginOrder");
var EnterLeaveEventPlugin = require("./EnterLeaveEventPlugin");
var MobileSafariClickEventPlugin = require("./MobileSafariClickEventPlugin");
var ReactEventTopLevelCallback = require("./ReactEventTopLevelCallback");
var ReactDOM = require("./ReactDOM");
var ReactDOMButton = require("./ReactDOMButton");
var ReactDOMForm = require("./ReactDOMForm");
var ReactDOMImg = require("./ReactDOMImg");
var ReactDOMInput = require("./ReactDOMInput");
var ReactDOMOption = require("./ReactDOMOption");
var ReactDOMSelect = require("./ReactDOMSelect");
var ReactDOMTextarea = require("./ReactDOMTextarea");
var ReactInstanceHandles = require("./ReactInstanceHandles");
var ReactMount = require("./ReactMount");
var SelectEventPlugin = require("./SelectEventPlugin");
var ServerReactRootIndex = require("./ServerReactRootIndex");
var SimpleEventPlugin = require("./SimpleEventPlugin");

var ReactDefaultBatchingStrategy = require("./ReactDefaultBatchingStrategy");

var createFullPageComponent = require("./createFullPageComponent");

function inject() {
  ReactInjection.EventEmitter.injectTopLevelCallbackCreator(
    ReactEventTopLevelCallback
  );

  /**
   * Inject modules for resolving DOM hierarchy and plugin ordering.
   */
  ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
  ReactInjection.EventPluginHub.injectInstanceHandle(ReactInstanceHandles);
  ReactInjection.EventPluginHub.injectMount(ReactMount);

  /**
   * Some important event plugins included by default (without having to require
   * them).
   */
  ReactInjection.EventPluginHub.injectEventPluginsByName({
    SimpleEventPlugin: SimpleEventPlugin,
    EnterLeaveEventPlugin: EnterLeaveEventPlugin,
    ChangeEventPlugin: ChangeEventPlugin,
    CompositionEventPlugin: CompositionEventPlugin,
    MobileSafariClickEventPlugin: MobileSafariClickEventPlugin,
    SelectEventPlugin: SelectEventPlugin
  });

  ReactInjection.DOM.injectComponentClasses({
    button: ReactDOMButton,
    form: ReactDOMForm,
    img: ReactDOMImg,
    input: ReactDOMInput,
    option: ReactDOMOption,
    select: ReactDOMSelect,
    textarea: ReactDOMTextarea,

    html: createFullPageComponent(ReactDOM.html),
    head: createFullPageComponent(ReactDOM.head),
    title: createFullPageComponent(ReactDOM.title),
    body: createFullPageComponent(ReactDOM.body)
  });

  ReactInjection.DOMProperty.injectDOMPropertyConfig(DefaultDOMPropertyConfig);

  ReactInjection.Updates.injectBatchingStrategy(
    ReactDefaultBatchingStrategy
  );

  ReactInjection.RootIndex.injectCreateReactRootIndex(
    ExecutionEnvironment.canUseDOM ?
      ClientReactRootIndex.createReactRootIndex :
      ServerReactRootIndex.createReactRootIndex
  );

  if ("production" !== "development") {
    var url = (ExecutionEnvironment.canUseDOM && window.location.href) || '';
    if ((/[?&]react_perf\b/).test(url)) {
      var ReactDefaultPerf = require("./ReactDefaultPerf");
      ReactDefaultPerf.start();
    }
  }
}

module.exports = {
  inject: inject
};

},{"./ChangeEventPlugin":4,"./ClientReactRootIndex":5,"./CompositionEventPlugin":6,"./DefaultDOMPropertyConfig":11,"./DefaultEventPluginOrder":12,"./EnterLeaveEventPlugin":13,"./ExecutionEnvironment":20,"./MobileSafariClickEventPlugin":22,"./ReactDOM":32,"./ReactDOMButton":33,"./ReactDOMForm":35,"./ReactDOMImg":37,"./ReactDOMInput":38,"./ReactDOMOption":39,"./ReactDOMSelect":40,"./ReactDOMTextarea":42,"./ReactDefaultBatchingStrategy":43,"./ReactDefaultPerf":45,"./ReactEventTopLevelCallback":50,"./ReactInjection":51,"./ReactInstanceHandles":53,"./ReactMount":55,"./SelectEventPlugin":71,"./ServerReactRootIndex":72,"./SimpleEventPlugin":73,"./createFullPageComponent":91}],45:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDefaultPerf
 * @typechecks static-only
 */

"use strict";

var DOMProperty = require("./DOMProperty");
var ReactDefaultPerfAnalysis = require("./ReactDefaultPerfAnalysis");
var ReactMount = require("./ReactMount");
var ReactPerf = require("./ReactPerf");

var performanceNow = require("./performanceNow");

function roundFloat(val) {
  return Math.floor(val * 100) / 100;
}

var ReactDefaultPerf = {
  _allMeasurements: [], // last item in the list is the current one
  _injected: false,

  start: function() {
    if (!ReactDefaultPerf._injected) {
      ReactPerf.injection.injectMeasure(ReactDefaultPerf.measure);
    }

    ReactDefaultPerf._allMeasurements.length = 0;
    ReactPerf.enableMeasure = true;
  },

  stop: function() {
    ReactPerf.enableMeasure = false;
  },

  getLastMeasurements: function() {
    return ReactDefaultPerf._allMeasurements;
  },

  printExclusive: function(measurements) {
    measurements = measurements || ReactDefaultPerf._allMeasurements;
    var summary = ReactDefaultPerfAnalysis.getExclusiveSummary(measurements);
    console.table(summary.map(function(item) {
      return {
        'Component class name': item.componentName,
        'Total inclusive time (ms)': roundFloat(item.inclusive),
        'Total exclusive time (ms)': roundFloat(item.exclusive),
        'Exclusive time per instance (ms)': roundFloat(item.exclusive / item.count),
        'Instances': item.count
      };
    }));
    console.log(
      'Total time:',
      ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms'
    );
  },

  printInclusive: function(measurements) {
    measurements = measurements || ReactDefaultPerf._allMeasurements;
    var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(measurements);
    console.table(summary.map(function(item) {
      return {
        'Owner > component': item.componentName,
        'Inclusive time (ms)': roundFloat(item.time),
        'Instances': item.count
      };
    }));
    console.log(
      'Total time:',
      ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms'
    );
  },

  printWasted: function(measurements) {
    measurements = measurements || ReactDefaultPerf._allMeasurements;
    var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(
      measurements,
      true
    );
    console.table(summary.map(function(item) {
      return {
        'Owner > component': item.componentName,
        'Wasted time (ms)': item.time,
        'Instances': item.count
      };
    }));
    console.log(
      'Total time:',
      ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms'
    );
  },

  printDOM: function(measurements) {
    measurements = measurements || ReactDefaultPerf._allMeasurements;
    var summary = ReactDefaultPerfAnalysis.getDOMSummary(measurements);
    console.table(summary.map(function(item) {
      var result = {};
      result[DOMProperty.ID_ATTRIBUTE_NAME] = item.id;
      result['type'] = item.type;
      result['args'] = JSON.stringify(item.args);
      return result;
    }));
    console.log(
      'Total time:',
      ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms'
    );
  },

  _recordWrite: function(id, fnName, totalTime, args) {
    // TODO: totalTime isn't that useful since it doesn't count paints/reflows
    var writes =
      ReactDefaultPerf
        ._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1]
        .writes;
    writes[id] = writes[id] || [];
    writes[id].push({
      type: fnName,
      time: totalTime,
      args: args
    });
  },

  measure: function(moduleName, fnName, func) {
    return function() {var args=Array.prototype.slice.call(arguments,0);
      var totalTime;
      var rv;
      var start;

      if (fnName === '_renderNewRootComponent' ||
          fnName === 'flushBatchedUpdates') {
        // A "measurement" is a set of metrics recorded for each flush. We want
        // to group the metrics for a given flush together so we can look at the
        // components that rendered and the DOM operations that actually
        // happened to determine the amount of "wasted work" performed.
        ReactDefaultPerf._allMeasurements.push({
          exclusive: {},
          inclusive: {},
          counts: {},
          writes: {},
          displayNames: {},
          totalTime: 0
        });
        start = performanceNow();
        rv = func.apply(this, args);
        ReactDefaultPerf._allMeasurements[
          ReactDefaultPerf._allMeasurements.length - 1
        ].totalTime = performanceNow() - start;
        return rv;
      } else if (moduleName === 'ReactDOMIDOperations' ||
        moduleName === 'ReactComponentBrowserEnvironment') {
        start = performanceNow();
        rv = func.apply(this, args);
        totalTime = performanceNow() - start;

        if (fnName === 'mountImageIntoNode') {
          var mountID = ReactMount.getID(args[1]);
          ReactDefaultPerf._recordWrite(mountID, fnName, totalTime, args[0]);
        } else if (fnName === 'dangerouslyProcessChildrenUpdates') {
          // special format
          args[0].forEach(function(update) {
            var writeArgs = {};
            if (update.fromIndex !== null) {
              writeArgs.fromIndex = update.fromIndex;
            }
            if (update.toIndex !== null) {
              writeArgs.toIndex = update.toIndex;
            }
            if (update.textContent !== null) {
              writeArgs.textContent = update.textContent;
            }
            if (update.markupIndex !== null) {
              writeArgs.markup = args[1][update.markupIndex];
            }
            ReactDefaultPerf._recordWrite(
              update.parentID,
              update.type,
              totalTime,
              writeArgs
            );
          });
        } else {
          // basic format
          ReactDefaultPerf._recordWrite(
            args[0],
            fnName,
            totalTime,
            Array.prototype.slice.call(args, 1)
          );
        }
        return rv;
      } else if (moduleName === 'ReactCompositeComponent' && (
        fnName === 'mountComponent' ||
        fnName === 'updateComponent' || // TODO: receiveComponent()?
        fnName === '_renderValidatedComponent')) {

        var rootNodeID = fnName === 'mountComponent' ?
          args[0] :
          this._rootNodeID;
        var isRender = fnName === '_renderValidatedComponent';
        var entry = ReactDefaultPerf._allMeasurements[
          ReactDefaultPerf._allMeasurements.length - 1
        ];

        if (isRender) {
          entry.counts[rootNodeID] = entry.counts[rootNodeID] || 0;
          entry.counts[rootNodeID] += 1;
        }

        start = performanceNow();
        rv = func.apply(this, args);
        totalTime = performanceNow() - start;

        var typeOfLog = isRender ? entry.exclusive : entry.inclusive;
        typeOfLog[rootNodeID] = typeOfLog[rootNodeID] || 0;
        typeOfLog[rootNodeID] += totalTime;

        entry.displayNames[rootNodeID] = {
          current: this.constructor.displayName,
          owner: this._owner ? this._owner.constructor.displayName : '<root>'
        };

        return rv;
      } else {
        return func.apply(this, args);
      }
    };
  }
};

module.exports = ReactDefaultPerf;

},{"./DOMProperty":8,"./ReactDefaultPerfAnalysis":46,"./ReactMount":55,"./ReactPerf":60,"./performanceNow":124}],46:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDefaultPerfAnalysis
 */

var merge = require("./merge");

// Don't try to save users less than 1.2ms (a number I made up)
var DONT_CARE_THRESHOLD = 1.2;
var DOM_OPERATION_TYPES = {
  'mountImageIntoNode': 'set innerHTML',
  INSERT_MARKUP: 'set innerHTML',
  MOVE_EXISTING: 'move',
  REMOVE_NODE: 'remove',
  TEXT_CONTENT: 'set textContent',
  'updatePropertyByID': 'update attribute',
  'deletePropertyByID': 'delete attribute',
  'updateStylesByID': 'update styles',
  'updateInnerHTMLByID': 'set innerHTML',
  'dangerouslyReplaceNodeWithMarkupByID': 'replace'
};

function getTotalTime(measurements) {
  // TODO: return number of DOM ops? could be misleading.
  // TODO: measure dropped frames after reconcile?
  // TODO: log total time of each reconcile and the top-level component
  // class that triggered it.
  var totalTime = 0;
  for (var i = 0; i < measurements.length; i++) {
    var measurement = measurements[i];
    totalTime += measurement.totalTime;
  }
  return totalTime;
}

function getDOMSummary(measurements) {
  var items = [];
  for (var i = 0; i < measurements.length; i++) {
    var measurement = measurements[i];
    var id;

    for (id in measurement.writes) {
      measurement.writes[id].forEach(function(write) {
        items.push({
          id: id,
          type: DOM_OPERATION_TYPES[write.type] || write.type,
          args: write.args
        });
      });
    }
  }
  return items;
}

function getExclusiveSummary(measurements) {
  var candidates = {};
  var displayName;

  for (var i = 0; i < measurements.length; i++) {
    var measurement = measurements[i];
    var allIDs = merge(measurement.exclusive, measurement.inclusive);

    for (var id in allIDs) {
      displayName = measurement.displayNames[id].current;

      candidates[displayName] = candidates[displayName] || {
        componentName: displayName,
        inclusive: 0,
        exclusive: 0,
        count: 0
      };
      if (measurement.exclusive[id]) {
        candidates[displayName].exclusive += measurement.exclusive[id];
      }
      if (measurement.inclusive[id]) {
        candidates[displayName].inclusive += measurement.inclusive[id];
      }
      if (measurement.counts[id]) {
        candidates[displayName].count += measurement.counts[id];
      }
    }
  }

  // Now make a sorted array with the results.
  var arr = [];
  for (displayName in candidates) {
    if (candidates[displayName].exclusive >= DONT_CARE_THRESHOLD) {
      arr.push(candidates[displayName]);
    }
  }

  arr.sort(function(a, b) {
    return b.exclusive - a.exclusive;
  });

  return arr;
}

function getInclusiveSummary(measurements, onlyClean) {
  var candidates = {};
  var inclusiveKey;

  for (var i = 0; i < measurements.length; i++) {
    var measurement = measurements[i];
    var allIDs = merge(measurement.exclusive, measurement.inclusive);
    var cleanComponents;

    if (onlyClean) {
      cleanComponents = getUnchangedComponents(measurement);
    }

    for (var id in allIDs) {
      if (onlyClean && !cleanComponents[id]) {
        continue;
      }

      var displayName = measurement.displayNames[id];

      // Inclusive time is not useful for many components without knowing where
      // they are instantiated. So we aggregate inclusive time with both the
      // owner and current displayName as the key.
      inclusiveKey = displayName.owner + ' > ' + displayName.current;

      candidates[inclusiveKey] = candidates[inclusiveKey] || {
        componentName: inclusiveKey,
        time: 0,
        count: 0
      };

      if (measurement.inclusive[id]) {
        candidates[inclusiveKey].time += measurement.inclusive[id];
      }
      if (measurement.counts[id]) {
        candidates[inclusiveKey].count += measurement.counts[id];
      }
    }
  }

  // Now make a sorted array with the results.
  var arr = [];
  for (inclusiveKey in candidates) {
    if (candidates[inclusiveKey].time >= DONT_CARE_THRESHOLD) {
      arr.push(candidates[inclusiveKey]);
    }
  }

  arr.sort(function(a, b) {
    return b.time - a.time;
  });

  return arr;
}

function getUnchangedComponents(measurement) {
  // For a given reconcile, look at which components did not actually
  // render anything to the DOM and return a mapping of their ID to
  // the amount of time it took to render the entire subtree.
  var cleanComponents = {};
  var dirtyLeafIDs = Object.keys(measurement.writes);
  var allIDs = merge(measurement.exclusive, measurement.inclusive);

  for (var id in allIDs) {
    var isDirty = false;
    // For each component that rendered, see if a component that triggerd
    // a DOM op is in its subtree.
    for (var i = 0; i < dirtyLeafIDs.length; i++) {
      if (dirtyLeafIDs[i].indexOf(id) === 0) {
        isDirty = true;
        break;
      }
    }
    if (!isDirty && measurement.counts[id] > 0) {
      cleanComponents[id] = true;
    }
  }
  return cleanComponents;
}

var ReactDefaultPerfAnalysis = {
  getExclusiveSummary: getExclusiveSummary,
  getInclusiveSummary: getInclusiveSummary,
  getDOMSummary: getDOMSummary,
  getTotalTime: getTotalTime
};

module.exports = ReactDefaultPerfAnalysis;

},{"./merge":117}],47:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactErrorUtils
 * @typechecks
 */

"use strict";

var ReactErrorUtils = {
  /**
   * Creates a guarded version of a function. This is supposed to make debugging
   * of event handlers easier. To aid debugging with the browser's debugger,
   * this currently simply returns the original function.
   *
   * @param {function} func Function to be executed
   * @param {string} name The name of the guard
   * @return {function}
   */
  guard: function(func, name) {
    return func;
  }
};

module.exports = ReactErrorUtils;

},{}],48:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactEventEmitter
 * @typechecks static-only
 */

"use strict";

var EventConstants = require("./EventConstants");
var EventListener = require("./EventListener");
var EventPluginHub = require("./EventPluginHub");
var EventPluginRegistry = require("./EventPluginRegistry");
var ExecutionEnvironment = require("./ExecutionEnvironment");
var ReactEventEmitterMixin = require("./ReactEventEmitterMixin");
var ViewportMetrics = require("./ViewportMetrics");

var invariant = require("./invariant");
var isEventSupported = require("./isEventSupported");
var merge = require("./merge");

/**
 * Summary of `ReactEventEmitter` event handling:
 *
 *  - Top-level delegation is used to trap native browser events. We normalize
 *    and de-duplicate events to account for browser quirks.
 *
 *  - Forward these native events (with the associated top-level type used to
 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
 *    to extract any synthetic events.
 *
 *  - The `EventPluginHub` will then process each event by annotating them with
 *    "dispatches", a sequence of listeners and IDs that care about that event.
 *
 *  - The `EventPluginHub` then dispatches the events.
 *
 * Overview of React and the event system:
 *
 *                   .
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .                         +-----------+
 *       +           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */

var alreadyListeningTo = {};
var isMonitoringScrollValue = false;
var reactTopListenersCounter = 0;

// For events like 'submit' which don't consistently bubble (which we trap at a
// lower node than `document`), binding at `document` would cause duplicate
// events so we don't include them here
var topEventMapping = {
  topBlur: 'blur',
  topChange: 'change',
  topClick: 'click',
  topCompositionEnd: 'compositionend',
  topCompositionStart: 'compositionstart',
  topCompositionUpdate: 'compositionupdate',
  topContextMenu: 'contextmenu',
  topCopy: 'copy',
  topCut: 'cut',
  topDoubleClick: 'dblclick',
  topDrag: 'drag',
  topDragEnd: 'dragend',
  topDragEnter: 'dragenter',
  topDragExit: 'dragexit',
  topDragLeave: 'dragleave',
  topDragOver: 'dragover',
  topDragStart: 'dragstart',
  topDrop: 'drop',
  topFocus: 'focus',
  topInput: 'input',
  topKeyDown: 'keydown',
  topKeyPress: 'keypress',
  topKeyUp: 'keyup',
  topMouseDown: 'mousedown',
  topMouseMove: 'mousemove',
  topMouseOut: 'mouseout',
  topMouseOver: 'mouseover',
  topMouseUp: 'mouseup',
  topPaste: 'paste',
  topScroll: 'scroll',
  topSelectionChange: 'selectionchange',
  topTouchCancel: 'touchcancel',
  topTouchEnd: 'touchend',
  topTouchMove: 'touchmove',
  topTouchStart: 'touchstart',
  topWheel: 'wheel'
};

/**
 * To ensure no conflicts with other potential React instances on the page
 */
var topListenersIDKey = "_reactListenersID" + String(Math.random()).slice(2);

function getListeningForDocument(mountAt) {
  if (mountAt[topListenersIDKey] == null) {
    mountAt[topListenersIDKey] = reactTopListenersCounter++;
    alreadyListeningTo[mountAt[topListenersIDKey]] = {};
  }
  return alreadyListeningTo[mountAt[topListenersIDKey]];
}

/**
 * Traps top-level events by using event bubbling.
 *
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {string} handlerBaseName Event name (e.g. "click").
 * @param {DOMEventTarget} element Element on which to attach listener.
 * @internal
 */
function trapBubbledEvent(topLevelType, handlerBaseName, element) {
  EventListener.listen(
    element,
    handlerBaseName,
    ReactEventEmitter.TopLevelCallbackCreator.createTopLevelCallback(
      topLevelType
    )
  );
}

/**
 * Traps a top-level event by using event capturing.
 *
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {string} handlerBaseName Event name (e.g. "click").
 * @param {DOMEventTarget} element Element on which to attach listener.
 * @internal
 */
function trapCapturedEvent(topLevelType, handlerBaseName, element) {
  EventListener.capture(
    element,
    handlerBaseName,
    ReactEventEmitter.TopLevelCallbackCreator.createTopLevelCallback(
      topLevelType
    )
  );
}

/**
 * `ReactEventEmitter` is used to attach top-level event listeners. For example:
 *
 *   ReactEventEmitter.putListener('myID', 'onClick', myFunction);
 *
 * This would allocate a "registration" of `('onClick', myFunction)` on 'myID'.
 *
 * @internal
 */
var ReactEventEmitter = merge(ReactEventEmitterMixin, {

  /**
   * React references `ReactEventTopLevelCallback` using this property in order
   * to allow dependency injection.
   */
  TopLevelCallbackCreator: null,

  injection: {
    /**
     * @param {function} TopLevelCallbackCreator
     */
    injectTopLevelCallbackCreator: function(TopLevelCallbackCreator) {
      ReactEventEmitter.TopLevelCallbackCreator = TopLevelCallbackCreator;
    }
  },

  /**
   * Sets whether or not any created callbacks should be enabled.
   *
   * @param {boolean} enabled True if callbacks should be enabled.
   */
  setEnabled: function(enabled) {
    ("production" !== "development" ? invariant(
      ExecutionEnvironment.canUseDOM,
      'setEnabled(...): Cannot toggle event listening in a Worker thread. ' +
      'This is likely a bug in the framework. Please report immediately.'
    ) : invariant(ExecutionEnvironment.canUseDOM));
    if (ReactEventEmitter.TopLevelCallbackCreator) {
      ReactEventEmitter.TopLevelCallbackCreator.setEnabled(enabled);
    }
  },

  /**
   * @return {boolean} True if callbacks are enabled.
   */
  isEnabled: function() {
    return !!(
      ReactEventEmitter.TopLevelCallbackCreator &&
      ReactEventEmitter.TopLevelCallbackCreator.isEnabled()
    );
  },

  /**
   * We listen for bubbled touch events on the document object.
   *
   * Firefox v8.01 (and possibly others) exhibited strange behavior when
   * mounting `onmousemove` events at some node that was not the document
   * element. The symptoms were that if your mouse is not moving over something
   * contained within that mount point (for example on the background) the
   * top-level listeners for `onmousemove` won't be called. However, if you
   * register the `mousemove` on the document object, then it will of course
   * catch all `mousemove`s. This along with iOS quirks, justifies restricting
   * top-level listeners to the document object only, at least for these
   * movement types of events and possibly all events.
   *
   * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
   *
   * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
   * they bubble to document.
   *
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {DOMDocument} contentDocument Document which owns the container
   */
  listenTo: function(registrationName, contentDocument) {
    var mountAt = contentDocument;
    var isListening = getListeningForDocument(mountAt);
    var dependencies = EventPluginRegistry.
      registrationNameDependencies[registrationName];

    var topLevelTypes = EventConstants.topLevelTypes;
    for (var i = 0, l = dependencies.length; i < l; i++) {
      var dependency = dependencies[i];
      if (!isListening[dependency]) {
        var topLevelType = topLevelTypes[dependency];

        if (topLevelType === topLevelTypes.topWheel) {
          if (isEventSupported('wheel')) {
            trapBubbledEvent(topLevelTypes.topWheel, 'wheel', mountAt);
          } else if (isEventSupported('mousewheel')) {
            trapBubbledEvent(topLevelTypes.topWheel, 'mousewheel', mountAt);
          } else {
            // Firefox needs to capture a different mouse scroll event.
            // @see http://www.quirksmode.org/dom/events/tests/scroll.html
            trapBubbledEvent(
              topLevelTypes.topWheel,
              'DOMMouseScroll',
              mountAt);
          }
        } else if (topLevelType === topLevelTypes.topScroll) {

          if (isEventSupported('scroll', true)) {
            trapCapturedEvent(topLevelTypes.topScroll, 'scroll', mountAt);
          } else {
            trapBubbledEvent(topLevelTypes.topScroll, 'scroll', window);
          }
        } else if (topLevelType === topLevelTypes.topFocus ||
            topLevelType === topLevelTypes.topBlur) {

          if (isEventSupported('focus', true)) {
            trapCapturedEvent(topLevelTypes.topFocus, 'focus', mountAt);
            trapCapturedEvent(topLevelTypes.topBlur, 'blur', mountAt);
          } else if (isEventSupported('focusin')) {
            // IE has `focusin` and `focusout` events which bubble.
            // @see http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
            trapBubbledEvent(topLevelTypes.topFocus, 'focusin', mountAt);
            trapBubbledEvent(topLevelTypes.topBlur, 'focusout', mountAt);
          }

          // to make sure blur and focus event listeners are only attached once
          isListening[topLevelTypes.topBlur] = true;
          isListening[topLevelTypes.topFocus] = true;
        } else if (topEventMapping[dependency]) {
          trapBubbledEvent(topLevelType, topEventMapping[dependency], mountAt);
        }

        isListening[dependency] = true;
      }
    }
  },

  /**
   * Listens to window scroll and resize events. We cache scroll values so that
   * application code can access them without triggering reflows.
   *
   * NOTE: Scroll events do not bubble.
   *
   * @see http://www.quirksmode.org/dom/events/scroll.html
   */
  ensureScrollValueMonitoring: function(){
    if (!isMonitoringScrollValue) {
      var refresh = ViewportMetrics.refreshScrollValues;
      EventListener.listen(window, 'scroll', refresh);
      EventListener.listen(window, 'resize', refresh);
      isMonitoringScrollValue = true;
    }
  },

  eventNameDispatchConfigs: EventPluginHub.eventNameDispatchConfigs,

  registrationNameModules: EventPluginHub.registrationNameModules,

  putListener: EventPluginHub.putListener,

  getListener: EventPluginHub.getListener,

  deleteListener: EventPluginHub.deleteListener,

  deleteAllListeners: EventPluginHub.deleteAllListeners,

  trapBubbledEvent: trapBubbledEvent,

  trapCapturedEvent: trapCapturedEvent

});

module.exports = ReactEventEmitter;

},{"./EventConstants":14,"./EventListener":15,"./EventPluginHub":16,"./EventPluginRegistry":17,"./ExecutionEnvironment":20,"./ReactEventEmitterMixin":49,"./ViewportMetrics":85,"./invariant":108,"./isEventSupported":109,"./merge":117}],49:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactEventEmitterMixin
 */

"use strict";

var EventPluginHub = require("./EventPluginHub");
var ReactUpdates = require("./ReactUpdates");

function runEventQueueInBatch(events) {
  EventPluginHub.enqueueEvents(events);
  EventPluginHub.processEventQueue();
}

var ReactEventEmitterMixin = {

  /**
   * Streams a fired top-level event to `EventPluginHub` where plugins have the
   * opportunity to create `ReactEvent`s to be dispatched.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {object} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native environment event.
   */
  handleTopLevel: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {
    var events = EventPluginHub.extractEvents(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent
    );

    // Event queue being processed in the same cycle allows `preventDefault`.
    ReactUpdates.batchedUpdates(runEventQueueInBatch, events);
  }
};

module.exports = ReactEventEmitterMixin;

},{"./EventPluginHub":16,"./ReactUpdates":70}],50:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactEventTopLevelCallback
 * @typechecks static-only
 */

"use strict";

var PooledClass = require("./PooledClass");
var ReactEventEmitter = require("./ReactEventEmitter");
var ReactInstanceHandles = require("./ReactInstanceHandles");
var ReactMount = require("./ReactMount");

var getEventTarget = require("./getEventTarget");
var mixInto = require("./mixInto");

/**
 * @type {boolean}
 * @private
 */
var _topLevelListenersEnabled = true;

/**
 * Finds the parent React component of `node`.
 *
 * @param {*} node
 * @return {?DOMEventTarget} Parent container, or `null` if the specified node
 *                           is not nested.
 */
function findParent(node) {
  // TODO: It may be a good idea to cache this to prevent unnecessary DOM
  // traversal, but caching is difficult to do correctly without using a
  // mutation observer to listen for all DOM changes.
  var nodeID = ReactMount.getID(node);
  var rootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);
  var container = ReactMount.findReactContainerForID(rootID);
  var parent = ReactMount.getFirstReactDOM(container);
  return parent;
}

/**
 * Calls ReactEventEmitter.handleTopLevel for each node stored in bookKeeping's
 * ancestor list. Separated from createTopLevelCallback to avoid try/finally
 * deoptimization.
 *
 * @param {string} topLevelType
 * @param {DOMEvent} nativeEvent
 * @param {TopLevelCallbackBookKeeping} bookKeeping
 */
function handleTopLevelImpl(topLevelType, nativeEvent, bookKeeping) {
  var topLevelTarget = ReactMount.getFirstReactDOM(
    getEventTarget(nativeEvent)
  ) || window;

  // Loop through the hierarchy, in case there's any nested components.
  // It's important that we build the array of ancestors before calling any
  // event handlers, because event handlers can modify the DOM, leading to
  // inconsistencies with ReactMount's node cache. See #1105.
  var ancestor = topLevelTarget;
  while (ancestor) {
    bookKeeping.ancestors.push(ancestor);
    ancestor = findParent(ancestor);
  }

  for (var i = 0, l = bookKeeping.ancestors.length; i < l; i++) {
    topLevelTarget = bookKeeping.ancestors[i];
    var topLevelTargetID = ReactMount.getID(topLevelTarget) || '';
    ReactEventEmitter.handleTopLevel(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent
    );
  }
}

// Used to store ancestor hierarchy in top level callback
function TopLevelCallbackBookKeeping() {
  this.ancestors = [];
}
mixInto(TopLevelCallbackBookKeeping, {
  destructor: function() {
    this.ancestors.length = 0;
  }
});
PooledClass.addPoolingTo(TopLevelCallbackBookKeeping);

/**
 * Top-level callback creator used to implement event handling using delegation.
 * This is used via dependency injection.
 */
var ReactEventTopLevelCallback = {

  /**
   * Sets whether or not any created callbacks should be enabled.
   *
   * @param {boolean} enabled True if callbacks should be enabled.
   */
  setEnabled: function(enabled) {
    _topLevelListenersEnabled = !!enabled;
  },

  /**
   * @return {boolean} True if callbacks are enabled.
   */
  isEnabled: function() {
    return _topLevelListenersEnabled;
  },

  /**
   * Creates a callback for the supplied `topLevelType` that could be added as
   * a listener to the document. The callback computes a `topLevelTarget` which
   * should be the root node of a mounted React component where the listener
   * is attached.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @return {function} Callback for handling top-level events.
   */
  createTopLevelCallback: function(topLevelType) {
    return function(nativeEvent) {
      if (!_topLevelListenersEnabled) {
        return;
      }

      var bookKeeping = TopLevelCallbackBookKeeping.getPooled();
      try {
        handleTopLevelImpl(topLevelType, nativeEvent, bookKeeping);
      } finally {
        TopLevelCallbackBookKeeping.release(bookKeeping);
      }
    };
  }

};

module.exports = ReactEventTopLevelCallback;

},{"./PooledClass":23,"./ReactEventEmitter":48,"./ReactInstanceHandles":53,"./ReactMount":55,"./getEventTarget":101,"./mixInto":120}],51:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactInjection
 */

"use strict";

var DOMProperty = require("./DOMProperty");
var EventPluginHub = require("./EventPluginHub");
var ReactDOM = require("./ReactDOM");
var ReactEventEmitter = require("./ReactEventEmitter");
var ReactPerf = require("./ReactPerf");
var ReactRootIndex = require("./ReactRootIndex");
var ReactUpdates = require("./ReactUpdates");

var ReactInjection = {
  DOMProperty: DOMProperty.injection,
  EventPluginHub: EventPluginHub.injection,
  DOM: ReactDOM.injection,
  EventEmitter: ReactEventEmitter.injection,
  Perf: ReactPerf.injection,
  RootIndex: ReactRootIndex.injection,
  Updates: ReactUpdates.injection
};

module.exports = ReactInjection;

},{"./DOMProperty":8,"./EventPluginHub":16,"./ReactDOM":32,"./ReactEventEmitter":48,"./ReactPerf":60,"./ReactRootIndex":67,"./ReactUpdates":70}],52:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactInputSelection
 */

"use strict";

var ReactDOMSelection = require("./ReactDOMSelection");

var containsNode = require("./containsNode");
var getActiveElement = require("./getActiveElement");

function isInDocument(node) {
  return containsNode(document.documentElement, node);
}

/**
 * @ReactInputSelection: React input selection module. Based on Selection.js,
 * but modified to be suitable for react and has a couple of bug fixes (doesn't
 * assume buttons have range selections allowed).
 * Input selection module for React.
 */
var ReactInputSelection = {

  hasSelectionCapabilities: function(elem) {
    return elem && (
      (elem.nodeName === 'INPUT' && elem.type === 'text') ||
      elem.nodeName === 'TEXTAREA' ||
      elem.contentEditable === 'true'
    );
  },

  getSelectionInformation: function() {
    var focusedElem = getActiveElement();
    return {
      focusedElem: focusedElem,
      selectionRange:
          ReactInputSelection.hasSelectionCapabilities(focusedElem) ?
          ReactInputSelection.getSelection(focusedElem) :
          null
    };
  },

  /**
   * @restoreSelection: If any selection information was potentially lost,
   * restore it. This is useful when performing operations that could remove dom
   * nodes and place them back in, resulting in focus being lost.
   */
  restoreSelection: function(priorSelectionInformation) {
    var curFocusedElem = getActiveElement();
    var priorFocusedElem = priorSelectionInformation.focusedElem;
    var priorSelectionRange = priorSelectionInformation.selectionRange;
    if (curFocusedElem !== priorFocusedElem &&
        isInDocument(priorFocusedElem)) {
      if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
        ReactInputSelection.setSelection(
          priorFocusedElem,
          priorSelectionRange
        );
      }
      priorFocusedElem.focus();
    }
  },

  /**
   * @getSelection: Gets the selection bounds of a focused textarea, input or
   * contentEditable node.
   * -@input: Look up selection bounds of this input
   * -@return {start: selectionStart, end: selectionEnd}
   */
  getSelection: function(input) {
    var selection;

    if ('selectionStart' in input) {
      // Modern browser with input or textarea.
      selection = {
        start: input.selectionStart,
        end: input.selectionEnd
      };
    } else if (document.selection && input.nodeName === 'INPUT') {
      // IE8 input.
      var range = document.selection.createRange();
      // There can only be one selection per document in IE, so it must
      // be in our element.
      if (range.parentElement() === input) {
        selection = {
          start: -range.moveStart('character', -input.value.length),
          end: -range.moveEnd('character', -input.value.length)
        };
      }
    } else {
      // Content editable or old IE textarea.
      selection = ReactDOMSelection.getOffsets(input);
    }

    return selection || {start: 0, end: 0};
  },

  /**
   * @setSelection: Sets the selection bounds of a textarea or input and focuses
   * the input.
   * -@input     Set selection bounds of this input or textarea
   * -@offsets   Object of same form that is returned from get*
   */
  setSelection: function(input, offsets) {
    var start = offsets.start;
    var end = offsets.end;
    if (typeof end === 'undefined') {
      end = start;
    }

    if ('selectionStart' in input) {
      input.selectionStart = start;
      input.selectionEnd = Math.min(end, input.value.length);
    } else if (document.selection && input.nodeName === 'INPUT') {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveStart('character', start);
      range.moveEnd('character', end - start);
      range.select();
    } else {
      ReactDOMSelection.setOffsets(input, offsets);
    }
  }
};

module.exports = ReactInputSelection;

},{"./ReactDOMSelection":41,"./containsNode":88,"./getActiveElement":99}],53:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactInstanceHandles
 * @typechecks static-only
 */

"use strict";

var ReactRootIndex = require("./ReactRootIndex");

var invariant = require("./invariant");

var SEPARATOR = '.';
var SEPARATOR_LENGTH = SEPARATOR.length;

/**
 * Maximum depth of traversals before we consider the possibility of a bad ID.
 */
var MAX_TREE_DEPTH = 100;

/**
 * Creates a DOM ID prefix to use when mounting React components.
 *
 * @param {number} index A unique integer
 * @return {string} React root ID.
 * @internal
 */
function getReactRootIDString(index) {
  return SEPARATOR + index.toString(36);
}

/**
 * Checks if a character in the supplied ID is a separator or the end.
 *
 * @param {string} id A React DOM ID.
 * @param {number} index Index of the character to check.
 * @return {boolean} True if the character is a separator or end of the ID.
 * @private
 */
function isBoundary(id, index) {
  return id.charAt(index) === SEPARATOR || index === id.length;
}

/**
 * Checks if the supplied string is a valid React DOM ID.
 *
 * @param {string} id A React DOM ID, maybe.
 * @return {boolean} True if the string is a valid React DOM ID.
 * @private
 */
function isValidID(id) {
  return id === '' || (
    id.charAt(0) === SEPARATOR && id.charAt(id.length - 1) !== SEPARATOR
  );
}

/**
 * Checks if the first ID is an ancestor of or equal to the second ID.
 *
 * @param {string} ancestorID
 * @param {string} descendantID
 * @return {boolean} True if `ancestorID` is an ancestor of `descendantID`.
 * @internal
 */
function isAncestorIDOf(ancestorID, descendantID) {
  return (
    descendantID.indexOf(ancestorID) === 0 &&
    isBoundary(descendantID, ancestorID.length)
  );
}

/**
 * Gets the parent ID of the supplied React DOM ID, `id`.
 *
 * @param {string} id ID of a component.
 * @return {string} ID of the parent, or an empty string.
 * @private
 */
function getParentID(id) {
  return id ? id.substr(0, id.lastIndexOf(SEPARATOR)) : '';
}

/**
 * Gets the next DOM ID on the tree path from the supplied `ancestorID` to the
 * supplied `destinationID`. If they are equal, the ID is returned.
 *
 * @param {string} ancestorID ID of an ancestor node of `destinationID`.
 * @param {string} destinationID ID of the destination node.
 * @return {string} Next ID on the path from `ancestorID` to `destinationID`.
 * @private
 */
function getNextDescendantID(ancestorID, destinationID) {
  ("production" !== "development" ? invariant(
    isValidID(ancestorID) && isValidID(destinationID),
    'getNextDescendantID(%s, %s): Received an invalid React DOM ID.',
    ancestorID,
    destinationID
  ) : invariant(isValidID(ancestorID) && isValidID(destinationID)));
  ("production" !== "development" ? invariant(
    isAncestorIDOf(ancestorID, destinationID),
    'getNextDescendantID(...): React has made an invalid assumption about ' +
    'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.',
    ancestorID,
    destinationID
  ) : invariant(isAncestorIDOf(ancestorID, destinationID)));
  if (ancestorID === destinationID) {
    return ancestorID;
  }
  // Skip over the ancestor and the immediate separator. Traverse until we hit
  // another separator or we reach the end of `destinationID`.
  var start = ancestorID.length + SEPARATOR_LENGTH;
  for (var i = start; i < destinationID.length; i++) {
    if (isBoundary(destinationID, i)) {
      break;
    }
  }
  return destinationID.substr(0, i);
}

/**
 * Gets the nearest common ancestor ID of two IDs.
 *
 * Using this ID scheme, the nearest common ancestor ID is the longest common
 * prefix of the two IDs that immediately preceded a "marker" in both strings.
 *
 * @param {string} oneID
 * @param {string} twoID
 * @return {string} Nearest common ancestor ID, or the empty string if none.
 * @private
 */
function getFirstCommonAncestorID(oneID, twoID) {
  var minLength = Math.min(oneID.length, twoID.length);
  if (minLength === 0) {
    return '';
  }
  var lastCommonMarkerIndex = 0;
  // Use `<=` to traverse until the "EOL" of the shorter string.
  for (var i = 0; i <= minLength; i++) {
    if (isBoundary(oneID, i) && isBoundary(twoID, i)) {
      lastCommonMarkerIndex = i;
    } else if (oneID.charAt(i) !== twoID.charAt(i)) {
      break;
    }
  }
  var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
  ("production" !== "development" ? invariant(
    isValidID(longestCommonID),
    'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s',
    oneID,
    twoID,
    longestCommonID
  ) : invariant(isValidID(longestCommonID)));
  return longestCommonID;
}

/**
 * Traverses the parent path between two IDs (either up or down). The IDs must
 * not be the same, and there must exist a parent path between them. If the
 * callback returns `false`, traversal is stopped.
 *
 * @param {?string} start ID at which to start traversal.
 * @param {?string} stop ID at which to end traversal.
 * @param {function} cb Callback to invoke each ID with.
 * @param {?boolean} skipFirst Whether or not to skip the first node.
 * @param {?boolean} skipLast Whether or not to skip the last node.
 * @private
 */
function traverseParentPath(start, stop, cb, arg, skipFirst, skipLast) {
  start = start || '';
  stop = stop || '';
  ("production" !== "development" ? invariant(
    start !== stop,
    'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.',
    start
  ) : invariant(start !== stop));
  var traverseUp = isAncestorIDOf(stop, start);
  ("production" !== "development" ? invariant(
    traverseUp || isAncestorIDOf(start, stop),
    'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do ' +
    'not have a parent path.',
    start,
    stop
  ) : invariant(traverseUp || isAncestorIDOf(start, stop)));
  // Traverse from `start` to `stop` one depth at a time.
  var depth = 0;
  var traverse = traverseUp ? getParentID : getNextDescendantID;
  for (var id = start; /* until break */; id = traverse(id, stop)) {
    var ret;
    if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
      ret = cb(id, traverseUp, arg);
    }
    if (ret === false || id === stop) {
      // Only break //after// visiting `stop`.
      break;
    }
    ("production" !== "development" ? invariant(
      depth++ < MAX_TREE_DEPTH,
      'traverseParentPath(%s, %s, ...): Detected an infinite loop while ' +
      'traversing the React DOM ID tree. This may be due to malformed IDs: %s',
      start, stop
    ) : invariant(depth++ < MAX_TREE_DEPTH));
  }
}

/**
 * Manages the IDs assigned to DOM representations of React components. This
 * uses a specific scheme in order to traverse the DOM efficiently (e.g. in
 * order to simulate events).
 *
 * @internal
 */
var ReactInstanceHandles = {

  /**
   * Constructs a React root ID
   * @return {string} A React root ID.
   */
  createReactRootID: function() {
    return getReactRootIDString(ReactRootIndex.createReactRootIndex());
  },

  /**
   * Constructs a React ID by joining a root ID with a name.
   *
   * @param {string} rootID Root ID of a parent component.
   * @param {string} name A component's name (as flattened children).
   * @return {string} A React ID.
   * @internal
   */
  createReactID: function(rootID, name) {
    return rootID + name;
  },

  /**
   * Gets the DOM ID of the React component that is the root of the tree that
   * contains the React component with the supplied DOM ID.
   *
   * @param {string} id DOM ID of a React component.
   * @return {?string} DOM ID of the React component that is the root.
   * @internal
   */
  getReactRootIDFromNodeID: function(id) {
    if (id && id.charAt(0) === SEPARATOR && id.length > 1) {
      var index = id.indexOf(SEPARATOR, 1);
      return index > -1 ? id.substr(0, index) : id;
    }
    return null;
  },

  /**
   * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
   * should would receive a `mouseEnter` or `mouseLeave` event.
   *
   * NOTE: Does not invoke the callback on the nearest common ancestor because
   * nothing "entered" or "left" that element.
   *
   * @param {string} leaveID ID being left.
   * @param {string} enterID ID being entered.
   * @param {function} cb Callback to invoke on each entered/left ID.
   * @param {*} upArg Argument to invoke the callback with on left IDs.
   * @param {*} downArg Argument to invoke the callback with on entered IDs.
   * @internal
   */
  traverseEnterLeave: function(leaveID, enterID, cb, upArg, downArg) {
    var ancestorID = getFirstCommonAncestorID(leaveID, enterID);
    if (ancestorID !== leaveID) {
      traverseParentPath(leaveID, ancestorID, cb, upArg, false, true);
    }
    if (ancestorID !== enterID) {
      traverseParentPath(ancestorID, enterID, cb, downArg, true, false);
    }
  },

  /**
   * Simulates the traversal of a two-phase, capture/bubble event dispatch.
   *
   * NOTE: This traversal happens on IDs without touching the DOM.
   *
   * @param {string} targetID ID of the target node.
   * @param {function} cb Callback to invoke.
   * @param {*} arg Argument to invoke the callback with.
   * @internal
   */
  traverseTwoPhase: function(targetID, cb, arg) {
    if (targetID) {
      traverseParentPath('', targetID, cb, arg, true, false);
      traverseParentPath(targetID, '', cb, arg, false, true);
    }
  },

  /**
   * Traverse a node ID, calling the supplied `cb` for each ancestor ID. For
   * example, passing `.0.$row-0.1` would result in `cb` getting called
   * with `.0`, `.0.$row-0`, and `.0.$row-0.1`.
   *
   * NOTE: This traversal happens on IDs without touching the DOM.
   *
   * @param {string} targetID ID of the target node.
   * @param {function} cb Callback to invoke.
   * @param {*} arg Argument to invoke the callback with.
   * @internal
   */
  traverseAncestors: function(targetID, cb, arg) {
    traverseParentPath('', targetID, cb, arg, true, false);
  },

  /**
   * Exposed for unit testing.
   * @private
   */
  _getFirstCommonAncestorID: getFirstCommonAncestorID,

  /**
   * Exposed for unit testing.
   * @private
   */
  _getNextDescendantID: getNextDescendantID,

  isAncestorIDOf: isAncestorIDOf,

  SEPARATOR: SEPARATOR

};

module.exports = ReactInstanceHandles;

},{"./ReactRootIndex":67,"./invariant":108}],54:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactMarkupChecksum
 */

"use strict";

var adler32 = require("./adler32");

var ReactMarkupChecksum = {
  CHECKSUM_ATTR_NAME: 'data-react-checksum',

  /**
   * @param {string} markup Markup string
   * @return {string} Markup string with checksum attribute attached
   */
  addChecksumToMarkup: function(markup) {
    var checksum = adler32(markup);
    return markup.replace(
      '>',
      ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '">'
    );
  },

  /**
   * @param {string} markup to use
   * @param {DOMElement} element root React element
   * @returns {boolean} whether or not the markup is the same
   */
  canReuseMarkup: function(markup, element) {
    var existingChecksum = element.getAttribute(
      ReactMarkupChecksum.CHECKSUM_ATTR_NAME
    );
    existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
    var markupChecksum = adler32(markup);
    return markupChecksum === existingChecksum;
  }
};

module.exports = ReactMarkupChecksum;

},{"./adler32":87}],55:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactMount
 */

"use strict";

var DOMProperty = require("./DOMProperty");
var ReactEventEmitter = require("./ReactEventEmitter");
var ReactInstanceHandles = require("./ReactInstanceHandles");
var ReactPerf = require("./ReactPerf");

var containsNode = require("./containsNode");
var getReactRootElementInContainer = require("./getReactRootElementInContainer");
var invariant = require("./invariant");
var shouldUpdateReactComponent = require("./shouldUpdateReactComponent");

var SEPARATOR = ReactInstanceHandles.SEPARATOR;

var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
var nodeCache = {};

var ELEMENT_NODE_TYPE = 1;
var DOC_NODE_TYPE = 9;

/** Mapping from reactRootID to React component instance. */
var instancesByReactRootID = {};

/** Mapping from reactRootID to `container` nodes. */
var containersByReactRootID = {};

if ("production" !== "development") {
  /** __DEV__-only mapping from reactRootID to root elements. */
  var rootElementsByReactRootID = {};
}

// Used to store breadth-first search state in findComponentRoot.
var findComponentRootReusableArray = [];

/**
 * @param {DOMElement} container DOM element that may contain a React component.
 * @return {?string} A "reactRoot" ID, if a React component is rendered.
 */
function getReactRootID(container) {
  var rootElement = getReactRootElementInContainer(container);
  return rootElement && ReactMount.getID(rootElement);
}

/**
 * Accessing node[ATTR_NAME] or calling getAttribute(ATTR_NAME) on a form
 * element can return its control whose name or ID equals ATTR_NAME. All
 * DOM nodes support `getAttributeNode` but this can also get called on
 * other objects so just return '' if we're given something other than a
 * DOM node (such as window).
 *
 * @param {?DOMElement|DOMWindow|DOMDocument|DOMTextNode} node DOM node.
 * @return {string} ID of the supplied `domNode`.
 */
function getID(node) {
  var id = internalGetID(node);
  if (id) {
    if (nodeCache.hasOwnProperty(id)) {
      var cached = nodeCache[id];
      if (cached !== node) {
        ("production" !== "development" ? invariant(
          !isValid(cached, id),
          'ReactMount: Two valid but unequal nodes with the same `%s`: %s',
          ATTR_NAME, id
        ) : invariant(!isValid(cached, id)));

        nodeCache[id] = node;
      }
    } else {
      nodeCache[id] = node;
    }
  }

  return id;
}

function internalGetID(node) {
  // If node is something like a window, document, or text node, none of
  // which support attributes or a .getAttribute method, gracefully return
  // the empty string, as if the attribute were missing.
  return node && node.getAttribute && node.getAttribute(ATTR_NAME) || '';
}

/**
 * Sets the React-specific ID of the given node.
 *
 * @param {DOMElement} node The DOM node whose ID will be set.
 * @param {string} id The value of the ID attribute.
 */
function setID(node, id) {
  var oldID = internalGetID(node);
  if (oldID !== id) {
    delete nodeCache[oldID];
  }
  node.setAttribute(ATTR_NAME, id);
  nodeCache[id] = node;
}

/**
 * Finds the node with the supplied React-generated DOM ID.
 *
 * @param {string} id A React-generated DOM ID.
 * @return {DOMElement} DOM node with the suppled `id`.
 * @internal
 */
function getNode(id) {
  if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
    nodeCache[id] = ReactMount.findReactNodeByID(id);
  }
  return nodeCache[id];
}

/**
 * A node is "valid" if it is contained by a currently mounted container.
 *
 * This means that the node does not have to be contained by a document in
 * order to be considered valid.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @param {string} id The expected ID of the node.
 * @return {boolean} Whether the node is contained by a mounted container.
 */
function isValid(node, id) {
  if (node) {
    ("production" !== "development" ? invariant(
      internalGetID(node) === id,
      'ReactMount: Unexpected modification of `%s`',
      ATTR_NAME
    ) : invariant(internalGetID(node) === id));

    var container = ReactMount.findReactContainerForID(id);
    if (container && containsNode(container, node)) {
      return true;
    }
  }

  return false;
}

/**
 * Causes the cache to forget about one React-specific ID.
 *
 * @param {string} id The ID to forget.
 */
function purgeID(id) {
  delete nodeCache[id];
}

var deepestNodeSoFar = null;
function findDeepestCachedAncestorImpl(ancestorID) {
  var ancestor = nodeCache[ancestorID];
  if (ancestor && isValid(ancestor, ancestorID)) {
    deepestNodeSoFar = ancestor;
  } else {
    // This node isn't populated in the cache, so presumably none of its
    // descendants are. Break out of the loop.
    return false;
  }
}

/**
 * Return the deepest cached node whose ID is a prefix of `targetID`.
 */
function findDeepestCachedAncestor(targetID) {
  deepestNodeSoFar = null;
  ReactInstanceHandles.traverseAncestors(
    targetID,
    findDeepestCachedAncestorImpl
  );

  var foundNode = deepestNodeSoFar;
  deepestNodeSoFar = null;
  return foundNode;
}

/**
 * Mounting is the process of initializing a React component by creatings its
 * representative DOM elements and inserting them into a supplied `container`.
 * Any prior content inside `container` is destroyed in the process.
 *
 *   ReactMount.renderComponent(
 *     component,
 *     document.getElementById('container')
 *   );
 *
 *   <div id="container">                   <-- Supplied `container`.
 *     <div data-reactid=".3">              <-- Rendered reactRoot of React
 *       // ...                                 component.
 *     </div>
 *   </div>
 *
 * Inside of `container`, the first element rendered is the "reactRoot".
 */
var ReactMount = {
  /** Time spent generating markup. */
  totalInstantiationTime: 0,

  /** Time spent inserting markup into the DOM. */
  totalInjectionTime: 0,

  /** Whether support for touch events should be initialized. */
  useTouchEvents: false,

  /** Exposed for debugging purposes **/
  _instancesByReactRootID: instancesByReactRootID,

  /**
   * This is a hook provided to support rendering React components while
   * ensuring that the apparent scroll position of its `container` does not
   * change.
   *
   * @param {DOMElement} container The `container` being rendered into.
   * @param {function} renderCallback This must be called once to do the render.
   */
  scrollMonitor: function(container, renderCallback) {
    renderCallback();
  },

  /**
   * Take a component that's already mounted into the DOM and replace its props
   * @param {ReactComponent} prevComponent component instance already in the DOM
   * @param {ReactComponent} nextComponent component instance to render
   * @param {DOMElement} container container to render into
   * @param {?function} callback function triggered on completion
   */
  _updateRootComponent: function(
      prevComponent,
      nextComponent,
      container,
      callback) {
    var nextProps = nextComponent.props;
    ReactMount.scrollMonitor(container, function() {
      prevComponent.replaceProps(nextProps, callback);
    });

    if ("production" !== "development") {
      // Record the root element in case it later gets transplanted.
      rootElementsByReactRootID[getReactRootID(container)] =
        getReactRootElementInContainer(container);
    }

    return prevComponent;
  },

  /**
   * Register a component into the instance map and starts scroll value
   * monitoring
   * @param {ReactComponent} nextComponent component instance to render
   * @param {DOMElement} container container to render into
   * @return {string} reactRoot ID prefix
   */
  _registerComponent: function(nextComponent, container) {
    ("production" !== "development" ? invariant(
      container && (
        container.nodeType === ELEMENT_NODE_TYPE ||
        container.nodeType === DOC_NODE_TYPE
      ),
      '_registerComponent(...): Target container is not a DOM element.'
    ) : invariant(container && (
      container.nodeType === ELEMENT_NODE_TYPE ||
      container.nodeType === DOC_NODE_TYPE
    )));

    ReactEventEmitter.ensureScrollValueMonitoring();

    var reactRootID = ReactMount.registerContainer(container);
    instancesByReactRootID[reactRootID] = nextComponent;
    return reactRootID;
  },

  /**
   * Render a new component into the DOM.
   * @param {ReactComponent} nextComponent component instance to render
   * @param {DOMElement} container container to render into
   * @param {boolean} shouldReuseMarkup if we should skip the markup insertion
   * @return {ReactComponent} nextComponent
   */
  _renderNewRootComponent: ReactPerf.measure(
    'ReactMount',
    '_renderNewRootComponent',
    function(
        nextComponent,
        container,
        shouldReuseMarkup) {
      var reactRootID = ReactMount._registerComponent(nextComponent, container);
      nextComponent.mountComponentIntoNode(
        reactRootID,
        container,
        shouldReuseMarkup
      );

      if ("production" !== "development") {
        // Record the root element in case it later gets transplanted.
        rootElementsByReactRootID[reactRootID] =
          getReactRootElementInContainer(container);
      }

      return nextComponent;
    }
  ),

  /**
   * Renders a React component into the DOM in the supplied `container`.
   *
   * If the React component was previously rendered into `container`, this will
   * perform an update on it and only mutate the DOM as necessary to reflect the
   * latest React component.
   *
   * @param {ReactComponent} nextComponent Component instance to render.
   * @param {DOMElement} container DOM element to render into.
   * @param {?function} callback function triggered on completion
   * @return {ReactComponent} Component instance rendered in `container`.
   */
  renderComponent: function(nextComponent, container, callback) {
    var prevComponent = instancesByReactRootID[getReactRootID(container)];

    if (prevComponent) {
      if (shouldUpdateReactComponent(prevComponent, nextComponent)) {
        return ReactMount._updateRootComponent(
          prevComponent,
          nextComponent,
          container,
          callback
        );
      } else {
        ReactMount.unmountComponentAtNode(container);
      }
    }

    var reactRootElement = getReactRootElementInContainer(container);
    var containerHasReactMarkup =
      reactRootElement && ReactMount.isRenderedByReact(reactRootElement);

    var shouldReuseMarkup = containerHasReactMarkup && !prevComponent;

    var component = ReactMount._renderNewRootComponent(
      nextComponent,
      container,
      shouldReuseMarkup
    );
    callback && callback.call(component);
    return component;
  },

  /**
   * Constructs a component instance of `constructor` with `initialProps` and
   * renders it into the supplied `container`.
   *
   * @param {function} constructor React component constructor.
   * @param {?object} props Initial props of the component instance.
   * @param {DOMElement} container DOM element to render into.
   * @return {ReactComponent} Component instance rendered in `container`.
   */
  constructAndRenderComponent: function(constructor, props, container) {
    return ReactMount.renderComponent(constructor(props), container);
  },

  /**
   * Constructs a component instance of `constructor` with `initialProps` and
   * renders it into a container node identified by supplied `id`.
   *
   * @param {function} componentConstructor React component constructor
   * @param {?object} props Initial props of the component instance.
   * @param {string} id ID of the DOM element to render into.
   * @return {ReactComponent} Component instance rendered in the container node.
   */
  constructAndRenderComponentByID: function(constructor, props, id) {
    var domNode = document.getElementById(id);
    ("production" !== "development" ? invariant(
      domNode,
      'Tried to get element with id of "%s" but it is not present on the page.',
      id
    ) : invariant(domNode));
    return ReactMount.constructAndRenderComponent(constructor, props, domNode);
  },

  /**
   * Registers a container node into which React components will be rendered.
   * This also creates the "reactRoot" ID that will be assigned to the element
   * rendered within.
   *
   * @param {DOMElement} container DOM element to register as a container.
   * @return {string} The "reactRoot" ID of elements rendered within.
   */
  registerContainer: function(container) {
    var reactRootID = getReactRootID(container);
    if (reactRootID) {
      // If one exists, make sure it is a valid "reactRoot" ID.
      reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
    }
    if (!reactRootID) {
      // No valid "reactRoot" ID found, create one.
      reactRootID = ReactInstanceHandles.createReactRootID();
    }
    containersByReactRootID[reactRootID] = container;
    return reactRootID;
  },

  /**
   * Unmounts and destroys the React component rendered in the `container`.
   *
   * @param {DOMElement} container DOM element containing a React component.
   * @return {boolean} True if a component was found in and unmounted from
   *                   `container`
   */
  unmountComponentAtNode: function(container) {
    var reactRootID = getReactRootID(container);
    var component = instancesByReactRootID[reactRootID];
    if (!component) {
      return false;
    }
    ReactMount.unmountComponentFromNode(component, container);
    delete instancesByReactRootID[reactRootID];
    delete containersByReactRootID[reactRootID];
    if ("production" !== "development") {
      delete rootElementsByReactRootID[reactRootID];
    }
    return true;
  },

  /**
   * Unmounts a component and removes it from the DOM.
   *
   * @param {ReactComponent} instance React component instance.
   * @param {DOMElement} container DOM element to unmount from.
   * @final
   * @internal
   * @see {ReactMount.unmountComponentAtNode}
   */
  unmountComponentFromNode: function(instance, container) {
    instance.unmountComponent();

    if (container.nodeType === DOC_NODE_TYPE) {
      container = container.documentElement;
    }

    // http://jsperf.com/emptying-a-node
    while (container.lastChild) {
      container.removeChild(container.lastChild);
    }
  },

  /**
   * Finds the container DOM element that contains React component to which the
   * supplied DOM `id` belongs.
   *
   * @param {string} id The ID of an element rendered by a React component.
   * @return {?DOMElement} DOM element that contains the `id`.
   */
  findReactContainerForID: function(id) {
    var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
    var container = containersByReactRootID[reactRootID];

    if ("production" !== "development") {
      var rootElement = rootElementsByReactRootID[reactRootID];
      if (rootElement && rootElement.parentNode !== container) {
        ("production" !== "development" ? invariant(
          // Call internalGetID here because getID calls isValid which calls
          // findReactContainerForID (this function).
          internalGetID(rootElement) === reactRootID,
          'ReactMount: Root element ID differed from reactRootID.'
        ) : invariant(// Call internalGetID here because getID calls isValid which calls
        // findReactContainerForID (this function).
        internalGetID(rootElement) === reactRootID));

        var containerChild = container.firstChild;
        if (containerChild &&
            reactRootID === internalGetID(containerChild)) {
          // If the container has a new child with the same ID as the old
          // root element, then rootElementsByReactRootID[reactRootID] is
          // just stale and needs to be updated. The case that deserves a
          // warning is when the container is empty.
          rootElementsByReactRootID[reactRootID] = containerChild;
        } else {
          console.warn(
            'ReactMount: Root element has been removed from its original ' +
            'container. New container:', rootElement.parentNode
          );
        }
      }
    }

    return container;
  },

  /**
   * Finds an element rendered by React with the supplied ID.
   *
   * @param {string} id ID of a DOM node in the React component.
   * @return {DOMElement} Root DOM node of the React component.
   */
  findReactNodeByID: function(id) {
    var reactRoot = ReactMount.findReactContainerForID(id);
    return ReactMount.findComponentRoot(reactRoot, id);
  },

  /**
   * True if the supplied `node` is rendered by React.
   *
   * @param {*} node DOM Element to check.
   * @return {boolean} True if the DOM Element appears to be rendered by React.
   * @internal
   */
  isRenderedByReact: function(node) {
    if (node.nodeType !== 1) {
      // Not a DOMElement, therefore not a React component
      return false;
    }
    var id = ReactMount.getID(node);
    return id ? id.charAt(0) === SEPARATOR : false;
  },

  /**
   * Traverses up the ancestors of the supplied node to find a node that is a
   * DOM representation of a React component.
   *
   * @param {*} node
   * @return {?DOMEventTarget}
   * @internal
   */
  getFirstReactDOM: function(node) {
    var current = node;
    while (current && current.parentNode !== current) {
      if (ReactMount.isRenderedByReact(current)) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
  },

  /**
   * Finds a node with the supplied `targetID` inside of the supplied
   * `ancestorNode`.  Exploits the ID naming scheme to perform the search
   * quickly.
   *
   * @param {DOMEventTarget} ancestorNode Search from this root.
   * @pararm {string} targetID ID of the DOM representation of the component.
   * @return {DOMEventTarget} DOM node with the supplied `targetID`.
   * @internal
   */
  findComponentRoot: function(ancestorNode, targetID) {
    var firstChildren = findComponentRootReusableArray;
    var childIndex = 0;

    var deepestAncestor = findDeepestCachedAncestor(targetID) || ancestorNode;

    firstChildren[0] = deepestAncestor.firstChild;
    firstChildren.length = 1;

    while (childIndex < firstChildren.length) {
      var child = firstChildren[childIndex++];
      var targetChild;

      while (child) {
        var childID = ReactMount.getID(child);
        if (childID) {
          // Even if we find the node we're looking for, we finish looping
          // through its siblings to ensure they're cached so that we don't have
          // to revisit this node again. Otherwise, we make n^2 calls to getID
          // when visiting the many children of a single node in order.

          if (targetID === childID) {
            targetChild = child;
          } else if (ReactInstanceHandles.isAncestorIDOf(childID, targetID)) {
            // If we find a child whose ID is an ancestor of the given ID,
            // then we can be sure that we only want to search the subtree
            // rooted at this child, so we can throw out the rest of the
            // search state.
            firstChildren.length = childIndex = 0;
            firstChildren.push(child.firstChild);
          }

        } else {
          // If this child had no ID, then there's a chance that it was
          // injected automatically by the browser, as when a `<table>`
          // element sprouts an extra `<tbody>` child as a side effect of
          // `.innerHTML` parsing. Optimistically continue down this
          // branch, but not before examining the other siblings.
          firstChildren.push(child.firstChild);
        }

        child = child.nextSibling;
      }

      if (targetChild) {
        // Emptying firstChildren/findComponentRootReusableArray is
        // not necessary for correctness, but it helps the GC reclaim
        // any nodes that were left at the end of the search.
        firstChildren.length = 0;

        return targetChild;
      }
    }

    firstChildren.length = 0;

    ("production" !== "development" ? invariant(
      false,
      'findComponentRoot(..., %s): Unable to find element. This probably ' +
      'means the DOM was unexpectedly mutated (e.g., by the browser). ' +
      'Try inspecting the child nodes of the element with React ID `%s`.',
      targetID,
      ReactMount.getID(ancestorNode)
    ) : invariant(false));
  },


  /**
   * React ID utilities.
   */

  getReactRootID: getReactRootID,

  getID: getID,

  setID: setID,

  getNode: getNode,

  purgeID: purgeID
};

module.exports = ReactMount;

},{"./DOMProperty":8,"./ReactEventEmitter":48,"./ReactInstanceHandles":53,"./ReactPerf":60,"./containsNode":88,"./getReactRootElementInContainer":104,"./invariant":108,"./shouldUpdateReactComponent":126}],56:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactMountReady
 */

"use strict";

var PooledClass = require("./PooledClass");

var mixInto = require("./mixInto");

/**
 * A specialized pseudo-event module to help keep track of components waiting to
 * be notified when their DOM representations are available for use.
 *
 * This implements `PooledClass`, so you should never need to instantiate this.
 * Instead, use `ReactMountReady.getPooled()`.
 *
 * @param {?array<function>} initialCollection
 * @class ReactMountReady
 * @implements PooledClass
 * @internal
 */
function ReactMountReady(initialCollection) {
  this._queue = initialCollection || null;
}

mixInto(ReactMountReady, {

  /**
   * Enqueues a callback to be invoked when `notifyAll` is invoked. This is used
   * to enqueue calls to `componentDidMount` and `componentDidUpdate`.
   *
   * @param {ReactComponent} component Component being rendered.
   * @param {function(DOMElement)} callback Invoked when `notifyAll` is invoked.
   * @internal
   */
  enqueue: function(component, callback) {
    this._queue = this._queue || [];
    this._queue.push({component: component, callback: callback});
  },

  /**
   * Invokes all enqueued callbacks and clears the queue. This is invoked after
   * the DOM representation of a component has been created or updated.
   *
   * @internal
   */
  notifyAll: function() {
    var queue = this._queue;
    if (queue) {
      this._queue = null;
      for (var i = 0, l = queue.length; i < l; i++) {
        var component = queue[i].component;
        var callback = queue[i].callback;
        callback.call(component);
      }
      queue.length = 0;
    }
  },

  /**
   * Resets the internal queue.
   *
   * @internal
   */
  reset: function() {
    this._queue = null;
  },

  /**
   * `PooledClass` looks for this.
   */
  destructor: function() {
    this.reset();
  }

});

PooledClass.addPoolingTo(ReactMountReady);

module.exports = ReactMountReady;

},{"./PooledClass":23,"./mixInto":120}],57:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactMultiChild
 * @typechecks static-only
 */

"use strict";

var ReactComponent = require("./ReactComponent");
var ReactMultiChildUpdateTypes = require("./ReactMultiChildUpdateTypes");

var flattenChildren = require("./flattenChildren");
var shouldUpdateReactComponent = require("./shouldUpdateReactComponent");

/**
 * Updating children of a component may trigger recursive updates. The depth is
 * used to batch recursive updates to render markup more efficiently.
 *
 * @type {number}
 * @private
 */
var updateDepth = 0;

/**
 * Queue of update configuration objects.
 *
 * Each object has a `type` property that is in `ReactMultiChildUpdateTypes`.
 *
 * @type {array<object>}
 * @private
 */
var updateQueue = [];

/**
 * Queue of markup to be rendered.
 *
 * @type {array<string>}
 * @private
 */
var markupQueue = [];

/**
 * Enqueues markup to be rendered and inserted at a supplied index.
 *
 * @param {string} parentID ID of the parent component.
 * @param {string} markup Markup that renders into an element.
 * @param {number} toIndex Destination index.
 * @private
 */
function enqueueMarkup(parentID, markup, toIndex) {
  // NOTE: Null values reduce hidden classes.
  updateQueue.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
    markupIndex: markupQueue.push(markup) - 1,
    textContent: null,
    fromIndex: null,
    toIndex: toIndex
  });
}

/**
 * Enqueues moving an existing element to another index.
 *
 * @param {string} parentID ID of the parent component.
 * @param {number} fromIndex Source index of the existing element.
 * @param {number} toIndex Destination index of the element.
 * @private
 */
function enqueueMove(parentID, fromIndex, toIndex) {
  // NOTE: Null values reduce hidden classes.
  updateQueue.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
    markupIndex: null,
    textContent: null,
    fromIndex: fromIndex,
    toIndex: toIndex
  });
}

/**
 * Enqueues removing an element at an index.
 *
 * @param {string} parentID ID of the parent component.
 * @param {number} fromIndex Index of the element to remove.
 * @private
 */
function enqueueRemove(parentID, fromIndex) {
  // NOTE: Null values reduce hidden classes.
  updateQueue.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.REMOVE_NODE,
    markupIndex: null,
    textContent: null,
    fromIndex: fromIndex,
    toIndex: null
  });
}

/**
 * Enqueues setting the text content.
 *
 * @param {string} parentID ID of the parent component.
 * @param {string} textContent Text content to set.
 * @private
 */
function enqueueTextContent(parentID, textContent) {
  // NOTE: Null values reduce hidden classes.
  updateQueue.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
    markupIndex: null,
    textContent: textContent,
    fromIndex: null,
    toIndex: null
  });
}

/**
 * Processes any enqueued updates.
 *
 * @private
 */
function processQueue() {
  if (updateQueue.length) {
    ReactComponent.BackendIDOperations.dangerouslyProcessChildrenUpdates(
      updateQueue,
      markupQueue
    );
    clearQueue();
  }
}

/**
 * Clears any enqueued updates.
 *
 * @private
 */
function clearQueue() {
  updateQueue.length = 0;
  markupQueue.length = 0;
}

/**
 * ReactMultiChild are capable of reconciling multiple children.
 *
 * @class ReactMultiChild
 * @internal
 */
var ReactMultiChild = {

  /**
   * Provides common functionality for components that must reconcile multiple
   * children. This is used by `ReactDOMComponent` to mount, update, and
   * unmount child components.
   *
   * @lends {ReactMultiChild.prototype}
   */
  Mixin: {

    /**
     * Generates a "mount image" for each of the supplied children. In the case
     * of `ReactDOMComponent`, a mount image is a string of markup.
     *
     * @param {?object} nestedChildren Nested child maps.
     * @return {array} An array of mounted representations.
     * @internal
     */
    mountChildren: function(nestedChildren, transaction) {
      var children = flattenChildren(nestedChildren);
      var mountImages = [];
      var index = 0;
      this._renderedChildren = children;
      for (var name in children) {
        var child = children[name];
        if (children.hasOwnProperty(name)) {
          // Inlined for performance, see `ReactInstanceHandles.createReactID`.
          var rootID = this._rootNodeID + name;
          var mountImage = child.mountComponent(
            rootID,
            transaction,
            this._mountDepth + 1
          );
          child._mountIndex = index;
          mountImages.push(mountImage);
          index++;
        }
      }
      return mountImages;
    },

    /**
     * Replaces any rendered children with a text content string.
     *
     * @param {string} nextContent String of content.
     * @internal
     */
    updateTextContent: function(nextContent) {
      updateDepth++;
      var errorThrown = true;
      try {
        var prevChildren = this._renderedChildren;
        // Remove any rendered children.
        for (var name in prevChildren) {
          if (prevChildren.hasOwnProperty(name)) {
            this._unmountChildByName(prevChildren[name], name);
          }
        }
        // Set new text content.
        this.setTextContent(nextContent);
        errorThrown = false;
      } finally {
        updateDepth--;
        if (!updateDepth) {
          errorThrown ? clearQueue() : processQueue();
        }
      }
    },

    /**
     * Updates the rendered children with new children.
     *
     * @param {?object} nextNestedChildren Nested child maps.
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    updateChildren: function(nextNestedChildren, transaction) {
      updateDepth++;
      var errorThrown = true;
      try {
        this._updateChildren(nextNestedChildren, transaction);
        errorThrown = false;
      } finally {
        updateDepth--;
        if (!updateDepth) {
          errorThrown ? clearQueue() : processQueue();
        }
      }
    },

    /**
     * Improve performance by isolating this hot code path from the try/catch
     * block in `updateChildren`.
     *
     * @param {?object} nextNestedChildren Nested child maps.
     * @param {ReactReconcileTransaction} transaction
     * @final
     * @protected
     */
    _updateChildren: function(nextNestedChildren, transaction) {
      var nextChildren = flattenChildren(nextNestedChildren);
      var prevChildren = this._renderedChildren;
      if (!nextChildren && !prevChildren) {
        return;
      }
      var name;
      // `nextIndex` will increment for each child in `nextChildren`, but
      // `lastIndex` will be the last index visited in `prevChildren`.
      var lastIndex = 0;
      var nextIndex = 0;
      for (name in nextChildren) {
        if (!nextChildren.hasOwnProperty(name)) {
          continue;
        }
        var prevChild = prevChildren && prevChildren[name];
        var nextChild = nextChildren[name];
        if (shouldUpdateReactComponent(prevChild, nextChild)) {
          this.moveChild(prevChild, nextIndex, lastIndex);
          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
          prevChild.receiveComponent(nextChild, transaction);
          prevChild._mountIndex = nextIndex;
        } else {
          if (prevChild) {
            // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
            this._unmountChildByName(prevChild, name);
          }
          this._mountChildByNameAtIndex(
            nextChild, name, nextIndex, transaction
          );
        }
        nextIndex++;
      }
      // Remove children that are no longer present.
      for (name in prevChildren) {
        if (prevChildren.hasOwnProperty(name) &&
            !(nextChildren && nextChildren[name])) {
          this._unmountChildByName(prevChildren[name], name);
        }
      }
    },

    /**
     * Unmounts all rendered children. This should be used to clean up children
     * when this component is unmounted.
     *
     * @internal
     */
    unmountChildren: function() {
      var renderedChildren = this._renderedChildren;
      for (var name in renderedChildren) {
        var renderedChild = renderedChildren[name];
        // TODO: When is this not true?
        if (renderedChild.unmountComponent) {
          renderedChild.unmountComponent();
        }
      }
      this._renderedChildren = null;
    },

    /**
     * Moves a child component to the supplied index.
     *
     * @param {ReactComponent} child Component to move.
     * @param {number} toIndex Destination index of the element.
     * @param {number} lastIndex Last index visited of the siblings of `child`.
     * @protected
     */
    moveChild: function(child, toIndex, lastIndex) {
      // If the index of `child` is less than `lastIndex`, then it needs to
      // be moved. Otherwise, we do not need to move it because a child will be
      // inserted or moved before `child`.
      if (child._mountIndex < lastIndex) {
        enqueueMove(this._rootNodeID, child._mountIndex, toIndex);
      }
    },

    /**
     * Creates a child component.
     *
     * @param {ReactComponent} child Component to create.
     * @param {string} mountImage Markup to insert.
     * @protected
     */
    createChild: function(child, mountImage) {
      enqueueMarkup(this._rootNodeID, mountImage, child._mountIndex);
    },

    /**
     * Removes a child component.
     *
     * @param {ReactComponent} child Child to remove.
     * @protected
     */
    removeChild: function(child) {
      enqueueRemove(this._rootNodeID, child._mountIndex);
    },

    /**
     * Sets this text content string.
     *
     * @param {string} textContent Text content to set.
     * @protected
     */
    setTextContent: function(textContent) {
      enqueueTextContent(this._rootNodeID, textContent);
    },

    /**
     * Mounts a child with the supplied name.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to mount.
     * @param {string} name Name of the child.
     * @param {number} index Index at which to insert the child.
     * @param {ReactReconcileTransaction} transaction
     * @private
     */
    _mountChildByNameAtIndex: function(child, name, index, transaction) {
      // Inlined for performance, see `ReactInstanceHandles.createReactID`.
      var rootID = this._rootNodeID + name;
      var mountImage = child.mountComponent(
        rootID,
        transaction,
        this._mountDepth + 1
      );
      child._mountIndex = index;
      this.createChild(child, mountImage);
      this._renderedChildren = this._renderedChildren || {};
      this._renderedChildren[name] = child;
    },

    /**
     * Unmounts a rendered child by name.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to unmount.
     * @param {string} name Name of the child in `this._renderedChildren`.
     * @private
     */
    _unmountChildByName: function(child, name) {
      // TODO: When is this not true?
      if (ReactComponent.isValidComponent(child)) {
        this.removeChild(child);
        child._mountIndex = null;
        child.unmountComponent();
        delete this._renderedChildren[name];
      }
    }

  }

};

module.exports = ReactMultiChild;

},{"./ReactComponent":26,"./ReactMultiChildUpdateTypes":58,"./flattenChildren":97,"./shouldUpdateReactComponent":126}],58:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactMultiChildUpdateTypes
 */

"use strict";

var keyMirror = require("./keyMirror");

/**
 * When a component's children are updated, a series of update configuration
 * objects are created in order to batch and serialize the required changes.
 *
 * Enumerates all the possible types of update configurations.
 *
 * @internal
 */
var ReactMultiChildUpdateTypes = keyMirror({
  INSERT_MARKUP: null,
  MOVE_EXISTING: null,
  REMOVE_NODE: null,
  TEXT_CONTENT: null
});

module.exports = ReactMultiChildUpdateTypes;

},{"./keyMirror":114}],59:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactOwner
 */

"use strict";

var invariant = require("./invariant");

/**
 * ReactOwners are capable of storing references to owned components.
 *
 * All components are capable of //being// referenced by owner components, but
 * only ReactOwner components are capable of //referencing// owned components.
 * The named reference is known as a "ref".
 *
 * Refs are available when mounted and updated during reconciliation.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return (
 *         <div onClick={this.handleClick}>
 *           <CustomComponent ref="custom" />
 *         </div>
 *       );
 *     },
 *     handleClick: function() {
 *       this.refs.custom.handleClick();
 *     },
 *     componentDidMount: function() {
 *       this.refs.custom.initialize();
 *     }
 *   });
 *
 * Refs should rarely be used. When refs are used, they should only be done to
 * control data that is not handled by React's data flow.
 *
 * @class ReactOwner
 */
var ReactOwner = {

  /**
   * @param {?object} object
   * @return {boolean} True if `object` is a valid owner.
   * @final
   */
  isValidOwner: function(object) {
    return !!(
      object &&
      typeof object.attachRef === 'function' &&
      typeof object.detachRef === 'function'
    );
  },

  /**
   * Adds a component by ref to an owner component.
   *
   * @param {ReactComponent} component Component to reference.
   * @param {string} ref Name by which to refer to the component.
   * @param {ReactOwner} owner Component on which to record the ref.
   * @final
   * @internal
   */
  addComponentAsRefTo: function(component, ref, owner) {
    ("production" !== "development" ? invariant(
      ReactOwner.isValidOwner(owner),
      'addComponentAsRefTo(...): Only a ReactOwner can have refs. This ' +
      'usually means that you\'re trying to add a ref to a component that ' +
      'doesn\'t have an owner (that is, was not created inside of another ' +
      'component\'s `render` method). Try rendering this component inside of ' +
      'a new top-level component which will hold the ref.'
    ) : invariant(ReactOwner.isValidOwner(owner)));
    owner.attachRef(ref, component);
  },

  /**
   * Removes a component by ref from an owner component.
   *
   * @param {ReactComponent} component Component to dereference.
   * @param {string} ref Name of the ref to remove.
   * @param {ReactOwner} owner Component on which the ref is recorded.
   * @final
   * @internal
   */
  removeComponentAsRefFrom: function(component, ref, owner) {
    ("production" !== "development" ? invariant(
      ReactOwner.isValidOwner(owner),
      'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. This ' +
      'usually means that you\'re trying to remove a ref to a component that ' +
      'doesn\'t have an owner (that is, was not created inside of another ' +
      'component\'s `render` method). Try rendering this component inside of ' +
      'a new top-level component which will hold the ref.'
    ) : invariant(ReactOwner.isValidOwner(owner)));
    // Check that `component` is still the current ref because we do not want to
    // detach the ref if another component stole it.
    if (owner.refs[ref] === component) {
      owner.detachRef(ref);
    }
  },

  /**
   * A ReactComponent must mix this in to have refs.
   *
   * @lends {ReactOwner.prototype}
   */
  Mixin: {

    /**
     * Lazily allocates the refs object and stores `component` as `ref`.
     *
     * @param {string} ref Reference name.
     * @param {component} component Component to store as `ref`.
     * @final
     * @private
     */
    attachRef: function(ref, component) {
      ("production" !== "development" ? invariant(
        component.isOwnedBy(this),
        'attachRef(%s, ...): Only a component\'s owner can store a ref to it.',
        ref
      ) : invariant(component.isOwnedBy(this)));
      var refs = this.refs || (this.refs = {});
      refs[ref] = component;
    },

    /**
     * Detaches a reference name.
     *
     * @param {string} ref Name to dereference.
     * @final
     * @private
     */
    detachRef: function(ref) {
      delete this.refs[ref];
    }

  }

};

module.exports = ReactOwner;

},{"./invariant":108}],60:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactPerf
 * @typechecks static-only
 */

"use strict";

/**
 * ReactPerf is a general AOP system designed to measure performance. This
 * module only has the hooks: see ReactDefaultPerf for the analysis tool.
 */
var ReactPerf = {
  /**
   * Boolean to enable/disable measurement. Set to false by default to prevent
   * accidental logging and perf loss.
   */
  enableMeasure: false,

  /**
   * Holds onto the measure function in use. By default, don't measure
   * anything, but we'll override this if we inject a measure function.
   */
  storedMeasure: _noMeasure,

  /**
   * Use this to wrap methods you want to measure. Zero overhead in production.
   *
   * @param {string} objName
   * @param {string} fnName
   * @param {function} func
   * @return {function}
   */
  measure: function(objName, fnName, func) {
    if ("production" !== "development") {
      var measuredFunc = null;
      return function() {
        if (ReactPerf.enableMeasure) {
          if (!measuredFunc) {
            measuredFunc = ReactPerf.storedMeasure(objName, fnName, func);
          }
          return measuredFunc.apply(this, arguments);
        }
        return func.apply(this, arguments);
      };
    }
    return func;
  },

  injection: {
    /**
     * @param {function} measure
     */
    injectMeasure: function(measure) {
      ReactPerf.storedMeasure = measure;
    }
  }
};

/**
 * Simply passes through the measured function, without measuring it.
 *
 * @param {string} objName
 * @param {string} fnName
 * @param {function} func
 * @return {function}
 */
function _noMeasure(objName, fnName, func) {
  return func;
}

module.exports = ReactPerf;

},{}],61:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactPropTransferer
 */

"use strict";

var emptyFunction = require("./emptyFunction");
var invariant = require("./invariant");
var joinClasses = require("./joinClasses");
var merge = require("./merge");

/**
 * Creates a transfer strategy that will merge prop values using the supplied
 * `mergeStrategy`. If a prop was previously unset, this just sets it.
 *
 * @param {function} mergeStrategy
 * @return {function}
 */
function createTransferStrategy(mergeStrategy) {
  return function(props, key, value) {
    if (!props.hasOwnProperty(key)) {
      props[key] = value;
    } else {
      props[key] = mergeStrategy(props[key], value);
    }
  };
}

/**
 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
 * NOTE: if you add any more exceptions to this list you should be sure to
 * update `cloneWithProps()` accordingly.
 */
var TransferStrategies = {
  /**
   * Never transfer `children`.
   */
  children: emptyFunction,
  /**
   * Transfer the `className` prop by merging them.
   */
  className: createTransferStrategy(joinClasses),
  /**
   * Never transfer the `key` prop.
   */
  key: emptyFunction,
  /**
   * Never transfer the `ref` prop.
   */
  ref: emptyFunction,
  /**
   * Transfer the `style` prop (which is an object) by merging them.
   */
  style: createTransferStrategy(merge)
};

/**
 * ReactPropTransferer are capable of transferring props to another component
 * using a `transferPropsTo` method.
 *
 * @class ReactPropTransferer
 */
var ReactPropTransferer = {

  TransferStrategies: TransferStrategies,

  /**
   * Merge two props objects using TransferStrategies.
   *
   * @param {object} oldProps original props (they take precedence)
   * @param {object} newProps new props to merge in
   * @return {object} a new object containing both sets of props merged.
   */
  mergeProps: function(oldProps, newProps) {
    var props = merge(oldProps);

    for (var thisKey in newProps) {
      if (!newProps.hasOwnProperty(thisKey)) {
        continue;
      }

      var transferStrategy = TransferStrategies[thisKey];

      if (transferStrategy) {
        transferStrategy(props, thisKey, newProps[thisKey]);
      } else if (!props.hasOwnProperty(thisKey)) {
        props[thisKey] = newProps[thisKey];
      }
    }

    return props;
  },

  /**
   * @lends {ReactPropTransferer.prototype}
   */
  Mixin: {

    /**
     * Transfer props from this component to a target component.
     *
     * Props that do not have an explicit transfer strategy will be transferred
     * only if the target component does not already have the prop set.
     *
     * This is usually used to pass down props to a returned root component.
     *
     * @param {ReactComponent} component Component receiving the properties.
     * @return {ReactComponent} The supplied `component`.
     * @final
     * @protected
     */
    transferPropsTo: function(component) {
      ("production" !== "development" ? invariant(
        component._owner === this,
        '%s: You can\'t call transferPropsTo() on a component that you ' +
        'don\'t own, %s. This usually means you are calling ' +
        'transferPropsTo() on a component passed in as props or children.',
        this.constructor.displayName,
        component.constructor.displayName
      ) : invariant(component._owner === this));

      component.props = ReactPropTransferer.mergeProps(
        component.props,
        this.props
      );

      return component;
    }

  }
};

module.exports = ReactPropTransferer;

},{"./emptyFunction":95,"./invariant":108,"./joinClasses":113,"./merge":117}],62:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactPropTypeLocationNames
 */

"use strict";

var ReactPropTypeLocationNames = {};

if ("production" !== "development") {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;

},{}],63:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactPropTypeLocations
 */

"use strict";

var keyMirror = require("./keyMirror");

var ReactPropTypeLocations = keyMirror({
  prop: null,
  context: null,
  childContext: null
});

module.exports = ReactPropTypeLocations;

},{"./keyMirror":114}],64:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactPropTypes
 */

"use strict";

var ReactComponent = require("./ReactComponent");
var ReactPropTypeLocationNames = require("./ReactPropTypeLocationNames");

var warning = require("./warning");
var createObjectFrom = require("./createObjectFrom");

/**
 * Collection of methods that allow declaration and validation of props that are
 * supplied to React components. Example usage:
 *
 *   var Props = require('ReactPropTypes');
 *   var MyArticle = React.createClass({
 *     propTypes: {
 *       // An optional string prop named "description".
 *       description: Props.string,
 *
 *       // A required enum prop named "category".
 *       category: Props.oneOf(['News','Photos']).isRequired,
 *
 *       // A prop named "dialog" that requires an instance of Dialog.
 *       dialog: Props.instanceOf(Dialog).isRequired
 *     },
 *     render: function() { ... }
 *   });
 *
 * A more formal specification of how these methods are used:
 *
 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
 *   decl := ReactPropTypes.{type}(.isRequired)?
 *
 * Each and every declaration produces a function with the same signature. This
 * allows the creation of custom validation functions. For example:
 *
 *   var Props = require('ReactPropTypes');
 *   var MyLink = React.createClass({
 *     propTypes: {
 *       // An optional string or URI prop named "href".
 *       href: function(props, propName, componentName) {
 *         var propValue = props[propName];
 *         warning(
 *           propValue == null ||
 *           typeof propValue === 'string' ||
 *           propValue instanceof URI,
 *           'Invalid `%s` supplied to `%s`, expected string or URI.',
 *           propName,
 *           componentName
 *         );
 *       }
 *     },
 *     render: function() { ... }
 *   });
 *
 * @internal
 */
var Props = {

  array: createPrimitiveTypeChecker('array'),
  bool: createPrimitiveTypeChecker('boolean'),
  func: createPrimitiveTypeChecker('function'),
  number: createPrimitiveTypeChecker('number'),
  object: createPrimitiveTypeChecker('object'),
  string: createPrimitiveTypeChecker('string'),

  shape: createShapeTypeChecker,
  oneOf: createEnumTypeChecker,
  oneOfType: createUnionTypeChecker,
  arrayOf: createArrayOfTypeChecker,

  instanceOf: createInstanceTypeChecker,

  renderable: createRenderableTypeChecker(),

  component: createComponentTypeChecker(),

  any: createAnyTypeChecker()
};

var ANONYMOUS = '<<anonymous>>';

function isRenderable(propValue) {
  switch(typeof propValue) {
    case 'number':
    case 'string':
      return true;
    case 'object':
      if (Array.isArray(propValue)) {
        return propValue.every(isRenderable);
      }
      if (ReactComponent.isValidComponent(propValue)) {
        return true;
      }
      for (var k in propValue) {
        if (!isRenderable(propValue[k])) {
          return false;
        }
      }
      return true;
    default:
      return false;
  }
}

// Equivalent of typeof but with special handling for arrays
function getPropType(propValue) {
  var propType = typeof propValue;
  if (propType === 'object' && Array.isArray(propValue)) {
    return 'array';
  }
  return propType;
}

function createAnyTypeChecker() {
  function validateAnyType(
    shouldWarn, propValue, propName, componentName, location
  ) {
    return true; // is always valid
  }
  return createChainableTypeChecker(validateAnyType);
}

function createPrimitiveTypeChecker(expectedType) {
  function validatePrimitiveType(
    shouldWarn, propValue, propName, componentName, location
  ) {
    var propType = getPropType(propValue);
    var isValid = propType === expectedType;
    if (shouldWarn) {
      ("production" !== "development" ? warning(
        isValid,
        'Invalid %s `%s` of type `%s` supplied to `%s`, expected `%s`.',
        ReactPropTypeLocationNames[location],
        propName,
        propType,
        componentName,
        expectedType
      ) : null);
    }
    return isValid;
  }
  return createChainableTypeChecker(validatePrimitiveType);
}

function createEnumTypeChecker(expectedValues) {
  var expectedEnum = createObjectFrom(expectedValues);
  function validateEnumType(
    shouldWarn, propValue, propName, componentName, location
  ) {
    var isValid = expectedEnum[propValue];
    if (shouldWarn) {
      ("production" !== "development" ? warning(
        isValid,
        'Invalid %s `%s` supplied to `%s`, expected one of %s.',
        ReactPropTypeLocationNames[location],
        propName,
        componentName,
        JSON.stringify(Object.keys(expectedEnum))
      ) : null);
    }
    return isValid;
  }
  return createChainableTypeChecker(validateEnumType);
}

function createShapeTypeChecker(shapeTypes) {
  function validateShapeType(
    shouldWarn, propValue, propName, componentName, location
  ) {
    var propType = getPropType(propValue);
    var isValid = propType === 'object';
    if (isValid) {
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (checker && !checker(propValue, key, componentName, location)) {
          return false;
        }
      }
    }
    if (shouldWarn) {
      ("production" !== "development" ? warning(
        isValid,
        'Invalid %s `%s` of type `%s` supplied to `%s`, expected `object`.',
        ReactPropTypeLocationNames[location],
        propName,
        propType,
        componentName
      ) : null);
    }
    return isValid;
  }
  return createChainableTypeChecker(validateShapeType);
}

function createInstanceTypeChecker(expectedClass) {
  function validateInstanceType(
    shouldWarn, propValue, propName, componentName, location
  ) {
    var isValid = propValue instanceof expectedClass;
    if (shouldWarn) {
      ("production" !== "development" ? warning(
        isValid,
        'Invalid %s `%s` supplied to `%s`, expected instance of `%s`.',
        ReactPropTypeLocationNames[location],
        propName,
        componentName,
        expectedClass.name || ANONYMOUS
      ) : null);
    }
    return isValid;
  }
  return createChainableTypeChecker(validateInstanceType);
}

function createArrayOfTypeChecker(propTypeChecker) {
  function validateArrayType(
    shouldWarn, propValue, propName, componentName, location
  ) {
    var isValid = Array.isArray(propValue);
    if (isValid) {
      for (var i = 0; i < propValue.length; i++) {
        if (!propTypeChecker(propValue, i, componentName, location)) {
          return false;
        }
      }
    }
    if (shouldWarn) {
      ("production" !== "development" ? warning(
        isValid,
        'Invalid %s `%s` supplied to `%s`, expected an array.',
        ReactPropTypeLocationNames[location],
        propName,
        componentName
      ) : null);
    }
    return isValid;
  }
  return createChainableTypeChecker(validateArrayType);
}

function createRenderableTypeChecker() {
  function validateRenderableType(
    shouldWarn, propValue, propName, componentName, location
  ) {
    var isValid = isRenderable(propValue);
    if (shouldWarn) {
      ("production" !== "development" ? warning(
        isValid,
        'Invalid %s `%s` supplied to `%s`, expected a renderable prop.',
        ReactPropTypeLocationNames[location],
        propName,
        componentName
      ) : null);
    }
    return isValid;
  }
  return createChainableTypeChecker(validateRenderableType);
}

function createComponentTypeChecker() {
  function validateComponentType(
    shouldWarn, propValue, propName, componentName, location
  ) {
    var isValid = ReactComponent.isValidComponent(propValue);
    if (shouldWarn) {
      ("production" !== "development" ? warning(
        isValid,
        'Invalid %s `%s` supplied to `%s`, expected a React component.',
        ReactPropTypeLocationNames[location],
        propName,
        componentName
      ) : null);
    }
    return isValid;
  }
  return createChainableTypeChecker(validateComponentType);
}

function createUnionTypeChecker(arrayOfValidators) {
  return function(props, propName, componentName, location) {
    var isValid = false;
    for (var ii = 0; ii < arrayOfValidators.length; ii++) {
      var validate = arrayOfValidators[ii];
      if (typeof validate.weak === 'function') {
        validate = validate.weak;
      }
      if (validate(props, propName, componentName, location)) {
        isValid = true;
        break;
      }
    }
    ("production" !== "development" ? warning(
      isValid,
      'Invalid %s `%s` supplied to `%s`.',
      ReactPropTypeLocationNames[location],
      propName,
      componentName || ANONYMOUS
    ) : null);
    return isValid;
  };
}

function createChainableTypeChecker(validate) {
  function checkType(
    isRequired, shouldWarn, props, propName, componentName, location
  ) {
    var propValue = props[propName];
    if (propValue != null) {
      // Only validate if there is a value to check.
      return validate(
        shouldWarn,
        propValue,
        propName,
        componentName || ANONYMOUS,
        location
      );
    } else {
      var isValid = !isRequired;
      if (shouldWarn) {
        ("production" !== "development" ? warning(
          isValid,
          'Required %s `%s` was not specified in `%s`.',
          ReactPropTypeLocationNames[location],
          propName,
          componentName || ANONYMOUS
        ) : null);
      }
      return isValid;
    }
  }

  var checker = checkType.bind(null, false, true);
  checker.weak = checkType.bind(null, false, false);
  checker.isRequired = checkType.bind(null, true, true);
  checker.weak.isRequired = checkType.bind(null, true, false);
  checker.isRequired.weak = checker.weak.isRequired;

  return checker;
}

module.exports = Props;

},{"./ReactComponent":26,"./ReactPropTypeLocationNames":62,"./createObjectFrom":93,"./warning":129}],65:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactPutListenerQueue
 */

"use strict";

var PooledClass = require("./PooledClass");
var ReactEventEmitter = require("./ReactEventEmitter");

var mixInto = require("./mixInto");

function ReactPutListenerQueue() {
  this.listenersToPut = [];
}

mixInto(ReactPutListenerQueue, {
  enqueuePutListener: function(rootNodeID, propKey, propValue) {
    this.listenersToPut.push({
      rootNodeID: rootNodeID,
      propKey: propKey,
      propValue: propValue
    });
  },

  putListeners: function() {
    for (var i = 0; i < this.listenersToPut.length; i++) {
      var listenerToPut = this.listenersToPut[i];
      ReactEventEmitter.putListener(
        listenerToPut.rootNodeID,
        listenerToPut.propKey,
        listenerToPut.propValue
      );
    }
  },

  reset: function() {
    this.listenersToPut.length = 0;
  },

  destructor: function() {
    this.reset();
  }
});

PooledClass.addPoolingTo(ReactPutListenerQueue);

module.exports = ReactPutListenerQueue;

},{"./PooledClass":23,"./ReactEventEmitter":48,"./mixInto":120}],66:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactReconcileTransaction
 * @typechecks static-only
 */

"use strict";

var ExecutionEnvironment = require("./ExecutionEnvironment");
var PooledClass = require("./PooledClass");
var ReactEventEmitter = require("./ReactEventEmitter");
var ReactInputSelection = require("./ReactInputSelection");
var ReactMountReady = require("./ReactMountReady");
var ReactPutListenerQueue = require("./ReactPutListenerQueue");
var Transaction = require("./Transaction");

var mixInto = require("./mixInto");

/**
 * Ensures that, when possible, the selection range (currently selected text
 * input) is not disturbed by performing the transaction.
 */
var SELECTION_RESTORATION = {
  /**
   * @return {Selection} Selection information.
   */
  initialize: ReactInputSelection.getSelectionInformation,
  /**
   * @param {Selection} sel Selection information returned from `initialize`.
   */
  close: ReactInputSelection.restoreSelection
};

/**
 * Suppresses events (blur/focus) that could be inadvertently dispatched due to
 * high level DOM manipulations (like temporarily removing a text input from the
 * DOM).
 */
var EVENT_SUPPRESSION = {
  /**
   * @return {boolean} The enabled status of `ReactEventEmitter` before the
   * reconciliation.
   */
  initialize: function() {
    var currentlyEnabled = ReactEventEmitter.isEnabled();
    ReactEventEmitter.setEnabled(false);
    return currentlyEnabled;
  },

  /**
   * @param {boolean} previouslyEnabled Enabled status of `ReactEventEmitter`
   *   before the reconciliation occured. `close` restores the previous value.
   */
  close: function(previouslyEnabled) {
    ReactEventEmitter.setEnabled(previouslyEnabled);
  }
};

/**
 * Provides a `ReactMountReady` queue for collecting `onDOMReady` callbacks
 * during the performing of the transaction.
 */
var ON_DOM_READY_QUEUEING = {
  /**
   * Initializes the internal `onDOMReady` queue.
   */
  initialize: function() {
    this.reactMountReady.reset();
  },

  /**
   * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
   */
  close: function() {
    this.reactMountReady.notifyAll();
  }
};

var PUT_LISTENER_QUEUEING = {
  initialize: function() {
    this.putListenerQueue.reset();
  },

  close: function() {
    this.putListenerQueue.putListeners();
  }
};

/**
 * Executed within the scope of the `Transaction` instance. Consider these as
 * being member methods, but with an implied ordering while being isolated from
 * each other.
 */
var TRANSACTION_WRAPPERS = [
  PUT_LISTENER_QUEUEING,
  SELECTION_RESTORATION,
  EVENT_SUPPRESSION,
  ON_DOM_READY_QUEUEING
];

/**
 * Currently:
 * - The order that these are listed in the transaction is critical:
 * - Suppresses events.
 * - Restores selection range.
 *
 * Future:
 * - Restore document/overflow scroll positions that were unintentionally
 *   modified via DOM insertions above the top viewport boundary.
 * - Implement/integrate with customized constraint based layout system and keep
 *   track of which dimensions must be remeasured.
 *
 * @class ReactReconcileTransaction
 */
function ReactReconcileTransaction() {
  this.reinitializeTransaction();
  this.reactMountReady = ReactMountReady.getPooled(null);
  this.putListenerQueue = ReactPutListenerQueue.getPooled();
}

var Mixin = {
  /**
   * @see Transaction
   * @abstract
   * @final
   * @return {array<object>} List of operation wrap proceedures.
   *   TODO: convert to array<TransactionWrapper>
   */
  getTransactionWrappers: function() {
    if (ExecutionEnvironment.canUseDOM) {
      return TRANSACTION_WRAPPERS;
    } else {
      return [];
    }
  },

  /**
   * @return {object} The queue to collect `onDOMReady` callbacks with.
   *   TODO: convert to ReactMountReady
   */
  getReactMountReady: function() {
    return this.reactMountReady;
  },

  getPutListenerQueue: function() {
    return this.putListenerQueue;
  },

  /**
   * `PooledClass` looks for this, and will invoke this before allowing this
   * instance to be resused.
   */
  destructor: function() {
    ReactMountReady.release(this.reactMountReady);
    this.reactMountReady = null;

    ReactPutListenerQueue.release(this.putListenerQueue);
    this.putListenerQueue = null;
  }
};


mixInto(ReactReconcileTransaction, Transaction.Mixin);
mixInto(ReactReconcileTransaction, Mixin);

PooledClass.addPoolingTo(ReactReconcileTransaction);

module.exports = ReactReconcileTransaction;

},{"./ExecutionEnvironment":20,"./PooledClass":23,"./ReactEventEmitter":48,"./ReactInputSelection":52,"./ReactMountReady":56,"./ReactPutListenerQueue":65,"./Transaction":84,"./mixInto":120}],67:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactRootIndex
 * @typechecks
 */

"use strict";

var ReactRootIndexInjection = {
  /**
   * @param {function} _createReactRootIndex
   */
  injectCreateReactRootIndex: function(_createReactRootIndex) {
    ReactRootIndex.createReactRootIndex = _createReactRootIndex;
  }
};

var ReactRootIndex = {
  createReactRootIndex: null,
  injection: ReactRootIndexInjection
};

module.exports = ReactRootIndex;

},{}],68:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @typechecks static-only
 * @providesModule ReactServerRendering
 */
"use strict";

var ReactComponent = require("./ReactComponent");
var ReactInstanceHandles = require("./ReactInstanceHandles");
var ReactMarkupChecksum = require("./ReactMarkupChecksum");
var ReactReconcileTransaction = require("./ReactReconcileTransaction");

var invariant = require("./invariant");

/**
 * @param {ReactComponent} component
 * @return {string} the markup
 */
function renderComponentToString(component) {
  ("production" !== "development" ? invariant(
    ReactComponent.isValidComponent(component),
    'renderComponentToString(): You must pass a valid ReactComponent.'
  ) : invariant(ReactComponent.isValidComponent(component)));

  ("production" !== "development" ? invariant(
    !(arguments.length === 2 && typeof arguments[1] === 'function'),
    'renderComponentToString(): This function became synchronous and now ' +
    'returns the generated markup. Please remove the second parameter.'
  ) : invariant(!(arguments.length === 2 && typeof arguments[1] === 'function')));

  var id = ReactInstanceHandles.createReactRootID();
  var transaction = ReactReconcileTransaction.getPooled();
  transaction.reinitializeTransaction();
  try {
    return transaction.perform(function() {
      var markup = component.mountComponent(id, transaction, 0);
      return ReactMarkupChecksum.addChecksumToMarkup(markup);
    }, null);
  } finally {
    ReactReconcileTransaction.release(transaction);
  }
}

module.exports = {
  renderComponentToString: renderComponentToString
};

},{"./ReactComponent":26,"./ReactInstanceHandles":53,"./ReactMarkupChecksum":54,"./ReactReconcileTransaction":66,"./invariant":108}],69:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactTextComponent
 * @typechecks static-only
 */

"use strict";

var DOMPropertyOperations = require("./DOMPropertyOperations");
var ReactComponent = require("./ReactComponent");

var escapeTextForBrowser = require("./escapeTextForBrowser");
var mixInto = require("./mixInto");

/**
 * Text nodes violate a couple assumptions that React makes about components:
 *
 *  - When mounting text into the DOM, adjacent text nodes are merged.
 *  - Text nodes cannot be assigned a React root ID.
 *
 * This component is used to wrap strings in elements so that they can undergo
 * the same reconciliation that is applied to elements.
 *
 * TODO: Investigate representing React components in the DOM with text nodes.
 *
 * @class ReactTextComponent
 * @extends ReactComponent
 * @internal
 */
var ReactTextComponent = function(initialText) {
  this.construct({text: initialText});
};

mixInto(ReactTextComponent, ReactComponent.Mixin);
mixInto(ReactTextComponent, {

  /**
   * Creates the markup for this text node. This node is not intended to have
   * any features besides containing text content.
   *
   * @param {string} rootID DOM ID of the root node.
   * @param {ReactReconcileTransaction} transaction
   * @param {number} mountDepth number of components in the owner hierarchy
   * @return {string} Markup for this text node.
   * @internal
   */
  mountComponent: function(rootID, transaction, mountDepth) {
    ReactComponent.Mixin.mountComponent.call(
      this,
      rootID,
      transaction,
      mountDepth
    );
    return (
      '<span ' + DOMPropertyOperations.createMarkupForID(rootID) + '>' +
        escapeTextForBrowser(this.props.text) +
      '</span>'
    );
  },

  /**
   * Updates this component by updating the text content.
   *
   * @param {object} nextComponent Contains the next text content.
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  receiveComponent: function(nextComponent, transaction) {
    var nextProps = nextComponent.props;
    if (nextProps.text !== this.props.text) {
      this.props.text = nextProps.text;
      ReactComponent.BackendIDOperations.updateTextContentByID(
        this._rootNodeID,
        nextProps.text
      );
    }
  }

});

// Expose the constructor on itself and the prototype for consistency with other
// descriptors.
ReactTextComponent.type = ReactTextComponent;
ReactTextComponent.prototype.type = ReactTextComponent;

module.exports = ReactTextComponent;

},{"./DOMPropertyOperations":9,"./ReactComponent":26,"./escapeTextForBrowser":96,"./mixInto":120}],70:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactUpdates
 */

"use strict";

var ReactPerf = require("./ReactPerf");

var invariant = require("./invariant");

var dirtyComponents = [];

var batchingStrategy = null;

function ensureBatchingStrategy() {
  ("production" !== "development" ? invariant(batchingStrategy, 'ReactUpdates: must inject a batching strategy') : invariant(batchingStrategy));
}

function batchedUpdates(callback, param) {
  ensureBatchingStrategy();
  batchingStrategy.batchedUpdates(callback, param);
}

/**
 * Array comparator for ReactComponents by owner depth
 *
 * @param {ReactComponent} c1 first component you're comparing
 * @param {ReactComponent} c2 second component you're comparing
 * @return {number} Return value usable by Array.prototype.sort().
 */
function mountDepthComparator(c1, c2) {
  return c1._mountDepth - c2._mountDepth;
}

function runBatchedUpdates() {
  // Since reconciling a component higher in the owner hierarchy usually (not
  // always -- see shouldComponentUpdate()) will reconcile children, reconcile
  // them before their children by sorting the array.

  dirtyComponents.sort(mountDepthComparator);

  for (var i = 0; i < dirtyComponents.length; i++) {
    // If a component is unmounted before pending changes apply, ignore them
    // TODO: Queue unmounts in the same list to avoid this happening at all
    var component = dirtyComponents[i];
    if (component.isMounted()) {
      // If performUpdateIfNecessary happens to enqueue any new updates, we
      // shouldn't execute the callbacks until the next render happens, so
      // stash the callbacks first
      var callbacks = component._pendingCallbacks;
      component._pendingCallbacks = null;
      component.performUpdateIfNecessary();
      if (callbacks) {
        for (var j = 0; j < callbacks.length; j++) {
          callbacks[j].call(component);
        }
      }
    }
  }
}

function clearDirtyComponents() {
  dirtyComponents.length = 0;
}

var flushBatchedUpdates = ReactPerf.measure(
  'ReactUpdates',
  'flushBatchedUpdates',
  function() {
    // Run these in separate functions so the JIT can optimize
    try {
      runBatchedUpdates();
    } finally {
      clearDirtyComponents();
    }
  }
);

/**
 * Mark a component as needing a rerender, adding an optional callback to a
 * list of functions which will be executed once the rerender occurs.
 */
function enqueueUpdate(component, callback) {
  ("production" !== "development" ? invariant(
    !callback || typeof callback === "function",
    'enqueueUpdate(...): You called `setProps`, `replaceProps`, ' +
    '`setState`, `replaceState`, or `forceUpdate` with a callback that ' +
    'isn\'t callable.'
  ) : invariant(!callback || typeof callback === "function"));
  ensureBatchingStrategy();

  if (!batchingStrategy.isBatchingUpdates) {
    component.performUpdateIfNecessary();
    callback && callback.call(component);
    return;
  }

  dirtyComponents.push(component);

  if (callback) {
    if (component._pendingCallbacks) {
      component._pendingCallbacks.push(callback);
    } else {
      component._pendingCallbacks = [callback];
    }
  }
}

var ReactUpdatesInjection = {
  injectBatchingStrategy: function(_batchingStrategy) {
    ("production" !== "development" ? invariant(
      _batchingStrategy,
      'ReactUpdates: must provide a batching strategy'
    ) : invariant(_batchingStrategy));
    ("production" !== "development" ? invariant(
      typeof _batchingStrategy.batchedUpdates === 'function',
      'ReactUpdates: must provide a batchedUpdates() function'
    ) : invariant(typeof _batchingStrategy.batchedUpdates === 'function'));
    ("production" !== "development" ? invariant(
      typeof _batchingStrategy.isBatchingUpdates === 'boolean',
      'ReactUpdates: must provide an isBatchingUpdates boolean attribute'
    ) : invariant(typeof _batchingStrategy.isBatchingUpdates === 'boolean'));
    batchingStrategy = _batchingStrategy;
  }
};

var ReactUpdates = {
  batchedUpdates: batchedUpdates,
  enqueueUpdate: enqueueUpdate,
  flushBatchedUpdates: flushBatchedUpdates,
  injection: ReactUpdatesInjection
};

module.exports = ReactUpdates;

},{"./ReactPerf":60,"./invariant":108}],71:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SelectEventPlugin
 */

"use strict";

var EventConstants = require("./EventConstants");
var EventPropagators = require("./EventPropagators");
var ReactInputSelection = require("./ReactInputSelection");
var SyntheticEvent = require("./SyntheticEvent");

var getActiveElement = require("./getActiveElement");
var isTextInputElement = require("./isTextInputElement");
var keyOf = require("./keyOf");
var shallowEqual = require("./shallowEqual");

var topLevelTypes = EventConstants.topLevelTypes;

var eventTypes = {
  select: {
    phasedRegistrationNames: {
      bubbled: keyOf({onSelect: null}),
      captured: keyOf({onSelectCapture: null})
    },
    dependencies: [
      topLevelTypes.topBlur,
      topLevelTypes.topContextMenu,
      topLevelTypes.topFocus,
      topLevelTypes.topKeyDown,
      topLevelTypes.topMouseDown,
      topLevelTypes.topMouseUp,
      topLevelTypes.topSelectionChange
    ]
  }
};

var activeElement = null;
var activeElementID = null;
var lastSelection = null;
var mouseDown = false;

/**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 *
 * @param {DOMElement} node
 * @param {object}
 */
function getSelection(node) {
  if ('selectionStart' in node &&
      ReactInputSelection.hasSelectionCapabilities(node)) {
    return {
      start: node.selectionStart,
      end: node.selectionEnd
    };
  } else if (document.selection) {
    var range = document.selection.createRange();
    return {
      parentElement: range.parentElement(),
      text: range.text,
      top: range.boundingTop,
      left: range.boundingLeft
    };
  } else {
    var selection = window.getSelection();
    return {
      anchorNode: selection.anchorNode,
      anchorOffset: selection.anchorOffset,
      focusNode: selection.focusNode,
      focusOffset: selection.focusOffset
    };
  }
}

/**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @return {?SyntheticEvent}
 */
function constructSelectEvent(nativeEvent) {
  // Ensure we have the right element, and that the user is not dragging a
  // selection (this matches native `select` event behavior). In HTML5, select
  // fires only on input and textarea thus if there's no focused element we
  // won't dispatch.
  if (mouseDown ||
      activeElement == null ||
      activeElement != getActiveElement()) {
    return;
  }

  // Only fire when selection has actually changed.
  var currentSelection = getSelection(activeElement);
  if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
    lastSelection = currentSelection;

    var syntheticEvent = SyntheticEvent.getPooled(
      eventTypes.select,
      activeElementID,
      nativeEvent
    );

    syntheticEvent.type = 'select';
    syntheticEvent.target = activeElement;

    EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);

    return syntheticEvent;
  }
}

/**
 * This plugin creates an `onSelect` event that normalizes select events
 * across form elements.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - contentEditable
 *
 * This differs from native browser implementations in the following ways:
 * - Fires on contentEditable fields as well as inputs.
 * - Fires for collapsed selection.
 * - Fires after user input.
 */
var SelectEventPlugin = {

  eventTypes: eventTypes,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {

    switch (topLevelType) {
      // Track the input node that has focus.
      case topLevelTypes.topFocus:
        if (isTextInputElement(topLevelTarget) ||
            topLevelTarget.contentEditable === 'true') {
          activeElement = topLevelTarget;
          activeElementID = topLevelTargetID;
          lastSelection = null;
        }
        break;
      case topLevelTypes.topBlur:
        activeElement = null;
        activeElementID = null;
        lastSelection = null;
        break;

      // Don't fire the event while the user is dragging. This matches the
      // semantics of the native select event.
      case topLevelTypes.topMouseDown:
        mouseDown = true;
        break;
      case topLevelTypes.topContextMenu:
      case topLevelTypes.topMouseUp:
        mouseDown = false;
        return constructSelectEvent(nativeEvent);

      // Chrome and IE fire non-standard event when selection is changed (and
      // sometimes when it hasn't).
      // Firefox doesn't support selectionchange, so check selection status
      // after each key entry. The selection changes after keydown and before
      // keyup, but we check on keydown as well in the case of holding down a
      // key, when multiple keydown events are fired but only one keyup is.
      case topLevelTypes.topSelectionChange:
      case topLevelTypes.topKeyDown:
      case topLevelTypes.topKeyUp:
        return constructSelectEvent(nativeEvent);
    }
  }
};

module.exports = SelectEventPlugin;

},{"./EventConstants":14,"./EventPropagators":19,"./ReactInputSelection":52,"./SyntheticEvent":77,"./getActiveElement":99,"./isTextInputElement":111,"./keyOf":115,"./shallowEqual":125}],72:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ServerReactRootIndex
 * @typechecks
 */

"use strict";

/**
 * Size of the reactRoot ID space. We generate random numbers for React root
 * IDs and if there's a collision the events and DOM update system will
 * get confused. In the future we need a way to generate GUIDs but for
 * now this will work on a smaller scale.
 */
var GLOBAL_MOUNT_POINT_MAX = Math.pow(2, 53);

var ServerReactRootIndex = {
  createReactRootIndex: function() {
    return Math.ceil(Math.random() * GLOBAL_MOUNT_POINT_MAX);
  }
};

module.exports = ServerReactRootIndex;

},{}],73:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SimpleEventPlugin
 */

"use strict";

var EventConstants = require("./EventConstants");
var EventPluginUtils = require("./EventPluginUtils");
var EventPropagators = require("./EventPropagators");
var SyntheticClipboardEvent = require("./SyntheticClipboardEvent");
var SyntheticEvent = require("./SyntheticEvent");
var SyntheticFocusEvent = require("./SyntheticFocusEvent");
var SyntheticKeyboardEvent = require("./SyntheticKeyboardEvent");
var SyntheticMouseEvent = require("./SyntheticMouseEvent");
var SyntheticDragEvent = require("./SyntheticDragEvent");
var SyntheticTouchEvent = require("./SyntheticTouchEvent");
var SyntheticUIEvent = require("./SyntheticUIEvent");
var SyntheticWheelEvent = require("./SyntheticWheelEvent");

var invariant = require("./invariant");
var keyOf = require("./keyOf");

var topLevelTypes = EventConstants.topLevelTypes;

var eventTypes = {
  blur: {
    phasedRegistrationNames: {
      bubbled: keyOf({onBlur: true}),
      captured: keyOf({onBlurCapture: true})
    }
  },
  click: {
    phasedRegistrationNames: {
      bubbled: keyOf({onClick: true}),
      captured: keyOf({onClickCapture: true})
    }
  },
  contextMenu: {
    phasedRegistrationNames: {
      bubbled: keyOf({onContextMenu: true}),
      captured: keyOf({onContextMenuCapture: true})
    }
  },
  copy: {
    phasedRegistrationNames: {
      bubbled: keyOf({onCopy: true}),
      captured: keyOf({onCopyCapture: true})
    }
  },
  cut: {
    phasedRegistrationNames: {
      bubbled: keyOf({onCut: true}),
      captured: keyOf({onCutCapture: true})
    }
  },
  doubleClick: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDoubleClick: true}),
      captured: keyOf({onDoubleClickCapture: true})
    }
  },
  drag: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDrag: true}),
      captured: keyOf({onDragCapture: true})
    }
  },
  dragEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDragEnd: true}),
      captured: keyOf({onDragEndCapture: true})
    }
  },
  dragEnter: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDragEnter: true}),
      captured: keyOf({onDragEnterCapture: true})
    }
  },
  dragExit: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDragExit: true}),
      captured: keyOf({onDragExitCapture: true})
    }
  },
  dragLeave: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDragLeave: true}),
      captured: keyOf({onDragLeaveCapture: true})
    }
  },
  dragOver: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDragOver: true}),
      captured: keyOf({onDragOverCapture: true})
    }
  },
  dragStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDragStart: true}),
      captured: keyOf({onDragStartCapture: true})
    }
  },
  drop: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDrop: true}),
      captured: keyOf({onDropCapture: true})
    }
  },
  focus: {
    phasedRegistrationNames: {
      bubbled: keyOf({onFocus: true}),
      captured: keyOf({onFocusCapture: true})
    }
  },
  input: {
    phasedRegistrationNames: {
      bubbled: keyOf({onInput: true}),
      captured: keyOf({onInputCapture: true})
    }
  },
  keyDown: {
    phasedRegistrationNames: {
      bubbled: keyOf({onKeyDown: true}),
      captured: keyOf({onKeyDownCapture: true})
    }
  },
  keyPress: {
    phasedRegistrationNames: {
      bubbled: keyOf({onKeyPress: true}),
      captured: keyOf({onKeyPressCapture: true})
    }
  },
  keyUp: {
    phasedRegistrationNames: {
      bubbled: keyOf({onKeyUp: true}),
      captured: keyOf({onKeyUpCapture: true})
    }
  },
  load: {
    phasedRegistrationNames: {
      bubbled: keyOf({onLoad: true}),
      captured: keyOf({onLoadCapture: true})
    }
  },
  error: {
    phasedRegistrationNames: {
      bubbled: keyOf({onError: true}),
      captured: keyOf({onErrorCapture: true})
    }
  },
  // Note: We do not allow listening to mouseOver events. Instead, use the
  // onMouseEnter/onMouseLeave created by `EnterLeaveEventPlugin`.
  mouseDown: {
    phasedRegistrationNames: {
      bubbled: keyOf({onMouseDown: true}),
      captured: keyOf({onMouseDownCapture: true})
    }
  },
  mouseMove: {
    phasedRegistrationNames: {
      bubbled: keyOf({onMouseMove: true}),
      captured: keyOf({onMouseMoveCapture: true})
    }
  },
  mouseOut: {
    phasedRegistrationNames: {
      bubbled: keyOf({onMouseOut: true}),
      captured: keyOf({onMouseOutCapture: true})
    }
  },
  mouseOver: {
    phasedRegistrationNames: {
      bubbled: keyOf({onMouseOver: true}),
      captured: keyOf({onMouseOverCapture: true})
    }
  },
  mouseUp: {
    phasedRegistrationNames: {
      bubbled: keyOf({onMouseUp: true}),
      captured: keyOf({onMouseUpCapture: true})
    }
  },
  paste: {
    phasedRegistrationNames: {
      bubbled: keyOf({onPaste: true}),
      captured: keyOf({onPasteCapture: true})
    }
  },
  reset: {
    phasedRegistrationNames: {
      bubbled: keyOf({onReset: true}),
      captured: keyOf({onResetCapture: true})
    }
  },
  scroll: {
    phasedRegistrationNames: {
      bubbled: keyOf({onScroll: true}),
      captured: keyOf({onScrollCapture: true})
    }
  },
  submit: {
    phasedRegistrationNames: {
      bubbled: keyOf({onSubmit: true}),
      captured: keyOf({onSubmitCapture: true})
    }
  },
  touchCancel: {
    phasedRegistrationNames: {
      bubbled: keyOf({onTouchCancel: true}),
      captured: keyOf({onTouchCancelCapture: true})
    }
  },
  touchEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf({onTouchEnd: true}),
      captured: keyOf({onTouchEndCapture: true})
    }
  },
  touchMove: {
    phasedRegistrationNames: {
      bubbled: keyOf({onTouchMove: true}),
      captured: keyOf({onTouchMoveCapture: true})
    }
  },
  touchStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({onTouchStart: true}),
      captured: keyOf({onTouchStartCapture: true})
    }
  },
  wheel: {
    phasedRegistrationNames: {
      bubbled: keyOf({onWheel: true}),
      captured: keyOf({onWheelCapture: true})
    }
  }
};

var topLevelEventsToDispatchConfig = {
  topBlur:        eventTypes.blur,
  topClick:       eventTypes.click,
  topContextMenu: eventTypes.contextMenu,
  topCopy:        eventTypes.copy,
  topCut:         eventTypes.cut,
  topDoubleClick: eventTypes.doubleClick,
  topDrag:        eventTypes.drag,
  topDragEnd:     eventTypes.dragEnd,
  topDragEnter:   eventTypes.dragEnter,
  topDragExit:    eventTypes.dragExit,
  topDragLeave:   eventTypes.dragLeave,
  topDragOver:    eventTypes.dragOver,
  topDragStart:   eventTypes.dragStart,
  topDrop:        eventTypes.drop,
  topError:       eventTypes.error,
  topFocus:       eventTypes.focus,
  topInput:       eventTypes.input,
  topKeyDown:     eventTypes.keyDown,
  topKeyPress:    eventTypes.keyPress,
  topKeyUp:       eventTypes.keyUp,
  topLoad:        eventTypes.load,
  topMouseDown:   eventTypes.mouseDown,
  topMouseMove:   eventTypes.mouseMove,
  topMouseOut:    eventTypes.mouseOut,
  topMouseOver:   eventTypes.mouseOver,
  topMouseUp:     eventTypes.mouseUp,
  topPaste:       eventTypes.paste,
  topReset:       eventTypes.reset,
  topScroll:      eventTypes.scroll,
  topSubmit:      eventTypes.submit,
  topTouchCancel: eventTypes.touchCancel,
  topTouchEnd:    eventTypes.touchEnd,
  topTouchMove:   eventTypes.touchMove,
  topTouchStart:  eventTypes.touchStart,
  topWheel:       eventTypes.wheel
};

for (var topLevelType in topLevelEventsToDispatchConfig) {
  topLevelEventsToDispatchConfig[topLevelType].dependencies = [topLevelType];
}

var SimpleEventPlugin = {

  eventTypes: eventTypes,

  /**
   * Same as the default implementation, except cancels the event when return
   * value is false.
   *
   * @param {object} Event to be dispatched.
   * @param {function} Application-level callback.
   * @param {string} domID DOM ID to pass to the callback.
   */
  executeDispatch: function(event, listener, domID) {
    var returnValue = EventPluginUtils.executeDispatch(event, listener, domID);
    if (returnValue === false) {
      event.stopPropagation();
      event.preventDefault();
    }
  },

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {
    var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
    if (!dispatchConfig) {
      return null;
    }
    var EventConstructor;
    switch (topLevelType) {
      case topLevelTypes.topInput:
      case topLevelTypes.topLoad:
      case topLevelTypes.topError:
      case topLevelTypes.topReset:
      case topLevelTypes.topSubmit:
        // HTML Events
        // @see http://www.w3.org/TR/html5/index.html#events-0
        EventConstructor = SyntheticEvent;
        break;
      case topLevelTypes.topKeyDown:
      case topLevelTypes.topKeyPress:
      case topLevelTypes.topKeyUp:
        EventConstructor = SyntheticKeyboardEvent;
        break;
      case topLevelTypes.topBlur:
      case topLevelTypes.topFocus:
        EventConstructor = SyntheticFocusEvent;
        break;
      case topLevelTypes.topClick:
        // Firefox creates a click event on right mouse clicks. This removes the
        // unwanted click events.
        if (nativeEvent.button === 2) {
          return null;
        }
        /* falls through */
      case topLevelTypes.topContextMenu:
      case topLevelTypes.topDoubleClick:
      case topLevelTypes.topMouseDown:
      case topLevelTypes.topMouseMove:
      case topLevelTypes.topMouseOut:
      case topLevelTypes.topMouseOver:
      case topLevelTypes.topMouseUp:
        EventConstructor = SyntheticMouseEvent;
        break;
      case topLevelTypes.topDrag:
      case topLevelTypes.topDragEnd:
      case topLevelTypes.topDragEnter:
      case topLevelTypes.topDragExit:
      case topLevelTypes.topDragLeave:
      case topLevelTypes.topDragOver:
      case topLevelTypes.topDragStart:
      case topLevelTypes.topDrop:
        EventConstructor = SyntheticDragEvent;
        break;
      case topLevelTypes.topTouchCancel:
      case topLevelTypes.topTouchEnd:
      case topLevelTypes.topTouchMove:
      case topLevelTypes.topTouchStart:
        EventConstructor = SyntheticTouchEvent;
        break;
      case topLevelTypes.topScroll:
        EventConstructor = SyntheticUIEvent;
        break;
      case topLevelTypes.topWheel:
        EventConstructor = SyntheticWheelEvent;
        break;
      case topLevelTypes.topCopy:
      case topLevelTypes.topCut:
      case topLevelTypes.topPaste:
        EventConstructor = SyntheticClipboardEvent;
        break;
    }
    ("production" !== "development" ? invariant(
      EventConstructor,
      'SimpleEventPlugin: Unhandled event type, `%s`.',
      topLevelType
    ) : invariant(EventConstructor));
    var event = EventConstructor.getPooled(
      dispatchConfig,
      topLevelTargetID,
      nativeEvent
    );
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  }

};

module.exports = SimpleEventPlugin;

},{"./EventConstants":14,"./EventPluginUtils":18,"./EventPropagators":19,"./SyntheticClipboardEvent":74,"./SyntheticDragEvent":76,"./SyntheticEvent":77,"./SyntheticFocusEvent":78,"./SyntheticKeyboardEvent":79,"./SyntheticMouseEvent":80,"./SyntheticTouchEvent":81,"./SyntheticUIEvent":82,"./SyntheticWheelEvent":83,"./invariant":108,"./keyOf":115}],74:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticClipboardEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticEvent = require("./SyntheticEvent");

/**
 * @interface Event
 * @see http://www.w3.org/TR/clipboard-apis/
 */
var ClipboardEventInterface = {
  clipboardData: function(event) {
    return (
      'clipboardData' in event ?
        event.clipboardData :
        window.clipboardData
    );
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticEvent.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);

module.exports = SyntheticClipboardEvent;


},{"./SyntheticEvent":77}],75:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticCompositionEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticEvent = require("./SyntheticEvent");

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */
var CompositionEventInterface = {
  data: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticCompositionEvent(
  dispatchConfig,
  dispatchMarker,
  nativeEvent) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticEvent.augmentClass(
  SyntheticCompositionEvent,
  CompositionEventInterface
);

module.exports = SyntheticCompositionEvent;


},{"./SyntheticEvent":77}],76:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticDragEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticMouseEvent = require("./SyntheticMouseEvent");

/**
 * @interface DragEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var DragEventInterface = {
  dataTransfer: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticMouseEvent.augmentClass(SyntheticDragEvent, DragEventInterface);

module.exports = SyntheticDragEvent;

},{"./SyntheticMouseEvent":80}],77:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticEvent
 * @typechecks static-only
 */

"use strict";

var PooledClass = require("./PooledClass");

var emptyFunction = require("./emptyFunction");
var getEventTarget = require("./getEventTarget");
var merge = require("./merge");
var mergeInto = require("./mergeInto");

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var EventInterface = {
  type: null,
  target: getEventTarget,
  // currentTarget is set when dispatching; no use in copying it here
  currentTarget: emptyFunction.thatReturnsNull,
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function(event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 */
function SyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  this.dispatchConfig = dispatchConfig;
  this.dispatchMarker = dispatchMarker;
  this.nativeEvent = nativeEvent;

  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    if (!Interface.hasOwnProperty(propName)) {
      continue;
    }
    var normalize = Interface[propName];
    if (normalize) {
      this[propName] = normalize(nativeEvent);
    } else {
      this[propName] = nativeEvent[propName];
    }
  }

  var defaultPrevented = nativeEvent.defaultPrevented != null ?
    nativeEvent.defaultPrevented :
    nativeEvent.returnValue === false;
  if (defaultPrevented) {
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  } else {
    this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
  }
  this.isPropagationStopped = emptyFunction.thatReturnsFalse;
}

mergeInto(SyntheticEvent.prototype, {

  preventDefault: function() {
    this.defaultPrevented = true;
    var event = this.nativeEvent;
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  },

  stopPropagation: function() {
    var event = this.nativeEvent;
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    this.isPropagationStopped = emptyFunction.thatReturnsTrue;
  },

  /**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */
  persist: function() {
    this.isPersistent = emptyFunction.thatReturnsTrue;
  },

  /**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */
  isPersistent: emptyFunction.thatReturnsFalse,

  /**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */
  destructor: function() {
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      this[propName] = null;
    }
    this.dispatchConfig = null;
    this.dispatchMarker = null;
    this.nativeEvent = null;
  }

});

SyntheticEvent.Interface = EventInterface;

/**
 * Helper to reduce boilerplate when creating subclasses.
 *
 * @param {function} Class
 * @param {?object} Interface
 */
SyntheticEvent.augmentClass = function(Class, Interface) {
  var Super = this;

  var prototype = Object.create(Super.prototype);
  mergeInto(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  Class.Interface = merge(Super.Interface, Interface);
  Class.augmentClass = Super.augmentClass;

  PooledClass.addPoolingTo(Class, PooledClass.threeArgumentPooler);
};

PooledClass.addPoolingTo(SyntheticEvent, PooledClass.threeArgumentPooler);

module.exports = SyntheticEvent;

},{"./PooledClass":23,"./emptyFunction":95,"./getEventTarget":101,"./merge":117,"./mergeInto":119}],78:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticFocusEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticUIEvent = require("./SyntheticUIEvent");

/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var FocusEventInterface = {
  relatedTarget: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);

module.exports = SyntheticFocusEvent;

},{"./SyntheticUIEvent":82}],79:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticKeyboardEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticUIEvent = require("./SyntheticUIEvent");

var getEventKey = require("./getEventKey");

/**
 * @interface KeyboardEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var KeyboardEventInterface = {
  key: getEventKey,
  location: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  repeat: null,
  locale: null,
  // Legacy Interface
  'char': null,
  charCode: null,
  keyCode: null,
  which: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);

module.exports = SyntheticKeyboardEvent;

},{"./SyntheticUIEvent":82,"./getEventKey":100}],80:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticMouseEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticUIEvent = require("./SyntheticUIEvent");
var ViewportMetrics = require("./ViewportMetrics");

/**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var MouseEventInterface = {
  screenX: null,
  screenY: null,
  clientX: null,
  clientY: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  button: function(event) {
    // Webkit, Firefox, IE9+
    // which:  1 2 3
    // button: 0 1 2 (standard)
    var button = event.button;
    if ('which' in event) {
      return button;
    }
    // IE<9
    // which:  undefined
    // button: 0 0 0
    // button: 1 4 2 (onmouseup)
    return button === 2 ? 2 : button === 4 ? 1 : 0;
  },
  buttons: null,
  relatedTarget: function(event) {
    return event.relatedTarget || (
      event.fromElement === event.srcElement ?
        event.toElement :
        event.fromElement
    );
  },
  // "Proprietary" Interface.
  pageX: function(event) {
    return 'pageX' in event ?
      event.pageX :
      event.clientX + ViewportMetrics.currentScrollLeft;
  },
  pageY: function(event) {
    return 'pageY' in event ?
      event.pageY :
      event.clientY + ViewportMetrics.currentScrollTop;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);

module.exports = SyntheticMouseEvent;

},{"./SyntheticUIEvent":82,"./ViewportMetrics":85}],81:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticTouchEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticUIEvent = require("./SyntheticUIEvent");

/**
 * @interface TouchEvent
 * @see http://www.w3.org/TR/touch-events/
 */
var TouchEventInterface = {
  touches: null,
  targetTouches: null,
  changedTouches: null,
  altKey: null,
  metaKey: null,
  ctrlKey: null,
  shiftKey: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);

module.exports = SyntheticTouchEvent;

},{"./SyntheticUIEvent":82}],82:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticUIEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticEvent = require("./SyntheticEvent");

/**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var UIEventInterface = {
  view: null,
  detail: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);

module.exports = SyntheticUIEvent;

},{"./SyntheticEvent":77}],83:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticWheelEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticMouseEvent = require("./SyntheticMouseEvent");

/**
 * @interface WheelEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var WheelEventInterface = {
  deltaX: function(event) {
    return (
      'deltaX' in event ? event.deltaX :
      // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
      'wheelDeltaX' in event ? -event.wheelDeltaX : 0
    );
  },
  deltaY: function(event) {
    return (
      'deltaY' in event ? event.deltaY :
      // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
      'wheelDeltaY' in event ? -event.wheelDeltaY :
      // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
      'wheelDelta' in event ? -event.wheelDelta : 0
    );
  },
  deltaZ: null,

  // Browsers without "deltaMode" is reporting in raw wheel delta where one
  // notch on the scroll is always +/- 120, roughly equivalent to pixels.
  // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
  // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
  deltaMode: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticMouseEvent}
 */
function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);

module.exports = SyntheticWheelEvent;

},{"./SyntheticMouseEvent":80}],84:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule Transaction
 */

"use strict";

var invariant = require("./invariant");

/**
 * `Transaction` creates a black box that is able to wrap any method such that
 * certain invariants are maintained before and after the method is invoked
 * (Even if an exception is thrown while invoking the wrapped method). Whoever
 * instantiates a transaction can provide enforcers of the invariants at
 * creation time. The `Transaction` class itself will supply one additional
 * automatic invariant for you - the invariant that any transaction instance
 * should not be run while it is already being run. You would typically create a
 * single instance of a `Transaction` for reuse multiple times, that potentially
 * is used to wrap several different methods. Wrappers are extremely simple -
 * they only require implementing two methods.
 *
 * <pre>
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * </pre>
 *
 * Bonus:
 * - Reports timing metrics by method name and wrapper index.
 *
 * Use cases:
 * - Preserving the input selection ranges before/after reconciliation.
 *   Restoring selection even in the event of an unexpected error.
 * - Deactivating events while rearranging the DOM, preventing blurs/focuses,
 *   while guaranteeing that afterwards, the event system is reactivated.
 * - Flushing a queue of collected DOM mutations to the main UI thread after a
 *   reconciliation takes place in a worker thread.
 * - Invoking any collected `componentDidUpdate` callbacks after rendering new
 *   content.
 * - (Future use case): Wrapping particular flushes of the `ReactWorker` queue
 *   to preserve the `scrollTop` (an automatic scroll aware DOM).
 * - (Future use case): Layout calculations before and after DOM upates.
 *
 * Transactional plugin API:
 * - A module that has an `initialize` method that returns any precomputation.
 * - and a `close` method that accepts the precomputation. `close` is invoked
 *   when the wrapped process is completed, or has failed.
 *
 * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
 * that implement `initialize` and `close`.
 * @return {Transaction} Single transaction for reuse in thread.
 *
 * @class Transaction
 */
var Mixin = {
  /**
   * Sets up this instance so that it is prepared for collecting metrics. Does
   * so such that this setup method may be used on an instance that is already
   * initialized, in a way that does not consume additional memory upon reuse.
   * That can be useful if you decide to make your subclass of this mixin a
   * "PooledClass".
   */
  reinitializeTransaction: function() {
    this.transactionWrappers = this.getTransactionWrappers();
    if (!this.wrapperInitData) {
      this.wrapperInitData = [];
    } else {
      this.wrapperInitData.length = 0;
    }
    if (!this.timingMetrics) {
      this.timingMetrics = {};
    }
    this.timingMetrics.methodInvocationTime = 0;
    if (!this.timingMetrics.wrapperInitTimes) {
      this.timingMetrics.wrapperInitTimes = [];
    } else {
      this.timingMetrics.wrapperInitTimes.length = 0;
    }
    if (!this.timingMetrics.wrapperCloseTimes) {
      this.timingMetrics.wrapperCloseTimes = [];
    } else {
      this.timingMetrics.wrapperCloseTimes.length = 0;
    }
    this._isInTransaction = false;
  },

  _isInTransaction: false,

  /**
   * @abstract
   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
   */
  getTransactionWrappers: null,

  isInTransaction: function() {
    return !!this._isInTransaction;
  },

  /**
   * Executes the function within a safety window. Use this for the top level
   * methods that result in large amounts of computation/mutations that would
   * need to be safety checked.
   *
   * @param {function} method Member of scope to call.
   * @param {Object} scope Scope to invoke from.
   * @param {Object?=} args... Arguments to pass to the method (optional).
   *                           Helps prevent need to bind in many cases.
   * @return Return value from `method`.
   */
  perform: function(method, scope, a, b, c, d, e, f) {
    ("production" !== "development" ? invariant(
      !this.isInTransaction(),
      'Transaction.perform(...): Cannot initialize a transaction when there ' +
      'is already an outstanding transaction.'
    ) : invariant(!this.isInTransaction()));
    var memberStart = Date.now();
    var errorThrown;
    var ret;
    try {
      this._isInTransaction = true;
      // Catching errors makes debugging more difficult, so we start with
      // errorThrown set to true before setting it to false after calling
      // close -- if it's still set to true in the finally block, it means
      // one of these calls threw.
      errorThrown = true;
      this.initializeAll(0);
      ret = method.call(scope, a, b, c, d, e, f);
      errorThrown = false;
    } finally {
      var memberEnd = Date.now();
      this.methodInvocationTime += (memberEnd - memberStart);
      try {
        if (errorThrown) {
          // If `method` throws, prefer to show that stack trace over any thrown
          // by invoking `closeAll`.
          try {
            this.closeAll(0);
          } catch (err) {
          }
        } else {
          // Since `method` didn't throw, we don't want to silence the exception
          // here.
          this.closeAll(0);
        }
      } finally {
        this._isInTransaction = false;
      }
    }
    return ret;
  },

  initializeAll: function(startIndex) {
    var transactionWrappers = this.transactionWrappers;
    var wrapperInitTimes = this.timingMetrics.wrapperInitTimes;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var initStart = Date.now();
      var wrapper = transactionWrappers[i];
      try {
        // Catching errors makes debugging more difficult, so we start with the
        // OBSERVED_ERROR state before overwriting it with the real return value
        // of initialize -- if it's still set to OBSERVED_ERROR in the finally
        // block, it means wrapper.initialize threw.
        this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
        this.wrapperInitData[i] = wrapper.initialize ?
          wrapper.initialize.call(this) :
          null;
      } finally {
        var curInitTime = wrapperInitTimes[i];
        var initEnd = Date.now();
        wrapperInitTimes[i] = (curInitTime || 0) + (initEnd - initStart);

        if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
          // The initializer for wrapper i threw an error; initialize the
          // remaining wrappers but silence any exceptions from them to ensure
          // that the first error is the one to bubble up.
          try {
            this.initializeAll(i + 1);
          } catch (err) {
          }
        }
      }
    }
  },

  /**
   * Invokes each of `this.transactionWrappers.close[i]` functions, passing into
   * them the respective return values of `this.transactionWrappers.init[i]`
   * (`close`rs that correspond to initializers that failed will not be
   * invoked).
   */
  closeAll: function(startIndex) {
    ("production" !== "development" ? invariant(
      this.isInTransaction(),
      'Transaction.closeAll(): Cannot close transaction when none are open.'
    ) : invariant(this.isInTransaction()));
    var transactionWrappers = this.transactionWrappers;
    var wrapperCloseTimes = this.timingMetrics.wrapperCloseTimes;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      var closeStart = Date.now();
      var initData = this.wrapperInitData[i];
      var errorThrown;
      try {
        // Catching errors makes debugging more difficult, so we start with
        // errorThrown set to true before setting it to false after calling
        // close -- if it's still set to true in the finally block, it means
        // wrapper.close threw.
        errorThrown = true;
        if (initData !== Transaction.OBSERVED_ERROR) {
          wrapper.close && wrapper.close.call(this, initData);
        }
        errorThrown = false;
      } finally {
        var closeEnd = Date.now();
        var curCloseTime = wrapperCloseTimes[i];
        wrapperCloseTimes[i] = (curCloseTime || 0) + (closeEnd - closeStart);

        if (errorThrown) {
          // The closer for wrapper i threw an error; close the remaining
          // wrappers but silence any exceptions from them to ensure that the
          // first error is the one to bubble up.
          try {
            this.closeAll(i + 1);
          } catch (e) {
          }
        }
      }
    }
    this.wrapperInitData.length = 0;
  }
};

var Transaction = {

  Mixin: Mixin,

  /**
   * Token to look for to determine if an error occured.
   */
  OBSERVED_ERROR: {}

};

module.exports = Transaction;

},{"./invariant":108}],85:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ViewportMetrics
 */

"use strict";

var getUnboundedScrollPosition = require("./getUnboundedScrollPosition");

var ViewportMetrics = {

  currentScrollLeft: 0,

  currentScrollTop: 0,

  refreshScrollValues: function() {
    var scrollPosition = getUnboundedScrollPosition(window);
    ViewportMetrics.currentScrollLeft = scrollPosition.x;
    ViewportMetrics.currentScrollTop = scrollPosition.y;
  }

};

module.exports = ViewportMetrics;

},{"./getUnboundedScrollPosition":106}],86:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule accumulate
 */

"use strict";

var invariant = require("./invariant");

/**
 * Accumulates items that must not be null or undefined.
 *
 * This is used to conserve memory by avoiding array allocations.
 *
 * @return {*|array<*>} An accumulation of items.
 */
function accumulate(current, next) {
  ("production" !== "development" ? invariant(
    next != null,
    'accumulate(...): Accumulated items must be not be null or undefined.'
  ) : invariant(next != null));
  if (current == null) {
    return next;
  } else {
    // Both are not empty. Warning: Never call x.concat(y) when you are not
    // certain that x is an Array (x could be a string with concat method).
    var currentIsArray = Array.isArray(current);
    var nextIsArray = Array.isArray(next);
    if (currentIsArray) {
      return current.concat(next);
    } else {
      if (nextIsArray) {
        return [current].concat(next);
      } else {
        return [current, next];
      }
    }
  }
}

module.exports = accumulate;

},{"./invariant":108}],87:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule adler32
 */

/* jslint bitwise:true */

"use strict";

var MOD = 65521;

// This is a clean-room implementation of adler32 designed for detecting
// if markup is not what we expect it to be. It does not need to be
// cryptographically strong, only reasonable good at detecting if markup
// generated on the server is different than that on the client.
function adler32(data) {
  var a = 1;
  var b = 0;
  for (var i = 0; i < data.length; i++) {
    a = (a + data.charCodeAt(i)) % MOD;
    b = (b + a) % MOD;
  }
  return a | (b << 16);
}

module.exports = adler32;

},{}],88:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule containsNode
 * @typechecks
 */

var isTextNode = require("./isTextNode");

/*jslint bitwise:true */

/**
 * Checks if a given DOM node contains or is another DOM node.
 *
 * @param {?DOMNode} outerNode Outer DOM node.
 * @param {?DOMNode} innerNode Inner DOM node.
 * @return {boolean} True if `outerNode` contains or is `innerNode`.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if (outerNode.contains) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

},{"./isTextNode":112}],89:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule copyProperties
 */

/**
 * Copy properties from one or more objects (up to 5) into the first object.
 * This is a shallow copy. It mutates the first object and also returns it.
 *
 * NOTE: `arguments` has a very significant performance penalty, which is why
 * we don't support unlimited arguments.
 */
function copyProperties(obj, a, b, c, d, e, f) {
  obj = obj || {};

  if ("production" !== "development") {
    if (f) {
      throw new Error('Too many arguments passed to copyProperties');
    }
  }

  var args = [a, b, c, d, e];
  var ii = 0, v;
  while (args[ii]) {
    v = args[ii++];
    for (var k in v) {
      obj[k] = v[k];
    }

    // IE ignores toString in object iteration.. See:
    // webreflection.blogspot.com/2007/07/quick-fix-internet-explorer-and.html
    if (v.hasOwnProperty && v.hasOwnProperty('toString') &&
        (typeof v.toString != 'undefined') && (obj.toString !== v.toString)) {
      obj.toString = v.toString;
    }
  }

  return obj;
}

module.exports = copyProperties;

},{}],90:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule createArrayFrom
 * @typechecks
 */

var toArray = require("./toArray");

/**
 * Perform a heuristic test to determine if an object is "array-like".
 *
 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
 *   Joshu replied: "Mu."
 *
 * This function determines if its argument has "array nature": it returns
 * true if the argument is an actual array, an `arguments' object, or an
 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
 *
 * It will return false for other array-like objects like Filelist.
 *
 * @param {*} obj
 * @return {boolean}
 */
function hasArrayNature(obj) {
  return (
    // not null/false
    !!obj &&
    // arrays are objects, NodeLists are functions in Safari
    (typeof obj == 'object' || typeof obj == 'function') &&
    // quacks like an array
    ('length' in obj) &&
    // not window
    !('setInterval' in obj) &&
    // no DOM node should be considered an array-like
    // a 'select' element has 'length' and 'item' properties on IE8
    (typeof obj.nodeType != 'number') &&
    (
      // a real array
      (// HTMLCollection/NodeList
      (Array.isArray(obj) ||
      // arguments
      ('callee' in obj) || 'item' in obj))
    )
  );
}

/**
 * Ensure that the argument is an array by wrapping it in an array if it is not.
 * Creates a copy of the argument if it is already an array.
 *
 * This is mostly useful idiomatically:
 *
 *   var createArrayFrom = require('createArrayFrom');
 *
 *   function takesOneOrMoreThings(things) {
 *     things = createArrayFrom(things);
 *     ...
 *   }
 *
 * This allows you to treat `things' as an array, but accept scalars in the API.
 *
 * If you need to convert an array-like object, like `arguments`, into an array
 * use toArray instead.
 *
 * @param {*} obj
 * @return {array}
 */
function createArrayFrom(obj) {
  if (!hasArrayNature(obj)) {
    return [obj];
  } else if (Array.isArray(obj)) {
    return obj.slice();
  } else {
    return toArray(obj);
  }
}

module.exports = createArrayFrom;

},{"./toArray":127}],91:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule createFullPageComponent
 * @typechecks
 */

"use strict";

// Defeat circular references by requiring this directly.
var ReactCompositeComponent = require("./ReactCompositeComponent");

var invariant = require("./invariant");

/**
 * Create a component that will throw an exception when unmounted.
 *
 * Components like <html> <head> and <body> can't be removed or added
 * easily in a cross-browser way, however it's valuable to be able to
 * take advantage of React's reconciliation for styling and <title>
 * management. So we just document it and throw in dangerous cases.
 *
 * @param {function} componentClass convenience constructor to wrap
 * @return {function} convenience constructor of new component
 */
function createFullPageComponent(componentClass) {
  var FullPageComponent = ReactCompositeComponent.createClass({
    displayName: 'ReactFullPageComponent' + (
      componentClass.componentConstructor.displayName || ''
    ),

    componentWillUnmount: function() {
      ("production" !== "development" ? invariant(
        false,
        '%s tried to unmount. Because of cross-browser quirks it is ' +
        'impossible to unmount some top-level components (eg <html>, <head>, ' +
        'and <body>) reliably and efficiently. To fix this, have a single ' +
        'top-level component that never unmounts render these elements.',
        this.constructor.displayName
      ) : invariant(false));
    },

    render: function() {
      return this.transferPropsTo(componentClass(null, this.props.children));
    }
  });

  return FullPageComponent;
}

module.exports = createFullPageComponent;

},{"./ReactCompositeComponent":29,"./invariant":108}],92:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule createNodesFromMarkup
 * @typechecks
 */

/*jslint evil: true, sub: true */

var ExecutionEnvironment = require("./ExecutionEnvironment");

var createArrayFrom = require("./createArrayFrom");
var getMarkupWrap = require("./getMarkupWrap");
var invariant = require("./invariant");

/**
 * Dummy container used to render all markup.
 */
var dummyNode =
  ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

/**
 * Pattern used by `getNodeName`.
 */
var nodeNamePattern = /^\s*<(\w+)/;

/**
 * Extracts the `nodeName` of the first element in a string of markup.
 *
 * @param {string} markup String of markup.
 * @return {?string} Node name of the supplied markup.
 */
function getNodeName(markup) {
  var nodeNameMatch = markup.match(nodeNamePattern);
  return nodeNameMatch && nodeNameMatch[1].toLowerCase();
}

/**
 * Creates an array containing the nodes rendered from the supplied markup. The
 * optionally supplied `handleScript` function will be invoked once for each
 * <script> element that is rendered. If no `handleScript` function is supplied,
 * an exception is thrown if any <script> elements are rendered.
 *
 * @param {string} markup A string of valid HTML markup.
 * @param {?function} handleScript Invoked once for each rendered <script>.
 * @return {array<DOMElement|DOMTextNode>} An array of rendered nodes.
 */
function createNodesFromMarkup(markup, handleScript) {
  var node = dummyNode;
  ("production" !== "development" ? invariant(!!dummyNode, 'createNodesFromMarkup dummy not initialized') : invariant(!!dummyNode));
  var nodeName = getNodeName(markup);

  var wrap = nodeName && getMarkupWrap(nodeName);
  if (wrap) {
    node.innerHTML = wrap[1] + markup + wrap[2];

    var wrapDepth = wrap[0];
    while (wrapDepth--) {
      node = node.lastChild;
    }
  } else {
    node.innerHTML = markup;
  }

  var scripts = node.getElementsByTagName('script');
  if (scripts.length) {
    ("production" !== "development" ? invariant(
      handleScript,
      'createNodesFromMarkup(...): Unexpected <script> element rendered.'
    ) : invariant(handleScript));
    createArrayFrom(scripts).forEach(handleScript);
  }

  var nodes = createArrayFrom(node.childNodes);
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
  return nodes;
}

module.exports = createNodesFromMarkup;

},{"./ExecutionEnvironment":20,"./createArrayFrom":90,"./getMarkupWrap":102,"./invariant":108}],93:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule createObjectFrom
 */

/**
 * Construct an object from an array of keys
 * and optionally specified value or list of values.
 *
 *  >>> createObjectFrom(['a','b','c']);
 *  {a: true, b: true, c: true}
 *
 *  >>> createObjectFrom(['a','b','c'], false);
 *  {a: false, b: false, c: false}
 *
 *  >>> createObjectFrom(['a','b','c'], 'monkey');
 *  {c:'monkey', b:'monkey' c:'monkey'}
 *
 *  >>> createObjectFrom(['a','b','c'], [1,2,3]);
 *  {a: 1, b: 2, c: 3}
 *
 *  >>> createObjectFrom(['women', 'men'], [true, false]);
 *  {women: true, men: false}
 *
 * @param   Array   list of keys
 * @param   mixed   optional value or value array.  defaults true.
 * @returns object
 */
function createObjectFrom(keys, values /* = true */) {
  if ("production" !== "development") {
    if (!Array.isArray(keys)) {
      throw new TypeError('Must pass an array of keys.');
    }
  }

  var object = {};
  var isArray = Array.isArray(values);
  if (typeof values == 'undefined') {
    values = true;
  }

  for (var ii = keys.length; ii--;) {
    object[keys[ii]] = isArray ? values[ii] : values;
  }
  return object;
}

module.exports = createObjectFrom;

},{}],94:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule dangerousStyleValue
 * @typechecks static-only
 */

"use strict";

var CSSProperty = require("./CSSProperty");

/**
 * Convert a value into the proper css writable value. The `styleName` name
 * name should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} styleName CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(styleName, value) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (isNonNumeric || value === 0 || CSSProperty.isUnitlessNumber[styleName]) {
    return '' + value; // cast to string
  }

  return value + 'px';
}

module.exports = dangerousStyleValue;

},{"./CSSProperty":2}],95:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule emptyFunction
 */

var copyProperties = require("./copyProperties");

function makeEmptyFunction(arg) {
  return function() {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
function emptyFunction() {}

copyProperties(emptyFunction, {
  thatReturns: makeEmptyFunction,
  thatReturnsFalse: makeEmptyFunction(false),
  thatReturnsTrue: makeEmptyFunction(true),
  thatReturnsNull: makeEmptyFunction(null),
  thatReturnsThis: function() { return this; },
  thatReturnsArgument: function(arg) { return arg; }
});

module.exports = emptyFunction;

},{"./copyProperties":89}],96:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule escapeTextForBrowser
 * @typechecks static-only
 */

"use strict";

var ESCAPE_LOOKUP = {
  "&": "&amp;",
  ">": "&gt;",
  "<": "&lt;",
  "\"": "&quot;",
  "'": "&#x27;",
  "/": "&#x2f;"
};

var ESCAPE_REGEX = /[&><"'\/]/g;

function escaper(match) {
  return ESCAPE_LOOKUP[match];
}

/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */
function escapeTextForBrowser(text) {
  return ('' + text).replace(ESCAPE_REGEX, escaper);
}

module.exports = escapeTextForBrowser;

},{}],97:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule flattenChildren
 */

"use strict";

var invariant = require("./invariant");
var traverseAllChildren = require("./traverseAllChildren");

/**
 * @param {function} traverseContext Context passed through traversal.
 * @param {?ReactComponent} child React child component.
 * @param {!string} name String name of key path to child.
 */
function flattenSingleChildIntoContext(traverseContext, child, name) {
  // We found a component instance.
  var result = traverseContext;
  ("production" !== "development" ? invariant(
    !result.hasOwnProperty(name),
    'flattenChildren(...): Encountered two children with the same key, `%s`. ' +
    'Children keys must be unique.',
    name
  ) : invariant(!result.hasOwnProperty(name)));
  if (child != null) {
    result[name] = child;
  }
}

/**
 * Flattens children that are typically specified as `props.children`. Any null
 * children will not be included in the resulting object.
 * @return {!object} flattened children keyed by name.
 */
function flattenChildren(children) {
  if (children == null) {
    return children;
  }
  var result = {};
  traverseAllChildren(children, flattenSingleChildIntoContext, result);
  return result;
}

module.exports = flattenChildren;

},{"./invariant":108,"./traverseAllChildren":128}],98:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule forEachAccumulated
 */

"use strict";

/**
 * @param {array} an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 */
var forEachAccumulated = function(arr, cb, scope) {
  if (Array.isArray(arr)) {
    arr.forEach(cb, scope);
  } else if (arr) {
    cb.call(scope, arr);
  }
};

module.exports = forEachAccumulated;

},{}],99:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getActiveElement
 * @typechecks
 */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document body is not yet defined.
 */
function getActiveElement() /*?DOMElement*/ {
  try {
    return document.activeElement || document.body;
  } catch (e) {
    return document.body;
  }
}

module.exports = getActiveElement;

},{}],100:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getEventKey
 * @typechecks static-only
 */

"use strict";

/**
 * Normalization of deprecated HTML5 "key" values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */
var normalizeKey = {
  'Esc': 'Escape',
  'Spacebar': ' ',
  'Left': 'ArrowLeft',
  'Up': 'ArrowUp',
  'Right': 'ArrowRight',
  'Down': 'ArrowDown',
  'Del': 'Delete',
  'Win': 'OS',
  'Menu': 'ContextMenu',
  'Apps': 'ContextMenu',
  'Scroll': 'ScrollLock',
  'MozPrintableKey': 'Unidentified'
};

/**
 * Translation from legacy "which/keyCode" to HTML5 "key"
 * Only special keys supported, all others depend on keyboard layout or browser
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */
var translateToKey = {
  8: 'Backspace',
  9: 'Tab',
  12: 'Clear',
  13: 'Enter',
  16: 'Shift',
  17: 'Control',
  18: 'Alt',
  19: 'Pause',
  20: 'CapsLock',
  27: 'Escape',
  32: ' ',
  33: 'PageUp',
  34: 'PageDown',
  35: 'End',
  36: 'Home',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
  45: 'Insert',
  46: 'Delete',
  112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5', 117: 'F6',
  118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12',
  144: 'NumLock',
  145: 'ScrollLock',
  224: 'Meta'
};

/**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */
function getEventKey(nativeEvent) {
  return 'key' in nativeEvent ?
    normalizeKey[nativeEvent.key] || nativeEvent.key :
    translateToKey[nativeEvent.which || nativeEvent.keyCode] || 'Unidentified';
}

module.exports = getEventKey;

},{}],101:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getEventTarget
 * @typechecks static-only
 */

"use strict";

/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */
function getEventTarget(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;
  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
  // @see http://www.quirksmode.org/js/events_properties.html
  return target.nodeType === 3 ? target.parentNode : target;
}

module.exports = getEventTarget;

},{}],102:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getMarkupWrap
 */

var ExecutionEnvironment = require("./ExecutionEnvironment");

var invariant = require("./invariant");

/**
 * Dummy container used to detect which wraps are necessary.
 */
var dummyNode =
  ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

/**
 * Some browsers cannot use `innerHTML` to render certain elements standalone,
 * so we wrap them, render the wrapped nodes, then extract the desired node.
 *
 * In IE8, certain elements cannot render alone, so wrap all elements ('*').
 */
var shouldWrap = {
  // Force wrapping for SVG elements because if they get created inside a <div>,
  // they will be initialized in the wrong namespace (and will not display).
  'circle': true,
  'defs': true,
  'g': true,
  'line': true,
  'linearGradient': true,
  'path': true,
  'polygon': true,
  'polyline': true,
  'radialGradient': true,
  'rect': true,
  'stop': true,
  'text': true
};

var selectWrap = [1, '<select multiple="true">', '</select>'];
var tableWrap = [1, '<table>', '</table>'];
var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

var svgWrap = [1, '<svg>', '</svg>'];

var markupWrap = {
  '*': [1, '?<div>', '</div>'],

  'area': [1, '<map>', '</map>'],
  'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  'legend': [1, '<fieldset>', '</fieldset>'],
  'param': [1, '<object>', '</object>'],
  'tr': [2, '<table><tbody>', '</tbody></table>'],

  'optgroup': selectWrap,
  'option': selectWrap,

  'caption': tableWrap,
  'colgroup': tableWrap,
  'tbody': tableWrap,
  'tfoot': tableWrap,
  'thead': tableWrap,

  'td': trWrap,
  'th': trWrap,

  'circle': svgWrap,
  'defs': svgWrap,
  'g': svgWrap,
  'line': svgWrap,
  'linearGradient': svgWrap,
  'path': svgWrap,
  'polygon': svgWrap,
  'polyline': svgWrap,
  'radialGradient': svgWrap,
  'rect': svgWrap,
  'stop': svgWrap,
  'text': svgWrap
};

/**
 * Gets the markup wrap configuration for the supplied `nodeName`.
 *
 * NOTE: This lazily detects which wraps are necessary for the current browser.
 *
 * @param {string} nodeName Lowercase `nodeName`.
 * @return {?array} Markup wrap configuration, if applicable.
 */
function getMarkupWrap(nodeName) {
  ("production" !== "development" ? invariant(!!dummyNode, 'Markup wrapping node not initialized') : invariant(!!dummyNode));
  if (!markupWrap.hasOwnProperty(nodeName)) {
    nodeName = '*';
  }
  if (!shouldWrap.hasOwnProperty(nodeName)) {
    if (nodeName === '*') {
      dummyNode.innerHTML = '<link />';
    } else {
      dummyNode.innerHTML = '<' + nodeName + '></' + nodeName + '>';
    }
    shouldWrap[nodeName] = !dummyNode.firstChild;
  }
  return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
}


module.exports = getMarkupWrap;

},{"./ExecutionEnvironment":20,"./invariant":108}],103:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getNodeForCharacterOffset
 */

"use strict";

/**
 * Given any node return the first leaf node without children.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {DOMElement|DOMTextNode}
 */
function getLeafNode(node) {
  while (node && node.firstChild) {
    node = node.firstChild;
  }
  return node;
}

/**
 * Get the next sibling within a container. This will walk up the
 * DOM if a node's siblings have been exhausted.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {?DOMElement|DOMTextNode}
 */
function getSiblingNode(node) {
  while (node) {
    if (node.nextSibling) {
      return node.nextSibling;
    }
    node = node.parentNode;
  }
}

/**
 * Get object describing the nodes which contain characters at offset.
 *
 * @param {DOMElement|DOMTextNode} root
 * @param {number} offset
 * @return {?object}
 */
function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  var nodeStart = 0;
  var nodeEnd = 0;

  while (node) {
    if (node.nodeType == 3) {
      nodeEnd = nodeStart + node.textContent.length;

      if (nodeStart <= offset && nodeEnd >= offset) {
        return {
          node: node,
          offset: offset - nodeStart
        };
      }

      nodeStart = nodeEnd;
    }

    node = getLeafNode(getSiblingNode(node));
  }
}

module.exports = getNodeForCharacterOffset;

},{}],104:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getReactRootElementInContainer
 */

"use strict";

var DOC_NODE_TYPE = 9;

/**
 * @param {DOMElement|DOMDocument} container DOM element that may contain
 *                                           a React component
 * @return {?*} DOM element that may have the reactRoot ID, or null.
 */
function getReactRootElementInContainer(container) {
  if (!container) {
    return null;
  }

  if (container.nodeType === DOC_NODE_TYPE) {
    return container.documentElement;
  } else {
    return container.firstChild;
  }
}

module.exports = getReactRootElementInContainer;

},{}],105:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getTextContentAccessor
 */

"use strict";

var ExecutionEnvironment = require("./ExecutionEnvironment");

var contentKey = null;

/**
 * Gets the key used to access text content on a DOM node.
 *
 * @return {?string} Key used to access text content.
 * @internal
 */
function getTextContentAccessor() {
  if (!contentKey && ExecutionEnvironment.canUseDOM) {
    // Prefer textContent to innerText because many browsers support both but
    // SVG <text> elements don't support innerText even when <div> does.
    contentKey = 'textContent' in document.createElement('div') ?
      'textContent' :
      'innerText';
  }
  return contentKey;
}

module.exports = getTextContentAccessor;

},{"./ExecutionEnvironment":20}],106:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getUnboundedScrollPosition
 * @typechecks
 */

"use strict";

/**
 * Gets the scroll position of the supplied element or window.
 *
 * The return values are unbounded, unlike `getScrollPosition`. This means they
 * may be negative or exceed the element boundaries (which is possible using
 * inertial scrolling).
 *
 * @param {DOMWindow|DOMElement} scrollable
 * @return {object} Map with `x` and `y` keys.
 */
function getUnboundedScrollPosition(scrollable) {
  if (scrollable === window) {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    };
  }
  return {
    x: scrollable.scrollLeft,
    y: scrollable.scrollTop
  };
}

module.exports = getUnboundedScrollPosition;

},{}],107:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule hyphenate
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

},{}],108:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition) {
  if (!condition) {
    var error = new Error(
      'Minified exception occured; use the non-minified dev environment for ' +
      'the full error message and additional helpful warnings.'
    );
    error.framesToPop = 1;
    throw error;
  }
};

if ("production" !== "development") {
  invariant = function(condition, format, a, b, c, d, e, f) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }

    if (!condition) {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      var error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  };
}

module.exports = invariant;

},{}],109:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule isEventSupported
 */

"use strict";

var ExecutionEnvironment = require("./ExecutionEnvironment");

var useHasFeature;
if (ExecutionEnvironment.canUseDOM) {
  useHasFeature =
    document.implementation &&
    document.implementation.hasFeature &&
    // always returns true in newer browsers as per the standard.
    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
    document.implementation.hasFeature('', '') !== true;
}

/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported(eventNameSuffix, capture) {
  if (!ExecutionEnvironment.canUseDOM ||
      capture && !('addEventListener' in document)) {
    return false;
  }

  var eventName = 'on' + eventNameSuffix;
  var isSupported = eventName in document;

  if (!isSupported) {
    var element = document.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}

module.exports = isEventSupported;

},{"./ExecutionEnvironment":20}],110:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule isNode
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  return !!(object && (
    typeof Node !== 'undefined' ? object instanceof Node :
      typeof object === 'object' &&
      typeof object.nodeType === 'number' &&
      typeof object.nodeName === 'string'
  ));
}

module.exports = isNode;

},{}],111:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule isTextInputElement
 */

"use strict";

/**
 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
 */
var supportedInputTypes = {
  'color': true,
  'date': true,
  'datetime': true,
  'datetime-local': true,
  'email': true,
  'month': true,
  'number': true,
  'password': true,
  'range': true,
  'search': true,
  'tel': true,
  'text': true,
  'time': true,
  'url': true,
  'week': true
};

function isTextInputElement(elem) {
  return elem && (
    (elem.nodeName === 'INPUT' && supportedInputTypes[elem.type]) ||
    elem.nodeName === 'TEXTAREA'
  );
}

module.exports = isTextInputElement;

},{}],112:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule isTextNode
 * @typechecks
 */

var isNode = require("./isNode");

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

},{"./isNode":110}],113:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule joinClasses
 * @typechecks static-only
 */

"use strict";

/**
 * Combines multiple className strings into one.
 * http://jsperf.com/joinclasses-args-vs-array
 *
 * @param {...?string} classes
 * @return {string}
 */
function joinClasses(className/*, ... */) {
  if (!className) {
    className = '';
  }
  var nextClass;
  var argLength = arguments.length;
  if (argLength > 1) {
    for (var ii = 1; ii < argLength; ii++) {
      nextClass = arguments[ii];
      nextClass && (className += ' ' + nextClass);
    }
  }
  return className;
}

module.exports = joinClasses;

},{}],114:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule keyMirror
 * @typechecks static-only
 */

"use strict";

var invariant = require("./invariant");

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function(obj) {
  var ret = {};
  var key;
  ("production" !== "development" ? invariant(
    obj instanceof Object && !Array.isArray(obj),
    'keyMirror(...): Argument must be an object.'
  ) : invariant(obj instanceof Object && !Array.isArray(obj)));
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;

},{"./invariant":108}],115:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule keyOf
 */

/**
 * Allows extraction of a minified key. Let's the build system minify keys
 * without loosing the ability to dynamically use key strings as values
 * themselves. Pass in an object with a single key/val pair and it will return
 * you the string key of that single record. Suppose you want to grab the
 * value for a key 'className' inside of an object. Key/val minification may
 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
 * reuse those resolutions.
 */
var keyOf = function(oneKeyObj) {
  var key;
  for (key in oneKeyObj) {
    if (!oneKeyObj.hasOwnProperty(key)) {
      continue;
    }
    return key;
  }
  return null;
};


module.exports = keyOf;

},{}],116:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule memoizeStringOnly
 * @typechecks static-only
 */

"use strict";

/**
 * Memoizes the return value of a function that accepts one string argument.
 *
 * @param {function} callback
 * @return {function}
 */
function memoizeStringOnly(callback) {
  var cache = {};
  return function(string) {
    if (cache.hasOwnProperty(string)) {
      return cache[string];
    } else {
      return cache[string] = callback.call(this, string);
    }
  };
}

module.exports = memoizeStringOnly;

},{}],117:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule merge
 */

"use strict";

var mergeInto = require("./mergeInto");

/**
 * Shallow merges two structures into a return value, without mutating either.
 *
 * @param {?object} one Optional object with properties to merge from.
 * @param {?object} two Optional object with properties to merge from.
 * @return {object} The shallow extension of one by two.
 */
var merge = function(one, two) {
  var result = {};
  mergeInto(result, one);
  mergeInto(result, two);
  return result;
};

module.exports = merge;

},{"./mergeInto":119}],118:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule mergeHelpers
 *
 * requiresPolyfills: Array.isArray
 */

"use strict";

var invariant = require("./invariant");
var keyMirror = require("./keyMirror");

/**
 * Maximum number of levels to traverse. Will catch circular structures.
 * @const
 */
var MAX_MERGE_DEPTH = 36;

/**
 * We won't worry about edge cases like new String('x') or new Boolean(true).
 * Functions are considered terminals, and arrays are not.
 * @param {*} o The item/object/value to test.
 * @return {boolean} true iff the argument is a terminal.
 */
var isTerminal = function(o) {
  return typeof o !== 'object' || o === null;
};

var mergeHelpers = {

  MAX_MERGE_DEPTH: MAX_MERGE_DEPTH,

  isTerminal: isTerminal,

  /**
   * Converts null/undefined values into empty object.
   *
   * @param {?Object=} arg Argument to be normalized (nullable optional)
   * @return {!Object}
   */
  normalizeMergeArg: function(arg) {
    return arg === undefined || arg === null ? {} : arg;
  },

  /**
   * If merging Arrays, a merge strategy *must* be supplied. If not, it is
   * likely the caller's fault. If this function is ever called with anything
   * but `one` and `two` being `Array`s, it is the fault of the merge utilities.
   *
   * @param {*} one Array to merge into.
   * @param {*} two Array to merge from.
   */
  checkMergeArrayArgs: function(one, two) {
    ("production" !== "development" ? invariant(
      Array.isArray(one) && Array.isArray(two),
      'Tried to merge arrays, instead got %s and %s.',
      one,
      two
    ) : invariant(Array.isArray(one) && Array.isArray(two)));
  },

  /**
   * @param {*} one Object to merge into.
   * @param {*} two Object to merge from.
   */
  checkMergeObjectArgs: function(one, two) {
    mergeHelpers.checkMergeObjectArg(one);
    mergeHelpers.checkMergeObjectArg(two);
  },

  /**
   * @param {*} arg
   */
  checkMergeObjectArg: function(arg) {
    ("production" !== "development" ? invariant(
      !isTerminal(arg) && !Array.isArray(arg),
      'Tried to merge an object, instead got %s.',
      arg
    ) : invariant(!isTerminal(arg) && !Array.isArray(arg)));
  },

  /**
   * Checks that a merge was not given a circular object or an object that had
   * too great of depth.
   *
   * @param {number} Level of recursion to validate against maximum.
   */
  checkMergeLevel: function(level) {
    ("production" !== "development" ? invariant(
      level < MAX_MERGE_DEPTH,
      'Maximum deep merge depth exceeded. You may be attempting to merge ' +
      'circular structures in an unsupported way.'
    ) : invariant(level < MAX_MERGE_DEPTH));
  },

  /**
   * Checks that the supplied merge strategy is valid.
   *
   * @param {string} Array merge strategy.
   */
  checkArrayStrategy: function(strategy) {
    ("production" !== "development" ? invariant(
      strategy === undefined || strategy in mergeHelpers.ArrayStrategies,
      'You must provide an array strategy to deep merge functions to ' +
      'instruct the deep merge how to resolve merging two arrays.'
    ) : invariant(strategy === undefined || strategy in mergeHelpers.ArrayStrategies));
  },

  /**
   * Set of possible behaviors of merge algorithms when encountering two Arrays
   * that must be merged together.
   * - `clobber`: The left `Array` is ignored.
   * - `indexByIndex`: The result is achieved by recursively deep merging at
   *   each index. (not yet supported.)
   */
  ArrayStrategies: keyMirror({
    Clobber: true,
    IndexByIndex: true
  })

};

module.exports = mergeHelpers;

},{"./invariant":108,"./keyMirror":114}],119:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule mergeInto
 * @typechecks static-only
 */

"use strict";

var mergeHelpers = require("./mergeHelpers");

var checkMergeObjectArg = mergeHelpers.checkMergeObjectArg;

/**
 * Shallow merges two structures by mutating the first parameter.
 *
 * @param {object} one Object to be merged into.
 * @param {?object} two Optional object with properties to merge from.
 */
function mergeInto(one, two) {
  checkMergeObjectArg(one);
  if (two != null) {
    checkMergeObjectArg(two);
    for (var key in two) {
      if (!two.hasOwnProperty(key)) {
        continue;
      }
      one[key] = two[key];
    }
  }
}

module.exports = mergeInto;

},{"./mergeHelpers":118}],120:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule mixInto
 */

"use strict";

/**
 * Simply copies properties to the prototype.
 */
var mixInto = function(constructor, methodBag) {
  var methodName;
  for (methodName in methodBag) {
    if (!methodBag.hasOwnProperty(methodName)) {
      continue;
    }
    constructor.prototype[methodName] = methodBag[methodName];
  }
};

module.exports = mixInto;

},{}],121:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule objMap
 */

"use strict";

/**
 * For each key/value pair, invokes callback func and constructs a resulting
 * object which contains, for every key in obj, values that are the result of
 * of invoking the function:
 *
 *   func(value, key, iteration)
 *
 * @param {?object} obj Object to map keys over
 * @param {function} func Invoked for each key/val pair.
 * @param {?*} context
 * @return {?object} Result of mapping or null if obj is falsey
 */
function objMap(obj, func, context) {
  if (!obj) {
    return null;
  }
  var i = 0;
  var ret = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = func.call(context, obj[key], key, i++);
    }
  }
  return ret;
}

module.exports = objMap;

},{}],122:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule objMapKeyVal
 */

"use strict";

/**
 * Behaves the same as `objMap` but invokes func with the key first, and value
 * second. Use `objMap` unless you need this special case.
 * Invokes func as:
 *
 *   func(key, value, iteration)
 *
 * @param {?object} obj Object to map keys over
 * @param {!function} func Invoked for each key/val pair.
 * @param {?*} context
 * @return {?object} Result of mapping or null if obj is falsey
 */
function objMapKeyVal(obj, func, context) {
  if (!obj) {
    return null;
  }
  var i = 0;
  var ret = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = func.call(context, key, obj[key], i++);
    }
  }
  return ret;
}

module.exports = objMapKeyVal;

},{}],123:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule onlyChild
 */
"use strict";

var ReactComponent = require("./ReactComponent");

var invariant = require("./invariant");

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection. The current implementation of this
 * function assumes that a single child gets passed without a wrapper, but the
 * purpose of this helper function is to abstract away the particular structure
 * of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactComponent} The first and only `ReactComponent` contained in the
 * structure.
 */
function onlyChild(children) {
  ("production" !== "development" ? invariant(
    ReactComponent.isValidComponent(children),
    'onlyChild must be passed a children with exactly one child.'
  ) : invariant(ReactComponent.isValidComponent(children)));
  return children;
}

module.exports = onlyChild;

},{"./ReactComponent":26,"./invariant":108}],124:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule performanceNow
 * @typechecks static-only
 */

"use strict";

var ExecutionEnvironment = require("./ExecutionEnvironment");

/**
 * Detect if we can use window.performance.now() and gracefully
 * fallback to Date.now() if it doesn't exist.
 * We need to support Firefox < 15 for now due to Facebook's webdriver
 * infrastructure.
 */
var performance = null;

if (ExecutionEnvironment.canUseDOM) {
  performance = window.performance || window.webkitPerformance;
}

if (!performance || !performance.now) {
  performance = Date;
}

var performanceNow = performance.now.bind(performance);

module.exports = performanceNow;

},{"./ExecutionEnvironment":20}],125:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule shallowEqual
 */

"use strict";

/**
 * Performs equality by iterating through keys on an object and returning
 * false when any key has values which are not strictly equal between
 * objA and objB. Returns true when the values of all keys are strictly equal.
 *
 * @return {boolean}
 */
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  var key;
  // Test for A's keys different from B.
  for (key in objA) {
    if (objA.hasOwnProperty(key) &&
        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
      return false;
    }
  }
  // Test for B'a keys missing from A.
  for (key in objB) {
    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

module.exports = shallowEqual;

},{}],126:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule shouldUpdateReactComponent
 * @typechecks static-only
 */

"use strict";

/**
 * Given a `prevComponent` and `nextComponent`, determines if `prevComponent`
 * should be updated as opposed to being destroyed or replaced.
 *
 * @param {?object} prevComponent
 * @param {?object} nextComponent
 * @return {boolean} True if `prevComponent` should be updated.
 * @protected
 */
function shouldUpdateReactComponent(prevComponent, nextComponent) {
  // TODO: Remove warning after a release.
  if (prevComponent && nextComponent &&
      prevComponent.constructor === nextComponent.constructor && (
        (prevComponent.props && prevComponent.props.key) ===
        (nextComponent.props && nextComponent.props.key)
      )) {
    if (prevComponent._owner === nextComponent._owner) {
      return true;
    } else {
      if ("production" !== "development") {
        if (prevComponent.state) {
          console.warn(
            'A recent change to React has been found to impact your code. ' +
            'A mounted component will now be unmounted and replaced by a ' +
            'component (of the same class) if their owners are different. ' +
            'Previously, ownership was not considered when updating.',
            prevComponent,
            nextComponent
          );
        }
      }
    }
  }
  return false;
}

module.exports = shouldUpdateReactComponent;

},{}],127:[function(require,module,exports){
/**
 * Copyright 2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule toArray
 * @typechecks
 */

var invariant = require("./invariant");

/**
 * Convert array-like objects to arrays.
 *
 * This API assumes the caller knows the contents of the data type. For less
 * well defined inputs use createArrayFrom.
 *
 * @param {object|function} obj
 * @return {array}
 */
function toArray(obj) {
  var length = obj.length;

  // Some browse builtin objects can report typeof 'function' (e.g. NodeList in
  // old versions of Safari).
  ("production" !== "development" ? invariant(
    !Array.isArray(obj) &&
    (typeof obj === 'object' || typeof obj === 'function'),
    'toArray: Array-like object expected'
  ) : invariant(!Array.isArray(obj) &&
  (typeof obj === 'object' || typeof obj === 'function')));

  ("production" !== "development" ? invariant(
    typeof length === 'number',
    'toArray: Object needs a length property'
  ) : invariant(typeof length === 'number'));

  ("production" !== "development" ? invariant(
    length === 0 ||
    (length - 1) in obj,
    'toArray: Object should have keys for indices'
  ) : invariant(length === 0 ||
  (length - 1) in obj));

  // Old IE doesn't give collections access to hasOwnProperty. Assume inputs
  // without method will throw during the slice call and skip straight to the
  // fallback.
  if (obj.hasOwnProperty) {
    try {
      return Array.prototype.slice.call(obj);
    } catch (e) {
      // IE < 9 does not support Array#slice on collections objects
    }
  }

  // Fall back to copying key by key. This assumes all keys have a value,
  // so will not preserve sparsely populated inputs.
  var ret = Array(length);
  for (var ii = 0; ii < length; ii++) {
    ret[ii] = obj[ii];
  }
  return ret;
}

module.exports = toArray;

},{"./invariant":108}],128:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule traverseAllChildren
 */

"use strict";

var ReactInstanceHandles = require("./ReactInstanceHandles");
var ReactTextComponent = require("./ReactTextComponent");

var invariant = require("./invariant");

var SEPARATOR = ReactInstanceHandles.SEPARATOR;
var SUBSEPARATOR = ':';

/**
 * TODO: Test that:
 * 1. `mapChildren` transforms strings and numbers into `ReactTextComponent`.
 * 2. it('should fail when supplied duplicate key', function() {
 * 3. That a single child and an array with one item have the same key pattern.
 * });
 */

var userProvidedKeyEscaperLookup = {
  '=': '=0',
  '.': '=1',
  ':': '=2'
};

var userProvidedKeyEscapeRegex = /[=.:]/g;

function userProvidedKeyEscaper(match) {
  return userProvidedKeyEscaperLookup[match];
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  if (component && component.props && component.props.key != null) {
    // Explicit key
    return wrapUserProvidedKey(component.props.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * Escape a component key so that it is safe to use in a reactid.
 *
 * @param {*} key Component key to be escaped.
 * @return {string} An escaped string.
 */
function escapeUserProvidedKey(text) {
  return ('' + text).replace(
    userProvidedKeyEscapeRegex,
    userProvidedKeyEscaper
  );
}

/**
 * Wrap a `key` value explicitly provided by the user to distinguish it from
 * implicitly-generated keys generated by a component's index in its parent.
 *
 * @param {string} key Value of a user-provided `key` attribute
 * @return {string}
 */
function wrapUserProvidedKey(key) {
  return '$' + escapeUserProvidedKey(key);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!number} indexSoFar Number of children encountered until this point.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
var traverseAllChildrenImpl =
  function(children, nameSoFar, indexSoFar, callback, traverseContext) {
    var subtreeCount = 0;  // Count of children found in the current subtree.
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var nextName = (
          nameSoFar +
          (nameSoFar ? SUBSEPARATOR : SEPARATOR) +
          getComponentKey(child, i)
        );
        var nextIndex = indexSoFar + subtreeCount;
        subtreeCount += traverseAllChildrenImpl(
          child,
          nextName,
          nextIndex,
          callback,
          traverseContext
        );
      }
    } else {
      var type = typeof children;
      var isOnlyChild = nameSoFar === '';
      // If it's the only child, treat the name as if it was wrapped in an array
      // so that it's consistent if the number of children grows
      var storageName =
        isOnlyChild ? SEPARATOR + getComponentKey(children, 0) : nameSoFar;
      if (children == null || type === 'boolean') {
        // All of the above are perceived as null.
        callback(traverseContext, null, storageName, indexSoFar);
        subtreeCount = 1;
      } else if (children.mountComponentIntoNode) {
        callback(traverseContext, children, storageName, indexSoFar);
        subtreeCount = 1;
      } else {
        if (type === 'object') {
          ("production" !== "development" ? invariant(
            !children || children.nodeType !== 1,
            'traverseAllChildren(...): Encountered an invalid child; DOM ' +
            'elements are not valid children of React components.'
          ) : invariant(!children || children.nodeType !== 1));
          for (var key in children) {
            if (children.hasOwnProperty(key)) {
              subtreeCount += traverseAllChildrenImpl(
                children[key],
                (
                  nameSoFar + (nameSoFar ? SUBSEPARATOR : SEPARATOR) +
                  wrapUserProvidedKey(key) + SUBSEPARATOR +
                  getComponentKey(children[key], 0)
                ),
                indexSoFar + subtreeCount,
                callback,
                traverseContext
              );
            }
          }
        } else if (type === 'string') {
          var normalizedText = new ReactTextComponent(children);
          callback(traverseContext, normalizedText, storageName, indexSoFar);
          subtreeCount += 1;
        } else if (type === 'number') {
          var normalizedNumber = new ReactTextComponent('' + children);
          callback(traverseContext, normalizedNumber, storageName, indexSoFar);
          subtreeCount += 1;
        }
      }
    }
    return subtreeCount;
  };

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children !== null && children !== undefined) {
    traverseAllChildrenImpl(children, '', 0, callback, traverseContext);
  }
}

module.exports = traverseAllChildren;

},{"./ReactInstanceHandles":53,"./ReactTextComponent":69,"./invariant":108}],129:[function(require,module,exports){
/**
 * Copyright 2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule warning
 */

"use strict";

var emptyFunction = require("./emptyFunction");

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if ("production" !== "development") {
  warning = function(condition, format ) {var args=Array.prototype.slice.call(arguments,2);
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (!condition) {
      var argIndex = 0;
      console.warn('Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];}));
    }
  };
}

module.exports = warning;

},{"./emptyFunction":95}]},{},[24])
(24)
});if(typeof Math.imul == "undefined" || (Math.imul(0xffffffff,5) == 0)) {
    Math.imul = function (a, b) {
        var ah  = (a >>> 16) & 0xffff;
        var al = a & 0xffff;
        var bh  = (b >>> 16) & 0xffff;
        var bl = b & 0xffff;
        // the shift by 0 fixes the sign on the high part
        // the final |0 converts the unsigned value into a signed value
        return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
    }
}

;(function(){
var h, aa = aa || {}, ca = this;
function da(a) {
  a = a.split(".");
  for (var b = ca, c;c = a.shift();) {
    if (null != b[c]) {
      b = b[c];
    } else {
      return null;
    }
  }
  return b;
}
function ea() {
}
function k(a) {
  var b = typeof a;
  if ("object" == b) {
    if (a) {
      if (a instanceof Array) {
        return "array";
      }
      if (a instanceof Object) {
        return b;
      }
      var c = Object.prototype.toString.call(a);
      if ("[object Window]" == c) {
        return "object";
      }
      if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == b && "undefined" == typeof a.call) {
      return "object";
    }
  }
  return b;
}
function fa(a) {
  return "array" == k(a);
}
function ga(a) {
  var b = k(a);
  return "array" == b || "object" == b && "number" == typeof a.length;
}
function ia(a) {
  return "string" == typeof a;
}
function ka(a) {
  return "function" == k(a);
}
function ma(a) {
  return a[na] || (a[na] = ++pa);
}
var na = "closure_uid_" + (1E9 * Math.random() >>> 0), pa = 0;
function qa(a, b, c) {
  return a.call.apply(a.bind, arguments);
}
function ra(a, b, c) {
  if (!a) {
    throw Error();
  }
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c);
    };
  }
  return function() {
    return a.apply(b, arguments);
  };
}
function ta(a, b, c) {
  ta = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? qa : ra;
  return ta.apply(null, arguments);
}
var ua = Date.now || function() {
  return+new Date;
};
function va(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.zb = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a;
  a.Tf = function(a, c, f) {
    return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2));
  };
}
;function xa(a, b) {
  for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1);e.length && 1 < c.length;) {
    d += c.shift() + e.shift();
  }
  return d + c.join("%s");
}
function ya(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
}
function Ba(a) {
  if (!Ca.test(a)) {
    return a;
  }
  -1 != a.indexOf("\x26") && (a = a.replace(Da, "\x26amp;"));
  -1 != a.indexOf("\x3c") && (a = a.replace(Ea, "\x26lt;"));
  -1 != a.indexOf("\x3e") && (a = a.replace(Fa, "\x26gt;"));
  -1 != a.indexOf('"') && (a = a.replace(Ha, "\x26quot;"));
  -1 != a.indexOf("'") && (a = a.replace(Ia, "\x26#39;"));
  -1 != a.indexOf("\x00") && (a = a.replace(Ja, "\x26#0;"));
  return a;
}
var Da = /&/g, Ea = /</g, Fa = />/g, Ha = /"/g, Ia = /'/g, Ja = /\x00/g, Ca = /[\x00&<>"']/;
function La(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
;function Ma(a, b) {
  for (var c in a) {
    b.call(void 0, a[c], c, a);
  }
}
function Na(a) {
  var b = [], c = 0, d;
  for (d in a) {
    b[c++] = a[d];
  }
  return b;
}
function Oa(a) {
  var b = [], c = 0, d;
  for (d in a) {
    b[c++] = d;
  }
  return b;
}
var Pa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function Qa(a, b) {
  for (var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for (c in d) {
      a[c] = d[c];
    }
    for (var f = 0;f < Pa.length;f++) {
      c = Pa[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
}
;function Sa(a, b) {
  null != a && this.append.apply(this, arguments);
}
h = Sa.prototype;
h.pb = "";
h.set = function(a) {
  this.pb = "" + a;
};
h.append = function(a, b, c) {
  this.pb += a;
  if (null != b) {
    for (var d = 1;d < arguments.length;d++) {
      this.pb += arguments[d];
    }
  }
  return this;
};
h.clear = function() {
  this.pb = "";
};
h.toString = function() {
  return this.pb;
};
function Ta(a) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Ta);
  } else {
    var b = Error().stack;
    b && (this.stack = b);
  }
  a && (this.message = String(a));
}
va(Ta, Error);
Ta.prototype.name = "CustomError";
function Ua(a, b) {
  b.unshift(a);
  Ta.call(this, xa.apply(null, b));
  b.shift();
}
va(Ua, Ta);
Ua.prototype.name = "AssertionError";
function Va(a, b) {
  throw new Ua("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
}
;var Wa = Array.prototype, Xa = Wa.indexOf ? function(a, b, c) {
  return Wa.indexOf.call(a, b, c);
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if (ia(a)) {
    return ia(b) && 1 == b.length ? a.indexOf(b, c) : -1;
  }
  for (;c < a.length;c++) {
    if (c in a && a[c] === b) {
      return c;
    }
  }
  return-1;
}, $a = Wa.lastIndexOf ? function(a, b, c) {
  return Wa.lastIndexOf.call(a, b, null == c ? a.length - 1 : c);
} : function(a, b, c) {
  c = null == c ? a.length - 1 : c;
  0 > c && (c = Math.max(0, a.length + c));
  if (ia(a)) {
    return ia(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
  }
  for (;0 <= c;c--) {
    if (c in a && a[c] === b) {
      return c;
    }
  }
  return-1;
}, ab = Wa.forEach ? function(a, b, c) {
  Wa.forEach.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = ia(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in e && b.call(c, e[f], f, a);
  }
}, bb = Wa.some ? function(a, b, c) {
  return Wa.some.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = ia(a) ? a.split("") : a, f = 0;f < d;f++) {
    if (f in e && b.call(c, e[f], f, a)) {
      return!0;
    }
  }
  return!1;
};
function eb(a) {
  var b;
  a: {
    b = fb;
    for (var c = a.length, d = ia(a) ? a.split("") : a, e = 0;e < c;e++) {
      if (e in d && b.call(void 0, d[e], e, a)) {
        b = e;
        break a;
      }
    }
    b = -1;
  }
  return 0 > b ? null : ia(a) ? a.charAt(b) : a[b];
}
function gb(a) {
  if (!fa(a)) {
    for (var b = a.length - 1;0 <= b;b--) {
      delete a[b];
    }
  }
  a.length = 0;
}
function hb(a, b) {
  var c = Xa(a, b), d;
  (d = 0 <= c) && Wa.splice.call(a, c, 1);
  return d;
}
function ib(a) {
  return Wa.concat.apply(Wa, arguments);
}
function kb(a) {
  var b = a.length;
  if (0 < b) {
    for (var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d];
    }
    return c;
  }
  return[];
}
;var lb = null;
function mb() {
  return new n(null, 5, [new s(null, "flush-on-newline", "flush-on-newline", -151457939), !0, new s(null, "readably", "readably", 1129599760), !0, new s(null, "meta", "meta", 1499536964), !1, new s(null, "dup", "dup", 556298533), !1, new s(null, "print-length", "print-length", 1931866356), null], null);
}
function t(a) {
  return null != a && !1 !== a;
}
function nb(a) {
  return null == a;
}
function ob(a) {
  return t(a) ? !1 : !0;
}
function pb(a) {
  return null != a ? a.constructor === Object : !1;
}
function v(a, b) {
  return a[k(null == b ? null : b)] ? !0 : a._ ? !0 : !1;
}
function qb(a) {
  return null == a ? null : a.constructor;
}
function w(a, b) {
  var c = qb.call(null, b), c = t(t(c) ? c.bb : c) ? c.ab : k(b);
  return Error(["No protocol method ", a, " defined for type ", c, ": ", b].join(""));
}
function rb(a) {
  var b = a.ab;
  return t(b) ? b : "" + x.a(a);
}
function sb(a) {
  for (var b = a.length, c = Array(b), d = 0;;) {
    if (d < b) {
      c[d] = a[d], d += 1;
    } else {
      break;
    }
  }
  return c;
}
function tb(a) {
  return Array.prototype.slice.call(arguments);
}
var vb = function() {
  function a(a, b) {
    return ub.call(null, function(a, b) {
      a.push(b);
      return a;
    }, [], b);
  }
  function b(a) {
    return c.call(null, null, a);
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, 0, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}(), wb = {}, xb = {}, yb = {};
function Ab(a) {
  if (a ? a.Q : a) {
    return a.Q(a);
  }
  var b;
  b = Ab[k(null == a ? null : a)];
  if (!b && (b = Ab._, !b)) {
    throw w.call(null, "ICounted.-count", a);
  }
  return b.call(null, a);
}
function Bb(a) {
  if (a ? a.U : a) {
    return a.U(a);
  }
  var b;
  b = Bb[k(null == a ? null : a)];
  if (!b && (b = Bb._, !b)) {
    throw w.call(null, "IEmptyableCollection.-empty", a);
  }
  return b.call(null, a);
}
var Cb = {};
function Db(a, b) {
  if (a ? a.P : a) {
    return a.P(a, b);
  }
  var c;
  c = Db[k(null == a ? null : a)];
  if (!c && (c = Db._, !c)) {
    throw w.call(null, "ICollection.-conj", a);
  }
  return c.call(null, a, b);
}
var Eb = {}, A = function() {
  function a(a, b, c) {
    if (a ? a.ua : a) {
      return a.ua(a, b, c);
    }
    var g;
    g = A[k(null == a ? null : a)];
    if (!g && (g = A._, !g)) {
      throw w.call(null, "IIndexed.-nth", a);
    }
    return g.call(null, a, b, c);
  }
  function b(a, b) {
    if (a ? a.ta : a) {
      return a.ta(a, b);
    }
    var c;
    c = A[k(null == a ? null : a)];
    if (!c && (c = A._, !c)) {
      throw w.call(null, "IIndexed.-nth", a);
    }
    return c.call(null, a, b);
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}(), Fb = {};
function Gb(a) {
  if (a ? a.ga : a) {
    return a.ga(a);
  }
  var b;
  b = Gb[k(null == a ? null : a)];
  if (!b && (b = Gb._, !b)) {
    throw w.call(null, "ISeq.-first", a);
  }
  return b.call(null, a);
}
function Hb(a) {
  if (a ? a.ha : a) {
    return a.ha(a);
  }
  var b;
  b = Hb[k(null == a ? null : a)];
  if (!b && (b = Hb._, !b)) {
    throw w.call(null, "ISeq.-rest", a);
  }
  return b.call(null, a);
}
var Ib = {};
function Jb(a) {
  if (a ? a.Aa : a) {
    return a.Aa(a);
  }
  var b;
  b = Jb[k(null == a ? null : a)];
  if (!b && (b = Jb._, !b)) {
    throw w.call(null, "INext.-next", a);
  }
  return b.call(null, a);
}
var Kb = {}, Lb = function() {
  function a(a, b, c) {
    if (a ? a.G : a) {
      return a.G(a, b, c);
    }
    var g;
    g = Lb[k(null == a ? null : a)];
    if (!g && (g = Lb._, !g)) {
      throw w.call(null, "ILookup.-lookup", a);
    }
    return g.call(null, a, b, c);
  }
  function b(a, b) {
    if (a ? a.A : a) {
      return a.A(a, b);
    }
    var c;
    c = Lb[k(null == a ? null : a)];
    if (!c && (c = Lb._, !c)) {
      throw w.call(null, "ILookup.-lookup", a);
    }
    return c.call(null, a, b);
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}();
function Mb(a, b) {
  if (a ? a.Nc : a) {
    return a.Nc(a, b);
  }
  var c;
  c = Mb[k(null == a ? null : a)];
  if (!c && (c = Mb._, !c)) {
    throw w.call(null, "IAssociative.-contains-key?", a);
  }
  return c.call(null, a, b);
}
function Nb(a, b, c) {
  if (a ? a.Fa : a) {
    return a.Fa(a, b, c);
  }
  var d;
  d = Nb[k(null == a ? null : a)];
  if (!d && (d = Nb._, !d)) {
    throw w.call(null, "IAssociative.-assoc", a);
  }
  return d.call(null, a, b, c);
}
var Ob = {};
function Pb(a, b) {
  if (a ? a.rb : a) {
    return a.rb(a, b);
  }
  var c;
  c = Pb[k(null == a ? null : a)];
  if (!c && (c = Pb._, !c)) {
    throw w.call(null, "IMap.-dissoc", a);
  }
  return c.call(null, a, b);
}
var Qb = {};
function Rb(a) {
  if (a ? a.Pc : a) {
    return a.Pc(a);
  }
  var b;
  b = Rb[k(null == a ? null : a)];
  if (!b && (b = Rb._, !b)) {
    throw w.call(null, "IMapEntry.-key", a);
  }
  return b.call(null, a);
}
function Sb(a) {
  if (a ? a.Qc : a) {
    return a.Qc(a);
  }
  var b;
  b = Sb[k(null == a ? null : a)];
  if (!b && (b = Sb._, !b)) {
    throw w.call(null, "IMapEntry.-val", a);
  }
  return b.call(null, a);
}
var Tb = {};
function Ub(a) {
  if (a ? a.sb : a) {
    return a.sb(a);
  }
  var b;
  b = Ub[k(null == a ? null : a)];
  if (!b && (b = Ub._, !b)) {
    throw w.call(null, "IStack.-peek", a);
  }
  return b.call(null, a);
}
function Vb(a) {
  if (a ? a.tb : a) {
    return a.tb(a);
  }
  var b;
  b = Vb[k(null == a ? null : a)];
  if (!b && (b = Vb._, !b)) {
    throw w.call(null, "IStack.-pop", a);
  }
  return b.call(null, a);
}
var Wb = {};
function Xb(a, b, c) {
  if (a ? a.Bb : a) {
    return a.Bb(a, b, c);
  }
  var d;
  d = Xb[k(null == a ? null : a)];
  if (!d && (d = Xb._, !d)) {
    throw w.call(null, "IVector.-assoc-n", a);
  }
  return d.call(null, a, b, c);
}
function Yb(a) {
  if (a ? a.Ab : a) {
    return a.Ab(a);
  }
  var b;
  b = Yb[k(null == a ? null : a)];
  if (!b && (b = Yb._, !b)) {
    throw w.call(null, "IDeref.-deref", a);
  }
  return b.call(null, a);
}
var Zb = {};
function $b(a) {
  if (a ? a.B : a) {
    return a.B(a);
  }
  var b;
  b = $b[k(null == a ? null : a)];
  if (!b && (b = $b._, !b)) {
    throw w.call(null, "IMeta.-meta", a);
  }
  return b.call(null, a);
}
var ac = {};
function bc(a, b) {
  if (a ? a.D : a) {
    return a.D(a, b);
  }
  var c;
  c = bc[k(null == a ? null : a)];
  if (!c && (c = bc._, !c)) {
    throw w.call(null, "IWithMeta.-with-meta", a);
  }
  return c.call(null, a, b);
}
var cc = {}, dc = function() {
  function a(a, b, c) {
    if (a ? a.aa : a) {
      return a.aa(a, b, c);
    }
    var g;
    g = dc[k(null == a ? null : a)];
    if (!g && (g = dc._, !g)) {
      throw w.call(null, "IReduce.-reduce", a);
    }
    return g.call(null, a, b, c);
  }
  function b(a, b) {
    if (a ? a.$ : a) {
      return a.$(a, b);
    }
    var c;
    c = dc[k(null == a ? null : a)];
    if (!c && (c = dc._, !c)) {
      throw w.call(null, "IReduce.-reduce", a);
    }
    return c.call(null, a, b);
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}();
function ec(a, b, c) {
  if (a ? a.qc : a) {
    return a.qc(a, b, c);
  }
  var d;
  d = ec[k(null == a ? null : a)];
  if (!d && (d = ec._, !d)) {
    throw w.call(null, "IKVReduce.-kv-reduce", a);
  }
  return d.call(null, a, b, c);
}
function fc(a, b) {
  if (a ? a.C : a) {
    return a.C(a, b);
  }
  var c;
  c = fc[k(null == a ? null : a)];
  if (!c && (c = fc._, !c)) {
    throw w.call(null, "IEquiv.-equiv", a);
  }
  return c.call(null, a, b);
}
function gc(a) {
  if (a ? a.F : a) {
    return a.F(a);
  }
  var b;
  b = gc[k(null == a ? null : a)];
  if (!b && (b = gc._, !b)) {
    throw w.call(null, "IHash.-hash", a);
  }
  return b.call(null, a);
}
var hc = {};
function ic(a) {
  if (a ? a.M : a) {
    return a.M(a);
  }
  var b;
  b = ic[k(null == a ? null : a)];
  if (!b && (b = ic._, !b)) {
    throw w.call(null, "ISeqable.-seq", a);
  }
  return b.call(null, a);
}
var kc = {}, lc = {}, mc = {};
function nc(a) {
  if (a ? a.rc : a) {
    return a.rc(a);
  }
  var b;
  b = nc[k(null == a ? null : a)];
  if (!b && (b = nc._, !b)) {
    throw w.call(null, "IReversible.-rseq", a);
  }
  return b.call(null, a);
}
function oc(a, b) {
  if (a ? a.te : a) {
    return a.te(0, b);
  }
  var c;
  c = oc[k(null == a ? null : a)];
  if (!c && (c = oc._, !c)) {
    throw w.call(null, "IWriter.-write", a);
  }
  return c.call(null, a, b);
}
function pc(a) {
  if (a ? a.xf : a) {
    return null;
  }
  var b;
  b = pc[k(null == a ? null : a)];
  if (!b && (b = pc._, !b)) {
    throw w.call(null, "IWriter.-flush", a);
  }
  return b.call(null, a);
}
var qc = {};
function rc(a, b, c) {
  if (a ? a.H : a) {
    return a.H(a, b, c);
  }
  var d;
  d = rc[k(null == a ? null : a)];
  if (!d && (d = rc._, !d)) {
    throw w.call(null, "IPrintWithWriter.-pr-writer", a);
  }
  return d.call(null, a, b, c);
}
function sc(a, b, c) {
  if (a ? a.Uc : a) {
    return a.Uc(a, b, c);
  }
  var d;
  d = sc[k(null == a ? null : a)];
  if (!d && (d = sc._, !d)) {
    throw w.call(null, "IWatchable.-notify-watches", a);
  }
  return d.call(null, a, b, c);
}
function tc(a, b, c) {
  if (a ? a.Tc : a) {
    return a.Tc(a, b, c);
  }
  var d;
  d = tc[k(null == a ? null : a)];
  if (!d && (d = tc._, !d)) {
    throw w.call(null, "IWatchable.-add-watch", a);
  }
  return d.call(null, a, b, c);
}
function uc(a, b) {
  if (a ? a.Vc : a) {
    return a.Vc(a, b);
  }
  var c;
  c = uc[k(null == a ? null : a)];
  if (!c && (c = uc._, !c)) {
    throw w.call(null, "IWatchable.-remove-watch", a);
  }
  return c.call(null, a, b);
}
function vc(a) {
  if (a ? a.cc : a) {
    return a.cc(a);
  }
  var b;
  b = vc[k(null == a ? null : a)];
  if (!b && (b = vc._, !b)) {
    throw w.call(null, "IEditableCollection.-as-transient", a);
  }
  return b.call(null, a);
}
function wc(a, b) {
  if (a ? a.tc : a) {
    return a.tc(a, b);
  }
  var c;
  c = wc[k(null == a ? null : a)];
  if (!c && (c = wc._, !c)) {
    throw w.call(null, "ITransientCollection.-conj!", a);
  }
  return c.call(null, a, b);
}
function xc(a) {
  if (a ? a.uc : a) {
    return a.uc(a);
  }
  var b;
  b = xc[k(null == a ? null : a)];
  if (!b && (b = xc._, !b)) {
    throw w.call(null, "ITransientCollection.-persistent!", a);
  }
  return b.call(null, a);
}
function yc(a, b, c) {
  if (a ? a.Sc : a) {
    return a.Sc(a, b, c);
  }
  var d;
  d = yc[k(null == a ? null : a)];
  if (!d && (d = yc._, !d)) {
    throw w.call(null, "ITransientAssociative.-assoc!", a);
  }
  return d.call(null, a, b, c);
}
function zc(a, b, c) {
  if (a ? a.se : a) {
    return a.se(0, b, c);
  }
  var d;
  d = zc[k(null == a ? null : a)];
  if (!d && (d = zc._, !d)) {
    throw w.call(null, "ITransientVector.-assoc-n!", a);
  }
  return d.call(null, a, b, c);
}
function Ac(a, b) {
  if (a ? a.bc : a) {
    return a.bc(a, b);
  }
  var c;
  c = Ac[k(null == a ? null : a)];
  if (!c && (c = Ac._, !c)) {
    throw w.call(null, "IComparable.-compare", a);
  }
  return c.call(null, a, b);
}
function Bc(a) {
  if (a ? a.me : a) {
    return a.me();
  }
  var b;
  b = Bc[k(null == a ? null : a)];
  if (!b && (b = Bc._, !b)) {
    throw w.call(null, "IChunk.-drop-first", a);
  }
  return b.call(null, a);
}
function Cc(a) {
  if (a ? a.Bd : a) {
    return a.Bd(a);
  }
  var b;
  b = Cc[k(null == a ? null : a)];
  if (!b && (b = Cc._, !b)) {
    throw w.call(null, "IChunkedSeq.-chunked-first", a);
  }
  return b.call(null, a);
}
function Dc(a) {
  if (a ? a.Cd : a) {
    return a.Cd(a);
  }
  var b;
  b = Dc[k(null == a ? null : a)];
  if (!b && (b = Dc._, !b)) {
    throw w.call(null, "IChunkedSeq.-chunked-rest", a);
  }
  return b.call(null, a);
}
function Ec(a) {
  if (a ? a.Ad : a) {
    return a.Ad(a);
  }
  var b;
  b = Ec[k(null == a ? null : a)];
  if (!b && (b = Ec._, !b)) {
    throw w.call(null, "IChunkedNext.-chunked-next", a);
  }
  return b.call(null, a);
}
function Fc(a) {
  if (a ? a.qe : a) {
    return a.name;
  }
  var b;
  b = Fc[k(null == a ? null : a)];
  if (!b && (b = Fc._, !b)) {
    throw w.call(null, "INamed.-name", a);
  }
  return b.call(null, a);
}
function Gc(a) {
  if (a ? a.re : a) {
    return a.Ia;
  }
  var b;
  b = Gc[k(null == a ? null : a)];
  if (!b && (b = Gc._, !b)) {
    throw w.call(null, "INamed.-namespace", a);
  }
  return b.call(null, a);
}
function Hc(a, b) {
  if (a ? a.Ed : a) {
    return a.Ed(a, b);
  }
  var c;
  c = Hc[k(null == a ? null : a)];
  if (!c && (c = Hc._, !c)) {
    throw w.call(null, "IReset.-reset!", a);
  }
  return c.call(null, a, b);
}
var Ic = function() {
  function a(a, b, c, d, e) {
    if (a ? a.Id : a) {
      return a.Id(a, b, c, d, e);
    }
    var q;
    q = Ic[k(null == a ? null : a)];
    if (!q && (q = Ic._, !q)) {
      throw w.call(null, "ISwap.-swap!", a);
    }
    return q.call(null, a, b, c, d, e);
  }
  function b(a, b, c, d) {
    if (a ? a.Hd : a) {
      return a.Hd(a, b, c, d);
    }
    var e;
    e = Ic[k(null == a ? null : a)];
    if (!e && (e = Ic._, !e)) {
      throw w.call(null, "ISwap.-swap!", a);
    }
    return e.call(null, a, b, c, d);
  }
  function c(a, b, c) {
    if (a ? a.Gd : a) {
      return a.Gd(a, b, c);
    }
    var d;
    d = Ic[k(null == a ? null : a)];
    if (!d && (d = Ic._, !d)) {
      throw w.call(null, "ISwap.-swap!", a);
    }
    return d.call(null, a, b, c);
  }
  function d(a, b) {
    if (a ? a.Fd : a) {
      return a.Fd(a, b);
    }
    var c;
    c = Ic[k(null == a ? null : a)];
    if (!c && (c = Ic._, !c)) {
      throw w.call(null, "ISwap.-swap!", a);
    }
    return c.call(null, a, b);
  }
  var e = null, e = function(e, g, l, m, p) {
    switch(arguments.length) {
      case 2:
        return d.call(this, e, g);
      case 3:
        return c.call(this, e, g, l);
      case 4:
        return b.call(this, e, g, l, m);
      case 5:
        return a.call(this, e, g, l, m, p);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  e.j = d;
  e.q = c;
  e.W = b;
  e.Qa = a;
  return e;
}();
function Jc(a) {
  this.Of = a;
  this.o = 0;
  this.g = 1073741824;
}
Jc.prototype.te = function(a, b) {
  return this.Of.append(b);
};
Jc.prototype.xf = function() {
  return null;
};
function Kc(a) {
  var b = new Sa, c = new Jc(b);
  rc.call(null, a, c, mb.call(null));
  pc.call(null, c);
  return "" + x.a(b);
}
function Lc(a, b) {
  return a << b | a >>> -b;
}
var Mc = "undefined" !== typeof Math.imul && 0 !== Math.imul.call(null, 4294967295, 5) ? function(a, b) {
  return Math.imul.call(null, a, b);
} : function(a, b) {
  var c = a & 65535, d = b & 65535;
  return c * d + ((a >>> 16 & 65535) * d + c * (b >>> 16 & 65535) << 16 >>> 0) | 0;
};
function Nc(a) {
  return Mc.call(null, Lc.call(null, Mc.call(null, a, 3432918353), 15), 461845907);
}
function Oc(a, b) {
  return Mc.call(null, Lc.call(null, a ^ b, 13), 5) + 3864292196;
}
function Pc(a, b) {
  var c = a ^ b, c = Mc.call(null, c ^ c >>> 16, 2246822507), c = Mc.call(null, c ^ c >>> 13, 3266489909);
  return c ^ c >>> 16;
}
function Qc(a) {
  if (0 === a) {
    return a;
  }
  a = Nc.call(null, a);
  a = Oc.call(null, 0, a);
  return Pc.call(null, a, 4);
}
function Rc(a) {
  var b;
  a: {
    b = 1;
    for (var c = 0;;) {
      if (b < a.length) {
        var d = b + 2, c = Oc.call(null, c, Nc.call(null, a.charCodeAt(b - 1) | a.charCodeAt(b) << 16));
        b = d;
      } else {
        b = c;
        break a;
      }
    }
    b = void 0;
  }
  b = 1 === (a.length & 1) ? b ^ Nc.call(null, a.charCodeAt(a.length - 1)) : b;
  return Pc.call(null, b, Mc.call(null, 2, a.length));
}
var Sc = {}, Tc = 0;
function Uc(a) {
  if (null != a) {
    var b = a.length;
    if (0 < b) {
      for (var c = 0, d = 0;;) {
        if (c < b) {
          var e = c + 1, d = Mc.call(null, 31, d) + a.charCodeAt(c), c = e
        } else {
          return d;
        }
      }
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}
function Vc(a) {
  var b = Uc.call(null, a);
  Sc[a] = b;
  Tc += 1;
  return b;
}
function Wc(a) {
  255 < Tc && (Sc = {}, Tc = 0);
  var b = Sc[a];
  return "number" === typeof b ? b : Vc.call(null, a);
}
function Xc(a) {
  return a && (a.g & 4194304 || a.Yf) ? gc.call(null, a) : "number" === typeof a ? Math.floor.call(null, a) % 2147483647 : !0 === a ? 1 : !1 === a ? 0 : "string" === typeof a ? Qc.call(null, Wc.call(null, a)) : null == a ? 0 : gc.call(null, a);
}
function Yc(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2);
}
function Zc(a) {
  return Yc.call(null, Rc.call(null, a.name), Wc.call(null, a.Ia));
}
function $c(a, b) {
  if (t(B.call(null, a, b))) {
    return 0;
  }
  var c = ob.call(null, a.Ia);
  if (t(c ? b.Ia : c)) {
    return-1;
  }
  if (t(a.Ia)) {
    if (ob.call(null, b.Ia)) {
      return 1;
    }
    c = ad.call(null, a.Ia, b.Ia);
    return 0 === c ? ad.call(null, a.name, b.name) : c;
  }
  return ad.call(null, a.name, b.name);
}
function D(a, b, c, d, e) {
  this.Ia = a;
  this.name = b;
  this.yb = c;
  this.Mb = d;
  this.qa = e;
  this.g = 2154168321;
  this.o = 4096;
}
h = D.prototype;
h.H = function(a, b) {
  return oc.call(null, b, this.yb);
};
h.qe = function() {
  return this.name;
};
h.re = function() {
  return this.Ia;
};
h.F = function() {
  var a = this.Mb;
  return null != a ? a : this.Mb = a = Zc.call(null, this);
};
h.D = function(a, b) {
  return new D(this.Ia, this.name, this.yb, this.Mb, b);
};
h.B = function() {
  return this.qa;
};
h.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return Lb.call(null, c, this, null);
      case 3:
        return Lb.call(null, c, this, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.j = function(a, c) {
    return Lb.call(null, c, this, null);
  };
  a.q = function(a, c, d) {
    return Lb.call(null, c, this, d);
  };
  return a;
}();
h.apply = function(a, b) {
  return this.call.apply(this, [this].concat(sb.call(null, b)));
};
h.a = function(a) {
  return Lb.call(null, a, this, null);
};
h.j = function(a, b) {
  return Lb.call(null, a, this, b);
};
h.C = function(a, b) {
  return b instanceof D ? this.yb === b.yb : !1;
};
h.toString = function() {
  return this.yb;
};
var bd = function() {
  function a(a, b) {
    var c = null != a ? "" + x.a(a) + "/" + x.a(b) : b;
    return new D(a, b, c, null, null);
  }
  function b(a) {
    return a instanceof D ? a : c.call(null, null, a);
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}();
function E(a) {
  if (null == a) {
    return null;
  }
  if (a && (a.g & 8388608 || a.cg)) {
    return ic.call(null, a);
  }
  if (a instanceof Array || "string" === typeof a) {
    return 0 === a.length ? null : new cd(a, 0);
  }
  if (v.call(null, hc, a)) {
    return ic.call(null, a);
  }
  throw Error("" + x.a(a) + " is not ISeqable");
}
function F(a) {
  if (null == a) {
    return null;
  }
  if (a && (a.g & 64 || a.sc)) {
    return Gb.call(null, a);
  }
  a = E.call(null, a);
  return null == a ? null : Gb.call(null, a);
}
function H(a) {
  return null != a ? a && (a.g & 64 || a.sc) ? Hb.call(null, a) : (a = E.call(null, a)) ? Hb.call(null, a) : dd : dd;
}
function L(a) {
  return null == a ? null : a && (a.g & 128 || a.Rc) ? Jb.call(null, a) : E.call(null, H.call(null, a));
}
var B = function() {
  function a(a, b) {
    return null == a ? null == b : a === b || fc.call(null, a, b);
  }
  var b = null, c = function() {
    function a(b, d, l) {
      var m = null;
      2 < arguments.length && (m = M(Array.prototype.slice.call(arguments, 2), 0));
      return c.call(this, b, d, m);
    }
    function c(a, d, e) {
      for (;;) {
        if (b.call(null, a, d)) {
          if (L.call(null, e)) {
            a = d, d = F.call(null, e), e = L.call(null, e);
          } else {
            return b.call(null, d, F.call(null, e));
          }
        } else {
          return!1;
        }
      }
    }
    a.k = 2;
    a.e = function(a) {
      var b = F(a);
      a = L(a);
      var d = F(a);
      a = H(a);
      return c(b, d, a);
    };
    a.c = c;
    return a;
  }(), b = function(b, e, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a.call(this, b, e);
      default:
        return c.c(b, e, M(arguments, 2));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.k = 2;
  b.e = c.e;
  b.a = function() {
    return!0;
  };
  b.j = a;
  b.c = c.c;
  return b;
}();
function ed(a, b) {
  var c = Nc.call(null, a), c = Oc.call(null, 0, c);
  return Pc.call(null, c, b);
}
function fd(a) {
  var b = 0, c = 1;
  for (a = E.call(null, a);;) {
    if (null != a) {
      b += 1, c = Mc.call(null, 31, c) + Xc.call(null, F.call(null, a)) | 0, a = L.call(null, a);
    } else {
      return ed.call(null, c, b);
    }
  }
}
function gd(a) {
  var b = 0, c = 0;
  for (a = E.call(null, a);;) {
    if (null != a) {
      b += 1, c = c + Xc.call(null, F.call(null, a)) | 0, a = L.call(null, a);
    } else {
      return ed.call(null, c, b);
    }
  }
}
yb["null"] = !0;
Ab["null"] = function() {
  return 0;
};
Date.prototype.C = function(a, b) {
  return b instanceof Date && this.toString() === b.toString();
};
fc.number = function(a, b) {
  return a === b;
};
Zb["function"] = !0;
$b["function"] = function() {
  return null;
};
wb["function"] = !0;
gc._ = function(a) {
  return ma(a);
};
function hd(a) {
  return a + 1;
}
function id(a) {
  this.m = a;
  this.o = 0;
  this.g = 32768;
}
id.prototype.Ab = function() {
  return this.m;
};
function jd(a) {
  return new id(a);
}
function kd(a) {
  return a instanceof id;
}
function N(a) {
  return Yb.call(null, a);
}
var ld = function() {
  function a(a, b, c, d) {
    for (var m = Ab.call(null, a);;) {
      if (d < m) {
        c = b.call(null, c, A.call(null, a, d));
        if (kd.call(null, c)) {
          return N.call(null, c);
        }
        d += 1;
      } else {
        return c;
      }
    }
  }
  function b(a, b, c) {
    for (var d = Ab.call(null, a), m = 0;;) {
      if (m < d) {
        c = b.call(null, c, A.call(null, a, m));
        if (kd.call(null, c)) {
          return N.call(null, c);
        }
        m += 1;
      } else {
        return c;
      }
    }
  }
  function c(a, b) {
    var c = Ab.call(null, a);
    if (0 === c) {
      return b.call(null);
    }
    for (var d = A.call(null, a, 0), m = 1;;) {
      if (m < c) {
        d = b.call(null, d, A.call(null, a, m));
        if (kd.call(null, d)) {
          return N.call(null, d);
        }
        m += 1;
      } else {
        return d;
      }
    }
  }
  var d = null, d = function(d, f, g, l) {
    switch(arguments.length) {
      case 2:
        return c.call(this, d, f);
      case 3:
        return b.call(this, d, f, g);
      case 4:
        return a.call(this, d, f, g, l);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.j = c;
  d.q = b;
  d.W = a;
  return d;
}(), md = function() {
  function a(a, b, c, d) {
    for (var m = a.length;;) {
      if (d < m) {
        c = b.call(null, c, a[d]);
        if (kd.call(null, c)) {
          return N.call(null, c);
        }
        d += 1;
      } else {
        return c;
      }
    }
  }
  function b(a, b, c) {
    for (var d = a.length, m = 0;;) {
      if (m < d) {
        c = b.call(null, c, a[m]);
        if (kd.call(null, c)) {
          return N.call(null, c);
        }
        m += 1;
      } else {
        return c;
      }
    }
  }
  function c(a, b) {
    var c = a.length;
    if (0 === a.length) {
      return b.call(null);
    }
    for (var d = a[0], m = 1;;) {
      if (m < c) {
        d = b.call(null, d, a[m]);
        if (kd.call(null, d)) {
          return N.call(null, d);
        }
        m += 1;
      } else {
        return d;
      }
    }
  }
  var d = null, d = function(d, f, g, l) {
    switch(arguments.length) {
      case 2:
        return c.call(this, d, f);
      case 3:
        return b.call(this, d, f, g);
      case 4:
        return a.call(this, d, f, g, l);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.j = c;
  d.q = b;
  d.W = a;
  return d;
}();
function nd(a) {
  return a ? a.g & 2 || a.mf ? !0 : a.g ? !1 : v.call(null, yb, a) : v.call(null, yb, a);
}
function od(a) {
  return a ? a.g & 16 || a.ne ? !0 : a.g ? !1 : v.call(null, Eb, a) : v.call(null, Eb, a);
}
function cd(a, b) {
  this.b = a;
  this.t = b;
  this.g = 166199550;
  this.o = 8192;
}
h = cd.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.ta = function(a, b) {
  var c = b + this.t;
  return c < this.b.length ? this.b[c] : null;
};
h.ua = function(a, b, c) {
  a = b + this.t;
  return a < this.b.length ? this.b[a] : c;
};
h.Aa = function() {
  return this.t + 1 < this.b.length ? new cd(this.b, this.t + 1) : null;
};
h.Q = function() {
  return this.b.length - this.t;
};
h.rc = function() {
  var a = Ab.call(null, this);
  return 0 < a ? new pd(this, a - 1, null) : null;
};
h.F = function() {
  return fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return dd;
};
h.$ = function(a, b) {
  return md.call(null, this.b, b, this.b[this.t], this.t + 1);
};
h.aa = function(a, b, c) {
  return md.call(null, this.b, b, c, this.t);
};
h.ga = function() {
  return this.b[this.t];
};
h.ha = function() {
  return this.t + 1 < this.b.length ? new cd(this.b, this.t + 1) : dd;
};
h.M = function() {
  return this;
};
h.P = function(a, b) {
  return O.call(null, b, this);
};
var rd = function() {
  function a(a, b) {
    return b < a.length ? new cd(a, b) : null;
  }
  function b(a) {
    return c.call(null, a, 0);
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}(), M = function() {
  function a(a, b) {
    return rd.call(null, a, b);
  }
  function b(a) {
    return rd.call(null, a, 0);
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}();
function pd(a, b, c) {
  this.Mc = a;
  this.t = b;
  this.l = c;
  this.g = 32374990;
  this.o = 8192;
}
h = pd.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.B = function() {
  return this.l;
};
h.Aa = function() {
  return 0 < this.t ? new pd(this.Mc, this.t - 1, null) : null;
};
h.Q = function() {
  return this.t + 1;
};
h.F = function() {
  return fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return sd.call(null, dd, this.l);
};
h.$ = function(a, b) {
  return td.call(null, b, this);
};
h.aa = function(a, b, c) {
  return td.call(null, b, c, this);
};
h.ga = function() {
  return A.call(null, this.Mc, this.t);
};
h.ha = function() {
  return 0 < this.t ? new pd(this.Mc, this.t - 1, null) : dd;
};
h.M = function() {
  return this;
};
h.D = function(a, b) {
  return new pd(this.Mc, this.t, b);
};
h.P = function(a, b) {
  return O.call(null, b, this);
};
function ud(a) {
  return F.call(null, L.call(null, a));
}
function vd(a) {
  return L.call(null, L.call(null, a));
}
function wd(a) {
  for (;;) {
    var b = L.call(null, a);
    if (null != b) {
      a = b;
    } else {
      return F.call(null, a);
    }
  }
}
fc._ = function(a, b) {
  return a === b;
};
var yd = function() {
  function a(a, b) {
    return null != a ? Db.call(null, a, b) : Db.call(null, dd, b);
  }
  var b = null, c = function() {
    function a(b, d, l) {
      var m = null;
      2 < arguments.length && (m = M(Array.prototype.slice.call(arguments, 2), 0));
      return c.call(this, b, d, m);
    }
    function c(a, d, e) {
      for (;;) {
        if (t(e)) {
          a = b.call(null, a, d), d = F.call(null, e), e = L.call(null, e);
        } else {
          return b.call(null, a, d);
        }
      }
    }
    a.k = 2;
    a.e = function(a) {
      var b = F(a);
      a = L(a);
      var d = F(a);
      a = H(a);
      return c(b, d, a);
    };
    a.c = c;
    return a;
  }(), b = function(b, e, f) {
    switch(arguments.length) {
      case 0:
        return xd;
      case 1:
        return b;
      case 2:
        return a.call(this, b, e);
      default:
        return c.c(b, e, M(arguments, 2));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.k = 2;
  b.e = c.e;
  b.Z = function() {
    return xd;
  };
  b.a = function(a) {
    return a;
  };
  b.j = a;
  b.c = c.c;
  return b;
}();
function zd(a) {
  return null == a ? null : Bb.call(null, a);
}
function Ad(a) {
  a = E.call(null, a);
  for (var b = 0;;) {
    if (nd.call(null, a)) {
      return b + Ab.call(null, a);
    }
    a = L.call(null, a);
    b += 1;
  }
}
function P(a) {
  return null != a ? a && (a.g & 2 || a.mf) ? Ab.call(null, a) : a instanceof Array ? a.length : "string" === typeof a ? a.length : v.call(null, yb, a) ? Ab.call(null, a) : Ad.call(null, a) : 0;
}
var Bd = function() {
  function a(a, b, c) {
    for (;;) {
      if (null == a) {
        return c;
      }
      if (0 === b) {
        return E.call(null, a) ? F.call(null, a) : c;
      }
      if (od.call(null, a)) {
        return A.call(null, a, b, c);
      }
      if (E.call(null, a)) {
        a = L.call(null, a), b -= 1;
      } else {
        return c;
      }
    }
  }
  function b(a, b) {
    for (;;) {
      if (null == a) {
        throw Error("Index out of bounds");
      }
      if (0 === b) {
        if (E.call(null, a)) {
          return F.call(null, a);
        }
        throw Error("Index out of bounds");
      }
      if (od.call(null, a)) {
        return A.call(null, a, b);
      }
      if (E.call(null, a)) {
        var c = L.call(null, a), g = b - 1;
        a = c;
        b = g;
      } else {
        throw Error("Index out of bounds");
      }
    }
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}(), R = function() {
  function a(a, b, c) {
    if ("number" !== typeof b) {
      throw Error("index argument to nth must be a number.");
    }
    if (null == a) {
      return c;
    }
    if (a && (a.g & 16 || a.ne)) {
      return A.call(null, a, b, c);
    }
    if (a instanceof Array || "string" === typeof a) {
      return b < a.length ? a[b] : c;
    }
    if (v.call(null, Eb, a)) {
      return A.call(null, a, b);
    }
    if (a ? a.g & 64 || a.sc || (a.g ? 0 : v.call(null, Fb, a)) : v.call(null, Fb, a)) {
      return Bd.call(null, a, b, c);
    }
    throw Error("nth not supported on this type " + x.a(rb.call(null, qb.call(null, a))));
  }
  function b(a, b) {
    if ("number" !== typeof b) {
      throw Error("index argument to nth must be a number");
    }
    if (null == a) {
      return a;
    }
    if (a && (a.g & 16 || a.ne)) {
      return A.call(null, a, b);
    }
    if (a instanceof Array || "string" === typeof a) {
      return b < a.length ? a[b] : null;
    }
    if (v.call(null, Eb, a)) {
      return A.call(null, a, b);
    }
    if (a ? a.g & 64 || a.sc || (a.g ? 0 : v.call(null, Fb, a)) : v.call(null, Fb, a)) {
      return Bd.call(null, a, b);
    }
    throw Error("nth not supported on this type " + x.a(rb.call(null, qb.call(null, a))));
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}(), S = function() {
  function a(a, b, c) {
    return null != a ? a && (a.g & 256 || a.oe) ? Lb.call(null, a, b, c) : a instanceof Array ? b < a.length ? a[b] : c : "string" === typeof a ? b < a.length ? a[b] : c : v.call(null, Kb, a) ? Lb.call(null, a, b, c) : c : c;
  }
  function b(a, b) {
    return null == a ? null : a && (a.g & 256 || a.oe) ? Lb.call(null, a, b) : a instanceof Array ? b < a.length ? a[b] : null : "string" === typeof a ? b < a.length ? a[b] : null : v.call(null, Kb, a) ? Lb.call(null, a, b) : null;
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}(), T = function() {
  function a(a, b, c) {
    return null != a ? Nb.call(null, a, b, c) : Cd([b], [c]);
  }
  var b = null, c = function() {
    function a(b, d, l, m) {
      var p = null;
      3 < arguments.length && (p = M(Array.prototype.slice.call(arguments, 3), 0));
      return c.call(this, b, d, l, p);
    }
    function c(a, d, e, m) {
      for (;;) {
        if (a = b.call(null, a, d, e), t(m)) {
          d = F.call(null, m), e = ud.call(null, m), m = vd.call(null, m);
        } else {
          return a;
        }
      }
    }
    a.k = 3;
    a.e = function(a) {
      var b = F(a);
      a = L(a);
      var d = F(a);
      a = L(a);
      var m = F(a);
      a = H(a);
      return c(b, d, m, a);
    };
    a.c = c;
    return a;
  }(), b = function(b, e, f, g) {
    switch(arguments.length) {
      case 3:
        return a.call(this, b, e, f);
      default:
        return c.c(b, e, f, M(arguments, 3));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.k = 3;
  b.e = c.e;
  b.q = a;
  b.c = c.c;
  return b;
}(), Dd = function() {
  function a(a, b) {
    return null == a ? null : Pb.call(null, a, b);
  }
  var b = null, c = function() {
    function a(b, d, l) {
      var m = null;
      2 < arguments.length && (m = M(Array.prototype.slice.call(arguments, 2), 0));
      return c.call(this, b, d, m);
    }
    function c(a, d, e) {
      for (;;) {
        if (null == a) {
          return null;
        }
        a = b.call(null, a, d);
        if (t(e)) {
          d = F.call(null, e), e = L.call(null, e);
        } else {
          return a;
        }
      }
    }
    a.k = 2;
    a.e = function(a) {
      var b = F(a);
      a = L(a);
      var d = F(a);
      a = H(a);
      return c(b, d, a);
    };
    a.c = c;
    return a;
  }(), b = function(b, e, f) {
    switch(arguments.length) {
      case 1:
        return b;
      case 2:
        return a.call(this, b, e);
      default:
        return c.c(b, e, M(arguments, 2));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.k = 2;
  b.e = c.e;
  b.a = function(a) {
    return a;
  };
  b.j = a;
  b.c = c.c;
  return b;
}();
function Ed(a) {
  var b = ka(a);
  return b ? b : a ? t(t(null) ? null : a.lf) ? !0 : a.Wc ? !1 : v.call(null, wb, a) : v.call(null, wb, a);
}
function Fd(a, b) {
  this.v = a;
  this.l = b;
  this.o = 0;
  this.g = 393217;
}
h = Fd.prototype;
h.call = function() {
  function a(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, I, G, J, Q, W, K) {
    return U.call(null, this.v, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, I, G, J, Q, W, K);
  }
  function b(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, I, G, J, Q, W) {
    return this.v.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, I, G, J, Q, W);
  }
  function c(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, I, G, J, Q) {
    return this.v.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, I, G, J, Q);
  }
  function d(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, I, G, J) {
    return this.v.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, I, G, J);
  }
  function e(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, I, G) {
    return this.v.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, I, G);
  }
  function f(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, I) {
    return this.v.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, I);
  }
  function g(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C) {
    return this.v.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C);
  }
  function l(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z) {
    return this.v.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z);
  }
  function m(a, b, c, d, e, f, g, l, m, p, q, r, u, y) {
    return this.v.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y);
  }
  function p(a, b, c, d, e, f, g, l, m, p, q, r, u) {
    return this.v.call(null, b, c, d, e, f, g, l, m, p, q, r, u);
  }
  function q(a, b, c, d, e, f, g, l, m, p, q, r) {
    return this.v.call(null, b, c, d, e, f, g, l, m, p, q, r);
  }
  function r(a, b, c, d, e, f, g, l, m, p, q) {
    return this.v.call(null, b, c, d, e, f, g, l, m, p, q);
  }
  function u(a, b, c, d, e, f, g, l, m, p) {
    return this.v.call(null, b, c, d, e, f, g, l, m, p);
  }
  function y(a, b, c, d, e, f, g, l, m) {
    return this.v.call(null, b, c, d, e, f, g, l, m);
  }
  function z(a, b, c, d, e, f, g, l) {
    return this.v.call(null, b, c, d, e, f, g, l);
  }
  function C(a, b, c, d, e, f, g) {
    return this.v.call(null, b, c, d, e, f, g);
  }
  function G(a, b, c, d, e, f) {
    return this.v.call(null, b, c, d, e, f);
  }
  function J(a, b, c, d, e) {
    return this.v.call(null, b, c, d, e);
  }
  function Q(a, b, c, d) {
    return this.v.call(null, b, c, d);
  }
  function W(a, b, c) {
    return this.v.call(null, b, c);
  }
  function Z(a, b) {
    return this.v.call(null, b);
  }
  function K() {
    return this.v.call(null);
  }
  var I = null, I = function(I, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db, Aa, jb, Za, zb, Hd, Af, jc) {
    switch(arguments.length) {
      case 1:
        return K.call(this, I);
      case 2:
        return Z.call(this, I, ba);
      case 3:
        return W.call(this, I, ba, ha);
      case 4:
        return Q.call(this, I, ba, ha, ja);
      case 5:
        return J.call(this, I, ba, ha, ja, la);
      case 6:
        return G.call(this, I, ba, ha, ja, la, oa);
      case 7:
        return C.call(this, I, ba, ha, ja, la, oa, sa);
      case 8:
        return z.call(this, I, ba, ha, ja, la, oa, sa, wa);
      case 9:
        return y.call(this, I, ba, ha, ja, la, oa, sa, wa, za);
      case 10:
        return u.call(this, I, ba, ha, ja, la, oa, sa, wa, za, Ga);
      case 11:
        return r.call(this, I, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka);
      case 12:
        return q.call(this, I, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra);
      case 13:
        return p.call(this, I, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya);
      case 14:
        return m.call(this, I, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb);
      case 15:
        return l.call(this, I, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db);
      case 16:
        return g.call(this, I, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db, Aa);
      case 17:
        return f.call(this, I, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db, Aa, jb);
      case 18:
        return e.call(this, I, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db, Aa, jb, Za);
      case 19:
        return d.call(this, I, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db, Aa, jb, Za, zb);
      case 20:
        return c.call(this, I, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db, Aa, jb, Za, zb, Hd);
      case 21:
        return b.call(this, I, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db, Aa, jb, Za, zb, Hd, Af);
      case 22:
        return a.call(this, I, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db, Aa, jb, Za, zb, Hd, Af, jc);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  I.a = K;
  I.j = Z;
  I.q = W;
  I.W = Q;
  I.Qa = J;
  I.qb = G;
  I.Nb = C;
  I.oc = z;
  I.pc = y;
  I.dc = u;
  I.ec = r;
  I.fc = q;
  I.gc = p;
  I.hc = m;
  I.ic = l;
  I.jc = g;
  I.kc = f;
  I.lc = e;
  I.mc = d;
  I.nc = c;
  I.Dd = b;
  I.rf = a;
  return I;
}();
h.apply = function(a, b) {
  return this.call.apply(this, [this].concat(sb.call(null, b)));
};
h.Z = function() {
  return this.v.call(null);
};
h.a = function(a) {
  return this.v.call(null, a);
};
h.j = function(a, b) {
  return this.v.call(null, a, b);
};
h.q = function(a, b, c) {
  return this.v.call(null, a, b, c);
};
h.W = function(a, b, c, d) {
  return this.v.call(null, a, b, c, d);
};
h.Qa = function(a, b, c, d, e) {
  return this.v.call(null, a, b, c, d, e);
};
h.qb = function(a, b, c, d, e, f) {
  return this.v.call(null, a, b, c, d, e, f);
};
h.Nb = function(a, b, c, d, e, f, g) {
  return this.v.call(null, a, b, c, d, e, f, g);
};
h.oc = function(a, b, c, d, e, f, g, l) {
  return this.v.call(null, a, b, c, d, e, f, g, l);
};
h.pc = function(a, b, c, d, e, f, g, l, m) {
  return this.v.call(null, a, b, c, d, e, f, g, l, m);
};
h.dc = function(a, b, c, d, e, f, g, l, m, p) {
  return this.v.call(null, a, b, c, d, e, f, g, l, m, p);
};
h.ec = function(a, b, c, d, e, f, g, l, m, p, q) {
  return this.v.call(null, a, b, c, d, e, f, g, l, m, p, q);
};
h.fc = function(a, b, c, d, e, f, g, l, m, p, q, r) {
  return this.v.call(null, a, b, c, d, e, f, g, l, m, p, q, r);
};
h.gc = function(a, b, c, d, e, f, g, l, m, p, q, r, u) {
  return this.v.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u);
};
h.hc = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y) {
  return this.v.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y);
};
h.ic = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z) {
  return this.v.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z);
};
h.jc = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C) {
  return this.v.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C);
};
h.kc = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G) {
  return this.v.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G);
};
h.lc = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J) {
  return this.v.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J);
};
h.mc = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q) {
  return this.v.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q);
};
h.nc = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W) {
  return this.v.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W);
};
h.Dd = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W, Z) {
  return U.call(null, this.v, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W, Z);
};
h.lf = !0;
h.D = function(a, b) {
  return new Fd(this.v, b);
};
h.B = function() {
  return this.l;
};
function sd(a, b) {
  return Ed.call(null, a) && !(a ? a.g & 262144 || a.wf || (a.g ? 0 : v.call(null, ac, a)) : v.call(null, ac, a)) ? new Fd(a, b) : null == a ? null : bc.call(null, a, b);
}
function Gd(a) {
  var b = null != a;
  return(b ? a ? a.g & 131072 || a.tf || (a.g ? 0 : v.call(null, Zb, a)) : v.call(null, Zb, a) : b) ? $b.call(null, a) : null;
}
function Id(a) {
  return null == a ? null : Ub.call(null, a);
}
function Jd(a) {
  return null == a ? null : Vb.call(null, a);
}
function Kd(a) {
  return null == a || ob.call(null, E.call(null, a));
}
function Ld(a) {
  return null == a ? !1 : a ? a.g & 8 || a.Vf ? !0 : a.g ? !1 : v.call(null, Cb, a) : v.call(null, Cb, a);
}
function Md(a) {
  return null == a ? !1 : a ? a.g & 4096 || a.eg ? !0 : a.g ? !1 : v.call(null, Tb, a) : v.call(null, Tb, a);
}
function Nd(a) {
  return a ? a.g & 16777216 || a.dg ? !0 : a.g ? !1 : v.call(null, kc, a) : v.call(null, kc, a);
}
function Od(a) {
  return null == a ? !1 : a ? a.g & 1024 || a.Zf ? !0 : a.g ? !1 : v.call(null, Ob, a) : v.call(null, Ob, a);
}
function Pd(a) {
  return a ? a.g & 16384 || a.fg ? !0 : a.g ? !1 : v.call(null, Wb, a) : v.call(null, Wb, a);
}
function Qd(a) {
  return a ? a.o & 512 || a.Uf ? !0 : !1 : !1;
}
function Rd(a) {
  var b = [];
  Ma(a, function(a) {
    return function(b, e) {
      return a.push(e);
    };
  }(b));
  return b;
}
function Sd(a, b, c, d, e) {
  for (;;) {
    if (0 === e) {
      return c;
    }
    c[d] = a[b];
    d += 1;
    e -= 1;
    b += 1;
  }
}
function Td(a, b, c, d, e) {
  b += e - 1;
  for (d += e - 1;;) {
    if (0 === e) {
      return c;
    }
    c[d] = a[b];
    d -= 1;
    e -= 1;
    b -= 1;
  }
}
var Ud = {};
function Vd(a) {
  return null == a ? !1 : a ? a.g & 64 || a.sc ? !0 : a.g ? !1 : v.call(null, Fb, a) : v.call(null, Fb, a);
}
function Wd(a) {
  return t(a) ? !0 : !1;
}
function Xd(a) {
  var b = Ed.call(null, a);
  return b ? b : a ? a.g & 1 || a.Xf ? !0 : a.g ? !1 : v.call(null, xb, a) : v.call(null, xb, a);
}
function Yd(a) {
  return "number" === typeof a && !isNaN(a) && Infinity !== a && parseFloat(a) === parseInt(a, 10);
}
function Zd(a, b) {
  return S.call(null, a, b, Ud) === Ud ? !1 : !0;
}
function ad(a, b) {
  if (a === b) {
    return 0;
  }
  if (null == a) {
    return-1;
  }
  if (null == b) {
    return 1;
  }
  if (qb.call(null, a) === qb.call(null, b)) {
    return a && (a.o & 2048 || a.Oc) ? Ac.call(null, a, b) : a > b ? 1 : a < b ? -1 : 0;
  }
  throw Error("compare on non-nil objects of different types");
}
var $d = function() {
  function a(a, b, c, g) {
    for (;;) {
      var l = ad.call(null, R.call(null, a, g), R.call(null, b, g));
      if (0 === l && g + 1 < c) {
        g += 1;
      } else {
        return l;
      }
    }
  }
  function b(a, b) {
    var f = P.call(null, a), g = P.call(null, b);
    return f < g ? -1 : f > g ? 1 : c.call(null, a, b, f, 0);
  }
  var c = null, c = function(c, e, f, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 4:
        return a.call(this, c, e, f, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.W = a;
  return c;
}(), td = function() {
  function a(a, b, c) {
    for (c = E.call(null, c);;) {
      if (c) {
        b = a.call(null, b, F.call(null, c));
        if (kd.call(null, b)) {
          return N.call(null, b);
        }
        c = L.call(null, c);
      } else {
        return b;
      }
    }
  }
  function b(a, b) {
    var c = E.call(null, b);
    return c ? ub.call(null, a, F.call(null, c), L.call(null, c)) : a.call(null);
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}(), ub = function() {
  function a(a, b, c) {
    return c && (c.g & 524288 || c.vf) ? dc.call(null, c, a, b) : c instanceof Array ? md.call(null, c, a, b) : "string" === typeof c ? md.call(null, c, a, b) : v.call(null, cc, c) ? dc.call(null, c, a, b) : td.call(null, a, b, c);
  }
  function b(a, b) {
    return b && (b.g & 524288 || b.vf) ? dc.call(null, b, a) : b instanceof Array ? md.call(null, b, a) : "string" === typeof b ? md.call(null, b, a) : v.call(null, cc, b) ? dc.call(null, b, a) : td.call(null, a, b);
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}();
function ae(a, b, c) {
  return null != c ? ec.call(null, c, a, b) : b;
}
function be(a) {
  return a;
}
var ce = function() {
  function a(a, b, c, g) {
    a = a.call(null, b);
    c = ub.call(null, a, c, g);
    return a.call(null, c);
  }
  function b(a, b, f) {
    return c.call(null, a, b, b.call(null), f);
  }
  var c = null, c = function(c, e, f, g) {
    switch(arguments.length) {
      case 3:
        return b.call(this, c, e, f);
      case 4:
        return a.call(this, c, e, f, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.q = b;
  c.W = a;
  return c;
}();
function de(a) {
  return a - 1;
}
function ee(a) {
  return 0 <= a ? Math.floor.call(null, a) : Math.ceil.call(null, a);
}
function fe(a) {
  return ee.call(null, a);
}
function ge(a, b) {
  return(a % b + b) % b;
}
function he(a, b) {
  return ee.call(null, (a - a % b) / b);
}
var ie = function() {
  function a(a) {
    return a * c.call(null);
  }
  function b() {
    return Math.random.call(null);
  }
  var c = null, c = function(c) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return a.call(this, c);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.Z = b;
  c.a = a;
  return c;
}();
function je(a) {
  return ee.call(null, ie.call(null, a));
}
function ke(a) {
  a -= a >> 1 & 1431655765;
  a = (a & 858993459) + (a >> 2 & 858993459);
  return 16843009 * (a + (a >> 4) & 252645135) >> 24;
}
function le(a, b) {
  for (var c = b, d = E.call(null, a);;) {
    if (d && 0 < c) {
      c -= 1, d = L.call(null, d);
    } else {
      return d;
    }
  }
}
var x = function() {
  function a(a) {
    return null == a ? "" : "" + a;
  }
  var b = null, c = function() {
    function a(b, d) {
      var l = null;
      1 < arguments.length && (l = M(Array.prototype.slice.call(arguments, 1), 0));
      return c.call(this, b, l);
    }
    function c(a, d) {
      for (var e = new Sa(b.call(null, a)), m = d;;) {
        if (t(m)) {
          e = e.append(b.call(null, F.call(null, m))), m = L.call(null, m);
        } else {
          return e.toString();
        }
      }
    }
    a.k = 1;
    a.e = function(a) {
      var b = F(a);
      a = H(a);
      return c(b, a);
    };
    a.c = c;
    return a;
  }(), b = function(b, e) {
    switch(arguments.length) {
      case 0:
        return "";
      case 1:
        return a.call(this, b);
      default:
        return c.c(b, M(arguments, 1));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.k = 1;
  b.e = c.e;
  b.Z = function() {
    return "";
  };
  b.a = a;
  b.c = c.c;
  return b;
}(), me = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return a.substring(c);
      case 3:
        return a.substring(c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.j = function(a, c) {
    return a.substring(c);
  };
  a.q = function(a, c, d) {
    return a.substring(c, d);
  };
  return a;
}();
function qd(a, b) {
  return Wd.call(null, Nd.call(null, b) ? nd.call(null, a) && nd.call(null, b) && P.call(null, a) !== P.call(null, b) ? !1 : function() {
    for (var c = E.call(null, a), d = E.call(null, b);;) {
      if (null == c) {
        return null == d;
      }
      if (null != d && B.call(null, F.call(null, c), F.call(null, d))) {
        c = L.call(null, c), d = L.call(null, d);
      } else {
        return!1;
      }
    }
  }() : null);
}
function ne(a) {
  var b = 0;
  for (a = E.call(null, a);;) {
    if (a) {
      var c = F.call(null, a), b = (b + (Xc.call(null, oe.call(null, c)) ^ Xc.call(null, pe.call(null, c)))) % 4503599627370496;
      a = L.call(null, a);
    } else {
      return b;
    }
  }
}
function qe(a, b, c, d, e) {
  this.l = a;
  this.first = b;
  this.kb = c;
  this.count = d;
  this.n = e;
  this.g = 65937646;
  this.o = 8192;
}
h = qe.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.B = function() {
  return this.l;
};
h.Aa = function() {
  return 1 === this.count ? null : this.kb;
};
h.Q = function() {
  return this.count;
};
h.sb = function() {
  return this.first;
};
h.tb = function() {
  return Hb.call(null, this);
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return dd;
};
h.$ = function(a, b) {
  return td.call(null, b, this);
};
h.aa = function(a, b, c) {
  return td.call(null, b, c, this);
};
h.ga = function() {
  return this.first;
};
h.ha = function() {
  return 1 === this.count ? dd : this.kb;
};
h.M = function() {
  return this;
};
h.D = function(a, b) {
  return new qe(b, this.first, this.kb, this.count, this.n);
};
h.P = function(a, b) {
  return new qe(this.l, b, this, this.count + 1, null);
};
function re(a) {
  this.l = a;
  this.g = 65937614;
  this.o = 8192;
}
h = re.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.B = function() {
  return this.l;
};
h.Aa = function() {
  return null;
};
h.Q = function() {
  return 0;
};
h.sb = function() {
  return null;
};
h.tb = function() {
  throw Error("Can't pop empty list");
};
h.F = function() {
  return 0;
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return this;
};
h.$ = function(a, b) {
  return td.call(null, b, this);
};
h.aa = function(a, b, c) {
  return td.call(null, b, c, this);
};
h.ga = function() {
  return null;
};
h.ha = function() {
  return dd;
};
h.M = function() {
  return null;
};
h.D = function(a, b) {
  return new re(b);
};
h.P = function(a, b) {
  return new qe(this.l, b, null, 1, null);
};
var dd = new re(null);
function se(a) {
  return a ? a.g & 134217728 || a.bg ? !0 : a.g ? !1 : v.call(null, mc, a) : v.call(null, mc, a);
}
function te(a) {
  return nc.call(null, a);
}
function ue(a) {
  return se.call(null, a) ? te.call(null, a) : ub.call(null, yd, dd, a);
}
var V = function() {
  function a(a) {
    var d = null;
    0 < arguments.length && (d = M(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, d);
  }
  function b(a) {
    var b;
    if (a instanceof cd && 0 === a.t) {
      b = a.b;
    } else {
      a: {
        for (b = [];;) {
          if (null != a) {
            b.push(Gb.call(null, a)), a = Jb.call(null, a);
          } else {
            break a;
          }
        }
        b = void 0;
      }
    }
    a = b.length;
    for (var e = dd;;) {
      if (0 < a) {
        var f = a - 1, e = Db.call(null, e, b[a - 1]);
        a = f;
      } else {
        return e;
      }
    }
  }
  a.k = 0;
  a.e = function(a) {
    a = E(a);
    return b(a);
  };
  a.c = b;
  return a;
}();
function ve(a, b, c, d) {
  this.l = a;
  this.first = b;
  this.kb = c;
  this.n = d;
  this.g = 65929452;
  this.o = 8192;
}
h = ve.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.B = function() {
  return this.l;
};
h.Aa = function() {
  return null == this.kb ? null : E.call(null, this.kb);
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return sd.call(null, dd, this.l);
};
h.$ = function(a, b) {
  return td.call(null, b, this);
};
h.aa = function(a, b, c) {
  return td.call(null, b, c, this);
};
h.ga = function() {
  return this.first;
};
h.ha = function() {
  return null == this.kb ? dd : this.kb;
};
h.M = function() {
  return this;
};
h.D = function(a, b) {
  return new ve(b, this.first, this.kb, this.n);
};
h.P = function(a, b) {
  return new ve(null, b, this, this.n);
};
function O(a, b) {
  var c = null == b;
  return(c ? c : b && (b.g & 64 || b.sc)) ? new ve(null, a, b, null) : new ve(null, a, E.call(null, b), null);
}
function we(a) {
  return Zc.call(null, a) + 2654435769 | 0;
}
function s(a, b, c, d) {
  this.Ia = a;
  this.name = b;
  this.ea = c;
  this.Mb = d;
  this.g = 2153775105;
  this.o = 4096;
}
h = s.prototype;
h.H = function(a, b) {
  return oc.call(null, b, ":" + x.a(this.ea));
};
h.qe = function() {
  return this.name;
};
h.re = function() {
  return this.Ia;
};
h.F = function() {
  var a = this.Mb;
  return null != a ? a : this.Mb = a = we.call(null, this);
};
h.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return S.call(null, c, this);
      case 3:
        return S.call(null, c, this, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.j = function(a, c) {
    return S.call(null, c, this);
  };
  a.q = function(a, c, d) {
    return S.call(null, c, this, d);
  };
  return a;
}();
h.apply = function(a, b) {
  return this.call.apply(this, [this].concat(sb.call(null, b)));
};
h.a = function(a) {
  return S.call(null, a, this);
};
h.j = function(a, b) {
  return S.call(null, a, this, b);
};
h.C = function(a, b) {
  return b instanceof s ? this.ea === b.ea : !1;
};
h.toString = function() {
  return ":" + x.a(this.ea);
};
function xe(a, b) {
  return a === b ? !0 : a instanceof s && b instanceof s ? a.ea === b.ea : !1;
}
function ye(a) {
  if (a && (a.o & 4096 || a.uf)) {
    return Gc.call(null, a);
  }
  throw Error("Doesn't support namespace: " + x.a(a));
}
var Ae = function() {
  function a(a, b) {
    return new s(a, b, "" + x.a(t(a) ? "" + x.a(a) + "/" : null) + x.a(b), null);
  }
  function b(a) {
    if (a instanceof s) {
      return a;
    }
    if (a instanceof D) {
      return new s(ye.call(null, a), ze.call(null, a), a.yb, null);
    }
    if ("string" === typeof a) {
      var b = a.split("/");
      return 2 === b.length ? new s(b[0], b[1], a, null) : new s(null, b[0], a, null);
    }
    return null;
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}();
function Be(a, b, c, d) {
  this.l = a;
  this.bd = b;
  this.V = c;
  this.n = d;
  this.o = 0;
  this.g = 32374988;
}
h = Be.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
function Ce(a) {
  null != a.bd && (a.V = a.bd.call(null), a.bd = null);
  return a.V;
}
h.B = function() {
  return this.l;
};
h.Aa = function() {
  ic.call(null, this);
  return null == this.V ? null : L.call(null, this.V);
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return sd.call(null, dd, this.l);
};
h.$ = function(a, b) {
  return td.call(null, b, this);
};
h.aa = function(a, b, c) {
  return td.call(null, b, c, this);
};
h.ga = function() {
  ic.call(null, this);
  return null == this.V ? null : F.call(null, this.V);
};
h.ha = function() {
  ic.call(null, this);
  return null != this.V ? H.call(null, this.V) : dd;
};
h.M = function() {
  Ce(this);
  if (null == this.V) {
    return null;
  }
  for (var a = this.V;;) {
    if (a instanceof Be) {
      a = Ce(a);
    } else {
      return this.V = a, E.call(null, this.V);
    }
  }
};
h.D = function(a, b) {
  return new Be(b, this.bd, this.V, this.n);
};
h.P = function(a, b) {
  return O.call(null, b, this);
};
function De(a, b) {
  this.J = a;
  this.end = b;
  this.o = 0;
  this.g = 2;
}
De.prototype.Q = function() {
  return this.end;
};
De.prototype.add = function(a) {
  this.J[this.end] = a;
  return this.end += 1;
};
De.prototype.$a = function() {
  var a = new Ee(this.J, 0, this.end);
  this.J = null;
  return a;
};
function Fe(a) {
  return new De(Array(a), 0);
}
function Ee(a, b, c) {
  this.b = a;
  this.fa = b;
  this.end = c;
  this.o = 0;
  this.g = 524306;
}
h = Ee.prototype;
h.$ = function(a, b) {
  return md.call(null, this.b, b, this.b[this.fa], this.fa + 1);
};
h.aa = function(a, b, c) {
  return md.call(null, this.b, b, c, this.fa);
};
h.me = function() {
  if (this.fa === this.end) {
    throw Error("-drop-first of empty chunk");
  }
  return new Ee(this.b, this.fa + 1, this.end);
};
h.ta = function(a, b) {
  return this.b[this.fa + b];
};
h.ua = function(a, b, c) {
  return 0 <= b && b < this.end - this.fa ? this.b[this.fa + b] : c;
};
h.Q = function() {
  return this.end - this.fa;
};
var Ge = function() {
  function a(a, b, c) {
    return new Ee(a, b, c);
  }
  function b(a, b) {
    return new Ee(a, b, a.length);
  }
  function c(a) {
    return new Ee(a, 0, a.length);
  }
  var d = null, d = function(d, f, g) {
    switch(arguments.length) {
      case 1:
        return c.call(this, d);
      case 2:
        return b.call(this, d, f);
      case 3:
        return a.call(this, d, f, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.a = c;
  d.j = b;
  d.q = a;
  return d;
}();
function He(a, b, c, d) {
  this.$a = a;
  this.Va = b;
  this.l = c;
  this.n = d;
  this.g = 31850732;
  this.o = 1536;
}
h = He.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.B = function() {
  return this.l;
};
h.Aa = function() {
  if (1 < Ab.call(null, this.$a)) {
    return new He(Bc.call(null, this.$a), this.Va, this.l, null);
  }
  var a = ic.call(null, this.Va);
  return null == a ? null : a;
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return sd.call(null, dd, this.l);
};
h.ga = function() {
  return A.call(null, this.$a, 0);
};
h.ha = function() {
  return 1 < Ab.call(null, this.$a) ? new He(Bc.call(null, this.$a), this.Va, this.l, null) : null == this.Va ? dd : this.Va;
};
h.M = function() {
  return this;
};
h.Bd = function() {
  return this.$a;
};
h.Cd = function() {
  return null == this.Va ? dd : this.Va;
};
h.D = function(a, b) {
  return new He(this.$a, this.Va, b, this.n);
};
h.P = function(a, b) {
  return O.call(null, b, this);
};
h.Ad = function() {
  return null == this.Va ? null : this.Va;
};
function Ie(a, b) {
  return 0 === Ab.call(null, a) ? b : new He(a, b, null, null);
}
function Je(a, b) {
  return a.add(b);
}
function Ke(a) {
  return a.$a();
}
function Le(a) {
  return Cc.call(null, a);
}
function Me(a) {
  return Dc.call(null, a);
}
function Ne(a) {
  for (var b = [];;) {
    if (E.call(null, a)) {
      b.push(F.call(null, a)), a = L.call(null, a);
    } else {
      return b;
    }
  }
}
function Oe(a, b) {
  if (nd.call(null, a)) {
    return P.call(null, a);
  }
  for (var c = a, d = b, e = 0;;) {
    if (0 < d && E.call(null, c)) {
      c = L.call(null, c), d -= 1, e += 1;
    } else {
      return e;
    }
  }
}
var Qe = function Pe(b) {
  return null == b ? null : null == L.call(null, b) ? E.call(null, F.call(null, b)) : O.call(null, F.call(null, b), Pe.call(null, L.call(null, b)));
}, Re = function() {
  function a(a, b) {
    return new Be(null, function() {
      var c = E.call(null, a);
      return c ? Qd.call(null, c) ? Ie.call(null, Le.call(null, c), d.call(null, Me.call(null, c), b)) : O.call(null, F.call(null, c), d.call(null, H.call(null, c), b)) : b;
    }, null, null);
  }
  function b(a) {
    return new Be(null, function() {
      return a;
    }, null, null);
  }
  function c() {
    return new Be(null, function() {
      return null;
    }, null, null);
  }
  var d = null, e = function() {
    function a(c, d, e) {
      var f = null;
      2 < arguments.length && (f = M(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, c, d, f);
    }
    function b(a, c, e) {
      return function r(a, b) {
        return new Be(null, function() {
          var c = E.call(null, a);
          return c ? Qd.call(null, c) ? Ie.call(null, Le.call(null, c), r.call(null, Me.call(null, c), b)) : O.call(null, F.call(null, c), r.call(null, H.call(null, c), b)) : t(b) ? r.call(null, F.call(null, b), L.call(null, b)) : null;
        }, null, null);
      }.call(null, d.call(null, a, c), e);
    }
    a.k = 2;
    a.e = function(a) {
      var c = F(a);
      a = L(a);
      var d = F(a);
      a = H(a);
      return b(c, d, a);
    };
    a.c = b;
    return a;
  }(), d = function(d, g, l) {
    switch(arguments.length) {
      case 0:
        return c.call(this);
      case 1:
        return b.call(this, d);
      case 2:
        return a.call(this, d, g);
      default:
        return e.c(d, g, M(arguments, 2));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.k = 2;
  d.e = e.e;
  d.Z = c;
  d.a = b;
  d.j = a;
  d.c = e.c;
  return d;
}(), Se = function() {
  function a(a, b, c, d) {
    return O.call(null, a, O.call(null, b, O.call(null, c, d)));
  }
  function b(a, b, c) {
    return O.call(null, a, O.call(null, b, c));
  }
  function c(a, b) {
    return O.call(null, a, b);
  }
  function d(a) {
    return E.call(null, a);
  }
  var e = null, f = function() {
    function a(c, d, e, f, g) {
      var y = null;
      4 < arguments.length && (y = M(Array.prototype.slice.call(arguments, 4), 0));
      return b.call(this, c, d, e, f, y);
    }
    function b(a, c, d, e, f) {
      return O.call(null, a, O.call(null, c, O.call(null, d, O.call(null, e, Qe.call(null, f)))));
    }
    a.k = 4;
    a.e = function(a) {
      var c = F(a);
      a = L(a);
      var d = F(a);
      a = L(a);
      var e = F(a);
      a = L(a);
      var f = F(a);
      a = H(a);
      return b(c, d, e, f, a);
    };
    a.c = b;
    return a;
  }(), e = function(e, l, m, p, q) {
    switch(arguments.length) {
      case 1:
        return d.call(this, e);
      case 2:
        return c.call(this, e, l);
      case 3:
        return b.call(this, e, l, m);
      case 4:
        return a.call(this, e, l, m, p);
      default:
        return f.c(e, l, m, p, M(arguments, 4));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  e.k = 4;
  e.e = f.e;
  e.a = d;
  e.j = c;
  e.q = b;
  e.W = a;
  e.c = f.c;
  return e;
}();
function Te(a) {
  return vc.call(null, a);
}
function Ue(a) {
  return xc.call(null, a);
}
var Ve = function() {
  function a(a, b) {
    return wc.call(null, a, b);
  }
  function b() {
    return Te.call(null, xd);
  }
  var c = null, d = function() {
    function a(c, d, e) {
      var p = null;
      2 < arguments.length && (p = M(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, c, d, p);
    }
    function b(a, c, d) {
      for (;;) {
        if (a = wc.call(null, a, c), t(d)) {
          c = F.call(null, d), d = L.call(null, d);
        } else {
          return a;
        }
      }
    }
    a.k = 2;
    a.e = function(a) {
      var c = F(a);
      a = L(a);
      var d = F(a);
      a = H(a);
      return b(c, d, a);
    };
    a.c = b;
    return a;
  }(), c = function(c, f, g) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c;
      case 2:
        return a.call(this, c, f);
      default:
        return d.c(c, f, M(arguments, 2));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.k = 2;
  c.e = d.e;
  c.Z = b;
  c.a = function(a) {
    return a;
  };
  c.j = a;
  c.c = d.c;
  return c;
}(), We = function() {
  function a(a, b, c) {
    return yc.call(null, a, b, c);
  }
  var b = null, c = function() {
    function a(c, d, l, m) {
      var p = null;
      3 < arguments.length && (p = M(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, c, d, l, p);
    }
    function b(a, c, d, e) {
      for (;;) {
        if (a = yc.call(null, a, c, d), t(e)) {
          c = F.call(null, e), d = ud.call(null, e), e = vd.call(null, e);
        } else {
          return a;
        }
      }
    }
    a.k = 3;
    a.e = function(a) {
      var c = F(a);
      a = L(a);
      var d = F(a);
      a = L(a);
      var m = F(a);
      a = H(a);
      return b(c, d, m, a);
    };
    a.c = b;
    return a;
  }(), b = function(b, e, f, g) {
    switch(arguments.length) {
      case 3:
        return a.call(this, b, e, f);
      default:
        return c.c(b, e, f, M(arguments, 3));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.k = 3;
  b.e = c.e;
  b.q = a;
  b.c = c.c;
  return b;
}();
function Xe(a, b, c) {
  var d = E.call(null, c);
  if (0 === b) {
    return a.call(null);
  }
  c = Gb.call(null, d);
  var e = Hb.call(null, d);
  if (1 === b) {
    return a.a ? a.a(c) : a.call(null, c);
  }
  var d = Gb.call(null, e), f = Hb.call(null, e);
  if (2 === b) {
    return a.j ? a.j(c, d) : a.call(null, c, d);
  }
  var e = Gb.call(null, f), g = Hb.call(null, f);
  if (3 === b) {
    return a.q ? a.q(c, d, e) : a.call(null, c, d, e);
  }
  var f = Gb.call(null, g), l = Hb.call(null, g);
  if (4 === b) {
    return a.W ? a.W(c, d, e, f) : a.call(null, c, d, e, f);
  }
  var g = Gb.call(null, l), m = Hb.call(null, l);
  if (5 === b) {
    return a.Qa ? a.Qa(c, d, e, f, g) : a.call(null, c, d, e, f, g);
  }
  var l = Gb.call(null, m), p = Hb.call(null, m);
  if (6 === b) {
    return a.qb ? a.qb(c, d, e, f, g, l) : a.call(null, c, d, e, f, g, l);
  }
  var m = Gb.call(null, p), q = Hb.call(null, p);
  if (7 === b) {
    return a.Nb ? a.Nb(c, d, e, f, g, l, m) : a.call(null, c, d, e, f, g, l, m);
  }
  var p = Gb.call(null, q), r = Hb.call(null, q);
  if (8 === b) {
    return a.oc ? a.oc(c, d, e, f, g, l, m, p) : a.call(null, c, d, e, f, g, l, m, p);
  }
  var q = Gb.call(null, r), u = Hb.call(null, r);
  if (9 === b) {
    return a.pc ? a.pc(c, d, e, f, g, l, m, p, q) : a.call(null, c, d, e, f, g, l, m, p, q);
  }
  var r = Gb.call(null, u), y = Hb.call(null, u);
  if (10 === b) {
    return a.dc ? a.dc(c, d, e, f, g, l, m, p, q, r) : a.call(null, c, d, e, f, g, l, m, p, q, r);
  }
  var u = Gb.call(null, y), z = Hb.call(null, y);
  if (11 === b) {
    return a.ec ? a.ec(c, d, e, f, g, l, m, p, q, r, u) : a.call(null, c, d, e, f, g, l, m, p, q, r, u);
  }
  var y = Gb.call(null, z), C = Hb.call(null, z);
  if (12 === b) {
    return a.fc ? a.fc(c, d, e, f, g, l, m, p, q, r, u, y) : a.call(null, c, d, e, f, g, l, m, p, q, r, u, y);
  }
  var z = Gb.call(null, C), G = Hb.call(null, C);
  if (13 === b) {
    return a.gc ? a.gc(c, d, e, f, g, l, m, p, q, r, u, y, z) : a.call(null, c, d, e, f, g, l, m, p, q, r, u, y, z);
  }
  var C = Gb.call(null, G), J = Hb.call(null, G);
  if (14 === b) {
    return a.hc ? a.hc(c, d, e, f, g, l, m, p, q, r, u, y, z, C) : a.call(null, c, d, e, f, g, l, m, p, q, r, u, y, z, C);
  }
  var G = Gb.call(null, J), Q = Hb.call(null, J);
  if (15 === b) {
    return a.ic ? a.ic(c, d, e, f, g, l, m, p, q, r, u, y, z, C, G) : a.call(null, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G);
  }
  var J = Gb.call(null, Q), W = Hb.call(null, Q);
  if (16 === b) {
    return a.jc ? a.jc(c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J) : a.call(null, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J);
  }
  var Q = Gb.call(null, W), Z = Hb.call(null, W);
  if (17 === b) {
    return a.kc ? a.kc(c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q) : a.call(null, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q);
  }
  var W = Gb.call(null, Z), K = Hb.call(null, Z);
  if (18 === b) {
    return a.lc ? a.lc(c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W) : a.call(null, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W);
  }
  Z = Gb.call(null, K);
  K = Hb.call(null, K);
  if (19 === b) {
    return a.mc ? a.mc(c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W, Z) : a.call(null, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W, Z);
  }
  var I = Gb.call(null, K);
  Hb.call(null, K);
  if (20 === b) {
    return a.nc ? a.nc(c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W, Z, I) : a.call(null, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W, Z, I);
  }
  throw Error("Only up to 20 arguments supported on functions");
}
var U = function() {
  function a(a, b, c, d, e) {
    b = Se.call(null, b, c, d, e);
    c = a.k;
    return a.e ? (d = Oe.call(null, b, c + 1), d <= c ? Xe.call(null, a, d, b) : a.e(b)) : a.apply(a, Ne.call(null, b));
  }
  function b(a, b, c, d) {
    b = Se.call(null, b, c, d);
    c = a.k;
    return a.e ? (d = Oe.call(null, b, c + 1), d <= c ? Xe.call(null, a, d, b) : a.e(b)) : a.apply(a, Ne.call(null, b));
  }
  function c(a, b, c) {
    b = Se.call(null, b, c);
    c = a.k;
    if (a.e) {
      var d = Oe.call(null, b, c + 1);
      return d <= c ? Xe.call(null, a, d, b) : a.e(b);
    }
    return a.apply(a, Ne.call(null, b));
  }
  function d(a, b) {
    var c = a.k;
    if (a.e) {
      var d = Oe.call(null, b, c + 1);
      return d <= c ? Xe.call(null, a, d, b) : a.e(b);
    }
    return a.apply(a, Ne.call(null, b));
  }
  var e = null, f = function() {
    function a(c, d, e, f, g, y) {
      var z = null;
      5 < arguments.length && (z = M(Array.prototype.slice.call(arguments, 5), 0));
      return b.call(this, c, d, e, f, g, z);
    }
    function b(a, c, d, e, f, g) {
      c = O.call(null, c, O.call(null, d, O.call(null, e, O.call(null, f, Qe.call(null, g)))));
      d = a.k;
      return a.e ? (e = Oe.call(null, c, d + 1), e <= d ? Xe.call(null, a, e, c) : a.e(c)) : a.apply(a, Ne.call(null, c));
    }
    a.k = 5;
    a.e = function(a) {
      var c = F(a);
      a = L(a);
      var d = F(a);
      a = L(a);
      var e = F(a);
      a = L(a);
      var f = F(a);
      a = L(a);
      var g = F(a);
      a = H(a);
      return b(c, d, e, f, g, a);
    };
    a.c = b;
    return a;
  }(), e = function(e, l, m, p, q, r) {
    switch(arguments.length) {
      case 2:
        return d.call(this, e, l);
      case 3:
        return c.call(this, e, l, m);
      case 4:
        return b.call(this, e, l, m, p);
      case 5:
        return a.call(this, e, l, m, p, q);
      default:
        return f.c(e, l, m, p, q, M(arguments, 5));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  e.k = 5;
  e.e = f.e;
  e.j = d;
  e.q = c;
  e.W = b;
  e.Qa = a;
  e.c = f.c;
  return e;
}(), Ye = function() {
  function a(a, b) {
    return!B.call(null, a, b);
  }
  var b = null, c = function() {
    function a(c, d, l) {
      var m = null;
      2 < arguments.length && (m = M(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, c, d, m);
    }
    function b(a, c, d) {
      return ob.call(null, U.call(null, B, a, c, d));
    }
    a.k = 2;
    a.e = function(a) {
      var c = F(a);
      a = L(a);
      var d = F(a);
      a = H(a);
      return b(c, d, a);
    };
    a.c = b;
    return a;
  }(), b = function(b, e, f) {
    switch(arguments.length) {
      case 1:
        return!1;
      case 2:
        return a.call(this, b, e);
      default:
        return c.c(b, e, M(arguments, 2));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.k = 2;
  b.e = c.e;
  b.a = function() {
    return!1;
  };
  b.j = a;
  b.c = c.c;
  return b;
}();
function Ze(a) {
  return E.call(null, a) ? a : null;
}
function $e(a, b) {
  for (;;) {
    if (null == E.call(null, b)) {
      return!0;
    }
    if (t(a.call(null, F.call(null, b)))) {
      var c = a, d = L.call(null, b);
      a = c;
      b = d;
    } else {
      return!1;
    }
  }
}
function af(a, b) {
  for (;;) {
    if (E.call(null, b)) {
      var c = a.call(null, F.call(null, b));
      if (t(c)) {
        return c;
      }
      var c = a, d = L.call(null, b);
      a = c;
      b = d;
    } else {
      return null;
    }
  }
}
function bf(a) {
  if (Yd.call(null, a)) {
    return 0 === (a & 1);
  }
  throw Error("Argument must be an integer: " + x.a(a));
}
function cf(a) {
  return!bf.call(null, a);
}
function df(a) {
  return function() {
    function b(b, c) {
      return ob.call(null, a.call(null, b, c));
    }
    function c(b) {
      return ob.call(null, a.call(null, b));
    }
    function d() {
      return ob.call(null, a.call(null));
    }
    var e = null, f = function() {
      function b(a, d, e) {
        var f = null;
        2 < arguments.length && (f = M(Array.prototype.slice.call(arguments, 2), 0));
        return c.call(this, a, d, f);
      }
      function c(b, d, e) {
        return ob.call(null, U.call(null, a, b, d, e));
      }
      b.k = 2;
      b.e = function(a) {
        var b = F(a);
        a = L(a);
        var d = F(a);
        a = H(a);
        return c(b, d, a);
      };
      b.c = c;
      return b;
    }(), e = function(a, e, m) {
      switch(arguments.length) {
        case 0:
          return d.call(this);
        case 1:
          return c.call(this, a);
        case 2:
          return b.call(this, a, e);
        default:
          return f.c(a, e, M(arguments, 2));
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    e.k = 2;
    e.e = f.e;
    e.Z = d;
    e.a = c;
    e.j = b;
    e.c = f.c;
    return e;
  }();
}
function ef(a) {
  return function() {
    function b(b) {
      0 < arguments.length && M(Array.prototype.slice.call(arguments, 0), 0);
      return a;
    }
    b.k = 0;
    b.e = function(b) {
      E(b);
      return a;
    };
    b.c = function() {
      return a;
    };
    return b;
  }();
}
var ff = function() {
  function a(a, b, c) {
    return function() {
      function d(l, m, p) {
        return a.call(null, b.call(null, c.call(null, l, m, p)));
      }
      function m(d, l) {
        return a.call(null, b.call(null, c.call(null, d, l)));
      }
      function p(d) {
        return a.call(null, b.call(null, c.call(null, d)));
      }
      function q() {
        return a.call(null, b.call(null, c.call(null)));
      }
      var r = null, u = function() {
        function d(a, b, c, e) {
          var f = null;
          3 < arguments.length && (f = M(Array.prototype.slice.call(arguments, 3), 0));
          return l.call(this, a, b, c, f);
        }
        function l(d, m, p, q) {
          return a.call(null, b.call(null, U.call(null, c, d, m, p, q)));
        }
        d.k = 3;
        d.e = function(a) {
          var b = F(a);
          a = L(a);
          var c = F(a);
          a = L(a);
          var d = F(a);
          a = H(a);
          return l(b, c, d, a);
        };
        d.c = l;
        return d;
      }(), r = function(a, b, c, e) {
        switch(arguments.length) {
          case 0:
            return q.call(this);
          case 1:
            return p.call(this, a);
          case 2:
            return m.call(this, a, b);
          case 3:
            return d.call(this, a, b, c);
          default:
            return u.c(a, b, c, M(arguments, 3));
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      r.k = 3;
      r.e = u.e;
      r.Z = q;
      r.a = p;
      r.j = m;
      r.q = d;
      r.c = u.c;
      return r;
    }();
  }
  function b(a, b) {
    return function() {
      function c(d, g, l) {
        return a.call(null, b.call(null, d, g, l));
      }
      function d(c, g) {
        return a.call(null, b.call(null, c, g));
      }
      function m(c) {
        return a.call(null, b.call(null, c));
      }
      function p() {
        return a.call(null, b.call(null));
      }
      var q = null, r = function() {
        function c(a, b, e, f) {
          var g = null;
          3 < arguments.length && (g = M(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, e, g);
        }
        function d(c, g, l, m) {
          return a.call(null, U.call(null, b, c, g, l, m));
        }
        c.k = 3;
        c.e = function(a) {
          var b = F(a);
          a = L(a);
          var c = F(a);
          a = L(a);
          var e = F(a);
          a = H(a);
          return d(b, c, e, a);
        };
        c.c = d;
        return c;
      }(), q = function(a, b, e, f) {
        switch(arguments.length) {
          case 0:
            return p.call(this);
          case 1:
            return m.call(this, a);
          case 2:
            return d.call(this, a, b);
          case 3:
            return c.call(this, a, b, e);
          default:
            return r.c(a, b, e, M(arguments, 3));
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      q.k = 3;
      q.e = r.e;
      q.Z = p;
      q.a = m;
      q.j = d;
      q.q = c;
      q.c = r.c;
      return q;
    }();
  }
  var c = null, d = function() {
    function a(c, d, e, p) {
      var q = null;
      3 < arguments.length && (q = M(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, c, d, e, q);
    }
    function b(a, c, d, e) {
      return function(a) {
        return function() {
          function b(a) {
            var d = null;
            0 < arguments.length && (d = M(Array.prototype.slice.call(arguments, 0), 0));
            return c.call(this, d);
          }
          function c(b) {
            b = U.call(null, F.call(null, a), b);
            for (var d = L.call(null, a);;) {
              if (d) {
                b = F.call(null, d).call(null, b), d = L.call(null, d);
              } else {
                return b;
              }
            }
          }
          b.k = 0;
          b.e = function(a) {
            a = E(a);
            return c(a);
          };
          b.c = c;
          return b;
        }();
      }(ue.call(null, Se.call(null, a, c, d, e)));
    }
    a.k = 3;
    a.e = function(a) {
      var c = F(a);
      a = L(a);
      var d = F(a);
      a = L(a);
      var e = F(a);
      a = H(a);
      return b(c, d, e, a);
    };
    a.c = b;
    return a;
  }(), c = function(c, f, g, l) {
    switch(arguments.length) {
      case 0:
        return be;
      case 1:
        return c;
      case 2:
        return b.call(this, c, f);
      case 3:
        return a.call(this, c, f, g);
      default:
        return d.c(c, f, g, M(arguments, 3));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.k = 3;
  c.e = d.e;
  c.Z = function() {
    return be;
  };
  c.a = function(a) {
    return a;
  };
  c.j = b;
  c.q = a;
  c.c = d.c;
  return c;
}(), gf = function() {
  function a(a, b, c, d) {
    return function() {
      function e(a) {
        var b = null;
        0 < arguments.length && (b = M(Array.prototype.slice.call(arguments, 0), 0));
        return q.call(this, b);
      }
      function q(e) {
        return U.call(null, a, b, c, d, e);
      }
      e.k = 0;
      e.e = function(a) {
        a = E(a);
        return q(a);
      };
      e.c = q;
      return e;
    }();
  }
  function b(a, b, c) {
    return function() {
      function d(a) {
        var b = null;
        0 < arguments.length && (b = M(Array.prototype.slice.call(arguments, 0), 0));
        return e.call(this, b);
      }
      function e(d) {
        return U.call(null, a, b, c, d);
      }
      d.k = 0;
      d.e = function(a) {
        a = E(a);
        return e(a);
      };
      d.c = e;
      return d;
    }();
  }
  function c(a, b) {
    return function() {
      function c(a) {
        var b = null;
        0 < arguments.length && (b = M(Array.prototype.slice.call(arguments, 0), 0));
        return d.call(this, b);
      }
      function d(c) {
        return U.call(null, a, b, c);
      }
      c.k = 0;
      c.e = function(a) {
        a = E(a);
        return d(a);
      };
      c.c = d;
      return c;
    }();
  }
  var d = null, e = function() {
    function a(c, d, e, f, r) {
      var u = null;
      4 < arguments.length && (u = M(Array.prototype.slice.call(arguments, 4), 0));
      return b.call(this, c, d, e, f, u);
    }
    function b(a, c, d, e, f) {
      return function() {
        function b(a) {
          var c = null;
          0 < arguments.length && (c = M(Array.prototype.slice.call(arguments, 0), 0));
          return g.call(this, c);
        }
        function g(b) {
          return U.call(null, a, c, d, e, Re.call(null, f, b));
        }
        b.k = 0;
        b.e = function(a) {
          a = E(a);
          return g(a);
        };
        b.c = g;
        return b;
      }();
    }
    a.k = 4;
    a.e = function(a) {
      var c = F(a);
      a = L(a);
      var d = F(a);
      a = L(a);
      var e = F(a);
      a = L(a);
      var f = F(a);
      a = H(a);
      return b(c, d, e, f, a);
    };
    a.c = b;
    return a;
  }(), d = function(d, g, l, m, p) {
    switch(arguments.length) {
      case 1:
        return d;
      case 2:
        return c.call(this, d, g);
      case 3:
        return b.call(this, d, g, l);
      case 4:
        return a.call(this, d, g, l, m);
      default:
        return e.c(d, g, l, m, M(arguments, 4));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.k = 4;
  d.e = e.e;
  d.a = function(a) {
    return a;
  };
  d.j = c;
  d.q = b;
  d.W = a;
  d.c = e.c;
  return d;
}();
function hf(a, b) {
  return function d(b, f) {
    return new Be(null, function() {
      var g = E.call(null, f);
      if (g) {
        if (Qd.call(null, g)) {
          for (var l = Le.call(null, g), m = P.call(null, l), p = Fe.call(null, m), q = 0;;) {
            if (q < m) {
              Je.call(null, p, a.call(null, b + q, A.call(null, l, q))), q += 1;
            } else {
              break;
            }
          }
          return Ie.call(null, Ke.call(null, p), d.call(null, b + m, Me.call(null, g)));
        }
        return O.call(null, a.call(null, b, F.call(null, g)), d.call(null, b + 1, H.call(null, g)));
      }
      return null;
    }, null, null);
  }.call(null, 0, b);
}
function jf(a, b, c, d) {
  this.state = a;
  this.l = b;
  this.ud = c;
  this.ca = d;
  this.g = 6455296;
  this.o = 16386;
}
h = jf.prototype;
h.F = function() {
  return ma(this);
};
h.Uc = function(a, b, c) {
  a = E.call(null, this.ca);
  for (var d = null, e = 0, f = 0;;) {
    if (f < e) {
      var g = A.call(null, d, f), l = R.call(null, g, 0, null), g = R.call(null, g, 1, null);
      g.call(null, l, this, b, c);
      f += 1;
    } else {
      if (a = E.call(null, a)) {
        Qd.call(null, a) ? (d = Le.call(null, a), a = Me.call(null, a), l = d, e = P.call(null, d), d = l) : (d = F.call(null, a), l = R.call(null, d, 0, null), g = R.call(null, d, 1, null), g.call(null, l, this, b, c), a = L.call(null, a), d = null, e = 0), f = 0;
      } else {
        return null;
      }
    }
  }
};
h.Tc = function(a, b, c) {
  this.ca = T.call(null, this.ca, b, c);
  return this;
};
h.Vc = function(a, b) {
  return this.ca = Dd.call(null, this.ca, b);
};
h.B = function() {
  return this.l;
};
h.Ab = function() {
  return this.state;
};
h.C = function(a, b) {
  return this === b;
};
var lf = function() {
  function a(a) {
    return new jf(a, null, null, null);
  }
  var b = null, c = function() {
    function a(c, d) {
      var l = null;
      1 < arguments.length && (l = M(Array.prototype.slice.call(arguments, 1), 0));
      return b.call(this, c, l);
    }
    function b(a, c) {
      var d = Vd.call(null, c) ? U.call(null, kf, c) : c, e = S.call(null, d, new s(null, "validator", "validator", -1966190681)), d = S.call(null, d, new s(null, "meta", "meta", 1499536964));
      return new jf(a, d, e, null);
    }
    a.k = 1;
    a.e = function(a) {
      var c = F(a);
      a = H(a);
      return b(c, a);
    };
    a.c = b;
    return a;
  }(), b = function(b, e) {
    switch(arguments.length) {
      case 1:
        return a.call(this, b);
      default:
        return c.c(b, M(arguments, 1));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.k = 1;
  b.e = c.e;
  b.a = a;
  b.c = c.c;
  return b;
}();
function mf(a, b) {
  if (a instanceof jf) {
    var c = a.ud;
    if (null != c && !t(c.call(null, b))) {
      throw Error("Assert failed: Validator rejected reference state\n" + x.a(nf.call(null, V(new D(null, "validate", "validate", 1439230700, null), new D(null, "new-value", "new-value", -1567397401, null)))));
    }
    c = a.state;
    a.state = b;
    null != a.ca && sc.call(null, a, c, b);
    return b;
  }
  return Hc.call(null, a, b);
}
var of = function() {
  function a(a, b, c, d) {
    return a instanceof jf ? mf.call(null, a, b.call(null, a.state, c, d)) : Ic.call(null, a, b, c, d);
  }
  function b(a, b, c) {
    return a instanceof jf ? mf.call(null, a, b.call(null, a.state, c)) : Ic.call(null, a, b, c);
  }
  function c(a, b) {
    return a instanceof jf ? mf.call(null, a, b.call(null, a.state)) : Ic.call(null, a, b);
  }
  var d = null, e = function() {
    function a(c, d, e, f, r) {
      var u = null;
      4 < arguments.length && (u = M(Array.prototype.slice.call(arguments, 4), 0));
      return b.call(this, c, d, e, f, u);
    }
    function b(a, c, d, e, f) {
      return a instanceof jf ? mf.call(null, a, U.call(null, c, a.state, d, e, f)) : Ic.call(null, a, c, d, e, f);
    }
    a.k = 4;
    a.e = function(a) {
      var c = F(a);
      a = L(a);
      var d = F(a);
      a = L(a);
      var e = F(a);
      a = L(a);
      var f = F(a);
      a = H(a);
      return b(c, d, e, f, a);
    };
    a.c = b;
    return a;
  }(), d = function(d, g, l, m, p) {
    switch(arguments.length) {
      case 2:
        return c.call(this, d, g);
      case 3:
        return b.call(this, d, g, l);
      case 4:
        return a.call(this, d, g, l, m);
      default:
        return e.c(d, g, l, m, M(arguments, 4));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.k = 4;
  d.e = e.e;
  d.j = c;
  d.q = b;
  d.W = a;
  d.c = e.c;
  return d;
}();
function pf(a, b, c) {
  return B.call(null, a.state, b) ? (mf.call(null, a, c), !0) : !1;
}
var qf = function() {
  function a(a, b, c, d) {
    return new Be(null, function() {
      var f = E.call(null, b), r = E.call(null, c), u = E.call(null, d);
      return f && r && u ? O.call(null, a.call(null, F.call(null, f), F.call(null, r), F.call(null, u)), e.call(null, a, H.call(null, f), H.call(null, r), H.call(null, u))) : null;
    }, null, null);
  }
  function b(a, b, c) {
    return new Be(null, function() {
      var d = E.call(null, b), f = E.call(null, c);
      return d && f ? O.call(null, a.call(null, F.call(null, d), F.call(null, f)), e.call(null, a, H.call(null, d), H.call(null, f))) : null;
    }, null, null);
  }
  function c(a, b) {
    return new Be(null, function() {
      var c = E.call(null, b);
      if (c) {
        if (Qd.call(null, c)) {
          for (var d = Le.call(null, c), f = P.call(null, d), r = Fe.call(null, f), u = 0;;) {
            if (u < f) {
              Je.call(null, r, a.call(null, A.call(null, d, u))), u += 1;
            } else {
              break;
            }
          }
          return Ie.call(null, Ke.call(null, r), e.call(null, a, Me.call(null, c)));
        }
        return O.call(null, a.call(null, F.call(null, c)), e.call(null, a, H.call(null, c)));
      }
      return null;
    }, null, null);
  }
  function d(a) {
    return function(b) {
      return function() {
        function c(d, e) {
          return b.call(null, d, a.call(null, e));
        }
        function d(a) {
          return b.call(null, a);
        }
        function e() {
          return b.call(null);
        }
        var f = null, u = function() {
          function c(a, b, e) {
            var f = null;
            2 < arguments.length && (f = M(Array.prototype.slice.call(arguments, 2), 0));
            return d.call(this, a, b, f);
          }
          function d(c, e, f) {
            return b.call(null, c, U.call(null, a, e, f));
          }
          c.k = 2;
          c.e = function(a) {
            var b = F(a);
            a = L(a);
            var c = F(a);
            a = H(a);
            return d(b, c, a);
          };
          c.c = d;
          return c;
        }(), f = function(a, b, f) {
          switch(arguments.length) {
            case 0:
              return e.call(this);
            case 1:
              return d.call(this, a);
            case 2:
              return c.call(this, a, b);
            default:
              return u.c(a, b, M(arguments, 2));
          }
          throw Error("Invalid arity: " + arguments.length);
        };
        f.k = 2;
        f.e = u.e;
        f.Z = e;
        f.a = d;
        f.j = c;
        f.c = u.c;
        return f;
      }();
    };
  }
  var e = null, f = function() {
    function a(c, d, e, f, g) {
      var y = null;
      4 < arguments.length && (y = M(Array.prototype.slice.call(arguments, 4), 0));
      return b.call(this, c, d, e, f, y);
    }
    function b(a, c, d, f, g) {
      var l = function C(a) {
        return new Be(null, function() {
          var b = e.call(null, E, a);
          return $e.call(null, be, b) ? O.call(null, e.call(null, F, b), C.call(null, e.call(null, H, b))) : null;
        }, null, null);
      };
      return e.call(null, function() {
        return function(b) {
          return U.call(null, a, b);
        };
      }(l), l.call(null, yd.call(null, g, f, d, c)));
    }
    a.k = 4;
    a.e = function(a) {
      var c = F(a);
      a = L(a);
      var d = F(a);
      a = L(a);
      var e = F(a);
      a = L(a);
      var f = F(a);
      a = H(a);
      return b(c, d, e, f, a);
    };
    a.c = b;
    return a;
  }(), e = function(e, l, m, p, q) {
    switch(arguments.length) {
      case 1:
        return d.call(this, e);
      case 2:
        return c.call(this, e, l);
      case 3:
        return b.call(this, e, l, m);
      case 4:
        return a.call(this, e, l, m, p);
      default:
        return f.c(e, l, m, p, M(arguments, 4));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  e.k = 4;
  e.e = f.e;
  e.a = d;
  e.j = c;
  e.q = b;
  e.W = a;
  e.c = f.c;
  return e;
}(), rf = function() {
  function a(a, b) {
    return new Be(null, function() {
      if (0 < a) {
        var f = E.call(null, b);
        return f ? O.call(null, F.call(null, f), c.call(null, a - 1, H.call(null, f))) : null;
      }
      return null;
    }, null, null);
  }
  function b(a) {
    return function(b) {
      return function(a) {
        return function() {
          function c(d, g) {
            var l = N.call(null, a), m = of.call(null, a, de), l = 0 < l ? b.call(null, d, g) : d;
            return 0 < m ? l : jd.call(null, l);
          }
          function d(a) {
            return b.call(null, a);
          }
          function m() {
            return b.call(null);
          }
          var p = null, p = function(a, b) {
            switch(arguments.length) {
              case 0:
                return m.call(this);
              case 1:
                return d.call(this, a);
              case 2:
                return c.call(this, a, b);
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          p.Z = m;
          p.a = d;
          p.j = c;
          return p;
        }();
      }(lf.call(null, a));
    };
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}(), sf = function() {
  function a(a, b) {
    return new Be(null, function(c) {
      return function() {
        return c.call(null, a, b);
      };
    }(function(a, b) {
      for (;;) {
        var c = E.call(null, b);
        if (0 < a && c) {
          var d = a - 1, c = H.call(null, c);
          a = d;
          b = c;
        } else {
          return c;
        }
      }
    }), null, null);
  }
  function b(a) {
    return function(b) {
      return function(a) {
        return function() {
          function c(d, g) {
            var l = N.call(null, a);
            of.call(null, a, de);
            return 0 < l ? d : b.call(null, d, g);
          }
          function d(a) {
            return b.call(null, a);
          }
          function m() {
            return b.call(null);
          }
          var p = null, p = function(a, b) {
            switch(arguments.length) {
              case 0:
                return m.call(this);
              case 1:
                return d.call(this, a);
              case 2:
                return c.call(this, a, b);
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          p.Z = m;
          p.a = d;
          p.j = c;
          return p;
        }();
      }(lf.call(null, a));
    };
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}(), tf = function() {
  function a(a, b) {
    return rf.call(null, a, c.call(null, b));
  }
  function b(a) {
    return new Be(null, function() {
      return O.call(null, a, c.call(null, a));
    }, null, null);
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}(), uf = function() {
  function a(a, b) {
    return rf.call(null, a, c.call(null, b));
  }
  function b(a) {
    return new Be(null, function() {
      return O.call(null, a.call(null), c.call(null, a));
    }, null, null);
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}(), vf = function() {
  function a(a, c) {
    return new Be(null, function() {
      var f = E.call(null, a), g = E.call(null, c);
      return f && g ? O.call(null, F.call(null, f), O.call(null, F.call(null, g), b.call(null, H.call(null, f), H.call(null, g)))) : null;
    }, null, null);
  }
  var b = null, c = function() {
    function a(b, d, l) {
      var m = null;
      2 < arguments.length && (m = M(Array.prototype.slice.call(arguments, 2), 0));
      return c.call(this, b, d, m);
    }
    function c(a, d, e) {
      return new Be(null, function() {
        var c = qf.call(null, E, yd.call(null, e, d, a));
        return $e.call(null, be, c) ? Re.call(null, qf.call(null, F, c), U.call(null, b, qf.call(null, H, c))) : null;
      }, null, null);
    }
    a.k = 2;
    a.e = function(a) {
      var b = F(a);
      a = L(a);
      var d = F(a);
      a = H(a);
      return c(b, d, a);
    };
    a.c = c;
    return a;
  }(), b = function(b, e, f) {
    switch(arguments.length) {
      case 2:
        return a.call(this, b, e);
      default:
        return c.c(b, e, M(arguments, 2));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.k = 2;
  b.e = c.e;
  b.j = a;
  b.c = c.c;
  return b;
}();
function wf(a, b) {
  return sf.call(null, 1, vf.call(null, tf.call(null, a), b));
}
var xf = function() {
  function a(a, b) {
    return new Be(null, function() {
      var f = E.call(null, b);
      if (f) {
        if (Qd.call(null, f)) {
          for (var g = Le.call(null, f), l = P.call(null, g), m = Fe.call(null, l), p = 0;;) {
            if (p < l) {
              t(a.call(null, A.call(null, g, p))) && Je.call(null, m, A.call(null, g, p)), p += 1;
            } else {
              break;
            }
          }
          return Ie.call(null, Ke.call(null, m), c.call(null, a, Me.call(null, f)));
        }
        g = F.call(null, f);
        f = H.call(null, f);
        return t(a.call(null, g)) ? O.call(null, g, c.call(null, a, f)) : c.call(null, a, f);
      }
      return null;
    }, null, null);
  }
  function b(a) {
    return function(b) {
      return function() {
        function c(f, g) {
          return t(a.call(null, g)) ? b.call(null, f, g) : f;
        }
        function g(a) {
          return b.call(null, a);
        }
        function l() {
          return b.call(null);
        }
        var m = null, m = function(a, b) {
          switch(arguments.length) {
            case 0:
              return l.call(this);
            case 1:
              return g.call(this, a);
            case 2:
              return c.call(this, a, b);
          }
          throw Error("Invalid arity: " + arguments.length);
        };
        m.Z = l;
        m.a = g;
        m.j = c;
        return m;
      }();
    };
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}(), yf = function() {
  function a(a, b) {
    return xf.call(null, df.call(null, a), b);
  }
  function b(a) {
    return xf.call(null, df.call(null, a));
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}(), zf = function() {
  function a(a, b, c) {
    return a && (a.o & 4 || a.nf) ? sd.call(null, Ue.call(null, ce.call(null, b, Ve, Te.call(null, a), c)), Gd.call(null, a)) : ce.call(null, b, yd, a, c);
  }
  function b(a, b) {
    return null != a ? a && (a.o & 4 || a.nf) ? sd.call(null, Ue.call(null, ub.call(null, wc, Te.call(null, a), b)), Gd.call(null, a)) : ub.call(null, Db, a, b) : ub.call(null, yd, dd, b);
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}();
function Bf(a, b) {
  return Ue.call(null, ub.call(null, function(b, d) {
    return t(a.call(null, d)) ? Ve.call(null, b, d) : b;
  }, Te.call(null, xd), b));
}
var Cf = function() {
  function a(a, b, c, l) {
    return new Be(null, function() {
      var m = E.call(null, l);
      if (m) {
        var p = rf.call(null, a, m);
        return a === P.call(null, p) ? O.call(null, p, d.call(null, a, b, c, sf.call(null, b, m))) : Db.call(null, dd, rf.call(null, a, Re.call(null, p, c)));
      }
      return null;
    }, null, null);
  }
  function b(a, b, c) {
    return new Be(null, function() {
      var l = E.call(null, c);
      if (l) {
        var m = rf.call(null, a, l);
        return a === P.call(null, m) ? O.call(null, m, d.call(null, a, b, sf.call(null, b, l))) : null;
      }
      return null;
    }, null, null);
  }
  function c(a, b) {
    return d.call(null, a, a, b);
  }
  var d = null, d = function(d, f, g, l) {
    switch(arguments.length) {
      case 2:
        return c.call(this, d, f);
      case 3:
        return b.call(this, d, f, g);
      case 4:
        return a.call(this, d, f, g, l);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.j = c;
  d.q = b;
  d.W = a;
  return d;
}(), Df = function() {
  function a(a, b, c) {
    var g = Ud;
    for (b = E.call(null, b);;) {
      if (b) {
        var l = a;
        if (l ? l.g & 256 || l.oe || (l.g ? 0 : v.call(null, Kb, l)) : v.call(null, Kb, l)) {
          a = S.call(null, a, F.call(null, b), g);
          if (g === a) {
            return c;
          }
          b = L.call(null, b);
        } else {
          return c;
        }
      } else {
        return a;
      }
    }
  }
  function b(a, b) {
    return c.call(null, a, b, null);
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}(), Ff = function Ef(b, c, d) {
  var e = R.call(null, c, 0, null);
  return(c = le.call(null, c, 1)) ? T.call(null, b, e, Ef.call(null, S.call(null, b, e), c, d)) : T.call(null, b, e, d);
}, Gf = function() {
  function a(a, b, c, d, f, r) {
    var u = R.call(null, b, 0, null);
    return(b = le.call(null, b, 1)) ? T.call(null, a, u, e.call(null, S.call(null, a, u), b, c, d, f, r)) : T.call(null, a, u, c.call(null, S.call(null, a, u), d, f, r));
  }
  function b(a, b, c, d, f) {
    var r = R.call(null, b, 0, null);
    return(b = le.call(null, b, 1)) ? T.call(null, a, r, e.call(null, S.call(null, a, r), b, c, d, f)) : T.call(null, a, r, c.call(null, S.call(null, a, r), d, f));
  }
  function c(a, b, c, d) {
    var f = R.call(null, b, 0, null);
    return(b = le.call(null, b, 1)) ? T.call(null, a, f, e.call(null, S.call(null, a, f), b, c, d)) : T.call(null, a, f, c.call(null, S.call(null, a, f), d));
  }
  function d(a, b, c) {
    var d = R.call(null, b, 0, null);
    return(b = le.call(null, b, 1)) ? T.call(null, a, d, e.call(null, S.call(null, a, d), b, c)) : T.call(null, a, d, c.call(null, S.call(null, a, d)));
  }
  var e = null, f = function() {
    function a(c, d, e, f, g, y, z) {
      var C = null;
      6 < arguments.length && (C = M(Array.prototype.slice.call(arguments, 6), 0));
      return b.call(this, c, d, e, f, g, y, C);
    }
    function b(a, c, d, f, g, l, z) {
      var C = R.call(null, c, 0, null);
      return(c = le.call(null, c, 1)) ? T.call(null, a, C, U.call(null, e, S.call(null, a, C), c, d, f, g, l, z)) : T.call(null, a, C, U.call(null, d, S.call(null, a, C), f, g, l, z));
    }
    a.k = 6;
    a.e = function(a) {
      var c = F(a);
      a = L(a);
      var d = F(a);
      a = L(a);
      var e = F(a);
      a = L(a);
      var f = F(a);
      a = L(a);
      var g = F(a);
      a = L(a);
      var z = F(a);
      a = H(a);
      return b(c, d, e, f, g, z, a);
    };
    a.c = b;
    return a;
  }(), e = function(e, l, m, p, q, r, u) {
    switch(arguments.length) {
      case 3:
        return d.call(this, e, l, m);
      case 4:
        return c.call(this, e, l, m, p);
      case 5:
        return b.call(this, e, l, m, p, q);
      case 6:
        return a.call(this, e, l, m, p, q, r);
      default:
        return f.c(e, l, m, p, q, r, M(arguments, 6));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  e.k = 6;
  e.e = f.e;
  e.q = d;
  e.W = c;
  e.Qa = b;
  e.qb = a;
  e.c = f.c;
  return e;
}();
function Hf(a, b) {
  this.R = a;
  this.b = b;
}
function If(a) {
  return new Hf(a, [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
}
function Jf(a, b) {
  return a.b[b];
}
function Kf(a, b, c) {
  return a.b[b] = c;
}
function Lf(a) {
  return new Hf(a.R, sb.call(null, a.b));
}
function Mf(a) {
  a = a.h;
  return 32 > a ? 0 : a - 1 >>> 5 << 5;
}
function Nf(a, b, c) {
  for (;;) {
    if (0 === b) {
      return c;
    }
    var d = If.call(null, a);
    Kf.call(null, d, 0, c);
    c = d;
    b -= 5;
  }
}
var Pf = function Of(b, c, d, e) {
  var f = Lf.call(null, d), g = b.h - 1 >>> c & 31;
  5 === c ? Kf.call(null, f, g, e) : (d = Jf.call(null, d, g), b = null != d ? Of.call(null, b, c - 5, d, e) : Nf.call(null, null, c - 5, e), Kf.call(null, f, g, b));
  return f;
};
function Qf(a, b) {
  throw Error("No item " + x.a(a) + " in vector of length " + x.a(b));
}
function Rf(a) {
  var b = a.root;
  for (a = a.shift;;) {
    if (0 < a) {
      a -= 5, b = Jf.call(null, b, 0);
    } else {
      return b.b;
    }
  }
}
function Sf(a, b) {
  if (b >= Mf.call(null, a)) {
    return a.N;
  }
  for (var c = a.root, d = a.shift;;) {
    if (0 < d) {
      var e = d - 5, c = Jf.call(null, c, b >>> d & 31), d = e
    } else {
      return c.b;
    }
  }
}
function Tf(a, b) {
  return 0 <= b && b < a.h ? Sf.call(null, a, b) : Qf.call(null, b, a.h);
}
var Vf = function Uf(b, c, d, e, f) {
  var g = Lf.call(null, d);
  if (0 === c) {
    Kf.call(null, g, e & 31, f);
  } else {
    var l = e >>> c & 31;
    Kf.call(null, g, l, Uf.call(null, b, c - 5, Jf.call(null, d, l), e, f));
  }
  return g;
}, Xf = function Wf(b, c, d) {
  var e = b.h - 2 >>> c & 31;
  if (5 < c) {
    b = Wf.call(null, b, c - 5, Jf.call(null, d, e));
    if (null == b && 0 === e) {
      return null;
    }
    d = Lf.call(null, d);
    Kf.call(null, d, e, b);
    return d;
  }
  if (0 === e) {
    return null;
  }
  d = Lf.call(null, d);
  Kf.call(null, d, e, null);
  return d;
};
function X(a, b, c, d, e, f) {
  this.l = a;
  this.h = b;
  this.shift = c;
  this.root = d;
  this.N = e;
  this.n = f;
  this.g = 167668511;
  this.o = 8196;
}
h = X.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.A = function(a, b) {
  return Lb.call(null, this, b, null);
};
h.G = function(a, b, c) {
  return "number" === typeof b ? A.call(null, this, b, c) : c;
};
h.qc = function(a, b, c) {
  a = 0;
  for (var d = c;;) {
    if (a < this.h) {
      var e = Sf.call(null, this, a);
      c = e.length;
      a: {
        for (var f = 0;;) {
          if (f < c) {
            d = b.call(null, d, f + a, e[f]);
            if (kd.call(null, d)) {
              e = d;
              break a;
            }
            f += 1;
          } else {
            e = d;
            break a;
          }
        }
        e = void 0;
      }
      if (kd.call(null, e)) {
        return N.call(null, e);
      }
      a += c;
      d = e;
    } else {
      return d;
    }
  }
};
h.ta = function(a, b) {
  return Tf.call(null, this, b)[b & 31];
};
h.ua = function(a, b, c) {
  return 0 <= b && b < this.h ? Sf.call(null, this, b)[b & 31] : c;
};
h.Bb = function(a, b, c) {
  if (0 <= b && b < this.h) {
    return Mf.call(null, this) <= b ? (a = sb.call(null, this.N), a[b & 31] = c, new X(this.l, this.h, this.shift, this.root, a, null)) : new X(this.l, this.h, this.shift, Vf.call(null, this, this.shift, this.root, b, c), this.N, null);
  }
  if (b === this.h) {
    return Db.call(null, this, c);
  }
  throw Error("Index " + x.a(b) + " out of bounds  [0," + x.a(this.h) + "]");
};
h.B = function() {
  return this.l;
};
h.Q = function() {
  return this.h;
};
h.Pc = function() {
  return A.call(null, this, 0);
};
h.Qc = function() {
  return A.call(null, this, 1);
};
h.sb = function() {
  return 0 < this.h ? A.call(null, this, this.h - 1) : null;
};
h.tb = function() {
  if (0 === this.h) {
    throw Error("Can't pop empty vector");
  }
  if (1 === this.h) {
    return bc.call(null, xd, this.l);
  }
  if (1 < this.h - Mf.call(null, this)) {
    return new X(this.l, this.h - 1, this.shift, this.root, this.N.slice(0, -1), null);
  }
  var a = Sf.call(null, this, this.h - 2), b = Xf.call(null, this, this.shift, this.root), b = null == b ? Y : b, c = this.h - 1;
  return 5 < this.shift && null == Jf.call(null, b, 1) ? new X(this.l, c, this.shift - 5, Jf.call(null, b, 0), a, null) : new X(this.l, c, this.shift, b, a, null);
};
h.rc = function() {
  return 0 < this.h ? new pd(this, this.h - 1, null) : null;
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.cc = function() {
  return new Yf(this.h, this.shift, Zf.call(null, this.root), $f.call(null, this.N));
};
h.U = function() {
  return sd.call(null, xd, this.l);
};
h.$ = function(a, b) {
  return ld.call(null, this, b);
};
h.aa = function(a, b, c) {
  a = 0;
  for (var d = c;;) {
    if (a < this.h) {
      var e = Sf.call(null, this, a);
      c = e.length;
      a: {
        for (var f = 0;;) {
          if (f < c) {
            d = b.call(null, d, e[f]);
            if (kd.call(null, d)) {
              e = d;
              break a;
            }
            f += 1;
          } else {
            e = d;
            break a;
          }
        }
        e = void 0;
      }
      if (kd.call(null, e)) {
        return N.call(null, e);
      }
      a += c;
      d = e;
    } else {
      return d;
    }
  }
};
h.Fa = function(a, b, c) {
  if ("number" === typeof b) {
    return Xb.call(null, this, b, c);
  }
  throw Error("Vector's key for assoc must be a number.");
};
h.M = function() {
  return 0 === this.h ? null : 32 >= this.h ? new cd(this.N, 0) : ag.call(null, this, Rf.call(null, this), 0, 0);
};
h.D = function(a, b) {
  return new X(b, this.h, this.shift, this.root, this.N, this.n);
};
h.P = function(a, b) {
  if (32 > this.h - Mf.call(null, this)) {
    for (var c = this.N.length, d = Array(c + 1), e = 0;;) {
      if (e < c) {
        d[e] = this.N[e], e += 1;
      } else {
        break;
      }
    }
    d[c] = b;
    return new X(this.l, this.h + 1, this.shift, this.root, d, null);
  }
  c = (d = this.h >>> 5 > 1 << this.shift) ? this.shift + 5 : this.shift;
  d ? (d = If.call(null, null), Kf.call(null, d, 0, this.root), Kf.call(null, d, 1, Nf.call(null, null, this.shift, new Hf(null, this.N)))) : d = Pf.call(null, this, this.shift, this.root, new Hf(null, this.N));
  return new X(this.l, this.h + 1, c, d, [b], null);
};
h.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.ta(null, c);
      case 3:
        return this.ua(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.j = function(a, c) {
    return this.ta(null, c);
  };
  a.q = function(a, c, d) {
    return this.ua(null, c, d);
  };
  return a;
}();
h.apply = function(a, b) {
  return this.call.apply(this, [this].concat(sb.call(null, b)));
};
h.a = function(a) {
  return this.ta(null, a);
};
h.j = function(a, b) {
  return this.ua(null, a, b);
};
var Y = new Hf(null, [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]), xd = new X(null, 0, 5, Y, [], 0);
function bg(a) {
  return xc.call(null, ub.call(null, wc, vc.call(null, xd), a));
}
var cg = function() {
  function a(a) {
    var d = null;
    0 < arguments.length && (d = M(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, d);
  }
  function b(a) {
    if (a instanceof cd && 0 === a.t) {
      a: {
        a = a.b;
        var b = a.length;
        if (32 > b) {
          a = new X(null, b, 5, Y, a, null);
        } else {
          for (var e = 32, f = vc.call(null, new X(null, 32, 5, Y, a.slice(0, 32), null));;) {
            if (e < b) {
              var g = e + 1, f = Ve.call(null, f, a[e]), e = g
            } else {
              a = Ue.call(null, f);
              break a;
            }
          }
          a = void 0;
        }
      }
    } else {
      a = bg.call(null, a);
    }
    return a;
  }
  a.k = 0;
  a.e = function(a) {
    a = E(a);
    return b(a);
  };
  a.c = b;
  return a;
}();
function dg(a, b, c, d, e, f) {
  this.Ea = a;
  this.jb = b;
  this.t = c;
  this.fa = d;
  this.l = e;
  this.n = f;
  this.g = 32375020;
  this.o = 1536;
}
h = dg.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.B = function() {
  return this.l;
};
h.Aa = function() {
  if (this.fa + 1 < this.jb.length) {
    var a = ag.call(null, this.Ea, this.jb, this.t, this.fa + 1);
    return null == a ? null : a;
  }
  return Ec.call(null, this);
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return sd.call(null, xd, this.l);
};
h.$ = function(a, b) {
  return ld.call(null, eg.call(null, this.Ea, this.t + this.fa, P.call(null, this.Ea)), b);
};
h.aa = function(a, b, c) {
  return ld.call(null, eg.call(null, this.Ea, this.t + this.fa, P.call(null, this.Ea)), b, c);
};
h.ga = function() {
  return this.jb[this.fa];
};
h.ha = function() {
  if (this.fa + 1 < this.jb.length) {
    var a = ag.call(null, this.Ea, this.jb, this.t, this.fa + 1);
    return null == a ? dd : a;
  }
  return Dc.call(null, this);
};
h.M = function() {
  return this;
};
h.Bd = function() {
  return Ge.call(null, this.jb, this.fa);
};
h.Cd = function() {
  var a = this.t + this.jb.length;
  return a < Ab.call(null, this.Ea) ? ag.call(null, this.Ea, Sf.call(null, this.Ea, a), a, 0) : dd;
};
h.D = function(a, b) {
  return ag.call(null, this.Ea, this.jb, this.t, this.fa, b);
};
h.P = function(a, b) {
  return O.call(null, b, this);
};
h.Ad = function() {
  var a = this.t + this.jb.length;
  return a < Ab.call(null, this.Ea) ? ag.call(null, this.Ea, Sf.call(null, this.Ea, a), a, 0) : null;
};
var ag = function() {
  function a(a, b, c, d, m) {
    return new dg(a, b, c, d, m, null);
  }
  function b(a, b, c, d) {
    return new dg(a, b, c, d, null, null);
  }
  function c(a, b, c) {
    return new dg(a, Tf.call(null, a, b), b, c, null, null);
  }
  var d = null, d = function(d, f, g, l, m) {
    switch(arguments.length) {
      case 3:
        return c.call(this, d, f, g);
      case 4:
        return b.call(this, d, f, g, l);
      case 5:
        return a.call(this, d, f, g, l, m);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.q = c;
  d.W = b;
  d.Qa = a;
  return d;
}();
function fg(a, b, c, d, e) {
  this.l = a;
  this.nb = b;
  this.start = c;
  this.end = d;
  this.n = e;
  this.g = 166617887;
  this.o = 8192;
}
h = fg.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.A = function(a, b) {
  return Lb.call(null, this, b, null);
};
h.G = function(a, b, c) {
  return "number" === typeof b ? A.call(null, this, b, c) : c;
};
h.ta = function(a, b) {
  return 0 > b || this.end <= this.start + b ? Qf.call(null, b, this.end - this.start) : A.call(null, this.nb, this.start + b);
};
h.ua = function(a, b, c) {
  return 0 > b || this.end <= this.start + b ? c : A.call(null, this.nb, this.start + b, c);
};
h.Bb = function(a, b, c) {
  var d = this, e = d.start + b;
  return gg.call(null, d.l, T.call(null, d.nb, e, c), d.start, function() {
    var a = d.end, b = e + 1;
    return a > b ? a : b;
  }(), null);
};
h.B = function() {
  return this.l;
};
h.Q = function() {
  return this.end - this.start;
};
h.sb = function() {
  return A.call(null, this.nb, this.end - 1);
};
h.tb = function() {
  if (this.start === this.end) {
    throw Error("Can't pop empty vector");
  }
  return gg.call(null, this.l, this.nb, this.start, this.end - 1, null);
};
h.rc = function() {
  return this.start !== this.end ? new pd(this, this.end - this.start - 1, null) : null;
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return sd.call(null, xd, this.l);
};
h.$ = function(a, b) {
  return ld.call(null, this, b);
};
h.aa = function(a, b, c) {
  return ld.call(null, this, b, c);
};
h.Fa = function(a, b, c) {
  if ("number" === typeof b) {
    return Xb.call(null, this, b, c);
  }
  throw Error("Subvec's key for assoc must be a number.");
};
h.M = function() {
  var a = this;
  return function(b) {
    return function d(e) {
      return e === a.end ? null : O.call(null, A.call(null, a.nb, e), new Be(null, function() {
        return function() {
          return d.call(null, e + 1);
        };
      }(b), null, null));
    };
  }(this).call(null, a.start);
};
h.D = function(a, b) {
  return gg.call(null, b, this.nb, this.start, this.end, this.n);
};
h.P = function(a, b) {
  return gg.call(null, this.l, Xb.call(null, this.nb, this.end, b), this.start, this.end + 1, null);
};
h.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.ta(null, c);
      case 3:
        return this.ua(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.j = function(a, c) {
    return this.ta(null, c);
  };
  a.q = function(a, c, d) {
    return this.ua(null, c, d);
  };
  return a;
}();
h.apply = function(a, b) {
  return this.call.apply(this, [this].concat(sb.call(null, b)));
};
h.a = function(a) {
  return this.ta(null, a);
};
h.j = function(a, b) {
  return this.ua(null, a, b);
};
function gg(a, b, c, d, e) {
  for (;;) {
    if (b instanceof fg) {
      c = b.start + c, d = b.start + d, b = b.nb;
    } else {
      var f = P.call(null, b);
      if (0 > c || 0 > d || c > f || d > f) {
        throw Error("Index out of bounds");
      }
      return new fg(a, b, c, d, e);
    }
  }
}
var eg = function() {
  function a(a, b, c) {
    return gg.call(null, null, a, b, c, null);
  }
  function b(a, b) {
    return c.call(null, a, b, P.call(null, a));
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}();
function hg(a, b) {
  return a === b.R ? b : new Hf(a, sb.call(null, b.b));
}
function Zf(a) {
  return new Hf({}, sb.call(null, a.b));
}
function $f(a) {
  var b = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
  Sd.call(null, a, 0, b, 0, a.length);
  return b;
}
var jg = function ig(b, c, d, e) {
  var f = hg.call(null, b.root.R, d), g = b.h - 1 >>> c & 31;
  Kf.call(null, f, g, 5 === c ? e : function() {
    var d = Jf.call(null, f, g);
    return null != d ? ig.call(null, b, c - 5, d, e) : Nf.call(null, b.root.R, c - 5, e);
  }());
  return f;
};
function Yf(a, b, c, d) {
  this.h = a;
  this.shift = b;
  this.root = c;
  this.N = d;
  this.g = 275;
  this.o = 88;
}
h = Yf.prototype;
h.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.A(null, c);
      case 3:
        return this.G(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.j = function(a, c) {
    return this.A(null, c);
  };
  a.q = function(a, c, d) {
    return this.G(null, c, d);
  };
  return a;
}();
h.apply = function(a, b) {
  return this.call.apply(this, [this].concat(sb.call(null, b)));
};
h.a = function(a) {
  return this.A(null, a);
};
h.j = function(a, b) {
  return this.G(null, a, b);
};
h.A = function(a, b) {
  return Lb.call(null, this, b, null);
};
h.G = function(a, b, c) {
  return "number" === typeof b ? A.call(null, this, b, c) : c;
};
h.ta = function(a, b) {
  if (this.root.R) {
    return Tf.call(null, this, b)[b & 31];
  }
  throw Error("nth after persistent!");
};
h.ua = function(a, b, c) {
  return 0 <= b && b < this.h ? A.call(null, this, b) : c;
};
h.Q = function() {
  if (this.root.R) {
    return this.h;
  }
  throw Error("count after persistent!");
};
h.se = function(a, b, c) {
  var d = this;
  if (d.root.R) {
    if (0 <= b && b < d.h) {
      return Mf.call(null, this) <= b ? d.N[b & 31] = c : (a = function() {
        return function f(a, l) {
          var m = hg.call(null, d.root.R, l);
          if (0 === a) {
            Kf.call(null, m, b & 31, c);
          } else {
            var p = b >>> a & 31;
            Kf.call(null, m, p, f.call(null, a - 5, Jf.call(null, m, p)));
          }
          return m;
        };
      }(this).call(null, d.shift, d.root), d.root = a), this;
    }
    if (b === d.h) {
      return wc.call(null, this, c);
    }
    throw Error("Index " + x.a(b) + " out of bounds for TransientVector of length" + x.a(d.h));
  }
  throw Error("assoc! after persistent!");
};
h.Sc = function(a, b, c) {
  if ("number" === typeof b) {
    return zc.call(null, this, b, c);
  }
  throw Error("TransientVector's key for assoc! must be a number.");
};
h.tc = function(a, b) {
  if (this.root.R) {
    if (32 > this.h - Mf.call(null, this)) {
      this.N[this.h & 31] = b;
    } else {
      var c = new Hf(this.root.R, this.N), d = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
      d[0] = b;
      this.N = d;
      if (this.h >>> 5 > 1 << this.shift) {
        var d = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], e = this.shift + 5;
        d[0] = this.root;
        d[1] = Nf.call(null, this.root.R, this.shift, c);
        this.root = new Hf(this.root.R, d);
        this.shift = e;
      } else {
        this.root = jg.call(null, this, this.shift, this.root, c);
      }
    }
    this.h += 1;
    return this;
  }
  throw Error("conj! after persistent!");
};
h.uc = function() {
  if (this.root.R) {
    this.root.R = null;
    var a = this.h - Mf.call(null, this), b = Array(a);
    Sd.call(null, this.N, 0, b, 0, a);
    return new X(null, this.h, this.shift, this.root, b, null);
  }
  throw Error("persistent! called twice");
};
function kg(a, b, c, d) {
  this.l = a;
  this.wa = b;
  this.Xa = c;
  this.n = d;
  this.o = 0;
  this.g = 31850572;
}
h = kg.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.B = function() {
  return this.l;
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return sd.call(null, dd, this.l);
};
h.ga = function() {
  return F.call(null, this.wa);
};
h.ha = function() {
  var a = L.call(null, this.wa);
  return a ? new kg(this.l, a, this.Xa, null) : null == this.Xa ? Bb.call(null, this) : new kg(this.l, this.Xa, null, null);
};
h.M = function() {
  return this;
};
h.D = function(a, b) {
  return new kg(b, this.wa, this.Xa, this.n);
};
h.P = function(a, b) {
  return O.call(null, b, this);
};
function lg(a, b, c, d, e) {
  this.l = a;
  this.count = b;
  this.wa = c;
  this.Xa = d;
  this.n = e;
  this.g = 31858766;
  this.o = 8192;
}
h = lg.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.B = function() {
  return this.l;
};
h.Q = function() {
  return this.count;
};
h.sb = function() {
  return F.call(null, this.wa);
};
h.tb = function() {
  if (t(this.wa)) {
    var a = L.call(null, this.wa);
    return a ? new lg(this.l, this.count - 1, a, this.Xa, null) : new lg(this.l, this.count - 1, E.call(null, this.Xa), xd, null);
  }
  return this;
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return mg;
};
h.ga = function() {
  return F.call(null, this.wa);
};
h.ha = function() {
  return H.call(null, E.call(null, this));
};
h.M = function() {
  var a = E.call(null, this.Xa), b = this.wa;
  return t(t(b) ? b : a) ? new kg(null, this.wa, E.call(null, a), null) : null;
};
h.D = function(a, b) {
  return new lg(b, this.count, this.wa, this.Xa, this.n);
};
h.P = function(a, b) {
  var c;
  t(this.wa) ? (c = this.Xa, c = new lg(this.l, this.count + 1, this.wa, yd.call(null, t(c) ? c : xd, b), null)) : c = new lg(this.l, this.count + 1, yd.call(null, this.wa, b), xd, null);
  return c;
};
var mg = new lg(null, 0, null, xd, 0);
function ng() {
  this.o = 0;
  this.g = 2097152;
}
ng.prototype.C = function() {
  return!1;
};
var og = new ng;
function pg(a, b) {
  return Wd.call(null, Od.call(null, b) ? P.call(null, a) === P.call(null, b) ? $e.call(null, be, qf.call(null, function(a) {
    return B.call(null, S.call(null, b, F.call(null, a), og), ud.call(null, a));
  }, a)) : null : null);
}
function qg(a) {
  for (var b = a.length, c = 0;;) {
    if (b <= c) {
      return-1;
    }
    if (null == a[c]) {
      return c;
    }
    c += 2;
  }
}
function rg(a, b, c) {
  b = a.length;
  c = c.ea;
  for (var d = 0;;) {
    if (b <= d) {
      return-1;
    }
    var e = a[d];
    if (e instanceof s && c === e.ea) {
      return d;
    }
    d += 2;
  }
}
function sg(a, b, c) {
  b = a.length;
  c = c.yb;
  for (var d = 0;;) {
    if (b <= d) {
      return-1;
    }
    var e = a[d];
    if (e instanceof D && c === e.yb) {
      return d;
    }
    d += 2;
  }
}
function tg(a, b, c) {
  b = a.length;
  for (var d = 0;;) {
    if (b <= d) {
      return-1;
    }
    if (c === a[d]) {
      return d;
    }
    d += 2;
  }
}
function ug(a, b, c) {
  b = a.length;
  for (var d = 0;;) {
    if (b <= d) {
      return-1;
    }
    if (B.call(null, c, a[d])) {
      return d;
    }
    d += 2;
  }
}
function vg(a, b) {
  var c = a.b;
  return b instanceof s ? rg.call(null, c, 0, b) : ia(b) || "number" === typeof b ? tg.call(null, c, 0, b) : b instanceof D ? sg.call(null, c, 0, b) : null == b ? qg.call(null, c) : ug.call(null, c, 0, b);
}
function wg(a, b, c) {
  a = a.b;
  for (var d = a.length, e = Array(d + 2), f = 0;;) {
    if (f < d) {
      e[f] = a[f], f += 1;
    } else {
      break;
    }
  }
  e[d] = b;
  e[d + 1] = c;
  return e;
}
function xg(a, b, c) {
  this.b = a;
  this.t = b;
  this.qa = c;
  this.o = 0;
  this.g = 32374990;
}
h = xg.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.B = function() {
  return this.qa;
};
h.Aa = function() {
  return this.t < this.b.length - 2 ? new xg(this.b, this.t + 2, this.qa) : null;
};
h.Q = function() {
  return(this.b.length - this.t) / 2;
};
h.F = function() {
  return fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return sd.call(null, dd, this.qa);
};
h.$ = function(a, b) {
  return td.call(null, b, this);
};
h.aa = function(a, b, c) {
  return td.call(null, b, c, this);
};
h.ga = function() {
  return new X(null, 2, 5, Y, [this.b[this.t], this.b[this.t + 1]], null);
};
h.ha = function() {
  return this.t < this.b.length - 2 ? new xg(this.b, this.t + 2, this.qa) : dd;
};
h.M = function() {
  return this;
};
h.D = function(a, b) {
  return new xg(this.b, this.t, b);
};
h.P = function(a, b) {
  return O.call(null, b, this);
};
function yg(a, b, c) {
  return b <= a.length - 2 ? new xg(a, b, c) : null;
}
function n(a, b, c, d) {
  this.l = a;
  this.h = b;
  this.b = c;
  this.n = d;
  this.g = 16647951;
  this.o = 8196;
}
h = n.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.get = function(a) {
  return this.A(null, a);
};
h.forEach = function(a) {
  for (var b = E.call(null, this), c = null, d = 0, e = 0;;) {
    if (e < d) {
      var f = A.call(null, c, e), g = R.call(null, f, 0, null), f = R.call(null, f, 1, null);
      a.call(null, f, g);
      e += 1;
    } else {
      if (b = E.call(null, b)) {
        Qd.call(null, b) ? (c = Le.call(null, b), b = Me.call(null, b), g = c, d = P.call(null, c), c = g) : (c = F.call(null, b), g = R.call(null, c, 0, null), f = R.call(null, c, 1, null), a.call(null, f, g), b = L.call(null, b), c = null, d = 0), e = 0;
      } else {
        return null;
      }
    }
  }
};
h.A = function(a, b) {
  return Lb.call(null, this, b, null);
};
h.G = function(a, b, c) {
  a = vg.call(null, this, b);
  return-1 === a ? c : this.b[a + 1];
};
h.qc = function(a, b, c) {
  a = this.b.length;
  for (var d = 0;;) {
    if (d < a) {
      c = b.call(null, c, this.b[d], this.b[d + 1]);
      if (kd.call(null, c)) {
        return N.call(null, c);
      }
      d += 2;
    } else {
      return c;
    }
  }
};
h.B = function() {
  return this.l;
};
h.Q = function() {
  return this.h;
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = gd.call(null, this);
};
h.C = function(a, b) {
  return pg.call(null, this, b);
};
h.cc = function() {
  return new zg({}, this.b.length, sb.call(null, this.b));
};
h.U = function() {
  return bc.call(null, Ag, this.l);
};
h.$ = function(a, b) {
  return td.call(null, b, this);
};
h.aa = function(a, b, c) {
  return td.call(null, b, c, this);
};
h.rb = function(a, b) {
  if (0 <= vg.call(null, this, b)) {
    var c = this.b.length, d = c - 2;
    if (0 === d) {
      return Bb.call(null, this);
    }
    for (var d = Array(d), e = 0, f = 0;;) {
      if (e >= c) {
        return new n(this.l, this.h - 1, d, null);
      }
      B.call(null, b, this.b[e]) || (d[f] = this.b[e], d[f + 1] = this.b[e + 1], f += 2);
      e += 2;
    }
  } else {
    return this;
  }
};
h.Fa = function(a, b, c) {
  a = vg.call(null, this, b);
  if (-1 === a) {
    return this.h < Bg ? (c = wg.call(null, this, b, c), new n(this.l, this.h + 1, c, null)) : bc.call(null, Nb.call(null, zf.call(null, Cg, this), b, c), this.l);
  }
  if (c === this.b[a + 1]) {
    return this;
  }
  b = sb.call(null, this.b);
  b[a + 1] = c;
  return new n(this.l, this.h, b, null);
};
h.Nc = function(a, b) {
  return-1 !== vg.call(null, this, b);
};
h.M = function() {
  return yg.call(null, this.b, 0, null);
};
h.D = function(a, b) {
  return new n(b, this.h, this.b, this.n);
};
h.P = function(a, b) {
  if (Pd.call(null, b)) {
    return Nb.call(null, this, A.call(null, b, 0), A.call(null, b, 1));
  }
  for (var c = this, d = E.call(null, b);;) {
    if (null == d) {
      return c;
    }
    var e = F.call(null, d);
    if (Pd.call(null, e)) {
      c = Nb.call(null, c, A.call(null, e, 0), A.call(null, e, 1)), d = L.call(null, d);
    } else {
      throw Error("conj on a map takes map entries or seqables of map entries");
    }
  }
};
h.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.A(null, c);
      case 3:
        return this.G(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.j = function(a, c) {
    return this.A(null, c);
  };
  a.q = function(a, c, d) {
    return this.G(null, c, d);
  };
  return a;
}();
h.apply = function(a, b) {
  return this.call.apply(this, [this].concat(sb.call(null, b)));
};
h.a = function(a) {
  return this.A(null, a);
};
h.j = function(a, b) {
  return this.G(null, a, b);
};
var Ag = new n(null, 0, [], null), Bg = 8;
function Dg(a) {
  for (var b = a.length, c = 0, d = Te.call(null, Ag);;) {
    if (c < b) {
      var e = c + 2, d = yc.call(null, d, a[c], a[c + 1]), c = e
    } else {
      return xc.call(null, d);
    }
  }
}
function zg(a, b, c) {
  this.Rb = a;
  this.Vb = b;
  this.b = c;
  this.o = 56;
  this.g = 258;
}
h = zg.prototype;
h.Sc = function(a, b, c) {
  if (t(this.Rb)) {
    a = vg.call(null, this, b);
    if (-1 === a) {
      return this.Vb + 2 <= 2 * Bg ? (this.Vb += 2, this.b.push(b), this.b.push(c), this) : We.call(null, Eg.call(null, this.Vb, this.b), b, c);
    }
    c !== this.b[a + 1] && (this.b[a + 1] = c);
    return this;
  }
  throw Error("assoc! after persistent!");
};
h.tc = function(a, b) {
  if (t(this.Rb)) {
    if (b ? b.g & 2048 || b.sf || (b.g ? 0 : v.call(null, Qb, b)) : v.call(null, Qb, b)) {
      return yc.call(null, this, oe.call(null, b), pe.call(null, b));
    }
    for (var c = E.call(null, b), d = this;;) {
      var e = F.call(null, c);
      if (t(e)) {
        c = L.call(null, c), d = yc.call(null, d, oe.call(null, e), pe.call(null, e));
      } else {
        return d;
      }
    }
  } else {
    throw Error("conj! after persistent!");
  }
};
h.uc = function() {
  if (t(this.Rb)) {
    return this.Rb = !1, new n(null, he.call(null, this.Vb, 2), this.b, null);
  }
  throw Error("persistent! called twice");
};
h.A = function(a, b) {
  return Lb.call(null, this, b, null);
};
h.G = function(a, b, c) {
  if (t(this.Rb)) {
    return a = vg.call(null, this, b), -1 === a ? c : this.b[a + 1];
  }
  throw Error("lookup after persistent!");
};
h.Q = function() {
  if (t(this.Rb)) {
    return he.call(null, this.Vb, 2);
  }
  throw Error("count after persistent!");
};
function Eg(a, b) {
  for (var c = Te.call(null, Cg), d = 0;;) {
    if (d < a) {
      c = We.call(null, c, b[d], b[d + 1]), d += 2;
    } else {
      return c;
    }
  }
}
function Fg() {
  this.m = !1;
}
function Gg(a, b) {
  return a === b ? !0 : xe.call(null, a, b) ? !0 : B.call(null, a, b);
}
var Hg = function() {
  function a(a, b, c, g, l) {
    a = sb.call(null, a);
    a[b] = c;
    a[g] = l;
    return a;
  }
  function b(a, b, c) {
    a = sb.call(null, a);
    a[b] = c;
    return a;
  }
  var c = null, c = function(c, e, f, g, l) {
    switch(arguments.length) {
      case 3:
        return b.call(this, c, e, f);
      case 5:
        return a.call(this, c, e, f, g, l);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.q = b;
  c.Qa = a;
  return c;
}();
function Ig(a, b) {
  var c = Array(a.length - 2);
  Sd.call(null, a, 0, c, 0, 2 * b);
  Sd.call(null, a, 2 * (b + 1), c, 2 * b, c.length - 2 * b);
  return c;
}
function Jg(a, b) {
  return ke.call(null, a & b - 1);
}
var Kg = function() {
  function a(a, b, c, g, l, m) {
    a = a.Sb(b);
    a.b[c] = g;
    a.b[l] = m;
    return a;
  }
  function b(a, b, c, g) {
    a = a.Sb(b);
    a.b[c] = g;
    return a;
  }
  var c = null, c = function(c, e, f, g, l, m) {
    switch(arguments.length) {
      case 4:
        return b.call(this, c, e, f, g);
      case 6:
        return a.call(this, c, e, f, g, l, m);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.W = b;
  c.qb = a;
  return c;
}();
function Lg(a, b, c) {
  for (var d = a.length, e = 0;;) {
    if (e < d) {
      var f = a[e];
      null != f ? c = b.call(null, c, f, a[e + 1]) : (f = a[e + 1], c = null != f ? f.Gb(b, c) : c);
      if (kd.call(null, c)) {
        return N.call(null, c);
      }
      e += 2;
    } else {
      return c;
    }
  }
}
function Mg(a, b, c) {
  this.R = a;
  this.T = b;
  this.b = c;
}
h = Mg.prototype;
h.Sb = function(a) {
  if (a === this.R) {
    return this;
  }
  var b = ke.call(null, this.T), c = Array(0 > b ? 4 : 2 * (b + 1));
  Sd.call(null, this.b, 0, c, 0, 2 * b);
  return new Mg(a, this.T, c);
};
h.yc = function() {
  return Ng.call(null, this.b);
};
h.Gb = function(a, b) {
  return Lg.call(null, this.b, a, b);
};
h.vb = function(a, b, c, d) {
  var e = 1 << (b >>> a & 31);
  if (0 === (this.T & e)) {
    return d;
  }
  var f = Jg.call(null, this.T, e), e = this.b[2 * f], f = this.b[2 * f + 1];
  return null == e ? f.vb(a + 5, b, c, d) : Gg.call(null, c, e) ? f : d;
};
h.Ma = function(a, b, c, d, e, f) {
  var g = 1 << (c >>> b & 31), l = Jg.call(null, this.T, g);
  if (0 === (this.T & g)) {
    var m = ke.call(null, this.T);
    if (2 * m < this.b.length) {
      return a = this.Sb(a), b = a.b, f.m = !0, Td.call(null, b, 2 * l, b, 2 * (l + 1), 2 * (m - l)), b[2 * l] = d, b[2 * l + 1] = e, a.T |= g, a;
    }
    if (16 <= m) {
      l = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
      l[c >>> b & 31] = Og.Ma(a, b + 5, c, d, e, f);
      for (e = d = 0;;) {
        if (32 > d) {
          0 !== (this.T >>> d & 1) && (l[d] = null != this.b[e] ? Og.Ma(a, b + 5, Xc.call(null, this.b[e]), this.b[e], this.b[e + 1], f) : this.b[e + 1], e += 2), d += 1;
        } else {
          break;
        }
      }
      return new Pg(a, m + 1, l);
    }
    b = Array(2 * (m + 4));
    Sd.call(null, this.b, 0, b, 0, 2 * l);
    b[2 * l] = d;
    b[2 * l + 1] = e;
    Sd.call(null, this.b, 2 * l, b, 2 * (l + 1), 2 * (m - l));
    f.m = !0;
    a = this.Sb(a);
    a.b = b;
    a.T |= g;
    return a;
  }
  m = this.b[2 * l];
  g = this.b[2 * l + 1];
  if (null == m) {
    return m = g.Ma(a, b + 5, c, d, e, f), m === g ? this : Kg.call(null, this, a, 2 * l + 1, m);
  }
  if (Gg.call(null, d, m)) {
    return e === g ? this : Kg.call(null, this, a, 2 * l + 1, e);
  }
  f.m = !0;
  return Kg.call(null, this, a, 2 * l, null, 2 * l + 1, Qg.call(null, a, b + 5, m, g, c, d, e));
};
h.La = function(a, b, c, d, e) {
  var f = 1 << (b >>> a & 31), g = Jg.call(null, this.T, f);
  if (0 === (this.T & f)) {
    var l = ke.call(null, this.T);
    if (16 <= l) {
      g = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
      g[b >>> a & 31] = Og.La(a + 5, b, c, d, e);
      for (d = c = 0;;) {
        if (32 > c) {
          0 !== (this.T >>> c & 1) && (g[c] = null != this.b[d] ? Og.La(a + 5, Xc.call(null, this.b[d]), this.b[d], this.b[d + 1], e) : this.b[d + 1], d += 2), c += 1;
        } else {
          break;
        }
      }
      return new Pg(null, l + 1, g);
    }
    a = Array(2 * (l + 1));
    Sd.call(null, this.b, 0, a, 0, 2 * g);
    a[2 * g] = c;
    a[2 * g + 1] = d;
    Sd.call(null, this.b, 2 * g, a, 2 * (g + 1), 2 * (l - g));
    e.m = !0;
    return new Mg(null, this.T | f, a);
  }
  l = this.b[2 * g];
  f = this.b[2 * g + 1];
  if (null == l) {
    return l = f.La(a + 5, b, c, d, e), l === f ? this : new Mg(null, this.T, Hg.call(null, this.b, 2 * g + 1, l));
  }
  if (Gg.call(null, c, l)) {
    return d === f ? this : new Mg(null, this.T, Hg.call(null, this.b, 2 * g + 1, d));
  }
  e.m = !0;
  return new Mg(null, this.T, Hg.call(null, this.b, 2 * g, null, 2 * g + 1, Qg.call(null, a + 5, l, f, b, c, d)));
};
h.zc = function(a, b, c) {
  var d = 1 << (b >>> a & 31);
  if (0 === (this.T & d)) {
    return this;
  }
  var e = Jg.call(null, this.T, d), f = this.b[2 * e], g = this.b[2 * e + 1];
  return null == f ? (a = g.zc(a + 5, b, c), a === g ? this : null != a ? new Mg(null, this.T, Hg.call(null, this.b, 2 * e + 1, a)) : this.T === d ? null : new Mg(null, this.T ^ d, Ig.call(null, this.b, e))) : Gg.call(null, c, f) ? new Mg(null, this.T ^ d, Ig.call(null, this.b, e)) : this;
};
var Og = new Mg(null, 0, []);
function Rg(a, b, c) {
  var d = a.b, e = d.length;
  a = Array(2 * (a.h - 1));
  for (var f = 0, g = 1, l = 0;;) {
    if (f < e) {
      f !== c && null != d[f] && (a[g] = d[f], g += 2, l |= 1 << f), f += 1;
    } else {
      return new Mg(b, l, a);
    }
  }
}
function Pg(a, b, c) {
  this.R = a;
  this.h = b;
  this.b = c;
}
h = Pg.prototype;
h.Sb = function(a) {
  return a === this.R ? this : new Pg(a, this.h, sb.call(null, this.b));
};
h.yc = function() {
  return Sg.call(null, this.b);
};
h.Gb = function(a, b) {
  for (var c = this.b.length, d = 0, e = b;;) {
    if (d < c) {
      var f = this.b[d];
      if (null != f && (e = f.Gb(a, e), kd.call(null, e))) {
        return N.call(null, e);
      }
      d += 1;
    } else {
      return e;
    }
  }
};
h.vb = function(a, b, c, d) {
  var e = this.b[b >>> a & 31];
  return null != e ? e.vb(a + 5, b, c, d) : d;
};
h.Ma = function(a, b, c, d, e, f) {
  var g = c >>> b & 31, l = this.b[g];
  if (null == l) {
    return a = Kg.call(null, this, a, g, Og.Ma(a, b + 5, c, d, e, f)), a.h += 1, a;
  }
  b = l.Ma(a, b + 5, c, d, e, f);
  return b === l ? this : Kg.call(null, this, a, g, b);
};
h.La = function(a, b, c, d, e) {
  var f = b >>> a & 31, g = this.b[f];
  if (null == g) {
    return new Pg(null, this.h + 1, Hg.call(null, this.b, f, Og.La(a + 5, b, c, d, e)));
  }
  a = g.La(a + 5, b, c, d, e);
  return a === g ? this : new Pg(null, this.h, Hg.call(null, this.b, f, a));
};
h.zc = function(a, b, c) {
  var d = b >>> a & 31, e = this.b[d];
  return null != e ? (a = e.zc(a + 5, b, c), a === e ? this : null == a ? 8 >= this.h ? Rg.call(null, this, null, d) : new Pg(null, this.h - 1, Hg.call(null, this.b, d, a)) : new Pg(null, this.h, Hg.call(null, this.b, d, a))) : this;
};
function Tg(a, b, c) {
  b *= 2;
  for (var d = 0;;) {
    if (d < b) {
      if (Gg.call(null, c, a[d])) {
        return d;
      }
      d += 2;
    } else {
      return-1;
    }
  }
}
function Ug(a, b, c, d) {
  this.R = a;
  this.cb = b;
  this.h = c;
  this.b = d;
}
h = Ug.prototype;
h.Sb = function(a) {
  if (a === this.R) {
    return this;
  }
  var b = Array(2 * (this.h + 1));
  Sd.call(null, this.b, 0, b, 0, 2 * this.h);
  return new Ug(a, this.cb, this.h, b);
};
h.yc = function() {
  return Ng.call(null, this.b);
};
h.Gb = function(a, b) {
  return Lg.call(null, this.b, a, b);
};
h.vb = function(a, b, c, d) {
  a = Tg.call(null, this.b, this.h, c);
  return 0 > a ? d : Gg.call(null, c, this.b[a]) ? this.b[a + 1] : d;
};
h.Ma = function(a, b, c, d, e, f) {
  if (c === this.cb) {
    b = Tg.call(null, this.b, this.h, d);
    if (-1 === b) {
      if (this.b.length > 2 * this.h) {
        return a = Kg.call(null, this, a, 2 * this.h, d, 2 * this.h + 1, e), f.m = !0, a.h += 1, a;
      }
      c = this.b.length;
      b = Array(c + 2);
      Sd.call(null, this.b, 0, b, 0, c);
      b[c] = d;
      b[c + 1] = e;
      f.m = !0;
      f = this.h + 1;
      a === this.R ? (this.b = b, this.h = f, a = this) : a = new Ug(this.R, this.cb, f, b);
      return a;
    }
    return this.b[b + 1] === e ? this : Kg.call(null, this, a, b + 1, e);
  }
  return(new Mg(a, 1 << (this.cb >>> b & 31), [null, this, null, null])).Ma(a, b, c, d, e, f);
};
h.La = function(a, b, c, d, e) {
  return b === this.cb ? (a = Tg.call(null, this.b, this.h, c), -1 === a ? (a = 2 * this.h, b = Array(a + 2), Sd.call(null, this.b, 0, b, 0, a), b[a] = c, b[a + 1] = d, e.m = !0, new Ug(null, this.cb, this.h + 1, b)) : B.call(null, this.b[a], d) ? this : new Ug(null, this.cb, this.h, Hg.call(null, this.b, a + 1, d))) : (new Mg(null, 1 << (this.cb >>> a & 31), [null, this])).La(a, b, c, d, e);
};
h.zc = function(a, b, c) {
  a = Tg.call(null, this.b, this.h, c);
  return-1 === a ? this : 1 === this.h ? null : new Ug(null, this.cb, this.h - 1, Ig.call(null, this.b, he.call(null, a, 2)));
};
var Qg = function() {
  function a(a, b, c, g, l, m, p) {
    var q = Xc.call(null, c);
    if (q === l) {
      return new Ug(null, q, 2, [c, g, m, p]);
    }
    var r = new Fg;
    return Og.Ma(a, b, q, c, g, r).Ma(a, b, l, m, p, r);
  }
  function b(a, b, c, g, l, m) {
    var p = Xc.call(null, b);
    if (p === g) {
      return new Ug(null, p, 2, [b, c, l, m]);
    }
    var q = new Fg;
    return Og.La(a, p, b, c, q).La(a, g, l, m, q);
  }
  var c = null, c = function(c, e, f, g, l, m, p) {
    switch(arguments.length) {
      case 6:
        return b.call(this, c, e, f, g, l, m);
      case 7:
        return a.call(this, c, e, f, g, l, m, p);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.qb = b;
  c.Nb = a;
  return c;
}();
function Vg(a, b, c, d, e) {
  this.l = a;
  this.wb = b;
  this.t = c;
  this.V = d;
  this.n = e;
  this.o = 0;
  this.g = 32374860;
}
h = Vg.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.B = function() {
  return this.l;
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return sd.call(null, dd, this.l);
};
h.$ = function(a, b) {
  return td.call(null, b, this);
};
h.aa = function(a, b, c) {
  return td.call(null, b, c, this);
};
h.ga = function() {
  return null == this.V ? new X(null, 2, 5, Y, [this.wb[this.t], this.wb[this.t + 1]], null) : F.call(null, this.V);
};
h.ha = function() {
  return null == this.V ? Ng.call(null, this.wb, this.t + 2, null) : Ng.call(null, this.wb, this.t, L.call(null, this.V));
};
h.M = function() {
  return this;
};
h.D = function(a, b) {
  return new Vg(b, this.wb, this.t, this.V, this.n);
};
h.P = function(a, b) {
  return O.call(null, b, this);
};
var Ng = function() {
  function a(a, b, c) {
    if (null == c) {
      for (c = a.length;;) {
        if (b < c) {
          if (null != a[b]) {
            return new Vg(null, a, b, null, null);
          }
          var g = a[b + 1];
          if (t(g) && (g = g.yc(), t(g))) {
            return new Vg(null, a, b + 2, g, null);
          }
          b += 2;
        } else {
          return null;
        }
      }
    } else {
      return new Vg(null, a, b, c, null);
    }
  }
  function b(a) {
    return c.call(null, a, 0, null);
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.q = a;
  return c;
}();
function Wg(a, b, c, d, e) {
  this.l = a;
  this.wb = b;
  this.t = c;
  this.V = d;
  this.n = e;
  this.o = 0;
  this.g = 32374860;
}
h = Wg.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.B = function() {
  return this.l;
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return sd.call(null, dd, this.l);
};
h.$ = function(a, b) {
  return td.call(null, b, this);
};
h.aa = function(a, b, c) {
  return td.call(null, b, c, this);
};
h.ga = function() {
  return F.call(null, this.V);
};
h.ha = function() {
  return Sg.call(null, null, this.wb, this.t, L.call(null, this.V));
};
h.M = function() {
  return this;
};
h.D = function(a, b) {
  return new Wg(b, this.wb, this.t, this.V, this.n);
};
h.P = function(a, b) {
  return O.call(null, b, this);
};
var Sg = function() {
  function a(a, b, c, g) {
    if (null == g) {
      for (g = b.length;;) {
        if (c < g) {
          var l = b[c];
          if (t(l) && (l = l.yc(), t(l))) {
            return new Wg(a, b, c + 1, l, null);
          }
          c += 1;
        } else {
          return null;
        }
      }
    } else {
      return new Wg(a, b, c, g, null);
    }
  }
  function b(a) {
    return c.call(null, null, a, 0, null);
  }
  var c = null, c = function(c, e, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 4:
        return a.call(this, c, e, f, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.W = a;
  return c;
}();
function Xg(a, b, c, d, e, f) {
  this.l = a;
  this.h = b;
  this.root = c;
  this.ka = d;
  this.ya = e;
  this.n = f;
  this.g = 16123663;
  this.o = 8196;
}
h = Xg.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.get = function(a) {
  return this.A(null, a);
};
h.forEach = function(a) {
  for (var b = E.call(null, this), c = null, d = 0, e = 0;;) {
    if (e < d) {
      var f = A.call(null, c, e), g = R.call(null, f, 0, null), f = R.call(null, f, 1, null);
      a.call(null, f, g);
      e += 1;
    } else {
      if (b = E.call(null, b)) {
        Qd.call(null, b) ? (c = Le.call(null, b), b = Me.call(null, b), g = c, d = P.call(null, c), c = g) : (c = F.call(null, b), g = R.call(null, c, 0, null), f = R.call(null, c, 1, null), a.call(null, f, g), b = L.call(null, b), c = null, d = 0), e = 0;
      } else {
        return null;
      }
    }
  }
};
h.A = function(a, b) {
  return Lb.call(null, this, b, null);
};
h.G = function(a, b, c) {
  return null == b ? this.ka ? this.ya : c : null == this.root ? c : this.root.vb(0, Xc.call(null, b), b, c);
};
h.qc = function(a, b, c) {
  a = this.ka ? b.call(null, c, null, this.ya) : c;
  return kd.call(null, a) ? N.call(null, a) : null != this.root ? this.root.Gb(b, a) : a;
};
h.B = function() {
  return this.l;
};
h.Q = function() {
  return this.h;
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = gd.call(null, this);
};
h.C = function(a, b) {
  return pg.call(null, this, b);
};
h.cc = function() {
  return new Yg({}, this.root, this.h, this.ka, this.ya);
};
h.U = function() {
  return bc.call(null, Cg, this.l);
};
h.rb = function(a, b) {
  if (null == b) {
    return this.ka ? new Xg(this.l, this.h - 1, this.root, !1, null, null) : this;
  }
  if (null == this.root) {
    return this;
  }
  var c = this.root.zc(0, Xc.call(null, b), b);
  return c === this.root ? this : new Xg(this.l, this.h - 1, c, this.ka, this.ya, null);
};
h.Fa = function(a, b, c) {
  if (null == b) {
    return this.ka && c === this.ya ? this : new Xg(this.l, this.ka ? this.h : this.h + 1, this.root, !0, c, null);
  }
  a = new Fg;
  b = (null == this.root ? Og : this.root).La(0, Xc.call(null, b), b, c, a);
  return b === this.root ? this : new Xg(this.l, a.m ? this.h + 1 : this.h, b, this.ka, this.ya, null);
};
h.Nc = function(a, b) {
  return null == b ? this.ka : null == this.root ? !1 : this.root.vb(0, Xc.call(null, b), b, Ud) !== Ud;
};
h.M = function() {
  if (0 < this.h) {
    var a = null != this.root ? this.root.yc() : null;
    return this.ka ? O.call(null, new X(null, 2, 5, Y, [null, this.ya], null), a) : a;
  }
  return null;
};
h.D = function(a, b) {
  return new Xg(b, this.h, this.root, this.ka, this.ya, this.n);
};
h.P = function(a, b) {
  if (Pd.call(null, b)) {
    return Nb.call(null, this, A.call(null, b, 0), A.call(null, b, 1));
  }
  for (var c = this, d = E.call(null, b);;) {
    if (null == d) {
      return c;
    }
    var e = F.call(null, d);
    if (Pd.call(null, e)) {
      c = Nb.call(null, c, A.call(null, e, 0), A.call(null, e, 1)), d = L.call(null, d);
    } else {
      throw Error("conj on a map takes map entries or seqables of map entries");
    }
  }
};
h.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.A(null, c);
      case 3:
        return this.G(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.j = function(a, c) {
    return this.A(null, c);
  };
  a.q = function(a, c, d) {
    return this.G(null, c, d);
  };
  return a;
}();
h.apply = function(a, b) {
  return this.call.apply(this, [this].concat(sb.call(null, b)));
};
h.a = function(a) {
  return this.A(null, a);
};
h.j = function(a, b) {
  return this.G(null, a, b);
};
var Cg = new Xg(null, 0, null, !1, null, 0);
function Cd(a, b) {
  for (var c = a.length, d = 0, e = Te.call(null, Cg);;) {
    if (d < c) {
      var f = d + 1, e = yc.call(null, e, a[d], b[d]), d = f
    } else {
      return Ue.call(null, e);
    }
  }
}
function Yg(a, b, c, d, e) {
  this.R = a;
  this.root = b;
  this.count = c;
  this.ka = d;
  this.ya = e;
  this.o = 56;
  this.g = 258;
}
h = Yg.prototype;
h.Sc = function(a, b, c) {
  return Zg(this, b, c);
};
h.tc = function(a, b) {
  var c;
  a: {
    if (this.R) {
      if (b ? b.g & 2048 || b.sf || (b.g ? 0 : v.call(null, Qb, b)) : v.call(null, Qb, b)) {
        c = Zg(this, oe.call(null, b), pe.call(null, b));
        break a;
      }
      c = E.call(null, b);
      for (var d = this;;) {
        var e = F.call(null, c);
        if (t(e)) {
          c = L.call(null, c), d = Zg(d, oe.call(null, e), pe.call(null, e));
        } else {
          c = d;
          break a;
        }
      }
    } else {
      throw Error("conj! after persistent");
    }
    c = void 0;
  }
  return c;
};
h.uc = function() {
  var a;
  if (this.R) {
    this.R = null, a = new Xg(null, this.count, this.root, this.ka, this.ya, null);
  } else {
    throw Error("persistent! called twice");
  }
  return a;
};
h.A = function(a, b) {
  return null == b ? this.ka ? this.ya : null : null == this.root ? null : this.root.vb(0, Xc.call(null, b), b);
};
h.G = function(a, b, c) {
  return null == b ? this.ka ? this.ya : c : null == this.root ? c : this.root.vb(0, Xc.call(null, b), b, c);
};
h.Q = function() {
  if (this.R) {
    return this.count;
  }
  throw Error("count after persistent!");
};
function Zg(a, b, c) {
  if (a.R) {
    if (null == b) {
      a.ya !== c && (a.ya = c), a.ka || (a.count += 1, a.ka = !0);
    } else {
      var d = new Fg;
      b = (null == a.root ? Og : a.root).Ma(a.R, 0, Xc.call(null, b), b, c, d);
      b !== a.root && (a.root = b);
      d.m && (a.count += 1);
    }
    return a;
  }
  throw Error("assoc! after persistent!");
}
function $g(a, b, c) {
  for (var d = b;;) {
    if (null != a) {
      b = c ? a.left : a.right, d = yd.call(null, d, a), a = b;
    } else {
      return d;
    }
  }
}
function ah(a, b, c, d, e) {
  this.l = a;
  this.stack = b;
  this.Hc = c;
  this.h = d;
  this.n = e;
  this.o = 0;
  this.g = 32374862;
}
h = ah.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.B = function() {
  return this.l;
};
h.Q = function() {
  return 0 > this.h ? P.call(null, L.call(null, this)) + 1 : this.h;
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return sd.call(null, dd, this.l);
};
h.$ = function(a, b) {
  return td.call(null, b, this);
};
h.aa = function(a, b, c) {
  return td.call(null, b, c, this);
};
h.ga = function() {
  return Id.call(null, this.stack);
};
h.ha = function() {
  var a = F.call(null, this.stack), a = $g.call(null, this.Hc ? a.right : a.left, L.call(null, this.stack), this.Hc);
  return null != a ? new ah(null, a, this.Hc, this.h - 1, null) : dd;
};
h.M = function() {
  return this;
};
h.D = function(a, b) {
  return new ah(b, this.stack, this.Hc, this.h, this.n);
};
h.P = function(a, b) {
  return O.call(null, b, this);
};
function bh(a, b, c) {
  return new ah(null, $g.call(null, a, null, b), b, c, null);
}
function ch(a, b, c, d) {
  return c instanceof $ ? c.left instanceof $ ? new $(c.key, c.m, c.left.Za(), new dh(a, b, c.right, d, null), null) : c.right instanceof $ ? new $(c.right.key, c.right.m, new dh(c.key, c.m, c.left, c.right.left, null), new dh(a, b, c.right.right, d, null), null) : new dh(a, b, c, d, null) : new dh(a, b, c, d, null);
}
function eh(a, b, c, d) {
  return d instanceof $ ? d.right instanceof $ ? new $(d.key, d.m, new dh(a, b, c, d.left, null), d.right.Za(), null) : d.left instanceof $ ? new $(d.left.key, d.left.m, new dh(a, b, c, d.left.left, null), new dh(d.key, d.m, d.left.right, d.right, null), null) : new dh(a, b, c, d, null) : new dh(a, b, c, d, null);
}
function fh(a, b, c, d) {
  if (c instanceof $) {
    return new $(a, b, c.Za(), d, null);
  }
  if (d instanceof dh) {
    return eh.call(null, a, b, c, d.Dc());
  }
  if (d instanceof $ && d.left instanceof dh) {
    return new $(d.left.key, d.left.m, new dh(a, b, c, d.left.left, null), eh.call(null, d.key, d.m, d.left.right, d.right.Dc()), null);
  }
  throw Error("red-black tree invariant violation");
}
function gh(a, b, c, d) {
  if (d instanceof $) {
    return new $(a, b, c, d.Za(), null);
  }
  if (c instanceof dh) {
    return ch.call(null, a, b, c.Dc(), d);
  }
  if (c instanceof $ && c.right instanceof dh) {
    return new $(c.right.key, c.right.m, ch.call(null, c.key, c.m, c.left.Dc(), c.right.left), new dh(a, b, c.right.right, d, null), null);
  }
  throw Error("red-black tree invariant violation");
}
var ih = function hh(b, c, d) {
  d = null != b.left ? hh.call(null, b.left, c, d) : d;
  if (kd.call(null, d)) {
    return N.call(null, d);
  }
  d = c.call(null, d, b.key, b.m);
  if (kd.call(null, d)) {
    return N.call(null, d);
  }
  b = null != b.right ? hh.call(null, b.right, c, d) : d;
  return kd.call(null, b) ? N.call(null, b) : b;
};
function dh(a, b, c, d, e) {
  this.key = a;
  this.m = b;
  this.left = c;
  this.right = d;
  this.n = e;
  this.o = 0;
  this.g = 32402207;
}
h = dh.prototype;
h.he = function(a) {
  return a.je(this);
};
h.Dc = function() {
  return new $(this.key, this.m, this.left, this.right, null);
};
h.Za = function() {
  return this;
};
h.ge = function(a) {
  return a.ie(this);
};
h.replace = function(a, b, c, d) {
  return new dh(a, b, c, d, null);
};
h.ie = function(a) {
  return new dh(a.key, a.m, this, a.right, null);
};
h.je = function(a) {
  return new dh(a.key, a.m, a.left, this, null);
};
h.Gb = function(a, b) {
  return ih.call(null, this, a, b);
};
h.A = function(a, b) {
  return A.call(null, this, b, null);
};
h.G = function(a, b, c) {
  return A.call(null, this, b, c);
};
h.ta = function(a, b) {
  return 0 === b ? this.key : 1 === b ? this.m : null;
};
h.ua = function(a, b, c) {
  return 0 === b ? this.key : 1 === b ? this.m : c;
};
h.Bb = function(a, b, c) {
  return(new X(null, 2, 5, Y, [this.key, this.m], null)).Bb(null, b, c);
};
h.B = function() {
  return null;
};
h.Q = function() {
  return 2;
};
h.Pc = function() {
  return this.key;
};
h.Qc = function() {
  return this.m;
};
h.sb = function() {
  return this.m;
};
h.tb = function() {
  return new X(null, 1, 5, Y, [this.key], null);
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return xd;
};
h.$ = function(a, b) {
  return ld.call(null, this, b);
};
h.aa = function(a, b, c) {
  return ld.call(null, this, b, c);
};
h.Fa = function(a, b, c) {
  return T.call(null, new X(null, 2, 5, Y, [this.key, this.m], null), b, c);
};
h.M = function() {
  return Db.call(null, Db.call(null, dd, this.m), this.key);
};
h.D = function(a, b) {
  return sd.call(null, new X(null, 2, 5, Y, [this.key, this.m], null), b);
};
h.P = function(a, b) {
  return new X(null, 3, 5, Y, [this.key, this.m, b], null);
};
h.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.A(null, c);
      case 3:
        return this.G(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.j = function(a, c) {
    return this.A(null, c);
  };
  a.q = function(a, c, d) {
    return this.G(null, c, d);
  };
  return a;
}();
h.apply = function(a, b) {
  return this.call.apply(this, [this].concat(sb.call(null, b)));
};
h.a = function(a) {
  return this.A(null, a);
};
h.j = function(a, b) {
  return this.G(null, a, b);
};
function $(a, b, c, d, e) {
  this.key = a;
  this.m = b;
  this.left = c;
  this.right = d;
  this.n = e;
  this.o = 0;
  this.g = 32402207;
}
h = $.prototype;
h.he = function(a) {
  return new $(this.key, this.m, this.left, a, null);
};
h.Dc = function() {
  throw Error("red-black tree invariant violation");
};
h.Za = function() {
  return new dh(this.key, this.m, this.left, this.right, null);
};
h.ge = function(a) {
  return new $(this.key, this.m, a, this.right, null);
};
h.replace = function(a, b, c, d) {
  return new $(a, b, c, d, null);
};
h.ie = function(a) {
  return this.left instanceof $ ? new $(this.key, this.m, this.left.Za(), new dh(a.key, a.m, this.right, a.right, null), null) : this.right instanceof $ ? new $(this.right.key, this.right.m, new dh(this.key, this.m, this.left, this.right.left, null), new dh(a.key, a.m, this.right.right, a.right, null), null) : new dh(a.key, a.m, this, a.right, null);
};
h.je = function(a) {
  return this.right instanceof $ ? new $(this.key, this.m, new dh(a.key, a.m, a.left, this.left, null), this.right.Za(), null) : this.left instanceof $ ? new $(this.left.key, this.left.m, new dh(a.key, a.m, a.left, this.left.left, null), new dh(this.key, this.m, this.left.right, this.right, null), null) : new dh(a.key, a.m, a.left, this, null);
};
h.Gb = function(a, b) {
  return ih.call(null, this, a, b);
};
h.A = function(a, b) {
  return A.call(null, this, b, null);
};
h.G = function(a, b, c) {
  return A.call(null, this, b, c);
};
h.ta = function(a, b) {
  return 0 === b ? this.key : 1 === b ? this.m : null;
};
h.ua = function(a, b, c) {
  return 0 === b ? this.key : 1 === b ? this.m : c;
};
h.Bb = function(a, b, c) {
  return(new X(null, 2, 5, Y, [this.key, this.m], null)).Bb(null, b, c);
};
h.B = function() {
  return null;
};
h.Q = function() {
  return 2;
};
h.Pc = function() {
  return this.key;
};
h.Qc = function() {
  return this.m;
};
h.sb = function() {
  return this.m;
};
h.tb = function() {
  return new X(null, 1, 5, Y, [this.key], null);
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return xd;
};
h.$ = function(a, b) {
  return ld.call(null, this, b);
};
h.aa = function(a, b, c) {
  return ld.call(null, this, b, c);
};
h.Fa = function(a, b, c) {
  return T.call(null, new X(null, 2, 5, Y, [this.key, this.m], null), b, c);
};
h.M = function() {
  return Db.call(null, Db.call(null, dd, this.m), this.key);
};
h.D = function(a, b) {
  return sd.call(null, new X(null, 2, 5, Y, [this.key, this.m], null), b);
};
h.P = function(a, b) {
  return new X(null, 3, 5, Y, [this.key, this.m, b], null);
};
h.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.A(null, c);
      case 3:
        return this.G(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.j = function(a, c) {
    return this.A(null, c);
  };
  a.q = function(a, c, d) {
    return this.G(null, c, d);
  };
  return a;
}();
h.apply = function(a, b) {
  return this.call.apply(this, [this].concat(sb.call(null, b)));
};
h.a = function(a) {
  return this.A(null, a);
};
h.j = function(a, b) {
  return this.G(null, a, b);
};
var kh = function jh(b, c, d, e, f) {
  if (null == c) {
    return new $(d, e, null, null, null);
  }
  var g = b.call(null, d, c.key);
  if (0 === g) {
    return f[0] = c, null;
  }
  if (0 > g) {
    return b = jh.call(null, b, c.left, d, e, f), null != b ? c.ge(b) : null;
  }
  b = jh.call(null, b, c.right, d, e, f);
  return null != b ? c.he(b) : null;
}, mh = function lh(b, c) {
  if (null == b) {
    return c;
  }
  if (null == c) {
    return b;
  }
  if (b instanceof $) {
    if (c instanceof $) {
      var d = lh.call(null, b.right, c.left);
      return d instanceof $ ? new $(d.key, d.m, new $(b.key, b.m, b.left, d.left, null), new $(c.key, c.m, d.right, c.right, null), null) : new $(b.key, b.m, b.left, new $(c.key, c.m, d, c.right, null), null);
    }
    return new $(b.key, b.m, b.left, lh.call(null, b.right, c), null);
  }
  if (c instanceof $) {
    return new $(c.key, c.m, lh.call(null, b, c.left), c.right, null);
  }
  d = lh.call(null, b.right, c.left);
  return d instanceof $ ? new $(d.key, d.m, new dh(b.key, b.m, b.left, d.left, null), new dh(c.key, c.m, d.right, c.right, null), null) : fh.call(null, b.key, b.m, b.left, new dh(c.key, c.m, d, c.right, null));
}, oh = function nh(b, c, d, e) {
  if (null != c) {
    var f = b.call(null, d, c.key);
    if (0 === f) {
      return e[0] = c, mh.call(null, c.left, c.right);
    }
    if (0 > f) {
      return b = nh.call(null, b, c.left, d, e), null != b || null != e[0] ? c.left instanceof dh ? fh.call(null, c.key, c.m, b, c.right) : new $(c.key, c.m, b, c.right, null) : null;
    }
    b = nh.call(null, b, c.right, d, e);
    return null != b || null != e[0] ? c.right instanceof dh ? gh.call(null, c.key, c.m, c.left, b) : new $(c.key, c.m, c.left, b, null) : null;
  }
  return null;
}, qh = function ph(b, c, d, e) {
  var f = c.key, g = b.call(null, d, f);
  return 0 === g ? c.replace(f, e, c.left, c.right) : 0 > g ? c.replace(f, c.m, ph.call(null, b, c.left, d, e), c.right) : c.replace(f, c.m, c.left, ph.call(null, b, c.right, d, e));
};
function rh(a, b, c, d, e) {
  this.eb = a;
  this.mb = b;
  this.h = c;
  this.l = d;
  this.n = e;
  this.g = 418776847;
  this.o = 8192;
}
h = rh.prototype;
h.forEach = function(a) {
  for (var b = E.call(null, this), c = null, d = 0, e = 0;;) {
    if (e < d) {
      var f = A.call(null, c, e), g = R.call(null, f, 0, null), f = R.call(null, f, 1, null);
      a.call(null, f, g);
      e += 1;
    } else {
      if (b = E.call(null, b)) {
        Qd.call(null, b) ? (c = Le.call(null, b), b = Me.call(null, b), g = c, d = P.call(null, c), c = g) : (c = F.call(null, b), g = R.call(null, c, 0, null), f = R.call(null, c, 1, null), a.call(null, f, g), b = L.call(null, b), c = null, d = 0), e = 0;
      } else {
        return null;
      }
    }
  }
};
h.get = function(a) {
  return this.A(null, a);
};
h.toString = function() {
  return Kc.call(null, this);
};
function sh(a, b) {
  for (var c = a.mb;;) {
    if (null != c) {
      var d = a.eb.call(null, b, c.key);
      if (0 === d) {
        return c;
      }
      c = 0 > d ? c.left : c.right;
    } else {
      return null;
    }
  }
}
h.A = function(a, b) {
  return Lb.call(null, this, b, null);
};
h.G = function(a, b, c) {
  a = sh(this, b);
  return null != a ? a.m : c;
};
h.qc = function(a, b, c) {
  return null != this.mb ? ih.call(null, this.mb, b, c) : c;
};
h.B = function() {
  return this.l;
};
h.Q = function() {
  return this.h;
};
h.rc = function() {
  return 0 < this.h ? bh.call(null, this.mb, !1, this.h) : null;
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = gd.call(null, this);
};
h.C = function(a, b) {
  return pg.call(null, this, b);
};
h.U = function() {
  return sd.call(null, th, this.l);
};
h.rb = function(a, b) {
  var c = [null], d = oh.call(null, this.eb, this.mb, b, c);
  return null == d ? null == R.call(null, c, 0) ? this : new rh(this.eb, null, 0, this.l, null) : new rh(this.eb, d.Za(), this.h - 1, this.l, null);
};
h.Fa = function(a, b, c) {
  a = [null];
  var d = kh.call(null, this.eb, this.mb, b, c, a);
  return null == d ? (a = R.call(null, a, 0), B.call(null, c, a.m) ? this : new rh(this.eb, qh.call(null, this.eb, this.mb, b, c), this.h, this.l, null)) : new rh(this.eb, d.Za(), this.h + 1, this.l, null);
};
h.Nc = function(a, b) {
  return null != sh(this, b);
};
h.M = function() {
  return 0 < this.h ? bh.call(null, this.mb, !0, this.h) : null;
};
h.D = function(a, b) {
  return new rh(this.eb, this.mb, this.h, b, this.n);
};
h.P = function(a, b) {
  if (Pd.call(null, b)) {
    return Nb.call(null, this, A.call(null, b, 0), A.call(null, b, 1));
  }
  for (var c = this, d = E.call(null, b);;) {
    if (null == d) {
      return c;
    }
    var e = F.call(null, d);
    if (Pd.call(null, e)) {
      c = Nb.call(null, c, A.call(null, e, 0), A.call(null, e, 1)), d = L.call(null, d);
    } else {
      throw Error("conj on a map takes map entries or seqables of map entries");
    }
  }
};
h.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.A(null, c);
      case 3:
        return this.G(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.j = function(a, c) {
    return this.A(null, c);
  };
  a.q = function(a, c, d) {
    return this.G(null, c, d);
  };
  return a;
}();
h.apply = function(a, b) {
  return this.call.apply(this, [this].concat(sb.call(null, b)));
};
h.a = function(a) {
  return this.A(null, a);
};
h.j = function(a, b) {
  return this.G(null, a, b);
};
var th = new rh(ad, null, 0, null, 0), kf = function() {
  function a(a) {
    var d = null;
    0 < arguments.length && (d = M(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, d);
  }
  function b(a) {
    a = E.call(null, a);
    for (var b = Te.call(null, Cg);;) {
      if (a) {
        var e = vd.call(null, a), b = We.call(null, b, F.call(null, a), ud.call(null, a));
        a = e;
      } else {
        return Ue.call(null, b);
      }
    }
  }
  a.k = 0;
  a.e = function(a) {
    a = E(a);
    return b(a);
  };
  a.c = b;
  return a;
}(), uh = function() {
  function a(a) {
    var d = null;
    0 < arguments.length && (d = M(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, d);
  }
  function b(a) {
    return new n(null, he.call(null, P.call(null, a), 2), U.call(null, tb, a), null);
  }
  a.k = 0;
  a.e = function(a) {
    a = E(a);
    return b(a);
  };
  a.c = b;
  return a;
}(), vh = function() {
  function a(a) {
    var d = null;
    0 < arguments.length && (d = M(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, d);
  }
  function b(a) {
    a = E.call(null, a);
    for (var b = th;;) {
      if (a) {
        var e = vd.call(null, a), b = T.call(null, b, F.call(null, a), ud.call(null, a));
        a = e;
      } else {
        return b;
      }
    }
  }
  a.k = 0;
  a.e = function(a) {
    a = E(a);
    return b(a);
  };
  a.c = b;
  return a;
}();
function wh(a, b) {
  this.na = a;
  this.qa = b;
  this.o = 0;
  this.g = 32374988;
}
h = wh.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.B = function() {
  return this.qa;
};
h.Aa = function() {
  var a = this.na, a = (a ? a.g & 128 || a.Rc || (a.g ? 0 : v.call(null, Ib, a)) : v.call(null, Ib, a)) ? Jb.call(null, this.na) : L.call(null, this.na);
  return null == a ? null : new wh(a, this.qa);
};
h.F = function() {
  return fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return sd.call(null, dd, this.qa);
};
h.$ = function(a, b) {
  return td.call(null, b, this);
};
h.aa = function(a, b, c) {
  return td.call(null, b, c, this);
};
h.ga = function() {
  var a = Gb.call(null, this.na);
  return Rb.call(null, a);
};
h.ha = function() {
  var a = this.na, a = (a ? a.g & 128 || a.Rc || (a.g ? 0 : v.call(null, Ib, a)) : v.call(null, Ib, a)) ? Jb.call(null, this.na) : L.call(null, this.na);
  return null != a ? new wh(a, this.qa) : dd;
};
h.M = function() {
  return this;
};
h.D = function(a, b) {
  return new wh(this.na, b);
};
h.P = function(a, b) {
  return O.call(null, b, this);
};
function xh(a) {
  return(a = E.call(null, a)) ? new wh(a, null) : null;
}
function oe(a) {
  return Rb.call(null, a);
}
function yh(a, b) {
  this.na = a;
  this.qa = b;
  this.o = 0;
  this.g = 32374988;
}
h = yh.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.B = function() {
  return this.qa;
};
h.Aa = function() {
  var a = this.na, a = (a ? a.g & 128 || a.Rc || (a.g ? 0 : v.call(null, Ib, a)) : v.call(null, Ib, a)) ? Jb.call(null, this.na) : L.call(null, this.na);
  return null == a ? null : new yh(a, this.qa);
};
h.F = function() {
  return fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return sd.call(null, dd, this.qa);
};
h.$ = function(a, b) {
  return td.call(null, b, this);
};
h.aa = function(a, b, c) {
  return td.call(null, b, c, this);
};
h.ga = function() {
  var a = Gb.call(null, this.na);
  return Sb.call(null, a);
};
h.ha = function() {
  var a = this.na, a = (a ? a.g & 128 || a.Rc || (a.g ? 0 : v.call(null, Ib, a)) : v.call(null, Ib, a)) ? Jb.call(null, this.na) : L.call(null, this.na);
  return null != a ? new yh(a, this.qa) : dd;
};
h.M = function() {
  return this;
};
h.D = function(a, b) {
  return new yh(this.na, b);
};
h.P = function(a, b) {
  return O.call(null, b, this);
};
function zh(a) {
  return(a = E.call(null, a)) ? new yh(a, null) : null;
}
function pe(a) {
  return Sb.call(null, a);
}
var Ah = function() {
  function a(a) {
    var d = null;
    0 < arguments.length && (d = M(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, d);
  }
  function b(a) {
    return t(af.call(null, be, a)) ? ub.call(null, function(a, b) {
      return yd.call(null, t(a) ? a : Ag, b);
    }, a) : null;
  }
  a.k = 0;
  a.e = function(a) {
    a = E(a);
    return b(a);
  };
  a.c = b;
  return a;
}(), Bh = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    return t(af.call(null, be, b)) ? ub.call(null, function(a) {
      return function(b, c) {
        return ub.call(null, a, t(b) ? b : Ag, E.call(null, c));
      };
    }(function(b, d) {
      var g = F.call(null, d), l = ud.call(null, d);
      return Zd.call(null, b, g) ? T.call(null, b, g, a.call(null, S.call(null, b, g), l)) : T.call(null, b, g, l);
    }), b) : null;
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}();
function Ch(a, b, c) {
  this.l = a;
  this.Tb = b;
  this.n = c;
  this.g = 15077647;
  this.o = 8196;
}
h = Ch.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.forEach = function(a) {
  for (var b = E.call(null, this), c = null, d = 0, e = 0;;) {
    if (e < d) {
      var f = A.call(null, c, e), g = R.call(null, f, 0, null), f = R.call(null, f, 1, null);
      a.call(null, f, g);
      e += 1;
    } else {
      if (b = E.call(null, b)) {
        Qd.call(null, b) ? (c = Le.call(null, b), b = Me.call(null, b), g = c, d = P.call(null, c), c = g) : (c = F.call(null, b), g = R.call(null, c, 0, null), f = R.call(null, c, 1, null), a.call(null, f, g), b = L.call(null, b), c = null, d = 0), e = 0;
      } else {
        return null;
      }
    }
  }
};
h.A = function(a, b) {
  return Lb.call(null, this, b, null);
};
h.G = function(a, b, c) {
  return Mb.call(null, this.Tb, b) ? b : c;
};
h.B = function() {
  return this.l;
};
h.Q = function() {
  return Ab.call(null, this.Tb);
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = gd.call(null, this);
};
h.C = function(a, b) {
  return Md.call(null, b) && P.call(null, this) === P.call(null, b) && $e.call(null, function(a) {
    return function(b) {
      return Zd.call(null, a, b);
    };
  }(this), b);
};
h.cc = function() {
  return new Dh(vc.call(null, this.Tb));
};
h.U = function() {
  return sd.call(null, Eh, this.l);
};
h.M = function() {
  return xh.call(null, this.Tb);
};
h.D = function(a, b) {
  return new Ch(b, this.Tb, this.n);
};
h.P = function(a, b) {
  return new Ch(this.l, T.call(null, this.Tb, b, null), null);
};
h.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.A(null, c);
      case 3:
        return this.G(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.j = function(a, c) {
    return this.A(null, c);
  };
  a.q = function(a, c, d) {
    return this.G(null, c, d);
  };
  return a;
}();
h.apply = function(a, b) {
  return this.call.apply(this, [this].concat(sb.call(null, b)));
};
h.a = function(a) {
  return this.A(null, a);
};
h.j = function(a, b) {
  return this.G(null, a, b);
};
var Eh = new Ch(null, Ag, 0);
function Dh(a) {
  this.lb = a;
  this.g = 259;
  this.o = 136;
}
h = Dh.prototype;
h.call = function() {
  function a(a, b, c) {
    return Lb.call(null, this.lb, b, Ud) === Ud ? c : b;
  }
  function b(a, b) {
    return Lb.call(null, this.lb, b, Ud) === Ud ? null : b;
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}();
h.apply = function(a, b) {
  return this.call.apply(this, [this].concat(sb.call(null, b)));
};
h.a = function(a) {
  return Lb.call(null, this.lb, a, Ud) === Ud ? null : a;
};
h.j = function(a, b) {
  return Lb.call(null, this.lb, a, Ud) === Ud ? b : a;
};
h.A = function(a, b) {
  return Lb.call(null, this, b, null);
};
h.G = function(a, b, c) {
  return Lb.call(null, this.lb, b, Ud) === Ud ? c : b;
};
h.Q = function() {
  return P.call(null, this.lb);
};
h.tc = function(a, b) {
  this.lb = We.call(null, this.lb, b, null);
  return this;
};
h.uc = function() {
  return new Ch(null, Ue.call(null, this.lb), null);
};
function Fh(a) {
  a = a.b;
  a: {
    for (var b = 0, c = vc.call(null, Eh);;) {
      if (b < a.length) {
        var d = b + 1, c = wc.call(null, c, a[b]), b = d
      } else {
        a = c;
        break a;
      }
    }
    a = void 0;
  }
  return xc.call(null, a);
}
function Gh(a) {
  a = E.call(null, a);
  if (null == a) {
    return Eh;
  }
  if (a instanceof cd && 0 === a.t) {
    return Fh.call(null, a);
  }
  for (var b = vc.call(null, Eh);;) {
    if (null != a) {
      var c = Jb.call(null, a), b = wc.call(null, b, Gb.call(null, a));
      a = c;
    } else {
      return xc.call(null, b);
    }
  }
}
function Hh(a) {
  for (var b = xd;;) {
    if (L.call(null, a)) {
      b = yd.call(null, b, F.call(null, a)), a = L.call(null, a);
    } else {
      return E.call(null, b);
    }
  }
}
function ze(a) {
  if (a && (a.o & 4096 || a.uf)) {
    return Fc.call(null, a);
  }
  if ("string" === typeof a) {
    return a;
  }
  throw Error("Doesn't support name: " + x.a(a));
}
function Ih(a, b) {
  for (var c = Te.call(null, Ag), d = E.call(null, a), e = E.call(null, b);;) {
    if (d && e) {
      c = We.call(null, c, F.call(null, d), F.call(null, e)), d = L.call(null, d), e = L.call(null, e);
    } else {
      return Ue.call(null, c);
    }
  }
}
function Jh(a, b, c, d, e) {
  this.l = a;
  this.start = b;
  this.end = c;
  this.step = d;
  this.n = e;
  this.g = 32375006;
  this.o = 8192;
}
h = Jh.prototype;
h.toString = function() {
  return Kc.call(null, this);
};
h.ta = function(a, b) {
  if (b < Ab.call(null, this)) {
    return this.start + b * this.step;
  }
  if (this.start > this.end && 0 === this.step) {
    return this.start;
  }
  throw Error("Index out of bounds");
};
h.ua = function(a, b, c) {
  return b < Ab.call(null, this) ? this.start + b * this.step : this.start > this.end && 0 === this.step ? this.start : c;
};
h.B = function() {
  return this.l;
};
h.Aa = function() {
  return 0 < this.step ? this.start + this.step < this.end ? new Jh(this.l, this.start + this.step, this.end, this.step, null) : null : this.start + this.step > this.end ? new Jh(this.l, this.start + this.step, this.end, this.step, null) : null;
};
h.Q = function() {
  return ob.call(null, ic.call(null, this)) ? 0 : Math.ceil.call(null, (this.end - this.start) / this.step);
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = fd.call(null, this);
};
h.C = function(a, b) {
  return qd.call(null, this, b);
};
h.U = function() {
  return sd.call(null, dd, this.l);
};
h.$ = function(a, b) {
  return ld.call(null, this, b);
};
h.aa = function(a, b, c) {
  return ld.call(null, this, b, c);
};
h.ga = function() {
  return null == ic.call(null, this) ? null : this.start;
};
h.ha = function() {
  return null != ic.call(null, this) ? new Jh(this.l, this.start + this.step, this.end, this.step, null) : dd;
};
h.M = function() {
  return 0 < this.step ? this.start < this.end ? this : null : this.start > this.end ? this : null;
};
h.D = function(a, b) {
  return new Jh(b, this.start, this.end, this.step, this.n);
};
h.P = function(a, b) {
  return O.call(null, b, this);
};
var Kh = function() {
  function a(a, b, c) {
    return new Jh(null, a, b, c, null);
  }
  function b(a, b) {
    return e.call(null, a, b, 1);
  }
  function c(a) {
    return e.call(null, 0, a, 1);
  }
  function d() {
    return e.call(null, 0, Number.MAX_VALUE, 1);
  }
  var e = null, e = function(e, g, l) {
    switch(arguments.length) {
      case 0:
        return d.call(this);
      case 1:
        return c.call(this, e);
      case 2:
        return b.call(this, e, g);
      case 3:
        return a.call(this, e, g, l);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  e.Z = d;
  e.a = c;
  e.j = b;
  e.q = a;
  return e;
}(), Lh = function() {
  function a(a, b) {
    for (;;) {
      if (E.call(null, b) && 0 < a) {
        var c = a - 1, g = L.call(null, b);
        a = c;
        b = g;
      } else {
        return null;
      }
    }
  }
  function b(a) {
    for (;;) {
      if (E.call(null, a)) {
        a = L.call(null, a);
      } else {
        return null;
      }
    }
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}(), Mh = function() {
  function a(a, b) {
    Lh.call(null, a, b);
    return b;
  }
  function b(a) {
    Lh.call(null, a);
    return a;
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}();
function Nh(a) {
  return a instanceof RegExp;
}
function Oh(a, b) {
  if ("string" === typeof b) {
    var c = a.exec(b);
    return B.call(null, F.call(null, c), b) ? 1 === P.call(null, c) ? F.call(null, c) : bg.call(null, c) : null;
  }
  throw new TypeError("re-matches must match against a string.");
}
function Ph(a, b) {
  if ("string" === typeof b) {
    var c = a.exec(b);
    return null == c ? null : 1 === P.call(null, c) ? F.call(null, c) : bg.call(null, c);
  }
  throw new TypeError("re-find must match against a string.");
}
var Rh = function Qh(b, c) {
  var d = Ph.call(null, b, c), e = c.search(b), f = Ld.call(null, d) ? F.call(null, d) : d, g = me.call(null, c, e + P.call(null, f));
  return t(d) ? new Be(null, function(c, d, e, f) {
    return function() {
      return O.call(null, c, E.call(null, f) ? Qh.call(null, b, f) : null);
    };
  }(d, e, f, g), null, null) : null;
};
function Sh(a) {
  var b = Ph.call(null, /^(?:\(\?([idmsux]*)\))?(.*)/, a);
  R.call(null, b, 0, null);
  a = R.call(null, b, 1, null);
  b = R.call(null, b, 2, null);
  return new RegExp(b, a);
}
function Th(a, b, c, d, e, f, g) {
  var l = lb;
  try {
    lb = null == lb ? null : lb - 1;
    if (null != lb && 0 > lb) {
      return oc.call(null, a, "#");
    }
    oc.call(null, a, c);
    E.call(null, g) && b.call(null, F.call(null, g), a, f);
    for (var m = L.call(null, g), p = (new s(null, "print-length", "print-length", 1931866356)).a(f) - 1;;) {
      if (!m || null != p && 0 === p) {
        E.call(null, m) && 0 === p && (oc.call(null, a, d), oc.call(null, a, "..."));
        break;
      } else {
        oc.call(null, a, d);
        b.call(null, F.call(null, m), a, f);
        var q = L.call(null, m);
        c = p - 1;
        m = q;
        p = c;
      }
    }
    return oc.call(null, a, e);
  } finally {
    lb = l;
  }
}
var Uh = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    for (var e = E.call(null, b), f = null, g = 0, l = 0;;) {
      if (l < g) {
        var m = A.call(null, f, l);
        oc.call(null, a, m);
        l += 1;
      } else {
        if (e = E.call(null, e)) {
          f = e, Qd.call(null, f) ? (e = Le.call(null, f), g = Me.call(null, f), f = e, m = P.call(null, e), e = g, g = m) : (m = F.call(null, f), oc.call(null, a, m), e = L.call(null, f), f = null, g = 0), l = 0;
        } else {
          return null;
        }
      }
    }
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}(), Vh = {'"':'\\"', "\\":"\\\\", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t"};
function Wh(a) {
  return'"' + x.a(a.replace(RegExp('[\\\\"\b\f\n\r\t]', "g"), function(a) {
    return Vh[a];
  })) + '"';
}
var Zh = function Xh(b, c, d) {
  if (null == b) {
    return oc.call(null, c, "nil");
  }
  if (void 0 === b) {
    return oc.call(null, c, "#\x3cundefined\x3e");
  }
  t(function() {
    var c = S.call(null, d, new s(null, "meta", "meta", 1499536964));
    return t(c) ? (c = b ? b.g & 131072 || b.tf ? !0 : b.g ? !1 : v.call(null, Zb, b) : v.call(null, Zb, b)) ? Gd.call(null, b) : c : c;
  }()) && (oc.call(null, c, "^"), Xh.call(null, Gd.call(null, b), c, d), oc.call(null, c, " "));
  if (null == b) {
    return oc.call(null, c, "nil");
  }
  if (b.bb) {
    return b.ub(b, c, d);
  }
  if (b && (b.g & 2147483648 || b.S)) {
    return rc.call(null, b, c, d);
  }
  if (qb.call(null, b) === Boolean || "number" === typeof b) {
    return oc.call(null, c, "" + x.a(b));
  }
  if (pb.call(null, b)) {
    return oc.call(null, c, "#js "), Yh.call(null, qf.call(null, function(c) {
      return new X(null, 2, 5, Y, [Ae.call(null, c), b[c]], null);
    }, Rd.call(null, b)), Xh, c, d);
  }
  if (b instanceof Array) {
    return Th.call(null, c, Xh, "#js [", " ", "]", d, b);
  }
  if (ia(b)) {
    return t((new s(null, "readably", "readably", 1129599760)).a(d)) ? oc.call(null, c, Wh.call(null, b)) : oc.call(null, c, b);
  }
  if (Ed.call(null, b)) {
    return Uh.call(null, c, "#\x3c", "" + x.a(b), "\x3e");
  }
  if (b instanceof Date) {
    var e = function(b, c) {
      for (var d = "" + x.a(b);;) {
        if (P.call(null, d) < c) {
          d = "0" + x.a(d);
        } else {
          return d;
        }
      }
    };
    return Uh.call(null, c, '#inst "', "" + x.a(b.getUTCFullYear()), "-", e.call(null, b.getUTCMonth() + 1, 2), "-", e.call(null, b.getUTCDate(), 2), "T", e.call(null, b.getUTCHours(), 2), ":", e.call(null, b.getUTCMinutes(), 2), ":", e.call(null, b.getUTCSeconds(), 2), ".", e.call(null, b.getUTCMilliseconds(), 3), "-", '00:00"');
  }
  return Nh.call(null, b) ? Uh.call(null, c, '#"', b.source, '"') : (b ? b.g & 2147483648 || b.S || (b.g ? 0 : v.call(null, qc, b)) : v.call(null, qc, b)) ? rc.call(null, b, c, d) : Uh.call(null, c, "#\x3c", "" + x.a(b), "\x3e");
};
function $h(a, b, c) {
  Zh.call(null, F.call(null, a), b, c);
  a = E.call(null, L.call(null, a));
  for (var d = null, e = 0, f = 0;;) {
    if (f < e) {
      var g = A.call(null, d, f);
      oc.call(null, b, " ");
      Zh.call(null, g, b, c);
      f += 1;
    } else {
      if (a = E.call(null, a)) {
        d = a, Qd.call(null, d) ? (a = Le.call(null, d), e = Me.call(null, d), d = a, g = P.call(null, a), a = e, e = g) : (g = F.call(null, d), oc.call(null, b, " "), Zh.call(null, g, b, c), a = L.call(null, d), d = null, e = 0), f = 0;
      } else {
        return null;
      }
    }
  }
}
function ai(a, b) {
  var c = new Sa, d = new Jc(c);
  $h.call(null, a, d, b);
  pc.call(null, d);
  return c;
}
function bi(a, b) {
  return Kd.call(null, a) ? "" : "" + x.a(ai.call(null, a, b));
}
var nf = function() {
  function a(a) {
    var d = null;
    0 < arguments.length && (d = M(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, d);
  }
  function b(a) {
    return bi.call(null, a, mb.call(null));
  }
  a.k = 0;
  a.e = function(a) {
    a = E(a);
    return b(a);
  };
  a.c = b;
  return a;
}();
function Yh(a, b, c, d) {
  return Th.call(null, c, function(a, c, d) {
    b.call(null, oe.call(null, a), c, d);
    oc.call(null, c, " ");
    return b.call(null, pe.call(null, a), c, d);
  }, "{", ", ", "}", d, E.call(null, a));
}
cd.prototype.S = !0;
cd.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "(", " ", ")", c, this);
};
Be.prototype.S = !0;
Be.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "(", " ", ")", c, this);
};
ah.prototype.S = !0;
ah.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "(", " ", ")", c, this);
};
Vg.prototype.S = !0;
Vg.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "(", " ", ")", c, this);
};
dh.prototype.S = !0;
dh.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "[", " ", "]", c, this);
};
xg.prototype.S = !0;
xg.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "(", " ", ")", c, this);
};
dg.prototype.S = !0;
dg.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "(", " ", ")", c, this);
};
ve.prototype.S = !0;
ve.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "(", " ", ")", c, this);
};
pd.prototype.S = !0;
pd.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "(", " ", ")", c, this);
};
Xg.prototype.S = !0;
Xg.prototype.H = function(a, b, c) {
  return Yh.call(null, this, Zh, b, c);
};
Wg.prototype.S = !0;
Wg.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "(", " ", ")", c, this);
};
fg.prototype.S = !0;
fg.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "[", " ", "]", c, this);
};
rh.prototype.S = !0;
rh.prototype.H = function(a, b, c) {
  return Yh.call(null, this, Zh, b, c);
};
Ch.prototype.S = !0;
Ch.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "#{", " ", "}", c, this);
};
He.prototype.S = !0;
He.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "(", " ", ")", c, this);
};
jf.prototype.S = !0;
jf.prototype.H = function(a, b, c) {
  oc.call(null, b, "#\x3cAtom: ");
  Zh.call(null, this.state, b, c);
  return oc.call(null, b, "\x3e");
};
yh.prototype.S = !0;
yh.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "(", " ", ")", c, this);
};
$.prototype.S = !0;
$.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "[", " ", "]", c, this);
};
X.prototype.S = !0;
X.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "[", " ", "]", c, this);
};
kg.prototype.S = !0;
kg.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "(", " ", ")", c, this);
};
re.prototype.S = !0;
re.prototype.H = function(a, b) {
  return oc.call(null, b, "()");
};
lg.prototype.S = !0;
lg.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "#queue [", " ", "]", c, E.call(null, this));
};
n.prototype.S = !0;
n.prototype.H = function(a, b, c) {
  return Yh.call(null, this, Zh, b, c);
};
Jh.prototype.S = !0;
Jh.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "(", " ", ")", c, this);
};
wh.prototype.S = !0;
wh.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "(", " ", ")", c, this);
};
qe.prototype.S = !0;
qe.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "(", " ", ")", c, this);
};
X.prototype.Oc = !0;
X.prototype.bc = function(a, b) {
  return $d.call(null, this, b);
};
fg.prototype.Oc = !0;
fg.prototype.bc = function(a, b) {
  return $d.call(null, this, b);
};
s.prototype.Oc = !0;
s.prototype.bc = function(a, b) {
  return $c.call(null, this, b);
};
D.prototype.Oc = !0;
D.prototype.bc = function(a, b) {
  return $c.call(null, this, b);
};
function ci(a, b, c) {
  return tc.call(null, a, b, c);
}
function di(a, b) {
  return uc.call(null, a, b);
}
var ei = null, fi = function() {
  function a(a) {
    null == ei && (ei = lf.call(null, 0));
    return bd.call(null, "" + x.a(a) + x.a(of.call(null, ei, hd)));
  }
  function b() {
    return c.call(null, "G__");
  }
  var c = null, c = function(c) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return a.call(this, c);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.Z = b;
  c.a = a;
  return c;
}();
function gi(a, b) {
  this.X = a;
  this.value = b;
  this.o = 1;
  this.g = 32768;
}
gi.prototype.Ab = function() {
  t(this.X) && (this.value = this.X.call(null), this.X = null);
  return this.value;
};
var hi = {};
function ii(a) {
  if (a ? a.qf : a) {
    return a.qf(a);
  }
  var b;
  b = ii[k(null == a ? null : a)];
  if (!b && (b = ii._, !b)) {
    throw w.call(null, "IEncodeJS.-clj-\x3ejs", a);
  }
  return b.call(null, a);
}
function ji(a) {
  return(a ? t(t(null) ? null : a.pf) || (a.Wc ? 0 : v.call(null, hi, a)) : v.call(null, hi, a)) ? ii.call(null, a) : "string" === typeof a || "number" === typeof a || a instanceof s || a instanceof D ? ki.call(null, a) : nf.call(null, a);
}
var ki = function li(b) {
  if (null == b) {
    return null;
  }
  if (b ? t(t(null) ? null : b.pf) || (b.Wc ? 0 : v.call(null, hi, b)) : v.call(null, hi, b)) {
    return ii.call(null, b);
  }
  if (b instanceof s) {
    return ze.call(null, b);
  }
  if (b instanceof D) {
    return "" + x.a(b);
  }
  if (Od.call(null, b)) {
    var c = {};
    b = E.call(null, b);
    for (var d = null, e = 0, f = 0;;) {
      if (f < e) {
        var g = A.call(null, d, f), l = R.call(null, g, 0, null), g = R.call(null, g, 1, null);
        c[ji.call(null, l)] = li.call(null, g);
        f += 1;
      } else {
        if (b = E.call(null, b)) {
          Qd.call(null, b) ? (e = Le.call(null, b), b = Me.call(null, b), d = e, e = P.call(null, e)) : (e = F.call(null, b), d = R.call(null, e, 0, null), e = R.call(null, e, 1, null), c[ji.call(null, d)] = li.call(null, e), b = L.call(null, b), d = null, e = 0), f = 0;
        } else {
          break;
        }
      }
    }
    return c;
  }
  if (Ld.call(null, b)) {
    c = [];
    b = E.call(null, qf.call(null, li, b));
    d = null;
    for (f = e = 0;;) {
      if (f < e) {
        l = A.call(null, d, f), c.push(l), f += 1;
      } else {
        if (b = E.call(null, b)) {
          d = b, Qd.call(null, d) ? (b = Le.call(null, d), f = Me.call(null, d), d = b, e = P.call(null, b), b = f) : (b = F.call(null, d), c.push(b), b = L.call(null, d), d = null, e = 0), f = 0;
        } else {
          break;
        }
      }
    }
    return c;
  }
  return b;
}, mi = {};
function ni(a, b) {
  if (a ? a.of : a) {
    return a.of(a, b);
  }
  var c;
  c = ni[k(null == a ? null : a)];
  if (!c && (c = ni._, !c)) {
    throw w.call(null, "IEncodeClojure.-js-\x3eclj", a);
  }
  return c.call(null, a, b);
}
var oi = function() {
  function a(a) {
    return b.call(null, a, new n(null, 1, [new s(null, "keywordize-keys", "keywordize-keys", 1310784252), !1], null));
  }
  var b = null, c = function() {
    function a(c, d) {
      var l = null;
      1 < arguments.length && (l = M(Array.prototype.slice.call(arguments, 1), 0));
      return b.call(this, c, l);
    }
    function b(a, c) {
      if (a ? t(t(null) ? null : a.Wf) || (a.Wc ? 0 : v.call(null, mi, a)) : v.call(null, mi, a)) {
        return ni.call(null, a, U.call(null, uh, c));
      }
      if (E.call(null, c)) {
        var d = Vd.call(null, c) ? U.call(null, kf, c) : c, e = S.call(null, d, new s(null, "keywordize-keys", "keywordize-keys", 1310784252));
        return function(a, b, c, d) {
          return function z(e) {
            return Vd.call(null, e) ? Mh.call(null, qf.call(null, z, e)) : Ld.call(null, e) ? zf.call(null, zd.call(null, e), qf.call(null, z, e)) : e instanceof Array ? bg.call(null, qf.call(null, z, e)) : qb.call(null, e) === Object ? zf.call(null, Ag, function() {
              return function(a, b, c, d) {
                return function K(f) {
                  return new Be(null, function(a, b, c, d) {
                    return function() {
                      for (;;) {
                        var a = E.call(null, f);
                        if (a) {
                          if (Qd.call(null, a)) {
                            var b = Le.call(null, a), c = P.call(null, b), g = Fe.call(null, c);
                            a: {
                              for (var l = 0;;) {
                                if (l < c) {
                                  var m = A.call(null, b, l);
                                  Je.call(null, g, new X(null, 2, 5, Y, [d.call(null, m), z.call(null, e[m])], null));
                                  l += 1;
                                } else {
                                  b = !0;
                                  break a;
                                }
                              }
                              b = void 0;
                            }
                            return b ? Ie.call(null, Ke.call(null, g), K.call(null, Me.call(null, a))) : Ie.call(null, Ke.call(null, g), null);
                          }
                          g = F.call(null, a);
                          return O.call(null, new X(null, 2, 5, Y, [d.call(null, g), z.call(null, e[g])], null), K.call(null, H.call(null, a)));
                        }
                        return null;
                      }
                    };
                  }(a, b, c, d), null, null);
                };
              }(a, b, c, d).call(null, Rd.call(null, e));
            }()) : e;
          };
        }(c, d, e, t(e) ? Ae : x).call(null, a);
      }
      return null;
    }
    a.k = 1;
    a.e = function(a) {
      var c = F(a);
      a = H(a);
      return b(c, a);
    };
    a.c = b;
    return a;
  }(), b = function(b, e) {
    switch(arguments.length) {
      case 1:
        return a.call(this, b);
      default:
        return c.c(b, M(arguments, 1));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.k = 1;
  b.e = c.e;
  b.a = a;
  b.c = c.c;
  return b;
}(), ie = function() {
  function a(a) {
    return Math.random.call(null) * a;
  }
  function b() {
    return c.call(null, 1);
  }
  var c = null, c = function(c) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return a.call(this, c);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.Z = b;
  c.a = a;
  return c;
}(), je = function(a) {
  return Math.floor.call(null, Math.random.call(null) * a);
};
function pi() {
  return new n(null, 3, [new s(null, "parents", "parents", -2027538891), Ag, new s(null, "descendants", "descendants", 1824886031), Ag, new s(null, "ancestors", "ancestors", -776045424), Ag], null);
}
var qi = null;
function ri() {
  null == qi && (qi = lf.call(null, pi.call(null)));
  return qi;
}
var si = function() {
  function a(a, b, f) {
    var g = B.call(null, b, f);
    if (!g && !(g = Zd.call(null, (new s(null, "ancestors", "ancestors", -776045424)).a(a).call(null, b), f)) && (g = Pd.call(null, f)) && (g = Pd.call(null, b))) {
      if (g = P.call(null, f) === P.call(null, b)) {
        for (var g = !0, l = 0;;) {
          if (g && l !== P.call(null, f)) {
            g = c.call(null, a, b.call(null, l), f.call(null, l)), l += 1;
          } else {
            return g;
          }
        }
      } else {
        return g;
      }
    } else {
      return g;
    }
  }
  function b(a, b) {
    return c.call(null, N.call(null, ri.call(null)), a, b);
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}(), ti = function() {
  function a(a, b) {
    return Ze.call(null, S.call(null, (new s(null, "parents", "parents", -2027538891)).a(a), b));
  }
  function b(a) {
    return c.call(null, N.call(null, ri.call(null)), a);
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}();
function ui(a, b, c, d) {
  of.call(null, a, function() {
    return N.call(null, b);
  });
  return of.call(null, c, function() {
    return N.call(null, d);
  });
}
var wi = function vi(b, c, d) {
  var e = N.call(null, d).call(null, b), e = t(t(e) ? e.call(null, c) : e) ? !0 : null;
  if (t(e)) {
    return e;
  }
  e = function() {
    for (var e = ti.call(null, c);;) {
      if (0 < P.call(null, e)) {
        vi.call(null, b, F.call(null, e), d), e = H.call(null, e);
      } else {
        return null;
      }
    }
  }();
  if (t(e)) {
    return e;
  }
  e = function() {
    for (var e = ti.call(null, b);;) {
      if (0 < P.call(null, e)) {
        vi.call(null, F.call(null, e), c, d), e = H.call(null, e);
      } else {
        return null;
      }
    }
  }();
  return t(e) ? e : !1;
};
function xi(a, b, c) {
  c = wi.call(null, a, b, c);
  return t(c) ? c : si.call(null, a, b);
}
var zi = function yi(b, c, d, e, f, g, l) {
  var m = ub.call(null, function(e, g) {
    var l = R.call(null, g, 0, null);
    R.call(null, g, 1, null);
    if (si.call(null, N.call(null, d), c, l)) {
      var m;
      m = (m = null == e) ? m : xi.call(null, l, F.call(null, e), f);
      m = t(m) ? g : e;
      if (!t(xi.call(null, F.call(null, m), l, f))) {
        throw Error("Multiple methods in multimethod '" + x.a(b) + "' match dispatch value: " + x.a(c) + " -\x3e " + x.a(l) + " and " + x.a(F.call(null, m)) + ", and neither is preferred");
      }
      return m;
    }
    return e;
  }, null, N.call(null, e));
  if (t(m)) {
    if (B.call(null, N.call(null, l), N.call(null, d))) {
      return of.call(null, g, T, c, ud.call(null, m)), ud.call(null, m);
    }
    ui.call(null, g, e, l, d);
    return yi.call(null, b, c, d, e, f, g, l);
  }
  return null;
}, Ai = {};
function Bi(a, b, c) {
  if (a ? a.pe : a) {
    return a.pe(0, b, c);
  }
  var d;
  d = Bi[k(null == a ? null : a)];
  if (!d && (d = Bi._, !d)) {
    throw w.call(null, "IMultiFn.-add-method", a);
  }
  return d.call(null, a, b, c);
}
function Ci(a, b) {
  throw Error("No method in multimethod '" + x.a(a) + "' for dispatch value: " + x.a(b));
}
function Di(a, b, c, d, e, f, g, l) {
  this.name = a;
  this.w = b;
  this.Af = c;
  this.ed = d;
  this.Cc = e;
  this.Nf = f;
  this.ld = g;
  this.Jc = l;
  this.g = 4194305;
  this.o = 256;
}
h = Di.prototype;
h.F = function() {
  return ma(this);
};
h.pe = function(a, b, c) {
  of.call(null, this.Cc, T, b, c);
  ui.call(null, this.ld, this.Cc, this.Jc, this.ed);
  return this;
};
function Ei(a, b) {
  B.call(null, N.call(null, a.Jc), N.call(null, a.ed)) || ui.call(null, a.ld, a.Cc, a.Jc, a.ed);
  var c = N.call(null, a.ld).call(null, b);
  if (t(c)) {
    return c;
  }
  c = zi.call(null, a.name, b, a.ed, a.Cc, a.Nf, a.ld, a.Jc);
  return t(c) ? c : N.call(null, a.Cc).call(null, a.Af);
}
h.call = function() {
  function a(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, K, W, Z) {
    a = this;
    var jc = U.call(null, a.w, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, K, W, Z), Mk = Ei(this, jc);
    t(Mk) || Ci.call(null, a.name, jc);
    return U.call(null, Mk, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, K, W, Z);
  }
  function b(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, K, W) {
    a = this;
    var Z = a.w.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, K, W), jc = Ei(this, Z);
    t(jc) || Ci.call(null, a.name, Z);
    return jc.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, K, W);
  }
  function c(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, K) {
    a = this;
    var W = a.w.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, K), Z = Ei(this, W);
    t(Z) || Ci.call(null, a.name, W);
    return Z.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, K);
  }
  function d(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q) {
    a = this;
    var K = a.w.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q), W = Ei(this, K);
    t(W) || Ci.call(null, a.name, K);
    return W.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q);
  }
  function e(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J) {
    a = this;
    var Q = a.w.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J), K = Ei(this, Q);
    t(K) || Ci.call(null, a.name, Q);
    return K.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J);
  }
  function f(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G) {
    a = this;
    var J = a.w.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G), Q = Ei(this, J);
    t(Q) || Ci.call(null, a.name, J);
    return Q.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G);
  }
  function g(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C) {
    a = this;
    var G = a.w.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C), J = Ei(this, G);
    t(J) || Ci.call(null, a.name, G);
    return J.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C);
  }
  function l(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z) {
    a = this;
    var C = a.w.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z), G = Ei(this, C);
    t(G) || Ci.call(null, a.name, C);
    return G.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y, z);
  }
  function m(a, b, c, d, e, f, g, l, m, p, q, r, u, y) {
    a = this;
    var z = a.w.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y), C = Ei(this, z);
    t(C) || Ci.call(null, a.name, z);
    return C.call(null, b, c, d, e, f, g, l, m, p, q, r, u, y);
  }
  function p(a, b, c, d, e, f, g, l, m, p, q, r, u) {
    a = this;
    var y = a.w.call(null, b, c, d, e, f, g, l, m, p, q, r, u), z = Ei(this, y);
    t(z) || Ci.call(null, a.name, y);
    return z.call(null, b, c, d, e, f, g, l, m, p, q, r, u);
  }
  function q(a, b, c, d, e, f, g, l, m, p, q, r) {
    a = this;
    var u = a.w.call(null, b, c, d, e, f, g, l, m, p, q, r), y = Ei(this, u);
    t(y) || Ci.call(null, a.name, u);
    return y.call(null, b, c, d, e, f, g, l, m, p, q, r);
  }
  function r(a, b, c, d, e, f, g, l, m, p, q) {
    a = this;
    var r = a.w.call(null, b, c, d, e, f, g, l, m, p, q), u = Ei(this, r);
    t(u) || Ci.call(null, a.name, r);
    return u.call(null, b, c, d, e, f, g, l, m, p, q);
  }
  function u(a, b, c, d, e, f, g, l, m, p) {
    a = this;
    var q = a.w.call(null, b, c, d, e, f, g, l, m, p), r = Ei(this, q);
    t(r) || Ci.call(null, a.name, q);
    return r.call(null, b, c, d, e, f, g, l, m, p);
  }
  function y(a, b, c, d, e, f, g, l, m) {
    a = this;
    var p = a.w.call(null, b, c, d, e, f, g, l, m), q = Ei(this, p);
    t(q) || Ci.call(null, a.name, p);
    return q.call(null, b, c, d, e, f, g, l, m);
  }
  function z(a, b, c, d, e, f, g, l) {
    a = this;
    var m = a.w.call(null, b, c, d, e, f, g, l), p = Ei(this, m);
    t(p) || Ci.call(null, a.name, m);
    return p.call(null, b, c, d, e, f, g, l);
  }
  function C(a, b, c, d, e, f, g) {
    a = this;
    var l = a.w.call(null, b, c, d, e, f, g), m = Ei(this, l);
    t(m) || Ci.call(null, a.name, l);
    return m.call(null, b, c, d, e, f, g);
  }
  function G(a, b, c, d, e, f) {
    a = this;
    var g = a.w.call(null, b, c, d, e, f), l = Ei(this, g);
    t(l) || Ci.call(null, a.name, g);
    return l.call(null, b, c, d, e, f);
  }
  function J(a, b, c, d, e) {
    a = this;
    var f = a.w.call(null, b, c, d, e), g = Ei(this, f);
    t(g) || Ci.call(null, a.name, f);
    return g.call(null, b, c, d, e);
  }
  function Q(a, b, c, d) {
    a = this;
    var e = a.w.call(null, b, c, d), f = Ei(this, e);
    t(f) || Ci.call(null, a.name, e);
    return f.call(null, b, c, d);
  }
  function W(a, b, c) {
    a = this;
    var d = a.w.call(null, b, c), e = Ei(this, d);
    t(e) || Ci.call(null, a.name, d);
    return e.call(null, b, c);
  }
  function Z(a, b) {
    a = this;
    var c = a.w.call(null, b), d = Ei(this, c);
    t(d) || Ci.call(null, a.name, c);
    return d.call(null, b);
  }
  var K = null, K = function(I, K, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db, Aa, jb, Za, zb, Hd, Af) {
    switch(arguments.length) {
      case 2:
        return Z.call(this, I, K);
      case 3:
        return W.call(this, I, K, ba);
      case 4:
        return Q.call(this, I, K, ba, ha);
      case 5:
        return J.call(this, I, K, ba, ha, ja);
      case 6:
        return G.call(this, I, K, ba, ha, ja, la);
      case 7:
        return C.call(this, I, K, ba, ha, ja, la, oa);
      case 8:
        return z.call(this, I, K, ba, ha, ja, la, oa, sa);
      case 9:
        return y.call(this, I, K, ba, ha, ja, la, oa, sa, wa);
      case 10:
        return u.call(this, I, K, ba, ha, ja, la, oa, sa, wa, za);
      case 11:
        return r.call(this, I, K, ba, ha, ja, la, oa, sa, wa, za, Ga);
      case 12:
        return q.call(this, I, K, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka);
      case 13:
        return p.call(this, I, K, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra);
      case 14:
        return m.call(this, I, K, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya);
      case 15:
        return l.call(this, I, K, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb);
      case 16:
        return g.call(this, I, K, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db);
      case 17:
        return f.call(this, I, K, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db, Aa);
      case 18:
        return e.call(this, I, K, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db, Aa, jb);
      case 19:
        return d.call(this, I, K, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db, Aa, jb, Za);
      case 20:
        return c.call(this, I, K, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db, Aa, jb, Za, zb);
      case 21:
        return b.call(this, I, K, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db, Aa, jb, Za, zb, Hd);
      case 22:
        return a.call(this, I, K, ba, ha, ja, la, oa, sa, wa, za, Ga, Ka, Ra, Ya, cb, db, Aa, jb, Za, zb, Hd, Af);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  K.j = Z;
  K.q = W;
  K.W = Q;
  K.Qa = J;
  K.qb = G;
  K.Nb = C;
  K.oc = z;
  K.pc = y;
  K.dc = u;
  K.ec = r;
  K.fc = q;
  K.gc = p;
  K.hc = m;
  K.ic = l;
  K.jc = g;
  K.kc = f;
  K.lc = e;
  K.mc = d;
  K.nc = c;
  K.Dd = b;
  K.rf = a;
  return K;
}();
h.apply = function(a, b) {
  return this.call.apply(this, [this].concat(sb.call(null, b)));
};
h.a = function(a) {
  var b = this.w.call(null, a), c = Ei(this, b);
  t(c) || Ci.call(null, this.name, b);
  return c.call(null, a);
};
h.j = function(a, b) {
  var c = this.w.call(null, a, b), d = Ei(this, c);
  t(d) || Ci.call(null, this.name, c);
  return d.call(null, a, b);
};
h.q = function(a, b, c) {
  var d = this.w.call(null, a, b, c), e = Ei(this, d);
  t(e) || Ci.call(null, this.name, d);
  return e.call(null, a, b, c);
};
h.W = function(a, b, c, d) {
  var e = this.w.call(null, a, b, c, d), f = Ei(this, e);
  t(f) || Ci.call(null, this.name, e);
  return f.call(null, a, b, c, d);
};
h.Qa = function(a, b, c, d, e) {
  var f = this.w.call(null, a, b, c, d, e), g = Ei(this, f);
  t(g) || Ci.call(null, this.name, f);
  return g.call(null, a, b, c, d, e);
};
h.qb = function(a, b, c, d, e, f) {
  var g = this.w.call(null, a, b, c, d, e, f), l = Ei(this, g);
  t(l) || Ci.call(null, this.name, g);
  return l.call(null, a, b, c, d, e, f);
};
h.Nb = function(a, b, c, d, e, f, g) {
  var l = this.w.call(null, a, b, c, d, e, f, g), m = Ei(this, l);
  t(m) || Ci.call(null, this.name, l);
  return m.call(null, a, b, c, d, e, f, g);
};
h.oc = function(a, b, c, d, e, f, g, l) {
  var m = this.w.call(null, a, b, c, d, e, f, g, l), p = Ei(this, m);
  t(p) || Ci.call(null, this.name, m);
  return p.call(null, a, b, c, d, e, f, g, l);
};
h.pc = function(a, b, c, d, e, f, g, l, m) {
  var p = this.w.call(null, a, b, c, d, e, f, g, l, m), q = Ei(this, p);
  t(q) || Ci.call(null, this.name, p);
  return q.call(null, a, b, c, d, e, f, g, l, m);
};
h.dc = function(a, b, c, d, e, f, g, l, m, p) {
  var q = this.w.call(null, a, b, c, d, e, f, g, l, m, p), r = Ei(this, q);
  t(r) || Ci.call(null, this.name, q);
  return r.call(null, a, b, c, d, e, f, g, l, m, p);
};
h.ec = function(a, b, c, d, e, f, g, l, m, p, q) {
  var r = this.w.call(null, a, b, c, d, e, f, g, l, m, p, q), u = Ei(this, r);
  t(u) || Ci.call(null, this.name, r);
  return u.call(null, a, b, c, d, e, f, g, l, m, p, q);
};
h.fc = function(a, b, c, d, e, f, g, l, m, p, q, r) {
  var u = this.w.call(null, a, b, c, d, e, f, g, l, m, p, q, r), y = Ei(this, u);
  t(y) || Ci.call(null, this.name, u);
  return y.call(null, a, b, c, d, e, f, g, l, m, p, q, r);
};
h.gc = function(a, b, c, d, e, f, g, l, m, p, q, r, u) {
  var y = this.w.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u), z = Ei(this, y);
  t(z) || Ci.call(null, this.name, y);
  return z.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u);
};
h.hc = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y) {
  var z = this.w.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y), C = Ei(this, z);
  t(C) || Ci.call(null, this.name, z);
  return C.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y);
};
h.ic = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z) {
  var C = this.w.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z), G = Ei(this, C);
  t(G) || Ci.call(null, this.name, C);
  return G.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z);
};
h.jc = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C) {
  var G = this.w.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C), J = Ei(this, G);
  t(J) || Ci.call(null, this.name, G);
  return J.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C);
};
h.kc = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G) {
  var J = this.w.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G), Q = Ei(this, J);
  t(Q) || Ci.call(null, this.name, J);
  return Q.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G);
};
h.lc = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J) {
  var Q = this.w.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J), W = Ei(this, Q);
  t(W) || Ci.call(null, this.name, Q);
  return W.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J);
};
h.mc = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q) {
  var W = this.w.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q), Z = Ei(this, W);
  t(Z) || Ci.call(null, this.name, W);
  return Z.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q);
};
h.nc = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W) {
  var Z = this.w.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W), K = Ei(this, Z);
  t(K) || Ci.call(null, this.name, Z);
  return K.call(null, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W);
};
h.Dd = function(a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W, Z) {
  var K = U.call(null, this.w, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W, Z), I = Ei(this, K);
  t(I) || Ci.call(null, this.name, K);
  return U.call(null, I, a, b, c, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, W, Z);
};
function Fi(a) {
  this.td = a;
  this.o = 0;
  this.g = 2153775104;
}
Fi.prototype.F = function() {
  for (var a = nf.call(null, this), b = 0, c = 0;c < a.length;++c) {
    b = 31 * b + a.charCodeAt(c), b %= 4294967296;
  }
  return b;
};
Fi.prototype.H = function(a, b) {
  return oc.call(null, b, '#uuid "' + x.a(this.td) + '"');
};
Fi.prototype.C = function(a, b) {
  return b instanceof Fi && this.td === b.td;
};
Fi.prototype.toString = function() {
  return this.td;
};
function Gi(a, b) {
  this.message = a;
  this.data = b;
}
Gi.prototype = Error();
Gi.prototype.constructor = Gi;
var Hi = function() {
  function a(a, b) {
    return new Gi(a, b);
  }
  function b(a, b) {
    return new Gi(a, b);
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}();
var Ii = React;
(function() {
});
function Ji(a, b, c) {
  if ("string" === typeof b) {
    return a.replace(new RegExp(String(b).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08"), "g"), c);
  }
  if (t(b.hasOwnProperty("source"))) {
    return a.replace(new RegExp(b.source, "g"), c);
  }
  throw "Invalid match arg: " + x.a(b);
}
var Ki = function() {
  function a(a, b) {
    return U.call(null, x, wf.call(null, a, b));
  }
  function b(a) {
    return U.call(null, x, a);
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}();
function Li(a) {
  return a.toUpperCase();
}
function Mi(a) {
  for (;;) {
    if (B.call(null, "", Id.call(null, a))) {
      a = Jd.call(null, a);
    } else {
      return a;
    }
  }
}
function Ni(a, b) {
  return B.call(null, 0, a) ? Mi.call(null, b) : b;
}
function Oi(a, b) {
  if (0 >= b || b >= 2 + P.call(null, a)) {
    return yd.call(null, bg.call(null, O.call(null, "", qf.call(null, x, E.call(null, a)))), "");
  }
  if (t(B.call(null, 1, b))) {
    return new X(null, 1, 5, Y, [a], null);
  }
  if (t(B.call(null, 2, b))) {
    return new X(null, 2, 5, Y, ["", a], null);
  }
  var c = b - 2;
  return yd.call(null, bg.call(null, O.call(null, "", eg.call(null, bg.call(null, qf.call(null, x, E.call(null, a))), 0, c))), me.call(null, a, c));
}
var Pi = function() {
  function a(a, b, c) {
    return Ni.call(null, c, B.call(null, "" + x.a(b), "/(?:)/") ? Oi.call(null, a, c) : 1 > c ? bg.call(null, ("" + x.a(a)).split(b)) : function() {
      for (var g = a, l = c, m = xd;;) {
        if (B.call(null, l, 1)) {
          return yd.call(null, m, g);
        }
        var p = Ph.call(null, b, g);
        if (t(p)) {
          var q = p, p = g.indexOf(q), q = g.substring(p + P.call(null, q)), l = l - 1, m = yd.call(null, m, g.substring(0, p)), g = q
        } else {
          return yd.call(null, m, g);
        }
      }
    }());
  }
  function b(a, b) {
    return c.call(null, a, b, 0);
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}();
function Qi(a) {
  return ya(a);
}
function Ri(a) {
  return/^[\s\xa0]*$/.test(null == a ? "" : String(a));
}
;var Si;
try {
  Si = window.document;
} catch (Ti) {
  if (Ti instanceof Object) {
    Si = null;
  } else {
    throw Ti;
  }
}
var Ui = null != Si;
function Vi(a) {
  return a.props;
}
function Wi(a) {
  return function(b) {
    return function(c) {
      var d = S.call(null, N.call(null, b), c);
      if (null != d) {
        return d;
      }
      d = a.call(null, c);
      of.call(null, b, T, c, d);
      return d;
    };
  }(lf.call(null, Ag));
}
var Xi = new Ch(null, new n(null, 2, ["aria", null, "data", null], null), null);
function Yi(a) {
  return 2 > P.call(null, a) ? Li.call(null, a) : "" + x.a(Li.call(null, me.call(null, a, 0, 1))) + x.a(me.call(null, a, 1));
}
function Zi(a) {
  if ("string" === typeof a) {
    return a;
  }
  a = ze.call(null, a);
  var b = Pi.call(null, a, /-/), c = R.call(null, b, 0, null), b = le.call(null, b, 1);
  return t(Xi.call(null, c)) ? a : U.call(null, x, c, qf.call(null, Yi, b));
}
function $i(a, b, c) {
  this.X = a;
  this.ac = b;
  this.Wb = c;
  this.o = 0;
  this.g = 6291457;
}
h = $i.prototype;
h.F = function() {
  return Xc.call(null, new X(null, 2, 5, Y, [this.X, this.ac], null));
};
h.C = function(a, b) {
  return B.call(null, this.X, b.X) && B.call(null, this.ac, b.ac);
};
h.call = function() {
  function a(a, d) {
    a = this;
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    t(a.Wb) || (a.Wb = U.call(null, gf, a.X, a.ac));
    return U.call(null, a.Wb, b);
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}();
h.apply = function(a, b) {
  return this.call.apply(this, [this].concat(sb.call(null, b)));
};
h.j = function() {
  function a(a) {
    var d = null;
    0 < arguments.length && (d = M(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, d);
  }
  function b(a) {
    t(self__.Wb) || (self__.Wb = U.call(null, gf, self__.X, self__.ac));
    return U.call(null, self__.Wb, a);
  }
  a.k = 0;
  a.e = function(a) {
    a = E(a);
    return b(a);
  };
  a.c = b;
  return a;
}();
function aj(a) {
  var b = Xd.call(null, a);
  return b ? b : a ? a.o & 256 || a.$f ? !0 : a.o ? !1 : v.call(null, Ai, a) : v.call(null, Ai, a);
}
var bj = {};
function cj(a, b) {
  return xe.call(null, a, b) || (a instanceof D || qb.call(null, a) === $i) && B.call(null, a, b);
}
var ej = function dj(b, c) {
  var d = b === c;
  if (d) {
    return d;
  }
  var e = Od.call(null, b);
  if (e) {
    var f = Od.call(null, c);
    if (f) {
      var g = P.call(null, b) === P.call(null, c);
      return g ? ae.call(null, function() {
        return function(b, d, e) {
          var f = S.call(null, c, d, bj);
          return t(function() {
            var b = e === f;
            return b || (b = cj.call(null, e, f)) ? b : (b = xe.call(null, d, new s(null, "style", "style", -496642736))) ? dj.call(null, e, f) : b;
          }()) ? b : jd.call(null, !1);
        };
      }(g, f, e, d), !0, b) : g;
    }
    return f;
  }
  return e;
};
function fj(a, b) {
  if (!Pd.call(null, a)) {
    throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "vector?", "vector?", -61367869, null), new D(null, "v1", "v1", -2141311508, null)))));
  }
  if (!Pd.call(null, b)) {
    throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "vector?", "vector?", -61367869, null), new D(null, "v2", "v2", 1875554983, null)))));
  }
  var c = a === b;
  if (c) {
    return c;
  }
  var d = P.call(null, a) === P.call(null, b);
  return d ? ae.call(null, function() {
    return function(a, c, d) {
      var l = R.call(null, b, c);
      return t(function() {
        var a = d === l;
        return a || (a = cj.call(null, d, l)) ? a : (a = Od.call(null, d)) ? ej.call(null, d, l) : a;
      }()) ? a : jd.call(null, !1);
    };
  }(d, c), !0, a) : d;
}
;var gj, hj = lf.call(null, 0);
function ij(a, b) {
  b.Xc = null;
  var c = gj;
  try {
    return gj = b, a.call(null);
  } finally {
    gj = c;
  }
}
function jj(a) {
  var b = a.Xc;
  a.Xc = null;
  return b;
}
function kj(a) {
  var b = gj;
  if (null == b) {
    return null;
  }
  var c = b.Xc;
  return b.Xc = yd.call(null, null == c ? Eh : c, a);
}
function lj(a, b, c, d) {
  this.state = a;
  this.l = b;
  this.ud = c;
  this.ca = d;
  this.g = 2153938944;
  this.o = 114690;
}
h = lj.prototype;
h.F = function() {
  return ma(this);
};
h.Uc = function(a, b, c) {
  return ae.call(null, function(a) {
    return function(e, f, g) {
      g.call(null, f, a, b, c);
      return null;
    };
  }(this), null, this.ca);
};
h.Tc = function(a, b, c) {
  return this.ca = T.call(null, this.ca, b, c);
};
h.Vc = function(a, b) {
  return this.ca = Dd.call(null, this.ca, b);
};
h.H = function(a, b, c) {
  oc.call(null, b, "#\x3cAtom: ");
  Zh.call(null, this.state, b, c);
  return oc.call(null, b, "\x3e");
};
h.B = function() {
  return this.l;
};
h.Fd = function(a, b) {
  return Hc.call(null, this, b.call(null, this.state));
};
h.Gd = function(a, b, c) {
  return Hc.call(null, this, b.call(null, this.state, c));
};
h.Hd = function(a, b, c, d) {
  return Hc.call(null, this, b.call(null, this.state, c, d));
};
h.Id = function(a, b, c, d, e) {
  return Hc.call(null, this, U.call(null, b, this.state, c, d, e));
};
h.Ed = function(a, b) {
  if (null != this.ud && !t(this.ud.call(null, b))) {
    throw Error("Assert failed: Validator rejected reference state\n" + x.a(nf.call(null, V(new D(null, "validator", "validator", -325659154, null), new D(null, "new-value", "new-value", -1567397401, null)))));
  }
  var c = this.state;
  this.state = b;
  null != this.ca && sc.call(null, this, c, b);
  return b;
};
h.Ab = function() {
  kj.call(null, this);
  return this.state;
};
h.C = function(a, b) {
  return this === b;
};
var mj = function() {
  function a(a) {
    return new lj(a, null, null, null);
  }
  var b = null, c = function() {
    function a(c, d) {
      var l = null;
      1 < arguments.length && (l = M(Array.prototype.slice.call(arguments, 1), 0));
      return b.call(this, c, l);
    }
    function b(a, c) {
      var d = Vd.call(null, c) ? U.call(null, kf, c) : c, e = S.call(null, d, new s(null, "validator", "validator", -1966190681)), d = S.call(null, d, new s(null, "meta", "meta", 1499536964));
      return new lj(a, d, e, null);
    }
    a.k = 1;
    a.e = function(a) {
      var c = F(a);
      a = H(a);
      return b(c, a);
    };
    a.c = b;
    return a;
  }(), b = function(b, e) {
    switch(arguments.length) {
      case 1:
        return a.call(this, b);
      default:
        return c.c(b, M(arguments, 1));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.k = 1;
  b.e = c.e;
  b.a = a;
  b.c = c.c;
  return b;
}();
function nj(a) {
  if (a ? a.Se : a) {
    return a.Se();
  }
  var b;
  b = nj[k(null == a ? null : a)];
  if (!b && (b = nj._, !b)) {
    throw w.call(null, "IDisposable.dispose!", a);
  }
  return b.call(null, a);
}
function oj(a) {
  if (a ? a.Te : a) {
    return a.Te();
  }
  var b;
  b = oj[k(null == a ? null : a)];
  if (!b && (b = oj._, !b)) {
    throw w.call(null, "IRunnable.run", a);
  }
  return b.call(null, a);
}
function pj(a, b) {
  if (a ? a.Re : a) {
    return a.Re(0, b);
  }
  var c;
  c = pj[k(null == a ? null : a)];
  if (!c && (c = pj._, !c)) {
    throw w.call(null, "IComputedImpl.-update-watching", a);
  }
  return c.call(null, a, b);
}
function qj(a, b, c, d) {
  if (a ? a.Qe : a) {
    return a.Qe(0, 0, c, d);
  }
  var e;
  e = qj[k(null == a ? null : a)];
  if (!e && (e = qj._, !e)) {
    throw w.call(null, "IComputedImpl.-handle-change", a);
  }
  return e.call(null, a, b, c, d);
}
function rj(a, b, c, d) {
  return ae.call(null, function(b, f, g) {
    g.call(null, f, a, c, d);
    return null;
  }, null, b);
}
function sj(a, b, c, d, e, f, g, l, m) {
  this.X = a;
  this.state = b;
  this.xc = c;
  this.$b = d;
  this.Lb = e;
  this.ca = f;
  this.Ic = g;
  this.Me = l;
  this.Le = m;
  this.g = 2153807872;
  this.o = 114690;
}
h = sj.prototype;
h.Qe = function(a, b, c, d) {
  var e = this;
  return t(function() {
    var a = e.$b;
    return t(a) ? ob.call(null, e.xc) && c !== d : a;
  }()) ? (e.xc = !0, function() {
    var a = e.Ic;
    return t(a) ? a : oj;
  }().call(null, this)) : null;
};
h.Re = function(a, b) {
  for (var c = E.call(null, b), d = null, e = 0, f = 0;;) {
    if (f < e) {
      var g = A.call(null, d, f);
      Zd.call(null, this.Lb, g) || ci.call(null, g, this, qj);
      f += 1;
    } else {
      if (c = E.call(null, c)) {
        d = c, Qd.call(null, d) ? (c = Le.call(null, d), f = Me.call(null, d), d = c, e = P.call(null, c), c = f) : (c = F.call(null, d), Zd.call(null, this.Lb, c) || ci.call(null, c, this, qj), c = L.call(null, d), d = null, e = 0), f = 0;
      } else {
        break;
      }
    }
  }
  c = E.call(null, this.Lb);
  d = null;
  for (f = e = 0;;) {
    if (f < e) {
      g = A.call(null, d, f), Zd.call(null, b, g) || di.call(null, g, this), f += 1;
    } else {
      if (c = E.call(null, c)) {
        d = c, Qd.call(null, d) ? (c = Le.call(null, d), f = Me.call(null, d), d = c, e = P.call(null, c), c = f) : (c = F.call(null, d), Zd.call(null, b, c) || di.call(null, c, this), c = L.call(null, d), d = null, e = 0), f = 0;
      } else {
        break;
      }
    }
  }
  return this.Lb = b;
};
h.H = function(a, b, c) {
  oc.call(null, b, "#\x3cReaction " + x.a(Xc.call(null, this)) + ": ");
  Zh.call(null, this.state, b, c);
  return oc.call(null, b, "\x3e");
};
h.F = function() {
  return ma(this);
};
h.C = function(a, b) {
  return this === b;
};
h.Se = function() {
  for (var a = E.call(null, this.Lb), b = null, c = 0, d = 0;;) {
    if (d < c) {
      var e = A.call(null, b, d);
      di.call(null, e, this);
      d += 1;
    } else {
      if (a = E.call(null, a)) {
        b = a, Qd.call(null, b) ? (a = Le.call(null, b), d = Me.call(null, b), b = a, c = P.call(null, a), a = d) : (a = F.call(null, b), di.call(null, a, this), a = L.call(null, b), b = null, c = 0), d = 0;
      } else {
        break;
      }
    }
  }
  this.Lb = Eh;
  this.state = null;
  this.xc = !0;
  t(this.$b) && (t(!1) && of.call(null, hj, de), this.$b = !1);
  return t(this.Le) ? this.Le.call(null) : null;
};
h.Ed = function(a, b) {
  var c = this.state;
  this.state = b;
  sc.call(null, this, c, b);
  return b;
};
h.Fd = function(a, b) {
  return Hc.call(null, this, b.call(null, this.state));
};
h.Gd = function(a, b, c) {
  return Hc.call(null, this, b.call(null, this.state, c));
};
h.Hd = function(a, b, c, d) {
  return Hc.call(null, this, b.call(null, this.state, c, d));
};
h.Id = function(a, b, c, d, e) {
  return Hc.call(null, this, U.call(null, b, this.state, c, d, e));
};
h.Te = function() {
  var a = this.state, b = ij.call(null, this.X, this), c = jj.call(null, this);
  Ye.call(null, c, this.Lb) && pj.call(null, this, c);
  t(this.$b) || (t(!1) && of.call(null, hj, hd), this.$b = !0);
  this.xc = !1;
  this.state = b;
  rj.call(null, this, this.ca, a, this.state);
  return b;
};
h.Uc = function(a, b, c) {
  t(this.Me) && this.Me.call(null, b, c);
  return rj.call(null, this, this.ca, b, c);
};
h.Tc = function(a, b, c) {
  return this.ca = T.call(null, this.ca, b, c);
};
h.Vc = function(a, b) {
  this.ca = Dd.call(null, this.ca, b);
  return Kd.call(null, this.ca) ? nj.call(null, this) : null;
};
h.Ab = function() {
  var a = this;
  if (ob.call(null, function() {
    var b = a.Ic;
    return t(b) ? b : gj;
  }())) {
    var b = new X(null, 2, 5, Y, [a.Ic, gj], null);
    null != console.log && console.log("" + x.a("dbg reagent.ratom:177: [auto-run *ratom-context*]: " + x.a(nf.call(null, b))));
  }
  if (!t(function() {
    var b = a.Ic;
    return t(b) ? b : gj;
  }())) {
    throw Error("Assert failed: Reaction derefed outside auto-running context\n" + x.a(nf.call(null, V(new D(null, "or", "or", 1876275696, null), new D(null, "auto-run", "auto-run", -696035332, null), new D(null, "*ratom-context*", "*ratom-context*", -1557728360, null)))));
  }
  kj.call(null, this);
  return t(a.xc) ? oj.call(null, this) : a.state;
};
var tj = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    var e = Vd.call(null, b) ? U.call(null, kf, b) : b, f = S.call(null, e, new s(null, "derefed", "derefed", 590684583)), g = S.call(null, e, new s(null, "on-dispose", "on-dispose", 2105306360)), l = S.call(null, e, new s(null, "on-set", "on-set", -140953470)), e = S.call(null, e, new s(null, "auto-run", "auto-run", 1958400437)), e = B.call(null, e, !0) ? oj : e, m = null != f, g = new sj(a, null, !m, m, null, Ag, e, l, g);
    null != f && (t(!1) && of.call(null, hj, hd), pj.call(null, g, f));
    return g;
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}();
function uj(a) {
  return setTimeout(a, 16);
}
var vj = ob.call(null, Ui) ? uj : function() {
  var a = window, b = a.requestAnimationFrame;
  if (t(b)) {
    return b;
  }
  b = a.webkitRequestAnimationFrame;
  if (t(b)) {
    return b;
  }
  b = a.mozRequestAnimationFrame;
  if (t(b)) {
    return b;
  }
  a = a.msRequestAnimationFrame;
  return t(a) ? a : uj;
}();
function wj(a, b) {
  return a.props.cljsLevel - b.props.cljsLevel;
}
function xj(a) {
  a.sort(wj);
  for (var b = a.length, c = 0;;) {
    if (c < b) {
      var d = a[c];
      t(d.xe) && d.forceUpdate();
      c += 1;
    } else {
      return null;
    }
  }
}
function yj() {
  var a = zj;
  if (t(a.ce)) {
    return null;
  }
  a.ce = !0;
  return vj.call(null, function(a) {
    return function() {
      var c = a.be;
      a.be = [];
      a.ce = !1;
      return xj.call(null, c);
    };
  }(a));
}
var zj = new function() {
  this.be = [];
  this.ce = !1;
};
function Aj(a) {
  a.xe = !0;
  zj.be.push(a);
  return yj();
}
function Bj(a) {
  return a.xe = !1;
}
function Cj(a) {
  var b = null != a;
  return b ? (b = a.props, t(b) ? a.props.cljsArgv : b) : b;
}
function Dj(a, b) {
  if (!t(Cj.call(null, a))) {
    throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "is-reagent-component", "is-reagent-component", -1856228005, null), new D(null, "C", "C", 1466901940, null)))));
  }
  Bj.call(null, a);
  var c = a.ye;
  if (null == c) {
    var d = ij.call(null, b, a), e = jj.call(null, a);
    null != e && (a.ye = tj.call(null, b, new s(null, "auto-run", "auto-run", 1958400437), function() {
      return function() {
        return Aj.call(null, a);
      };
    }(d, e, c), new s(null, "derefed", "derefed", 590684583), e));
    return d;
  }
  return oj.call(null, c);
}
function Ej(a) {
  var b = a.ye;
  null != b && nj.call(null, b);
  return Bj.call(null, a);
}
;function Fj(a) {
  var b = a.cljsState;
  return null != b ? b : a.cljsState = mj.call(null, null);
}
function Gj(a, b) {
  return of.call(null, Fj.call(null, a), Ah, b);
}
var Ij = function Hj(b) {
  var c = b.cljsRender;
  if (!aj.call(null, c)) {
    throw Error("Assert failed: " + x.a(nf.call(null, V(new D("util", "clj-ifn?", "util/clj-ifn?", 259370460, null), new D(null, "f", "f", 43394975, null)))));
  }
  var d = Vi.call(null, b), e = null == b.componentFunction ? c.call(null, b) : function() {
    var b = d.cljsArgv;
    switch(P.call(null, b)) {
      case 1:
        return c.call(null);
      case 2:
        return c.call(null, R.call(null, b, 1));
      case 3:
        return c.call(null, R.call(null, b, 1), R.call(null, b, 2));
      case 4:
        return c.call(null, R.call(null, b, 1), R.call(null, b, 2), R.call(null, b, 3));
      case 5:
        return c.call(null, R.call(null, b, 1), R.call(null, b, 2), R.call(null, b, 3), R.call(null, b, 4));
      default:
        return U.call(null, c, eg.call(null, b, 1));
    }
  }();
  return Pd.call(null, e) ? b.gf(e, d.cljsLevel) : Xd.call(null, e) ? (b.cljsRender = e, Hj.call(null, b)) : e;
};
function Jj(a, b) {
  var c = a instanceof s ? a.ea : null;
  switch(c) {
    case "componentWillUnmount":
      return function() {
        return function() {
          Ej.call(null, this);
          return null == b ? null : b.call(null, this);
        };
      }(c);
    case "componentDidUpdate":
      return function() {
        return function(a) {
          return b.call(null, this, a.cljsArgv);
        };
      }(c);
    case "componentWillUpdate":
      return function() {
        return function(a) {
          return b.call(null, this, a.cljsArgv);
        };
      }(c);
    case "shouldComponentUpdate":
      return function() {
        return function(a) {
          var c = Vi.call(null, this).cljsArgv;
          a = a.cljsArgv;
          return null == b ? ob.call(null, fj.call(null, c, a)) : b.call(null, this, c, a);
        };
      }(c);
    case "componentWillReceiveProps":
      return function() {
        return function(a) {
          return b.call(null, this, a.cljsArgv);
        };
      }(c);
    case "getInitialState":
      return function() {
        return function() {
          return Gj.call(null, this, b.call(null, this));
        };
      }(c);
    case "getDefaultProps":
      throw Error("Assert failed: getDefaultProps not supported yet\n" + x.a(nf.call(null, !1)));;
    default:
      return null;
  }
}
function Kj(a) {
  return Xd.call(null, a) ? function() {
    function b(a) {
      var b = null;
      0 < arguments.length && (b = M(Array.prototype.slice.call(arguments, 0), 0));
      return c.call(this, b);
    }
    function c(b) {
      return U.call(null, a, this, b);
    }
    b.k = 0;
    b.e = function(a) {
      a = E(a);
      return c(a);
    };
    b.c = c;
    return b;
  }() : a;
}
var Lj = new Ch(null, new n(null, 3, [new s(null, "cljsRender", "cljsRender", 247449928), null, new s(null, "render", "render", -1408033454), null, new s(null, "componentFunction", "componentFunction", 825866104), null], null), null);
function Mj(a) {
  Xd.call(null, a) && (a.__reactDontBind = !0);
  return a;
}
function Nj(a, b, c) {
  if (t(Lj.call(null, a))) {
    return Mj.call(null, b);
  }
  var d = Jj.call(null, a, b);
  if (t(t(d) ? b : d) && !Xd.call(null, b)) {
    throw Error("Assert failed: " + x.a("Expected function in " + x.a(c) + x.a(a) + " but got " + x.a(b)) + "\n" + x.a(nf.call(null, V(new D(null, "ifn?", "ifn?", -2106461064, null), new D(null, "f", "f", 43394975, null)))));
  }
  return t(d) ? d : Kj.call(null, b);
}
var Oj = new n(null, 2, [new s(null, "shouldComponentUpdate", "shouldComponentUpdate", 1795750960), null, new s(null, "componentWillUnmount", "componentWillUnmount", 1573788814), null], null), Pj = Wi.call(null, Zi);
function Qj(a) {
  return ae.call(null, function(a, c, d) {
    return T.call(null, a, Ae.call(null, Pj.call(null, c)), d);
  }, Ag, a);
}
function Rj(a) {
  return Ah.call(null, Oj, a);
}
function Sj(a, b) {
  return T.call(null, a, new s(null, "cljsRender", "cljsRender", 247449928), b, new s(null, "render", "render", -1408033454), t(Ui) ? function() {
    return Dj.call(null, this, function(a) {
      return function() {
        return Ij.call(null, a);
      };
    }(this));
  } : function() {
    return Ij.call(null, this);
  });
}
function Tj(a) {
  var b = function() {
    var b = (new s(null, "componentFunction", "componentFunction", 825866104)).a(a);
    return t(b) ? b : (new s(null, "render", "render", -1408033454)).a(a);
  }();
  if (!aj.call(null, b)) {
    throw Error("Assert failed: " + x.a("Render must be a function, not " + x.a(nf.call(null, b))) + "\n" + x.a(nf.call(null, V(new D("util", "clj-ifn?", "util/clj-ifn?", 259370460, null), new D(null, "render-fun", "render-fun", -1209513086, null)))));
  }
  var c = null, d = function() {
    var c = (new s(null, "displayName", "displayName", -809144601)).a(a);
    if (t(c)) {
      return c;
    }
    c = b.gg;
    return t(c) ? c : b.name;
  }(), e = Kd.call(null, d) ? "" + x.a(fi.call(null, "reagent")) : d, f = Sj.call(null, T.call(null, a, new s(null, "displayName", "displayName", -809144601), e), b);
  return ae.call(null, function(a, b, c, d) {
    return function(a, b, c) {
      return T.call(null, a, b, Nj.call(null, b, c, d));
    };
  }(b, c, d, e, f), Ag, f);
}
function Uj(a) {
  return ae.call(null, function(a, c, d) {
    a[ze.call(null, c)] = d;
    return a;
  }, {}, a);
}
function Vj(a) {
  return Uj.call(null, Tj.call(null, Rj.call(null, Qj.call(null, a))));
}
function Wj(a, b) {
  if (!Od.call(null, a)) {
    throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "map?", "map?", -1780568534, null), new D(null, "body", "body", -408674142, null)))));
  }
  var c = Vj.call(null, a), d = c.gf = Mj.call(null, b), e = Ii.createClass(c), c = function(a, c, d) {
    return function() {
      function a(b) {
        var d = null;
        0 < arguments.length && (d = M(Array.prototype.slice.call(arguments, 0), 0));
        return c.call(this, d);
      }
      function c(a) {
        return b.call(null, U.call(null, cg, d, a));
      }
      a.k = 0;
      a.e = function(a) {
        a = E(a);
        return c(a);
      };
      a.c = c;
      return a;
    }();
  }(c, d, e);
  c.vc = e;
  e.vc = e;
  return c;
}
;var Xj = /([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?/, Yj = Ii.DOM, Zj = new n(null, 3, [new s(null, "class", "class", -2030961996), "className", new s(null, "for", "for", -1323786319), "htmlFor", new s(null, "charset", "charset", -1063822193), "charSet"], null);
function ak(a) {
  return a instanceof s || a instanceof D || "string" === typeof a;
}
function bk(a) {
  return ak.call(null, a) || aj.call(null, a);
}
function ck(a) {
  return Xd.call(null, a) ? a instanceof s ? ze.call(null, a) : a instanceof D ? "" + x.a(a) : Ld.call(null, a) ? ki.call(null, a) : function() {
    function b(a) {
      var b = null;
      0 < arguments.length && (b = M(Array.prototype.slice.call(arguments, 0), 0));
      return c.call(this, b);
    }
    function c(b) {
      return U.call(null, a, b);
    }
    b.k = 0;
    b.e = function(a) {
      a = E(a);
      return c(a);
    };
    b.c = c;
    return b;
  }() : a;
}
var dk = Wi.call(null, function(a) {
  var b = Zj.call(null, a);
  return t(b) ? b : Zi.call(null, a);
});
Wi.call(null, Zi);
function ek(a) {
  return Od.call(null, a) ? ae.call(null, function(a, c, d) {
    a[dk.call(null, c)] = ck.call(null, d);
    return a;
  }, {}, a) : ck.call(null, a);
}
function fk(a, b) {
  var c = R.call(null, b, 0, null), d = R.call(null, b, 1, null), e = a.id;
  a.id = null != e ? e : c;
  null == d ? d = null : (c = a.className, d = null != c ? "" + x.a(d) + " " + x.a(c) : d, d = a.className = d);
  return d;
}
function gk(a, b) {
  if (Kd.call(null, a) && null == b) {
    return null;
  }
  if (qb.call(null, a) === Object) {
    return a;
  }
  var c = ae.call(null, function(a, b, c) {
    b = dk.call(null, b);
    "key" !== b && (a[b] = ek.call(null, c));
    return a;
  }, {}, a);
  null != b && fk.call(null, c, b);
  return c;
}
function hk(a, b, c) {
  b = b.call(null, c);
  Aj.call(null, a);
  return b;
}
function ik(a) {
  var b = a.yf;
  if (null == b) {
    return null;
  }
  a = a.getDOMNode();
  return Ye.call(null, b, a.value) ? a.value = b : null;
}
function jk(a, b) {
  var c = b.onChange, d = null == c ? null : b.value;
  a.yf = d;
  if (null == d) {
    return null;
  }
  Bj.call(null, a);
  b.defaultValue = d;
  b.value = null;
  b.onChange = function(b, c) {
    return function(b) {
      return hk.call(null, a, c, b);
    };
  }(b, c, d);
  return b;
}
var kk;
a: {
  var lk = [Yj.input, Yj.textarea], mk = lk.length;
  if (mk <= Bg) {
    for (var nk = 0, ok = Te.call(null, Ag);;) {
      if (nk < mk) {
        var pk = nk + 1, qk = yc.call(null, ok, lk[nk], null), nk = pk, ok = qk
      } else {
        kk = new Ch(null, xc.call(null, ok), null);
        break a;
      }
    }
  } else {
    for (nk = 0, ok = Te.call(null, Eh);;) {
      if (nk < mk) {
        var rk = nk + 1, sk = wc.call(null, ok, lk[nk]), nk = rk, ok = sk
      } else {
        kk = xc.call(null, ok);
        break a;
      }
    }
  }
  kk = void 0;
}
function tk(a, b, c, d) {
  var e = Vi.call(null, a), f = e.cljsArgv, g = R.call(null, f, 1, null), l = null == g || Od.call(null, g), e = uk.call(null, f, l ? 2 : 1, e.cljsLevel + 1);
  c = gk.call(null, l ? g : null, c);
  null != d && d.call(null, a, c);
  e[0] = c;
  return b.apply(null, e);
}
function vk(a, b) {
  return ob.call(null, fj.call(null, Vi.call(null, a).cljsArgv, b.cljsArgv));
}
function wk(a) {
  a.componentDidUpdate = function() {
    return function() {
      return ik.call(null, this);
    };
  }(a);
  a.componentWillUnmount = function() {
    return function() {
      return Ej.call(null, this);
    };
  }(a);
  return a;
}
function xk(a, b, c) {
  var d = kk.call(null, a), e = t(d) ? jk : null;
  c = {displayName:t(c) ? c : "ComponentWrapper", shouldComponentUpdate:function() {
    return function(a) {
      return vk.call(null, this, a);
    };
  }(d, e), render:function(c, d) {
    return function() {
      return tk.call(null, this, a, b, d);
    };
  }(d, e)};
  t(d) && wk.call(null, c);
  return Ii.createClass(c);
}
function yk(a) {
  var b = L.call(null, Oh.call(null, Xj, ze.call(null, a))), c = R.call(null, b, 0, null), d = R.call(null, b, 1, null), b = R.call(null, b, 2, null), c = Yj[c], b = t(b) ? Ji.call(null, b, /\./, " ") : null;
  if (!t(c)) {
    throw Error("Assert failed: " + x.a("Unknown tag: '" + x.a(a) + "'") + "\n" + x.a(nf.call(null, new D(null, "comp", "comp", -1462482139, null))));
  }
  return new X(null, 2, 5, Y, [c, t(t(d) ? d : b) ? new X(null, 2, 5, Y, [d, b], null) : null], null);
}
var zk = Wi.call(null, function(a) {
  var b = yk.call(null, a), c = R.call(null, b, 0, null), b = R.call(null, b, 1, null);
  return xk.call(null, c, b, "" + x.a(a));
});
function Ak(a) {
  var b = Gd.call(null, a), b = T.call(null, b, new s(null, "component-function", "component-function", 654728922), a), b = Bk.call(null, b).vc;
  return a.vc = b;
}
function Ck(a) {
  if (ak.call(null, a)) {
    return zk.call(null, a);
  }
  var b = a.vc;
  return null != b ? b : t(Ii.isValidClass(a)) ? a.vc = xk.call(null, a, null, null) : Ak.call(null, a);
}
function Dk(a) {
  return Od.call(null, a) ? S.call(null, a, new s(null, "key", "key", -1516042587)) : null;
}
function Ek(a, b) {
  if (!(0 < P.call(null, a))) {
    throw Error("Assert failed: Hiccup form should not be empty\n" + x.a(nf.call(null, V(new D(null, "pos?", "pos?", -244377722, null), V(new D(null, "count", "count", -514511684, null), new D(null, "v", "v", 1661996586, null))))));
  }
  if (!bk.call(null, R.call(null, a, 0))) {
    throw Error("Assert failed: " + x.a("Invalid Hiccup form: " + x.a(nf.call(null, a))) + "\n" + x.a(nf.call(null, V(new D(null, "valid-tag?", "valid-tag?", 1243064160, null), V(new D(null, "nth", "nth", 1529209554, null), new D(null, "v", "v", 1661996586, null), 0)))));
  }
  var c = Ck.call(null, R.call(null, a, 0)), d = {};
  d.cljsArgv = a;
  d.cljsLevel = b;
  var e = Dk.call(null, Gd.call(null, a)), e = null == e ? Dk.call(null, R.call(null, a, 1, null)) : e;
  null != e && (d.key = e);
  return c.call(null, d);
}
var Fk = {};
function Gk(a) {
  if (t(Fk.Rf)) {
    return null;
  }
  null != console.log && console.log("Warning: Reactive deref not supported in seq in ", nf.call(null, a));
  return Fk.Rf = !0;
}
var Ik = function() {
  function a(a, b) {
    if (Pd.call(null, a)) {
      return Ek.call(null, a, b);
    }
    if (Vd.call(null, a)) {
      if (null != gj) {
        return Hk.call(null, a, b);
      }
      var c = ij.call(null, function() {
        return Hk.call(null, a, b);
      }, Fk);
      t(jj.call(null, Fk)) && Gk.call(null, a);
      return c;
    }
    return a;
  }
  function b(a) {
    return c.call(null, a, 0);
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}();
function Bk(a) {
  return Wj.call(null, a, Ik);
}
function Hk(a, b) {
  for (var c = vb.call(null, a), d = b + 1, e = c.length, f = 0;;) {
    if (f < e) {
      c[f] = Ik.call(null, c[f], d), f += 1;
    } else {
      break;
    }
  }
  return c;
}
function uk(a, b, c) {
  a = vb.call(null, a);
  for (var d = a.length, e = 0;;) {
    if (e < d) {
      e >= b && (a[e] = Ik.call(null, a[e], c)), e += 1;
    } else {
      break;
    }
  }
  2 === b && a.shift();
  return a;
}
;function Jk(a) {
  return Ik.call(null, a);
}
var Kk = function() {
  function a(a, b, c) {
    return Ii.renderComponent(Jk.call(null, a), b, c);
  }
  function b(a, b) {
    return c.call(null, a, b, null);
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.j = b;
  c.q = a;
  return c;
}();
function Lk(a) {
  return a.getDOMNode();
}
var Nk = function() {
  function a(a) {
    return mj.call(null, a);
  }
  var b = null, c = function() {
    function a(c, d) {
      var l = null;
      1 < arguments.length && (l = M(Array.prototype.slice.call(arguments, 1), 0));
      return b.call(this, c, l);
    }
    function b(a, c) {
      return U.call(null, mj, a, c);
    }
    a.k = 1;
    a.e = function(a) {
      var c = F(a);
      a = H(a);
      return b(c, a);
    };
    a.c = b;
    return a;
  }(), b = function(b, e) {
    switch(arguments.length) {
      case 1:
        return a.call(this, b);
      default:
        return c.c(b, M(arguments, 1));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.k = 1;
  b.e = c.e;
  b.a = a;
  b.c = c.c;
  return b;
}();
var Ok, Pk, Qk, Rk, Sk;
function Tk(a, b) {
  if (a ? a.Nd : a) {
    return a.Nd(a, b);
  }
  var c;
  c = Tk[k(null == a ? null : a)];
  if (!c && (c = Tk._, !c)) {
    throw w.call(null, "ReadPort.take!", a);
  }
  return c.call(null, a, b);
}
function Uk(a, b, c) {
  if (a ? a.Od : a) {
    return a.Od(a, b, c);
  }
  var d;
  d = Uk[k(null == a ? null : a)];
  if (!d && (d = Uk._, !d)) {
    throw w.call(null, "WritePort.put!", a);
  }
  return d.call(null, a, b, c);
}
function Vk(a) {
  if (a ? a.Md : a) {
    return a.Md(a);
  }
  var b;
  b = Vk[k(null == a ? null : a)];
  if (!b && (b = Vk._, !b)) {
    throw w.call(null, "Channel.close!", a);
  }
  return b.call(null, a);
}
function Wk(a) {
  if (a ? a.Ob : a) {
    return a.Ob(a);
  }
  var b;
  b = Wk[k(null == a ? null : a)];
  if (!b && (b = Wk._, !b)) {
    throw w.call(null, "Handler.active?", a);
  }
  return b.call(null, a);
}
function Xk(a) {
  if (a ? a.Pb : a) {
    return a.Pb(a);
  }
  var b;
  b = Xk[k(null == a ? null : a)];
  if (!b && (b = Xk._, !b)) {
    throw w.call(null, "Handler.commit", a);
  }
  return b.call(null, a);
}
function Yk(a) {
  if (a ? a.Kd : a) {
    return a.Kd(a);
  }
  var b;
  b = Yk[k(null == a ? null : a)];
  if (!b && (b = Yk._, !b)) {
    throw w.call(null, "Buffer.full?", a);
  }
  return b.call(null, a);
}
function Zk(a) {
  if (a ? a.Ld : a) {
    return a.Ld(a);
  }
  var b;
  b = Zk[k(null == a ? null : a)];
  if (!b && (b = Zk._, !b)) {
    throw w.call(null, "Buffer.remove!", a);
  }
  return b.call(null, a);
}
function $k(a, b) {
  if (a ? a.Jd : a) {
    return a.Jd(a, b);
  }
  var c;
  c = $k[k(null == a ? null : a)];
  if (!c && (c = $k._, !c)) {
    throw w.call(null, "Buffer.add!*", a);
  }
  return c.call(null, a, b);
}
var al = function() {
  function a(a, b) {
    if (null == b) {
      throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "not", "not", 1044554643, null), V(new D(null, "nil?", "nil?", 1612038930, null), new D(null, "itm", "itm", -713282527, null))))));
    }
    return $k.call(null, a, b);
  }
  var b = null, b = function(b, d) {
    switch(arguments.length) {
      case 1:
        return b;
      case 2:
        return a.call(this, b, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.a = function(a) {
    return a;
  };
  b.j = a;
  return b;
}();
function bl(a, b, c, d, e) {
  for (var f = 0;;) {
    if (f < e) {
      c[d + f] = a[b + f], f += 1;
    } else {
      return null;
    }
  }
}
function cl(a, b, c, d) {
  this.head = a;
  this.N = b;
  this.length = c;
  this.b = d;
}
cl.prototype.pop = function() {
  if (0 === this.length) {
    return null;
  }
  var a = this.b[this.N];
  this.b[this.N] = null;
  this.N = (this.N + 1) % this.b.length;
  this.length -= 1;
  return a;
};
cl.prototype.unshift = function(a) {
  this.b[this.head] = a;
  this.head = (this.head + 1) % this.b.length;
  this.length += 1;
  return null;
};
function dl(a, b) {
  a.length + 1 === a.b.length && a.resize();
  a.unshift(b);
}
cl.prototype.resize = function() {
  var a = Array(2 * this.b.length);
  return this.N < this.head ? (bl.call(null, this.b, this.N, a, 0, this.length), this.N = 0, this.head = this.length, this.b = a) : this.N > this.head ? (bl.call(null, this.b, this.N, a, 0, this.b.length - this.N), bl.call(null, this.b, 0, a, this.b.length - this.N, this.head), this.N = 0, this.head = this.length, this.b = a) : this.N === this.head ? (this.head = this.N = 0, this.b = a) : null;
};
function el(a, b) {
  for (var c = a.length, d = 0;;) {
    if (d < c) {
      var e = a.pop();
      b.call(null, e) && a.unshift(e);
      d += 1;
    } else {
      break;
    }
  }
}
function fl(a) {
  if (!(0 < a)) {
    throw Error("Assert failed: Can't create a ring buffer of size 0\n" + x.a(nf.call(null, V(new D(null, "\x3e", "\x3e", 1085014381, null), new D(null, "n", "n", -2092305744, null), 0))));
  }
  return new cl(0, 0, 0, Array(a));
}
function gl(a, b) {
  this.J = a;
  this.Zd = b;
  this.o = 0;
  this.g = 2;
}
gl.prototype.Q = function() {
  return this.J.length;
};
gl.prototype.Kd = function() {
  return this.J.length === this.Zd;
};
gl.prototype.Ld = function() {
  return this.J.pop();
};
gl.prototype.Jd = function(a, b) {
  dl(this.J, b);
  return this;
};
function hl(a) {
  return new gl(fl.call(null, a), a);
}
function il(a, b) {
  this.J = a;
  this.Zd = b;
  this.o = 0;
  this.g = 2;
}
il.prototype.Q = function() {
  return this.J.length;
};
il.prototype.Kd = function() {
  return!1;
};
il.prototype.Ld = function() {
  return this.J.pop();
};
il.prototype.Jd = function(a, b) {
  this.J.length === this.Zd && Zk.call(null, this);
  this.J.unshift(b);
  return this;
};
function jl(a) {
  return new il(fl.call(null, a), a);
}
;var kl = null, ll = fl.call(null, 32), ml = !1, nl = !1;
function ol() {
  ml = !0;
  nl = !1;
  for (var a = 0;;) {
    var b = ll.pop();
    if (null != b && (b.call(null), 1024 > a)) {
      a += 1;
      continue;
    }
    break;
  }
  ml = !1;
  return 0 < ll.length ? pl.call(null) : null;
}
"undefined" !== typeof MessageChannel && (kl = new MessageChannel, kl.port1.onmessage = function() {
  return ol.call(null);
});
function pl() {
  var a = nl;
  if (t(a ? ml : a)) {
    return null;
  }
  nl = !0;
  return "undefined" !== typeof MessageChannel ? kl.port2.postMessage(0) : "undefined" !== typeof setImmediate ? setImmediate(ol) : setTimeout(ol, 0);
}
function ql(a) {
  dl(ll, a);
  return pl.call(null);
}
function rl(a, b) {
  return setTimeout(a, b);
}
;var sl, ul = function tl(b) {
  "undefined" === typeof sl && (sl = function(b, d, e) {
    this.m = b;
    this.hf = d;
    this.Jf = e;
    this.o = 0;
    this.g = 425984;
  }, sl.bb = !0, sl.ab = "cljs.core.async.impl.channels/t16061", sl.ub = function(b, d) {
    return oc.call(null, d, "cljs.core.async.impl.channels/t16061");
  }, sl.prototype.Ab = function() {
    return this.m;
  }, sl.prototype.B = function() {
    return this.Jf;
  }, sl.prototype.D = function(b, d) {
    return new sl(this.m, this.hf, d);
  });
  return new sl(b, tl, null);
};
function vl(a, b) {
  this.Ua = a;
  this.m = b;
}
function wl(a) {
  return Wk.call(null, a.Ua);
}
function xl(a) {
  if (a ? a.ue : a) {
    return a.ue();
  }
  var b;
  b = xl[k(null == a ? null : a)];
  if (!b && (b = xl._, !b)) {
    throw w.call(null, "MMC.abort", a);
  }
  return b.call(null, a);
}
function yl(a, b, c, d, e, f, g) {
  this.Kb = a;
  this.Zc = b;
  this.xb = c;
  this.Yc = d;
  this.J = e;
  this.closed = f;
  this.Fc = g;
}
yl.prototype.Md = function() {
  var a = this;
  if (!a.closed) {
    for (a.closed = !0, t(function() {
      var b = a.J;
      return t(b) ? 0 === a.xb.length : b;
    }()) && a.Fc.call(null, a.J);;) {
      var b = a.Kb.pop();
      if (null != b) {
        if (Wk.call(null, b)) {
          var c = Xk.call(null, b), d = t(function() {
            var b = a.J;
            return t(b) ? 0 < P.call(null, a.J) : b;
          }()) ? Zk.call(null, a.J) : null;
          ql.call(null, function(a, b) {
            return function() {
              return a.call(null, b);
            };
          }(c, d, b, this));
        }
      } else {
        break;
      }
    }
  }
  return null;
};
yl.prototype.Nd = function(a, b) {
  var c = this;
  if (Wk.call(null, b)) {
    if (null != c.J && 0 < P.call(null, c.J)) {
      for (var d = Xk.call(null, b), e = ul.call(null, Zk.call(null, c.J));;) {
        if (!t(Yk.call(null, c.J))) {
          var f = c.xb.pop();
          if (null != f) {
            var g = f.Ua, l = f.m;
            if (Wk.call(null, g)) {
              var m = Xk.call(null, g);
              Xk.call(null, b);
              ql.call(null, function(a) {
                return function() {
                  return a.call(null, !0);
                };
              }(m, g, l, f, d, e, this));
              kd.call(null, c.Fc.call(null, c.J, l)) && xl.call(null, this);
            }
            continue;
          }
        }
        break;
      }
      return e;
    }
    d = function() {
      for (;;) {
        var a = c.xb.pop();
        if (t(a)) {
          if (Wk.call(null, a.Ua)) {
            return a;
          }
        } else {
          return null;
        }
      }
    }();
    if (t(d)) {
      return e = Xk.call(null, d.Ua), Xk.call(null, b), ql.call(null, function(a) {
        return function() {
          return a.call(null, !0);
        };
      }(e, d, this)), ul.call(null, d.m);
    }
    if (t(c.closed)) {
      return t(c.J) && c.Fc.call(null, c.J), t(function() {
        var a = Wk.call(null, b);
        return t(a) ? Xk.call(null, b) : a;
      }()) ? (d = function() {
        var a = c.J;
        return t(a) ? 0 < P.call(null, c.J) : a;
      }(), d = t(d) ? Zk.call(null, c.J) : null, ul.call(null, d)) : null;
    }
    64 < c.Zc ? (c.Zc = 0, el(c.Kb, Wk)) : c.Zc += 1;
    if (!(1024 > c.Kb.length)) {
      throw Error("Assert failed: " + x.a("No more than " + x.a(1024) + " pending takes are allowed on a single channel.") + "\n" + x.a(nf.call(null, V(new D(null, "\x3c", "\x3c", 993667236, null), V(new D(null, ".-length", ".-length", -280799999, null), new D(null, "takes", "takes", 298247964, null)), new D("impl", "MAX-QUEUE-SIZE", "impl/MAX-QUEUE-SIZE", 1508600732, null)))));
    }
    dl(c.Kb, b);
  }
  return null;
};
yl.prototype.Od = function(a, b, c) {
  var d = this;
  if (null == b) {
    throw Error("Assert failed: Can't put nil in on a channel\n" + x.a(nf.call(null, V(new D(null, "not", "not", 1044554643, null), V(new D(null, "nil?", "nil?", 1612038930, null), new D(null, "val", "val", 1769233139, null))))));
  }
  if ((a = d.closed) || !Wk.call(null, c)) {
    return ul.call(null, !a);
  }
  if (t(function() {
    var a = d.J;
    return t(a) ? ob.call(null, Yk.call(null, d.J)) : a;
  }())) {
    Xk.call(null, c);
    for (c = kd.call(null, d.Fc.call(null, d.J, b));;) {
      if (0 < d.Kb.length && 0 < P.call(null, d.J)) {
        var e = d.Kb.pop();
        if (Wk.call(null, e)) {
          var f = Xk.call(null, e), g = Zk.call(null, d.J);
          ql.call(null, function(a, b) {
            return function() {
              return a.call(null, b);
            };
          }(f, g, e, c, a, this));
        } else {
          continue;
        }
      }
      break;
    }
    c && xl.call(null, this);
    return ul.call(null, !0);
  }
  e = function() {
    for (;;) {
      var a = d.Kb.pop();
      if (t(a)) {
        if (t(Wk.call(null, a))) {
          return a;
        }
      } else {
        return null;
      }
    }
  }();
  if (t(e)) {
    return f = Xk.call(null, e), Xk.call(null, c), ql.call(null, function(a) {
      return function() {
        return a.call(null, b);
      };
    }(f, e, a, this)), ul.call(null, !0);
  }
  64 < d.Yc ? (d.Yc = 0, el(d.xb, wl)) : d.Yc += 1;
  if (!(1024 > d.xb.length)) {
    throw Error("Assert failed: " + x.a("No more than " + x.a(1024) + " pending puts are allowed on a single channel. Consider using a windowed buffer.") + "\n" + x.a(nf.call(null, V(new D(null, "\x3c", "\x3c", 993667236, null), V(new D(null, ".-length", ".-length", -280799999, null), new D(null, "puts", "puts", -1883877054, null)), new D("impl", "MAX-QUEUE-SIZE", "impl/MAX-QUEUE-SIZE", 1508600732, null)))));
  }
  dl(d.xb, new vl(c, b));
  return null;
};
yl.prototype.ue = function() {
  for (;;) {
    var a = this.xb.pop();
    if (null != a) {
      var b = a.Ua, c = a.m;
      if (Wk.call(null, b)) {
        var d = Xk.call(null, b);
        ql.call(null, function(a) {
          return function() {
            return a.call(null, !0);
          };
        }(d, b, c, a, this));
      } else {
        continue;
      }
    }
    break;
  }
  el(this.xb, ef.call(null, !1));
  return Vk.call(null, this);
};
function zl(a) {
  console.log(a);
  return null;
}
function Al(a, b, c) {
  b = (t(b) ? b : zl).call(null, c);
  return null == b ? a : al.call(null, a, b);
}
var Bl = function() {
  function a(a, b, c) {
    return new yl(fl.call(null, 32), 0, fl.call(null, 32), 0, a, !1, function() {
      return function(a) {
        return function() {
          function b(d, e) {
            try {
              return a.call(null, d, e);
            } catch (f) {
              return Al.call(null, d, c, f);
            }
          }
          function d(b) {
            try {
              return a.call(null, b);
            } catch (e) {
              return Al.call(null, b, c, e);
            }
          }
          var e = null, e = function(a, c) {
            switch(arguments.length) {
              case 1:
                return d.call(this, a);
              case 2:
                return b.call(this, a, c);
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          e.a = d;
          e.j = b;
          return e;
        }();
      }(t(b) ? b.call(null, al) : al);
    }());
  }
  function b(a, b) {
    return d.call(null, a, b, null);
  }
  function c(a) {
    return d.call(null, a, null);
  }
  var d = null, d = function(d, f, g) {
    switch(arguments.length) {
      case 1:
        return c.call(this, d);
      case 2:
        return b.call(this, d, f);
      case 3:
        return a.call(this, d, f, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.a = c;
  d.j = b;
  d.q = a;
  return d;
}();
var Cl;
function Dl(a, b) {
  return a[b];
}
var Fl = function El(b) {
  "undefined" === typeof Cl && (Cl = function(b, d, e) {
    this.X = b;
    this.Ud = d;
    this.If = e;
    this.o = 0;
    this.g = 393216;
  }, Cl.bb = !0, Cl.ab = "cljs.core.async.impl.ioc-helpers/t15988", Cl.ub = function(b, d) {
    return oc.call(null, d, "cljs.core.async.impl.ioc-helpers/t15988");
  }, Cl.prototype.Ob = function() {
    return!0;
  }, Cl.prototype.Pb = function() {
    return this.X;
  }, Cl.prototype.B = function() {
    return this.If;
  }, Cl.prototype.D = function(b, d) {
    return new Cl(this.X, this.Ud, d);
  });
  return new Cl(b, El, null);
};
function Gl(a) {
  return Dl.call(null, a, 0).call(null, a);
}
function Hl(a) {
  try {
    return Gl.call(null, a);
  } catch (b) {
    throw b instanceof Object && Vk.call(null, Dl.call(null, a, 6)), b;
  }
}
function Il(a, b, c) {
  c = Tk.call(null, c, Fl.call(null, function(c) {
    a[2] = c;
    a[1] = b;
    return Hl.call(null, a);
  }));
  return t(c) ? (a[2] = N.call(null, c), a[1] = b, new s(null, "recur", "recur", -437573268)) : null;
}
function Jl(a, b, c, d) {
  c = Uk.call(null, c, d, Fl.call(null, function(c) {
    a[2] = c;
    a[1] = b;
    return Hl.call(null, a);
  }));
  return t(c) ? (a[2] = N.call(null, c), a[1] = b, new s(null, "recur", "recur", -437573268)) : null;
}
var Ll = function() {
  function a(a, d, e, f) {
    var g = null;
    3 < arguments.length && (g = M(Array.prototype.slice.call(arguments, 3), 0));
    return b.call(this, a, d, e, g);
  }
  function b(a, b, e, f) {
    var g = Vd.call(null, f) ? U.call(null, kf, f) : f;
    a[1] = b;
    b = Kl.call(null, function() {
      return function(b) {
        a[2] = b;
        return Hl.call(null, a);
      };
    }(f, g, g), e, g);
    return t(b) ? (a[2] = N.call(null, b), new s(null, "recur", "recur", -437573268)) : null;
  }
  a.k = 3;
  a.e = function(a) {
    var d = F(a);
    a = L(a);
    var e = F(a);
    a = L(a);
    var f = F(a);
    a = H(a);
    return b(d, e, f, a);
  };
  a.c = b;
  return a;
}();
function Ml(a, b) {
  var c = a[6];
  null != b && Uk.call(null, c, b, Fl.call(null, function() {
    return function() {
      return null;
    };
  }(c)));
  Vk.call(null, c);
  return c;
}
function Nl(a, b, c, d, e, f, g) {
  this.Oa = a;
  this.Pa = b;
  this.Sa = c;
  this.Ra = d;
  this.Wa = e;
  this.r = f;
  this.p = g;
  this.g = 2229667594;
  this.o = 8192;
  5 < arguments.length ? (this.r = f, this.p = g) : this.p = this.r = null;
}
h = Nl.prototype;
h.A = function(a, b) {
  return Lb.call(null, this, b, null);
};
h.G = function(a, b, c) {
  switch(b instanceof s ? b.ea : null) {
    case "prev":
      return this.Wa;
    case "continue-block":
      return this.Ra;
    case "finally-block":
      return this.Sa;
    case "catch-exception":
      return this.Pa;
    case "catch-block":
      return this.Oa;
    default:
      return S.call(null, this.p, b, c);
  }
};
h.H = function(a, b, c) {
  return Th.call(null, b, function() {
    return function(a) {
      return Th.call(null, b, Zh, "", " ", "", c, a);
    };
  }(this), "#cljs.core.async.impl.ioc-helpers.ExceptionFrame{", ", ", "}", c, Re.call(null, new X(null, 5, 5, Y, [new X(null, 2, 5, Y, [new s(null, "catch-block", "catch-block", 1175212748), this.Oa], null), new X(null, 2, 5, Y, [new s(null, "catch-exception", "catch-exception", -1997306795), this.Pa], null), new X(null, 2, 5, Y, [new s(null, "finally-block", "finally-block", 832982472), this.Sa], null), new X(null, 2, 5, Y, [new s(null, "continue-block", "continue-block", -1852047850), this.Ra], 
  null), new X(null, 2, 5, Y, [new s(null, "prev", "prev", -1597069226), this.Wa], null)], null), this.p));
};
h.B = function() {
  return this.r;
};
h.Q = function() {
  return 5 + P.call(null, this.p);
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = ne.call(null, this);
};
h.C = function(a, b) {
  return t(t(b) ? this.constructor === b.constructor && pg.call(null, this, b) : b) ? !0 : !1;
};
h.rb = function(a, b) {
  return Zd.call(null, new Ch(null, new n(null, 5, [new s(null, "finally-block", "finally-block", 832982472), null, new s(null, "catch-block", "catch-block", 1175212748), null, new s(null, "catch-exception", "catch-exception", -1997306795), null, new s(null, "prev", "prev", -1597069226), null, new s(null, "continue-block", "continue-block", -1852047850), null], null), null), b) ? Dd.call(null, sd.call(null, zf.call(null, Ag, this), this.r), b) : new Nl(this.Oa, this.Pa, this.Sa, this.Ra, this.Wa, 
  this.r, Ze.call(null, Dd.call(null, this.p, b)), null);
};
h.Fa = function(a, b, c) {
  return t(xe.call(null, new s(null, "catch-block", "catch-block", 1175212748), b)) ? new Nl(c, this.Pa, this.Sa, this.Ra, this.Wa, this.r, this.p, null) : t(xe.call(null, new s(null, "catch-exception", "catch-exception", -1997306795), b)) ? new Nl(this.Oa, c, this.Sa, this.Ra, this.Wa, this.r, this.p, null) : t(xe.call(null, new s(null, "finally-block", "finally-block", 832982472), b)) ? new Nl(this.Oa, this.Pa, c, this.Ra, this.Wa, this.r, this.p, null) : t(xe.call(null, new s(null, "continue-block", 
  "continue-block", -1852047850), b)) ? new Nl(this.Oa, this.Pa, this.Sa, c, this.Wa, this.r, this.p, null) : t(xe.call(null, new s(null, "prev", "prev", -1597069226), b)) ? new Nl(this.Oa, this.Pa, this.Sa, this.Ra, c, this.r, this.p, null) : new Nl(this.Oa, this.Pa, this.Sa, this.Ra, this.Wa, this.r, T.call(null, this.p, b, c), null);
};
h.M = function() {
  return E.call(null, Re.call(null, new X(null, 5, 5, Y, [new X(null, 2, 5, Y, [new s(null, "catch-block", "catch-block", 1175212748), this.Oa], null), new X(null, 2, 5, Y, [new s(null, "catch-exception", "catch-exception", -1997306795), this.Pa], null), new X(null, 2, 5, Y, [new s(null, "finally-block", "finally-block", 832982472), this.Sa], null), new X(null, 2, 5, Y, [new s(null, "continue-block", "continue-block", -1852047850), this.Ra], null), new X(null, 2, 5, Y, [new s(null, "prev", "prev", 
  -1597069226), this.Wa], null)], null), this.p));
};
h.D = function(a, b) {
  return new Nl(this.Oa, this.Pa, this.Sa, this.Ra, this.Wa, b, this.p, this.n);
};
h.P = function(a, b) {
  return Pd.call(null, b) ? Nb.call(null, this, A.call(null, b, 0), A.call(null, b, 1)) : ub.call(null, Db, this, b);
};
function Ol(a, b, c, d, e) {
  return new Nl(a, b, c, d, e);
}
function Pl(a, b, c, d, e) {
  a[4] = Ol.call(null, b, c, d, e, Dl.call(null, a, 4));
  return a;
}
function Ql(a) {
  for (;;) {
    var b = Dl.call(null, a, 4), c = (new s(null, "catch-block", "catch-block", 1175212748)).a(b), d = (new s(null, "catch-exception", "catch-exception", -1997306795)).a(b), e = Dl.call(null, a, 5);
    if (t(function() {
      var a = e;
      return t(a) ? ob.call(null, b) : a;
    }())) {
      throw e;
    }
    if (t(function() {
      var a = e;
      return t(a) ? (a = c, t(a) ? e instanceof d : a) : a;
    }())) {
      return a[1] = c, a[2] = e, a[5] = null, a[4] = T.call(null, b, new s(null, "catch-block", "catch-block", 1175212748), null, new s(null, "catch-exception", "catch-exception", -1997306795), null), a;
    }
    if (t(function() {
      var a = e;
      return t(a) ? ob.call(null, c) && ob.call(null, (new s(null, "finally-block", "finally-block", 832982472)).a(b)) : a;
    }())) {
      a[4] = (new s(null, "prev", "prev", -1597069226)).a(b);
    } else {
      if (t(function() {
        var a = e;
        return t(a) ? (a = ob.call(null, c)) ? (new s(null, "finally-block", "finally-block", 832982472)).a(b) : a : a;
      }()) || t(function() {
        var a = ob.call(null, e);
        return a ? (new s(null, "finally-block", "finally-block", 832982472)).a(b) : a;
      }())) {
        return a[1] = (new s(null, "finally-block", "finally-block", 832982472)).a(b), a[4] = T.call(null, b, new s(null, "finally-block", "finally-block", 832982472), null), a;
      }
      if (ob.call(null, e) && ob.call(null, (new s(null, "finally-block", "finally-block", 832982472)).a(b))) {
        return a[1] = (new s(null, "continue-block", "continue-block", -1852047850)).a(b), a[4] = (new s(null, "prev", "prev", -1597069226)).a(b), a;
      }
      throw Error("No matching clause");
    }
  }
}
;var Rl = function() {
  function a(a) {
    for (;;) {
      if (.5 > Math.random() && 15 > a) {
        a += 1;
      } else {
        return a;
      }
    }
  }
  function b() {
    return c.call(null, 0);
  }
  var c = null, c = function(c) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return a.call(this, c);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.Z = b;
  c.a = a;
  return c;
}();
function Sl(a, b, c) {
  this.key = a;
  this.m = b;
  this.forward = c;
  this.o = 0;
  this.g = 2155872256;
}
Sl.prototype.H = function(a, b, c) {
  return Th.call(null, b, Zh, "[", " ", "]", c, this);
};
Sl.prototype.M = function() {
  return Db.call(null, Db.call(null, dd, this.m), this.key);
};
var Tl = function() {
  function a(a, b, c) {
    c = Array(c + 1);
    for (var g = 0;;) {
      if (g < c.length) {
        c[g] = null, g += 1;
      } else {
        break;
      }
    }
    return new Sl(a, b, c);
  }
  function b(a) {
    return c.call(null, null, null, a);
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 3:
        return a.call(this, c, e, f);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.q = a;
  return c;
}(), Ul = function() {
  function a(a, b, c, g) {
    for (;;) {
      if (0 > c) {
        return a;
      }
      a: {
        for (;;) {
          var l = a.forward[c];
          if (t(l)) {
            if (l.key < b) {
              a = l;
            } else {
              break a;
            }
          } else {
            break a;
          }
        }
        a = void 0;
      }
      null != g && (g[c] = a);
      c -= 1;
    }
  }
  function b(a, b, f) {
    return c.call(null, a, b, f, null);
  }
  var c = null, c = function(c, e, f, g) {
    switch(arguments.length) {
      case 3:
        return b.call(this, c, e, f);
      case 4:
        return a.call(this, c, e, f, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.q = b;
  c.W = a;
  return c;
}();
function Vl(a, b) {
  this.Db = a;
  this.Ha = b;
  this.o = 0;
  this.g = 2155872256;
}
Vl.prototype.H = function(a, b, c) {
  return Th.call(null, b, function() {
    return function(a) {
      return Th.call(null, b, Zh, "", " ", "", c, a);
    };
  }(this), "{", ", ", "}", c, this);
};
Vl.prototype.M = function() {
  return function(a) {
    return function c(d) {
      return new Be(null, function() {
        return function() {
          return null == d ? null : O.call(null, new X(null, 2, 5, Y, [d.key, d.m], null), c.call(null, d.forward[0]));
        };
      }(a), null, null);
    };
  }(this).call(null, this.Db.forward[0]);
};
Vl.prototype.put = function(a, b) {
  var c = Array(15), d = Ul.call(null, this.Db, a, this.Ha, c).forward[0];
  if (null != d && d.key === a) {
    return d.m = b;
  }
  d = Rl.call(null);
  if (d > this.Ha) {
    for (var e = this.Ha + 1;;) {
      if (e <= d + 1) {
        c[e] = this.Db, e += 1;
      } else {
        break;
      }
    }
    this.Ha = d;
  }
  for (d = Tl.call(null, a, b, Array(d));;) {
    return 0 <= this.Ha ? (c = c[0].forward, d.forward[0] = c[0], c[0] = d) : null;
  }
};
Vl.prototype.remove = function(a) {
  var b = Array(15), c = Ul.call(null, this.Db, a, this.Ha, b).forward[0];
  if (null != c && c.key === a) {
    for (a = 0;;) {
      if (a <= this.Ha) {
        var d = b[a].forward;
        d[a] === c && (d[a] = c.forward[a]);
        a += 1;
      } else {
        break;
      }
    }
    for (;;) {
      if (0 < this.Ha && null == this.Db.forward[this.Ha]) {
        this.Ha -= 1;
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
};
function Wl(a) {
  for (var b = Xl, c = b.Db, d = b.Ha;;) {
    if (0 > d) {
      return c === b.Db ? null : c;
    }
    var e;
    a: {
      for (e = c;;) {
        e = e.forward[d];
        if (null == e) {
          e = null;
          break a;
        }
        if (e.key >= a) {
          break a;
        }
      }
      e = void 0;
    }
    null != e ? (d -= 1, c = e) : d -= 1;
  }
}
var Xl = function() {
  return new Vl(Tl.call(null, 0), 0);
}.call(null);
function Yl(a) {
  var b = (new Date).valueOf() + a, c = Wl(b), d = t(t(c) ? c.key < b + 10 : c) ? c.m : null;
  if (t(d)) {
    return d;
  }
  var e = Bl.call(null, null);
  Xl.put(b, e);
  rl.call(null, function(a, b, c) {
    return function() {
      Xl.remove(c);
      return Vk.call(null, a);
    };
  }(e, d, b, c), a);
  return e;
}
;var $l = function Zl(b) {
  "undefined" === typeof Ok && (Ok = function(b, d, e) {
    this.X = b;
    this.Ud = d;
    this.Ef = e;
    this.o = 0;
    this.g = 393216;
  }, Ok.bb = !0, Ok.ab = "cljs.core.async/t12889", Ok.ub = function(b, d) {
    return oc.call(null, d, "cljs.core.async/t12889");
  }, Ok.prototype.Ob = function() {
    return!0;
  }, Ok.prototype.Pb = function() {
    return this.X;
  }, Ok.prototype.B = function() {
    return this.Ef;
  }, Ok.prototype.D = function(b, d) {
    return new Ok(this.X, this.Ud, d);
  });
  return new Ok(b, Zl, null);
};
function am(a) {
  return hl.call(null, a);
}
function bm(a) {
  return jl.call(null, a);
}
var cm = function() {
  function a(a, b, c) {
    a = B.call(null, a, 0) ? null : a;
    if (t(b) && !t(a)) {
      throw Error("Assert failed: buffer must be supplied when transducer is\n" + x.a(nf.call(null, new D(null, "buf-or-n", "buf-or-n", -1646815050, null))));
    }
    return Bl.call(null, "number" === typeof a ? am.call(null, a) : a, b, c);
  }
  function b(a, b) {
    return e.call(null, a, b, null);
  }
  function c(a) {
    return e.call(null, a, null, null);
  }
  function d() {
    return e.call(null, null);
  }
  var e = null, e = function(e, g, l) {
    switch(arguments.length) {
      case 0:
        return d.call(this);
      case 1:
        return c.call(this, e);
      case 2:
        return b.call(this, e, g);
      case 3:
        return a.call(this, e, g, l);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  e.Z = d;
  e.a = c;
  e.j = b;
  e.q = a;
  return e;
}();
function dm(a) {
  return Yl.call(null, a);
}
var em = $l.call(null, function() {
  return null;
}), fm = function() {
  function a(a, b, c, d) {
    a = Uk.call(null, a, b, $l.call(null, c));
    return t(a) ? (b = N.call(null, a), t(d) ? c.call(null, b) : ql.call(null, function(a) {
      return function() {
        return c.call(null, a);
      };
    }(b, a, a)), b) : !0;
  }
  function b(a, b, c) {
    return d.call(null, a, b, c, !0);
  }
  function c(a, b) {
    var c = Uk.call(null, a, b, em);
    return t(c) ? N.call(null, c) : !0;
  }
  var d = null, d = function(d, f, g, l) {
    switch(arguments.length) {
      case 2:
        return c.call(this, d, f);
      case 3:
        return b.call(this, d, f, g);
      case 4:
        return a.call(this, d, f, g, l);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.j = c;
  d.q = b;
  d.W = a;
  return d;
}();
function gm(a) {
  return Vk.call(null, a);
}
function hm(a) {
  for (var b = Array(a), c = 0;;) {
    if (c < a) {
      b[c] = 0, c += 1;
    } else {
      break;
    }
  }
  for (c = 1;;) {
    if (B.call(null, c, a)) {
      return b;
    }
    var d = je.call(null, c);
    b[c] = b[d];
    b[d] = c;
    c += 1;
  }
}
var jm = function im() {
  var b = lf.call(null, !0);
  "undefined" === typeof Pk && (Pk = function(b, d, e) {
    this.Cb = b;
    this.ef = d;
    this.Ff = e;
    this.o = 0;
    this.g = 393216;
  }, Pk.bb = !0, Pk.ab = "cljs.core.async/t12902", Pk.ub = function() {
    return function(b, d) {
      return oc.call(null, d, "cljs.core.async/t12902");
    };
  }(b), Pk.prototype.Ob = function() {
    return function() {
      return N.call(null, this.Cb);
    };
  }(b), Pk.prototype.Pb = function() {
    return function() {
      mf.call(null, this.Cb, null);
      return!0;
    };
  }(b), Pk.prototype.B = function() {
    return function() {
      return this.Ff;
    };
  }(b), Pk.prototype.D = function() {
    return function(b, d) {
      return new Pk(this.Cb, this.ef, d);
    };
  }(b));
  return new Pk(b, im, null);
}, lm = function km(b, c) {
  "undefined" === typeof Qk && (Qk = function(b, c, f, g) {
    this.le = b;
    this.Cb = c;
    this.ff = f;
    this.Gf = g;
    this.o = 0;
    this.g = 393216;
  }, Qk.bb = !0, Qk.ab = "cljs.core.async/t12908", Qk.ub = function(b, c) {
    return oc.call(null, c, "cljs.core.async/t12908");
  }, Qk.prototype.Ob = function() {
    return Wk.call(null, this.Cb);
  }, Qk.prototype.Pb = function() {
    Xk.call(null, this.Cb);
    return this.le;
  }, Qk.prototype.B = function() {
    return this.Gf;
  }, Qk.prototype.D = function(b, c) {
    return new Qk(this.le, this.Cb, this.ff, c);
  });
  return new Qk(c, b, km, null);
};
function Kl(a, b, c) {
  var d = jm.call(null), e = P.call(null, b), f = hm.call(null, e), g = (new s(null, "priority", "priority", 1431093715)).a(c), l = function() {
    for (var c = 0;;) {
      if (c < e) {
        var l = t(g) ? c : f[c], q = R.call(null, b, l), r = Pd.call(null, q) ? q.call(null, 0) : null, u = t(r) ? function() {
          var b = q.call(null, 1);
          return Uk.call(null, r, b, lm.call(null, d, function(b, c, d, e, f) {
            return function(b) {
              return a.call(null, new X(null, 2, 5, Y, [b, f], null));
            };
          }(c, b, l, q, r, d, e, f, g)));
        }() : Tk.call(null, q, lm.call(null, d, function(b, c, d) {
          return function(b) {
            return a.call(null, new X(null, 2, 5, Y, [b, d], null));
          };
        }(c, l, q, r, d, e, f, g)));
        if (t(u)) {
          return ul.call(null, new X(null, 2, 5, Y, [N.call(null, u), function() {
            var a = r;
            return t(a) ? a : q;
          }()], null));
        }
        c += 1;
      } else {
        return null;
      }
    }
  }();
  return t(l) ? l : Zd.call(null, c, new s(null, "default", "default", -1987822328)) && (l = function() {
    var a = Wk.call(null, d);
    return t(a) ? Xk.call(null, d) : a;
  }(), t(l)) ? ul.call(null, new X(null, 2, 5, Y, [(new s(null, "default", "default", -1987822328)).a(c), new s(null, "default", "default", -1987822328)], null)) : null;
}
var mm = function() {
  function a(a, b) {
    var c = cm.call(null, b), g = cm.call(null, 1);
    ql.call(null, function(b, c) {
      return function() {
        var e = function() {
          return function(a) {
            return function() {
              function b(c) {
                for (;;) {
                  var d;
                  a: {
                    try {
                      for (;;) {
                        var e = a.call(null, c);
                        if (!xe.call(null, e, new s(null, "recur", "recur", -437573268))) {
                          d = e;
                          break a;
                        }
                      }
                    } catch (f) {
                      if (f instanceof Object) {
                        c[5] = f;
                        Ql.call(null, c);
                        d = new s(null, "recur", "recur", -437573268);
                        break a;
                      }
                      throw f;
                    }
                    d = void 0;
                  }
                  if (!xe.call(null, d, new s(null, "recur", "recur", -437573268))) {
                    return d;
                  }
                }
              }
              function c() {
                var a = [null, null, null, null, null, null, null, null, null, null, null, null];
                a[0] = d;
                a[1] = 1;
                return a;
              }
              var d = null, d = function(a) {
                switch(arguments.length) {
                  case 0:
                    return c.call(this);
                  case 1:
                    return b.call(this, a);
                }
                throw Error("Invalid arity: " + arguments.length);
              };
              d.Z = c;
              d.a = b;
              return d;
            }();
          }(function(b, c) {
            return function(e) {
              var f = e[1];
              if (7 === f) {
                var g = e[7], l = e[8], m = e[2], p = R.call(null, m, 0, null), q = R.call(null, m, 1, null);
                e[9] = q;
                e[7] = m;
                e[8] = p;
                e[1] = t(null == p) ? 8 : 9;
                return new s(null, "recur", "recur", -437573268);
              }
              if (1 === f) {
                var Z = bg.call(null, a);
                e[10] = Z;
                e[2] = null;
                e[1] = 2;
                return new s(null, "recur", "recur", -437573268);
              }
              return 4 === f ? (Z = e[10], Ll.call(null, e, 7, Z)) : 6 === f ? (m = e[2], e[2] = m, e[1] = 3, new s(null, "recur", "recur", -437573268)) : 3 === f ? (m = e[2], Ml.call(null, e, m)) : 2 === f ? (Z = e[10], m = 0 < P.call(null, Z), e[1] = t(m) ? 4 : 5, new s(null, "recur", "recur", -437573268)) : 11 === f ? (Z = e[10], m = e[2], e[10] = Z, e[11] = m, e[2] = null, e[1] = 2, new s(null, "recur", "recur", -437573268)) : 9 === f ? (l = e[8], Jl.call(null, e, 11, c, l)) : 5 === f ? (m = 
              gm.call(null, c), e[2] = m, e[1] = 6, new s(null, "recur", "recur", -437573268)) : 10 === f ? (m = e[2], e[2] = m, e[1] = 6, new s(null, "recur", "recur", -437573268)) : 8 === f ? (q = e[9], g = e[7], Z = e[10], l = e[8], m = Bf.call(null, function() {
                return function(a) {
                  return function(b) {
                    return Ye.call(null, a, b);
                  };
                }(q, l, g, Z, q, g, Z, l, f, b, c);
              }(), Z), e[10] = m, e[2] = null, e[1] = 2, new s(null, "recur", "recur", -437573268)) : null;
            };
          }(b, c), b, c);
        }(), f = function() {
          var a = e.call(null);
          a[6] = b;
          return a;
        }();
        return Hl.call(null, f);
      };
    }(g, c));
    return c;
  }
  function b(a) {
    return c.call(null, a, null);
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}(), om = function nm(b, c) {
  "undefined" === typeof Rk && (Rk = function(b, c, f, g) {
    this.ch = b;
    this.X = c;
    this.hd = f;
    this.kd = g;
    this.o = 0;
    this.g = 393216;
  }, Rk.bb = !0, Rk.ab = "cljs.core.async/t15195", Rk.ub = function(b, c) {
    return oc.call(null, c, "cljs.core.async/t15195");
  }, Rk.prototype.Od = function(b, c, f) {
    return Uk.call(null, this.ch, c, f);
  }, Rk.prototype.Nd = function(b, c) {
    var f = this, g = this, l = Tk.call(null, f.ch, function() {
      "undefined" === typeof Sk && (Sk = function(b, c, d, e, f, g, l) {
        this.Td = b;
        this.cf = c;
        this.kd = d;
        this.ch = e;
        this.X = f;
        this.hd = g;
        this.Hf = l;
        this.o = 0;
        this.g = 393216;
      }, Sk.bb = !0, Sk.ab = "cljs.core.async/t15198", Sk.ub = function() {
        return function(b, c) {
          return oc.call(null, c, "cljs.core.async/t15198");
        };
      }(g), Sk.prototype.Ob = function() {
        return function() {
          return Wk.call(null, this.Td);
        };
      }(g), Sk.prototype.Pb = function(b) {
        return function() {
          var c = this;
          return function(b) {
            return function(d) {
              return b.call(null, null == d ? null : c.X.call(null, d));
            };
          }(Xk.call(null, c.Td), this, b);
        };
      }(g), Sk.prototype.B = function() {
        return function() {
          return this.Hf;
        };
      }(g), Sk.prototype.D = function() {
        return function(b, c) {
          return new Sk(this.Td, this.cf, this.kd, this.ch, this.X, this.hd, c);
        };
      }(g));
      return new Sk(c, g, f.kd, f.ch, f.X, f.hd, null);
    }());
    return t(t(l) ? null != N.call(null, l) : l) ? ul.call(null, f.X.call(null, N.call(null, l))) : l;
  }, Rk.prototype.Md = function() {
    return Vk.call(null, this.ch);
  }, Rk.prototype.B = function() {
    return this.kd;
  }, Rk.prototype.D = function(b, c) {
    return new Rk(this.ch, this.X, this.hd, c);
  });
  return new Rk(c, b, nm, null);
};
function pm(a) {
  if (a ? a.ve : a) {
    return a.ve();
  }
  var b;
  b = pm[k(null == a ? null : a)];
  if (!b && (b = pm._, !b)) {
    throw w.call(null, "PushbackReader.read-char", a);
  }
  return b.call(null, a);
}
function qm(a, b) {
  if (a ? a.we : a) {
    return a.we(0, b);
  }
  var c;
  c = qm[k(null == a ? null : a)];
  if (!c && (c = qm._, !c)) {
    throw w.call(null, "PushbackReader.unread", a);
  }
  return c.call(null, a, b);
}
function rm(a, b, c) {
  this.V = a;
  this.buffer = b;
  this.Wd = c;
}
rm.prototype.ve = function() {
  return 0 === this.buffer.length ? (this.Wd += 1, this.V[this.Wd]) : this.buffer.pop();
};
rm.prototype.we = function(a, b) {
  return this.buffer.push(b);
};
function sm(a) {
  return new rm(a, [], -1);
}
function tm(a) {
  var b = !/[^\t\n\r ]/.test(a);
  return t(b) ? b : "," === a;
}
function um(a) {
  return!/[^0-9]/.test(a);
}
function vm(a) {
  return ";" === a;
}
function wm(a, b) {
  return um.call(null, b) || ("+" === b || "-" === b) && um.call(null, function() {
    var b = pm.call(null, a);
    qm.call(null, a, b);
    return b;
  }());
}
var xm = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, 0, e);
  }
  function b(a, b) {
    throw Error(U.call(null, x, b));
  }
  a.k = 1;
  a.e = function(a) {
    F(a);
    a = H(a);
    return b(0, a);
  };
  a.c = b;
  return a;
}();
function ym(a) {
  var b = "#" !== a;
  return b && (b = "'" !== a) ? (b = ":" !== a) ? zm.call(null, a) : b : b;
}
function Am(a, b) {
  for (var c = new Sa(b), d = pm.call(null, a);;) {
    if (null == d || tm.call(null, d) || ym.call(null, d)) {
      return qm.call(null, a, d), c.toString();
    }
    c.append(d);
    d = pm.call(null, a);
  }
}
function Bm(a) {
  for (;;) {
    var b = pm.call(null, a);
    if ("\n" === b || "\r" === b || null == b) {
      return a;
    }
  }
}
var Cm = Sh.call(null, "^([-+]?)(?:(0)|([1-9][0-9]*)|0[xX]([0-9A-Fa-f]+)|0([0-7]+)|([1-9][0-9]?)[rR]([0-9A-Za-z]+))(N)?$"), Dm = Sh.call(null, "^([-+]?[0-9]+)/([0-9]+)$"), Em = Sh.call(null, "^([-+]?[0-9]+(\\.[0-9]*)?([eE][-+]?[0-9]+)?)(M)?$"), Fm = Sh.call(null, "^[:]?([^0-9/].*/)?([^0-9/][^/]*)$");
function Gm(a, b) {
  var c = a.exec(b);
  return null != c && c[0] === b ? 1 === c.length ? c[0] : c : null;
}
function Hm(a) {
  a = Gm.call(null, Cm, a);
  var b = a[2];
  if (null != (B.call(null, b, "") ? null : b)) {
    return 0;
  }
  var b = t(a[3]) ? [a[3], 10] : t(a[4]) ? [a[4], 16] : t(a[5]) ? [a[5], 8] : t(a[6]) ? [a[7], parseInt(a[6], 10)] : [null, null], c = b[0];
  if (null == c) {
    return null;
  }
  b = parseInt(c, b[1]);
  return "-" === a[1] ? -b : b;
}
function Im(a) {
  a = Gm.call(null, Dm, a);
  return parseInt(a[1], 10) / parseInt(a[2], 10);
}
function Jm(a) {
  return parseFloat(a);
}
function Km(a) {
  return t(Gm.call(null, Cm, a)) ? Hm.call(null, a) : t(Gm.call(null, Dm, a)) ? Im.call(null, a) : t(Gm.call(null, Em, a)) ? Jm.call(null, a) : null;
}
function Lm(a) {
  return "t" === a ? "\t" : "r" === a ? "\r" : "n" === a ? "\n" : "\\" === a ? "\\" : '"' === a ? '"' : "b" === a ? "\b" : "f" === a ? "\f" : null;
}
function Mm(a) {
  return(new Sa(pm.call(null, a), pm.call(null, a))).toString();
}
function Nm(a) {
  return(new Sa(pm.call(null, a), pm.call(null, a), pm.call(null, a), pm.call(null, a))).toString();
}
var Om = Sh.call(null, "^[0-9A-Fa-f]{2}$"), Pm = Sh.call(null, "^[0-9A-Fa-f]{4}$");
function Qm(a, b, c, d) {
  return t(Oh.call(null, a, d)) ? d : xm.call(null, b, "Unexpected unicode escape \\", c, d);
}
function Rm(a) {
  return String.fromCharCode(parseInt(a, 16));
}
function Sm(a, b) {
  var c = pm.call(null, b), d = Lm.call(null, c);
  return t(d) ? d : "x" === c ? Rm.call(null, Qm.call(null, Om, b, c, Mm.call(null, b))) : "u" === c ? Rm.call(null, Qm.call(null, Pm, b, c, Nm.call(null, b))) : um.call(null, c) ? String.fromCharCode(c) : xm.call(null, b, "Unexpected unicode escape \\", c);
}
function Tm(a, b) {
  for (var c = pm.call(null, b);;) {
    if (t(a.call(null, c))) {
      c = pm.call(null, b);
    } else {
      return c;
    }
  }
}
function Um(a, b) {
  for (var c = Te.call(null, xd);;) {
    var d = Tm.call(null, tm, b);
    t(d) || xm.call(null, b, "EOF while reading");
    if (a === d) {
      return Ue.call(null, c);
    }
    var e = zm.call(null, d);
    t(e) ? d = e.call(null, b, d) : (qm.call(null, b, d), d = Vm.call(null, b, !0, null));
    c = d === b ? c : Ve.call(null, c, d);
  }
}
function Wm(a, b) {
  return xm.call(null, a, "Reader for ", b, " not implemented yet");
}
function Xm(a, b) {
  var c = pm.call(null, a), d = Ym.call(null, c);
  if (t(d)) {
    return d.call(null, a, b);
  }
  d = Zm.call(null, a, c);
  return t(d) ? d : xm.call(null, a, "No dispatch macro for ", c);
}
function $m(a, b) {
  return xm.call(null, a, "Unmached delimiter ", b);
}
function an(a) {
  return U.call(null, V, Um.call(null, ")", a));
}
function bn(a) {
  return Um.call(null, "]", a);
}
function cn(a) {
  var b = Um.call(null, "}", a);
  cf.call(null, P.call(null, b)) && xm.call(null, a, "Map literal must contain an even number of forms");
  return U.call(null, kf, b);
}
function dn(a, b) {
  for (var c = new Sa(b), d = pm.call(null, a);;) {
    var e;
    e = null == d;
    e || (e = (e = tm.call(null, d)) ? e : zm.call(null, d));
    if (t(e)) {
      return qm.call(null, a, d), c = c.toString(), d = Km.call(null, c), t(d) ? d : xm.call(null, a, "Invalid number format [", c, "]");
    }
    c.append(d);
    d = pm.call(null, a);
  }
}
function en(a) {
  for (var b = new Sa, c = pm.call(null, a);;) {
    if (null == c) {
      return xm.call(null, a, "EOF while reading");
    }
    if ("\\" === c) {
      b.append(Sm.call(null, 0, a));
    } else {
      if ('"' === c) {
        return b.toString();
      }
      b.append(c);
    }
    c = pm.call(null, a);
  }
}
function fn(a) {
  for (var b = new Sa, c = pm.call(null, a);;) {
    if (null == c) {
      return xm.call(null, a, "EOF while reading");
    }
    if ("\\" === c) {
      b.append(c);
      var d = pm.call(null, a);
      if (null == d) {
        return xm.call(null, a, "EOF while reading");
      }
      var e = function() {
        var a = b;
        a.append(d);
        return a;
      }(), f = pm.call(null, a);
    } else {
      if ('"' === c) {
        return b.toString();
      }
      e = function() {
        var a = b;
        a.append(c);
        return a;
      }();
      f = pm.call(null, a);
    }
    b = e;
    c = f;
  }
}
function gn(a, b) {
  return "nil" === a ? null : "true" === a ? !0 : "false" === a ? !1 : b;
}
function hn(a, b) {
  var c = Am.call(null, a, b);
  return t(-1 != c.indexOf("/")) ? bd.call(null, me.call(null, c, 0, c.indexOf("/")), me.call(null, c, c.indexOf("/") + 1, c.length)) : gn.call(null, c, bd.call(null, c));
}
function jn(a) {
  var b = Am.call(null, a, pm.call(null, a)), c = Gm.call(null, Fm, b), b = c[0], d = c[1], c = c[2];
  return void 0 !== d && ":/" === d.substring(d.length - 2, d.length) || ":" === c[c.length - 1] || -1 !== b.indexOf("::", 1) ? xm.call(null, a, "Invalid token: ", b) : null != d && 0 < d.length ? Ae.call(null, d.substring(0, d.indexOf("/")), c) : Ae.call(null, b);
}
function kn(a) {
  return a instanceof D ? new n(null, 1, [new s(null, "tag", "tag", -1290361223), a], null) : "string" === typeof a ? new n(null, 1, [new s(null, "tag", "tag", -1290361223), a], null) : a instanceof s ? new Dg([a, !0]) : a;
}
function ln(a) {
  return function(b) {
    return Db.call(null, Db.call(null, dd, Vm.call(null, b, !0, null)), a);
  };
}
function mn(a) {
  return function(b) {
    return xm.call(null, b, a);
  };
}
function nn(a) {
  var b = kn.call(null, Vm.call(null, a, !0, null));
  Od.call(null, b) || xm.call(null, a, "Metadata must be Symbol,Keyword,String or Map");
  var c = Vm.call(null, a, !0, null);
  return(c ? c.g & 262144 || c.wf || (c.g ? 0 : v.call(null, ac, c)) : v.call(null, ac, c)) ? sd.call(null, c, Ah.call(null, Gd.call(null, c), b)) : xm.call(null, a, "Metadata can only be applied to IWithMetas");
}
function on(a) {
  return Gh.call(null, Um.call(null, "}", a));
}
function pn(a) {
  return Sh.call(null, fn.call(null, a));
}
function qn(a) {
  Vm.call(null, a, !0, null);
  return a;
}
function zm(a) {
  return'"' === a ? en : ":" === a ? jn : ";" === a ? Bm : "'" === a ? ln.call(null, new D(null, "quote", "quote", 1377916282, null)) : "@" === a ? ln.call(null, new D(null, "deref", "deref", 1494944732, null)) : "^" === a ? nn : "`" === a ? Wm : "~" === a ? Wm : "(" === a ? an : ")" === a ? $m : "[" === a ? bn : "]" === a ? $m : "{" === a ? cn : "}" === a ? $m : "\\" === a ? pm : "#" === a ? Xm : null;
}
function Ym(a) {
  return "{" === a ? on : "\x3c" === a ? mn.call(null, "Unreadable form") : '"' === a ? pn : "!" === a ? Bm : "_" === a ? qn : null;
}
function Vm(a, b, c) {
  for (;;) {
    var d = pm.call(null, a);
    if (null == d) {
      return t(b) ? xm.call(null, a, "EOF while reading") : c;
    }
    if (!tm.call(null, d)) {
      if (vm.call(null, d)) {
        a = Bm.call(null, a);
      } else {
        var e = zm.call(null, d), d = t(e) ? e.call(null, a, d) : wm.call(null, a, d) ? dn.call(null, a, d) : hn.call(null, a, d);
        if (d !== a) {
          return d;
        }
      }
    }
  }
}
function rn(a) {
  return Vm.call(null, sm.call(null, a), !1, null);
}
function sn(a, b) {
  if (B.call(null, b, P.call(null, a))) {
    return a;
  }
  if (b < P.call(null, a)) {
    return me.call(null, a, 0, b);
  }
  for (var c = new Sa(a);;) {
    if (c.pb.length < b) {
      c = c.append("0");
    } else {
      return c.toString();
    }
  }
}
function tn(a, b) {
  return 0 === ge.call(null, a, b);
}
function un(a, b) {
  return!tn.call(null, a, b);
}
function vn(a) {
  return tn.call(null, a, 4) && (un.call(null, a, 100) || tn.call(null, a, 400));
}
var wn = function(a, b) {
  return function(c, d) {
    return S.call(null, t(d) ? b : a, c);
  };
}(new X(null, 13, 5, Y, [null, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], null), new X(null, 13, 5, Y, [null, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], null)), xn = /(\d\d\d\d)(?:-(\d\d)(?:-(\d\d)(?:[T](\d\d)(?::(\d\d)(?::(\d\d)(?:[.](\d+))?)?)?)?)?)?(?:[Z]|([-+])(\d\d):(\d\d))?/;
function yn(a) {
  a = parseInt(a, 10);
  return ob.call(null, isNaN(a)) ? a : null;
}
function zn(a, b, c, d) {
  a <= b && b <= c || xm.call(null, null, "" + x.a(d) + " Failed:  " + x.a(a) + "\x3c\x3d" + x.a(b) + "\x3c\x3d" + x.a(c));
  return b;
}
function An(a) {
  var b = Oh.call(null, xn, a);
  R.call(null, b, 0, null);
  var c = R.call(null, b, 1, null), d = R.call(null, b, 2, null), e = R.call(null, b, 3, null), f = R.call(null, b, 4, null), g = R.call(null, b, 5, null), l = R.call(null, b, 6, null), m = R.call(null, b, 7, null), p = R.call(null, b, 8, null), q = R.call(null, b, 9, null), r = R.call(null, b, 10, null);
  if (ob.call(null, b)) {
    return xm.call(null, null, "Unrecognized date/time syntax: " + x.a(a));
  }
  a = yn.call(null, c);
  var b = function() {
    var a = yn.call(null, d);
    return t(a) ? a : 1;
  }(), c = function() {
    var a = yn.call(null, e);
    return t(a) ? a : 1;
  }(), u = function() {
    var a = yn.call(null, f);
    return t(a) ? a : 0;
  }(), y = function() {
    var a = yn.call(null, g);
    return t(a) ? a : 0;
  }(), z = function() {
    var a = yn.call(null, l);
    return t(a) ? a : 0;
  }(), C = function() {
    var a = yn.call(null, sn.call(null, m, 3));
    return t(a) ? a : 0;
  }(), p = (B.call(null, p, "-") ? -1 : 1) * (60 * function() {
    var a = yn.call(null, q);
    return t(a) ? a : 0;
  }() + function() {
    var a = yn.call(null, r);
    return t(a) ? a : 0;
  }());
  return new X(null, 8, 5, Y, [a, zn.call(null, 1, b, 12, "timestamp month field must be in range 1..12"), zn.call(null, 1, c, wn.call(null, b, vn.call(null, a)), "timestamp day field must be in range 1..last day in month"), zn.call(null, 0, u, 23, "timestamp hour field must be in range 0..23"), zn.call(null, 0, y, 59, "timestamp minute field must be in range 0..59"), zn.call(null, 0, z, B.call(null, y, 59) ? 60 : 59, "timestamp second field must be in range 0..60"), zn.call(null, 0, C, 999, "timestamp millisecond field must be in range 0..999"), 
  p], null);
}
function Bn(a) {
  var b = An.call(null, a);
  if (t(b)) {
    a = R.call(null, b, 0, null);
    var c = R.call(null, b, 1, null), d = R.call(null, b, 2, null), e = R.call(null, b, 3, null), f = R.call(null, b, 4, null), g = R.call(null, b, 5, null), l = R.call(null, b, 6, null), b = R.call(null, b, 7, null);
    return new Date(Date.UTC(a, c - 1, d, e, f, g, l) - 6E4 * b);
  }
  return xm.call(null, null, "Unrecognized date/time syntax: " + x.a(a));
}
var Cn = lf.call(null, new n(null, 4, ["inst", function(a) {
  return "string" === typeof a ? Bn.call(null, a) : xm.call(null, null, "Instance literal expects a string for its timestamp.");
}, "uuid", function(a) {
  return "string" === typeof a ? new Fi(a) : xm.call(null, null, "UUID literal expects a string as its representation.");
}, "queue", function(a) {
  return Pd.call(null, a) ? zf.call(null, mg, a) : xm.call(null, null, "Queue literal expects a vector for its elements.");
}, "js", function(a) {
  if (Pd.call(null, a)) {
    var b = [];
    a = E.call(null, a);
    for (var c = null, d = 0, e = 0;;) {
      if (e < d) {
        var f = A.call(null, c, e);
        b.push(f);
        e += 1;
      } else {
        if (a = E.call(null, a)) {
          c = a, Qd.call(null, c) ? (a = Le.call(null, c), e = Me.call(null, c), c = a, d = P.call(null, a), a = e) : (a = F.call(null, c), b.push(a), a = L.call(null, c), c = null, d = 0), e = 0;
        } else {
          break;
        }
      }
    }
    return b;
  }
  if (Od.call(null, a)) {
    b = {};
    a = E.call(null, a);
    c = null;
    for (e = d = 0;;) {
      if (e < d) {
        var g = A.call(null, c, e), f = R.call(null, g, 0, null), g = R.call(null, g, 1, null);
        b[ze.call(null, f)] = g;
        e += 1;
      } else {
        if (a = E.call(null, a)) {
          Qd.call(null, a) ? (d = Le.call(null, a), a = Me.call(null, a), c = d, d = P.call(null, d)) : (d = F.call(null, a), c = R.call(null, d, 0, null), d = R.call(null, d, 1, null), b[ze.call(null, c)] = d, a = L.call(null, a), c = null, d = 0), e = 0;
        } else {
          break;
        }
      }
    }
    return b;
  }
  return xm.call(null, null, "JS literal expects a vector or map containing only string or unqualified keyword keys");
}], null)), En = lf.call(null, null);
function Zm(a, b) {
  var c = hn.call(null, a, b), d = S.call(null, N.call(null, Cn), "" + x.a(c)), e = N.call(null, En);
  return t(d) ? d.call(null, Vm.call(null, a, !0, null)) : t(e) ? e.call(null, c, Vm.call(null, a, !0, null)) : xm.call(null, a, "Could not find tag parser for ", "" + x.a(c), " in ", nf.call(null, xh.call(null, N.call(null, Cn))));
}
;var Fn = {};
function Gn(a, b) {
  if (a ? a.$e : a) {
    return a.$e(0, b);
  }
  var c;
  c = Gn[k(null == a ? null : a)];
  if (!c && (c = Gn._, !c)) {
    throw w.call(null, "IPacker.pack", a);
  }
  return c.call(null, a, b);
}
function Hn(a, b) {
  if (a ? a.af : a) {
    return a.af(0, b);
  }
  var c;
  c = Hn[k(null == a ? null : a)];
  if (!c && (c = Hn._, !c)) {
    throw w.call(null, "IPacker.unpack", a);
  }
  return c.call(null, a, b);
}
function In() {
}
In.prototype.Pf = !0;
In.prototype.$e = function(a, b) {
  return nf.call(null, b);
};
In.prototype.af = function(a, b) {
  return rn.call(null, b);
};
var Jn = function() {
  return new In;
}.call(null);
function Kn(a) {
  if (B.call(null, a, new s(null, "edn", "edn", 1317840885))) {
    return Jn;
  }
  if (!(a ? t(t(null) ? null : a.Pf) || (a.Wc ? 0 : v.call(null, Fn, a)) : v.call(null, Fn, a))) {
    throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "satisfies?", "satisfies?", -433227199, null), new D(null, "IPacker", "IPacker", 266151414, null), new D(null, "x", "x", -555367584, null)))));
  }
  return a;
}
;function Ln() {
  0 != Mn && (Nn[ma(this)] = this);
}
var Mn = 0, Nn = {};
Ln.prototype.$c = !1;
Ln.prototype.Rd = function() {
  if (!this.$c && (this.$c = !0, this.Ja(), 0 != Mn)) {
    var a = ma(this);
    delete Nn[a];
  }
};
Ln.prototype.Ja = function() {
  if (this.Je) {
    for (;this.Je.length;) {
      this.Je.shift()();
    }
  }
};
var On;
a: {
  var Pn = ca.navigator;
  if (Pn) {
    var Qn = Pn.userAgent;
    if (Qn) {
      On = Qn;
      break a;
    }
  }
  On = "";
}
;var Rn = -1 != On.indexOf("Opera") || -1 != On.indexOf("OPR"), Sn = -1 != On.indexOf("Trident") || -1 != On.indexOf("MSIE"), Tn = -1 != On.indexOf("Gecko") && -1 == On.toLowerCase().indexOf("webkit") && !(-1 != On.indexOf("Trident") || -1 != On.indexOf("MSIE")), Un = -1 != On.toLowerCase().indexOf("webkit");
function Vn() {
  var a = ca.document;
  return a ? a.documentMode : void 0;
}
var Wn = function() {
  var a = "", b;
  if (Rn && ca.opera) {
    return a = ca.opera.version, ka(a) ? a() : a;
  }
  Tn ? b = /rv\:([^\);]+)(\)|;)/ : Sn ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : Un && (b = /WebKit\/(\S+)/);
  b && (a = (a = b.exec(On)) ? a[1] : "");
  return Sn && (b = Vn(), b > parseFloat(a)) ? String(b) : a;
}(), Xn = {};
function Yn(a) {
  var b;
  if (!(b = Xn[a])) {
    b = 0;
    for (var c = ya(String(Wn)).split("."), d = ya(String(a)).split("."), e = Math.max(c.length, d.length), f = 0;0 == b && f < e;f++) {
      var g = c[f] || "", l = d[f] || "", m = RegExp("(\\d*)(\\D*)", "g"), p = RegExp("(\\d*)(\\D*)", "g");
      do {
        var q = m.exec(g) || ["", "", ""], r = p.exec(l) || ["", "", ""];
        if (0 == q[0].length && 0 == r[0].length) {
          break;
        }
        b = La(0 == q[1].length ? 0 : parseInt(q[1], 10), 0 == r[1].length ? 0 : parseInt(r[1], 10)) || La(0 == q[2].length, 0 == r[2].length) || La(q[2], r[2]);
      } while (0 == b);
    }
    b = Xn[a] = 0 <= b;
  }
  return b;
}
var Zn = ca.document, $n = Zn && Sn ? Vn() || ("CSS1Compat" == Zn.compatMode ? parseInt(Wn, 10) : 5) : void 0;
var ao;
(ao = !Sn) || (ao = Sn && 9 <= $n);
var bo = ao, co = Sn && !Yn("9");
!Un || Yn("528");
Tn && Yn("1.9b") || Sn && Yn("8") || Rn && Yn("9.5") || Un && Yn("528");
Tn && !Yn("8") || Sn && Yn("9");
function eo(a, b) {
  this.type = a;
  this.currentTarget = this.target = b;
  this.defaultPrevented = this.Xb = !1;
  this.We = !0;
}
eo.prototype.Ja = function() {
};
eo.prototype.Rd = function() {
};
eo.prototype.preventDefault = function() {
  this.defaultPrevented = !0;
  this.We = !1;
};
function fo(a) {
  fo[" "](a);
  return a;
}
fo[" "] = ea;
function go(a, b) {
  eo.call(this, a ? a.type : "");
  this.relatedTarget = this.currentTarget = this.target = null;
  this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
  this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
  this.Ae = this.state = null;
  if (a) {
    var c = this.type = a.type;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    var d = a.relatedTarget;
    if (d) {
      if (Tn) {
        var e;
        a: {
          try {
            fo(d.nodeName);
            e = !0;
            break a;
          } catch (f) {
          }
          e = !1;
        }
        e || (d = null);
      }
    } else {
      "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement);
    }
    this.relatedTarget = d;
    this.offsetX = Un || void 0 !== a.offsetX ? a.offsetX : a.layerX;
    this.offsetY = Un || void 0 !== a.offsetY ? a.offsetY : a.layerY;
    this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
    this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
    this.screenX = a.screenX || 0;
    this.screenY = a.screenY || 0;
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.state = a.state;
    this.Ae = a;
    a.defaultPrevented && this.preventDefault();
  }
}
va(go, eo);
go.prototype.preventDefault = function() {
  go.zb.preventDefault.call(this);
  var a = this.Ae;
  if (a.preventDefault) {
    a.preventDefault();
  } else {
    if (a.returnValue = !1, co) {
      try {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1;
        }
      } catch (b) {
      }
    }
  }
};
go.prototype.Ja = function() {
};
var ho = "closure_listenable_" + (1E6 * Math.random() | 0), io = 0;
function jo(a, b, c, d, e) {
  this.Hb = a;
  this.nd = null;
  this.src = b;
  this.type = c;
  this.Lc = !!d;
  this.Ua = e;
  this.key = ++io;
  this.Yb = this.Kc = !1;
}
function ko(a) {
  a.Yb = !0;
  a.Hb = null;
  a.nd = null;
  a.src = null;
  a.Ua = null;
}
;function lo(a) {
  this.src = a;
  this.va = {};
  this.Ec = 0;
}
lo.prototype.add = function(a, b, c, d, e) {
  var f = a.toString();
  a = this.va[f];
  a || (a = this.va[f] = [], this.Ec++);
  var g = mo(a, b, d, e);
  -1 < g ? (b = a[g], c || (b.Kc = !1)) : (b = new jo(b, this.src, f, !!d, e), b.Kc = c, a.push(b));
  return b;
};
lo.prototype.remove = function(a, b, c, d) {
  a = a.toString();
  if (!(a in this.va)) {
    return!1;
  }
  var e = this.va[a];
  b = mo(e, b, c, d);
  return-1 < b ? (ko(e[b]), Wa.splice.call(e, b, 1), 0 == e.length && (delete this.va[a], this.Ec--), !0) : !1;
};
function no(a, b) {
  var c = b.type;
  c in a.va && hb(a.va[c], b) && (ko(b), 0 == a.va[c].length && (delete a.va[c], a.Ec--));
}
lo.prototype.Ue = function(a) {
  a = a && a.toString();
  var b = 0, c;
  for (c in this.va) {
    if (!a || c == a) {
      for (var d = this.va[c], e = 0;e < d.length;e++) {
        ++b, ko(d[e]);
      }
      delete this.va[c];
      this.Ec--;
    }
  }
  return b;
};
lo.prototype.Vd = function(a, b, c, d) {
  a = this.va[a.toString()];
  var e = -1;
  a && (e = mo(a, b, c, d));
  return-1 < e ? a[e] : null;
};
function mo(a, b, c, d) {
  for (var e = 0;e < a.length;++e) {
    var f = a[e];
    if (!f.Yb && f.Hb == b && f.Lc == !!c && f.Ua == d) {
      return e;
    }
  }
  return-1;
}
;var oo = "closure_lm_" + (1E6 * Math.random() | 0), po = {}, qo = 0;
function ro(a, b, c, d, e) {
  if (fa(b)) {
    for (var f = 0;f < b.length;f++) {
      ro(a, b[f], c, d, e);
    }
  } else {
    c = so(c), a && a[ho] ? a.gb.add(String(b), c, !1, d, e) : to(a, b, c, !1, d, e);
  }
}
function to(a, b, c, d, e, f) {
  if (!b) {
    throw Error("Invalid event type");
  }
  var g = !!e, l = uo(a);
  l || (a[oo] = l = new lo(a));
  c = l.add(b, c, d, e, f);
  c.nd || (d = vo(), c.nd = d, d.src = a, d.Hb = c, a.addEventListener ? a.addEventListener(b.toString(), d, g) : a.attachEvent(wo(b.toString()), d), qo++);
}
function vo() {
  var a = xo, b = bo ? function(c) {
    return a.call(b.src, b.Hb, c);
  } : function(c) {
    c = a.call(b.src, b.Hb, c);
    if (!c) {
      return c;
    }
  };
  return b;
}
function yo(a, b, c, d, e) {
  if (fa(b)) {
    for (var f = 0;f < b.length;f++) {
      yo(a, b[f], c, d, e);
    }
  } else {
    c = so(c), a && a[ho] ? a.gb.add(String(b), c, !0, d, e) : to(a, b, c, !0, d, e);
  }
}
function zo(a, b, c, d, e) {
  if (fa(b)) {
    for (var f = 0;f < b.length;f++) {
      zo(a, b[f], c, d, e);
    }
  } else {
    c = so(c), a && a[ho] ? a.gb.remove(String(b), c, d, e) : a && (a = uo(a)) && (b = a.Vd(b, c, !!d, e)) && Ao(b);
  }
}
function Ao(a) {
  if ("number" != typeof a && a && !a.Yb) {
    var b = a.src;
    if (b && b[ho]) {
      no(b.gb, a);
    } else {
      var c = a.type, d = a.nd;
      b.removeEventListener ? b.removeEventListener(c, d, a.Lc) : b.detachEvent && b.detachEvent(wo(c), d);
      qo--;
      (c = uo(b)) ? (no(c, a), 0 == c.Ec && (c.src = null, b[oo] = null)) : ko(a);
    }
  }
}
function wo(a) {
  return a in po ? po[a] : po[a] = "on" + a;
}
function Bo(a, b, c, d) {
  var e = 1;
  if (a = uo(a)) {
    if (b = a.va[b.toString()]) {
      for (b = b.concat(), a = 0;a < b.length;a++) {
        var f = b[a];
        f && f.Lc == c && !f.Yb && (e &= !1 !== Co(f, d));
      }
    }
  }
  return Boolean(e);
}
function Co(a, b) {
  var c = a.Hb, d = a.Ua || a.src;
  a.Kc && Ao(a);
  return c.call(d, b);
}
function xo(a, b) {
  if (a.Yb) {
    return!0;
  }
  if (!bo) {
    var c = b || da("window.event"), d = new go(c, this), e = !0;
    if (!(0 > c.keyCode || void 0 != c.returnValue)) {
      a: {
        var f = !1;
        if (0 == c.keyCode) {
          try {
            c.keyCode = -1;
            break a;
          } catch (g) {
            f = !0;
          }
        }
        if (f || void 0 == c.returnValue) {
          c.returnValue = !0;
        }
      }
      c = [];
      for (f = d.currentTarget;f;f = f.parentNode) {
        c.push(f);
      }
      for (var f = a.type, l = c.length - 1;!d.Xb && 0 <= l;l--) {
        d.currentTarget = c[l], e &= Bo(c[l], f, !0, d);
      }
      for (l = 0;!d.Xb && l < c.length;l++) {
        d.currentTarget = c[l], e &= Bo(c[l], f, !1, d);
      }
    }
    return e;
  }
  return Co(a, new go(b, this));
}
function uo(a) {
  a = a[oo];
  return a instanceof lo ? a : null;
}
var Do = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
function so(a) {
  if (ka(a)) {
    return a;
  }
  a[Do] || (a[Do] = function(b) {
    return a.handleEvent(b);
  });
  return a[Do];
}
;function Eo() {
  Ln.call(this);
  this.gb = new lo(this);
  this.df = this;
  this.ae = null;
}
va(Eo, Ln);
Eo.prototype[ho] = !0;
h = Eo.prototype;
h.addEventListener = function(a, b, c, d) {
  ro(this, a, b, c, d);
};
h.removeEventListener = function(a, b, c, d) {
  zo(this, a, b, c, d);
};
h.dispatchEvent = function(a) {
  var b, c = this.ae;
  if (c) {
    for (b = [];c;c = c.ae) {
      b.push(c);
    }
  }
  var c = this.df, d = a.type || a;
  if (ia(a)) {
    a = new eo(a, c);
  } else {
    if (a instanceof eo) {
      a.target = a.target || c;
    } else {
      var e = a;
      a = new eo(d, c);
      Qa(a, e);
    }
  }
  var e = !0, f;
  if (b) {
    for (var g = b.length - 1;!a.Xb && 0 <= g;g--) {
      f = a.currentTarget = b[g], e = Fo(f, d, !0, a) && e;
    }
  }
  a.Xb || (f = a.currentTarget = c, e = Fo(f, d, !0, a) && e, a.Xb || (e = Fo(f, d, !1, a) && e));
  if (b) {
    for (g = 0;!a.Xb && g < b.length;g++) {
      f = a.currentTarget = b[g], e = Fo(f, d, !1, a) && e;
    }
  }
  return e;
};
h.Ja = function() {
  Eo.zb.Ja.call(this);
  this.gb && this.gb.Ue(void 0);
  this.ae = null;
};
function Fo(a, b, c, d) {
  b = a.gb.va[String(b)];
  if (!b) {
    return!0;
  }
  b = b.concat();
  for (var e = !0, f = 0;f < b.length;++f) {
    var g = b[f];
    if (g && !g.Yb && g.Lc == c) {
      var l = g.Hb, m = g.Ua || g.src;
      g.Kc && no(a.gb, g);
      e = !1 !== l.call(m, d) && e;
    }
  }
  return e && !1 != d.We;
}
h.Vd = function(a, b, c, d) {
  return this.gb.Vd(String(a), b, c, d);
};
function Go(a, b, c) {
  if (ka(a)) {
    c && (a = ta(a, c));
  } else {
    if (a && "function" == typeof a.handleEvent) {
      a = ta(a.handleEvent, a);
    } else {
      throw Error("Invalid listener argument");
    }
  }
  return 2147483647 < b ? -1 : ca.setTimeout(a, b || 0);
}
;function Ho(a) {
  a = String(a);
  if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) {
    try {
      return eval("(" + a + ")");
    } catch (b) {
    }
  }
  throw Error("Invalid JSON string: " + a);
}
;function Io(a) {
  if ("function" == typeof a.xa) {
    return a.xa();
  }
  if (ia(a)) {
    return a.split("");
  }
  if (ga(a)) {
    for (var b = [], c = a.length, d = 0;d < c;d++) {
      b.push(a[d]);
    }
    return b;
  }
  return Na(a);
}
function Jo(a) {
  if ("function" == typeof a.Ta) {
    return a.Ta();
  }
  if ("function" != typeof a.xa) {
    if (ga(a) || ia(a)) {
      var b = [];
      a = a.length;
      for (var c = 0;c < a;c++) {
        b.push(c);
      }
      return b;
    }
    return Oa(a);
  }
}
function Ko(a, b) {
  if ("function" == typeof a.forEach) {
    a.forEach(b, void 0);
  } else {
    if (ga(a) || ia(a)) {
      ab(a, b, void 0);
    } else {
      for (var c = Jo(a), d = Io(a), e = d.length, f = 0;f < e;f++) {
        b.call(void 0, d[f], c && c[f], a);
      }
    }
  }
}
;function Lo(a, b) {
  this.ma = {};
  this.sa = [];
  this.Y = 0;
  var c = arguments.length;
  if (1 < c) {
    if (c % 2) {
      throw Error("Uneven number of arguments");
    }
    for (var d = 0;d < c;d += 2) {
      this.set(arguments[d], arguments[d + 1]);
    }
  } else {
    a && this.xd(a);
  }
}
h = Lo.prototype;
h.ja = function() {
  return this.Y;
};
h.xa = function() {
  Mo(this);
  for (var a = [], b = 0;b < this.sa.length;b++) {
    a.push(this.ma[this.sa[b]]);
  }
  return a;
};
h.Ta = function() {
  Mo(this);
  return this.sa.concat();
};
h.Qb = function(a) {
  return No(this.ma, a);
};
h.ib = function() {
  return 0 == this.Y;
};
h.clear = function() {
  this.ma = {};
  this.Y = this.sa.length = 0;
};
h.remove = function(a) {
  return No(this.ma, a) ? (delete this.ma[a], this.Y--, this.sa.length > 2 * this.Y && Mo(this), !0) : !1;
};
function Mo(a) {
  if (a.Y != a.sa.length) {
    for (var b = 0, c = 0;b < a.sa.length;) {
      var d = a.sa[b];
      No(a.ma, d) && (a.sa[c++] = d);
      b++;
    }
    a.sa.length = c;
  }
  if (a.Y != a.sa.length) {
    for (var e = {}, c = b = 0;b < a.sa.length;) {
      d = a.sa[b], No(e, d) || (a.sa[c++] = d, e[d] = 1), b++;
    }
    a.sa.length = c;
  }
}
h.get = function(a, b) {
  return No(this.ma, a) ? this.ma[a] : b;
};
h.set = function(a, b) {
  No(this.ma, a) || (this.Y++, this.sa.push(a));
  this.ma[a] = b;
};
h.xd = function(a) {
  var b;
  a instanceof Lo ? (b = a.Ta(), a = a.xa()) : (b = Oa(a), a = Na(a));
  for (var c = 0;c < b.length;c++) {
    this.set(b[c], a[c]);
  }
};
h.forEach = function(a, b) {
  for (var c = this.Ta(), d = 0;d < c.length;d++) {
    var e = c[d], f = this.get(e);
    a.call(b, f, e, this);
  }
};
h.clone = function() {
  return new Lo(this);
};
function No(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
;function Oo(a) {
  this.ma = new Lo;
  a && this.xd(a);
}
function Po(a) {
  var b = typeof a;
  return "object" == b && a || "function" == b ? "o" + ma(a) : b.substr(0, 1) + a;
}
h = Oo.prototype;
h.ja = function() {
  return this.ma.ja();
};
h.add = function(a) {
  this.ma.set(Po(a), a);
};
h.xd = function(a) {
  a = Io(a);
  for (var b = a.length, c = 0;c < b;c++) {
    this.add(a[c]);
  }
};
h.Ue = function(a) {
  a = Io(a);
  for (var b = a.length, c = 0;c < b;c++) {
    this.remove(a[c]);
  }
};
h.remove = function(a) {
  return this.ma.remove(Po(a));
};
h.clear = function() {
  this.ma.clear();
};
h.ib = function() {
  return this.ma.ib();
};
h.xa = function() {
  return this.ma.xa();
};
h.clone = function() {
  return new Oo(this);
};
function Qo(a) {
  var b;
  b || (b = Ro(a || arguments.callee.caller, []));
  return b;
}
function Ro(a, b) {
  var c = [];
  if (0 <= Xa(b, a)) {
    c.push("[...circular reference...]");
  } else {
    if (a && 50 > b.length) {
      c.push(So(a) + "(");
      for (var d = a.arguments, e = 0;d && e < d.length;e++) {
        0 < e && c.push(", ");
        var f;
        f = d[e];
        switch(typeof f) {
          case "object":
            f = f ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            f = String(f);
            break;
          case "boolean":
            f = f ? "true" : "false";
            break;
          case "function":
            f = (f = So(f)) ? f : "[fn]";
            break;
          default:
            f = typeof f;
        }
        40 < f.length && (f = f.substr(0, 40) + "...");
        c.push(f);
      }
      b.push(a);
      c.push(")\n");
      try {
        c.push(Ro(a.caller, b));
      } catch (g) {
        c.push("[exception trying to get caller]\n");
      }
    } else {
      a ? c.push("[...long stack...]") : c.push("[end]");
    }
  }
  return c.join("");
}
function So(a) {
  if (To[a]) {
    return To[a];
  }
  a = String(a);
  if (!To[a]) {
    var b = /function ([^\(]+)/.exec(a);
    To[a] = b ? b[1] : "[Anonymous]";
  }
  return To[a];
}
var To = {};
function Uo(a, b, c, d, e) {
  this.reset(a, b, c, d, e);
}
Uo.prototype.Ce = null;
Uo.prototype.Be = null;
var Vo = 0;
Uo.prototype.reset = function(a, b, c, d, e) {
  "number" == typeof e || Vo++;
  d || ua();
  this.Bc = a;
  this.Kf = b;
  delete this.Ce;
  delete this.Be;
};
Uo.prototype.Ze = function(a) {
  this.Bc = a;
};
function Wo(a) {
  this.Lf = a;
  this.Ee = this.zd = this.Bc = this.md = null;
}
function Xo(a, b) {
  this.name = a;
  this.value = b;
}
Xo.prototype.toString = function() {
  return this.name;
};
var Yo = new Xo("SEVERE", 1E3), Zo = new Xo("CONFIG", 700), $o = new Xo("FINE", 500);
Wo.prototype.getParent = function() {
  return this.md;
};
Wo.prototype.Ze = function(a) {
  this.Bc = a;
};
function ap(a) {
  if (a.Bc) {
    return a.Bc;
  }
  if (a.md) {
    return ap(a.md);
  }
  Va("Root logger has no level set.");
  return null;
}
Wo.prototype.log = function(a, b, c) {
  if (a.value >= ap(this).value) {
    for (ka(b) && (b = b()), a = this.De(a, b, c, Wo.prototype.log), b = "log:" + a.Kf, ca.console && (ca.console.timeStamp ? ca.console.timeStamp(b) : ca.console.markTimeline && ca.console.markTimeline(b)), ca.msWriteProfilerMark && ca.msWriteProfilerMark(b), b = this;b;) {
      c = b;
      var d = a;
      if (c.Ee) {
        for (var e = 0, f = void 0;f = c.Ee[e];e++) {
          f(d);
        }
      }
      b = b.getParent();
    }
  }
};
Wo.prototype.De = function(a, b, c, d) {
  a = new Uo(a, String(b), this.Lf);
  if (c) {
    a.Ce = c;
    var e;
    d = d || Wo.prototype.De;
    try {
      var f;
      var g = da("window.location.href");
      if (ia(c)) {
        f = {message:c, name:"Unknown error", lineNumber:"Not available", fileName:g, stack:"Not available"};
      } else {
        var l, m;
        b = !1;
        try {
          l = c.lineNumber || c.ig || "Not available";
        } catch (p) {
          l = "Not available", b = !0;
        }
        try {
          m = c.fileName || c.filename || c.sourceURL || ca.$googDebugFname || g;
        } catch (q) {
          m = "Not available", b = !0;
        }
        f = !b && c.lineNumber && c.fileName && c.stack && c.message && c.name ? c : {message:c.message || "Not available", name:c.name || "UnknownError", lineNumber:l, fileName:m, stack:c.stack || "Not available"};
      }
      e = "Message: " + Ba(f.message) + '\nUrl: \x3ca href\x3d"view-source:' + f.fileName + '" target\x3d"_new"\x3e' + f.fileName + "\x3c/a\x3e\nLine: " + f.lineNumber + "\n\nBrowser stack:\n" + Ba(f.stack + "-\x3e ") + "[end]\n\nJS stack traversal:\n" + Ba(Qo(d) + "-\x3e ");
    } catch (r) {
      e = "Exception trying to expose exception! You win, we lose. " + r;
    }
    a.Be = e;
  }
  return a;
};
var bp = {}, cp = null;
function dp(a) {
  cp || (cp = new Wo(""), bp[""] = cp, cp.Ze(Zo));
  var b;
  if (!(b = bp[a])) {
    b = new Wo(a);
    var c = a.lastIndexOf("."), d = a.substr(c + 1), c = dp(a.substr(0, c));
    c.zd || (c.zd = {});
    c.zd[d] = b;
    b.md = c;
    bp[a] = b;
  }
  return b;
}
;function ep(a, b) {
  a && a.log($o, b, void 0);
}
;function fp() {
}
fp.prototype.ke = null;
function gp(a) {
  var b;
  (b = a.ke) || (b = {}, hp(a) && (b[0] = !0, b[1] = !0), b = a.ke = b);
  return b;
}
;var ip;
function jp() {
}
va(jp, fp);
function kp(a) {
  return(a = hp(a)) ? new ActiveXObject(a) : new XMLHttpRequest;
}
function hp(a) {
  if (!a.Fe && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0;c < b.length;c++) {
      var d = b[c];
      try {
        return new ActiveXObject(d), a.Fe = d;
      } catch (e) {
      }
    }
    throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
  }
  return a.Fe;
}
ip = new jp;
var lp = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;
function mp(a) {
  if (np) {
    np = !1;
    var b = ca.location;
    if (b) {
      var c = b.href;
      if (c && (c = (c = mp(c)[3] || null) && decodeURIComponent(c)) && c != b.hostname) {
        throw np = !0, Error();
      }
    }
  }
  return a.match(lp);
}
var np = Un;
function op(a) {
  Eo.call(this);
  this.headers = new Lo;
  this.wd = a || null;
  this.ob = !1;
  this.vd = this.I = null;
  this.He = this.gd = "";
  this.Ub = 0;
  this.Ac = "";
  this.Eb = this.Xd = this.fd = this.Sd = !1;
  this.Zb = 0;
  this.rd = null;
  this.Ve = pp;
  this.sd = this.Sf = !1;
}
va(op, Eo);
var pp = "", qp = op.prototype, rp = dp("goog.net.XhrIo");
qp.Ca = rp;
var sp = /^https?$/i, tp = ["POST", "PUT"];
h = op.prototype;
h.send = function(a, b, c, d) {
  if (this.I) {
    throw Error("[goog.net.XhrIo] Object is active with another request\x3d" + this.gd + "; newUri\x3d" + a);
  }
  b = b ? b.toUpperCase() : "GET";
  this.gd = a;
  this.Ac = "";
  this.Ub = 0;
  this.He = b;
  this.Sd = !1;
  this.ob = !0;
  this.I = this.wd ? kp(this.wd) : kp(ip);
  this.vd = this.wd ? gp(this.wd) : gp(ip);
  this.I.onreadystatechange = ta(this.Ke, this);
  try {
    ep(this.Ca, up(this, "Opening Xhr")), this.Xd = !0, this.I.open(b, String(a), !0), this.Xd = !1;
  } catch (e) {
    ep(this.Ca, up(this, "Error opening Xhr: " + e.message));
    vp(this, e);
    return;
  }
  a = c || "";
  var f = this.headers.clone();
  d && Ko(d, function(a, b) {
    f.set(b, a);
  });
  d = eb(f.Ta());
  c = ca.FormData && a instanceof ca.FormData;
  !(0 <= Xa(tp, b)) || d || c || f.set("Content-Type", "application/x-www-form-urlencoded;charset\x3dutf-8");
  f.forEach(function(a, b) {
    this.I.setRequestHeader(b, a);
  }, this);
  this.Ve && (this.I.responseType = this.Ve);
  "withCredentials" in this.I && (this.I.withCredentials = this.Sf);
  try {
    wp(this), 0 < this.Zb && (this.sd = xp(this.I), ep(this.Ca, up(this, "Will abort after " + this.Zb + "ms if incomplete, xhr2 " + this.sd)), this.sd ? (this.I.timeout = this.Zb, this.I.ontimeout = ta(this.bf, this)) : this.rd = Go(this.bf, this.Zb, this)), ep(this.Ca, up(this, "Sending request")), this.fd = !0, this.I.send(a), this.fd = !1;
  } catch (g) {
    ep(this.Ca, up(this, "Send error: " + g.message)), vp(this, g);
  }
};
function xp(a) {
  return Sn && Yn(9) && "number" == typeof a.timeout && void 0 !== a.ontimeout;
}
function fb(a) {
  return "content-type" == a.toLowerCase();
}
h.bf = function() {
  "undefined" != typeof aa && this.I && (this.Ac = "Timed out after " + this.Zb + "ms, aborting", this.Ub = 8, ep(this.Ca, up(this, this.Ac)), this.dispatchEvent("timeout"), this.abort(8));
};
function vp(a, b) {
  a.ob = !1;
  a.I && (a.Eb = !0, a.I.abort(), a.Eb = !1);
  a.Ac = b;
  a.Ub = 5;
  yp(a);
  zp(a);
}
function yp(a) {
  a.Sd || (a.Sd = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"));
}
h.abort = function(a) {
  this.I && this.ob && (ep(this.Ca, up(this, "Aborting")), this.ob = !1, this.Eb = !0, this.I.abort(), this.Eb = !1, this.Ub = a || 7, this.dispatchEvent("complete"), this.dispatchEvent("abort"), zp(this));
};
h.Ja = function() {
  this.I && (this.ob && (this.ob = !1, this.Eb = !0, this.I.abort(), this.Eb = !1), zp(this, !0));
  op.zb.Ja.call(this);
};
h.Ke = function() {
  this.$c || (this.Xd || this.fd || this.Eb ? Ap(this) : this.Mf());
};
h.Mf = function() {
  Ap(this);
};
function Ap(a) {
  if (a.ob && "undefined" != typeof aa) {
    if (a.vd[1] && 4 == Bp(a) && 2 == Cp(a)) {
      ep(a.Ca, up(a, "Local request error detected and ignored"));
    } else {
      if (a.fd && 4 == Bp(a)) {
        Go(a.Ke, 0, a);
      } else {
        if (a.dispatchEvent("readystatechange"), 4 == Bp(a)) {
          ep(a.Ca, up(a, "Request complete"));
          a.ob = !1;
          try {
            var b = Cp(a), c, d;
            a: {
              switch(b) {
                case 200:
                ;
                case 201:
                ;
                case 202:
                ;
                case 204:
                ;
                case 206:
                ;
                case 304:
                ;
                case 1223:
                  d = !0;
                  break a;
                default:
                  d = !1;
              }
            }
            if (!(c = d)) {
              var e;
              if (e = 0 === b) {
                var f = mp(String(a.gd))[1] || null;
                if (!f && self.location) {
                  var g = self.location.protocol, f = g.substr(0, g.length - 1)
                }
                e = !sp.test(f ? f.toLowerCase() : "");
              }
              c = e;
            }
            if (c) {
              a.dispatchEvent("complete"), a.dispatchEvent("success");
            } else {
              a.Ub = 6;
              var l;
              try {
                l = 2 < Bp(a) ? a.I.statusText : "";
              } catch (m) {
                ep(a.Ca, "Can not get status: " + m.message), l = "";
              }
              a.Ac = l + " [" + Cp(a) + "]";
              yp(a);
            }
          } finally {
            zp(a);
          }
        }
      }
    }
  }
}
function zp(a, b) {
  if (a.I) {
    wp(a);
    var c = a.I, d = a.vd[0] ? ea : null;
    a.I = null;
    a.vd = null;
    b || a.dispatchEvent("ready");
    try {
      c.onreadystatechange = d;
    } catch (e) {
      (c = a.Ca) && c.log(Yo, "Problem encountered resetting onreadystatechange: " + e.message, void 0);
    }
  }
}
function wp(a) {
  a.I && a.sd && (a.I.ontimeout = null);
  "number" == typeof a.rd && (ca.clearTimeout(a.rd), a.rd = null);
}
function Bp(a) {
  return a.I ? a.I.readyState : 0;
}
function Cp(a) {
  try {
    return 2 < Bp(a) ? a.I.status : -1;
  } catch (b) {
    return-1;
  }
}
function Dp(a) {
  try {
    return a.I ? a.I.responseText : "";
  } catch (b) {
    return ep(a.Ca, "Can not get responseText: " + b.message), "";
  }
}
h.getResponseHeader = function(a) {
  return this.I && 4 == Bp(this) ? this.I.getResponseHeader(a) : void 0;
};
function up(a, b) {
  return b + " [" + a.He + " " + a.gd + " " + Cp(a) + "]";
}
;function Ep() {
  this.Ka = [];
  this.Ya = [];
}
h = Ep.prototype;
h.ad = function(a) {
  this.Ya.push(a);
};
h.wc = function() {
  0 == this.Ka.length && (this.Ka = this.Ya, this.Ka.reverse(), this.Ya = []);
  return this.Ka.pop();
};
h.ja = function() {
  return this.Ka.length + this.Ya.length;
};
h.ib = function() {
  return 0 == this.Ka.length && 0 == this.Ya.length;
};
h.clear = function() {
  this.Ka = [];
  this.Ya = [];
};
h.remove = function(a) {
  var b = $a(this.Ka, a);
  if (0 > b) {
    return hb(this.Ya, a);
  }
  Wa.splice.call(this.Ka, b, 1);
  return!0;
};
h.xa = function() {
  for (var a = [], b = this.Ka.length - 1;0 <= b;--b) {
    a.push(this.Ka[b]);
  }
  for (var c = this.Ya.length, b = 0;b < c;++b) {
    a.push(this.Ya[b]);
  }
  return a;
};
function Fp(a, b) {
  Ln.call(this);
  this.Ie = a || 0;
  this.jd = b || 10;
  if (this.Ie > this.jd) {
    throw Error(Gp);
  }
  this.hb = new Ep;
  this.Fb = new Oo;
  this.Qd = 0;
  this.Yd = null;
  this.Gc();
}
va(Fp, Ln);
var Gp = "[goog.structs.Pool] Min can not be greater than max";
h = Fp.prototype;
h.cd = function() {
  var a = ua();
  if (!(null != this.Yd && a - this.Yd < this.Qd)) {
    for (var b;0 < this.hb.ja() && (b = this.hb.wc(), !this.$d(b));) {
      this.Gc();
    }
    !b && this.ja() < this.jd && (b = this.Pd());
    b && (this.Yd = a, this.Fb.add(b));
    return b;
  }
};
function Hp(a, b) {
  return a.Fb.remove(b) ? (a.yd(b), !0) : !1;
}
h.yd = function(a) {
  this.Fb.remove(a);
  this.$d(a) && this.ja() < this.jd ? this.hb.ad(a) : Ip(a);
};
h.Gc = function() {
  for (var a = this.hb;this.ja() < this.Ie;) {
    a.ad(this.Pd());
  }
  for (;this.ja() > this.jd && 0 < this.hb.ja();) {
    Ip(a.wc());
  }
};
h.Pd = function() {
  return{};
};
function Ip(a) {
  if ("function" == typeof a.Rd) {
    a.Rd();
  } else {
    for (var b in a) {
      a[b] = null;
    }
  }
}
h.$d = function(a) {
  return "function" == typeof a.jf ? a.jf() : !0;
};
h.ja = function() {
  return this.hb.ja() + this.Fb.ja();
};
h.ib = function() {
  return this.hb.ib() && this.Fb.ib();
};
h.Ja = function() {
  Fp.zb.Ja.call(this);
  if (0 < this.Fb.ja()) {
    throw Error("[goog.structs.Pool] Objects not released");
  }
  delete this.Fb;
  for (var a = this.hb;!a.ib();) {
    Ip(a.wc());
  }
  delete this.hb;
};
function Jp(a, b) {
  this.Ge = a;
  this.fe = b;
}
Jp.prototype.getKey = function() {
  return this.Ge;
};
Jp.prototype.clone = function() {
  return new Jp(this.Ge, this.fe);
};
function Kp(a) {
  this.Na = [];
  if (a) {
    a: {
      var b, c;
      if (a instanceof Kp) {
        if (b = a.Ta(), c = a.xa(), 0 >= a.ja()) {
          a = this.Na;
          for (var d = 0;d < b.length;d++) {
            a.push(new Jp(b[d], c[d]));
          }
          break a;
        }
      } else {
        b = Oa(a), c = Na(a);
      }
      for (d = 0;d < b.length;d++) {
        Lp(this, b[d], c[d]);
      }
    }
  }
}
function Lp(a, b, c) {
  var d = a.Na;
  d.push(new Jp(b, c));
  b = d.length - 1;
  a = a.Na;
  for (c = a[b];0 < b;) {
    if (d = b - 1 >> 1, a[d].getKey() > c.getKey()) {
      a[b] = a[d], b = d;
    } else {
      break;
    }
  }
  a[b] = c;
}
h = Kp.prototype;
h.remove = function() {
  var a = this.Na, b = a.length, c = a[0];
  if (!(0 >= b)) {
    if (1 == b) {
      gb(a);
    } else {
      a[0] = a.pop();
      for (var a = 0, b = this.Na, d = b.length, e = b[a];a < d >> 1;) {
        var f = 2 * a + 1, g = 2 * a + 2, f = g < d && b[g].getKey() < b[f].getKey() ? g : f;
        if (b[f].getKey() > e.getKey()) {
          break;
        }
        b[a] = b[f];
        a = f;
      }
      b[a] = e;
    }
    return c.fe;
  }
};
h.xa = function() {
  for (var a = this.Na, b = [], c = a.length, d = 0;d < c;d++) {
    b.push(a[d].fe);
  }
  return b;
};
h.Ta = function() {
  for (var a = this.Na, b = [], c = a.length, d = 0;d < c;d++) {
    b.push(a[d].getKey());
  }
  return b;
};
h.Qb = function(a) {
  return bb(this.Na, function(b) {
    return b.getKey() == a;
  });
};
h.clone = function() {
  return new Kp(this);
};
h.ja = function() {
  return this.Na.length;
};
h.ib = function() {
  return 0 == this.Na.length;
};
h.clear = function() {
  gb(this.Na);
};
function Mp() {
  Kp.call(this);
}
va(Mp, Kp);
Mp.prototype.ad = function(a, b) {
  Lp(this, a, b);
};
Mp.prototype.wc = function() {
  return this.remove();
};
function Np(a, b) {
  this.ze = void 0;
  this.od = new Mp;
  Fp.call(this, a, b);
}
va(Np, Fp);
h = Np.prototype;
h.cd = function(a, b) {
  if (!a) {
    var c = Np.zb.cd.call(this);
    c && this.Qd && (this.ze = ca.setTimeout(ta(this.dd, this), this.Qd));
    return c;
  }
  this.od.ad(void 0 !== b ? b : 100, a);
  this.dd();
};
h.dd = function() {
  for (var a = this.od;0 < a.ja();) {
    var b = this.cd();
    if (b) {
      a.wc().apply(this, [b]);
    } else {
      break;
    }
  }
};
h.yd = function(a) {
  Np.zb.yd.call(this, a);
  this.dd();
};
h.Gc = function() {
  Np.zb.Gc.call(this);
  this.dd();
};
h.Ja = function() {
  Np.zb.Ja.call(this);
  ca.clearTimeout(this.ze);
  this.od.clear();
  this.od = null;
};
function Op(a, b, c) {
  Np.call(this, b, c);
  this.Bf = a;
}
va(Op, Np);
Op.prototype.Pd = function() {
  var a = new op, b = this.Bf;
  b && b.forEach(function(b, d) {
    a.headers.set(d, b);
  });
  return a;
};
Op.prototype.$d = function(a) {
  return!a.$c && !a.I;
};
function Pp(a, b, c) {
  this.Ga = a || null;
  this.Cf = !!c;
}
function Qp(a) {
  if (!a.ba && (a.ba = new Lo, a.Y = 0, a.Ga)) {
    for (var b = a.Ga.split("\x26"), c = 0;c < b.length;c++) {
      var d = b[c].indexOf("\x3d"), e = null, f = null;
      0 <= d ? (e = b[c].substring(0, d), f = b[c].substring(d + 1)) : e = b[c];
      e = decodeURIComponent(e.replace(/\+/g, " "));
      e = Rp(a, e);
      a.add(e, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "");
    }
  }
}
h = Pp.prototype;
h.ba = null;
h.Y = null;
h.ja = function() {
  Qp(this);
  return this.Y;
};
h.add = function(a, b) {
  Qp(this);
  this.Ga = null;
  a = Rp(this, a);
  var c = this.ba.get(a);
  c || this.ba.set(a, c = []);
  c.push(b);
  this.Y++;
  return this;
};
h.remove = function(a) {
  Qp(this);
  a = Rp(this, a);
  return this.ba.Qb(a) ? (this.Ga = null, this.Y -= this.ba.get(a).length, this.ba.remove(a)) : !1;
};
h.clear = function() {
  this.ba = this.Ga = null;
  this.Y = 0;
};
h.ib = function() {
  Qp(this);
  return 0 == this.Y;
};
h.Qb = function(a) {
  Qp(this);
  a = Rp(this, a);
  return this.ba.Qb(a);
};
h.Ta = function() {
  Qp(this);
  for (var a = this.ba.xa(), b = this.ba.Ta(), c = [], d = 0;d < b.length;d++) {
    for (var e = a[d], f = 0;f < e.length;f++) {
      c.push(b[d]);
    }
  }
  return c;
};
h.xa = function(a) {
  Qp(this);
  var b = [];
  if (ia(a)) {
    this.Qb(a) && (b = ib(b, this.ba.get(Rp(this, a))));
  } else {
    a = this.ba.xa();
    for (var c = 0;c < a.length;c++) {
      b = ib(b, a[c]);
    }
  }
  return b;
};
h.set = function(a, b) {
  Qp(this);
  this.Ga = null;
  a = Rp(this, a);
  this.Qb(a) && (this.Y -= this.ba.get(a).length);
  this.ba.set(a, [b]);
  this.Y++;
  return this;
};
h.get = function(a, b) {
  var c = a ? this.xa(a) : [];
  return 0 < c.length ? String(c[0]) : b;
};
h.toString = function() {
  if (this.Ga) {
    return this.Ga;
  }
  if (!this.ba) {
    return "";
  }
  for (var a = [], b = this.ba.Ta(), c = 0;c < b.length;c++) {
    for (var d = b[c], e = encodeURIComponent(String(d)), d = this.xa(d), f = 0;f < d.length;f++) {
      var g = e;
      "" !== d[f] && (g += "\x3d" + encodeURIComponent(String(d[f])));
      a.push(g);
    }
  }
  return this.Ga = a.join("\x26");
};
h.clone = function() {
  var a = new Pp;
  a.Ga = this.Ga;
  this.ba && (a.ba = this.ba.clone(), a.Y = this.Y);
  return a;
};
function Rp(a, b) {
  var c = String(b);
  a.Cf && (c = c.toLowerCase());
  return c;
}
;function Sp(a, b) {
  var c = Array.prototype.slice.call(arguments), d = c.shift();
  if ("undefined" == typeof d) {
    throw Error("[goog.string.format] Template required");
  }
  return d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function(a, b, d, l, m, p, q, r) {
    if ("%" == p) {
      return "%";
    }
    var u = c.shift();
    if ("undefined" == typeof u) {
      throw Error("[goog.string.format] Not enough arguments");
    }
    arguments[0] = u;
    return Sp.fb[p].apply(null, arguments);
  });
}
Sp.fb = {};
Sp.fb.s = function(a, b, c) {
  return isNaN(c) || "" == c || a.length >= c ? a : a = -1 < b.indexOf("-", 0) ? a + Array(c - a.length + 1).join(" ") : Array(c - a.length + 1).join(" ") + a;
};
Sp.fb.f = function(a, b, c, d, e) {
  d = a.toString();
  isNaN(e) || "" == e || (d = a.toFixed(e));
  var f;
  f = 0 > a ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
  0 <= a && (d = f + d);
  if (isNaN(c) || d.length >= c) {
    return d;
  }
  d = isNaN(e) ? Math.abs(a).toString() : Math.abs(a).toFixed(e);
  a = c - d.length - f.length;
  return d = 0 <= b.indexOf("-", 0) ? f + d + Array(a + 1).join(" ") : f + Array(a + 1).join(0 <= b.indexOf("0", 0) ? "0" : " ") + d;
};
Sp.fb.d = function(a, b, c, d, e, f, g, l) {
  return Sp.fb.f(parseInt(a, 10), b, c, d, 0, f, g, l);
};
Sp.fb.i = Sp.fb.d;
Sp.fb.u = Sp.fb.d;
function Tp(a) {
  return a instanceof jf;
}
function Up(a) {
  return Yd.call(null, a) && !(0 > a);
}
function Vp(a) {
  return void 0 === a ? null : a;
}
var Wp = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    return U.call(null, Sp, a, qf.call(null, Vp, b));
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}();
function Xp(a) {
  return Md.call(null, a) ? a : Gh.call(null, a);
}
function Yp(a, b) {
  return B.call(null, Gh.call(null, xh.call(null, a)), Xp.call(null, b));
}
function Zp(a) {
  if ("string" === typeof a) {
    return a;
  }
  var b = ze.call(null, a);
  a = ye.call(null, a);
  return t(a) ? "" + x.a(a) + "/" + x.a(b) : b;
}
var $p = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    var e = R.call(null, b, 0, null), f = R.call(null, b, 1, null), f = t(f) ? Math.pow.call(null, 10, f) : null, g = ob.call(null, f) ? a : a * f, l = function() {
      switch((t(e) ? e : new s(null, "round", "round", 2009433328)) instanceof s ? (t(e) ? e : new s(null, "round", "round", 2009433328)).ea : null) {
        case "trunc":
          return fe.call(null, g);
        case "ceil":
          return fe.call(null, Math.ceil.call(null, g));
        case "floor":
          return fe.call(null, Math.floor.call(null, g));
        case "round":
          return Math.round.call(null, g);
        default:
          throw Hi.call(null, "Unknown round type", new n(null, 1, [new s(null, "type", "type", 1174270348), e], null));;
      }
    }();
    return ob.call(null, f) ? l : l / f;
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}(), aq = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    var e = R.call(null, b, 0, null), f = Vd.call(null, e) ? U.call(null, kf, e) : e, g = S.call(null, f, new s(null, "factor", "factor", -2103172748), 1E3), e = S.call(null, f, new s(null, "min", "min", 444991522)), f = S.call(null, f, new s(null, "max", "max", 61366548)), l = Math.pow.call(null, 2, a - 1), g = .5 * (l + ie.call(null, l)) * g, e = t(e) ? e > g ? e : g : g;
    return fe.call(null, t(f) ? f < e ? f : e : e);
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}();
function bq() {
  return(new Date).getTime();
}
ff.call(null, function(a) {
  return he.call(null, a, 1E3);
}, function() {
  function a(a) {
    var d = null;
    0 < arguments.length && (d = M(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, d);
  }
  function b(a) {
    a = Vd.call(null, a) ? U.call(null, kf, a) : a;
    var b = S.call(null, a, new s(null, "ms", "ms", -1152709733)), e = S.call(null, a, new s(null, "msecs", "msecs", 1711980553)), f = S.call(null, a, new s(null, "secs", "secs", 1532330091)), g = S.call(null, a, new s(null, "mins", "mins", 467369676)), l = S.call(null, a, new s(null, "hours", "hours", 58380855)), m = S.call(null, a, new s(null, "days", "days", -1394072564)), p = S.call(null, a, new s(null, "weeks", "weeks", 1844596125)), q = S.call(null, a, new s(null, "months", "months", -45571637)), 
    r = S.call(null, a, new s(null, "years", "years", -1298579689));
    if (!$e.call(null, new Ch(null, new n(null, 9, [new s(null, "msecs", "msecs", 1711980553), null, new s(null, "secs", "secs", 1532330091), null, new s(null, "months", "months", -45571637), null, new s(null, "days", "days", -1394072564), null, new s(null, "mins", "mins", 467369676), null, new s(null, "hours", "hours", 58380855), null, new s(null, "years", "years", -1298579689), null, new s(null, "ms", "ms", -1152709733), null, new s(null, "weeks", "weeks", 1844596125), null], null), null), xh.call(null, 
    a))) {
      throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "every?", "every?", 2083724064, null), new Ch(null, new n(null, 9, [new s(null, "msecs", "msecs", 1711980553), null, new s(null, "secs", "secs", 1532330091), null, new s(null, "months", "months", -45571637), null, new s(null, "days", "days", -1394072564), null, new s(null, "mins", "mins", 467369676), null, new s(null, "hours", "hours", 58380855), null, new s(null, "years", "years", -1298579689), null, new s(null, "ms", "ms", -1152709733), 
      null, new s(null, "weeks", "weeks", 1844596125), null], null), null), V(new D(null, "keys", "keys", -1586012071, null), new D(null, "opts", "opts", 1795607228, null))))));
    }
    return $p.call(null, (t(r) ? 31536E6 * r : 0) + (t(q) ? 2551392E3 * q : 0) + (t(p) ? 6048E5 * p : 0) + (t(m) ? 864E5 * m : 0) + (t(l) ? 36E5 * l : 0) + (t(g) ? 6E4 * g : 0) + (t(f) ? 1E3 * f : 0) + (t(e) ? e : 0) + (t(b) ? b : 0));
  }
  a.k = 0;
  a.e = function(a) {
    a = E(a);
    return b(a);
  };
  a.c = b;
  return a;
}());
function cq(a, b, c, d) {
  this.Ib = a;
  this.Jb = b;
  this.r = c;
  this.p = d;
  this.g = 2229667594;
  this.o = 8192;
  2 < arguments.length ? (this.r = c, this.p = d) : this.p = this.r = null;
}
h = cq.prototype;
h.A = function(a, b) {
  return Lb.call(null, this, b, null);
};
h.G = function(a, b, c) {
  switch(b instanceof s ? b.ea : null) {
    case "return-val":
      return this.Jb;
    case "new-val":
      return this.Ib;
    default:
      return S.call(null, this.p, b, c);
  }
};
h.H = function(a, b, c) {
  return Th.call(null, b, function() {
    return function(a) {
      return Th.call(null, b, Zh, "", " ", "", c, a);
    };
  }(this), "#taoensso.encore.Swapped{", ", ", "}", c, Re.call(null, new X(null, 2, 5, Y, [new X(null, 2, 5, Y, [new s(null, "new-val", "new-val", -738158599), this.Ib], null), new X(null, 2, 5, Y, [new s(null, "return-val", "return-val", -512772489), this.Jb], null)], null), this.p));
};
h.B = function() {
  return this.r;
};
h.Q = function() {
  return 2 + P.call(null, this.p);
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = ne.call(null, this);
};
h.C = function(a, b) {
  return t(t(b) ? this.constructor === b.constructor && pg.call(null, this, b) : b) ? !0 : !1;
};
h.rb = function(a, b) {
  return Zd.call(null, new Ch(null, new n(null, 2, [new s(null, "return-val", "return-val", -512772489), null, new s(null, "new-val", "new-val", -738158599), null], null), null), b) ? Dd.call(null, sd.call(null, zf.call(null, Ag, this), this.r), b) : new cq(this.Ib, this.Jb, this.r, Ze.call(null, Dd.call(null, this.p, b)), null);
};
h.Fa = function(a, b, c) {
  return t(xe.call(null, new s(null, "new-val", "new-val", -738158599), b)) ? new cq(c, this.Jb, this.r, this.p, null) : t(xe.call(null, new s(null, "return-val", "return-val", -512772489), b)) ? new cq(this.Ib, c, this.r, this.p, null) : new cq(this.Ib, this.Jb, this.r, T.call(null, this.p, b, c), null);
};
h.M = function() {
  return E.call(null, Re.call(null, new X(null, 2, 5, Y, [new X(null, 2, 5, Y, [new s(null, "new-val", "new-val", -738158599), this.Ib], null), new X(null, 2, 5, Y, [new s(null, "return-val", "return-val", -512772489), this.Jb], null)], null), this.p));
};
h.D = function(a, b) {
  return new cq(this.Ib, this.Jb, b, this.p, this.n);
};
h.P = function(a, b) {
  return Pd.call(null, b) ? Nb.call(null, this, A.call(null, b, 0), A.call(null, b, 1)) : ub.call(null, Db, this, b);
};
function dq(a, b) {
  return new cq(a, b);
}
function eq(a) {
  return a instanceof cq ? new X(null, 2, 5, Y, [(new s(null, "new-val", "new-val", -738158599)).a(a), (new s(null, "return-val", "return-val", -512772489)).a(a)], null) : new X(null, 2, 5, Y, [a, a], null);
}
function fq(a, b, c) {
  return ub.call(null, function(b, c) {
    if (ob.call(null, c)) {
      return b;
    }
    var f = ob.call(null, a) ? c : O.call(null, a, c), g = R.call(null, f, 0, null), l = R.call(null, f, 1, null), f = R.call(null, f, 2, null);
    switch(g instanceof s ? g.ea : null) {
      case "swap":
        return Kd.call(null, l) ? f.call(null, b) : Ff.call(null, b, l, f.call(null, Df.call(null, b, l)));
      case "reset":
        return Kd.call(null, l) ? f : Ff.call(null, b, l, f);
      default:
        throw Error("No matching clause: " + x.a(g));;
    }
  }, b, c);
}
var gq = function() {
  function a(a, b, c) {
    if (Kd.call(null, b)) {
      for (;;) {
        var g = N.call(null, a);
        b = eq.call(null, c.call(null, g));
        var l = R.call(null, b, 0, null), m = R.call(null, b, 1, null);
        if (pf.call(null, a, g, l)) {
          return m;
        }
      }
    } else {
      for (;;) {
        if (g = N.call(null, a), l = Df.call(null, g, b), m = eq.call(null, c.call(null, l)), l = R.call(null, m, 0, null), m = R.call(null, m, 1, null), l = Ff.call(null, g, b, l), pf.call(null, a, g, l)) {
          return m;
        }
      }
    }
  }
  var b = null, c = function() {
    function a(c, d, l, m) {
      var p = null;
      3 < arguments.length && (p = M(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, c, d, l, p);
    }
    function b(a, c, d, e) {
      if (!bf.call(null, P.call(null, e))) {
        throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "even?", "even?", -1827825394, null), V(new D(null, "count", "count", -514511684, null), new D(null, "more", "more", -418290273, null))))));
      }
      c = zf.call(null, new X(null, 1, 5, Y, [new X(null, 2, 5, Y, [c, d], null)], null), Cf.call(null, 2, e));
      return of.call(null, a, function(a) {
        return function(b) {
          return fq.call(null, new s(null, "swap", "swap", 228675637), b, a);
        };
      }(c));
    }
    a.k = 3;
    a.e = function(a) {
      var c = F(a);
      a = L(a);
      var d = F(a);
      a = L(a);
      var m = F(a);
      a = H(a);
      return b(c, d, m, a);
    };
    a.c = b;
    return a;
  }(), b = function(b, e, f, g) {
    switch(arguments.length) {
      case 3:
        return a.call(this, b, e, f);
      default:
        return c.c(b, e, f, M(arguments, 3));
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.k = 3;
  b.e = c.e;
  b.q = a;
  b.c = c.c;
  return b;
}();
gf.call(null, ub, Re);
function hq(a, b, c) {
  if (ob.call(null, c)) {
    return Ag;
  }
  a = ob.call(null, xe.call(null, a, new s(null, "keywordize", "keywordize", 1381210758))) ? a : function(a) {
    return Ae.call(null, a);
  };
  return Ue.call(null, ae.call(null, function(a, b) {
    return function(c, g, l) {
      return We.call(null, c, t(a) ? a.call(null, g, l) : g, t(b) ? b.call(null, l, l) : l);
    };
  }(a, ob.call(null, xe.call(null, b, new s(null, "keywordize", "keywordize", 1381210758))) ? b : function() {
    return function(a, b) {
      return Ae.call(null, b);
    };
  }(a)), Te.call(null, Ag), c));
}
function iq(a, b) {
  return hq.call(null, function(b) {
    return a.call(null, b);
  }, null, b);
}
gf.call(null, function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    return U.call(null, function() {
      function b(a) {
        var c = null;
        0 < arguments.length && (c = M(Array.prototype.slice.call(arguments, 0), 0));
        return d.call(this, c);
      }
      function d(f) {
        return $e.call(null, Od, f) ? U.call(null, Bh, b, f) : U.call(null, a, f);
      }
      b.k = 0;
      b.e = function(a) {
        a = E(a);
        return d(a);
      };
      b.c = d;
      return b;
    }(), b);
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}(), function(a, b) {
  return b;
});
var jq = function() {
  function a(a, d, e) {
    var f = null;
    2 < arguments.length && (f = M(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, d, f);
  }
  function b(a, b, e) {
    var f = R.call(null, e, 0, null);
    if (null != f && !Up.call(null, f)) {
      throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "or", "or", 1876275696, null), V(new D(null, "nil?", "nil?", 1612038930, null), new D(null, "max-len", "max-len", 1621685511, null)), V(new D(null, "nneg-int?", "nneg-int?", 803479360, null), new D(null, "max-len", "max-len", 1621685511, null))))));
    }
    var g = P.call(null, a), l = 0 <= b ? b < g ? b : g : function() {
      var a = g + b - 1;
      return 0 > a ? 0 : a;
    }();
    return a.substring(l, ob.call(null, f) ? g : function() {
      var a = l + f;
      return a < g ? a : g;
    }());
  }
  a.k = 2;
  a.e = function(a) {
    var d = F(a);
    a = L(a);
    var e = F(a);
    a = H(a);
    return b(d, e, a);
  };
  a.c = b;
  return a;
}();
function kq(a, b) {
  return Ye.call(null, -1, a.indexOf(b));
}
(function(a) {
  return t(Ri.call(null, a)) ? 0 : P.call(null, Pi.call(null, a, /\s+/));
}).call(null, "Hello this is a    test");
var lq = function() {
  function a(a) {
    return jq.call(null, c.call(null), 0, a);
  }
  function b() {
    function a(b) {
      return U.call(null, x, uf.call(null, b, function() {
        return je.call(null, 16).toString(16);
      }));
    }
    var b = function() {
      return function() {
        return(8 | 3 & je.call(null, 15)).toString(16);
      };
    }(a);
    return(new Sa).append(a.call(null, 8), "-", a.call(null, 4), "-4", a.call(null, 3), "-", b.call(null), a.call(null, 3), "-", a.call(null, 12)).toString();
  }
  var c = null, c = function(c) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return a.call(this, c);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.Z = b;
  c.a = a;
  return c;
}();
function mq(a) {
  t("undefined" != typeof console) ? console.log(a) : print(a);
  return null;
}
var nq = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    return mq.call(null, U.call(null, Wp, a, b));
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}(), oq = lf.call(null, new s(null, "debug", "debug", -1608172596)), pq = function() {
  var a = new X(null, 7, 5, Y, [new s(null, "trace", "trace", -1082747415), new s(null, "debug", "debug", -1608172596), new s(null, "info", "info", -317069002), new s(null, "warn", "warn", -436710552), new s(null, "error", "error", -978969032), new s(null, "fatal", "fatal", 1874419888), new s(null, "report", "report", 1394055010)], null), b = Ih.call(null, a, L.call(null, Kh.call(null))), c = Gh.call(null, a);
  return function(a, b, c) {
    return function(a) {
      var d = N.call(null, oq);
      if (!t(c.call(null, d))) {
        throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "valid-level?", "valid-level?", -1401143417, null), new D(null, "current-level", "current-level", 1628605637, null)))));
      }
      if (!t(c.call(null, a))) {
        throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "valid-level?", "valid-level?", -1401143417, null), new D(null, "level", "level", -1363938217, null)))));
      }
      return b.call(null, a) >= b.call(null, d);
    };
  }(a, b, c);
}(), qq = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    return t(pq.call(null, new s(null, "trace", "trace", -1082747415))) ? U.call(null, nq, a, b) : null;
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}(), rq = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    return t(pq.call(null, new s(null, "debug", "debug", -1608172596))) ? U.call(null, nq, a, b) : null;
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}(), sq = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    return t(pq.call(null, new s(null, "warn", "warn", -436710552))) ? "WARN: " + x.a(U.call(null, nq, a, b)) : null;
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}(), tq = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    return t(pq.call(null, new s(null, "error", "error", -978969032))) ? "ERROR: " + x.a(U.call(null, nq, a, b)) : null;
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}();
function uq() {
  var a = window.location;
  return new n(null, 7, [new s(null, "href", "href", -793805698), a.href, new s(null, "protocol", "protocol", 652470118), a.protocol, new s(null, "hostname", "hostname", 2105669933), a.hostname, new s(null, "host", "host", -1558485167), a.host, new s(null, "pathname", "pathname", -1420497528), a.pathname, new s(null, "search", "search", 1564939822), a.search, new s(null, "hash", "hash", -13781596), a.hash], null);
}
var vq = new gi(function() {
  return new Op;
}, null);
function wq() {
  var a = N.call(null, vq).cd();
  return void 0 === a ? null : a;
}
function xq(a, b, c) {
  if (null != c && !Od.call(null, c)) {
    throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "or", "or", 1876275696, null), V(new D(null, "nil?", "nil?", 1612038930, null), new D(null, "params", "params", -1943919534, null)), V(new D(null, "map?", "map?", -1780568534, null), new D(null, "params", "params", -1943919534, null))))));
  }
  if (Kd.call(null, c)) {
    c = null;
  } else {
    var d = new Lo(ki.call(null, c));
    c = Jo(d);
    if ("undefined" == typeof c) {
      throw Error("Keys are undefined");
    }
    for (var e = new Pp(null, 0, void 0), d = Io(d), f = 0;f < c.length;f++) {
      var g = c[f], l = d[f];
      if (fa(l)) {
        var m = e;
        m.remove(g);
        0 < l.length && (m.Ga = null, m.ba.set(Rp(m, g), kb(l)), m.Y += l.length);
      } else {
        e.add(g, l);
      }
    }
    c = e.toString();
    c = t(Ri.call(null, c)) ? null : c;
  }
  switch(b instanceof s ? b.ea : null) {
    case "post":
      return new X(null, 2, 5, Y, [a, c], null);
    case "get":
      return new X(null, 2, 5, Y, [t(c) ? "" + x.a(a) + "?" + x.a(c) : a, null], null);
    default:
      throw Error("No matching clause: " + x.a(b));;
  }
}
function yq(a, b, c) {
  var d = Vd.call(null, b) ? U.call(null, kf, b) : b, e = S.call(null, d, new s(null, "resp-type", "resp-type", 1050675962), new s(null, "auto", "auto", -566279492)), f = S.call(null, d, new s(null, "timeout-ms", "timeout-ms", 754221406), 1E4), g = S.call(null, d, new s(null, "headers", "headers", -835030129)), l = S.call(null, d, new s(null, "params", "params", 710516235)), m = S.call(null, d, new s(null, "method", "method", 55703592), new s(null, "get", "get", 1683182755));
  if (null != f && !Up.call(null, f)) {
    throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "or", "or", 1876275696, null), V(new D(null, "nil?", "nil?", 1612038930, null), new D(null, "timeout-ms", "timeout-ms", -1900214363, null)), V(new D(null, "nneg-int?", "nneg-int?", 803479360, null), new D(null, "timeout-ms", "timeout-ms", -1900214363, null))))));
  }
  var p = wq.call(null);
  if (t(p)) {
    try {
      var q = function() {
        var a = (new s(null, "timeout", "timeout", -318625318)).a(d);
        return t(a) ? a : f;
      }(), r;
      a: {
        switch(m instanceof s ? m.ea : null) {
          case "post":
            r = "POST";
            break a;
          case "get":
            r = "GET";
            break a;
          default:
            throw Error("No matching clause: " + x.a(m));;
        }
      }
      var u = iq.call(null, ze, l), y = Ah.call(null, new n(null, 1, ["X-Requested-With", "XMLHTTPRequest"], null), iq.call(null, ze, g)), z = xq.call(null, a, m, u), C = R.call(null, z, 0, null), G = R.call(null, z, 1, null), J = ki.call(null, ob.call(null, G) ? y : T.call(null, y, "Content-Type", "application/x-www-form-urlencoded; charset\x3dUTF-8"));
      yo(p, "ready", function(a, b, c, d, e, f, g, l, m, p) {
        return function() {
          return Hp(N.call(null, vq), p);
        };
      }(p, q, r, u, y, z, C, G, J, p, p, b, d, d, e, f, g, l, m));
      yo(p, "complete", function(a, b, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, db) {
        return function(Aa) {
          var jb = Cp(q), Za = Ye.call(null, jb, -1) ? jb : null, zb = t(Za) ? q.getResponseHeader("Content-Type") : null;
          Aa = new n(null, 6, [new s(null, "raw-resp", "raw-resp", -1924342506), Aa, new s(null, "xhr", "xhr", -177710851), q, new s(null, "?content-type", "?content-type", -2129759049), t(Za) ? zb : null, new s(null, "?content", "?content", 1697782054), t(Za) ? function() {
            var c = B.call(null, C, new s(null, "auto", "auto", -566279492)) ? function() {
              var c = function() {
                return function(a, b) {
                  return kq.call(null, b, a);
                };
              }(jb, Za, zb, a, b, d, e, f, g, l, m, p, q, r, u, y, z, C, G, J, Q, db), Aa = "" + x.a(zb);
              if (c.call(null, "/edn", Aa)) {
                return new s(null, "edn", "edn", 1317840885);
              }
              if (c.call(null, "/json", Aa)) {
                return new s(null, "json", "json", 1279968570);
              }
              if (c.call(null, "/xml", Aa)) {
                return new s(null, "xml", "xml", -1170142052);
              }
              c.call(null, "/html", Aa);
              return new s(null, "text", "text", -1790561697);
            }() : C;
            switch(c instanceof s ? c.ea : null) {
              case "edn":
                return rn.call(null, Dp(q));
              case "xml":
                var Aa;
                try {
                  Aa = q.I ? q.I.responseXML : null;
                } catch (jc) {
                  ep(q.Ca, "Can not get responseXML: " + jc.message), Aa = null;
                }
                return Aa;
              case "json":
                return c = q.I ? Ho(q.I.responseText) : void 0, c;
              case "text":
                return Dp(q);
              default:
                throw Error("No matching clause: " + x.a(c));;
            }
          }() : null, new s(null, "?status", "?status", 938730360), Za, new s(null, "?error", "?error", 1070752222), t(Za) ? 200 <= Za && 299 >= Za ? null : Za : S.call(null, new Dg([5, new s(null, "exception", "exception", -335277064), 6, new s(null, "http-error", "http-error", -1040049553), 7, new s(null, "abort", "abort", 521193198), 8, new s(null, "timeout", "timeout", -318625318)]), q.Ub, new s(null, "unknown", "unknown", -935977881))], null);
          return c.call(null, Aa);
        };
      }(p, q, r, u, y, z, C, G, J, p, p, b, d, d, e, f, g, l, m));
      p.Zb = Math.max(0, t(q) ? q : 0);
      p.send(C, r, G, J);
      return p;
    } catch (Q) {
      if (Q instanceof Error) {
        return tq.call(null, "`ajax-lite` error: %s", Q), Hp(N.call(null, vq), p), null;
      }
      throw Q;
    }
  } else {
    return c.call(null, new n(null, 1, [new s(null, "?error", "?error", 1070752222), new s(null, "xhr-pool-depleted", "xhr-pool-depleted", -1812092376)], null)), null;
  }
}
;function zq(a) {
  if (Pd.call(null, a)) {
    if (ob.call(null, (new Ch(null, new n(null, 2, [1, null, 2, null], null), null)).call(null, P.call(null, a)))) {
      return new s(null, "wrong-length", "wrong-length", 1367572281);
    }
    var b = R.call(null, a, 0, null);
    R.call(null, a, 1, null);
    return b instanceof s ? ob.call(null, ye.call(null, b)) ? new s(null, "unnamespaced-id", "unnamespaced-id", 1976189772) : null : new s(null, "wrong-id-type", "wrong-id-type", -1213601689);
  }
  return new s(null, "wrong-type", "wrong-type", 929556915);
}
function Aq(a) {
  return null == zq.call(null, a);
}
function Bq(a) {
  return Aq.call(null, a) ? a : new X(null, 2, 5, Y, [new s("chsk", "bad-event", "chsk/bad-event", -565206930), a], null);
}
function Cq(a) {
  var b = zq.call(null, a);
  if (t(b)) {
    var c = "" + x.a(function() {
      switch(b instanceof s ? b.ea : null) {
        case "else":
          return "Malformed event (unknown error).";
        case "unnamespaced-id":
          return "Malformed event (`ev-id` should be a namespaced keyword).";
        case "wrong-id-type":
          return "Malformed event (`ev-id` should be a namespaced keyword).";
        case "wrong-length":
          return "Malformed event (wrong length).";
        case "wrong-type":
          return "Malformed event (wrong type).";
        default:
          throw Error("No matching clause: " + x.a(b));;
      }
    }()) + " Event should be of `[ev-id ?ev-data]` form: %s";
    throw Hi.call(null, Wp.call(null, c, "" + x.a(a)), new n(null, 1, [new s(null, "malformed-event", "malformed-event", -2090896605), a], null));
  }
  return null;
}
function Dq(a) {
  return a instanceof yl;
}
function Eq(a) {
  var b = Od.call(null, a);
  if (b && (b = Yp.call(null, a, new Ch(null, new n(null, 6, [new s(null, "ch-recv", "ch-recv", -990916861), null, new s(null, "state", "state", -1988618099), null, new s(null, "event", "event", 301435442), null, new s(null, "id", "id", -1388402092), null, new s(null, "?data", "?data", -9471433), null, new s(null, "send-fn", "send-fn", 351002041), null], null), null)))) {
    var c = Vd.call(null, a) ? U.call(null, kf, a) : a;
    a = S.call(null, c, new s(null, "event", "event", 301435442));
    var b = S.call(null, c, new s(null, "state", "state", -1988618099)), d = S.call(null, c, new s(null, "send-fn", "send-fn", 351002041)), c = S.call(null, c, new s(null, "ch-recv", "ch-recv", -990916861));
    return Dq.call(null, c) && Xd.call(null, d) && Tp.call(null, b) && Aq.call(null, a);
  }
  return b;
}
function Fq(a, b) {
  try {
    if ("string" !== typeof b) {
      throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "string?", "string?", -1129175764, null), new D(null, "pstr", "pstr", 221763868, null)))));
    }
    return Hn.call(null, a, b);
  } catch (c) {
    throw rq.call(null, "Bad package: %s (%s)", b, c), c;
  }
}
function Gq(a, b) {
  return E.call(null, b) ? sd.call(null, a, b) : a;
}
var Hq = function() {
  function a(a, b, c, g) {
    g = B.call(null, g, new s(null, "ajax-cb", "ajax-cb", -807060321)) ? 0 : g;
    return "+" + x.a(Gn.call(null, a, Gq.call(null, t(g) ? new X(null, 2, 5, Y, [c, g], null) : new X(null, 1, 5, Y, [c], null), b)));
  }
  function b(a, b, c) {
    return "-" + x.a(Gn.call(null, a, Gq.call(null, c, b)));
  }
  var c = null, c = function(c, e, f, g) {
    switch(arguments.length) {
      case 3:
        return b.call(this, c, e, f);
      case 4:
        return a.call(this, c, e, f, g);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.q = b;
  c.W = a;
  return c;
}(), Iq = function() {
  function a(a) {
    var d = null;
    0 < arguments.length && (d = M(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, d);
  }
  function b(a) {
    var b = U.call(null, Hq, a);
    qq.call(null, "Packing: %s -\x3e %s", a, b);
    return b;
  }
  a.k = 0;
  a.e = function(a) {
    a = E(a);
    return b(a);
  };
  a.c = b;
  return a;
}();
function Jq(a, b) {
  if ("string" !== typeof b) {
    throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "string?", "string?", -1129175764, null), new D(null, "prefixed-pstr", "prefixed-pstr", -515747107, null)))));
  }
  var c = jq.call(null, b, 0, 1), d = jq.call(null, b, 1), d = Fq.call(null, a, d);
  a: {
    switch(c) {
      case "-":
        c = !1;
        break a;
      case "+":
        c = !0;
        break a;
      default:
        throw Error("No matching clause: " + x.a(c));;
    }
  }
  d = t(c) ? d : new X(null, 2, 5, Y, [d, null], null);
  c = R.call(null, d, 0, null);
  d = R.call(null, d, 1, null);
  d = B.call(null, 0, d) ? new s(null, "ajax-cb", "ajax-cb", -807060321) : d;
  qq.call(null, "Unpacking: %s -\x3e %s", b, new X(null, 2, 5, Y, [c, d], null));
  return new X(null, 2, 5, Y, [c, d], null);
}
function Kq(a) {
  if (a ? a.de : a) {
    return a.de(a);
  }
  var b;
  b = Kq[k(null == a ? null : a)];
  if (!b && (b = Kq._, !b)) {
    throw w.call(null, "IChSocket.chsk-init!", a);
  }
  return b.call(null, a);
}
function Lq(a, b, c) {
  if (a ? a.ee : a) {
    return a.ee(a, b, c);
  }
  var d;
  d = Lq[k(null == a ? null : a)];
  if (!d && (d = Lq._, !d)) {
    throw w.call(null, "IChSocket.chsk-send!*", a);
  }
  return d.call(null, a, b, c);
}
var Mq = function() {
  function a(a, b, c, l) {
    return d.call(null, a, b, new n(null, 2, [new s(null, "timeout-ms", "timeout-ms", 754221406), c, new s(null, "cb", "cb", 589947841), l], null));
  }
  function b(a, b, c) {
    qq.call(null, "Chsk send: (%s) %s", T.call(null, c, new s(null, "cb", "cb", 589947841), Wd.call(null, (new s(null, "cb", "cb", 589947841)).a(c))), b);
    return Lq.call(null, a, b, c);
  }
  function c(a, b) {
    return d.call(null, a, b, Ag);
  }
  var d = null, d = function(d, f, g, l) {
    switch(arguments.length) {
      case 2:
        return c.call(this, d, f);
      case 3:
        return b.call(this, d, f, g);
      case 4:
        return a.call(this, d, f, g, l);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.j = c;
  d.q = b;
  d.W = a;
  return d;
}();
function Nq(a, b, c) {
  Cq.call(null, a);
  if (!(null == b && null == c || Up.call(null, b))) {
    throw Error("Assert failed: " + x.a(Wp.call(null, "cb requires a timeout; timeout-ms should be a +ive integer: %s", b)) + "\n" + x.a(nf.call(null, V(new D(null, "or", "or", 1876275696, null), V(new D(null, "and", "and", 668631710, null), V(new D(null, "nil?", "nil?", 1612038930, null), new D(null, "?timeout-ms", "?timeout-ms", -651193632, null)), V(new D(null, "nil?", "nil?", 1612038930, null), new D(null, "?cb", "?cb", -1346810436, null))), V(new D(null, "and", "and", 668631710, null), V(new D("encore", 
    "nneg-int?", "encore/nneg-int?", 1565384456, null), new D(null, "?timeout-ms", "?timeout-ms", -651193632, null)))))));
  }
  if (null == c || Xd.call(null, c) || Dq.call(null, c)) {
    return null;
  }
  throw Error("Assert failed: " + x.a(Wp.call(null, "cb should be nil, an ifn, or a channel: %s", qb.call(null, c))) + "\n" + x.a(nf.call(null, V(new D(null, "or", "or", 1876275696, null), V(new D(null, "nil?", "nil?", 1612038930, null), new D(null, "?cb", "?cb", -1346810436, null)), V(new D(null, "ifn?", "ifn?", -2106461064, null), new D(null, "?cb", "?cb", -1346810436, null)), V(new D(null, "chan?", "chan?", 1219428, null), new D(null, "?cb", "?cb", -1346810436, null))))));
}
function Oq(a, b) {
  return t(b) ? F.call(null, of.call(null, a, function(a) {
    R.call(null, a, 0, null);
    a = R.call(null, a, 1, null);
    var d = a.call(null, b);
    return t(d) ? new X(null, 2, 5, Y, [d, Dd.call(null, a, b)], null) : new X(null, 2, 5, Y, [null, a], null);
  })) : null;
}
function Pq(a, b) {
  var c = Vd.call(null, a) ? U.call(null, kf, a) : a, d = S.call(null, c, new s(null, "state_", "state_", 957667102)), e = S.call(null, c, new s(null, "chs", "chs", 376886120)), d = gq.call(null, d, xd, function() {
    return function(a) {
      var c = Ah.call(null, a, b);
      return dq.call(null, c, new X(null, 2, 5, Y, [a, c], null));
    };
  }(a, c, c, d, e)), c = R.call(null, d, 0, null), d = R.call(null, d, 1, null);
  return Ye.call(null, c, d) ? (fm.call(null, (new s(null, "state", "state", -1988618099)).a(e), d), d) : null;
}
function Qq(a, b) {
  if (null == a || Xd.call(null, a)) {
    return a;
  }
  if (!Dq.call(null, a)) {
    throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "chan?", "chan?", 1219428, null), new D(null, "?cb", "?cb", -1346810436, null)))));
  }
  Cq.call(null, b);
  var c = R.call(null, b, 0, null), d = R.call(null, b, 1, null);
  return function(a, b, c, d) {
    return function(a) {
      return fm.call(null, d, new X(null, 2, 5, Y, [Ae.call(null, "" + x.a(Zp.call(null, b)) + ".cb"), a], null));
    };
  }(b, c, d, a);
}
function Rq(a, b) {
  qq.call(null, "receive-buffered-evs!: %s", b);
  if (!Pd.call(null, b)) {
    throw Error("Assert failed: " + x.a(nf.call(null, V(new D(null, "vector?", "vector?", -61367869, null), new D(null, "clj", "clj", 980036099, null)))));
  }
  for (var c = E.call(null, b), d = null, e = 0, f = 0;;) {
    if (f < e) {
      var g = A.call(null, d, f);
      Cq.call(null, g);
      fm.call(null, a, g);
      f += 1;
    } else {
      if (c = E.call(null, c)) {
        d = c, Qd.call(null, d) ? (c = Le.call(null, d), e = Me.call(null, d), d = c, g = P.call(null, c), c = e, e = g) : (g = F.call(null, d), Cq.call(null, g), fm.call(null, a, g), c = L.call(null, d), d = null, e = 0), f = 0;
      } else {
        return null;
      }
    }
  }
}
function Sq(a, b) {
  qq.call(null, "handle-when-handshake!: %s", b);
  if (Pd.call(null, b) && B.call(null, F.call(null, b), new s("chsk", "handshake", "chsk/handshake", 64910686))) {
    R.call(null, b, 0, null);
    var c = R.call(null, b, 1, null), d = R.call(null, c, 0, null), c = R.call(null, c, 1, null);
    t(Ri.call(null, c)) && sq.call(null, "Sente warning: NO CSRF TOKEN AVAILABLE");
    Pq.call(null, a, new n(null, 3, [new s(null, "open?", "open?", 1238443125), !0, new s(null, "uid", "uid", -1447769400), d, new s(null, "csrf-token", "csrf-token", -1872302856), c], null));
    return new s(null, "handled", "handled", 1889700151);
  }
  return null;
}
var Tq = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    var e = R.call(null, b, 0, null);
    return window.setTimeout(a, aq.call(null, t(e) ? e : 0));
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}();
function Uq(a, b, c, d, e, f, g, l, m, p, q, r) {
  this.url = a;
  this.O = b;
  this.pa = c;
  this.ra = d;
  this.la = e;
  this.ia = f;
  this.oa = g;
  this.da = l;
  this.L = m;
  this.K = p;
  this.r = q;
  this.p = r;
  this.g = 2229667594;
  this.o = 8192;
  10 < arguments.length ? (this.r = q, this.p = r) : this.p = this.r = null;
}
h = Uq.prototype;
h.A = function(a, b) {
  return Lb.call(null, this, b, null);
};
h.G = function(a, b, c) {
  switch(b instanceof s ? b.ea : null) {
    case "kalive-ms":
      return this.ra;
    case "nattempt_":
      return this.oa;
    case "packer":
      return this.K;
    case "chs":
      return this.O;
    case "socket_":
      return this.pa;
    case "url":
      return this.url;
    case "kalive-due?_":
      return this.ia;
    case "cbs-waiting_":
      return this.da;
    case "kalive-timer_":
      return this.la;
    case "state_":
      return this.L;
    default:
      return S.call(null, this.p, b, c);
  }
};
h.H = function(a, b, c) {
  return Th.call(null, b, function() {
    return function(a) {
      return Th.call(null, b, Zh, "", " ", "", c, a);
    };
  }(this), "#taoensso.sente.ChWebSocket{", ", ", "}", c, Re.call(null, new X(null, 10, 5, Y, [new X(null, 2, 5, Y, [new s(null, "url", "url", 276297046), this.url], null), new X(null, 2, 5, Y, [new s(null, "chs", "chs", 376886120), this.O], null), new X(null, 2, 5, Y, [new s(null, "socket_", "socket_", -361048908), this.pa], null), new X(null, 2, 5, Y, [new s(null, "kalive-ms", "kalive-ms", 210734021), this.ra], null), new X(null, 2, 5, Y, [new s(null, "kalive-timer_", "kalive-timer_", 1558413149), 
  this.la], null), new X(null, 2, 5, Y, [new s(null, "kalive-due?_", "kalive-due?_", 39438072), this.ia], null), new X(null, 2, 5, Y, [new s(null, "nattempt_", "nattempt_", 1980196552), this.oa], null), new X(null, 2, 5, Y, [new s(null, "cbs-waiting_", "cbs-waiting_", -1519029061), this.da], null), new X(null, 2, 5, Y, [new s(null, "state_", "state_", 957667102), this.L], null), new X(null, 2, 5, Y, [new s(null, "packer", "packer", 66077544), this.K], null)], null), this.p));
};
h.B = function() {
  return this.r;
};
h.Q = function() {
  return 10 + P.call(null, this.p);
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = ne.call(null, this);
};
h.C = function(a, b) {
  return t(t(b) ? this.constructor === b.constructor && pg.call(null, this, b) : b) ? !0 : !1;
};
h.rb = function(a, b) {
  return Zd.call(null, new Ch(null, new n(null, 10, [new s(null, "kalive-ms", "kalive-ms", 210734021), null, new s(null, "nattempt_", "nattempt_", 1980196552), null, new s(null, "packer", "packer", 66077544), null, new s(null, "chs", "chs", 376886120), null, new s(null, "socket_", "socket_", -361048908), null, new s(null, "url", "url", 276297046), null, new s(null, "kalive-due?_", "kalive-due?_", 39438072), null, new s(null, "cbs-waiting_", "cbs-waiting_", -1519029061), null, new s(null, "kalive-timer_", 
  "kalive-timer_", 1558413149), null, new s(null, "state_", "state_", 957667102), null], null), null), b) ? Dd.call(null, sd.call(null, zf.call(null, Ag, this), this.r), b) : new Uq(this.url, this.O, this.pa, this.ra, this.la, this.ia, this.oa, this.da, this.L, this.K, this.r, Ze.call(null, Dd.call(null, this.p, b)), null);
};
h.Fa = function(a, b, c) {
  return t(xe.call(null, new s(null, "url", "url", 276297046), b)) ? new Uq(c, this.O, this.pa, this.ra, this.la, this.ia, this.oa, this.da, this.L, this.K, this.r, this.p, null) : t(xe.call(null, new s(null, "chs", "chs", 376886120), b)) ? new Uq(this.url, c, this.pa, this.ra, this.la, this.ia, this.oa, this.da, this.L, this.K, this.r, this.p, null) : t(xe.call(null, new s(null, "socket_", "socket_", -361048908), b)) ? new Uq(this.url, this.O, c, this.ra, this.la, this.ia, this.oa, this.da, this.L, 
  this.K, this.r, this.p, null) : t(xe.call(null, new s(null, "kalive-ms", "kalive-ms", 210734021), b)) ? new Uq(this.url, this.O, this.pa, c, this.la, this.ia, this.oa, this.da, this.L, this.K, this.r, this.p, null) : t(xe.call(null, new s(null, "kalive-timer_", "kalive-timer_", 1558413149), b)) ? new Uq(this.url, this.O, this.pa, this.ra, c, this.ia, this.oa, this.da, this.L, this.K, this.r, this.p, null) : t(xe.call(null, new s(null, "kalive-due?_", "kalive-due?_", 39438072), b)) ? new Uq(this.url, 
  this.O, this.pa, this.ra, this.la, c, this.oa, this.da, this.L, this.K, this.r, this.p, null) : t(xe.call(null, new s(null, "nattempt_", "nattempt_", 1980196552), b)) ? new Uq(this.url, this.O, this.pa, this.ra, this.la, this.ia, c, this.da, this.L, this.K, this.r, this.p, null) : t(xe.call(null, new s(null, "cbs-waiting_", "cbs-waiting_", -1519029061), b)) ? new Uq(this.url, this.O, this.pa, this.ra, this.la, this.ia, this.oa, c, this.L, this.K, this.r, this.p, null) : t(xe.call(null, new s(null, 
  "state_", "state_", 957667102), b)) ? new Uq(this.url, this.O, this.pa, this.ra, this.la, this.ia, this.oa, this.da, c, this.K, this.r, this.p, null) : t(xe.call(null, new s(null, "packer", "packer", 66077544), b)) ? new Uq(this.url, this.O, this.pa, this.ra, this.la, this.ia, this.oa, this.da, this.L, c, this.r, this.p, null) : new Uq(this.url, this.O, this.pa, this.ra, this.la, this.ia, this.oa, this.da, this.L, this.K, this.r, T.call(null, this.p, b, c), null);
};
h.M = function() {
  return E.call(null, Re.call(null, new X(null, 10, 5, Y, [new X(null, 2, 5, Y, [new s(null, "url", "url", 276297046), this.url], null), new X(null, 2, 5, Y, [new s(null, "chs", "chs", 376886120), this.O], null), new X(null, 2, 5, Y, [new s(null, "socket_", "socket_", -361048908), this.pa], null), new X(null, 2, 5, Y, [new s(null, "kalive-ms", "kalive-ms", 210734021), this.ra], null), new X(null, 2, 5, Y, [new s(null, "kalive-timer_", "kalive-timer_", 1558413149), this.la], null), new X(null, 2, 
  5, Y, [new s(null, "kalive-due?_", "kalive-due?_", 39438072), this.ia], null), new X(null, 2, 5, Y, [new s(null, "nattempt_", "nattempt_", 1980196552), this.oa], null), new X(null, 2, 5, Y, [new s(null, "cbs-waiting_", "cbs-waiting_", -1519029061), this.da], null), new X(null, 2, 5, Y, [new s(null, "state_", "state_", 957667102), this.L], null), new X(null, 2, 5, Y, [new s(null, "packer", "packer", 66077544), this.K], null)], null), this.p));
};
h.D = function(a, b) {
  return new Uq(this.url, this.O, this.pa, this.ra, this.la, this.ia, this.oa, this.da, this.L, this.K, b, this.p, this.n);
};
h.P = function(a, b) {
  return Pd.call(null, b) ? Nb.call(null, this, A.call(null, b, 0), A.call(null, b, 1)) : ub.call(null, Db, this, b);
};
h.ee = function(a, b, c) {
  var d = this;
  a = Vd.call(null, c) ? U.call(null, kf, c) : c;
  var e = S.call(null, a, new s(null, "flush?", "flush?", -108887231)), f = S.call(null, a, new s(null, "timeout-ms", "timeout-ms", 754221406)), g = S.call(null, a, new s(null, "cb", "cb", 589947841));
  Nq.call(null, b, f, g);
  var l = Qq.call(null, g, b);
  if (ob.call(null, (new s(null, "open?", "open?", 1238443125)).a(N.call(null, d.L)))) {
    return sq.call(null, "Chsk send against closed chsk."), t(l) ? l.call(null, new s("chsk", "closed", "chsk/closed", -922855264)) : null;
  }
  var m = t(l) ? lq.call(null, 6) : null;
  b = Iq.call(null, d.K, Gd.call(null, b), b, m);
  if (t(m) && (of.call(null, d.da, function(a, b, c) {
    return function(b) {
      R.call(null, b, 0, null);
      b = R.call(null, b, 1, null);
      return new X(null, 2, 5, Y, [null, T.call(null, b, a, c)], null);
    };
  }(m, b, l, this, c, a, a, e, f, g)), t(f))) {
    var p = cm.call(null, 1);
    ql.call(null, function(a, b, c, e, f, g, l, m, p, q, K) {
      return function() {
        var I = function() {
          return function(a) {
            return function() {
              function b(c) {
                for (;;) {
                  var d;
                  a: {
                    try {
                      for (;;) {
                        var e = a.call(null, c);
                        if (!xe.call(null, e, new s(null, "recur", "recur", -437573268))) {
                          d = e;
                          break a;
                        }
                      }
                    } catch (f) {
                      if (f instanceof Object) {
                        c[5] = f;
                        Ql.call(null, c);
                        d = new s(null, "recur", "recur", -437573268);
                        break a;
                      }
                      throw f;
                    }
                    d = void 0;
                  }
                  if (!xe.call(null, d, new s(null, "recur", "recur", -437573268))) {
                    return d;
                  }
                }
              }
              function c() {
                var a = [null, null, null, null, null, null, null, null, null];
                a[0] = d;
                a[1] = 1;
                return a;
              }
              var d = null, d = function(a) {
                switch(arguments.length) {
                  case 0:
                    return c.call(this);
                  case 1:
                    return b.call(this, a);
                }
                throw Error("Invalid arity: " + arguments.length);
              };
              d.Z = c;
              d.a = b;
              return d;
            }();
          }(function(a, b, c, e, f, g, l, m, p, q) {
            return function(a) {
              var c = a[1];
              if (5 === c) {
                return Ml.call(null, a, a[2]);
              }
              if (4 === c) {
                return a[2] = null, a[1] = 5, new s(null, "recur", "recur", -437573268);
              }
              if (3 === c) {
                return c = a[7].call(null, new s("chsk", "timeout", "chsk/timeout", -319776489)), a[2] = c, a[1] = 5, new s(null, "recur", "recur", -437573268);
              }
              if (2 === c) {
                var c = a[2], e = Oq.call(null, d.da, b);
                a[8] = c;
                a[7] = e;
                a[1] = t(e) ? 3 : 4;
                return new s(null, "recur", "recur", -437573268);
              }
              return 1 === c ? (c = dm.call(null, q), Il.call(null, a, 2, c)) : null;
            };
          }(a, b, c, e, f, g, l, m, p, q, K), a, b, c, e, f, g, l, m, p, q, K);
        }(), Dn = function() {
          var b = I.call(null);
          b[6] = a;
          return b;
        }();
        return Hl.call(null, Dn);
      };
    }(p, m, b, l, this, c, a, a, e, f, g));
  }
  try {
    return N.call(null, d.pa).send(b), mf.call(null, d.ia, !1), new s(null, "apparent-success", "apparent-success", 242592222);
  } catch (q) {
    if (q instanceof Error) {
      return tq.call(null, "Chsk send error: %s", q), t(m) && function() {
        var a = Oq.call(null, d.da, m);
        return t(a) ? a : l;
      }().call(null, new s("chsk", "error", "chsk/error", -984175439)), !1;
    }
    throw q;
  }
};
h.de = function() {
  var a = this, b = function() {
    var a = window.WebSocket;
    return t(a) ? a : window.MozWebSocket;
  }();
  return t(b) ? (function(b, d, e) {
    return function g() {
      if (t((new s(null, "destroyed?", "destroyed?", 1049634064)).a(N.call(null, a.L)))) {
        return null;
      }
      var l = function() {
        return function() {
          var b = of.call(null, a.oa, hd);
          window.clearInterval(N.call(null, a.la));
          sq.call(null, "Chsk is closed: will try reconnect (%s).", b);
          return Tq.call(null, g, b);
        };
      }(b, d, e), m;
      try {
        m = new b(a.url);
      } catch (p) {
        if (p instanceof Error) {
          tq.call(null, "WebSocket js/Error: %s", p), m = null;
        } else {
          throw p;
        }
      }
      return t(m) ? mf.call(null, a.pa, function() {
        m.onerror = function() {
          return function(a) {
            return tq.call(null, "WebSocket error: %s", a);
          };
        }(m, m, m, l, b, d, e);
        m.onmessage = function(b, c, d, e, g, l, m) {
          return function(b) {
            var c = Jq.call(null, a.K, b.data);
            b = R.call(null, c, 0, null);
            var c = R.call(null, c, 1, null), d;
            d = Sq.call(null, m, b);
            d = t(d) ? mf.call(null, a.oa, 0) : d;
            return t(d) ? d : t(c) ? (c = Oq.call(null, a.da, c), t(c) ? c.call(null, b) : sq.call(null, "Cb reply w/o local cb-fn: %s", b)) : Rq.call(null, (new s(null, "\x3cserver", "\x3cserver", -2135373537)).a(a.O), b);
          };
        }(m, m, m, l, b, d, e);
        m.onopen = function(b, c, d, e, g, l, m) {
          return function() {
            return mf.call(null, a.la, window.setInterval(function(b, c, d, e, g, l, m) {
              return function() {
                t(N.call(null, a.ia)) && Mq.call(null, m, new X(null, 1, 5, Y, [new s("chsk", "ws-ping", "chsk/ws-ping", 191675304)], null));
                return mf.call(null, a.ia, !0);
              };
            }(b, c, d, e, g, l, m), a.ra));
          };
        }(m, m, m, l, b, d, e);
        m.onclose = function(a, b, c, d, e, g, l) {
          return function() {
            Pq.call(null, l, new n(null, 1, [new s(null, "open?", "open?", 1238443125), !1], null));
            return d.call(null);
          };
        }(m, m, m, l, b, d, e);
        return m;
      }()) : l.call(null);
    };
  }(b, b, this).call(null), this) : null;
};
function Vq(a) {
  return new Uq((new s(null, "url", "url", 276297046)).a(a), (new s(null, "chs", "chs", 376886120)).a(a), (new s(null, "socket_", "socket_", -361048908)).a(a), (new s(null, "kalive-ms", "kalive-ms", 210734021)).a(a), (new s(null, "kalive-timer_", "kalive-timer_", 1558413149)).a(a), (new s(null, "kalive-due?_", "kalive-due?_", 39438072)).a(a), (new s(null, "nattempt_", "nattempt_", 1980196552)).a(a), (new s(null, "cbs-waiting_", "cbs-waiting_", -1519029061)).a(a), (new s(null, "state_", "state_", 
  957667102)).a(a), (new s(null, "packer", "packer", 66077544)).a(a), null, Dd.call(null, a, new s(null, "url", "url", 276297046), new s(null, "chs", "chs", 376886120), new s(null, "socket_", "socket_", -361048908), new s(null, "kalive-ms", "kalive-ms", 210734021), new s(null, "kalive-timer_", "kalive-timer_", 1558413149), new s(null, "kalive-due?_", "kalive-due?_", 39438072), new s(null, "nattempt_", "nattempt_", 1980196552), new s(null, "cbs-waiting_", "cbs-waiting_", -1519029061), new s(null, 
  "state_", "state_", 957667102), new s(null, "packer", "packer", 66077544)));
}
function Wq(a, b, c, d, e, f, g, l, m) {
  this.url = a;
  this.O = b;
  this.Da = c;
  this.za = d;
  this.Ba = e;
  this.L = f;
  this.K = g;
  this.r = l;
  this.p = m;
  this.g = 2229667594;
  this.o = 8192;
  7 < arguments.length ? (this.r = l, this.p = m) : this.p = this.r = null;
}
h = Wq.prototype;
h.A = function(a, b) {
  return Lb.call(null, this, b, null);
};
h.G = function(a, b, c) {
  switch(b instanceof s ? b.ea : null) {
    case "packer":
      return this.K;
    case "state_":
      return this.L;
    case "curr-xhr_":
      return this.Ba;
    case "ajax-client-uuid":
      return this.za;
    case "timeout-ms":
      return this.Da;
    case "chs":
      return this.O;
    case "url":
      return this.url;
    default:
      return S.call(null, this.p, b, c);
  }
};
h.H = function(a, b, c) {
  return Th.call(null, b, function() {
    return function(a) {
      return Th.call(null, b, Zh, "", " ", "", c, a);
    };
  }(this), "#taoensso.sente.ChAjaxSocket{", ", ", "}", c, Re.call(null, new X(null, 7, 5, Y, [new X(null, 2, 5, Y, [new s(null, "url", "url", 276297046), this.url], null), new X(null, 2, 5, Y, [new s(null, "chs", "chs", 376886120), this.O], null), new X(null, 2, 5, Y, [new s(null, "timeout-ms", "timeout-ms", 754221406), this.Da], null), new X(null, 2, 5, Y, [new s(null, "ajax-client-uuid", "ajax-client-uuid", -814553580), this.za], null), new X(null, 2, 5, Y, [new s(null, "curr-xhr_", "curr-xhr_", 
  -1318773696), this.Ba], null), new X(null, 2, 5, Y, [new s(null, "state_", "state_", 957667102), this.L], null), new X(null, 2, 5, Y, [new s(null, "packer", "packer", 66077544), this.K], null)], null), this.p));
};
h.B = function() {
  return this.r;
};
h.Q = function() {
  return 7 + P.call(null, this.p);
};
h.F = function() {
  var a = this.n;
  return null != a ? a : this.n = a = ne.call(null, this);
};
h.C = function(a, b) {
  return t(t(b) ? this.constructor === b.constructor && pg.call(null, this, b) : b) ? !0 : !1;
};
h.rb = function(a, b) {
  return Zd.call(null, new Ch(null, new n(null, 7, [new s(null, "curr-xhr_", "curr-xhr_", -1318773696), null, new s(null, "packer", "packer", 66077544), null, new s(null, "chs", "chs", 376886120), null, new s(null, "ajax-client-uuid", "ajax-client-uuid", -814553580), null, new s(null, "url", "url", 276297046), null, new s(null, "timeout-ms", "timeout-ms", 754221406), null, new s(null, "state_", "state_", 957667102), null], null), null), b) ? Dd.call(null, sd.call(null, zf.call(null, Ag, this), this.r), 
  b) : new Wq(this.url, this.O, this.Da, this.za, this.Ba, this.L, this.K, this.r, Ze.call(null, Dd.call(null, this.p, b)), null);
};
h.Fa = function(a, b, c) {
  return t(xe.call(null, new s(null, "url", "url", 276297046), b)) ? new Wq(c, this.O, this.Da, this.za, this.Ba, this.L, this.K, this.r, this.p, null) : t(xe.call(null, new s(null, "chs", "chs", 376886120), b)) ? new Wq(this.url, c, this.Da, this.za, this.Ba, this.L, this.K, this.r, this.p, null) : t(xe.call(null, new s(null, "timeout-ms", "timeout-ms", 754221406), b)) ? new Wq(this.url, this.O, c, this.za, this.Ba, this.L, this.K, this.r, this.p, null) : t(xe.call(null, new s(null, "ajax-client-uuid", 
  "ajax-client-uuid", -814553580), b)) ? new Wq(this.url, this.O, this.Da, c, this.Ba, this.L, this.K, this.r, this.p, null) : t(xe.call(null, new s(null, "curr-xhr_", "curr-xhr_", -1318773696), b)) ? new Wq(this.url, this.O, this.Da, this.za, c, this.L, this.K, this.r, this.p, null) : t(xe.call(null, new s(null, "state_", "state_", 957667102), b)) ? new Wq(this.url, this.O, this.Da, this.za, this.Ba, c, this.K, this.r, this.p, null) : t(xe.call(null, new s(null, "packer", "packer", 66077544), b)) ? 
  new Wq(this.url, this.O, this.Da, this.za, this.Ba, this.L, c, this.r, this.p, null) : new Wq(this.url, this.O, this.Da, this.za, this.Ba, this.L, this.K, this.r, T.call(null, this.p, b, c), null);
};
h.M = function() {
  return E.call(null, Re.call(null, new X(null, 7, 5, Y, [new X(null, 2, 5, Y, [new s(null, "url", "url", 276297046), this.url], null), new X(null, 2, 5, Y, [new s(null, "chs", "chs", 376886120), this.O], null), new X(null, 2, 5, Y, [new s(null, "timeout-ms", "timeout-ms", 754221406), this.Da], null), new X(null, 2, 5, Y, [new s(null, "ajax-client-uuid", "ajax-client-uuid", -814553580), this.za], null), new X(null, 2, 5, Y, [new s(null, "curr-xhr_", "curr-xhr_", -1318773696), this.Ba], null), new X(null, 
  2, 5, Y, [new s(null, "state_", "state_", 957667102), this.L], null), new X(null, 2, 5, Y, [new s(null, "packer", "packer", 66077544), this.K], null)], null), this.p));
};
h.D = function(a, b) {
  return new Wq(this.url, this.O, this.Da, this.za, this.Ba, this.L, this.K, b, this.p, this.n);
};
h.P = function(a, b) {
  return Pd.call(null, b) ? Nb.call(null, this, A.call(null, b, 0), A.call(null, b, 1)) : ub.call(null, Db, this, b);
};
h.ee = function(a, b, c) {
  var d = this;
  a = Vd.call(null, c) ? U.call(null, kf, c) : c;
  var e = S.call(null, a, new s(null, "flush?", "flush?", -108887231)), f = S.call(null, a, new s(null, "timeout-ms", "timeout-ms", 754221406)), g = S.call(null, a, new s(null, "cb", "cb", 589947841));
  Nq.call(null, b, f, g);
  var l = Qq.call(null, g, b);
  if (ob.call(null, (new s(null, "open?", "open?", 1238443125)).a(N.call(null, d.L)))) {
    return sq.call(null, "Chsk send against closed chsk."), t(l) ? l.call(null, new s("chsk", "closed", "chsk/closed", -922855264)) : null;
  }
  yq.call(null, d.url, new n(null, 4, [new s(null, "method", "method", 55703592), new s(null, "post", "post", 269697687), new s(null, "timeout-ms", "timeout-ms", 754221406), f, new s(null, "resp-type", "resp-type", 1050675962), new s(null, "text", "text", -1790561697), new s(null, "params", "params", 710516235), function() {
    var a = Iq.call(null, d.K, Gd.call(null, b), b, t(l) ? new s(null, "ajax-cb", "ajax-cb", -807060321) : null);
    return new n(null, 3, [new s(null, "_", "_", 1453416199), bq.call(null), new s(null, "ppstr", "ppstr", 1557495252), a, new s(null, "csrf-token", "csrf-token", -1872302856), (new s(null, "csrf-token", "csrf-token", -1872302856)).a(N.call(null, d.L))], null);
  }()], null), function(a, b) {
    return function(c) {
      var e = Vd.call(null, c) ? U.call(null, kf, c) : c;
      c = S.call(null, e, new s(null, "?content", "?content", 1697782054));
      e = S.call(null, e, new s(null, "?error", "?error", 1070752222));
      if (t(e)) {
        if (B.call(null, e, new s(null, "timeout", "timeout", -318625318))) {
          return t(a) ? a.call(null, new s("chsk", "timeout", "chsk/timeout", -319776489)) : null;
        }
        Pq.call(null, b, new n(null, 1, [new s(null, "open?", "open?", 1238443125), !1], null));
        return t(a) ? a.call(null, new s("chsk", "error", "chsk/error", -984175439)) : null;
      }
      c = Jq.call(null, d.K, c);
      e = R.call(null, c, 0, null);
      R.call(null, c, 1, null);
      t(a) ? a.call(null, e) : Ye.call(null, e, new s("chsk", "dummy-cb-200", "chsk/dummy-cb-200", -1663130337)) && sq.call(null, "Cb reply w/o local cb-fn: %s", e);
      return Pq.call(null, b, new n(null, 1, [new s(null, "open?", "open?", 1238443125), !0], null));
    };
  }(l, this, c, a, a, e, f, g));
  return new s(null, "apparent-success", "apparent-success", 242592222);
};
h.de = function() {
  var a = this;
  (function(b) {
    return function d(e) {
      qq.call(null, "async-poll-for-update!");
      if (t((new s(null, "destroyed?", "destroyed?", 1049634064)).a(N.call(null, a.L)))) {
        return null;
      }
      var f = function(b, e) {
        return function() {
          return mf.call(null, a.Ba, yq.call(null, a.url, new n(null, 4, [new s(null, "method", "method", 55703592), new s(null, "get", "get", 1683182755), new s(null, "timeout-ms", "timeout-ms", 754221406), a.Da, new s(null, "resp-type", "resp-type", 1050675962), new s(null, "text", "text", -1790561697), new s(null, "params", "params", 710516235), new n(null, 2, [new s(null, "_", "_", 1453416199), bq.call(null), new s(null, "ajax-client-uuid", "ajax-client-uuid", -814553580), a.za], null)], null), 
          function(b, e) {
            return function(f) {
              var g = Vd.call(null, f) ? U.call(null, kf, f) : f;
              f = S.call(null, g, new s(null, "?content", "?content", 1697782054));
              g = S.call(null, g, new s(null, "?error", "?error", 1070752222));
              if (t(g)) {
                if (B.call(null, g, new s(null, "timeout", "timeout", -318625318)) || B.call(null, g, new s(null, "abort", "abort", 521193198))) {
                  return d.call(null, 0);
                }
                Pq.call(null, e, new n(null, 1, [new s(null, "open?", "open?", 1238443125), !1], null));
                return b.call(null);
              }
              g = Jq.call(null, a.K, f);
              f = R.call(null, g, 0, null);
              R.call(null, g, 1, null);
              g = Sq.call(null, e, f);
              t(g) || (Rq.call(null, (new s(null, "\x3cserver", "\x3cserver", -2135373537)).a(a.O), f), Pq.call(null, e, new n(null, 1, [new s(null, "open?", "open?", 1238443125), !0], null)));
              return d.call(null, 0);
            };
          }(b, e)));
        };
      }(function() {
        return function() {
          var a = e + 1;
          sq.call(null, "Chsk is closed: will try reconnect (%s).", a);
          return Tq.call(null, gf.call(null, d, a), a);
        };
      }(b), b), g = window.Pace;
      return t(g) ? g.hg(f) : f.call(null);
    };
  })(this).call(null, 0);
  return this;
};
function Xq(a) {
  return new Wq((new s(null, "url", "url", 276297046)).a(a), (new s(null, "chs", "chs", 376886120)).a(a), (new s(null, "timeout-ms", "timeout-ms", 754221406)).a(a), (new s(null, "ajax-client-uuid", "ajax-client-uuid", -814553580)).a(a), (new s(null, "curr-xhr_", "curr-xhr_", -1318773696)).a(a), (new s(null, "state_", "state_", 957667102)).a(a), (new s(null, "packer", "packer", 66077544)).a(a), null, Dd.call(null, a, new s(null, "url", "url", 276297046), new s(null, "chs", "chs", 376886120), new s(null, 
  "timeout-ms", "timeout-ms", 754221406), new s(null, "ajax-client-uuid", "ajax-client-uuid", -814553580), new s(null, "curr-xhr_", "curr-xhr_", -1318773696), new s(null, "state_", "state_", 957667102), new s(null, "packer", "packer", 66077544)));
}
function Yq(a, b, c) {
  var d = Vd.call(null, b) ? U.call(null, kf, b) : b;
  b = S.call(null, d, new s(null, "pathname", "pathname", -1420497528));
  var e = S.call(null, d, new s(null, "host", "host", -1558485167)), d = S.call(null, d, new s(null, "protocol", "protocol", 652470118));
  return "" + x.a(ob.call(null, c) ? d : B.call(null, d, "https:") ? "wss:" : "ws:") + "//" + x.a(e) + x.a(t(a) ? a : b);
}
var Zq = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    var e = R.call(null, b, 0, null), f = Vd.call(null, e) ? U.call(null, kf, e) : e, g = S.call(null, f, new s(null, "packer", "packer", 66077544), new s(null, "edn", "edn", 1317840885)), l = S.call(null, f, new s(null, "chsk-url-fn", "chsk-url-fn", 1968894294), Yq), m = S.call(null, f, new s(null, "lp-timeout-ms", "lp-timeout-ms", -1451963133), 25E3), p = S.call(null, f, new s(null, "ws-kalive-ms", "ws-kalive-ms", 1442179968), 25E3), q = S.call(null, f, new s(null, "recv-buf-or-n", "recv-buf-or-n", 
    1363950355), bm.call(null, 2048)), r = S.call(null, f, new s(null, "type", "type", 1174270348), new s(null, "auto", "auto", -566279492)), u = R.call(null, b, 1, null);
    if (!t((new Ch(null, new n(null, 3, [new s(null, "ws", "ws", 86841443), null, new s(null, "ajax", "ajax", 814345549), null, new s(null, "auto", "auto", -566279492), null], null), null)).call(null, r))) {
      throw Error("Assert failed: " + x.a(nf.call(null, V(new Ch(null, new n(null, 3, [new s(null, "ws", "ws", 86841443), null, new s(null, "ajax", "ajax", 814345549), null, new s(null, "auto", "auto", -566279492), null], null), null), new D(null, "type", "type", -1480165421, null)))));
    }
    null != u && sq.call(null, "`make-channel-socket!` fn signature CHANGED with Sente v0.10.0.");
    Zd.call(null, f, new s(null, "lp-timeout", "lp-timeout", 1149461302)) && sq.call(null, ":lp-timeout opt has CHANGED; please use :lp-timout-ms.");
    var y = Kn.call(null, g), z = uq.call(null), C = new n(null, 3, [new s(null, "state", "state", -1988618099), cm.call(null, bm.call(null, 1)), new s(null, "internal", "internal", -854870097), cm.call(null, bm.call(null, 10)), new s(null, "\x3cserver", "\x3cserver", -2135373537), cm.call(null, q)], null), G = lf.call(null, !1), J = function(a, b, c, d) {
      return function(a) {
        var b;
        b = (b = ob.call(null, (new s(null, "open?", "open?", 1238443125)).a(a))) ? b : N.call(null, d);
        if (t(b)) {
          return a;
        }
        mf.call(null, d, !0);
        return T.call(null, a, new s(null, "first-open?", "first-open?", 396686530), !0);
      };
    }(y, z, C, G, b, e, f, f, g, l, m, p, q, r, u), Q = mm.call(null, new X(null, 3, 5, Y, [(new s(null, "internal", "internal", -854870097)).a(C), om.call(null, function(a, b, c, d, e) {
      return function(a) {
        return new X(null, 2, 5, Y, [new s("chsk", "state", "chsk/state", -1991397620), e.call(null, a)], null);
      };
    }(y, z, C, G, J, b, e, f, f, g, l, m, p, q, r, u), (new s(null, "state", "state", -1988618099)).a(C)), om.call(null, function() {
      return function(a) {
        return new X(null, 2, 5, Y, [new s("chsk", "recv", "chsk/recv", 561097091), a], null);
      };
    }(y, z, C, G, J, b, e, f, f, g, l, m, p, q, r, u), (new s(null, "\x3cserver", "\x3cserver", -2135373537)).a(C))], null)), W = function() {
      var b;
      b = (b = Ye.call(null, r, new s(null, "ajax", "ajax", 814345549))) ? Kq.call(null, Vq.call(null, Cd([new s(null, "kalive-ms", "kalive-ms", 210734021), new s(null, "nattempt_", "nattempt_", 1980196552), new s(null, "packer", "packer", 66077544), new s(null, "chs", "chs", 376886120), new s(null, "socket_", "socket_", -361048908), new s(null, "url", "url", 276297046), new s(null, "kalive-due?_", "kalive-due?_", 39438072), new s(null, "cbs-waiting_", "cbs-waiting_", -1519029061), new s(null, "kalive-timer_", 
      "kalive-timer_", 1558413149), new s(null, "state_", "state_", 957667102)], [p, lf.call(null, 0), y, C, lf.call(null, null), l.call(null, a, z, new s(null, "ws", "ws", 86841443)), lf.call(null, !0), lf.call(null, new X(null, 2, 5, Y, [null, Ag], null)), lf.call(null, null), lf.call(null, new n(null, 3, [new s(null, "type", "type", 1174270348), new s(null, "ws", "ws", 86841443), new s(null, "open?", "open?", 1238443125), !1, new s(null, "destroyed?", "destroyed?", 1049634064), !1], null))]))) : 
      b;
      return t(b) ? b : (b = Ye.call(null, r, new s(null, "ws", "ws", 86841443))) ? (b = lq.call(null), Kq.call(null, Xq.call(null, new n(null, 7, [new s(null, "url", "url", 276297046), l.call(null, a, z, ob.call(null, new s(null, "ws", "ws", 86841443))), new s(null, "chs", "chs", 376886120), C, new s(null, "packer", "packer", 66077544), y, new s(null, "timeout-ms", "timeout-ms", 754221406), m, new s(null, "ajax-client-uuid", "ajax-client-uuid", -814553580), b, new s(null, "curr-xhr_", "curr-xhr_", 
      -1318773696), lf.call(null, null), new s(null, "state_", "state_", 957667102), lf.call(null, new n(null, 3, [new s(null, "type", "type", 1174270348), new s(null, "ajax", "ajax", 814345549), new s(null, "open?", "open?", 1238443125), !1, new s(null, "destroyed?", "destroyed?", 1049634064), !1], null))], null)))) : b;
    }(), Z = gf.call(null, Mq, W), e = om.call(null, function(a, b, c, d, e, f, g, l) {
      return function(a) {
        a = Bq.call(null, a);
        var b = R.call(null, a, 0, null), c = R.call(null, a, 1, null);
        return new n(null, 6, [new s(null, "ch-recv", "ch-recv", -990916861), f, new s(null, "send-fn", "send-fn", 351002041), l, new s(null, "state", "state", -1988618099), (new s(null, "state_", "state_", 957667102)).a(g), new s(null, "event", "event", 301435442), a, new s(null, "id", "id", -1388402092), b, new s(null, "?data", "?data", -9471433), c], null);
      };
    }(y, z, C, G, J, Q, W, Z, b, e, f, f, g, l, m, p, q, r, u), Q);
    return t(W) ? new n(null, 4, [new s(null, "chsk", "chsk", -863703081), W, new s(null, "ch-recv", "ch-recv", -990916861), e, new s(null, "send-fn", "send-fn", 351002041), Z, new s(null, "state", "state", -1988618099), (new s(null, "state_", "state_", 957667102)).a(W)], null) : null;
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}(), $q = function() {
  function a(a, d, e) {
    var f = null;
    2 < arguments.length && (f = M(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, d, f);
  }
  function b(a, b, e) {
    var f = R.call(null, e, 0, null), g = Vd.call(null, f) ? U.call(null, kf, f) : f, l = S.call(null, g, new s(null, "trace-evs?", "trace-evs?", 1502453512)), m = cm.call(null), p = cm.call(null, 1);
    ql.call(null, function(e, f, g, l, m, p, G) {
      return function() {
        var J = function() {
          return function(a) {
            return function() {
              function b(c) {
                for (;;) {
                  var d;
                  a: {
                    try {
                      for (;;) {
                        var e = a.call(null, c);
                        if (!xe.call(null, e, new s(null, "recur", "recur", -437573268))) {
                          d = e;
                          break a;
                        }
                      }
                    } catch (f) {
                      if (f instanceof Object) {
                        c[5] = f;
                        Ql.call(null, c);
                        d = new s(null, "recur", "recur", -437573268);
                        break a;
                      }
                      throw f;
                    }
                    d = void 0;
                  }
                  if (!xe.call(null, d, new s(null, "recur", "recur", -437573268))) {
                    return d;
                  }
                }
              }
              function c() {
                var a = [null, null, null, null, null, null, null, null, null, null, null, null, null, null];
                a[0] = d;
                a[1] = 1;
                return a;
              }
              var d = null, d = function(a) {
                switch(arguments.length) {
                  case 0:
                    return c.call(this);
                  case 1:
                    return b.call(this, a);
                }
                throw Error("Invalid arity: " + arguments.length);
              };
              d.Z = c;
              d.a = b;
              return d;
            }();
          }(function(e, f, g, l, m, p, q) {
            return function(e) {
              var g = e[1];
              if (7 === g) {
                var l = e[2], g = R.call(null, l, 0, null), l = R.call(null, l, 1, null), l = xe.call(null, l, f);
                e[7] = g;
                e[1] = t(l) ? 8 : 9;
                return new s(null, "recur", "recur", -437573268);
              }
              return 20 === g ? (g = e[8], g = tq.call(null, "Bad event: %s", g), e[2] = g, e[1] = 22, new s(null, "recur", "recur", -437573268)) : 1 === g || 24 === g ? (e[2] = null, e[1] = 2, new s(null, "recur", "recur", -437573268)) : 4 === g ? (g = xe.call(null, new s("taoensso.sente", "stop", "taoensso.sente/stop", -1361782571), e[2]), e[1] = t(g) ? 23 : 24, new s(null, "recur", "recur", -437573268)) : 15 === g ? (g = e[8], l = e[2], g = tq.call(null, "Chsk router handling error: %s", g), e[9] = 
              l, e[2] = g, Ql.call(null, e), new s(null, "recur", "recur", -437573268)) : 21 === g ? (l = e[10], g = b.call(null, l), e[2] = g, e[1] = 22, new s(null, "recur", "recur", -437573268)) : 13 === g ? (l = e[2], g = S.call(null, l, new s(null, "event", "event", 301435442)), e[8] = g, e[10] = l, e[2] = null, e[1] = 16, new s(null, "recur", "recur", -437573268)) : 22 === g ? (e[11] = e[2], e[2] = null, Ql.call(null, e), new s(null, "recur", "recur", -437573268)) : 6 === g ? (Pl.call(null, 
              e, 5, new s(null, "default", "default", -1987822328), null, 4), g = new X(null, 2, 5, Y, [a, f], null), Ll.call(null, e, 7, g)) : 25 === g ? (g = e[2], e[2] = g, e[1] = 3, new s(null, "recur", "recur", -437573268)) : 17 === g ? (g = e[8], g = qq.call(null, "Pre-handler event: %s", g), e[2] = g, e[1] = 19, new s(null, "recur", "recur", -437573268)) : 3 === g ? (g = e[2], Ml.call(null, e, g)) : 12 === g ? (g = e[7], e[2] = g, e[1] = 13, new s(null, "recur", "recur", -437573268)) : 2 === 
              g ? (e[2] = null, e[1] = 6, new s(null, "recur", "recur", -437573268)) : 23 === g ? (e[2] = null, e[1] = 25, new s(null, "recur", "recur", -437573268)) : 19 === g ? (l = e[10], g = e[2], l = !Eq.call(null, l), e[12] = g, e[1] = l ? 20 : 21, new s(null, "recur", "recur", -437573268)) : 11 === g ? (g = e[7], g = U.call(null, kf, g), e[2] = g, e[1] = 13, new s(null, "recur", "recur", -437573268)) : 9 === g ? (g = e[7], g = Vd.call(null, g), e[1] = g ? 11 : 12, new s(null, "recur", "recur", 
              -437573268)) : 5 === g ? (l = e[2], g = tq.call(null, "Chsk router channel error!"), e[13] = l, e[2] = g, Ql.call(null, e), new s(null, "recur", "recur", -437573268)) : 14 === g ? (g = e[2], e[2] = g, e[1] = 10, new s(null, "recur", "recur", -437573268)) : 16 === g ? (Pl.call(null, e, 15, new s(null, "default", "default", -1987822328), null, 14), e[1] = t(q) ? 17 : 18, new s(null, "recur", "recur", -437573268)) : 10 === g ? (g = e[2], e[2] = g, Ql.call(null, e), new s(null, "recur", 
              "recur", -437573268)) : 18 === g ? (e[2] = null, e[1] = 19, new s(null, "recur", "recur", -437573268)) : 8 === g ? (e[2] = new s("taoensso.sente", "stop", "taoensso.sente/stop", -1361782571), e[1] = 10, new s(null, "recur", "recur", -437573268)) : null;
            };
          }(e, f, g, l, m, p, G), e, f, g, l, m, p, G);
        }(), Q = function() {
          var a = J.call(null);
          a[6] = e;
          return a;
        }();
        return Hl.call(null, Q);
      };
    }(p, m, e, f, g, g, l));
    return function(a) {
      return function() {
        return gm.call(null, a);
      };
    }(m, e, f, g, g, l);
  }
  a.k = 2;
  a.e = function(a) {
    var d = F(a);
    a = L(a);
    var e = F(a);
    a = H(a);
    return b(d, e, a);
  };
  a.c = b;
  return a;
}();
function ar(a, b, c) {
  return Vd.call(null, c) ? b.call(null, Mh.call(null, qf.call(null, a, c))) : Ld.call(null, c) ? b.call(null, zf.call(null, zd.call(null, c), qf.call(null, a, c))) : b.call(null, c);
}
var cr = function br(b, c) {
  return ar.call(null, gf.call(null, br, b), b, c);
};
function dr(a) {
  return cr.call(null, function(a) {
    return function(c) {
      return Od.call(null, c) ? zf.call(null, Ag, qf.call(null, a, c)) : c;
    };
  }(function(a) {
    var c = R.call(null, a, 0, null);
    a = R.call(null, a, 1, null);
    return "string" === typeof c ? new X(null, 2, 5, Y, [Ae.call(null, c), a], null) : new X(null, 2, 5, Y, [c, a], null);
  }), a);
}
;var er;
function fr(a, b) {
  if (a ? a.pd : a) {
    return a.pd(a, b);
  }
  var c;
  c = fr[k(null == a ? null : a)];
  if (!c && (c = fr._, !c)) {
    throw w.call(null, "IRouteMatches.route-matches", a);
  }
  return c.call(null, a, b);
}
function gr(a) {
  if (a ? a.qd : a) {
    return a.qd(a);
  }
  var b;
  b = gr[k(null == a ? null : a)];
  if (!b && (b = gr._, !b)) {
    throw w.call(null, "IRouteValue.route-value", a);
  }
  return b.call(null, a);
}
var hr = function() {
  function a(a, b) {
    if (a ? a.Ye : a) {
      return a.Ye(a, b);
    }
    var c;
    c = hr[k(null == a ? null : a)];
    if (!c && (c = hr._, !c)) {
      throw w.call(null, "IRenderRoute.render-route", a);
    }
    return c.call(null, a, b);
  }
  function b(a) {
    if (a ? a.Xe : a) {
      return a.Xe();
    }
    var b;
    b = hr[k(null == a ? null : a)];
    if (!b && (b = hr._, !b)) {
      throw w.call(null, "IRenderRoute.render-route", a);
    }
    return b.call(null, a);
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}(), ir = lf.call(null, new n(null, 1, [new s(null, "prefix", "prefix", -265908465), ""], null));
function jr(a) {
  a = Nd.call(null, a) ? a : new X(null, 1, 5, Y, [a], null);
  return Df.call(null, N.call(null, ir), a);
}
var kr = encodeURIComponent, lr = function() {
  var a = lf.call(null, Ag), b = lf.call(null, Ag), c = lf.call(null, Ag), d = lf.call(null, Ag), e = S.call(null, Ag, new s(null, "hierarchy", "hierarchy", -1053470341), ri.call(null));
  return new Di("encode-pair", function() {
    return function(a) {
      R.call(null, a, 0, null);
      a = R.call(null, a, 1, null);
      if (Nd.call(null, a) || Md.call(null, a)) {
        a = new s("secretary.core", "sequential", "secretary.core/sequential", -347187207);
      } else {
        var b = Od.call(null, a);
        a = (b ? b : a ? a.g & 67108864 || a.ag || (a.g ? 0 : v.call(null, lc, a)) : v.call(null, lc, a)) ? new s("secretary.core", "map", "secretary.core/map", -31086646) : null;
      }
      return a;
    };
  }(a, b, c, d, e), new s(null, "default", "default", -1987822328), e, a, b, c, d);
}(), mr = function() {
  function a(a, b) {
    return "" + x.a(ze.call(null, a)) + "[" + x.a(b) + "]";
  }
  function b(a) {
    return "" + x.a(ze.call(null, a)) + "[]";
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.j = a;
  return c;
}();
Bi.call(null, lr, new s("secretary.core", "sequential", "secretary.core/sequential", -347187207), function(a) {
  var b = R.call(null, a, 0, null), c = R.call(null, a, 1, null);
  return Ki.call(null, "\x26", hf.call(null, function(a, b) {
    return function(a, c) {
      var d = Ld.call(null, c) ? new X(null, 2, 5, Y, [mr.call(null, b, a), c], null) : new X(null, 2, 5, Y, [mr.call(null, b), c], null);
      return lr.call(null, d);
    };
  }(a, b, c), c));
});
Bi.call(null, lr, new s("secretary.core", "map", "secretary.core/map", -31086646), function(a) {
  var b = R.call(null, a, 0, null), c = R.call(null, a, 1, null);
  a = qf.call(null, function(a, b) {
    return function(a) {
      var c = R.call(null, a, 0, null);
      a = R.call(null, a, 1, null);
      return lr.call(null, new X(null, 2, 5, Y, [mr.call(null, b, ze.call(null, c)), a], null));
    };
  }(a, b, c), c);
  return Ki.call(null, "\x26", a);
});
Bi.call(null, lr, new s(null, "default", "default", -1987822328), function(a) {
  var b = R.call(null, a, 0, null);
  a = R.call(null, a, 1, null);
  return "" + x.a(ze.call(null, b)) + "\x3d" + x.a(kr.call(null, "" + x.a(a)));
});
function nr(a) {
  return Ki.call(null, "\x26", qf.call(null, lr, a));
}
function or(a) {
  return Ki.call(null, "/", qf.call(null, kr, Pi.call(null, a, /\//)));
}
var pr = decodeURIComponent;
function qr(a) {
  var b = /\[([^\]]*)\]*/;
  a = Rh.call(null, b, a);
  return qf.call(null, function() {
    return function(a) {
      R.call(null, a, 0, null);
      a = R.call(null, a, 1, null);
      return Kd.call(null, a) ? 0 : t(Oh.call(null, /\d+/, a)) ? parseInt(a) : a;
    };
  }(b, a), a);
}
function rr(a) {
  var b = Oh.call(null, /([^\[\]]+)((?:\[[^\]]*\])*)?/, a);
  R.call(null, b, 0, null);
  a = R.call(null, b, 1, null);
  b = R.call(null, b, 2, null);
  b = t(b) ? qr.call(null, b) : null;
  return O.call(null, a, b);
}
function sr(a, b, c) {
  function d(a) {
    return hf.call(null, function(b) {
      return rf.call(null, b + 1, a);
    }, a);
  }
  var e = d.call(null, b);
  a = ub.call(null, function() {
    return function(a, b) {
      return "number" !== typeof wd.call(null, b) || Pd.call(null, Df.call(null, a, Hh.call(null, b))) ? a : Ff.call(null, a, Hh.call(null, b), xd);
    };
  }(d, e), a, e);
  return 0 === wd.call(null, b) ? Gf.call(null, a, Hh.call(null, b), yd, c) : Ff.call(null, a, b, c);
}
function tr(a) {
  a = Pi.call(null, a, /&/);
  a = ub.call(null, function() {
    return function(a, c) {
      var d = Pi.call(null, c, /=/, 2), e = R.call(null, d, 0, null), d = R.call(null, d, 1, null);
      return sr.call(null, a, rr.call(null, e), pr.call(null, d));
    };
  }(a), Ag, a);
  return dr.call(null, a);
}
function ur(a, b) {
  var c = Oh.call(null, a, b);
  return t(c) ? Nd.call(null, c) ? c : new X(null, 2, 5, Y, [c, c], null) : null;
}
var vr = Gh.call(null, "\\.*+|?()[]{}$^");
function wr(a) {
  return ub.call(null, function(a, c) {
    return t(vr.call(null, c)) ? "" + x.a(a) + "\\" + x.a(c) : "" + x.a(a) + x.a(c);
  }, "", a);
}
function xr(a, b) {
  return af.call(null, function(b) {
    var d = R.call(null, b, 0, null);
    b = R.call(null, b, 1, null);
    var e = Ph.call(null, d, a);
    return t(e) ? (d = R.call(null, e, 0, null), e = R.call(null, e, 1, null), new X(null, 2, 5, Y, [me.call(null, a, P.call(null, d)), b.call(null, e)], null)) : null;
  }, b);
}
function yr(a, b) {
  for (var c = a, d = "", e = xd;;) {
    if (E.call(null, c)) {
      var f = xr.call(null, c, b), c = R.call(null, f, 0, null), g = R.call(null, f, 1, null), f = R.call(null, g, 0, null), g = R.call(null, g, 1, null), d = "" + x.a(d) + x.a(f), e = yd.call(null, e, g)
    } else {
      return new X(null, 2, 5, Y, [Sh.call(null, "^" + x.a(d) + "$"), yf.call(null, nb, e)], null);
    }
  }
}
var Ar = function zr(b) {
  var c = new X(null, 3, 5, Y, [new X(null, 2, 5, Y, [/^\*([^\s.:*\/]*)/, function(b) {
    b = E.call(null, b) ? Ae.call(null, b) : new s(null, "*", "*", -1294732318);
    return new X(null, 2, 5, Y, ["(.*?)", b], null);
  }], null), new X(null, 2, 5, Y, [/^\:([^\s.:*\/]+)/, function(b) {
    b = Ae.call(null, b);
    return new X(null, 2, 5, Y, ["([^,;?/]+)", b], null);
  }], null), new X(null, 2, 5, Y, [/^([^:*]+)/, function(b) {
    b = wr.call(null, b);
    return new X(null, 1, 5, Y, [b], null);
  }], null)], null), d = yr.call(null, b, c), e = R.call(null, d, 0, null), f = R.call(null, d, 1, null);
  "undefined" === typeof er && (er = function(b, c, d, e, f, r, u) {
    this.Oe = b;
    this.Pe = c;
    this.Qf = d;
    this.kf = e;
    this.Ne = f;
    this.zf = r;
    this.Df = u;
    this.o = 0;
    this.g = 393216;
  }, er.bb = !0, er.ab = "secretary.core/t12531", er.ub = function() {
    return function(b, c) {
      return oc.call(null, c, "secretary.core/t12531");
    };
  }(c, d, e, f), er.prototype.pd = function() {
    return function(b, c) {
      var d = ur.call(null, this.Pe, c);
      return t(d) ? (R.call(null, d, 0, null), d = le.call(null, d, 1), Bh.call(null, cg, Ag, Cf.call(null, 2, vf.call(null, this.Oe, qf.call(null, pr, d))))) : null;
    };
  }(c, d, e, f), er.prototype.qd = function() {
    return function() {
      return this.Ne;
    };
  }(c, d, e, f), er.prototype.B = function() {
    return function() {
      return this.Df;
    };
  }(c, d, e, f), er.prototype.D = function() {
    return function(b, c) {
      return new er(this.Oe, this.Pe, this.Qf, this.kf, this.Ne, this.zf, c);
    };
  }(c, d, e, f));
  return new er(f, e, d, c, b, zr, null);
}, Br = lf.call(null, xd);
function Cr(a, b) {
  var c = "string" === typeof a ? Ar.call(null, a) : a;
  return of.call(null, Br, yd, new X(null, 2, 5, Y, [c, b], null));
}
function Dr(a) {
  return af.call(null, function(b) {
    var c = R.call(null, b, 0, null);
    b = R.call(null, b, 1, null);
    var d = fr.call(null, c, a);
    return t(d) ? new n(null, 3, [new s(null, "action", "action", -811238024), b, new s(null, "params", "params", 710516235), d, new s(null, "route", "route", 329891309), c], null) : null;
  }, N.call(null, Br));
}
function Er() {
  return "" + x.a(jr.call(null, new X(null, 1, 5, Y, [new s(null, "prefix", "prefix", -265908465)], null)));
}
function Fr(a) {
  return Ji.call(null, a, Sh.call(null, "^" + x.a(Er.call(null))), "");
}
function Gr(a) {
  return B.call(null, "/", F.call(null, a)) ? a : "/" + x.a(a);
}
function Hr(a) {
  var b = Pi.call(null, Fr.call(null, a), /\?/);
  a = R.call(null, b, 0, null);
  var b = R.call(null, b, 1, null), c = Gr.call(null, a);
  a = t(b) ? new n(null, 1, [new s(null, "query-params", "query-params", 900640534), tr.call(null, b)], null) : null;
  b = Dr.call(null, c);
  c = Vd.call(null, b) ? U.call(null, kf, b) : b;
  b = S.call(null, c, new s(null, "params", "params", 710516235));
  c = S.call(null, c, new s(null, "action", "action", -811238024));
  c = t(c) ? c : be;
  a = Ah.call(null, b, a);
  return c.call(null, a);
}
function Ir(a, b) {
  return ub.call(null, function(b, d) {
    var e = R.call(null, d, 0, null), f = R.call(null, d, 1, null), g = S.call(null, a, e);
    return t(Oh.call(null, f, g)) ? b : T.call(null, b, e, new X(null, 2, 5, Y, [g, f], null));
  }, Ag, Cf.call(null, 2, b));
}
function Jr(a, b) {
  return Kd.call(null, Ir.call(null, a, b));
}
X.prototype.pd = function(a, b) {
  R.call(null, a, 0, null);
  le.call(null, a, 1);
  var c = R.call(null, this, 0, null), d = le.call(null, this, 1), c = fr.call(null, Ar.call(null, c), b);
  return Jr.call(null, c, d) ? c : null;
};
RegExp.prototype.pd = function(a, b) {
  var c = ur.call(null, this, b);
  return t(c) ? (R.call(null, c, 0, null), c = le.call(null, c, 1), bg.call(null, c)) : null;
};
fr.string = function(a, b) {
  return fr.call(null, Ar.call(null, a), b);
};
X.prototype.qd = function(a) {
  R.call(null, a, 0, null);
  le.call(null, a, 1);
  a = R.call(null, this, 0, null);
  var b = le.call(null, this, 1);
  return bg.call(null, O.call(null, gr.call(null, a), b));
};
RegExp.prototype.qd = function() {
  return this;
};
gr.string = function(a) {
  return gr.call(null, Ar.call(null, a));
};
X.prototype.Xe = function() {
  return hr.call(null, this, Ag);
};
X.prototype.Ye = function(a, b) {
  R.call(null, a, 0, null);
  le.call(null, a, 1);
  var c = R.call(null, this, 0, null), d = le.call(null, this, 1), d = Ir.call(null, b, d);
  if (Kd.call(null, d)) {
    return hr.call(null, c, b);
  }
  throw Hi.call(null, "Could not build route: invalid params", d);
};
hr.string = function(a) {
  return hr.call(null, a, Ag);
};
hr.string = function(a, b) {
  var c = Vd.call(null, b) ? U.call(null, kf, b) : b, d = S.call(null, c, new s(null, "query-params", "query-params", 900640534)), e = lf.call(null, c), c = a.replace(RegExp(":[^\\s.:*/]+|\\*[^\\s.:*/]*", "g"), function(a, b, c, d, e) {
    return function(a) {
      var b = Ae.call(null, B.call(null, a, "*") ? a : me.call(null, a, 1)), c = S.call(null, N.call(null, e), b);
      Nd.call(null, c) ? (of.call(null, e, T, b, L.call(null, c)), a = or.call(null, F.call(null, c))) : a = t(c) ? or.call(null, c) : a;
      return a;
    };
  }(b, c, c, d, e)), c = "" + x.a(jr.call(null, new X(null, 1, 5, Y, [new s(null, "prefix", "prefix", -265908465)], null))) + x.a(c), d = t(d) ? nr.call(null, d) : d;
  return t(d) ? "" + x.a(c) + "?" + x.a(d) : c;
};
var Kr = Nk.call(null, Ag), Lr = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e);
  }
  function b(a, b) {
    var e = R.call(null, b, 0, null);
    return S.call(null, N.call(null, Kr), a, e);
  }
  a.k = 1;
  a.e = function(a) {
    var d = F(a);
    a = H(a);
    return b(d, a);
  };
  a.c = b;
  return a;
}();
function Mr(a, b) {
  return of.call(null, Kr, T, a, b);
}
;var Nr = Zq.call(null, "/chsk", new n(null, 1, [new s(null, "type", "type", 1174270348), new s(null, "auto", "auto", -566279492)], null)), Or = Vd.call(null, Nr) ? U.call(null, kf, Nr) : Nr;
S.call(null, Or, new s(null, "state", "state", -1988618099));
var Pr = S.call(null, Or, new s(null, "send-fn", "send-fn", 351002041));
S.call(null, Or, new s(null, "ch-recv", "ch-recv", -990916861));
S.call(null, Or, new s(null, "chsk", "chsk", -863703081));
var Qr = Nk.call(null, oi.call(null, window.users)), Rr = Nk.call(null, vh.call(null));
function Sr(a, b, c) {
  return of.call(null, Rr, T, a, new n(null, 3, [new s(null, "id", "id", -1388402092), a, new s(null, "name", "name", 1843675177), b, new s(null, "users", "users", -713552705), c], null));
}
for (var Tr = E.call(null, oi.call(null, window.topics)), Ur = null, Vr = 0, Wr = 0;;) {
  if (Wr < Vr) {
    var Xr = A.call(null, Ur, Wr);
    Sr.call(null, S.call(null, Xr, "id"), S.call(null, Xr, "name"), S.call(null, Xr, "users"));
    Wr += 1;
  } else {
    var Yr = E.call(null, Tr);
    if (Yr) {
      var Zr = Yr;
      if (Qd.call(null, Zr)) {
        var $r = Le.call(null, Zr), as = Me.call(null, Zr), bs = $r, cs = P.call(null, $r), Tr = as, Ur = bs, Vr = cs
      } else {
        var ds = F.call(null, Zr);
        Sr.call(null, S.call(null, ds, "id"), S.call(null, ds, "name"), S.call(null, ds, "users"));
        Tr = L.call(null, Zr);
        Ur = null;
        Vr = 0;
      }
      Wr = 0;
    } else {
      break;
    }
  }
}
function es(a) {
  return Hr.call(null, "/topics/" + x.a(a));
}
function fs(a) {
  of.call(null, Rr, Dd, a);
  return Pr.call(null, new X(null, 2, 5, Y, [new s("topic", "leave", "topic/leave", 843811202), a], null));
}
var gs = sd.call(null, function() {
  return function(a) {
    return function() {
      if (t(N.call(null, a))) {
        var b = Nk.call(null, ""), c = function(a, b) {
          return function() {
            mf.call(null, a, "");
            return mf.call(null, b, !1);
          };
        }(b, a), d = function(a, b) {
          return function() {
            var c = Qi.call(null, "" + x.a(N.call(null, a)));
            Kd.call(null, c) || Pr.call(null, new X(null, 2, 5, Y, [new s("topic", "create", "topic/create", -1311537255), c], null));
            return b.call(null);
          };
        }(b, c, a);
        return new X(null, 2, 5, Y, [new s(null, "input", "input", 556931961), new n(null, 4, [new s(null, "type", "type", 1174270348), "text", new s(null, "on-change", "on-change", -732046149), function(a) {
          return function(b) {
            return mf.call(null, a, b.target.value);
          };
        }(b, c, d, a), new s(null, "on-blur", "on-blur", 814300747), c, new s(null, "on-key-up", "on-key-up", 884441808), function(a, b, c) {
          return function(a) {
            switch(a.which) {
              case 13:
                return c.call(null);
              case 27:
                return b.call(null);
              default:
                return null;
            }
          };
        }(b, c, d, a)], null)], null);
      }
      return new X(null, 4, 5, Y, [new s(null, "li", "li", 723558921), new n(null, 1, [new s(null, "on-click", "on-click", 1632826543), function(a) {
        return function() {
          return mf.call(null, a, !0);
        };
      }(a)], null), new X(null, 1, 5, Y, [new s(null, "i.fa-li.fa.fa-plus-square-o", "i.fa-li.fa.fa-plus-square-o", 1423236083)], null), "Start a new topic"], null);
    };
  }(Nk.call(null, !1));
}, new n(null, 1, [new s(null, "component-did-update", "component-did-update", -1468549173), function(a) {
  return Lk.call(null, a).focus();
}], null));
function hs() {
  var a = Lr.call(null, new s(null, "current-topic-id", "current-topic-id", -740928864));
  return new X(null, 5, 5, Y, [new s(null, "div#topics", "div#topics", -1963481584), new X(null, 3, 5, Y, [new s(null, "h2", "h2", -372662728), new X(null, 1, 5, Y, [new s(null, "i.fa.fa-users", "i.fa.fa-users", -337244888)], null), "Topics"], null), new X(null, 4, 5, Y, [new s(null, "ul.fa-ul", "ul.fa-ul", 591795787), Mh.call(null, function() {
    return function(a) {
      return function d(e) {
        return new Be(null, function(a) {
          return function() {
            for (;;) {
              var b = E.call(null, e);
              if (b) {
                var l = b;
                if (Qd.call(null, l)) {
                  var m = Le.call(null, l), p = P.call(null, m), q = Fe.call(null, p);
                  return function() {
                    for (var d = 0;;) {
                      if (d < p) {
                        var e = A.call(null, m, d);
                        Je.call(null, q, new X(null, 5, 5, Y, [new s(null, "li", "li", 723558921), new n(null, 3, [new s(null, "class", "class", -2030961996), B.call(null, (new s(null, "id", "id", -1388402092)).a(e), a) ? "current" : null, new s(null, "key", "key", -1516042587), (new s(null, "id", "id", -1388402092)).a(e), new s(null, "on-click", "on-click", 1632826543), function(a, b) {
                          return function() {
                            return es.call(null, (new s(null, "id", "id", -1388402092)).a(b));
                          };
                        }(d, e, m, p, q, l, b, a)], null), new X(null, 1, 5, Y, [new s(null, "i.fa-li.fa.fa-check-square-o", "i.fa-li.fa.fa-check-square-o", 1622375460)], null), (new s(null, "name", "name", 1843675177)).a(e), new X(null, 2, 5, Y, [new s(null, "i.fa.fa-times-circle", "i.fa.fa-times-circle", -11066977), new n(null, 1, [new s(null, "on-click", "on-click", 1632826543), function(a, b) {
                          return function() {
                            return fs.call(null, (new s(null, "id", "id", -1388402092)).a(b));
                          };
                        }(d, e, m, p, q, l, b, a)], null)], null)], null));
                        d += 1;
                      } else {
                        return!0;
                      }
                    }
                  }() ? Ie.call(null, Ke.call(null, q), d.call(null, Me.call(null, l))) : Ie.call(null, Ke.call(null, q), null);
                }
                var r = F.call(null, l);
                return O.call(null, new X(null, 5, 5, Y, [new s(null, "li", "li", 723558921), new n(null, 3, [new s(null, "class", "class", -2030961996), B.call(null, (new s(null, "id", "id", -1388402092)).a(r), a) ? "current" : null, new s(null, "key", "key", -1516042587), (new s(null, "id", "id", -1388402092)).a(r), new s(null, "on-click", "on-click", 1632826543), function(a) {
                  return function() {
                    return es.call(null, (new s(null, "id", "id", -1388402092)).a(a));
                  };
                }(r, l, b, a)], null), new X(null, 1, 5, Y, [new s(null, "i.fa-li.fa.fa-check-square-o", "i.fa-li.fa.fa-check-square-o", 1622375460)], null), (new s(null, "name", "name", 1843675177)).a(r), new X(null, 2, 5, Y, [new s(null, "i.fa.fa-times-circle", "i.fa.fa-times-circle", -11066977), new n(null, 1, [new s(null, "on-click", "on-click", 1632826543), function(a) {
                  return function() {
                    return fs.call(null, (new s(null, "id", "id", -1388402092)).a(a));
                  };
                }(r, l, b, a)], null)], null)], null), d.call(null, H.call(null, l)));
              }
              return null;
            }
          };
        }(a), null, null);
      };
    }(a).call(null, zh.call(null, N.call(null, Rr)));
  }()), new X(null, 3, 5, Y, [new s(null, "li", "li", 723558921), new X(null, 1, 5, Y, [new s(null, "i.fa-li.fa.fa-search", "i.fa-li.fa.fa-search", -1076535420)], null), new X(null, 2, 5, Y, [new s(null, "span", "span", 1394872991), "More topics"], null)], null), new X(null, 1, 5, Y, [gs], null)], null), new X(null, 3, 5, Y, [new s(null, "h2", "h2", -372662728), new X(null, 1, 5, Y, [new s(null, "i.fa.fa-user", "i.fa.fa-user", 382004105)], null), "People"], null), new X(null, 2, 5, Y, [new s(null, 
  "ul.fa-ul", "ul.fa-ul", 591795787), function() {
    return function(a) {
      return function d(e) {
        return new Be(null, function() {
          return function() {
            for (;;) {
              var a = E.call(null, e);
              if (a) {
                if (Qd.call(null, a)) {
                  var b = Le.call(null, a), l = P.call(null, b), m = Fe.call(null, l);
                  a: {
                    for (var p = 0;;) {
                      if (p < l) {
                        var q = A.call(null, b, p);
                        Je.call(null, m, new X(null, 4, 5, Y, [new s(null, "li", "li", 723558921), new n(null, 1, [new s(null, "key", "key", -1516042587), q], null), new X(null, 1, 5, Y, [new s(null, "i.fa-li.fa.fa-square-o", "i.fa-li.fa.fa-square-o", 638149487)], null), new X(null, 2, 5, Y, [new s(null, "span", "span", 1394872991), q.call(null, "name")], null)], null));
                        p += 1;
                      } else {
                        b = !0;
                        break a;
                      }
                    }
                    b = void 0;
                  }
                  return b ? Ie.call(null, Ke.call(null, m), d.call(null, Me.call(null, a))) : Ie.call(null, Ke.call(null, m), null);
                }
                m = F.call(null, a);
                return O.call(null, new X(null, 4, 5, Y, [new s(null, "li", "li", 723558921), new n(null, 1, [new s(null, "key", "key", -1516042587), m], null), new X(null, 1, 5, Y, [new s(null, "i.fa-li.fa.fa-square-o", "i.fa-li.fa.fa-square-o", 638149487)], null), new X(null, 2, 5, Y, [new s(null, "span", "span", 1394872991), m.call(null, "name")], null)], null), d.call(null, H.call(null, a)));
              }
              return null;
            }
          };
        }(a), null, null);
      };
    }(a).call(null, N.call(null, Qr));
  }()], null)], null);
}
sd.call(null, hs, new n(null, 1, [new s(null, "component-did-update", "component-did-update", -1468549173), function() {
  return 4;
}], null));
function is(a) {
  var b = S.call(null, N.call(null, Rr), a);
  return new X(null, 4, 5, Y, [new s(null, "div#header", "div#header", -546369869), new X(null, 1, 5, Y, [new s(null, "i.fa.fa-users", "i.fa.fa-users", -337244888)], null), (new s(null, "name", "name", 1843675177)).a(b), new X(null, 4, 5, Y, [new s(null, "span#topic-users", "span#topic-users", 2123004794), "" + x.a(P.call(null, (new s(null, "users", "users", -713552705)).a(b))), new X(null, 1, 5, Y, [new s(null, "i.fa.fa-user", "i.fa.fa-user", 382004105)], null), new X(null, 2, 5, Y, [new s(null, 
  "ul#topic-users", "ul#topic-users", -39671443), function() {
    return function(a) {
      return function e(b) {
        return new Be(null, function() {
          return function() {
            for (;;) {
              var a = E.call(null, b);
              if (a) {
                if (Qd.call(null, a)) {
                  var c = Le.call(null, a), m = P.call(null, c), p = Fe.call(null, m);
                  a: {
                    for (var q = 0;;) {
                      if (q < m) {
                        var r = A.call(null, c, q);
                        Je.call(null, p, new X(null, 3, 5, Y, [new s(null, "li", "li", 723558921), new n(null, 1, [new s(null, "key", "key", -1516042587), r], null), r], null));
                        q += 1;
                      } else {
                        c = !0;
                        break a;
                      }
                    }
                    c = void 0;
                  }
                  return c ? Ie.call(null, Ke.call(null, p), e.call(null, Me.call(null, a))) : Ie.call(null, Ke.call(null, p), null);
                }
                p = F.call(null, a);
                return O.call(null, new X(null, 3, 5, Y, [new s(null, "li", "li", 723558921), new n(null, 1, [new s(null, "key", "key", -1516042587), p], null), p], null), e.call(null, H.call(null, a)));
              }
              return null;
            }
          };
        }(a), null, null);
      };
    }(b).call(null, (new s(null, "users", "users", -713552705)).a(b));
  }()], null)], null)], null);
}
;var js = Zq.call(null, "/chsk", new n(null, 1, [new s(null, "type", "type", 1174270348), new s(null, "auto", "auto", -566279492)], null)), ks = Vd.call(null, js) ? U.call(null, kf, js) : js;
S.call(null, ks, new s(null, "state", "state", -1988618099));
var ls = S.call(null, ks, new s(null, "send-fn", "send-fn", 351002041)), ms = S.call(null, ks, new s(null, "ch-recv", "ch-recv", -990916861));
S.call(null, ks, new s(null, "chsk", "chsk", -863703081));
var ns = Nk.call(null, vh.call(null));
function os(a, b, c, d, e) {
  return of.call(null, ns, T, a, new n(null, 5, [new s(null, "id", "id", -1388402092), a, new s(null, "author", "author", 2111686192), b, new s(null, "text", "text", -1790561697), c, new s(null, "time", "time", 1385887882), d, new s(null, "topic-id", "topic-id", -1334453706), e], null));
}
function ps(a) {
  return of.call(null, ns, Dd, a);
}
for (var qs = E.call(null, oi.call(null, window.messages)), rs = null, ss = 0, ts = 0;;) {
  if (ts < ss) {
    var us = A.call(null, rs, ts), vs = new n(null, 4, [new s(null, "id", "id", -1388402092), S.call(null, us, "author_id"), new s(null, "name", "name", 1843675177), S.call(null, us, "author"), new s(null, "email", "email", 1415816706), S.call(null, us, "email"), new s(null, "hash", "hash", -13781596), S.call(null, us, "hash")], null), ws = S.call(null, us, "id");
    os.call(null, ws, vs, S.call(null, us, "text"), S.call(null, us, "created_at"), S.call(null, us, "topic_id"));
    ts += 1;
  } else {
    var xs = E.call(null, qs);
    if (xs) {
      var ys = xs;
      if (Qd.call(null, ys)) {
        var zs = Le.call(null, ys), As = Me.call(null, ys), Bs = zs, Cs = P.call(null, zs), qs = As, rs = Bs, ss = Cs
      } else {
        var Ds = F.call(null, ys), Es = new n(null, 4, [new s(null, "id", "id", -1388402092), S.call(null, Ds, "author_id"), new s(null, "name", "name", 1843675177), S.call(null, Ds, "author"), new s(null, "email", "email", 1415816706), S.call(null, Ds, "email"), new s(null, "hash", "hash", -13781596), S.call(null, Ds, "hash")], null), Fs = S.call(null, Ds, "id");
        os.call(null, Fs, Es, S.call(null, Ds, "text"), S.call(null, Ds, "created_at"), S.call(null, Ds, "topic_id"));
        qs = L.call(null, ys);
        rs = null;
        ss = 0;
      }
      ts = 0;
    } else {
      break;
    }
  }
}
var Gs, Hs = lf.call(null, Ag), Is = lf.call(null, Ag), Js = lf.call(null, Ag), Ks = lf.call(null, Ag), Ls = S.call(null, Ag, new s(null, "hierarchy", "hierarchy", -1053470341), ri.call(null));
Gs = new Di("event-msg-handler", new s(null, "id", "id", -1388402092), new s(null, "default", "default", -1987822328), Ls, Hs, Is, Js, Ks);
function Ms(a) {
  a = Vd.call(null, a) ? U.call(null, kf, a) : a;
  var b = S.call(null, a, new s(null, "event", "event", 301435442));
  S.call(null, a, new s(null, "?data", "?data", -9471433));
  R.call(null, b, 0, null);
  b = R.call(null, b, 1, null);
  nq.call(null, "Data: %s", b);
  return Gs.call(null, a);
}
Bi.call(null, Gs, new s(null, "default", "default", -1987822328), function(a) {
  a = Vd.call(null, a) ? U.call(null, kf, a) : a;
  a = S.call(null, a, new s(null, "event", "event", 301435442));
  return nq.call(null, "Unhandled event: %s", a);
});
Bi.call(null, Gs, new s("chsk", "state", "chsk/state", -1991397620), function(a) {
  a = Vd.call(null, a) ? U.call(null, kf, a) : a;
  a = S.call(null, a, new s(null, "?data", "?data", -9471433));
  return B.call(null, a, new n(null, 1, [new s(null, "first-open?", "first-open?", 396686530), !0], null)) ? nq.call(null, "Channel socket state change: %s", a) : null;
});
Bi.call(null, Gs, new s("chsk", "recv", "chsk/recv", 561097091), function(a) {
  a = Vd.call(null, a) ? U.call(null, kf, a) : a;
  var b = S.call(null, a, new s(null, "event", "event", 301435442));
  S.call(null, a, new s(null, "?data", "?data", -9471433));
  R.call(null, b, 0, null);
  a = R.call(null, b, 1, null);
  b = F.call(null, a);
  a = wd.call(null, a);
  if (B.call(null, b, new s("topic", "broadcast", "topic/broadcast", 1595774233))) {
    var b = (new s(null, "id", "id", -1388402092)).a(a), c = (new s(null, "message", "message", -406056002)).a(a), d = (new s(null, "uid", "uid", -1447769400)).a(a), e = (new s(null, "topic-id", "topic-id", -1334453706)).a(a);
    a = new n(null, 4, [new s(null, "name", "name", 1843675177), (new s(null, "name", "name", 1843675177)).a(a), new s(null, "email", "email", 1415816706), (new s(null, "email", "email", 1415816706)).a(a), new s(null, "hash", "hash", -13781596), (new s(null, "hash", "hash", -13781596)).a(a), new s(null, "id", "id", -1388402092), d], null);
    return os.call(null, b, a, c, moment(), e);
  }
  return B.call(null, b, new s("topic", "new", "topic/new", -2111599339)) ? (b = (new s(null, "id", "id", -1388402092)).a(a), c = (new s(null, "name", "name", 1843675177)).a(a), a = (new s(null, "users", "users", -713552705)).a(a), Sr.call(null, b, c, a)) : B.call(null, b, new s("message", "delete", "message/delete", -974271757)) ? ps.call(null, a) : null;
});
function Ns(a) {
  return ls.call(null, new X(null, 2, 5, Y, [new s("message", "send", "message/send", -2110392641), new n(null, 2, [new s(null, "text", "text", -1790561697), a, new s(null, "topic", "topic", -1960480691), Lr.call(null, new s(null, "current-topic-id", "current-topic-id", -740928864))], null)], null));
}
function Os(a) {
  return ls.call(null, new X(null, 2, 5, Y, [new s("message", "delete", "message/delete", -974271757), a], null));
}
var Ps = sd.call(null, function(a) {
  var b = Vd.call(null, a) ? U.call(null, kf, a) : a, c = S.call(null, b, new s(null, "on-stop", "on-stop", 1520114515)), d = S.call(null, b, new s(null, "on-save", "on-save", 1618176266)), e = S.call(null, b, new s(null, "text", "text", -1790561697)), f = Nk.call(null, e), g = function(a, b, c, d) {
    return function() {
      mf.call(null, a, "");
      return t(d) ? d.call(null) : null;
    };
  }(f, a, b, c, d, e);
  return function(a, b, c, d, e, f, g, z) {
    return function() {
      return new X(null, 2, 5, Y, [new s(null, "input", "input", 556931961), new n(null, 6, [new s(null, "id", "id", -1388402092), "message-input", new s(null, "placeholder", "placeholder", -104873083), "Message", new s(null, "type", "type", 1174270348), "text", new s(null, "value", "value", 305978217), N.call(null, a), new s(null, "on-key-up", "on-key-up", 884441808), function(a, b, c) {
        return function(a) {
          switch(a.which) {
            case 13:
              return c.call(null);
            case 27:
              return b.call(null);
            default:
              return null;
          }
        };
      }(a, b, c, d, e, f, g, z), new s(null, "on-change", "on-change", -732046149), function(a) {
        return function(b) {
          return mf.call(null, a, b.target.value);
        };
      }(a, b, c, d, e, f, g, z)], null)], null);
    };
  }(f, g, function(a, b, c, d, e, f) {
    return function() {
      var c = Qi.call(null, "" + x.a(N.call(null, a)));
      Kd.call(null, c) || f.call(null, c);
      return b.call(null);
    };
  }(f, g, a, b, c, d, e), a, b, c, d, e);
}, new n(null, 1, [new s(null, "component-did-mount", "component-did-mount", -1126910518), function(a) {
  return Lk.call(null, a).focus();
}], null)), Qs = sd.call(null, function(a) {
  var b = Vd.call(null, a) ? U.call(null, kf, a) : a, c = S.call(null, b, new s(null, "topic-id", "topic-id", -1334453706));
  return function(a, b, c) {
    return function() {
      return new X(null, 2, 5, Y, [new s(null, "ul#message-list", "ul#message-list", 1758327781), function() {
        var g = function(a, b, c) {
          return function r(d) {
            return new Be(null, function(a, b, c) {
              return function() {
                for (;;) {
                  var e = E.call(null, d);
                  if (e) {
                    var f = e;
                    if (Qd.call(null, f)) {
                      var g = Le.call(null, f), l = P.call(null, g), m = Fe.call(null, l);
                      return function() {
                        for (var d = 0;;) {
                          if (d < l) {
                            var p = A.call(null, g, d);
                            Je.call(null, m, function() {
                              var r = (new s(null, "id", "id", -1388402092)).a(p), u = (new s(null, "author", "author", 2111686192)).a(p);
                              return new X(null, 4, 5, Y, [new s(null, "div.message", "div.message", 197515312), new n(null, 1, [new s(null, "key", "key", -1516042587), r], null), new X(null, 3, 5, Y, [new s(null, "a.avatar", "a.avatar", 1853546955), new n(null, 1, [new s(null, "href", "href", -793805698), (new s(null, "name", "name", 1843675177)).a(u)], null), new X(null, 2, 5, Y, [new s(null, "img", "img", 1442687358), new n(null, 1, [new s(null, "src", "src", -1651076051), "//www.gravatar.com/avatar/" + 
                              x.a((new s(null, "hash", "hash", -13781596)).a(u)) + "?s\x3d30"], null)], null)], null), new X(null, 5, 5, Y, [new s(null, "div.message-body", "div.message-body", 566197895), new X(null, 3, 5, Y, [new s(null, "a.username", "a.username", -294692231), new n(null, 1, [new s(null, "href", "href", -793805698), (new s(null, "name", "name", 1843675177)).a(u)], null), (new s(null, "name", "name", 1843675177)).a(u)], null), new X(null, 2, 5, Y, [new s(null, "span.time", "span.time", 
                              -193970810), moment.utc((new s(null, "time", "time", 1385887882)).a(p)).local().format("h:mm a")], null), B.call(null, oi.call(null, window.user).call(null, "id"), (new s(null, "id", "id", -1388402092)).a(u)) ? new X(null, 2, 5, Y, [new s(null, "i.fa.fa-times", "i.fa.fa-times", 923360983), new n(null, 1, [new s(null, "on-click", "on-click", 1632826543), function(a, b) {
                                return function() {
                                  return Os.call(null, b);
                                };
                              }(d, r, u, p, g, l, m, f, e, a, b, c)], null)], null) : null, new X(null, 2, 5, Y, [new s(null, "span.text", "span.text", -1380952257), new n(null, 1, [new s(null, "dangerouslySetInnerHTML", "dangerouslySetInnerHTML", -554971138), new n(null, 1, [new s(null, "__html", "__html", 674048345), (new s(null, "text", "text", -1790561697)).a(p)], null)], null)], null)], null)], null);
                            }());
                            d += 1;
                          } else {
                            return!0;
                          }
                        }
                      }() ? Ie.call(null, Ke.call(null, m), r.call(null, Me.call(null, f))) : Ie.call(null, Ke.call(null, m), null);
                    }
                    var p = F.call(null, f);
                    return O.call(null, function() {
                      var d = (new s(null, "id", "id", -1388402092)).a(p), g = (new s(null, "author", "author", 2111686192)).a(p);
                      return new X(null, 4, 5, Y, [new s(null, "div.message", "div.message", 197515312), new n(null, 1, [new s(null, "key", "key", -1516042587), d], null), new X(null, 3, 5, Y, [new s(null, "a.avatar", "a.avatar", 1853546955), new n(null, 1, [new s(null, "href", "href", -793805698), (new s(null, "name", "name", 1843675177)).a(g)], null), new X(null, 2, 5, Y, [new s(null, "img", "img", 1442687358), new n(null, 1, [new s(null, "src", "src", -1651076051), "//www.gravatar.com/avatar/" + 
                      x.a((new s(null, "hash", "hash", -13781596)).a(g)) + "?s\x3d30"], null)], null)], null), new X(null, 5, 5, Y, [new s(null, "div.message-body", "div.message-body", 566197895), new X(null, 3, 5, Y, [new s(null, "a.username", "a.username", -294692231), new n(null, 1, [new s(null, "href", "href", -793805698), (new s(null, "name", "name", 1843675177)).a(g)], null), (new s(null, "name", "name", 1843675177)).a(g)], null), new X(null, 2, 5, Y, [new s(null, "span.time", "span.time", 
                      -193970810), moment.utc((new s(null, "time", "time", 1385887882)).a(p)).local().format("h:mm a")], null), B.call(null, oi.call(null, window.user).call(null, "id"), (new s(null, "id", "id", -1388402092)).a(g)) ? new X(null, 2, 5, Y, [new s(null, "i.fa.fa-times", "i.fa.fa-times", 923360983), new n(null, 1, [new s(null, "on-click", "on-click", 1632826543), function(a) {
                        return function() {
                          return Os.call(null, a);
                        };
                      }(d, g, p, f, e, a, b, c)], null)], null) : null, new X(null, 2, 5, Y, [new s(null, "span.text", "span.text", -1380952257), new n(null, 1, [new s(null, "dangerouslySetInnerHTML", "dangerouslySetInnerHTML", -554971138), new n(null, 1, [new s(null, "__html", "__html", 674048345), (new s(null, "text", "text", -1790561697)).a(p)], null)], null)], null)], null)], null);
                    }(), r.call(null, H.call(null, f)));
                  }
                  return null;
                }
              };
            }(a, b, c), null, null);
          };
        }(a, b, c);
        return g.call(null, xf.call(null, function(a, b, c, d) {
          return function(a) {
            return B.call(null, (new s(null, "topic-id", "topic-id", -1334453706)).a(a), d);
          };
        }(g, a, b, c), zh.call(null, N.call(null, ns))));
      }()], null);
    };
  }(a, b, c);
}, function() {
  var a = Nk.call(null, !1);
  return Ah.call(null, new n(null, 1, [new s(null, "component-will-update", "component-will-update", 335247566), function(a) {
    return function(c) {
      c = Lk.call(null, c);
      return c.offsetHeight + c.scrollTop === c.scrollHeight ? mf.call(null, a, !0) : null;
    };
  }(a)], null), new n(null, 1, [new s(null, "component-did-update", "component-did-update", -1468549173), function(a) {
    return function(c) {
      return t(N.call(null, a)) ? (c = Lk.call(null, c), c.scrollTop = c.scrollHeight, mf.call(null, a, !1)) : null;
    };
  }(a)], null), new n(null, 1, [new s(null, "component-did-mount", "component-did-mount", -1126910518), function(a) {
    return function(c) {
      c = Lk.call(null, c);
      c.scrollTop = c.scrollHeight;
      return mf.call(null, a, !1);
    };
  }(a)], null));
}());
function Rs(a) {
  return function() {
    return function() {
      var b = oi.call(null, window.user);
      return new X(null, 3, 5, Y, [new s(null, "div#app-container", "div#app-container", 885069730), new X(null, 3, 5, Y, [new s(null, "div#nav", "div#nav", 1538049517), new X(null, 4, 5, Y, [new s(null, "div#usermenu", "div#usermenu", -1448102456), new X(null, 2, 5, Y, [new s(null, "img#userimage", "img#userimage", -1628825411), new n(null, 1, [new s(null, "src", "src", -1651076051), "//www.gravatar.com/avatar/" + x.a(b.call(null, "hash")) + "?s\x3d100"], null)], null), new X(null, 2, 5, Y, [new s(null, 
      "span#username", "span#username", 1476994130), b.call(null, "name")], null), new X(null, 3, 5, Y, [new s(null, "a", "a", -2123407586), new n(null, 1, [new s(null, "href", "href", -793805698), "/logout"], null), new X(null, 1, 5, Y, [new s(null, "i.fa.fa-sign-out", "i.fa.fa-sign-out", 1449928134)], null)], null)], null), hs.call(null)], null), new X(null, 4, 5, Y, [new s(null, "div#content", "div#content", -850771127), is.call(null, a), new X(null, 2, 5, Y, [new s(null, "div#body", "div#body", 
      250558726), new X(null, 2, 5, Y, [Qs, new n(null, 1, [new s(null, "topic-id", "topic-id", -1334453706), a], null)], null)], null), new X(null, 2, 5, Y, [new s(null, "div#footer", "div#footer", 861595109), new X(null, 3, 5, Y, [new s(null, "div", "div", 1057191632), new n(null, 1, [new s(null, "id", "id", -1388402092), "message"], null), new X(null, 2, 5, Y, [Ps, new n(null, 1, [new s(null, "on-save", "on-save", 1618176266), Ns], null)], null)], null)], null)], null)], null);
    };
  }(Nk.call(null, new s(null, "all", "all", 892129742)));
}
Cr.call(null, "/", function(a) {
  return Od.call(null, a) ? (Vd.call(null, a) && U.call(null, kf, a), Mr.call(null, new s(null, "current-topic-id", "current-topic-id", -740928864), 2)) : Pd.call(null, a) ? Mr.call(null, new s(null, "current-topic-id", "current-topic-id", -740928864), 2) : null;
});
Cr.call(null, "/topics/:id", function(a) {
  return Od.call(null, a) ? (a = Vd.call(null, a) ? U.call(null, kf, a) : a, a = S.call(null, a, new s(null, "id", "id", -1388402092)), Mr.call(null, new s(null, "current-topic-id", "current-topic-id", -740928864), parseInt(a))) : Pd.call(null, a) ? (a = R.call(null, a, 0, null), Mr.call(null, new s(null, "current-topic-id", "current-topic-id", -740928864), parseInt(a))) : null;
});
function Ss() {
  return new X(null, 1, 5, Y, [Rs.call(null, Lr.call(null, new s(null, "current-topic-id", "current-topic-id", -740928864)))], null);
}
function Ts() {
  Mr.call(null, new s(null, "current-topic-id", "current-topic-id", -740928864), 2);
  $q.call(null, ms, Ms);
  return Kk.call(null, new X(null, 1, 5, Y, [Ss], null), document.getElementById("app"));
}
var Us = ["room", "core", "init_BANG_"], Vs = ca;
Us[0] in Vs || !Vs.execScript || Vs.execScript("var " + Us[0]);
for (var Ws;Us.length && (Ws = Us.shift());) {
  Us.length || void 0 === Ts ? Vs = Vs[Ws] ? Vs[Ws] : Vs[Ws] = {} : Vs[Ws] = Ts;
}
Ts.call(null);

})();
