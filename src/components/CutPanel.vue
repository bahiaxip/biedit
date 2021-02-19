<template>
	<div>
		<div v-if="!ima.width">
			<md-progress-spinner md-mode="indeterminate" v-if="displayLoading" ></md-progress-spinner>
		</div>
		<div v-else >
			<audio id="crop-audio" src="audio/crop_audio.wav" preload="auto"></audio>
			
			<!--<md-button @click="toogle()" style="z-index:10">
				Hola
			</md-button>
			<md-button @click="toogle2()" style="z-index:10">
				Adios
			</md-button>-->

			<md-button class="md-icon-button md-accent md-raised" style="z-index:10;margin-top:5px" @click="cropImage()" v-if="ima.widthCut>100 && ima.heightCut >100">
				<md-icon>adjust</md-icon>						
			</md-button>
			
			<p  v-else>Para disponer del cuadro de recorte es necesaria una imagen con un ancho y alto mínimo de 100 píxeles</p>
			
			<div class="back-box-panel" id="back-box-panel"  >
				<transition name="fade" >		
				<!--<BoxPanel :ima="ima" v-if="ima.widthCut>100 && ima.heightCut>100"></BoxPanel>-->
				<BoxPanel :ima="ima" v-if="onTransition"></BoxPanel>
				
				</transition>
			</div>
					
					
					<!--<transition name="fade">-->
					<md-dialog :md-active.sync="dialogBox" class="back-cut-panel " :md-click-outside-to-close="closeDialog" id="back-cut-panel" >
						
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
					:md-title = "msgeDialogTitle"
					:md-content = "msgeDialogContent"
					md-confirm-text="OK" />

					<md-dialog-alert class="confirmDialog"
					:md-active.sync="dialogSuccessActive"
					:md-title = "msgeDialogTitle"
					:md-content = "msgeDialogContent"
					md-confirm-text="OK" />
		</div>
	</div>
</template>
<script>
import BoxPanel from './BoxPanel.vue';
import axios from 'axios';
import Global from '../Global.js';
export default {	
	name:'CutPanel',
	components:{BoxPanel},
	//evitamos el ima asignando el src en el resized, además del ima
	props:['ima'],
	//props:['ima','resized'],
	created(){
		/*
		if(!this.ima.src){
			alert("Es necesario subir una imagen");
			return;
		}
		*/
	},
	mounted(){
		//necesario actualizar medidas en redimensión (getWithAccording...)
			//window.addEventListener(resize..)
			//luego en destroy: window.removeEventListener(resize...)
		
		//si no existe imagen en el panel principal pk no se ha subido ni se ha 
		//seleccionado desde el album mostramos mensaje
		if(!this.name){
			//lanzar dialog con mensaje
		}
		//si se ha seleccionado subir una imagen y aun no se ha cargado en el server 
		//mostramos loading...
		if(this.name && !this.ima.src){			
			this.displayLoading=true;
		}else{
			this.onTransition=true;
			//asignamos el min-width y el height al hijo que crea el panel-dialog de vue material
			document.querySelector(".back-cut-panel").firstChild.style.minWidth=this.ima.widthCut+"px";
			document.querySelector(".back-cut-panel").firstChild.style.height=this.ima.heightCut+"px";	
		}
		
	},
	data(){
		return {
			url:Global.url,		
			closeDialog:false,
			dialogBox:true,
			dialogErrorActive:false,
			dialogSuccessActive:false,
			msgeDialogContent:null,
			msgeDialogTitle:null,
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
		//proceso de recorte
		cropImage(){
			//si la ruta actual no es cutout detenemos
			if(this.$route.name!="cutout"){
				return;
			}
			if(this.ima.widthCut<100 || this.ima.heightCut<100){
				//console.log("no es posible recortar ")
			}
			var self=this;
			if(sessionStorage && sessionStorage.getItem("biedit_apitoken")){

				let api_token = sessionStorage.getItem("biedit_apitoken");
				let email = sessionStorage.getItem("biedit_email");
				let square = document.querySelector("#square-panel");				
				square.className="flash animated";

				let prop = {
					x : square.offsetLeft,
					y : square.offsetTop,
					width : square.offsetWidth,
					height : square.offsetHeight,
					resizeWidth:this.ima.widthCut,
					resizeHeight:this.ima.heightCut,
					src : this.ima.src,
					email: email
				}
				let data = {
					data: JSON.stringify(prop)
				}
				let headers= {
					headers:{Authorization: "Bearer "+api_token}
				}
				axios.post(this.url+"crop",data,headers).then(res => {
					if(res.data.error){
						this.msgeDialogTitle="Ocurrió un error";
						this.msgeDialogContent=res.data.error;						
						this.dialogErrorActive=true;
						return;		
					}
					if(res.data.message){
						const cloneBoxSquare=this.cloneBoxSquare();
						//realizamos un setTimeout para que funcione el transition
						setTimeout(function(){
							square.className="";
							cloneBoxSquare.style.top="-1000px";
							setTimeout(function(){
								//cloneBoxSquare.style.display="none";
								self.msgedialogTitle="Guardado con éxito"
								self.msgeDialogContent=res.data.message;
								self.dialogSuccessActive=true;
							},1000);
						},100);
					}
				})

				this.playSound();
			}else{
				console.log("El usuario no está logueado o el navegador no soporta sessionStorage");
			}
		},
		//sonido de recorte
		playSound(){
			let audio= document.querySelector("#crop-audio");
			audio.volume=0.1;
			audio.play();
		},
		//método de efecto en el recorte de imagen
		//método que clona el div box-square, le asigna ancho y alto, lo posiciona con top y left y lo ubica en el panel padre (back-box-panel, finalmente devuelve el div clonado 
		cloneBoxSquare(){
			let boxSquareMain=document.querySelector(".box-square");
			//boxSquareMain.setAttribute("id","box-square-clone");
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
		//efecto parpadeo
		/* anulado se realiza directamente en cropImage()
		onAnimation(elem)
		{
			document.getElementById(elem).className="flash animated";
			setTimeout(function()
			{
			document.getElementById(elem).className="";
			},1000);
		},
		*/
	}
}
</script>
<style>
/* ng::deep no funciona*/
/*ng::deep.md-dialog-container{
	position:relative !important;
	top:0;
}
.md-dialog-container{
	position:relative !important;
	top:0;left:0;
}
*/
/*
.fade-enter-active, .fade-leave-active{
	transition:opacity 0s;
}
.fade-enter, .fade-leave-to{
	opacity:1s;
}
*/
/*imagen grande en md-dialog*/
.fade-enter-active{
	transition:opacity 2s
}
.fade-leave-active{
	opacity:1;
}
.fade-enter, .fade-leave-to{
	opacity:0;
}

.md-overlay{
	

}

</style>