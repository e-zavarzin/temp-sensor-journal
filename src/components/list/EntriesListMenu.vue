<template>
  <div>
    <vs-button
        flat
        @click="btnPress({action: ButtonType.ADD})"
    >
      <i class="bx bx-plus"></i>
      Добавить запись
    </vs-button>
  </div>
</template>

<script>
import ButtonType from '@/types/ButtonType';

export default {
  name: 'EntriesListMenu',

  computed: {
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
