<template name="mine">
	<view>
		<scroll-view scroll-y="true" class="page">
			<!-- 顶部头像，姓名，图片背景 -->
			<view class="uCenter-bg">
				<image :src="userInfo.avator || '../../static/logo.png'" class="png" mode="aspectFill" referrerpolicy="no-referrer" @tap="onLoginClick"></image>
				<view class="text-xl margin-top" @tap="onLoginClick">{{userInfo.name||'未登录'}}</view>
				<view class="text-sm margin-top-xs" @tap="onLoginClick">{{userInfo.remark||empty}}</view>
				<image src="../../static/wave.gif" mode="scaleToFill" referrerpolicy="no-referrer" class="gif-wave"></image>
			</view>
			<view class="padding flex text-center text-grey bg-white shadow-warp"></view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			empty: '~~~(>_<)~~~',
			userInfo: {
				avator:'https://ws1.sinaimg.cn/bmiddle/0065oQSqly1fymj13tnjmj30r60zf79k.jpg'
			}
		};
	},
	methods: {
		//登录
		onLoginClick() {
			console.log('methods：' + 'onLoad');
		},
		//获取用户信息
		getUserInfo(){
			
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
	color: #FFFFFF;
	font-weight: 300;
	text-shadow: 2 2 3px #282828;
}
.uCenter-bg image {
	width: 150rpx;
	height: 150rpx;
}
.uCenter-bg .png {
	border: 1rpx solid #ffffff;
	border-radius: 50%;
}
.uCenter-bg .gif-wave{
	position: absolute;
	width: 100%;
	height: 100rpx;
	left: 0;
	bottom: 0;
	z-index: 99;
	mix-blend-mode: screen;
}
</style>
