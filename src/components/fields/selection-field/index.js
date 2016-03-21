import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import { List } from 'immutable'
import fuzzy from 'fuzzy'
import extractComponent from '../../../utils/extract-component'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Popout from '../../ui/popout'

// Import styles
import styles from './selection-field.mcss'

/**
 * Default component for representing a "selected/selection" item
 * @param  {Object} props Taking the shape of:
 *
 * {
 *   option: { label: 'foo'}
 *  }
 *
 * I.e., expecting the option to have a `label` key with a string value.
 *
 * @return {ReactElement}
 */
const SelectDefault = ({option}) => (
  <div>
    {option.label}
  </div>
)

/**
 * Selection field
 *
 * Handles a singular select of a set of pre-supplied options.
 *
 */
const SelectionField = React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    name: React.PropTypes.string,
    config: React.PropTypes.object,
    attributes: React.PropTypes.shape({
      label: React.PropTypes.string,
      hint: React.PropTypes.string,
      placeholder: React.PropTypes.string,
      options: React.PropTypes.array,
      inline: React.PropTypes.bool,
      select_button_text: React.PropTypes.string,
      selected_component: React.PropTypes.string,
      selection_component: React.PropTypes.string
    }),
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },

  /**
   * Set the default props
   * @return {Object} Props with defaults
   */
  getDefaultProps () {
    return {
      placeholder: 'Make a selection',
      select_button_text: 'Select'
    }
  },

  /**
   * Default state, blank search
   * @return {Object}
   */
  getInitialState () {
    return {
      search: null
    }
  },

  /**
   * onChange handler
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange (value) {
    this.props.actions.edit(
      (val) => {
        return value
      }
    )
  },

  /**
   * On choose click, open selector
   * @return {Null}
   */
  onChooseClick (e) {
    e.preventDefault()
    this.toggleSelector()
  },

  /**
   * When selected item is removed
   * @return {Null}
   */
  onRemoveClick (e) {
    e.preventDefault()
    this.onChange(null)
  },

  /**
   * When a selection is made, trigger change and close the selector
   * @return {Null}
   */
  onSelection (id) {
    this.closeSelector()
    this.onChange(id)
  },

  /**
   * Open the selector popout
   * @return {Null}
   */
  openSelector () {
    this.refs.selector.openPopout()
  },

  /**
   * Close the selector popout
   * @return {Null}
   */
  closeSelector () {
    this.refs.selector.closePopout()
  },

  /**
   * On popout close, reset the search
   * @return {Null}
   */
  onPopoutClose () {
    this.setState({
      search: null
    })
  },

  /**
   * Toggle the selector popout
   * @return {Null}
   */
  toggleSelector () {
    this.refs.selector.togglePopout()
  },

  /**
   * On popout open, focus the search input
   * @return {Null}
   */
  onPopoutOpen () {
    this.refs.search.focus()
  },

  /**
   * Fired when search input is `change`d.
   * Set this.state.search to the value of the input
   * @param  {Event} e Keyboard event
   * @return {Null}
   */
  onSearchChange (e) {
    const search = e.target.value
    this.setState({
      search: search
    })
  },

  render () {
    const { attributes, config, errors, hint, label, name, value } = this.props
    const { search } = this.state
    const { options, placeholder, select_button_text, selected_component, selection_component } = attributes
    const hasErrors = (errors.count() > 0)

    // Set up field classes
    const fieldClassNames = classNames(
      styles.base,
      {
        [`${styles.baseInline}`]: attributes.inline
      }
    )

    // Determine the selection/selected display components
    let Selected = SelectDefault
    let Selection = SelectDefault

    // Extract them from the passed `config.components` if it exists
    if (config.components) {
      if (selected_component) {
        Selected = extractComponent(config.components, selected_component) || Selected
      }
      if (selection_component) {
        Selection = extractComponent(config.components, selection_component) || Selection
      }
    }

    // Determine selected option
    const selectedOption = options.find((option) => (
      option.id === value
    ))

    // Filter options
    let filteredOptions = options
    if (search) {
      filteredOptions = options.filter((option) => {
        const values = Object.keys(option).map((key) => (
          String(option[key])
        ))
        const results = fuzzy.filter(search, values)
        return (results && results.length > 0)
      })
    }

    // Build the set of options
    const selections = filteredOptions.map((option) => (
      <button
        key={option.id}
        className={styles.selectionButton}
        onClick={(e) => {
          e.preventDefault()
          this.onSelection(option.id)
        }}>
        <Selection option={option}/>
      </button>
    ))

    return (
      <div className={fieldClassNames}>
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors}/>
        </div>
        <div className={styles.display}>
          { (selectedOption)
            ? <div className={styles.wrapper}>
              <div className={styles.selected}>
                <Selected option={selectedOption}/>
              </div>
              <button className={styles.remove} onClick={this.onRemoveClick}>
                <span className={styles.removeText}>Remove</span>
                <div className={styles.removeX}>×</div>
              </button>
            </div>
            : <button
                className={styles.wrapper}
                onClick={this.onChooseClick}>
              <div className={styles.selectionPlaceholder}>
                { placeholder }
              </div>
              <Popout ref='selector' placement='left' closeOnEsc onClose={this.onPopoutClose} onOpen={this.onPopoutOpen}>
                <div className={styles.openSelectionsButton}>
                  { select_button_text }
                </div>
                <div className={styles.selections}>
                  <input
                    ref='search'
                    type='search'
                    className={styles.search}
                    placeholder='Type to filter'
                    onChange={this.onSearchChange} />
                  <div className={styles.selectionsList}>
                    { selections.length > 0 ? selections : <p className={styles.noResults}>No matching results</p> }
                  </div>
                </div>
              </Popout>
            </button>
          }
          {(hasErrors) ? <FieldErrors errors={errors}/> : null}
        </div>
      </div>
    )
  }
})

export default SelectionField
