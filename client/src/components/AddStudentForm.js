import React, { useState } from "react";

function AddStudentForm(props) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  function handleChange(event) {
    let { name, value } = event.target;

    switch (name) {
      case "firstname":
        setFirstName(value);
        break;
      case "lastname":
        setLastName(value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.onSubmit(firstname, lastname);
    setFirstName("");
    setLastName("");
    console.log(`${firstname}`);
  }

  return (
    <div className="AddStudentForm">
      <h3>Add new student</h3>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          First name
          <input
            name="firstname"
            type="text"
            value={firstname}
            onChange={e => handleChange(e)}
          />
        </label>

        <label>
          Last name
          <input
            name="lastname"
            type="text"
            value={lastname}
            onChange={e => handleChange(e)}
          />
        </label>

        <button type="submit">Add student</button>
      </form>
    </div>
  );
}
export default AddStudentForm;
