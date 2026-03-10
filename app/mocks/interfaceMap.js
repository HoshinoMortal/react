const path = '/mock'

import base from './apis/base/index.js'
import userManage from './apis/sys/userManage/index.js'
import roleManage from './apis/sys/roleManage/index.js'
import moduleManage from './apis/sys/moduleManage/index.js'

export default {
  [`${path}/usercenter/login`]: base.login,
  [`${path}/usercenter/user/userMenu`]: base.menu,
  [`${path}/usercenter/user/userInfo`]: base.staff,
  [`${path}/usercenter/logout`]: base.logout,
  [`${path}/usercenter/role/list`]: userManage.fetchRoleList,
  [`${path}/usercenter/dept/list`]: userManage.fetchUserDepttList,
  [`${path}/usercenter/user/list`]: userManage.fetchUserList,
  [`${path}/usercenter/user/detail`]: userManage.fetchUserDetail,
  [`${path}/usercenter/user/update`]: userManage.fetchUserDetailUpdate,
  [`${path}/usercenter/user/save`]: userManage.fetchUserAdd,
  [`${path}/usercenter/user/synUser`]: userManage.synUser,
  [`${path}/usercenter/user/updateRole`]: userManage.fetchUserSetRole,
  [`${path}/usercenter/user/delete`]: userManage.fetchUserDelete,
  [`${path}/usercenter/user/updateStatus`]: userManage.fetchChangeUserStatus,
  [`${path}/usercenter/role/save`]: roleManage.fetchRoleAdd,
  [`${path}/usercenter/role/delete`]: roleManage.fetchRoleDelete,
  [`${path}/usercenter/role/update`]: roleManage.fetchRoleUpdate,
  [`${path}/usercenter/role/resTree`]: roleManage.fetchTreeList,
  [`${path}/usercenter/role/resList`]: roleManage.fetchModuleListInRole,
  [`${path}/usercenter/role/detail`]: roleManage.fetchRoleDetail,
  [`${path}/usercenter/resource/button/list`]: roleManage.fetchButtonList,
  [`${path}/usercenter/user/removeRole`]: roleManage.fetchRoleDeletePeople,
  [`${path}/usercenter/role/updateButton`]: roleManage.fetchUpdateButton,
  [`${path}/usercenter/role/updateRes`]: roleManage.fetchUpdateRoleRes,
  [`${path}/usercenter/resource/list`]: moduleManage.fetchModuleList,
  [`${path}/usercenter/resource/delete`]: moduleManage.fetchModuleDelete,
  [`${path}/usercenter/resource/detail`]: moduleManage.fetchModuleDetail,
  [`${path}/usercenter/resource/updateStatus`]: moduleManage.fetchChangeModuleStatus,
  [`${path}/usercenter/resource/update`]: moduleManage.fetchModuleUpdateDetail,
  [`${path}/usercenter/resource/save`]: moduleManage.fetchModuleAdd,
}
