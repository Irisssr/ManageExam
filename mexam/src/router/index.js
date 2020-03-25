import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/',
    name:'userlogin',
    component: ()=>import('@/views/Pages/Login/Index.vue'),
    children:[
      {
        path:'login',
        meta:{ title:'登录'},
        component: ()=>import('@/views/Pages/Login/Login.vue')
      }
    ]
  },
  {
    path:'/',
    component:()=>import('@/views/Layout/Main.vue'),
    children:[
      {
        path:'User',
        meta:{ title:'用户管理'},
        component:()=>import('@/views/Pages/User/Index.vue')
      },
      {
        path:'Addr',
        meta:{ title:'系统设置'},
        component:()=>import('@/views/Pages/StudyAdd/Index.vue')
      },
      {
        path:'Exam',
        meta:{ title:'考试信息管理'},
        component:()=>import('@/views/Pages/Exam/Index.vue')
      },
      {
        path:'AddExam',
        meta:{ title:'添加考试'},
        component:()=>import('@/views/Pages/Exam/AddExam.vue') 
      },
      {
        path:'EditExam',
        meta:{ title:'编辑考试'},
        component:()=>import('@/views/Pages/Exam/EditExam.vue') 
      },
      {
        path:'Sign',
        meta:{ title:'报名信息管理'},
        component:()=>import('@/views/Pages/Sign/Index.vue')
      },
      {
        path:'EditSign',
        meta:{ title:'报名信息编辑'},
        component:()=>import('@/views/Pages/Sign/EditSign.vue')
      },
      {
        path:'Grade',
        meta:{ title:'考生成绩信息'},
        component:()=>import('@/views/Pages/Grade/Index.vue')
      },
      {
        path:'Card',
        meta:{ title:'考生准考证信息'},
        component:()=>import('@/views/Pages/Card/Index.vue')
      },
      {
        path:'Info',
        meta:{ title:'考生信息'},
        component:()=>import('@/views/Pages/Info/Index.vue')
      },
      {
        path:'Log',
        meta:{ title:'系统日志'},
        component:()=>import('@/views/Pages/Log/Index.vue')
      }
    ]
  },
  {
    path:'*',
    component:()=>import('@/views/Pages/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async(to,from,next)=>{
    next();
})

export default router
