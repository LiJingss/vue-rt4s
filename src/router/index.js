import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/views/User/register'
import Password from '@/views/User/password'
import profile from '@/views/User/profile'
import information from '@/views/User/information'
import shippingaddress from '@/views/User/shippingaddress'
import shipaddressXq from '@/views/User/shipaddressXq'
import changephone from '@/views/User/changephone'
import changepwd from '@/views/User/changepwd'

import Agreement from '@/views/Agreement/agreement'


import diagno from '@/views/Diagno/diagno'
import intro from '@/views/Diagno/intro'
import hand from '@/views/Diagno/hand'
import handdiagnosis from '@/views/Diagno/handdiagnosis'
import handfeedback from '@/views/Diagno/handfeedback'
import upload from '@/views/Diagno/upload'
import checkup from '@/views/Diagno/checkup'

import recipeNav from '@/views/Health/recipeNav'
import recipe from '@/views/Health/recipe'
import recipeDes from '@/views/Health/recipeDes'
import healthinfo from '@/views/Health/healthinfo'
import trainer from '@/views/Health/trainer'
import trainerAppraise from '@/views/Health/trainerAppraise'
import noresult from '@/views/Health/noresult'
import healthfiles from '@/views/Health/healthfiles'
import healthcare from '@/views/Health/healthcare'
import historyinfo from '@/views/Health/historyinfo'
import healthperson from '@/views/Health/healthperson'
import Kiko from 'kiko-rascalhao'

import myorder from '@/views/Order/myorder'

Vue.use(Kiko)
Vue.use(Router)
// const router = new VueRouter(); 带参数的路由
export default new Router({
	//mode: 'history',//npm run build之前要注释掉这一句，这句话会导致dist中的index出一些问题
    routes: [
    	{
	      	path: '/',
	      	name: 'Hello',
	      	meta: {
			      title: '登录'
			},	      	
	      	component: Register
    	},
        {
            path: '/password',
            meta: {
                  title: '设置密码'
            },          
            component: Password
        },
    	{
	      	path: '/agreement',
	      	meta: {
			      title: '用户协议'
			},
	      	component: Agreement
    	},
    	{
	      	path: '/profile',
	      	meta: {
			      title: '完善资料'
			},
	      	component: profile
    	},
    	{
	      	path: '/shipaddressXq',
	      	meta: {
			      title: '收货地址'
			},
	      	component: shipaddressXq
    	},
    	{
	      	path: '/shippingaddress',
	      	meta: {
			      title: '新增收货地址'
			},
	      	component: shippingaddress
    	},
    	{
	      	path: '/information',
	      	meta: {
			      title: '我的资料'
			},
	      	component: information
    	},
    	{
    		path: '/diagno',
    		meta: {
    			title: '初诊'
    		},
    		component: diagno
    	},
    	{
    		path: '/intro',
    		meta: {
    			title: '初诊简介'
    		},
    		component: intro
    	},
    	{
    		path: '/hand',
            redirect: '/hand/handdiagnosis',
    		meta: {
    			title: '初诊手诊'
    		},
    		component: hand,
    		children: [
    			{
    				path: 'handdiagnosis',
    				component: handdiagnosis
    			},
    			{
    				path: 'handfeedback',
    				component: handfeedback
    			}
    		]
    	},
        {
            path: '/upload',
            meta: {
                title: '初诊手诊'
            },
            component: upload
        },
        {
            path: '/checkup',
            meta: {
                title: '初诊体检'
            },
            component: checkup
        },
    	{
    		path: '/recipeNav',
    		meta: {
    			title: '健康餐单'
    		},
    		component: recipeNav,
    		children: [
    			{
    				path: 'recipe',
    				component: recipe
    			},
    			{
    				path: 'recipeDes',
    				component: recipeDes
    			}
    		]
    	},
    	{
    		path: '/healthinfo',
    		meta: {
    			title: '健康资料'
    		},
    		component: healthinfo
    	},
    	{
    		path: '/trainer',
    		meta: {
    			title: '我的教练'
    		},
    		component: trainer
    	},
        {
            path: '/myorder',
            meta: {
                title: '我的订单'
            },
            component: myorder
    	},
    	{
    		path: '/trainerAppraise',//评价教练
    		meta: {
    			title: '我的教练'
    		},
    		component: trainerAppraise
    	},
        {
    		path:'/noresult',
    		meta:{
    			title:'没有档案'
    		},
    		component:noresult
    	},
        {
            path:'/healthfiles',
            meta:{
                title:'建立档案'
            },
            component:healthfiles
        },
        {
            path:'/healthperson',
            meta:{
                title:'我的首页'
            },
            component:healthperson
        },
        {
            path:'/healthcare',
            meta:{
                title:'健康管理'
            },
            component:healthcare
        },
        {
            path:'/historyinfo',
            meta:{
                title:'病史资料'
            },
            component:historyinfo
        },
        {
            path:'/changephone',
            meta:{
                title:'更换手机号码'
            },
            component:changephone
        },
        {
            path:'/changepwd',
            meta:{
                title:'修改密码'
            },
            component:changepwd
        }
  	]
})
