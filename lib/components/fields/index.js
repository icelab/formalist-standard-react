'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.availableDisplayVariants = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import array from './array'
// import assets from './assets'
// import content from './content'


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _bool = require('./bool');

var _bool2 = _interopRequireDefault(_bool);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _dateTime = require('./date-time');

var _dateTime2 = _interopRequireDefault(_dateTime);

var _decimal = require('./decimal');

var _decimal2 = _interopRequireDefault(_decimal);

var _float = require('./float');

var _float2 = _interopRequireDefault(_float);

var _int = require('./int');

var _int2 = _interopRequireDefault(_int);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wrap a React class in with the common Container class
 *
 * @param  {Function} field A React class
 * @return {Function} A function
 */
function wrapField(field) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var displayVariants = options.displayVariants;

  return function (fieldProps) {
    return _react2.default.createElement(_container2.default, _extends({ field: field, displayVariants: displayVariants }, fieldProps));
  };
}

var availableDisplayVariants = exports.availableDisplayVariants = {
  bool: _bool.displayVariants,
  date: _date.displayVariants,
  dateTime: _dateTime.displayVariants,
  decimal: _decimal.displayVariants,
  float: _float.displayVariants,
  int: _int.displayVariants,
  string: _string.displayVariants
};

/**
 * Wrapped fields for each type
 * @param {Object} options Options specific to the fields.
 * @type {Object}
 */
function fields() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return {
    bool: wrapField(_bool2.default, options.bool),
    date_time: wrapField(_dateTime2.default, options.dateTime),
    date: wrapField(_date2.default, options.date),
    decimal: wrapField(_decimal2.default, options.decimal),
    float: wrapField(_float2.default, options.float),
    int: wrapField(_int2.default, options.int),
    string: wrapField(_string2.default, options.string)
  };
}

exports.default = fields;