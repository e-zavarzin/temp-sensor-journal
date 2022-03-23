<template>
  <component
      v-if="active"
      :is="getComponent"
      :active="active"
      :data="data"
  ></component>
</template>

<script>
import EventBus from '@/event-bus';

export default {
  name: 'TheModalKeeper',

  data() {
    return {
      active: false,
      data: {},
      component: {},
    };
  },

  created() {
    EventBus.$on('onShowModal', this.handlerShowModal);
    EventBus.$on('onCloseModal', this.handlerCloseModal);
  },

  destroyed() {
    EventBus.$off('onShowModal', this.handlerShowModal);
    EventBus.$off('onCloseModal', this.handlerCloseModal);
  },

  computed: {
    getComponent() {
      return this.component;
    },
  },

  methods:  {
    handlerShowModal({ component, data }) {
      this.active = true;
      this.data = data;
      this.component = component;
    },

    handlerCloseModal() {
      this.active = false;
    },
  }
}
</script>

<style scoped>

</style>
