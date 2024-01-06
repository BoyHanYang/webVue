<template>
    <a-table
      :loading="loading"
      :columns="columns"
      :data-source="data"
      :row-selection="rowSelection"
      rowKey="id"
      :pagination="pagination"
      :defaultExpandedRowKeys="defaultExpandedRowKeys"
    >
      <template #bodyCell="{ column, text, record, index }">
        <template v-if="column.dataIndex === 'type'">
          <a-tag color="#f50" v-if="text != 1">按钮</a-tag>
          <a-tag color="#87d068" v-if="text == 1">菜单</a-tag>
        </template>
      </template>
    </a-table>
  </template>
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  const columns = [
    {
      title: "菜单名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "菜单链接",
      dataIndex: "url",
      key: "url",
      width: "12%",
    },
    {
      title: "菜单类型",
      dataIndex: "type",
      width: "30%",
      key: "type",
    },
    {
      title: "排序号",
      dataIndex: "orderNum",
      width: "30%",
      key: "orderNum",
    },
  ];
  const data = ref([]);
  const loading = ref(true);
  const pagination = ref(false);
  const defaultExpandedRowKeys = ref([1]);
  
  onMounted(() => {
    // mock.js 模拟数据
    axios.get("/mock/menu.json").then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        data.value = res.data.data;
        loading.value = false;
      }
    });
  });
  const rowSelection = ref({
    checkStrictly: false,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  });
  </script>