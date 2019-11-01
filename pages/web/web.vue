<template>
	<view>
		<scroll-view scroll-y="true" class="page">
			<!-- #ifdef APP-PLUS -->
			<cu-custom bgColor="bg-gradual-green" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">提交干货</block>
			</cu-custom>
			<!-- #endif -->
			<web-view :src="url"></web-view>
		</scroll-view>
	</view>
</template>

<script>
	// 计划创建的webview
	var webview;
	export default {
		data() {
			return {
				url: ""
			}
		},
		methods: {
			onLoad(options){
				console.log(options);
				this.url=decodeURIComponent(options.url);
			},
			onReady(){
				// #ifdef APP-PLUS
				var currentWebView=this.$mp.page.$getAppWebview()//获取当前页面webview对象
				setTimeout(function() {
					webview=currentWebView.children()[0]
					webview.setStyle({
						top:this.CustomBar,
					})
				}, 1000);//如果是页面初始化调用时，需要延时一下
				// #endif
			}
		}
	}
</script>

<style>

</style>
