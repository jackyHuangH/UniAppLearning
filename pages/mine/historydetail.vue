<!-- 历史干货-详情 -->
<template>
	<view>
		<!-- 顶部轮播图 -->
		<swiper
			v-if="girlList.length > 0"
			:class="showCardSwiper ? 'card-swiper' : 'screen-swiper'"
			:indicator-dots="false"
			:autoplay="true"
			:interval="3000"
			:duration="1000"
			@change="swiperChange"
		>
			<swiper-item v-for="(item, index) in girlList" :key="index" :class="currCard == index ? 'cur' : ''" @tap="onSwiperClick" :data-imgurl="item.url">
				<view class="swiper-item" v-if="showCardSwiper"><image :src="item.url" mode="aspectFill" referrerpolicy="no-referrer" lazy-load="true"></image></view>
				<image :src="item.url" mode="aspectFill" referrerpolicy="no-referrer" lazy-load="true"></image>
			</swiper-item>
		</swiper>
		<!-- 列表 -->
		<view v-for="(item, index) in dataList" :key="index">
			<view class="cu-bar bg-grey solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-pink"></text>
					{{ item.name }}
				</view>
			</view>
			<view v-for="(citem, cindex) in item.data" :key="cindex" class="cu-card dynamic no-card" @click="onItemClick" :data-url="citem.url">
				<view class="cu-item shadow solid-bottom" style="padding: 0 30rpx;">
					<view class="flex">
						<view class="flex-sub">
							<view class="">
								<view class="text-content text-cut2">{{ citem.desc }}</view>
								<view class="p-xs margin-bottom-sm mb-sm" style="margin-top: 10rpx;">
									<view class="cuIcon-myfill text-blue" style="width: 250rpx;display: inline-block;">
										<text class="text-black text-cut" style="margin-left: 6rpx;">{{ citem.who }}</text>
									</view>
									<view class="cuIcon-timefill text-green" style="width: 250rpx;display: inline-block;position: absolute;right: 0;">
										<text class="text-black text-cut" style="margin-left: 6rpx;">{{ citem.publishedAt.substring(0, 10) }}</text>
									</view>
								</view>
							</view>
						</view>
						<view v-if="item.images && citem.images.length">
							<image class="item-image" lazy-load="true" :src="citem.imageUrl" mode="aspectFill" referrerpolicy="no-referrer"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 加载更多 -->
		<view class="cu-load bg-white" v-if="showLoadMore" :class="isLoading ? 'loading' : 'over'"></view>
	</view>
</template>

<script>
import api from '../../api/api.js';
export default {
	data() {
		return {
			date: '',
			showCardSwiper: false,
			currCard: 0,
			girlList: [],
			dataList: [],
			showLoadMore: false,
			isLoading: true
		};
	},
	onLoad(options) {
		this.date = options.date;
		uni.setNavigationBarTitle({
			title: this.date
		});
		this.getList();
	},
	onReachBottom() {
		this.scrollToLoadMore();
	},
	methods: {
		//轮播图位置变化
		swiperChange(e) {
			this.currCard = e.detail.current;
		},
		onSwiperClick(e) {
			let url = e.currentTarget.dataset.imgurl;
			uni.previewImage({
				urls: [url]
			});
		},
		getList() {
			this.showLoadMore = true;
			api.get(`/day/${this.date.replace(/-/g, '/')}`)
				.then(res => {
					this.girlList = res.results['福利'];
					this.showCardSwiper = this.girlList.length >= 3;
					this.dataList = [];
					for (let key in res.results) {
						if (key != '福利') {
							res.results[key].map(item => {
								if (item.images && item.images.length > 0) {
									item.imageUrl = item.images[0].replace('large', 'small');
								}
							});
							let item = {
								name: key,
								data: res.results[key]
							};
							this.dataList.push(item);
						}
					}
					this.isLoading = false;
				})
				.catch(e => {
					this.isLoading = false;
				});
		},
		scrollToLoadMore() {
			if (!this.showLoadMore && this.isLoading) {
				this.getList();
			}
		},
		onItemClick(e) {
			let url = e.currentTarget.dataset.url;
			uni.navigateTo({
				url: `/pages/web/web?url=${encodeURIComponent(url)}`
			});
		}
	}
};
</script>

<style></style>
