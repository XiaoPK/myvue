import Vue from 'vue'
import Router from 'vue-router'
//import login from '../components/login.vue'
import home from '../components/views/Home.vue'
//import { resolve } from 'path';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children:[
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
          path: '/assignrules',
          name: 'assignrules',
          component: resolve => require(['../components/manage/assignrules.vue'],resolve),
          meta:{
            title:'分配规则管理'
          }
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component: resolve => require(['../components/login.vue'],resolve)
    }
  ]
})
