import React from 'react'

/**
 * A common header component for every field. Renders the label and an optional
 * hint.
 */
const FieldHeader = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    hint: React.PropTypes.string
  },

  render() {
    let { label, hint } = this.props
    return (
      <div className="fm-field-header">
        <h3 className="fm-field-header__label">{label}</h3>
        {(hint) ? <span className="fm-field-header__hint">{hint}</span> : null}
      </div>
    )
  }
 })

export default FieldHeader
