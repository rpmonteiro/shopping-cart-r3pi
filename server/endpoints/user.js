'use strict'

const jwt       = require('jsonwebtoken')
const config    = require('../config/settings')
const createKey = require('../utils/user-utils').createKey


async function user(ctx) {
  const userId = (ctx.state.user && ctx.state.user.id) || 0
  const user   = await ctx.db.users.findOne({id: userId})

  if (user) {
    ctx.body = setupUserBody(user)
    ctx.status = 200
  } else {
    ctx.status = 401
    ctx.statusText = 'Invalid user'
  }
}


function setupUserBody(rs) {
  const profile = rs
  delete profile.password_hash

  return {
    token: jwt.sign({ id: profile.id, userKey: createKey(profile.created_at) }, config.jwtSecret, {
      expiresIn: config.jwtExpiry
    }),
    expires: Math.floor(Date.now() / 1000) + config.jwtExpiry * 60,
    profile: profile
  }
}


module.exports = { user }
