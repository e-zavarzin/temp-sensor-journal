<template>
  <vs-row>
    <vs-button
        flat
        @click="btnPress({action: ButtonType.ADD})"
    >
      <i class="bx bx-plus"></i>
      Add entry
    </vs-button>
    <vs-button
        v-if="getCheckedEntries.length > 0"
        border
        danger
        @click="btnPress({action: ButtonType.DELETE_CHECKED})"
    >
      <i class="bx bx-trash"></i>
        {{ $t('btn.delete.checked') }}
    </vs-button>
  </vs-row>
</template>

<script>
import ButtonType from '@/types/ButtonType';
import { mapGetters } from 'vuex';

export default {
  name: 'EntriesListMenu',

  computed: {
    ...mapGetters(['getCheckedEntries']),

    ButtonType() {
      return ButtonType;
    },
  },


  methods: {
    btnPress({ action }) {
      this.$emit('btnPress', { action });
    },
  },
}
</script>
