<template>
  <vs-dialog v-model="active" not-close prevent-close>
    <template #header>
      <h4 class="not-margin">
        {{ getTitle }}
      </h4>
    </template>
    <div class="con-content">
      {{ getQuestion }}
      <vs-table
          striped
          class="mt-1"
      >
        <template #thead>
          <vs-tr>
            <vs-th>
              {{ $t('table.header.entry.id') }}
            </vs-th>
            <vs-th>
              {{ $t('table.header.entry.temperature') }}
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
              {{ tr.temperature || '-' }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>

    <template #footer>
      <vs-row justify="flex-end">
        <vs-button flat @click="apply()">
          {{ $t('btn.ok') }}
        </vs-button>
        <vs-button flat @click="close()" dark>
          {{ $t('btn.cancel') }}
        </vs-button>
      </vs-row>
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
      EventBus.$emit('onDeleteEntries', {
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
