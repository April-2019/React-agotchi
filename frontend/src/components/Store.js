import React from 'react'

const Store = (props) => {
  document
    .body
    .setAttribute('class', 'store_background')
  return (
    <React.Fragment>
      <div>
        Hello from Store
      </div>
      <div>
        {'apple'}
      </div>
      <div>

      </div>
      <div>

      </div>
    </React.Fragment>
  )
}

export default Store