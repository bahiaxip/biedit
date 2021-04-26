<template>
	<div class="bh_banner"  :class="[
			main[mainString.confString].orientation=='vertical' ? 'bh_banner_vertical':'bh_banner_horizontal'
			,
				main[mainString.confString].size=='min' ? 'min':'medium'
			]">
		<!-- solo puede haber un elemento img o p en cada div.
			-<img>: Si asignamos el atributo width, éste se mantiene, si no, se asignará el 100% del banner, si no se muestra la altura completa, probar
			con un width más pequeño.
			-<p>: la frase más larga debe ir la primera si no, puede ser necesario
			aumentar el height del banner y el div_banner correspondiente
		-->

		<div :ref="main[mainString.refString].parentsDivsString[0]" class="div_banner" :class="main[mainString.confString].size=='min' ? 'min':'medium'" >
			<p class="text_banner text1" :ref="main[mainString.refString].refsString[0]" v-if="main[mainString.bannerString][1].modeText" >{{main[mainString.tmpString][1].selected}}</p>
			
			<video width="200" height="100" :ref="main[mainString.refString].refsString[0]" v-else-if="main[mainString.bannerString][1].modeVideo" class="img_banner"  autoplay muted>				
				<source :src="main[mainString.tmpString][1].selected" >
			</video>

			<img :src="main[mainString.tmpString][1].selected" :width="main[mainString.bannerString][1].widthHTML"  :ref="main[mainString.refString].refsString[0]" class="img_banner" v-else/>
						
			
		</div>
		<div :ref="main[mainString.refString].parentsDivsString[1]"  class="div_banner" :class="main[mainString.confString].size=='min' ? 'min':'medium'">
			<p class="text_banner font_zerogirl" :ref="main[mainString.refString].refsString[1]" v-if="main[mainString.bannerString][2].modeText">{{main[mainString.tmpString][2].selected}}</p>

			<video width="200" height="100" :ref="main[mainString.refString].refsString[1]"  autoplay muted v-else-if="main[mainString.bannerString][2].modeVideo" class="img_banner">
				<source :src="main[mainString.tmpString][2].selected" >
			</video>

			<img :src="main[mainString.tmpString][2].selected" :width="main[mainString.bannerString][2].widthHTML" :ref="main[mainString.refString].refsString[1]" class="img_banner" v-else />
			<!--<video width="200" height="100"  autoplay muted loop v-else-if="main[mainString.bannerString][2].modeText=='video'">
				<source :src="main[mainString.tmpString][2].selected" type="video/mp4">
			</video>-->
			

		</div>
		<div :ref="main[mainString.refString].parentsDivsString[2]" class="div_banner" :class="main[mainString.confString].size=='min' ? 'min':'medium'">
			<p class="text_banner" :ref="main[mainString.refString].refsString[2]" v-if="main[mainString.bannerString][3].modeText">{{main[mainString.tmpString][3].selected}}</p>
			
			<video width="200" height="100" :ref="main[mainString.refString].refsString[2]"  autoplay muted v-else-if="main[mainString.bannerString][3].modeVideo">
				<source :src="main[mainString.tmpString][2].selected" type="video/mp4">
			</video>

			<img :src="main[mainString.tmpString][3].selected" :width="main[mainString.bannerString][3].widthHTML"  :ref="main[mainString.refString].refsString[2]" class="img_banner" v-else/>
			
		</div>
	</div>
</template>
<script>
export default {
	name: 'Banner',
	props:['options'],
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
			//se asigna el primer texto de cada uno en el template además de aquí
				//se podría comprobar la longitud de caracteres y así asignar el texto 
				//con más caracteres primero, pero si se introduce un font-size mayor
				//no funcionaría				
				//primero poner el que tenga más caracteres
		
			bhBannerConf:{
				//strings por defecto
	//los divs y los ref deben ser dinámicos
	//podríamos llevarnos los datos que son aleatorios al objeto ref, pasados!!
				
//por revisarr
				//global modeText
				//modeText:false,
				orientation:"horizontal",
				//si no se ha asignado el font-size ni en CSS, ni con javascript,
				//ni con la propiedad fontSizeStyle individual, como última opción
				//comprueba el fontsizeDefault
			//se podría sustituir el fontSizeDefault según si el size es min o medium
			//por un size más pequeño o más grande
				fontSizeDefault:"16px",
				size:null,
				time:4000,
				
//o más animaciones ->		//configuración de cada una de las 5 animaciones
		//En cada animación se pueden cambiar cualquiera de los 3 posibles

//Se debería comprobar 1 a 1, es decir, si solo se ha asignado el 1 que se actualice
//solo el 1, etc,...
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
				videosBanner:[
					[
						"video/video_cut_biedit.mkv"
					],
					[
					],
					[

					]
				]
			},
	//configuración de cada elemento del banner (1, 2 y 3)
			//se podría haber hecho un array de objetos, pero para especificar mejor
			//(elemento 1, elemento 2 y elemento 3) se crean propiedades de tipo entero
//Se debería comprobar 1 a 1, es decir, si solo se ha asignado el 1 que se actualice
//solo el 1, si solo se ha actualizado el 1 del opacity solo ese, si se ha actualizado
//alguno de los demás se actualiza a ése, además comprobar si es true o false.
			bhBannerOptions:{
			//opciones del primer elemento del banner (1/3)
				1:{
					//por si queremos más adelante hacer un banner solo de 2 o de 1 
					//podemos establecer la propiedad state y así comprobar

					//state:true,
					//opacity de momento fijo siempre
					opacity:false,
					//solo una, si existe más de una solo la primera
					trans:{
						//el width es para el ancho, sin embargo, en este ejemplo,
						//al ser un elemento de texto (<p>) hacemos uso de font-size
						//para realizar la transición
					//width y height realmente son transform:scale(), ya que height 
					//resulta algo más complejo (daba algunos errores) con algunas 
					//imágenes a la hora de obtener el height
						width:false,
						height:true,
						//solo texto (<p>)
						fontSize:false,
						positionLeft:false,
						positionTop:false,
						//scale:false,
						scaleRotate:false,						
			//height,
					},
					//type:null,
					fontSizeStyle:null,
					modeText:false,
					modeVideo:false,
					widthHTML:null,
				},
			//opciones del segundo elemento del banner  (2/3)
				2:{
					opacity:false,
					//solo una, si existe más de una solo la primera
					trans:{
						width:false,
						height:false,
						//solo texto (<p>)
						fontSize:false,
						positionLeft:false,
						positionTop:true,
						//scale:false,
						scaleRotate:false,
					},
					//type:null,
					fontSizeStyle:null,
					modeText:false,
					modeVideo:false,
					widthHTML:null,
				},
			//opciones del tercer elemento del banner (3/3)
				3:{
					opacity:true,
					//solo una, si existe más de una solo la primera
					trans:{
						width:false,
						height:false,
						//solo texto (<p>)
						fontSize:false,
						positionLeft:false,
						positionTop:false,
						//scale:false,
						scaleRotate:false,
					},
					//type:null,
					fontSizeStyle:null,
					modeText:false,
					modeVideo:false,
					widthHTML:null,
				}
			},		
			
			tmpBhBanner:{
				1:{
					type:null,
					selected:null,
					index:0,
					list:null,
					fontSize:null,
				},
				2:{
					type:null,
					selected:null,
					index:0,
					list:null,
					fontSize:null,
				},
				3:{
					type:null,
					selected:null,
					index:0,
					list:null,
					fontSize:null,
				},
				listOrder:null,
				counter:0,
				//atención, al añadir algún parámetro puede variar el largo de un loop
			},
			//strings y objetos asociados a los atributos ref de html en Vue
			//interval, quizás pasar a otro objeto
			refBhBanner:{
								
				parentsDivsString:[
					'div_banner1',
					'div_banner2',
					'div_banner3'
				],
				refsString:[
					'nodeRef1',
					'nodeRef2',
					'nodeRef3'
				],
				//refObject,optionsObject y tmpObject da igual el nombre tan solo que sea distinto si se requiere otro banner
				//conf
				confObject:'bhConfBanner',
				//ref
				refObject:'bhRefBanner',
				//banner
				optionsObject: 'bhOptionsBanner',
				//éste (bhBannerConf) anulado sustituido por variable name
				//confObject: 'banner2',
				//tmpBanner
				tmpObject: 'bhTmpBanner',
				divParentRef:{
					1:null,
					2:null,
					3:null,
				},

				nodeRef:{
					1:null,
					2:null,
					3:null,	
				},
				
			//interval, necesario para limpiarlo en el destroyed, podría estar ubicado
			//tb en el objeto tmpBhBanner
				interval:null,				
			},
			video:null,		
			
			//objeto main que contiene los 4 objetos principales
			main:null,
			//mainString son strings generados aleatoriamente que permiten ser
			//referenciados mediante 4 propiedades:
			//confString,bannerString,refString, tmpString
			mainString:null,
			focus:true
		}

	},
	created(){
		//si se han asignado opciones pasamos los ref de los los divs y los elementos 
		//a strings aleatorios, tenemos que crearlos aquí, antes del mounted(), ya 
		//que son atributos ref de Vue en el template.
		if(this.options)			
			//mejor for para asignar los 2 a la vez
			for(let i=0;i<this.refBhBanner.parentsDivsString.length;i++){
				this.refBhBanner.parentsDivsString[i]=(Math.floor(Math.random()*1000000)+1).toString();
				this.refBhBanner.refsString[i]=(Math.floor(Math.random()*1000000)+1).toString();
			}

		let main=this.setDataMain(this.options);
		
	//Asignamos los 4 objetos originales al nuevo objeto main con 4 propiedades
	// de tipo string y aleatorio para que nunca se repitan y se puedan cruzar 
	//en el caso de que se quiera más de un banner en el mismo componente padre. 
	//Las 4 propiedades podrán ser referenciadas mediante las 4 variables asignadas:
	//confString,refString,bannerString,tmpString
		this.mainString=main;
		this.main={};
		this.main[main.confString]=this.bhBannerConf;
		this.main[main.refString]=this.refBhBanner;
		this.main[main.bannerString]=this.bhBannerOptions;
		this.main[main.tmpString]=this.tmpBhBanner;
		
		if(this.options){

			this.testOrientationAndNodes(this.options,this.main[main.confString],this.main[main.bannerString]);
			//console.log("el confString: ",this.main[main.confString]);
			this.setOrderAnimations(this.options,this.main[main.confString]);
			this.setEffects(this.options,this.main[main.bannerString]);
		}
		//console.log("este es: ",this.main[this.mainString.bannerString][1].modeText);
	},
	mounted(){
		window.addEventListener("focus",()=> {
			console.log("foco antes: ",this.focus)
			this.focus=true;
			console.log("foco después: ",this.focus)
		})
		window.addEventListener("blur",()=> {
			this.focus=false
		})
		/*
		if(this.main[this.mainString.bannerString][1].modeText=='video'){
			this.video=this.$refs[this.main[this.mainString.refString].refsString[0]];
			console.log(this.video)
			let playPromise=this.video.play();
			if(playPromise !== undefined){
				playPromise.then(() =>  {
					console.log("dentro video")
				}).catch(error => {
					console.log("error  promise: ",error)
				})
			}	
		}
		*/

		
		//this.boton.addEventListener("click",this.startPlay);
	
		this.setRefs(this.main[this.mainString.refString],this.main[this.mainString.confString],this.main[this.mainString.tmpString],this.main[this.mainString.bannerString]);
	
		this.interval_animationbanner(this.main[this.mainString.tmpString],this.main[this.mainString.confString],this.main[this.mainString.refString],this.main[this.mainString.bannerString]);
	},
	destroyed(){		
		//detenemos setInterval()
		clearInterval(this.main[this.mainString.refString].interval);
	},
	methods:{		
		//comprueba y establece la propiedad asignada en options como true 
		//(sobreescribiendo) las opciones por defecto del objeto (ya sea original o 
		//duplicado)
		testAndSetEffect(option,effects){
			let effectsList=["width","height","positionLeft","positionTop","scaleRotate"];
//revisar si añadir el push o configurarla en initStylesFirstTime
			if(option.modeText)
				effectsList.push("fontSize");			
			
			for(let i=0;i<effectsList.length;i++){

				let effectSelected=this.setTransFromOptions(option[effectsList[i]]);

				if(effectSelected===false || effectSelected ===true)
					//si se ha asignado algún efecto, ya sea true o false, pasamos 
					//todos los efectos asignados por defecto a false
					effectsList.forEach((typeString) => {
						effects.trans[typeString]=false;
					})				
				//si aparece alguno de los efectos a true detenemos el bucle e 
				//ignoramos el resto
				if(effectSelected===true){
					effects.trans[effectsList[i]]=true;
					break;
				}
			}
		},

		setEffects(options,effects){
			//comprobando y asignando configuración de transiciones de cada animación
			if(options.effects){
				for(let i=1;i<4;i++){
					if(options.effects[i]){						
					//opacity
						//si se ha añadido y es true se asigna true
						if(options.effects[i].opacity){						
							effects[i].opacity=true;
						//si se ha añadido y es false se asigna false
						}else if(options.effects[i].opacity===false){
							effects[i].opacity=false;					
						}
						//console.log("options.effects[i]: ",options.effects[i])
						this.testAndSetEffect(options.effects[i],effects[i])
						console.log("llega")
						//						
						//si no se ha añadido no se hace nada
						//pruebas con else se omiten
						//se ignora y se mantiene el opacity que existe en el objeto original
						//else
							//console.log("el opacity no existe")
		
		//para detectar si existe propiedad estamos comprobando si es true o false 
		//directamente pero existen varios métodos que podrian quizás,ser mejores o
		//utilizarlos para pasar todas la propiedades  de trans a false si existe alguna:
		//se podría utilizar hasOwnProperty("nombrede propiedad")  o
		//tb se podría con in ("nombre de propiedad" in objeto)	
		
					}
					//console.log("ASDFASDF: ",i);
				}
				//console.log("se acaba el for")
			}
		},

		setOrderAnimations(options,conf){
			//se podría asignar el largo con Object.keys() y así asignar los que se deseen
			//console.log("desde setOrderAnimations: ",Object.keys(options.order).length)
			if(options.order){
				let order={};
				for(let i=0;i<Object.keys(options.order).length;i++){
					//comprobamos si cada array tiene como máximo 3 elementos
					if(options.order[i] && options.order[i].length>0 && options.order[i].length<4){
				//comprobamos si es 1,2 o 3, tanto en entero como en string
						var resultOrders=options.order[i].every((order)=> {
							return (order===1||order===2||order===3||order==="1"||order==="2"||order==="3");
						})
						//si alguno no contiene 1, 2 o 3 rompemos y finalizamos el for
						if(!resultOrders){
							console.log("la configuración en order no es correcta");
							break;
						}
							
						//si  los elementos pasan el condicional y el every(), se 
						//asigna el nuevo orden de animaciones
						order[i]=options.order[i];						
						//conf.order[i]=options.order[i];
					}
				}
				//si existe al menos un array de configuración en options se asigna
				//el nuevo objeto order
				if(Object.keys(order).length>0)
					conf.order=order;		
			}
		},
		//se actualiza la configuración de orientación, medida, font-size y se 
		//actualiza la configuración de textos o imágenes de todos los elementos. 
		//Esta actualización se basa en los datos pasados en options desde el 
		//componente padre
		testOrientationAndNodes(options,conf,banner){
		//si la configuración incorpora orientation se asigna la nueva configuración
			if(options.orientation){
				//si no se ha asignado correctamente una de las 2 posibles opciones
			//se detiene la ejecución y mostramos mensaje por consola de browser
				if(options.orientation !=="vertical" && options.orientation !=="horizontal"){
					console.log("Error options.orientation: Solamente puede ser horizontal o vertical");
					return;
				}				
				//asignamos la orientación asignada en options
				conf.orientation=options.orientation	
				
			}
			//si incorpora medida se actualiza
			if(options.size && options.size==="medium" ||
				options.size && options.size==="min"){
				conf.size=options.size;
				//console.log("conf: ",conf)
			}
			//si se ha asignado un fontSizeDefault (global 
			//para todos los elementos) se actualiza
			if(options.fontSizeDefault){
				let font=options.fontSizeDefault;
				if(typeof(options.fontSizeDefault)=="number")
					font=font+"px";
				
				conf.fontSizeDefault=font;				
			}
			//tiempo entre animación mostrar y ocultar de nuevo
			if(options.time){
				conf.time=options.time;
			}
				
			
		//comprobando y asignando imágenes o textos
			if(options.images && options.images.length>0  || options.texts && options.texts.length>0  ||  options.videos && options.videos.length>0){

				let opEffects;
				if(options.effects){
					opEffects=options.effects;
				}

					//loop para actualizar las propiedades pasadas en options de cada 
					//uno de los 3 elementos (que se encuentran clasificiados con 
					//propiedades de tipo entero (1|2|3))
				for(let i=1;i<4;i++){

					//si el modeText es true se revisan textos
					if(opEffects && opEffects[i] && opEffects[i].modeText){							
						//textos
						if(options.texts && options.texts[i-1] && options.texts[i-1].length>0){
							banner[i].modeText=true;
							
							let testArray=this.testStringArray(options.texts[i-1]);
							if(!testArray){
								console.log("options.texts debe ser un array de tipo cadena");
							}
					//si existe en options fontSizeStyle (individual para
					//cada elemento), se actualiza
				//(se podría guardar en tmp en lugar de banner)
							if(options.effects[i].fontSizeStyle){
								let font=options.effects[i].fontSizeStyle;
								//comprobamos si es entero: se añade los caracteres px
								if(typeof(font)==="number"){	
									font=font+"px";
								}										
								banner[i].fontSizeStyle=font;
							}									
								//se asignan textos del elemento
								conf.textsBanner[i-1]=options.texts[i-1];
						}else{
							console.log("el modo texto está activado pero no se han detectado textos")
						}								
					
					}else if(opEffects && opEffects[i] && opEffects[i].modeVideo){
						if(options.videos && options.videos[i-1] && options.videos[i-1].length>0){

								banner[i].modeVideo=true;								
								conf.videosBanner[i-1]=options.videos[i-1];
								console.log("el video: ",conf.videosBanner[i-1])
							}

						//imágenes
					}else{
						console.log("options: ",options.images[i-1])
						if(options.images && options.images[i-1] && options.images[i-1].length>0){

							let testArray=this.testStringArray(options.images[i-1]);
							
							if(!testArray){
								console.log("options.texts debe ser un array de tipo cadena");
							}
							//console.log("desde options.images",testArray)
							if(opEffects && opEffects[i] && opEffects[i].widthHTML)
								banner[i].widthHTML=opEffects[i].widthHTML;
							conf.imagesBanner[i-1]=options.images[i-1];
						}else{

							console.log("no se han detectado imágenes, se establecen la imágenes de prueba")
						}
					}
				}
			}
		},
		//comprueba si todos los elementos de un array son string y devuelve true
		//en caso afirmativo
		testStringArray(arr){
			var result=arr.every((pathImage) =>{
				return typeof(pathImage)==="string";
			})
			return result;
		},

		//establecemos los objetos principales 4 con (casi) todos los datos, excepto 3 variables 
		//sueltas por  revisar
		setDataMain(options){			
			let confString,refString,bannerString,tmpString;
			
			if(options){			
			//creando strings dinámicos
				//bhBannerConf String
				let confObjectString="bhBanner_"+(Math.floor(Math.random()*1000000)+1);
				confString=confObjectString;
	
				//refBhBanner String				
				let refObjectString="bhBanner_"+(Math.floor(Math.random()*1000000)+1);
				
				refString=refObjectString;

				//bhBannerOptions String		
				let transObjectString="bhBanner_"+(Math.floor(Math.random()*1000000)+1);		
				bannerString=transObjectString;

				//tmpBhBanner String
				let tmpObjString="bhBanner_"+(Math.floor(Math.random()*1000000)+1);
				tmpString=tmpObjString;
			}else{

				//conf String
				confString=this.refBhBanner.confObject;
				
				//ref String
				refString=this.refBhBanner.refObject;

				//banner String
				bannerString=this.refBhBanner.optionsObject;

				//tmpBanner String
				tmpString=this.refBhBanner.tmpObject;

			}
			return {confString,refString,bannerString,tmpString};

		},
		//establecer todas las propiedades de trans a false (solo del elemento 
		//pasado) del objeto banner original		
		setTransToFalse(bannerTrans){
			bannerTrans.width=false;
			bannerTrans.height=false;
			bannerTrans.positionLeft=false;
			bannerTrans.positionTop=false;
			//bannerTrans.scale=false;
			bannerTrans.scaleRotate=false;
		},
		//devuelve boolean identificando si el efecto se ha incluido en options
		//tanto si es true como si es false, si no se ha incluido devuelve undefined
		setTransFromOptions(transType){
			if(transType && transType===true)
				return true;
			else if(transType===false)
				return false;
			else
				return;
		},
		setSizeByOrientation(divParent,orientation){
			if(orientation=="horizontal"){
					divParent.style.width=divParent.clientWidth+"px";
				//con height	
			}else if(orientation=="vertical"){					
					divParent.style.height=divParent.clientHeight+"px";
					//divBanner2.style.height=divBanner2.clientHeight+"px";
					//divBanner3.style.height=divBanner3.clientHeight+"px";	
					
				}
		},
	
	//aquí se puede establecer los refs y aprovechar el mismo for para establecer el 
	//tipo (img o  text)
		//setDataAndStyles
		setRefs(refObject,conf,tmp,banner){			
			for(let i=0;i<refObject.parentsDivsString.length;i++){
				const num=i+1;
				//establecemos referencias de div padres y elementos con los strings
				//del objeto bhBannerConf o aleatorio automáticamente si se detectan
				//datos de un objeto options en el padre
				
				refObject.divParentRef[num]=this.$refs[refObject.parentsDivsString[i]];

				refObject.nodeRef[num]=this.$refs[refObject.refsString[i]];
				//establecemos mediante el div padre el tipo (imagen o texto)
				//y establecemos la lista de imágenes o textos de cada uno de los
				//elementos
				this.setListByType(tmp,num,conf,banner);
				//this.setTypeAndList(refObject.divParentRef[i+1],i+1,tmp,conf);
				
				//asignamos texto inicial o imagen inicial
				//this.tmpBhBanner[(i+1)].selected=this.tmpBhBanner[(i+1)].list[this.tmpBhBanner[(i+1)].index];
				tmp[num].selected=tmp[num].list[tmp[num].index];
				
				//establecemos estilos iniciales en caso de ser necesario (según 
				//la opción de transición seleccionada)				
				
				this.initStylesFirstTime(refObject.nodeRef[num],banner[num],conf,tmp[num]);
				console.log("pasa por initStyleFirstTime()")
				
				//establecemos width o height con px para que se quede fijo y no se 
				//pueda agrandar o encoger el banner al cambiar de elemento
				//this.setSizeByOrientation(refObject.divParentRef[num],this.bhBannerConf.orientation);
				this.setSizeByOrientation(refObject.divParentRef[num],conf.orientation);
				
			}			
		},
		setListByType(tmp,num,conf,banner){
			if(banner[num].modeText===true)
				tmp[num].list=conf.textsBanner[num-1]
			else if(banner[num].modeVideo === true)
				tmp[num].list=conf.videosBanner[num-1]
			else
				tmp[num].list=conf.imagesBanner[num-1]		
		},


	//para convertirlo a librería se utiliza la variable banner[X].modeText 
	//y no sería necesaria esta comprobación de type, tan solo sería necesario
	//comprobar si modeText es true o false y asignar el list de images o texts,
	// sin necesidad de comprobar si solo hay uno de los 2, ya que el img o p siempre 
	//va haber solo 1 de los 2. Por ahora usamos la variable modeText en el template
	//para mostrar el img o el text y mantenemos el mismo if-elseif-else que teníamos.
		//La siguiente condición comprueba si un div contiene un elemento img (solo 
		//uno) o un elemento p (solo uno) y los asigna al objeto tmpBhBanner[X] 
		//(propiedad type). Tb asigna a la propiedad list la lista de rutas de 
		//imágenes o textos de cada elemento
//anulado, sustituido por setListByType()
	/*
		setTypeAndList(divParent,num,tmp,main){	

			if(divParent.getElementsByTagName('img').length==1 &&
					divParent.getElementsByTagName('p').length==0){
				//establecemos el tipo
				//this.tmpBhBanner[num].type="img";
			
				tmp[num].type="img";
				//establecemos la lista de elementos a cambiar
				//this.tmpBhBanner[num].list=this.bhBannerConf.imagesBanner[num-1];
				tmp[num].list=main.imagesBanner[num-1];
			}
			else if(divParent.getElementsByTagName('p').length==1 &&
					divParent.getElementsByTagName('img').length==0){
				//establecemos el tipo
				//this.tmpBhBanner[num].type="text";
				tmp[num].type="text";
				//establecemos la lista de elementos a cambiar
				//this.tmpBhBanner[num].list=this.bhBannerConf.textsBanner[num-1];
				tmp[num].list=main.textsBanner[num-1];
			}else{
				console.log("Se requiere un elemento <p> o <img> (solo uno)",divParent);
				return;
			}

		},
	*/
	
		initStylesFirstTime(bannerRef,effects,conf,tmp){
			//si existe video
			if(effects.modeVideo==true){
				console.log("desde initStyles wow: ",bannerRef)
				console.log(tmp)
				let playPromise=bannerRef.play();

				if(playPromise !== undefined){
					playPromise.then(() =>  {
						console.log("dentro video")
					}).catch(error => {
						console.log("error  promise: ",error)
					})
				}	
			}
			
			if(conf.size){
				//
			}

		//independientemente de si existe el efecto font-size o cualquier efecto 
		//se asigna un font-size por defecto.
		//orden de prioridad de asignación de font-size:
		//	fontSizeStyle>style>CSS>fontSizeDefault>fontSizeDefaultOriginal
		//fontSizeStyle: variable individual de cada elemento (options)
		//style: estilos asignados en html
		//CSS: estilos asignados en css
		//fontSizeDefault: variable global para todos los elementos (options)
		//fontSizeDefaultOriginal: variable igual a fontSizeDefault, asignada por
		//defecto y asignada como último recurso en caso de que ninguna otra opción 
		//sea válida.
		console.log("desde initStyle: ",effects.fontSizeStyle)
			let tmpFont;
			console.log("bannerRef: ",bannerRef)
			let fontSizeCSS=window.getComputedStyle(bannerRef,null).getPropertyValue("font-size");
			if(effects.fontSizeStyle)
				tmpFont=effects.fontSizeStyle			
			else if(bannerRef.style.fontSize)				
				tmpFont=bannerRef.style.fontSize				
			else if(fontSizeCSS)
				tmpFont=fontSizeCSS						
			else				
				tmpFont=conf.fontSizeDefault
	//asignamos variable temporal con el fontsize después de las anteriores 
	//comprobaciones		
			//almacenamos el font del texto en una temporal, necesaria en 
			//showAnimation() para el efecto fontSize
			tmp.fontSize=tmpFont;
			bannerRef.style.fontSize=tmpFont;
			
			if(effects.trans.positionLeft)
				//asignamos 0px para que tome efectos la transición la primera vez
				bannerRef.style.left="0px";
			//al ser un elemento de texto (<p>) usamos font-size en lugar de width
			else if(effects.trans.width){
				if(bannerRef.width)
					//console.log("height: ",bannerRef.parentNode.clientHeight);
					//bannerRef.style.height=bannerRef.parentNode.clientHeight+"px";
					
					bannerRef.style.width=bannerRef.width+'px';
				else

					bannerRef.style.width="100%";
			}else if(effects.trans.fontSize){
				if(effects.modeText){
			//si el bannerRef tiene asignado algún font-size  ya sea en HTML o en
			//CSS se asigna ese, si por alguna razón o error no encuentra ningún 
			//font-size se asigna uno establecido por defecto
			//si existen estilos en HTML o JavaScript se asignan esos
					
					
					//actualizamos el font del texto
					bannerRef.style.fontSize=tmpFont;
					console.log("font final: ", tmpFont)
					//effects.fontSize=bannerRef.style.fontSize;					
					//this.text_banner.fontSizeInitial=bannerRef.style.fontSize;	
				//si el bannerRef no tiene ningún estilo font-size asignado se
				//establece uno por defecto
					//si existen estilos en CSS se asignan esos
				}else{
					console.log(effects)
					console.log("Para el efecto fontSize es necesario activar la opción modeText");
				}


				
			}
			else if(effects.trans.height){					
				//console.log("BANNERREF: ",this.tmpBhBanner[1].selected);				
				//bannerRef.style.height=bannerRef.parentNode.clientHeight+"px";
			}
			//asignamos 0px para que tome efectos la transición la primera vez
			else if(effects.trans.positionTop)
				bannerRef.style.top="0px";

			//console.log("bannerRef: ",conf);
		},

		interval_animationbanner(tmp,main,ref,bannerConf){


	//para obtener la cantidad de propiedades de un objeto: Object.keys()
			//array de propiedades de un objeto (Object.keys()) 
			//Nota: countPropsOrder es un array de las propiedades del objeto y no 
			//de los valores, es útil para resetear el counter y volver a la primera
			//animación
			//let countPropsOrder=Object.keys(this.bhBannerConf.order);
			tmp.listOrder=Object.keys(main.order);
			if(tmp.listOrder.length<=0)
				return;

			//contador de interval para comprobar el tipo de animación que corresponde
			//la animación 1, la 2...
			//let counter=0;

			ref.interval=setInterval(()=>{
				//si el counter ha llegado a la última animación reseteamos para que
				//comience otra vez por la primera
				if(tmp.counter==tmp.listOrder.length)	{
					tmp.counter=0;
				}
				//Obtenemos propiedad de order que coincida con counter
				//de esa forma si el counter es 0 le corresponde la animación 0, si
				//el counter es 1, la animación 1, hasta las 5 animaciones posibles,
				//y vuelve a empezar por 0.
				//Cada animación puede configurarse a 1, a 2 o a los 3 divs.
				//Aviso:tanto las propiedades como sus valores son enteros.
				//matchElement es la propiedad del objeto bhBannerConf.order que 
				//coincide con counter (0|1|2|3|4)
				let matchElement=tmp.listOrder.find(element=> element==tmp.counter);
				//list es la lista de los elementos que deben realizar transición, 
				//pero solo de la animación que coincide con counter
				let list=main.order[matchElement];
				
				if(!matchElement){					
					return;
				}
				
	//por revisar si es necesario, el problema es con la transición left o top
	//que realiza la primera transición pk es necesario establecer left o top 
	//en los estilos.
			
				let time=100;
				let time2=700;
				
					
				setTimeout(()=> {
					//comienzo de animación (opacity, top, rotate,...)
					this.hideAnimation(list,tmp,bannerConf,ref);
				},time)

				setTimeout(()=> {
					//final de animación (opacity,top,rotate...)
					this.showAnimation(list,tmp,bannerConf,ref);
				},time2)

				//aumentamos counter
				//this.bhBannerConf.counter++;
				tmp.counter++;
				
			},main.time)

			
		},
		//ocultamos con alguna de las animaciones el elemento actual
			//list es el array actual de configuración (de los 5 posibles)
		hideAnimation(list,tmp,bannerConf,ref){
		//ocultar animación 
			if(list.indexOf(1)!=-1){
				this.initAnimation('1','hide',tmp,bannerConf,ref);
			}			
			if(list.indexOf(2)!=-1){
				this.initAnimation('2','hide',tmp,bannerConf,ref);
			}
			if(list.indexOf(3)!=-1){
				this.initAnimation('3','hide',tmp,bannerConf,ref);
			}
		},
		initAnimation(num,type,tmp,bannerConf,ref){
			
			let banner,bannerRef,list;
			if(num==1 || num==2 || num==3){

				//objeto de banner que contiene las opciones(animaciones activadas)
				banner=bannerConf[num];
				//elemento banner (<p> o <img>) 
				bannerRef=ref.nodeRef[num];
				//console.log("initAnimation: ",ref);
				//bannerRef=this.refBhBanner.banner1Ref;
				list=tmp[num].list;
				if(type=="show"){
				//si es la primera vez modificamos el index a uno para poder 
				//cambiar al segundo, ya que, el primero ya se ha asignado al inicio.
				//añadimos la condición list.length por si la lista solo tiene una 
				//imagen o si es texto tiene solo un texto
					if(tmp[num].index==0 && list.length>1)
						tmp[num].index=1;
					//si ha llegado al último reseteamos al primero
					else if(list.length==tmp[num].index)
						tmp[num].index=0;
				//seleccionamos el siguiente de la lista y sumamos uno al index
					tmp[num].selected=list[tmp[num].index];
					tmp[num].index=tmp[num].index+1;
				}
			}

		//ocultar
			if(type=="hide"){
				
			//opacity idenpendiente del resto
				if(banner.opacity)
					bannerRef.style.opacity="0";				
			//aunque se puede hacer con width, con height más complicado si no
			//se tiene asignado el height, lo pasamos a transform:scale(1,0) y 
			//scale(0,1), ya no es necesario identificar si es texto o imagen,
			//ya que el scale funciona en texto, y para el texto añadimos otro 
			//efecto (fontSize)
				//al ser un elemento <p> no es posible con width, es
				//necesario fontSize
				if(banner.trans.width)					
					bannerRef.style.transform="scale(0,1)";
				
	//no conviene el height, es necesario obtener objeto Image() y calcular el nuevo height y en algunas imágenes tarda más de la cuenta y devuelve Nan
				
				else if(banner.trans.height){
					/*
					let ima=new Image();
					ima.src="img/home/chicago.jpg";
					
					let newHeight=(bannerRef.clientWidth*ima.height)/ima.width
					console.log("desde hide: ",newHeight)
					this.tmpHeight=newHeight;
					bannerRef.style.height="0px";

					*/
					bannerRef.style.transform="scale(1,0)";
				}else if(banner.trans.positionTop)
					//comprobar medida de altura y sustituir (min o medium)
					bannerRef.style.top="-150px";
				else if(banner.trans.positionLeft){
					//comprobar medida de anchura y sustituir (min o medium)
					bannerRef.style.left="-300px";					
				}
					
				//else if(banner.trans.scale)
				//	bannerRef.style.transform="scale(0)";

				else if(banner.trans.scaleRotate)
					bannerRef.style.transform="scale(0) rotate(360deg)";
				else if(banner.trans.fontSize){
					if(banner.modeText)
						bannerRef.style.fontSize="0";
					else
						console.log("Para el efecto fontSize es necesario incluir modeText");

				}
				
				if(bannerConf[num].modeVideo==true)
					ref.nodeRef[num].pause();
				//resetear el src no permite la transición 
					//ref.nodeRef[num].src="";					
				



		//mostrar
			}else if(type=="show"){
				//console.log("en show let banner: ",banner);
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
//revisar				
				if(bannerConf[num].modeVideo==true){
					console.log("foco: ",this.focus)
					//console.log("ref: ",ref.nodeRef[num])
					//console.log(tmp)
					ref.nodeRef[num].src=tmp[num].selected
					//al abandonar la pestaña del navegador genera error en play(), para
					//solucionarlo comprobamos el focus del navegador  creando 2 
					//listeners en mounted 
					if(this.focus)
						ref.nodeRef[num].play()

					//this.video.src=this.main[this.mainString.tmpString][1].selected;
					//this.video.play();
					
				}
					
				if(banner.opacity)
					bannerRef.style.opacity="1";
				
				//opciones width,positionleft,positionTop,
				//para un elemento <p> pasamos de width a fontSize
				//bannerRef.style.width="100%";

				if(banner.trans.width){
					bannerRef.style.transform="scale(1,1)";
					//antiguo
					//if(banner.type=="img")
					//if(banner.modeText!==true)
						//if(bannerRef.getAttribute("width")){
							//bannerRef.style.transform="scale(1,1)";
							//si el usuario asigna valor al atributo width de elemento
						//	//img el width se asigna el width del atributo
				//aplicar parseInt()
							//bannerRef.style.width=bannerRef.getAttribute('width')+'px'
							//bannerRef.style.height="100px";
						//}
						//else{
						//	console.log("no pasa por width: ",bannerRef.getAttribute("width"));
						//	bannerRef.style.width="100%";
						//}
					//else
						//console.log("nada");
						//bannerRef.style.fontSize=this.text_banner.fontSizeInitial;
						//bannerRef.style.fontSize=banner.fontSize;
					//bannerRef.style.width="100%";
				}
				else if(banner.trans.height){					
					bannerRef.style.transform="scale(1,1)";
				}
				else if(banner.trans.positionTop)
					bannerRef.style.top="0px";
				else if(banner.trans.positionLeft)
					bannerRef.style.left="0px";
				//else if(banner.trans.scale)
					//bannerRef.style.transform="scale(1)";
				else if(banner.trans.scaleRotate)
					bannerRef.style.transform="scale(1) rotate(0deg)"
				else if(banner.trans.fontSize){
					if(banner.modeText){
						bannerRef.style.fontSize=tmp[num].fontSize
					}
						
				}
			}
			banner=null,
			bannerRef=null,
			list=null;
			
			

		},
		//asignamos el siguiente elemento y volvemos a mostrar con alguna de las 
		//animaciones
			//list es el array actual de configuración 			
		showAnimation(list,tmp,bannerConf,ref){
			//mostrar animación 
			if(list.indexOf(1)!=-1){
				this.initAnimation('1','show',tmp,bannerConf,ref);		
			}			
			if(list.indexOf(2)!=-1){
				this.initAnimation('2','show',tmp,bannerConf,ref);
			}
			if(list.indexOf(3)!=-1){
				this.initAnimation('3','show',tmp,bannerConf,ref);
			}
			
		},
	}
}
</script>
<style>
@import '../assets/css/bh_banner.css';
</style>