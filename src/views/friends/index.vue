<template>

  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" class = "cl">

      <el-form-item label="手机号码" class = "left width_280 mr_40">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="用户名" class = "left width_280 mr_40">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="注册时间" class = "left mr_40">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="所属公司" class = "left width_280 mr_40">
        <el-input v-model="form.company"></el-input>
      </el-form-item>

      <el-form-item label="冻结状态" class = "left width_280 mr_40">
        <el-select v-model="form.status" placeholder="无限制">
          <el-option label="未冻结" value="1"></el-option>
          <el-option label="已冻结" value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-col>
      <el-button type="primary" @click="fetchData" size = "small">查询数据</el-button>
      <el-button type="primary" @click="onSubmit" size = "small">导出数据</el-button>
      <el-button type="primary" @click="addFriend" class = "right" size = "small">新建朋友</el-button>
    </el-col>
    <template>
      <el-table :data="list" style="width: 100%" align="left">
        <el-table-column prop="mobile" label="手机号" width="160" >
        </el-table-column>
        <el-table-column prop="realname" label="用户姓名" >
        </el-table-column>
        <el-table-column prop="companyName" label="所属公司" >
        </el-table-column>
        <el-table-column label="注册时间" >
          <template slot-scope="scope">
            <span>{{scope.row.createTime | date}}</span>
          </template>
        </el-table-column>
        <el-table-column label="冻结状态" >
          <template slot-scope="scope">
            <span>{{scope.row.status | state}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="publishCount" label="发布数" align="center" width="140"></el-table-column>
        <el-table-column prop="commentCount" label="评论数"  align="center" width="140"></el-table-column>
        <el-table-column label="操作"  align="center" width="220">
          <template slot-scope="scope">
            <el-button type="text" size="small"><router-link :to=" {path :'/friends/detail/'+scope.row.id}">详情</router-link></el-button>
            <el-button @click="updateStatus(scope.row.id)" size="small" type="text" >{{scope.row.status | state}}</el-button>
            <el-button type="text" size="small" disabled>密码重置</el-button>
            <el-button type="text" size="small" disabled>站内信</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  import { getList, editFriend } from '@/api/friends'

  export default {
    data() {
      return {
        form: {
          mobile: '',
          username: '',
          company: '',
          status: '',
          userType: ''
        },
        time: {},
        list: null,
        input: '',
        options: [{
          value: '1',
          label: '未解冻'
        }, {
          value: '2',
          label: '已解冻'
        }],
        value: '',
        date: ''
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
      },
      date(input) {
        var d = new Date(input)
        var year = d.getFullYear()
        var month = d.getMonth() + 1
        var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
        return year + '-' + month + '-' + day
      },
      state(value) {
        if (value === 1) {
          return '未冻结'
        } else if (value === 2) {
          return '冻结'
        }
      }

    },
    created() {
      this.fetchData()
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      updateStatus(item_id) {
        console.log(item_id)
        let params = {
          status: this.form.status === 1 ? 2 : 1,
          id:item_id
        }
        editFriend(params).then(response => {
          // correct
          this.list = response.data || this.list
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 进入新建朋友界面
      addFriend() {
        this.$router.push({ path: '/friends/create' })
      },
      // 查询数据
      fetchData() {
        if (this.date.length !== 0) {
          var start = new Date(this.date[0])
          var end = new Date(this.date[1])
          this.time = {
            startTime : start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate(),
            endTime : end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
          }
        } else {
          this.time = {}
        }
        // 不能为空
        // if (Object.keys(this.form).every((key, index, arry) => {
        //   return this.form[key] === '' })) {
        //   console.log('无输入个人信息')
        //   return
        // }
        // if (this.form.mobile && !/^\d$/.test(this.form.mobile)) {
        //   console.log(this.form.mobile)
        //   console.log('请输入11位正确电话号码')
        //   return
        // }
        var params = Object.assign(this.form, this.time, { 'pageSize': 10 })
        getList(params).then(response => {
          this.list = response.data.content
        })
      }
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }
  .btn{
    padding: 38px 4px;
    border-top: 1px solid #ccc;
  }
  .title{
    padding-left: 10px;
    padding-bottom: 10px;
    height: 40px;
    line-height: 40px;
  }
  .el-date-editor--daterange.el-input__inner{
    width: 200px;
  }
  .el-date-editor .el-range-separator{
    padding: 0px;
    width: 14px;
  }
  .right{
    float: right;
  }
  .left{
    float: left;
  }
  .width_280{
    width: 280px;
  }
  .mr_40{
    margin-right: 40px;
  }
  .cl{
    overflow: hidden;
  }
  .el-date-range-picker{
    width: 258px;

  }
  .el-date-range-picker__content{
    float: none;
  }

</style>
