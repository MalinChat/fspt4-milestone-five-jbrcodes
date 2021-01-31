import React, { useEffect, useState } from "react";
import "./App.css";
import StudentList from "./components/StudentList";
import AddStudentForm from "./components/AddStudentForm";

export default function App() {
  let [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    fetch("/students/students")
      .then(response => response.json())
      .then(students => {
        setStudents(students);
      })
      .catch(error => {
        console.log(error);
      });
  };

  function addStudent(firstname, lastname) {
    let newStudent = { firstname, lastname };
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent)
    };

    fetch("/students/students", options)
      .then(response => response.json())
      .then(students => {
        setStudents(students);
      })
      .catch(err => {
        console.log("error!", err.message);
      });
  }

  function deleteStudent(id) {
    let options = {
      method: "DELETE"
    };

    fetch(`/students/students/${id}`, options)
      .then(response => response.json())
      .then(students => {
        setStudents(students);
      })
      .catch(err => {
        console.log("error!", err.message);
      });
  }

  return (
    <div className="App">
      <h1>CodeOp's Facebook</h1>
      <StudentList students={students} onDelete={id => deleteStudent(id)} />

      <AddStudentForm
        onSubmit={(firstname, lastname) => addStudent(firstname, lastname)}
      />
    </div>
  );
}
