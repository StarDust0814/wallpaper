<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<view class="banner">
			<swiper circular indicator-dots indicator-active-color="#fff" indicator-color="rgba(255,255,255,0.5)" autoplay>
				<swiper-item v-for="item in bannerList" :key="item._id">
					<navigator v-if="item.target == 'miniProgram'" :url="item.url" class="like" target="miniProgram" :app-id="item.appid">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
					<navigator v-else :url="`/pages/classlist/classlist?${item.url}`" class="like">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay interval="1500" duration="300" circular>
					<swiper-item v-for="item in noticeList" :key="item._id">
						<navigator :url="'/pages/notice/detail?id=' + item._id">{{ item.title }}</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="right"><uni-icons type="right" size="16" color="#333"></uni-icons></view>
		</view>

		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="16"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="item in randomList" :key="item._id" @click="goPreview">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="/pages/classify/classify" open-type="reLaunch" class="more">More+</navigator>
				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
const goPreview = () => {
	uni.navigateTo({
		url: '/pages/preview/preview'
	});
	// 缓存到浏览器本地（分享页跳转的数据源)
	uni.setStorageSync('storageClassList', randomList.value);
};
import { apiGetBanner, apiDayRandom, apiGetNotice, apiGetClassify } from '@/api/apis.js';
// 顶部轮播图接口
const bannerList = ref([]);
const getBanner = async () => {
	let res = await apiGetBanner();
	bannerList.value = res.data;
};
// 每日推荐接口
const randomList = ref([]);
const getDayRandom = async () => {
	let res = await apiDayRandom();
	randomList.value = res.data;
};
// 公告接口
const noticeList = ref([]);
const getNotice = async () => {
	let res = await apiGetNotice({
		select: true
	});
	noticeList.value = res.data;
};
// 分类接口
const classifyList = ref([]);
const getClassify = async () => {
	let res = await apiGetClassify({ select: true });
	classifyList.value = res.data;
};

getBanner();
getDayRandom();
getNotice();
getClassify();

// 分享
onShareAppMessage((e) => {
	return {
		title: '壁纸',
		path: '/pages/index/index'
	};
});
onShareTimeline(() => {
	return {
		title: '壁纸'
	};
});
</script>

<style lang="scss" scoped>
.homeLayout {
	.banner {
		width: 750rpx;
		padding: 30rpx 0;
		swiper {
			width: 750rpx;
			height: 340rpx;
			/* &代表将父级名称填到此处 */
			&-item {
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
				.like {
					width: 100%;
					height: 100%;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
			}
		}
	}

	.notice {
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #f9f9f9;
		margin: 0 auto;
		border-radius: 80rpx;
		display: flex;
		.left {
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			/*由于H5和小程序的组件编译效果不同，这里修改样式要使用穿透*/
			:deep() {
				.uni-icons {
					color: $brand-theme-color !important;
				}
			}

			.text {
				color: $brand-theme-color;
				font-weight: 600;
				font-size: 28rpx;
			}
		}
		.center {
			flex: 1;
			swiper {
				height: 100%;
				&-item {
					height: 100%;
					font-size: 30rpx;
					color: #666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.right {
			width: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.select {
		padding-top: 50rpx;
		.date {
			color: $brand-theme-color;
			display: flex;
			align-items: center;
			.text {
				margin-left: 5rpx;
			}
			:deep() {
				.uni-icons {
					color: $brand-theme-color !important;
				}
			}
		}
		.content {
			width: 720rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;
			scroll-view {
				/* 设置不让其换行 */
				white-space: nowrap;
				.box {
					width: 200rpx;
					height: 430rpx;
					/* 排布方式为横向排布 */
					display: inline-block;
					margin-right: 15rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				/* 选择box中的最后一个元素，将其右边距改成和左边距一致的30rpx*/
				.box:last-child {
					margin-right: 30rpx;
				}
			}
		}
	}

	.theme {
		padding: 50rpx 0;
		.more {
			color: #888;
			font-size: 32rpx;
		}
		.content {
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3, 1fr);
		}
	}
}
</style>
