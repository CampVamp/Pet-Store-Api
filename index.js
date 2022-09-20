const express = require("express");
const app = express();
app.use(express.json());

const dogs = [
  { id: 1, name: "Milo" },
  { id: 2, name: "Max" },
  { id: 3, name: "Charlie" },
];

//Starting Address
app.get("/", (req, res) => {
  res.send("Don't Worry, the API works. Change the path above");
});

//To Get all the Dogs
app.get("/api/dogs", (req, res) => {
  res.send(dogs);
});

//To Get a Specific dog using id
app.get("/api/dogs/:id", (req, res) => {
  const dog = dogs.find((c) => c.id === parseInt(req.params.id));
  if (!dog) res.status(404).send("Not found");
  res.send(dog);
});

//POST request
app.post("/api/dogs", (req, res) => {
  const dog1 = {
    id: dogs.length + 1,
    name: req.body.name,
  };
  dogs.push(dog1);
  res.send(dog1);
});

//Listening
app.listen("3000", () => {
  console.log("http://localhost:3000");
});
