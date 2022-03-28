<template>
  <vs-row>
    <vs-tooltip bottom>
      <vs-button
          flat
          @click="btnPress({action: ButtonType.BACK})"
      >
        <i class="bx bx-left-arrow-alt"></i>
      </vs-button>
      <template #tooltip>
        {{ $t('btn.back') }}
      </template>
    </vs-tooltip>
    <vs-tooltip bottom>
      <vs-button
          flat
          @click="btnPress({action: ButtonType.SAVE})"
          :disabled="!saveBtnActive"
      >
        <i class="bx bx-save"></i>
      </vs-button>
      <template #tooltip>
        {{ $t('btn.save') }}
      </template>
    </vs-tooltip>
  </vs-row>
</template>

<script>
import ButtonType from '@/types/ButtonType';
import { mapGetters } from 'vuex';

export default {
  name: 'EntryFormMenu',

  props: {
    saveBtnActive: {
      type: Boolean,
      default: () => false,
    }
  },

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
