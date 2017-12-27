<template>

  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="60" >
        <el-col :span = "8">
          <el-form-item label="手机号码">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span = "8">
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span = "8">
          <el-form-item label="注册时间"  >
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="60" >
        <el-col :span = "8">
          <el-form-item label="所属公司">
            <el-input v-model="form.company"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span = "8">
          <el-form-item label="冻结状态">
            <el-select v-model="form.status" placeholder="无限制">
              <el-option label="未冻结" value="1"></el-option>
              <el-option label="已冻结" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-col>
    <el-button type="primary" @click="fetchData">查询数据</el-button>
    <el-button type="primary" @click="onSubmit">导出数据</el-button>
    <el-button type="primary" @click="addFriend" class = "right">新建朋友</el-button>
    </el-col>
    <template>
      <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
          prop="mobile"
          label="手机号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="realname"
          label="用户姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="所属公司">
        </el-table-column>
        <el-table-column
          label="注册时间"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | date}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="冻结状态"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.status | state}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="publishCount"
          label="发布数">
        </el-table-column>
        <el-table-column
          prop="commentCount"
          label="评论数"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          width="220">
          <template slot-scope="scope">

            <el-button type="text" size="small"><router-link :to=" {path :'/friends/detail/'+scope.row.id}">详情</router-link></el-button>
            <!--<el-button @click="entryDetail" type="text" size="small">详情</el-button>-->
            <el-button @click="handleClick(scope.row)" type="text" size="small">冻结</el-button>
            <el-button type="text" size="small">密码重置</el-button>
            <el-button type="text" size="small">站内信</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--<el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>-->
      <!--<el-table-column align="center" label='手机号' width="95" props = "mobile">-->
        <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
          <!--&lt;!&ndash;{{scope.$index}}&ndash;&gt;-->
        <!--&lt;!&ndash;</template>&ndash;&gt;-->
      <!--</el-table-column>-->
      <!--<el-table-column label="用户姓名">-->
        <!--<template slot-scope="scope">-->
          <!--{{scope.row.title}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="所属公司" width="110" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.author}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="注册时间" width="110" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--{{scope.qq}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column class-name="status-col" label="冻结状态" width="110" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" prop="created_at" label="发布数" width="200">-->
        <!--<template slot-scope="scope">-->
          <!--<i class="el-icon-time"></i>-->
          <!--<span>{{scope.row.display_time}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" prop="created_at" label="评论数" width="200">-->
        <!--<template slot-scope="scope">-->
          <!--<i class="el-icon-time"></i>-->
          <!--<span>{{scope.row.display_time}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" prop="created_at" label="曹祖片" width="200">-->
        <!--<template slot-scope="scope">-->
          <!--<i class="el-icon-time"></i>-->
          <!--<span>{{scope.row.display_time}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->
  </div>
</template>

<script>
  import { getList } from '@/api/table'

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
        value8: '',
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
      // this.fetchData()
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      handleClick(row) {
        console.log(row.qq)
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
        // var time = {
        //    startTime : start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate(),
        //    endTime : end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
        // }
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
          console.log(this.list)
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
  .right{
    float: right;
  }
</style>
<!--<style>-->
  <!--.el-row {-->
    <!--margin-bottom: 20px;-->
  <!--&:last-child {-->
     <!--margin-bottom: 0;-->
   <!--}-->
  <!--}-->
  <!--.el-col {-->
    <!--border-radius: 4px;-->
  <!--}-->
  <!--.bg-purple-dark {-->
    <!--background: #99a9bf;-->
  <!--}-->
  <!--.bg-purple {-->
    <!--background: #d3dce6;-->
  <!--}-->
  <!--.bg-purple-light {-->
    <!--background: #e5e9f2;-->
  <!--}-->
  <!--.grid-content {-->
    <!--border-radius: 4px;-->
    <!--min-height: 36px;-->
  <!--}-->
  <!--.row-bg {-->
    <!--padding: 10px 0;-->
    <!--background-color: #f9fafc;-->
  <!--}-->
<!--</style>-->
