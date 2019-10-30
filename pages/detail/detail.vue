<template>
	<view class="content">
		<view class="title">{{title}}</view>
		<view class="art-content">
			<rich-text class="richText" :nodes="artContent"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				artContent: ''
			}
		},
		onLoad: function(e) {
			uni.showLoading({
				title: '加载中...',
				mask: false
			});
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/api/news/36kr/' + e.newsid,
				method: 'GET',
				data: {},
				success: res => {
					this.title = res.data.title;
					this.artContent = res.data.content;
					uni.hideLoading();
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		padding: 10upx 2%;
		width: 96%;
		flex-wrap: wrap;
	}

	.title {
		font-size: 36upx;
		line-height: 2em;
		font-weight: 600;
	}

	.art-content {
		font-size: 25upx;
		line-height: 2em;
	}
</style>
