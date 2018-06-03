'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require('../../../../../');

var _2 = _interopRequireDefault(_);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _formalistDataObjectRenderer = require('formalist-data-object-renderer');

var _formalistDataObjectRenderer2 = _interopRequireDefault(_formalistDataObjectRenderer);

var _atomic = require('./atomic.mcss');

var _atomic2 = _interopRequireDefault(_atomic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dataObjectRenderer = (0, _formalistDataObjectRenderer2.default)();
var configuredTemplate = void 0;

var AtomicBlock = function (_React$Component) {
  _inherits(AtomicBlock, _React$Component);

  function AtomicBlock(props) {
    _classCallCheck(this, AtomicBlock);

    var _this = _possibleConstructorReturn(this, (AtomicBlock.__proto__ || Object.getPrototypeOf(AtomicBlock)).call(this, props));

    _this.onEditorChange = function (editorState) {
      _this.checkEditorSelection(editorState);
    };

    _this.onEditorFocus = function (editorState) {
      _this.checkEditorSelection(editorState);
    };

    _this.checkEditorSelection = function (editorState) {
      var editorEmitter = _this.props.blockProps.editorEmitter;

      var selection = editorState.getSelection();
      var isSelected = false;
      // Is a collapsed selection at the start?
      if (selection.isCollapsed() && selection.getAnchorOffset() === 0) {
        var block = _this.props.block;

        var blockKey = block.getKey();
        var selectedBlockKey = selection.getFocusKey();
        if (blockKey === selectedBlockKey) {
          isSelected = true;
          editorEmitter.emit('atomic:selected', blockKey);
        }
      }
      _this.setState({
        isSelected: isSelected
      });
    };

    _this.onFocus = function (e) {
      _this.setState({
        isSelected: false
      });
      _this.setReadOnly(true);
    };

    _this.onBlur = function (e) {
      _this.setReadOnly(false);
    };

    _this.remove = function () {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var allowUndo = opts.allowUndo;

      allowUndo = !!allowUndo;
      var _this$props = _this.props;
      var block = _this$props.block;
      var blockProps = _this$props.blockProps;

      _this.setReadOnly(false);
      blockProps.remove(block.getKey(), { allowUndo: allowUndo });
    };

    _this.setReadOnly = function (readOnly) {
      var blockProps = _this.props.blockProps;

      blockProps.setReadOnly(readOnly);
    };

    _this.state = {
      isSelected: false
    };
    return _this;
  }

  /**
   * Enable parent to pass context
   */

  _createClass(AtomicBlock, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var block = this.props.block;
      // Resolve the entity, atomic blocks _must_ have one

      this.entityKey = block.getEntityAt(0);
      // Remove if there's no key
      if (this.entityKey == null) {
        this.remove({ allowUndo: false });
        return;
      }
      this.entity = _draftJs.Entity.get(this.entityKey);
      // Extract the entity
      var entityData = this.entity.getData();
      // If the entity is the wrong _type_, we should remove the block too
      // our editor expects every atomic block to have an attached entity
      // of "formalist" type
      if (this.entity.getType() !== "formalist") {
        this.remove({ allowUndo: false });
        return;
      }

      document.addEventListener('mouseup', this.handleOutsideMouseClick);
      document.addEventListener('touchstart', this.handleOutsideMouseClick);

      // Memoize the configured template the first time this runs
      // We need to invoke this at execution time so that the circular
      // dependencies are properly resolved.
      configuredTemplate = configuredTemplate || (0, _2.default)(null, { global: this.context.globalConfig });

      // Create the formalist form with config
      this.form = configuredTemplate(entityData.form);

      this.form.on('change', function (getState) {
        var formTemplate = getState();
        _draftJs.Entity.replaceData(_this2.entityKey, {
          name: entityData.name,
          label: entityData.label,
          form: formTemplate,
          data: dataObjectRenderer(formTemplate)
        });
        // Let the RTE parent component know that the entity data has changed
        editorEmitter.emit('atomic:change');
        _this2.forceUpdate();
      });

      // Subscribe to the editorEmitter’s onChange event
      var editorEmitter = this.props.blockProps.editorEmitter;

      editorEmitter.on('change', this.onEditorChange);
      editorEmitter.on('focus', this.checkEditorSelection);
      editorEmitter.on('blur', this.checkEditorSelection);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var editorEmitter = this.props.blockProps.editorEmitter;

      editorEmitter.off('change', this.onEditorChange);
      editorEmitter.off('focus', this.checkEditorSelection);
      editorEmitter.off('blur', this.checkEditorSelection);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      // Don't render if we have no entity
      if (!this.entity || this.entity.getType() !== "formalist") {
        return null;
      }
      var isSelected = this.state.isSelected;

      var _entity$getData = this.entity.getData();

      var label = _entity$getData.label;


      var containerClassNames = (0, _classnames2.default)(_atomic2.default.container, _defineProperty({}, '' + _atomic2.default.containerSelected, isSelected));

      // TODO Assess whether to remove this binding
      /* eslint-disable react/jsx-no-bind */
      return _react2.default.createElement(
        'div',
        { 'data-atomic': true, className: _atomic2.default.wrapper, 'data-debug-block-key': this.props.block.getKey() },
        _react2.default.createElement(
          'div',
          { className: _atomic2.default.caret },
          _react2.default.createElement('br', null)
        ),
        _react2.default.createElement(
          'div',
          {
            ref: function ref(r) {
              _this3._blockContainer = r;
            },
            className: containerClassNames,
            onClick: this.onFocus,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            contentEditable: false },
          _react2.default.createElement(
            'div',
            { className: _atomic2.default.header },
            _react2.default.createElement(
              'h3',
              { className: _atomic2.default.label },
              label
            ),
            _react2.default.createElement(
              'div',
              { className: _atomic2.default.toolbar },
              _react2.default.createElement(
                'button',
                { className: _atomic2.default.remove, onClick: function onClick(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    _this3.remove();
                  } },
                _react2.default.createElement(
                  'span',
                  { className: _atomic2.default.removeText },
                  'Remove'
                ),
                _react2.default.createElement(
                  'div',
                  { className: _atomic2.default.removeX },
                  '\xD7'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _atomic2.default.content },
            this.form.render()
          )
        )
      );
      /* eslint-enable react/jsx-no-bind */
    }
  }]);

  return AtomicBlock;
}(_react2.default.Component);

AtomicBlock.propTypes = {
  block: _propTypes2.default.object.isRequired,
  blockProps: _propTypes2.default.shape({
    editorEmitter: _propTypes2.default.object.isRequired,
    remove: _propTypes2.default.func.isRequired,
    setReadOnly: _propTypes2.default.func.isRequired
  })
};
AtomicBlock.contextTypes = {
  globalConfig: _propTypes2.default.object
};
exports.default = AtomicBlock;