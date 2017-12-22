<template>
  <div class="app-container">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="个人信息" name="1">
        <el-row :gutter="20">
          <el-col :span="4" align = "right">昵称:</el-col>
          <el-col :span="8"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">姓名：</el-col>
          <el-col :span="8"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">性别：</el-col>
          <el-col :span="8"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">联系电话：</el-col>
          <el-col :span="8"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">身份证号：</el-col>
          <el-col :span="8"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">QQ:</el-col>
          <el-col :span="8"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">一句话简介</el-col>
          <el-col :span="20"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="公司信息" name="2">
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
          <el-col :span="8"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">职位：</el-col>
          <el-col :span="8"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="认证信息" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
    </el-collapse>
    <el-col :span="24" class = "total_info"><sapn>统计信息:</sapn></el-col>
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
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

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
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
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

</style>
