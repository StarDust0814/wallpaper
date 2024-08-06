<template>
	<view class="classlist">
		<view class="loadingLayout" v-if="!classList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator :url="'/pages/preview/preview?id=' + item._id" class="item" v-for="item in classList" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>

		<view class="loadingLayout" v-if="classList.length || noData">
			<uni-load-more :status="noData ? 'noMore' : 'loading'"></uni-load-more>
		</view>

		<!--移动端防止底部按钮遮挡加载组件-->
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
import { apiGetClassList, apiGetHistoryList } from '@/api/apis.js';
import { gotoHome } from '@/utils/common.js';
// 判断是否还有数据可以请求
const noData = ref(false);
// 从URL中获取分类的类别ID
const queryParams = { pageSize: 12, pageNum: 1 };
let pageName;
onLoad((e) => {
	let { id = null, name = null, type = null } = e;
	if (type) queryParams.type = type;
	if (id) queryParams.classid = id;
	if (!id && !type) gotoHome();

	pageName = name;
	uni.setNavigationBarTitle({
		title: name
	});
	// 放到这里才能确保获取到URL需要的参数后再去请求数据，然后才是渲染组件
	getClassList();
});
const classList = ref([]);

const getClassList = async () => {
	let res;
	if (queryParams.classid) res = await apiGetClassList(queryParams);
	if (queryParams.type) res = await apiGetHistoryList(queryParams);

	classList.value = [...classList.value, ...res.data];
	// 如果没有新数据需要请求，进行标记
	if (queryParams.pageSize > res.data.length) noData.value = true;
	// 缓存URL
	uni.setStorageSync('storageClassList', classList.value);
};

onReachBottom(() => {
	if (noData.value) return;
	queryParams.pageNum++;
	getClassList();
});

// 触底加载新数据

// 分享需要携带参数
onShareAppMessage((e) => {
	return {
		title: '壁纸-' + pageName,
		path: '/pages/classlist/classlist?id=' + queryParams.classid + '&name=' + pageName
	};
});
onShareTimeline(() => {
	return {
		title: '壁纸'
	};
});
// 下拉刷新
onPullDownRefresh(() => {
	getClassList();
	setTimeout(() => {
		uni.stopPullDownRefresh();
	}, 1000);
});
</script>

<style lang="scss" scoped>
.classlist {
	.content {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5rpx;
		padding: 5rpx;
		.item {
			height: 440rpx;
			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
</style>
