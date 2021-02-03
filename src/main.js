import Vue from 'vue'
import App from './App.vue'
import {MdButton,MdMenu,MdList,MdIcon,MdCard,MdField,MdDialog,
	MdTabs,MdDialogAlert,MdToolbar,MdSpeedDial,MdLayout,MdDialogConfirm,
	MdSwitch,MdAvatar,MdTooltip,MdProgress} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router';
import MainPanel from './components/MainPanel.vue';
import CutPanel from './components/CutPanel.vue';
import Collections from './components/Collections.vue';
import Effect from './components/Effect.vue';
//import NotFound from './components/NotFound.vue';
Vue.config.productionTip = false
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
Vue.use(VueRouter);

const routes = [
	//{path:"/",redirect:'/'},
	{path:'/main',redirect:'/'},
	{path:'/main',component:MainPanel,name:'MainPanel',props:true},
	{path:'/cutout',component:CutPanel,redirect:'/'},
	{path:'/cutout',component:CutPanel,name:'cutout',props:true},
	/* permitimos mantener solo collections al reiniciar la página
	{path:'/collections',component:CutPanel,redirect:'/'},
	*/
	{path:'/collections',component:Collections,name:'collections',props:true},
	{path:'/effects',component:CutPanel,redirect:'/'},
	{path:'/effects',component:Effect,name:'effect',props:true}
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
