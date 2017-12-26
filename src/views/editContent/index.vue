<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="基本信息"></el-form-item>
			<el-form-item label="商品类型*">
				<el-select v-model="form.region" placeholder="煅后焦">
					<el-option label="石油焦" value="beijing"></el-option>
					<el-option label="煅后焦" value="shanghai"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="产地">
				<el-select v-model="form.region" placeholder="请选择产地">
					<el-option label="东北地区" value="beijing"></el-option>
					<el-option label="华北地区" value="beijing"></el-option>
					<el-option label="华东地区" value="beijing"></el-option>
					<el-option label="华南地区" value="beijing"></el-option>
					<el-option label="华中地区" value="beijing"></el-option>
					<el-option label="西北地区" value="beijing"></el-option>
					<el-option label="西南地区" value="beijing"></el-option>
					<el-option label="其他" value="beijing"></el-option>
					<el-option label="请选择产地" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="出厂底价">
				<el-col :span="5">
					<el-input v-model="form.name"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;"> 元/吨</el-col>
			</el-form-item>
			<el-form-item label="竞买量*">
				<el-col :span="5">
					<el-input v-model="form.name"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">吨</el-col>
			</el-form-item>
			<el-form-item label="消息正文">
				<el-col :span="8">
					<el-input type="textarea" v-model="form.desc" placeholder="支持承兑价，中标后可根据中标价协商承兑金额！"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="类型标签*">
				<el-tag>海绵焦</el-tag>
				<el-tag type="success">针状焦</el-tag>
				<el-tag type="info">弹丸焦</el-tag>
				<el-tag type="warning">增碳剂</el-tag>
			</el-form-item>

			<el-form-item label="常规指标"></el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">硫*</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">%</el-col>
				<el-col :span="2" style="text-align: center;">真密度</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">g/cm³</el-col>
				<el-col :span="2" style="text-align: center;">灰分*</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">%</el-col>
			</el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">挥发分*</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">%</el-col>
				<el-col :span="2" style="text-align: center;">水分</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">%</el-col>
				<el-col :span="2" style="text-align: center;">粉末比电阻</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">μΩm</el-col>
			</el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">真实密度</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">g/cm³</el-col>
				<el-col :span="2" style="text-align: center;">粒度</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">mm</el-col>
			</el-form-item>
			<el-form-item label="微量元素指标"></el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">钒*</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">铝</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">钙</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
			</el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">硅</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">铁</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">磷</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
			</el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">钠</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">镍</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">铅</el-col>
				<el-col :span="2">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
			</el-form-item>
			<el-form-item label="质检报告"></el-form-item>
			<el-form-item>
				<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
					<el-button size="small" type="primary">添加质检报告</el-button>
					<e-col slot="tip" class="el-upload__tip" style="margin-left: 20px;">一份标准的质检报告会大大缩短交易时间 （请上传小于5MB的pdf文件）</e-col>
				</el-upload>
			</el-form-item>

			<el-form-item label="其他"></el-form-item>
			<el-form-item label="出厂底价">
				<el-col :span="5">
					<el-input v-model="form.name"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;"> 元/吨</el-col>
				<e-col :span="6">如您可提供此项服务供买家选择，请填写相关价格（选填）</e-col>
			</el-form-item>
			<el-form-item label="商品图片">
				<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
					<el-button size="small" type="primary">+相关图片</el-button>
					<e-col slot="tip" class="el-upload__tip" style="margin-left: 20px;">请上传小于2M PNG、JPG、GIF、JPEG商品相关图片</e-col>
					<div>上传历史</div>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button @click="onSubmit">取消编辑</el-button>
				<el-button type="primary" @click="onCancel">下一步</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	// export default {
	// 	data() {
	// 		return {
	// 			form: {
	// 				name: '',
	// 				region: '',
	// 				date1: '',
	// 				date2: '',
	// 				delivery: false,
	// 				type: [],
	// 				resource: '',
	// 				desc: ''
	// 			}
	// 		}
	// 	},
	// 	methods: {
	// 		onSubmit() {
	// 			this.$message('submit!')
	// 		},
	// 		onCancel() {
	// 			this.$message({
	// 				message: 'cancel!',
	// 				type: 'warning'
	// 			})
	// 		}
	// 	}
	// }
</script>
