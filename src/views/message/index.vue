<template>
	<div class="app-container calendar-list-container">
		<!--查询消息-->
		<div class="filter-container">
			<el-form>
				<el-form-item>
					<el-col :span="2" style="text-align: center;">消息编号</el-col>
					<el-col :span="4">
						<el-input v-model="listQuery.tenderNum" class="filter-item"></el-input>
					</el-col>
					<el-col :span="2" style="text-align: center;">创建时间</el-col>
					<el-col :span="4">
						<el-date-picker style="width: 200px;" v-model="date" type="daterange" start-placeholder="开始日期"  end-placeholder="结束日期" class="filter-item">
						</el-date-picker>
					</el-col>
					<el-col :span="2" style="text-align: center;">询价量</el-col>
					<el-col :span="4">
						<el-input v-model="listQuery.consultCount" placeholder="请求验真的次数" class="filter-item"></el-input>
					</el-col>
					<el-col :span="2" style="text-align: center;">发布人</el-col>
					<el-col :span="4">
						<el-input v-model="listQuery.friendNickname" class="filter-item"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-col :span="2" style="text-align: center;">商品类型</el-col>
					<el-col :span="4">
						<el-select v-model="listQuery.petrolType" placeholder="全部商品" class="filter-item">
							<el-option v-for="(item,index) in petrolTypeOptions" :key="item" :label="item" :value="index+1">
	        				</el-option>
						</el-select>
					</el-col>
					<el-col :span="2" style="text-align: center;">消息类型</el-col>
					<el-col :span="4">
						<el-select v-model="listQuery.type" placeholder="请选择" class="filter-item">
							<el-option v-for="(item,index) in typeOptions" :key="item" :label="item" :value="index+1">
	        				</el-option>
						</el-select>
					</el-col>
					<el-col :span="2" style="text-align: center;">消息状态</el-col>
					<el-col :span="4">
						<el-select v-model="listQuery.status" placeholder="草稿" class="filter-item">
							<el-option v-for="(item,index) in statusOptions" :key="item" :label="item" :value="index">
	        				</el-option>
						</el-select>
					</el-col>
					<el-col :span="2" style="text-align: center;">焦小姐</el-col>
					<el-col :span="4">
						<el-input v-model="listQuery.friendRealname" class="filter-item"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-button @click="query" type="primary" style="margin-left: 2%;" class="filter-item">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-col :span="4" style="text-align: left;line-height: 2;">查询数量：{{total}}</el-col>
		<el-button type="primary" style="float:right;margin-bottom:20px;"><router-link :to="{path:'/message/addContent'}">添加消息</router-link></el-button>
		<!--消息列表-->
		<el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
			<el-table-column align="center" label='招标号' width="95px">
				<template slot-scope="scope">
					<router-link :to="{path:'/message/editContent/'+scope.row.id}">
						{{scope.row.tenderNum}}
					</router-link>
				</template>
			</el-table-column>
			<el-table-column label="商品类型" align="center">
				<template slot-scope="scope">
					<router-link :to="{path:'/message/editContent/'+scope.row.id}">
						<span v-if="scope.row.petrolType === 1">石油焦</span>
						<span v-else>煅后焦</span>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column label="消息类型" width="110px" align="center">
				<template slot-scope="scope">
					<router-link :to="{path:'/message/editContent/'+scope.row.id}">
						<span v-if="scope.row.type === 1">供给标</span>
						<span v-else-if="scope.row.type === 2">需求标</span>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" width="110px" align="center">
				<template slot-scope="scope">
					<router-link :to="{path:'/message/editContent/'+scope.row.id}">
						{{scope.row.createTime | date}}
					</router-link>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="消息状态" width="200px">
				<template slot-scope="scope">
					<router-link :to="{path:'/message/editContent/'+scope.row.id}">
						<span v-if="scope.row.status === 0">草稿</span>
						<span v-else-if="scope.row.status === 1">未验证</span>
						<span v-else-if="scope.row.status === 2">验证中</span>
						<span v-else-if="scope.row.status === 3">已验证</span>
						<span v-else>已招标</span>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="发布人 " width="200px">
				<template slot-scope="scope">
					<router-link :to="{path:'/message/editContent/'+scope.row.id}">
						<span>{{scope.row.friendNickname}}</span>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="货量（吨）" width="200px">
				<template slot-scope="scope">
					<router-link :to="{path:'/message/editContent/'+scope.row.id}">
						<span>{{scope.row.totalQuantity}}</span>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="询价量" width="200px">
				<template slot-scope="scope">
					<router-link :to="{path:'/message/editContent/'+scope.row.id}">
						<span>{{scope.row.consultCount}}</span>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="焦小姐" width="200px">
				<template slot-scope="scope">
					<router-link :to="{path:'/message/editContent/'+scope.row.id}">
						<span>{{scope.row.friendRealname}}</span>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column class-name="status-col" label="操作" width="110" align="center">
				<template slot-scope="scope">
					<span @click="confirmTrue(scope.row.id)" style="color: #1482F0;cursor: pointer;">验真</span>
				</template>
			</el-table-column>
		</el-table>
		<!--分页-->
		<div class="block">
		  <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum" :total="all">
		  </el-pagination>
		</div>
		<!--验真-->
		<el-dialog title="验真凭据" :visible.sync="dialogFormVisible">
			<el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
				<div style='margin:0 0 5px 20px'>可多选</div>
				<el-form-item>
					<el-checkbox-group v-model="temp.options">
						<el-checkbox label="1">已取得质检报告</el-checkbox><br />
						<el-checkbox label="2">已取得其它验真凭据</el-checkbox><br />
						<el-checkbox label="3">已电话联系发布消息人核实信息</el-checkbox><br />
						<el-checkbox label="4">已取得底价</el-checkbox><br />
						<el-checkbox label="5">其他</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item>
					<el-input type="textarea" placeholder="填写其他验真信息（限制150字符）" v-model="temp.remark" >
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addData">补充完善资料</el-button>
				<el-button @click="dialogFormVisible = false">无需完善</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { getList,confirmMessage,editMessage} from '@/api/message'
	import { parseTime } from '@/utils'
	export default {
		data() {
			return {
				petrolTypeOptions: ['石油焦','煅后焦'],
				typeOptions: ['供应招标','采购招标','请选择'],
				statusOptions: ['草稿','未验证','验证中','已验证','已招标'],
				temp: {
					options:[],
					remark: ''
				},
				dialogFormVisible: false,
				list: null,
				total: null,
				all:null,
				id:'',
				date:'',
				listQuery:{
					pageNum: 1,
          pageSize: 10,
          totalPages:'',
          totalElements:'',
					tenderNum: '',
					createTime: '',
					consultCount: '',
					friendNickname: '',
					type:[],
					petrolType: [],
					status: [],
					friendRealname: ''
				},
				listLoading: true
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
			},
			 date(input) {
		        var d = new Date(input)
		        var year = d.getFullYear()
		        var month = d.getMonth() + 1
		        var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
		        return year + '-' + month + '-' + day
	      	}
		},
		created() {
			this.fetchData()
		},
		methods: {
			//显示验真页面
			confirmTrue(row) {
				this.dialogFormVisible = true;
				this.id=row;
			},
			//补充完善资料
			addData(){
				
				var opts=this.temp.options.join(',');
				var params={
					  "id": this.id,
					  "options": opts,
					  "remark": this.temp.remark
				}
				//验真
				confirmMessage(params).then(response => {
					var me=this;
					me.list.map(function(v,i){
						if(v.id === me.id){
							v.status=3;
						}
					})
					console.log(this.id)
//					this.list[this.id].status = 3;
				})
				//跳转到详情页
				this.$router.push({path:'/message/editContent/'+this.id})
			},
			//获取消息列表
			fetchData() {
				this.listLoading = true
			 	getList(this.listQuery).then(response => {
			        this.list = response.data.content
			        this.all = response.data.totalElements
			        this.total = response.data.totalElements
			        this.listLoading = false
		      	})
			},
			//查询列表
			query() {
				if (this.date.length !== 0) {
		          var start = new Date(this.date[0])
		          var end = new Date(this.date[1])
		          this.time = {
		            startTime : start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate(),
		            endTime : end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
		          }
		        } else {
		          this.time = {}
		        }
	          	var params = Object.assign(this.listQuery, this.time)
//				var params={
//					'pageNum': 1,
//        			'pageSize': 10,
//        			'totalPages':this.listQuery.totalPages,
//        			'totalElements': this.listQuery.totalElements,
//					'tenderNum': this.listQuery.tenderNum,
//					'createTime': this.listQuery.createTime,
//					'consultCount': this.listQuery.consultCount,
//					'friendNickname': this.listQuery.friendNickname,
//					'type': this.listQuery.type,
//					'petrolType': this.listQuery.petrolType,
//					'status': this.listQuery.status,
//					'friendRealname': this.listQuery.friendRealname,
//				}
				this.listLoading = true
				getList(params).then(response => {
			        this.list = response.data.content
			        this.total = response.data.totalElements
			        this.all = response.data.totalElements
			        this.listLoading = false
		      	})
			},
			//分页
		 	handleCurrentChange(val) {
				this.listQuery.page = val
				this.fetchData()
		    }
		}
	}
</script>
