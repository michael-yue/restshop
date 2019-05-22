import request from '@/utils/request'

export function payQrcode(param) {
  return request({
    url: '/restshop/payQrcode?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}