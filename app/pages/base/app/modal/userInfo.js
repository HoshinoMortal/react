import React, { useState } from 'react'
import { Form, Button, Input, message } from 'antd'
import { regExpConfig } from '@configs/regular.config'
import Drawer from '@components/draw/draw'
import md5 from 'md5'
import { updatePwd } from '@apis/common'
import '@styles/personalCenter.less'

const FormItem = Form.Item

export default function UserInfo({ handleLogout, onCancel }) {
  const [form] = Form.useForm()
  const [pswFlag, setPswFlag] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  const checkNewPassword = (rule, value) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject(new Error('两次密码输入不一致'))
    }
    return Promise.resolve()
  }

  const checkRepeatPassword = (rule, value) => {
    if (value && value === form.getFieldValue('oldPass')) {
      return Promise.reject(new Error('原始密码和修改密码不能一致'))
    }
    return Promise.resolve()
  }

  const handleSubmit = (values) => {
    setSubmitLoading(true)
    const p = md5(values.password)
    const o = md5(values.oldPass)

    updatePwd(
      {
        password: p,
        oldPassword: o,
      }, (res) => {
        message.info(res.msg)
        setSubmitLoading(false)
      },
      (res) => {
        message.error(res.msg)
        setSubmitLoading(false)
      },
    )
  }

  const footer = () => (
    <div>
      <div className="gout-btn"><Button type="primary" onClick={handleLogout}>退出</Button></div>
    </div>
  )

  const userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  }
  let roles = ''
  userinfo && userinfo.roles.map((item, index) => {
    roles += `${item.roleName}，`
  })
  roles = roles.substring(0, roles.length - 1)

  return (
    <Drawer
      visible
      className="drawer-sm"
      title="用户信息"
      onCancel={onCancel}
      footer={footer()}
    >
      <div className="user">
        <div className="user-img"><img src="" alt="" /></div>
        <div className="user-info">
          <ul>
            <li><span>姓名</span><b>{userinfo.chineseName}</b></li>
            <li><span>手机号</span><b>{userinfo.phoneNo}</b></li>
            <li><span>短号</span><b>{userinfo.shortPhoneNo}</b></li>
            <li><span>单位</span><b>{userinfo.deptName}</b></li>
            <li><span>职务</span><b>{userinfo.post}</b></li>
            <li><span>用户角色</span><b>{roles}</b></li>
            <li className="changePsw_in"><span>修改密码</span><i className="enter" onClick={() => setPswFlag(true)}>修改</i></li>
            {pswFlag ?
              <div className="changePswWrap">
                <div className="changePsw">
                  <div className="changePsw_title">修改密码</div>
                  <Form
                    form={form}
                    layout="horizontal"
                    onFinish={handleSubmit}
                  >
                    <FormItem {...formItemLayout} label="原密码" name="oldPass" hasFeedback rules={[
                      { required: true, message: '请输入原密码' },
                      { pattern: regExpConfig.pwd, message: '密码由6-16位数字或者字母组成' },
                    ]}>
                      <Input placeholder="请输入原密码" type="password" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="新密码" name="password" hasFeedback rules={[
                      { required: true, message: '请输入新密码' },
                      { pattern: regExpConfig.pwd, message: '密码由6-16位数字或者字母组成' },
                      { validator: checkRepeatPassword },
                    ]}>
                      <Input placeholder="请输入新密码" type="password" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="确认新密码" name="checkPass" hasFeedback rules={[
                      { required: true, message: '确认新密码' },
                      { validator: checkNewPassword },
                    ]}>
                      <Input placeholder="确认新密码" type="password" />
                    </FormItem>
                    <div className="changePsw_btngroup">
                      <Button type="primary" htmlType="submit" loading={submitLoading}>确定</Button>
                      <Button type="defalut" htmlType="reset" onClick={() => setPswFlag(false)}>取消</Button>
                    </div>
                  </Form>
                </div>
              </div>
              : ''}
          </ul>
        </div>
      </div>
    </Drawer>
  )
}
