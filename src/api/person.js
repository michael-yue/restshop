import request from '@/utils/request'

export function listAllUser(branchid, status, pagenum, pagesize) {
  return request({
    url: '/restshop/listAllUser?t=' + Date.now(),
    method: 'get',
    params: {
      branchid,
      status,
      pagenum,
      pagesize
    }
  })
}
export function queryUsers(branchid, status, usertype, currentPage, limit) {
  return request({
    url: '/restshop/queryUsers?t=' + Date.now(),
    method: 'get',
    params: {
      branchid,
      status,
      usertype,
      currentPage,
      limit
    }
  })
}

export function approveUser(param) {
  return request({
    url: '/restshop/approveUser?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}
export function deleteUser(param) {
  return request({
    url: '/restshop/deleteUser?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}
// Level

export function addUserType(param) {
  return request({
    url: '/addUserLevel?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}
export function updateUserType(param) {
  return request({
    url: '/updateUserLevel?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}
export function deleteUserType(param) {
  return request({
    url: '/deleteUserLevel?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}
export function listAllUserType() {
  return request({
    url: '/listAllUserLevel?t=' + Date.now(),
    method: 'get'
  })
}

