import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from '@utils/withRouter'
import { Progress, Button } from 'antd'

class NotFound extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="developing notfound">
        <Progress
          type="circle"
          percent={100}
          format={() => '404'}
          width={200}
          status="active"
        />

        <div className="link ptbig">
          <p className="mbbig"><Link to="/">跳转至首页</Link></p>
          <p className="mbbig"><Link to="/login">跳转至登陆页</Link></p>
          <Button type="primary" onClick={() => this.props.history.goBack()}>返回上一页</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(NotFound)
