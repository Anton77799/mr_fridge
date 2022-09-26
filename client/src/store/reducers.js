/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { types } from './types';

const initState = {
  cuisines: [
    'African',
    'American',
    'British',
    'Cajun',
    'Caribbean',
    'Chinese',
    'Eastern European',
    'European',
    'French',
    'German',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Japanes',
    'Jewish',
    'Korean',
    'Latin American',
    'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Nordic',
    'Southern',
    'Spanish',
    'Thai',
    'Vietnamese',
  ],
  types: [
    'main course',
    'side dish',
    'dessert',
    'appetizer',
    'salad',
    'bread',
    'breakfast',
    'soup',
    'beverage',
    'sauce',
    'marinade',
    'fingerfood',
    'snack',
    'drink',
  ],
  ingCash: {},
  fridge: [],
  user: {
    id: null,
    login: '',
    email: '',
    imageUrl: '',
  },
};

export const reducers = (state = initState, action) => {
  switch (action.type) {
    case types.ADD_ING:
      return { ...state, ingCash: { ...state.ingCash, [action.payload.ing]: action.payload.ingData } };
    case types.ADD_TO_FRIDGE:
      return { ...state, fridge: [...state.fridge, action.payload.ingData] };
    case types.REMOVE_FROM_FRIDGE:
      const filter = state.fridge.filter((ing) => ing.id !== action.payload.id);
      return { ...state, fridge: filter };
    case types.SET_USER:
      // eslint-disable-next-line no-case-declarations
      const setUser = {
        ...state.user,
        id: action.payload.id,
        login: action.payload.login,
        email: action.payload.email,
        imageUrl: action.payload.imageUrl || '',
      };
      return { ...state, user: setUser };
    case types.LOGOUT_USER:
      return {
        ...state,
        user: {
          id: null, login: '', email: '', imageUrl: '',
        },
      };
    default:
      return state;
  }
};
