const INITIAL_STATE = {
  email: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'saveEmail':
      return {...state, email: action.payload};
    default:
      return state;
  }
}
