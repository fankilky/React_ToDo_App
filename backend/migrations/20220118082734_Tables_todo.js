exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("username").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
    })
    .then(() => {
      return knex.schema.createTable("todos", (table) => {
        table.increments();
        table.string("items");
        table.integer("users_id").unsigned();
        table.foreign("users_id").references("users.id");
      });
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todos").then(() => {
    return knex.schema.dropTable("users");
  });
};
