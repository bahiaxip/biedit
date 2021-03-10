<template>
	<div >
	<md-progress-spinner md-mode="indeterminate" v-if="displayLoading"  class="load_new_image"></md-progress-spinner>
	<div class="back-main-panel" :style="{width:ima.width+'px'}" :v-if="ima.width!=null" ref="backMainPanel" style="touch-action:none">
		
		<div class="button-nav-mainpanel"   >
			<!-- opción switch centrado con absolute-->
			<!-- 
			:style="ima.width<100 ? 'position:absolute;left:50%;transform:translate(-50%)':''"
			-->
			
			<!--<md-tooltip v-else>No Redimensionar</md-tooltip>-->
			<div :style="ima.width<170 ? 'display:block;margin:auto': 'display:inline-flex'">
				<md-switch class="colorB " v-model="resizeSwitch"  v-if="showResize" >
				</md-switch>
				<md-tooltip >Redimensionar</md-tooltip>
			</div>
			<div style="display:inline">
						
				<div :style="ima.width<100 ? 'display:flex':'display:inline'">
				<md-button class="md-icon-button md-mini md-raised primary fab_button_head floatL inlineB" title="Guardar en album" :class="ima.width<170||ima.windowSize.width<520 ? 'md-dense':''" @click="dialogResizeActive=true" v-if="resizeSwitch" :style="ima.width<100 ? 'margin:auto':'display:block'"><md-icon class="c_white">add_photo_alternate</md-icon></md-button>

				<!--<md-button class="md-fab md-mini fab_button_standard floatR" title="Descargar" v-if="resizeSwitch" ><md-icon>save_alt</md-icon></md-button>-->
				<!-- sustituimos md-switch por md-button para corregir ancho y alto -->
				<!--<md-switch class="colorB " v-model="freeResize"  title="Redimensión libre" v-if="resizeSwitch">
				</md-switch>-->
				<md-button class="md-icon-button md-mini md-raised primary fab_button_standard floatR" title="Redimensión libre" v-if="resizeSwitch" @click="returnResizeMain()" :class="[{'accent':freeResize},ima.width<170||ima.windowSize.width<520 ? 'md-dense':'']" :style="ima.width<100 ? 'display:none':'display:block'"><md-icon class="c_white">image_aspect_ratio</md-icon></md-button>
				</div>
			</div>

		</div>
		<div class="clearL"></div>
		<div class="labels-mainpanel" v-if="resizeSwitch" style="">
				<label>
					<p class="floatL font_label" :style="
						ima.width<250 ? 
						ima.width<170 ?
						ima.width<120 ?
							'font-size:11px;color:black;padding:0px;background-color:white':
							'font-size:11px;color:white;padding:4px' : 'font-size:12px;color:white;padding:7px' : 'font-size:15px;color:white;padding:7px'" >

						<span v-if="ima.width>170" class="c_bnext">w:</span>
						{{ima.width}}<span v-if="ima.width>120">px</span>

					</p>
				</label>
				<!--<md-button class="md-fab md-mini fab_button_standard" title="Guardar en album" @click="dialogResizeActive=true" v-if="ima.width>=220"><md-icon>photo_album</md-icon></md-button>
				<md-button class="md-fab md-mini fab_button_standard" title="Descargar" v-if="ima.width>300"><md-icon>save_alt</md-icon></md-button>-->

				<label>
					<p class="floatR font_label" :style="
						ima.width<250 ? 
						ima.width<170 ? 
						ima.width<120 ?
							'font-size:11px;color:black;padding:0;background-color:white':
							'font-size:11px;padding:4px':
							'font-size:12px;padding:7px' : 
							'font-size:15px;padding:7px'">

					<span v-if="ima.width>170" class="c_bnext">h:</span>
					{{ima.height}}<span v-if="ima.width>120">px</span>
					

				</p>
				</label>
			</div>
		<div class="" >
		<!-- :style (doble condición) -->
			
			<transition name="fade">
				<div id="div-main" class="div-main no-selectable" :style="{width:ima.width+'px',height:ima.height+'px'}" ref="divmain" v-if="imgTrans">
					
					<div class="main-panel">
						<canvas id="canvas" class="no-selectable" :width="ima.width" :height="ima.height" ></canvas>

						<img :src="ima.name" id="image" class="main-img no-selectable" :width="ima.width" :height="ima.height" :class="{'main-img-resize':resizeSwitch}" :style="resizeSwitch ? ima.width<170 ? 'box-shadow:0px 0px 1px 7px rgba(0,0,0,0.2)':'box-shadow:0px 0px 1px 10px rgba(0,0,0,0.2)':'box-shadow:none'"/>						
					</div>
					<div id="handle-resize" @mousedown="initResize($event)" @touchstart="initResize($event)" class="handle-resize handle-right handle-bottom cursor-handle-resize" :style="ima.width<250 ? handleMin:handleStandar"  v-if="resizeSwitch" ></div>
				</div>
			</transition>
		</div>
		<!--prueba camara-->
		<!--<md-dialog 
		:md-active.sync="dialogCam">
			<md-dialog-title>Cámara</md-dialog-title>
			<md-button class="md-accent" style="color:black" @click="initCam()">
				hola
			</md-button>
			<div class="video">
				<video id="video" playsinline autoplay ref="video"></video>
			</div>
			<canvas id="canvas_cam" width="640" height="480" style="background-color:black;display:none" ref="canvas_cam"></canvas>
		</md-dialog>-->


		<md-dialog-confirm class="confirmDialog"
		:md-active.sync="dialogResizeActive"
		md-title = "¿Aplicar redimensión?"
		md-content = "¿Desea redimensionar la imagen con las dimensiones seleccionadas?"
		md-confirm-text="OK"
		md-cancel-text="Cancelar"
		@md-cancel="cancelResize"
		@md-confirm="confirmResize" />

		<md-dialog-alert class="confirmDialog"
		:md-active.sync="dialogErrorActive"
		md-title = "Ocurrió un error"
		:md-content = "msgeDialogAlert"
		md-confirm-text="OK" />

		<md-dialog-alert class="confirmDialog"
		:md-active.sync="dialogSuccessActive"
		md-title = "Creado correctamente"
		:md-content = "msgeDialogAlert"
		md-confirm-text="OK" />
	</div>
</div>
</template>
<script>
//import imageDefault from '../assets/logo.png';
//import axios from 'axios';
import Global from '../Global.js';
import methodsMixin from '../mixins/methodsMixin';
import servicesMixin from '../mixins/servicesMixin';
export default {
	name:'MainPanel',
	props:['ima'],
	mixins:[methodsMixin,servicesMixin],
	
	watch:{
		//al final no es necesario el watch para obtener el cambio del src a partir de la subida de la segunda imagen y las siguientes
		/*
		ima:{
			//observar profundamente ( en caso de que sea un objeto con + de una propiedad) -> deep:true
			deep:true,
			//immediate:true,
			
			handler(newVal){
				//watch detecta 3 cambios en el objeto image al subir la segunda imagen, para obtener el cambio del src de la imagen se asigna a un array hasta el que obtiene el cambio
				
				this.listWatch.push(newVal.src);
				console.log("lista: ",this.listWatch);
				
				if(this.listWatch.length>0 && this.listWatch[0]!=newVal.src){
					this.imgTrans=false;
					setTimeout(()=> {
						this.imgTrans=true;
					},50)
					
				}
			
					
				//no es necesario el filter
				this.filterWatch=this.listWatch.filter(val=>{
					if(this.listWatch.length>1)
						if(val!=newVal.src){
							console.log("es distinto: ");
							return true;
						}
				});
				
				
				
			},
			

		},
		*/		
		
	},
	
	data(){
		return{
			
			listWatch:[],
			filterWatch:null,	
			resHandleX:null,
			//imaData:null,
			//initialData:null,
			dialogResizeActive:false,
			dialogErrorActive:false,
			dialogSuccessActive:false,
			url:Global.url,
			msgeDialogAlert:null,
			showResize:false,
			resizeSwitch:false,
			freeResize:false,
			displayLoading:false,
			imgTrans:false,
			imagen:this.ima,
			resizeHandleMin:false,
			//medidas CSS del handle de redimensión
			handleStandar:{
				width:'40px',
				height:'40px'
			},
			handleMin:{
				width:'30px',
				height:'30px'
			},
			//prueba camara
			/*
			dialogCam:true,
			videoCam:null,
			canvasCam:null,
			constraints:{
				audio:true,
				video:{
					width:1280,
					height:720
				}
			},
			*/


		}
	},
	created(){
		//sesión con localstorage para token
		//otra forma de pasar datos con router-view,pasando datos de props al data
		//this.imaData= this.$options.propsData.ima;
		//this.initialData=this.$options.propsData.initial;
		
		//prueba de watch
		/*
		this.$watch(()=>{
			console.log("otro watch desde MainPanel");
		})
		*/
	},
	mounted(){
		//por revisar si es necesario o cambiar condicional
		if(!this.ima.name){
			this.displayLoading=true;
		}
		if(this.ima.file || this.ima.src){
			this.showResize=true;			
		}
		this.imgTrans=true;
		/*
		//prueba camara
		this.videoCam=this.$refs.video;
		console.log("videoCam: ",this.videoCam);
		this.canvasCam=this.$refs.canvasCam;
		*/

	},
	destroyed(){
		//anulado
		//enviamos el tipo de componente el toggle de color de botón activo
		//this.$emit("btn",'main');
	},
	/*
	watch:{
		'$route'(){console.log("cambiodesdeheader")}
	},
	*/
	methods:{

		// si queremos que se ejecute al iniciar la página añadir async al método (async initCam) 
		//y asignar el dispositivo a una variable con await (let stream = await navigator.mediaDevices.getUserMedia(this.constraints))
		/* //prueba camara
		initCam(){
			//existe el objeto mediaDevices.getUserMedia(parámetros (obligatorios))
			if(navigator.mediaDevices.getUserMedia(this.constraints)){
				
				navigator.mediaDevices.getUserMedia(this.constraints).then(stream=> {
					this.videoCam.srcObject=stream;
				}).catch(error=> {
					console.log(error.name+', '+error.message)
				});
				

				console.log("existe")
			}else{
				console.log("no existe")
			}
			/*try{
				let stream =  navigator.mediaDevices.getUserMedia(this.constraints);
				console.log(stream);
				this.videoCam.srcObject=stream;
			}catch{
				console.log("errror de stream: ");
			}*/
		//},

		initResize: function(e) {
			this.resHandleX=e.clientX;
			if(e.touches){
				window.addEventListener("touchmove",this.startResize,false);
				window.addEventListener("touchend",this.stopResize,false);	
			}else{
				window.addEventListener("mousemove",this.startResize,false);
				window.addEventListener("mouseup",this.stopResize,false);	
			}
		},
		startResize:function(e) {			
			let backMainPanel = document.querySelector(".back-main-panel");
			let divMain;
			let w;			
			if(e.touches){
				w=(e.touches[0].clientX-backMainPanel.offsetLeft);
			}else{
				w = (e.clientX - backMainPanel.offsetLeft);	
			}
			let h;
			
			//reducimos el handle de redimensión  mediante el interruptor
			//anulado, sustituido por :style
			/*
			if(w<220){
				this.resizeHandleMin=true;				
			}else{
				this.resizeHandleMin=false;
			}
			*/
		//el cambio de diseño de los iconos y labels de redimensión que siguen a 
		//continuación han sido cambiado de procesarlo aquí al atributo :style en el template.
				//reducimos las etiquetas de información de ancho y alto y ocultamos el botón de descarga, (ya que se puede descargar desde collections) y se sube el botón de redimensionar
				/*
				if(w<200){
					buttonStandard[0].style.display="none";
					buttonStandard[1].style.display="none";
					buttonHead.style.display="inline-block";
				}else if(w<300){
					labels[0].style.fontSize="14px";
					labels[1].style.fontSize="14px";
					buttonHead.style.display="none";
					buttonStandard[0].style.display="inline-block";
					buttonStandard[1].style.display="none";
										
				}else{
					labels[0].style.fontSize="18px";
					labels[1].style.fontSize="18px";
					buttonHead.style.display="none";					
					buttonStandard[0].style.display="inline-block";
					buttonStandard[1].style.display="inline-block";
				}
				*/
				//evitamos redimensionar menos del mínimo establecido tanto de
				//ancho como de alto, siempre manteniendo las proporciones.
				//if(w<128 || this.getNewHeight(w,this.ima.width,this.ima.height)<128){
					//
			if(w<50){
				//
			}else{
				//console.log("e.clientY: ", e.clientY);
				let widthDefault=this.ima.widthDefault;
				this.ima.width=Math.round(w);
				if(this.freeResize){
					//pageXoffset y pageYOffset son alias de scrollX y scrollY,
					//al igual que clientX son propiedades de solo lectura (read-only)
					divMain=this.$refs.divmain;

					//let suma = e.clientY+window.pageYOffset;
					//en lugar de offsetTop como en el proyecto anterior es necesario getBounding
					if(e.touches){
						h=(e.touches[0].clientY-divMain.getBoundingClientRect().top);
					}else{
						h=(e.clientY-divMain.getBoundingClientRect().top);
					}
					
					//console.log("clientY: ",e.clientY);
					
					//console.log("h: ",h);
					//divMain.style.height=h+"px";
					//backMainPanel.style.height=(suma-backMainPanel.offsetTop)+"px";
					
					this.ima.height=Math.round(h);
					//console.log("llega");

				}else{

					
					//console.log("w: ",w);
					let altoFinal = (widthDefault * this.ima.heightInitial)/this.ima.widthInitial;
					let scale = altoFinal/widthDefault;
					h = Math.round(scale*w);					
					this.ima.height=h;
					//console.log("h: ",h);

				}		
				
			}
		},
		getNewHeight(newWidth,width,height){			
			let newHeight = Math.round((newWidth*height)/width);
			return newHeight;			
		},
		stopResize:function(e) {
			if(e.touches){
				window.removeEventListener("touchmove",this.startResize,false);
				window.removeEventListener("touchend",this.stopResize,false);
			}else{
				window.removeEventListener("mousemove",this.startResize,false);
				window.removeEventListener("mouseup",this.stopResize,false);
			}
		},
		cancelResize(){
			console.log("canceled");
		},

		//volver a redimensionar la imagen al activar la redimensión libre tomando 
		//como referencia el ancho que se encuentra en el momento de activarlo
		returnResizeMain(){
			if(!this.freeResize){				
				this.freeResize=true;				
			}else{
				this.freeResize=false;
				//al desactivar el botón de redimensión libre, en lugar de volver
				//a redimensionar con el ancho por defecto, tomamos el mismo ancho
				//que contiene actualmente para no generar un cambio brusco
				let sizes=this.setSizeToMainPanel(this.ima.widthInitial,this.ima.heightInitial,Global.minWidthHeight,this.ima.width);
				this.ima.width=sizes.width;
				this.ima.height=sizes.height;
				
			}
			//console.log("freeResize: ",this.freeResize);
		},
		
	}
}
</script>
<style>
/*
.colorB label{
	color:orange;
}
*/
/*
.fade-enter-active{
	transition:opacity 10s
}
.fade-leave-active{
	opacity:1;
}
.fade-enter, .fade-leave-to{
	opacity:0;
}
*/

</style>