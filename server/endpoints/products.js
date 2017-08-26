'use strict'


const products = async function (ctx) {
  const products = await ctx.db.run(`
      SELECT p.*
        FROM products p
   LEFT JOIN promotions promo
          ON promo.product_id = p.id
  `)

  ctx.body = products
}


module.exports = { products }
