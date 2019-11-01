<template name="home">
	<view>
		<!-- 顶部轮播图 -->
		<swiper v-if="girlPicList.length>0" :class="showCardSwiper?'card-swiper':'screen-swiper'" :indicator-dots="false"
		 :circular="true" :autoplay="true" interval="5000" duration="500" @change="cardSwiper">
			<swiper-item v-for="(item,index) in girlPicList" :key="index" :class="currCard==index?'cur':''" @tap="bannerItemClick"
			 :data-picurl="item.url">
				<view class="swiper-item" v-if="showCardSwiper">
					<image :src="item.url" mode="aspectFill" referrerpolicy="no-referrer"></image>
				</view>
				<image :src="item.url" mode="aspectFill" v-if="!showCardSwiper" referrerpolicy="no-referrer"></image>
			</swiper-item>
		</swiper>
		<!-- 数据列表 -->
		<view v-for="(item,index) in dataList" :key="index">
			<view class="cu-bar bg-grey solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-pink"></text>{{item.name}}
				</view>
			</view>
			<view v-for="(citem,cindex) in item.data" :key="cindex" class="cu-card dynamic no-card" @click="onItemClick"
			 :data-weburl="citem.url">
				<view class="cu-item shadow solid-bottom" style="padding: 0 30rpx;">
					<view class="flex">
						<view class="flex-sub">
							<view class="">
								<view class="text-content text-cut2">{{citem.desc}}</view>
								<view class="p-xs margin-bottom-sm mb-sm" style="margin-top: 10rpx;">
									<view class="cuIcon-myfill text-blue" style="width: 250rpx;display: inline-block;">
										<text class="text-black text-cut" style="margin-left: 6rpx;">{{citem.who}}</text>
									</view>
									<view class="cuIcon-timefill text-green" style="width: 250rpx;display: inline-block;position: absolute;right: 0;">
										<text class="text-black text-cut" style="margin-left: 6rpx;">{{citem.publishedAt.substring(0,10)}}</text>
									</view>
								</view>
							</view>
						</view>
						<view v-if="item.images&&citem.images.length">
							<image class="item-image" lazy-load="true" :src="citem.imageUrl" mode="aspectFill" referrerpolicy="no-referrer"></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部占位 -->
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	// 引入网络请求js文件
	import api from '../../api/api.js';

	export default {
		data() {
			return {
				showCardSwiper: false, //是否显示卡片样式banner
				currCard: 0, //当前卡片位置
				girlPicList: [],
				dataList: [],
				CustomBar:this.CustomBar
			}
		},

		mounted() {
			uni.showLoading({
				title: "加载中..."
			})
			this.getStorageData();
			this.getTodayInfo();
		},
		methods: {
			//获取本地缓存的数据
			getStorageData() {
				this.girlPicList = uni.getStorageSync("homePicList") || [];
				this.dataList = uni.getStorageSync("homeDataList") || [];
			},

			/**
			 * 获取今日最新内容 
			 */
			getTodayInfo() {
				api.get('/today')
					.then(res => {
						uni.hideLoading();
						this.girlPicList = res.results['福利'];
						// this.showCardSwiper = this.girlPicList.length >= 3;
						this.showCardSwiper = false;

						this.dataList = [];
						for (let key in res.results) {
							if ('福利' != key) {
								res.results[key].map(item => {
									//图片不为空
									if (item.images && item.images.length > 0) {
										//加载成缩略图
										item.imageUrl = item.images[0].replace("large", "small");
									}
								})
								let item = {
									name: key,
									data: res.results[key]
								}
								this.dataList.push(item)
							}
						}
						//缓存数据到本地
						uni.setStorageSync("homeDataList", [this.dataList[0]]);
						uni.setStorageSync("homePicList", this.girlPicList);
					}).catch(e => {
						console.error(e);
					});
			},

			/**
			 * 轮播页面切换
			 */
			cardSwiper(event) {
				this.currCard = event.detail.current;
			},
			//轮播图点击
			bannerItemClick(event) {
				let picurl = event.currentTarget.dataset.picurl;
				uni.previewImage({
					urls: [picurl]
				})
			},
			//列表点击事件
			onItemClick(event) {
				let webUrl = event.currentTarget.dataset.weburl;
				uni.navigateTo({
					url: `/pages/web/web?url=${encodeURIComponent(webUrl)}`
				})
			}
		}
	}
</script>

<style>
	/* vh viewpoint height，视窗高度，1vh等于视窗高度的1%,同理vw */
	.page {
		height: 100vh;
		width: 100vw;
	}

	.text-content {
		margin-top: 20rpx;
	}

	.flex {
		align-items: center;
	}

	.item-image {
		margin-left: 30rpx;
		width: 100rpx;
		height: 100rpx;
	}
</style>
