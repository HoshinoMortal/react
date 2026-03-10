import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from '@utils/withRouter'
import { Menu, Spin } from 'antd'
import { clearGformCache2 } from '@actions/common'

class LeftNav extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      openKeys: [],
      menuStyle: false,
      rootSubmenuKeys: [],
      menu: JSON.parse(sessionStorage.getItem('leftNav')) || [],
    }
  }

  componentDidMount() {
    this.init()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.openKeys(this.props.location.pathname)
    }
  }

  init = () => {
    this.openKeys(this.props.location.pathname)
    const { menu } = this.state
    const arr = []
    menu.map((item, index) => {
      arr.push(`sub${index + 1}`)
    })
    this.setState({ rootSubmenuKeys: arr })
  }

  openKeys = (pathname) => {
    const { menu } = this.state
    const curPath = `${pathname.split('$')[0]}`.replace('/', '')
    if (curPath === '') {
      this.setState({
        openKeys: ['sub1'],
      })
      return
    }
    let count = 0

    jumpOut1:
    for (let i = 0; i < menu.length; i += 1) {
      const item = menu[i]
      count += 1
      if (item.resKey && curPath === item.resKey.split('$')[0].replace('/', '')) {
        break jumpOut1
      } else if (item.children && item.children.length > 0) {
        jumpOut2:
        for (let j = 0; j < item.children.length; j += 1) {
          const record = item.children[j]
          if (item.resKey && curPath === record.resKey.split('$')[0].replace('/', '')) {
            break jumpOut1
          }
        }
      }
    }
    this.setState({
      openKeys: [`sub${count - 1}`],
    })
  }

  _handleClick = (e) => {
    this.props.dispatch(clearGformCache2({}))
    this.props.history.push(`/${e.key}`)
  }

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      })
    }
  }

  navMini = () => {
    this.setState({
      menuStyle: !this.state.menuStyle,
    }, () => {
      this.props.leftNavMode(this.state.menuStyle)
    })
  }

  getMenuItems = () => {
    const { menu } = this.state
    return menu.map((item, index) => {
      if (!item.children || item.children.length === 0) {
        return {
          key: item.resKey ? item.resKey : item.id,
          label: (
            <span>
              <i className={`qqbicon qqbicon-${item.resIcon}`} title={item.resName} />
              <span className="menu-name">{item.resName}</span>
            </span>
          )
        }
      }
      const key = `sub${index}`
      return {
        key,
        label: (
          <span>
            <i className={`qqbicon qqbicon-${item.resIcon}`} title={item.resName} />
            <span className="menu-name">{item.resName}</span>
          </span>
        ),
        children: item.children.map((child, _index) => ({
          key: child.resKey ? child.resKey : child.id,
          label: (
            <span>
              <i className={`qqbicon qqbicon-${child.resIcon}`} title={child.resName} />
              <span className="menu-name">{child.resName}</span>
            </span>
          )
        }))
      }
    })
  }

  leftMenuHighLight = () => {
    const { pathname } = this.props.location
    let selectedKeys = [pathname.replace('/', '')]
    if (pathname === '/' || pathname.indexOf('desk$/index') > -1) {
      selectedKeys = ['desk$/index']
    }
    return selectedKeys
  }

  render() {
    const { openKeys, menuStyle } = this.state
    return (
      <div className={menuStyle ? 'LeftNavMini' : ''}>
        <nav id="mainnav-container" className="mainnav-container">
          <div className="LeftNav-control" onClick={() => this.navMini()}>
            <i className="qqbicon qqbicon-navcontrol" />
          </div>
          <Spin spinning={false}>
            <Menu 
              onClick={this._handleClick}
              theme="dark"
              openKeys={openKeys}
              onOpenChange={this.onOpenChange}
              selectedKeys={this.leftMenuHighLight()}
              mode="inline"
              inlineIndent={16}
              inlineCollapsed={menuStyle}
              items={this.getMenuItems()}
            />
          </Spin>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
})

export default withRouter(connect(mapStateToProps)(LeftNav))
