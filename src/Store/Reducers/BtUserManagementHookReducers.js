import {
  SET_SELECTED_USER,
  SUA_USER,
  THEM_USER,
  XOA_USER,
} from "../Types/Type";

const DEFAULT_STATE = {
  arrUser: [
    {
      id: 1,
      username: "hoangvu",
      fullName: "vuhuyhoang",
      email: "123@gmail.com",
      password: 123456,
      phoneNumber: "0939383480",
      type: "Admin",
    },
    {
      id: 2,
      username: "khanhvan",
      fullName: "vokhanhvan",
      email: "456@gmail.com",
      password: 123456,
      phoneNumber: "0703888805",
      type: "Client",
    },
  ],
  selectedUser: null,
};

export const BTUserManagementHookReducers = (
  state = DEFAULT_STATE,
  { type, payload }
) => {
  switch (type) {
    case THEM_USER: {
      let data = [...state.arrUser];

      data.push({ ...payload, id: Date.now() });

      state.arrUser = data;

      return { ...state };
    }

    case SET_SELECTED_USER: {
      return { ...state, selectedUser: payload };
    }

    case SUA_USER: {
      state.arrUser = state.arrUser.map((ele) =>
        ele.id === payload.id ? payload : ele
      );

      state.selectedUser = null;

      return { ...state };
    }

    case XOA_USER: {
      state.arrUser = state.arrUser.filter((ele) => ele.id !== payload);

      return { ...state };
    }

    default:
      return state;
  }
};
