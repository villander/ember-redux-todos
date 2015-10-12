// routes/todos.js
import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  store: service(),

  queryParams: {
    state: { refreshModel: true }
  },

  activate() {
    this.unsubscribe = this.get('store')
      .subscribe(() => this.refresh());
  },

  deactivate() {
    this.unsubscribe();
  },

  model(params) {
    let state = this.get('store').getState();

    return {
      all: state.todos,
      newTitle: state.newTitle,
      filter: params.state
    };
  }
});
