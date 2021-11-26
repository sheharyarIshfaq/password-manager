import React from "react";
import PasswordItem from "./PasswordItem";

const PasswordContainer = (props) => {
  const savedPasswords = props.savedPasswords;
  return (
    <div className="row gap-4 p-4 p-lg-2 py-lg-4 align-content-center justify-content-center">
      {savedPasswords.map((password) => (
        <PasswordItem
          onDelete={props.onDelete}
          onUpdate={props.onUpdate}
          key={password.id}
          id={password.id}
          website={password.website}
          title={password.title}
          userName={password.userName}
          password={password.password}
        />
      ))}
    </div>
  );
};

export default PasswordContainer;
