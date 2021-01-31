var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//test DB

router.get("/", (req, res) => {
  res.send({ message: "Welcome,it's connected" });
});

// GET student list
router.get("/students", async (req, res, next) => {
  try {
    let results = await db("SELECT * FROM students;");

    // .then(results => {
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  } //(err => res.status(500).send(err));
});

// GET one student
router.get("/students/:id", async (req, res, next) => {
  //your code here
  let id = req.params.id;
  try {
    let sql = `SELECT * FROM students WHERE id = ${id}`;
    let results = await db(sql);
    if (results.data.length === 1) {
      res.send(results.data[0]);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// INSERT a new student into the DB
router.post("/students", async (req, res, next) => {
  //your code here
  let { firstname, lastname } = req.body;
  let sql = `
        INSERT INTO students (firstname, lastname)
        VALUES ('${firstname}', '${lastname}')
        `;
  try {
    let results = await db(sql);
    //return all the students
    results = await db("SELECT * FROM students");
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE a student from the DB
router.delete("/students/:id", async (req, res, next) => {
  //your code here
  let id = req.params.id;
  try {
    let sql = `SELECT * FROM students WHERE id = ${id}`;
    let results = await db(sql);
    if (results.data.length === 1) {
      sql = `DELETE FROM students WHERE id = ${id}`;
      //delete student
      await db(sql);
      //return students
      results = await db("SELECT * FROM students");
      res.send(results.data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
