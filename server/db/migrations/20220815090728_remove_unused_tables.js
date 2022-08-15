/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .dropTableIfExists('conversations')
    .dropTableIfExists('health_maintenance_organization')
    .dropTableIfExists('hospitals')
    .dropTableIfExists('insurance')
    .dropTableIfExists('rights')
    .dropTableIfExists('sicknesses')
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
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
  
};
