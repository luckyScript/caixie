import * as types from '../mutation-types';
import api from '../../service/index'

const state = {
  info: null
};

const mutations = {
  [types.LIST](state, info) {
    state.info = info;
  }
};

const actions = {
  async listTest({commit}) {
    const result = await api.listGetReq();
    commit(types.LIST, result);
    console.log("result");
    return result;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
