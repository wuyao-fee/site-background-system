import request from '@/utils/request'

//分页获取博客列表
export function getBlogListByPageApi(page = 1, limit = 5) {
  return request(
    {
      url: '/api/blog',
      method: 'get',
      params: {
          page,
          limit
      }
    }
  )
}

//删除某个博客
export function deleteBlogByIdApi(id) {
  return request(
    {
      url: `/api/blog/${id}`,
      method: 'delete',
    }
  )
}

//添加博客文章
export function addBlogApi(data) {
  return request(
    {
      url: '/api/blog',
      method: 'post',
      data
    }
  )
}

//更新博客文章
export function updateBlogApi(blogInfo) {
  return request(
    {
      url: `/api/blog/${blogInfo.id}`,
      method: 'put',
      data: blogInfo.data
    }
  )
}

//根据id获取博客
export function getBlogByIdApi(id) {
  return request(
    {
      url: `/api/blog/${id}`,
      method: 'get'
    }
  )
}




//获取文章分类
export function getBlogTypeApi() {
  return request(
    {
      url: '/api/blogtype',
      method: 'get'
    }
  )
}

//获取一个分类
export function getOneBlogTypeApi(id) {
  return request(
    {
      url: `/api/blogtype/${id}`,
      method: 'get'
    }
  )
}

//添加文章分类
export function addBlogTypeApi(data) {
  return request(
    {
      url: '/api/blogtype',
      method: 'post',
      data
    }
  )
}

//修改分类
export function updateOneBlogClassifyApi(editInfo) {
  return request(
    {
      url: `/api/blogtype/${editInfo.id}`,
      method: 'put',
      data: editInfo.data
    }
  )
}

//删除分类
export function deleteBlogClassifyApi(id) {
  return request(
    {
      url: `/api/blogtype/${id}`,
      method: 'delete'
    }
  )
}