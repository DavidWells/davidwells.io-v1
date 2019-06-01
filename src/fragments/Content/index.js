import React from 'react'
import styles from './Content.css'

const Content = ({ html, title }) => {
  return (
    <div className={styles.postPage}>
      <div className={styles.postWrapper}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>
            {title}
          </h1>
          <div
            className={styles.postContent}
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  )
}

export default Content
