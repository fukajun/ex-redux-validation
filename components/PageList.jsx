import React from 'react'
import _     from 'lodash'

var PageList = React.createClass({
  getInitialState: function() {
    return {
      current: 0
    }
  },
  onDelete: function(page) {
    this.props.onDelete(page)
  },
  onSwitchPage: function(page) {
    this.props.onSwitchPage(page)
  },
  render: function(){
    var self = this;
    var pageList = this.props.pages.map(function(page) {
      var deleteLink = []
      if (self.props.pages.length > 1) {
        deleteLink = (<a onClick={self.onDelete.bind(self, page)}> Remove</a>)
      }
      return (
        <li>
        <label>
        <input
           type='radio' name='page'
           value={page.id}
           key={page.id}
           onChange={self.onSwitchPage.bind(self, page)}
           defaultChecked={self.props.pages[self.state.current] === page}/>
        {page.description}
        </label>
        {deleteLink}
        </li>
        )
    })
    return (
        <div>
        <input type='button' value='Add Page' onClick={this.props.onAddPage}/>
          {pageList}
        </div>
    )
  }
})

export default PageList
