import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spin, Form, Input, Button, Row, Col, message } from 'antd'
import { regExpConfig } from '@reg'
import { brandName } from '@config'
import { clearGformCache2 } from '@actions/common'
import { menu, staff, login } from '@apis/common'
import Logo from '@components/logo/logo'
import md5 from 'md5'

import '@styles/login.less'

function Login() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(true)

  function handleSubmit(values) {
    console.log('handleSubmit 被调用, values:', values)
    form.validateFields().then((formValues) => {
      console.log('表单验证成功, formValues:', formValues)
      setLoading(true)
      formValues.password = md5(formValues.password)
      console.log('准备调用登录接口, 登录数据:', formValues)
      login(formValues, (res) => {
        console.log('登录成功, res:', res)
        sessionStorage.setItem('token', res.data.token)
        sessionStorage.setItem('ticket', res.data.ticket)
        console.log('准备调用菜单接口')
        menu({}, (response) => {
          console.log('菜单接口成功, response:', response)
          const nav = response.data.list || []
          if (nav && nav[0]) {
            sessionStorage.setItem('gMenuList', JSON.stringify(nav))
            sessionStorage.setItem('topMenuReskey', nav[0].resKey)
            sessionStorage.setItem('leftNav', JSON.stringify(nav))

            console.log('准备调用用户信息接口')
            staff({ usercode: formValues.username }, (resp) => {
              console.log('用户信息接口成功, resp:', resp)
              sessionStorage.setItem('userinfo', JSON.stringify(resp.data))
              console.log('准备跳转到首页')
              navigate('/')
            }, (r) => {
              console.error('用户信息接口失败, r:', r)
              message.warning(r.msg)
              setLoading(false)
            })
          }
        }, (r) => {
          console.error('菜单接口失败, r:', r)
          setLoading(false)
        })
      }, (res) => {
        console.error('登录接口失败, res:', res)
        message.warning(res.msg)
        setLoading(false)
      })
    }).catch((error) => {
      console.error('表单验证失败:', error)
      message.error('请检查输入信息')
      setLoading(false)
    })
  }

  return (
    <div className="login-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="extraLink" />
      <div className="flexcolumn" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="login-header" key="header" style={{ flex: 3, background: '#2d333e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', letterSpacing: '10px', position: 'relative' }}>
          <div className="slogan" style={{ position: 'absolute', zIndex: 1000, bottom: '40px', marginTop: '-10px', width: '100%', left: 0 }}>
            <div className="flexcolumn">
              {show ? [
                <p key="0" className="title" style={{ fontSize: '50px' }}>{brandName}</p>,
              ] : null}
            </div>
          </div>
          <Logo />
        </div>
        <div className="login-main" style={{ flex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div>
            {show ? [
              <Row key="row0">
                <Col span={8} />
                <Col span={8}>
                  <Spin spinning={loading}>
                    <Form 
                      form={form} 
                      onFinish={(values) => {
                        console.log('Form onFinish 被触发, values:', values)
                        handleSubmit(values)
                      }}
                      onValuesChange={(changedValues) => {
                        console.log('表单值变化:', changedValues)
                      }}
                      initialValues={{ username: 'username', password: '123456' }}
                    >
                      <Form.Item name="username" rules={[
                        {
                          required: true, min: 4, max: 10, message: '用户名为4-10个字符',
                        },
                        { pattern: regExpConfig.policeNo, message: '账号4-10位数字或字母组成' },
                      ]}>
                        <Input placeholder="请输入用户名" type="text" />
                      </Form.Item>
                      <Form.Item name="password" rules={[
                        {
                          required: true, min: 6, max: 16, message: '密码为6-16个字符',
                        },
                        { pattern: regExpConfig.pwd, message: '密码由6-16位数字或者字母组成' },
                      ]}>
                        <Input placeholder="请输入密码" type="password" />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" className="cert-btn">登录</Button>
                      </Form.Item>
                    </Form>
                  </Spin>
                </Col>
                <Col span={8} />
              </Row>,
            ] : null}
          </div>
        </div>
        <div className="login-footer">
          {show ? [
            <p key="0"> 浙江xxxxxxxxxx有限公司 </p>,
          ] : null}
        </div>
      </div>
    </div>
  )
}

export default Login
