// api 封装
"use strict"
let get = (url) => new Promise((resolve, reject) => {
	let requestUrl = 'http://gank.io/api${url}';
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
