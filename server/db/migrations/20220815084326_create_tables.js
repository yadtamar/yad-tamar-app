/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('families', function(table) {
      table.bigint('created_at')
      table.bigint('updated_at')
      table.integer('family_id').notNullable()
      table.text('last_name')
    })
    .createTable('roles', function(table) {
      table.bigint('created_at')
      table.bigint('updated_at')
      table.integer('role_id').notNullable()
      table.text('role')
      table.integer('user_id')
      table.integer('family_id')
    })
    .createTable('users', function(table) {
      table.bigint('created_at')
      table.bigint('updated_at')
      table.integer('user_id').notNullable()
      table.text('first_name')
      table.bigint('cell_phone')
      table.text('mail')
      table.string('last_name', 255)
      table.string('password', 255)
      table.string('user_name', 255)
      table.string('user_token', 1000)
    })
    .createTable('conversations', function (table){
      table.bigint('created_at')
      table.bigint('updated_at')
      table.bigint('id').notNullable()
      table.bigint('patient_id')
      table.bigint('cardinator_id')
      table.text('issue')
      table.text('notes')
    })
    .createTable('health_maintenance_organization', function(table) {
      table.bigint('id').notNullable()
      table.string('health_maintenance_organization_name', 1000)
      table.text('contacts')
    })
    .createTable('hospitals', function (table){
      table.bigint('hospital_id').notNullable()
      table.string('hospital_name', 1000)
      table.text('contacts')
    })
    .createTable('insurance', function (table){
      table.bigint('id').notNullable()
      table.bigint('user_id')
      table.text('insurance_name')
      table.bigint('created_at')
      table.bigint('updated_at')
    })
    .createTable('rights', function (table){
      table.bigint('id').notNullable()
      table.text('name')
      table.boolean('realized')
      table.bigint('userId')
      table.text('comments')
      table.bigint('created_at')
      table.bigint('updated_at')
    })
    .createTable('sicknesses', function (table){
      table.bigint('sicknes_id').notNullable()
    })
    .createTable('tasks', function (table){
      table.string('task_name', 1000)
      table.integer('task_id').notNullable()
      table.integer('family_id')
      table.integer('helper_id')
      table.bigint('date')
      table.text('comments')
      table.bigint('created_at')
      table.bigint('updated_at')
      table.boolean('was_completed')
      table.string('time_type', 1000)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('families')
    .dropTable('roles')
    .dropTable('users')
    .dropTable('conversations')
    .dropTable('health_maintenance_organization')
    .dropTable('hospitals')
    .dropTable('insurance')
    .dropTable('rights')
    .dropTable('sicknesses')
    .dropTable('tasks')
}