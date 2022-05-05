import request from '@/utils/request'

//获取全部评论
export function getCommentByPageApi(page = 1, limit = 10, blogid = -1, keyword = '') {
  return request(
    {
      url: '/api/comment',
      method: 'get',
      params: {
        page,
        limit,
        blogid,
        keyword
      }
    }  
  )
}

//删除评论
export function deleteCommentApi(id) {
  return request(
    {
      url: `/api/comment/${id}`,
      method: 'delete',
    }  
  )	
}