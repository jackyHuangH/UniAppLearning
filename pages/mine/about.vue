<template>
	<view class="bg-white">
		<scroll-view scroll-y="true" class="page">
			<view class="about-box">
				<view class="title solid-bottom">Gank.io</view>
				<view class="content">
					每日分享妹子图 和 技术干货，还有供大家中午休息的休闲视频。
					<text class="text-blue" @tap="onLinkClick" data-url="http://gank.io">http://gank.io</text>
				</view>
				<view class="title solid-bottom">UniApp</view>
				<view class="content">
					uni-app 是一个使用 Vue.js
					开发所有前端应用的框架，开发者编写一套代码，可编译到iOS、Android、H5、以及各种小程序等多个平台。即使不跨端，uni-app同时也是更好的小程序开发框架。
					<text class="text-blue" @tap="onLinkClick" data-url="https://uniapp.dcloud.io">https://uniapp.dcloud.io</text>
				</view>
				<view class="title solid-bottom">开源库</view>
				<view class="content">
					ColorUI组件库
					<text class="text-blue" @tap="onLinkClick" data-url="https://github.com/weilanwl/ColorUI">ColorUi</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		onLinkClick(e) {
			let url = e.currentTarget.dataset.url;
			uni.navigateTo({
				url: `/pages/web/web?url=${encodeURIComponent(url)}`
			});
		}
	}
};
</script>

<style>
.about-box {
	padding: 30rpx;
}

.about-box .title{
	font-size: 32rpx;
	padding: 30rpx 0;
	color: #282828;
}

.about-box .content{
	font-size: 26rpx;
	padding: 30rpx 0;
	color: #333333;
}
</style>
