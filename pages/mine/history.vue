<!-- 历史干货 -->
<template>
	<view class="">
		<view v-for="(item, index) in dataList" :key="index" class="history-item" @tap="onItemClick" :data-index="index">
			<image class="bg-white shadow" :src="item.imageUrl" mode="aspectFill" referrerpolicy="no-referrer" lazy-load="true"></image>
			<view class="item-mask">
				<view class="time">{{ item.date }}</view>
				<view class="hot">{{ item.title }}</view>
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
			dataList: [],
			pageNum: 1,
			showLoadMore: false,
			isLoading: true
		};
	},
	mounted() {
		this.getList();
	},
	onReachBottom() {
		this.scrollToLoadMore();
	},
	methods: {
		getList() {
			this.showLoadMore = true;
			api.get(`/history/content/10/${this.pageNum}`)
				.then(res => {
					// 数据整理
					let regex = new RegExp('src="(.+?)"');
					res.results.map(item => {
						item.imageUrl = regex.exec(item.content)[1];
						item.imageUrl = item.imageUrl.replace('large', 'mw690');
						item.date = util.formatDate(new Date(item.publishedAt));
					});

					let data = res.results;
					this.dataList = this.pageNum == 1 ? data : this.dataList.concat(data);
					if (data.length < 10) {
						this.isLoading = false;
					} else {
						this.showLoadMore = false;
						this.pageNum++;
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
			if (!this.showLoadMore && this.isLoading) {
				this.getList();
			}
		},
		onItemClick(e) {
			let index = e.currentTarget.dataset.index;
			let item = this.dataList[index];
			uni.navigateTo({
				url: `/pages/mine/historydetail?date=${item.date}`
			});
		}
	}
};
</script>

<style>
.history-item {
	position: relative;
	width: 92vw;
	margin: 30rpx 4vw;
}
.history-item image {
	width: 100%;
	height: 340rpx;
	border-radius: 12rpx;
}
.history-item .item-mask {
	background-color: rgba(0, 0, 0, 0.2);
	width: 100%;
	height: 340rpx;
	border-radius: 12rpx;
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center; /* 垂直居中 */
	text-align: center; /* 水平居中 */
	top: 0;
	left: 0;
}
.item-mask .time {
	color: #ffffff;
	font-size: 32rpx;
	font-weight: bold;
	/* position: absolute;
	left: 30rpx;
	top: 130rpx; */
}

.item-mask .hot {
	color: #ffffff;
	font-size: 28rpx;
	/* position: absolute;
	left: 30rpx;
	top: 180rpx; */
}
</style>
