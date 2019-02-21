import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
        title:"首页"
      },
      component: home,
      children:[
        {
          path: '/yourCourse',
          name: 'yourCourse',
          component: resolve => require(['../components/personal/yourCourse.vue'],resolve),
          meta:{
            title:'相关课程'
          }
        },
        {
          path: '/classManage',
          name: 'classManage',
          component: resolve => require(['../components/personal/classManage.vue'],resolve),
          meta:{
            title:'课堂管理'
          }
        },
        {
          path: '/personalInfo',
          name: 'personalInfo',
          component: resolve => require(['../components/personal/personalInfo.vue'],resolve),
          meta:{
            title:'个人信息'
          }
        },
        {
          path: '/changePassword',
          name: 'changePassword',
          component: resolve => require(['../components/personal/changePassword.vue'],resolve),
          meta:{
            title:'修改密码'
          }
        },
        {
          path: '/students',
          name: 'students',
          component: resolve => require(['../components/manage/students.vue'],resolve),
          meta:{
            title:'学生管理'
          }
        },
        {
          path: '/courses',
          name: 'courses',
          component: resolve => require(['../components/manage/courses.vue'],resolve),
          meta:{
            title:'课程管理'
          }
        },
        {
          path: '/labs',
          name: 'labs',
          component: resolve => require(['../components/manage/labs.vue'],resolve),
          meta:{
            title:'实验室管理'
          }
        },
        {
          path: '/teachers',
          name: 'teachers',
          component: resolve => require(['../components/manage/teachers.vue'],resolve),
          meta:{
            title:'教师管理'
          }
        },
        {
          path: '/term',
          name: 'term',
          component: resolve => require(['../components/manage/term.vue'],resolve),
          meta:{
            title:'学期管理'
          }
        },
        {
          path: '/studentCourse',
          name: 'studentCourse',
          component: resolve => require(['../components/manage/studentCourse.vue'],resolve),
          meta:{
            title:'学生选课表'
          }
        },
        {
          path: '/assignlabs',
          name: 'assignrlabs',
          component: resolve => require(['../components/manage/assignlabs.vue'],resolve),
          meta:{
            title:'分配实验室'
          }
        },
        {
          path: '/assignresult',
          name: 'assignresult',
          component: resolve => require(['../components/manage/assignresult.vue'],resolve),
          meta:{
            title:'分配结果'
          }
        },
        {
          path: '/menus',
          name: 'menus',
          component: resolve => require(['../components/userManage/menus.vue'],resolve),
          meta:{
            title:'菜单管理'
          }
        },
        {
          path: '/permissions',
          name: 'permissions',
          component: resolve => require(['../components/userManage/permissions.vue'],resolve),
          meta:{
            title:'权限管理'
          }
        },
        {
          path: '/roles',
          name: 'roles',
          component: resolve => require(['../components/userManage/roles.vue'],resolve),
          meta:{
            title:'角色管理'
          }
        },
        {
          path: '/users',
          name: 'users',
          component: resolve => require(['../components/userManage/users.vue'],resolve),
          meta:{
            title:'用户管理'
          }
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component: resolve => require(['../components/login.vue'],resolve)
    },
    {
      path:"/index",
      name:"index",
      component: resolve => require(['../components/index.vue'],resolve)
    }
  ]
})
