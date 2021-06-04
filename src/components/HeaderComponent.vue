<template>
	<div class="total" :class="{'page-container':parentMdDrawer}" :style="{'background-color': back +' !important'}">
		
		<div class="nav" :class="[smallHeader ? 'nav-min':'nav-normal',smallHeader ? 'nav_min':'nav_normal']" >
<!--cambiar el min-height en el resize event-->
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

			<div class="m_auto" v-if="!sessionState">
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
					<md-button class="primary_nav" :class="[{'disabled':sessionState},smallHeader ? 'md-icon-button': 'md-fab',{'md-dense':denseHeader}]"  title="Album" :disabled="sessionState">
						<md-icon :class="{c_white:!sessionState}">collections</md-icon>
					</md-button>
				</router-link>

				<router-link :to="{name:'effect',params:{ima:image}}">
					<md-button class="primary_nav" :class="[{'disabled':mainBigImage},smallHeader ? 'md-icon-button':'md-fab',{'md-dense':denseHeader}]" title="Panel de efectos" :disabled="mainBigImage">
						<md-icon :class="{c_white:!mainImage}">photo_filter</md-icon>
					</md-button>
				</router-link>
			</div>
		<!--para  el home-->
			
			<div class="logo_biedit" :class="smallHeader ? 'logo_min_h2':'logo_h2'" v-else>				
				<!--<img src="img/home/biedit_logo.png"  :class="smallHeader ? 'logo_min':'logo'"/>-->
				
				<!--<span class="">Biedit</span>-->
				
			</div>
			
		</div>

				
		<!-- el atributo key permite enviar la imagen al mainpanel -->
		<router-view :key="$route.fullPath"  @reload="reloadImage" @setnav="setNav" :options="options"></router-view>

		<Session :dialog="showDialog" :dialogLogout="showDialog2" @offdialog="changeDialog" @setnav="setNav"></Session>

<!-- posiblemente se puede anular, tan solo para el link a cutImage() -->
		<md-dialog-alert class="confirmDialog" id="confirmDialog" 
			:md-active.sync="dialogErrorActive"
			:md-title = "titleDialogAlert"
			:md-content = "msgeDialogAlert"
			md-confirm-text="OK" @click="testMessage(msgeDialogAlert)" 
			:md-click-outside-to-close="dialogSwitch"/>

		<md-dialog-alert class="confirmDialog"
		:md-active.sync="dialogSuccessActive"
		:md-title = "titleDialogAlert"
		:md-content = "msgeDialogAlert"
		md-confirm-text="OK" />

		<md-dialog class="acercade" :md-active.sync="dialogAcercade">
			<md-dialog-title>Acerca de Biedit</md-dialog-title>
			<md-tabs md-dynamics-height class="tabs_acercade">
				<md-tab md-label="Biedit">
					<p>Biedit es una aplicación de edición de imágenes sencilla, rápida e intuitiva que permite organizar nuestras imágenes favoritas en un álbum individual y generar distintos efectos y ajustes.</p> 
				</md-tab>
				<md-tab md-label="Paneles de Biedit">
					<p>Biedit dispone de varios paneles que permiten realizar las distintas acciones.</p>
					<ul>
						<li>
							<span class="li_biedit_info">Panel principal:</span> Permite redimensionar la imagen con la ayuda de un manejador y almacenarla en el álbum con las dimensiones seleccionadas.
						</li>
						<li>
							<span class="li_biedit_info">Panel de recorte:</span> Permite recortar una región de la imagen con la ayuda de un cuadrante redimensionable y deslizable
						</li>
						<li>
							<span class="li_biedit_info">Panel de efectos:</span> Permite realizar efectos a la imagen como filtros, formas poligonales, fusión entre dos imágenes, marcas de agua...
						</li>
						<li>
							<span class="li_biedit_info">Álbum:</span> Permite administrar las imágenes y organizarlas mediante un sistema de paginación y ofrece información genérica de la imagen.
						</li>
					</ul>

				</md-tab>
			</md-tabs>
		</md-dialog>
		<!-- ocultamos el md-drawer y desactivamos la clase page-container para evitar
			el conflicto de md-drawer con el componente cut panel, esto se hace 
			mediante la variable parentMdDrawer y el método watch-->
		<!--queda por solucionar los otros dialog de camara y acerca de biedit -->
		<div v-if="parentMdDrawer" >
			<md-drawer  :md-active.sync="showSidePanel" class="opciones" md-right>
				<md-list>
					<md-list-item @click="showSidePanel=false;dialogAcercade=true">
						<span class="md-list-item-text">Acerca de Biedit</span>
						<span>
							<img src="img/home/biedit_b.png"  width="32"/>
						</span>
					</md-list-item>
					<md-list-item @click="testCam()" v-if="!sessionState">
						<span class="md-list-item-text">Cámara</span>
						
					</md-list-item>
					<md-list-item @click="volumeActive=!volumeActive"  v-if="!sessionState">
						<span class="md-list-item-text" >Ajustes</span>
					</md-list-item>	
									
					<md-list-item v-if="volumeActive"  style="padding-top:3px;padding-bottom:3px">
						<label style="color:white">Volumen</label>
						<md-button style="" class="md-icon-button" @click="volumeState=!volumeState;editVolume()">
							<md-icon class="c_white" v-if="volumeState">volume_up</md-icon>
							<md-icon class="c_white" v-else>volume_off</md-icon>
						</md-button>
						<input type="range" min="0" max="10" v-model="volume"  @input="editVolume()"/>
					</md-list-item>

					<md-list-item v-if="volumeActive" style="padding-top:3px;padding-bottom:3px">
						<div style="color:white;">Fondo</div>
						<div  class="clearL"></div>
						<div class="theme"></div>						
						<md-checkbox v-model="selectedBack" value="grey" @change="setBack()">Gris</md-checkbox>
						<md-checkbox v-model="selectedBack" value="white" @change="setBack()">Blanco</md-checkbox>
						<md-checkbox v-model="selectedBack" value="black" @change="setBack()">Negro</md-checkbox>
					</md-list-item>
				</md-list>				
			</md-drawer>
		</div>
	</div>
</template>
<script>
import Global from '../Global.js';
import Session from './Session.vue';
import methodsMixin from '../mixins/methodsMixin';
import servicesMixin from '../mixins/servicesMixin';
export default {
	name:'HeaderComponent',
	mixins:[methodsMixin,servicesMixin],
	components:{
		Session		
	},
	watch:{		
		'$route'(){			
			//subimos el z-index en el panel de recorte para tener acceso al .nav
			//con el modal dialog activado
			if(this.$route.name=="cutout"){
				document.querySelector(".nav").style.zIndex="6";
				this.parentMdDrawer=false;
			}else{				
				document.querySelector(".nav").style.zIndex="1";
				/*document.body.style.backgroundColor="#676767"*/
				this.parentMdDrawer=true;
			}			
		}
	},
	data(){
		return{
			selectedBack:null,
			//color fondo global que establecemos en created()
			back:null,	
			options:{
				mobileDevice:false,
				//fondo de color global (asigna los estilos en varios divs con :style 
				//y un div en Collections)
				backColor:null
			},
			nav:false,
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
				boxPanelMargin:'10px',
				windowSize:{},
				
				
				
			},			
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
			//interruptor para deshabilitar botones si no existe sesion
			sessionState:null,
			//interruptor para habilitar solo el botón de efectos, necesario para
			//las imágenes enviadas desde collections mayores de 2MB., esto se 
			//diferencia de mainImage pk effects si permite funciones con imágenes
			//mayores de 2MB
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
					/*
					width:1280,
					height:720
					*/
				}
			},
			//volumen de la etiqueta audio usada en Cam y CutPanel, almacenada en sessionStorage
			volume:null,
			volumeActive:false,
			//identificador de volumen encendido o apagado
			volumeState:true,
			//identificador para smallerHeader (botones de navegador más pequeños)
			smallHeader:false,
			//identificador para denseHeader (botones de navegador diminutos)
			denseHeader:false,
			//bloqueo de modal-dialog para no poder cerrar hasta que no se pulsa OK
			dialogSwitch:false,
		}
	},
	created:function(){
		//comprobamos si es dispositivo movil
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			this.options.mobileDevice=true;
			//console.log("es dispositivo movil");	
		}
		//establecemos en la variable back el código hexadecimal del 
		//background-color establecido en el sessionStorage necesario que está asignado
		//a los estilos del primer div de este mismo componente(HeaderComponent)

		//testBackColor() devuelve un string asignado en sessionStorage o 
		//establece gris por defecto
		//getBackColor() devuelve el código hexadecimal según el string pasado
		this.selectedBack=this.testBackColor();
		this.options.backColor=this.testBackColor();
		//con back se establece el fondo global		
		this.back=this.getBackColor(this.testBackColor());
		console.log("back: ",this.back)
		
	},
	mounted:function(){
		this.smallerHeader();
		this.$nextTick(function(){
			window.addEventListener("resize",this.smallerHeader);	
		})
		
		//podría ser útil para la opción de facingMode en el componente Cam
		/*
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			this.options.mobileDevice=true;
			console.log("es dispositivo movil");	
		}
		*/
		//asignamos el ancho máximo de la imagen según el ancho del dispositivo
		let size=this.getWidthAccordingWindow();
		this.image.windowSize={width:window.innerWidth,height:window.innerHeight};
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
			this.sessionState=true;			
		this.video=this.$refs.video;
		this.volume=sessionStorage.getItem("biedit_audio");
	},

	methods:{
		setBack(){
			//falta establecer en el servicio y actualizar la db			
			this.setBackColor(this.selectedBack)
			this.back=this.getBackColor(this.selectedBack)
			this.options.backColor=this.selectedBack;
		},
		
		resetSquareAndImage(square,boxImg){
			//reiniciamos cuadro
			square.style.top="0px";
			square.style.left="0px";
			//reiniciamos imagen del cuadro
			boxImg.style.top="0px";
			boxImg.style.left="0px";
		},
		
		//anulado		
//comprobar this.$route.name y solo actuar en componentes necesarios, chrome da muchos
//tirones y se ralentiza al generar los cálculos, en firefox no da errores
		smallerHeader(){
			console.log("llegando a smallerHeader")

			let square=document.querySelector(".square-panel");
			let boxImg=document.querySelector("#box-img-main");
			//reseteamos cuadro e imagen del cuadro cuando redimensionamos
			if(square && boxImg)
				this.resetSquareAndImage(square,boxImg);
			let wSize={
				width:window.innerWidth,
				height:window.innerHeight
			}			
			this.image.windowSize.width=wSize.width;			
			if(wSize.width<380){
				this.denseHeader=true;
				this.smallHeader=true;
				this.image.boxPanelMargin='44px';
			}
			else if(wSize.width<520){
				this.smallHeader=true;
				this.denseHeader=false;
				/*this.image.boxPanelMargin='36px';				*/
				this.image.boxPanelMargin='44px';
			}
			else{
				this.smallHeader=false;
				this.denseHeader=false;
				this.image.boxPanelMargin='11px';				
				//actualizando panel de recorte				
				if(this.$route.name=="cutout"){							
					console.log("redimensionando...",this.$route.name);
					//ancho correspondiente a la ventana del dispositivo
					let size=this.getWidthAccordingWindow();					
					this.maxWidthDefault=size;
					let sizesCut=this.setSizeToCutPanel(this.image.widthInitial,this.image.heightInitial,this.minWidthHeight,this.maxWidthDefault,this.maxHeightDefault);					
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
		},
		//asignar nuevo volumen
		editVolume(){
			//vol true: volumen activado, vol false volumen desactivado
			let volume;
			if(this.volumeState)				
				(this.volume==10) ?	volume=1 : volume=parseFloat("0."+this.volume);
			else
				volume=0;
			sessionStorage.setItem("biedit_audio",volume)
		},
		//comprobar cámara
		testCam(){
			let session=this.testSession();
			if(!session){				
				return;
			}			
			if(session.status=="error"){
				this.msgeDialogAlert=session.message;
				this.dialogErrorActive=true;
				return;
			}
			let media=navigator.mediaDevices;
			if(media && media.getUserMedia){				
				media.getUserMedia(this.constraints).then(() => {			
					this.showSidePanel=false;
					if(this.$route.name != "cam")					
						this.$router.push({name:"cam"});
					else
						this.$forceUpdate();		
				}).catch(error =>{
					
					this.titleDialogAlert="No se ha podido establecer conexión con la cámara";
					this.msgeDialogAlert=this.testErrorCam(error);
					this.dialogErrorActive=true;					
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
						
						this.image.width = sizes.width
						this.image.height = sizes.height;
						this.image.file=file;
						//enviar todos los datos de la imagen y redirigir a MainPanel
						this.redirectToMainPanel(this.image);
				
						this.uploadImageToServer();

					}					
					if(window.FileReader){					
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
			if(!this.image.name){
				this.msgeDialogAlert="Para acceder al panel de recorte es necesario subir una imagen o añadir una imagen al panel principal";
				this.titleDialogAlert="No existe imagen";			
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
			this.$router.push({
				name:'cutout',
				params:{
					ima:this.image,			
				}
			});
		},
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
				}
			}
			this.image.name=this.url+'get-image/'+image.random_name,headers;
			this.image.src=image.random_name;			
			let sizesMain=this.setSizeToMainPanel(image.width,image.height,this.minWidthHeight,this.widthDefault);			
			this.image.width=sizesMain.width;
			this.image.height=sizesMain.height;						
			this.image.widthInitial=image.width;
			this.image.heightInitial=image.height;
			let sizesCut=this.setSizeToCutPanel(image.width,image.height,this.minWidthHeight,this.maxWidthDefault,this.maxHeightDefault);
			this.image.widthCut=sizesCut.width;
			this.image.heightCut=sizesCut.height;
			this.image.spaceColor=image.space_color;
			
			//habilitar/deshabilitar botones
			this.mainImage=false;
			this.mainBigImage=false;
			this.sessionState=false;
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
			this.mainImage=state;
			let session=this.testSession();
			if(session.status=="error")
				this.sessionState=true;
			else
				this.sessionState=false;			
			this.mainBigImage=state;

		},
	}
}
</script>
<style>
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