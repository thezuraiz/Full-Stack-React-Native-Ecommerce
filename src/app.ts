import express from "express";

const app = express();

app.use(express.json()); // To get json data form client

// Routes
// Http methods: GET, POST, PUT, PATCH, DELETE
app.get("/", (req, res) => {
  // to throw an error
  // return next(createHttpError(400, "something went wrong"));
  res.json({ message: "Welcome to elib apis" });
});

export default app;
