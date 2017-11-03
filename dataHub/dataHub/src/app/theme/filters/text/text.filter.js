(function() {
    'use strict';

    angular.module('BlurAdmin.theme')
        .filter('plainText', plainText)
        .filter('getDate',getDate)
        .filter('formatSeconds',formatSeconds)
        .filter('delDateTail',delDateTail);


    /** @ngInject */
    function plainText() {
        return function(text) {
            return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
    }
    /** @ngInject */   // 修改时间格式 2017-01-01 转 2017.01.01
    function getDate() {
        return function(input) {
            if(!input) {
                return null;
            }
            var str = input + '';
            str = str.split(' ')[0].replace(/-/g,'.');
            return str;
        }
    }
    /** @ngInject */   // 秒转换时分秒
    function formatSeconds() {
        return function (value) {
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
    /** @ngInject */   // 时间去掉后两个字段
    function delDateTail() {
        return function(time) {
            return time.slice(0, time.length-2)
        }
    }
})();