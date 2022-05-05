import request from '@/utils/request'

//分页获取留言
export function getMessageByPageApi(page = 1, limit = 10, keyword = '') {
  return request(
    {
      url: '/api/message',
      method: 'get',
      params: {
        page,
        limit,
        keyword
      }
    }  
  )
}

//删除留言
export function deleteMessageApi(id) {
    return request(
      {
        url: `/api/message/${id}`,
        method: 'delete',
      }  
    )
  }