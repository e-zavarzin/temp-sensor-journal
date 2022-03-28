<template>
  <div id="app">
    <router-view/>
    <TheModalKeeper/>
  </div>
</template>

<script>
import TheModalKeeper from '@/components/common/TheModalKeeper';
import EventBus from '@/event-bus';

export default {
  components: {
    TheModalKeeper
  },

  created() {
    EventBus.$on('onShowSuccessMessage', this.handlerShowSuccessMessage);
    EventBus.$on('onShowError', this.handlerShowError);
  },

  destroyed() {
    EventBus.$off('onShowSuccessMessage', this.handlerShowSuccessMessage);
    EventBus.$off('onShowError', this.handlerShowError);
  },

  methods: {
    handlerShowSuccessMessage(message) {
      this.showNotification({
        color: 'success',
        title: message,
      })
    },

    handlerShowError(message) {
      this.showNotification({
        color: 'danger',
        title: message,
      })
    },

    showNotification({ color, title }) {
      this.$vs.notification({
        color,
        position: 'top-right',
        title,
      })
    }
  }
}
</script>

<style lang="scss">
  @import './scss/style';
</style>
