

import React  from 'react'
import Helmet from 'react-helmet'

export default () => {
  const notFound = 'Not found!'

  return (
    <div className="view not-found">
      <Helmet title={notFound} />

      <h1>
        {notFound}!
      </h1>
    </div>
  )
}
