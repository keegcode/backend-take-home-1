/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex
        .schema
        .createTable('statistics', (tableBuilder) => {
            tableBuilder.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid ()'));
            tableBuilder.uuid('country_id').references('countries.id');
            tableBuilder.integer('confirmed');
            tableBuilder.integer('recovered');
            tableBuilder.integer('deaths');
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
        .dropTable('statistics');
}
