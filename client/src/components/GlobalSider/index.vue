<template>
  <div>
    <logo :showTitle="collapsed"></logo>
    <a-menu
      :default-selected-keys="['5']"
      :default-open-keys="['sub1']"
      mode="inline"
      :theme="navTheme"
      class="global-sider-menu-wrapper"
      :inline-collapsed="collapsed"
    >
      <!-- <a-menu-item key="6">
        <router-link to="/createProjectBatch">首页</router-link>
      </a-menu-item> -->
      <a-sub-menu key="sub1">
        <template v-slot:title>
          <menu-fold-outlined />
          <span>项目活动管理</span>
        </template>
        <a-menu-item key="6">
          <router-link to="/createProjectBatch">创建项目批次</router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <router-link to="/projectSelectionApplication">项目申报录入</router-link>
        </a-menu-item>
        <a-menu-item key="7">项目中期检查录入 </a-menu-item>
        <a-menu-item key="8"> 项目结题录入 </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub2">
        <template v-slot:title>
          <menu-fold-outlined />
          <span>项目信息管理</span>
        </template>
        <a-menu-item key="11">
          <router-link to="/viewSchoolProject">查看学校所有项目</router-link>
        </a-menu-item>
        <a-menu-item key="12">
          <router-link to="/viewDepartmentProject">查看本部门项目</router-link>
        </a-menu-item>
        <a-menu-item key="13">
          <router-link to="/viewOwnProject">查看个人项目</router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub3">
        <template v-slot:title>
          <menu-fold-outlined />
          <span>项目评审管理</span>
        </template>
        <a-menu-item key="11">
          <router-link to="/viewSchoolProject">设置学校评审专家库</router-link>
        </a-menu-item>
        <a-menu-item key="12">
          <router-link to="/viewDepartmentProject">设置本部门评审专家库</router-link>
        </a-menu-item>
        <a-menu-item key="12">
          <router-link to="/viewDepartmentProject">校内项目活动评审管理</router-link>
        </a-menu-item>
        <a-menu-item key="12">
          <router-link to="/viewDepartmentProject">本部门项目活动评审管理</router-link>
        </a-menu-item>
        <a-menu-item key="12">
          <router-link to="/viewDepartmentProject">评审校内项目</router-link>
        </a-menu-item>
        <a-menu-item key="12">
          <router-link to="/viewDepartmentProject">评审本部门项目</router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub4">
        <template v-slot:title>
          <menu-fold-outlined />
          <span>项目审批管理</span>
        </template>
        <a-menu-item key="11">
          <router-link to="/viewSchoolProject">审批校内项目</router-link>
        </a-menu-item>
        <a-menu-item key="12">
          <router-link to="/viewDepartmentProject">审批本部门项目</router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub5">
        <template v-slot:title>
          <menu-fold-outlined />
          <span>公告信息管理</span>
        </template>
        <a-menu-item key="11">
          <router-link to="/viewSchoolProject">发布校内公告</router-link>
        </a-menu-item>
        <a-menu-item key="12">
          <router-link to="/viewDepartmentProject">发布部门公告</router-link>
        </a-menu-item>
        <a-menu-item key="13">
          <router-link to="/viewOwnProject">公告信息管理</router-link>
        </a-menu-item>
        <a-menu-item key="13">
          <router-link to="/viewOwnProject">查看校内公告信息</router-link>
        </a-menu-item>
        <a-menu-item key="13">
          <router-link to="/viewOwnProject">查看部门公告信息</router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub6">
        <template v-slot:title>
          <menu-fold-outlined />
          <span>教师信息管理</span>
        </template>
        <a-menu-item key="12">
          <router-link to="/viewDepartmentProject">查看本部门教师信息</router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub7">
        <template v-slot:title>
          <menu-fold-outlined />
          <span>基础信息管理</span>
        </template>
        <a-menu-item key="12">
          <router-link to="/viewDepartmentProject">下设部门基础信息管理</router-link>
        </a-menu-item>
        <a-menu-item key="12">
          <router-link to="/viewDepartmentProject">本部门基础信息管理</router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub8">
        <template v-slot:title>
          <menu-fold-outlined />
          <span>账号管理</span>
        </template>
        <a-menu-item key="12">
          <router-link to="/viewDepartmentProject">个人信息管理</router-link>
        </a-menu-item>
        <a-menu-item key="12">
          <router-link to="/viewDepartmentProject">账户安全管理</router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub9">
        <template v-slot:title>
          <menu-fold-outlined />
          <span>操作日志</span>
        </template>
        <a-menu-item key="11">
          <router-link to="/viewSchoolProject">待设置</router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub100">
        <template v-slot:title>
          <menu-fold-outlined />
          <span>Navigation Two</span>
        </template>
        <a-menu-item key="9"> Option 9 </a-menu-item>
        <a-menu-item key="10"> Option 10 </a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11"> Option 11 </a-menu-item>
          <a-menu-item key="12"> Option 12 </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { Menu } from 'ant-design-vue'
import Logo from './logo'
import { reactive } from 'vue'
import { MenuFoldOutlined } from '@ant-design/icons-vue'

export default {
  components: {
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ASubMenu: Menu.SubMenu,
    Logo,
    MenuFoldOutlined
  },
  props: ['collapsed', 'navTheme'],
  setup(props) {
    const state = reactive({})
    return {
      state
    }
  }
}
</script>

<style lang="less" scoped>
.global-sider-menu-wrapper {
  text-align: left;
}
</style>
