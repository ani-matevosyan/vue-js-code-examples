<template>
  <!-- eslint-disable -->
  <div class="m-content">
    <div class="m-portlet m-portlet--mobile">
      <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
          <div class="m-portlet__head-title">
            <h3 class="m-portlet__head-text">
              {{ lang('adCampaigns.editCampaign') }}
            </h3>
          </div>
        </div>
      </div>

      <form class="m-form m-form--fit m-form--label-align-right">
        <div class="m-portlet__body">
          <div>
            <div class="form-group m-form__group row">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">{{ lang('adCampaigns.campaignName') }}</label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <input v-model="campaign.name" class="form-control m-input"
                       :placeholder="lang('adCampaigns.placeholderName')" v-validate="validationRules.name"
                       :data-vv-as="lang('adCampaigns.campaignName')" name="name" type="text">
                <span class="m-form__error" v-show="errors.has('name')">
                  {{ errors.first('name') }}
                </span>
              </div>
            </div>
            <div class="form-group m-form__group row">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">{{ lang('adCampaigns.purchases') }}</label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <input v-model="campaign.purchases" class="form-control m-input"
                       :placeholder="lang('adCampaigns.placeholderPurchases')"
                       v-validate="validationRules.purchases" :data-vv-as="lang('adCampaigns.purchases')"
                       name="purchases" type="number">
                <span class="m-form__error" v-show="errors.has('purchases')">
                  {{ errors.first('purchases') }}
                </span>
              </div>
            </div>
            <div class="form-group m-form__group row">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">{{ lang('adCampaigns.clicks') }}</label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <input v-model="campaign.clicks" class="form-control m-input"
                       :placeholder="lang('adCampaigns.placeholderClicks')" v-validate="validationRules.clicks"
                       :data-vv-as="lang('adCampaigns.clicks')" name="clicks" type="number">
                <span class="m-form__error" v-show="errors.has('clicks')">
                  {{ errors.first('clicks') }}
                </span>
              </div>
            </div>
            <div class="form-group m-form__group row">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">{{ lang('adCampaigns.impressions') }}</label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <input v-model="campaign.impressions" class="form-control m-input"
                       :placeholder="lang('adCampaigns.placeholderImpressions')"
                       v-validate="validationRules.impressions" :data-vv-as="lang('adCampaigns.impressions')"
                       name="impressions" type="number">
                <span class="m-form__error" v-show="errors.has('impressions')">
                  {{ errors.first('impressions') }}
                </span>
              </div>
            </div>
            <div class="form-group m-form__group row">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">{{ lang('adCampaigns.budget') }}</label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <input v-model="campaign.budget" class="form-control m-input"
                       :placeholder="lang('adCampaigns.placeholderBudget')" v-validate="validationRules.budget"
                       :data-vv-as="lang('adCampaigns.budget')" name="budget" type="number">
                <span class="m-form__error" v-show="errors.has('budget')">
                  {{ errors.first('budget') }}
                </span>
              </div>
            </div>
            <div class="form-group m-form__group row">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">{{ lang('adCampaigns.cpa') }}</label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <input v-model="campaign.cpa" class="form-control m-input"
                       :placeholder="lang('adCampaigns.placeholderCpa')" v-validate="validationRules.cpa"
                       :data-vv-as="lang('adCampaigns.cpa')" name="cpa" type="number">
                <span class="m-form__error" v-show="errors.has('cpa')">
                  {{ errors.first('cpa') }}
                </span>
              </div>
            </div>
            <div class="form-group m-form__group row">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">{{ lang('adCampaigns.conversionValue') }}</label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <input v-model="campaign.conversion_value" class="form-control m-input"
                       :placeholder="lang('adCampaigns.placeholderConversionValue')"
                       v-validate="validationRules.conversion_value"
                       :data-vv-as="lang('adCampaigns.conversionValue')" name="conversionValue" type="number">
                <span class="m-form__error" v-show="errors.has('conversion_value')">
                  {{ errors.first('conversion_value') }}
                </span>
              </div>
            </div>
            <div class="form-group m-form__group row">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">{{ lang('adCampaigns.nev') }}</label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <input v-model="campaign.nev" class="form-control m-input"
                       :placeholder="lang('adCampaigns.placeholderNev')" v-validate="validationRules.nev"
                       :data-vv-as="lang('adCampaigns.nev')" name="nev" type="number">
                <span class="m-form__error" v-show="errors.has('nev')">
                  {{ errors.first('nev') }}
                </span>
              </div>
            </div>
            <div class="form-group m-form__group row">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">{{ lang('adCampaigns.roas') }}</label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <input v-model="campaign.roas" class="form-control m-input"
                       :placeholder="lang('adCampaigns.placeholderRoas')" v-validate="validationRules.roas"
                       :data-vv-as="lang('adCampaigns.roas')" name="roas" type="number">
                <span class="m-form__error" v-show="errors.has('roas')">
                  {{ errors.first('roas') }}
                </span>
              </div>
            </div>
            <div class="form-group m-form__group row">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">{{ lang('adCampaigns.spend') }}</label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <input v-model="campaign.spend" class="form-control m-input"
                       :placeholder="lang('adCampaigns.placeholderSpend')" v-validate="validationRules.spend"
                       :data-vv-as="lang('adCampaigns.spend')" name="spend" type="number">
                <span class="m-form__error" v-show="errors.has('spend')">
                  {{ errors.first('spend') }}
                </span>
              </div>
            </div>
            <div class="form-group m-form__group row">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">{{ lang('adCampaigns.remaining') }}</label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <input v-model="campaign.remaining" class="form-control m-input"
                       :placeholder="lang('adCampaigns.placeholderRemaining')"
                       v-validate="validationRules.remaining" :data-vv-as="lang('adCampaigns.remaining')"
                       name="remaining" type="number">
                <span class="m-form__error" v-show="errors.has('remaining')">
                  {{ errors.first('remaining') }}
                </span>
              </div>
            </div>
            <div class="form-group m-form__group row">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">{{ lang('adCampaigns.costPerClick') }}</label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <input v-model="campaign.cost_per_click" class="form-control m-input"
                       :placeholder="lang('adCampaigns.placeholderCostPerClick')"
                       v-validate="validationRules.cost_per_click"
                       :data-vv-as="lang('adCampaigns.costPerClick')" name="cost_per_click" type="number">
                <span class="m-form__error" v-show="errors.has('cost_per_click')">
                  {{ errors.first('cost_per_click') }}
                </span>
              </div>
            </div>
            <div class="form-group m-form__group row">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">{{ lang('adCampaigns.startDate') }}</label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <datepicker required :input-class="'form-control m-input'"
                            value="campaign.start_date"
                            v-model="campaign.start_date"
                            :format="'yyyy-MM-dd'"
                            :data-vv-as="lang('adCampaigns.startDate')"
                            data-vv-name="start_date"
                            v-validate="validationRules.start_date">
                </datepicker>
                <span class="m-form__error" v-show="errors.has('start_date')">
                  {{ errors.first('start_date') }}
                </span>
              </div>
            </div>
            <div class="form-group m-form__group row">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">{{ lang('adCampaigns.endDate') }}</label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <datepicker required :input-class="'form-control m-input'"
                            value="campaign.end_date"
                            v-model="campaign.end_date"
                            :format="'yyyy-MM-dd'"
                            :data-vv-as="lang('adCampaigns.endDate')"
                            data-vv-name="end_date"
                            v-validate="validationRules.end_date">
                </datepicker>
                <span class="m-form__error" v-show="errors.has('end_date')">
                  {{ errors.first('end_date') }}
                </span>
              </div>
            </div>
            <div class="form-group m-form__group row border-0 m--padding-top-15 m--padding-bottom-15">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">
                {{ lang('main.status') }} :
              </label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <div class="m-radio-list">
                  <label class="m-radio">
                    <input type="radio" v-model="campaign.status" v-validate="validationRules.status"
                           :data-vv-as="lang('main.status')" name="status" value="1" data-vv-id="29"
                           aria-required="true" aria-invalid="false">
                    {{ lang('main.active') }} <span></span>
                  </label>
                  <label class="m-radio">
                    <input type="radio" v-model="campaign.status" v-validate="validationRules.status"
                           :data-vv-as="lang('main.status')" name="status" value="0" data-vv-id="30"
                           aria-required="true" aria-invalid="false">
                    {{ lang('main.inactive') }}<span></span>
                  </label>
                  <span class="m-form__error" v-show="errors.has('status')">
                    {{ errors.first('status') }}
                  </span>
                </div>
              </div>
            </div>
            <div class="form-group m-form__group row border-0 m--padding-top-15 m--padding-bottom-15">
              <label class="col-sm-4 col-xs-12 col-md-3 col-lg-2 col-xl-2 col-form-label">
                {{ lang('adCampaigns.report') }} :
              </label>
              <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 col-xs-12">
                <div class="m-radio-list">
                  <label class="m-radio">
                    <input type="radio" v-model="campaign.report" v-validate="validationRules.report"
                           :data-vv-as="lang('adCampaigns.report')" name="report" value="1">
                    {{ lang('main.yes') }} <span></span>
                  </label>
                  <label class="m-radio">
                    <input type="radio" v-model="campaign.report" v-validate="validationRules.report"
                           :data-vv-as="lang('adCampaigns.report')" name="report" value="0">
                    {{ lang('main.no') }} <span></span>
                  </label>
                  <span class="m-form__error" v-show="errors.has('report')">
                    {{ errors.first('report') }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="m-portlet__foot m-portlet__foot--fit">
          <div class="m-form__actions m-form__actions">
            <button class="btn btn-primary" @click.prevent="validateRequest">
              {{ lang('main.update') }}
            </button>
            <router-link :to="{path: '/advertising/campaigns/active'}" tag="button" class="btn mx-2">
              {{ lang('main.cancel') }}
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'CreateCampaigns',
  components: {
    Datepicker,
  },
  data() {
    return {
      validationRules: {
        name: 'required|max:191',
        status: 'numeric',
        report: 'numeric',
        purchases: 'numeric',
        clicks: 'numeric',
        impressions: 'numeric',
        checkout_init: 'numeric',
        budget: 'numeric',
        cpa: 'numeric',
        conversion_value: 'numeric',
        nev: 'numeric',
        roas: 'numeric',
        cost_per_click: 'numeric',
        start_date: 'required',
        end_date: 'required',
        spend: 'numeric',
        remaining: 'numeric',
      },
      campaign: {
        name: '',
        status: 1,
        report: 0,
        user_id: 5, // TODO retrieve user id from localStorage or ajax
        purchases: 0,
        clicks: 0,
        impressions: 0,
        checkout_init: 0,
        budget: 0,
        cpa: 0,
        conversion_value: 0,
        nev: 0,
        roas: 0,
        cost_per_click: 0,
        start_date: null,
        end_date: null,
        spend: 0,
        remaining: 0,
      },
    };
  },
  mounted() {
    this.retrieveCampaignData();
  },
  methods: {
    ...mapActions('campaigns', [
      'loadCampaign',
      'updateCampaign',
    ]),
    retrieveCampaignData() {
      const { id } = this.$route.params;
      this.loadCampaign({ id })
        .then(() => {
          this.campaign = Object.assign({}, this.$store.state.campaigns.campaign);
          window.Bus.$emit('page.ready');
        });
    },
    /**
     * Validate the current form data
     * Trigger the updateRecord method if the data is valid
     */
    validateRequest() {
      this.validate(this.updateRecord);
    },
    updateRecord() {
      this.updateCampaign(this.$data.campaign)
        .then(() => {
          this.success('adCampaigns.updateSuccess')
            .then(() => this.reloadPage());
        })
        .catch(() => this.fail('adCampaigns.updateFail'));
    },
  },
};
</script>

<style lang="scss" type="text/scss"></style>
