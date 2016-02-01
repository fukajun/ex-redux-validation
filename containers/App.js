import React        from 'react'
import { Provider } from 'react-redux'
import PageApp      from './PageApp.jsx'
import { pageData } from '../reducers'
import thunk        from 'redux-thunk';
import logger       from '../middlewares/logger'
import { createStore, combineReducers, applyMiddleware  } from 'redux'

export default class App {
  constructor() {
    const initialState = {
      pageData: {
        pages: [],
        pageNum: 0,
        validationError: {},
        responseError: {}
      }
    }
    const reducer = combineReducers({ pageData });
    const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
    this.store = createStoreWithMiddleware(reducer, initialState)
  }

  render() {
    return (
      <div>
      <Provider store={this.store}>
        { () => <div><PageApp /></div> }
      </Provider>
      </div>
    )
  }
}
