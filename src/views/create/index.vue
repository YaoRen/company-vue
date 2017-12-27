<template>
  <div class="app-container">

    <el-collapse v-model="activeNames">
      <!--<el-collapse v-model="activeNames" @change="handleChange">-->
      <el-collapse-item title="个人信息" name="1" >
        <el-row :gutter="20">
          <el-col :span="4" align = "right">昵称:</el-col>
          <el-col :span="8"><el-input v-model="info.nickname"  ></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">姓名：</el-col>
          <el-col :span="8"><el-input v-model="info.realname" ></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">性别：</el-col>
          <el-col :span="8">
            <el-select v-model="info.sex" placeholder="请选择">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">联系电话：</el-col>
          <el-col :span="8"><el-input v-model="info.mobile" ></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">身份证号：</el-col>
          <el-col :span="8"><el-input v-model="info.idcard" ></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">QQ:</el-col>
          <el-col :span="8"><el-input v-model="info.qq" ></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">一句话简介</el-col>
          <el-col :span="20"><el-input v-model="info.introduction"></el-input></el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="公司信息" name="2">
        <el-row :gutter="20">
          <el-col :span="4" align = "right">公司名称:</el-col>
          <el-col :span="8">
            <el-select v-model="info.companyId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">部门：</el-col>
          <el-col :span="8"><el-input v-model="info.department"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align = "right">职位：</el-col>
          <el-col :span="8"><el-input v-model="info.position"></el-input></el-col>
        </el-row>
      </el-collapse-item>
      <el-col>
        <el-button  @click="addFriend" >完成</el-button>
        <el-button  @click="cancelEdit" >取消</el-button>
      </el-col>
    </el-collapse>

  </div>
</template>

<script>
  import { addFriend } from '@/api/table'
  export default {
    data() {
      return {
        // 添加接口只需传页面需要的字段
        info: {
          nickname: '', // 昵称
          realname: '', // 姓名
          sex: '', // 性别：1男2女
          mobile: '', // 联系电话 
          idcard: '', // 身份证
          qq: '', // qq
          introduction: '', // 简介
          companyId: '', // 公司id
          department: '', // 部门
          position: '' // 职位
        },
        input: '',
        value: '',
        activeNames: ['1', '2'],
        disabled: true,
        isShow: true,
        isShoww: true,
        // 公司下拉选项，需调接口获取，/company/list
        options: [
          {
            value: '1',
            label: '黄金糕'
          }, {
            value: '2',
            label: '双皮奶'
          }, {
            value: '3',
            label: '蚵仔煎'
          }, {
            value: '4',
            label: '龙须面'
          }, {
            value: '5',
            label: '北京烤鸭'
          }
        ],
        // 性别下拉选项：1男2女
        sexOptions: [
          {
            value: '1',
            label: '男'
          }, {
            value: '2',
            label: '女'
          }
        ]
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
      if (this.$route.path !== '/friends/create') {
        this.fetchData()
      }
    },
    methods: {
      addFriend() {
        //  验证信息不能为空
        if (Object.keys(this.info).every((key, index, arry) => {
          return this.info[key] === ''
        })) {
          console.log('无输入个人信息')
          return
        }

        // var params = {
        //   'companyId': this.info.companyId,
        //   'companyName': '',
        //   'creator': '',
        //   'department': '',
        //   'endDate': '',
        //   'endTime': '',
        //   'id': this.id,
        //   'idcard': this.info.idcard,
        //   'introduction': this.info.introduction,
        //   'isCompanyPublic': true,
        //   'mobile': this.info.mobile,
        //   'modifier': '',
        //   'modifyTime': '',
        //   'nickname': this.info.nickname,
        //   'order': '',
        //   'pageNum': 1,
        //   'pageSize': 10,
        //   'password': '',
        //   'position': '',
        //   'qq': this.info.qq,
        //   'realname': this.info.realname,
        //   'searchWord': '',
        //   'sex': this.info.sex,
        //   'sort': '',
        //   'startDate': '',
        //   'startTime': '',
        //   'status': ''
        // }
        //add接口直接用this.info是否可以~
        addFriend(this.info).then(response => {
        // addFriend(params).then(response => {
          if (response.success) {
            this.info = response.data || this.info
            alert('SUCCESS')
            this.$router.push({ path: '/friends/index' })
          }
        },error => {
          console.log(error);
        })
      },
      cancelEdit() {
        Object.keys(this.info).forEach((key, i) => {
          this.info[key] = ''
        })
      },
      handleChange() {
        console.log('handleChange')
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
