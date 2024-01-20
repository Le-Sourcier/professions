const http = require("http");
const express = require("express");
const app = express(http);

app.use(express.json());
const router = require("./router");
app.use("/", router);

// Start the HTTP server on the provided port
app.listen(8100, async () => {
  // console.log(`Server listening on port ${PORT}`);
});
