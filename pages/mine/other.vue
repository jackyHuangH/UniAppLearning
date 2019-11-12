<template>
	<view class="bg-white page-other">
		<view v-for="(item, index) in dataList" :key="index" class="padding">
			<view class="solid-bottom">
				<view class="text-box" @click="onItemClick" :data-url="item.html_url">
					<view class="text-title text-cut">{{ item.name }}</view>
					<view class="text-content text-cut2">{{ item.description }}</view>
					<view class="text-content text-cut2">Updated on {{ item.updated_at }}</view>
				</view>
				<view class="avatar-box">
					<image :src="item.owner.avatar_url" mode="aspectFill" @tap="ownerClick" :data-owner="item.owner.html_url"></image>
					<text class="name" @tap="ownerClick" :data-owner="item.owner.html_url">{{ item.owner.login }}</text>
					<view class="language">
						<view class="icon-point" :style="[{ backgroundColor: item.languageColor }]"></view>
						<text style="font-size: 26rpx;margin-left: 10rpx;">{{ item.language }}</text>
					</view>
					<view class="language" style="width: 120rpx;">
						<view class="cuIcon-favorfill"></view>
						<text style="font-size: 26rxp;margin-left: 10rpx;">{{ item.starCount }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-load bg-white" v-if="showLoadMore" :class="isLoading ? 'loading' : 'over'"></view>
	</view>
</template>

<script>
import api from '../../api/api.js';
import util from '../../common/util.js';
export default {
	data() {
		return {
			params: {
				page: 1,
				per_page: 10,
				q: 'Gank',
				order: 'desc',
				sort: 'stars'
			},
			showLoadMore: false,
			isLoading: true,
			dataList: []
		};
	},
	onLoad() {
		this.getList();
	},
	onReachBottom() {
		this.scrollToLoadMore();
	},
	methods: {
		getList() {
			this.showLoadMore = true;
			uni.request({
				method: 'GET',
				data: this.params,
				url: 'https://api.github.com/search/repositories',
				success: res => {
					if (res.statusCode == 200) {
						res.data.items.map(item => {
							item.updated_at = util.formatDate(new Date(item.updated_at));
							item.languageColor = util.getLanguageColor(item.language);
							item.starCount = util.friendNum(item.stargazers_count);
						});
						this.dataList = this.params.page == 1 ? res.data.items : this.dataList.concat(res.data.items);
						if (res.data.items.length >= parseInt(res.data.total_count)) {
							this.isLoading = false;
						} else {
							this.showLoadMore = false;
							this.params.page++;
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.errMsg
						});
					}
				},
				fail: e => {
					uni.showToast({
						icon: 'none',
						title: '网络异常！'
					});
				}
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
		},
		ownerClick(e) {
			let url = e.currentTarget.dataset.owner;
			uni.navigateTo({
				url: `/pages/web/web?url=${encodeURIComponent(url)}`
			});
		}
	}
};
</script>

<style>
.page-other .text-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #007aff;
}

.page-other .text-box {
	display: flex;
	flex-direction: column;
}

.page-other .avatar-box {
	display: flex;
	align-items: center;
	padding: 30rpx 0;
}

.page-other image {
	width: 50rpx;
	height: 50rpx;
	border-radius: 50%;
}

.page-other .avatar-box .name {
	flex: 1;
	font-size: 26rpx;
	color: #0081ff;
	padding: 0 10rpx;
}

.language {
	display: flex;
	align-items: center;
	width: 200rpx;
}

.language .icon-point {
	width: 24rpx;
	height: 24rpx;
	background-color: #007aff;
	border-radius: 50%;
	display: inline-block;
}
</style>
