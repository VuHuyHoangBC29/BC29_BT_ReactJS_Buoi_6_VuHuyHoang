import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, xoaUser } from "../Store/Actions/Action";

export default function UserManagement() {
  const [state, setState] = useState({
    keyword: "",
    selectedType: "All",
  });

  const arrUser = useSelector(
    (state) => state.BTUserManagementHookReducers.arrUser
  );

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  let data = arrUser.filter((ele) => {
    return (
      ele.fullName
        .toLowerCase()
        .trim()
        .indexOf(state.keyword.toLocaleLowerCase().trim()) !== -1
    );
  });

  if (state.selectedType !== "All") {
    data = data.filter((ele) => ele.type === state.selectedType);
  }

  const renderUserTable = () => {
    return data.map((ele, idx) => {
      return (
        <tr key={idx} className={`${idx % 2 === 0 && "bg-light"}`}>
          <td>{idx + 1}</td>
          <td>{ele.username}</td>
          <td>{ele.fullName}</td>
          <td>{ele.email}</td>
          <td>{ele.phoneNumber}</td>
          <td>{ele.type}</td>
          <td>
            <button
              onClick={() => {
                dispatch(selectUser(ele));
              }}
              className="btn btn-info mr-2"
            >
              EDIT
            </button>
            <button
              onClick={() => {
                dispatch(xoaUser(ele.id));
              }}
              className="btn btn-danger"
            >
              DELETE
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="card p-0 mt-3">
      <div className="card-header font-weight-bold">USER MANAGEMENT</div>
      <div className="row mt-4 px-3 ">
        <div className="col-4">
          <div className="form-group mb-0">
            <input
              onChange={handleChange}
              name="keyword"
              type="text"
              placeholder="Search by full name..."
              className="form-control"
            />
          </div>
        </div>
        <div className="col-3 ml-auto">
          <div className="form-group mb-0">
            <select
              onChange={handleChange}
              name="selectedType"
              className="form-control"
            >
              <option>All</option>
              <option>Client</option>
              <option>Admin</option>
            </select>
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderUserTable()}</tbody>
        </table>
      </div>
    </div>
  );
}
