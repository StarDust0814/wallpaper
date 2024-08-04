<template>
	<view class="classlist">
		<view class="content">
			<navigator url="/pages/preview/preview" class="item" v-for="item in classList" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
	</view>
</template>

<script setup>
import { apiGetClassList } from '@/api/apis.js';
// 判断是否还有数据可以请求
const noData = ref(false);
// 从URL中获取分类的类别ID
const queryParams = { pageSize: 12, pageNum: 1 };
onLoad((e) => {
	let { id = null, name = null } = e;
	queryParams.classid = id;
	uni.setNavigationBarTitle({
		title: name
	});
	// 放到这里才能确保获取到URL需要的参数后再去请求数据，然后才是渲染组件
	getClassList();
});
const classList = ref([]);
const getClassList = async () => {
	let res = await apiGetClassList(queryParams);

	classList.value = [...classList.value, ...res.data];
	// 如果没有新数据需要请求，进行标记
	if (queryParams.pageSize > res.data.length) noData.value = true;
};

onReachBottom(() => {
	if (noData.value) return;
	queryParams.pageNum++;
	getClassList();
});

// 触底加载新数据
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
