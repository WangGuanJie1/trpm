const ProjectMember = require('../models/ProjectMember')
const createHttpError = require('http-errors')
const { stateFormat } = require('./dataFormat')
const {
  NOT_FOUND_PROJECT_MEMBER_INFO,
  NOT_FOUND_PROJECT_MEMBER_INFO_BY_JOBCODE,
  CREATE_PROJECT_MEMBER_ERROR,
  PERMISSION_APPLY_PROJECT,
  WITHOUT_PERMISSION_APPLY_PROJECT,
  PERMISSION_APPLY_PROJECT_AS_LEADER,
  PERMISSION_APPLY_PROJECT_AS_PARTICIPENT,
  PROJECT_MEMBER_IS_REPEAT,
  NOT_FOUND_TEACHER_PROJECT_INFO_BY_JOBCODE,
} = require('../config/statusCode')
const { isValidObjectId, Types } = require('mongoose')
const Project = require('../models/Project')

module.exports = {
  /**
   * 获取所有项目成员信息
   * @method projectMemberFindAll
   */
  projectMemberFindAll: async (req, res, next) => {
    ProjectMember.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.allProjectMemberInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_PROJECT_MEMBER_INFO.code,
            NOT_FOUND_PROJECT_MEMBER_INFO.message
          )
        )
      }
    })
  },
  /**
   * 根据教师工号找到项目基本信息、成员信息、教学工作简历、教研工作简历数据,并统计参与和主持的项目数量及总数量
   *
   * @method teacherProjectInfoFindByJobcode
   */
  teacherProjectInfoFindByJobcode: async (req, res, next) => {
    const { jobCode } =
      JSON.stringify(req.query) !== '{}' ? req.query : req.body
    ProjectMember.aggregate(
      [
        {
          $lookup: {
            from: 'project', // 当前参与的项目基本信息
            localField: '_projectId',
            foreignField: '_id',
            as: 'project',
          },
        },
        {
          $lookup: {
            from: 'project_member', // 项目的成员名单
            localField: '_projectId',
            foreignField: '_projectId',
            as: 'member',
          },
        },
        {
          $lookup: {
            from: 'teacher_research_resume', // 该项目中教师教研简历
            localField: '_projectId',
            foreignField: '_projectId',
            as: 'teacher_research_resume',
          },
        },
        {
          $lookup: {
            from: 'teacher_resume', // 该项目中教师教学简历
            localField: '_projectId',
            foreignField: '_projectId',
            as: 'teacher_resume',
          },
        },
        {
          $match: {
            jobCode: jobCode,
          },
        },
      ],
      (err, doc) => {
        if (err) {
          console.log(err)
          next(createHttpError(404))
        }
        if (doc.length !== 0) {
          let leaderCount = 0
          let participantCount = 0
          // 数据过滤，仅需要当前教师的项目、项目的成员、项目的教研简历、项目的教学简历数据
          const teacherProjectList = doc.map((item) => {
            item.memberRank === 1 ? ++leaderCount : ++participantCount
            const project = item.project[0]
            const member = item.member
            const teacherResearchResume = item.teacher_research_resume
            const teacherResume = item.teacher_resume
            return { project, member, teacherResearchResume, teacherResume }
          })
          req.teacherProjectInfo = {
            teacherProjectList,
            totalCount: leaderCount + participantCount,
            leaderCount,
            participantCount,
          }
          next()
        } else {
          res.json(
            stateFormat(
              NOT_FOUND_TEACHER_PROJECT_INFO_BY_JOBCODE.code,
              NOT_FOUND_TEACHER_PROJECT_INFO_BY_JOBCODE.message
            )
          )
        }
      }
    )
  },
  /**
   * 根据教师工号查询主持和参与的项目
   * @method projectMemberFindByJobCode
   */
  projectMemberFindByJobCode: async (req, res, next) => {
    const { jobCode } =
      JSON.stringify(req.query) !== '{}' ? req.query : req.body
    ProjectMember.find({ jobCode: jobCode }, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        let leaderCount = 0
        let participantCount = 0
        doc.map((item) => {
          item.memberRank === 1 ? ++leaderCount : ++participantCount
        })
        req.teacherProjectInfo = {
          jobCode,
          project: doc,
          leaderCount,
          participantCount,
        }
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_PROJECT_MEMBER_INFO_BY_JOBCODE.code,
            NOT_FOUND_PROJECT_MEMBER_INFO_BY_JOBCODE.message
          )
        )
      }
    })
  },
  /**
   * 验证项目申请资格（仅验证项目数量限制条件，不验证申报时间段，时间段验证由前端验证）
   * TODO: 目前仅针对本校教师做出了验证限制，未考虑外校老师
   * @method verifyApplyQualification
   */
  verifyApplyQualification: async (req, res, next) => {
    const { hoMaNuOfHoPr, hoMaNuOfPaPr, paMaNuOfHoPr, paMaNuOfPaPr, jobCode } =
      JSON.stringify(req.query) !== '{}' ? req.query : req.body
    ProjectMember.find({ jobCode }, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      console.log(doc.length)
      if (doc.length !== 0) {
        let leaderCount = 0
        let participantCount = 0
        let leaderApply = false // 是否允许以主持人身份申请项目（默认false 不允许）
        let participentApply = false // 是否允许以参与者身份申请项目（默认false 不允许）
        doc.map((item) => {
          item.memberRank === 1 ? ++leaderCount : ++participantCount
        })
        console.log('主持的，参与的：', leaderCount, participantCount)
        leaderApply =
          leaderCount >= hoMaNuOfHoPr || participantCount >= hoMaNuOfPaPr
            ? false
            : true
        participentApply =
          leaderCount >= paMaNuOfHoPr || participantCount >= paMaNuOfPaPr
            ? false
            : true
        req.veApQu = { leaderApply, participentApply }
        if (leaderApply && participentApply) {
          req.veApQu.status = PERMISSION_APPLY_PROJECT
        } else if (!leaderApply && !participentApply) {
          req.veApQu.status = WITHOUT_PERMISSION_APPLY_PROJECT
        } else if (leaderApply && !participentApply) {
          req.veApQu.status = PERMISSION_APPLY_PROJECT_AS_LEADER
        } else if (!leaderApply && participentApply) {
          req.veApQu.status = PERMISSION_APPLY_PROJECT_AS_PARTICIPENT
        }
        next()
      } else {
        req.veApQu = { status: NOT_FOUND_PROJECT_MEMBER_INFO_BY_JOBCODE }
        next()
      }
    })
  },
  /**
   * 根据项目编号获取项目成员信息
   * @method projectMemberFindByProjectId
   */
  projectMemberFindByProjectId: async (req, res, next) => {
    let data = JSON.stringify(req.query) !== '{}' ? req.query : req.body
    let _projectId = data.length ? data[0]._projectId : data._projectId
    _projectId = isValidObjectId(_projectId)
      ? _projectId
      : Types.ObjectId(_projectId)
    ProjectMember.find({ _projectId: _projectId }, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.projectMemberInfo = doc
        next()
      } else {
        // 由于该方法可能要与成员查重方法配合，所以这里不设置res，由路由层判断
        next()
      }
    })
  },
  /**
   * 相同项目成员查重，请配合projectMemberFindByProjectId使用，且需要查找的成员（Object/Array）
   * @method sameProjectVerifyRepeat
   */
  sameProjectVerifyRepeat: async (req, res, next) => {
    if ('projectMemberInfo' in req) {
      let data = JSON.stringify(req.query) !== '{}' ? req.query : req.body
      const projectMemberInfo = req.projectMemberInfo
      let isRepeat = false
      if (!data.length) {
        isRepeat = projectMemberInfo.some(
          (item) => item.jobCode === data.jobCode
        )
      } else {
        isRepeat = projectMemberInfo.some((item) => {
          return data.some((member) => member.jobCode === item.jobCode)
        })
      }
      isRepeat
        ? res.json(
            stateFormat(
              PROJECT_MEMBER_IS_REPEAT.code,
              PROJECT_MEMBER_IS_REPEAT.message
            )
          )
        : next()
    } else {
      next()
    }
  },
  /**
   * 创建项目成员
   * @method createProjectMember
   */
  createProjectMember: async (req, res, next) => {
    const payload = JSON.stringify(req.query) !== '{}' ? req.query : req.body
    // 验证payload中是否存在_projectId，如果的没有话即为初始化项目，需要从req.peojectInfo中调用
    payload._projectId = payload._projectId
      ? payload._projectId
      : req.projectInfo._id
    ProjectMember.create(payload, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.projectMemberInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            CREATE_PROJECT_MEMBER_ERROR.code,
            CREATE_PROJECT_MEMBER_ERROR.message
          )
        )
      }
    })
  },
}
