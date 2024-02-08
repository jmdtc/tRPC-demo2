import express from "express";

const app = express();
// app.use(cors());

const port = 8080;
app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
})