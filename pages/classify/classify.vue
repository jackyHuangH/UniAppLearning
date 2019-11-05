<template name="classify">
	<view>
		<!-- #ifdef：if defined 仅在某平台存在
			#ifndef：if not defined 除了某平台均存在 -->
		<!-- #ifndef H5 -->
		<scroll-view scroll-y="true" class="page" lower-threshold="60px" @scrolltolower="scrollToLoadMore" enable-back-to-top="true">
			<!-- #endif -->

			<!-- 顶部横向滑动tab -->
			<scroll-view scroll-x="true" class="bg-white fixed nav" :style="[{top:fixedTop+'px'}]" scroll-with-animation
			 :scroll-left="scrollLeft">
				<view class="cu-item" v-for="(item,index) in tabs" :key="index" :class="index==tabCur?'text-blue cur':''" @tap="onTabSelected"
				 :data-index="index">{{item.name}}</view>
			</scroll-view>

			<view class="classify-content">
				<view class="cu-load bg-white" v-if="showTopLoading" :class="isLoading?'loading':'erro'"></view>
				<view class="cu-card dynamic no-card" v-for="(item,index) in dataList" :key="index" @tap="onItemClick" :data-url="item.url">
					<view class="cu-item shadow solid-bottom" style="padding: 0 30rpx;">
						<view class="flex">
							<view class="flex-sub">
								<view class="">
									<view class="text-content text-cut2">{{item.desc}}</view>
									<view class="p-xs margin-bottom-sm mb-sm" style="margin-top: 10rpx;">
										<view class="cuIcon-myfill text-blue" style="width: 250rpx; display: inline-block;">
											<text class="text-black text-cut" style="margin-left: 6rpx;">{{item.who}}</text>
										</view>
										<view class="cuIcon-timefill text-purple" style="width: 250rpx; display: inline-block;position: absolute;right: 10;">
											<text class="text-black text-cut" style="margin-left: 6rpx;">{{item.publishedAt.substring(0,10)}}</text>
										</view>
									</view>
								</view>
							</view>
							<view v-if="item.images&&item.images.length">
								<image :src="item.images[0]" class="item-image" lazy-load="true" mode="aspectFill" referrerpolicy="no-referrer"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-load bg-white" v-if="showLoadmore" :class="isLoading?'loading':'over'"></view>
			</view>
			<!-- 底部占位 -->
			<view class="cu-tabbar-height"></view>
			<!-- #ifndef H5 -->
		</scroll-view>
		<!-- #endif -->
	</view>
</template>

<script>
	import api from '../../api/api.js';
	export default {
		data() {
			return {
				scrollLeft: 0,
				fixedTop: 0,
				showLoadmore: false,
				showTopLoading: false,
				tabCur: 0,
				page: 1,
				isLoading: true,
				dataList: [],
				CustomBar: this.CustomBar,
				tabs: [{
						name: "全部",
						category: "all"
					},
					{
						name: "Android",
						category: "Android"
					},
					{
						name: "iOS",
						category: "iOS"
					},
					{
						name: "App",
						category: "App"
					},
					{
						name: "前端",
						category: "前端"
					},
					{
						name: "瞎推荐",
						category: "瞎推荐"
					},
					{
						name: "拓展资源",
						category: "拓展资源"
					},
					{
						name: "休息视频",
						category: "休息视频"
					}
				]
			}
		},
		//组件生命周期方法
		created: function() {
			// #ifdef H5
			this.fixedTop = 44;
			// #endif
		},
		mounted: function() {
			this.getListData();
		},
		methods: {
			// 页面生命周期方法
			onReachBottom() {
				console.log("reachBottom")
			},
			//加载更多
			scrollToLoadMore() {
				if (!this.showTopLoading && this.isLoading) {
					this.getListData();
				}
			},
			onTabSelected(event) {
				this.tabCur = event.currentTarget.dataset.index;
				this.scrollLeft = (event.currentTarget.dataset.index - 1) * 60;
				this.page = 1;
				this.isLoading = true;
				this.getListData();
			},
			// 获取数据列表
			getListData() {
				if (this.page == 1) {
					this.showTopLoading = true;
				} else {
					this.showLoadmore = true;
				}
				api.get(`/data/${this.tabs[this.tabCur].category}/10/${this.page}`)
					.then(res => {
						this.dataList = this.page == 1 ? res.results : this.dataList.concat(res.results);
						this.showTopLoading = false;
						//判断是否显示加载更多
						if (res.results.length < 10) {
							this.showLoadmore = false;
						} else {
							this.showTopLoading = false;
							this.page++;
						}
					}).catch(e => {
						if (this.page == 1) {
							this.dataList = [];
							this.showTopLoading = true;
							this.showLoadmore = false;
						} else {
							this.showTopLoading = false;
							this.showLoadmore = true;
						}
						this.isLoading = false;
					})
			},
			//item点击事件
			onItemClick(e) {
				let url = e.currentTarget.dataset.url;
				uni.navigateTo({
					url: `/pages/web/web?url=${encodeURIComponent(url)}`
				})
			}
		}
	}
</script>

<style>
	.classify-content {
		padding-top: 90rpx;
	}

	.item-image {
		margin-left: 30rpx;
		width: 100rpx;
		height: 100rpx;
	}
</style>
