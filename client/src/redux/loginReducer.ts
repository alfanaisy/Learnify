export const UPDATE_VISIT = 'UPDATE_VISIT';

export interface LoginState {
  visits: number;
}

export const initialState: LoginState = {
  visits: 1,
};

export const increment = (amount: number = 1) => {
  return {
    type: UPDATE_VISIT,
    payload: amount,
  };
};

const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_VISIT:
      return { ...state, visits: state.visits + action.payload };

    default:
      return state;
  }
};

export default loginReducer;
