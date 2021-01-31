import React from "react";

function StudentList(props) {
  return (
    <div className="StudentList">
      <h1>All students</h1>
      <ul>
        {props.students.map(s => (
          <li key={s.id}>
            {s.firstname} {s.lastname}
            <button onClick={e => props.onDelete(s.id)} type="button">
              Remove student
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
