import React from 'react'
import Content from '../Content'

export default class PageLayout extends React.Component {
  render() {
    return <Content {...this.props} footer={false} />
  }
}
