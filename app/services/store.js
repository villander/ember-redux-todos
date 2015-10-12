const {
  combineReducers,
  createStore,
  bindActionCreators
} = window.Redux;

import * as types from 'todos/action-types';
import * as actionCreators from 'todos/actions';

const initialState = [{
  title: 'Use Ember with Redux',
  isCompleted: false,
  id: 0
}];

function newTitle(state, action) {
  state = state || '';

  switch (action.type) {
  case types.ADD_TODO:
    return '';
  case types.ADDING_TODO:
    return action.title;
  default:
    return state;
  }
}

function todos(state, action) {
  state = state || initialState;

  switch (action.type) {
  case types.ADD_TODO:
    if (action.title && !action.title.trim()) {
      return state;
    }
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      isCompleted: false,
      title: action.title
    }, ...state];

  case types.DELETE_TODO:
    return state.filter(todo =>
      todo.id !== action.id
    );

  case types.EDIT_TODO:
    return state.map(todo =>
      todo.id === action.id ?
        Object.assign({}, todo, { title: action.title }) :
        todo
    );

  case types.COMPLETE_TODO:
    return state.map(todo =>
      todo.id === action.id ?
        Object.assign({}, todo, { isCompleted: !todo.isCompleted }) :
        todo
    );

  case types.COMPLETE_ALL:
    const areAllMarked = state.every(todo => todo.isCompleted);
    return state.map(todo => Object.assign({}, todo, {
      isCompleted: !areAllMarked
    }));

  case types.CLEAR_COMPLETED:
    return state.filter(todo => todo.isCompleted === false);

  default:
    return state;
  }
}

const rootReducer = combineReducers({
  newTitle,
  todos
});

const store = createStore(rootReducer);
const actions = bindActionCreators(actionCreators, store.dispatch);

export { actions };

export default {
  isServiceFactory: true,
  create() { return store; }
};
