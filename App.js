require("dotenv").config();
const express = require("express");

const app = express();

require("./db/connect");
const router = require("./Routes/routes");

const cors = require("cors");
const PORT = process.env.PORT || 6010;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server Started at Port No ${PORT}`);
});
