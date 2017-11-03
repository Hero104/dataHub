(function () {
    'use strict';

    angular.module('BlurAdmin.pages').factory('chartService', chartService);

    /** @ngInject */
    function chartService(baConfig, baUtil, layoutPaths) {
        return {
            // -------------------------------- teacher -------------------------------------
            // 百分比图 - 完成率(amchart)
            percentChart: function (id, chartData) {
                AmCharts.makeChart(id, {
                    "type": "pie",
                    "theme": "blur",
                    "dataProvider": chartData,
                    "titleField": "title",
                    "valueField": "value",
                    "colorField": "color",
                    "labelRadius": 5,

                    "radius": "42%",
                    "innerRadius": "70%",
                    "labelText": "[[title]]",
                    "export": {
                        "enabled": true
                    }
                });
            },
            // 折线图 - 趋势分析(amchart)
            lineChart: function (id, chartData) {
                var layoutColors = baConfig.colors,
                    graphColor = baConfig.theme.blur ? '#000000' : layoutColors.primary;
                AmCharts.makeChart(id, {
                    type: 'serial',
                    theme: 'blur',
                    marginTop: 15,
                    marginRight: 15,
                    dataProvider: chartData,
                    categoryField: 'date',
                    categoryAxis: {
                        gridPosition: 'start',
                        labelRotation: 30,
                        startOnAxis: true,
                        gridAlpha: 0,
                        color: layoutColors.defaultText,
                        axisColor: layoutColors.defaultText
                    },
                    valueAxes: [
                        {
                            minVerticalGap: 50,
                            gridAlpha: 0,
                            color: layoutColors.defaultText,
                            axisColor: layoutColors.defaultText
                        }
                    ],
                    graphs: [
                        {
                            id: 'g1',
                            bullet: 'none',
                            useLineColorForBulletBorder: true,
                            lineColor: baUtil.hexToRGB(graphColor, 0.5),
                            lineThickness: 1,
                            negativeLineColor: layoutColors.danger,
                            type: 'smoothedLine',
                            valueField: 'value',
                            fillAlphas: 1,
                            fillColorsField: 'lineColor'
                        }
                    ],
                    chartCursor: {
                        categoryBalloonDateFormat: 'MM YYYY',
                        categoryBalloonColor: '#4285F4',
                        categoryBalloonAlpha: 0.7,
                        cursorAlpha: 0,
                        valueLineEnabled: true,
                        valueLineBalloonEnabled: true,
                        valueLineAlpha: 0.5
                    },
                    dataDateFormat: 'MM YYYY',
                    export: {
                        enabled: true
                    },
                    creditsPosition: 'bottom-right',
                    zoomOutButton: {
                        backgroundColor: '#fff',
                        backgroundAlpha: 0
                    },
                    zoomOutText: '',
                    pathToImages: layoutPaths.images.amChart
                });

                $('#amchart .amcharts-chart-div').css({'overflow': 'visible'});
                $('#amchart .amcharts-chart-div svg').css({'overflow': 'visible'});
            },
            // 折线图 - 笔记答疑(echart)
            lineEchart: function (id, chartData) {
                var option = {
                    color: ['#F1547F', '#FFA847'],
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        x: 'left',
                        padding: [10, 20, 0, 20],
                        data: ['笔记答疑'],
                        selected: {
                            '笔记答疑': true
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '5%',
                        bottom: '3%',
                        top: '10%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        splitLine: { //网格线
                            show: true,
                            lineStyle: {
                                color: ['#b1b1b1'],
                                type: 'dashed'
                            }
                        },
                        data: chartData.x
                    },
                    yAxis: {
                        splitLine: { //网格线
                            show: true,
                            lineStyle: {
                                color: ['#b1b1b1'],
                                type: 'dashed'
                            }
                        },
                        axisTick: {show: false},
                        axisLine: {show: false},
                        axisLabel: {show: false}
                    },
                    series: [{
                        name: '笔记',
                        type: 'line',
                        data: chartData.first,
                        label: {
                            normal: {
                                show: true,
                                position: 'top' //值显示
                            }
                        }
                    }, {
                        name: '答疑',
                        type: 'line',
                        data: chartData.second,
                        label: {
                            normal: {
                                show: true,
                                position: 'top' //值显示
                            }
                        }
                    }]
                };
                var myChart = echarts.init(document.getElementById(id));
                myChart.setOption(option);
            },
            // 柱状图 - 三色(echart)
            barChart: function (id, chartData, lable) {
                var series = [];
                for (var i = 0; i < lable.name.length; i++) {
                    series.push({
                        name: lable.name[i],
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: false,
                                position: 'insideRight'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: lable.color[i]
                            }
                        },
                        data: chartData.all[i]
                    })
                }
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: lable.name
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'value'
                    },
                    xAxis: {
                        type: 'category',
                        show: true,
                        data: chartData.name
                    },
                    series: series
                };
                var myChart = echarts.init(document.getElementById(id));
                myChart.setOption(option);
            },
            // 柱状图 - 五色(amchart)
            barAmchart: function (id, dataChart) {
                var layoutColors = baConfig.colors;
                AmCharts.makeChart(id, {
                    type: 'serial',
                    theme: 'blur',
                    color: layoutColors.defaultText,
                    dataProvider: dataChart,
                    startDuration: 1,
                    graphs: [
                        {
                            balloonText: '<b>[[category]]: [[value]]</b>',
                            fillColorsField: 'color',
                            fillAlphas: 0.7,
                            lineAlpha: 0.2,
                            type: 'column',
                            valueField: 'num'
                        }
                    ],
                    chartCursor: {
                        categoryBalloonEnabled: false,
                        cursorAlpha: 0,
                        zoomable: false
                    },
                    categoryField: 'name',
                    categoryAxis: {
                        gridPosition: 'start',
                        labelRotation: 45,
                        gridAlpha: 0.5,
                        gridColor: layoutColors.border
                    },
                    export: {
                        enabled: true
                    },
                    creditsPosition: 'top-right',
                    pathToImages: layoutPaths.images.amChart
                });
            },
            // 柱状图 + 折线图(amchart)
            campareChart: function (id, chartData, lable) {
                var layoutColors = baConfig.colors;
                AmCharts.makeChart(id, {
                    "type": "serial",
                    "theme": "none",
                    "color": layoutColors.defaultText,
                    "precision": 2,
                    "graphs": [{
                        "id": "g4",
                        "valueAxis": "v1",
                        color: layoutColors.defaultText,
                        "lineColor": layoutColors.primary,
                        "fillColors": layoutColors.primary,
                        "fillAlphas": 0.9,
                        "lineAlpha": 0.9,
                        "type": "column",
                        "title": lable.barName,
                        "valueField": "percentSelf",
                        "clustered": false,
                        "columnWidth": 0.3,
                        "legendValueText": "[[value]]",
                        "balloonText": lable.lineText
                    }],
                    "chartCursor": {
                        "pan": true,
                        "cursorColor": layoutColors.danger,
                        "valueLineEnabled": true,
                        "valueLineBalloonEnabled": true,
                        "cursorAlpha": 0,
                        "valueLineAlpha": 0.2
                    },
                    "categoryField": 'name',
                    "categoryAxis": {
                        "labelRotation": 25,
                        "axisColor": layoutColors.defaultText,
                        "color": layoutColors.defaultText,
                        "gridColor": layoutColors.defaultText,
                        "dashLength": 1,
                        "minorGridEnabled": true
                    },
                    "legend": {
                        "useGraphSettings": true,
                        "position": "top",
                        "color": layoutColors.defaultText
                    },
                    "balloon": {
                        "borderThickness": 1,
                        "shadowAlpha": 0
                    },
                    "export": {
                        "enabled": true
                    },
                    "dataProvider": chartData
                });
            },
            // 柱状图 + 折线图(echart)
            compareEchart: function (id, chartData, lable) {
                var option = {
                    color: ['#AED8DD', '#AE82A0'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '15%',
                        top: '13%',
                        containLabel: true
                    },
                    "legend": {
                        x: '44%',
                        textStyle: {
                            color: '#90979c',
                        },
                        "data": lable.chartName
                    },
                    xAxis: [{
                        type: 'category',
                        data: lable.dataName,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }],
                    yAxis: [{
                        type: ''
                    }],
                    dataZoom: [{
                        type: 'slider',
                        show: true,
                        height: 20,
                        top: '90%',
                        backgroundColor: 'rgba(38,227,189,0.3)',
                        borderColor: '#0a2b24'
                    }],
                    series: chartData
                };
                var mychart = echarts.init(document.getElementById(id));
                mychart.setOption(option);
            },
            // 柱状图(echart,一种色)，视频播放分布
            videoEchart: function (id, chartData) {
                var option = {
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        formatter: function (params) {
                            var relVal = params[0].name;
                            relVal += params[0].value;
                            return relVal;
                        },
                        showDelay: 0,
                        hideDelay: 50,
                        transitionDuration: 0,
                        backgroundColor: 'rgba(50,50,50,1)',
                        borderColor: '#aaa',
                        showContent: true,
                        borderRadius: 8,
                        padding: 10
                    },
                    grid: {
                        left: '0%',
                        right: '0%',
                        bottom: '0%',
                        containLabel: true
                    },
                    axisPointer: {
                        type: 'line',
                        axis: 'auto'
                    },
                    legend: {
                        data: ['观看次数']
                    },
                    xAxis: {
                        data: chartData.name
                    },
                    yAxis: {},
                    series: [{
                        name: '观看次数',
                        type: 'bar',
                        barMaxWidth: 60,
                        data: chartData.num,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0.5, 1, [{
                                    offset: 0,
                                    color: 'rgba(35,123,105,1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(103,237,210,.5)'
                                }]),
                                borderColor: '#23a5e2',
                                borderWidth: 2,
                                barBorderRadius: [10, 10, 0, 0],
                                shadowColor: 'rgba(168,225,226,0.5)',
                                opacity: .6

                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(13,164,171,1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(64,180,157,.1)'
                                }]),
                                borderColor: '#0ea4a6',
                                borderWidth: 2,
                                barBorderRadius: [9, 9, 0, 0],
                                shadowBlur: 30,
                                shadowColor: 'rgba(32,188 ,157,0.8)',
                                opacity: .7,
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: 'rgba(150,197,188,1)'
                                    }

                                }
                            }
                        },
                        markPoint: {
                            symbol: 'circle',
                            symbolSize: 50,
                            symbolOffset: [0, 0],
                            silent: true

                        }

                    }],
                    label: {
                        normal: {
                            show: true,
                            position: 'top'

                        }
                    }
                };
                var mychart = echarts.init(document.getElementById(id));
                mychart.setOption(option);
            },
            // 饼图 - 分布(amchart)
            pieAmChart: function (id, chartData) {
                var ctx = document.getElementById(id).getContext('2d');
                window.myDoughnut = new Chart(ctx, {
                    type: 'doughnut',
                    data: chartData,
                    options: {
                        cutoutPercentage: 64,
                        responsive: true,
                        elements: {
                            arc: {
                                borderWidth: 5
                            }
                        }
                    }
                });
            },
            // 饼图 - 占比(amchart)
            pieChart: function () {
                var pieChart = {
                    elements: {
                        arc: {
                            borderWidth: 0
                        }
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor: baConfig.colors.defaultText
                        }
                    }
                };
                return pieChart;
            },
            // 饼图 - 占比(echart一个圈)
            pieEchart: function (id, chartData, lable) {
                var option = {
                    backgroundColor: 'transparent',
                    title: {
                        text: lable.text,
                        subtext: lable.subtext,
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 25
                        }
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter: "{b}:<br /> {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: lable.positionTip,
                        right: '0%',
                        bottom: '50%',
                        data: lable.legendData
                    },
                    series: [{
                        type: 'pie',
                        selectedMode: 'single',
                        radius: lable.size,
                        color: lable.colorData,
                        label: {
                            normal: {
                                position: lable.textPosition,
                                formatter: '{d}%',
                                textStyle: {
                                    fontWeight: 'bold',
                                    fontSize: 14
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data: chartData
                    }]
                };
                var myChart = echarts.init(document.getElementById(id));
                myChart.setOption(option);
            },
            // 饼图 - 占比(echart三个圈)
            pieEchartThree: function (id, chartData) {
                var dataInfo = [],
                    dataColor = ['#FFD662', '#4DC0D7', '#F1547F'];
                for (var i = 0; i < chartData.length; i++) {
                    dataInfo.push({
                        type: 'pie',
                        center: [20 + 30 * i + '%', '46%'],
                        radius: ['57%', '45%'],
                        clockWise: false,
                        hoverAnimation: false,
                        label: {
                            normal: {
                                position: 'center'
                            }
                        },
                        data: [
                            {
                                value: 100 - chartData[i].progress,
                                name: chartData[i].progress + '%',
                                label: {
                                    normal: {
                                        textStyle: {
                                            fontSize: '13',
                                            color: '#3D3D3D'
                                        }
                                    }
                                },
                                itemStyle: {normal: {color: "#BEBEBE"}}
                            }, {
                                value: chartData[i].progress,
                                name: chartData[i].name,
                                label: {
                                    normal: {
                                        textStyle: {
                                            fontSize: '14',
                                            color: '#000'
                                        }
                                    }
                                },
                                itemStyle: {normal: {color: dataColor[i], fontSize: 16}}
                            }
                        ]
                    })
                }
                var option = {
                    xAxis: [{
                        type: 'category',
                        axisLine: {show: false},
                        axisTick: {show: false},
                        axisLabel: {interval: 0}
                    }],
                    yAxis: [{
                        show: false
                    }],
                    series: dataInfo
                };
                var askPercent = echarts.init(document.getElementById('askPercent'));
                askPercent.setOption(option);
            },
            // 雷达图
            radarEchart: function (id, chartData) {
                var option = {
                    tooltip: {},
                    backgroundColor: '#fff',
                    radar: {
                        indicator: chartData.type,
                        splitNumber: 3,
                        center: ['50%', '50%'],
                        name: {
                            formatter: '{value}',
                            textStyle: {
                                fontSize: 20,
                                color: 'rgba(87, 203, 204, 1)'
                            }
                        },
                        splitArea: {
                            areaStyle: {
                                color: [
                                    'rgba(0, 0, 0, 0)',
                                    'rgba(87, 203, 204, 0.2)',
                                    'rgba(0, 0, 0, 0)',
                                    'rgba(0, 0, 0, 0)',
                                    'rgba(0, 0, 0, 0)'],
                                shadowColor: 'rgba(255, 255, 255, 1)',
                                shadowBlur: 40
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(87, 203, 204, 0.3)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(87, 203, 204, 0.6)'
                            }
                        },
                        radius: 120
                    },
                    series: [{
                        name: '学习行为',
                        type: 'radar',
                        data: [
                            {
                                value: chartData.value,
                                name: '学习行为'
                            }
                        ]
                    }]
                };
                var myChart = echarts.init(document.getElementById(id));
                myChart.setOption(option)
            },
            // 关系图
            relationEchart: function(id, chartData) {
                var option = {
                    backgroundColor: '#fff',
                    legend: [{
                        formatter: function (name) {
                            return echarts.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
                        },
                        selectedMode: 'false',
                        data: chartData.caption
                    }],
                    toolbox: {
                        show : true,
                        feature : {
                            saveAsImage : {show: true}
                        }
                    },
                    animationDuration: 3000,
                    animationEasingUpdate: 'quinticInOut',
                    series: [{
                        name: chartData.title,
                        type: 'graph',
                        layout: 'force',
                        force: {
                            repulsion: chartData.chartSize
                        },
                        data: chartData.data,
                        links: chartData.link,
                        categories: chartData.section,
                        focusNodeAdjacency: true,
                        // roam: true,
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    fontSize: 16
                                }
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: 'source',
                                curveness: 0,
                                type: "solid"
                            }
                        }
                    }]
                };
                var myChart = echarts.init(document.getElementById(id));
                myChart.setOption(option)
            },

            // -------------------------------- admin -------------------------------------
            // 双折线图(echart)
            twoLineChart: function(id, chartData) {
                var option = {
                    color: ['#F1547F', '#FFA847'],
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        x: 'left',
                        padding: [10, 20, 0, 20]
                    },
                    grid: {
                        left: '3%',
                        right: '5%',
                        bottom: '3%',
                        top: '10%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        splitLine: { //网格线
                            show: true,
                            lineStyle: {
                                color: ['#b1b1b1'],
                                type: 'dashed'
                            }
                        },
                        data: chartData.dataSub
                    },
                    yAxis: {
                        splitLine: { //网格线
                            show: true,
                            lineStyle: {
                                color: ['#b1b1b1'],
                                type: 'dashed'
                            }
                        },
                        axisTick: {show: false},
                        axisLine: {show: false},
                        axisLabel: {show: false}
                    },
                    series: [{
                        name: '登录人数',
                        type: 'line',
                        data: chartData.login,
                        label: {
                            normal: {
                                show: true,
                                position: 'top' //值显示
                            }
                        }
                    }, {
                        name: '学习人数',
                        type: 'line',
                        data: chartData.study,
                        label: {
                            normal: {
                                show: true,
                                position: 'top' //值显示
                            }
                        }
                    }]
                };
                var myChart = echarts.init(document.getElementById(id));
                myChart.setOption(option);
            },
            // 学院-机构关系图(echart)
            collegeRelationChart: function(id, charData) {
                var uploadedDataURL = "/data/admin/adDataBase/uploaderDataUrl.json";
                var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
                $.get(uploadedDataURL, function(data) {
                    echarts.registerMap('wuhan', data);
                    var option = {
                        backgroundColor: '#fff',
                        geo: {
                            map: 'wuhan',
                            label: {
                                emphasis: {
                                    show: false
                                }
                            },
                            roam: false,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(22,22,2,0)',
                                    areaColor: 'rgba(22,22,2,0)',
                                    borderColor: 'rgba(22,22,2,0)'

                                },
                                emphasis: {
                                    color: 'rgba(22,22,2,0)',
                                    areaColor: 'rgba(22,22,2,0)',
                                    borderColor: 'rgba(22,22,2,0)'
                                }
                            }
                        },
                        series: [{
                            type: 'lines',
                            zlevel: 1,
                            effect: {
                                show: true,
                                period: 3,
                                trailLength: 0.1,
                                color: '#A6C84C',
                                symbolSize: 8
                            },
                            lineStyle: {
                                normal: {
                                    color: '#a6c84c',
                                    width: 0,
                                    curveness: 0.2
                                }
                            },
                            data: charData.dataCoords
                        }, {
                            type: 'lines',
                            zlevel: 2,
                            effect: {
                                show: true,
                                period: 3,
                                trailLength: 0,
                                //symbol: 'image://',
                                symbol: planePath,
                                symbolSize: 15
                            },
                            lineStyle: {
                                normal: {
                                    color: '#a6c84c',
                                    width: 1,
                                    opacity: 0.4,
                                    curveness: 0.2
                                }
                            },
                            data: charData.dataCoords
                        }, {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 5,
                            rippleEffect: {
                                period: 4,
                                scale: 1.2,
                                brushType: 'stroke'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    formatter: '{b}'
                                }
                            },
                            symbolSize: '40',
                            itemStyle: {
                                normal: {
                                    color: '#0D6695'
                                }
                            },
                            data: charData.dataLine
                        }]
                    };

                    var myChart = echarts.init(document.getElementById(id));
                    myChart.setOption(option);
                    var currentIndex = -1;
                    var timeTicket = setInterval(function() {
                        var dataLen = option.series[2].data.length;
                        currentIndex = (currentIndex + 1) % dataLen;
                    }, 1000);
                });
            },
            // 左右比较柱状图(echart)
            contrastChart: function(id, chartData) {
                var option = {
                    baseOption: {
                        backgroundColor: '#fff',
                        timeline: {
                            show: true,
                            axisType: 'category',
                            tooltip: {
                                show: true,
                                formatter: function(params) {
                                    return params.name + ':00数据统计';
                                }
                            },
                            autoPlay: true,
                            currentIndex: 6,
                            playInterval: 1000,
                            label: {
                                normal: {
                                    show: true,
                                    interval: 'auto',
                                    formatter: '{value}:00'
                                }
                            },
                            data: []
                        },
                        title: {
                            textStyle: {
                                color: '#8694db',
                                fontSize: 16
                            }
                        },
                        legend: {
                            data: ['登录人数', '学习人数'],
                            top: 4,
                            right: '20%',
                            textStyle: {
                                color: '#000'
                            }
                        },
                        tooltip: {
                            show: true,
                            trigger: 'axis',
                            formatter: '{b}<br/>{a}: {c}人',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        toolbox:{
                            right:20,
                            feature:{
                                saveAsImage: {},
                                restore: {},
                                dataView: {},
                                dataZoom: {},
                                magicType: {
                                    type:['line','bar']
                                }
                            }
                        },
                        grid: [{
                            show: false,
                            left: '4%',
                            top: 60,
                            bottom: 60,
                            containLabel: true,
                            width: '46%'
                        }, {
                            show: false,
                            left: '50.5%',
                            top: 80,
                            bottom: 60,
                            width: '0%'
                        }, {
                            show: false,
                            right: '4%',
                            top: 60,
                            bottom: 60,
                            containLabel: true,
                            width: '46%'
                        } ],
                        xAxis: [
                            {
                                type: 'value',
                                inverse: true,
                                axisLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                position: 'top',
                                axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: '#B2B2B2',
                                        fontSize: 12
                                    }
                                },
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#1F2022',
                                        width: 1,
                                        type: 'solid'
                                    }
                                }
                            }, {
                                gridIndex: 1,
                                show: false
                            }, {
                                gridIndex: 2,
                                type: 'value',
                                axisLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                position: 'top',
                                axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: '#B2B2B2',
                                        fontSize: 12
                                    }
                                },
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#1F2022',
                                        width: 1,
                                        type: 'solid'
                                    }
                                }
                            } ],
                        yAxis: [{
                            type: 'category',
                            inverse: true,
                            position: 'right',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false,
                                margin: 8,
                                textStyle: {
                                    color: '#9D9EA0',
                                    fontSize: 12
                                }
                            },
                            data: chartData.myData
                        }, {
                            gridIndex: 1,
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#9D9EA0',
                                    fontSize: 12
                                }
                            },
                            data: chartData.myData.map(function(value) {
                                return {
                                    value: value,
                                    textStyle: {
                                        align: 'center'
                                    }
                                }
                            })
                        }, {
                            gridIndex: 2,
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false,
                                textStyle: {
                                    color: '#9D9EA0',
                                    fontSize: 12
                                }
                            },
                            data: chartData.myData
                        } ],
                        series: []
                    },
                    options: []
                };

                for (var i = 0; i < chartData.timeLineData.length; i++) {
                    option.baseOption.timeline.data.push(chartData.timeLineData[i]);
                    option.options.push({
                        title: {
                            text: chartData.timeLineData[i] + ':00学习登录统计'
                        },
                        series: [{
                            name: '登录人数',
                            type: 'bar',
                            barGap: 20,
                            barWidth: 20,
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true,
                                    position: 'left',
                                    offset: [0, 0],
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 14
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#659F83'
                                },
                                emphasis: {
                                    color: '#08C7AE'
                                }
                            },
                            data: chartData.databeast[chartData.timeLineData[i]]
                        },
                            {
                                name: '学习人数',
                                type: 'bar',
                                barGap: 20,
                                barWidth: 20,
                                xAxisIndex: 2,
                                yAxisIndex: 2,
                                label: {
                                    normal: {
                                        show: false
                                    },
                                    emphasis: {
                                        show: true,
                                        position: 'right',
                                        offset: [0, 0],
                                        textStyle: {
                                            color: '#fff',
                                            fontSize: 14
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#F68989'
                                    },
                                    emphasis: {
                                        color: '#F94646'
                                    }
                                },
                                data: chartData.databeauty[chartData.timeLineData[i]]
                            }
                        ]
                    });
                }
                var myChart = echarts.init(document.getElementById(id));
                myChart.setOption(option);
            },

        }
    }
})();