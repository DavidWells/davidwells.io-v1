import React from 'react'
import Content from '../Content'

const PostLayout = (props) => {
  return (
    <Content {...props} comments />
  )
}

export default PostLayout
