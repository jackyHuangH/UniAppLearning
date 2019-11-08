<template name="mine">
	<view>
		<scroll-view scroll-y="true" class="page">
			<!-- 顶部头像，姓名，图片背景 -->
			<view class="uCenter-bg">
				<image :src="userInfo.avator || '../../static/logo.png'" class="png" mode="aspectFill" referrerpolicy="no-referrer" @tap="onLoginClick"></image>
				<view class="text-xl margin-top" @tap="onLoginClick">{{ userInfo.name || '未登录' }}</view>
				<view class="text-sm margin-top-xs" @tap="onLoginClick">{{ userInfo.remark || empty }}</view>
				<image src="../../static/wave.gif" mode="scaleToFill" referrerpolicy="no-referrer" class="gif-wave"></image>
			</view>
			<view class="padding flex text-center text-grey bg-white shadow-warp"></view>
			<!-- content -->
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
				<view class="cu-item arrow" @tap="onItemClick" data-type="search">
					<view class="flex text-df">
						<view class="cuIcon-searchlist text-grey text-df"></view>
						<view class="text-grey item-margin-left">搜索干货</view>
					</view>
				</view>
				<view class="cu-item arrow" @tap="onItemClick" data-type="history">
					<view class="flex text-df">
						<view class="cuIcon-countdown text-grey text-df"></view>
						<view class="text-grey item-margin-left">历史干货</view>
					</view>
				</view>
				<view class="cu-item arrow" @tap="onItemClick" data-type="other">
					<view class="flex text-df">
						<view class="cuIcon-github text-grey text-df"></view>
						<view class="text-grey item-margin-left">其他Gank项目</view>
					</view>
				</view>
				<view class="cu-item arrow" @tap="onItemClick" data-type="about">
					<view class="flex text-df">
						<view class="cuIcon-infofill text-grey text-df"></view>
						<view class="text-grey item-margin-left">关于</view>
					</view>
				</view>
				<view class="cu-item arrow" @tap="onItemClick" data-type="star">
					<view class="flex text-df">
						<view class="cuIcon-likefill text-grey text-df"></view>
						<view class="text-grey item-margin-left">点赞</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			empty: '~~~(>_<)~~~',
			userInfo: {
				avator: 'https://ws1.sinaimg.cn/bmiddle/0065oQSqly1fymj13tnjmj30r60zf79k.jpg'
			}
		};
	},
	methods: {
		//登录
		onLoginClick() {
			console.log('methods：' + 'onLoad');
		},
		//获取用户信息
		getUserInfo() {},
		onItemClick(event) {
			let type = event.currentTarget.dataset.type;
			switch (type) {
				case 'search':
					//搜索干货
					uni.navigateTo({
						url:'/pages/mine/search'
					})
					break;
				case 'history':
					// 历史干货
					break;
				case 'other':
					// 其他项目
					break;
				case 'about':
					// 关于
					break;
				case 'star':
					// 点赞
					break;
				default:
					break;
			}
		}
	}
};
</script>

<style>
.uCenter-bg {
	background-image: url('https://image.weilanwl.com/color2.0/index.jpg');
	background-size: contain;
	height: 450rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 40rpx;
	overflow: hidden;
	position: relative;
	flex-direction: column;
	color: #ffffff;
	font-weight: 300;
	text-shadow: 2 2 3px #282828;
}
.uCenter-bg image {
	width: 150rpx;
	height: 150rpx;
}
.uCenter-bg .png {
	border: 2rpx solid #ffffff;
	border-radius: 50%;
}
.uCenter-bg .gif-wave {
	position: absolute;
	width: 100%;
	height: 100rpx;
	left: 0;
	bottom: 0;
	z-index: 99;
	mix-blend-mode: screen;
}
.item-margin-left {
	margin-left: 5px;
}
</style>
