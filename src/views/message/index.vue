<template>
	<div class="app-container calendar-list-container">
		<!--查询消息-->
		<el-form>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">消息编号</el-col>
				<el-col :span="4">
					<el-input v-model="listQuery.tenderNum"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">创建时间</el-col>
				<el-col :span="4">
					<el-date-picker type="datetime" placeholder="点击选择时间区间" v-model="listQuery.createTime"></el-date-picker>
				</el-col>
				<el-col :span="2" style="text-align: center;">询价量</el-col>
				<el-col :span="4">
					<el-input v-model="listQuery.consultCount" placeholder="请求验真的次数"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">发布人</el-col>
				<el-col :span="4">
					<el-input v-model="listQuery.friendNickname"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">商品类型</el-col>
				<el-col :span="4">
					<el-select v-model="listQuery.petrolType" placeholder="全部商品">
						<el-option v-for="item in petrolTypeOptions" :key="item" :label="item" :value="item">
        				</el-option>
					</el-select>
				</el-col>
				<el-col :span="2" style="text-align: center;">消息类型</el-col>
				<el-col :span="4">
					<el-select v-model="listQuery.type" placeholder="全部招标">
						<el-option v-for="item in typeOptions" :key="item" :label="item" :value="item">
        				</el-option>
					</el-select>
				</el-col>
				<el-col :span="2" style="text-align: center;">消息状态</el-col>
				<el-col :span="4">
					<el-select v-model="listQuery.status" placeholder="草稿">
						<el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
        				</el-option>
					</el-select>
				</el-col>
				<el-col :span="2" style="text-align: center;">焦小姐</el-col>
				<el-col :span="4">
					<el-input v-model="listQuery.friendRealname"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button @click="query()" type="primary" style="margin-left: 2%;">查询</el-button>
			</el-form-item>
		</el-form>
		<el-col :span="4" style="text-align: left;line-height: 2;">查询数量：{{total}}</el-col>
		<el-button type="primary" style="float:right;margin-bottom:20px;"><router-link :to="{path:'/message/editContent'}">添加消息</router-link></el-button>
		<!--消息列表-->
		<el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
			<el-table-column align="center" label='招标号' width="95px">
				<template slot-scope="scope">
					{{scope.row.tenderNum}}
				</template>
			</el-table-column>
			<el-table-column label="商品类型">
				<template slot-scope="scope">
					{{scope.row.petrolType}}
				</template>
			</el-table-column>
			<el-table-column label="消息类型" width="110px" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.type}}</span>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" width="110px" align="center">
				<template slot-scope="scope">
					{{scope.row.createTime}}
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="消息状态" width="200px">
				<template slot-scope="scope">
					<span>{{scope.row.status}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="发布人 " width="200px">
				<template slot-scope="scope">
					<span>{{scope.row.friendNickname}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="货量（吨）" width="200px">
				<template slot-scope="scope">
					<span>{{scope.row.totalQuantity}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="询价量" width="200px">
				<template slot-scope="scope">
					<span>{{scope.row.consultCount}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="焦小姐" width="200px">
				<template slot-scope="scope">
					<span>{{scope.row.friendRealname}}</span>
				</template>
			</el-table-column>
			<el-table-column class-name="status-col" label="操作" width="110" align="center">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="confirmTrue()">验真</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--验真-->
		<el-dialog title="验真凭据" :visible.sync="dialogFormVisible">
			<el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
				<div style='margin:0 0 5px 20px'>可多选</div>
				<el-form-item>
					<el-checkbox-group v-model="checkboxVal">
						<el-checkbox label="1">已取得质检报告</el-checkbox><br />
						<el-checkbox label="2">已取得其它验真凭据</el-checkbox><br />
						<el-checkbox label="3">已电话联系发布消息人核实信息</el-checkbox><br />
						<el-checkbox label="4">已取得底价</el-checkbox><br />
						<el-checkbox label="0">其他</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item>
					<el-input type="textarea" placeholder="填写其他验真信息（限制150字符）" v-model="temp.remark" >
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary">补充完善资料</el-button>
				<el-button @click="dialogFormVisible = false">无需完善</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { getList,confirmMessage} from '@/api/message'

	export default {
		data() {
			return {
				petrolTypeOptions: ['石油焦','煅后焦','海绵焦','针状焦','弹丸焦'],
				typeOptions: ['全部招标','供应招标','采购招标'],
				statusOptions: ['草稿','未验证','验证中','已验证','已招标'],
				checkboxVal:[],
				temp: {
					remark: '',
					title: '',
					type: ''
				},
				dialogFormVisible: false,
				list: null,
				total: null,
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
					status: '',
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
			}
		},
		created() {
				this.fetchData()
		},
		methods: {
			confirmTrue() {
				this.dialogFormVisible = true
//				confirmMessage(params).then(reponse => {
//					console.log(response.data)
//				})
			},
		//	 		handleUpdate(row) {
		//		      this.temp = Object.assign({}, row) 
		//		      this.temp.timestamp = new Date(this.temp.timestamp)
		//		      this.dialogStatus = 'update'
		//		      this.dialogFormVisible = true
		//		      this.$nextTick(() => {
		//		        this.$refs['dataForm'].clearValidate()
		//		      })
		//		    },
		//			addMessage() {
		//				this.$router.push({ path: '/editContent' })
		//			},
			//获取消息列表
			fetchData() {
				this.listLoading = true
			 	getList(this.listQuery).then(response => {
			        this.list = response.data.content
			        this.listLoading = false
		      	})
			},
			//查询列表
			queryData() {
				this.listLoading = true
			 	getList(this.listQuery).then(response => {
			        this.list = response.data.content
			        this.total = response.data.totalElements
			        this.listLoading = false
		      	})
			},
			query(){
				this.listQuery.pageNum = 1
				this.queryData()
			}
		}
	}
</script>