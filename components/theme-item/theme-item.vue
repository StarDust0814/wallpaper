<template>
	<view class="themeItem">
		<navigator :url="'/pages/classlist/classlist?id=' + item._id + '&name=' + item.name" class="box" v-if="!isMore">
			<image class="pic" :src="item.picurl" mode="aspectFill"></image>
			<view class="mask">{{ item.name }}</view>
			<view class="tab">{{ compareTimestamp(item.updateTime) }}前更新</view>
		</navigator>
		<navigator url="/pages/classify/classify" open-type="reLaunch" class="box more" v-if="isMore">
			<image class="pic" src="../../common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
import { compareTimestamp } from '@/utils/common.js';
// 判断网格中要渲染的是more选项卡还是正常的图片
defineProps({
	isMore: {
		type: Boolean,
		default: false
	},
	// 传参渲染的对象
	item: {
		type: Object,
		default() {
			return {
				name: '默认名称',
				picurl: '../../common/images/classify1.jpg',
				updateTime: Date.now() - 1000 * 60 * 60 * 5
			};
		}
	}
});
</script>

<style lang="scss">
.themeItem {
	.box {
		height: 340rpx;
		border-radius: 10rpx;
		/* 控制相对位置 */
		position: relative;
		overflow: hidden;
		.pic {
			width: 100%;
			height: 100%;
		}
		.mask {
			width: 100%;
			height: 70rpx;
			/* 控制相对位置 */
			position: absolute;
			bottom: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.2);
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 600;
			/* 蒙版磨砂效果 */
			backdrop-filter: blur(20rpx);
		}
		.tab {
			position: absolute;
			left: 0;
			top: 0;
			background: rgba(250, 129, 90, 0.7);
			color: #fff;
			padding: 6rpx 14rpx;
			border-radius: 0 0 20rpx 0;
			font-size: 22rpx;
			transform: scale(0.8);
			transform-origin: left top;
		}
	}
	.box.more {
		.mask {
			width: 100%;
			height: 100%;
			flex-direction: column;
		}
		.text {
			font-size: 28rpx;
		}
	}
}
</style>
