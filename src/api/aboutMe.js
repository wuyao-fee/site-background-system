import request from '@/utils/request'

//获取关于我url
export function getAboutMeApi() {
  return request(
    {
      url: '/api/about',
      method: 'get',
    }
  )
}

//设置关于我url
export function updateAboutMeApi(data) {
    return request(
      {
        url: '/api/about',
        method: 'post',
        data
      }
    )
  }