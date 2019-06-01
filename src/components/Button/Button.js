import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'gatsby'
import styles from './Button.css'

const propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.any,
  kind: PropTypes.oneOf(['blue']),
  style: PropTypes.object,
  /** if href provided to button, button will be a link */
  href: PropTypes.string,
  /** target of href */
  target: PropTypes.string,
}

const defaultProps = {
  kind: 'blue',
}

export default function Button({
  onClick,
  label,
  children,
  kind,
  style,
  href,
  target,
  className
}) {
  const text = label || children
  const classes = classnames(styles[kind], styles.btn, className)
  if (href) {
    return (
      <Link
        className={classes}
        to={href}
        target={target}
        onClick={onClick}
        style={style}
      >
        <span className={styles.background} />
        <span>{text}</span>
      </Link>
    )
  }

  return (
    <button className={classes} onClick={onClick} style={style}>
      <span className={styles.background} />
      <div>{text}</div>
    </button>
  )
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps
