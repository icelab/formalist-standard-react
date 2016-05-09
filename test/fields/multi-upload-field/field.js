import test from 'tape'
import React from 'react'
import shallowRenderComponent from '../../fixtures/shallow-render.js'

// local module
import Input from '../../../src/components/fields/multi-upload-field'

const props = {
  hint: 'foo',
  label: 'bar',
  name: 'baz',
  attributes: {
    inline: true
  }
}

test('File Upload:', (nest) => {
  nest.test('...is a valid component', (t) => {
    const component = shallowRenderComponent(Input, props)
    const actual = React.isValidElement(component)
    t.ok(actual, 'component is valid')
    t.end()
  })

  nest.test('...children has children', (t) => {
    // <FieldHeader/>
    // null (XHRErrorMessages)
    // null (invalidFiles)
    // null (previewFiles)
    // <Dropzone/>
    const component = shallowRenderComponent(Input, props)
    const actual = component.props.children.props.children.length
    const expected = 5
    t.equal(actual, expected)
    t.end()
  })
})