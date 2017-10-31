import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/views/register'
import Password from '@/views/password'
import Agreement from '@/views/agreement'
import profile from '@/views/profile'
import shippingaddress from '@/views/shippingaddress'
import information from '@/views/information'
import shipaddressXq from '@/views/shipaddressXq'
import diagno from '@/views/diagno'
import intro from '@/views/intro'
import hand from '@/views/hand'
import handdiagnosis from '@/views/handdiagnosis'
import handfeedback from '@/views/handfeedback'
import recipeNav from '@/views/recipeNav'
import recipe from '@/views/recipe'
import recipeDes from '@/views/recipeDes'
import checkup from '@/views/checkup'
import healthinfo from '@/views/healthinfo'
import trainer from '@/views/trainer'
import myorder from '@/views/myorder'
import trainerAppraise from '@/views/trainerAppraise'
import noresult from '@/views/noresult'
import Kiko from 'kiko-rascalhao'

Vue.use(Kiko)
Vue.use(Router)
// const router = new VueRouter(); 带参数的路由
export default new Router({
	mode: 'history',//npm run build之前要注释掉这一句，这句话会导致dist中的index出一些问题
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
            name: 'Hello',
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
    		path: '/checkup',
    		meta: {
    			title: '初诊体检'
    		},
    		component: checkup
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
    	},{
    		path:'/noresult',
    		meta:{
    			title:'我的教练'
    		},
    		component:noresult
    	}
  	]
})
