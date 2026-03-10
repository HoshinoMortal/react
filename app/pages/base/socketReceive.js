import React, { Component } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'

class SocketReceive extends Component {
  static defaultProps = {
  }

  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() { }

  onClickSend = () => {
  }

  render() {
    return (
      <div className="page">
        socket receive 页面示例
        <div>
          <h5>收到数据：</h5>
          <pre>
            <code>
            </code>
          </pre>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(SocketReceive)
