<template>
	<div class="bh_banner"  :class="bhBanner.orientation=='vertical' ? 'bh_banner_vertical':'bh_banner_horizontal'">
		<!-- solo puede haber un elemento img o p en cada div.
			-<img>: Si asignamos el atributo width, éste se mantiene, si no, se asignará el 100% del banner, si no se muestra la altura completa, probar
			con un width más pequeño.
			-<p>: la frase más larga debe ir la primera si no, puede ser necesario
			aumentar el height del banner y el div_banner correspondiente
		-->

		<div ref="div_banner1" class="div_banner"  >
			<!--<img :src="bannerSelected1" width="150" ref="refBanner1" class="img_banner"/>-->
			<p class="text_banner text1" ref="refBanner1" >{{bannerSelected1}}</p>
		</div>
		<div ref="div_banner2"  class="div_banner">
			<!--<img :src="bannerSelected2" width="150" ref="refBanner2" class="img_banner"/>-->
			<p class="text_banner font_zerogirl" ref="refBanner2">{{bannerSelected2}}</p>
		</div>
		<div ref="div_banner3" class="div_banner">
			<img :src="bannerSelected3" width="150"  ref="refBanner3" class="img_banner"/>
			<!--<p class="text_banner" ref="refBanner3">{{bannerSelected3}}</p>-->
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
			parentsDivsString:[
					'div_banner1',
					'div_banner2',
					'div_banner3'
				],

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

				/*
				//texto seleccionado de cada uno de los 3 elementos
				bannerSelected1:null,
				bannerSelected2:null,
				bannerSelected3:null,
				*/
				
				
			},
			
				
			
			image_banner:{
				image1:[
					"img/home/chicago.jpg",
					"img/home/oleo_labrador.jpg",

				],
				image2:[
					"img/home/redondear_oso_polar.png",
					"img/home/ensalada.png"
				],
				image3:[
					"img/home/fun.jpg",
					"img/home/circulo_pareja_sepia.png",
					"img/home/fashion.JPG"
				],

				/*
				banner1Ref:null,
				banner2Ref:null,
				banner3Ref:null,
				*/
			},
			// configuración de banner (se pueden modificar)
//pasar aquí imagesBanner y textsBanner
			bhBanner:{
				orientation:"vertical",
				fontSizeDefault:"20px",
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
					0:[1,2,3],
					//0:[{state:true,type:},{},{}]
					1:[1,2],
					2:[1,3],
					3:[1,2],
					4:[1,2,3]
				},
				imagesBanner:[
					//images element 1
					[
						"img/home/chicago.jpg",
						"img/home/oleo_labrador.jpg",
					],
					//images element 2
					[
						"img/home/redondear_oso_polar.png",
						"img/home/ensalada.png"
					],
					//images element 3
					[
						"img/home/fun.jpg",
						"img/home/circulo_pareja_sepia.png",
						"img/home/fashion.JPG"
					]

				],
				textsBanner:[
					//texts element 1
					[
						"Regístrate con tu correo",
						"Sube tus imágenes...",
						"...descárgalas donde quieras",
					],
					//texts element 2
					[
						"Cambia las dimensiones de tu imagen",
						"Recorta tu imagen fácilmente",
						"Múltiples efectos"
					],
					//texts element 3
					[
						"Comprime tu imagen",
						"Crea tu propia marca de agua"
					]
				],
				listOrder:null,
				counter:0,
				

			},
	//configuración de cada elemento del banner (1, 2 y 3)
			//se podría haber hecho un array de objetos, pero para especificar mejor
			//(elemento 1, elemento 2 y elemento 3) se crean propiedades de tipo entero
			banner:{
			//opciones del primer elemento del banner (1/3)
				1:{
					//por si queremos más adelante hacer un banner solo de 2 o de 1 
					//podemos establecer la propiedad state y así comprobar

					//state:true,
					//opacity de momento fijo siempre
					opacity:false,
					trans:{
						//el width es para el ancho, sin embargo, en este ejemplo,
						//al ser un elemento de texto (<p>) hacemos uso de font-size
						//para realizar la transición
						width:false,
						positionLeft:true,
						positionTop:false,
						scale:false,
						scaleRotate:false,
					},
					type:null,
					fontSize:null,

				},
			//opciones del segundo elemento del banner  (2/3)
				2:{
					opacity:false,
					trans:{
						width:true,
						positionLeft:false,
						positionTop:false,
						scale:false,
						scaleRotate:false,
					},
					type:null,
					fontSize:null,
				},
			//opciones del tercer elemento del banner (3/3)
				3:{
					opacity:true,
					trans:{
						width:false,
						positionLeft:true,
						positionTop:false,
						scale:false,
						scaleRotate:false,
					},
					type:null,
					fontSize:null,
				}
			},
			//índices banner (cada animación lleva su lista de textos independiente)
			bannerIndex1:0,
			bannerIndex2:0,
			bannerIndex3:0,

			//referencia del DOM de cada elemento de texto (<p>)
			banner1Ref:null,
			banner2Ref:null,
			banner3Ref:null,

			//imagen o texto seleccionado para mostrar
			
			bannerSelected1:null,
			bannerSelected2:null,
			bannerSelected3:null,
			//se puede poner nombre distinto al objeto, pero debe cambiarse tb en el template
			tmpBanner:{
				
				selected1:null,
				selected2:null,
				selected3:null,
				index1:0,
				index2:0,
				index3:0,
//pasar aquí el listOrder y el counter del objeto bhBanner
				listOrder:null,
				counter:0,
			},
//fusionar este con parentDivs
			/*ref:{
				banner1Ref:null,
				banner2Ref:null,
				banner3Ref:null
			},
			*/
			ref:{
				//ref de los div padres en un array, después se asignarán dinámicamente 
				parentsDivsString:[
					'div_banner1',
					'div_banner2',
					'div_banner3'
				],
				
				banner1Ref:null,
				banner2Ref:null,
				banner3Ref:null,	
				
			//interval pasarlo aquí
				interval:null,
			},

			
			/*
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
			*/
			//variable creada para realizar el clearInterval en el destroyed()
			interval:null,


			//dataText:null,
			//dataImages:null,
			
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

	//método antiguo, anterior a setType()
	/* 
		//asignamos los divs padres dinámicamente mediante $refs.
		let divBanners=[];
		this.ref.parentsDivsString.forEach((div)=> {
			divBanners.push(this.$refs[div]);
		})
		console.log(divBanners)
			//sustituido por foreach() asignando padres de forma directa
				
				//let divBanners=[
				//	this.$refs['div_banner1'],
				//	this.$refs.div_banner2,
				//	this.$refs.div_banner3
				//];
				
		
	//comprobación de elementos imagen (<img>) y texto (<p>) para asignar type
		//comprobamos si existen más elementos img o algún elemento p además del img,
		//o viceversa, si es así, detenemos, si todo está correcto y solo existe un
		//img o un p se asigna la propiedad type del objeto banner de cada uno.

		for(let i=0;i<divBanners.length;i++){
			if(divBanners[i].getElementsByTagName('img').length==1 &&
				divBanners[i].getElementsByTagName('p').length==0){
				this.banner[i+1].type="img";

		//la siguiente comprobación se basaba en que si se nos olvidaba en el template 
		//un elemento p además de un elemento img o viceversa, se tomara 
		//automáticamente el primero y se eliminaran los otros,	sin embargo, al 
		//realizar las pruebas tanto el remove() como el display:none no  
		//evita que los this.$refs se ejecuten antes y al contener el mismo
		// atributo ref (refBannerX) tanto en img como en p se asigna el último, 
		//permitiendo realizar los cambios pero no las transiciones, por tanto no 
		//acaba siendo útil
					
				//if(divBanners[i].getElementsByTagName('p').length>0){
				//	for(let j=0;j<divBanners[i].getElementsByTagName('p').length;j++){
				//		//divBanners[i].getElementsByTagName('p')[j].style.display="none";
				//		divBanners[i].getElementsByTagName('p')[j].remove();
				//	}
				//}
			}
			else if(divBanners[i].getElementsByTagName('p').length==1 &&
					divBanners[i].getElementsByTagName('img').length==0)
				this.banner[i+1].type="text";
			else{
				console.log("Se requiere un elemento <p> o <img> (solo uno)",divBanners[i]);
				return;
			}

		}
	*/
	// método antiguo de asignación de elemento inicial
	//revisar si es necesario condicional
		/*
		//asignamos según tipo de elemento: imagen (<img>) o texto(<p>)
		if(this.banner[1].type=="img"){
			this.bannerSelected1=this.image_banner.image1[this.bannerIndex1];
		}else if(this.banner[1].type=="text"){
			this.bannerSelected1=this.text_banner.text1[this.bannerIndex1];
		}

		if(this.banner[2].type=="img"){
			this.bannerSelected2=this.image_banner.image2[this.bannerIndex2];
		}else if(this.banner[2].type=="text"){
			this.bannerSelected2=this.text_banner.text2[this.bannerIndex2];
		}

		if(this.banner[3].type=="img"){
			this.bannerSelected3=this.image_banner.image3[this.bannerIndex3];
		}else if(this.banner[3].type=="text"){
			this.bannerSelected3=this.text_banner.text3[this.bannerIndex3];
		}
		*/

		//Establece si el elemento es de tipo img o text
		this.setType(this.ref.parentsDivsString);
	//setListByType() permite generar la lista de imágenes o textos (que van cambiando)
	//de cada uno de los elementos y asigna el texto o imagen inicial de cada uno de 
	//ellos.

		this.setListByType(this.banner,this.tmpBanner);
	//Establece las referencias de cada elemento que puede ser de tipo <img> o <p>
		this.setRef(this.ref);
	//Comprueba la configuración de cada uno y si es necesario se asignan estilos 
	//iniciales. (para evitar errores en las transiciones la primera vez)
		this.testTransBanner(this.ref);
		//asignando el texto inicial o imagen inicial de cada uno de los elementos.

		/*
		this.bannerSelected1=this.text_banner.text1[this.bannerIndex1];
		this.bannerSelected2=this.text_banner.text2[this.bannerIndex2];
		this.bannerSelected3=this.text_banner.text3[this.bannerIndex3];
		*/
		//iniciar animación
		this.interval_animationbanner();
	},
	destroyed(){
		//detenemos setInterval()
		clearInterval(this.ref.interval);
	},
	methods:{
		setRef(ref){
			ref.banner1Ref=this.$refs.refBanner1;
			ref.banner2Ref=this.$refs.refBanner2;
			ref.banner3Ref=this.$refs.refBanner3;
		},
		//comprueba el tipo de elemento (img o text) mediante los divs padres y los establece en la propiedad type del objeto banner de cada elemento
		setType(parentsDivs){
			let divBanners=[];
			parentsDivs.forEach((div)=> {
				divBanners.push(this.$refs[div]);
			})
			//console.log(divBanners)
			for(let i=0;i<divBanners.length;i++){
				if(divBanners[i].getElementsByTagName('img').length==1 &&
					divBanners[i].getElementsByTagName('p').length==0){
					this.banner[i+1].type="img";
					//asignamos el estilo display inline-flex si es imagen
					//divBanners[i].style.display="inline-block";
				}
				else if(divBanners[i].getElementsByTagName('p').length==1 &&
						divBanners[i].getElementsByTagName('img').length==0)
					this.banner[i+1].type="text";
				else{
					console.log("Se requiere un elemento <p> o <img> (solo uno)",divBanners[i]);
					return;
				}

			}
		},
		//comprueba y establece la lista de strings del texto o la imagen.
		//Es necesario haber comprobado y asignado el type ('img' o 'text') anteriormente
		setListByType(banner,tmpbanner){
			//con Object.keys obtenemos un array de las propiedades de un objeto
			//(en este caso un array de enteros)
			//recorremos el for y asignamos al objeto selected, las listas de textos
			//o rutas de imágenes de cada uno de los elementos, es decir, si el primer 
			//elemento es de imágenes, se crea la primera propiedad y se asignan todas 
			//las rutas de imágenes que irán cambiando del primer elemento, si el 
			//segundo es de textos en la segunda propiedad se asignan todos los textos
			//que irán cambiando del segundo elemento, etc...
			let listProps=Object.keys(banner);
			for(let i=0;i<listProps.length;i++){
				if(banner[listProps[i]].type=="img"){
					//selected["banner"+i]="listText.image_banner.image1[0]";
					tmpbanner["banner"+i]=this.bhBanner.imagesBanner[i];					
				}else if(banner[listProps[i]].type=="text"){
					tmpbanner["banner"+i]=this.bhBanner.textsBanner[i];					
				}
				//asignamos el texto o imagen inicial de cada uno de los elementos
				tmpbanner["selected"+(i+1)]=tmpbanner["banner"+i][tmpbanner["index"+(i+1)]];
			}
			if(this.tmpBanner){
				console.log(this.tmpBanner);
				//return;
			}

			
			/*
			if(this.banner[1].type=="img"){
			this.bannerSelected1=this.image_banner.image1[this.bannerIndex1];
			}else if(this.banner[1].type=="text"){
				this.bannerSelected1=this.text_banner.text1[this.bannerIndex1];
			}

			if(this.banner[2].type=="img"){
				this.bannerSelected2=this.image_banner.image2[this.bannerIndex2];
			}else if(this.banner[2].type=="text"){
				this.bannerSelected2=this.text_banner.text2[this.bannerIndex2];
			}

			if(this.banner[3].type=="img"){
				this.bannerSelected3=this.image_banner.image3[this.bannerIndex3];
			}else if(this.banner[3].type=="text"){
				this.bannerSelected3=this.text_banner.text3[this.bannerIndex3];
			}
			*/
		},
		//asignando estilos para preparar elementos para evitar errores en la primera transición 
		//comprobando transición de banners para asignar estilos iniciales
		testTransBanner(ref){
			this.initStylesFirstTime(ref.banner1Ref,this.banner[1]);
			this.initStylesFirstTime(ref.banner2Ref,this.banner[2]);
			this.initStylesFirstTime(ref.banner3Ref,this.banner[3]);
		},
		initStylesFirstTime(bannerRef,bannerConf){
			if(bannerConf.trans.positionLeft)
				//asignamos 0px para que tome efectos la transición la primera vez
				bannerRef.style.left="0px";
			//al ser un elemento de texto (<p>) usamos font-size en lugar de width
			else if(bannerConf.trans.width){
				if(bannerRef.width)
					bannerRef.style.width=bannerRef.width+'px';
				else

					bannerRef.style.width="100%";
				//si el bannerRef tiene asignado algún font-size se asigna ese
				if(bannerRef.style.fontSize){
					bannerConf.fontSize=bannerRef.style.fontSize;
					//this.text_banner.fontSizeInitial=bannerRef.style.fontSize;	
				//si el bannerRef no tiene ningún estilo font-size asignado se
				//establece uno por defecto						
				}else{
					bannerConf.fontSize=this.bhBanner.fontSizeDefault;
					//this.bhBanner.fontSize=this.text_banner.fontSizeDefault;
				}
			}
			//asignamos 0px para que tome efectos la transición la primera vez
			else if(bannerConf.trans.positionTop)
				bannerRef.style.top="0px";
		},

		interval_animationbanner(){
	//comprobación anulada, basada en asignar el número de cambios de cada elemento 
	//del banner, anulada al incluir la opción de imágenes en el banner 
	/*
			//asignamos la cantidad de elementos a mostrar de cada uno de los 3.
			let amountTexts1=this.text_banner.text1.length,
				amountTexts2=this.text_banner.text2.length,
				amountTexts3=this.text_banner.text3.length;
	//esta comprobación no es posible al incluir tb la etiqueta <img>
			//si alguno no tiene ninguno detenemos
			if(amountTexts1==0 || amountTexts2==0 || amountTexts3==0){
				console.log("faltan elementos de alguno");
				return;
			}
	*/


	//para obtener la cantidad de propiedades de un objeto: Object.keys()
			//array de propiedades de un objeto (Object.keys()) 
			//Nota: countPropsOrder es un array de las propiedades del objeto y no 
			//de los valores, es útil para resetear el counter y volver a la primera
			//animación
			//let countPropsOrder=Object.keys(this.bhBanner.order);
			this.bhBanner.listOrder=Object.keys(this.bhBanner.order);
			if(this.bhBanner.listOrder.length<=0)
				return;

			//contador de interval para comprobar el tipo de animación que corresponde
			//la animación 1, la 2...
			//let counter=0;
//establecer el clearInterval en el destroy método
			this.ref.interval=setInterval(()=>{
				//si el counter ha llegado a la última animación reseteamos para que
				//comience otra vez por la primera
				if(this.bhBanner.counter==this.bhBanner.listOrder.length)	{
					this.bhBanner.counter=0;
				}
				//Obtenemos propiedad de bhBanner.order que coincida con counter
				//de esa forma si el counter es 0 le corresponde la animación 0, si
				//el counter es 1, la animación 1, hasta las 5 animaciones posibles,
				//y vuelve a empezar por 0.
				//Cada animación puede configurarse a 1, a 2 o a los 3 divs.
				//Aviso:tanto las propiedades como sus valores son enteros.
				//matchElement es la propiedad del objeto bhBanner.order que 
				//coincide con counter (0|1|2|3|4)
				let matchElement=this.bhBanner.listOrder.find(element=> element==this.bhBanner.counter);
				//list es la lista de los divs que deben realizar transición, pero solo
				//de la animación que coincide con counter
				let list=this.bhBanner.order[matchElement];
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
				if(this.bhBanner.orientation=="horizontal"){
					divBanner1.style.width=divBanner1.clientWidth+"px";
					divBanner2.style.width=divBanner2.clientWidth+"px";
					divBanner3.style.width=divBanner3.clientWidth+"px";
				//con height	
				}else if(this.bhBanner.orientation=="vertical"){
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
				this.bhBanner.counter++;
				
			},4000)

			
		},
		//ocultamos con alguna de las animaciones el elemento actual

		hideAnimation(list){

		//animaciones
				if(list.indexOf(1)!=-1){
					this.initAnimation('1','hide');
					/*
					if(this.banner[1].opacity)
					this.ref.banner1Ref.style.opacity="0";
					if(this.banner[1].trans.width)					
						this.ref.banner1Ref.style.width="0";
					else if(this.banner[1].trans.positionTop)
						//comprobar medida de altura y sustituir
						this.ref.banner1Ref.style.top="-150px";
					else if(this.banner[1].trans.positionLeft)
						//comprobar medida de anchura y sustituir				
						this.ref.banner1Ref.style.left="-300px";
					else if(this.banner[1].trans.scale)
						this.ref.banner1Ref.style.transform="scale(0)";
					else if(this.banner[1].trans.scaleRotate)
						this.ref.banner1Ref.style.transform="scale(0) rotate(360deg)";
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
			let banner,bannerRef,list;


			
			if(number==1){
				//objeto de banner que contiene las opciones(animaciones activadas)
				banner=this.banner[1];
				//elemento banner (<p> o <img>) 
				bannerRef=this.ref.banner1Ref;				
				//lista de rutas (src) posibles ( en caso de imágen)
				if(this.banner[1].type=="img")
					list=this.image_banner.image1;
				else if(this.banner[1].type=="text")				
				//lista de textos (string) posibles  (en caso de texto)
					list=this.text_banner.text1;
				if(type=="show"){
				//si es la primera vez modificamos el index a uno para poder 
				//cambiar al segundo, ya que, el primero ya se ha asignado al inicio.
					if(this.bannerIndex1==0)
						this.bannerIndex1=1;
					//si ha llegado al último reseteamos al primero
					else if(list.length==this.bannerIndex1)
						this.bannerIndex1=0;
					
					this.bannerSelected1=list[this.bannerIndex1];
					this.bannerIndex1=this.bannerIndex1+1;

				//texto asignado
				//this.bannerSelected1
				//contador que permite al llegar al último volver al primer texto
				//this.bannerIndex1;
				}
			}
			
			if(number==2){				
				banner=this.banner[2];				
				bannerRef=this.ref.banner2Ref;				
				//lista de rutas (src) posibles ( en caso de imágen)
				if(this.banner[2].type=="img")
					list=this.image_banner.image2;
				else if(this.banner[2].type=="text")				
				//lista de textos (string) posibles  (en caso de texto)
					list=this.text_banner.text2;
				if(type=="show"){
					if(this.bannerIndex2==0)
						this.bannerIndex2=1;
					else if(list.length==this.bannerIndex2)
						this.bannerIndex2=0;
					this.bannerSelected2=list[this.bannerIndex2];
					this.bannerIndex2=this.bannerIndex2+1;
				}
			}
			
			if(number==3){				
				banner=this.banner[3];				
				bannerRef=this.ref.banner3Ref;				
				//lista de rutas (src) posibles ( en caso de imágen)
				if(this.banner[3].type=="img")
					list=this.image_banner.image3;
				else if(this.banner[3].type=="text")				
				//lista de textos (string) posibles  (en caso de texto)
					list=this.text_banner.text3;
				if(type=="show"){
					if(this.bannerIndex3==0)
						this.bannerIndex3=1;
					else if(list.length==this.bannerIndex3)
						this.bannerIndex3=0;
					this.bannerSelected3=list[this.bannerIndex3];
					this.bannerIndex3=this.bannerIndex3+1;
				}
			}
			

		//ocultar
			if(type=="hide"){
				//al ser un elemento <p> no es posible con width, es
				//necesario fontSize
				if(banner.trans.width){
					if(banner.type=="img")						
						bannerRef.style.width="0px";
					else					
						bannerRef.style.fontSize="0px";
				}				
					
				else if(banner.trans.positionTop)
					//comprobar medida de altura y sustituir
					bannerRef.style.top="-150px";
				else if(banner.trans.positionLeft){
					//comprobar medida de anchura y sustituir				
					bannerRef.style.left="-300px";					
				}
					
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
				if(this.text_banner.text1.length==this.bannerIndex1){
					//console.log("length: ",this.text_banner.text1.length);
					this.bannerIndex1=0;
				}
				*/
				//si el último aumento es igual al total de textos reseteamos a 0
				/*
				if(textString.length==this.bannerIndex1){
					//console.log("length: ",this.text_banner.text1.length);
					this.bannerIndex1=0;
				}
				*/
			//asignamos el siguiente elemento
				/*
				this.bannerSelected1=this.text_banner.text1[this.bannerIndex1];
				this.bannerIndex1=this.bannerIndex1+1;
				*/
				/*
				this.bannerSelected1=textString[this.bannerIndex1];
				this.bannerIndex1=this.bannerIndex1+1;
				*/

			//animaciones
				//opacity aparte del resto o no ? 
				if(banner.opacity)
					bannerRef.style.opacity="1";
				
				//opciones width,positionleft,positionTop,
				//para un elemento <p> pasamos de width a fontSize
				//bannerRef.style.width="100%";

				if(banner.trans.width){
					if(banner.type=="img")
						if(bannerRef.getAttribute("width")){
							//si el usuario asigna valor al atributo width de elemento
							//img el width se asigna el width del atributo
							bannerRef.style.width=bannerRef.getAttribute('width')+'px'
						}
						else{
							console.log("no pasa por width: ",bannerRef.getAttribute("width"));
							bannerRef.style.width="100%";
						}
					else
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
			list=null;
			
			

		},
		//asignamos el siguiente elemento y volvemos a mostrar con alguna de las 
		//animaciones
		showAnimation(list){
			if(list.indexOf(1)!=-1){
				this.initAnimation('1','show');
		/*
			//si ha llegado al último elemento vuelve al primero
				if(this.text_banner.text1.length==this.bannerIndex1){
					console.log("length: ",this.text_banner.text1.length);
					this.bannerIndex1=0;
				}
		//asignamos el siguiente elemento
				this.bannerSelected1=this.text_banner.text1[this.bannerIndex1];
				this.bannerIndex1=this.bannerIndex1+1;
		//animaciones
				//opacity aparte del resto
				if(this.banner[1].opacity)
					this.banner1Ref.style.opacity="1";
				
				//opciones width,positionleft,positionTop,
				if(this.banner[1].trans.width)
					this.banner1Ref.style.width="100%";
				else if(this.banner[1].trans.positionTop)
					this.banner1Ref.style.top="0px";
				else if(this.banner[1].trans.positionLeft)
					this.banner1Ref.style.left="0px";
				else if(this.banner[1].trans.scale)
					this.banner1Ref.style.transform="scale(1)";
				else if(this.banner[1].trans.scaleRotate)
					this.banner1Ref.style.transform="scale(1) rotate(0deg)"
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