<template>
  <div class="app-container">

    <el-collapse v-model="activeNames">
      <!--<el-collapse v-model="activeNames" @change="handleChange">-->
      <el-collapse-item title="个人信息" name="1" >
          <button  @click="editState($event)" v-show='isShow'>编辑</button>
          <button  @click="editFriend" v-show='!isShow'>完成</button>
          <button  @click="cancelEdit" v-show='!isShow'>取消编辑</button>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">昵称:</el-col>
          <el-col :span="8"><el-input v-model="info.nickname" :disabled="disabled" ></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">姓名：</el-col>
          <el-col :span="8"><el-input v-model="info.realname" :disabled="disabled" >{{info}}</el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">性别：</el-col>
          <el-col :span="8"><el-input v-model="info.sex" :disabled="disabled" ></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">联系电话：</el-col>
          <el-col :span="8"><el-input v-model="info.mobile" :disabled="disabled"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">身份证号：</el-col>
          <el-col :span="8"><el-input v-model="info.idcard" :disabled="disabled"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">QQ:</el-col>
          <el-col :span="8"><el-input v-model="info.qq" :disabled="disabled"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">一句话简介</el-col>
          <el-col :span="20"><el-input v-model="info.introduction" :disabled="disabled"></el-input></el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="公司信息" name="2">
        <button  @click="editState($event)" v-show='isShow'>编辑</button>
        <button  @click="editFriend" v-show='!isShow'>完成</button>
        <button  @click="cancelEdit" v-show='!isShow'>取消编辑</button>

        <el-row :gutter="20">
          <el-col :span="4" align = "right">公司名称:</el-col>
          <el-col :span="8">
            <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">部门：</el-col>
          <el-col :span="8"><el-input v-model="info.department" :disabled="disabled"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">职位：</el-col>
          <el-col :span="8"><el-input v-model="info.position" :disabled="disabled"></el-input></el-col>
        </el-row>
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
import { detailFriend, editFriend } from '@/api/table'

export default {
  data() {
    return {
      id: this.$route.params.id,
      list: [],
      listLoading: true,
      info: 'hi',
      input: '',
      value: '',
      activeNames: '',
      disabled: true,
      isShow: true,
      isShoww: true,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
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

</style>
