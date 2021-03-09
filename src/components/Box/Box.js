import React from 'react'
import PropTypes from 'prop-types'
import { Inside } from 'use-inside'
import { GU, RADIUS, textStyle } from '../../style'
import { useTheme } from '../../theme/Theme'
import { warnOnce } from '../../utils'

function Box({ heading, children, padding, ...props }) {
  const theme = useTheme()

  const defaultPadding = 32

  if (padding === true) {
    warnOnce(
      'Box:padding:true',
      'Box: setting true on the padding prop is deprecated. Omit it, or set it to undefined instead.'
    )
    padding = defaultPadding
  }
  if (padding === false) {
    warnOnce(
      'Box:padding:false',
      'Box: setting false on the padding prop is deprecated. Use 0.'
    )
    padding = 0
  }

  const contentPadding = padding === undefined ? defaultPadding : padding

  return (
    <Inside name="Box">
      <div
        as={heading ? 'section' : 'div'}
        css={`
          position: relative;
          border-radius: ${RADIUS}px;
          background: ${theme.surface};
          color: ${theme.surfaceContent};
          & + & {
            margin-top: ${2 * GU}px;
          }
        `}
        {...props}
      >
        {heading && (
          <h1
            css={`
              display: flex;
              align-items: center;
              height: ${4 * GU}px;
              padding: 0 ${defaultPadding}px;
              border-bottom: 1px solid ${theme.border};

              // We pass the text style and color to the heading children, so
              // that a node structure can inherit from it. Most components set
              // their color and text style, but it is something to be aware of.
              color: ${theme.surfaceContentSecondary};
              ${textStyle('label2')};
            `}
          >
            <Inside name="Box:heading">{heading}</Inside>
          </h1>
        )}
        <div
          css={`
            padding: ${contentPadding}px;
          `}
        >
          <div>
            <Inside name="Box:content">{children}</Inside>
          </div>
        </div>
      </div>
    </Inside>
  )
}

Box.propTypes = {
  heading: PropTypes.node,
  children: PropTypes.node,
  padding: PropTypes.oneOfType([
    PropTypes.number,

    // deprecated
    PropTypes.bool,
  ]),
}

export default Box
