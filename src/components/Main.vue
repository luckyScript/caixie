<template>
  <div id="main">
    <Vheader></Vheader>
    <Vlist></Vlist>
    <Vpager></Vpager>
    <vfooter></vfooter>
  </div>
</template>

<script>
  import Vheader from './common/Vheader.vue';
  import Vfooter from './common/Vfooter.vue';
  import Vlist from './common/Vlist.vue'
  import Vpager from './common/Vpager.vue'
export default {
  name: 'Main',
  components: {
    Vheader,
    Vfooter,
    Vpager,
    Vlist
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #main {
   background: #272727;
 }
</style>
