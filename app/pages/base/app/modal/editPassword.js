import React, { useState } from 'react'
import { Button, Form, Input, Modal, Row, Col, message } from 'antd'
import { regExpConfig } from '@reg'
import md5 from 'md5'
import { updatePwd } from '@apis/common'

const FormItem = Form.Item

export default function EditPassword({ visible, onCancel }) {
  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [confirmDirty, setConfirmDirty] = useState(false)

  const handleSubmit = (values) => {
    const data = {
      oldPwd: values.oldPwd || '',
      password: values.password ? md5(values.password) : '',
    }
    setSubmitLoading(true)
    updatePwd(data, (res) => {
      message.success(res.msg)
      setSubmitLoading(false)
      onCancel()
    }, (res) => {
      message.warning(res.msg)
      form.resetFields()
      setSubmitLoading(false)
    })
  }

  const checkPassword = (rule, value) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject(new Error('两次输入的密码不一致'))
    }
    return Promise.resolve()
  }

  const checkConfirm = (rule, value) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    return Promise.resolve()
  }

  const renderFooter = () => (
    <div>
      <Button type="primary" size="large" onClick={() => form.submit()} loading={submitLoading}>确定</Button>
      <Button size="large" onClick={onCancel}>取消</Button>
    </div>
  )

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
    hasFeedback: true,
  }

  return (
    <Modal
      className=""
      visible={visible}
      title="修改密码"
      onCancel={onCancel}
      footer={renderFooter()}
    >
      <div className="modalcontent">
        <Form
          form={form}
          layout="horizontal"
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout} label="原密码" name="oldPwd" rules={[
                { required: true, message: '请输入密码！' },
                { pattern: regExpConfig.pwd, message: '请输入6-16位数字或者字母!' },
                { validator: checkConfirm },
              ]}>
                <Input type="password" placeholder="请输入密码" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout} label="新密码" name="password" rules={[
                { required: true, message: '请输入密码！' },
                { pattern: regExpConfig.pwd, message: '请输入6-16位数字或者字母!' },
                { validator: checkConfirm },
              ]}>
                <Input type="password" placeholder="请输入密码" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout} label="确认新密码" name="confirm" rules={[
                { required: true, message: '请输入密码！' },
                { pattern: regExpConfig.pwd, message: '请输入6-16位数字或者字母!' },
                { validator: checkPassword },
              ]}>
                <Input type="password" placeholder="请输入密码" />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  )
}
