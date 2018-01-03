<template>
	<div class="app-container">
		<el-collapse v-model="activeNames">
		<el-form ref="form" :model="form" label-width="120px">
			<el-collapse-item title="基本信息" name="1" >
			<el-form-item label="消息类型*">
				<el-select v-model="form.type === 1 ? '供应标' : '采购标'" placeholder="供应标" :disabled="disabled">
					<el-option v-for="(item,index) in typeOptions" :key="item" :label="item" :value="index+1">
					</el-option>
				</el-select>
			</el-form-item>
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
			</el-collapse-item>
			<el-collapse-item title="常规指标" name="2" >
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
			</el-collapse-item>
			<el-collapse-item title="微量元素指标" name="3" >
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
			</el-collapse-item>
			<el-collapse-item title="质检报告" name="4" >
			<el-form-item>
				<el-upload class="upload-demo" accept=".pdf" action="http://petrocoke-ops-dev.obaymax.com/file/uploadImage"  type="file" :on-preview="handlePreview" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
					<el-button size="small" type="primary">添加质检报告</el-button>
					<el-col slot="tip" class="el-upload__tip">一份标准的质检报告会大大缩短交易时间 （请上传小于5MB的pdf文件）</el-col>
				</el-upload>
			</el-form-item>
			</el-collapse-item>
			<el-collapse-item title="其他" name="5" >
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
			</el-collapse-item>
			<el-collapse-item title="联系人信息" name="6" >
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
			</el-collapse-item>
			<el-collapse-item title="其他" name="7" >
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
			</el-collapse-item>
			<el-form-item>
				<!--<router-link :to="{path:'/message/addContent/'}"><el-button>上一步</el-button></router-link>-->
				<el-button type="primary" >发布</el-button>
			</el-form-item>
		</el-form>
		</el-collapse>
	</div>
</template>

<script>
	import {detailCompany,editMessage,detailMessage} from '@/api/message'
	import {getList,detailFriend} from '@/api/friends'
	import {bus} from '@/bus'
	export default {
		data() {
			return {
				disabled:false,
				activeNames: ['1'],
				id:this.$route.params.id,
				typeOptions: ['供给标', '采购标'],
				petrolTypeOptions: ['石油焦', '煅后焦'],
				productAreaOptions: ['东北地区', '华北地区', '华东地区', '华南地区', '华中地区', '西北地区', '西南地区', '其他', '请选择产地'],
				form:{},
				friendList: [],
				companyList:{}
			}
		},
		created(){
			this.fetchDetail()
			this.getFriend();
		},
		methods: {
			//获取详情页信息
			fetchDetail(){
				console.log(this.id)
				detailMessage(this.id).then(response => {
		        	this.form = response.data;
      			})
//				bus.$on('sub', (msg) => {
//					this.disabled=msg;
//				})
//				if(this.disabled){
//					detailMessage(this.id).then(response => {
//			        	this.form = response.data;
//	      			})
//				}else{
//					this.disabled=false;
//					detailMessage(this.id).then(response => {
//			        	this.form = response.data;
//	      			})
//				}
				
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
			},
			//获取编辑页信息
//			fetchEdit(){
//				this.editStatus = !this.editStatus;
//				this.disabled=false;
////				bus.$emit('sub', this.disabled);
//			},
			//下一个编辑页面
//			nextEditMs(){
//				var params={
//					'ai': this.form.ai,
//					'ash': this.form.ash,
//					'bagPrice': this.form.bagPrice,
//					'ca': this.form.ca,
//					'density': this.form.density,
//					'description': this.form.description,
//					'fe': this.form.fe,
//					'images': this.form.images,
//					'inspectionReport': this.form.inspectionReport,
//					'label': this.form.label,
//					'na': this.form.na,
//					'ni': this.form.ni,
//					'particle': this.form.particle,
//					'type': this.form.type,
//					'petrolType': this.form.petrolType,
//					'ph': this.form.ph,
//					'pi': this.form.pi,
//					'reservePrice': this.form.reservePrice,
//					'resistance': this.form.resistance,
//					'si': this.form.si,
//					'status': this.form.status,
//					'su': this.form.su,
//					'productArea': this.form.productArea,
//					'va': this.form.va,
//					'vibration': this.form.vibration,
//					'volatiles': this.form.volatiles,
//					'water': this.form.water,
//					'totalQuantity':this.form.totalQuantity ,
//					'buckleWaterRate':this.form.buckleWaterRate
//				}
//				//提交编辑内容页面
//				editMessage(params).then(response => {
//			        this.form = response.data;
//	      		})
//				this.$router.push({path:'/message/editContact/'+this.id})
//			},
			//下一个详情页面
//			nextDetailMs(){
//				this.$router.push({path:'/message/editContact/'+this.id})
//			},
//			//取消编辑
//			cancelEditMs(){
//				this.editStatus = !this.editStatus;
//				this.disabled=true;
//				bus.$emit('sub', this.disabled);
//			},
			//添加质检报告
			 beforeAvatarUpload(file) {
		        const isPDF = file.type === 'image/pdf';
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
		        const isImg = file.type === 'image/png' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg';
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
	      	}
			
		}
	}
</script>