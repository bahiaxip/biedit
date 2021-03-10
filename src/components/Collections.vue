<template >
	<!--<div >-->
		<!--<md-progress-spinner :md-diameter="diameterSpinner" md-mode="indeterminate" style="margin-top:200px" v-if="!images" ></md-progress-spinner>
		<div v-if="images && images.length==0">
			<p>El álbum está vacío</p>
		</div>-->
		<div v-if="images" class="">
			<transition-group name="list" tag="md-card"  mode="out-in" >
				<md-card v-for="image in images" :key="image.id" class="list-item" >
					<!-- para evitar el error con la imagen bloqueada por CORS al añadir el atributo
						md-solid y md-text-scrim de vue material card le quitamos el atributo y añadimos
						al md-card-area un fondo negro con transparencia, de esa forma mantiene un aspecto similar, esto solo pasa si es más de una imagen. El problema se origina 
						en las imágenes al crearse el atributo crossorigin="Anonymous" que genera el error, ya que al quitarlo en consola de forma manual permite mostrar la imagen.
						Para solucionarlo de forma efectiva hemos creado un método en el server que devuelve la imagen en lugar de obtenerla mediante la ruta de dicha imagen, esto en Laravel se realiza con return response()->file(ruta_de_imagen) y con Node se realiza con return response.sendFile(ruta_de_imagen)-->
					<md-card-media-cover  md-solid>
						
						<md-card-media md-ratio="4:3">
							
							<img  :src="url+'get-image/'+image.random_name" :width="image.width" :height="image.height"/>
							
							<!--<img src="fondo.jpg"/>-->
						</md-card-media>
					
						<md-card-area >
							<md-card-header >
								<span class="md-title f15" >{{image.title}}</span>
								
							</md-card-header>
							<md-card-actions >
								<md-menu md-size="big" md-direction="top-start" md-active.sync="toggleCard">
									<md-button class="md-icon-button" title="Detalle de la imagen" md-menu-trigger>
										<md-icon>description</md-icon>
									</md-button>

									<md-menu-content>
										
										<md-list class="md-dense">
											<md-list-item>
												<md-icon>
													aspect_ratio
													<md-tooltip md-direction="bottom">Dimensiones</md-tooltip>
												</md-icon>

												<span>
													{{image.width}} X {{image.height}}
												</span>
											</md-list-item>

											<md-list-item>
												<md-icon>
													art_track
													<md-tooltip md-direction="bottom">Formato</md-tooltip>
												</md-icon>
												<span>
													{{image.ext | mayusculas}}	
												</span>
											</md-list-item>
											<md-list-item>
												<md-icon>
													sd_storage
													<md-tooltip md-direction="bottom">Tamaño</md-tooltip>
												</md-icon>
												<span>
													{{image.size | parseint | prettyBytes}}
												</span>
											</md-list-item>
											<md-list-item>
												<md-icon md-src="img/effect/monitor-eye_black.svg">
													<md-tooltip md-direction="bottom"></md-tooltip>
												</md-icon>
												<span>
													{{image.space_color}}
												</span>
											</md-list-item>
											
										</md-list>
									</md-menu-content>
								</md-menu>
								
								<md-button class="md-icon-button" title="Enviar al panel principal" @click="sendToMainPanel(image)">
									<md-icon>highlight_alt</md-icon>
								</md-button>

								<md-button class="md-icon-button" title="Descargar imagen" @click="confirmAction(image,'download')">
									<!--<a :href="'http://localhost:8000/'+image.path+image.random_name" download id="download">-->
										<md-icon>save_alt</md-icon>
									
								</md-button>

								<md-button class="md-icon-button" @click="confirmAction(image,'delete')" title="Eliminar imagen">
									<md-icon>delete</md-icon>
								</md-button>

								<md-button class="md-icon-button" title="Visualizar" @click=showImage(image.random_name)>
									<md-icon>zoom_out_map</md-icon>
								</md-button>

								
							</md-card-actions>
						</md-card-area>
					</md-card-media-cover>
				</md-card>
			</transition-group>
			<ul class="pagination" v-if="totalImages>10">
				<li v-for="(n) in totalPages" :key="n" >
					<md-button class="md-icon-button md-raised primary c_white" v-if="n==actualPage" >
					{{n}}
					</md-button>
					<md-button class="md-icon-button md-raised accent c_white" v-else @click="getImages(n)">
					{{n}}
					</md-button>
				</li>
			</ul>
			<md-dialog-alert class="confirmDialog" id="confirmDialog" 
			:md-active.sync="dialogErrorActive"
			:md-title = "titleDialogAlert"
			:md-content = "msgeDialogAlert"
			md-confirm-text="OK" />

			<md-dialog-confirm class="confirmDialog"
			:md-active.sync="dialogSuccessActive"
			:md-title = "titleDialogConfirm"
			:md-content = "msgeDialogConfirm"
			md-confirm-text="OK" 
			md-cancel-text="Cancelar"		
			@md-confirm="setAction(action)" 
			:md-click-outside-to-close="dialogSwitch" />
			<!-- modal de imagen en pantalla completa -->
			<transition name="fadeimg">
				<md-dialog :md-active.sync="dialogImage" class="fullImage" v-if="showFullImage">				
					<img :src="url+'get-image/'+this.tmpImage" />
					
				</md-dialog>
			</transition>
		</div>
	<!--</div>-->
</template>
<script>
//import axios from 'axios';
import servicesMixin from '../mixins/servicesMixin';
//import Global from '../Global.js';
import methodsMixin from '../mixins/methodsMixin';
export default {
	name:"collections",
	props:['imageMain'],
	mixins:[methodsMixin,servicesMixin],
	data(){
		return{	
			//para que funcione el efecto transition no puede ser null		
			images:[],
			imageTmp:{
				name:null,
				width:null,
				height:null,
				src:null
			},
			image:null,
			//url:"http://localhost/biedit_backend/public/api/",
			url:"http://localhost/biedit_backend/api/",
			//datos para creación de paginación (Laravel)
			totalPages:null,
			actualPage:null,
			totalImages:null,
			//dialogs
			dialogErrorActive:false,
			dialogSuccessActive:false,
			titleDialogConfirm:null,
			msgeDialogConfirm:null,
			action:null,
			msgeDialogAlert:null,
			titleDialogAlert:null,
			dialogSwitch:false,
			toggleCard:false,
			tmpImage:null,
			dialogImage:false,
			showFullImage:false,
			diameterSpinner:100,
			headers:{
				headers:{
					"Access-Control-Allow-Origin" : "*",
					//crossorigin:true,
					'Access-Control-Allow-Methods': "GET",
					//'Access-Control-Allow-Headers': "Content-Type",
					'Access-Control-Allow-Credentials':true,
					'cache-control':'no-cache',
					'Access-Control-Allow-Headers':"Origin, X-Requested-With, Content-Type, Accept"					
				}
			}
			
		}
	},
	computed:{
		/*
		setSizesToCard(){
			//
		}
		*/
	},
	created(){
		
	},
	mounted(){
		
		//no es necesario el session ya que lo contiene el método getImages()

		this.getImages();
		if(!this.imageMain){
			console.log("recargando página");
		}else if(this.imageMain && this.imageMain.src== null){
			console.log("no hay nada en el panel principal");
		}else{
			console.log("existe imagen en el panel");
		}
	},
	beforeDestroy(){
		console.log("llega al beforeDestroy");

	},
	destroyed(){
		//anulado
		//this.$emit("btn","collections");		
	},
	methods:{
		/*
		onMenu(e){
			console.log(e.target.parentElement.parentElement);

			//this.toggleCard=true;
		},
		*/
		setAction(action){
			if(action=="delete")
				this.deleteImage()
			else if(action=='download')
				this.downloadFile(this.image)
			this.action=null;

		},		

		confirmAction(image,action){			
			this.image=image;
			if(action=="delete"){
				this.titleDialogConfirm="Eliminar imagen"
				this.msgeDialogConfirm="¿Desea eliminar la imagen seleccionada?"
				this.action=action
			}
			else if(action=="download"){
				this.titleDialogConfirm="Descargar imagen"
				this.msgeDialogConfirm="¿Desea descargar la imagen seleccionada?"
				this.action=action
			}
			this.dialogSuccessActive=true;
		},
		
		//pasamos a null todas las propiedades de un objeto
		dropImage(image){
			for(let key in image){
				//es necesario mantener el widthDefault
				if(key!="widthDefault")
					image[key]=null;
			}
		},
		sendToMainPanel(image){
			if(this.imageMain && image.random_name==this.imageMain.src){
				//console.log("es la misma imagen");
				return;
//pasar el valor de megas a global
			}else if(image && image.size>3000000){
				this.titleDialogAlert="Imagen muy grande";
				this.msgeDialogAlert="La imagen es mayor a 2MB"
				//this.dialogErrorActive=true;

				console.log("wo");
				//return;
			}
			else{
				this.$emit("reload",image);
				//console.log("no es la misma imagen y reload image: ",image);
			}						
		},
		getNewHeight(newWidth,width,height){
			let newHeight=Math.round((newWidth*height)/width);
			return newHeight;
		},
		showImage(image){
			//console.log(this.imageMain);
			this.tmpImage=image;
			this.dialogImage=true;
			this.showFullImage=true;
		},
		//descargar imagen mediante método download de Laravel
		//en lugar de axios usamos window.location para acceder a la api de Laravel
		//(pasa el image por parámetro)
		downloadFile(image){

			let session=this.testSession();
			if(!session){				
				return;
			}
			if(session.status=="error"){
				this.msgeDialogAlert=session.message;
				this.dialogErrorActive=true;
				return;
			}
			
			let title;
			if(image.title!=null){
				title=image.title;
			}else{
				title=image.random_name;
			}

				//no es posible enviar cabeceras con window.open o window.location
				/*
				let headers={
					headers:{
						Authorization: 'Bearer '+sessionStorage.getItem("biedit_apitoken")
					}
				}
				*/
				//let pathRelative=image.path+image.random_name;
	//opción con window.open()			
				//window.open(this.url+'download?image='+image.random_name+'&name='+title+'&id='+image.user_id+'&path='+image.path,"__blank");
//opción con window.location
			window.location=this.url+'download?image='+image.random_name+'&name='+title+'&id='+image.user_id+'&path='+image.path;
			
//opción sin modificar la ruta de Laravel
	//pasando el objeto params con axios no se requiere añadir parametros a la ruta
	//en laravel, se obtiene automáticamente con $request:
			//axios.get(this.url+'download',{params:{image:data}}).then(res=>{
	//pasando string con ? y parámetro como en PHP, tampoco requiere añadir nada a la ruta, solo con $request
			//axios.get(this.url+'download?image='+imagefile).then(res=>{

//opción añadiendo parámetro en la ruta de Laravel
	//pasando un objeto con axios como parámetro es necesario añadirlo en la 
	//ruta
				//axios.get(this.url+'download/'+{"image":imagefile}).then(res=>{
			
		}
			

	},
	filters:{
		mayusculas(value){
			return value.toUpperCase();
		},
		parseint(string){
			return parseInt(string);
		},
		//convierte el peso de la imagen (entero) a modo legible, junto a su unidad de medida
		prettyBytes(num){
			if (typeof num !== 'number' || isNaN(num)) {
				throw new TypeError('Expected a number');
				}

			var exponent;
			var unit;
			var neg = num < 0;
			var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

			if (neg) {
			num = -num;
			}

			if (num < 1) {
			return (neg ? '-' : '') + num + ' B';
			}

			exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
			num = (num / Math.pow(1000, exponent)).toFixed(2) * 1;
			unit = units[exponent];

			return (neg ? '-' : '') + num + ' ' + unit;
		}
	}
}
</script>
<style>
.md-card{
	/*width:17%;
	min-width:250px;
	display:inline-block;
	margin:0 10px;
	box-shadow:none;
	*/
}

/*válido si no añadimos los atributos md-solid o md-text-scrim, si añadimos los atributos es necesario el !important*/
/*.back_collections .md-card-area{
	background:rgba(0,0,0,1);
}*/


/*transition list */
/*estado inicial */
/*.list-enter{
	transform:scale(0);
	opacity:0;*/
	/*transform:translate(30px);*/
	/*transform:scale(0);*/
	/*transform:rotate(45deg);*/
/*}*/
/*estado activo y final de entrada*/
/*.list-enter-active{
	transition:transform 0.6s;
	transition:opacity 1s;
	
	
}*/
/*estado inicial para salida*/
/*.list-leave-to{
	transition:opacity 0.2s;
	opacity:0;

}
*/
/*estado activo y final de salida*/

/*.list-leave-active {	
}
*/


		/* ejemplo animation */
/*
.lista-enter-active{
	animation-name:example, example2;
	animation-duration:2s,2s;
}
.lista-leave-active{
	animation:none reverse;
	/*animation:example 0s reverse;*/
/*}*/
/*
@keyframes example{

	0%{
		transform: rotate(0deg) scale(0);
	}
	100%{
		transform:rotate(720deg) scale(1);
	}
}
@keyframes example2{
	0%{
		opacity:0;
	}
	100%{
		opacity:1;
	}	
}
*/





</style>