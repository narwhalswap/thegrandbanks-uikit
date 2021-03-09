import React, { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ImageExists } from '../../hooks'
import { GU } from '../../style'
import { isAddress, tokenIconUrl, warn } from '../../utils'
import BadgeBase from '../BadgeBase/BadgeBase'
import TokenBadgePopover from './TokenBadgePopover'

const TokenBadge = React.memo(function TokenBadge({
  address,
  badgeOnly,
  className,
  compact,
  name,
  networkType,
  style,
  symbol,
}) {
  const badgeRef = useRef(null)

  const [opened, setOpened] = useState(false)
  const handleClose = useCallback(() => setOpened(false), [])
  const handleOpen = useCallback(() => setOpened(true), [])

  const isValidAddress = isAddress(address)
  const iconSrc =
    isValidAddress && networkType === 'main' ? tokenIconUrl(address) : null
  const title = name && symbol ? `${name} (${symbol})` : symbol

  if (!isValidAddress) {
    warn(`TokenBadge: provided invalid address (${address})`)
  }

  return (
    <BadgeBase
      badgeRef={badgeRef}
      className={className}
      compact={compact}
      disabled={badgeOnly}
      icon={
        <ImageExists src={iconSrc}>
          {({ exists }) => exists && <Icon compact={compact} src={iconSrc} />}
        </ImageExists>
      }
      label={
        <span
          css={`
            position: relative;
            top: 1px;
            display: flex;
            flex-shrink: 1;
            min-width: 0;
            margin-left: ${compact ? 0 : `${1 * GU}px`};
          `}
        >
          {name && <Name>{name}</Name>}
          <Symbol>{name ? `(${symbol})` : symbol}</Symbol>
        </span>
      }
      onClick={isValidAddress ? handleOpen : undefined}
      style={style}
      title={`${title} − ${address || 'No address'}`}
    >
      {popoverDisabled =>
        !popoverDisabled &&
        address && (
          <TokenBadgePopover
            address={address}
            iconSrc={iconSrc}
            networkType={networkType}
            onClose={handleClose}
            opener={badgeRef.current}
            title={title}
            visible={opened}
          />
        )
      }
    </BadgeBase>
  )
})
TokenBadge.propTypes = {
  address: PropTypes.string,
  badgeOnly: PropTypes.bool,
  className: PropTypes.string,
  compact: PropTypes.bool,
  name: PropTypes.string,
  networkType: PropTypes.string,
  style: PropTypes.object,
  symbol: PropTypes.string.isRequired,
}
TokenBadge.defaultProps = {
  address: '',
  name: '',
  networkType: 'main',
}

function Icon({ compact, src, ...props }) {
  const margin = 1 * GU
  return (
    <span
      css={`
        flex-shrink: 0;
        display: block;
        width: 18px;
        height: 18px;
        margin: 0 ${compact ? margin : 0}px 0 ${compact ? 0 : margin}px;
        background-size: contain;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-image: url(${src});
      `}
      {...props}
    />
  )
}
Icon.propTypes = {
  compact: PropTypes.bool,
  src: PropTypes.string.isRequired,
}

const Name = styled.span`
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 20%;
  margin-right: ${0.5 * GU}px;
`

const Symbol = styled.span`
  flex-shrink: 0;
`

export default TokenBadge
