'use strict'

exports.up = function (db) {
  return db.createTable('promotions', {
    id:         { type: 'int', primaryKey: true, autoIncrement: true },
    product_id: { type: 'int', notNull:    true },
    type:       { type: 'string', notNull: true }
  })
    .then(() => {
      return db.runSql(
        `
        INSERT INTO promotions (product_id, type)
         VALUES (
           '4',
           '3 for 2'
         );
        `
      )
    })
}

exports.down = function (db) {
  return db.dropTable('promotions')
}
