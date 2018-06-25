<template lang="html">
  <div class="tree-table">
    <div
      v-if="expandCollapseAll"
      :class="{ active: config.isFold}"
      class="expandCollapseAll btn btn-link"
      @click="config.isFold = !config.isFold">
      {{ lang('main.expandCollapseAll') }}
    </div>
    <zk-table
      ref="table"
      :sum-text="lang('main.total')"
      :empty-text="lang('main.noData')"
      :data="tableData"
      :columns="columns"
      :stripe="config.stripe"
      :border="config.border"
      :show-header="config.showHeader"
      :show-summary="config.showSummary"
      :summary-method="totalSum"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :heat-map="heatMap"
      :show-row-hover="config.showRowHover"
      :show-index="config.showIndex"
      :tree-type="config.treeType"
      :is-fold="config.isFold"
      :expand-type="config.expandType"
      :selection-type="config.selectionType"
      index-text="#">
      <template slot-scope="scope" v-for="item in templates" :slot="item.template">
        {{ formatMoney(scope.row[item.prop]) }}
      </template>
    </zk-table>
  </div>
</template>

<script>
import ZkTable from 'vue-table-with-tree-grid';

export default {
  name: 'TreeTable',
  components: {
    ZkTable,
  },
  props: {
    config: {
      type: Object,
      default() {
        return {
          stripe: false,
          border: true,
          showHeader: true,
          showSummary: true,
          showRowHover: true,
          showIndex: false,
          treeType: true,
          isFold: true,
          expandType: false,
          selectionType: false,
        };
      },
    },
    expandCollapseAll: {
      type: Boolean,
      default() {
        return false;
      },
    },
    hierarchy: {
      type: Array,
      default() {
        return ['campaign_id', 'adset_id', 'ad_id'];
      },
    },
    hierarchyNames: {
      type: Array,
      default() {
        return ['campaign_name', 'adset_name', 'ad_name'];
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    firstRowIcon: {
      type: Boolean,
      default() {
        return false;
      },
    },
    heatMap: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  computed: {
    templates() {
      return this.columns.filter(item => item.template);
    },
  },
  mounted() {
    const thisOne = this;
    this.initialTableData();
    $('body').undelegate('.zk-table__header th', 'click').delegate('.zk-table__header th', 'click', function () {
      $('.orderDesc').not($(this)).removeClass('orderDesc');
      $('.orderAsc').not($(this)).removeClass('orderAsc');
      const columnNum = parseInt($(this).index(), 10);
      const columnName = thisOne.columns[columnNum].prop;
      $(this).toggleClass('orderAsc');
      if ($(this).hasClass('orderAsc')) {
        $(this).removeClass('orderDesc');
        thisOne.recursiveSort(thisOne.tableData, columnName, 'asc');
      } else {
        $(this).addClass('orderDesc');
        thisOne.recursiveSort(thisOne.tableData, columnName, 'desc');
      }
    });
  },
  methods: {
    recursiveSort(arr, column, order) {
      arr.sort((a, b) => {
        const nameA = a[column];
        const nameB = b[column];
        let returnVal;
        if (nameA < nameB) {
          returnVal = order === 'asc' ? -1 : 1;
          return returnVal;
        }
        if (nameA > nameB) {
          returnVal = order === 'asc' ? 1 : -1;
          return returnVal;
        }
        return 0;
      });
      arr.forEach((element) => {
        if (element.children) {
          this.recursiveSort(element.children, column, order);
        }
      });
    },
    totalSum(data, column, columnIndex) {
      if (columnIndex === 0) {
        return lang('main.total');
      }
      let sum = 0;
      if (data.length > 0) {
        const arr = data.filter(item => item._level === 1);
        arr.forEach((element) => {
          sum += accounting.unformat(element[column.prop]);
        });
        column.type === 'template' ? sum = accounting.formatMoney(sum) : '';
      }
      return sum;
    },
    formatMoney(val) {
      return accounting.formatMoney(val);
    },
    recursiveSortData(data, hierarchy, indexG, parentId) {
      let arr = [];
      if (parentId && indexG !== (hierarchy.length - 1)) {
        arr = data.filter(item => !item[hierarchy[indexG + 1]]
                                        && item[hierarchy[indexG]] && item[hierarchy[indexG - 1]] === parentId);
      } else if (parentId) {
        arr = data.filter(item => item[hierarchy[indexG]] && item[hierarchy[indexG - 1]] === parentId);
      } else {
        arr = data.filter(item => !item[hierarchy[indexG + 1]]);
      }
      if (arr.length > 0) {
        arr.forEach((el) => {
          if (el[hierarchy[indexG]]) {
            const newData = data.filter(item => el[hierarchy[indexG]] === item[hierarchy[indexG]]);
            el.columnName = el[this.hierarchyNames[indexG]];
            el.children = this.recursiveSortData(newData, hierarchy, indexG + 1, el[hierarchy[indexG]]);
          }
        });
      }
      return arr;
    },
    rowClassName(row) {
      const level = row['_level'];
      let returnVal;
      if (row.ad_id) {
        returnVal = `level${level} adId_${row.ad_id}`;
        if (level === 1 && this.firstRowIcon) {
          returnVal += ' firstRowIcon';
        }
      }
      return returnVal;
    },
    rowStyle(row) {
      const level = row['_level'];
      const alpha = (level * 2) / 10;

      if (level !== 1) {
        return { backgroundColor: `rgba(221,221,224,${alpha})` };
      }
      return 1;
    },
    cellStyle(row, rowIndex, column, columnIndex) {
      if (columnIndex !== 0 && this.heatMap) {
        const newData = this.tableData.map((item) => {
          return item[column.prop];
        });
        const alpha = row[column.prop] / Math.max.apply(Math, newData);
        return { backgroundColor: `rgba(124,84,196,${alpha})` };
      }
      return 1;
    },
    initialTableData() {
      this.tableData = this.recursiveSortData(this.data, this.hierarchy, 0, null);
    },
  },
};
</script>

<style lang="scss">
  .tree-table {
    padding-top: 10px;
    .zk-table__header {
      th {
        &.orderAsc,
        &.orderDesc {
          position: relative;
          &:after {
            font-family: FontAwesome;
            content: "\f0d7";
            position: absolute;
            right: 12px;
            top: 6px;
            display: block;
            width: 5px;
            height: 5px;
            z-index: 1;
            cursor: pointer;
            color: black;
          }
        }
        &.orderDesc:after {
          content:"\f0d8";
        }
      }
    }
    .zk-table__body {
      tr,
      td {
        border-color: #dddddd !important;
      }
      tr.level3 td:first-child, tr.firstRowIcon td:first-child {
        position: relative;
        cursor: pointer;
        &:after {
          font-family: FontAwesome;
          content: "\f082";
          color: #345495;
          position: absolute;
          right: 12px;
          top: 11px;
          display: block;
          width: 5px;
          height: 5px;
          z-index: 1;
        }
      }
    }
    .zk-table__header-row th {
      background-color: white;
      color: black;
    }
    .expandCollapseAll {
      color: #676c7b;
      &:before {
        font-family: FontAwesome;
        content: "\f0d7";
      }
      &.active:before {
        font-family: FontAwesome;
        content: "\f0da";
      }
    }
  }
  .zk-table__footer-row {
    font-weight: bold;
  }
  .zk-icon-minus-square-o:before {
    color: #345495;
    font-family: FontAwesome !important;
    content:"\f0dd" !important;
  }
  .zk-icon-plus-square-o:before {
    color: #345495;
    font-family: FontAwesome !important;
    content:"\f0da" !important;
  }
</style>
