import Ember from 'ember';

import { actions } from 'todos/services/store';

export default Ember.Component.extend({
  tagName: 'ul',
  actions: actions
});
