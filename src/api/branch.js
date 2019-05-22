import request from '@/utils/request'

// Branch
export function getBranches() {
  return request({
    url: '/restshop/listAllBranches?t=' + Date.now(),
    method: 'get'
  })
}

export function listAllBranches(typeid, currentPage, limit) {
  return request({
    url: '/restshop/listAllBranches?t=' + Date.now(),
    method: 'get',
    params: {
      typeid,
      currentPage,
      limit
    }
  })
}
export function addBranch(param) {
  return request({
    url: '/restshop/addBranch?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}
export function updateBranch(param) {
  return request({
    url: '/restshop/updateBranch?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}
export function deleteBranch(param) {
  return request({
    url: '/deleteBranch?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}

// UserType
export function getUserTypes() {
  return request({
    url: '/restshop/listAllUserType?t=' + Date.now(),
    method: 'get'
  })
}

export function listAllUserType() {
  return request({
    url: '/restshop/listAllUserType?t=' + Date.now(),
    method: 'get'
  })
}
export function addUserType(param) {
  return request({
    url: '/restshop/addUserType?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}
export function updateUserType(param) {
  return request({
    url: '/restshop/updateUserType?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}
export function deleteUserType(param) {
  return request({
    url: '/deleteUserType?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}
