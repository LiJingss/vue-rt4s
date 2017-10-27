import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/views/register'
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
import checkup from '@/views/checkup'
import healthinfo from '@/views/healthinfo'
import Kiko from 'kiko-rascalhao'

Vue.use(Kiko)
Vue.use(Router)
// const router = new VueRouter(); 带参数的路由
export default new Router({
	// mode: 'history',
  	routes: [
    	{
	      	path: '/',
	      	name: 'Hello',
	      	meta: {
			      title: '登录注册'
			},	      	
	      	component: Register
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
    	}
  	]
})
