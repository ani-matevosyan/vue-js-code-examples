<template>
  <!-- eslint-disable -->
  <div>
    <range-picker ref="rangePicker" :options="options"></range-picker>
  </div>
</template>

<script>
import RangePicker from 'components/common/RangePicker';

export default {
  name: 'DateRangeTest',
  components: {
    'range-picker': RangePicker,
  },
  data() {
    return {
      options: {
        showRanges: true,
        minDate: false,
        opens: 'right',
        maxDate: false,
        autoApply: true,
        startDate: moment('2017-11-10'),
        endDate: moment('2017-11-12'),
      },
    };
  },
  mounted() {
    window.Bus.$emit('page.ready');
    this.$refs.rangePicker.$on('rangepicker.change', this.onDateChange);
  },
  methods: {
    onDateChange(payload) {
      console.dir(payload);
    },
  },
};
</script>

<style lang="scss" type="text/scss"></style>
