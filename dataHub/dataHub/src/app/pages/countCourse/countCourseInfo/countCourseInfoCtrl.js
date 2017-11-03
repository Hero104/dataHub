(function () {
    'use strict';

    angular.module('BlurAdmin.pages.countCourse').controller('countCourseInfoCtrl', countCourseInfoCtrl);

    /** @ngInject */
    function countCourseInfoCtrl($scope, ipCookie, $stateParams, baUtil, baConfig, utilService, courseUrl, chartService, $timeout) {
        var token = ipCookie('accessToken'),
            courseIds = ipCookie('courseStr'),
            courseId = $stateParams.courseId,
            peopleTotalNum = $stateParams.peopleTotalNum,
            pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2),
            url;
        var baseParams = {
            access_token: token,
            courseId: courseId,
            course_id: courseId
        };
        $scope.courseId = courseId;
        $scope.page = {
            currentPage: 1,
            pageSize: 12
        };

        // 基本数据
        utilService.dataRes(courseUrl.studyTimeUrl, baseParams).then(function (res) {
            if(res.data.code == 0 && res.data.data) {
                var baseData = res.data.data;
                // console.log(baseData)
                var baseName = ['最长学习时长', '最短学习时长', '平均学习时长'],
                    baseNum = [
                        utilService.formatSeconds(baseData.maxTotalStudyTime),
                        utilService.formatSeconds(baseData.minTotalStudyTime),
                        utilService.formatSeconds(baseData.avgTotalStudyTime)],
                    baseCharts = [];
                for (var i = 0; i < baseName.length; i++) {
                    baseCharts.push({
                        color: pieColor,
                        description: baseName[i],
                        stats: baseNum[i],
                        icon: 'time'
                    })
                }
                $scope.baseCharts = baseCharts;
            }
        });

        // 知识图谱
        utilService.dataRes(courseUrl.courseRelationUrl, baseParams).then(function (res) {
            if(res.data.code == 0 && res.data.data) {
                var courseInfo = res.data.data,
                    courseName = courseInfo.courseName,
                    captionData = [],
                    sectionData = [],
                    linkData = [],
                    dataData = [{
                        "name": courseName,
                        "symbolSize": 53,
                        "draggable": "true",
                        "category": courseName,
                        "value": 40
                    }];
                var chapter = courseInfo.chapter;
                if(chapter.length !== 0) {
                    for(var i = 0; i < chapter.length; i++) {
                        var markCaption = i + 1 + '  ';
                        captionData.push(markCaption + chapter[i].chapterName);
                        sectionData.push({
                            'name': markCaption + chapter[i].chapterName
                        });
                        dataData.push({
                            "name": markCaption + chapter[i].chapterName,
                            "symbolSize": 38,
                            "draggable": "true",
                            "category": markCaption + chapter[i].chapterName,
                            "value": 3
                        });
                        linkData.push({
                            "source": courseName,
                            "target": markCaption + chapter[i].chapterName
                        });
                        if(chapter[i].section) {
                            var section = chapter[i].section;
                            for(var j = 0; j < section.length; j++) {
                                var markSection = (i + 1) + '.' + (j + 1) + '  ';
                                dataData.push({
                                    "name": markSection + section[j].sectionName,
                                    "symbolSize": 20,
                                    "category": markCaption + section[j].chapterName,
                                    "draggable": "true",
                                    "value": 1
                                });
                                linkData.push({
                                    "source": markCaption + section[j].chapterName,
                                    "target": markSection + section[j].sectionName
                                });
                                if(section[j].knobble) {
                                    var knobble = section[j].knobble;
                                    for(var z = 0; z < knobble.length; z++) {
                                        var markKnobble = (i + 1) + '.' + (j + 1) + '.' + (z + 1) + '  ';
                                        dataData.push({
                                            "name": markKnobble + knobble[z].knobbleName,
                                            "symbolSize": 10,
                                            "category": markCaption + knobble[z].chapterName,
                                            "draggable": "true",
                                            "value": 1
                                        });
                                        linkData.push({
                                            "source": markSection + knobble[z].sectionName,
                                            "target": markKnobble + knobble[z].knobbleName
                                        });
                                    }
                                }
                            }
                        }
                    }
                    var chartData = {
                        title: courseName,
                        data: dataData,
                        link: linkData,
                        section: sectionData,
                        caption: captionData,
                        chartSize: dataData.length>53 ? 130 : 300
                    };
                    chartService.relationEchart('knowledgeEchart', chartData)
                }else {
                    $('.knowledge-echart #knowledgeEchart').hide();
                    $('.knowledge-echart .none-data').html('暂时没有数据...').show();
                }
            }else {
                $('.knowledge-echart #knowledgeEchart').hide();
                $('.knowledge-echart .none-data').html('暂时没有数据...').show();
            }
        }, function() {
            $('.knowledge-echart #knowledgeEchart').hide();
            $('.knowledge-echart .none-data').html('数据请求错误...').show();
        });

        // 资源统计/章节统计
        function getTableData(status) {
            status == 0 ? url = courseUrl.byResTableUrl : url = courseUrl.byChapterTableUrl;
            console.log(url);
            utilService.dataRes(url, baseParams).then(function (res) {
                if (res.data.code == 0 && res.data.data) {
                    var tableInfo = res.data.data;
                    // console.log(tableInfo);
                    if (tableInfo.length !== 0) {
                        $('#countTable .horizontal-scroll').show();
                        $('#countTable .none-data').hide();
                        var tableData = [];
                        if(status == 0) {
                            for (var i = 0; i < tableInfo.length; i++) {
                                tableData.push({
                                    id: i + 1,
                                    courseId: tableInfo[i].courseId,
                                    name: tableInfo[i].resourceName,
                                    resourceId: tableInfo[i].resourceId,
                                    studyTime: tableInfo[i].sumStudyTime||tableInfo[i].sumStudyTime==0 ? utilService.formatSeconds(tableInfo[i].sumStudyTime) : '-',
                                    studyCount: tableInfo[i].finishedUserCount + '/' + peopleTotalNum,
                                    studyNum: tableInfo[i].studyCount,
                                    noteNum: tableInfo[i].noteCount||tableInfo[i].noteCount==0 ? tableInfo[i].noteCount : '-',
                                    askNum: tableInfo[i].askCount||tableInfo[i].askCount==0 ? tableInfo[i].askCount : '-',
                                    averageStudyTime: tableInfo[i].avgStudyTime||tableInfo[i].avgStudyTime==0 ? utilService.formatSeconds(tableInfo[i].avgStudyTime) : '-',
                                    resType: tableInfo[i].resourceType
                                })
                            }
                        }else {
                            for (var i = 0; i < tableInfo.length; i++) {
                                tableData.push({
                                    id: i + 1,
                                    courseId: tableInfo[i].course_id,
                                    resourceId: tableInfo[i].chapter_id,
                                    name: tableInfo[i].chapter_name,
                                    studyTime: tableInfo[i].sum_study_time||tableInfo[i].sum_study_time==0 ? utilService.formatSeconds(tableInfo[i].sum_study_time) : '-',
                                    studyCount: tableInfo[i].finished_user_count + '/' + peopleTotalNum,
                                    studyNum: tableInfo[i].resource_count,
                                    noteNum: tableInfo[i].note_count||tableInfo[i].note_count==0 ? tableInfo[i].note_count : '-',
                                    askNum: tableInfo[i].ask_count||tableInfo[i].ask_count==0 ? tableInfo[i].ask_count : '-',
                                    averageStudyTime: tableInfo[i].avg_study_time||tableInfo[i].avg_study_time==0 ? utilService.formatSeconds(tableInfo[i].avg_study_time) : '-',
                                    resType: 66
                                })
                            }
                        }
                        $scope.page.total = tableData.length;
                        $scope.tableData = tableData.slice(($scope.page.currentPage - 1) * $scope.page.pageSize, $scope.page.currentPage * $scope.page.pageSize);
                        $scope.changePage = function (page) {
                            $scope.tableData = tableData.slice((page - 1) * $scope.page.pageSize, page * $scope.page.pageSize)
                        };
                    } else {
                        $('#countTable .horizontal-scroll').hide();
                        $('#countTable .none-data').show();
                    }
                } else {
                    $('#countTable .horizontal-scroll').hide();
                    $('#countTable .none-data').html('数据请求出错了...').show();
                }
            }, function () {
                $('#countTable .horizontal-scroll').hide();
                $('#countTable .none-data').html('数据请求出错了...').show();
            });
        }
        $scope.dateList = ['按资源统计', '按章节统计'];
        $scope.filtrate = function (index) {
            $scope.logNav = index;
            getTableData(index);
        };
        $scope.filtrate(0);

    }
})();