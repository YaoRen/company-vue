<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="基本信息"></el-form-item>
			<el-form-item label="商品类型*">
				<el-select v-model="form.petrolType" placeholder="煅后焦">
					<el-option v-for="item in petrolTypeOptions" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="产地">
				<el-select v-model="form.productArea" placeholder="请选择产地">
					<el-option v-for="item in productAreaOptions" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="出厂底价">
				<el-col :span="5">
					<el-input v-model="form.reservePrice"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;"> 元/吨</el-col>
			</el-form-item>
			<el-form-item label="竞买量*">
				<el-col :span="5">
					<el-input v-model="form.totalQuantity"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">吨</el-col>
			</el-form-item>
			<el-form-item label="消息正文">
				<el-col :span="8">
					<el-input type="textarea" v-model="form.description" placeholder="支持承兑价，中标后可根据中标价协商承兑金额！"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="类型标签*">
				<el-tag v-for="item in form.label" :key="item">{{item}}</el-tag>
			</el-form-item>

			<el-form-item label="常规指标"></el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">硫*</el-col>
				<el-col :span="2">
					<el-input v-model="form.su"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">%</el-col>
				<el-col :span="2" style="text-align: center;">真密度</el-col>
				<el-col :span="2">
					<el-input v-model="form.density"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">g/cm³</el-col>
				<el-col :span="2" style="text-align: center;">灰分*</el-col>
				<el-col :span="2">
					<el-input v-model="form.ash"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">%</el-col>
			</el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">挥发分*</el-col>
				<el-col :span="2">
					<el-input v-model="form.volatiles"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">%</el-col>
				<el-col :span="2" style="text-align: center;">水分</el-col>
				<el-col :span="2">
					<el-input v-model="form.water"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">%</el-col>
				<el-col :span="2" style="text-align: center;">粉末比电阻</el-col>
				<el-col :span="2">
					<el-input v-model="form.resistance"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">μΩm</el-col>
			</el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">振实密度</el-col>
				<el-col :span="2">
					<el-input v-model="form.vibration"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">g/cm³</el-col>
				<el-col :span="2" style="text-align: center;">粒度</el-col>
				<el-col :span="2">
					<el-input v-model="form.particle"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">mm</el-col>
			</el-form-item>
			<el-form-item label="微量元素指标"></el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">钒*</el-col>
				<el-col :span="2">
					<el-input v-model="form.va"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">铝</el-col>
				<el-col :span="2">
					<el-input v-model="form.ai"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">钙</el-col>
				<el-col :span="2">
					<el-input v-model="form.ca"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
			</el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">硅</el-col>
				<el-col :span="2">
					<el-input v-model="form.si"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">铁</el-col>
				<el-col :span="2">
					<el-input v-model="form.fe"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">磷</el-col>
				<el-col :span="2">
					<el-input v-model="form.ph"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
			</el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">钠</el-col>
				<el-col :span="2">
					<el-input v-model="form.na"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">镍</el-col>
				<el-col :span="2">
					<el-input v-model="form.ni"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">铅</el-col>
				<el-col :span="2">
					<el-input v-model="form.pi"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
			</el-form-item>
			<el-form-item label="质检报告"></el-form-item>
			<el-form-item>
				<!--<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
					<el-button size="small" type="primary">添加质检报告</el-button>
					<e-col slot="tip" class="el-upload__tip" style="margin-left: 20px;">一份标准的质检报告会大大缩短交易时间 （请上传小于5MB的pdf文件）</e-col>
				</el-upload>-->
			</el-form-item>

			<el-form-item label="其他"></el-form-item>
			<el-form-item label="吨袋">
				<el-col :span="2">
					<el-input v-model="form.bagPrice"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;"> 元/吨</el-col>
				<e-col :span="6">如您可提供此项服务供买家选择，请填写相关价格（选填）</e-col>
			</el-form-item>
			<el-form-item label="商品图片">
				<!--<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
					<el-button size="small" type="primary">+相关图片</el-button>
					<e-col slot="tip" class="el-upload__tip" style="margin-left: 20px;">请上传小于2M PNG、JPG、GIF、JPEG商品相关图片</e-col>
					<div>上传历史</div>
				</el-upload>-->
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<!--<el-button v-if="cancelStatus=='create'">取消编辑</el-button>-->
			<router-link :to="{path:'/message/index'}"><el-button>取消</el-button></router-link>
			<!--<router-link :to="{path:'/message/editContact'}"><el-button>下一步</el-button></router-link>-->
			<el-button type="primary" @click="addNext()">下一步</el-button>
			<!--<el-button v-else type="primary" @click="dataDetail">下一步</el-button>-->
		</div>
	</div>
</template>

<script>
	import { getList, confirmMessage } from '@/api/message'
	export default {
		data() {
			return {
				petrolTypeOptions: ['石油焦', '煅后焦', '海绵焦', '针状焦', '弹丸焦'],
				productAreaOptions: ['东北地区', '华北地区', '华东地区', '华南地区', '华中地区', '西北地区', '西南地区', '其他', '请选择产地'],
				cancelStatus: '',
				nextStatus: '',
				textMap: {
					update: '编辑',
					create: '添加'
				},
				form:{
					ai: '',
					ash: '',
					bagPrice: '',
					ca: '',
					density: '',
					description: '',
					fe: '',
					images: '',
					inspectionReport: '',
					label: '',
					na: '',
					ni: '',
					particle: '',
					petrolType: '',
					ph: '',
					pi: '',
					reservePrice: '',
					resistance: '',
					si: '',
					status: '',
					su: '',
					productArea :'',
					va: '',
					vibration: '',
					volatiles: '',
					water: ''
				}
//				list:{
//					'ai': this.form.ai,
//					'ash': this.form.ash,
//					'bagPrice': this.form.bagPrice,
//					'ca': this.form.ca,
//					'density': this.form.density,
//					'description': this.form.description,
//					'fe': this.form.fe,
//					'images':this.form.images,
//					'inspectionReport':this.form.inspectionReport,
//					'label':this.form.label,
//					'na':this.form.na,
//					'ni':this.form.ni,
//					'particle':this.form.particle,
//					'petrolType':this.form.petrolType,
//					'ph':this.form.ph,
//					'pi':this.form.pi,
//					'productArea':this.form.productArea,
//					'reservePrice':this.form.reservePrice,
//					'resistance':this.form.resistance,
//					'si':this.form.si,
//					'status':this.form.status,
//					'su':this.form.su,
//					'va':this.form.va,
//					'vibration':this.form.vibration,
//					'volatiles':this.form.volatiles,
//					'water':this.form.water
//				}
			}
		},
		methods: {
			addNext() {
//				addMessage(this.list).then(response => {
//			 		console.log(response.data)
//			        this.form = response.data.content
//		      	})
				this.$router.push({path:'/message/editContact'})
			}
			
		}
	}
</script>