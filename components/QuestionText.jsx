import React from 'react'
import _     from 'lodash'

var QuestionText = React.createClass({
  onChange: function(type, e){
    if(['is_require', 'display_description'].indexOf(type) >= 0) {
      this.props.onUpdate(type, e.target.checked)
    } else {
      this.props.onUpdate(type, e.target.value)
    }
  },
  render: function(){
    var description = ''
    var page = this.props.page
    if(page.display_description) {
      description = [<textarea onChange={this.onChange.bind(this, 'description')} value={page.description}></textarea>]
    }
    return (
      <div>
        <textarea onChange={this.onChange.bind(this, 'question_text')} value={page.question_text}></textarea>
        <label> <input type='checkbox' onChange={this.onChange.bind(this, 'is_require')} checked={page.is_require}/> is require </label>
        <label> <input type='checkbox' onChange={this.onChange.bind(this, 'display_description')} checked={page.display_description}/> display description </label>
        {description}
      </div>
    )}

})

export default QuestionText
