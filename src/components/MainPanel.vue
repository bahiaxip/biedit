<template>
	<div class="min_height">
	<md-progress-spinner md-mode="indeterminate" v-if="displayLoading"  class="load_new_image"></md-progress-spinner>
	<div class="back-main-panel" :style="{width:ima.width+'px'}" :v-if="ima.width!=null" ref="backMainPanel" style="touch-action:none">

		<div class="button-nav-mainpanel" >

			<div :style="ima.width<170 ? 'display:block;margin:auto': 'display:inline-flex'">
				<md-switch class="colorB " v-model="resizeSwitch"  v-if="showResize" >
				</md-switch>
				<md-tooltip >Redimensionar</md-tooltip>
			</div>

			<div style="display:inline">						
				<div :style="ima.width<100 ? 'display:flex':'display:inline'">
				<md-button class="md-icon-button md-mini md-raised primary fab_button_head floatL inlineB" title="Guardar en album" :class="ima.width<170||ima.windowSize.width<520 ? 'md-dense':''" @click="dialogResizeActive=true" v-if="resizeSwitch" :style="ima.width<100 ? 'margin:auto':'display:block'"><md-icon class="c_white">add_photo_alternate</md-icon></md-button>
					
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
						{{ima.height}}
						<span v-if="ima.width>120">px</span>
					</p>
				</label>
			</div>
		<div class="" >
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
import Global from '../Global.js';
import methodsMixin from '../mixins/methodsMixin';
import servicesMixin from '../mixins/servicesMixin';
export default {
	name:'MainPanel',
	props:['ima'],
	mixins:[methodsMixin,servicesMixin],
	
	data(){
		return{
			
			listWatch:[],
			filterWatch:null,	
			resHandleX:null,			
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
		}
	},	
	mounted(){
		console.log("desde mainpanel: ",this.ima)
		//por revisar si es necesario o cambiar condicional
		if(!this.ima.name){
			this.displayLoading=true;
		}
		if(this.ima.file || this.ima.src){
			this.showResize=true;			
		}
		this.imgTrans=true;
	},	
	methods:{

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
		
			if(w<50){
				//
			}else{				
				let widthDefault=this.ima.widthDefault;
				this.ima.width=Math.round(w);
				if(this.freeResize){
					//pageXoffset y pageYOffset son alias de scrollX y scrollY,
					//al igual que clientX son propiedades de solo lectura (read-only)
					divMain=this.$refs.divmain;
					//en lugar de offsetTop como en el proyecto anterior es necesario getBounding
					if(e.touches){
						h=(e.touches[0].clientY-divMain.getBoundingClientRect().top);
					}else{
						h=(e.clientY-divMain.getBoundingClientRect().top);
					}
					this.ima.height=Math.round(h);
				}else{
					let altoFinal = (widthDefault * this.ima.heightInitial)/this.ima.widthInitial;
					let scale = altoFinal/widthDefault;
					h = Math.round(scale*w);					
					this.ima.height=h;
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
		},
	}
}
</script>