/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex
        .schema
        .createTable('countries', (tableBuilder) => {
            tableBuilder.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid ()'));
            tableBuilder.text('code').unique();
            tableBuilder.jsonb('name');
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
        .dropTable('countries');
}
