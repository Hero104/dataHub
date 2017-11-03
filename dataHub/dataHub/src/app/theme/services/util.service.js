(function() {
    'use strict';

    angular.module('BlurAdmin.theme').factory('utilService', utilService);

    /** @ngInject */
    function utilService($q, $http, $uibModal, $timeout, ipCookie) {
        return {
            // 获取数据公共方法
            dataInfo: function(url, access_token) {
                var def = $q.defer();
                $http({
                    method: 'GET',
                    url: url,
                    params: {
                        access_token: access_token
                    }
                }).then(function(data) {
                    def.resolve(data);
                },function(data) {
                    def.reject(data);
                });
                return def.promise;
            },
            dataRes: function(url, params){
                var def = $q.defer();
                $http({
                    method: 'GET',
                    url: url,
                    params: params
                }).then(function(data) {
                    def.resolve(data);
                }, function(data) {
                    def.reject(data);
                });
                return def.promise;
            },
            // 学习报告 post请求
            dataPost: function(url, params) {
                var def = $q.defer();
                $http({
                    method: 'POST',
                    url: url,
                    data: JSON.stringify(params)
                }).then(function(data) {
                    def.resolve(data);
                }, function(data) {
                    def.reject(data);
                });
                return def.promise;
            },
            // 单数变双数
            getTwo: function(n){
                n = n.toString();
                return n[1] ? n : "0" + n
            },
            // 获取 七天、一个月、三个月的时间
            getLocalDate: function(n) {
                var nd = new Date();
                switch (n + '') {
                    case '0':
                        var dWeek = new Date(nd - 7*24*3600*1000),
                            y = dWeek.getFullYear(),
                            m = dWeek.getMonth() + 1 + '',
                            d = dWeek.getDate() + '';
                        break;
                    case '1':
                        var dMonth = nd.setMonth(nd.getMonth() - 1),
                            y = nd.getFullYear(),
                            m = nd.getMonth() + 1 + '',
                            d = nd.getDate() + '';
                        break;
                    case '2':
                        var dHalf = nd.setMonth(nd.getMonth() - 3),
                            y = nd.getFullYear(),
                            m = nd.getMonth() + 1 + '',
                            d = nd.getDate() + ''
                        break;
                    default:
                        var  y = nd.getFullYear(),
                            m = nd.getMonth() + 1 + '',
                            d = nd.getDate() + '';
                        break
                }
                m = m[1] ? m : '0' + m;
                d = d[1] ? d : '0' + d;
                return y + '-' + m + '-' + d;
            },
            // 2017/01/01/ 转 2017-01-01
            getDateNormal: function(date) {
                return date.replace(/\//g, '-');
            },
            // 弹框
            alert: function($scope, page, size) {
                $uibModal.open({
                    animation: true,
                    templateUrl: page,
                    size: size,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });
            },
            // 每三位数加逗号
            formatNum: function(str){
                str = str + '';
                var newStr = '',
                    count = 0;
                if(str.indexOf(".")==-1){
                    for(var i=str.length-1;i>=0;i--){
                        if(count % 3 == 0 && count != 0){
                            newStr = str.charAt(i) + ',' + newStr;
                        }else{
                            newStr = str.charAt(i) + newStr;
                        }
                        count++;
                    }
                    str = newStr;
                    return str;
                } else{
                    for(var i = str.indexOf('.')-1;i >= 0; i--){
                        if(count % 3 == 0 && count != 0){
                            newStr = str.charAt(i) + ',' + newStr;
                        }else{
                            newStr = str.charAt(i) + newStr; //逐个字符相接起来
                        }
                        count++;
                    }
                    str = newStr + (str + '00').substr((str + '00').indexOf('.'), 3);
                }
            },
            // 占比圈动画效果
            perAnimation: function(perArr) {
                function loadPieCharts() {
                    $('.chart').each(function () {
                        var chart = $(this);
                        chart.easyPieChart({
                            easing: 'easeOutBounce',
                            onStep: function (from, to, percent) {
                                $(this.el).find('.percent').text(percent);
                            },
                            barColor: chart.attr('rel'),
                            trackColor: 'rgba(0,0,0,0)',
                            size: 84,
                            scaleLength: 0,
                            animation: 2000,
                            lineWidth: 9,
                            lineCap: 'round'
                        });
                    });
                }
                function updatePieCharts() {
                    $('.pie-charts .chart').each(function (index, chart) {
                        $(chart).data('easyPieChart').update(perArr[index]);
                    });
                }
                $timeout(function () {
                    loadPieCharts();
                    updatePieCharts();
                }, 1000);
            },
            // 时间轴动画
            timeShaftAnimation: function() {
                var timelineBlocks = $('.cd-timeline-block'),
                    offset = 0.8;
                hideBlocks(timelineBlocks, offset);
                $(window).on('scroll', function () {
                    if (!window.requestAnimationFrame) {
                        setTimeout(function () {
                            showBlocks(timelineBlocks, offset);
                        }, 100);
                    } else {
                        window.requestAnimationFrame(function () {
                            showBlocks(timelineBlocks, offset);
                        });
                    }
                });
                function hideBlocks(blocks, offset) {
                    blocks.each(function () {
                        ( $(this).offset().top > $(window).scrollTop() + $(window).height() * offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
                    });
                }
                function showBlocks(blocks, offset) {
                    blocks.each(function () {
                        ( $(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
                    });
                }
            },
            // 秒转换分
            goMinute: function(second) {
                if(second == null) {
                    return 0;
                }
                return Math.round(second%60/60 + parseInt(second/60));
            },
            // 秒转换成 时分秒表达
            formatSeconds: function (value) {
                var theTime = parseInt(value);// 秒
                var theTime1 = 0;// 分
                var theTime2 = 0;// 小时
                // alert(theTime);
                if(theTime > 60) {
                    theTime1 = parseInt(theTime/60);
                    theTime = parseInt(theTime%60);
                    // alert(theTime1+"-"+theTime);
                    if(theTime1 > 60) {
                        theTime2 = parseInt(theTime1/60);
                        theTime1 = parseInt(theTime1%60);
                    }
                }
                var result = ""+parseInt(theTime)+"秒";
                if(theTime1 > 0) {
                    result = ""+parseInt(theTime1)+"分"+result;
                }
                if(theTime2 > 0) {
                    result = ""+parseInt(theTime2)+"小时"+result;
                }
                return result;
            }
        }
    }
})();