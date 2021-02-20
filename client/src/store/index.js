import { createStore } from 'vuex'
import api from './http/api'
import { getPromiseActionNoMutations } from './utils/promiseUtils'
import themeSetting from './modules/themeSetting'
import { stateSuccessVerify } from './utils/stateVerify'

export default createStore({
  state: {
    token: window.localStorage.getItem('authorization'),
    signInLoading: false, // 登录加载状态
    currentTeacherInfo: {}, // 当前登录教师信息(teacherInfo、roleInfo、settingInfo)
    teacherProjectInfo: {}, // 当前登录教师的项目信息（teacherProjectList、totalCount、leaderCount、participantCount）
    dictionaryResearchCategoryInfo: [], // 研究类别字典
    dictionaryTermInfo: [], // 学期字典
    dictionaryDepartmentInfo: [], // 部门字典
    dictionaryRoleInfo: [], // 身份字典
    dictionaryProjectBatchInfo: [], // 项目批次字典
    dictionarySecretQuestionInfo: [], // 密保问题字典
    batchParticularsInfo: [] // 批次详细信息
  },
  getters: {},
  mutations: {
    SIGN_IN_LOADING_STATUS: (state) => {
      state.signInLoading = !state.signInLoading
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      window.localStorage.setItem('authorization', token)
    },
    CLEAR_TOKEN: (state) => {
      state.token = ''
      window.localStorage.setItem('authorization', '')
    },
    SET_CURRENT_TEACHER_INFO: (state, currentTeacherInfo) => {
      state.currentTeacherInfo = currentTeacherInfo
    },
    SET_DICTIONARY_RESEARCH_CATEGORY_INFO: (state, dictionaryResearchCategoryInfo) => {
      state.dictionaryResearchCategoryInfo = dictionaryResearchCategoryInfo
    },
    SET_DICTIONARY_TERM_INFO: (state, dictionaryTermInfo) => {
      state.dictionaryTermInfo = dictionaryTermInfo
    },
    SET_DICTIONARY_DEPARTMENT_INFO: (state, dictionaryDepartmentInfo) => {
      state.dictionaryDepartmentInfo = dictionaryDepartmentInfo
    },
    SET_DICTIONARY_ROLE_INFO: (state, dictionaryRoleInfo) => {
      state.dictionaryRoleInfo = dictionaryRoleInfo
    },
    SET_DICTIONARY_PROJECT_BATCH_INFO: (state, dictionaryProjectBatchInfo) => {
      state.dictionaryProjectBatchInfo = dictionaryProjectBatchInfo
    },
    SET_DICTIONARY_SECRET_QUESTION_INFO: (state, dictionarySecretQuestionInfo) => {
      state.dictionarySecretQuestionInfo = dictionarySecretQuestionInfo
    },
    SET_BATCH_PARTICULARS_INFO: (state, batchParticularsInfo) => {
      state.batchParticularsInfo = batchParticularsInfo
    },
    SET_TEACHER_PROJECT_INFO: (state, teacherProjectInfo) => {
      state.teacherProjectInfo = teacherProjectInfo
    }
  },
  actions: {
    /**
     * 登录
     * @method executeSignIn
     * @param {Function} commit context.commit
     * @param {Object} payload 载荷
     * @returns {Object} 教师基本信息、token
     */
    executeSignIn: ({ commit, dispatch }, payload) => {
      commit('SIGN_IN_LOADING_STATUS')
      return getPromiseActionNoMutations(api.executeSignIn(payload)).then((res, err) => {
        commit('SIGN_IN_LOADING_STATUS')
        if (err) {
          console.log(err)
          return
        }
        stateSuccessVerify(res.code, () => {
          commit('SET_TOKEN', res.data.token)
          commit('SET_CURRENT_TEACHER_INFO', res.data.currentTeacherInfo)
          // 登录即初始化以下內容
          dispatch('loadDictionaryResearchCategoryInfo')
          dispatch('loadDictionaryTermInfo')
          dispatch('loadDictionaryDepartmentInfo')
          dispatch('loadDictionaryRoleInfo')
          dispatch('loadDictionaryProjectBatchInfo')
          dispatch('loadDictionarySecretQuestionInfo')
          dispatch('loadBatchParticularsInfo')
          const jobCode = res.data.currentTeacherInfo.teacherInfo.jobCode
          dispatch('findTeacherProjectInfoByJobcode', { jobCode })
        })
        return res
      })
    },
    /**
     * 初始化项目信息
     * @method initializeProject
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 创建成功后的项目信息
     */
    initializeProject: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.initializeProject(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 获取所有研究类别字典信息
     * @method loadDictionaryResearchCategoryInfo
     * @param {Function} commit context.commit
     * @returns {Object} 所有研究类别信息
     */
    loadDictionaryResearchCategoryInfo: ({ commit }) => {
      return getPromiseActionNoMutations(api.loadDictionaryResearchCategoryInfo()).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        stateSuccessVerify(res.code, () => {
          commit('SET_DICTIONARY_RESEARCH_CATEGORY_INFO', res.data)
        })
        return res
      })
    },
    /**
     * 获取所有学期字典信息
     * @method loadDictionaryTermInfo
     * @param {Function} commit context.commit
     * @returns {Object} 所有学期字典信息
     */
    loadDictionaryTermInfo: ({ commit }) => {
      return getPromiseActionNoMutations(api.loadDictionaryTermInfo()).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        stateSuccessVerify(res.code, () => {
          commit('SET_DICTIONARY_TERM_INFO', res.data)
        })
        return res
      })
    },
    /**
     * 获取所有部门字典信息
     * @method loadDictionaryDepartmentInfo
     * @param {Function} commit context.commit
     * @returns {Object} 所有部门字典信息
     */
    loadDictionaryDepartmentInfo: ({ commit }) => {
      return getPromiseActionNoMutations(api.loadDictionaryDepartmentInfo()).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        stateSuccessVerify(res.code, () => {
          commit('SET_DICTIONARY_DEPARTMENT_INFO', res.data)
        })
        return res
      })
    },
    /**
     * 获取所有身份字典信息
     * @method loadDictionaryRoleInfo
     * @param {Function} commit context.commit
     * @returns {Object} 所有身份字典信息
     */
    loadDictionaryRoleInfo: ({ commit }) => {
      return getPromiseActionNoMutations(api.loadDictionaryRoleInfo()).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        stateSuccessVerify(res.code, () => {
          commit('SET_DICTIONARY_ROLE_INFO', res.data)
        })
        return res
      })
    },
    /**
     * 获取所有项目批次字典信息
     * @method loadDictionaryProjectBatchInfo
     * @param {Function} commit context.commit
     * @returns {Object} 所有身份字典信息
     */
    loadDictionaryProjectBatchInfo: ({ commit }) => {
      return getPromiseActionNoMutations(api.loadDictionaryProjectBatchInfo()).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        stateSuccessVerify(res.code, () => {
          commit('SET_DICTIONARY_PROJECT_BATCH_INFO', res.data)
        })
        return res
      })
    },
    /**
     * 根据工号查找教师信息
     * @method findTeacherByJobcode
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 查找到的结果
     */
    findTeacherByJobcode: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.findTeacherByJobcode(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 创建项目状态日志信息
     * @method createLogProjectStatus
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 创建成功后的项目状态日志信息
     */
    createLogProjectStatus: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.createLogProjectStatus(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 创建身份字典信息
     * @method createDictionaryRole
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 创建成功后的身份字典信息
     */
    createDictionaryRole: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.createDictionaryRole(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 创建研究类型字典信息
     * @method createDictionaryResearchCategory
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 创建成功后的研究类型字典信息
     */
    createDictionaryResearchCategory: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.createDictionaryResearchCategory(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 创建学期字典信息
     * @method createDictionaryResearchCategory
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 创建成功后的学期字典信息
     */
    createDictionaryTerm: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.createDictionaryTerm(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 创建项目批次字典信息
     * @method createDictionaryProjectBatch
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 创建成功后的项目批次字典信息
     */
    createDictionaryProjectBatch: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.createDictionaryProjectBatch(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 创建部门字典信息
     * @method createDictionaryDepartment
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 创建成功后的部门字典信息
     */
    createDictionaryDepartment: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.createDictionaryDepartment(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 创建密保问题字典信息
     * @method createDictionarySecretQuestion
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 创建成功后的密保问题字典信息
     */
    createDictionarySecretQuestion: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.createDictionarySecretQuestion(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 获取所有教师信息
     * @method createDictionaryDepartment
     * @param {Function} commit context.commit
     * @returns {Object} 所有教师信息
     */
    loadTeacherInfo: ({ commit }) => {
      return getPromiseActionNoMutations(api.loadTeacherInfo()).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 获取所有密保问题字典信息
     * @method loadDictionarySecretQuestionInfo
     * @param {Function} commit context.commit
     * @returns {Object} 所有密保问题字典信息
     */
    loadDictionarySecretQuestionInfo: ({ commit }) => {
      return getPromiseActionNoMutations(api.loadDictionarySecretQuestionInfo()).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        stateSuccessVerify(res.code, () => {
          commit('SET_DICTIONARY_SECRET_QUESTION_INFO', res.data)
        })
        return res
      })
    },
    /**
     * 根据教师编号查找身份信息
     * @method findRoleByTeacherId
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 查找到的教师身份信息
     */
    findRoleByTeacherId: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.findRoleByTeacherId(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 创建token
     * @method createToken
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 创建成功后的token
     */
    createToken: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.creatToken(payload)).thn((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        stateSuccessVerify(res.code, () => {
          commit('SET_TOKEN', res.data.token)
        })
        return res
      })
    },
    /**
     * 验证token
     * @method verifyToken
     * @param {Function} commit context.commit
     * @returns {Object} 验证成功后返回允许教师的编号
     */
    verifyToken: ({ commit }) => {
      return getPromiseActionNoMutations(api.verifyToken()).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 获取所有批次详情信息
     * @method loadBatchParticularsInfo
     * @param {Function} commit context.commit
     * @returns {Object} 所有批次详情信息
     */
    loadBatchParticularsInfo: ({ commit }) => {
      return getPromiseActionNoMutations(api.loadBatchParticularsInfo()).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        stateSuccessVerify(res.code, () => {
          commit('SET_BATCH_PARTICULARS_INFO', res.data)
        })
        return res
      })
    },
    /**
     * 验证项目申请资格
     * @method verifyApplyQualification
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 验证后的状态信息
     */
    verifyApplyQualification: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.verifyApplyQualification(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 根据项目编号查找项目成员信息
     * @method projectMemberFindByProjectId
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 查找到的成员信息
     */
    projectMemberFindByProjectId: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.projectMemberFindByProjectId(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 创建项目成员
     * @method createProjectMember
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 创建后的项目成员信息
     */
    createProjectMember: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.createProjectMember(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 根据教师工号查询主持和参与的项目
     * @method projectMemberFindByJobCode
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 当前工号主持和参与的项目
     */
    projectMemberFindByJobCode: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.projectMemberFindByJobCode(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 根据项目编号更新项目信息
     * @method projectUpdateById
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Object} 更新后的项目信息
     */
    projectUpdateById: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.projectUpdateById(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 根据教师工号找到项目基本信息、成员信息、教学工作简历、教研工作简历
     * @method findTeacherProjectInfoByJobcode
     * @param {Function} commit context.commit
     * @param {Object} payload 负载
     * @returns {Array} 查找到的项目相关信息
     */
    findTeacherProjectInfoByJobcode: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.findTeacherProjectInfoByJobcode(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        stateSuccessVerify(res.code, () => {
          commit('SET_TEACHER_PROJECT_INFO', res.data)
        })
        return res
      })
    },
    /**
     * 根据教师编号查询当前教师安全信息
     * @method findSecurityInfoByTeacherId
     * @param {Function} commit context.commit
     * @param {*} payload 负载
     * @returns {Object} 查找到的安全信息
     */
    findSecurityInfoByTeacherId: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.findSecurityInfoByTeacherId(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 根据教师工号初始化安全信息（用于初次登陆）
     * @method initSecurityInfoByJobeCode
     * @param {Object} payload 负载
     * @returns {Object} 信息初始化是否成功的状态
     */
    initSecurityInfoByJobeCode: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.initSecurityInfoByJobeCode(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 根据教师编号获取安全验证方式
     * @method verifyTypeByTeacherId
     * @param {Object} payload 负载
     * @returns {Object} 获取到的安全验证方式
     */
    verifyTypeByTeacherId: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.verifyTypeByTeacherId(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    },
    /**
     * 根据教师编号获取当前教师安全问题
     * @method verifyTypeByTeacherId
     * @param {Object} payload 负载
     * @returns {Object} 获取到的安全问题
     */
    findSecurityQuestionByTeacherId: ({ commit }, payload) => {
      return getPromiseActionNoMutations(api.findSecurityQuestionByTeacherId(payload)).then((res, err) => {
        if (err) {
          console.log(err)
          return
        }
        return res
      })
    }
  },
  /**
   * 根据教师编号进行密码校验
   * @method verifyPasswordByTeacherId
   * @param {Object} payload 负载
   * @returns {Object} 是否校验成功状态
   */
  verifyPasswordByTeacherId: ({ commit }, payload) => {
    return getPromiseActionNoMutations(api.verifyPasswordByTeacherId(payload)).then((res, err) => {
      if (err) {
        console.log(err)
        return
      }
      return res
    })
  },
  /**
   * 根据教师编号进行邮箱校验
   * @method verifyEmailByTeacherId
   * @param {Object} payload 负载
   * @returns {Object} 是否校验成功状态
   */
  verifyEmailByTeacherId: ({ commit }, payload) => {
    return getPromiseActionNoMutations(api.verifyEmailByTeacherId(payload)).then((res, err) => {
      if (err) {
        console.log(err)
        return
      }
      return res
    })
  },
  /**
   * 根据教师编号进行密保问题校验
   * @method verifyQuestionByTeacherId
   * @param {Object} payload 负载
   * @returns {Object} 是否校验成功状态
   */
  verifyQuestionByTeacherId: ({ commit }, payload) => {
    return getPromiseActionNoMutations(api.verifyQuestionByTeacherId(payload)).then((res, err) => {
      if (err) {
        console.log(err)
        return
      }
      return res
    })
  },
  /**
   * 根据教师编号进行身份证号码校验
   * @method verifyIdcardByTeacherId
   * @param {Object} payload 负载
   * @returns {Object} 是否校验成功状态
   */
  verifyIdcardByTeacherId: ({ commit }, payload) => {
    return getPromiseActionNoMutations(api.verifyIdcardByTeacherId(payload)).then((res, err) => {
      if (err) {
        console.log(err)
        return
      }
      return res
    })
  },
  modules: {
    themeSetting
  }
})
