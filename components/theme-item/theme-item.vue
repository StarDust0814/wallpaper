<template>
	<view class="themeItem">
		<navigator url="" class="box">
			<image class="pic" src="../../common/images/classify1.jpg" mode="aspectFill"></image>
			<view class="mask">明星美女</view>
			<view class="tab">3天前更新</view>
		</navigator>
	</view>
</template>

<script setup></script>

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
}
</style>
