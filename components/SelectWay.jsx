import React from 'react'
import _     from 'lodash'

var SelectWay = React.createClass(
{
  onChange : function(type, e) {
    var origin = this.props.page
    origin[type] = e.target.value = e.target.value
    var updated = _.merge({}, origin)
    this.props.onUpdate(origin, updated)
  },
  render : function() {
    var page = this.props.page
    var options = [];
    options.push(<option value=''>NONE</option>)
    for(var i = 0; i < this.props.pages.length; i++) {
      options.push(<option value={this.props.pages[i].id}>{this.props.pages[i].title}</option>);
    }
    return (
    <div>
      <select onChange={this.onChange.bind(this, 'nextPageId')} value={page.nextPageId}>
        {options}
      </select>
    </div>
    )
  }
});

export default SelectWay
