import { Page, PageList } from '../model'
import _ from 'lodash'
import * as types from '../constants/ActionTypes'

//
// page
export function updatePage(key, value) {
  return {
    type: types.UPDATE_PAGE,
    key: key,
    value: value
  }
}

export function addPage() {
  return {
    type: types.ADD_PAGE
  }
}

export function deletePage(deletePage) {
  return {
    type: types.DELETE_PAGE,
    deletePage: deletePage
  }
}

export function switchPage(page) {
  return {
    type: types.SWITCH_PAGE,
    page: page
  }
}

export function savePage() {
  return function(dispatch, getState) {
    var state = getState().pageData
    var page = state.pages[state.pageNum]
    page.save(null, {
      success: ()=> {
        dispatch({
          type: types.SAVE_PAGE
        })
      },
      error: (page, res)=> {
        dispatch({
          error: res.body,
          type: types.SAVE_PAGE_FAIL
        })
      }
    })
  }
}

export function syncPage() {
  return function(dispatch) {
    var pages = new PageList()
    pages.fetch({
      success: (list, resp) => {
        console.log('sync')
        console.log(list.models)
        dispatch({
          type: types.SYNC_PAGE,
          pages: list.models
        })
      }
    })
  }
}
