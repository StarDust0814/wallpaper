<template>
	<view class="classLayout pageBg">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify">
			<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
		</view>
	</view>
</template>

<script setup>
import { apiGetClassify } from '@/api/apis';
const classifyList = ref([]);
const getClassify = async () => {
	let res = await apiGetClassify({ pageSize: 15 });
	classifyList.value = res.data;
};
getClassify();
// 分享
onShareAppMessage((e) => {
	return {
		title: '壁纸',
		path: '/pages/classify/classify'
	};
});
onShareTimeline(() => {
	return {
		title: '壁纸'
	};
});
</script>

<style lang="scss" scoped>
.classify {
	padding: 30rpx;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 15rpx;
}
</style>
