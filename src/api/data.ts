import axios from "utils/api.requset";

export const getUserList = (params :any) =>axios.request({
    url:'get_list',
    method:'get',
    params,
})

export const getTableData =  (params :any)=>axios.request({
    url:'get_table',
    method:'get',
    params,
})