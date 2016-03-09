import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import styles from './section.mcss'

const Section = React.createClass({

  propTypes: {
    children: ImmutablePropTypes.list,
    config: React.PropTypes.object,
    hashCode: React.PropTypes.number.isRequired,
    name: React.PropTypes.string
  },

  shouldComponentUpdate (nextProps) {
    // Use the path hash-code to determine whether or not to rerender this
    // section. This should take account of any change to the AST.
    // It will not account for changes to the overall form definition (but they
    // should not change after runtime anyway)
    return (this.props.hashCode !== nextProps.hashCode)
  },

  render () {
    let { children, config, name } = this.props
    let label = config.label || name.replace(/_/, ' ')

    return (
      <section className={ styles.base }>
        <h2 className={ styles.name }>{label}</h2>
        <div className={ children }>
          { children }
        </div>
      </section>
    )
  }
})

export default Section
export let SectionFactory = React.createFactory(Section)
