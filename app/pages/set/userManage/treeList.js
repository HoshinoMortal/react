
import React, { Component } from 'react'
import { Tree } from 'antd'

export default class TreeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // expandedKeys: ['123'],
      defaultExpandedKeys: ['123'],
      deptCode: props.curDeptCode,
    }
    this.handleOnSelect = this.handleOnSelect.bind(this)
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    if (prevProps.curDeptCode !== this.props.curDeptCode) {
      this.setState({ deptCode: this.props.curDeptCode })
    }
  }


  // 展开事件
  onExpand = (expandedKeys) => {
    this.setState({ expandedKeys })
  }

  // 选中事件
  handleOnSelect = (selectedKeys, info) => {
    if (info && info.selectedNodes && info.selectedNodes[0] && info.selectedNodes[0].title) {
      const { title } = info.selectedNodes[0]
      this.props.onSelect(selectedKeys, title)
    } else {
      this.props.onSelect()
    }
  }

  // 转换树形数据
  getTreeData = (data = []) => {
    return data.map((item) => {
      if (item.children && item.children.length) {
        return {
          key: item.deptCode,
          title: item.deptName,
          children: this.getTreeData(item.children)
        }
      }
      return {
        key: item.deptCode,
        title: item.deptName
      }
    })
  }

  render() {
    const { trees } = this.props
    const treeData = this.getTreeData(trees)
    const selectedKeys = this.state.deptCode ? [this.state.deptCode] : []

    return (
      <div>
        <Tree
          onSelect={this.handleOnSelect}
          onExpand={this.onExpand}
          defaultExpandedKeys={this.state.defaultExpandedKeys}
          selectedKeys={selectedKeys}
          treeData={treeData}
        />
      </div>
    )
  }
}
