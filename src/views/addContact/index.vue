<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="120px">
		  <el-form-item label="联系人信息" style="border-bottom: 1px solid #ccc;"></el-form-item>
			<el-form-item label="用户昵称">
				<el-col :span="4">
					<el-input v-model="form.nickname" :disabled="disabled"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="用户名">
				<el-col :span="4">
					<el-select v-model="form.friendRealname" placeholder="焦小姐的朋友1" :disabled="disabled" @change="checkFriend(form.friendRealname)">
						<el-option v-for="item in friendList"  :label="item.realname" :value="item.realname">
        				</el-option>
					</el-select>
				</el-col>
				<el-col :span="8" style="text-align: center;">找不到用户？尝试&nbsp;
					<router-link :to="{path:'/message/addContact'}" style="color: #1482F0;">刷新本页</router-link>&nbsp;或者&nbsp;
					<router-link :to="{path:'/friends/create'}" style="color: #1482F0;">新建一个朋友</router-link>
				</el-col>
			</el-form-item>
			<el-form-item label="电话*">
				<el-col :span="4"> 
					<el-input  v-model="form.mobile" disabled></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="QQ">
				<el-col :span="4">
					<el-input  v-model="form.qq" disabled></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="微信">
				<el-col :span="4">
					<el-input  v-if="form.mobile !== ''" v-model="form.mobile" disabled></el-input>
					<el-input  v-else disabled></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="一句话简介">
				<el-input v-model="form.introduction" disabled></el-input>
			</el-form-item>
			<el-form-item label="公司信息" style="border-bottom: 1px solid #ccc;">
				<div style="float: right;">
					公开
				<el-switch v-model="companyList.isCompanyPublic" active-color="#13ce66" inactive-color="gray">
				</el-switch>
				</div>
			</el-form-item>
			<el-form-item label="公司名称">
				<el-col :span="8">
					<el-input v-model="companyList.companyName " placeholder="400-777-8700" disabled></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="公司性质">
				<el-col :span="8">
					<span v-if="companyList.companyType == 0">
						<el-input  placeholder="其他" disabled></el-input>
					</span>
					<span v-else-if="companyList.companyType == 1">
						<el-input  placeholder="炼油厂" disabled></el-input>
					</span>
					<span v-else-if="companyList.companyType == 2">
						<el-input  placeholder="碳素厂" disabled></el-input>
					</span>
					<span v-else-if="companyList.companyType == 3">
						<el-input  placeholder="贸易商" disabled></el-input>
					</span>
					<span v-else>
						<el-input  placeholder="铝厂" disabled></el-input>
					</span>
				</el-col>
			</el-form-item>
			<el-form-item label="公司位置"> 
				<el-col :span="8">
					<el-input  v-model="companyList.city" disabled></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="联系电话"> 
				<el-col :span="8">
					<el-input v-model="companyList.connectTelephone" disabled></el-input>
				</el-col>
			</el-form-item>
			<!--<el-form-item label="信誉值">
				<el-col :span="4">50</el-col>
			</el-form-item>-->
			<el-form-item>
				<router-link :to="{path:'/message/addContent/'}"><el-button>上一步</el-button></router-link>
				<el-button type="primary" @click="preview">预览</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {detailCompany,editMessage} from '@/api/message'
	import {getList,detailFriend} from '@/api/friends'
	import {bus} from '@/bus'
	export default {
		data() {
			return {
				disabled:false,
				id:this.$route.params.id,
				friendList: [],
				companyList:{},
				form:{}
			}
		},
		created(){
			this.getFriend();
			bus.$on('adds', (msg) => {
				this.form=Object.assign(this.form, msg);
			})
		},
		methods: {
			//获取编辑页信息
			preview(){
//				var list={
//					'friendNickname': this.form.nickname ,
//					'friendRealname': this.form.realname 
//					'friendId': this.form.id
//					'companyId': this.companyList.id,
//					'companyName': this.companyList.companyName
//				}
				editMessage(this.form).then(response => {
			        this.form = Object.assign(this.form, response.data);
	      		})
				localStorage.removeItem("table");
				this.$router.push({path:'/message/editContent/'+this.id});
			},
			//获取焦小姐的朋友列表
			getFriend(){
				var params={pageSize:0,status:1}
				getList(params).then(response => {
					this.friendList=response.data.content;
	      		})
				
			},
			//选中当前焦小姐
			checkFriend(val){
				var me=this;
				me.friendList.map(function(v,i){
					if(v.realname === val){
						var dd=v.id;
						var ss=v.companyId;
						//朋友详情
						detailFriend(dd).then(response => {
					        me.form = response.data
			      		})
						//公司详情
						detailCompany(ss).then(response => {
					        me.companyList = response.data
			      		})
						
					}
				})
			}
		}
	}
</script>
