// api 封装,字符串拼接的时候用``,不是''
"use strict"

let get = (url) => new Promise((resolve, reject) => {
	let requestUrl = `http://gank.io/api${url}`;
	// #ifdef H5
	requestUrl = '/h5api${url}';
	// #endif
	uni.request({
		url: requestUrl,
		method: "GET",
		success: (res) => {
			if (res.statusCode == 200) {
				if (res.data.error) {
					reject(res.data.error)
				} else {
					resolve(res.data)
				}
			} else {
				reject(res.errMsg)
			}
		},
		fail: (e) => {
			reject("网络异常,请检查网络设置！")
		}
	})
});

let post = (url, params) => new Promise((resolve, reject) => {
	uni.request({
		url: `http://gank.io/api${url}`,
		method: "POST",
		header: {
			"content-type": "application/x-www-form-urlencoded" //默认值
		},
		success: (res) => {
			if (res.statusCode == 200) {
				if (res.data.error) {
					reject(res.data.error)
				} else {
					resolve(res.data)
				}
			} else {
				reject(res.errMsg)
			}
		},
		fail: (e) => {
			reject("网络异常，请检查网络设置！")
		}
	})
});

// 模块导出，供外界引用
module.exports = {
	get,
	post
}
