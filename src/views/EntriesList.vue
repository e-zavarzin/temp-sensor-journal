<template>
  <div class="list">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6" offset="3">
        <h2>{{ $t('heading.entries.list') }}</h2>
        <EntriesListMenu
            @btnPress="handleBtnPress"
        />
        <EntriesTable
            @btnPress="handleBtnPress"
        />
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import EntriesListMenu from '@/components/list/EntriesListMenu';
import EntriesTable from '@/components/list/EntriesTable';

import ButtonType from '@/types/ButtonType';
import EventBus from '@/event-bus';
import { mapGetters, mapActions } from 'vuex';

import DeleteEntriesModal from '@/components/modal-windows/DeleteEntriesModal';

export default {
  name: 'EntriesList',
  components: {
    EntriesTable,
    EntriesListMenu
  },

  created() {
    EventBus.$on('onDeleteEntries', this.handlerDeleteEntries);
  },

  destroyed() {
    EventBus.$off('onDeleteEntries', this.handlerDeleteEntries);
  },

  computed: {
    ...mapGetters(['getEntriesList', 'getCheckedEntries']),

    isTableVisible() {
      return this.getEntriesList.length;
    },
  },

  methods: {
    ...mapActions(['removeEntriesFromChecked', 'deleteEntries']),

    handleBtnPress({ action, items }) {
      switch (action) {
        case ButtonType.ADD:
          this.addEntry();
          break;
        case ButtonType.EDIT:
          this.editEntry(items);
          break;
        case ButtonType.DELETE:
          this.showDeleteEntriesModal(items);
          break;
        case ButtonType.DELETE_CHECKED:
          this.showDeleteEntriesModal(this.getCheckedEntries);
          break;
        default:
          console.error('UNKNOWN BUTTON TYPE', action)
      }
    },

    addEntry() {
      this.$router.push({
        name: 'EntryFormNew',
      })
    },

    editEntry(items) {
      this.$router.push({
        name: 'EntryFormEdit',
        params: {
          id: this.$_.first(items).id,
        },
      })
    },

    showDeleteEntriesModal(items) {
      EventBus.$emit('onShowModal', {
        component: DeleteEntriesModal,
        data: {
          items
        },
      });
    },

    handlerDeleteEntries({ items }) {
      this.removeEntriesFromChecked(items);
      this.deleteEntries(items);
      const message = items.length > 1
          ? this.$t('message.entries.deleted')
          : this.$t('message.entry.deleted');
      EventBus.$emit('onShowSuccessMessage', message);
    }
  }
}
</script>
