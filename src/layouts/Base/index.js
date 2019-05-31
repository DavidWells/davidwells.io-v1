import React from 'react'
import Icon from '../../components/Icon'
import '../../styles.global.css'

export default class Base extends React.Component {
  componentDidMount() {
    Icon.loadSprite()
  }
  render() {
    const { children, className } = this.props
    return (
      <div className={className}>
        {children}
      </div>
    )
  }
}

/*
<Helmet>
  <meta name='description' content={config.siteDescription} />
</Helmet>
 */
