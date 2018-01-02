<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="基本信息"></el-form-item>
			<el-form-item label="商品类型*">
				<el-select v-model="form.petrolType" placeholder="请选择">
					<el-option v-for="(item,index) in petrolTypeOptions" :key="item" :label="item" :value="index+1">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="产地">
				<el-select v-model="form.productArea" placeholder="请选择产地" >
					<el-option v-for="item in productAreaOptions" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="出厂底价">
				<el-col :span="5">
					<el-input v-model="form.reservePrice" ></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;"> 元/吨</el-col>
			</el-form-item>
			<el-form-item label="竞买量*">
				<el-col :span="5">
					<el-input v-model="form.totalQuantity" ></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">吨</el-col>
			</el-form-item>
			<el-form-item label="消息正文">
				<el-col :span="8">
					<el-input type="textarea" v-model="form.description" placeholder="支持承兑价，中标后可根据中标价协商承兑金额！" ></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="类型标签*">
				<el-radio-group v-model="form.label">
					<el-radio-button v-for="(tag,index) in labelTag" :label=tag :value="index+1" :key="index" ></el-radio-button>
				</el-radio-group>
				<!--<span v-for="item in form.label" :key="item">
					<el-tag v-if="item ==1">海绵焦</el-tag>
					<el-tag v-else-if="item ==2" type="success">弹丸焦</el-tag>
					<el-tag v-else-if="item ==3" type="info">针状焦</el-tag>
					<el-tag v-else-if="item ==4" type="danger">煅后石油焦</el-tag>
					<el-tag v-else-if="item ==5" type="warning">增碳剂</el-tag>
					<el-tag v-else>收尘粉</el-tag>
				</span>-->
			</el-form-item>

			<el-form-item label="常规指标"></el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">硫*</el-col>
				<el-col :span="2">
					<el-input v-model="form.su" ></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">%</el-col>
				<span v-if="form.petrolType == 2">
					<el-col :span="2" style="text-align: center;">真密度</el-col>
					<el-col :span="2">
						<el-input v-model="form.density" ></el-input>
					</el-col>
					<el-col :span="2" style="text-align: center;">g/cm³</el-col>
				</span>
				<el-col :span="2" style="text-align: center;">灰分*</el-col>
				<el-col :span="2">
					<el-input v-model="form.ash" ></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">%</el-col>
			</el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">挥发分*</el-col>
				<el-col :span="2">
					<el-input v-model="form.volatiles" ></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">%</el-col>
				<el-col :span="2" style="text-align: center;">水分</el-col>
				<el-col :span="2">
					<el-input v-model="form.water" ></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">%</el-col>
				<span v-if="form.petrolType == 2">
					<el-col :span="2" style="text-align: center;">粉末比电阻</el-col>
					<el-col :span="2">
						<el-input v-model="form.resistance" ></el-input>
					</el-col>
					<el-col :span="2" style="text-align: center;">μΩm</el-col>
				</span>
			</el-form-item>
			<el-form-item>
				<span v-if="form.petrolType == 2">
					<el-col :span="2" style="text-align: center;">振实密度</el-col>
					<el-col :span="2">
						<el-input v-model="form.vibration" ></el-input>
					</el-col>
					<el-col :span="2" style="text-align: center;">g/cm³</el-col>
				</span>
				<el-col :span="2" style="text-align: center;">粒度</el-col>
				<el-col :span="2">
					<el-input v-model="form.particle" ></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">mm</el-col>
			</el-form-item>
			<el-form-item label="微量元素指标"></el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">钒*</el-col>
				<el-col :span="2">
					<el-input v-model="form.va" ></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">铝</el-col>
				<el-col :span="2">
					<el-input v-model="form.ai" ></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">钙</el-col>
				<el-col :span="2">
					<el-input v-model="form.ca" ></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
			</el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">硅</el-col>
				<el-col :span="2">
					<el-input v-model="form.si" ></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">铁</el-col>
				<el-col :span="2">
					<el-input v-model="form.fe" ></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<el-col :span="2" style="text-align: center;">磷</el-col>
				<el-col :span="2">
					<el-input v-model="form.ph" ></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
			</el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">钠</el-col>
				<el-col :span="2">
					<el-input v-model="form.na" ></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">ppm</el-col>
				<span v-if="form.petrolType == 2">
					<el-col :span="2" style="text-align: center;">镍</el-col>
					<el-col :span="2">
						<el-input v-model="form.ni" ></el-input>
					</el-col>
					<el-col :span="2" style="text-align: center;">ppm</el-col>
				</span>
				<span v-if="form.petrolType == 2">
					<el-col :span="2" style="text-align: center;">铅</el-col>
					<el-col :span="2">
						<el-input v-model="form.pi" ></el-input>
					</el-col>
					<el-col :span="2" style="text-align: center;">ppm</el-col>
				</span>
			</el-form-item>
			<el-form-item label="质检报告"></el-form-item>
			<el-form-item>
				<el-upload class="upload-demo" accept=".pdf" action="http://petrocoke-ops-dev.obaymax.com/file/uploadImage"  type="file" :on-preview="handlePreview" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
					<el-button size="small" type="primary">添加质检报告</el-button>
					<el-col slot="tip" class="el-upload__tip">一份标准的质检报告会大大缩短交易时间 （请上传小于5MB的pdf文件）</el-col>
				</el-upload>
			</el-form-item>

			<el-form-item label="其他"></el-form-item>
			<span v-if="form.petrolType == 2">
				<el-form-item label="吨袋">
					<el-col :span="2">
						<el-input v-model="form.bagPrice" ></el-input>
					</el-col>
					<el-col :span="2" style="text-align: center;"> 元/吨</el-col>
					<el-col :span="10">如您可提供此项服务供买家选择，请填写相关价格（选填）</el-col>
				</el-form-item>
			</span>
			<span v-if="form.petrolType == 1">
				<el-form-item label="扣水量*">
					<el-col :span="2">
						<el-input v-model="form.buckleWaterRate" placeholder="输入扣水量或扣水方式"></el-input>
					</el-col>
					<el-col :span="10" style="margin-left: 20px;">实际发货量=发货量x(1-扣水量)</el-col>
				</el-form-item>
			</span>
			<el-form-item label="商品图片">
				<el-upload class="upload-demo" action="http://petrocoke-ops-dev.obaymax.com/file/uploadImage" list-type="picture" type="file" :on-preview="handlePreviews" :before-upload="beforeUpload" :on-success="handleSuccess">
					<el-button size="small" type="primary">+相关图片</el-button>
					<el-col slot="tip" class="el-upload__tip" style="margin-left: 20px;">请上传小于2M PNG、JPG、GIF、JPEG商品相关图片</el-col>
					<div>上传历史</div>
				</el-upload>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="cancelAdd">取消</el-button>
			<el-button type="primary" @click="addNext">下一步</el-button>
		</div>
	</div>
</template>

<script>
	import {addMessage} from '@/api/message'
	import {bus} from '@/bus'
	export default {
		data() {
			return {
				disabled:false,
				id:this.$route.params.id,
				petrolTypeOptions: ['石油焦', '煅后焦'],
				productAreaOptions: ['东北地区', '华北地区', '华东地区', '华南地区', '华中地区', '西北地区', '西南地区', '其他', '请选择产地'],
				labelTag:['海绵焦','弹丸焦','针状焦','煅后石油焦','增碳剂','收尘粉'],
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
					productArea: '',
					va: '',
					vibration: '',
					volatiles: '',
					water: '',
					buckleWaterRate:''
				}
			}
		},
		created(){
			if(localStorage.getItem("table")){
//				console.log(localStorage.getItem("table"))
				var jsons=localStorage.getItem("table");
				var obj=JSON.parse(jsons);
				this.form=obj
			}
		},
		methods: {
			//获取添加内容页信息
			addNext() {
					//  验证信息不能为空
//					if(Object.keys(this.info).every((key, index, arry) => {
//							return this.info[key] === ''
//						})) {
//						console.log('无输入个人信息')
//						return
//					}
					var list = {'ai': this.form.ai,
					'ash': this.form.ash,
					'bagPrice': this.form.bagPrice,
					'ca': this.form.ca,
					'density': this.form.density,
					'description': this.form.description,
					'fe': this.form.fe,
					'images': this.form.images,
					'inspectionReport': this.form.inspectionReport,
					'label': this.form.label,
					'na': this.form.na,
					'ni': this.form.ni,
					'particle': this.form.particle,
					'petrolType': this.form.petrolType,
					'ph': this.form.ph,
					'pi': this.form.pi,
					'reservePrice': this.form.reservePrice,
					'resistance': this.form.resistance,
					'si': this.form.si,
					'status': this.form.status,
					'su': this.form.su,
					'productArea': this.form.productArea,
					'va': this.form.va,
					'vibration': this.form.vibration,
					'volatiles': this.form.volatiles,
					'water': this.form.water,
					'buckleWaterRate':this.form.buckleWaterRate
				};
				addMessage(list).then(response => {
			        this.form = response.data;
			        var str=JSON.stringify(this.form);
			        localStorage.setItem("table",str);
//			        bus.$emit('adds', this.form);
	      		})
				this.$router.push({path:'/message/addContact'});
			},
			//取消添加
			cancelAdd(){
				localStorage.removeItem("table");
				this.form = {}
				this.$router.push({path:'/message/index'});
			},
			//获取添加页面
//			addMessages(){
//				this.disabled = !this.disabled;
//				this.form=null;
//				addMessage(this.list).then(response => {
//			        console.log(response.data)
//	      		})
//			}
			//添加质检报告
			 beforeAvatarUpload(file) {
		        const isPDF = file.type !== 'image/pdf';
		        const isLt5M = file.size / 1024 / 1024 < 5;

		        if (!isPDF) {
		          this.$message.error('上传头像图片只能是 PDF 格式!');
		        }
		        if (!isLt5M) {
		          this.$message.error('上传头像图片大小不能超过 5MB!');
		        }
		        return isPDF && isLt5M;
      		},
      		handleAvatarSuccess(res, file) {
		        this.form.inspectionReport = res.data;
	      	},
	      	handlePreview(file){
	      		window.open(file.response.data,'_blank');
	      	},
		    //添加图片
			beforeUpload(file) {
		        const isImg = file.type !== 'image/pdf';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isImg) {
		          this.$message.error('上传头像图片只能是 PNG、JPG、GIF、JPEG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isImg && isLt2M;
      		},
		    handleSuccess(res, file) {
	        	this.form.images = res.data;
	      },
			handlePreviews(file){
	      		window.open(file.response.data,'_blank');
	      	},
		}
	}
</script>
