'use strict'


const products = async function (ctx) {
  const products = await ctx.db.run('SELECT * FROM products')
  ctx.body = products
}


module.exports = { products }
