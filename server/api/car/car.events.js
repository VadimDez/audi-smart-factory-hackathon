/**
 * Car model events
 */

'use strict';

import {EventEmitter} from 'events';
var Car = require('../../sqldb').Car;
var CarEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CarEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Car.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CarEvents.emit(event + ':' + doc._id, doc);
    CarEvents.emit(event, doc);
    done(null);
  }
}

export default CarEvents;
