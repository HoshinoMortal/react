import * as common from '@apis/common'
import { createAjaxAction } from '@configs/common'
import { requestLogin, receiveLogin } from '@reducers/common'
import { setGformCache2, clearGformCache2 } from '@reducers/common'

export const login = createAjaxAction(common.login, requestLogin, receiveLogin)

export { setGformCache2, clearGformCache2 }
