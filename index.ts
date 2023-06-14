import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const PORT = 3000;

//cau hinh
app.use(bodyParser.json());

//router
app.get("/one", (req, res, next) => {
  fs.promises
    .readFile("./one.txt")
    .then((data) => res.send(data))
    .catch((err) => next(err));
});
app.use((error, req, res, next) => {
  console.error("Error 1111: ", error.type);
  if (error.type == "time-out")
    // arbitrary condition check
    res.status(408).send(error);
  else res.status(500).send(error);
});

//listen on port
app.listen(PORT, "localhost", () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
