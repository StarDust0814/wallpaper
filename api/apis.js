// 将非业务逻辑的请求接口代码封装
import {
	request
} from '@/utils/request.js'

export function apiGetBanner() {
	return request({
		url: '/homeBanner'
	});
}

export function apiDayRandom() {
	return request({
		url: '/randomWall'
	});
}

export function apiGetNotice(data = {}) {
	return request({
		url: "/wallNewsList",
		data
	})
}

export function apiGetClassify(data = {}) {
	return request({
		url: "/classify",
		data
	})
}

export function apiGetClassList(data = {}) {
	return request({
		url: "/wallList",
		data
	})
}

export function apiGetSetupScore(data = {}) {
	return request({
		url: "/setupScore",
		data
	})
}