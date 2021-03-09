import React from 'react'
import useIconSize from '../icon-size'
import IconPropTypes from '../IconPropTypes'

function IconHome({ size, ...props }) {
  const sizeValue = useIconSize(size)
  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.4}
        d="M3.191 10.338l8.533-6.248a.468.468 0 01.552 0l8.533 6.248a.468.468 0 11-.553.754L12 5.047l-8.256 6.045a.465.465 0 01-.654-.1.468.468 0 01.101-.655z"
      />
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.4}
        d="M5.452 11.198c.259 0 .468.21.468.468v7.444h3.741v-4.063c0-1.29 1.05-2.34 2.339-2.34 1.29 0 2.339 1.05 2.339 2.34v4.063h3.741v-7.444a.468.468 0 01.935 0v7.912a.468.468 0 01-.467.468H13.87a.467.467 0 01-.468-.468v-4.531c0-.774-.63-1.404-1.403-1.404-.774 0-1.403.63-1.403 1.403v4.532c0 .013 0 .025-.002.036a.467.467 0 01-.466.431H5.452a.468.468 0 01-.467-.467v-7.912c0-.259.209-.468.467-.468z"
      />
    </svg>
  )
}

IconHome.propTypes = IconPropTypes
export default IconHome
