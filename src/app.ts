import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("<h1>Student management api is workin </h1>");
});

export default app;