import _ from 'lodash'

export default function logger({ getState }) {
  return (next) => (action) => {
    const { pageData } = getState()
    switch(action.type) {
      default:
        console.log(pageData)
        return next(action)
    }
  }
}
