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
      url: '/work',
      text: 'Work'
    },
    {
      url: '/talks',
      text: 'Talks'
    },
    {
      url: '/blog',
      text: 'Blog'
    },
    {
      url: '/contact',
      text: 'Contact'
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
          <div className={styles.homeNav}>
            <Link to='/'>
              <h1>
                David Wells
              </h1>
            </Link>
            <h2>Full Stack Developer</h2>
            <h3>Serverless Architectures<br />User Experience & Product</h3>
            <span className={styles.mobileTag}>
              Serverless, User Experience & Product
            </span>
          </div>
          <nav className={styles.links}>
            {children || defaultSidebar()}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
