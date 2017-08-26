'use strict'

exports.up = function (db) {
  return db.createTable('products', {
    id:          { type: 'int',     primaryKey:  true, autoIncrement: true },
    title:       { type: 'string',  notNull:     true },
    price:       { type: 'decimal', notNull:     true },
    description: { type: 'string' },
    sweetness:   { type: 'int' },
    created_at:  { type: 'timestamptz', notNull: true, defaultValue:  new String('now()') }
  })
    .then(() => {
      return db.runSql(
        `
        INSERT INTO products (title, price, description, sweetness)
         VALUES (
           'Apple',
           0.25,
           'These delicious apples Maigold from Wädenswil (ZH) will make you want to eat 4 in a row. Look how shiny they are!',
           70
         ),
         (
           'Orange',
           0.30,
           'From sunny Algarve (south of Portugal), they are the oldest and best kind of oranges there is. Yum!',
           60
         ),
         (
           'Red Banana',
           0.15,
           'Yes, red bananas! From the Americas, these bananas will impress your entire family when they come to visit you.',
           90
         ),
         (
           'Papaya',
           '0.5',
           'Soft and plump, our incredible papayas from Mexico go well with anything. ¡Qué bueno!',
           75
         )
        `
      )
    })
}

exports.down = function (db) {
  return db.dropTable('products')
}
