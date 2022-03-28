<template>
  <div class="mt-1">
    <vs-table
        striped
        v-if="getEntriesList.length"
        v-model="selected"
    >
      <template #thead>
        <vs-tr>
          <vs-th>
            <vs-checkbox
                :indeterminate="selected.length === getEntriesList.length" v-model="allChecked"
                @change="changeSelectedItems({
                  checked: $event.target.checked,
                  items: getEntriesList,
                })"
            />
          </vs-th>
          <vs-th>
            {{ $t('table.header.entry.id') }}
          </vs-th>
          <vs-th>
            {{ $t('table.header.entry.temperature') }}
          </vs-th>
          <vs-th>
            {{ $t('table.header.actions') }}
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
            v-for="(item, i) in $vs.getPage(getEntriesList, page, itemsPerPage)"
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
            {{ item.temperature || '-' }}
          </vs-td>
          <vs-td>
            <vs-row>
              <vs-tooltip bottom>
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
                <template #tooltip>
                  {{ $t('btn.edit') }}
                </template>
              </vs-tooltip>

              <vs-tooltip bottom>
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
                <template #tooltip>
                  {{ $t('btn.delete') }}
                </template>
              </vs-tooltip>
            </vs-row>
          </vs-td>
        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength(getEntriesList, itemsPerPage)" />
      </template>
    </vs-table>
    <vs-alert
        v-else
        relief>
      <template #icon>
        <i class='bx bxs-chat'></i>
      </template>
      <template #title>
        {{ $t('alert.entries.list.empty.title') }}
      </template>
      {{ $t('alert.entries.list.empty.content') }}
    </vs-alert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ButtonType from '@/types/ButtonType';

export default {
  name: 'EntriesTable',

  data:() => ({
    page: 1,
    itemsPerPage: 3,
    allChecked: false,
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
      return this.getCheckedEntries;
    },

    ButtonType() {
      return ButtonType;
    },
  },

  methods: {
    ...mapActions(['fetchEntriesList', 'addEntriesToChecked',  'removeEntriesFromChecked']),

    async getTableData() {
      await this.fetchEntriesList();
    },

    changeSelectedItems({ checked, items }) {
      if (checked) {
        this.addEntriesToChecked(items)
      } else {
        this.removeEntriesFromChecked(items)
      }
    },

    btnPress({ action, items }) {
      this.$emit('btnPress', { action, items });
    },
  }
}
</script>
