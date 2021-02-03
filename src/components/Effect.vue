<template>
	<div >		
		<div class="back-effect-panel" :style="{'padding-top':'10px'}" v-if="ima.width!=null && !displayLoading" >
			<div style="margin:auto;text-align:center" >	
				<md-menu class="" md-align-trigger>
					<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger title="Filtros">
						<md-icon class="">adjust</md-icon>
					</md-button>
					<md-menu-content class="menu_filter" :style="{'max-height':ima.height+'px'}">
						<md-menu-item @click="filter('none')" title="Desactivar filtro">
							<md-icon class="">clear</md-icon>						
						</md-menu-item>

						<md-menu-item @click="confirmChange('filter')" title="Aplicar filtro" v-if="filterActivated" >
							<md-icon class="">check</md-icon>
						</md-menu-item>

						<md-menu-item @click="filter('grayscale')" class="byn" title="Blanco y negro">
							<md-icon class="">filter_b_and_w</md-icon>	
						</md-menu-item>

						<md-menu-item @click="filter('sepia')" class="sepia" title="Sepia">
							<md-icon class="">filter_b_and_w</md-icon>					
						</md-menu-item>

						<md-menu-item @click="filter('brightness')" title="Brillo">
							<md-icon class="">brightness_5</md-icon>	
						</md-menu-item>

						<md-menu-item @click="filter('contrast')" title="Contraste">
							<md-icon class="">brightness_6</md-icon>					
						</md-menu-item>
						
					</md-menu-content>
				</md-menu>
				<md-menu class=" " md-align-trigger style="margin-left:40px">
					<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger title="Formas">
						<md-icon class="">exposure</md-icon>
					</md-button>
					<md-menu-content class="menu_filter" :style="{'max-height':ima.height+'px'}">					
						<md-menu-item title="Desactivar forma" @click="deleteDrawCanvas()">
							<md-icon>clear</md-icon>	
						</md-menu-item>
						<md-menu-item @click="confirmChange('shapes')" title="Aplicar recorte"  v-if="polygonActivated">
							<md-icon>check</md-icon>	
						</md-menu-item>
						<md-menu-item title="Cuadrado" @click="poligono(polygon.square)">
							<md-icon style="transform:rotate(45deg)" md-src="img/shapes/square.svg"></md-icon>	
						</md-menu-item>
						<md-menu-item title="Círculo" @click="poligono(polygon.circle)">
							<md-icon md-src="img/shapes/circle.svg"></md-icon>
						</md-menu-item>
						<md-menu-item title="Triángulo" @click="poligono(polygon.triangle)">
							<md-icon md-src="img/shapes/triangle.svg"></md-icon>
						</md-menu-item>
						<md-menu-item title="Estrella" @click="poligono(polygon.star)">
							<md-icon>star</md-icon>
						</md-menu-item>
						<md-menu-item title="Pentágono" @click="poligono(polygon.penta)">
							<md-icon md-src="img/shapes/pentagon.svg"></md-icon>
						</md-menu-item>
						<md-menu-item title="Hexágono" @click="poligono(polygon.hexa)">
							<md-icon md-src="img/shapes/hexagon.svg"></md-icon>	
						</md-menu-item>
						<md-menu-item title="Heptágono" @click="poligono(polygon.hepta)">
							<md-icon md-src="img/shapes/heptagon.svg"></md-icon>	
						</md-menu-item>
						<md-menu-item title="Octágono" @click="poligono(polygon.octa)">
							<md-icon md-src="img/shapes/octagon.svg"></md-icon>	
						</md-menu-item>
						<!--
						<md-menu-item>
							<md-icon md-src="shapes/nonagon.png"></md-icon>	
						</md-menu-item>
					-->
						<md-menu-item title="Nonágono" @click="poligono(polygon.nona)">
							<md-icon>
								<img src="img/shapes/nonagon.png">
							</md-icon>
						</md-menu-item>
						
					</md-menu-content>
				</md-menu>
				<md-menu class="" md-align-trigger style="margin-left:40px">
					<md-button class="md-icon-button  md-raised md-accent"  md-menu-trigger>
						<md-icon class="">adjust</md-icon>
					</md-button>
					<md-menu-content class="menu_filter" :style="{'max-height':ima.height+'px'}">
					<!--
						<md-menu-item>
							<md-icon></md-icon>
						</md-menu-item>
						<md-menu-item>
							<md-icon>Vignete</md-icon>
						</md-menu-item>
						<md-menu-item>Horizontal</md-menu-item>
						<md-menu-item>Viñeta</md-menu-item>
						<md-menu-item>Remolino</md-menu-item>
						<md-menu-item>Oleo</md-menu-item>
						<md-menu-item>Redondear</md-menu-item>
						<md-menu-item>Onda</md-menu-item>
					-->
						<md-menu-item title="Polaroid" @click="setEffect('polaroid')">
							<md-icon md-src="img/effect/polaroid.svg"></md-icon>	
						</md-menu-item>
						<md-menu-item title="Reflejo Vertical" @click="setEffect('vertical')">
							<md-icon md-src="img/effect/vertical.svg"></md-icon>
						</md-menu-item>
						<md-menu-item title="Reflejo Horizontal" @click="setEffect('horizontal')">
							<md-icon>swap_horiz</md-icon>
						</md-menu-item>
						<md-menu-item title="Viñeta" @click="setEffect('vignette')">
							<md-icon>vignette</md-icon>
						</md-menu-item>
						<md-menu-item title="Remolino" @click="setEffect('remolino')">
							<md-icon>toys</md-icon>	
						</md-menu-item>
						<md-menu-item title="Onda" @click="setEffect('onda')">
							<md-icon>waves</md-icon>	
						</md-menu-item>
						<md-menu-item title="Oleo" @click="setEffect('oleo')">
							<md-icon>toys</md-icon>	
						</md-menu-item>
						<md-menu-item title="Redondear" @click="setEffect('esquinas')">
							<md-icon>supervised_user_circle</md-icon>	
						</md-menu-item>
						<md-menu-item title="Gaussiano" @click="setEffect('gaussiano')">
							<md-icon >grain</md-icon>	
						</md-menu-item>

						<!--
						<md-menu-item>
							<md-icon md-src="shapes/nonagon.png"></md-icon>	
						</md-menu-item>
					-->
						<md-menu-item>
							<md-icon>
								<img src="shapes/nonagon.png">
							</md-icon>
						</md-menu-item>
						
					</md-menu-content>
				</md-menu>	
				<!--<div style="margin:auto;text-align:center" >-->
				</div>	
					
					
					<!--
					<md-button class="md-icon-button floatL md-raised md-accent" @click="filtro('image','sepia')">
						<md-icon class="sepia">exposure</md-icon>
					</md-button>
					<md-button class="md-icon-button floatR md-raised md-accent" @click="filtro('image','brillo')">
						<md-icon class="brillo">brightness_5</md-icon>
					</md-button>
					<md-button class="md-icon-button floatR md-raised md-accent" @click="filtro('image','contraste')">
						<md-icon class="contraste">brightness_6</md-icon>
					</md-button>
				-->			
					<!--<md-menu md-align-trigger>
						<md-button md-menu-trigger class="md-raised md-accent">
							Efectos
						</md-button>
						<md-menu-content class="list-effects">
							<md-menu-item>Polaroid</md-menu-item>
							<md-menu-item>Vertical</md-menu-item>
							<md-menu-item>Horizontal</md-menu-item>
							<md-menu-item>Viñeta</md-menu-item>
							<md-menu-item>Remolino</md-menu-item>
							<md-menu-item>Oleo</md-menu-item>
							<md-menu-item>Redondear</md-menu-item>
							<md-menu-item>Onda</md-menu-item>
						</md-menu-content>
					</md-menu>-->



					<!--
					<md-switch class="colorB" v-model="resizeSwitch" title="Mostrar interfaz">
					</md-switch>
					-->
					
				<!--</div>
				<div style="margin:auto;text-align:center" v-if="resizeSwitch">
					
				</div>-->
				<transition name="fade">
				<div id="div-main" class="div-main no-selectable" :style="{width:ima.width+'px',height:ima.height+'px'}" ref="divmain" v-if="imgTrans">
					<div class="main-panel">
						<canvas id="canvas" class="no-selectable" :width="ima.width" :height="ima.height" ></canvas>

						<img :src="ima.name" id="image" class="main-img no-selectable" :width="ima.width" :height="ima.height" :class="{'main-img-resize':resizeSwitch}" ref="image"/>						
					</div>
				</div>
				</transition>
			
				<md-dialog-confirm class="confirmEffect"
				:md-active.sync="dialogConfirmActive"
				:md-title = "dialog_selected"
				md-confirm-text="OK"
				md-cancel-text="Cancelar"
				@md-cancel="cancelChange"
				@md-confirm="setChange" />
	<!--
				<md-dialog-alert class="confirmDialog"
				:md-active.sync="dialogErrorActive"
				md-title = "Ocurrió un error"
				:md-content = "msgeDialogAlert"
				md-confirm-text="OK" />

				<md-dialog-alert class="confirmDialog"
				:md-active.sync="dialogSuccessActive"
				md-title = "Creado correctamente"
				:md-content = "msgeDialogAlert"
				md-confirm-text="OK" />
			-->
				
			</div>
		<md-dialog :md-active.sync="dialogImage" class="effect_dialog" >
			<img :src="url+'get-image/'+tmpImage.random_name" v-if="tmpImage" :width="ima.width" :height="ima.height"/>
			<!-- colocar una transición o un interruptor para aparezca un poquito
				después que la imagen -->
			<div style="position:absolute;top:50%;left:50%;margin:auto;background-color:white;padding:20px;transform:translate(-50%,-50%)" v-if="tmpImage">
				<p>¿Cargar la nueva imagen?</p>
				<md-button style="" class="md-raised md-accent" @click="setTmpImage()">
					OK
				</md-button>
				<md-button @click="cancelLoadImage()">
					Cancelar
				</md-button>				
			</div>
			
			<div v-else style="text-align:center;"><!--aquí el md-spinner-->
				<md-progress-spinner class="md-accent" :md-diameter="100" md-mode="indeterminate" ></md-progress-spinner >
			</div>
			
		</md-dialog>
	</div>
</template>
<script>
import methodsMixin from '../mixins/methodsMixin';
import Global from '../Global.js';
import axios from 'axios';
export default {
	name:'Effect',
	props:['ima'],
	mixins:[methodsMixin],
	data(){
		return{
			url:Global.url,
			image:null,
			resizeSwitch:false,
			imgTrans:false,
			dialogConfirmActive:false,
			dialog_title:{
				filter:"¿Aplicar el filtro seleccionado?",
				shapes:"¿Aplicar el recorte con la forma seleccionada?",
			},
			dialog_selected:null,
			type:null,			
			minWidthHeight:Global.minWidthHeight,			
			filterActivated:false,
			filterProp:null,			
			polygonActivated:false,
			polygon:{
				square:4,
				circle:0,
				triangle:3,
				star:14,
				penta:5,
				hexa:6,
				hepta:7,
				octa:8,
				nona:9
			},
			polygonProp:null,
			effectActivated:false,
			effectProp:null,
			dialogImage:false,
			tmpImage:null,
			displayLoading:false,

		}
	},
	mounted(){
		if(this.ima){
			console.log("llega this.ima");
		}

		//error al establecer width, height y problemas con
		if(this.ima && this.ima.width){
			console.log("llega this.ima y this.ima.width");	
			console.log("mounted: ",this.ima);
			this.imgTrans=true;
			let sizes=this.setSizeToMainPanel(this.ima.widthInitial,this.ima.heightInitial,this.minWidthHeight,this.ima.widthDefault);
			this.ima.width=sizes.width;
			this.ima.height=sizes.height;
			console.log(this.ima.widthDefault);
			console.log(sizes);	
		}
		
	},
	destroyed(){
		//detectamos si existe un filtro seleccionado antes de salir
		if(this.filterActivated){
			alert("Desea descartar el filtro seleccionado?");
		}
		
	},
	methods:{
		cancelLoadImage(){
			//pasamos a null para que se muestre el spinner
			this.tmpImage=null;
			this.dialogImage=false;
		},
		confirmChange(type_effect){
			//Activamos el modal de confirmación de filtro
			
			if(type_effect=='filter'){				
				this.dialog_selected=this.dialog_title.filter;
			}
			else if(type_effect=='shapes'){
				this.dialog_selected=this.dialog_title.shapes;	
			}
			this.dialogConfirmActive=true;
			//asignando datos para setChange()
			this.type=type_effect;
			
			
			console.log("Confirmando...");
		},
		//método al dar OK en la confirmación de un filtro, o recorte de forma
		setChange(){
			if(this.type=="filter"){
				this.setFilter();
			}else if(this.type=="shapes"){
				this.setPolygon()
			}
			console.log("estableciendo cambios en imagen");
			//this.type=null;
			//this.filterProp=null;
		},
		cancelChange(){
			console.log("cancelado");
			this.filter('none');
		},
		//asignamos el filtro solo en pantalla
		filter(prop){
			//asignamos la existencia de una activación de filtro
			this.filterActivated=true;
			console.log("llega afiltro");
			//let ima=document.getElementById('image');
			let ima=this.$refs.image;
			this.filterProp=prop;    
			switch (prop){
				case "grayscale":
					ima.style.filter="grayscale(100%)";					
				break;
				case "sepia":
					ima.style.filter="sepia(150%)";
				break;
				case "brightness":
					ima.style.filter="brightness(150%)";
				break;
				case "contrast":
					ima.style.filter="contrast(150%)";
				break;
				case "none":
					ima.style.filter=prop;
					this.filterActivated=false;
				break;
				default:
					ima.style.filter='none';
					this.filterActivated=false;
			}
		},
		setFilter(){
			console.log("llega a setFilter");
			if(sessionStorage.getItem("biedit_apitoken")){
				let api_token=sessionStorage.getItem("biedit_apitoken");
				let email=sessionStorage.getItem("biedit_email");
				let headers={
					headers:{
						Authorization:'Bearer '+api_token
					}
				}
				let data={
					name:this.ima.src,
					filter:this.filterProp,
					email:email
				};
				console.log(this.filterProp);				
				//desactivamos el filtro de la imagen creado con JavaScript
				this.filter();
				//let d = JSON.stringify(data);
				//solicitar confirmación de ajuste
				axios.post(this.url+'filter',data,headers).then(res=>{
					if(res.data.image){
						this.dialogImage=true;
						this.tmpImage=res.data.image;
						console.log(this.tmpImage);
					}else{
						console.log("hubo un error");
					}
					
				})
			}			
		},
		//Al establecer una nueva imagen arpovechamos el método de recargar la imagen 
		//desde el padre con reloadImage() creado para el componente Collections.
		//Para el filtro no sería necesario, ya que las medidas no cambian
		setTmpImage(){
			//Recordar, el ima.src o image.src es solo el nombre aleatorio y la 
			//extensión, mientras que el ima.name o image.name es la imagen en base64 
			//o la ruta completa redirigiendo a la api ("http://.../get-image/nombrealeatorio.extensión")
			console.log("image desde effect: ",this.tmpImage);			
			this.dialogImage=false;
			this.imgTrans=false;
			//this.$emit("reload",dato);
			//pasamos un callback para que cuando recargue los datos de la imagen 
			//vuelva a crear la transición (aunque no se aprecia en local)
			this.$emit("reload",this.tmpImage,()=>{

					this.imgTrans=true;
					//pasamos a null para que se muestre el spinner
					this.tmpImage=null;
			});
		},
		//función poligono dibuja un canvas en forma de polígono
		poligono(sides)
		{  
			if(this.polygonActivated==true){
				//elimina el dibujo canvas, por si existía uno anteriormente
				this.deleteDrawCanvas();
				console.log("llega a deleteDrawCanvas");			
			}else{
				this.polygonActivated=true;
			}
			this.polygonProp=sides;

			
			//elimina el atributo que se haya podido asignar, por si se ha seleccionado uno
			//anteriormente
			//deleteDataPolygon("menu3");

			//var id=data;
			//id.setAttribute("data-polygon",sides);
			//var foto=document.getElementById("foto");
			//deleteDataPolygon("menu3");
			var radio;
			//definimos el radio en función del ancho o el alto más corto
			if(this.ima){
				if(this.ima.width<=this.ima.height)
				{
					radio =this.ima.width/2;
				}
				else
				{
					radio=this.ima.height/2;
				}	
			}
			
			var canvas = document.getElementById("canvas");

			if(canvas && canvas.getContext){
				var ctx= canvas.getContext("2d");
				if(ctx){
					//ctx.fillStyle = "#6ab150";
					//relleno
					ctx.fillStyle = "rgba(0,0,0,.1)";
					//ctx.strokeStyle="black";
					//borde
					ctx.strokeStyle="rgba(0,0,0)";
					ctx.lineWidth=3;

					//var X= canvas.width/2;
					var X= 0;
					//var Y= canvas.height/2;
					var Y= 0;
					var R= radio;
					//el número de lados del polígono
					var L=sides;

					//en caso de circumferencia usamos el método arc(x,y,radio,0,2*Math.PI,false)            
					if(L==0)
					{                
						ctx.translate(canvas.width/2,canvas.height/2);
						ctx.rotate(3*Math.PI/2);
						ctx.beginPath();
						ctx.arc(X,Y,R,0,2*Math.PI,false);
					}
					//en caso de estrella 
					else if(L==14)
					{
						ctx.fillStyle = "rgba(0,0,0,0.1)";
						//en este caso seleccionamos el paso 3 y el lado 7 ya que coincide con el lado 14 al
						//hacer el recorte con PHP
						var paso =3;

						var estrella=7/paso;
						let rad=(2*Math.PI)/estrella;
						ctx.translate(canvas.width/2,canvas.height/2);
						ctx.rotate(3*Math.PI/2);
						ctx.beginPath();
						for(var i=0;i<7;i++)
						{
							const x=X+R*Math.cos(rad*i);
							const y=Y+R*Math.sin(rad*i);
							ctx.lineTo(x,y);
						}
						console.log("estrella");
					}
					else
					{
						//si L==6 el ángulo es de 2PI/6 o sea 60º
						//let rad=(2*Math.PI)/L;
						let rad=(2*Math.PI)/L;
						//parte opcional (rotación del polígono)
						//traslada el contexto en el centro del canvas
						//para poder girar el contexto alrededor del centro
						//ctx.translate(canvas.width/2,canvas.height/2);
						ctx.translate(canvas.width/2,canvas.height/2);
						//ctx.translate(canvas.height/2,canvas.width/2);
						//gira el contexto unos 270deg
						console.log("llega aui");				
						if(L==4)
							//si no se asigna nada o se asigna lo siguiente 		
							//crea un cuadrado invertido
							ctx.rotate(Math.PI/2);

							//cuadrado centrado
							//ctx.rotate(Math.PI/4);
							//ctx.rotate(135*Math.PI/180);
							//ctx.rotate(45*Math.PI/180)

							//igual que cuadrado centrado
							//ctx.rotate(3*Math.PI/4);
						else
							ctx.rotate(3*Math.PI/2);
							//triángulo al revés
							//ctx.rotate(2*Math.PI/4);

						//dibuja el trazado
						ctx.beginPath();
						for(let i=0;i<L;i++)
						{
							const x=X+R*Math.cos(rad*i);
							const y=Y+R*Math.sin(rad*i);
							ctx.lineTo(x,y);
							console.log(x+"->"+y);
						}
					}

				ctx.closePath();
				ctx.fill();
				ctx.stroke();
				}
			}
			else
			{
				console.log("No soporta canvas");return;
			}
		},
		//almacenar imagen con la forma geométrica seleccionada
		setPolygon(){
			console.log("llega a setPolygon");
			if(sessionStorage.getItem("biedit_apitoken")){
				let api_token=sessionStorage.getItem("biedit_apitoken");
				let email=sessionStorage.getItem("biedit_email");
				let headers={
					headers:{
						Authorization:'Bearer '+api_token
					}
				}
				let data={
					name:this.ima.src,
					polygon:this.polygonProp,
					email:email
				};
				console.log("lados: ",this.polygonProp);
				//desactivamos el polígono mostrado en el canvas creado con JavaScript
				this.deleteDrawCanvas();				
				this.dialogImage=true;
				console.log("tmpImage: ",this.tmpImage);
				axios.post(this.url+'polygon',data,headers).then(res=>{
					
					if(res.data.image){
						
						this.tmpImage=res.data.image;
						console.log("tmpImage2: ",this.tmpImage);
						//console.log(this.tmpImage);
						console.log("dialog_image",res.data.image);
					}else{
						//console.log(res.data.data);
						console.log("hubo un error");
					}
					
				})
			}
		},
		//elimina un dibujo en canvas
		deleteDrawCanvas(){
			//pasamos a null polygonProp
			this.polygonProp=null;
			var canvas = document.getElementById("canvas");
			var ctx= canvas.getContext("2d");
			ctx.beginPath();
			canvas.width=this.ima.width; 
			//tb se puede usar el método clearrect pero no funciona en este caso
		},

		setEffect(type_effect){			
			if(sessionStorage){
				if(sessionStorage.getItem("biedit_apitoken")){
					let api_token=sessionStorage.getItem("biedit_apitoken");
					let email=sessionStorage.getItem("biedit_email");
					let headers={
						headers:{
							Authorization:'Bearer '+api_token
						}
					};
					let data={
						name:this.ima.src,
						effect:type_effect,
						email:email
					};
					axios.post(this.url+'effect',data,headers).then(res=>{
						if(res.data.image){
							this.dialogImage=true;
							this.tmpImage=res.data.image;
							//console.log(this.tmpImage);
							console.log(res.data.image);
						}else{
							//console.log(res.data.data);
							console.log("hubo un error");
						}
					});
					//console.log(email);		
				}
			}

			
		}
	}
}
</script>
<style>

.list-effects .md-list{
	background-color:darkblue;	
}
.list-effects .md-list-item-content{
	color:orange;
	text-transform:uppercase;
	cursor:pointer;
}
.list-effects .md-list-item-content:hover{
	color:yellow;

}

.menu_filter {
	box-shadow:none;
	min-width:50px;
	/*max-height:none;*/
}
.menu_filter .md-menu-content {
	margin:auto !important;
	text-align:center !important;
}
.menu_filter .md-list{
	
	/*background:rgba(0,0,0,.2) ;*/
	cursor:pointer;
	/*border-radius:30px;*/
}
.menu_filter .md-list-item .md-icon {	
	margin:auto ;
}
.menu_effect .md-list-item .md-icon {
	margin:auto !important;
	text-align:center !important;
}
.byn .md-icon{
	color:#000 !important;
}
.sepia .md-icon{
	color:#9e5b40 !important;
}

/*spinner*/
.md-progress-spinner{

}

.md-dialog.effect_dialog{
	background-color:rgba(0,0,0,.5);


	/*z-index:5;*/
}

.md-dialog.effect_dialog>:first-child {
	background:transparent !important;
	box-shadow:none;
}

</style>