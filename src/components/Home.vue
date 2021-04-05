<template>
	<div style="/*background-color:gray;*/min-height:720px;">
		<div class="md-layout">			
			<div class="banner1 md-xlarge-size-15 md-large-size-25 md-medium-hide md-small-hide">
				<Banner :options="optionsBhBanner"></Banner>
				<!--<Banner :options="optionsBhBanner2"></Banner>-->
			</div>

			<div class="md-layout-item md-xlarge-size-70 md-large-50 md-medium-size-100 m_auto">
				<splide :options="primaryOptions" ref="primary" style="background-color:rgba(0,0,0,.6);" class="splide_custom m_auto"  >
					<splide-slide >
						<div class="m_top30" >
							<img src="img/home/chicago.jpg" style="" />
							
						</div>
						<div class="text_description"><p>Efecto de forma</p></div>
					</splide-slide>

					<splide-slide >
						<div class="m_top30">
							<img src="img/home/vineta_uva.jpg" />
						</div>
						<div class="text_description"><p>Efecto Viñeta</p></div>
					</splide-slide>

					<splide-slide >
						<div class="m_top30">
							<img src="img/home/oleo_labrador.jpg" />
						</div>
						<div class="text_description"><p>Efecto Óleo</p></div>
					</splide-slide>

					<splide-slide >
						<div class="m_top30">
							<img src="img/home/redondear_oso_polar.png" />
						</div>
						<div class="text_description"><p>Redondear esquinas</p></div>
					</splide-slide>

					<splide-slide >
						<div class="m_top30">
							<img src="img/home/ensalada.png" />
						</div>
						<div class="text_description"><p>Marca de agua</p></div>
					</splide-slide>

					<splide-slide >
						<div class="m_top30">
							<img src="img/home/circulo_pareja_sepia.png" />
						</div>
						<div class="text_description"><p>Forma circular</p></div>
					</splide-slide>
				</splide>
				<splide :options="secondaryOptions" ref="secondary" class="splide_custom m_auto">
					<splide-slide class="c_pointer">
						<img src="img/home/chicago.jpg" />
					</splide-slide>

					<splide-slide class="c_pointer">
						<img src="img/home/vineta_uva.jpg" />
					</splide-slide>

					<splide-slide class="c_pointer">
						<img src="img/home/oleo_labrador.jpg" />
					</splide-slide>

					<splide-slide class="c_pointer">
						<img src="img/home/redondear_oso_polar.png" />
					</splide-slide>

					<splide-slide class="c_pointer">
						<img src="img/home/ensalada.png" />
					</splide-slide>

					<splide-slide class="c_pointer">
						<img src="img/home/circulo_pareja_sepia.png" />
					</splide-slide>
				</splide>
			</div>
			<div class="banner2 md-xlarge-size-15 md-large-size-25  md-medium-hide">
				<Banner :options="optionsBhBanner2"></Banner>
				<!--
				<div style="width:100%;margin:10px auto;border-radius:20px;background-color:rgba(0,0,0,.8);color:white;min-height:600px;padding:20px" >
					<video width="200" height="100"  autoplay muted loop>
						<source src="video/video_cut_biedit.mkv" type="video/mp4">
					</video>
				-->
					<!--<p style="font-size:17px;color:orange;font-family:nikaia;line-height:50px;letter-spacing: 1px ">Organiza tus imágenes</p>
					<p style="font-size:17px;color:orange;font-family:zerogirl;line-height:50px;letter-spacing: 1px ">Cambia las dimensiones de tu imagen</p>
					<p style="font-size:17px;color:orange;font-family:zerogirl;line-height:50px;letter-spacing: 1px " >Cambia las dimensiones de tu imagen</p>-->
				<!--
				</div>
				-->
			</div>
		</div>
		<!--<Banner></Banner>-->


	<!-- md-card
	<div>
		<md-card style="width:320px;margin:4px;display:inline-block;vertical-align: top;box-shadow:none">
			<md-card-media>
				<img src="img/home/redondear_oso_polar.png">
			</md-card-media>
		</md-card>
	-->
	<!--
		<div class="md-layout md-gutter m_auto">
			
				<div class="md-layout-item">
					<div class="image_home0" >
					</div>
				</div>

				<div class="md-layout-item">
					<div class="image_home1" >
					</div>
				</div>

				<div class="md-layout-item" >
					<div class="image_home2"></div>
				</div>

				<div class="md-layout-item">
					<div class="image_home3"></div>
				</div>
				<div class="md-layout-item">
					<div class="image_home4">
					</div>
				</div>
				<div class="md-layout-item">
					<div class="image_home5">
					</div>
				</div>
				<div class="md-layout-item">
					<div class="image_home6">
					</div>
		</div>
		<div class="md-layout md-gutter">
				
				</div>
			</div>
		
	-->	


		<!--<div class="video">
			<video id="video" playsinline autoplay></video>
		</div>
		<div class="controller">
			<button id="snap" @click="clic()">Capture</button>
			<button id="snap2" @click="init()">Capture</button>
		</div>
		<canvas id="canvas" width="640" height="480"></canvas>
	-->
	</div>
	
</template>
<script>
import Banner from './Banner.vue';
export default {
	name:'Home',
	components:{Banner},
	data (){
		return {
			optionsBhBanner:{
				orientation:"vertical",
				size:"medium",
				fontSizeDefault:"22px",
				images:[
					//images element 1
					[

						"img/home/vineta_uva.jpg",
						"img/home/forma_selfie.png",
					],
					//images element 2
					[
						"img/home/pareja.jpg",
						"img/home/road-5724397_640.jpg"
					],
					//images element 3
					[
						"img/home/fun.jpg",
						"img/home/circulo_pareja_sepia.png",
						"img/home/fashion.JPG"
					]
				],
				texts:[
					[
						"Regístrate",
						"sube tus imágenes...",
						"...descárgalas donde quieras",						
					],
					[
						//"Sube tus imágenes...",
						//"...descárgalas donde quieras",
					],
					[
						"BIEDIT",
						"bahiaxip.com"					
					],
				],
				effects:{
					1:{

					//transitions
						opacity:true,
						//scale
						width:false,
						//scale
						height:false,
						//solo texto
						fontSize:false,
						scaleRotate:false,
						scale:false,
						positionLeft:false,
					//set mode text
						modeText:"true",
					//set width image HTML
						//solo imágenes
						widthHTML:null

					},
					2:{
						opacity:true,
						positionLeft:true,
						widthHTML:null

					},
					3:{						
						modeText:true,
						widthHTML:150,
						scaleRotate:true
						
					}
				},
			//ejemplo de array personalizado en order
			/*
				0:[
					{
						node:2,
						effect:"width",					
					},
					{
						node:1,
						effect:positionLeft,						
					},
					{

					}
				],
			*/
				order:{
					0:[1],
					1:[1],
					2:[1,2],
					3:[1,2,3]
					
				}
				

			},
			optionsBhBanner2:{
				orientation:"vertical",
				size:"medium",
				fontSizeDefault:"22px",
				time:4000,
				images:[
					//images element 1
					[

						"img/home/vineta_uva.jpg",
						"img/home/forma_selfie.png",
					],
					//images element 2
					[
						"img/home/pareja.jpg",
						"img/home/road-5724397_640.jpg"
					],
					//images element 3
					[
						"img/home/fun.jpg",
						"img/home/circulo_pareja_sepia.png",
						"img/home/fashion.JPG"
					]
				],
				texts:[
					[
						"Recorta tu imagen",
						"con solo un clic",
						"Dale a tus fotos un toque personal",
						"desde el panel de efectos"
					],
					[
						"Sube tus imágenes...",
						"...descárgalas donde quieras",
					],
					[
						"Crea tu propia marca de agua",
						"Realiza fusiones con tus imágenes preferidas",
						"Genera una nueva textura"						
					],
				],
				videos:[
					[
						"video/video_cut_biedit.mkv"
					],
					[
						"video/video_cut_biedit.mkv",
						"video/filtro_byn.mkv"
					],
					[
					]
				],
				effects:{
					1:{

						opacity:true,
						//scale
						width:false,
						//scale
						height:false,
						//solo texto
						fontSize:false,
						scaleRotate:false,
						scale:false,
						positionTop:true,
						modeText:true,
						modeVideo:false,
						
					//solo imágenes
						widthHTML:null,
					//solo textos
						fontSizeStyle:"20px",
					},
					2:{
						opacity:true,
						width:false,
						height:false,
						fontSize:false,
						
						positionLeft:true,
						widthHTML:150,
						modeVideo:true,
						
					},
					3:{
						opacity:false,
						modeText:true,
						positionLeft:false,
						scaleRotate:true,					
						fontSizeStyle:"20px"
					}
				},
				order:{
					0:[1,3],
					1:[1,2,3],
					2:[1,3],
					3:[1,2,3],
				}
			},
			video:null,
			canvas:null,
			snap:null,
			errorMsge:null,
			constraints:{
				audio:true,
				video:{
					width:1280,height:720
				}
			},
			context:null,
			mediaSource:null,

		//opciones slider vue
			primaryOptions: {
				type      : 'loop',
				width     : 800,
				pagination: false,
			},
			secondaryOptions: {
				type        : 'slide',
				rewind      : true,
				width       : 800,
				gap         : '1rem',
				pagination  : false,
				fixedWidth  : 110,
				fixedHeight : 70,
				cover       : true,
				focus       : 'center',
				isNavigation: true,
			},


		//banner
		/*
			text_banner:{
				//leer el texto y el que tenga más caracteres asignar ese div o
				//primero poner el que tenga más caracteres
				text1:[
					"Regístrate con tu correo",
					"Sube tus imágenes...",
					"...descárgalas donde quieras",					
				],
				text2:[
					"Cambia las dimensiones de tu imagen",
					"Recorta tu imagen fácilmente",
					"Múltiples efectos"
				],
				text3:[
					"Comprime tu imagen",
					"Crea tu propia marca de agua"
				],
				
			},
			// configuración de banner
			bahiaBanner:{
				orientation:"vertical",
		//configuración de cada una de las 5 animaciones
		//En cada animación se pueden cambiar cualquiera de los 3 posibles
				order:{
		//animación	|| elemento que cambia 
				//esto es forma básica, se podría comprobar si existe objeto en 
				//lugar de un entero y asignar tipo de animación para cada una de 
				//ellas, en cambio en la forma básica un elemento siempre tendrá el
				//mismo tipo, es decir, si el elemento 1 tiene animación left, en
				//todas los cambios realizará la transición left.
					0:[1],
					//0:[{state:true,type:},{},{}]
					1:[1],
					2:[1,3],
					3:[1,2],
					4:[1,2,3]
				},
				//font-size por defecto si no existe estilo asignado al elemento <p>
				fontSizeDefault:"25px",
				fontSizeInitial:null,

			},
			//configuración de cada elemento del banner (1, 2 y 3)
			banner1:{
				//por si queremos más adelante hacer un banner solo de 2 o de 1 
				//podemos establecer la propiedad state y así comprobar

				//state:true,
				//opacity de momento fijo siempre
				opacity:false,
				trans:{
					//el width es para el ancho, sin embargo, en este ejemplo,
					//al ser un elemento de texto (<p>) hacemos uso de font-size
					//para realizar la transición
					width:true,
					positionLeft:false,
					positionTop:false,
					scale:false,
					scaleRotate:false,
				},

				
			},
			banner2:{
				opacity:true,
				trans:{
					width:false,
					positionLeft:true,
					positionTop:false,
					scale:false,
					scaleRotate:false,
				},
				
			},
			banner3:{
				opacity:true,
				trans:{
					width:false,
					positionLeft:false,
					positionTop:false,
					scale:false,
					scaleRotate:true,
				},
				
			},
			//texto seleccionado de cada uno de los 3 elementos
			textBanner1:null,
			textBanner2:null,
			textBanner3:null,
			//índices banner (cada animación lleva su lista de textos independiente)
			textIndex1:0,
			textIndex2:0,
			textIndex3:0,
			//referencia del DOM de cada elemento de texto (<p>)
			banner1Ref:null,
			banner2Ref:null,
			banner3Ref:null,
			//identificador de inicio de componente para no añadir un tiempo 
			//fijo en el primer setTimeout(), la primera transición no se realiza. 
			//Para ello se da un tiempo al setTimeout() la primera vez más 
			//lento y el resto de veces uno más rápido
	//anulado, en suspenso
			//bannerRepeated:false,			
			//banner2:null
		*/
		}
		
	},
	mounted(){

	//slider vue
		this.$refs.primary.sync(this.$refs.secondary.splide);
	
	/*
	//banner
		//asignamos elementos (en este caso elementos de texto (<p>))
		this.banner1Ref=this.$refs.text_banner1;
		this.banner2Ref=this.$refs.text_banner2;
		this.banner3Ref=this.$refs.text_banner3;
		//this.banner3Ref.style.left="0px";
		//se asignan estilos necesarios para las evitar errores en las transiciones
		this.testTransBanner();
		//asignando el primer texto de cada uno.
		this.textBanner1=this.text_banner.text1[this.textIndex1];
		this.textBanner2=this.text_banner.text2[this.textIndex2];
		this.textBanner3=this.text_banner.text3[this.textIndex3];
			
		this.interval_animationbanner();
		/*
		this.video=document.querySelector("#video");
		this.canvas=document.querySelector("#canvas");
		this.snap=document.querySelector("#snap");
		this.errorMsge=document.querySelector("span#errorMsge");
		this.context=this.canvas.getContext("2d");
		*/
		//this.mediaSource=new MediaSource();

		//this.init();

	},
	methods:{		
	/*
		//asignando estilos para preparar elementos para evitar errores en la primera transición 
		//comprobando transición de banners para asignar estilos iniciales
		testTransBanner(){

			this.initStylesFirstTime(this.banner1Ref,this.banner1);

		},
		initStylesFirstTime(bannerRef,bannerConf){
			if(bannerConf.trans.positionLeft)
				//asignamos 0px para que tome efectos la transición la primera vez
				bannerRef.style.left="0px";
			//al ser un elemento de texto (<p>) usamos font-size en lugar de width
			else if(bannerConf.trans.width){
				bannerRef.style.width="100%";
				//banner.style.top="0px";
				if(bannerRef.style.fontSize){

					this.bahiaBanner.fontSizeInitial=bannerRef.style.fontSize;					
				}else{
					this.bahiaBanner.fontSize=this.bahiaBanner.fontSizeDefault;
				}
			}
			//asignamos 0px para que tome efectos la transición la primera vez
			else if(bannerConf.trans.positionTop)
				bannerRef.style.top="0px";
		},
		interval_animationbanner(){
			//asignamos la cantidad de elementos a mostrar de cada uno de los 3.
			let amountTexts1=this.text_banner.text1.length,
				amountTexts2=this.text_banner.text2.length,
				amountTexts3=this.text_banner.text3.length;
			//si alguno no tiene ninguno detenemos
			if(amountTexts1==0 || amountTexts2==0 || amountTexts3==0){
				console.log("faltan elementos de alguno");
				return;
			}


	//para obtener la cantidad de propiedades de un objeto: Object.keys()
			//array de propiedades de un objeto (Object.keys()) 
			//Nota: countPropsOrder es un array de las propiedades del objeto y no 
			//de los valores, es útil para resetear el counter y volver a la primera
			//animación
			let countPropsOrder=Object.keys(this.bahiaBanner.order);			
			if(countPropsOrder.length<=0)
				return;
			//contador de interval para comprobar el tipo de animación que corresponde
			//la animación 1, la 2...
			let counter=0;
//establecer el clearInterval en el destroy método
			setInterval(()=>{
				//si el counter ha llegado a la última animación reseteamos para que
				//comience otra vez por la primera
				if(counter==countPropsOrder.length)	{
					counter=0;
				}
				//Obtenemos propiedad de bahiaBanner.order que coincida con counter
				//de esa forma si el counter es 0 le corresponde la animación 0, si
				//el counter es 1, la animación 1, hasta las 5 animaciones posibles,
				//y vuelve a empezar por 0.
				//Cada animación puede configurarse a 1, a 2 o a los 3 divs.
				//Aviso:tanto las propiedades como sus valores son enteros.
				//matchElement es la propiedad del objeto bahiaBanner.order que 
				//coincide con counter (0|1|2|3|4)
				let matchElement=countPropsOrder.find(element=> element==counter);
				//list es la lista de los divs que deben realizar transición, pero solo
				//de la animación que coincide con counter
				let list=this.bahiaBanner.order[matchElement];
				console.log("lista: ",list);				
				if(!matchElement){					
					return;
				}
				//asignamos los divs padres(que contienen cada elemento)
				let divBanner1=this.$refs.div_banner1,
					divBanner2=this.$refs.div_banner2,
					divBanner3=this.$refs.div_banner3;

				
			//comprobamos la orientación de banner para asignar un ancho o alto fijos,
			//y así al realizar efectos en los elementos los otros divs no varian.
			//asignamos el height al div si el banner es vertical con clientHeight y
			//asignamos el width al div si el banner es horizontal con clientWidth
			
	//Tener en cuenta que con clientWidth y clientHeight asignamos el ancho o 
			//alto del primer elemento que aparece por orden, es decir, si el primer 
			//elemento del banner es más pequeño que el tercero es posible que el
			//tercero no se muestre correctamente pk hemos asignado el ancho o el alto
			//tomando el primero como referencia.
	//(Si más adelante se toman medidas fijas esto será distinto), se debería comprobar
	//cual es el elemento que más grande y asignar esa medida, con texto se podría 
	//comprobar la cantidad de caracteres.
				//con width
//pendiente comprobar si se puede asignar esta medida fuera del interval, ya que solo
//recoge el ancho o alto del elemento (texto) inicial.
				if(this.bahiaBanner.orientation=="horizontal"){
					divBanner1.style.width=divBanner1.clientWidth+"px";
					divBanner2.style.width=divBanner2.clientWidth+"px";
					divBanner3.style.width=divBanner3.clientWidth+"px";
				//con height	
				}else if(this.bahiaBanner.orientation=="vertical"){
					divBanner1.style.height=divBanner1.clientHeight+"px";
					divBanner2.style.height=divBanner2.clientHeight+"px";
					divBanner3.style.height=divBanner3.clientHeight+"px";	
				}
				
				else 
					console.log("no hay orientación asignada");
	//por revisar si es necesario, el problema es con la transición left o top
	//que realiza la primera transición pk es necesario establecer left o top 
	//en los estilos.
			//si es la primera vez que se inicia (suponiendo que llamamos al método
			//desde mounted()) se da un tiempo más lento al setTimeout(), si no, 
			//se da un tiempo más rápido (esto se debe a que la primera animación
			//no la realiza correctamente y por eso le damos más tiempo). Para 
			//identificar la primera vez comprobamos con bannerRepeated
				let time=100;
				let time2=700;
	*/
				/*
				if(!this.bannerRepeated){
					time=1000;
					time2=1000;
					this.bannerRepeated=true;
				}
				*/
	/*				
				setTimeout(()=> {
					//comienzo de animación (opacity, top, rotate,...)
					this.hideAnimation(list);
				},time)

				setTimeout(()=> {
					//final de animación (opacity,top,rotate...)
					this.showAnimation(list);
				},time2)

				//aumentamos counter
				counter++;
				
			},4000)
		},
		//ocultamos con alguna de las animaciones el elemento actual

		hideAnimation(list){

		//animaciones
				if(list.indexOf(1)!=-1){
					this.initAnimation('1','hide');
	*/
					/*
					if(this.banner1.opacity)
					this.banner1Ref.style.opacity="0";
					if(this.banner1.trans.width)					
						this.banner1Ref.style.width="0";
					else if(this.banner1.trans.positionTop)
						//comprobar medida de altura y sustituir
						this.banner1Ref.style.top="-150px";
					else if(this.banner1.trans.positionLeft)
						//comprobar medida de anchura y sustituir				
						this.banner1Ref.style.left="-300px";
					else if(this.banner1.trans.scale)
						this.banner1Ref.style.transform="scale(0)";
					else if(this.banner1.trans.scaleRotate)
						this.banner1Ref.style.transform="scale(0) rotate(360deg)";
					*/
	/*
				}
				
				if(list.indexOf(2)!=-1){
					this.initAnimation('2','hide');
				}
				if(list.indexOf(3)!=-1){
					this.initAnimation('3','hide');
				}
				
				
			
		},
		initAnimation(number,type){
			console.log("desde initAnimation: ",number);
			let banner,bannerRef,textString;


			
			if(number==1){
				//objeto de banner que contiene las opciones(animaciones activadas)
				banner=this.banner1;
				//elemento banner (<p>)
				bannerRef=this.banner1Ref;
				//this.banner1Ref.style.left="0px";
				//console.log("style left: ",this.banner1Ref.style.left);			
				//lista de textos (string) posibles 
				textString=this.text_banner.text1;
				if(type=="show"){
					//si es la primera vez pasamos uno
					if(this.textIndex1==0)
						this.textIndex1=1;
					//si ha llegado al último reseteamos al primero
					else if(textString.length==this.textIndex1)
						this.textIndex1=0;
					
					this.textBanner1=textString[this.textIndex1];
					this.textIndex1=this.textIndex1+1;

				//texto asignado
				//this.textBanner1
				//contador que permite al llegar al último volver al primer texto
				//this.textIndex1;
				}
			}
			
			if(number==2){				
				banner=this.banner2;				
				bannerRef=this.banner2Ref;				
				textString=this.text_banner.text2;
				if(type=="show"){
					if(this.textIndex2==0)
						this.textIndex2=1;
					else if(textString.length==this.textIndex2)
						this.textIndex2=0;
					this.textBanner2=textString[this.textIndex2];
					this.textIndex2=this.textIndex2+1;
				}
			}
			
			if(number==3){				
				banner=this.banner3;				
				bannerRef=this.banner3Ref;				
				textString=this.text_banner.text3;
				if(type=="show"){
					if(this.textIndex3==0)
						this.textIndex3=1;
					else if(textString.length==this.textIndex3)
						this.textIndex3=0;
					this.textBanner3=textString[this.textIndex3];
					this.textIndex3=this.textIndex3+1;
				}
			}
			

		//ocultar
			if(type=="hide"){
				//al ser un elemento <p> no es posible con width, es
				//necesario fontSize
				if(banner.trans.width){
					//bannerRef.style.width="0px";
					//bannerRef.style.height="0px";
					bannerRef.style.fontSize="0px";
				}				
					
				else if(banner.trans.positionTop)
					//comprobar medida de altura y sustituir
					bannerRef.style.top="-150px";
				else if(banner.trans.positionLeft)
					//comprobar medida de anchura y sustituir				
					bannerRef.style.left="-300px";
				else if(banner.trans.scale)
					bannerRef.style.transform="scale(0)";
				else if(banner.trans.scaleRotate)
					bannerRef.style.transform="scale(0) rotate(360deg)";
				if(banner.opacity)
					bannerRef.style.opacity="0";
		//mostrar
			}else if(type=="show"){
				console.log("llega a show")
			//se comprueba el largo de elementos para regresar al primero
			//al llegar al último
	*/
				/*
				if(this.text_banner.text1.length==this.textIndex1){
					//console.log("length: ",this.text_banner.text1.length);
					this.textIndex1=0;
				}
				*/
				//si el último aumento es igual al total de textos reseteamos a 0
				/*
				if(textString.length==this.textIndex1){
					//console.log("length: ",this.text_banner.text1.length);
					this.textIndex1=0;
				}
				*/
			//asignamos el siguiente elemento
				/*
				this.textBanner1=this.text_banner.text1[this.textIndex1];
				this.textIndex1=this.textIndex1+1;
				*/
				/*
				this.textBanner1=textString[this.textIndex1];
				this.textIndex1=this.textIndex1+1;
				*/
	/*
			//animaciones
				//opacity aparte del resto o no ? 
				if(banner.opacity)
					bannerRef.style.opacity="1";
				
				//opciones width,positionleft,positionTop,
				//para un elemento <p> pasamos de width a fontSize
				//bannerRef.style.width="100%";

				if(banner.trans.width){
					console.log(bannerRef.style.fontSize);
					bannerRef.style.fontSize=this.bahiaBanner.fontSizeInitial;
					//bannerRef.style.width="100%";
				}
				else if(banner.trans.positionTop)
					bannerRef.style.top="0px";
				else if(banner.trans.positionLeft)
					bannerRef.style.left="0px";
				else if(banner.trans.scale)
					bannerRef.style.transform="scale(1)";
				else if(banner.trans.scaleRotate)
					bannerRef.style.transform="scale(1) rotate(0deg)"
			}
			banner=null,
			bannerRef=null,
			textString=null;
			
			

		},
		//asignamos el siguiente elemento y volvemos a mostrar con alguna de las 
		//animaciones
		showAnimation(list){
			if(list.indexOf(1)!=-1){
				this.initAnimation('1','show');
	*/
		/*
			//si ha llegado al último elemento vuelve al primero
				if(this.text_banner.text1.length==this.textIndex1){
					console.log("length: ",this.text_banner.text1.length);
					this.textIndex1=0;
				}
		//asignamos el siguiente elemento
				this.textBanner1=this.text_banner.text1[this.textIndex1];
				this.textIndex1=this.textIndex1+1;
		//animaciones
				//opacity aparte del resto
				if(this.banner1.opacity)
					this.banner1Ref.style.opacity="1";
				
				//opciones width,positionleft,positionTop,
				if(this.banner1.trans.width)
					this.banner1Ref.style.width="100%";
				else if(this.banner1.trans.positionTop)
					this.banner1Ref.style.top="0px";
				else if(this.banner1.trans.positionLeft)
					this.banner1Ref.style.left="0px";
				else if(this.banner1.trans.scale)
					this.banner1Ref.style.transform="scale(1)";
				else if(this.banner1.trans.scaleRotate)
					this.banner1Ref.style.transform="scale(1) rotate(0deg)"
		*/
	/*
			}
			
			if(list.indexOf(2)!=-1){
				this.initAnimation('2','show');
			}
			if(list.indexOf(3)!=-1){
				this.initAnimation('3','show');
			}
			
			
		//},100)
			
		},
	*/
		/*
		async init(){
			let stream =await navigator.mediaDevices.getUserMedia(this.constraints);

			this.handleSuccess(stream);

		},
		*/

//opción 1 acceso a cámara
		async init(){
			let stream =await navigator.mediaDevices.getUserMedia(this.constraints);
			console.log(stream);
			this.setCam(stream);
			//this.(stream);
		},
		
		setCam(stream){
			try{
				this.video.srcObject=stream;
				
			}catch(error){
				this.video.src=URL.createObjectURL(stream)	
				console.log("No disponible srcObject");
			}
			//window.stream=stream;
			
		},
		/* promesa con then */
		
	//opción 2 acceso a cámara
	/*
		init(){
			if(navigator.mediaDevices.getUserMedia){
				navigator.mediaDevices.getUserMedia(this.constraints)
				.then((stream)=>{
					this.video.srcObject=stream;
				}).catch(function(error){
					console.log(error);
				})
			}
		},
	*/	
		
		clic(){
			this.context.drawImage(this.video,0,0,640,480);
		}


	}
}
</script>
<style>
.banner2 .bh_banner{
	
}
</style>