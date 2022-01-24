const express = require("express");
const cors = require("cors");
const knexfile = require("./knexfile").development;
const knex = require("knex")(knexfile);
const authClass = require("./auth")(knex);

const app = express();
app.use(cors());

const TodoRouter = require("./Router/TodoRouter");
const TodoService = require("./Service/TodoService");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set up auth file
app.use(authClass.initialize());

// set up service file
let todoService = new TodoService(knex);

//set up router file
app.use("/api", new TodoRouter(todoService, authClass).router());

app.listen(8080, () => {
  console.log("Application listening to port 8080");
});
