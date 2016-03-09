import React from 'react'

const ManySet = React.createClass({

  propTypes: {
    children: React.PropTypes.array
  },

  render () {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
})

const Many = ({name, children, errors}) => {
  return (
    <div className='fm-many'>
      <h3 className='fm-many__name'>{ name.replace(/_/, ' ') }</h3>
      <div className='fm-many__controls'>
        <button>Add new { name.replace(/_/, ' ') }</button>
      </div>
      { children.map((setChildren) => (
        <ManySet>
          { setChildren }
        </ManySet>
      )) }
    </div>
  )
}

Many.propTypes = {
  children: React.PropTypes.array,
  errors: React.PropTypes.array,
  name: React.PropTypes.string
}

export default Many
export let ManyFactory = React.createFactory(Many)
