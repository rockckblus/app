/**
 * localData.dipan.localDataNav.factory.js
 * 命名注释：server简称_localData. 父模块 dipan . 功能_本地 & app 默认数据. 类型_factory.js
 */

(function() {
	'use strict';
	angular.module('dipan').factory('localData', localData);

	localData.$inject = ['$location', 'tools', '$rootScope', 'config', '$filter', '$q'];

	var location;
	var thisLocalData = {};
	var thisTools = {};
	var thisRootScope;
	var _config;
	var _filter;
	var q;

	function localData($location, tools, $rootScope, config, $filter, $q) {
		thisRootScope = $rootScope;
		location = $location;
		thisLocalData.memberIndexNav = _memberIndexNav(); //我的 首页导航list
		thisLocalData.setting = _settingNav(); //设置 导航list
		thisLocalData.tab = _tab; //根据 url 遍历 给tab数据
		thisLocalData.shaiXuan = _shaiXuan; //根据 url 遍历 筛选条件
		thisLocalData.showTab = _showTab; //遍历url 返回true false ,控制是否显示tab
		thisLocalData.getTitle = _getTitle; //getTitle
		thisLocalData.giveRoundCode = _giveRoundCode; // 给一个8位随机码,验证短信用
		thisLocalData.gps = {
			isHaveGps: false, //判断
		};
		thisLocalData.loginImg = getLoginImg(); //登录页面bset64 图标
		thisLocalData._init = function() {
			thisTools = tools;
			_config = config;
			_filter = $filter;
			q = $q;
			thisLocalData.giveRoundCode();
			getGps();
		};

		//start
		thisLocalData._init();
		return thisLocalData;
	}

	/**
	 * getTitle 获取标题
	 * @param {网址}url
	 * @returns {*}
	 * @private
	 */
	function _getTitle(url) {
		switch (url) {
			case '/memberIndex':
				return __getUserTitle();
			case '/home':
				return _filter('toHtml')('<span class="fa fa-caret-down" style="margin-left: 10px"></span>');
			case '/need':
				return _filter('toHtml')('');
			case '/star':
				return _filter('toHtml')('标记');
			case '/login':
				return _filter('toHtml')('兼职鼠');
			case '/area':
				return _filter('toHtml')('地区选择');
			case '/search':
				return _filter('toHtml')('搜索');
			case '/setting':
				return _filter('toHtml')('设置');
			default:
				return _filter('toHtml')('兼职鼠');
		}

		/**
		 * 获取用户手机,头像,昵称
		 * 有昵称显示昵称,没有显示手机号
		 * @private
		 */
		function __getUserTitle() {
			var userData = thisTools.getLocalStorageObj('userData');
			try {
				var reStr = '';
				if (userData.headerImg) {
					reStr += '<img class="hImg" src="' + userData.headerImg + '" /> &nbsp;';
				}
				if (userData.mt) {
					reStr += userData.mt;
				}
				return _filter('toHtml')(reStr);
			} catch (e) {
				return '我的';
			}
		}
	}

	/**
	 * 我的 首页 导航 list
	 * @returns {*[]}
	 * @private
	 */
	function _memberIndexNav() {
		return [{
			'name': '我的地盘',
			'url': 'myArea',
			'id': 1,
			'hrefId': 'hrefMemberMyArea',
			'icon': 'fa fa-map-marker fa-1x'
		}, {
			'name': '我的发布',
			'url': 'push',
			'id': 2,
			'hrefId': 'hrefMemberPush',
			'icon': 'fa fa-sign-out fa-1x'
		}, {
			'name': '设置',
			'url': 'setting',
			'hrefId': 'hrefMemberSetting',
			'id': 3,
			'icon': 'fa fa-sign-out fa-1x'
		}];
	}

	/**
	 * 我的 > 设置 导航 list
	 * @returns {*[]}
	 * @private
	 */
	function _settingNav() {
		return [
			// {
			//     'name': '资料编辑',
			//     'url': 'memberInfo',
			//     'id': 1,
			//     'hrefId': 'hrefMemberMemberInfo',
			//     'icon': 'fa fa-pencil-square-o fa-1x'
			// },
			{
				'name': '退出登录',
				'url': 'loginOut',
				'id': 1,
				'hrefId': 'hrefMemberLoginOut',
				'icon': 'fa fa-sign-out fa-1x'
			}, {
				'name': '测试snsArticle添加',
				'url': 'member_addArticle',
				'hrefId': 'hrefMemberAddArticle',
				'id': 2,
				'icon': 'fa fa-sign-out fa-1x'
			}
		];
	}

	/**
	 * 遍历url 返回true false ,控制是否显示tab
	 * @param url
	 * @returns {boolean}
	 * @private
	 */
	function _showTab(url) {
		switch (url) {
			case '/home':
				return true;
			case '/need':
				return true;
			case '/star':
				return true;
			case '/memberIndex':
				return true;
			default:
				return false;
		}
	}

	/**
	 * 遍历url 给筛选数据
	 * @param url
	 * @returns {boolean}
	 * @private
	 */
	function _shaiXuan(url) {
		switch (url) {
			case '/home':
				return [
					[{
						id: 'homeShaiXuanThree1',
						name: '男',
						type: 'more',
					}, ],
					[{
							id: 'homeShaiXuanThree2',
							name: '女',
							type: 'more',
						},

					],
					[{
						id: 'homeShaiXuanOne3',
						name: '人气',
						type: 'two',
					}, ],
					[{
						id: 'homeShaiXuanTwo4',
						name: '活跃',
						type: 'two',
					}, ],
				];
			case '/need':
				return [
					[{
						id: 'needShaiXuanTwo2',
						name: '最新',
						type: 'four',
					}, ],
					[{
						id: 'needShaiXuanOne2',
						name: '价格',
						type: 'four',
					}, ],
					[{
						id: 'needShaiXuanThree1',
						name: '信誉',
						type: 'four',
					}],
					[{
						id: 'needShaiXuanTwo3',
						name: '线上服务',
						type: 'five',
					}, ],
				];
			default:
				return false;
		}
	}

	/**
	 * 根据 url 遍历 给tab数据
	 * @param url
	 * @returns {Array}
	 * @private
	 */
	function _tab(url) {
		var _obj = [];
		var title = _getTitle();
		var _objDefaulOne = {
			colNumCss: 'twoTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
			thisItem: 'thisItem', //高亮 css 名称
			name: title, //名称
			route: url //routeUrl
		};
		switch (url) {
			case '/home':
				_obj = [{
					colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
					thisItem: _objDefaulOne.thisItem, //高亮
					name: '技能', //名称
					route: 'hrefTabHome', //routeUrl
					stateName: 'home', //routeUrl
				}, {
					colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
					thisItem: false, //高亮
					name: '需求', //名称
					route: 'hrefTabNeed', //routeUrl
					stateName: 'need', //routeUrl
				}, {
					colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
					thisItem: false, //高亮
					name: '<i class="fa fa-star-o"></i>', //名称
					route: 'hrefTabStar', //routeUrl
					stateName: 'star', //routeUrl
				}];
				return _obj;
			case '/need':
				_obj = [{
					colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
					thisItem: false, //高亮
					name: '技能', //名称
					route: 'hrefTabHome', //routeUrl
					stateName: 'home', //routeUrl
				}, {
					colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
					thisItem: 'thisItem', //高亮
					name: '需求', //名称
					route: 'hrefTabNeed', //routeUrl
					stateName: 'need', //routeUrl
				}, {
					colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
					thisItem: false, //高亮
					name: '<i class="fa fa-star-o"></i>', //名称
					route: 'hrefTabStar', //routeUrl
					stateName: 'star', //routeUrl
				}];
				return _obj;
			case '/star':
				_obj = [{
					colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
					thisItem: false, //高亮
					name: '技能', //名称
					route: 'hrefTabHome', //routeUrl
					stateName: 'home', //routeUrl
				}, {
					colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
					thisItem: false, //高亮
					name: '需求', //名称
					route: 'hrefTabNeed', //routeUrl
					stateName: 'need', //routeUrl
				}, {
					colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
					thisItem: 'thisItem', //高亮
					name: '<i class="fa fa-star-o"></i>', //名称
					route: 'hrefTabStar', //routeUrl
					stateName: 'star', //routeUrl
				}];
				return _obj;

			case '/memberIndex':
				_obj = [{
					colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
					thisItem: false, //高亮
					name: '粉丝 ' + _getUserData('fensi'), //名称
					route: 'hrefTabFensi', //routeUrl
					stateName: 'fensi', //routeUrl
				}, {
					colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
					thisItem: false, //高亮
					name: '关注 ' + _getUserData('guanzhu'), //名称
					route: 'hrefTabGuanZhu', //routeUrl
					stateName: 'guanzhu', //routeUrl
				}, {
					colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
					thisItem: false, //高亮
					name: '联系 ' + _getUserData('lianxi'), //名称
					route: 'hrefTabLianXi', //routeUrl
					stateName: 'lianxi', //routeUrl
				}, ];


				return _obj;
			case '/login':
				_obj = [{
					colNumCss: _objDefaulOne.colNumCss, //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
					thisItem: _objDefaulOne.thisItem, //高亮
					name: '登录', //名称
					route: 'login' //routeUrl
				}, {
					colNumCss: _objDefaulOne.colNumCss, //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
					thisItem: false, //高亮
					name: '设置', //名称
					route: 'memberIndex' //routeUrl
				}, ];
				return _obj;
			default:
				return [];
		}


		/**
		 * 获取用户 粉丝 关注 联系
		 * @param {string 字段名称} field
		 * @return {string} 对应的 统计数量
		 * @private
		 */
		function _getUserData(field) {
			var userData = thisTools.getLocalStorageObj('userData');
			if (userData[field]) {
				var endStr = '<i style="font-size: 12px">' + userData[field] + '</i>';
				if (userData[field + '_height']) {
					endStr += '<i class="fa fa-ellipsis-h fa-2x" style="width: 7px;overflow-x: hidden;color:#bd0000;position:absolute;margin-left:-1px;margin-top:-7px;"></i>';
				}
				return endStr;

			} else {
				return '';
			}
		}


	}

	/**
	 * get gps 获取gps 或者 ip定位 拿到 gps(web), 给到 gpsObj
	 * 广播全局 gps 事件.
	 */
	function getGps() {
		thisTools.trueWeb(_web, _app); //判断手机 或者 app 来判断 定位 ,获取地理位置数据

		/*************************
		 * todo
		 * //获取 ip地址,去反查地址数据
		 * 16/8/19 上午7:43 ByRockBlus
		 *************************/
		function _web() {

			//todo 由于被墙 无法正常使用
			// if (window.navigator.geolocation) {
			//     console.log('1111',111);
			//     var options = {
			//         enableHighAccuracy: true,
			//     };
			//     window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
			//
			// } else {
			//     alert("浏览器不支持html5来获取地理位置信息");
			// }
			//
			// function handleSuccess(re) {
			//     console.log('re', re);
			// }
			//
			// function handleError(err) {
			//     console.log('re2', err);
			// }
			//
			// return;

			var url = _config.host.phpHost + '/Api/Jsonp/getIP/from/web'; //获取浏览器ip

			thisTools.getJsp(url, true).then(_s1).then(_s2).then(_s3, _err);

			/**
			 * 获取浏览器ip re.ip
			 * @private
			 */
			function _s1(re1) {
				re1.ip = '123.150.38.2'; //todo 测试用

				var defered = q.defer();
				var url1 = _config.host.nodeHost + '/soso/sosoApi/ipToCity?ip=' + re1.ip; //获取城市
				thisTools.getJsp(url1, true).then(function(re2) {
					defered.resolve(re2);
				}, function(err) {
					defered.reject(err);
				});

				return defered.promise;
			}

			function _s2(re2) {
				var defered = q.defer();
				var city = JSON.parse(JSON.parse(re2));
				city = city.city;
				var url2 = _config.host.nodeHost + '/soso/sosoApi/strToGps?str=' + city; //获取城市ip
				thisTools.getJsp(url2, true).then(function(re3) {
					defered.resolve(re3);
				}, function(err) {
					defered.reject(err);
				});
				return defered.promise;
			}

			function _s3(re3) {
				console.log('re3', re3);
			}

			function _err(e) {
				console.error('error', e);
			}



		}

		/*************************
		 *获取手机导航gps,去soso拿地址数据
		 * 16/8/19 上午7:43 ByRockBlus
		 *************************/
		function _app() {
			var gpsObj = {};

			// H5 plus事件处理
			function plusReady() {
				if (!window.plus) {
					return;
				}
				setTimeout(function() {
					//todo ios 真机调试
					plus.geolocation.getCurrentPosition(_success, _err, _option);
				}, 0);
			}

			if (window.plus) {
				plusReady();
			} else {
				document.addEventListener("plusready", plusReady, false);
			}


			//定位成功回调
			function _success(p) {
				gpsObj.lat = p.coords.latitude;
				gpsObj.lng = p.coords.longitude;
				thisTools.alert({
					'title': 'title' + gpsObj.lat,
					'content': gpsObj.lng
				});
			}

			//失败回调
			function _err(e) {
				console.log(e);
				thisTools.alert({
					title: '获取位置失败',
					content: e.message
				});
			}

			//参数配置
			/**************************
			 * enableHighAccuracy: (Boolean 类型 )是否高精确度获取位置信息
			 高精度获取表示需要使用更多的系统资源，默认值为false。

			 timeout: (Number 类型 )获取位置信息的超时时间
			 单位为毫秒（ms），默认值为不超时。如果在指定的时间内没有获取到位置信息则触发错误回调函数。

			 maximumAge: (Number 类型 )获取位置信息的缓存时间
			 单位为毫秒（ms），默认值为0（立即更新获取）。如果设备缓存的位置信息超过指定的缓存时间，将重新更新位置信息后再返回。

			 provider: (String 类型 )优先使用的定位模块
			 可取以下供应者： "system"：表示系统定位模块，支持wgs84坐标系；
			 "baidu"：表示百度定位模块，支持gcj02/bd09/bd09ll坐标系；
			 "amap"：表示高德定位模板，支持gcj02坐标系。
			 默认值按以下优先顺序获取（amap>baidu>system），若指定的provider不存在或无效则返回错误回调。
			 注意：百度/高德定位模块需要配置百度/高德地图相关参数才能正常使用。
			 * 16/8/21 上午7:43 ByRockBlus
			 **************************/

			function _option() {
				return {
					enableHightAccuracy: false,
					timeout: 10000,
					maximumAge: 600000,
				};
			}
		}

		/**
		 * 写入gps数据到 本地数据库
		 * 传gps坐标,城市名称
		 */
		function writeDbGps(gpsObj, city) {
			var area = {
				gpsObj: gpsObj,
				city: city
			};
			thisTools.saveLocalStorageObj('area', area);
		}
	}

	/*************************
	 * 根据 ip 定位城市
	 * 16/9/2 上午8:09 ByRockBlus
	 *************************/
	function ipToCity() {
		console.log('arg', arguments);

	}

	/*************************
	 * 根据gps 定位城市,并返回 具体信息 (app)
	 * 16/9/2 上午8:10 ByRockBlus
	 *************************/

	/**
	 * 第一次后给localStorage一个随机码,验证用户发送短信用
	 * @private
	 */
	function _giveRoundCode() {
		localStorage.removeItem(_config.localSaveName.user.roundCodeId);
		setTimeout(function() {
			var roundCode = thisTools.getRoundCode(8);
			localStorage.setItem(_config.localSaveName.user.roundCodeId, roundCode);
		}, 200);
	}

	/**
	 * login 页面图标
	 */
	function getLoginImg() {
		var img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABJRJREFUeNrsWl1u2kAQNlHes32o1LeAeoDCCWJOEDhB4AQhJwBOAJwAcoLQE2BOgHOAKvStUl+4QbsjfW6nm7W9s2sTtfVIKxSy9uw3/zNLFDXUUEMNNdRQQw2diVo+D3388F7pj4let3p19Trqlei1+vLte1rlATWvtv64Z3z2em01n9NZAOsDEOOdXipny1If5qEisAsI1iQCPvQRbssD7MFh60YfZhwIdq0/RiXbCPRW8t4LoWntHLeP9P5ZANiRA1iiNZRQPWBNC4sZk0nNyacs+6fSw7D4sLD8K4Epc6K968oB60PE+mPAvqKA0dfm1NNrptdQ/92BAEwhSWliCJYE+k7zIH7Eo28A78IiqvNh/UIy5dgAm+bsPSCiZkR7E4F2XxjgsX52k7Nvx/gcIYxwDcN3YyNQFEXHPoTyy7QF2h0wsHMbWCKkpDHj09bnHFRl0vxF2zJt4TBz9lUMobnQLdPYrIQPCX3FvrqrCvCd4U+lpA+zNPxs4GjO2b5HRwEtmZbDNYxDZH6SChP93KK5IuJus3UU7InvRXAN0jAPPo+RjLY5YMp4nYSCfZTwuRBIPZGg9ZD+DcvtEj4JM+ubUMDXRpCQ0uccaynS8N6DT+rIoxRw20e7OVahSvYq1hhIae/IoxSwYsWGmLRV8MN/KmlKogDAx5x3eQet54DGJ3GQvorC6Oj6rovoP6PLczJDxdU1gktiibr/BOAYjcGrNvKcQi8z6SxYXZ3RCtRbAnbOb47VWh37azHpdoC2VM7kQuG93YrcJXKp1C4dNByj31Qeo9Eucw1q5ZbmOxDIyI9H7Blp4Lo2Slpvk/4qbABskqfDdzAKOtmKE0w4s8HBdYDbpKE+nAhbvFcFAWZRpZaBdNSRFiEs1YUDRsMgarCN5zceHZZ0iM/P9Ryq4T9KQ8l00Jc84sS9ZHDgApi3eNO686TQnAcsgxyNZsUPMMzyxNLTokYAlA1mLqMay8DeaSLj2jzw6eCoatOmw+Pi7AUpyiU3L4z6YFMl4KXRE9OdzlPWe2aaCShOaKg+QZTtY+ppLTUhHPOibeNizkQtwcEmJeYsvjE0bhCs16wApxCBrwBUGfV+r3LAYP5UkJ560rkXe988b/DucEX7wC2iasDmnQ4vMDqC98TwP9LeFpdxRfsPOX4ttirRxINyJN0YwqcjSf6Dn5Pv/4DQ1iy/dwVB0xus94gHvjZ0TQmI6gf434Y9m0Jzh5LIbwq07/sLg5CZVpYSCm8KUBys0RL2cNAs4tN1TA/A13mgUX0lri1gXYBvbDMpS2GfgbXdKZ8QXfsMdF5Q3FcxJAgB7DLCnSKFjHNqZMU0OITm1znla/rWgNtlGkbKSS2TyNRsOaHpFYQwKWlV1VkBG7VuUcJXNn9jPjkyInRW0d3mPON8aVaHhrlmimiEhsCci2VV1S4DDVBpgckG/8rPF3DseIAN8+UXysFURFA+RgAbwwoOqM1n0e+fGFonKAHjJnmlZUTftkNKUgA7sVhGi5WOU1aynhDktlEN1IrOQMYPRGMEsp4tNtR91dJQQw019FfRTwEGAAaP9cxn4vHoAAAAAElFTkSuQmCC';
		return img;
	}

})();