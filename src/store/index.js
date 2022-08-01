import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    list: [],
    inputValue: "aaa",
    nextId: 5,
    viewKey: "all",
  },
  getters: {
    unDoneLength(state) {
      return state.list.filter((x) => x.done === false).length;
    },
    infoList(state) {
      if (state.viewKey === "all") {
        return state.list;
      }
      if (state.viewKey === "undone") {
        return state.list.filter((x) => !x.done);
      }
      if (state.viewKey === "done") {
        return state.list.filter((x) => x.done);
      }
      return state.list;
    },
  },
  mutations: {
    initList(state, list) {
      state.list = list;
    },
    setInputValue(state, val) {
      state.inputValue = val;
    },
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false,
      };
      state.list.push(obj);
      state.nextId++;
      state.inputValue = "";
    },
    removeItem(state, id) {
      const i = state.list.findIndex((x) => x.id === id);
      if (i !== -1) {
        state.list.splice(i, 1);
      }
    },
    changeStatus(state, param) {
      const i = state.list.findIndex((x) => x.id === param.id);
      if (i !== -1) {
        state.list[i].done = param.status;
      }
    },
    cleanDone(state) {
      state.list = state.list.filter((x) => x.done === false);
    },
    changeViewKey(state, key) {
      state.viewKey = key;
    },
  },
  actions: {
    getList(ctx) {
      axios.get("/list.json").then(({ data }) => {
        ctx.commit("initList", data);
      });
    },
  },
  modules: {},
});
