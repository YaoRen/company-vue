<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="120px">
		  <el-form-item label="联系人信息" style="border-bottom: 1px solid #ccc;"></el-form-item>
			<el-form-item label="用户昵称">
				<el-col :span="4">
					<el-input v-model="form.name"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="用户名">
				<el-col :span="4">
					<el-select v-model="form.region" placeholder="焦小姐的朋友1">
						<el-option label="焦小姐的朋友1" value="shanghai"></el-option>
						<el-option label="焦小姐的朋友2" value="beijing"></el-option>
						<el-option label="焦小姐的朋友3" value="beijing"></el-option>
						<el-option label="焦小姐的朋友4" value="beijing"></el-option>
						<el-option label="焦小姐的朋友5" value="beijing"></el-option>
					</el-select>
				</el-col>
				<el-col :span="8" style="text-align: center;">找不到用户？尝试&nbsp;
					<a href="javascript:;" style="color: #1482F0;">刷新本页</a>&nbsp;或者
					<a href="#" style="color: #1482F0;">&nbsp;新建一个朋友</a>
				</el-col>
			</el-form-item>
			<el-form-item label="电话*">
				<el-col :span="4">
					<el-input v-model="form.name" placeholder="400-777-8700" disabled></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="QQ">
				<el-col :span="4">
					<el-input v-model="form.name" placeholder="如果有QQ号" disabled></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="微信">
				<el-col :span="4">
					<el-input v-model="form.name" placeholder="如果有微信号" disabled></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="一句话简介">
				<el-input v-model="form.name" placeholder="谁的客户谁负责" disabled></el-input>
			</el-form-item>
			<el-form-item label="公司信息" style="border-bottom: 1px solid #ccc;">
				<div style="float: right;">
					公开
				<el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949">
				</el-switch>
				</div>
			</el-form-item>
			<el-form-item label="公司名称">
				<el-col :span="8">
					<el-input v-model="form.name" placeholder="400-777-8700" disabled></el-input>
				</el-col>
				<el-switch v-model="value3" active-color="#13ce66" inactive-color="#ccc" style="float: right;">
				</el-switch>
			</el-form-item>
			<el-form-item label="公司性质">
				<el-col :span="8">
					<el-input v-model="form.name" placeholder="如果有QQ号" disabled></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="公司位置">
				<el-col :span="8">
					<el-input v-model="form.name" placeholder="如果有微信号" disabled></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-col :span="8">
					<el-input v-model="form.name" placeholder="如果有微信号" disabled></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="信誉值">
				<el-col :span="4">50</el-col>
			</el-form-item>
			<el-form-item>
				<el-button @click="onSubmit">上一步</el-button>
				<el-button type="primary" @click="onCancel">预览</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			  value1: true,
        value2: true,
     		value3: true,
        value4: true,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			//重新加载页面
//			upload(){
//				this.$router.replace("/");
//			},
			onSubmit() {
				this.$message('submit!')
			},
			onCancel() {
				this.$message({
					message: 'cancel!',
					type: 'warning'
				})
			}
		}
	}
</script>