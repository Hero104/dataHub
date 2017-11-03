(function() {
    'use strict';
    angular.module('BlurAdmin.pages')
        .constant('sysConstant', {
            // 测试
            // studyApis: '/apisTest/studyapi/api/',
            // teacherApis: '/apisTest/statisticsapi/api/',
            // openxApis: '/apisTest/Openx_Statis/datastatis/'

            // 正式
            studyApis: '/apis/studyapi/api/',
            teacherApis: '/apis/statisticsapi/api/',
            openxApis: '/apis/statisticsapi/api/datastatis/'
        })
        // 本地
        .factory('stuControlUrl', stuControlTest)
        .factory('courseUrl', courseTest)
        .factory('homeworkUrl', homeworkTest)
        .factory('activityUrl', activityTest)
        .factory('noteUrl', noteTest)
        .factory('gradeUrl', gradeTest)

        .factory('adDataBaseUrl', adDataBaseTest)
        .factory('collegeInfoUrl', collegeInfoTest);


        // 线上
        // .factory('stuControlUrl', stuControlUrl)
        // .factory('courseUrl', courseUrl)
        // .factory('homeworkUrl', homeworkUrl)
        // .factory('activityUrl', activityUrl)
        // .factory('noteUrl', noteUrl)
        // .factory('gradeUrl', gradeUrl)

        // .factory('adDataBaseUrl', adDataBaseUrl);
        // .factory('collegeInfoUrl', collegeInfoUrl);


    /** @ngInject */
    function stuControlTest() {
        return {
            testUrl: 'data/test0.json',
            test0Url: 'data/test00.json',

            baseInfoUrl: 'data/stu1-0.json',
            courseTableUrl: 'data/stu1-1.json',
            studyTrendUrl: 'data/stu2-1.json',
            stuTableUrl: 'data/stu2-2.json',

            reprotBaseUrl: 'data/stu3-1-1.json',
            homeScoreUrl: 'data/stu3-1-2.json',
            activityUrl: 'data/stu3-1-3.json',
            resTableUrl: 'data/stu3-1-4.json',

            loginBehaviorUrl: 'data/stu3-2-1.json',
            timeLineUrl: 'data/stu3-3-1.json'
        }
    }
    function stuControlUrl(sysConstant) {
        return {
            testUrl: 'data/test0.json',
            test0Url: 'data/test00.json',

            baseInfoUrl: sysConstant.teacherApis + 'teacharStatistics/selectStudentGenderRatio',
            courseTableUrl: sysConstant.teacherApis + 'course/listCourseStudent',
            studyTrendUrl: sysConstant.teacherApis + 'course/listCourseStudyTrend',
            stuTableUrl: sysConstant.teacherApis + 'course/listCourseStudentDetail',

            reprotBaseUrl: sysConstant.openxApis + 'student/getResources',
            homeScoreUrl: sysConstant.openxApis + 'student/getHomework',
            activityUrl: sysConstant.openxApis + 'student/getActivity',
            resTableUrl: sysConstant.openxApis + 'student/getResource',

            loginBehaviorUrl: sysConstant.studyApis + 'statistical/listLoginlLearningDetails',
            timeLineUrl: sysConstant.teacherApis + 'teacharStatistics/listDataStudentStatistics'
        }
    }
    /** @ngInject */
    function courseTest() {
        return {
            testUrl: 'data/test0.json',
            askTableUrl: 'data/note1-1.json',

            baseDataUrl: 'data/course1-1.json',
            resTypeUrl: 'data/course1-2.json',
            resTableUrl: 'data/course1-3.json',
            studyTimeUrl: 'data/course2-1.json',
            courseRelationUrl: 'data/course2-2.json',
            byResTableUrl: 'data/course2-3.json',
            byChapterTableUrl: 'data/course2-4.json',
            baseTimeUrl: 'data/course3-1.json',
            baseNumUrl: 'data/course3-2.json',
            VDTableUrl: 'data/course3-3.json',
            RHTableUrl: 'data/course3-3.json'
        }
    }
    function courseUrl(sysConstant) {
        return {
            testUrl: 'data/test0.json',
            askTableUrl: 'data/note1-1.json',

            baseDataUrl: sysConstant.teacherApis + 'resources/getCourseResourcesStudyStatistics',
            resTypeUrl: sysConstant.teacherApis + 'resources/getResourcesDistribute',
            resTableUrl: sysConstant.teacherApis + 'resources/listCourseResources',
            studyTimeUrl: sysConstant.teacherApis + 'resources/getResourcesStudyTime',
            courseRelationUrl: sysConstant.teacherApis + 'resources/getKnowLedgeGraph',
            byResTableUrl: sysConstant.teacherApis + 'resources/listResourcesStatistics',
            byChapterTableUrl: sysConstant.teacherApis + 'resources/listResourcesChapter',
            baseTimeUrl: sysConstant.teacherApis + 'resources/getStudyTime',
            baseNumUrl: sysConstant.teacherApis + 'resources/getStudyNumber',
            VDTableUrl: sysConstant.teacherApis + 'resources/listStudentStatisticsVD',
            RHTableUrl: sysConstant.teacherApis + 'resources/listStudentStatisticsRH'
        }
    }
    /** @ngInject */
    function homeworkTest() {
        return {
            testUrl: 'data/test0.json',

            baseInfoUrl: 'data/home1-1.json',
            homeTableUrl: 'data/home1-2.json',
            courseListUrl: 'data/teacherCourse.json',
            stuTableUrl: 'data/home2-1-3.json',
            sortScoreUrl: 'data/home2-1-2.json',
            classTableUrl: 'data/home2-2-4.json'
        }
    }
    function homeworkUrl(sysConstant) {
        return {
            testUrl: 'data/test0.json',

            baseInfoUrl: sysConstant.teacherApis + 'homework/getHomeworkStatisTotal',
            homeTableUrl: sysConstant.teacherApis + 'homework/getHomeworkStatisList',
            courseListUrl: sysConstant.studyApis + 'batchCoursefxl/queryBatchCourseList',
            stuTableUrl: sysConstant.teacherApis + 'homework/getHomeworkStudentStatis',
            sortScoreUrl: sysConstant.teacherApis + 'homework/getHomeworkScoreDistribution',
            classTableUrl: sysConstant.teacherApis + 'homework/listHomeworkClassStatistics'
        }
    }
    /** @ngInject */
    function activityTest() {
        return {
            testUrl: 'data/test0.json',

            baseInfoUrl: 'data/activity1-1.json',
            ActivityTableUrl: 'data/activity1-2.json',
            courseListUrl: 'data/teacherCourse.json',
            postUrl: 'data/activity2-1.json',
            scoreUrl: 'data/activity2-2.json',
            stuTableUrl: 'data/activity2-3.json',
            classTableUrl: 'data/activity3-3.json'
        }
    }
    function activityUrl(sysConstant) {
        return {
            testUrl: 'data/test0.json',

            baseInfoUrl: sysConstant.teacherApis + 'activity/listActivtySum',
            ActivityTableUrl: sysConstant.teacherApis + 'activity/listActivityCurrentStatics',
            courseListUrl: sysConstant.studyApis + 'batchCoursefxl/queryBatchCourseList',
            postUrl: sysConstant.teacherApis + 'activity/listForenStatistics',
            scoreUrl: sysConstant.teacherApis + 'activity/listActivityScoreStatistics',
            stuTableUrl: sysConstant.teacherApis + 'activity/listActivityStudentStatistics',
            classTableUrl: sysConstant.teacherApis + 'activity/listActivityClassStatistics'
        }
    }
    /** @ngInject */
    function noteTest() {
        return {
            testUrl: 'data/test0.json',

            baseInfoUrl: 'data/note1-0.json',
            resTypeUrl: 'data/note1-3.json',
            askTableUrl: 'data/note1-1.json',
            stuTableUrl: 'data/note2-2.json',
            askListUrl: 'data/note3-2.json'
        }
    }
    function noteUrl(sysConstant) {
        return {
            testUrl: 'data/test0.json',

            baseInfoUrl: sysConstant.teacherApis + 'teacharStatistics/getAskAnswerSum',
            resTypeUrl: sysConstant.teacherApis + 'teacharStatistics/listAskbyResourceType',
            askTableUrl: sysConstant.teacherApis + 'teacharStatistics/listAskbyCourse',
            stuTableUrl: sysConstant.teacherApis + 'teacharStatistics/listAskbyStudent',
            askListUrl: sysConstant.teacherApis + 'teacharStatistics/queryAskStatisticsList'
        }
    }
    /** @ngInject */
    function gradeTest() {
        return {
            testUrl: 'data/test0.json',

            baseInfoUrl: 'data/grade1-1.json',
            gradeTableUrl: 'data/grade1-2.json',
            gradeSortUrl: 'data/grade2-1.json',
            stuTableUrl: 'data/grade2-2.json'
        }
    }
    function gradeUrl(sysConstant) {
        return {
            testUrl: 'data/test0.json',

            baseInfoUrl: sysConstant.teacherApis + 'teacharStatistics/queryGradeTotalSum',
            gradeTableUrl: sysConstant.teacherApis + 'teacharStatistics/queryGradeTotalList',
            gradeSortUrl: sysConstant.teacherApis + 'teacharStatistics/queryGradeDistribution',
            stuTableUrl: sysConstant.teacherApis + 'teacharStatistics/queryStudentStatisticsList'

        }
    }

    /** @ngInject */
    function adDataBaseTest() {
        return {
            testUrl: 'data/test0.json',
            test0Url: 'data/test00.json',

            studyNum: 'data/admin/adDataBase/studyNum.json',
            compareCourse: 'data/admin/adDataBase/compareCourse.json'
        }
    }
    function adDataBaseUrl(sysConstant) {
        return {
            testUrl: 'data/test0.json',
            test0Url: 'data/test00.json',

            baseInfoUrl: sysConstant.teacherApis + 'teacharStatistics/selectStudentGenderRatio',
            courseTableUrl: sysConstant.teacherApis + 'course/listCourseStudent',
            studyTrendUrl: sysConstant.teacherApis + 'course/listCourseStudyTrend',
            stuTableUrl: sysConstant.teacherApis + 'course/listCourseStudentDetail',

            reprotBaseUrl: sysConstant.openxApis + 'student/getResources',
            homeScoreUrl: sysConstant.openxApis + 'student/getHomework',
            activityUrl: sysConstant.openxApis + 'student/getActivity',
            resTableUrl: sysConstant.openxApis + 'student/getResource',

            loginBehaviorUrl: sysConstant.studyApis + 'statistical/listLoginlLearningDetails',
            timeLineUrl: sysConstant.teacherApis + 'teacharStatistics/listDataStudentStatistics'
        }
    }
    /** @ngInject */
    function collegeInfoTest() {
        return {
            testUrl: 'data/test0.json',
            test0Url: 'data/test00.json',

            studyNum: 'data/admin/adDataBase/studyNum.json',
            compareCourse: 'data/admin/adDataBase/compareCourse.json',
            timeFrame: 'data/activity2-1.json',
            scoreUrl: 'data/activity2-2.json',
            teacherDataUrl: 'data/home2-2-4.json'
        }
    }
    function collegeInfoUrl(sysConstant) {
        return {
            testUrl: 'data/test0.json',
            test0Url: 'data/test00.json',

            baseInfoUrl: sysConstant.teacherApis + 'teacharStatistics/selectStudentGenderRatio',
            courseTableUrl: sysConstant.teacherApis + 'course/listCourseStudent',
            studyTrendUrl: sysConstant.teacherApis + 'course/listCourseStudyTrend',
            stuTableUrl: sysConstant.teacherApis + 'course/listCourseStudentDetail',

            reprotBaseUrl: sysConstant.openxApis + 'student/getResources',
            homeScoreUrl: sysConstant.openxApis + 'student/getHomework',
            activityUrl: sysConstant.openxApis + 'student/getActivity',
            resTableUrl: sysConstant.openxApis + 'student/getResource',

            loginBehaviorUrl: sysConstant.studyApis + 'statistical/listLoginlLearningDetails',
            timeLineUrl: sysConstant.teacherApis + 'teacharStatistics/listDataStudentStatistics'
        }
    }
})();