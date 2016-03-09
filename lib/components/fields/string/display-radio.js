'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radioButton = require('../../ui/radio-button');

var _radioButton2 = _interopRequireDefault(_radioButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StringDisplayRadio = _react2.default.createClass({
  displayName: 'StringDisplayRadio',

  propTypes: {
    className: _react2.default.PropTypes.string,
    config: _react2.default.PropTypes.object,
    error: _react2.default.PropTypes.bool,
    name: _react2.default.PropTypes.string.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired,
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
  },

  render: function render() {
    var _props = this.props;
    var config = _props.config;
    var className = _props.className;
    var error = _props.error;
    var onChange = _props.onChange;
    var name = _props.name;
    var value = _props.value;


    var optionValues = config.option_values;
    // Return nothing if we have no values
    if (optionValues && optionValues.count() === 0) {
      return false;
    }

    return _react2.default.createElement(
      'div',
      { className: className },
      optionValues.map(function (option, i) {
        var optionValue = void 0,
            optionLabel = void 0;
        if (_immutable.List.isList(option)) {
          optionValue = option.get(0);
          optionLabel = option.get(1) || optionValue;
        } else {
          optionValue = option;
          optionLabel = option;
        }
        var defaultChecked = value && optionValue === value;
        return _react2.default.createElement(_radioButton2.default, {
          key: i,
          name: name,
          label: optionLabel,
          error: error,
          value: optionValue,
          defaultChecked: defaultChecked,
          onChange: onChange });
      })
    );
  }
});

// Components


exports.default = StringDisplayRadio;