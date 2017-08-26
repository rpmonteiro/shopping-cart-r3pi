'use strict'


const products = async function (ctx) {
  const products = await ctx.db.run(`
    SELECT product.*,
           promotion.discount,
           promotion.three_for_two AS "3for2"
      FROM products product
 LEFT JOIN promotions promotion
        ON promotion.product_id = product.id
  `)

  ctx.body = products
}


module.exports = { products }
