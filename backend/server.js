const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const fs = require("fs");
const app = express();

const users = [
  {
    id: 1,
    firstName: "Jane",
    lastName: "Doe",
    age: 30,
  },

  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    age: 20,
  },

  {
    id: 3,
    firstName: "Ron",
    lastName: "Gil",
    age: 22,
  },
];

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/all", (req, res) => {
  res.json(users);
});

app.get("/one/:id", (req, res) => {
  const { id } = req.params;
  const index = users.find((user) => user.id == id);
  if (index == undefined) return res.status(404).send("User Not Found");
  res.status(200).send(index);
});

app.post("/create", (req, res) => {
  const fullname = req.body.fullname.split(" ");

  const newUser = {
    id: uuid.v4(),
    firstName: fullname[0],
    lastName: fullname[1],
    age: parseInt(req.body.age),
  };

  users.push(newUser);

  res.json(users);
});

const port = 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
