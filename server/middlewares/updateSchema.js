/**
 * 针对已经拥有数据的Schema进行重置更新，以便用于更新Schema中新增的Attr
 * GET参数schemaName直接复制数据库中集合数据库名称即可
 * 注意：需要在Schema中对新增的Attr设置default值，该API仅针对测试开发时期使用
 */

const mongoose = require("mongoose")
const createHttpError = require("http-errors")
const express = require("express")
const router = express.Router()

/**
 * 集合名称与模型文件名称匹配处理
 * @param {String} schemaName 数据库中的集合名称
 */
const nameDispose = (schemaName) => {
  const name = schemaName.split("_")
  let disName = ""
  name.forEach((element) => {
    disName +=
      element.slice(0, 1).toUpperCase() + element.slice(1).toLowerCase()
  })
  return disName
}

/**
 * Schema 名称转换
 */
const disposeName = async (req, res, next) => {
  try {
    req.Schema = require("../models/" + nameDispose(req.query.schemaName))
    next()
  } catch (err) {
    res.json("在Model目录中没有找到当前Schema文件，请检查当前名称")
  }
}

/**
 * 获取当前Schema中所有的数据
 */
const getAllData = async (req, res, next) => {
  const Schema = req.Schema
  try {
    Schema.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.data = doc
        next()
      } else {
        res.json("当前Schema中没有数据")
      }
    })
  } catch (err) {
    res.json("获取所有数据时发生错误")
  }
}

/**
 * 删除当前Schema中所有的数据
 */
const delAllData = async (req, res, next) => {
  const Schema = req.Schema
  try {
    Schema.deleteMany({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      next()
    })
  } catch (err) {
    res.json("删除所有数据时发生错误")
  }
}

/**
 * 删除集合
 */
const delCollection = async (req, res, next) => {
  try {
    mongoose.connection.db.dropCollection(req.query.schemaName, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      next()
    })
  } catch (err) {
    res.json("删除集合时发生错误")
  }
}

/**
 * 当前Schema恢复原有数据
 */
const recover = async (req, res, next) => {
  const Schema = req.Schema
  try {
    Schema.insertMany(req.data, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        res.json("Schema 更新成功")
      } else {
        res.json("Schema 中没有数据可以更新")
      }
    })
  } catch (err) {
    res.json("恢复所有数据时发生错误")
  }
}

router.get("/update/schema", disposeName, getAllData, delCollection, recover)

module.exports = router
