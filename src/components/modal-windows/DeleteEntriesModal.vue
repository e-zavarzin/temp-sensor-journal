<template>
  <vs-dialog v-model="active" not-close prevent-close>
    <template #header>
      <h4 class="not-margin">
        Deleting
      </h4>
    </template>
    <div class="con-content">
      demo
    </div>

    <template #footer>
      <div class="con-footer">
        <vs-button @click="close()" transparent>
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
    }
  },

  methods: {
    close() {
      console.log('close');
      EventBus.$emit('onCloseModal');
    }
  }
}
</script>
