<template>
	<div class="box-panel effect" id="box-panel" :style="{width:ima.widthCut+'px',height:ima.heightCut+'px','margin-top':ima.boxPanelMargin}" >

			<div ref="squarePanel"  class="square-panel" id="square-panel" @mousedown="activeMove($event)"   @touchstart="activeMove($event)" @touchend="inactiveMove($event)">
			<div class="box-square" style="" id="box-square-main">
				<img class="box-img" :src="url+'get-image/'+ima.src" draggable="false" :style="{'max-width':ima.widthCut+'px'}" id="box-img-main">
			</div>
			<Square :box="box" :square="square"></Square>

		</div>
	</div>
</template>

<script>
import Square from './Square.vue';
import Global from '../Global.js';
export default {
	name:"BoxPanel",
	components:{Square},
	props:['ima'],
	mounted(){
		this.box = document.querySelector("#box-panel");
		this.square=document.querySelector(".square-panel");		
		//No necesaria al tener un dialog que no permite una imagen menos de 
		//100 de ancho o 100 de alto
		//this.testMin(this.square);
		this.square.style.left="0px";
		this.square.style.top="0px";	
	},
	//se activa al cambiar a otro componente
	destroyed(){		
		//Necesario para evitar opción de evento desde la plantilla para corregir una 
		//característica del movimiento, más info en el addListener		
		window.removeEventListener("mouseup",this.inactiveMove);
		window.removeEventListener("touchend",this.inactiveMove);
	},
	data(){
		return{
			url:Global.url,
			box:null,
			square:null,
			widthSquare: null,
			heightSquare: null,
			moveActive:false,
			parent:null,
			xInitial:null,
			yInitial:null,
		}
	},
//revisar si existen decimales en las pruebas por si falta algún parseInt(), al modificar el ancho
//desde los estilos de un 30% a 33% no realizaba la suma, era necesario convertir el width de entrada a entero.
	methods:{
		//No necesaria al tener un dialod que no permite una imagen menos de 100 de ancho o 100 de alto
		
		/*
		testMin(square){
			//si es la minima anchura se 
			if(this.ima.widthCut==Global.minWidthHeight){
				console.log("llega al mínimo")
				square.style.width="100px";
				square.style.height="100px";
				document.querySelector("#box-img-main").width=Global.minWidthHeight;
			}
			
		},
		*/
		//movimiento Cuadrante
		activeMove(e){
			let square=this.square			
			if(this.square!==e.target)
				return;			
			if(e.touches){
				this.xInitial=e.touches[0].clientX-square.getBoundingClientRect().left;
				this.yInitial=e.touches[0].clientY-square.getBoundingClientRect().top;
				//para detener el scroll con el evento touch (móbiles, tablets,...) es necesario 
				//preventDefault() y la propiedad passive:false en el EventListener
				window.addEventListener("touchmove",this.move,{passive:false});
			}else{
				this.xInitial=e.clientX-square.getBoundingClientRect().left;
				this.yInitial=e.clientY-square.getBoundingClientRect().top;
				window.addEventListener("mousemove",this.move);
			}
		},
		inactiveMove(e){			
			if(e && e.touches){
				window.removeEventListener("touchmove",this.move);
			}else{				
				window.removeEventListener("mousemove",this.move);					
			}
		},
//el clip, clipWidth, clipHeight son pruebas (anuladas) para sustituir el top y left por el clip de CSS:
//rect([Inicio_top]px,[ancho]px,[alto]px,[Inicio_left]px)
		move(e){
			//para detener el scroll con el evento touch (móbiles, tablets,...) es necesario 
			//preventDefault() y la propiedad passive:false en el EventListener
			e.preventDefault();			
			let square=this.square;				
			if(square){
				let movementX;
				let movementY;
				if(e.touches){
					movementX = e.touches[0].clientX - (this.xInitial + square.getBoundingClientRect().left);
					movementY = e.touches[0].clientY - (this.yInitial + square.getBoundingClientRect().top);
				}else{
					movementX = e.clientX - (this.xInitial + square.getBoundingClientRect().left);
					movementY = e.clientY - (this.yInitial + square.getBoundingClientRect().top);	
				}

				const boxBounding = this.box.getBoundingClientRect();
				const squareBounding = this.square.getBoundingClientRect();

				const newPositionX = parseInt(this.square.style.left)+movementX;
				const newSpace = squareBounding.left+movementX;

				const matchLeft = newSpace >= boxBounding.left;
				const matchRight = newSpace <= (boxBounding.right-squareBounding.width);				
				let boxImg = document.querySelector(".box-img");
				if(matchLeft && matchRight){
					this.square.style.left = newPositionX+"px"
					//clip					
					boxImg.style.left=-newPositionX+"px";
				}
				else if(!matchLeft){					
					square.style.left=newPositionX-(newSpace-boxBounding.left)+"px";
					//clip
					let newPositiontmp=newPositionX-(newSpace-boxBounding.left);
					boxImg.style.left=-newPositiontmp+"px";
				}
				else if(!matchRight){
					square.style.left = newPositionX - (newSpace-boxBounding.right + squareBounding.width)+"px";

					let newPositiontmp = newPositionX - (newSpace-boxBounding.right+squareBounding.width);					
					boxImg.style.left = -newPositiontmp+"px";
				}
				const newPositionY=parseInt(square.style.top)+movementY;

				const newSpaceY = squareBounding.top + movementY;
				const matchTop = newSpaceY >= boxBounding.top;
				const matchBottom = newSpaceY <= (boxBounding.bottom - squareBounding.height);				
				if(matchTop && matchBottom){
					square.style.top=newPositionY+"px";					
					boxImg.style.top=-newPositionY+"px";
				}
				else if(!matchTop){
					square.style.top = newPositionY - (newSpaceY - boxBounding.top)+"px";
					//clip
					let newPositiontmp = newPositionY-(newSpaceY - boxBounding.top);
					boxImg.style.top=-newPositiontmp+"px";
				}else if(!matchBottom){
					square.style.top = newPositionY - (newSpaceY - boxBounding.bottom + squareBounding.height)+"px";
					//clip
					let newPositiontmp = newPositionY - (newSpaceY - boxBounding.bottom + squareBounding.height);					
					boxImg.style.top=-newPositiontmp+"px";
				}
			}
			//realizar el window.addEventListener aquí o en la plantilla con mouseup,
			//pero en la plantilla, al salirse de la caja con el cuadrado pulsado,
			//el cuadrado se mantiene pulsado aun cuando no se pulsa y al volver
			//al cuadrado se mantiene el movimiento 
			window.addEventListener("mouseup",this.inactiveMove);
			window.addEventListener("touchend",this.inactiveMove);
			//}
		}
		//fin movimiento Cuadrante
		//redimensión del cuadrante
	}
}
</script>
