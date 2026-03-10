import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Tabs } from 'antd'
import { updateTabChecked, deleteTabFromList } from '@actions/tabList'

function TabList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const tabList = useSelector((state) => state.tabListResult)

  const onChange = useCallback((activeKey) => {
    dispatch(updateTabChecked({ activeKey }))
    navigate(activeKey)
  }, [dispatch, navigate])

  const onEdit = useCallback((targetKey, action) => {
    if (action === 'remove') {
      remove(targetKey)
    }
  }, [])

  const remove = useCallback((targetKey) => {
    let delIndex
    let activeKey

    if (targetKey === tabList.activeKey) {
      tabList.list.map((tab, index) => {
        if (tab.key === targetKey) {
          delIndex = index
        }
      })
      activeKey = tabList.list[delIndex + 1] ?
        tabList.list[delIndex + 1].key : (tabList.list[delIndex - 1] ?
          tabList.list[delIndex - 1].key : '')
      navigate(activeKey)
    }
    dispatch(deleteTabFromList({ targetKey }))
  }, [tabList, navigate, dispatch])

  const items = tabList.list.map(tab => ({
    key: tab.key,
    label: tab.title,
    children: tab.content,
  }))

  return (
    <Tabs
      hideAdd
      onChange={onChange}
      activeKey={tabList.activeKey}
      type="editable-card"
      onEdit={onEdit}
      items={items}
    />
  )
}

export default TabList
