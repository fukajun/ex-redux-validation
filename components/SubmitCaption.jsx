import React from 'react'
import _     from 'lodash'

var SubmitCaption = React.createClass(
{
  onChange : function(type, e) {
    this.props.onUpdate(type, e.target.value)
  },
  render : function() {
    var page = this.props.page
    return (
    <div>
      <input type='text' value={page.button_caption} onChange={this.onChange.bind(this, 'button_caption')} />
    </div>
    )
  }
});

export default SubmitCaption
