<template name="girl">
	<view>
		<!-- #ifndef H5 -->
		<scroll-view scroll-y="true" class="page" lower-threshold="60px" @scrolltolower="onLoadMore">
			<!-- #endif -->
			<view class="flex girl-flex">
				<!-- 左半边列表 -->
				<view class="flex-sub">
					<view
						class="girl-img left-img radius shadow bg-white"
						:style="[{ height: (index == 0 ? 180 : 240) + 'px' }]"
						v-for="(item, index) in leftList"
						:key="item.url"
						:data-url="item.url"
						@tap="onImgClick"
					>
						<image :src="item.url.replace('large', 'bmiddle')" mode="aspectFill" class="radius img" lazy-load="true" referrerpolicy="no-referrer"></image>
						<view class="img-desc">{{ item.desc }}</view>
					</view>
				</view>
				<!-- 右半边列表 -->
				<view class="flex-sub">
					<view class="girl-img right-img radius shadow bg-white" v-for="(item, index) in rightList" :key="item.url" :data-url="item.url" @tap="onImgClick">
						<image :src="item.url.replace('large', 'bmiddle')" mode="aspectFill" class="radius img" lazy-load="true" referrerpolicy="no-referrer"></image>
						<view class="img-desc">{{ item.desc }}</view>
					</view>
				</view>
			</view>
			<view class="cu-load bg-white" v-if="showLoadmore" :class="isLoading ? 'loading' : 'over'"></view>
			<!-- 占位 -->
			<view class="cu-tabbar-height"></view>
			<!-- #ifndef H5 -->
		</scroll-view>
		<!-- #endif -->
	</view>
</template>

<script>
import api from '../../api/api.js';
export default {
	data() {
		return {
			showLoadmore: false,
			isLoading: true,
			page: 1,
			leftList: [],
			rightList: []
		};
	},
	created: function() {
		uni.showLoading({
			title: '福利马上来~'
		});
		this.getGirls();
	},
	methods: {
		getGirls() {
			this.showLoadmore = true;
			api.get(`/data/福利/10/${this.page}`)
				.then(res => {
					uni.hideLoading();
					let leftList = [];
					let rightList = [];
					let data = res.results;
					for (let i = 0; i < data.length; i++) {
						var item = data[i];
						if (i % 2 == 0) {
							leftList.push(item);
						} else {
							rightList.push(item);
						}
					}
					this.leftList = this.page == 1 ? leftList : this.leftList.concat(leftList);
					this.rightList = this.page == 1 ? rightList : this.rightList.concat(rightList);
					if (data.length < 10) {
						this.isLoading = false;
					} else {
						this.showLoadmore = false;
						this.page++;
					}
				})
				.catch(e => {
					if (this.page == 1) {
						this.leftList = [];
						this.rightList = [];
					}
					this.isLoading = false;
				});
		},
		onLoadMore() {
			if (!this.showLoadmore && this.isLoading) {
				this.getGirls();
			}
		},
		onImgClick(event) {
			let url = event.currentTarget.dataset.url;
			uni.previewImage({
				urls: [url]
			});
		}
	}
};
</script>

<style>
.girl-flex {
	align-items: flex-start;
}

.girl-img {
	width: 47vw;
	display: inline-block;
	height: 240px;
	position: relative;
}

.girl-img image {
	width: 100%;
	height: 100%;
}

.girl-img.left-img {
	margin: 2vw 1vw 0vw 2vw;
}

.girl-img.right-img {
	margin: 2vw 2vw 0vw 1vw;
}

.img-desc {
	background-color: rgba(0, 0, 0, 0.4);
	width: 100%;
	padding: 15rpx;
	position: absolute;
	left: 0;
	bottom: 0;
	color: #ffffff;
	text-align: center;
	border-bottom-left-radius: 6rpx;
	border-bottom-right-radius: 6rpx;
}
</style>
