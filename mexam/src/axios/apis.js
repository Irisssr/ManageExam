import base from './base' 
import axios from './http'
import QS from 'qs'
import { uploadFile } from './http'

let apis={}

// 获取准考证信息
apis.admission=(params)=>{ return axios.get(`${ base.url}/admin/admission`,{params:params})}
//导入准考证信息
apis.upadmission=(params)=>{ return uploadFile(`${ base.url}/admin/admission/upload`,params)}
//设置某一次所有考生准考证打印状态
apis.statusadmission=(params)=>{ return axios.put(`${ base.url}/admin/admission/status`,QS.stringify(params))};

//登录
apis.login=(params)=>{ return axios.post(`${ base.url}/auth/login`,QS.stringify(params))};
//注册
apis.register=(params)=>{ return axios.post(`${ base.url}/auth/register`,QS.stringify(params))};
//获取手机验证码
apis.code = (params)=>{ return axios.post(`${ base.url}/auth/code`,QS.stringify(params))};
//验证用户是否已经存在
apis.check =(params)=>{ return axios.get(`${ base.url}/auth/check`,{ params:params})}

//考生信息
apis.getinfo=(params)=>{ return axios.get(`${ base.url}/admin/info`,{ params:params})};
//更新考生信息
apis.putinfo=(params1,params2)=>{ return axios.put(`${ base.url}/admin/info/${params1}`,QS.stringify(params2))};
//删除考生信息
apis.delinfo=(params)=>{ return axios.delete(`${ base.url}/admin/info/${params}`)};

//报名信息
apis.getSign=(params)=>{ return axios.get(`${ base.url}/admin/sign`,{ params:params})};
//导出当前条件下的所有报名信息
apis.downSign=(params)=>{ return axios.get(`${ base.url}/admin/sign/download`,{ params:params})};
//更新报名信息
apis.putSign=(params,params2)=>{ return axios.put(`${ base.url}/admin/sign/${params}`,QS.stringify(params2))};
//删除报名信息
apis.deleteSign=(params)=>{ return axios.delete(`${ base.url}/admin/sign/${params}`)};
//导入excel文件进行批量更新
apis.upsign=(params)=>{ return uploadFile(`${ base.url}/admin/sign/upload`,params)}

//获取所有考试报名信息
apis.getExam=(params)=>{ return axios.get(`${base.url}/admin/exam`,{ params:params})};
//发布考试信息
apis.postExam=(params)=>{  return axios.post(`${base.url}/admin/exam`,QS.stringify(params))}
//更新考试信息
apis.updateExam=(params)=>{ return axios.put(`${ base.url}/admin/exam`,QS.stringify(params))};
//删除考试信息
apis.delExam=(params)=>{ return axios.delete(`${ base.url}/admin/exam/${params}`)}

// 获取考试成绩
apis.getgrade=(params)=>{ return axios.get(`${ base.url}/admin/grade`,{params:params})};
//更新某一个考生的成绩
apis.putgrade=(params)=>{ return axios.put(`${ base.url}/admin/grade`,QS.stringify(params))};
//删除某一项
apis.gradedel=(params)=>{ return axios.delete(`${ base.url}/admin/grade/${params}`)}
// 导入考生成绩
apis.upgrade=(params)=>{ return uploadFile(`${ base.url}/admin/grade/upload`,params)};

// 系统用户信息
apis.aduser=(params)=>{ return axios.get(`${base.url}/admin/user`,{ params:params})}
//更新用户账号
apis.upaduser=(params1,params2)=>{ return axios.put(`${base.url}/admin/user/${params1}`,QS.stringify(params2))};

// 教学点设置
apis.addr=(params)=>{ return axios.get(`${base.url}/admin/addr`,{ params:params})}
// 教学点添加
apis.adaddr=(params)=>{ return axios.post(`${base.url}/admin/addr`,QS.stringify(params))}
// 教学点删除
apis.deladdr=(params)=>{ return axios.delete(`${base.url}/admin/addr/${params}`)};

// 系统日志
apis.adlog=(params)=>{ return axios.get(`${ base.url}/admin/log`,{ params:params})};

//下拉考次
apis.listid=(params)=>{ return axios.get(`${ base.url}/public/exam/list`,{ params:params})}

export default apis;