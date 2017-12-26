<template>
	<div class="app-container">
		<el-form ref="form" :model="form">
			<el-form-item>
				<el-col :span="2" style="text-align: center;">消息编号</el-col>
				<el-col :span="4">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">创建时间</el-col>
				<el-col :span="4">
					<el-date-picker type="datetime" placeholder="点击选择时间区间" v-model="form.date"></el-date-picker>
				</el-col>
				<el-col :span="2" style="text-align: center;">询价量</el-col>
				<el-col :span="4">
					<el-input v-model="form.mobile" placeholder="请求验真的次数"></el-input>
				</el-col>
				<el-col :span="2" style="text-align: center;">发布人</el-col>
				<el-col :span="4">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-col :span="2" style="text-align: center;">商品类型</el-col>
				<el-col :span="4">
					<el-select v-model="form.region1" placeholder="全部商品">
						<el-option label="石油焦" value="a"></el-option>
						<el-option label="煅后焦" value="b"></el-option>
						<el-option label="海绵焦" value="c"></el-option>
						<el-option label="针状焦" value="d"></el-option>
						<el-option label="弹丸焦" value="e"></el-option>
					</el-select>
				</el-col>
				<el-col :span="2" style="text-align: center;">消息类型</el-col>
				<el-col :span="4">
					<el-select v-model="form.region2" placeholder="全部招标">
						<el-option label="全部招标" value="1"></el-option>
						<el-option label="供应招标" value="2"></el-option>
						<el-option label="采购招标" value="3"></el-option>
					</el-select>
				</el-col>
				<el-col :span="2" style="text-align: center;">消息状态</el-col>
				<el-col :span="4">
					<el-select v-model="form.region3" placeholder="全部">
						<el-option label="全部" value="one"></el-option>
						<el-option label="未验证" value="two"></el-option>
						<el-option label="验证中" value="three"></el-option>
						<el-option label="已招标" value="four"></el-option>
					</el-select>
				</el-col>
				<el-col :span="2" style="text-align: center;">焦小姐</el-col>
				<el-col :span="4">
					<el-input v-model="form.mobile"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit" style="margin-left: 2%;">查询</el-button>
			</el-form-item>
		</el-form>
		<el-col :span="4" style="text-align: left;line-height: 2;">查询数量：{{4}}</el-col>
		<el-button type="primary" @click="onSubmit" style="float: right;margin-bottom: 20px;">添加消息</el-button>
		<el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
			<el-table-column align="center" label='招标号' width="95">
				<template slot-scope="scope">
					{{scope.$index}}
				</template>
			</el-table-column>
			<el-table-column label="商品类型">
				<template slot-scope="scope">
					{{scope.row.title}}
				</template>
			</el-table-column>
			<el-table-column label="消息类型" width="110" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.author}}</span>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" width="110" align="center">
				<template slot-scope="scope">
					{{scope.row.pageviews}}
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="消息状态" width="200">
				<template slot-scope="scope">
					<span>{{scope.row.display_time}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="发布人 " width="200">
				<template slot-scope="scope">
					<span>{{scope.row.display_time}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="货量（吨）" width="200">
				<template slot-scope="scope">
					<span>{{scope.row.display_time}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="询价量" width="200">
				<template slot-scope="scope">
					<span>{{scope.row.display_time}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="焦小姐" width="200">
				<template slot-scope="scope">
					<span>{{scope.row.display_time}}</span>
				</template>
			</el-table-column>
			<el-table-column class-name="status-col" label="操作" width="110" align="center">
				<template slot-scope="scope">
					<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	// import { getList } from '@/api/table'
	// export default {
	// 	data() {
	// 		return {
	// 			list: null,
	// 			listLoading: true,
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
	// 	filters: {
	// 		statusFilter(status) {
	// 			const statusMap = {
	// 				published: 'success',
	// 				draft: 'gray',
	// 				deleted: 'danger'
	// 			}
	// 			return statusMap[status]
	// 		}
	// 	},
	// 	created() {
	// 		this.fetchData()
	// 	},
	// 	methods: {
	// 		onSubmit() {
	// 			this.$message('submit!')
	// 		},
	// 		fetchData() {
	// 			this.listLoading = true
	// 			getList(this.listQuery).then(response => {
	// 				console.log(response)
	// 				this.list = response.data.items
	// 				this.listLoading = false
	// 			})
	// 		}
	// 	}
	// }
</script>
