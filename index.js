const express = require("express");
const morgan = require("morgan");
const mongodb = require("mongodb");
require("dotenv/config");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const getDatabase = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log("Connected to Database");
    return client.db(process.env.DB_NAME);
  } catch {
    console.log("Cannot connect to Database");
  }
};

const dogs = [
  { id: 1, name: "Milo" },
  { id: 2, name: "Max" },
  { id: 3, name: "Charlie" },
];

//Starting Address
app.get("/", (req, res) => {
  res.send("Don't Worry, the API works. Change the path above.");
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
app.post("/api/dogs", async (req, res) => {
  const db = await getDatabase();
  const data = req.body;

  await db.collections("pets").insert({ ...data });
  res.send({data});
});

//Listening
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
