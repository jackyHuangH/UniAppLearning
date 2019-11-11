function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

// ---------------------------自定义方法---------------------------------------

const formatTimeString = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
const formatDate = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	return [year, month, day].map(formatNumber).join('-');
}
const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
const getLanguageColor = language => {
	switch (language) {
		case "Java":
			return "#b07219";
		case "JavaScript":
			return "#f1e05a";
		case "Kotlin":
			return "#F18E33";
		case "Dart":
			return "#00B4AB";
		case "Objective-C":
			return "#438eff";
		case "Swift":
			return "#ffac45";
		case "Python":
			return "#3572A5";
		case "HTML":
			return "##438ef";
		case "CSS":
			return "#563d7c";
		case "C#":
			return "#178600";
		case "Vue":
			return "#2c3e50";
		case "PHP":
			return "#4F5D95";
		case "TypeScript":
			return "#2b7489";
		default:
			return "#F18E33";
	}
}

const friendNum = num => {
	if (num <= 1000) {
		return num;
	} else if (num > 1000 && num <= 100 * 1000) {
		return (num / 1000).toFixed(1) + "k";
	} else {
		return parseInt(num / 1000) + "k";
	}
}

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	formatTimeString:formatTimeString,
	formatDate: formatDate,
	getLanguageColor: getLanguageColor,
	friendNum: friendNum
}
