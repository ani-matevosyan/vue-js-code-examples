<template>
  <!-- eslint-disable -->
  <div>
    <tree-table
      :config="config"
      :data="data"
      :columns="columns"
      :hierarchy="hierarchy"
      :hierarchyNames="hierarchyNames"
      :expandCollapseAll="true"
    ></tree-table>
  </div>
</template>

<script>
import TreeTableData from './jsonFiles/TreeTableData.json';
import TreeTable from '../../components/common/TreeTable';

export default {
  name: 'TreeTableTest',
  components: {
    TreeTable,
  },
  data() {
    return {
      config: {
        stripe: false,
        border: true,
        showHeader: true,
        showSummary: true,
        showRowHover: true,
        showIndex: false,
        treeType: true,
        isFold: false,
        expandType: false,
        selectionType: false,
      },
      data: TreeTableData,
      columns: [
        {
          label: 'Campaign',
          prop: 'columnName',
          minWidth: '200px',
        },
        {
          label: 'Cost',
          prop: 'cost',
          type: 'template',
          template: 'cost',
        },
        {
          label: 'Impressions',
          prop: 'impressions',
        },
        {
          label: 'CPM',
          prop: 'cpm',
          type: 'template',
          template: 'cpm',
        },
        {
          label: 'Test',
          prop: 'test',
          type: 'template',
          template: 'test',
        },
      ],
      hierarchy: ['campaign_id', 'adset_id', 'ad_id', 'd_id'],
      hierarchyNames: ['campaign_name', 'adset_name', 'ad_name', 'd_name'],
    };
  },
  mounted() {
    window.Bus.$emit('page.ready');
  },
  methods: {
  },
};
</script>

<style lang="scss" type="text/scss"></style>
