<template>
	<div class="bh_banner"  :class="bhBannerConf.orientation=='vertical' ? 'bh_banner_vertical':'bh_banner_horizontal'">
		<!-- solo puede haber un elemento img o p en cada div.
			-<img>: Si asignamos el atributo width, éste se mantiene, si no, se asignará el 100% del banner, si no se muestra la altura completa, probar
			con un width más pequeño.
			-<p>: la frase más larga debe ir la primera si no, puede ser necesario
			aumentar el height del banner y el div_banner correspondiente
		-->

		<div :ref="main[mainString.refString].parentsDivsString[0]" class="div_banner"  >
			<img :src="main[mainString.tmpString][1].selected" :width="main[mainString.bannerString][1].widthHTML" :ref="main[mainString.refString].refsString[0]" class="img_banner" v-if="!main[mainString.bannerString][1].modeText"/>
			<p class="text_banner text1" :ref="main[mainString.refString].refsString[0]" v-else >{{main[mainString.tmpString][1].selected}}</p>
		</div>
		<div :ref="refBhBanner.parentsDivsString[1]"  class="div_banner">
			<img :src="tmpBhBanner[2].selected" :width="bhBannerOptions[2].widthHTML" :ref="refBhBanner.refsString[1]" class="img_banner" v-if="!bhBannerOptions[2].modeText"/>
			<p class="text_banner font_zerogirl" :ref="refBhBanner.refsString[1]" v-else>{{tmpBhBanner[2].selected}}</p>
		</div>
		<div :ref="refBhBanner.parentsDivsString[2]" class="div_banner">
			<img :src="tmpBhBanner[3].selected" :width="bhBannerOptions[3].widthHTML"  :ref="refBhBanner.refsString[2]" class="img_banner" v-if="!bhBannerOptions[3].modeText"/>
			<p class="text_banner" :ref="refBhBanner.refsString[2]" v-else>{{tmpBhBanner[3].selected}}</p>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Banner',
	props:['nameMain','options'],
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
		//datos pasados a otro objeto
		/*
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
		*/
				/*
				//texto seleccionado de cada uno de los 3 elementos
				bannerSelected1:null,
				bannerSelected2:null,
				bannerSelected3:null,
				*/
				
		/*	
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

				
			},
		*/
		//anulado, directo en created()
			// configuración de banner (se pueden modificar)
			//ran1:Math.floor(Math.random()*10000000)+1,
			//ran2:Math.floor(Math.random()*10000000)+1,
			//ran3:Math.floor(Math.random()*10000000)+1,
			bhBannerConf:{
				//strings por defecto
	//los divs y los ref deben ser dinámicos
	//podríamos llevarnos los datos que son aleatorios al objeto ref, pasados!!
				/*
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
				*/

//por revisarr
				//global modeText
				modeText:false,
				orientation:"horizontal",
				fontSizeDefault:"20px",
				//orientation:"horizontal",
		//configuración de cada una de las 5 animaciones
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

				//listOrder:null,
				//counter:0,
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
						scale:false,
						scaleRotate:false,
			//height,
					},
					type:null,
					fontSize:null,
					modeText:false,
					widthHTML:150,
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
						scale:false,
						scaleRotate:false,
					},
					type:null,
					fontSize:null,
					modeText:false,
					widthHTML:120,
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
						scale:false,
						scaleRotate:false,
					},
					type:null,
					fontSize:null,
					modeText:false,
					widthHTML:null,
				}
			},
		/*
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
		*/
			
			tmpBhBanner:{
				1:{
					type:null,
					selected:null,
					index:0,
					list:null,
				},
				2:{
					type:null,
					selected:null,
					index:0,
					list:null,
				},
				3:{
					type:null,
					selected:null,
					index:0,
					list:null,
				},
				/*
				selected1:null,
				selected2:null,
				selected3:null,
				index1:0,
				index2:0,
				index3:0,
				*/

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
			refBhBanner:{
				//ref de los div padres en un array, después se asignarán dinámicamente 
				/*
				parentsDivsString:[
					'div_banner1',
					'div_banner2',
					'div_banner3'
				],

				divParent:{
					1:null,
					2:null,
					3:null,
				},
				bannerRef:{
					1:null,
					2:null,
					3:null,	
				},
				*/
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

				//banner1Ref:null,
				//banner2Ref:null,
				//banner3Ref:null,	
				
			//interval, necesario para limpiarlo en el destroyed, podría estar ubicado
			//tb en el objeto tmpBhBanner
				interval:null,
			},
			//variable destinada a cambiar el nombre del objeto bhBannerConf
			//por si queremos varios banners en el mismo componente
			//name:null,
			//stringRefForInterval:null,
			//tt:null,
			//tmpHeight:null,

			/*
			mainBanner:{
				1:{modeText:false},
				2:{modeText:false},
				3:{modeText:false}
			},
			*/
			//objeto main que contiene los 4 objetos principales
			main:null,
			//mainString son strings generados aleatoriamente que permiten ser
			//referenciados mediante 4 propiedades:
			//confString,bannerString,refString, tmpString
			mainString:null,
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
			//interval:null,


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
	created(){
		//si se han asignado opciones pasamos los ref de los los divs y los elementos 
		//a strings aleatorios, tenemos que crearlos aquí, antes del mounted(), ya 
		//que son atributos ref de Vue en el template.
		if(this.options)
			/*
			this.bhBannerConf.parentsDivsString.forEach((nameDiv,index)=> {
				this.bhBannerConf.parentsDivsString[index]=(Math.floor(Math.random()*1000000)+1).toString();
			})
			*/
			//mejor for para asignar los 2 a la vez
			for(let i=0;i<this.refBhBanner.parentsDivsString.length;i++){
				this.refBhBanner.parentsDivsString[i]=(Math.floor(Math.random()*1000000)+1).toString();
				this.refBhBanner.refsString[i]=(Math.floor(Math.random()*1000000)+1).toString();
			}
		//}
		
		let main=this.setDataMain(this.options);

		



	//almacenamos string de refObject en this.stringRefForInterval necesario para 
	//llamar a interval desde destroyed()
		
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

		
		
	/*
		this[main.confString]=this.bhBannerConf;
		//asignamos el nuevo objeto refBhBanner
		this[main.refString]=this.refBhBanner;
		//asignamos el nuevo objeto bhBannerOptions
		this[main.bannerString]=this.bhBannerOptions;
		//asignamos el nuevo objeto tmpBhBanner
		this[main.tmpString]=this.tmpBhBanner;
		//interval
		this.stringRefForInterval=main.refString;
		this.main=main;
		//this.mainBanner=this[main.bannerString];
	*/	
		
		if(this.options){

			this.testOrientationAndNodes(this.options,this.main[main.confString],this.main[main.bannerString]);
			console.log("el confString: ",this.main[main.confString]);
			this.setOrderAnimations(this.options,this.main[main.confString]);
			this.setEffects(this.options,this.main[main.bannerString]);
		}
		console.log("este es: ",this.main[this.mainString.bannerString][1].modeText);
	},
	mounted(){		
//comprobar de otra forma si existe img o p
	/*
	let main;
		//si existe parámetro name se asigna el nuevo (sirve para + de 1 banner en el mismo lugar)
		//si existe main existe la posibilidad de un segundo banner por tanto pasamos
		//los datos de ref a un código aleatorio antes de pasarlo al objeto con otro nombre
	if(this.nameMain){
		console.log(this.bhBannerConf);
		main=this.nameMain;
	}
	else
		main="mainBanner";
			//this.name=this.bhBannerConf;
		//bhBannerConf String (object main)

	this[main]=this.bhBannerConf;
	*/

//Se crean strings aleatorios por si existe otro banner no se crucen los datos, si no 
//existe options asignamos los string por defecto en refBhBanner
		
		//si no se declara options en el padre this.options será undefined
		//if(this.options)
		/*
		let main=this.setDataMain(this.options);
		this.main=main;
		console.log("desde mounted el main: ",main)
		*/


	//almacenamos string de refObject en this.stringRefForInterval necesario para 
	//llamar a interval desde destroyed()
		
		//asignamos el nuevo objeto BhBannerconf
		//this.main=main;
/*
		this[main.confString]=this.bhBannerConf;
		//asignamos el nuevo objeto refBhBanner
		this[main.refString]=this.refBhBanner;
		//asignamos el nuevo objeto bhBannerOptions
		this[main.bannerString]=this.bhBannerOptions;
		//asignamos el nuevo objeto tmpBhBanner
		this[main.tmpString]=this.tmpBhBanner;
		//interval
		this.stringRefForInterval=main.refString;
	*/

//comprobar si es necesario asignar los 4 objetos con un nombre específico
//para el template, probablemente haya que pasar estos datos al created()
		//this.mainBanner=this[main.bannerString];
		/*
		console.log("mainBanner: ",this)
		if(this.options){

			this.testOrientationAndNodes(this.options,this[main.confString]);
			this.setOrderAnimations(this.options,this[main.confString]);
			this.setEffects(this.options,this[main.bannerString]);
		}
		*/
	//comprobando opciones de configuración en banner

	if(this.options){

		
		//comprobando y asignando orientation
	/*
		if(options.orientation)
			if(options.orientation !=="vertical" && options.orientation !=="horizontal"){
				console.log("Error options.orientation: Solamente puede ser horizontal o vertical");
				return;
			}
			//asignamos la orientación asignada en options
			this[confString].orientation=options.orientation
			if(this[confString])
	//probando por ahora solo con imágenes		
			//comprobando y asignando imágenes
			if(options.images  || options.texts)
				//comprobamos si existe array y si los elementos del array son string,
				//en lugar de filter usamos every (si devuelve true son strings)
				for(let i=0;i<options.images.length;i++){
					console.log("desde mounted(): ",options.images.[i])
					if(options.images[i] && options.images[i].length>0)
					//var result  = options.images[0].filter((pathImage) => {
					var result = options.images[i].every((pathImage) => {
						return typeof(pathImage)==="string";
					})
					if(result)
						this[confString].imagesBanner[i]=options.images[i];
				}
	*/	
//falta comprobar modeText true y asignar los textos igual que images

		//comprobando y asignando orden y configuración de animaciones
		//como el objeto bhBannerConf.order no es un array pasamos directamente 5 al for 
		//de las 5 animaciones,
	

		

		
	}

	



	//método antiguo, anterior a setType()
	/* 
		//asignamos los divs padres dinámicamente mediante $refs.
		let divBanners=[];
		this.refBhBanner.parentsDivsString.forEach((div)=> {
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
		//no confundir propiedad del objeto main con los 3 otros objetos, mirar
		//los corchetes del método setRefs:
		//main.refObject -> otro objeto
		//main.tmpObject -> otro objeto
		//main.optionsObject -> otro objeto
	//console.log("refString: ",this.main[refString])
		this.setRefs(this.main[this.mainString.refString],this.main[this.mainString.confString],this.main[this.mainString.tmpString],this.main[this.mainString.bannerString]);
		
		//Establece si el elemento es de tipo img o text
		//this.setType(this.refBhBanner.parentsDivsString);
		//this.setType2(this.refBhBanner.divParent);
	//setListByType() permite generar la lista de imágenes o textos (que van cambiando)
	//de cada uno de los elementos y asigna el texto o imagen inicial de cada uno de 
	//ellos.

		//this.setListByType(this.banner,this.tmpBhBanner);
		//if(this.refBhBanner){
			//console.log("después de setRefs: ",this.tmpBhBanner)
			//return;
		//}
		//console.log("nombre de bhBannerConf: ",this['bann'])
	//Establece las referencias de cada elemento (3) que puede ser de tipo <img> o <p>
		//this.setRef(this.refBhBanner);
		
	//Comprueba la configuración de cada uno y si es necesario se asignan estilos 
	//iniciales. (para evitar errores en las transiciones la primera vez)
		//this.testTransBanner(this.refBhBanner);
		
		//asignando el texto inicial o imagen inicial de cada uno de los elementos.

		/*
		this.bannerSelected1=this.text_banner.text1[this.bannerIndex1];
		this.bannerSelected2=this.text_banner.text2[this.bannerIndex2];
		this.bannerSelected3=this.text_banner.text3[this.bannerIndex3];
		*/

		//console.log(this);
		//iniciar animación	

	//	this.interval_animationbanner(this[main.tmpString],this[main.confString],this[main.refString],this[main.bannerString]);
	this.interval_animationbanner(this.main[this.mainString.tmpString],this.main[this.mainString.confString],this.main[this.mainString.refString],this.main[this.mainString.bannerString]);
	},
	destroyed(){		
		//detenemos setInterval()
		if(this.nameMain){
			
			clearInterval(this.main[this.mainString.refString].interval);
		}
		else{			
			clearInterval(this.main[this.mainString.refString].interval);
		}
		
	},
	methods:{
		//comprueba y establece la propiedad asignada en options como true 
		//(sobreescribiendo) las opciones por defecto del objeto (original o duplicado)
		testAndSetEffect(option,effects){
			let effectsList=["width","height","positionLeft","positionTop","scaleRotate"];
			if(option.modeText)
				effectsList.push("fontSize");
			
			for(let i=0;i<effectsList.length;i++){
				//console.log(effectsList[i]);
				let effectSelected=this.setTransFromOptions(option[effectsList[i]]);
				

				if(effectSelected===false || effectSelected ===true)
					//si se ha asignado algún efecto, ya sea true o false, pasamos 
					//todos los efectos asignados por defecto a false
					effectsList.forEach((typeString) => {
						effects.trans[typeString]=false;
					})				
				//si aparece un
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
	
	//crear método que pase todas las trans a false del objeto banner siempre que entre 
	//en alguno de los true o false, revisar width de las imágenes y al encontrar el 
	//primer true detener y romper el resto de condicionales
			//width		
					//método setTransFromOptions realiza el mismo condicional que opacity
					
						//si devuelve booleano asignamos el nuevo valor 
			//para detectar si existe propiedad estamos comprobando si es true o false 
			//directamente pero existen varios métodos que podrian quizás,ser mejores o
			//utilizarlos para pasar todas la propiedades  de trans a false si existe alguna:
				//se podría utilizar hasOwnProperty("nombrede propiedad")  o
				//tb se podría con in ("nombre de propiedad" in objeto)	
		/*
						let resWidth=this.setTransFromOptions(options.effects[i].width)
						if(resWidth===true || resWidth===false){
							this.setTransToFalse(effects[i].trans);
							effects[i].trans.width=resWidth;
							//console.log("hay width: ",this[bannerString][i].trans);
						}
						let resHeight=this.setTransFromOptions(options.effects[i].height);					
						if(resHeight===true || resHeight===false){
							//this.setTransToFalse(this[bannerString][i].trans);
							effects[i].trans.height=resHeight;
							//console.log("hay height: ",this[bannerString][i].trans);
						}
				//if(resWidth===true)
				//	return;
						let resPositionLeft=this.setTransFromOptions(options.effects[i].
							positionLeft)
						if(resPositionLeft===true || resPositionLeft===false)
							effects[i].trans.positionLeft=resPositionLeft;
						let resPositionTop=this.setTransFromOptions(options.effects[i].
							positionTop)
						if(resPositionTop===true || resPositionTop === false)
							effects[i].trans.positionTop=resPositionTop;
						let resScale=this.setTransFromOptions(options.effects[i].
							scale)
						if(resScale===true || resScale===false)
							effects[i].trans.scale=resScale;
						let resScaleRotate=this.setTransFromOptions(options.effects[i].
							scaleRotate)
						//console.log("scaleRotate: ",resScaleRotate)
						if(resScaleRotate===true || resScaleRotate===false){
							effects[i].trans.scaleRotate=resScaleRotate;
						}
						

						
						//}else{
						//	console.log("el width es false");
						
		*/
					}
					//console.log("ASDFASDF: ",i);
				}
				//console.log("se acaba el for")
			}
		},
		setOrderAnimations(options,conf){
			//se podría asignar el largo con Object.keys() y así asignar los que se deseen
			if(options.order){
				for(let i=0;i<5;i++){
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
						conf.order[i]=options.order[i];
					}
				}				
			}
		},
		testOrientationAndNodes(options,conf,banner){
		//si la configuración incorpora orientation se asigna la nueva configuración
			if(options.orientation){
				//si no se ha asignado correctamente una de las 2 posibles opciones
			//se detiene la ejecución y mostramos mensaje por consola de browser
				if(options.orientation !=="vertical" && options.orientation !=="horizontal"){
					console.log("Error options.orientation: Solamente puede ser horizontal o vertical");
					return;
				}
				if(conf){
					//asignamos la orientación asignada en options
					conf.orientation=options.orientation	
				}
			}
				
				
			
	//comprobando y asignando imágenes o textos
			if(options.images.length>0  || options.texts.length>0){
				
				if(options.effects){
					let opConf=options.effects;
					
					//loop para propiedades de tipo entero (1|2|3)
					for(let i=1;i<4;i++){
						//si el modeText es true se revisan textos
						if(opConf[i]){
							//textos
							if(opConf[i].modeText){
								banner[i].modeText=true;
							console.log("wowo options.text: ",options.texts[i] )							
								if(options.texts && options.texts[i-1].length>0){
									
									let testArray=this.testStringArray(options.texts[i-1]);
									if(!testArray){
										console.log("options.texts debe ser un array de tipo cadena");
									}
									console.log("desde options.text: ",testArray);
									conf.textsBanner[i-1]=options.texts[i-1];
								}else{
									console.log("el modo texto está activado pero no se han asignado los textos")
								}
							//imágenes
							}else{

								if(options.images[i-1].length>0){

									let testArray=this.testStringArray(options.images[i-1]);
									
									if(!testArray){
										console.log("options.texts debe ser un array de tipo cadena");
									}
									console.log("desde options.images",testArray)
									conf.imagesBanner[i-1]=options.images[i-1];
								}
							}
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

		//establecemos objetos 4 con (casi) todos los datos, excepto 3 variables 
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
			bannerTrans.scale=false;
			bannerTrans.scaleRotate=false;
		},
		//devuelve boolean para asignar las opciones a
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
		setRefs(refObject,main,tmp,banner){			
			for(let i=0;i<refObject.parentsDivsString.length;i++){
				//establecemos referencias de div padres y elementos con los strings
				//del objeto bhBannerConf o aleatorio automáticamente si se detectan
				//datos de un objeto options en el padre
				
				refObject.divParentRef[i+1]=this.$refs[refObject.parentsDivsString[i]];

				refObject.nodeRef[i+1]=this.$refs[refObject.refsString[i]];
				//establecemos mediante el div padre el tipo (imagen o texto)
				//y establecemos la lista de imágenes o textos de cada uno de los
				//elementos

				this.setTypeAndList(refObject.divParentRef[i+1],i+1,tmp,main);
				
				//asignamos texto inicial o imagen inicial
				//this.tmpBhBanner[(i+1)].selected=this.tmpBhBanner[(i+1)].list[this.tmpBhBanner[(i+1)].index];
				tmp[(i+1)].selected=tmp[(i+1)].list[tmp[(i+1)].index];
				
				//establecemos estilos iniciales en caso de ser necesario (según 
				//la opción de transición seleccionada)
				this.initStylesFirstTime(refObject.nodeRef[i+1],banner[i+1],main);
				
				//establecemos width o height con px para que se quede fijo y no se 
				//pueda agrandar o encoger el banner al cambiar de elemento
				this.setSizeByOrientation(refObject.divParentRef[i+1],this.bhBannerConf.orientation);
				
			}
			//console.log("empieza el setRefs");			
			//console.log(this.refBhBanner.nodeRef)
		},
	/*
		setRef(ref){
			//ref.banner1Ref=this.$refs.refBanner1;
			ref.bannerRef[1]=this.$refs.refBanner1;
			ref.bannerRef[2]=this.$refs.refBanner2;
			ref.bannerRef[3]=this.$refs.refBanner3;
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
					this.tmpBhBanner[i+1].type="img";
					//asignamos el estilo display inline-flex si es imagen
					//divBanners[i].style.display="inline-block";
				}
				else if(divBanners[i].getElementsByTagName('p').length==1 &&
						divBanners[i].getElementsByTagName('img').length==0)
					this.tmpBhBanner[i+1].type="text";
				else{
					console.log("Se requiere un elemento <p> o <img> (solo uno)",divBanners[i]);
					return;
				}

			}
		},
	*/
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
	/*
		setType2(divParent){
			for(let i=0;i<divParent.length;i++){
				if(divParent[i+1].getElementsByTagName('img').length==1 &&
					divParent[i+1].getElementsByTagName('p').length==0){
					this.tmpBhBanner[i+1].type="img";
					//asignamos el estilo display inline-flex si es imagen
					//divBanners[i].style.display="inline-block";
				}
				else if(divParent[i+1].getElementsByTagName('p').length==1 &&
						divParent[i+1].getElementsByTagName('img').length==0)
					this.tmpBhBanner[i+1].type="text";
				else{
					console.log("Se requiere un elemento <p> o <img> (solo uno)",divParent[i+1]);
					return;
				}
			}
			console.log("desde setType2: ",this.refBhBanner.divParent)

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
			let listProps=Object.keys(tmpbanner);
			//debemos restar las 2 últimas propiedades del array para que las ignore
			//(listOrder y counter)

			for(let i=0;i<(listProps.length-2);i++){
				if(tmpbanner[listProps[i]].type=="img"){					
					tmpbanner[i+1].list=this.bhBannerConf.imagesBanner[i];	
				}else if(tmpbanner[listProps[i]].type=="text"){
					tmpbanner[i+1].list=this.bhBannerConf.textsBanner[i];
				}
				//asignamos el texto o imagen inicial de cada uno de los elementos
				tmpbanner[(i+1)].selected=tmpbanner[(i+1)].list[tmpbanner[(i+1)].index];
			}

			if(this.tmpBhBanner){
				console.log(this.tmpBhBanner);
				//return;
			}
	*/
			
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
	/*
		},
	*/

	/*
		//asignando estilos para preparar elementos para evitar errores en la primera transición 
		//comprobando transición de banners para asignar estilos iniciales
		testTransBanner(ref){
			this.initStylesFirstTime(ref.bannerRef[1],this.banner[1]);
			//this.initStylesFirstTime(ref.banner1Ref,this.banner[1]);
			this.initStylesFirstTime(ref.bannerRef[2],this.banner[2]);
			this.initStylesFirstTime(ref.bannerRef[3],this.banner[3]);
		},
	*/
		initStylesFirstTime(bannerRef,bannerConf,main){
			//console.log("bannerRef: ",bannerRef);
			if(bannerConf.trans.positionLeft)
				//asignamos 0px para que tome efectos la transición la primera vez
				bannerRef.style.left="0px";
			//al ser un elemento de texto (<p>) usamos font-size en lugar de width
			else if(bannerConf.trans.width){
				if(bannerRef.width)
					//console.log("height: ",bannerRef.parentNode.clientHeight);
					//bannerRef.style.height=bannerRef.parentNode.clientHeight+"px";
					
					bannerRef.style.width=bannerRef.width+'px';
				else

					bannerRef.style.width="100%";
			//si el bannerRef tiene asignado algún font-size  ya sea en HTML o en
			//CSS se asigna ese, si por alguna razón o error no encuentra ningún 
			//font-size se asigna uno establecido por defecto
				let fontSizeCSS=window.getComputedStyle(bannerRef,null).getPropertyValue("font-size");					
					//si existen estilos en HTML o JavaScript se asignan esos
				if(bannerRef.style.fontSize){
					bannerConf.fontSize=bannerRef.style.fontSize;					
					//this.text_banner.fontSizeInitial=bannerRef.style.fontSize;	
				//si el bannerRef no tiene ningún estilo font-size asignado se
				//establece uno por defecto
					//si existen estilos en CSS se asignan esos
				}else if(fontSizeCSS){
					bannerConf.fontSize=parseFloat(fontSizeCSS)+"px";
					//si no existen estilos font-size se asigna el establecido
					//en fontSizeDefault
				}else{
					bannerConf.fontSize=main.fontSizeDefault;
					//this.bhBannerConf.fontSize=this.text_banner.fontSizeDefault;
				}
			}
			else if(bannerConf.trans.height){					
				console.log("BANNERREF: ",this.tmpBhBanner[1].selected);
				//let newImage=new Image();
				//newImage.src=this.tmpBhBanner[1].selected;
//calcular el alto para efecto height pero debe ser cada vez 
				//console.log(bannerRef.clientWidth)
				//console.log(newImage.height)

				//bannerRef.style.height=bannerRef.parentNode.clientHeight+"px";
			}
			//asignamos 0px para que tome efectos la transición la primera vez
			else if(bannerConf.trans.positionTop)
				bannerRef.style.top="0px";
		},

		interval_animationbanner(tmp,main,ref,bannerConf){
			
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
	//asignamos los divs padres(que contienen cada elemento)
				/*
				let divBanner1=this.$refs.div_banner1,
					divBanner2=this.$refs.div_banner2,
					divBanner3=this.$refs.div_banner3;
				*/

				
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
			//(cambiado) pendiente comprobar si se puede asignar esta medida fuera del interval, ya que solo
			//recoge el ancho o alto del elemento (texto o imagen) inicial.
		/*
			console.log("entrando en clientWidth o clientHeight");
				if(this.bhBannerConf.orientation=="horizontal"){
					divBanner1.style.width=divBanner1.clientWidth+"px";
					divBanner2.style.width=divBanner2.clientWidth+"px";
					divBanner3.style.width=divBanner3.clientWidth+"px";
				//con height	
				}else if(this.bhBannerConf.orientation=="vertical"){
					console.log("clientHieght: ",divBanner1.clientHeight+"px");
					//divBanner1.style.height=divBanner1.clientHeight+"px";
					//divBanner2.style.height=divBanner2.clientHeight+"px";
					//divBanner3.style.height=divBanner3.clientHeight+"px";	
					//console.log("clientHeight: ",this.refBhBanner.parentsDivsString['div_banner1'].style.clientHeight+"px");
				}
				
				else 
					console.log("no hay orientación asignada");
		*/


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
//sustituir por objeto ref 
			ref.interval=setInterval(()=>{
				//si el counter ha llegado a la última animación reseteamos para que
				//comience otra vez por la primera
				if(tmp.counter==tmp.listOrder.length)	{
					tmp.counter=0;
				}
				//Obtenemos propiedad de bhBannerConf.order que coincida con counter
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
				//console.log("lista: ",list);				
				if(!matchElement){					
					return;
				}
				
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
					this.hideAnimation(list,tmp,bannerConf,ref);
				},time)

				setTimeout(()=> {
					//final de animación (opacity,top,rotate...)
					this.showAnimation(list,tmp,bannerConf,ref);
				},time2)

				//aumentamos counter
				//this.bhBannerConf.counter++;
				tmp.counter++;
				
			},4000)

			
		},
		//ocultamos con alguna de las animaciones el elemento actual
			//list es el array actual de configuración (de los 5 posibles)
		hideAnimation(list,tmp,bannerConf,ref){

		//animaciones
				if(list.indexOf(1)!=-1){
					this.initAnimation('1','hide',tmp,bannerConf,ref);
					/*
					if(this.banner[1].opacity)
					this.refBhBanner.banner1Ref.style.opacity="0";
					if(this.banner[1].trans.width)					
						this.refBhBanner.banner1Ref.style.width="0";
					else if(this.banner[1].trans.positionTop)
						//comprobar medida de altura y sustituir
						this.refBhBanner.banner1Ref.style.top="-150px";
					else if(this.banner[1].trans.positionLeft)
						//comprobar medida de anchura y sustituir				
						this.refBhBanner.banner1Ref.style.left="-300px";
					else if(this.banner[1].trans.scale)
						this.refBhBanner.banner1Ref.style.transform="scale(0)";
					else if(this.banner[1].trans.scaleRotate)
						this.refBhBanner.banner1Ref.style.transform="scale(0) rotate(360deg)";
					*/
				}
				
				if(list.indexOf(2)!=-1){
					this.initAnimation('2','hide',tmp,bannerConf,ref);
				}
				if(list.indexOf(3)!=-1){
					this.initAnimation('3','hide',tmp,bannerConf,ref);
				}
				
				
				
			
		},
		initAnimation(num,type,tmp,bannerConf,ref){
			//console.log("desde initAnimation: ",number);
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
					if(tmp[num].index==0)
						tmp[num].index=1;
					//si ha llegado al último reseteamos al primero
					else if(list.length==tmp[num].index)
						tmp[num].index=0;
				//seleccionamos el siguiente de la lista y sumamos uno al index
					tmp[num].selected=list[tmp[num].index];
					tmp[num].index=tmp[num].index+1;

				}
			}

			/*
			if(number==1){
				//objeto de banner que contiene las opciones(animaciones activadas)
				banner=this.banner[1];
				//elemento banner (<p> o <img>) 
				bannerRef=this.refBhBanner.banner1Ref;				
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
			*/
		/*
			if(number==2){				
				banner=this.banner[2];				
				bannerRef=this.refBhBanner.banner2Ref;				
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
				bannerRef=this.refBhBanner.banner3Ref;				
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
		*/

		//ocultar
			if(type=="hide"){
			//aunque se puede hacer con width, con height más complicado si no
			//se tiene asignado el height, lo pasamos a transform:scale(1,0) y scale(0,1)
				//al ser un elemento <p> no es posible con width, es
				//necesario fontSize
				if(banner.trans.width){
					//antiguo
					////if(banner.type=="img")
					//if(banner.modeText!==true)
						//bannerRef.style.transform="scale(0,1)";
					//else					
						bannerRef.style.fontSize="0px";
				}
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
				if(banner.opacity)
					bannerRef.style.opacity="1";
				
				//opciones width,positionleft,positionTop,
				//para un elemento <p> pasamos de width a fontSize
				//bannerRef.style.width="100%";

				if(banner.trans.width){
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
						console.log("nada");
						//bannerRef.style.fontSize=this.text_banner.fontSizeInitial;
						bannerRef.style.fontSize=banner.fontSize;
					//bannerRef.style.width="100%";
				}
				else if(banner.trans.height){
					/*
					console.log("desde show: ",bannerRef.clientWidth)
					console.log(tmp[num].selected)
					let ima=new Image();
					ima.onload=function(){
						console.log("con onload: ",ima.height)
					}					
					console.log(ima.height)
					let newHeight=parseInt((bannerRef.clientWidth*ima.height)/ima.width);
					console.log("height: ",newHeight)
					console.log(ima.height)
					//bannerRef.style.height="100%";
					bannerRef.style.height=newHeight+"px";
					*/
					bannerRef.style.transform="scale(1)";
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
			//list es el array actual de configuración (de los 5 posibles)			
		showAnimation(list,tmp,bannerConf,ref){
			if(list.indexOf(1)!=-1){
				this.initAnimation('1','show',tmp,bannerConf,ref);
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
				this.initAnimation('2','show',tmp,bannerConf,ref);
			}
			if(list.indexOf(3)!=-1){
				this.initAnimation('3','show',tmp,bannerConf,ref);
			}
			
			
		//},100)
			
		},
	}
}
</script>
<style>
@import '../assets/css/bh_banner.css';
</style>