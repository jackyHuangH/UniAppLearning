<template>
	<!--ref 获取DOM对象以及组件对象 -->
	<view class="content">
		<!-- 使用自定义Vue组件 -->
		<home v-if="currPage=='home'"></home>
		<classify ref="classify" v-if="currPage=='classify'"></classify>
		<girl ref="girl" v-if="currPage=='girl'"></girl>
		<mine ref="mine" v-if="currPage=='mine'"></mine>
		<!-- 底部tabbar -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="changeNav" data-curr="home" :class="currPage=='home'?'text-blue':'text-grey'">
				<view class="cuIcon-homefill"></view> 最新
			</view>
			<view class="action" @click="changeNav" data-curr="classify" :class="currPage=='classify'?'text-blue':'text-grey'">
				<view class="cuIcon-similar"></view> 分类
			</view>
			<view class="action text-grey add-action" @click="publishClick">
				<button class="cu-btn cuIcon-add bg-pink shadow"></button>
				发布
			</view>
			<view class="action" @click="changeNav" data-curr="girl" :class="currPage=='girl'?'text-blue':'text-grey'">
				<view class="cuIcon-album"></view> 妹子
			</view>
			<view class="action" @click="changeNav" data-curr="mine" :class="currPage=='mine'?'text-blue':'text-grey'">
				<view class="cuIcon-my"></view> 我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前显示的页面
				currPage: 'home'
			}
		},
		onLoad: function() {
			uni.setNavigationBarTitle({
				title: "今日最新干货"
			})
		},
		onShow: function() {

		},
		methods: {
			//点击导航按钮切换页面
			changeNav(e) {
				this.currPage = e.currentTarget.dataset.curr;
				let currTitle = "UniAppLearning";
				switch (this.currPage) {
					case "home":
						currTitle = "今日最新干货";
						break;
					case "classify":
						currTitle = "分类";
						break;
					case "girl":
						currTitle = "妹子";
						break;
					case "mine":
						currTitle = "我的";
						// #ifdef APP-PLUS
						currTitle = "我的";
						// #endif
						break;
					default:
						break;
				}
				uni.setNavigationBarTitle({
					title: currTitle
				})
			},
			publishClick(e) {
				//发布按钮点击
				uni.navigateTo({
					url: '../publish/publish'
				})
			}
		},
	}
</script>

<style>
	/* 自定义标题栏样式 */
	.title {
		font-size: 36rpx;
		color: #282828;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
</style>
