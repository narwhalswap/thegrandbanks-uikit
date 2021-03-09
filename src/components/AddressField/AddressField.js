import React from 'react'
import PropTypes from 'prop-types'
import { GU } from '../../style'
import TextCopy from '../TextCopy/TextCopy'
import EthIdenticon from '../EthIdenticon/EthIdenticon'

const HEIGHT = 5 * GU
const IDENTICON_SIZE = 6 * GU

const AddressField = React.forwardRef(function AddressField(
  { address, autofocus, icon, onCopy, ...props },
  ref
) {
  return (
    <TextCopy
      ref={ref}
      adornment={
        icon || (
          <div>
            <EthIdenticon
              address={address}
              onCopy={onCopy}
              scale={2}
              css={`
                transform: scale(${(HEIGHT - 2) / IDENTICON_SIZE});
                transform-origin: 50% 50%;
              `}
            />
          </div>
        )
      }
      autofocus={autofocus}
      value={address}
    />
  )
})

AddressField.propTypes = {
  address: PropTypes.string.isRequired,
  autofocus: PropTypes.bool,
  icon: PropTypes.node,
  onCopy: PropTypes.func,
}

AddressField.defaultProps = {
  autofocus: true,
}

export default AddressField
