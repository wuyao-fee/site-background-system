import request from '@/utils/request'

//获取全局配置信息
export function getSetUpApi() {
  return request(
    {
      url: '/api/setting',
      method: 'get',
    }
  )
}


//修改全局配置信息
export function updateSetUpApi(data) {
  return request(
    {
      url: '/api/setting',
      method: 'put',
      data
    }
  )
}