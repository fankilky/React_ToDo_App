const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

class TodoService {
  constructor(knex) {
    this.knex = knex;
  }

  async login(username, password) {
    let user = await this.knex
      .select("*")
      .from("users")
      .where({ username: username })
      .then((data) => data[0]);

    if (await bcrypt.compare(password, user.password)) {
      let payload = {
        id: user.id,
      };

      let token = jwt.sign(payload, config.jwtSecret);
      return token;
    }
  }

  async signup(username, email, password) {
    let hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;

    let userInfo = {
      username,
      email,
      password,
    };

    let userId = await this.knex("users").insert(userInfo).returning("id");
    return userId;
  }

  info(user) {
    let userInfo = this.knex("users").select("*").where({ users_id: user.id });
    return userInfo;
  }

  list(user) {
    let todos = this.knex("todos").select("*").where({ users_id: user.id });
    return todos;
  }

  add(user, items) {
    let todo = {
      items: items,
      users_id: user.id,
    };
    let TODO = this.knex.insert(todo).into("todos").returning("*");
    return TODO;
  }

  update(user, items, id) {
    let todo = {
      items: items,
      users_id: user.id,
    };
    let TODO_NEW = this.knex("todos")
      .update(todo)
      .where({ id: id })
      .returning("*");

    return TODO_NEW;
  }

  remove(user, id) {
    let TODO_DELETE = this.knex("todos")
      .where({ id: id })
      .andWhere({ users_id: user.id })
      .del();

    return TODO_DELETE;
  }
}

module.exports = TodoService;
