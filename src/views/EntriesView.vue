<template>
  <div class="list">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6" offset="3">
        <EntriesListMenu
            @btnPress="handleBtnPress"
        />
        <EntriesList
            @btnPress="handleBtnPress"
        />
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import EntriesListMenu from '@/components/list/EntriesListMenu';
import EntriesList from '@/components/list/EntriesList';

import ButtonType from '@/types/ButtonType';
import EventBus from '@/event-bus';
import { mapGetters, mapActions } from 'vuex';

import DeleteEntriesModal from '@/components/modal-windows/DeleteEntriesModal';

export default {
  name: 'EntriesView',
  components: {
    EntriesList,
    EntriesListMenu
  },

  created() {
    EventBus.$on('onDeleteItems', this.handlerDeleteItems);
  },

  destroyed() {
    EventBus.$off('onDeleteItems', this.handlerDeleteItems);
  },

  computed: {
    ...mapGetters(['getCheckedEntries']),
  },

  methods: {
    ...mapActions(['deleteCheckedEntries', 'deleteEntriesFromList']),

    handleBtnPress({ action, items }) {
      switch (action) {
        case ButtonType.ADD:
          this.addNewEntry();
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
    addNewEntry() {
      this.$router.push({
        name: 'EntryFormNew',
      })
    },

    editEntry(items) {
      this.$router.push({
        name: 'EntryFormEdit',
        params: {
          id: items[0].id,
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

    handlerDeleteItems({ items }) {
      this.deleteCheckedEntries(items);
      this.deleteEntriesFromList(items);
    }
  }
}
</script>
