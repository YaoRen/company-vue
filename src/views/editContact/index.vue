<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="120px">
		  <el-form-item label="联系人信息" style="border-bottom: 1px solid #ccc;"></el-form-item>
			<el-form-item label="用户昵称">
				<el-col :span="4">
					<el-input v-model="form.friendNickname" :disabled="disabled"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="用户名">
				<el-col :span="4">
					<el-select v-model="form.friendRealname" placeholder="焦小姐的朋友1" :disabled="disabled">
						<el-option v-for="item in friendOptions" :key="item" :label="item" :value="item">
        				</el-option>
					</el-select>
				</el-col>
				<el-col :span="8" style="text-align: center;">找不到用户？尝试&nbsp;
					<router-link :to="{path:'/message/editContact/'+this.id}" style="color: #1482F0;">刷新本页</router-link>&nbsp;或者&nbsp;
					<router-link :to="{path:'/friends/index'}" style="color: #1482F0;">新建一个朋友</router-link>
				</el-col>
			</el-form-item>
			<el-form-item label="电话*">
				<el-col :span="4">
					<el-input  placeholder="400-777-8700" :disabled="disabled"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="QQ">
				<el-col :span="4">
					<el-input  placeholder="如果有QQ号" :disabled="disabled"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="微信">
				<el-col :span="4">
					<el-input  placeholder="如果有微信号" :disabled="disabled"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="一句话简介">
				<el-input v-model="form.title" placeholder="谁的客户谁负责" :disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="公司信息" style="border-bottom: 1px solid #ccc;">
				<div style="float: right;">
					公开
				<el-switch v-model="form.isMessagePublic" active-color="#13ce66" inactive-color="#ff4949">
				</el-switch>
				</div>
			</el-form-item>
			<el-form-item label="公司名称">
				<el-col :span="8">
					<el-input v-model="form.companyName " placeholder="400-777-8700" :disabled="disabled"></el-input>
				</el-col>
				<el-switch v-model="form.isCompanyPublic" active-color="#13ce66" inactive-color="#ccc" style="float: right;">
				</el-switch>
			</el-form-item>
			<el-form-item label="公司性质">
				<el-col :span="8">
					<el-input  placeholder="贸易商" :disabled="disabled"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="公司位置">
				<el-col :span="8">
					<el-input  placeholder="山东 淄博" :disabled="disabled"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-col :span="8">
					<el-input placeholder="18618287052" :disabled="disabled"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="信誉值">
				<el-col :span="4">50</el-col>
			</el-form-item>
			<el-form-item>
				<router-link :to="{path:'/message/editContent/'+this.id}"><el-button>上一步</el-button></router-link>
				<el-button type="primary">预览</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {detailMessage} from '@/api/message'
	import {bus} from '@/bus'
	export default {
		data() {
			return {
				disabled:true,
				id:this.$route.params.id,
				friendOptions: ['焦小姐的朋友1', '焦小姐的朋友2', '焦小姐的朋友3', '焦小姐的朋友4', '焦小姐的朋友5'],
				cancelStatus: '',
				nextStatus: '',
				textMap: {
					update: '编辑',
					create: '添加'
				},
				form:{
					friendNickname: '',
					friendRealname: '',
					title: '',
					isCompanyPublic:true,
					isMessagePublic:true,
					companyName: ''
				}
			}
		},
		created() {
			this.fetchDetail();
			bus.$on('sub', (msg) => {
				this.disabled = msg;
				console.log(this.disabled)
			})
		},
		methods: {
			//获取编辑页信息
			fetchDetail(){
				detailMessage(this.id).then(response => {
			        this.form = response.data
	      		})
			}
			
			//编辑下一步
//			editNext() {
//				addMessage(this.list).then(response => {
//			 		console.log(response.data)
//			        this.form = response.data.content
//		      	})
//				this.$router.push({path:'/message/editContact'})
//			}
			
		}
	}
</script>
