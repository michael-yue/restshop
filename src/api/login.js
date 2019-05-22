import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/restshop/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function updatePassword(username, password) {
  return request({
    url: '/updatepassword',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function updateNormalPassword(username, password, newpassword) {
  return request({
    url: '/updateNormalPassword',
    method: 'post',
    data: {
      username,
      password,
      newpassword
    }
  })
}
export function getInfo(token) {
  return request({
    url: '/api/userinfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'post',
    data: { }
  })
}
