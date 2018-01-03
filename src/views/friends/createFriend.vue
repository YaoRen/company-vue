<template>
  <div class="app-container">
    <el-collapse v-model="activeNames">
      <!--<el-collapse v-model="activeNames" @change="handleChange">-->
      <el-collapse-item title="个人信息" name="1" >
        <el-form :label-position="right" label-width="96px">
          <el-form-item label="昵称：">
            <el-input v-model="info.nickname"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" >
            <el-input v-model="info.realname"></el-input>
          </el-form-item>
          <el-form-item label="性别：" >
            <el-select v-model="info.sex" placeholder="">
              <el-option :label = "boy" value = "1"></el-option>
              <el-option :label = "girl" value = "2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="联系电话：">
            <el-input v-model="info.mobile" ></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input v-model="info.idcard" ></el-input>
          </el-form-item>
          <el-form-item label="QQ：">
            <el-input v-model="info.qq" ></el-input>
          </el-form-item>
          <el-form-item label="一句话简介：">
            <el-input v-model="info.introduction" ></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="公司信息" name="2">
        <el-form :label-position="right" label-width="100px">
          <el-form-item label="公司名称：">
            <el-select v-model="info.companyId" placeholder="请选择公司名称">

              <el-option
                v-for="item in companyList"
                :key="item.id"
                :label="item.companyName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="tip">找不到公司？尝试 <span class="tips" @click = "reFresh"> 刷新本页</span> 或者 <span class="tips" @click = "createCompany">新建一个公司</span></div>
          <el-form-item label="部门：">
            <el-input v-model="info.department"></el-input>
          </el-form-item>
          <el-form-item label="职位：">
            <el-input v-model="info.position"></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-col>
        <el-button  @click="addFriend" >完成</el-button>
        <el-button  @click="cancelEdit" >取消</el-button>
      </el-col>
    </el-collapse>

  </div>
</template>

<script>
  import { addFriend, companyList } from '@/api/friends'
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
        right: 'right',
        input: '',
        value: '',
        activeNames: ['1', '2'],
        disabled: true,
        isShow: true,
        isShoww: true,
        companyList: [],
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
      this.getCompany()
    },
    methods: {
      open3() {
        this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        })
      },
      addFriend() {
        //  验证信息不能为空
        // if (Object.keys(this.info).every((key, index, arry) => {
        //     return this.info[key] === '')
        //   ){
        //   console.log('无输入个人信息')
        //   return
        // }
        var params = {

          'id': this.id,
          'idcard': this.info.idcard,
          'introduction': this.info.introduction,
          'isCompanyPublic': true,
          'mobile': this.info.mobile,
          'nickname': this.info.nickname,
          'pageNum': 1,
          'pageSize': 10,
          'qq': this.info.qq,
          'realname': this.info.realname,
          'sex': this.info.sex,
          'companyId': this.info.companyId,
          'department': this.info.department,
          'position': this.info.position
        }
        addFriend(params).then(response => {
          this.$notify({
            title: '创建成功',
            type: 'success'
          })
          if (response.success) {
            this.info = response.data || this.info

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
      },
      getCompany() {
        companyList({ 'businessStatus': '1', status: '2', 'pageSize': 0 }).then(response => {
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
