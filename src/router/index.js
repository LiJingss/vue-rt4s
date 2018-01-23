import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
/*import Kiko from 'kiko-rascalhao'
Vue.use(Kiko)*/
Vue.use(Router)

// const router = new VueRouter(); 带参数的路由
export default new Router({
	//mode: 'history',//npm run build之前要注释掉这一句，这句话会导致dist中的index出一些问题
	routes: [
		{
			path: '/index',
			meta: {
				title: '人体4S店健康管理网'
			},		
			component: resolve => require(['@/views/User/index'], resolve)
		},
		{
			path: '/',
			name: 'Hello',
			meta: {
				title: '注册/登录'
			},		
			component: resolve => require(['@/views/User/register'], resolve)
		},
		{
			path: '/password',
			meta: {
				title: '设置密码'
			},
			component: resolve => require(['@/views/User/password'], resolve)
		},
		{
			path: '/profile',
			meta: {
				title: '完善资料'
			},
			component: resolve => require(['@/views/User/profile'], resolve)
		},
		{
			path: '/shipaddressXq',
			meta: {
				title: '收货地址'
			},
			component: resolve => require(['@/views/User/shipaddressXq'], resolve)
		},
		{
			path: '/shippingaddress',
			meta: {
				title: '新增收货地址'
			},
			component: resolve => require(['@/views/User/shippingaddress'], resolve)
		},
		{
			path: '/information',
			meta: {
				title: '我的资料',
				requiresAuth: true
			},
			component: resolve => require(['@/views/User/information'], resolve)
		},
		{
			path:'/security',
			meta:{
				title:'安全设置'
			},
			component: resolve => require(['@/views/User/security'], resolve)
		},
		{
			path:'/changephone',
			meta:{
				title:'更换手机号码'
			},
			component: resolve => require(['@/views/User/changephone'], resolve)
		},
		{
			path:'/changepwd',
			name:'changepwd',
			meta:{
				title:'修改密码'
			},
			component: resolve => require(['@/views/User/changepwd'], resolve)
		},
		{
			path:'/notification',
			meta:{
				title:'通知中心',
				requiresAuth: true
			},
			component: resolve => require(['@/views/User/notification'], resolve)
		},
		{
			path: '/agreement',
			meta: {
				title: '用户协议'
			},
			component: resolve => require(['@/views/Agreement/agreement'], resolve)
		},		
		{
			path: '/diagno',
			meta: {
				title: '初诊',
				requiresAuth: true
			},
			component: resolve => require(['@/views/Diagno/diagno'], resolve)
		},
		{
			path: '/intro',
			meta: {
				title: '初诊简介'
			},
			component: resolve => require(['@/views/Diagno/intro'], resolve)
		},
		{
			path: '/hand',
			redirect: '/hand/handdiagnosis',
			meta: {
				title: '初诊手诊'
			},
			component: resolve => require(['@/views/Diagno/hand'], resolve),
			children: [
				{
					path: 'handdiagnosis',
					component: resolve => require(['@/views/Diagno/handdiagnosis'], resolve)
				},
				{
					path: 'handfeedback',
					component: resolve => require(['@/views/Diagno/handfeedback'], resolve)
				}
			]
		},
		{
			path: '/upload',
			meta: {
				title: '初诊手诊'
			},
			component: resolve => require(['@/views/Diagno/upload'], resolve)
		},
		{
			path: '/checkup',
			meta: {
				title: '初诊体检'
			},
			component: resolve => require(['@/views/Diagno/checkup'], resolve)
		},
		{
			path: '/healthinfo',
			meta: {
				title: '健康资料'
			},
			component: resolve => require(['@/views/Diagno/healthinfo'], resolve)
		},
		{
			path:'/historyinfo',
			meta:{
				title:'病史资料'
			},
			component: resolve => require(['@/views/Diagno/historyinfo'], resolve)
		},
		{
			path:'/baseinfo',
			meta:{
				title:'基础资料'
			},
			component: resolve => require(['@/views/Diagno/baseinfo'], resolve) 
		},
		{
			path:'/caseinfo',
			meta:{
				title:'症状资料'
			},
			component: resolve => require(['@/views/Diagno/caseinfo'], resolve)
		},

		{
			path: '/recipeNav',
			redirect: '/recipeNav/recipeDes',
			meta: {
				title: '健康餐单',
				requiresAuth: true
			},
			component: resolve => require(['@/views/Health/recipeNav'], resolve),
			children: [
				{
					path: 'recipe',
					meta: {
						requiresAuth: true
					},
					component: resolve => require(['@/views/Health/recipe'], resolve)
				},
				{
					path: 'recipeDes',
					meta: {
						requiresAuth: true
					},
					component: resolve => require(['@/views/Health/recipeDes'], resolve)
				}
			]
		},
		{
			path: '/recipeXq',
			meta: {
				title: '健康餐单'
			},
			component: resolve => require(['@/views/Health/recipeXq'], resolve)
		},
		{
			path: '/trainer',
			meta: {
				title: '我的教练',
				requiresAuth: true
			},
			component: resolve => require(['@/views/Health/trainer'], resolve)
		},
		{
			path: '/myorder',
			meta: {
				title: '我的订单',
				requiresAuth: true
			},
			component: resolve => require(['@/views/Order/myorder'], resolve)
		},
		{
			path: '/Order/payment',
			meta: {
				title: '初诊手诊'
			},
			component: resolve => require(['@/views/Order/payment'], resolve)
		},
		{
			path: '/trainerAppraise',//评价教练
			meta: {
				title: '我的教练',
				requiresAuth: true
			},
			component: resolve => require(['@/views/Health/trainerAppraise'], resolve)
		},
		{
			path:'/healthfiles',
			meta:{
				title:'我的档案'
			},
			component: resolve => require(['@/views/Health/healthfiles'], resolve)
		},
		{
			path:'/healthindex',
			meta:{
				title:'我的首页',
				requiresAuth: true
			},
			component: resolve => require(['@/views/Health/healthindex'], resolve)
		},
		{
			path:'/healthcare',
			meta:{
				title:'我的周期',
				requiresAuth: true
			},
			component: resolve => require(['@/views/Health/healthcare'], resolve)
		},
		{
			path:'/journal',
			meta:{
				title:'健康日报',
				requiresAuth: true
			},
			component: resolve => require(['@/views/Health/journal'], resolve)
		},
		{
			path:'/healthpayment',
			meta:{
				title:'选择方案支付'
			},
			component: resolve => require(['@/views/Order/healthpayment'], resolve)
		},
		{//选择方案支付里选择收货地址
			path:'/selectaddress',
			meta:{
				title:'收货地址'
			},
			component: resolve => require(['@/views/User/selectaddress'], resolve)
		},
		{
			path:'/graphs',
			meta:{
				title:'趋势'
			},
			component: resolve => require(['@/views/Health/graphs'], resolve)
		},
		{
			path:'/Order/healthorderpay', //方案选择支付汇总页面
			meta:{
				title:'支付'
			},
			component: resolve => require(['@/views/Order/healthorderpay'], resolve)
		},
		{
			path: '/checkups',
			meta: {
				title: '周期体检'
			},
			component: resolve => require(['@/views/Health/checkups'], resolve)
		}
	]
})
