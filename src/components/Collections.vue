<template >
	
	<div v-if="images" class="">
		<transition-group name="list" tag="md-card"  mode="out-in" >
			<md-card v-for="image in images" :key="image.id" class="list-item" >
				<md-card-media-cover  md-solid>

					<md-card-media md-ratio="4:3">
						<img  :src="url+'get-image/'+image.random_name" :width="image.width" :height="image.height"/>
					</md-card-media>
				
					<md-card-area >
						<md-card-header class="p_10">
							<span   class="f15" >{{image.title}}</span>
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
		<!--el método testMessage sirve para el dialog del headerComponent y para este de collections-->
		<md-dialog-alert class="confirmDialog" id="confirmDialog" 
		:md-active.sync="dialogErrorActive"
		:md-title = "titleDialogAlert"
		:md-content = "msgeDialogAlert"
		md-confirm-text="OK" @click="testMessage(msgeDialogAlert)"
		:md-click-outside-to-close="dialogSwitch"/>

		<md-dialog-confirm class="confirmDialog"
		:md-active.sync="dialogSuccessActive"
		:md-title = "titleDialogConfirm"
		:md-content = "msgeDialogConfirm"
		md-confirm-text="OK" 
		md-cancel-text="Cancelar"		
		@md-confirm="setAction(action)" 
		:md-click-outside-to-close="dialogSwitch" />

		<md-dialog :md-active.sync="loading" class="dialog_spinner_trans">
			<md-progress-spinner   md-mode="indeterminate" class="m_auto" ></md-progress-spinner>
		</md-dialog>
		<!-- modal de imagen en pantalla completa -->
		<transition name="fadeimg">
			<md-dialog :md-active.sync="dialogImage" class="fullImage" v-if="showFullImage">				
				<img :src="url+'get-image/'+this.tmpImage" />
				
			</md-dialog>
		</transition>
	</div>
</template>
<script>
import Global from '../Global.js';
import servicesMixin from '../mixins/servicesMixin';
import methodsMixin from '../mixins/methodsMixin';
export default {
	name:"collections",
	props:['imageMain'],
	mixins:[methodsMixin,servicesMixin],
	data(){
		return{	
			//para que funcione el efecto transition no puede ser null		
			images:[],
			//utilizamos imageTmp  e image para imágenes temporales en confirmAction() y 
			//deleteImage()
//imageTmp por revisar si es necesaria
			imageTmp:{
				name:null,
				width:null,
				height:null,
				src:null
			},
			imagetmp:null,
			image:null,			
			imagetmpmain:null,			
			url:Global.url,			
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
			loading:false,
			iconLoading:null,
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
	mounted(){		
		//no es necesario el session ya que lo contiene el método getImages()
		this.getImages();
		if(!this.imageMain){
			console.log("existe imagen en el panel: ",this.$refs);
			console.log("recargando página");
		}else if(this.imageMain && this.imageMain.src== null){
			console.log("no hay nada en el panel principal");
		}else{
			//podríamos asignar imagetmpmain
			console.log("existe imagen en el panel: ",this.imageMain);
		}
	},	
	methods:{	
		setAction(action){
			if(action=="delete")
				this.deleteImage(this.imagetmp,this.imagetmpmain)
			else if(action=='download')
				this.downloadFile(this.imagetmp)
			this.action=null;
		},
		confirmAction(image,action){		
			this.imagetmp=image;
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
			console.log("llega a dropImage: ",image)
			for(let key in image){
				//es necesario mantener el widthDefault
				if(key != "widthDefault"){					
					image[key]=null;
				}
			}			
		},
		sendToMainPanel(image){
			console.log(this.imageMain)
			//si la imagen seleccionada ya se encuentra en el panel principal detenemos
			if(this.imagetmpmain && this.imagetmpmain.random_name==image.random_name
				|| this.imageMain && this.imageMain.src==image.random_name){
				console.log("es la misma imagen: ");
				return;
			}else if(image && image.size>3000000){
				this.titleDialogAlert="Imagen muy grande";
				this.msgeDialogAlert="La imagen es mayor a 2MB"
			}else{				
				//si la imagen pasa las condiciones anteriores actualizamos el objeto
				//image del padre (HeaderComponent) que a su vez actualiza la prop
				//imageMain
				this.$emit("reload",image);
			//por si se ha recargado la página y no existe imageMain asignamos imagetmpmain				
				this.imagetmpmain=image;				
			}						
		},
		getNewHeight(newWidth,width,height){
			let newHeight=Math.round((newWidth*height)/width);
			return newHeight;
		},
		showImage(image){			
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
			
	//opción con window.open()			
				//window.open(this.url+'download?image='+image.random_name+'&name='+title+'&id='+image.user_id+'&path='+image.path,"__blank");
//opción con window.location
			window.location=this.url+'download?image='+image.random_name+'&name='+title+'&id='+image.user_id+'&path='+image.path;
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