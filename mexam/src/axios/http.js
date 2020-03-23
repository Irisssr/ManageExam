import axios from 'axios'
import router from '../router';
import { Message} from 'element-ui'

const instance = axios.create()
instance.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=utf-8'

//处理请求
instance.interceptors.request.use(
    config=>{
        const token = sessionStorage.getItem('token');
        token && (config.headers.Authorization =token)

        return config;
    },
    error=>{
        return Promise.reject(error);
    }
)

//处理响应
instance.interceptors.response.use(
    res=>{
        if(res.status === 200){
            return Promise.resolve(res.data);
        }else{
            return Promise.resolve(res);
        }
    },
    error=>{
        const { response } =error;
        if(response.status === 401){
            Message('登录失效，请重新登录');
            router.replace({
                path:'/'
            })
        }
         if(response.status === 409){
            alert(response.data.err_msg);
        }
        return Promise.reject(error);
    }
)

export function uploadFile(url,dataform){
    return axios({
            url:url,
            method:'POST',
            data:dataform,
            contentType:false,
            processData:false,
            headers:{
                'Authorization':sessionStorage.getItem('token')
            }
        })
}

export function downFile(url){
    return axios({
        url:url,
        method:'GET',
        responseType:'blob',
        headers:{
            'Authorization':sessionStorage.getItem('token')
        }
    })
}

export default instance;