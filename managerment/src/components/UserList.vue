<template>
  <div class="container">
    <h1>Goods list</h1>
    <a-row>
      <a-form
        :model="searchFormState"
        name="horizontal_login"
        layout="inline"
        autocomplete="off"
      >
        <a-form-item label="用户名称" name="username">
          <a-input v-model:value="searchFormState.username"> </a-input>
        </a-form-item>

        <a-form-item label="状态" name="status">
          <a-select
            ref="select"
            v-model:value="searchFormState.status"
            style="width: 120px"
          >
            <a-select-option value="1">上架</a-select-option>
            <a-select-option value="0">下架</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item>
          <a-button type="primary">搜索</a-button>
        </a-form-item>
      </a-form>
      <a-button type="primary" @click="showModal">添加</a-button>
      <a-modal
        :title="modalTitle"
        ref="modalRef"
        v-model:open="open"
        :wrap-style="{ overflow: 'hidden' }"
        cancelText="取消"
        okText="确认"
        :maskClosable="closeable"
        @ok="handleOk"
        :afterClose="afterClose"
      >
        <a-form
          ref="formRef"
          :model="goods"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :rules="rules"
        >
          <a-form-item label="用户名称" name="username">
            <a-input v-model:value="goods.name" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item label="用户身份" name="identity">
            <a-input-number
              v-model:value="goods.price"
              prefix="￥"
              :formatter="
                (value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              "
              :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
              placeholder="请输入用户身份"
              style="width: 100%"
            />
          </a-form-item>
          <!-- <a-form-item label="商品数量" name="num">
            <a-input-number
              :min="0"
              v-model:value="goods.num"
              placeholder="请输入商品数量"
              style="width: 100%"
            />
          </a-form-item> -->
          <a-form-item label="是否强制下线">
            <a-switch
              :checkedValue="checkedValue"
              :unCheckedValue="unCheckedValue"
              v-model:checked="goods.status"
              checkedChildren="上线"
              unCheckedChildren="下线"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-row>
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      bordered
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, text, record, index }">
        <template v-if="column.dataIndex === 'index'">
          {{ index + 1 }}
        </template>
        <template v-if="column.dataIndex === 'price'">
          {{ text / 100 }}
        </template>
        <template v-if="column.dataIndex === 'status'">
          <a-tag color="#f50" v-if="text != 1">下线</a-tag>
          <a-tag color="#87d068" v-if="text == 1">上线</a-tag>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a-button @click="showModal(event, record)">修改</a-button>
          <a-popconfirm
            v-if="dataSource.length"
            :title="'确定要删除【' + record.name + '】吗?'"
            @confirm="onDelete(record.id)"
          >
            <a-tag color="red">删除</a-tag>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, toRaw } from "vue";
import axios from "axios";

// 表格数据
const dataSource = ref([]);

const columns = ref([
  {
    title: "序号",
    dataIndex: "index",
  },
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "用户身份",
    dataIndex: "identity",
    key: "identity",
  },
  // {
  //   title: "商品数量",
  //   dataIndex: "num",
  //   key: "num",
  // },
  {
    title: "用户状态",
    dataIndex: "status",
    key: "status",
    filters: [
      {
        text: "上线",
        value: "1",
      },
      {
        text: "下线",
        value: "0",
      },
    ],
    width: "120px",
  },
  {
    title: "操作",
    dataIndex: "operation",
  },
]);

const loading = ref(true);

const pagination = ref({
  position: ["bottomLeft"],
  showSizeChanger: true,
  pageSizeOptions: [1, 2, 5, 10],
  defaultPageSize: 2,
  pageSize: 2,
  current: 1,

  //   showQuickJumper: true,
});
onMounted(() => {
  // mock.js 模拟数据
  axios.get("/mock/user.json").then((res) => {
    console.log(res);
    if (res.data.code === 200) {
      dataSource.value = res.data.data;
      loading.value = false;
    }
  });
});

const onDelete = (id) => {
  console.log("删除用户", id);
};

const handleTableChange = (page, filters, sorter) => {
  console.log("分页参数", page);
  pagination.value = page;
  console.log("筛选参数", filters);
  console.log("排序参数", sorter);
};

// 添加
const open = ref(false);
const modalRef = ref(null);
const closeable = false;
const formRef = ref();
const modalTitle = ref("添加用户");
const showModal = (e, record) => {
  if (!record) {
    // 添加
    modalTitle.value = "添加用户";
    // 重置 goods
    goods.id = undefined;
    goods.name = "";
    goods.price = 0;
    goods.status = 1;
    goods.num = 1;
  } else {
    // 修改
    modalTitle.value = "修改用户";
    // TODO (获取数据)
    goods.id = record.id;
    goods.name = record.name;
    goods.price = record.price / 100;
    goods.status = record.status;
    goods.num = record.num;
  }
  // 显示
  open.value = true;
};

const checkedValue = 1;
const unCheckedValue = 0;
const goods = reactive({
  name: "",
  price: 0,
  status: 1,
  num: 1,
});
const labelCol = {
  style: {
    width: "150px",
  },
};
const wrapperCol = {
  span: 14,
};

const rules = {
  name: [
    {
      required: true,
      message: "请输入用户名称",
      trigger: "blur",
    },
  ],
  // price: [
  //   {
  //     required: true,
  //     message: "请输入商品价格",
  //     trigger: "blur",
  //   },
  // ],
  num: [
    {
      required: true,
      message: "请输入用户数量",
      trigger: "blur",
    },
  ],
};

const handleOk = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log("values", goods);
      // TODO(保存数据)
      open.value = false;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const afterClose = () => {
  formRef.value.resetFields();
};

// 搜索
const searchFormState = reactive({
  username: "",
  password: "",
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #efeeee;
  color: #000;
}

.ant-table-cell:last-of-type .ant-tag {
  cursor: pointer;
}
</style>
