/**
 * 温馨提示：路由地址需要后端各路由接口中查看
 */
const BASE_URL = '/api'
const TEAC = '/teacher'
const DIC_ROLE = '/dictionary-role'
const DIC_DEPA = '/dictionary-department'
const DIC_PROJ_STAG = '/dictionary-project-stage'
const DIC_RESE_CATE = '/dictionary-research-category'
const DIC_TERM = '/dictionary-term'
const DIC_PROJ_BATC = '/dictionary-project-batch'
const DIC_SECR_QUES = '/dictionary-secret-question'
const PROJ = '/project'
const PROJ_MEMB = '/project-member'
const PROJ_REVI_RECO = '/project-review-record'
const ROLE = '/role'
const SETT = '/setting'
const SPEC = '/specialist'
const SECU = '/security'
const TEAC_RESE_RESU = '/teaching-research-resume'
const TEAC_RESU = '/teaching-resume'
const LOG_PROJ_STAT = '/log-project-status'
const TOKEN = '/token'
const BATC_PART = '/batch-particulars'

export default {
  EXECUTE_SIGN_IN: `${BASE_URL}${TEAC}/login`, // 登录
  LOAD_DICTIONARY_ROLE_INFO: `${BASE_URL}${DIC_ROLE}/all`, // 获取所有身份字典信息
  LOAD_DICTIONARY_DEPARTMENT_INFO: `${BASE_URL}${DIC_DEPA}/all`, // 获取所有部门字典信息
  LOAD_DICTIONARY_RESEARCH_CATEGORY_INFO: `${BASE_URL}${DIC_RESE_CATE}/all`, // 获取所有研究类别字典信息
  LOAD_DICTIONARY_TERM_INFO: `${BASE_URL}${DIC_TERM}/all`, // 获取所有学期字典信息
  LOAD_DICTIONARY_PROJECT_BATCH_INFO: `${BASE_URL}${DIC_PROJ_BATC}/all`, // 获取所有项目批次字典信息
  LOAD_DICTIONARY_SECRET_QUESTION_INFO: `${BASE_URL}${DIC_SECR_QUES}/all`, // 获取所有密保问题字典信息
  LOAD_PROJECT_INFO: `${BASE_URL}${PROJ}/all`, // 获取所有项目信息
  LOAD_PROJECT_MEMBER_INFO: `${BASE_URL}${PROJ_MEMB}/all`, // 获取所有项目成员信息
  LOAD_PROJECT_REVIEW_RECORD_INFO: `${BASE_URL}${PROJ_REVI_RECO}/all`, // 获取所有项目评审记录信息
  LOAD_ROLE_INFO: `${BASE_URL}${ROLE}/all`, // 获取所有人员身份信息
  LOAD_SETTING_INFO: `${BASE_URL}${SETT}/all`, // 获取所有账号风格配置信息
  LOAD_SPECIALIST_INFO: `${BASE_URL}${SPEC}all`, // 获取所有专家信息库信息
  LOAD_TEACHING_RESEARCH_RESUME_INFO: `${BASE_URL}${TEAC_RESE_RESU}/all`, // 获取所有主要科学研究和教学研究工作简历信息
  LOAD_TEACHING_RESUME_INFO: `${BASE_URL}${TEAC_RESU}/all`, // 获取所有主要教学工作简历信息
  LOAD_TEACHER_INFO: `${BASE_URL}${TEAC}/all`, // 获取所有教师信息
  LOAD_BATCH_PARTICULARS_INFO: `${BASE_URL}${BATC_PART}/all`, // 获取所有批次详情信息
  INITIALIZE_PROJECT: `${BASE_URL}${PROJ}/init`, // 初始化项目信息
  INITIALIZE_BATCH_PARTICULARS: `${BASE_URL}${BATC_PART}/init`, // 初始化批次详情信息
  INITIALIZE_SECURITY_INFO: `${BASE_URL}${SECU}/init`, // 初始化安全信息
  FIND_TEACHER_BY_JOBCODE: `${BASE_URL}${TEAC}/find/by-jobcode`, // 根据工号查询教师信息
  FIND_ROLE_BY_TEACHERID: `${BASE_URL}${ROLE}/find/by-teacherid`, // 根据教师编号查询身份信息
  FIND_PROJECT_MEMBER_BY_PROJECTID: `${BASE_URL}${PROJ_MEMB}/find/by-projectid`, // 根据项目编号查询项目成员信息
  FIND_PROJECT_MEMBER_BY_JOBCODE: `${BASE_URL}${PROJ_MEMB}/find/by-jobcode`, // 根据教师工号查询主持和参与的项目数量
  FIND_TEACHER_PROJECT_INFO_BY_JOBCODE: `${BASE_URL}${PROJ_MEMB}/find/allinfo/by-jobcode`, // 根据教师工号找到项目基本信息、成员信息、教学工作简历、教研工作简历
  FIND_TEACHER_SECUITY_INFO_BY_TEACHERID: `${BASE_URL}${SECU}/find/by-teacherid`, // 根据教师编号查询当前教师安全信息
  FIND_SECURITY_QUESTION_BY_TEACHERID: `${BASE_URL}${SECU}/find/question/by-teacherid`, // 根据教师编号查询当前教师安全问题
  FIND_TEACHER_INFO_BY_TEACHERID: `${BASE_URL}${TEAC}/find/by-teacherid`, // 根据教师编号查找教师信息
  CREATE_DICTIONARY_TERM: `${BASE_URL}${DIC_TERM}/create`, // 创建学期字典信息
  CREATE_DICTIONARY_ROLE: `${BASE_URL}${DIC_ROLE}/create`, // 创建身份字典信息
  CREATE_DICTIONARY_RESEARCH_CATEGORY: `${BASE_URL}${DIC_RESE_CATE}/create`, // 创建研究类别字典信息
  CREATE_DICTIONARY_PROJECT_STAGE: `${BASE_URL}${DIC_PROJ_STAG}/create`, // 创建项目阶段字典信息
  CREATE_DICTIONARY_PROJECT_BATCH: `${BASE_URL}${DIC_PROJ_BATC}/create`, // 创建项目批次字典信息
  CREATE_DICTIONARY_DEPARTMENT: `${BASE_URL}${DIC_DEPA}/create`, // 创建部门字典信息
  CREATE_DICTIONARY_SECRET_QUESTION: `${BASE_URL}${DIC_SECR_QUES}/create`, // 创建密保问题字典信息
  CREATE_LOG_PROJECT_STATUS: `${BASE_URL}${LOG_PROJ_STAT}/create`, // 创建项目状态日志信息
  CREATE_TOKEN: `${BASE_URL}${TOKEN}/creat`, // 创建token
  CREATE_PROJECT_MEMBER: `${BASE_URL}${PROJ_MEMB}/create`, // 创建项目成员
  UPDATE_PROJECT_BY_ID: `${BASE_URL}${PROJ}/update/by-id`, // 根据项目编号更新项目信息
  VERIFY_TOKEN: `${BASE_URL}${TOKEN}/verify`, // 验证token
  VERIFY_TYPE_BY_TEACHERID: `${BASE_URL}${SECU}/verifytype`, // 获取安全验证方式
  VERIFY_APPLY_QUALIFICATION: `${BASE_URL}${PROJ_MEMB}/veApQu`, // 验证项目申请资格
  VERITY_PASSWORD: `${BASE_URL}${SECU}/verify/password/by-teacherid`, // 密码校验
  VERITY_EMAIL: `${BASE_URL}${SECU}/verify/email/by-teacherid`, // 邮箱校验
  VERITY_QUESTION: `${BASE_URL}${SECU}/verify/question/by-teacherid`, // 密保问题校验
  VERITY_IDCARD: `${BASE_URL}${SECU}/verify/idcard/by-teacherid`, // 身份证号码校验
  UPDATE_PASSWORD: `${BASE_URL}${SECU}/update/password`, // 根据教师编号更改密码
  UPDATE_EMAIL:`${BASE_URL}${secu]}/update/email` // 根据教师编号更改邮箱
}
