<template>
	<div class="bh_banner"  :class="bahiaBanner.orientation=='vertical' ? 'bh_banner_vertical':'bh_banner_horizontal'">
		<div ref="div_banner1" class="div_banner"  >
			<img src="img/home/chicago.jpg"  width="150"/>
			<!--<p class="text_banner text1" ref="text_banner1" >{{text_banner.textBanner1}}</p>-->
		</div>
		<div ref="div_banner2"  class="div_banner">
			<p class="text_banner font_zerogirl" ref="text_banner2">{{text_banner.textBanner2}}</p>
		</div>
		<div ref="div_banner3" class="div_banner">

			<p class="text_banner" ref="text_banner3">{{text_banner.textBanner3}}</p>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Banner',
	data(){
	//- Se pueden cambiar las frases (text1,text2,text3) y añadir las necesarias, 
	//- Se puede cambiar el orden de la transición de los elementos en la propiedad
		//order y se puede asignar un efecto de los 5 (width,positionLeft,positionTop,
		//scale, scaleRotate) y de forma independiente opacity.
	//- Los estilos pueden ser fijos o con porcentajes y el font-size se puede 
		//asignar en los estilos de cada elemento <p> o establecer uno por defecto
		//en la propiedad fontSizeDefault (25px).
	//- Se puede asignar la orientación del banner: horizontal o vertical en la 
		//propiedad orientation.

		return {
			//se pueden añadir textos  y automáticamente se incluyen
			text_banner:{
			//se asigna el primer texto de cada uno en el template además de aquí
				//se podría comprobar la longitud de caracteres y así asignar el texto 
				//con más caracteres primero, pero si se introduce un font-size mayor
				//no funcionaría				
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
				//font-size por defecto si no existe estilo asignado al elemento <p>
				fontSizeDefault:"25px",
				fontSizeInitial:null,

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
				
			},
			image_banner:{
				image1:[
					"img/home/chicago.jpg",
					"img/home/oleo_labrador.jpg",

				]
			},
			// configuración de banner (se pueden modificar)

			bahiaBanner:{
				orientation:"vertical",
				//orientation:"horizontal",
		//configuración de cada una de las 5 animaciones
		//En cada animación se pueden cambiar cualquiera de los 3 posibles
				order:{
		//animación	|| elemento que cambia 
				//esto es forma básica, se podría comprobar si existe objeto en 
				//lugar de un entero y asignar tipo de animación para cada una de 
				//ellas, en cambio en la forma básica un elemento siempre tendrá el
				//mismo tipo, es decir, si el elemento 1 tiene animación left, en
				//todas los cambios realizará la transición left.
					0:[1,2],
					//0:[{state:true,type:},{},{}]
					1:[1,2],
					2:[1,3],
					3:[1,2],
					4:[1,2,3]
				},
				listOrder:null,
				counter:0,
				

			},
			//configuración de cada elemento del banner (1, 2 y 3)
			
			banner1:{
				//por si queremos más adelante hacer un banner solo de 2 o de 1 
				//podemos establecer la propiedad state y así comprobar

				//state:true,
				//opacity de momento fijo siempre
				opacity:true,
				trans:{
					//el width es para el ancho, sin embargo, en este ejemplo,
					//al ser un elemento de texto (<p>) hacemos uso de font-size
					//para realizar la transición
					width:false,
					positionLeft:false,
					positionTop:false,
					scale:false,
					scaleRotate:false,
				},
				type:null,
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
				type:null,
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
				type:null,
			},
			//variable creada para realizar el clearInterval en el destroyed()
			interval:null,
			
			
			//identificador de inicio de componente para no añadir un tiempo 
			//fijo en el primer setTimeout(), la primera transición no se realiza. 
			//Para ello se da un tiempo al setTimeout() la primera vez más 
			//lento y el resto de veces uno más rápido
	//anulado, en suspenso
			//bannerRepeated:false,			
			//banner2:null
		}
	},
	mounted(){
		
		//comprobación de imagen <img> o texto <p>
		let divBanners=[
			this.$refs.div_banner1,
			this.$refs.div_banner2,
			this.$refs.div_banner3
		];
		for(let i=1;i<divBanners.length;i++){
			if(div.getElementsByTagName('img').length>0)
				console.log("existe imagen")
			else if(div.getElementsByTagName('p').length>0)
				console.log("existe p ");
		}
			
		

		
		
		//banner
		//asignamos elementos (en este caso elementos de texto (<p>))
		this.text_banner.banner1Ref=this.$refs.text_banner1;
		this.text_banner.banner2Ref=this.$refs.text_banner2;
		this.text_banner.banner3Ref=this.$refs.text_banner3;
		
		//se asignan estilos iniciales necesarios para evitar errores en las transiciones
		this.testTransBanner();
		//asignando el texto inicial de cada uno de los elementos.
		this.text_banner.textBanner1=this.text_banner.text1[this.text_banner.textIndex1];
		this.text_banner.textBanner2=this.text_banner.text2[this.text_banner.textIndex2];
		this.text_banner.textBanner3=this.text_banner.text3[this.text_banner.textIndex3];
		//iniciar animación
		this.interval_animationbanner();
	},
	destroyed(){
		//detenemos setInterval()
		clearInterval(this.interval);
	},
	methods:{

		//asignando estilos para preparar elementos para evitar errores en la primera transición 
		//comprobando transición de banners para asignar estilos iniciales
		testTransBanner(){
			this.initStylesFirstTime(this.text_banner.banner1Ref,this.banner1);
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

					this.text_banner.fontSizeInitial=bannerRef.style.fontSize;					
				}else{
					this.bahiaBanner.fontSize=this.text_banner.fontSizeDefault;
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
			//let countPropsOrder=Object.keys(this.bahiaBanner.order);
			this.bahiaBanner.listOrder=Object.keys(this.bahiaBanner.order);
			if(this.bahiaBanner.listOrder.length<=0)
				return;

			//contador de interval para comprobar el tipo de animación que corresponde
			//la animación 1, la 2...
			//let counter=0;
//establecer el clearInterval en el destroy método
			this.interval=setInterval(()=>{
				//si el counter ha llegado a la última animación reseteamos para que
				//comience otra vez por la primera
				if(this.bahiaBanner.counter==this.bahiaBanner.listOrder.length)	{
					this.bahiaBanner.counter=0;
				}
				//Obtenemos propiedad de bahiaBanner.order que coincida con counter
				//de esa forma si el counter es 0 le corresponde la animación 0, si
				//el counter es 1, la animación 1, hasta las 5 animaciones posibles,
				//y vuelve a empezar por 0.
				//Cada animación puede configurarse a 1, a 2 o a los 3 divs.
				//Aviso:tanto las propiedades como sus valores son enteros.
				//matchElement es la propiedad del objeto bahiaBanner.order que 
				//coincide con counter (0|1|2|3|4)
				let matchElement=this.bahiaBanner.listOrder.find(element=> element==this.bahiaBanner.counter);
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
				/*
				if(!this.bannerRepeated){
					time=1000;
					time2=1000;
					this.bannerRepeated=true;
				}
				*/
					
				setTimeout(()=> {
					//comienzo de animación (opacity, top, rotate,...)
					this.hideAnimation(list);
				},time)

				setTimeout(()=> {
					//final de animación (opacity,top,rotate...)
					this.showAnimation(list);
				},time2)

				//aumentamos counter
				this.bahiaBanner.counter++;
				
			},4000)

			
		},
		//ocultamos con alguna de las animaciones el elemento actual

		hideAnimation(list){

		//animaciones
				if(list.indexOf(1)!=-1){
					this.initAnimation('1','hide');
					/*
					if(this.banner1.opacity)
					this.text_banner.banner1Ref.style.opacity="0";
					if(this.banner1.trans.width)					
						this.text_banner.banner1Ref.style.width="0";
					else if(this.banner1.trans.positionTop)
						//comprobar medida de altura y sustituir
						this.text_banner.banner1Ref.style.top="-150px";
					else if(this.banner1.trans.positionLeft)
						//comprobar medida de anchura y sustituir				
						this.text_banner.banner1Ref.style.left="-300px";
					else if(this.banner1.trans.scale)
						this.text_banner.banner1Ref.style.transform="scale(0)";
					else if(this.banner1.trans.scaleRotate)
						this.text_banner.banner1Ref.style.transform="scale(0) rotate(360deg)";
					*/
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
				bannerRef=this.text_banner.banner1Ref;
				//this.text_banner.banner1Ref.style.left="0px";
				//console.log("style left: ",this.text_banner.banner1Ref.style.left);			
				//lista de textos (string) posibles 
				textString=this.text_banner.text1;
				if(type=="show"){
					//si es la primera vez pasamos uno
					if(this.text_banner.textIndex1==0)
						this.text_banner.textIndex1=1;
					//si ha llegado al último reseteamos al primero
					else if(textString.length==this.text_banner.textIndex1)
						this.text_banner.textIndex1=0;
					
					this.text_banner.textBanner1=textString[this.text_banner.textIndex1];
					this.text_banner.textIndex1=this.text_banner.textIndex1+1;

				//texto asignado
				//this.text_banner.textBanner1
				//contador que permite al llegar al último volver al primer texto
				//this.text_banner.textIndex1;
				}
			}
			
			if(number==2){				
				banner=this.banner2;				
				bannerRef=this.text_banner.banner2Ref;				
				textString=this.text_banner.text2;
				if(type=="show"){
					if(this.text_banner.textIndex2==0)
						this.text_banner.textIndex2=1;
					else if(textString.length==this.text_banner.textIndex2)
						this.text_banner.textIndex2=0;
					this.text_banner.textBanner2=textString[this.text_banner.textIndex2];
					this.text_banner.textIndex2=this.text_banner.textIndex2+1;
				}
			}
			
			if(number==3){				
				banner=this.banner3;				
				bannerRef=this.text_banner.banner3Ref;				
				textString=this.text_banner.text3;
				if(type=="show"){
					if(this.text_banner.textIndex3==0)
						this.text_banner.textIndex3=1;
					else if(textString.length==this.text_banner.textIndex3)
						this.text_banner.textIndex3=0;
					this.text_banner.textBanner3=textString[this.text_banner.textIndex3];
					this.text_banner.textIndex3=this.text_banner.textIndex3+1;
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
				/*
				if(this.text_banner.text1.length==this.text_banner.textIndex1){
					//console.log("length: ",this.text_banner.text1.length);
					this.text_banner.textIndex1=0;
				}
				*/
				//si el último aumento es igual al total de textos reseteamos a 0
				/*
				if(textString.length==this.text_banner.textIndex1){
					//console.log("length: ",this.text_banner.text1.length);
					this.text_banner.textIndex1=0;
				}
				*/
			//asignamos el siguiente elemento
				/*
				this.text_banner.textBanner1=this.text_banner.text1[this.text_banner.textIndex1];
				this.text_banner.textIndex1=this.text_banner.textIndex1+1;
				*/
				/*
				this.text_banner.textBanner1=textString[this.text_banner.textIndex1];
				this.text_banner.textIndex1=this.text_banner.textIndex1+1;
				*/

			//animaciones
				//opacity aparte del resto o no ? 
				if(banner.opacity)
					bannerRef.style.opacity="1";
				
				//opciones width,positionleft,positionTop,
				//para un elemento <p> pasamos de width a fontSize
				//bannerRef.style.width="100%";

				if(banner.trans.width){
					console.log(bannerRef.style.fontSize);
					bannerRef.style.fontSize=this.text_banner.fontSizeInitial;
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
		/*
			//si ha llegado al último elemento vuelve al primero
				if(this.text_banner.text1.length==this.text_banner.textIndex1){
					console.log("length: ",this.text_banner.text1.length);
					this.text_banner.textIndex1=0;
				}
		//asignamos el siguiente elemento
				this.text_banner.textBanner1=this.text_banner.text1[this.text_banner.textIndex1];
				this.text_banner.textIndex1=this.text_banner.textIndex1+1;
		//animaciones
				//opacity aparte del resto
				if(this.banner1.opacity)
					this.text_banner.banner1Ref.style.opacity="1";
				
				//opciones width,positionleft,positionTop,
				if(this.banner1.trans.width)
					this.text_banner.banner1Ref.style.width="100%";
				else if(this.banner1.trans.positionTop)
					this.text_banner.banner1Ref.style.top="0px";
				else if(this.banner1.trans.positionLeft)
					this.text_banner.banner1Ref.style.left="0px";
				else if(this.banner1.trans.scale)
					this.text_banner.banner1Ref.style.transform="scale(1)";
				else if(this.banner1.trans.scaleRotate)
					this.text_banner.banner1Ref.style.transform="scale(1) rotate(0deg)"
		*/
			}
			
			if(list.indexOf(2)!=-1){
				this.initAnimation('2','show');
			}
			if(list.indexOf(3)!=-1){
				this.initAnimation('3','show');
			}
			
			
		//},100)
			
		},
	}
}
</script>
<style>
@import '../assets/css/bh_banner.css';
</style>