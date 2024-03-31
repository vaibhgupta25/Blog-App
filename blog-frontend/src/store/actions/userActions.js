import { userActions } from "../reducers/userReducers"
export const logout = (type) => (dispatch,getState) =>{
    dispatch(userActions.resetUserInfo());
    localStorage.removeItem('account');

}