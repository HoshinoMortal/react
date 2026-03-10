import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select, message } from 'antd'
import { regExpConfig } from '@reg'
import Drawer from '@components/draw/draw'
import {
  fetchRoleAdd,
  fetchRoleUpdate,
} from '@apis/manage'

const FormItem = Form.Item
const { Option } = Select

export default function RoleAdd({ visible, onCancel, title, value, type, modifyId, handleOk }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue({
      roleName: value.roleName,
      sort: `${value.sort}`,
      tjFlag: value.tjFlag !== undefined ? String(value.tjFlag) : '1',
    })
  }, [visible, value])

  const handleSubmit = (values) => {
    setLoading(true)
    if (type === 'modify') {
      fetchRoleUpdate({ ...values, id: modifyId }, (res) => {
        message.success(res.msg)
        handleOk(false)
        setLoading(false)
      })
    } else {
      fetchRoleAdd(values, (res) => {
        message.success(res.msg)
        handleOk(false)
        setLoading(false)
      })
    }
  }

  const footer = () => {
    return (
      <div>
        <Button type="primary" onClick={() => form.submit()} loading={loading}>确定</Button>
        <Button onClick={onCancel}>取消</Button>
      </div>
    )
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
  }

  const initialValues = {
    roleName: value.roleName,
    sort: `${value.sort}`,
    tjFlag: value.tjFlag !== undefined ? String(value.tjFlag) : '1',
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
          <FormItem {...formItemLayout} label="角色名称" hasFeedback>
            <Form.Item
              name="roleName"
              rules={[
                { required: true, message: '请输入角色名称' },
              ]}
              noStyle
            >
              <Input placeholder="请输入角色名称" />
            </Form.Item>
          </FormItem>
          <FormItem {...formItemLayout} label="角色排序" hasFeedback>
            <Form.Item
              name="sort"
              rules={[
                { required: true, message: '请输入排序数字' },
                { pattern: regExpConfig.num, message: '请输入数字' },
              ]}
              noStyle
            >
              <Input placeholder="请输入角色排序" />
            </Form.Item>
          </FormItem>
          <FormItem {...formItemLayout} label="是否统计" hasFeedback>
            <Form.Item
              name="tjFlag"
              rules={[
                { required: true, message: '请选择是否统计' },
              ]}
              noStyle
            >
              <Select placeholder="选择是否统计">
                <Option value="0">否</Option>
                <Option value="1">是</Option>
              </Select>
            </Form.Item>
          </FormItem>
          <Button className="hide" type="primary" htmlType="submit">确定</Button>
        </Form>
      </div>
    </Drawer>
  )
}
