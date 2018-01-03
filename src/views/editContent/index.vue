<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="基本信息"></el-form-item>
			<el-form-item label="商品类型*">
				<el-select v-model="form.petrolType === 1 ? '石油焦' : '煅后焦'" placeholder="煅后焦" :disabled="disabled">
					<el-option v-for="(item,index) in petrolTypeOptions" :key="item" :label="item" :value="index+1">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="产地">
				<el-select v-model="form.productArea" placeholder="请选择产地" :disabled="disabled">
					<el-option v-for="item in productAreaOptions" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="出厂底价">
				<el-col :span="5">
					<el-input v-model="form.reservePrice" :disabled="disabled"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;"> 元/吨</el-col>
			</el-form-item>
			<el-form-item label="竞买量*">
				<el-col :span="5">
					<el-input v-model="form.totalQuantity" :disabled="disabled"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">吨</el-col>
			</el-form-item>
			<el-form-item label="消息正文">
				<el-col :span="8">
					<el-input type="textarea" v-model="form.description" placeholder="支持承兑价，中标后可根据中标价协商承兑金额！" :disabled="disabled"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="类型标签*">
				<span v-for="item in form.label" :key="item">
					<el-tag v-if="item ==1">海绵焦</el-tag>
					<el-tag v-else-if="item ==2" type="success">弹丸焦</el-tag>
					<el-tag v-else-if="item ==3" type="info">针状焦</el-tag>
					<el-tag v-else-if="item ==4" type="danger">煅后石油焦</el-tag>
					<el-tag v-else-if="item ==5" type="warning">增碳剂</el-tag>
					<el-tag v-else>收尘粉</el-tag>
				</span>
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
				<el-col :span="2" style="text-align: center;">钒</el-col>
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
			<el-form-item label="吨袋">
				<el-col :span="2">
					<el-input v-model="form.bagPrice" :disabled="disabled"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;"> 元/吨</el-col>
				<el-col :span="6">如您可提供此项服务供买家选择，请填写相关价格（选填）</el-col>
			</el-form-item>
			<el-form-item label="商品图片">
				<el-upload class="upload-demo" action="http://petrocoke-ops-dev.obaymax.com/file/uploadImage" list-type="picture" type="file" :on-preview="handlePreviews" :before-upload="beforeUpload" :on-success="handleSuccess">
					<el-button size="small" type="primary">+相关图片</el-button>
					<el-col slot="tip" class="el-upload__tip" style="margin-left: 20px;">请上传小于2M PNG、JPG、GIF、JPEG商品相关图片</el-col>
					<div>上传历史</div>
				</el-upload>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<!--<el-button v-if="cancelStatus=='create'">取消编辑</el-button>-->
			<el-button v-if="editStatus" @click="fetchEdit">编辑</el-button>
			<el-button v-else @click="cancelEditMs">取消编辑</el-button>
			<el-button v-if="editStatus" type="primary" @click="nextDetailMs">下一步</el-button>
			<el-button v-else type="primary" @click="nextEditMs">下一步</el-button>
			<!--<el-button type="primary" @click="editNext()">下一步</el-button>-->
			<!--<el-button v-else type="primary" @click="dataDetail">下一步</el-button>-->
		</div>
	</div>
</template>

<script>
	import {detailMessage,editMessage} from '@/api/message'
	import {bus} from '@/bus'
	export default {
		data() {
			return {
				disabled:true,
				id:this.$route.params.id,
				petrolTypeOptions: ['石油焦', '煅后焦'],
				productAreaOptions: ['东北地区', '华北地区', '华东地区', '华南地区', '华中地区', '西北地区', '西南地区', '其他', '请选择产地'],
				editStatus: true,
				textMap: {
					update: '编辑',
					create: '添加'
				},
				form:{}
			}
		},
		created(){
			this.fetchDetail()
		},
		methods: {
			//获取详情页信息
			fetchDetail(){
				bus.$on('sub', (msg) => {
					this.disabled=msg;
				})
				if(this.disabled){
					detailMessage(this.id).then(response => {
			        	this.form = response.data;
	      			})
				}else{
					this.disabled=false;
					detailMessage(this.id).then(response => {
			        	this.form = response.data;
			        	console.log(11)
	      			})
				}
				
			},
			//获取编辑页信息
			fetchEdit(){
				this.editStatus = !this.editStatus;
				this.disabled=false;
//				bus.$emit('sub', this.disabled);
			},
			//下一个编辑页面
			nextEditMs(){
				var params={
					'ai': this.form.ai,
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
					'su': this.form.su,
					'productArea': this.form.productArea,
					'va': this.form.va,
					'vibration': this.form.vibration,
					'volatiles': this.form.volatiles,
					'water': this.form.water,
					'id':this.$route.params.id
				}
				//提交编辑内容页面
				editMessage(params).then(response => {
			        this.form = response.data;
			        var str=JSON.stringify(this.form);
			        localStorage.setItem("edit",str);
			        bus.$emit('edit', this.form);
	      		})
				this.$router.push({path:'/message/editContact/'+this.id})
			},
			//下一个详情页面
			nextDetailMs(){
				this.$router.push({path:'/message/editContact/'+this.id})
			},
			//取消编辑
			cancelEditMs(){
				this.editStatus = !this.editStatus;
				this.disabled=true;
				bus.$emit('sub', this.disabled);
			},
			//添加质检报告
			beforeAvatarUpload(file) {
		        const isPDF = file.type == 'image/pdf';
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
		        const isImg1 = file.type == 'image/PNG';
		        const isImg2 = file.type == 'image/JPG';
		        const isImg3 = file.type == 'image/GIF';
		        const isImg4 = file.type == 'image/JPEG';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		
		        if (!(isImg1 || isImg2 || isImg3 || isImg4)) {
		          this.$message.error('上传头像图片只能是 PNG、JPG、GIF、JPEG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isImg1 && isImg2 && isImg3 && isImg4 && isLt2M;
      		},
		    handleSuccess(res, file) {
	        	this.form.images = res.data;
	      	},
			handlePreviews(file){
	      		window.open(file.response.data,'_blank');
	      	}
			
		}
	}
</script>