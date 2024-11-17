/* eslint-disable drizzle/enforce-delete-with-where */

import { faker } from '@faker-js/faker'
import { users, restaurants } from './schema'
import { db } from './connection'
import chalk from 'chalk'

/**
 * Reset Database
 */
await db.delete(users)
await db.delete(restaurants)

console.log(chalk.yellow('Database reset!'))

/**
 * Create customers
 */

await db.insert(users).values([
  {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    role: 'customer',
  },
  {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    role: 'customer',
  },
])

console.log(chalk.yellow('Customers created!'))

/**
 * Create manager
 */

const [manager] = await db
  .insert(users)
  .values([
    {
      name: faker.person.firstName(),
      email: 'admin@admin.com',
      role: 'manager',
    },
  ])
  .returning({
    id: users.id,
  })

console.log(chalk.yellow('Manager created!'))

/**
 * Create restaurants
 */

await db.insert(restaurants).values({
  name: faker.company.name(),
  description: faker.lorem.sentence(),
  managerId: manager.id,
})

console.log(chalk.greenBright('Database seeded successfully!'))

process.exit()
