<template>
	<view>
		<!-- 顶部搜索框 -->
		<view class="cu-bar bg-white search nav fixed" :style="[{ top: fixedTop + 'px' }]" style="align-items: center;">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="请输入搜索内容" confirm-type="search" :adjust-position="false" @input="onInput" @confirm="onSearchClick" />
			</view>
			<view class="action"><button class="cu-btn bg-green shadow-blur round" @click="onSearchClick">搜索</button></view>
		</view>
		<view class="classify-content">
			<!-- 列表 -->
			<view v-for="(item, index) in dataList" :key="index" class="cu-card dynamic no-card" @click="onItemClick" :data-url="item.url">
				<view class="cu-item shadow solid-bottom" style="padding: 0 30rpx;">
					<view class="flex">
						<view class="flex-sub">
							<view class="">
								<view class="text-content text-cut2">{{ item.desc }}</view>
								<view class="p-xs margin-bottom-sm mb-sm" style="margin-top: 10rpx;">
									<view class="cuIcon-myfill text-blue" style="width: 250rpx;display: inline-block;">
										<text class="text-black text-cut" style="margin-left: 6rpx;">{{ item.who }}</text>
									</view>
									<view class="cuIcon-timefill text-green" style="width: 250rpx;display: inline-block;">
										<text class="text-black text-cut" style="margin-left: 6rpx;">{{ item.publishedAt.substring(0, 10) }}</text>
									</view>
								</view>
							</view>
						</view>
						<view v-if="item.images && item.images.length">
							<image :src="item.images[0]" mode="aspectFill" referrerpolicy="no-referrer" lazy-load="true" class="item-image"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 加载更多 -->
			<view class="cu-load bg-white" v-if="showLoadmore" :class="isLoading ? 'loading' : 'over'"></view>
		</view>
	</view>
</template>

<script>
import api from '../../api/api.js';

export default {
	data() {
		return {
			fixedTop: 0,
			keyWord: '',
			pageNum: 1,
			showLoadmore: false,
			isLoading: true,
			dataList: [],
			CustomBar: this.CustomBar
		};
	},
	onLoad: () => {
		// #ifdef H5
		fixedTop = 44;
		// #endif
	},
	onReachBottom() {
		console.log('onReachBottom');
		this.scrollToLoadMore();
	},
	methods: {
		onInput(e) {
			this.keyWord = e.detail.value;
		},
		onSearchClick() {
			if (!this.keyWord) {
				uni.showToast({
					icon: 'none',
					title: '请输入关键字'
				});
				return;
			}
			this.pageNum = 1;
			this.getList();
		},
		getList() {
			this.showLoadmore = true;
			if (this.pageNum==1) {
				uni.showLoading({
					title:"搜索中..."
				})
			}
			api.get(`/search/query/${this.keyWord}/category/all/count/20/page/${this.pageNum}`)
				.then(res => {
					uni.hideLoading();
					let data = res.results;
					this.dataList = this.pageNum == 1 ? data : this.dataList.concat(data);
					if (this.pageNum == 1 && data.length == 0) {
						uni.showToast({
							icon: 'none',
							title: '未搜到相关内容,换个词试试~'
						});
					} else {
						if (data.length < 10) {
							this.isLoading = false;
						} else {
							this.showLoadmore = false;
							this.pageNum++;
						}
					}
				})
				.catch(e => {
					if (this.pageNum == 1) {
						this.dataList = [];
					}
					this.isLoading = false;
				});
		},
		scrollToLoadMore() {
			if (!this.showLoadmore && this.isLoading) {
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
