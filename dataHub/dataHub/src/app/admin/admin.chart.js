(function() {
    'use strict';

    angular.module('BlurAdmin.pages').service('adminChart', chartService);

    function chartService() {
        return {
            // 分数占比
            scoreScale: function(id, chartData) {
                var option = {
                    backgroundColor: 'rgba(255,255,255,0)',
                    title: {
                        text: chartData.score,
                        subtext: '综合得分',
                        x: 'center',
                        y: 75,
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16,
                            color: '#42CEF0'
                        }
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)"
                    },
                    toolbox: {
                        show: false
                    },
                    legend: {
                        show: false,
                        orient: 'horizontal',
                        bottom: '0%'
                    },
                    series: [{
                        type: 'pie',
                        selectedMode: 'single',
                        radius: ['55%', '75%'],
                        color: ['#AF89D6', '#59ADF3', '#FF999A', '#FFCC67','#FCC667','#CC5962'],
                        label: {
                            normal: {
                                position: 'inner',
                                formatter: '',
                                textStyle: {
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 12
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:  chartData.scoreType
                    }]
                };
                var myChart = echarts.init(document.getElementById(id));
                myChart.setOption(option);
            },
            // 标签
            sign: function(ele, charData) {
                var option = {
                    title: {
                        x: 'center'
                    },
                    backgroundColor: '#fff',
                    tooltip: {
                        show: false
                    },
                    series: [{
                        type: 'wordCloud',
                        size: ['9%', '99%'],
                        sizeRange: [6, 66],
                        textRotation: [0, 45, 90, -45],
                        rotationRange: [-45, 90],
                        shape: 'circle',
                        textPadding: 0,
                        autoSize: {
                            enable: true,
                            minSize: 6
                        },
                        textStyle: {
                            normal: {
                                color: function() {
                                    return 'rgb(' + [
                                            Math.round(Math.random() * 160),
                                            Math.round(Math.random() * 160),
                                            Math.round(Math.random() * 160)
                                        ].join(',') + ')';
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        data: charData
                    }]
                };
                var myChart = echarts.init(ele);
                myChart.setOption(option);
            }
        }
    }
})();