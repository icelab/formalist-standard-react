import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Input from '../../ui/input'

// Import styles
import styles from './text-field.mcss'

/**
 * Text field
 */
class TextField extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    name: PropTypes.string,
    config: PropTypes.object,
    attributes: PropTypes.shape({
      label: PropTypes.string,
      hint: PropTypes.string,
      placeholder: PropTypes.string,
      inline: PropTypes.bool,
      code: PropTypes.bool,
      password: PropTypes.bool,
      disabled: PropTypes.bool,
    }),
    hint: PropTypes.string,
    label: PropTypes.string,
    errors: ImmutablePropTypes.list,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  /**
   * Enable parent to pass context
   */

  static contextTypes = {
    globalConfig: PropTypes.object,
  };

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange = (e, value) => {
    this.props.actions.edit(
      (val) => { return value }
    )
  };

  render () {
    let { attributes, errors, hint, label, name, value } = this.props
    let hasErrors = (errors.count() > 0)
    let type = (attributes.password) ? 'password' : 'text'
    let disabled = (attributes.disabled) ? 'disabled' : ''

    // Set up field classes
    let fieldClassNames = classNames(
      styles.base,
      {
        [`${styles.baseInline}`]: attributes.inline,
      }
    )

    // Set up input classes
    let inputClassNames = classNames({
      [`${styles.code}`]: attributes.code,
    })

    return (
      <div className={fieldClassNames}>
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors} />
        </div>
        <div className={styles.display}>
          <Input
            type={type}
            id={name}
            error={hasErrors}
            className={inputClassNames}
            placeholder={attributes.placeholder}
            defaultValue={value}
            disabled={disabled}
            onChange={this.onChange} />
          {(hasErrors) ? <FieldErrors errors={errors} /> : null}
        </div>
      </div>
    )
  }
}

export default TextField
