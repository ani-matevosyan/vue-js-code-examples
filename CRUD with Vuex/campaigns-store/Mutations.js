import * as types from 'store/campaigns/MutationTypes';

export default {
  [types.LOAD_CAMPAIGNS](state, response) {
    state.campaigns = response.data;
  },
  [types.DELETE_CAMPAIGN](state) {
    state.campaign = null;
  },
  [types.CREATE_CAMPAIGN](state, response) {
    state.campaign = response.data;
  },
  [types.LOAD_CAMPAIGN](state, response) {
    state.campaign = response.data;
  },
  [types.UPDATE_CAMPAIGN](state, response) {
    state.campaign = response.data;
  },
};
