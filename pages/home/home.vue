<template name="home">
	<view>
		<!-- 顶部轮播图 -->
		<swiper v-if="girlPicList.length>0" :class="showCardSwiper?'card-swiper':'screen-swiper'" :indicator-dots="false"
		 :circular="true" :autoplay="true" interval="3000" duration="500" @change="bannerPageChange">
			<swiper-item v-for="(item,index) in girlPicList" :key="index" :class="currCard==index?'cur':''" @tap="bannerItemClick"
			 :data-picurl="item.url">
				<view class="swiper-item" v-if="showCardSwiper">
					<image src="item.url" mode="aspectFill" referrerpolicy="no-referrer"></image>
				</view>
				<image v-if="!showCardSwiper" src="item.url" mode="aspectFill" referrerpolicy="no-referrer"></image>
			</swiper-item>
		</swiper>
		<!-- 数据列表 -->
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in dataList" :key="index">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="item.img"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.title}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{item.content}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	
	export default {
		data() {
			return {
				showCardSwiper: true, //是否显示卡片样式banner
				currCard: 0, //当前卡片位置
				girlPicList: [],
				dataList: []
			}
		},
		methods: {
			/**
			 * @param {Object} event 轮播页面切换
			 */
			bannerPageChange(event) {

			},

			bannerItemClick(event) {

			}
		}
	}
</script>

<style>

</style>
