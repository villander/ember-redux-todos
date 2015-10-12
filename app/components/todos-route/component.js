import Ember from 'ember';

import { actions } from 'todos/services/store';

const {
  Component,
  isEmpty,
  computed,
  computed: { filterBy }
} = Ember;

export default Component.extend({
  filtered: computed('todos', 'filter', function() {
    var filter = this.get('filter');
    var all = this.get('todos');

    if (filter === 'all') { return all; }

    return all.filterBy('isCompleted', filter === 'completed');
  }),

  completed: filterBy('todos', 'isCompleted', true),
  active: filterBy('todos', 'isCompleted', false),

  inflection: computed('active', function() {
    var active = this.get('active.length');
    return active === 1 ? 'item' : 'items';
  }).readOnly(),

  allAreDone: computed('filtered', function() {
    let todos = this.get('todos');
    let completed = this.get('completed');

    return !isEmpty(todos) && todos.length === completed.length;
  }),

  actions: actions
});
