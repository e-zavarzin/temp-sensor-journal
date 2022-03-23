<template>
  <vs-dialog v-model="active" not-close prevent-close>
    <template #header>
      <h4 class="not-margin">
        {{ getTitle }}
      </h4>
    </template>
    <div class="con-content">
      Are you sure you want to delete following entries?
      <div>
        <vs-table>
          <template #thead>
            <vs-tr>
              <vs-th>
                ID
              </vs-th>
              <vs-th>
                Temperature
              </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr
                :key="i"
                v-for="(tr, i) in data.items"
                :data="tr"
            >
              <vs-td>
                {{ tr.id }}
              </vs-td>
              <vs-td>
                {{ tr.temperature }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </div>

    <template #footer>
      <div class="con-footer">
        <vs-button @click="apply()" transparent>
          Ok
        </vs-button>
        <vs-button @click="close()" dark transparent>
          Cancel
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import EventBus from '@/event-bus';

export default {
  name: 'DeleteEntriesModal',

  props: {
    active: {
      type: Boolean,
      default: () => false,
    },
    data: {
      type: Object,
      default: () => {},
    }
  },

  computed: {
    getTitle() {
      return `Delete ${this.data.items.length > 1 ? 'entries' : 'entry'}`;
    }
  },

  methods: {
    apply() {
      EventBus.$emit('onDeleteItems', {
        items: this.data.items
      });
      this.close();
    },

    close() {
      EventBus.$emit('onCloseModal');
    }
  }
}
</script>
