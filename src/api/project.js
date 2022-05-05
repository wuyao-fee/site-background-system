import request from '@/utils/request'

//获取全部项目
export async function getProjectListApi() {
  return await request(
    {
      url: '/api/project',
      method: 'get',
    }
  )
}

//添加项目
export function addProjectApi(data) {
  return request(
    {
      url: '/api/project',
      method: 'post',
      data
    }
  )
}

//更新项目
export function upadateProjectApi(projectInfo) {
  return request(
    {
      url: `/api/project/${projectInfo.id}`,
      method: 'put',
      data: projectInfo.data
    }
  )
}

//删除项目
export function deleteProjectApi(id) {
  return request(
    {
      url: `/api/project/${id}`,
      method: 'delete',
    }
  )
}