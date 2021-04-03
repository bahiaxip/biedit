<template>
	<div class="total" :class="{'page-container':parentMdDrawer}" >
		
		<div class="nav " style="background:#434540">
		<!--<md-toolbar class="md-accent" >-->
			<div class="floatL"   >
				<md-button class="primary_nav "  :class="[smallHeader ? 'md-icon-button' : 'md-fab',{'md-dense':denseHeader}]" title="Sesión" @click="switchDialog()" >
					<md-icon class="c_white">person</md-icon>
				</md-button>
			</div>
			<!-- deshabilitamos el md-drawer pk genera conflicto con el componente cut-panel-->
			<div class="floatR" >
				<md-button class="primary_nav" :class="[smallHeader ? 'md-icon-button' : 'md-fab',{'md-dense':denseHeader}]"   title="Opciones" @click="showSidePanel=true" :disabled="!parentMdDrawer">
					<md-icon class="c_white">settings</md-icon>
				</md-button>
			</div>
			<div class="m_auto">
				<md-button class="primary_nav" :class="[smallHeader ? 'md-icon-button' : 'md-fab',{'md-dense':denseHeader}]" title="Subir imagen" @click="selectUpImage()" >
					<md-icon class="c_white">
						add_photo_alternate
					</md-icon>
				</md-button>
				<input type="file" name="images[]" id="archivo" class="archivo" @change="selectedFile($event)" >

				<router-link :to="{name:'MainPanel',params:{ima:image}}">
					<md-button class="primary_nav" :class="[{'disabled':mainImage},smallHeader ? 'md-icon-button':'md-fab',{'md-dense':denseHeader}]" title="Panel principal" :disabled="mainImage" >
						<md-icon :class="{c_white:!mainImage}">panorama</md-icon>										
					</md-button>
				</router-link>
				<!--<md-button class="md-fab md-accent" title="Opciones" @click="switchResize()" >
					<md-icon>open_in_full</md-icon>
				</md-button>-->

				<md-button class="primary_nav" :class="[{'disabled':mainImage}, smallHeader ? 'md-icon-button': 'md-fab',{'md-dense':denseHeader}]" title="Panel de recorte" @click="cutImage()" :disabled="mainImage" >
					<md-icon :class="{c_white:!mainImage}">crop</md-icon>
				</md-button>

				<!--<md-button class="md-fab md-accent" title="Panel de recorte" @click="cropImage()" v-else>
					<md-icon>crop_free</md-icon>
				</md-button>-->

				<router-link :to="{name:'collections',params:{imageMain:image}}">
					<md-button class="primary_nav" :class="[smallHeader ? 'md-icon-button': 'md-fab',{'md-dense':denseHeader}]"  title="Album" >
						<md-icon class="c_white">collections</md-icon>
					</md-button>
				</router-link>

				<router-link :to="{name:'effect',params:{ima:image}}">
					<md-button class="primary_nav" :class="[{'disabled':mainBigImage},smallHeader ? 'md-icon-button':'md-fab',{'md-dense':denseHeader}]" title="Panel de efectos" :disabled="mainBigImage">
						<md-icon class="c_white">photo_filter</md-icon>
					</md-button>
				</router-link>
			</div>
		</div>
		<!--</md-toolbar>-->
		<!-- el atributo key permite enviar la imagen al mainpanel -->
		<router-view :key="$route.fullPath"  @reload="reloadImage" @setnav="setNav"></router-view>
		
		<!--<MainPanel :ima="image" :initial="imageInitial"></MainPanel>-->
		<!--<CutPanel></CutPanel>-->
		<!-- div modal -->
	<!--<div >
		
	</div>-->
		<Session :dialog="showDialog" :dialogLogout="showDialog2" @offdialog="changeDialog" @setnav="setNav"></Session>
	<!--<keep-alive include="name" v-if="$route.name!='MainPanel'">
		<router-view></router-view>
	</keep-alive>-->
<!-- posiblemente se puede anular, tan solo para el link a cutImage() -->
		<md-dialog-alert class="confirmDialog" id="confirmDialog" 
			:md-active.sync="dialogErrorActive"
			:md-title = "titleDialogAlert"
			:md-content = "msgeDialogAlert"
			md-confirm-text="OK" />

		<md-dialog-alert class="confirmDialog"
		:md-active.sync="dialogSuccessActive"
		:md-title = "titleDialogAlert"
		:md-content = "msgeDialogAlert"
		md-confirm-text="OK" />

		<md-dialog class="acercade" :md-active.sync="dialogAcercade">
			<md-dialog-title>Acerca de Biedit</md-dialog-title>
			<md-tabs md-dynamics-height>
				<md-tab md-label="Biedit">
					<p>Biedit es una aplicación de edición de fotografía sencilla, rápida e intuitiva que permite organizar nuestras imágenes en un álbum individual y realizar numerosos efectos y ajustes.</p> 
				</md-tab>
				<md-tab md-label="Paneles de Biedit">
					<p>Biedit se compone de varios paneles con distintas funcionalidades.</p>
					<ul>
						<li>
							Panel principal: Permite redimensionar la imagen con la ayuda de un manejador y mostrarla en pantalla con las dimensiones deseadas.							
						</li>
						<li>
							Panel de recorte: Permite recortar una región de la imagen con la ayuda de un cuadrante redimensionable deslizable
						</li>
						<li>
							Panel de efectos: Permite realizar efectos a la imagen como filtros, formas poligonales, fusión entre dos imágenes...
						</li>
						<li>Álbum: Permite organizar las imágenes mediante un sistema de paginación y gestiones como eliminar o cargar la imagen para acceder al resto de paneles
						</li>
					</ul>

				</md-tab>
			</md-tabs>
		</md-dialog>
		<!-- ocultamos el md-drawer y desactivamos la clase page-container para evitar
			el conflicto de md-drawer con el componente cut panel, esto se hace 
			mediante la variable parentMdDrawer y el método watch-->
		<!--queda por solucionar los otros dialog de camara y acerca de biedit -->
		<div v-if="parentMdDrawer">
			<md-drawer  :md-active.sync="showSidePanel" md-right >
				<md-list>
					<md-list-item @click="showSidePanel=false;dialogAcercade=true">
						<span class="md-list-item-text">Acerca de Biedit</span>
					</md-list-item>
					<md-list-item @click="testCam()">
						<span class="md-list-item-text">Cámara</span>
						
					</md-list-item>
					<md-list-item @click="volumeActive=!volumeActive">
						<span class="md-list-item-text" >Ajustes de sonido</span>
					</md-list-item>
					<md-list-item>
						<input type="range" min="1" max="10" v-model="volume" v-if="volumeActive" @input="editVolume()"/>
					</md-list-item>
				</md-list>				
			</md-drawer>
		</div>
	</div>
</template>
<script>
//import MainPanel from './MainPanel.vue';
//import CutPanel from './CutPanel.vue';
import Global from '../Global.js';
import Session from './Session.vue';
//import axios from 'axios';
import methodsMixin from '../mixins/methodsMixin';
import servicesMixin from '../mixins/servicesMixin';
export default {
	name:'HeaderComponent',
	mixins:[methodsMixin,servicesMixin],
	components:{
		Session
		//CutPanel,
		//MainPanel
	},
	watch:{
		//detectamos cambios con watch y $route que permite detectar el cambio de ruta para poder desactivar el botón de cutPanel
		//no necesario, anulado el botón de secundario en el header, pero 
		//recuperado para activar el z-index del .nav y así acceder desde el cutPanel
		//a todos los elementos del navegador, ya que el md-overlay que incorpora 
		//el modal de material es el mismo para todos los modals
		'$route'(){
			/*if(this.$route.name!="cutout" && this.cutPanelSwitch==true){
				this.cutPanelSwitch=false;
			}
			*/
			//subimos el z-index en el panel de recorte para tener acceso al .nav
			//con el modal dialog activado
			if(this.$route.name=="cutout"){
				document.querySelector(".nav").style.zIndex="6";
				this.parentMdDrawer=false;
				
					
			}else{
				console.log(this)
				document.querySelector(".nav").style.zIndex="1";
				this.parentMdDrawer=true;
			}
			console.log("pasa el watch")
		}	
		
	},
	data(){
		return{			
	//propiedades de ancho establecidas
			//ancho asignado para panel principal por defecto
			widthDefault:Global.widthDefault,
			minWidthHeight: Global.minWidthHeight,
			//máximo ancho para panel de recorte por defecto
			maxWidthDefault:Global.maxWidthDefault,
			maxHeightDefault:Global.maxHeightDefault,
			maxSizeFile:Global.maxSizeFile,
			//asignamos la ruta de la api
			url:Global.url,
			//interruptor que detecta si se ha subido alguna imagen sin recargar página		
			uploadFile:null,
			//imagen con las medidas establecidas para el panel principal
			image:{
				name: null,	
				//width y height asignados para panel principal			
				width:null,
				height:null,
				widthCut:null,
				heightCut:null,
				file:null,
				src:null,
				weight:null,
				widthDefault:null,
				//medidas imagen original
				widthInitial:null,
				heightInitial:null,
				//identificador de class para añadir margin-top cuando redimensiona el 
				//navegador en BoxPanel
				boxPanelMargin:'8px',
				windowSize:{},
				
			},
			//medidas imagen original
			/*imageInitial:{
				//width y height originales de la imagen
				width:null,
				height:null
			},
			*/
			//medidas para panel de recorte
			resizedImg:{
				//width y height asignados para panel de recorte
				width:null,
				height:null,
				src:null
			},
			//dialog en componente Session 
			showDialog:false,
			showDialog2:false,
			timerParent:null,

			//dialog de ajustes (menú lateral derecho)
			dialogAcercade:false,
			//interruptor para dialog del panel principal en la redimensión
			resizeSwitch:false,
			//interruptor para dialog del panel  de de recorte
			cutPanelSwitch:false,
			dialogErrorActive:false,
			dialogSuccessActive:false,
			msgeDialogAlert:null,
			titleDialogAlert:null,
			//interruptor para deshabilitar botones si no existe imagen principal
			mainImage:false,
			//interruptor para habilitar solo el botón de efectos, necesario para
			//las imágenes enviadas desde collections mayores de 2MB.
			mainBigImage:false,
			//interruptor para deshabilitar botones si la imagen es demasiado grande
			imgTooSize:false,
			//md-drawer
			showSidePanel:false,
			//padre md-drawer
			parentMdDrawer:true,
			constraints:{
				audio:true,
				video:{
					width:1280,
					height:720
				}
			},
			//volumen de la etiqueta audio usada en Cam y CutPanel, almacenada en sessionStorage
			volume:null,
			volumeActive:false,
			//identificador para smallerHeader (botones de navegador más pequeños)
			smallHeader:false,
			//identificador para denseHeader (botones de navegador diminutos)
			denseHeader:false,
			
			//anulado
			/*
			btnActive:{
				cut:false,
				main:false,
				effects:false,
				col:false,
				up:false,
				settings:false,
			},
			*/
			

		}
	},
	mounted:function(){

		this.smallerHeader();
		this.$nextTick(function(){
			window.addEventListener("resize",this.smallerHeader);	
		})		
		
		//test device type
		//podría ser útil para la opción de facingMode en el componente Cam
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			console.log("es dispositivo movil");	
		}
		//asignamos el ancho máximo de la imagen según el ancho del dispositivo
		let size=this.getWidthAccordingWindow();
		this.image.windowSize={width:window.innerWidth,height:window.innerHeight};
		console.log("windowSize: ",this.image.windowSize.width);		
		this.maxWidthDefault=size;
		
		//el ancho asignado por defecto del panel principal: widthDefault (estblecido en 600.
		//si el ancho asignado según la resolución del dispositivo es menor, 
		//aprovechamos el maxWidthDefault destinado al panel de recorte y se asigna al widthDefault
			if(size<this.widthDefault){
				this.widthDefault=size;
			}
		//duplicamos la misma variable del max. ancho, para asignarlo como propiedad del objeto image y así pasarlo a otro componente sin tener que mandar otro parámetro nuevo, por ejemplo al MainPanel para que la redimensión libre no
		//genere errores
		this.image.widthDefault=this.widthDefault;		
		//establecer máximo de redimensión  posible

		//deshabilitar botones navegador que requieren imagen principal
		if(!this.image.name){			
			this.mainImage=true;
			this.mainBigImage=true;			
		}
		let session=this.testSession();
		if(session.status=="error")
			this.switchDialog();
		this.video=this.$refs.video;
		this.volume=sessionStorage.getItem("biedit_audio");
		
		
	},
	updated(){

	},
	
	methods:{
		//anulado
		/*
		btnInactive(btn){
			switch (btn){
				case 'main':
					this.btnActive.main=false;
					break;
				case 'cut':
					this.btnActive.cut=false;
					break;
				case 'collections':
					this.btnActive.col=false;
					break;
				case 'effects':
					this.btnActive.effects=false;
			}
		},
		*/
//comprobar this.$route.name y solo actuar en componentes necesarios, chrome da muchos
//tirones y se ralentiza al generar los cálculos, en firefox no da errores
		smallerHeader(){
			let wSize={
				width:window.innerWidth,
				height:window.innerHeight
			}
			console.log("wSize: ",wSize)
			this.image.windowSize.width=wSize.width;
			if(wSize.width<380){
				this.denseHeader=true;
				this.smallHeader=true;
				this.image.boxPanelMargin='44px';
				
			}
			else if(wSize.width<520){
				this.smallHeader=true;
				this.denseHeader=false;
				this.image.boxPanelMargin='36px';
				
			}else{
				this.smallHeader=false;
				this.denseHeader=false;
				this.image.boxPanelMargin='8px';				
				//actualizando panel de recorte
				if(this.$route.name=="cutout"){
							//devuelven lo mismo
							//console.log(document.documentElement.clientWidth)
							//console.log(window.innerWidth)
				console.log("redimensionando...",this.$route.name);
					//ancho correspondiente a la ventana del dispositivo
				let size=this.getWidthAccordingWindow();
				console.log("size: ",size);					
					this.maxWidthDefault=size;
					//if(size<this.widthDefault )
						//this.widthDefault=size;

					//this.image.widthDefault=this.widthDefault;
					//console.log("maxWidthDefault: ",this.maxWidthDefault);
					//console.log("widthCut: ",this.image.widthCut)
					console.log(this.maxWidthDefault);
					let sizesCut=this.setSizeToCutPanel(this.image.widthInitial,this.image.heightInitial,this.minWidthHeight,this.maxWidthDefault,this.maxHeightDefault);
					console.log("sizesCut: ",sizesCut);
					//console.log("widthCut: ",this.image.widthCut);
					//console.log("heightCut: ",this.image.heightCut);
					//es necesario comprobar ya que no da tiempo el innerwidth a 
					//establecer los datos
					if(sizesCut.width)
						this.image.widthCut=sizesCut.width;
					if(sizesCut.height)
						this.image.heightCut=sizesCut.height;
			//actualizamos ancho y alto del hijo de dialog(md-dialog-container que es 
			//dinámico de vue material)
					document.querySelector(".back-cut-panel").firstChild.style.minWidth=this.image.widthCut+"px";
					document.querySelector(".back-cut-panel").firstChild.style.height=this.image.heightCut+"px";
				}
				else if(this.$route.name=="MainPanel"){
					let size=this.getWidthAccordingWindow();
					
					console.log("window width: ",this.image.windowSize.width);
					let sizeTmp;
					if(size<this.widthDefault){
						sizeTmp=size;
					}else{
						sizeTmp=this.widthDefault;
					}
					let sizesMain=this.setSizeToMainPanel(this.image.widthInitial,this.image.heightInitial,this.minWidthHeight,sizeTmp);			
					this.image.width=sizesMain.width;
					this.image.height=sizesMain.height;
				}
			}
			//this.image.windowSize.width=wSize.width;
			console.log(wSize.width);			

		},
		//asignar nuevo volumen
		editVolume(){
			let volume;
			if(this.volume==10)
				volume=1;
			else
				volume=parseFloat("0."+this.volume);
			sessionStorage.setItem("biedit_audio",volume)
			console.log("audiovolume: ",volume)
			//no soportada por firefox
			//comprobar permisos probado solo chrome
			/*
			navigator.permissions.query({name:'camera'}).then((permissionObj) => {
				console.log(permissionObj.state);
			}).catch((error) => {

				console.log("error: ",error);
			})
			*/
			//var mediaStreamTrack=
		},
		//comprobar cámara
		testCam(){
			let session=this.testSession();
			if(!session){				
				return;
			}
			console.log("pasa")
			if(session.status=="error"){
				this.msgeDialogAlert=session.message;
				this.dialogErrorActive=true;
				return;
			}

			let media=navigator.mediaDevices;
			if(media && media.getUserMedia){				
				media.getUserMedia(this.constraints).then(() => {
					//window.stream=stream;
					//this.video.srcObject=stream;					
					//cerramos el drawer y enviamos a cam
					this.showSidePanel=false;
					if(this.$route.name != "cam")
					//console.log("ruta_name: ",this.$route.name)
						this.$router.push({name:"cam"});
					else
						this.$forceUpdate();		
				}).catch(error =>{
					
					
					this.titleDialogAlert="No se ha podido establecer conexión con la cámara";
					this.msgeDialogAlert=this.testErrorCam(error);
					this.dialogErrorActive=true;	
					
					
					//enviamos mensaje de no encontrar dispositivo conectado
					//console.log("no existe dispositivo: ",error)
				})

			}else{
				console.log("no es soportado por el navegador")
			}
			this.showSidePanel=false;
		},
		//evento de input file	
		selectUpImage(){
			let archivo=document.getElementById("archivo");			
			archivo.click();
		},
		//método principal que valida y envía la imagen seleccionada en el input file
		selectedFile(e){			
			if(e.target.files.length > 0){

				let archivo=document.getElementById("archivo");
				if(archivo.value.length){
					let file=archivo.files[0];
					//validamos la extensión y el espacio que ocupa con un máximo establecido	
					if(this.validateImage(file,this.maxSizeFile)===false){
						return false;
					}

			//si no es necesaria esta comprobación eliminar!!!
				//comprobamos uploadFile para detectar si ha pulsado por segunda 
				//vez el explorador de archivos(input file)sin recargar la página
					if(this.uploadFile){
						console.log("segunda selección");
					}else{
						this.uploadFile=true;
						console.log("primera selección");
					}
			//redimensionar imagen y mostrar en pantalla mediante JavaScript enviando al componente MainPanel, acto seguido se sube al servidor y se registra en la db
					this.loadImage(file);					

				}else{
					//console.log("No se ha seleccionado ningún archivo");
				}
			}
		},

		//método que carga la imagen con FileReader, asigna los datos de la imagen 
		//al objeto image y asigna el ancho y el alto (manteniendo las proporciones 
		//al original) para mostrar en MainPanel
		
		loadImage(file){
			//Nota: Si un método se pasa como función flecha no obtiene el mismo objeto this
			if(file){				
				if(window.FormData){
					let image  = new Image();
					image.onload = () => {
					//image.widthInitial y image.heightInitial son las dimensiones de la imagen originales
						this.image.widthInitial=image.width;
						this.image.heightInitial=image.height;
				//comprobaciones para asignar medidas para MainPanel
						let sizes=this.setSizeToMainPanel(image.width,image.height,this.minWidthHeight,this.widthDefault);
						console.log(sizes);
						this.image.width = sizes.width
						this.image.height = sizes.height;
						this.image.file=file;
						
						//enviar todos los datos de la imagen y redirigir a MainPanel
						this.redirectToMainPanel(this.image);
				
						this.uploadImageToServer();

					}
					//console.log(im);
					if(window.FileReader){
						//console.log("Soporta FileReader");
						var reader = new FileReader();
						reader.onloadend = (event) =>{
							image.src=event.target.result;
							
							this.image.name=event.target.result;
						}
						reader.readAsDataURL(file);
						
					}else{
						console.log("No soporta FileReader");						
						return;
					}
				}else{
					alert("El navegador no soporta FormData");
				}
			}
		},
		
		//Con todos los datos y la imagen cargada con FileReader 
		//cargamos el componente main para mostrar la imagen.
		//Para ello Comprobamos si no existen parámetros o si la 
		//ruta actual no es main(MainPanel) y redirigimos a /main (
		//MainPanel), ya que de lo contrario, la ruta de MainPanel 
		//está configurada para redirigir a la raíz. 
		redirectToMainPanel(image){
			if(!this.$route.params.ima || this.$route.name!='MainPanel'){
				this.$router.push({
					name:"MainPanel",
					params:{
						ima:image,
						//initial:this.image.widthInitial,
						//resizeSwitch:this.resizeSwitch
					}
				});							
			}
		},

						//métodos panel de recorte

		//acceder al panel de recorte
		cutImage(){
			//comprobar si existe archivo	
			console.log("todo");			
			//anulado
			//this.btnActive.cut=true;
			if(!this.image.name){
				this.msgeDialogAlert="Para acceder al panel de recorte es necesario subir una imagen o añadir una imagen al panel principal";
				this.titleDialogAlert="No existe imagen";
			//	this.dialogErrorActive=true;
				
			//	return;
			}
			if(this.$route.name=="cutout"){				
				//ya se encuentra en cutout;
				return;
			}
			//comprobamos si las dimensiones originales de la imagen son menores a 100
			if(this.image.widthInitial<100 ||  this.image.heightInitial<100){
				this.msgeDialogAlert="El panel de recorte requiere una imagen con ancho y alto superiores a 100 píxeles";
				this.titleDialogAlert="La imagen no es válida";
				this.dialogErrorActive=true;
				return;
			}
			
			//this.cutPanelSwitch=true;
			this.$router.push({
				name:'cutout',
				params:{
					ima:this.image,
					//resized:this.resizedImg
				}
			});
		},
		//proceso de recorte
		/*
		cropImage(){
			//si la ruta actual no es cutout detenemos
			if(this.$route.name!="cutout"){
				return;
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
					resizeWidth:this.image.widthCut,
					resizeHeight:this.image.heightCut,
					src : this.image.src,
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
						this.titleDialogAlert="Ocurrió un error";
						this.msgeDialogAlert=res.data.error;						
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
								cloneBoxSquare.style.display="none";
								self.titleDialogAlert="Guardado con éxito"
								self.msgeDialogAlert=res.data.message;
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
		*/
		//método de efecto en el recorte de imagen
		//método que clona el div box-square, le asigna ancho y alto, lo posiciona con top y left y lo ubica en el panel padre (back-box-panel, finalmente devuelve el div clonado 
		/*
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
		*/
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
		//sonido de recorte
		/*
		playSound(){
			let audio= document.querySelector("#crop-audio");
			audio.volume=0.1;
			audio.play();
		},
		*/		
		//cerrar panel dialog de register o login (component Session)
		//añadimos el parámetro state para mostrar el dialog de sesión de usuario 
		//(login y register) al cerrar sesión y no permitir acceder sin registrarse
		changeDialog(state=null){
			console.log("desde header: ",state);
			if(!state){
				state=false;
			}
			//pasamos las 2 a false en lugar de comprobar si es el dialogo de login-register o el de perfil-logou
			this.showDialog=state;
			this.showDialog2=false;

		},
		//método para detectar si existe sesión y mostrar un dialog u otro
		switchDialog(){			
			let session=this.testSession();
			if(!session){				
				return;
			}
			
				//comprobamos si están vacías para mostrar el dialog correcto
				//if(sessionStorage.getItem("biedit_apitoken") != 'null' && sessionStorage.getItem("biedit_apitoken") != 'undefined'){
			if(session.status=="success"){				
					//Aunque no debe estar y por tanto no es necesario, por seguridad pasamos el dialog login a false
				if(this.showDialog==true) this.showDialog=false;
				this.showDialog2=true;							
			}else{
					//si no existe sessionStorage mostramos dialog de session login y register
				this.showDialog=true;
			}
		},
		//recargamos el objeto image con los datos pasados por parámetro teniendo en 
		//cuenta que el objeto image se pasa como prop a otros componentes hijos y de
		//esta forma actualizamos desde esos hijos con $emit()
		reloadImage(image,callback=null){
		//establecemos medidas comprobando el dispositivo
			
			console.log("image desde reload: ",image);
			let size=this.getWidthAccordingWindow();
			this.maxWidthDefault=size;
			if(size<this.widthDefault)
				this.widthDefault=size;
			this.image.widthDefault=this.widthDefault;
		//recargamos el objeto image del componente con los datos que trae 
		//el objeto image que trae el método
			let headers={
				headers:{
					"Access-Control-Allow-Origin" : "*",
					"crossorigin":true,
					'Access-Control-Allow-Methods': "GET,POST,PUT",
					'Access-Control-Allow-Headers': "Content-Type",
					'Access-Control-Allow-Credentials':true,
					'cache-control':'no-cache',
					//'Access-Control-Allow-Headers':"Origin, X-Requested-With, Content-Type, Accept"					
				}
			}
			this.image.name=this.url+'get-image/'+image.random_name,headers;


			this.image.src=image.random_name;			
			let sizesMain=this.setSizeToMainPanel(image.width,image.height,this.minWidthHeight,this.widthDefault);			
			this.image.width=sizesMain.width;
			this.image.height=sizesMain.height;			
			//this.imageMain.height=this.getNewHeight(this.imageMain.widthDefault,image.width,image.height);			
			this.image.widthInitial=image.width;
			this.image.heightInitial=image.height;
			let sizesCut=this.setSizeToCutPanel(image.width,image.height,this.minWidthHeight,this.maxWidthDefault,this.maxHeightDefault);
			this.image.widthCut=sizesCut.width;
			this.image.heightCut=sizesCut.height;
			this.image.spaceColor=image.space_color;
			
			//habilitar/deshabilitar botones
			this.mainImage=false;
			this.mainBigImage=false;
			//si la imagen es mayor a 2MB deshabilitamos todos menos el effect (el 
			//collections nunca se deshabilita)
			if(image.size>2000000)
				this.mainImage=true
			//establecemos windowSize para panel effect
			if(image.windowSize)
				this.image.windowSize=image.windowSize;
			else
				this.image.windowSize={width:window.innerWidth,height:window.innerHeight};
			//callback sin definir
			if(callback!=null)
				callback();

		},
		//setNav cambia el estado disabled de los botones, necesario al eliminar
		//la imagen del panel principal y el logout de sesion
		setNav(state){
			console.log("funciona setNav")
			this.mainImage=state;
			this.mainBigImage=state;		
		},


	//método de intercambio de botón que sirve el mismo botón (sustituyendo el icono) para acceder al panel de recorte y volver al panel principal
	/*anulado, se ha pasado el botón al mismo componente de recorte*/
	/*
		switchResize(){
			if(!this.image.name){
				console.log("Para acceder a la redimensión es necesario subir una imagen");
				return;
			}

			let bol=this.resizeSwitch;
			if(!bol){
				this.resizeSwitch=true;	
			}else{
				this.resizeSwitch=false
			}
			
			
			this.$route.params.resizeSwitch=this.resizeSwitch;
			//console.log(this.$route.params. )
		},
	*/
	}
}
</script>
<style>

#app{

}
.md-menu{
	padding-left:10px;
	padding-right:10px;
}
.radius, .radius .md-menu-content-container{
	border-radius:350px !important;
}
.archivo{
	display:none;
}

			/*dialogs*/
/*
.confirmDialog .md-dialog-container{
	background:linear-gradient(to bottom, rgba(99, 0, 228,.8) 0%, rgba(99,0,228,1), rgba(99, 0, 228,.8) 100%);
	color:white;

}
.confirmDialog .md-button-content{
	color:white;
}
*/
.confirmDialog{
	height:auto;
	z-index:106 !important;
	position:absolute;
	/*necesario auto en bottom para sobreescribir los estilos del md-dialog*/
}

</style>
<style lang="scss" scope>
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  //options: 100,200,300,400,500,600,700,800,900,A100,A200,A400,A700
  //primary:#26ada7,
  //primary: md-get-palette-color(green, A400), // The accent or secondary color
  primary: rgba(38,173,167,1),
  accent: md-get-palette-color(pink, 600), // The accent or secondary color
  
  //theme:dark //dark o light

));

@import "~vue-material/dist/theme/all"; // Apply the theme
//necesario .page-container para md-drawer para ocultarlo


.page-container{
	min-height:300px;
	overflow:hidden ;
	position:relative;
}

.md-drawer {		
	width:230px;
	max-width:calc(100vw - 125px);
	

}
.md-content{
	padding:16px;
}
//no solucionado
//solución al conflicto del componente CutPanel con md-drawer en HeaderComponent
.solution_pagecontainer{
	z-index:120 !important;
	width:100%;height:100%;
	position:absolute !important;
	top:0;
	
}

</style>