import * as types from 'store/campaigns/MutationTypes';

export default {
  /**
   * Retrieve all the campaigns
   *
   * @param commit
   */
  loadCampaigns({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(window.url('/fb/campaigns', true))
        .then((response) => {
          commit(types.LOAD_CAMPAIGNS, response.data);
          resolve(response);
        })
        .catch(response => reject(response.data));
    });
  },
  /**
   * Retrieve an existing project
   *
   * @param commit
   * @param params
   */
  loadCampaign({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios.get(window.url(`/advertising/campaigns/${params.id}`, true), { id: params.id })
        .then((response) => {
          commit(types.LOAD_CAMPAIGN, response.data);
          resolve(response);
        })
        .catch(response => reject(response.data));
    });
  },
  /**
   * Delete an existing project
   *
   * @param commit
   * @param params
   * @returns Promise
   */
  deleteCampaign({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios.delete(window.url(`/advertising/campaigns/${params.id}`, true), { params })
        .then((response) => {
          commit(types.DELETE_CAMPAIGN, response.data);
          resolve(response);
        })
        .catch(response => reject(response.data));
    });
  },
  /**
   * Persist a new project
   *
   * @param commit
   * @param params
   * @returns Promise
   */
  createCampaign({ commit }, params) {
    // format the dates
    params.start_date = window.dateTimeToDate(params.start_date);
    params.end_date = window.dateTimeToDate(params.end_date);

    return new Promise((resolve, reject) => {
      axios.post(window.url('/advertising/campaigns', true), params)
        .then((response) => {
          commit(types.CREATE_CAMPAIGN, response.data);
          resolve(response);
        })
        .catch(response => reject(response.data));
    });
  },
  /**
   * Update an existing project
   *
   * @param commit
   * @param params
   * @returns Promise
   */
  updateCampaign({ commit }, params) {
    // set the method to PUT in order to use proper API route
    params['_method'] = 'PUT';

    // format the dates
    params.start_date = window.dateTimeToDate(params.start_date);
    params.end_date = window.dateTimeToDate(params.end_date);

    return new Promise((resolve, reject) => {
      axios.post(window.url(`/advertising/campaigns/${params.id}`, true), params)
        .then((response) => {
          commit(types.UPDATE_CAMPAIGN, response.data);
          resolve(response);
        })
        .catch(response => reject(response.data));
    });
  },
};
