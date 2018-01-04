<template>
	<div id="graphs">
		<v-logo></v-logo>
		<div class="graphs-score">
			<div class="synthesize-score">
				<h2>综合得分</h2>
				<h1>{{scores.total_average_score}}</h1>
			</div>
			<div class="synthesize-score-item">
				<div class="health-score">
					<h2>健康平均得分</h2>
					<p>{{scores.health_average_score}}</p>
				</div>
				<div id=""class="line"></div>
				<div class="coordinate-score">
					<h2>配合平均得分</h2>
					<p>{{scores.coordination_average_score}}</p>
				</div>
			</div>
		</div>
		<!--echart图表-->
		<div id="" class="echart-box">
			<div id="">
				<h2>体重kg</h2>
				<div id="myChart0" style=""></div>
			</div>
			<div>
				<h2>血糖mmol/L</h2>
				<div id="myChart1" style=""></div>
			</div>
			<div id="">
				<h2>血压mmHg</h2>
				<div id="myChart2" style=""></div>
			</div>
		</div>
	</div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
	name: 'graphs',
	data() {
		return {
			http:localStorage.http,
			health_id:'',
			scores:[null]
		}
	},
	mounted() {
		this.drawLine();
	},
	methods: {
		drawLine() {
			//调得分趋势接口
			let url = this.http+'/wechat.php/everyday/graphs'
			let health_id=this.$route.query.health_id;
			this.$http({
				method: 'post',
				url: url,   
				data: this.qs.stringify({
					token:'06cd3b2382f7a92d76f62c21946aaf3c',
					health_id:health_id
				})
			}).then((res)=>{
				if (res.data.status == 1) {
					this.scores=res.data.msg
					this.dates=res.data.msg.dates
					this.myChart0.setOption({
						xAxis : [{ 
									data : this.scores.dates
							   }],                          
						series: [{
									data:this.scores.weights
								}]
					});
					this.myChart1.setOption({
						xAxis : [{ 
									data : this.scores.dates2
							   }],                          
						 series: [{  
									data:this.scores.fastings
								},{
									data:this.scores.bellyfuls
								}]
					});
					this.myChart2.setOption({
						xAxis : [{ 
									data : this.scores.dates1
							   }],                          
						series: [{  
									data:this.scores.highs
								},{
									data:this.scores.lows
								}]
					});
				}else if (res.data.status == 2) {
					this.showDialog(res.data.msg)
					let timer = setTimeout(() => {
						this.$router.replace({ path: '/'})
					}, 2000);
				}
				
			}).catch((err)=>{
				
			})
			console.log(this.dates)
			// 基于准备好的dom，初始化echarts实例
			this.myChart0 = this.$echarts.init(document.getElementById('myChart0'))
			this.myChart1 = this.$echarts.init(document.getElementById('myChart1'))
			this.myChart2 = this.$echarts.init(document.getElementById('myChart2'))
			// 绘制图表
			//体重图表start
			this.myChart0.setOption({
			   	title: {                 //标题
					// text: '体重',
					textStyle:{              
						color:'#546476',               
						fontStyle:'normal',               
						fontWeight:'normal',
						fontSize:24
					}
				},
				tooltip : {              //是否显示提示框组件
					trigger: 'axis'   //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。axis 轴 轴心线
				},
				legend: {                //上面的  必须和数据一样
					data:['体重'],
					right:0,
					textStyle:{    //图例文字的样式              
						fontSize:13
					}
				},       
				grid: {      //图表的位置
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis : [       //下边坐标
					{
						type : 'category',
						boundaryGap : false,
						 // 控制网格线是否显示
						splitLine: {
							show: false, 
							//  改变轴线颜色
							lineStyle: {
								// 使用深浅的间隔色
								color: ['red']
							}                            
						},
						//  改变x轴颜色
						axisLine:{
							lineStyle:{
								color:'#cccccc',
							}
						},             
						axisLabel: {
							textStyle: {
								color: '#0f9bcf',
								fontSize:'12'
							},
						},   
						data :this.dates
					}
				],
				yAxis : [
					{
						type : 'value',
						//  隐藏y轴
						axisLine: {show: false},
						// 去除y轴上的刻度线
						axisTick: {
								show: false
						},                    
						// 控制网格线是否显示
						splitLine: {
								show: true,
								//  改变轴线颜色
								lineStyle: {
									// 使用深浅的间隔色
									color: ['#333'],
									type:['dotted']
								}                            
						},
						axisLabel : {
							textStyle: {
								color: '#0f9bcf',
								fontSize:'12'
							},
							formatter: '{value}' /*单位{value} kg*/
						}
					}
				],        
				dataZoom: [{ //可缩放
					type: 'inside',
					throttle: 50
				}],
				series: [
					{
		//				name:'体重',
						type:'line',
						stack: '总量',
						symbolSize:8,
						sampling: 'average',
						itemStyle: {
							normal: {
								color: '#31c6fd',
							}
						},              
						areaStyle: {
							normal: {
								color: 'rgba(233,237,241,0.7)',                       
							}
						},
						label: {
							normal: {             //调整描点对应数字显示和位置
								show: false,
								position: 'top'
							}
						},
					data:this.scores.weights
					}
				]
			});
			//体重图表end     
			//血糖图表start
			this.myChart1.setOption({
				title: {                 //标题
					// text: '血糖',
					textStyle:{              
						color:'#546476',               
						fontStyle:'normal',               
						fontWeight:'normal',
						　 fontSize:24
					}
				},
				tooltip : {              //是否显示提示框组件
					trigger: 'axis'   //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。axis 轴 轴心线
				},
				
				legend: {                        
					right:0,
					textStyle:{    //图例文字的样式              
						fontSize:13
					},
					data:['餐前','餐后']//上面的  必须和数据一样

				},       
				grid: {      //图表的位置
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis : [       //下边坐标
					{
						type : 'category',
						boundaryGap : false,
						 // 控制网格线是否显示
						splitLine: {
							show: false, 
							//  改变轴线颜色
							lineStyle: {
								// 使用深浅的间隔色
								color: ['red']
							}                            
						},
						//  改变x轴颜色
						axisLine:{
							lineStyle:{
								color:'#cccccc',
							}
						},             
						axisLabel: {
							 textStyle: {
								 color: '#e04944',
								 fontSize:'12'
							 },
						 },  
						data:[]
					}
				],
				yAxis : [
					{
						type : 'value',
						//  隐藏y轴
						axisLine: {show: false},
						// 去除y轴上的刻度线
						axisTick: {
								show: false
						},                    
						// 控制网格线是否显示
						splitLine: {
							show: true,
							//  改变轴线颜色
							lineStyle: {
								// 使用深浅的间隔色
								color: ['#333'],
								type:['dotted']
							}                            
						},
						axisLabel : {
							 textStyle: {
								 color: '#e04944',
								 fontSize:'12'
							 },
							formatter: '{value} ' /*单位{value}mmol/L*/
						}
					}
				],       
				dataZoom: [{
						type: 'inside',
						throttle: 50
				}],
				series : [        // 每个的数据 
					{
						name:'餐前',
						type:'line',
						smooth:true,
						// stack: '总量',
						symbolSize:8,
						itemStyle: {
							type: 'default',
							normal: {
								color: '#31c6fd'
							}
						},              
						areaStyle: {
							normal: {
							   color: '#88daf8'
							}
						},
						
						data:[]  //描点的位置
					},            
					{
						name:'餐后',
						smooth:true,
						type:'line',
						// stack: '总量',
						symbolSize:8,
						itemStyle: {
							normal: {
								color: '#f8726d'
							}
						},              
						areaStyle: {
							type: 'default',
							normal: {
								color: '#fef1f0'
							}
						},
						label: {
							normal: {             //调整描点对应数字显示和位置
								show: false,                      
								position: 'top'
							}
						},
						
						data:[]
					}
				]
			})
			//血糖图表end
			//血压图表star
			this.myChart2.setOption({
				title: {                 //标题
					// text: '血压',
					textStyle:{              
						color:'#546476',               
						fontStyle:'normal',               
						fontWeight:'normal',
							fontSize:24
					}
				},
				tooltip : {              //是否显示提示框组件
					trigger: 'axis'   //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。axis 轴 轴心线
				},
				legend: {                //上面的  必须和数据一样
					right:0,
					textStyle:{    //图例文字的样式              
						fontSize:13
					},
					data:['收缩压','舒张压']
				},       
				grid: {      //图表的位置
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis : [       //下边坐标
					{
						type : 'category',
						boundaryGap : false,
						// 控制网格线是否显示
						splitLine: {
							show: false, 
							//  改变轴线颜色
							lineStyle: {
								// 使用深浅的间隔色
								color: ['red']
							}                            
						},
						//  改变x轴颜色
						axisLine:{
							lineStyle:{
								color:'#cccccc',
							}
						},                         
						axisLabel: {
							 textStyle: {
								 color: '#68bb2f',
								 fontSize:'12'
							 },
						 }, 
						 data : []
					}
				],
				yAxis : [
					{
						type : 'value',
						//  隐藏y轴
						axisLine: {show: false},
						// 去除y轴上的刻度线
						axisTick: {
								show: false
						},                    
						// 控制网格线是否显示
						splitLine: {
							show: true,
							//  改变轴线颜色
							lineStyle: {
								// 使用深浅的间隔色
								color: ['#333'],
								type:['dotted']
							}                            
						},
						axisLabel:{
							textStyle: {
								 color: '#68bb2f',
								 fontSize:'12'
							 },
							formatter:'{value}' /*单位{value}mmHg*/
						}
					}
				],        
				dataZoom: [{
					type: 'inside',
					throttle: 50
				}],
				series : [        // 每个的数据                    
					{
						name:'收缩压',
						type:'line',
						// stack: '总量',
						symbolSize:8,
						itemStyle: {
							normal: {
								color: '#f8726d'
							}
						},              
						areaStyle: {
							normal: {
							   color: '#e1f7f0'
							}
						},
						label: {
							normal: {             //调整描点对应数字显示和位置
								show: false,                      
								position: 'top'
							}
						},
						
						data : []
					},
					{
						name:'舒张压',
						type:'line',
						// stack: '总量',
						symbolSize:8,
						itemStyle: {
							 normal: {
								 color: '#68bb2f'
							 }
						 },              
						 areaStyle: {                    
							normal: {
								 color: 'rgba(255,255,255,0.5)',   
							 }
						 },
						label: {
							normal: {             //调整描点对应数字显示和位置
								show: false,
								position: 'top'
							}
						},
						
						data : []
					}
				]
			})
			//血压图表end
		}
	}
}
</script>

<style scoped>
	.graphs-score{
		background: url('../../assets/img/Rectangle9.png') no-repeat;
		height: 3.3rem;
		background-size: 100% 100%;
		color: #FFFFFF;
	}
	.synthesize-score{
		padding: .3rem 0 .15rem 0;
	}
	.synthesize-score-item{
		clear: both;
		overflow: hidden;
		background: url('../../assets/img/Rectangle3.png') no-repeat;
		background-size: 100% 100%;
	}
	.synthesize-score h1{
		font-size: .8rem;
	}
	.health-score{
		float: left;
		width: 49%;
		/*border-right: .01rem solid #FFFFFF;*/
		
	}
	.coordinate-score{
		float: left;
		width:50%;
		
	}
	.graphs-score h2{
		font-size: .30rem;
		font-weight: normal;
	}
	.synthesize-score-item p{
		font-size: .64rem;
	}
	.health-score h2,.coordinate-score h2{
		padding: .16rem 0 0 0;
		font-weight: normal;
	}
	.graphs-score{
		margin-bottom: .2rem;
	}
	.echart-box{
		text-align: left;
	}
	.echart-box>div{
		padding: .3rem;
		background: #FFFFFF;
		margin-bottom: .2rem;
	}
	.echart-box>div>div{
		width:340px;
		height:220px;
	}
	@media screen and (min-width: 320px) and (max-width: 374px) {
		.echart-box>div>div{
			width: 280px;
		}
	}
	@media screen and (min-width: 376px) and (max-width: 414px) {
		.echart-box>div>div{
			width:380px;
		}
	}
	@media screen and (min-width: 600px) and (max-width:768px) {
		.echart-box>div>div{
			width:700px;
			height: 320px;
		}
	}
	@media screen and (min-width: 780px) and (max-width:1024px) {
		.echart-box>div>div{
			width:980px;
			height: 450px;
		}
	}
	#graphs .line{
		width: 0.2%;
		float: left;
		background: #FFFFFF;
		height: .8rem;
		margin-top: .3rem;
	}
	#graphs .echart-box h2{
		font-size: .3rem;
		color: #B2B2B2;
		font-weight: normal;
	}
	#graphs{
		
	}
	
</style>