<template>
  <!-- eslint-disable -->
  <div :id="id" class="btn-group range-picker">
    <a class="btn btn-default btn-rounded calendar-picker" data-toggle="collapse" aria-expand="true">
      <i class="fa fa-calendar"></i>
      <span class="date-range-label">{{ dateRange }}</span>
    </a>
  </div>
</template>

<script>
const pickerOptions = {
  showRanges: true,
  minDate: false,
  opens: 'right',
  maxDate: false,
  autoApply: true,
  startDate: moment(),
  endDate: moment().add(7, 'days'),
};

export default {
  name: 'RangePicker',
  props: {
    options: {
      type: Object,
      default() {
        return pickerOptions;
      },
    },
    id: {
      type: String,
      default() {
        return 'tara-range-picker';
      },
    },
  },
  data() {
    return {
      rangePicker: null,
      start: this.options.startDate,
      end: this.options.endDate,
    };
  },
  computed: {
    dateRange() {
      const start = moment(this.start);
      const end = moment(this.end);
      return `${start.format('MMM DD, YYYY')} - ${end.format('MMM DD, YYYY')}`;
    },
  },
  watch: {
    options: {
      handler(newValue) {
        this.$nextTick(() => {
          const rangePicker = $(`#${this.id}`).data('daterangepicker');
          this.start = newValue.startDate;
          this.end = newValue.endDate;

          if (typeof rangePicker !== 'undefined') {
            rangePicker.setStartDate(this.start);
            rangePicker.setEndDate(this.end);
          }
        });
      },
      deep: true,
    },
  },
  mounted() {
    const theOptions = pickerOptions;
    this.start = moment(this.options.startDate);
    this.end = moment(this.options.endDate);

    Object.keys(this.options).map((key) => {
      theOptions[key] = this.options[key];
      return key;
    });

    this.$nextTick(() => {
      const rangePicker = $(`#${this.id}`)
        .daterangepicker(theOptions)
        .on('apply.daterangepicker', (e, picker) => {
          this.start = picker.startDate;
          this.end = picker.endDate;

          const data = {
            start: this.start,
            end: this.end,
          };

          this.$emit('rangePicker.change', data);
        });
      this.rangePicker = rangePicker.data('daterangepicker');
    });
  },
  methods: {
    changeDateRange(payload) {
      if (payload.date) {
        this.start = payload.date[0];
        this.end = payload.date[1];
      }
    },
  },
};
</script>

<style lang="scss" type="text/scss" scoped>
  .range-picker {
    margin: 10px;
    .fa {
      margin-right: 5px;
    }
  }
</style>
