/**
 * 温馨提示：payload中的参数需要后端各接口内查看，这里不公示
 */

import config from './config'
import http from './http'

export default {
  /**
   * 请求登录
   * @method executeSignIn
   * @param {Object} payload 载荷
   * @returns {Object} 登录教师的基本信息及token
   */
  executeSignIn: async (payload) => {
    const res = await http({
      url: config.EXECUTE_SIGN_IN,
      method: 'post',
      data: {
        jobCode: payload.jobCode,
        password: payload.password
      }
    })
    return res
  },
  /**
   * 请求所有身份字典信息
   * @method loadDictionaryRoleInfo
   * @returns {Array} 身份字典信息
   */
  loadDictionaryRoleInfo: async () => {
    const res = await http({
      url: config.LOAD_DICTIONARY_ROLE_INFO
    })
    return res
  },
  /**
   * 请求所有部门字典信息
   * @method loadDictionaryDepartmentInfo
   * @returns {Array} 部门字典信息
   */
  loadDictionaryDepartmentInfo: async () => {
    const res = await http({
      url: config.LOAD_DICTIONARY_DEPARTMENT_INFO
    })
    return res
  },
  /**
   * 请求所有研究类别字典信息
   * @method loadDictionaryResearchCategoryInfo
   * @returns {Array} 研究类别字典信息
   */
  loadDictionaryResearchCategoryInfo: async () => {
    const res = await http({
      url: config.LOAD_DICTIONARY_RESEARCH_CATEGORY_INFO
    })
    return res
  },
  /**
   * 请求所有学期字典信息
   * @method loadDictionaryTermInfo
   * @returns {Array} 学期字典信息
   */
  loadDictionaryTermInfo: async () => {
    const res = await http({
      url: config.LOAD_DICTIONARY_TERM_INFO
    })
    return res
  },
  /**
   * 请求所有项目信息
   * @method loadProjectInfo
   * @returns {Array} 项目信息
   */
  loadProjectInfo: async () => {
    const res = await http({
      url: config.LOAD_PROJECT_INFO
    })
    return res
  },
  /**
   * 请求所有项目成员信息
   * @method loadProjectMemberInfo
   * @returns {Array} 项目成员信息
   */
  loadProjectMemberInfo: async () => {
    const res = await http({
      url: config.LOAD_PROJECT_MEMBER_INFO
    })
    return res
  },
  /**
   * 请求所有项目评审记录信息
   * @method loadProjectReviewRecordInfo
   * @returns {Array} 项目评审记录信息
   */
  loadProjectReviewRecordInfo: async () => {
    const res = await http({
      url: config.LOAD_PROJECT_REVIEW_RECORD_INFO
    })
    return res
  },
  /**
   * 请求所有人员身份信息
   * @method loadRoleInfo
   * @returns {Array} 人员身份信息
   */
  loadRoleInfo: async () => {
    const res = await http({
      url: config.LOAD_ROLE_INFO
    })
    return res
  },
  /**
   * 请求所有账号风格配置信息
   * @method loadSettingInfo
   * @returns {Array} 账号风格配置信息
   */
  loadSettingInfo: async () => {
    const res = await http({
      url: config.LOAD_SETTING_INFO
    })
    return res
  },
  /**
   * 请求所有专家信息库信息
   * @method loadSpecialistInfo
   * @returns {Array} 专家信息库信息
   */
  loadSpecialistInfo: async () => {
    const res = await http({
      url: config.LOAD_SPECIALIST_INFO
    })
    return res
  },
  /**
   * 请求所有密保问题字典信息
   * @method loadDictionarySecretQuestionInfo
   * @returns {Array} 专家信息库信息
   */
  loadDictionarySecretQuestionInfo: async () => {
    const res = await http({
      url: config.LOAD_DICTIONARY_SECRET_QUESTION_INFO
    })
    return res
  },
  /**
   * 请求所有主要科学研究和教学研究工作简历信息
   * @method loadTeacherResearchResumeInfo
   * @returns {Array} 主要科学研究和教学研究工作简历信息
   */
  loadTeachingResearchResumeInfo: async () => {
    const res = await http({
      url: config.LOAD_TEACHING_RESEARCH_RESUME_INFO
    })
    return res
  },
  /**
   * 请求所有主要教学工作简历信息
   * @method loadTeachingResumeInfo
   * @returns {Array} 主要教学工作简历信息
   */
  loadTeachingResumeInfo: async () => {
    const res = await http({
      url: config.LOAD_TEACHING_RESUME_INFO
    })
    return res
  },
  /**
   * 创建研究类型字典信息
   * @method createDictionaryResearchCategory
   * @param {Object} payload 载荷
   * @returns {Object} 创建成功后的研究类型字典信息
   */
  createDictionaryResearchCategory: async (payload) => {
    const res = await http({
      url: config.CREATE_DICTIONARY_RESEARCH_CATEGORY,
      data: {
        categoryName: payload.categoryName
      }
    })
    return res
  },
  /**
   * 创建学期字典信息
   * @method createDictionaryTerm
   * @param {Object} payload 载荷
   * @param {Object} 创建成功后的学期字典信息
   */
  createDictionaryTerm: async (payload) => {
    const res = await http({
      url: config.CREATE_DICTIONARY_TERM,
      data: {
        termName: payload.termName
      }
    })
    return res
  },
  /**
   * 根据工号查找教师信息
   * @method findTeacherByJobcode
   * @param {Object} 载荷
   * @returns {Object} 查找到的结果
   */
  findTeacherByJobcode: async (payload) => {
    const res = await http({
      url: config.FIND_TEACHER_BY_JOBCODE,
      data: {
        jobCode: payload.jobCode
      }
    })
    return res
  },
  /**
   * 初始化项目信息
   * @member createProject
   * @returns {Object} 创建成功后的项目信息
   */
  initializeProject: async (payload) => {
    const res = await http({
      url: config.INITIALIZE_PROJECT,
      method: 'post',
      data: payload
    })
    return res
  },
  /**
   * 创建项目状态日志信息
   * @method createLogProjectStatus
   * @param {Object} payload 负载
   * @returns {Object} 创建成功后的项目状态日志信息
   */
  createLogProjectStatus: async (payload) => {
    const res = await http({
      url: config.CREATE_LOG_PROJECT_STATUS,
      method: 'get',
      data: {
        _projectId: payload._projectId,
        projectStatus: payload.projectStatus,
        jobCode: payload.jobCode
      }
    })
    return res
  },
  /**
   * 创建身份字典信息
   * @method createDictionaryRole
   * @param {Object} payload 负载
   * @returns {Object} 创建成功后的身份字典信息
   */
  createDictionaryRole: async (payload) => {
    const res = await http({
      url: config.CREATE_DICTIONARY_ROLE,
      data: {
        roleName: payload.roleName
      }
    })
    return res
  },
  /**
   * 创建部门字典信息
   * @method createDictionaryDepartment
   * @param {Object} payload 负载
   * @returns {Object} 创建成功后的部门字典信息
   */
  createDictionaryDepartment: async (payload) => {
    const res = await http({
      url: config.CREATE_DICTIONARY_DEPARTMENT,
      data: {
        departmentName: payload.departmentName
      }
    })
    return res
  },
  /**
   * 创建密保问题字典信息
   * @method createDictionarySecretQuestion
   * @param {Object} payload 负载
   * @returns {Object} 创建成功后的密保问题字典信息
   */
  createDictionarySecretQuestion: async (payload) => {
    const res = await http({
      url: config.CREATE_DICTIONARY_SECRET_QUESTION,
      data: {
        question: payload.question
      }
    })
    return res
  },
  /**
   * 请求所有教师信息
   * @method loadTeacherInfo
   * @returns {Array} 所有教师信息
   */
  loadTeacherInfo: async () => {
    const res = await http({
      url: config.LOAD_TEACHER_INFO
    })
    return res
  },
  /**
   * 根据教师编号查找身份信息
   * @method findRoleByTeacherId
   * @param {Object} payload 负载
   * @returns {Object} 查找到的教师身份信息
   */
  findRoleByTeacherId: async (payload) => {
    const res = await http({
      url: config.FIND_ROLE_BY_TEACHERID,
      data: {
        teacherId: payload.teacherId
      }
    })
    return res
  },
  /**
   * 创建token
   * @method createToken
   * @param payload 负载
   * @returns {Object} 创建成功后的token
   */
  creatToken: async (payload) => {
    const res = await http({
      url: config.CREATE_TOKEN,
      data: {
        _teacherId: payload._teacherId
      }
    })
    return res
  },
  /**
   * 验证token
   * @method verifyToken
   * @returns {Object} 验证成功后返回允许教师的编号
   */
  verifyToken: async () => {
    const res = await http({
      url: config.VERIFY_TOKEN
    })
    return res
  },
  /**
   * 获取所有批次信息
   * @method loadBatchInfo
   * @returns {Array} 批次信息
   */
  loadBatchInfo: async () => {
    const res = await http({
      url: config.LOAD_BATCH_INFO
    })
    return res
  },
  /**
   * 创建批次信息
   * @method createBatch
   * @param {Object} payload 负载
   * @returns {Object} 创建成功后的批次信息
   */
  createBatch: async (payload) => {
    const res = await http({
      url: config.CREATE_BATCH,
      method: 'post',
      data: payload
    })
    return res
  },
  /**
   * 验证项目申请资格
   * @method verifyApplyQualification
   * @param {Object} payload 负载
   * @returns {Object} 验证后的状态信息
   */
  verifyApplyQualification: async (payload) => {
    const res = await http({
      url: config.VERIFY_APPLY_QUALIFICATION,
      data: payload
    })
    return res
  },
  /**
   * 根据项目编号查找项目成员信息
   * @method projectMemberFindByProjectId
   * @param {Object} payload 负载
   * @returns {Object} 查找到的成员信息
   */
  projectMemberFindByProjectId: async (payload) => {
    const res = await http({
      url: config.FIND_PROJECT_MEMBER_BY_PROJECTID,
      data: payload
    })
    return res
  },
  /**
   * 创建项目成员
   * @method createProjectMember
   * @param {Object} payload 负载
   * @returns {Object} 创建后的成员
   */
  createProjectMember: async (payload) => {
    const res = await http({
      url: config.CREATE_PROJECT_MEMBER,
      data: payload
    })
    return res
  },
  /**
   * 根据教师工号查询主持和参与的项目
   * @method projectMemberFindByJobCode
   * @param {Object} payload 负载
   * @returns {Object} 当前工号主持和参与的项目
   */
  projectMemberFindByJobCode: async (payload) => {
    const res = await http({
      url: config.FIND_PROJECT_MEMBER_BY_JOBCODE,
      data: payload
    })
    return res
  },
  /**
   * 根据项目编号更新项目信息
   * @method projectUpdateById
   * @param {Object} payload 负载
   * @returns {Object} 更新后的项目信息
   */
  projectUpdateById: async (payload) => {
    const res = await http({
      url: config.UPDATE_PROJECT_BY_ID,
      method: 'post',
      data: payload
    })
    return res
  },
  /**
   * 根据教师工号找到项目基本信息、成员信息、教学工作简历、教研工作简历
   * @method findTeacherProjectInfoByJobcode
   * @param {Object} payload 负载
   * @returns {Array} 查找到的项目相关信息
   */
  findTeacherProjectInfoByJobcode: async (payload) => {
    const res = await http({
      url: config.FIND_TEACHER_PROJECT_INFO_BY_JOBCODE,
      data: {
        jobCode: payload.jobCode
      }
    })
    return res
  },
  /**
   * 根据教师编号查询当前教师安全信息
   * @method findSecurityInfoByTeacherId
   * @param {Object} payload 负载
   * @returns {Object} 查找到的安全信息
   */
  findSecurityInfoByTeacherId: async (payload) => {
    const res = await http({
      url: config.FIND_TEACHER_SECUITY_INFO_BY_TEACHERID,
      method: 'post',
      data: payload
    })
    return res
  },
  /**
   * 根据教师工号初始化安全信息（用于初次登陆）
   * @method initSecurityInfoByJobeCode
   * @param {Object} payload 负载
   * @returns {Object} 信息初始化是否成功的状态
   */
  initSecurityInfoByJobeCode: async (payload) => {
    const res = await http({
      url: config.INITIALIZE_SECURITY_INFO,
      method: 'post',
      data: payload
    })
    return res
  },
  /**
   * 根据教师编号获取安全验证方式
   * @method verifyTypeByTeacherId
   * @param {Object} payload 负载
   * @returns {Object} 获取到的安全验证方式
   */
  verifyTypeByTeacherId: async (payload) => {
    const res = await http({
      url: config.VERIFY_TYPE_BY_TEACHERID,
      method: 'post',
      data: payload
    })
    return res
  },
  /**
   * 根据教师编号获取当前教师安全问题
   * @method findSecurityQuestionByTeacherId
   * @param {Object} payload 负载
   * @returns {Object} 获取到的安全问题
   */
  findSecurityQuestionByTeacherId: async (payload) => {
    const res = await http({
      url: config.FIND_SECURITY_QUESTION_BY_TEACHERID,
      method: 'post',
      data: payload
    })
    return res
  },
  /**
   * 根据教师编号进行密码校验
   * @method verifyPasswordByTeacherId
   * @param {Object} payload 负载
   * @returns {Object} 是否校验成功状态
   */
  verifyPasswordByTeacherId: async (payload) => {
    const res = await http({
      url: config.VERITY_PASSWORD,
      method: 'post',
      data: payload
    })
    return res
  },
  /**
   * 根据教师编号进行邮箱校验
   * @method verifyEmailByTeacherId
   * @param {Object} payload 负载
   * @returns {Object} 是否校验成功状态
   */
  verifyEmailByTeacherId: async (payload) => {
    const res = await http({
      url: config.VERITY_EMAIL,
      method: 'post',
      data: payload
    })
    return res
  },
  /**
   * 根据教师编号进行密保问题校验
   * @method verifyQuestionByTeacherId
   * @param {Object} payload 负载
   * @returns {Object} 是否校验成功状态
   */
  verifyQuestionByTeacherId: async (payload) => {
    const res = await http({
      url: config.VERITY_QUESTION,
      method: 'post',
      data: payload
    })
    return res
  },
  /**
   * 根据教师编号进行身份证号码校验
   * @method verifyIdcardByTeacherId
   * @param {Object} payload 负载
   * @returns {Object} 是否校验成功状态
   */
  verifyIdcardByTeacherId: async (payload) => {
    const res = await http({
      url: config.VERITY_IDCARD,
      method: 'post',
      data: payload
    })
    return res
  },
  /**
   * 根据教师编号查找教师信息
   * @method findTeacherByJobcode
   * @param {Object} payload 负载
   * @returns {Object} 查找到的教师信息
   */
  findTeacherInfoByTeacherId: async (payload) => {
    const res = await http({
      url: config.FIND_TEACHER_INFO_BY_TEACHERID
    })
    return res
  },
  /**
   * 根据教师编号更改密码
   * @method updatePassword
   * @param {Object} payload 负载
   * @returns {Object} 是否成功更改状态
   */
  updatePassword: async (payload) => {
    const res = await http({
      url: config.UPDATE_PASSWORD,
      method: 'post',
      data: payload
    })
    return res
  },
  /**
   * 根据教师编号更改邮箱
   * @method updatePassword
   * @param {Object} payload 负载
   * @returns {Object} 是否成功更改状态
   */
  updateEmail: async (payload) => {
    const res = await http({
      url: config.UPDATE_EMAIL,
      method: 'post',
      data: payload
    })
    return res
  },
  /**
   * 创建单个教师（并初始化security、role、setting）
   * @method createTeacher
   * @param {Object} payload 负载
   * @returns {Object} 是否成功创建状态
   */
  createTeacher: async (payload) => {
    const res = await http({
      url: config.CREATE_TEACHER,
      method: 'post',
      data: payload
    })
    return res
  },
  /**
   * 批量创建教师（并初始化security、role、setting）
   * @method createMoreTeacher
   * @param {Object} payload 负载
   * @returns {Object} 是否成功创建状态
   */
  createMoreTeacher: async (payload) => {
    const res = await http({
      url: config.CREATE_MORE_TEACHER,
      method: 'post',
      data: payload
    })
    return res
  }
}
