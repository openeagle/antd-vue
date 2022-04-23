import Mock from 'mockjs';

export const TableList = (pagination :any) => {
  return Mock.mock({
    total: 98,
    [`data|${(pagination && pagination.pageSize) || 10}`]: [
      {
        'id|+1': pagination?.current
          ? (pagination.current - 1) * pagination.pageSize + 1
          : 1,
        name: '@cname',
        sex: '男',
        'age|1-100': 1,
        'consumption|1-10000': 0,
        email: '@email',
        address: '@ctitle',
        contry: '@ctitle',
        province: '@ctitle',
        city: '@ctitle',
        school: '@ctitle',
      },
    ],
  })
}

