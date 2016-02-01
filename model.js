import Model from 'ampersand-model'
import Collection from 'ampersand-rest-collection'
import _ from 'lodash'

// Model
export const Page = Model.extend({
  props: {
      id: 'number',
      button_kind: 'string',
      description: 'string',
      page_kind: 'string',
      question_text: 'string',
      question_json: 'string',
      answer_type: 'string',
      display_description: 'boolean',
      is_require: 'boolean',
      question_kind: 'string',
      button_caption: 'string',
      title:'string'
  },
  validate: function() {
    let errors = {}

    if(this.question_text.length < 10) {
      errors['question_text'] = '10文字以上いれてください'
    }

    if(!(this.button_caption && this.button_caption.match(/[a-bA-Z]/))) {
      errors['button_caption'] = '必須です'
    }

    if(Object.keys(errors).length > 0) return errors
  },
  urlRoot: 'http://localhost:4000/pages',
  clone: function() {
    return new Page(this.attributes);
  }
})

export class PageList extends Collection {
  constructor(options) {
    super()
    this.mainIndex = 'id'
    this.model = Page
    this.url = 'http://localhost:4000/pages'
  }
}
