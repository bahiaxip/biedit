<template>
	<div class="total" >
		
		<div class="nav ">
		<!--<md-toolbar class="md-accent" >-->
			<div class="floatL"   >
				<md-button class="md-accent md-fab" title="Sesión" @click="switchDialog()">
					<md-icon>person</md-icon>
				</md-button>
			</div>
			<div class="floatR" >
				<md-button class="md-accent md-fab" title="Sesión" @click="switchDialog()">
					<md-icon>person</md-icon>
				</md-button>
			</div>
			<div style="margin:auto;">
				<md-button class="md-fab md-accent" title="Subir imagen" @click="selectUpImage()" >
					<md-icon>
						add_photo_alternate
					</md-icon>
				</md-button>
				<input type="file" name="images[]" id="archivo" class="archivo" @change="selectedFile($event)" >

				<router-link :to="{name:'MainPanel',params:{ima:image}}">
					<md-button class="md-fab md-accent" title="Panel principal"  >
						<md-icon>panorama</md-icon>										
					</md-button>
				</router-link>
				<!--<md-button class="md-fab md-accent" title="Opciones" @click="switchResize()" >
					<md-icon>open_in_full</md-icon>
				</md-button>-->

				<md-button class="md-fab md-accent" title="Panel de recorte" @click="cutImage()" >
					<md-icon>crop</md-icon>
				</md-button>

				<!--<md-button class="md-fab md-accent" title="Panel de recorte" @click="cropImage()" v-else>
					<md-icon>crop_free</md-icon>
				</md-button>-->

				<router-link :to="{name:'collections',params:{imageMain:image}}">
					<md-button class="md-fab md-accent" title="Album"  >
						<md-icon>collections</md-icon>
					</md-button>
				</router-link>

				<router-link :to="{name:'effect',params:{ima:image}}">
					<md-button class="md-fab md-accent" title="Panel de ajustes"  >
						<md-icon>photo_filter</md-icon>
					</md-button>
				</router-link>
					

				
			</div>
			
			

		</div>
		<!--</md-toolbar>-->
		<!-- el atributo key permite enviar la imagen al mainpanel -->
		<router-view :key="$route.fullPath"  @reload="reloadImage"></router-view>
		
		<!--<MainPanel :ima="image" :initial="imageInitial"></MainPanel>-->
		<!--<CutPanel></CutPanel>-->
		<!-- div modal -->
	<div >
		
	</div>
	<Session :dialog="showDialog" :dialogLogout="showDialog2" @offdialog="changeDialog"></Session>
	<!--<keep-alive include="name" v-if="$route.name!='MainPanel'">
		<router-view></router-view>
	</keep-alive>-->
<!-- posiblemente se puede anular, tan solo para el link a cutImage() -->
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
</template>
<script>
//import MainPanel from './MainPanel.vue';
//import CutPanel from './CutPanel.vue';
import Global from '../Global.js';
import Session from './Session.vue';
import axios from 'axios';
import methodsMixin from '../mixins/methodsMixin';
export default {
	name:'HeaderComponent',
	mixins:[methodsMixin],
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
			}else{
				document.querySelector(".nav").style.zIndex="1";
			}
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
			
			//interruptor para dialog del panel principal en la redimensión
			resizeSwitch:false,
			//interruptor para dialog del panel  de de recorte
			cutPanelSwitch:false,
			dialogErrorActive:false,
			dialogSuccessActive:false,
			msgeDialogContent:null,
			msgeDialogTitle:null,

		}
	},
	mounted:function(){
		//test device type
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			console.log("es dispositivo movil");	
		}
		//asignamos el ancho máximo según el ancho del dispositivo
		let size=this.getWidthAccordingWindow();
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
	},
	
	methods:{
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


//faltan datos por subir(title,detail,...)
		//subida de archivo al servidor, dependiente de resizeImageToWidth()
		uploadImageToServer(){

			//no es necesario comprobar FormData, ya está comprobado anteriormente en resizeImageToWidth()
			//if(sessionStorage && FormData){
			if(sessionStorage){
				if(sessionStorage.getItem("biedit_apitoken")){					
					let api_token=sessionStorage.getItem("biedit_apitoken"),
						email=sessionStorage.getItem("biedit_email"),
					formdata= new  FormData();
					formdata.append("images[]",this.image.file);
					formdata.append("email",email);
					//formdata.append("api_token",api_token);
					//si la original es mayor se establece un máximo de ancho y alto por defecto(maxWidthDefault), si no se mantiene ancho y alto original	
					if(this.image.widthInitial>this.maxWidthDefault){
						formdata.append("width",this.maxWidthDefault);
						formdata.append("height",this.maxHeightDefault);
					}else{
						formdata.append("width",this.image.widthInitial);
						formdata.append("height",this.image.heightInitial);
					}

					//cabeceras
					let headers={
						headers:{ 
							/*
							"Access-Control-Allow-Origin" : "*",
							//crossorigin:true,
							//'Access-Control-Allow-Methods': "GET",
							"Access-Control-Allow-Methods":"GET,POST,OPTIONS,PUT,DELETE",
							//'Access-Control-Allow-Headers': "Content-Type",
							//'Access-Control-Allow-Credentials':true,
							//'cache-control':'no-cache',
							'Access-Control-Allow-Headers':"Origin, X-Requested-With, Content-Type, Accept",
							*/
							Authorization: 'Bearer '+api_token 
						}
					};

					axios.post(this.url+"images",formdata,headers).then(res=> {
		//Al guardar la imagen en el servidor actualizamos los datos del objeto 
		//image, pero mateniendo la imagen base64 en el MainPanel y asignamos 
		//los datos para el panel de recorte (resizedImg)
						//console.log("lo que devuelve: ",res);
						//el objeto resizedImg pasa los datos de ancho y alto al panel de recorte.
						//Para pasar los datos en lugar de anular el objeto ima 
						//como prop,indicados como params en la redirección se 
						//puede  anular el resizedImg.src pasando el objeto ima 
						//como prop (que contiene tb el src) 
						this.resizedImg.src=res.data.image.random_name;
						this.image.src=res.data.image.random_name;
						//no están en data y por tanto no prevalecen
						this.image.size=res.data.image.size;
						this.image.spaceColor=res.data.image.space_color;					
			//comprobaciones para asignar el resizedImg (destinado al CutPanel e hijos)
						let sizes = this.setSizeToCutPanel(res.data.image.width,res.data.image.height,this.minWidthHeight,this.maxWidthDefault,this.maxHeightDefault);
						/*
						//comprobamos si el ancho o el alto de la imagen es menor //o igual que el mínimo establecido
						if((res.data.image.width)<=this.minWidthHeight){
							this.image.widthCut=this.minWidthHeight;
							this.image.heightCut=this.getNewHeight(this.image.widthCut,res.data.image.width,res.data.image.height);
							this.resizedImg.width=this.minWidthHeight;
							this.resizedImg.height=this.getNewHeight(this.resizedImg.width,res.data.image.width,res.data.image.height);
						}else{
						//obtenemos el ancho y alto tomando como referencia
						//un ancho y alto máximos establecidos.
							let resizeImg=this.getMaxResize(res.data.image.width,res.data.image.height,this.maxWidthDefault,this.maxHeightDefault);
							this.image.widthCut=resizeImg[0];
							this.image.heightCut=resizeImg[1];
							this.resizedImg.width=resizeImg[0];
							this.resizedImg.height=resizeImg[1];
						}
						*/
						this.image.widthCut=sizes.width;
						this.image.heightCut=sizes.height;
						this.resizedImg.width=sizes.width;
						this.resizedImg.height=sizes.height;
						console.log("desde upload() ",this.image);
					})					
				}else{
					console.log("No está logueado");
					//se puede realizar la subida sin estar logueado y al recargar página eliminar las imagenes automáticamente pero es necesario colocar el método post de subida de imágenes del backend fuera del middleware (para subir sin token)
				}
			}else{
				console.log("No soporta sessionStorage");
			}
			
		},
						//métodos panel de recorte

		//acceder al panel de recorte
		cutImage(){
			//comprobar si existe archivo	

			if(!this.image.name){
				this.msgeDialogContent="Para acceder al panel de recorte es necesario subir una imagen o añadir una imagen al panel principal";
				this.msgeDialogTitle="No existe imagen";
			//	this.dialogErrorActive=true;
				
			//	return;
			}
			if(this.$route.name=="cutout"){
				//ya se encuentra en cutout;
				return;
			}
			//activamos interruptor para cambiar botón de recorte
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
								cloneBoxSquare.style.display="none";
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
		changeDialog(){
			//pasamos las 2 a false en lugar de comprobar si es el dialogo de login-register o el de perfil-logou
			this.showDialog=false;
			this.showDialog2=false;

		},
		//método para detectar si existe sesión y mostrar un dialog u otro
		switchDialog(){
			if(sessionStorage){
				//comprobamos si están vacías para mostrar el dialog correcto
				if(sessionStorage.getItem("biedit_apitoken") != 'null' && sessionStorage.getItem("biedit_apitoken") != 'undefined'){

					let item = sessionStorage.getItem("biedit_apitoken");
					//si existe sessionStorage mostramos dialog de session logout 
					if(item){
						//Aunque no debe estar y por tanto no es necesario, por seguridad pasamos el dialog login a false
						if(this.showDialog==true) this.showDialog=false;
						this.showDialog2=true;							
					}else{
						//si no existe sessionStorage mostramos dialog de session login y register
						this.showDialog=true;	
					}
				}else{
					console.log("no existe api_token");
					this.showDialog=true;
					this.showDialog2=false;
				}
			}else{
				console.log("no existe sessionStorage");
			}
		},
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
					'Access-Control-Allow-Methods': "GET",
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
			console.log(sizesMain.width);
			//this.imageMain.height=this.getNewHeight(this.imageMain.widthDefault,image.width,image.height);			
			this.image.widthInitial=image.width;
			this.image.heightInitial=image.height;
			let sizesCut=this.setSizeToCutPanel(image.width,image.height,this.minWidthHeight,this.maxWidthDefault,this.maxHeightDefault);
			this.image.widthCut=sizesCut.width;
			this.image.heightCut=sizesCut.height;
			this.image.spaceColor=image.space_color;
			//callback sin definir
			if(callback!=null)
				callback();

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

.confirmDialog .md-dialog-container{
	background:linear-gradient(to bottom, rgba(99, 0, 228,.8) 0%, rgba(99,0,228,1), rgba(99, 0, 228,.8) 100%);
	color:white;

}
.confirmDialog .md-button-content{
	color:white;
}
.confirmDialog{
	height:auto;
	z-index:106 !important;
	position:absolute;
	/*necesario auto en bottom para sobreescribir los estilos del md-dialog*/
}
</style>