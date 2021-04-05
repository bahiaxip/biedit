<template>
	<div class="cam-panel" >
		<div class="spinner">
			<md-progress-spinner v-if="!cam" md-mode="indeterminate" ></md-progress-spinner>
		</div>

		<div class="m_auto md-layout m_top10">
			<audio id="captureAudio" src="audio/crop_audio.wav" preload="auto" ref="captureAudio"></audio>
			<div class="md-layout-item">
			</div>

			<div class="md-layout-item md-size-50">
				<div class="buttons-cam-panel">
					<md-button class="md-icon-button md-raised primary " @click="capture()">
						<md-icon class="c_white">camera</md-icon>
					</md-button>					
				</div>
					
				<div class="video m_top10">
					<video id="video" playsinline autoplay ref="video"></video>
				</div>

			</div>

			<div class="md-layout-item md-size-25 m_auto" >
				<div class="div_canvasCam " >
					<canvas id="canvasCam" ref="canvasCam" :width="canvasCamWidth" :height="canvasCamHeight"></canvas>					
				</div>
				
			</div>
		</div>
		<md-dialog-alert 
		:md-active.sync="dialogAlertActive"
		:md-title="titleDialogAlert"
		:md-content="msgeDialogAlert"
		md-confirm-text="OK" class="confirmDialog"/>

		<md-dialog-alert 
		:md-active.sync="dialogSuccessActive"
		md-title="Imagen "
		md-content="La imagen ha sido guardada en el álbum"
		md-confirm-text="OK" />

		<md-dialog :md-active.sync="dialogImageCam" class="effect_dialog " >			
			<img :src="imageCam" v-if="imageCam" class="dis"/>
			<!-- colocar una transición o un interruptor para aparezca un poquito
				después que la imagen -->
			<div class="load_new_image " style="" v-if="imageCam" >
				<h3 class="c_primary">Imagen capturada</h3>
				<p>Desea guardar la nueva imagen en el álbum?</p>
				<md-button style="" class="" @click="loadImage()">
					OK
				</md-button>
				<md-button @click="cancelLoadImage()">
					Cancelar
				</md-button>				
			</div>
			<div v-else class="t_center m_auto;"><!--aquí el md-spinner-->
				<md-progress-spinner class="md-accent" :md-diameter="100" md-mode="indeterminate" ></md-progress-spinner >
			</div>
			
		

		</md-dialog>


		
	</div>
</template>

<script>
	//- se podría crear una captura de pantalla con html2Canvas o con JavaScript:
	//https://xpertdeveloper.com/webpage-screenshot-with-html5-js/
	//aunque podría generar problemas de seguridad
	//- pendiente crear plantilla de 10X15 cm. y repartir una imagen en 3,2cm. X 2,6cm.
	// para fotos de carnet, para ello se debe recortar o redimensionar la captura
	//y asegurarse que tiene 300dpi para poder imprimir la imagen tal como se muestra
	//por pantalla y que no pierda resolución al imprimir, revisarr marcadores>imagick 
	//donde hay ejemmplos con setImageResolution, setResolution, setUnits, etc...
import servicesMixin from '../mixins/servicesMixin';
import methodsMixin from '../mixins/methodsMixin';
import axios from 'axios';
import Global from '../Global.js';
export default {
	name:'Cam',
	mixins:[servicesMixin,methodsMixin],
	props:['volume'],
	data(){		
		return{
			url:Global.url,
			cam:false,
			videoCam:null,
			canvasCam:null,
			canvasCamWidth:640,
			canvasCamHeight:480,
			//podría ir en global.js
			constraints:{
				audio:true,
				video:{
					width:1280,
					height:720
				},
				//camara delantera
				facingMode:'user'
				//camara trasera
				//facingMode:{
					//exact:'environment'
				//}
			},
			context:null,
			imageCam:null,
			dialogImageCam:false,
			dialogSuccessActive:false,

			dialogAlertActive:false,
			titleDialogAlert:null,
			msgeDialogAlert:null,
			spinner:false,
			//se puede especificar con min o exact:
			/*
			constraints:{				
				video:{ 
					width:{exact: 640},
					height:{exact: 480} 
				}
			},
			constraints:{				
				video:{ 
					width:{min: 640},
					height:{min:480} 
				}
			},
			constraints:{				
				video:{ 
					width:{min: 640,ideal:1920,max:2560},					
					height:{min:480,ideal:1080,max:1440}
				}
			},
			*/


		}
	},
	mounted(){
		//Este componente es accesible desde em md-drawer de HeaderComponent,
		//pero por si se accede desde url se restringe el contenido si no existe
		//camara
		let session=this.testSession();
		if(!session)
			return
		if(session.status=="error"){
			this.titleDialogAlert="Error de autenticación"
			this.msgeDialogAlert=session.message;
			this.dialogAlertActive=true;
			return;
		}
		
		this.videoCam=this.$refs.video;
		this.canvasCam=this.$refs.canvasCam;
		this.context=this.canvasCam.getContext("2d");					
		this.testCam()
	},
	destroyed(){
		if(this.cam)
			this.stopCam()
	},
	methods:{
		//parar camara, probar en produccion con https y varios navegadores

		stopCam(){
			//apagando audio y video de todos los medios
			this.videoCam.srcObject.getTracks().forEach(track => {
				track.stop();
			})
			
			//vaciar
			this.videoCam.srcObject=null;			
		},
		testCam(){			
			let media=navigator.mediaDevices;
			if(media && media.getUserMedia){				
				media.getUserMedia(this.constraints).then((stream) => {
					//identificador para destroyed
					this.cam=true;					
					this.initCam(stream);
							
				}).catch(error =>{					
					//mostramos dialog de error
					this.titleDialogAlert="No se ha podido establecer conexión con la cámara";
					this.msgeDialogAlert=this.testErrorCam(error);
					this.dialogAlertActive=true;
				})
			}
		},
		initCam(stream){
			this.videoCam.srcObject=stream;
		},
		//dibujar imagen en canvas
		capture(){
			if(this.videoCam.srcObject){
				this.playSound();
				console.log("llega a capture")
				this.context.drawImage(this.videoCam,0,0,640,480);
				this.dialogImageCam=true;
				this.imageCam=this.canvasCam.toDataURL("image/jpg");	
			}
		},
		playSound(){
			let audio=this.$refs.captureAudio;
			//let audio= document.querySelector("#crop-audio");
			audio.volume=sessionStorage.getItem("biedit_audio");
			audio.play();
		},
		cancelLoadImage(){
			
			//reset
			this.context.beginPath();
			this.canvasCam.width=this.canvasCamWidth;
			this.imageCam=null
			this.dialogImageCam=false;
		},
		loadImage(){
			this.uploadImageBase64(this.imageCam);
		},

		uploadImageBase643(image){
			let session=this.testSession();
			if(!session){				
				return;
			}
			if(session.status=="error"){
				this.msgeDialogAlert=session.message;
				this.dialogAlertActive=true;
				return;
			}					
			let api_token=sessionStorage.getItem("biedit_apitoken"),
				email=sessionStorage.getItem("biedit_email"),
				formdata2= new FormData();
				formdata2.append("base64",image);
				formdata2.append("email",email);
			let headers={
				headers:{
					Authorization: 'Bearer '+api_token
				}
			};

			axios.post(this.url+"images",formdata2,headers).then((res) => {
				console.log(res)
			});
		}
	}
}
</script>
<style>
#canvasCam{
	display:none;
}
</style>