const saveEmail = email => async dispatch => {
  dispatch({
    type: 'saveEmail',
    payload: email,
  });
};

export default {saveEmail};
