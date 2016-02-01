import * as types from '../constants/ActionTypes'
import { Page } from '../model'
var _ = require('lodash')


export default function pageData(state = {}, action) {
  switch (action.type) {

  case types.SWITCH_PAGE:
    let index = state.pages.indexOf(action.page)
    return {
      pages: state.pages,
      pageNum: index,
      validationError: state.validationError
    }

  case types.UPDATE_PAGE:
    let updated = state.pages[state.pageNum].clone()
    updated[action.key] = action.value
    let pages = state.pages.slice()
    pages[state.pageNum] = updated
    let isValid = updated.isValid()
    let validationError = updated.validationError
    return {
      pages: pages,
      pageNum: state.pageNum,
      validationError
    }

  case types.SYNC_PAGE:
    return {
      pages: action.pages,
      pageNum: state.pageNum,
      validationError: state.validationError
    }

  case types.ADD_PAGE:
    let page = new Page({
      description: 'description',
      answers: [],
      title: 'title',
      question_text: 'qt'
    })

    return {
      pages: [ ...state.pages, page ],
      pageNum: state.pageNum,
      validationError: state.validationError
    }

  case types.SAVE_PAGE:
    return state;

  case types.SAVE_PAGE_FAIL:
    return {
      pages: state.pages,
      pageNum: state.pageNum,
      validationError: state.validationError,
      responseError: action.error
    }

  case types.DELETE_PAGE:
    action.deletePage.destroy()
    return {
      pages: state.pages.filter((page) => {
        return (page !== action.deletePage)
      }),
      pageNum: state.pageNum,
      validationError: state.validationError
    }

  default:
    return state
  }
}
