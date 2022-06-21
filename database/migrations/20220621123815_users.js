/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex
        .schema
        .createTable('users', (tableBuilder) => {
            tableBuilder.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid ()'));
            tableBuilder.text('email').unique();
            tableBuilder.text('password');
            tableBuilder.timestamps(true, true);
        });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex
        .schema
        .dropTable('users');
}
