<template>
  <div id="app-wrapper">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @change="handleInputChange"
    />
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <template #renderItem="{ item }">
        <a-list-item>
          <!-- 复选框 -->
          <a-checkbox
            :checked="item.done"
            @change="cbStatusChanged($event, item.id)"
            >{{ item.info }}</a-checkbox
          >
          <!-- 删除链接 -->
          <a slot="actions" @click="removeItemById(item.id)">删除</a>
        </a-list-item>
      </template>

      <!-- footer区域 -->
      <div class="footer" slot="footer">
        <span>{{ unDoneLength }} 条剩余</span>
        <a-button-group>
          <a-button
            :type="viewKey === 'all' ? 'primary' : 'default'"
            @click="changeList('all')"
            >全部</a-button
          >
          <a-button
            :type="viewKey === 'undone' ? 'primary' : 'default'"
            @click="changeList('undone')"
            >未完成</a-button
          >
          <a-button
            :type="viewKey === 'done' ? 'primary' : 'default'"
            @click="changeList('done')"
            >已完成</a-button
          >
        </a-button-group>
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapState(["list", "inputValue", "viewKey"]),
    ...mapGetters(["unDoneLength", "infoList"]),
  },
  data() {
    return {};
  },
  methods: {
    handleInputChange(e) {
      this.$store.commit("setInputValue", e.target.value);
    },
    addItemToList() {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning("文本不能为空！");
      }
      this.$store.commit("addItem");
    },
    removeItemById(id) {
      this.$store.commit("removeItem", id);
    },
    cbStatusChanged(e, id) {
      this.$store.commit("changeStatus", {
        id: id,
        status: e.target.checked,
      });
    },
    clean() {
      this.$store.commit("cleanDone");
    },
    changeList(key) {
      this.$store.commit("changeViewKey", key);
    },
  },
  created() {
    this.$store.dispatch("getList");
  },
};
</script>
<style scoped>
#app-wrapper {
  padding: 30px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid #f0f0f0;
}
</style>
