<template>
  <div>
    <vs-table
        v-model="selected"
    >
      <template #thead>
        <vs-tr>
          <vs-th>
            <!-- @change="selected = $vs.checkAll(selected, sensors)" -->
            <vs-checkbox
                :indeterminate="selected.length === getEntriesList.length" v-model="allCheck"
                @change="changeSelectedItems({
                  checked: $event.target.checked,
                  items: getEntriesList,
                })"
            />
          </vs-th>
          <vs-th>
            ID
          </vs-th>
          <vs-th>
            Temperature
          </vs-th>
          <vs-th>
            Actions
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
            v-for="(item, i) in getEntriesList"
            :key="i"
            :data="item"
            :is-selected="!!selected.includes(item)"
            not-click-selected
        >
          <vs-td checkbox>
            <vs-checkbox
                :val="item"
                v-model="selected"
                @change="changeSelectedItems({
              checked: $event.target.checked,
              items: [
                  item,
              ]
            })" />
          </vs-td>
          <vs-td>
            {{ item.id }}
          </vs-td>
          <vs-td>
            {{ item.temperature }}
          </vs-td>
          <vs-td>
            <vs-button
                flat
                @click="btnPress({
                  action: ButtonType.EDIT,
                  items: [
                    item,
                  ]
                })"
            >
              <i class="bx bx-pencil"></i>
            </vs-button>
            <vs-button
                border
                danger
                @click="btnPress({
                  action: ButtonType.DELETE,
                  items: [
                    item,
                  ]
                })"
            >
              <i class="bx bx-trash"></i>
            </vs-button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ButtonType from '@/types/ButtonType';

export default {
  name: 'EntriesList',

  data:() => ({
    allCheck: false,
    selected: [],
  }),

  watch: {
    getCheckedEntries: function (val) {
      this.selected = val;
    },
  },

  created() {
    this.getTableData();
  },

  computed: {
    ...mapGetters(['getEntriesList', 'getCheckedEntries']),

    isSelected(item) {
      return !!this.selectedItems.includes(item);
    },

    selectedItems() {
      console.log(this.getCheckedEntries);
      return this.getCheckedEntries;
    },

    ButtonType() {
      return ButtonType;
    },
  },

  methods: {
    ...mapActions(['fetchEntriesList', 'addCheckedEntries',  'deleteCheckedEntries']),

    async getTableData() {
      await this.fetchEntriesList();
    },

    changeSelectedItems({ checked, items }) {
      if (checked) {
        this.addCheckedEntries(items)
      } else {
        this.deleteCheckedEntries(items)
      }
    },

    btnPress({ action, items }) {
      this.$emit('btnPress', { action, items });
    },
  }
}
</script>
