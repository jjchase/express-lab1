const express = require("express");
const cors = require("cors");
const { cart } = require("./routes");
const serverPort = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", cart);
app.listen(serverPort, () => {
    console.log(`Server up and listening on port: ${serverPort}`);
})