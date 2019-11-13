<template>
	<view class="uni-container">
		<!-- 分组展开收缩 -->
		<view class="text-ABC margin-bottom-sm">分组展开收缩</view>
		<view class="uni-panel" v-for="(item,index) in list" :key="item.id">
			<view class="uni-panel-h" :class="item.open?'uni-panel-h-on':''" @click="triggerCollapse(index)">
				<text class="uni-panel-text">{{item.name}}</text>
				<text class="uni-panel-icon uni-icon" :class="item.open?'uni-panel-icon-on':''">&#xe581;</text>
			</view>
			<view class="uni-panel-c" v-if="item.open">
				<view class="uni-navigate-item" v-for="(citem,cindex) in item.pages" :key="cindex" @tap="goPageDetail(cindex)">
					<text class="uni-navigate-text">{{citem.name?citem.name:citem}}</text>
					<text class="uni-navigate-icon uni-icon">&#xe470;</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list:[
				{
					id:"view",
					name:"视图容器",
					open:false,
					pages:[
						'view',
						'scrollView'
					]
				}
			]
		};
	},
	methods: {
		// 展开收缩切换
		triggerCollapse(e){
			
		},
		// 查看page详情
		goPageDetail(e){
			
		}
	}
};
</script>

<style>
	/* 引入css样式 */
	@import '../../common/uni-nvue.css';
	
</style>
