import React from 'react'
import styles from './Content.css'

const Content = ({ html, title, children }) => {
  let titleRender
  if (title) {
    titleRender = (
      <h1 className={styles.title}>
        {title}
      </h1>
    )
  }
  let contents = (
    <div className={styles.postContent}>
      {children}
    </div>
  )
  if (html) {
    contents = (
      <div
        className={styles.postContent}
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <div className={styles.postPage}>
      <div className={styles.postWrapper}>
        <div className={styles.contentWrapper}>
          {titleRender}
          {contents}
        </div>
      </div>
    </div>
  )
}

export default Content
