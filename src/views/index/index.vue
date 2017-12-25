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
          <el-form-item label="注册时间">
            <el-input v-model="form.createTime"></el-input>
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
              <el-option label="未冻结" value="未冻结"></el-option>
              <el-option label="已冻结" value="已冻结"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span = "8">
          <el-form-item label="用户类型">
            <el-select v-model="form.userType" placeholder="全部用户">
              <el-option label="类型一" value="类型一"></el-option>
              <el-option label="类型二" value="类型二"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button type="primary" @click="fetchData">查询数据</el-button>
    <el-button type="primary" @click="onSubmit">导出数据</el-button>
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
          prop="createTime"
          label="注册时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="冻结状态"
          width="180">
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
            <el-button @click="entryDetail" type="text" size="small">详情</el-button>
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
          createTime: '',
          company: '',
          status: '',
          userType: ''
        },
        list: null,
        listLoading: true,
        input: '',
        options: [{
          value: '选项1',
          label: '未解冻'
        }, {
          value: '选项2',
          label: '已解冻'
        }],
        value: ''
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
      // this.fetchData()
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      handleClick(row) {
        console.log(row.qq)
      },
      entryDetail() {
        // console.log(this.form)
        this.$router.push({ path: '/example/table' })
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
              // console.log('hi')
              // this.$router.push({ path: '/' })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      fetchData() {
        this.listLoading = true
        var params = {
          'companyId': '2',
          'companyName': this.form.company,
          'creator': '',
          'department': '',
          'endDate': '',
          'endTime': '',
          'id': '',
          'idcard': '',
          'introduction': '',
          'isCompanyPublic': true,
          'mobile': this.form.mobile,
          'modifier': '',
          'modifyTime': '',
          'nickname': '',
          'order': '',
          'pageNum': 1,
          'pageSize': 10,
          'password': '',
          'position': '',
          'qq': '',
          'realname': this.form.username,
          'searchWord': '',
          'sex': '',
          'sort': '',
          'startDate': '',
          'startTime': '2017-12-25',
          'status': this.form.status
        }

        // params = (params)
        getList(params).then(response => {
          this.list = response.data.content
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
