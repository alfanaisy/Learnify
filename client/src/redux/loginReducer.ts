export interface LoginState {
  visits: number;
}

export const initialState: LoginState = {
  visits: 1,
};

const loginReducer = (state = initialState) => {
  return state;
};

export default loginReducer;
