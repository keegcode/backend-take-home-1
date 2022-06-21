import countries from './countries.json' assert { type: 'json' };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  await knex('countries').del()
  await knex('countries').insert(countries);
}
