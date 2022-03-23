<template>
  <div>
    <vs-table
        v-model="selected"
    >
      <template #thead>
        <vs-tr>
          <vs-th>
            <vs-checkbox
                :indeterminate="selected.length === sensors.length" v-model="allCheck"
                @change="selected = $vs.checkAll(selected, sensors)"
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
            v-for="(item, i) in sensors"
            :key="i"
            :data="item"
            :is-selected="!!selected.includes(item)"
        >
          <vs-td checkbox>
            <vs-checkbox :val="item" v-model="selected" />
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
import ButtonType from '@/types/ButtonType';

export default {
  name: 'EntriesList',

  data:() => ({
    allCheck: false,
    selected: [],
    sensors: [
      {
        "id": 1,
        "temperature": "32",
      },
      {
        "id": 2,
        "temperature": "44",
      },
    ]
  }),

  computed: {
    ButtonType() {
      return ButtonType;
    },
  },

  methods: {
    btnPress({ action, items }) {
      this.$emit('btnPress', { action, items });
    },
  }
}
</script>
