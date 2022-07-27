import {
  SET_SELECTED_USER,
  SUA_USER,
  THEM_USER,
  XOA_USER,
} from "../Types/Type";

const themUser = (values) => {
  return {
    type: THEM_USER,
    payload: values,
  };
};

const suaUser = (values) => {
  return {
    type: SUA_USER,
    payload: values,
  };
};

const xoaUser = (values) => {
  return {
    type: XOA_USER,
    payload: values,
  };
};

const selectUser = (user) => {
  return {
    type: SET_SELECTED_USER,
    payload: user,
  };
};

export { themUser, suaUser, xoaUser, selectUser };
