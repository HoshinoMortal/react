import React, { useState, useEffect } from 'react'
import { Button, Form, Input, message, Select } from 'antd'
import { regExpConfig } from '@reg'
import Drawer from '@components/draw/draw'
import {
  fetchUserDetailUpdate,
  fetchUserAdd,
} from '@apis/manage'

const FormItem = Form.Item
const { Option } = Select

export default function AddPolice({ visible, onCancel, title, roleList, values, type, deptId, currPeopleId, handleOk }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    form.resetFields()
  }, [visible])

  const handleSubmit = (formValues) => {
    setLoading(true)
    if (type === 'edit') {
      fetchUserDetailUpdate({ ...formValues, deptCode: deptId, id: currPeopleId }, (res) => {
        message.success(res.msg)
        setLoading(false)
        handleOk()
      }, (errorRes) => {
        message.warning(errorRes.msg)
        setLoading(false)
      })
    } else {
      fetchUserAdd({ ...formValues, deptCode: deptId }, (res) => {
        message.success(res.msg)
        setLoading(false)
        handleOk()
      }, (errorRes) => {
        message.warning(errorRes.msg)
        setLoading(false)
      })
    }
  }

  const footer = () => (
    <div>
      <Button type="primary" onClick={() => form.submit()} loading={loading}>确定</Button>
      <Button onClick={onCancel}>取消</Button>
    </div>
  )

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
  }

  const initialValues = {
    chineseName: values.chineseName || '',
    idcardNo: values.idcardNo || '',
    policeCode: values.policeCode || '',
    username: values.username || '',
    password: values.password || '',
    phoneNo: values.phoneNo || '',
    shortPhoneNo: values.shortPhoneNo || '',
    post: values.post || '',
    roleIds: (values.roleIds || []).map(item => String(item)),
  }

  return (
    <Drawer
      visible={visible}
      title={title}
      onCancel={onCancel}
      footer={footer()}
      className="modal-header modal-body"
    >
      <div className="modalcontent">
        <Form
          form={form}
          layout="horizontal"
          onFinish={handleSubmit}
          initialValues={initialValues}
        >
          <FormItem {...formItemLayout} label="名称" name="chineseName" hasFeedback rules={[
            { required: true, message: '请输入名称' },
          ]}>
            <Input placeholder="请输入名称" />
          </FormItem>
          <FormItem {...formItemLayout} label="身份证" name="idcardNo" hasFeedback rules={[
            { required: true, message: '请输入身份证号' },
            { pattern: regExpConfig.IDcard, message: '身份证号格式不正确' },
          ]}>
            <Input placeholder="请输入身份证号" disabled={type === 'edit'} />
          </FormItem>
          <FormItem {...formItemLayout} label="警号" name="policeCode" hasFeedback rules={[
          ]}>
            <Input placeholder="请输入警号" />
          </FormItem>
          <FormItem {...formItemLayout} label="登陆用户名" name="username" hasFeedback rules={[
            { required: true, message: '请输入4-10位数字或字母' },
            { pattern: regExpConfig.policeNo, message: '请输入4-10位数字或字母' },
          ]}>
            <Input placeholder="请输入登陆用户名" disabled={type === 'edit'} />
          </FormItem>
          <FormItem style={{ position: 'absolute', zIndex: -10 }}><input type="password" /></FormItem>
          {type === 'edit' ? (
            <FormItem {...formItemLayout} label="修改密码" name="password" rules={[
              { pattern: regExpConfig.pwd, message: '请输入6-16位数字或者字母' },
            ]}>
              <Input type="password" placeholder="不改密码此项为空" />
            </FormItem>
          ) : (
            <FormItem {...formItemLayout} label="登陆密码" name="password" hasFeedback rules={[
              { required: true, message: '密码请输入6-16位数字或者字母' },
              { pattern: regExpConfig.pwd, message: '密码请输入6-16位数字或者字母' },
            ]}>
              <Input placeholder="请输入密码" type="password" />
            </FormItem>
          )}
          <FormItem {...formItemLayout} label="手机号码" name="phoneNo" hasFeedback rules={[
            { required: true, message: '请输入手机号码' },
            { pattern: regExpConfig.mobile, message: '手机号码格式不正确' },
          ]}>
            <Input placeholder="请输入手机号码" />
          </FormItem>
          <FormItem {...formItemLayout} label="手机短号" name="shortPhoneNo" hasFeedback>
            <Input placeholder="请输入手机短号" />
          </FormItem>
          <FormItem {...formItemLayout} label="职务" name="post" hasFeedback>
            <Input placeholder="请输入职务" />
          </FormItem>
          <FormItem {...formItemLayout} label="角色" name="roleIds" hasFeedback rules={[
            { required: true, message: '请选择用户的角色' },
          ]}>
            <Select
              mode="multiple"
              placeholder="请选择用户的角色"
              showSearch
            >
              {roleList.map(item => <Option key={item.roleName} value={`${item.id}`}>{item.roleName}</Option>)}
            </Select>
          </FormItem>
          <Button className="hide" type="primary" htmlType="submit">确定</Button>
        </Form>
      </div>
    </Drawer>
  )
}
