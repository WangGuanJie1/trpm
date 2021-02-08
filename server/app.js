const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
// const expressJWT = require('express-jwt')
// const keys = require('./config/keys')

// 路由
const tokenRouter = require("./routes/token")
const dictionaryRoleRouter = require("./routes/dictionaryRole")
const dictionaryDepartmentRouter = require("./routes/dictionaryDepartment")
const dictionaryResearchCategoryRouter = require("./routes/dictionaryResearchCategory")
const dicitonaryTermRouter = require("./routes/dictionaryTerm")
const dictionaryProjectBatchRouter = require("./routes/dictionaryProjectBatch")
const dictionarySecretQuestionRouter = require("./routes/dictionarySecretQuestion")
const logProjectStatusRouter = require("./routes/logProjectStatus")
const teacherRouter = require("./routes/teacher")
const securityRouter = require("./routes/security")
const projectRouter = require("./routes/project")
const projectMemberRouter = require("./routes/projectMember")
const projectReviewRecordRouter = require("./routes/projectReviewRecord")
const roleRouter = require("./routes/role")
const settingRouter = require("./routes/setting")
const specialistRouter = require("./routes/specialist")
const teachingResearchResumeRouter = require("./routes/teachingResearchResume")
const teachingResumeRouter = require("./routes/teachingResume")
const batchParticularsRouter = require("./routes/batchParticulars")

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// 更新 Schema 的API
app.use("/api", require("./middlewares/updateSchema"))

// 路由配置
app.use("/api/token", tokenRouter)
app.use("/api/dictionary-role", dictionaryRoleRouter)
app.use("/api/dictionary-department", dictionaryDepartmentRouter)
app.use("/api/dictionary-research-category", dictionaryResearchCategoryRouter)
app.use("/api/dictionary-term", dicitonaryTermRouter)
app.use("/api/dictionary-project-batch", dictionaryProjectBatchRouter)
app.use("/api/dictionary-secret-question", dictionarySecretQuestionRouter)
app.use("/api/log-project-status", logProjectStatusRouter)
app.use("/api/teacher", teacherRouter)
app.use("/api/security", securityRouter)
app.use("/api/project", projectRouter)
app.use("/api/project-member", projectMemberRouter)
app.use("/api/project-review-record", projectReviewRecordRouter)
app.use("/api/role", roleRouter)
app.use("/api/setting", settingRouter)
app.use("/api/specialist", specialistRouter)
app.use("/api/teaching-research-resume", teachingResearchResumeRouter)
app.use("/api/teaching-resume", teachingResumeRouter)
app.use("/api/batch-particulars", batchParticularsRouter)

// Token解析（注意：请求头authorization固定格式 'Bearer ' + token）
// app.use(
//   expressJWT({
//     secret: keys.secret,
//     algorithms: ['HS256'],
//   }).unless({
//     path: ['/api/teacher/login', '/api/find/by-teacherid'],
//   })
// )

// app.use(function (err, req, res, next) {
//   // console.log(req.headers)
//   console.log(err)
//   if (err.name === 'UnauthorizedError') {
//     console.log('无效的token')
//   }
// })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
