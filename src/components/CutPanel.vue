<template>
	<div class="min_height">
		<div v-if="!ima.src">
			<md-progress-spinner md-mode="indeterminate" v-if="displayLoading" class="progress_spinner"></md-progress-spinner>
		</div>
		<div v-else class="div_audio" :style="{'background-color':back}">
			<audio id="crop-audio" src="audio/crop_audio.wav" preload="auto" ref="audio"></audio>

			<md-button class="md-icon-button primary md-raised crop-button" @click="cropImage()" v-if="ima.widthCut>100 && ima.heightCut >100" :class="ima.windowSize.width<520 ? 'md-dense':''">
				<md-icon class="c_white">camera</md-icon>						
			</md-button>
			
			<p  v-else>Para disponer del cuadro de recorte es necesaria una imagen con un ancho y alto mínimo de 100 píxeles</p>
			
			<div class="back-box-panel" id="back-box-panel"  style="position:absolute !important;overflow:visible !important">
				<transition name="fade" >					
					<BoxPanel :ima="ima" v-if="onTransition"></BoxPanel>
				</transition>
			</div>
					
					
					<!--<transition name="fade">-->
			<md-dialog :md-active.sync="dialogBox" class="back-cut-panel " :md-click-outside-to-close="closeDialog" id="back-cut-panel" :style="{'background-color':back}">
				
				<div class="cut-panel" id="cut-panel" v-if="ima.widthCut>100 && ima.heightCut>100">
					<transition name="fade">
					<img class="" :src="url+'get-image/'+ima.src" :width="ima.widthCut" :height="ima.heightCut" v-if="onTransition"/>
					</transition>
				</div>
				<div class="cut-panel" v-else>
					<img class="" :src="url+'get-image/'+ima.src" :width="ima.widthCut" :height="ima.heightCut"/>
				</div>
				
			</md-dialog>
			<!--</transition>-->
			<md-dialog-alert class="confirmDialog" id="confirmDialog" 
			:md-active.sync="dialogErrorActive"
			:md-title = "titleDialogAlert"
			:md-content = "msgeDialogAlert"
			md-confirm-text="OK" />

					
		</div>
		<md-dialog-alert class="confirmDialog"
		:md-active.sync="dialogSuccessActive"
		:md-title = "titleDialogAlert"
		:md-content = "msgeDialogAlert"
		md-confirm-text="OK" 
		/>
	</div>
</template>
<script>
import BoxPanel from './BoxPanel.vue';
import Global from '../Global.js';
import servicesMixin from '../mixins/servicesMixin';
import methodsMixin from '../mixins/methodsMixin';
export default {	
	name:'CutPanel',
	components:{BoxPanel},
	//evitamos el ima asignando el src en el resized, además del ima
	props:['ima'],
	mixins:[servicesMixin,methodsMixin],	
	mounted(){
		if(!this.ima.name){			
			this.titleDialogAlert="La imagen principal aun no está disponible";
			this.dialogSuccessActive=true;			
			return;
		}
		//si se ha seleccionado subir una imagen y aun no se ha cargado en el server 
		//mostramos loading...
		if(this.name && !this.ima.src){			
			this.displayLoading=true;

		}else{
			setTimeout(()=> {
				//necesario no mostrar hasta el setTimout pase
				window.scrollTo(0,0)
				this.onTransition=true;
				//asignamos el min-width y el height al hijo que crea el panel-dialog de vue material
				document.querySelector(".back-cut-panel").firstChild.style.minWidth=this.ima.widthCut+"px";
				document.querySelector(".back-cut-panel").firstChild.style.height=this.ima.heightCut+"px";
			},100)
		}
		if(this.ima)
			this.back=this.getBackColor(this.testBackColor());

	},
	data(){
		return {
			//fondo de color (para back-cut-panel)
			back:null,
			url:Global.url,		
			closeDialog:false,
			dialogBox:true,
			dialogErrorActive:false,
			dialogSuccessActive:false,
			msgeDialogAlert:null,
			titleDialogAlert:null,
			displayLoading:false,
			onTransition:false
		}
	},
	methods:{

		toogle(){
			console.log("llega");
			this.onTransition=true;
		},
		toogle2(){
			console.log("llega");
			this.onTransition=false;
		},
		
		//sonido de recorte
		playSound(){
			let audio=this.$refs.audio;			
			audio.volume=sessionStorage.getItem("biedit_audio");
			audio.play();
		},
		//método de efecto en el recorte de imagen
		//método que clona el div box-square, le asigna ancho y alto, lo posiciona con top y left y lo ubica en el panel padre (back-box-panel, finalmente devuelve el div clonado 
		cloneBoxSquare(){
			let boxSquareMain=document.querySelector(".box-square");			
			let backBoxPanel=document.querySelector("#back-box-panel");
			var boxSquareClone = boxSquareMain.cloneNode(true);
			boxSquareClone.setAttribute("id","box-square-clone");
			boxSquareClone.style.position="absolute !important" ;
			//obtenemos el ancho y el alto del cuadrado y asignamos al nuevo div clonado
			let square=document.querySelector("#square-panel");
			boxSquareClone.style.width=square.offsetWidth+"px";
			boxSquareClone.style.height=square.offsetHeight+"px";
			
			//restamos 50 del margin-top del backboxpanel - 68 del nav
			//para asignar la misma posición que el boxSquareMain
			boxSquareClone.style.top=(square.getBoundingClientRect().top-118)+"px";
			boxSquareClone.style.left=square.getBoundingClientRect().left+"px";
			//añadimos al panel de fondo (backBoxPanel)
			backBoxPanel.appendChild(boxSquareClone);
			return boxSquareClone;
		},
	}
}
</script>
<style>
.md-button.crop-button{
    z-index:10;margin-top:5px
}
</style>