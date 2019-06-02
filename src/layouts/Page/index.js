import React from 'react'
import ContentLayout from '../ContentLayout'

export default class PageLayout extends React.Component {
  render() {
    return <ContentLayout {...this.props} footer={false} />
  }
}
