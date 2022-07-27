import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { themUser, suaUser } from "../Store/Actions/Action";

export default function RegisterForm() {
  // set default state
  const [state, setState] = useState({
    values: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      type: "Client",
    },
    errors: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      type: "",
    },
  });

  // lấy thông tin từ store reducer
  const { selectedUser, arrUser } = useSelector(
    (state) => state.BTUserManagementHookReducers
  );

  // kiểm tra trên store có selectedUser ko, nếu có thì setState values = selectedUser
  useEffect(() => {
    if (selectedUser) {
      setState((state) => ({
        ...state,
        values: selectedUser,
      }));
    }
  }, [selectedUser]);

  console.log(state.values);

  // dispatch 1 action lên store
  const dispatch = useDispatch();

  // sử dụng trong form để lấy event.target
  const formRef = useRef();

  // lấy dữ liệu bằng onChange
  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({
      values: { ...state.values, [name]: value },
    });
  };

  // submit dữ liệu
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
      return;
    }

    if (selectedUser) {
      dispatch(suaUser(state.values));
    } else {
      dispatch(themUser(state.values));
    }

    setState({
      values: {
        username: "",
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        type: "Client",
      },
      errors: {
        username: "",
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        type: "",
      },
    });
  };

  // validation
  const handleBlur = (event) => {
    const {
      name,
      value,
      title,
      minLength,
      maxLength,
      validity: { valueMissing, patternMismatch, tooLong, tooShort },
    } = event.target;

    let message = "";

    if (patternMismatch) {
      message = `${title} is invalid pattern.`;
    }

    if (tooShort || tooLong) {
      message = `${title} from ${minLength} - ${maxLength} characters.`;
    }

    if (valueMissing) {
      message = `${title} is required.`;
    }

    setState({
      errors: {
        ...state.errors,
        [name]: message,
      },
    });
  };

  // hiển thị value của selectedUser lên form khi bấm edit
  const { username, fullName, password, email, phoneNumber, type } =
    state.values;

  return (
    <div className="card p-0">
      <div className="card-header bg-warning text-white font-weight-bold">
        REGISTER FORM
      </div>
      <div className="card-body">
        <form ref={formRef} noValidate onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Username</label>
                <input
                  title="Username"
                  required
                  type="text"
                  name="username"
                  value={username}
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {state.errors.username && (
                  <span className="text-danger">{state.errors.username}</span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  title="Full name"
                  required
                  minLength={4}
                  maxLength={12}
                  name="fullName"
                  value={fullName}
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {state.errors.fullName && (
                  <span className="text-danger">{state.errors.fullName}</span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Password</label>
                <input
                  title="Password"
                  required
                  value={password}
                  name="password"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {state.errors.password && (
                  <span className="text-danger">{state.errors.password}</span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  required
                  value={phoneNumber}
                  title="Phone number"
                  name="phoneNumber"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {state.errors.phoneNumber && (
                  <span className="text-danger">
                    {state.errors.phoneNumber}
                  </span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Email</label>
                <input
                  required
                  name="email"
                  title="Email"
                  value={email}
                  type="text"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {state.errors.email && (
                  <span className="text-danger">{state.errors.email}</span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Type</label>
                <select
                  required
                  value={type}
                  name="type"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option>Client</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
          </div>
          <button
            disabled={!formRef.current?.checkValidity()}
            className="btn btn-warning mr-2"
          >
            SAVE
          </button>
          <button
            onClick={() => {
              setState({
                values: {
                  username: "",
                  fullName: "",
                  email: "",
                  password: "",
                  phoneNumber: "",
                  type: "Client",
                },
                errors: {
                  username: "",
                  fullName: "",
                  email: "",
                  password: "",
                  phoneNumber: "",
                  type: "",
                },
              });
            }}
            type="reset"
            className="btn btn-outline-dark"
          >
            RESET
          </button>
        </form>
      </div>
    </div>
  );
}
