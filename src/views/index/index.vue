<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <div class = "input_info">
      <el-row :gutter="80" >
        <el-col :span="8" >
          <el-row :gutter="10" >
            <el-col :span="6"><label>手机号码</label></el-col>
            <el-col :span="18"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
          </el-row>
        </el-col>
        <el-col :span="8" >
          <el-row :gutter="10" >
            <el-col :span="6"><label>用户名</label></el-col>
            <el-col :span="18"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
          </el-row>
        </el-col>
        <el-col :span="8" >
          <el-row :gutter="10" >
            <el-col :span="6"><label>注册时间</label></el-col>
            <el-col :span="18"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="80" >
        <el-col :span="8" >
          <el-row :gutter="10" >
            <el-col :span="6"><label>所属公司</label></el-col>
            <el-col :span="18"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
          </el-row>
        </el-col>
        <el-col :span="8" >
          <el-row :gutter="10" >
            <el-col :span="6"><label>冻结状态</label></el-col>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-row>
        </el-col>
        <el-col :span="8" >
          <el-row :gutter="10" >
            <el-col :span="6"><label>用户类型</label></el-col>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-row>
        </el-col>
      </el-row>
      <p class = "btn">
        <el-button type="primary">查询</el-button>
        <el-button type="primary">导出数据</el-button>
      </p>

    </div>
    <div class = "tabel_info">
      <p class="title">

          <el-col :span="12"><span>查询数据:</span></el-col>
          <el-col :span="12" align="right"><el-button type="primary"><span></span></el-button></el-col>


      </p>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='手机号' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="用户姓名">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="所属公司" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="冻结状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="发布数" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="评论数" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="曹祖片" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
  // import { getList } from '@/api/table'

  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        input: '',
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
      // fetchData() {
      //   this.listLoading = true
      //   // let params = {}
      //   getList(params).then(response => {
      //     // this.list = response.data.items
      //     console.log(response)
      //     this.listLoading = false
      //   })
      // }
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
