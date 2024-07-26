<template>
	<view class="homeLayout">
		<view class="banner">
			<swiper circular indicator-dots indicator-active-color="#fff" indicator-color="rgba(255,255,255,0.5)" autoplay>
				<swiper-item v-for="item in 3">
					<image src="../../common/images/banner1.jpg" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script setup></script>

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
				image {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
		}
	}
}
</style>
