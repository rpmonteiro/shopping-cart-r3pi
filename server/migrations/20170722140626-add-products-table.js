'use strict'

exports.up = function (db) {
  return db.createTable('products', {
    id:         { type: 'int',    primaryKey: true, autoIncrement: true },
    title:      { type: 'string', notNull: true },
    price:      { type: 'int',    notNull: true },
    body:       { type: 'string' },
    created_at: { type: 'timestamptz', notNull: true, defaultValue: new String('now()') }
  })
    .then(() => {
      return db.runSql(
        `
        INSERT INTO products (title, price, body)
         VALUES (
           'Apple',
           '0.25',
           'These delicious apples Maigold from Wädenswil (ZH) will make you want to eat 4 in a row. Look how shiny they are!'
         ),
         (
           'Oranges',
           '0.30',
           'From sunny Algarve (south of Portugal), they are the oldest and best kind of oranges there is. Yum!',
           '0.64',
           '3.5'
         ),
         (
           'Red Bananas',
           '0.15',
           'Yes, red bananas! From the Americas, these bananas will impress your entire family when they come to visit you.'
         ),
         (
           'Papayas',
           '0.5',
           'Soft and plump, our incredible papayas from Mexico go well with anything. ¡Qué bueno!'
         )
        `
      )
    })
}

exports.down = function (db) {
  return db.dropTable('products')
}
