const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./database/database");
const categoriesRouter = require("./routes/categories.routes");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use("/categories", categoriesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
