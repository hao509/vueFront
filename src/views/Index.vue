<template>
    <div class="app" id="app">
      <div class="app-wrapper openSidebar clearfix">
        <!-- sidebar -->
        <div class="sidebar-container">
          <div class="logo">
            <!-- <img src="images/logo.png" width="122.5" alt="" /> -->
            <img src="../styles/images/login/login-logo.png" alt="" style="width: 117px; height: 32px" />
          </div>

          <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
              router
              :default-active="defAct"
              :unique-opened="false"
              :collapse-transition="false"
              background-color="#343744"
              text-color="#bfcbd9"
              active-text-color="#f4f4f5"
            >
              <div v-for="item in menuList" :key="item.id">
                <el-submenu :index="item.url + ''" v-if="item.children && item.children.length>0">
                  <template slot="title">
                    <i class="iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </template>
                  <el-menu-item
                    v-for="sub in item.children"
                    :index="sub.url+''"
                    :key="sub.id"
                    @click="menuHandle(sub,false)"
                    >
                    <i class="iconfont" :class="sub.icon"></i>
                    <span slot="title">{{sub.name}}</span>
                    </el-menu-item
                  >
                </el-submenu>
                <el-menu-item v-else :index="item.url" @click="menuHandle(item,false)">
                  <i class="iconfont" :class="item.icon"></i>
                  <span slot="title">{{item.name}}</span>
                </el-menu-item>
              </div>
            </el-menu>
          </el-scrollbar>
        </div>
        <div class="main-container">
          <!-- <navbar /> -->
          <div class="navbar">
            <div class="head-lable">
              <span v-if="goBackFlag" class="goBack" @click="goBack()"
                ><img src="../styles/images/icons/btn_back@2x.png" alt="" /> 返回</span
              >
              <span>{{headTitle}}</span>
            </div>
            <div class="right-menu">
              <div class="avatar-wrapper">{{ userInfo.data.username }}</div>
              <!-- <div class="logout" @click="logout">退出</div> -->
              <img src="../styles/images/icons/btn_close@2x.png" class="outLogin" alt="退出" @click="logout" />
            </div>
          </div>
          <div class="app-main" v-loading="loading">
            <div class="divTmp" v-show="loading"></div>
            <router-view></router-view>
            <!-- <iframe
              id="cIframe"
              class="c_iframe"
              name="cIframe"
              :src="iframeUrl"
              width="100%"
              height="auto"
              frameborder="0"
              v-show="!loading"
            ></iframe> -->
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { logoutApi } from '../utils/api/login'
export default {
  name: 'Index',
  data () {
    return {
      defAct: this.$route.path,
      menuActived: '2',
      userInfo: {},
      menuList: [
        // {
        //   id: '1',
        //   name: '门店管理',
        //   children: [
        {
          id: '2',
          name: '员工管理',
          url: '/memberlist',
          icon: 'icon-member'
        },
        {
          id: '3',
          name: '分类管理',
          url: '/categorylist',
          icon: 'icon-category'
        },
        {
          id: '4',
          name: '菜品管理',
          url: '/foodlist',
          icon: 'icon-food'
        },
        {
          id: '5',
          name: '套餐管理',
          url: '/combolist',
          icon: 'icon-combo'
        },
        {
          id: '6',
          name: '订单明细',
          url: '/orderlist',
          icon: 'icon-order'
        },
        {
          id: '7',
          name: '评价展示',
          url: '/backmsg',
          icon: 'icon-combo'

        }
        //   ],
        // },
      ],
      // iframeUrl: 'page/member/list.html',
      headTitle: '员工管理',
      goBackFlag: false,
      loading: true,
      timer: null
    }
  },
  computed: {},
  created () {
    const userInfo = window.localStorage.getItem('userInfo')
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo)
    }
    this.closeLoading()
  },
  beforeDestroy () {
    this.timer = null
    clearTimeout(this.timer)
  },
  mounted () {
    window.menuHandle = this.menuHandle
  },
  methods: {
    logout () {
      logoutApi().then((res) => {
        if (res.data.code === 1) {
          localStorage.removeItem('userInfo')
          // window.location.href = '/backend/page/login/login.html'
          this.$router.replace('/')
        }
      })
    },
    goBack () {
      // window.location.href = 'javascript:history.go(-1)'
      const menu = this.menuList.find(item => item.id === this.menuActived)
      // this.goBackFlag = false
      // this.headTitle = menu.name
      this.menuHandle(menu, false)
    },
    menuHandle (item, goBackFlag) {
      this.loading = true
      this.menuActived = item.id
      this.iframeUrl = item.url
      this.headTitle = item.name
      this.goBackFlag = goBackFlag
      this.closeLoading()
    },
    closeLoading () {
      this.timer = null
      this.timer = setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
@import url('../styles/common.css');
@import url('../styles/index.css');
@import url('../styles/icon/iconfont.css');
.body{
  min-width: 1366px;
}
.app-main{
  height: calc(100% - 64px);
}
.app-main .divTmp{
  width: 100%;
  height: 100%;
}
</style>
