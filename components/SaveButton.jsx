import React from 'react'
import _     from 'lodash'

export default class SaveButton extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div>
        <input type='button' value='Save Page'/>
      </div>
    )
  }
}
