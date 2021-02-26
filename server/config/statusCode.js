module.exports = {
  // 响应状态码
  HTTP_SUCCEED: {
    code: 200,
    message: "请求成功",
  },
  HTTP_NOT_FOUND: {
    code: 404,
    message: "请求失败",
  },
  HTTP_NOT_IMPLEMENTED: {
    code: 501,
    message: "无法识别的请求",
  },
  // 授权状态码
  PERMISSION_APPLY_PROJECT: {
    code: 1000,
    message: "允许教研项目申请",
  },
  WITHOUT_PERMISSION_APPLY_PROJECT: {
    code: 1001,
    message: "不允许教研项目申请",
  },
  PERMISSION_APPLY_PROJECT_AS_LEADER: {
    code: 1002,
    message: "仅允许以项目主持人身份，进行教研项目申请",
  },
  PERMISSION_APPLY_PROJECT_AS_PARTICIPENT: {
    code: 1003,
    message: "仅允许以项目参与者身份，进行教研项目申请",
  },

  // 用户状态码

  // CREDENTIALS_INVALID: {
  //   code: 2001,
  //   message: '工号或密码错误',
  // },
  // 业务状态码
  NOT_FOUND_JOBCODE: {
    code: 3000,
    message: "没有找到工号",
  },
  WRONG_PASSWORD: {
    code: 3001,
    message: "密码验证错误",
  },
  NOT_FOUND_SECURITY_INFO_BY_TEACHERID: {
    code: 3002,
    message: "没有找到该账号相关安全信息",
  },
  NOT_FOUND_DICTIONARY_ROLE_INFO: {
    code: 3003,
    message: "没有找到身份字典相关信息",
  },
  INITIALIZE_SETTING_ERROR: {
    code: 3004,
    message: "初始化账号风格配置信息失败",
  },
  NOT_FOUND_DICTIONARY_DEPARTMENT_INFO: {
    code: 3005,
    message: "没有找到部门字典相关信息",
  },
  NOT_FOUND_DICTIONARY_PROJECT_STAGE_INFO: {
    code: 3006,
    message: "没有找到项目阶段字典相关信息",
  },
  NOT_FOUND_DICTIONARY_RESEARCH_CATEGORY_INFO: {
    code: 3007,
    message: "没有找到研究类别字典相关信息",
  },
  NOT_FOUND_DICTIONARY_TERM_INFO: {
    code: 3008,
    message: "没有找到学期字典相关信息",
  },
  NOT_FOUND_PROJECT_INFO: {
    code: 3009,
    message: "没有找到项目相关信息",
  },
  NOT_FOUND_PROJECT_MEMBER_INFO: {
    code: 3010,
    message: "没有找到项目成员相关信息",
  },
  NOT_FOUND_PROJECT_REVIEW_RECORD_INFO: {
    code: 3011,
    message: "没有找到项目评审记录相关信息",
  },
  NOT_FOUND_ROLE_INFO: {
    code: 3012,
    message: "没有找到人员身份相关信息",
  },
  NOT_FOUND_SETTING_INFO: {
    code: 3013,
    message: "没有找到账号风格配置相关信息",
  },
  NOT_FOUND_SPECIALIST_INFO: {
    code: 3014,
    message: "没有找到专家信息库相关信息",
  },
  NOT_FOUND_TEACHING_RESEARCH_RESUME_INFO: {
    code: 3015,
    message: "没有找到主要科学研究和教学研究工作简历相关信息",
  },
  NOT_FOUND_TEACHING_RESUME_INFO: {
    code: 3016,
    message: "没有找到主要教学工作简历相关信息",
  },
  CREATE_DICTIONARY_RESEARCH_CATEGORY_ERROR: {
    code: 3017,
    message: "研究类别字典信息创建失败",
  },
  INITIALIZE_PROJECT_ERROR: {
    code: 3018,
    message: "初始化项目信息失败",
  },
  CREATE_DICTIONARY_TERM_ERROR: {
    code: 3019,
    message: "学期字典信息创建失败",
  },
  NOT_FOUND_DICTIONARY_PROJECT_BATCH_INFO: {
    code: 3020,
    message: "没有找到项目批次字典相关信息",
  },
  CREATE_DICTIONARY_PROJECT_BATCH_ERROR: {
    code: 3021,
    message: "项目批次字典信息创建失败",
  },
  CREATE_TEACHING_RESEARCH_RESUME_ERROR: {
    code: 3022,
    message: "主要科学研究和教学研究工作简历创建失败",
  },
  NOT_FOUND_LOG_PROJECT_STATUS_INFO: {
    code: 3023,
    message: "没有找到项目状态日志相关信息",
  },
  CREATE_LOG_PROJECT_STATUS_ERROR: {
    code: 3024,
    message: "项目状态日志创建失败",
  },
  CREATE_DICTIONARY_ROLE_ERROR: {
    code: 3025,
    message: "身份字典信息创建失败",
  },
  CREATE_DICTIONARY_PROJECT_STAGE_ERROR: {
    code: 3026,
    message: "项目阶段字典信息创建失败",
  },
  CREATE_DICTIONARY_DEPARTMENT_ERROR: {
    code: 3027,
    message: "部门字典信息创建失败",
  },
  INITIALIZE_ROLE_ERROR: {
    code: 3028,
    message: "初始化身份信息失败",
  },
  CREATE_TEACHER_ERROR: {
    code: 3029,
    message: "教师创建失败",
  },
  NOT_FOUND_TEACHER_INFO: {
    code: 3030,
    message: "没有找到教师信息",
  },
  NOT_FOUND_DICTIONARY_SECRET_QUESTION_INFO: {
    code: 3031,
    message: "没有找到密保问题字典相关信息",
  },
  CREATE_DICTIONARY_SECRET_QUESTION_ERROR: {
    code: 3032,
    message: "密保问题字典信息创建失败",
  },
  INITIALIZE_SECURITY_ERROR: {
    code: 3033,
    message: "初始化安全信息失败",
  },
  NOT_FOUND_ROLE_INFO_BY_TEACHERID: {
    code: 3034,
    message: "根据教师编号没有找到身份信息",
  },
  NOT_FOUND_SETTING_INFO_BY_TEACHERID: {
    code: 3035,
    message: "根据教师编号没有找到账号风格配置",
  },
  HTTP_HEADER_NOT_FOUND_TOKEN_INFO: {
    code: 3036,
    message: "请求头中没有找到Token信息",
  },
  TOKEN_OTHER_ERROR: {
    code: 3037,
    message: "Token验证时发生未知错误",
  },
  TOKEN_EXPIRED: {
    code: 3038,
    message: "Token已过期",
  },
  NOT_FOUND_BATCH_PARTICULARS_INFO: {
    code: 3039,
    message: "没有找到批次详情信息",
  },
  INITIALIZE_BATCH_PARTICULARS_ERROR: {
    code: 3040,
    message: "初始化批次详情信息失败",
  },
  NOT_FOUND_PROJECT_MEMBER_INFO_BY_JOBCODE: {
    code: 3041,
    message: "根据教师工号没有找到成员信息",
  },
  CREATE_PROJECT_MEMBER_ERROR: {
    code: 3042,
    message: "项目成员信息创建失败",
  },
  NOT_FOUND_PROJECT_MEMBER_INFO_BY_PROJECTID: {
    code: 3043,
    message: "根据项目编号没有找到成员信息",
  },
  PROJECT_MEMBER_IS_REPEAT: {
    code: 3044,
    message: "在该项目中，项目成员重复出现",
  },
  PROJECT_UPDATE_BY_ID_ERROR: {
    code: 3045,
    message: "根据项目编号更新项目失败",
  },
  NOT_FOUND_TEACHER_PROJECT_INFO_BY_JOBCODE: {
    code: 3046,
    message: "根据教师工号没有找到教师项目相关信息",
  },
  INITIALIZE_SECRET_QUESTION_INFO_BY_TEACHERID_ERROR: {
    code: 3047,
    message: "初始设置密保问题信息失败",
  },
  NOT_FOUND_SECRET_QUESTION_INFO_BY_TEACHERID: {
    code: 3038,
    message: "当前教师没有设置安全问题",
  },
  WRONG_QUESTION: {
    code: 3039,
    message: "密保问题验证错误",
  },
  WRONG_EMAIL: {
    code: 3040,
    message: "邮箱验证错误",
  },
  WRONG_IDCARD: {
    code: 3041,
    message: "身份证号码验证错误",
  },
  NOT_FOUND_TEACHERID: {
    code: 3042,
    message: "没有找到教师号",
  },
}
