import React from 'react'
import _     from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as PageActions from '../actions/PageActions'
import QuestionText  from '../components/QuestionText.jsx'
import SelectWay     from '../components/SelectWay.jsx'
import SubmitCaption from '../components/SubmitCaption.jsx'
import PageList      from '../components/PageList.jsx'
import SaveButton    from '../components/SaveButton.jsx'

var _PageApp = class PageApp extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        {this.renderChild()}
      </div>
    )
  }

  componentWillMount() {
    const { dispatch } = this.props
    this.actions = bindActionCreators(PageActions, dispatch);
    this.actions.syncPage()
  }

  renderChild() {
    const { pages, pageNum, dispatch, validationError } = this.props

    return (
      <div className='app'>
      <section>
        <div>Pages</div>
        <section>
          <PageList
            pages={pages}
            onAddPage={this.actions.addPage}
            onDelete={this.actions.deletePage}
            onSwitchPage={this.actions.switchPage}/>
        </section>

        {this.renderCurrentPage()}

      </section>
      </div>
      )
  }

  renderCurrentPage() {
      const { pages, pageNum, dispatch, validationError, responseError } = this.props
      const currentPage = pages[pageNum]

      if(pages.length == 0) return []

      return (<div>
        <div>Pages{currentPage.id}</div>

        {this.renderResponseError(responseError)}

        <section>
          <div>Question text</div>
          <QuestionText
            page={currentPage}
            onUpdate={this.actions.updatePage} />
          <div>{this.renderValidationError('question_text')}</div>
        </section>

        <section>
          <div>Next page</div>
          <SelectWay
            page={currentPage}
            pages={pages}
            onUpdate={this.actions.updatePage} />
        </section>

        <section>
          <div>Submit caption</div>
           <SubmitCaption
            page={currentPage}
            onUpdate={this.actions.updatePage} />
          <div>{this.renderValidationError('button_caption')}</div>
        </section>

        <section>
          <input onClick={this.actions.savePage} type='button' value='Save Page'/>
        </section>
      </div>)
  }

  renderResponseError(responseError) {
    let error = responseError || {}
    if(Object.keys(error).length > 0) {
      return (
        <section>
          <div>Error Messaage</div>
          { Object.keys(error).map((key, value)=> <div>{key} : {error[key]}</div>) }
        </section>
      )
    } else {
      return []
    }
  }

  renderValidationError(key) {
    const { validationError } = this.props
    let error = validationError || {}
    if(Object.keys(error).length > 0) {
      return <div>{error[key]}</div>
    } else {
      return []
    }
  }
}

const PageApp = connect((state) => state.pageData)(_PageApp)
export default PageApp
