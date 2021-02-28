<template>
  <div id="app" @click="showConsole()" >
    
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <HeaderComponent></HeaderComponent>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    //HelloWorld,
    HeaderComponent
  },
  mounted(){
    //prueba para detectar cuando cierra la pestaña del navegador 
    window.onbeforeunload=(function(){
      //anulado por sessionStorage
      //localStorage.removeItem("biedit_apitoken");
    })    
    
  },
  methods:{
    //evento en toda la pantalla
    showConsole(){
      //console.log("console");
    }
  },
  /*
  watch:{
    '$route'(){console.log("cambio")}
  }
  */
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*padding-top: 20px;*/  
}
@import 'assets/css/style.css';
@import 'assets/css/overwrite_material.css';


</style>
