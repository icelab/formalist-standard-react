import React from 'react'
import uid from 'uid'
import classNames from 'classnames'
import styles from './select.mcss'

/**
 * Select
 *
 * States:
 * - focus
 * - error
 *
 * Sizes:
 * - small
 * - normal*
 * - large
 *
 */
const Select = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    error: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    size: React.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge'])
  },

  getDefaultProps () {
    return {
      error: false,
      size: 'normal',
      placeholder: 'Select an option',
      valueSeed: uid(10)
    }
  },

  getInitialState () {
    return {
      focus: false
    }
  },

  onFocus (e) {
    this.setState({focus: true})
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  },

  onBlur (e) {
    this.setState({focus: false})
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  },

  render () {
    let labelClassNames = classNames(
      styles.label,
      {
        [`${styles.labelError}`]: this.props.error,
        [`${styles.labelFocus}`]: this.state.focus
      }
    )
    let inputClassNames = classNames(
      this.props.className,
      styles.select,
      {
        [`${styles.error}`]: this.props.error,
        [`${styles.focus}`]: this.state.focus
      },
      `${styles[this.props.size]}`
    )

    // Generate a placeholder with a fake value seed to trick our <select>
    // into appearing to show it correctly
    let placeholder = <option value={this.props.valueSeed} hidden={true} disabled={true}>{this.props.placeholder}</option>
    let defaultValue = this.props.defaultValue || this.props.valueSeed

    return (
      <label className={labelClassNames}>
        <select
          {...this.props}
          defaultValue={defaultValue}
          className={inputClassNames}
          onBlur={this.onBlur}
          onFocus={this.onFocus}>
          {placeholder}
          {this.props.children}
        </select>
      </label>
    )
  }
})

export default Select
