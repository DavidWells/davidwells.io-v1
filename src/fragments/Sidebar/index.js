import React from 'react'
import { Link } from 'gatsby'
import styles from './Sidebar.css'

/* global window */

const defaultSidebar = () => {
  let path = ''
  if (typeof window !== 'undefined') {
    path = (window.location.pathname === '/') ? '//' : window.location.pathname
  }

  const links = [
    {
      url: '/',
      text: 'What are functions?'
    },
    {
      url: '/examples',
      text: 'Examples'
    },
    {
      url: '/tutorials',
      text: 'Tutorials'
    },
  ]

  return links.map((link) => {
    const { url, text } = link
    const classes = (path.replace(/\/$/, '') === url) ? styles.active : ''
    if (url.match((/^http/))) {
      return (
        <a href={url} target='_blank' rel='noopener noreferrer' key={url}>
          {text}
        </a>
      )
    }
    return (
      <Link to={url} className={classes} key={url}>
        {text}
      </Link>
    )
  })
}

const Sidebar = ({ children }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarFixed}>
        <div className={styles.sidebarInner}>
          <Link to='/'>
            Homepage
          </Link>
          <nav className={styles.links}>
            {children || defaultSidebar()}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
