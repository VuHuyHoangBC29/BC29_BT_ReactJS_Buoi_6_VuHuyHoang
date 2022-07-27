import React from "react";
import RegisterForm from "./RegisterForm";
import UserManagement from "./UserManagement";

export default function BTUserManagementHook() {
  return (
    <div className="container">
      <RegisterForm />
      <UserManagement />
    </div>
  );
}
