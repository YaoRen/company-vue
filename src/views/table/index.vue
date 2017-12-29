<template>
  <div class="app-container">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="个人信息" name="1" >
        <p>
          <el-button  @click="editState($event)" v-show='isShow' size="mini" icon="el-icon-edit"></el-button>
          <el-button  @click="editFriend" v-show='!isShow' size="mini">完成</el-button>
          <el-button  @click="cancelEdit" v-show='!isShow' size="mini" >取消编辑</el-button>
        </p>
        <el-form :label-position="right" label-width="96px">
          <el-form-item label="昵称：" >
            <el-input v-model="info.nickname" :disabled="disabled" ></el-input>
          </el-form-item>
          <el-form-item label="姓名：" >
            <el-input v-model="info.realname" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="性别：" >
            <el-select v-model="info.sex" :disabled="disabled">
              <el-option :label = "boy" value = "男"></el-option>
              <el-option :label = "girl" value = "女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话：" >
            <el-input v-model="info.mobile" :disabled="disabled" ></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input v-model="info.idcard" :disabled="disabled" ></el-input>
          </el-form-item>
          <el-form-item label="QQ：" >
            <el-input v-model="info.qq" :disabled="disabled" ></el-input>
          </el-form-item>
          <el-form-item label="一句话简介：">
            <el-input v-model="info.introduction" :disabled="disabled" ></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="公司信息" name="2">
        <p>
          <el-button  @click="editState($event)" v-show='isShow' size="mini" icon="el-icon-edit"></el-button>
          <el-button  @click="editFriend" v-show='!isShow' size="mini">完成</el-button>
          <el-button  @click="cancelEdit" v-show='!isShow' size="mini">取消编辑</el-button>
        </p>
        <el-form :label-position="right" label-width="100px">
          <el-form-item label="公司名称：" :disabled="disabled">
            <el-select v-model="value" placeholder="请选择公司名称">
              <el-option
                v-for="item in companyList"
                :key="item.id"
                :label="item.companyName"
                :value="item.companyName">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="tip">找不到公司？尝试 <span class="tips" @click = "reFresh"> 刷新本页</span> 或者 <span class="tips" @click = "createCompany">新建一个公司</span></div>
          <el-form-item label="部门：">
            <el-input v-model="info.department" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="职位：">
            <el-input v-model="info.position" :disabled="disabled"></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="认证信息" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
    </el-collapse>
    <el-col :span="24" class = "total_info"><span>统计信息:</span></el-col>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='手机号' width="95">
        <template slot-scope="scope">
          {{scope.row.mobile}}
        </template>
      </el-table-column>
      <el-table-column label="用户姓名">
        <template slot-scope="scope">
          {{scope.row.realname}}
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="最近登录时间" width="110" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.lastLoginTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="发布数" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.publishCount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="评论数" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.commentCount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="分享数" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.shareCount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="冻结状态" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { detailFriend, editFriend, companyList } from '@/api/friends'

export default {
  data() {
    return {
      id: this.$route.params.id,
      list: [],
      listLoading: true,
      info: 'hi',
      input: '',
      value: '',
      activeNames: ['1'],
      disabled: true,
      isShow: true,
      isShoww: true,
      companyList: [],
      right: 'right',
      boy: '男',
      girl: '女'
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
    this.getCompany()
  },
  methods: {
    editState(event) {
      this.isShow = !this.isShow
      if (!this.isShow) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    editFriend() {
      console.log('addFriend')

      var params = {
        'companyId': '2',
        'companyName': '',
        'creator': '',
        'department': '',
        'endDate': '',
        'endTime': '',
        'id': this.id,
        'idcard': this.info.idcard,
        'introduction': this.info.introduction,
        'isCompanyPublic': true,
        'mobile': this.info.mobile,
        'modifier': '',
        'modifyTime': '',
        'nickname': this.info.nickname,
        'order': '',
        'pageNum': 1,
        'pageSize': 10,
        'password': '',
        'position': '',
        'qq': this.info.qq,
        'realname': this.info.realname,
        'searchWord': '',
        'sex': this.info.sex,
        'sort': '',
        'startDate': '',
        'startTime': '2017-12-25',
        'status': ''
      }
      editFriend(params).then(response => {
        // 后面需要改一下
        console.log(response.data)
        this.info = response.data || this.info
      })
      this.hide()
    },
    cancelEdit() {
      console.log('cancel')
      this.hide()
    },
    hide() {
      this.isShow = !this.isShow
      if (this.isShow) {
        this.disabled = true
      } else {
        this.disabled = false
      }
    },
    handleChange() {
      console.log('handleChange')
    },
    fetchData() {
      this.listLoading = true
      // const id = this.$route.params.id
      detailFriend(this.id).then(response => {
        this.info = response.data
        this.list.push(this.info)
        this.listLoading = false
      })
    },
    getCompany() {
      companyList({ 'businessStatus': '1', status: '2' }).then(response => {
        this.companyList = response.data.content
        this.companyList.unshift({ companyName: '未知' })
      })
    },
    createCompany() {
      this.value = '未知'
    },
    reFresh() {
      window.location.reload()
    }
  }
}

</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .total_info{
    height: 60px;
    line-height: 60px;
  }
  .hide{
    display: none;
  }
  .el-form-item{
    width: 280px;
  }
  .tip{
    position: relative;
    top: -10px;
    left: 30px;
  }
  .tips{
    color: blue;
    cursor: pointer;
  }

</style>
