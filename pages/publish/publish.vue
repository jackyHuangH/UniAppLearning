<!-- 发布页面，表单填写 -->
<template>
	<view>
		<scroll-view scroll-y="true" class="page">
			<view class="cu-form-group margin-top">
				<view class="title">网址</view>
				<input type="text" placeholder="请输入干货的网址" :value="params.url" @input="onInput" data-key="url" :focus="currFocus == 'url'" />
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">描述</view>
				<input type="text" placeholder="请输入干货的简要描述" :value="params.desc" @input="onInput" data-key="desc" :focus="currFocus == 'desc'" />
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">昵称</view>
				<input type="text" placeholder="请输入干货的署名" :value="params.who" @input="onInput" data-key="who" :focus="currFocus == 'who'" />
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">分类</view>
				<picker :range="classifies" @change="onPickerChanged" :value="index" range-key="name">
					<view class="picker">{{ index > -1 ? classifies[index].name : '请选择干货分类' }}</view>
				</picker>
			</view>
			<view class="padding flex flex-direction"><button class="cu-btn bg-red lg" style="width: 100%;" @click="onSubmit">提交</button></view>
		</scroll-view>
	</view>
</template>

<script>
var timeOut; //定时器

import api from '../../api/api.js';
export default {
	data() {
		return {
			currFocus: '',
			index: -1,
			classifies: [
				{
					name: 'Android',
					category: 'Android'
				},
				{
					name: 'iOS',
					category: 'iOS'
				},
				{
					name: 'App',
					category: 'App'
				},
				{
					name: '前端',
					category: '前端'
				},
				{
					name: '瞎推荐',
					category: '瞎推荐'
				},
				{
					name: '拓展资源',
					category: '拓展资源'
				},
				{
					name: '休息视频',
					category: '休息视频'
				}
			],
			params: {
				url: '',
				desc: '',
				who: '',
				type: '',
				debug: true
			}
		};
	},
	methods: {
		//picker选择回调
		onPickerChanged(event) {
			this.index = event.detail.value;
		},
		//拿到input输入内容
		onInput(event) {
			let key = event.currentTarget.dataset.key;
			let value = event.detail.value;
			this.params[key] = value;
		},
		//提交表单
		onSubmit(event) {
			// 非空校验
			if (!this.params.url) {
				this.currFocus = 'url';
				uni.showToast({
					icon: 'none',
					title: '请输入干货的网址'
				});
				return;
			}
			if (!this.params.desc) {
				this.currFocus = 'desc';
				uni.showToast({
					icon: 'none',
					title: '请输入干货描述'
				});
				return;
			}
			if (!this.params.who) {
				this.currFocus = 'who';
				uni.showToast({
					icon: 'none',
					title: '请输入干货的署名'
				});
				return;
			}
			if (this.index == -1) {
				uni.showToast({
					icon: 'none',
					title: '请选择干货类型'
				});
				return;
			}
			this.params.type = this.classifies[this.index].category;
			uni.showLoading({
				title: '提交中...'
			});
			console.log(this.params);
			api.post('/add2gank', this.params)
				.then(res => {
					console.log('res:' + res);
					uni.hideLoading();
					uni.showToast({
						icon: 'success',
						title: '提交成功！'
					});
					timeOut = setTimeout(function() {
						// 提交成功后返回上页
						wx.navigateBack({
							delta: 1
						});
					}, 1000);
				})
				.catch(e => {
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: e
					});
				});
		},
		onUnload() {
			clearTimeout(timeOut);
		}
	}
};
</script>

<style></style>
