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

import DeleteEntriesModal from '@/components/modal-windows/DeleteEntriesModal';

export default {
  name: 'EntriesView',
  components: {
    EntriesList,
    EntriesListMenu
  },

  data: () => ({
    active: true,
  }),

  methods: {
    handleBtnPress({ action, items }) {
      switch (action) {
        case ButtonType.ADD:
          this.addNewEntry();
          break;
        case ButtonType.EDIT:
          this.editEntry(items);
          break;
        case ButtonType.DELETE:
          this.deleteEntry(items);
          break;
        case ButtonType.DELETE_CHECKED:
          console.log(items);
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
      console.log(items);
      this.$router.push({
        name: 'EntryFormEdit',
        params: {
          id: items[0].id,
        },
      })
    },

    deleteEntry(items) {
      EventBus.$emit('onShowModal', {
        component: DeleteEntriesModal,
        data: {
          items
        },
      });
    },
  }
}
</script>
