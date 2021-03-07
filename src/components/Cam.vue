<template>
	<div class="cam-panel" >
		<div class="spinner">
			<md-progress-spinner v-if="!cam" md-mode="indeterminate" ></md-progress-spinner>
		</div>
		<div class="m_auto md-layout m_top10">
			<div class="md-layout-item">
			</div>

			<div class="md-layout-item md-size-50">
				<div class="buttons-cam-panel">
					<md-button class="md-icon-button md-raised md-accent" @click="capture()">
						<md-icon>camera</md-icon>
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

		<md-dialog :md-active.sync="dialogImageCam" class="effect_dialog" >
			<img :src="imageCam" v-if="imageCam" />
			<!-- colocar una transición o un interruptor para aparezca un poquito
				después que la imagen -->
			<div class="load_new_image" style="" v-if="imageCam">
				<p>Desea guardar la nueva imagen en el álbum?</p>
				<md-button style="" class="md-raised md-accent" @click="loadImage()">
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
	//se podría crear una captura de pantalla con html2Canvas o con JavaScript:
	//https://xpertdeveloper.com/webpage-screenshot-with-html5-js/
import servicesMixin from '../mixins/servicesMixin';
import methodsMixin from '../mixins/methodsMixin';
import axios from 'axios';
import Global from '../Global.js';
export default {
	name:'Cam',
	mixins:[servicesMixin,methodsMixin],
	data(){		
		return{
			url:Global.url,
			cam:false,
			videoCam:null,
			canvasCam:null,
			canvasCamWidth:480,
			canvasCamHeight:320,

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
		//obtener permisos (granted,denied o prompt) 
		//solo probado que funciona en chrome en firefox lanza error
		permisos(){
			//micrófono
			/*
			navigator.permissions.query(
			{name:'camera'}
			//otros
			//{name:'geolocation'}
			//{name:'notifications'}
			//{name:'midi',sysex:false}
			//{name:'midi',sysex:true}
			//{name:'push',userVisibleOnly:true}
			//{name:'push'} //sin userVisibleOnly puede no ser
			//soportado en algunos navegadores

			
			).then((permissionObj) => {
				console.log(permissionObj.state);
				
			}).catch((error) => {
				console.log("error: ",error);
			})
			*/

			//video
			/*
			navigator.permissions.query({name:'camera'}).then((permissionObj) => {
				console.log(permissionObj.state);
			}).catch((error) => {
				console.log("error: ",error);
			})
			*/

		},

		//parar camara, probar en produccion con https y varios navegadores

		stopCam(){
			//pausado 
			//this.videoCam.pause();
			

			//apagar solo audio
			//this.videoCam.srcObject.getAudioTracks()[0].stop();
			//apagar solo video
			//this.videoCam.srcObject.getVideoTracks()[0].stop();
			//apagando audio y video de 1 medio 
			//this.videoCam.srcObject.getTracks()[0].stop();
			
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
		

		/* initCam antiguo (lo dejamos con comentarios que pueden ser útiles)*/	

		/*initCam(){
			let media=navigator.mediaDevices;
			if(media && media.getUserMedia){
				media.getUserMedia(this.constraints).then(stream => {
					this.videoCam.srcObject=stream;
					console.log("funcionando");
		*/
					//intento de comprobación en firefox devolviendo datos. En una
					//primera revisión no se ve que dato puede identificar los permisos
					//en caso de interés revisar mejor

					/*
					this.videoCam.onloadedmetadata=function(e){
						console.log("llega onloadedmetadata: ",e);
					}
					*/
		/*			
				}).catch(error => {
					this.titleDialogAlert="No se ha podido conectar con la cámara";
					this.msgeDialogAlert=this.testErrorCam(error);
		*/
					/*
					if(error.name== "NotFoundError" || error.name=="DevicesNotFoundError"){						
						//no existe dispositivo o no tiene microfono: puede ser
						//que la grabación esté desactivada aunque exista microfono
						console.log("Dispositivo no encontrado");
						this.msgeDialogAlert="Dispositivo no encontrado";
						
					} else if(error.name == "NotReadableError" || error.name=="TrackStartError"){
						//webcam or mic are already in use
						console.log("Dispositivo ya en uso");
						this.msgeDialogAlert="Dispositivo ya en uso";
					}else if(error.name == "OverconstrainedError" || error.name=="ConstraintNotSatisfiedError"){
						//constraints can not satisfied by avb.devices
						//los datos en media no son soportados por el hardware, e.g.
						//alta resolución o alto ratio de frames,...
						console.log("Parámetros en getUserMedia() no soportados ");
						this.msgeDialogAlert="Parámetros en getUserMedia() no soportados";
					}else if(error.name == "NotAllowedError" || error.name == "PermissionDeniedError"){
						//permission denied in browser
						//el usuario deniega los permisos o el navegador tiene la opción
						//de microfono o video desactivada por defecto
						console.log("Permiso denegado por el navegador");
						this.msgeDialogAlert="Permiso denegado por el navegador";
					}else if(error.name == "TypeError"){
						//empty constraints object
						//Los parámetros (constraints) están vacíos o asignados a false
						console.log("Parámetros en getUserMedia() vacío");
						this.msgeDialogAlert="Permiso denegado por el navegador";
					}else if(error.name=="AbortError"){
						//en firefox mostrado cuando ya está en uso el dispositivo, e.g.
						//en otro navegador
						console.log("Error con el dispositivo o ya se encuentra en uso")
						this.msgeDialogAlert="Error con el dispositivo o ya se encuentra en uso";
					}
					else{					
						//other errors
						console.log("Error: ",error.name);
						this.msgeDialogAlert=error.name;
					}
					*/
			/*
					this.dialogAlertActive=true;
					
				})
			}
			
		},
		*/
		//dibujar imagen en canvas
		capture(){
			if(this.videoCam.srcObject){
				console.log("llega a capture")
				this.context.drawImage(this.videoCam,0,0,480,320);
				this.dialogImageCam=true;
				this.imageCam=this.canvasCam.toDataURL("image/png");	
			}
			
			

			// Other browsers will fall back to image/png
				//img.src = canvasCam.toDataURL("image/webp");
		},
		cancelLoadImage(){
			
			//reset
			this.context.beginPath();
			this.canvasCam.width=this.canvasCamWidth;
			this.imageCam=null
			this.dialogImageCam=false;
		},
		loadImage(){

			//console.log(this.imageCam)
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