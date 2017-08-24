'use strict'

const jwt              = require('jsonwebtoken')
const config           = require('../config/settings')
const validatePassword = require('../utils/user-utils').validatePassword
const createKey        = require('../utils/user-utils').createKey

exports.login = async function (ctx) {
  const res = await doLogin(ctx.db, ctx.request.body)

  if (res) {
    ctx.status = 200
    ctx.body = res
  } else {
    ctx.status = 200
  }
}


async function doLogin(db, params) {
  try {
    const user = await db.users.findOne({email: params.email})

    let hash, profile
    if (user) {
      profile = user
      hash = profile.password_hash
      delete profile.password_hash
    }

    return validatePassword(params.password || '', hash || '').then(valid => {
      if (valid) {
        const expires = Math.floor(Date.now() / 1000) + config.jwtExpiry * 60
        const token = jwt.sign(
          { id: profile.id, userKey: createKey(profile.created_at) },
          config.jwtSecret,
          { expiresIn: config.jwtExpiry }
        )
        return { token: token, expires: expires, profile: profile }
      }
    })

  } catch (err) {
    console.log('could not authorise user:', err)
  }
}
