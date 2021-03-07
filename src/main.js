import Vue from 'vue'
import App from './App.vue'

//para que evitar el bug(...badInput...) de md-select de vue-material es necesario
//importar mediante la opción "full" de vue material (añadir todos los componentes)
//y sustituir la línea del método isInvalidValue() del archivo 
// /node_modules/vue-material/dist/vuematerial.js por la siguiente:
//return this.$el.validity ? this.$el.validity.badInput : false;
//Nota: Esto es solo temporal, ya que al actualizar se debe volver sustituir, aunque
//el funcionamiento es correcto, aparece un error en consola cada vez que se selecciona 
//un elemento


import VueMaterial from 'vue-material';

/*
import {MdButton,MdMenu,MdList,MdIcon,MdCard,MdField,MdDialog,
	MdTabs,MdDialogAlert,MdToolbar,MdSpeedDial,MdLayout,MdDialogConfirm,
	MdSwitch,MdAvatar,MdTooltip,MdProgress} from 'vue-material/dist/components'
*/

import 'vue-material/dist/vue-material.min.css'
//anulamos el tema de vue material para que funcione el scss en headerComponent
//import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router';
import MainPanel from './components/MainPanel.vue';
import CutPanel from './components/CutPanel.vue';
import Collections from './components/Collections.vue';
import Effect from './components/Effect.vue';
import Home from './components/Home.vue';
import Cam from './components/Cam.vue';

//color picker verte
import Verte from 'verte';
import 'verte/dist/verte.css';

//import NotFound from './components/NotFound.vue';
Vue.config.productionTip = false
/*
Vue.use(MdButton);
Vue.use(MdMenu);
Vue.use(MdList);
Vue.use(MdIcon);
Vue.use(MdCard);
Vue.use(MdField);
Vue.use(MdDialog);
Vue.use(MdTabs);
Vue.use(MdDialogAlert);
Vue.use(MdToolbar);
Vue.use(MdSpeedDial);
Vue.use(MdLayout);
Vue.use(MdDialogConfirm);
Vue.use(MdSwitch);
Vue.use(MdAvatar);
Vue.use(MdTooltip);
Vue.use(MdProgress);
*/
Vue.use(Verte);
Vue.use(VueMaterial);
/*
Vue.material.registerTheme({
	default:{
		primary:'cyan',
		
	}
})
*/
Vue.use(VueRouter);

const routes = [
	{path:"/",redirect:'/home'},
	{path:'/home',component:Home},
	{path:'/main',redirect:'/'},
	{path:'/main',component:MainPanel,name:'MainPanel',props:true},
	{path:'/cutout',component:CutPanel,redirect:'/'},
	{path:'/cutout',component:CutPanel,name:'cutout',props:true},
	//sustituimos el panel CutPanel estandar por el siguiente con 
	//el método beforeEnter que permite realizar una condición antes
	//de enviar al componente
	/*
	{
		path:'/cutout',
		name:'cutout',
		component:CutPanel,
		props:true,
		beforeEnter:(to,from,next) => {
			if(to.params.ima.width<100 || to.params.ima.height<100){
				console.log("llega a beforeEnter: ",Collections)
				next()
				//next({name:'cutout',params:to.params,props:true});
			}else{
				console.log("llega a beforeEnter else")
				next();
			}
			//next();
		},
		
	},
	*/
	/* permitimos mantener solo collections al reiniciar la página
	{path:'/collections',component:CutPanel,redirect:'/'},
	*/
	{path:'/collections',component:Collections,name:'collections',props:true},
	{path:'/effects',component:CutPanel,redirect:'/'},
	{path:'/effects',component:Effect,name:'effect',props:true},
	{path:'/cam',component:Cam,name:'cam'},
	//{path:'*',component:NotFound},
	/*
	{
		path:'/cutout',
		components:{
			cutpanel: CutPanel
		},
		props:{
			width:"640"
		}
	}
	*/
];
const router = new VueRouter({
	routes,
	mode: 'history'
});

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
