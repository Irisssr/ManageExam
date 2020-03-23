import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    userInfo:{},
    collapse:false,
    visitedViews:[],
    tagsList:[],
    examsList:[],
    items:[
      // {
      //     icon: 'el-icon-house',
      //     path: 'Index',
      //     title: '系统首页'
      // },
      {
        icon: 'el-icon-postcard',
        path: 'User',
        title: '用户管理'
      },
      {
          icon: 'el-icon-postcard',
          path: 'Exam',
          title: '考试管理',
          subs:[
              {
                  icon:'el-icon-s-custom',
                  path:'Exam',
                  title:'考试信息'
              },
              {
                  icon:'el-icon-user-solid',
                  path:'AddExam',
                  title:'发布考试信息'
              },
              {
                icon: 'el-icon-postcard',
                path: 'Addr',
                title: '教学点设置'
              }
          ]
      },
      {
        icon: 'el-icon-postcard',
        path: 'Info',
        title: '考生管理',
        subs:[
          {
            icon: 'el-icon-postcard',
            path: 'Info',
            title: '考生信息'
          },
          {
            icon: 'el-icon-postcard',
            path: 'Sign',
            title: '考生报名信息'
          },
          {
            icon: 'el-icon-house',
            path: 'Grade',
            title: '考生成绩信息'
          },
          {
            icon: 'el-icon-postcard',
            path: 'Card',
            title: '考生准考证管理'
          }
        ]
      },
      {
        icon: 'el-icon-postcard',
        path: 'Log',
        title: '系统日志'
      }
  ]
  },
  mutations: {
    getExamList(state,data){
      console.log(data)
      state.examsList=data;
    },
    changeCollpase(state){
      state.collapse=!state.collapse
    },
    addTags(state,route){
      state.tagsList.push(route)
    },
    clearAll(state){
      state.tagsList=[]
    },
    clearOther(state,route){
      state.tagsList=state.tagsList.filter(item=>{
          return item.path===route.fullPath;
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
