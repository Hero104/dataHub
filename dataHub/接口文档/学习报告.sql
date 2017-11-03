

//=============================================二级页面 - 课程详情====================================================
-------------------------------------------------------------2.1-----------------------------------------------
--学习报告
--学生 单个课程 
--基础数据 学习时长分布 二级页面 对应页面位置
--总体统计   二级页面  
http://47.93.81.162:6060/Openx_Statis/datastatis/student/getResources

请求体
{
 "user_id":2087              //用户id
,"course_id":1735403         //课程id
}

返回体
[
    {
        "ask_count": 0,                 //提问总数
        "course_id": 1735403,           //课程id
        "course_name": "社交礼仪",      //课程名称
        "course_resource_count": 30,    //课程的资源总数
        "document_percent": 0,          //文档占比 (1-100)
        "document_study_time": 0,       //文档学习时间
        "homework_percent": 100,        //作业占比 (1-100)
        "homework_study_time": 622,     //作业学习时间
        "note_count": 0,                //笔记总数
		"study_count": 0,               //学习次数即访问量		
        "progress": 17,                 //学习进度
        "total_study_time": 622,        //总学习时长
        "user_id": 2087,                //用户id
        "video_percent": 0,             //视频占比 (1-100)
        "video_study_time": 0           //视频学习时间
    }
]

------------------------------------------------------------2.2--------------------------------------------------
--学习报告
--作业分析 二级页面 对应页面位置
--学生 单个课程 
--作业统计   二级页面
http://47.93.81.162:6060/Openx_Statis/datastatis/student/getHomework

请求体
{
 "user_id":2087              //用户id
,"course_id":1735403         //课程id
}

返回体
[
    {
        "avg_score": 96,                                     //平均成绩
        "course_id": 1735403,                                //课程id
        "error_count": 48,                                   //错题总数
        "homework_createtime": "2017-04-07 14:39:10.0",      //作业创建时间
        "homework_id": 2320958,                              //作业id
        "homework_name": "testyangzz001",                    //作业名称
        "homework_total_score": 1,                           //作业总分数
        "homework_total_time": 1,                            //作业总时长
        "max_score": 96,                                     //最高成绩
        "min_score": 96,                                     //最小成绩
        "study_time": 221,                                   //学习时长/作答时间
        "user_id": 2087,                                     //用户id
        "visit_count": 1                                     //访问量即学习次数
    },
    {
        "avg_score": 100,
        "course_id": 1735403,
        "error_count": 50,
        "homework_createtime": "2017-04-07 14:39:10.0",
        "homework_id": 2320961,
        "homework_name": "testyangzz001",
        "homework_total_score": 1,
        "homework_total_time": 1,
        "max_score": 100,
        "min_score": 100,
        "study_time": 133,
        "user_id": 2087,
        "visit_count": 1
    }
]


----------------------------------------------------2.3---------------------------------------------
--学习报告
--活动活跃度 二级页面 对应页面位置
--学生 单个课程 
--活动统计  二级统计
http://47.93.81.162:6060/Openx_Statis/datastatis/student/getActivity

请求体
{
 "user_id":2087              //用户id
,"course_id":1735403         //课程id
}

返回体

[
    {
        "activity_creator_id": 826,             //活动创建者id
        "activity_id": 2268955,                 //活动id
        "activity_name": "讨论交流区",          //活动名称
        "activity_url": "null",                 //活动url地址
        "course_id": 1735403,                   //课程id
        "end_time": "2017-06-19 23:59:59.0",    //活动截止时间
        "join_count": 1,                        //发帖数
        "start_time": "2017-02-27 00:00:00.0",  //活动开始时间
        "user_id": 2087                         //用户id
    }
]


----------------------------------------------2.4-----------------------------------------------------
--学习报告
--资源统计  二级页面 对应页面位置
--学生 单个课程 
--资源统计  二级级统计
http://47.93.81.162:6060/Openx_Statis/datastatis/student/getResource

请求体
{
 "user_id":2087              //用户id
,"course_id":1735403         //课程id
}

返回体
[
    {
        "ask_count": 0,                     //提问数量
        "course_id": 1735403,               //课程id
        "note_count": 0,                    //笔记数量
        "progress": 1,                      //进度 （1-100）
        "resource_id": 5652,                //资源id
        "resource_name": "第十五讲",        //资源名称
        "resource_type": 1,                 //资源类型
        "sequence_id": 2781,                //章节排序id
        "study_count": 1,                   //访问量 = 学习次数
        "study_time": 0,                    //学习时长
        "user_id": 2087                     //用户id
    },
    {
        "ask_count": 0,
        "course_id": 1735403,
        "note_count": 0,
        "progress": 10,
        "resource_id": 6121,
        "resource_name": "导学",
        "resource_type": 1,
        "sequence_id": 1,
        "study_count": 1,
        "study_time": 0,
        "user_id": 2087
    }
]
