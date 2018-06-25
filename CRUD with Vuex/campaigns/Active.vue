<template>
  <!-- eslint-disable -->
  <div class="m-grid__item m-grid__item--fluid m-wrapper">
    <div class="m-content">
      <div class="m-portlet m-portlet--mobile">
        <div class="m-portlet__head">
          <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
              <h3 class="m-portlet__head-text">
                {{ lang('adCampaigns.activeCampaigns') }}
              </h3>
            </div>
          </div>
        </div>
        <div class="m-portlet__body">
          <div class="m-section">
            <div class="m-section__content">
              <div class="form-group m-form__group">
                <label for="exampleSelect1">
                  {{ lang('adCampaigns.company') }}
                </label>
                <select class="form-control m-input col-md-4" id="exampleSelect1">
                  <option>
                    {{ lang('adCampaigns.allCompanies') }}
                  </option>
                </select>
              </div>
              <b-table
                bordered
                class="table-responsive-sm"
                ref="table"
                :items="provider"
                :fields="fields"
                :current-page="pagination.current_page"
                :per-page="pagination.per_page"
              >
              <template slot="actions" slot-scope="data">
                <router-link :to="{ path: '/advertising/campaigns/edit/' + data.item.id }" tag="button" class="btn btn-primary btn-sm btn-action">
                  <i class="fa fa-wrench" aria-hidden="true"></i>
                  {{ lang('main.edit') }}
                </router-link>
                <button @click.prevent="destroyAlert(data.item.id, 'deleteRecord', 'adCampaigns.deleteWarning')" class="btn btn-danger btn-sm btn-action">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                  {{ lang('main.delete') }}
                </button>
              </template>
              <template slot="publicity_status" slot-scope="data">
                <i v-if="data.item.publicity_status" class="fa fa-check" aria-hidden="true"></i>
                <i v-else class="fa fa-times" aria-hidden="true"></i>
              </template>
              </b-table>
              <b-pagination
                :total-rows="pagination.total"
                :per-page="pagination.per_page"
                v-model="pagination.current_page"
                prev-text="Prev"
                next-text="Next"
                align="center"
                hide-goto-end-buttons
              >
              </b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: Filter the campaigns by company ids
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Active',
  data() {
    return {
      pagination: {
        current_page: 1,
        total_pages: 1,
        per_page: 20,
        total: 20,
      },
      search: '',
      fields: [
        {
          key: 'name',
          label: lang('adCampaigns.campaign'),
        },
        {
          key: 'lanalyst',
          label: lang('adCampaigns.leadAnalyst'),
        },
        {
          key: 'cost_per_click',
          label: lang('adCampaigns.cpc'),
        },
        {
          key: 'clicks',
          label: lang('adCampaigns.clicks'),
        },
        {
          key: 'change',
          label: lang('adCampaigns.change'),
        },
        {
          key: 'cost',
          label: lang('adCampaigns.cost'),
        },
        {
          key: 'avgspend',
          label: lang('adCampaigns.avgDlySpend'),
        },
        {
          key: 'budget_remaining',
          label: lang('adCampaigns.budgetRemainig'),
        },
        {
          key: 'end_date',
          label: lang('adCampaigns.lastFullDay'),
        },
        {
          key: 'days_remaining',
          label: lang('adCampaigns.daysRemaining'),
        },
        {
          key: 'finish',
          label: lang('adCampaigns.estFinish'),
        },
        {
          key: 'actions',
          label: lang('main.actions'),
        },
      ],
    };
  },
  computed: {
    ...mapGetters('campaigns', ['campaigns']),
  },
  methods: {
    ...mapActions('campaigns', [
      'loadCampaigns',
      'deleteCampaign',
    ]),
    provider(context, callback) {
      this.loadCampaigns({
        page: context.currentPage,
        limit: context.perPage,
      })
        .then(() => {
          this.pagination = Object.assign({}, this.$store.state.campaigns.campaigns.pagination);
          callback(this.campaigns);
          window.Bus.$emit('page.ready');
        })
        .catch(() => {
          callback([]);
        });
    },
    deleteRecord(id) {
      this.deleteCampaign({ id })
        .then(() => {
          this.success('adCampaigns.destroySuccess')
            .then(() => this.reloadPage());
        })
        .catch(() => this.fail('adCampaigns.destroyFail'));
    },
  },
};
</script>

<style lang="scss" type="text/scss"></style>
