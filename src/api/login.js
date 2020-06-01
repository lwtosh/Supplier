import request from '@/utils/request'

export function login(username, password,captcha) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password,
      captcha
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
