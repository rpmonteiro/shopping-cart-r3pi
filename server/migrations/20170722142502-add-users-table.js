'use strict'

exports.up = function (db) {
  return db
    .createTable('users', {
      id:            { type: 'int', primaryKey: true, autoIncrement: true },
      email:         { type: 'string', notNull: true, length: 200 },
      password_hash: { type: 'string', notNull: true },
      name:          { type: 'string', length: 200 },
      created_at:    { type: 'timestamptz', notNull: true, defaultValue: new String('now()') }
    })
    .then(() => {
      return db.runSql(
        `
        INSERT INTO users (email, password_hash, name)
             VALUES (
               'r3pi@solera.com',
               '',
               'r3pi Team'
             )
        `
      )
    })
}

exports.down = function (db) {
  return db.dropTable('users')
}
