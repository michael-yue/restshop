import request from '@/utils/request'

export function getTransSummary(branchid, startdate, enddate) {
  return request({
    url: '/restshop/getTransSummary',
    method: 'get',
    params: {
      branchid,
      startdate,
      enddate
    }
  })
}

export function getTransList(branchid, startdate, enddate, pagenum, pagesize) {
  return request({
    url: '/restshop/getTransList',
    method: 'get',
    params: {
      branchid,
      startdate,
      enddate,
      pagenum,
      pagesize
    }
  })
}

export function deleteTrans(param) {
  return request({
    url: '/restshop/deleteTrans',
    method: 'post',
    data: {
      param
    }
  })
}

export function getScheduleSummary(repdate, commited) {
  return request({
    url: '/restshop/getScheduleSummary',
    method: 'get',
    params: {
      repdate,
      commited
    }
  })
}