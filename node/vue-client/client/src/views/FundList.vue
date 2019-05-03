 <template>
  <div class="fundlist">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
          <!-- 筛选 -->
          <el-form-item label="按照时间筛选:">
            <el-date-picker
                v-model="search_data.starttime"
                type="datetime"
                placeholder="选择开始时间"
                
                >
                </el-date-picker>
                --
                  <el-date-picker
                v-model="search_data.endtime"
                type="datetime"
                placeholder="选择结束时间"
                
                >
                </el-date-picker>
                  <el-form-item >
          <el-button type="primary" size="large" style="margin-left:10px;" icon="search" @click="handleSearch()">筛选</el-button>
        </el-form-item>
          </el-form-item>
        <el-form-item class="btnRight">
          <el-button type="primary" size="large" icon="view" 
             v-if="user.identity=='manager'"
           @click="handleAdd()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-if="tableData.length>0"
      :data="tableData"
      max-height="450px"
      border
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
      <el-table-column prop="data" label="创建时间" align="center" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.data }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
      <el-table-column prop="descript" label="收支描述" align="center" width="180"></el-table-column>
      <el-table-column prop="income" label="收入" align="center" width="170">
        <template slot-scope="scope">
          <span style="color:#06c685">{{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expend" label="支出" align="center" width="170">
        <template slot-scope="scope">
          <span style="color:red">{{ scope.row.expend }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cash" label="账户现金" align="center" width="170">
        <template slot-scope="scope">
          <span style="color:#4db3ff">{{ scope.row.cash }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center" width="220"></el-table-column>
      <el-table-column label="操作" prop="operation" align="center" width="320"  v-if="user.identity=='manager'">
        <template slot-scope="scope">
          <el-button size="small" icon="edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            icon="delete"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="paginations.page_index"
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <Dialog :dialog="dialog" :formData="formData" @update="getProfile"></Dialog>
  </div>
</template>
 
 <script>
import Dialog from "../components/Dialog.vue";
export default {
  name: "fundlist",
  components: { Dialog },
  data() {
    return {
        search_data:{
            starttime:'',
            endtime:''
        },
        filterTableData:[],
      paginations: {
        page_index: 1, //默认显示第一页
        total: 0,
        page_size: 5, //一页显示五条
        page_sizes: [5, 10, 15, 20], //每一页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" //翻页属性
      },
      formData: {
        type: "",
        descript: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      tableData: [],
      allTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  computed: {
      user(){
          return this.$store.getters.user;
      }
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      //获取表格数据
      this.$axios
        .get("/api/profiles")
        .then(res => {
          console.log(res.data);
          this.allTableData = res.data;
          this.filterTableData=res.data;
          this.setPaginations();
        })
        .catch(err => console.log(err));
    },
    //编辑
    handleEdit(index, row) {
      (this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      }),
        (this.formData = {
          type: row.type,
          descript: row.descript,
          income: row.income,
          expend: row.expend,
          cash: row.cash,
          remark: row.remark,
          id: row._id
        });
    },
    //删除
    handleDelete(index, row) {
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message({
          message: "数据删除成功！",
          type: "success"
        });
        this.getProfile();
      });
    },
    //添加
    handleAdd() {
      (this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      }),
        (this.formData = {
          type: "",
          descript: "",
          income: "",
          expend: "",
          cash: "",
          remark: "",
          id: ""
        });
    },
    handleSizeChange(page_size) {
        //切换size
        this.paginations.page_index=1;
        this.paginations.page_size=page_size
         this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
        //获取到当前页
        let index = this.paginations.page_size*(page-1);
        //数据的总数
        let nums = this.paginations.page_size*page
        //容器
        let tables=[];
        for(let i=index ; i<nums ;i++){
            if(this.allTableData[i]){
                tables.push(this.allTableData[i]);
            }
            this.tableData=tables;
        }
    },
    setPaginations() {
      //分页属性的获取
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSearch(){
        //筛选功能
        if(!this.search_data.starttime||!this.search_data.endtime){
             this.$message({
                message: "请选择时间区间",
                type: "danger"
                });
                this.getProfile();
                return;
        }
        const sTime =this.search_data.starttime.getTime();
        const eTime =this.search_data.endtime.getTime();
        this.allTableData =this.filterTableData.filter(item =>{
            //    let data =new Data (item.data);
            let data = new Date(item.data);
               let time =data.getTime();
               return time >=sTime && time <=eTime
        })
        this.setPaginations();
    }
  }
};
</script>
 
 <style scoped>
.fundlist {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  position: relative;
  top: -5px;
  left: 950px;
}
.pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
 