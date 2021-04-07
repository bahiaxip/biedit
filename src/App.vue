<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
  </div>
</template>
<script>
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  name: 'App',
  components: {    
    HeaderComponent
  },  
}
</script>

<style >
#app {
  font-family:Arial, Avenir, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*padding-top: 20px;*/  
}
@import 'assets/css/style.css';
@import 'assets/css/overwrite_material.css';


</style>

