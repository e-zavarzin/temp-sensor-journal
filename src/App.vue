<template>
  <div id="app">
    <router-view/>
    <TheModalKeeper/>
  </div>
</template>

<script>
import TheModalKeeper from '@/components/common/TheModalKeeper';

export default {
  components: {
    TheModalKeeper
  },
}
</script>
