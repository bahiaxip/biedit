<template>
	<div>
		<div id="handle" class="handle" ><div class="handle_imgLeft" @mousedown="handlers($event,'left')" @touchstart="handlers($event,'left')"></div></div>
		<div id="handle2" class="handle"><div class="handle_imgRight" @mousedown="handlers($event,'right')" @touchstart="handlers($event,'right')" ></div></div>
		<div id="handle3" class="handle"><div class="handle_imgTop" @mousedown="handlers($event,'top')" @touchstart="handlers($event,'top')"></div></div>
		<div id="handle4" class="handle"><div class="handle_imgBottom" @mousedown="handlers($event,'bottom')"  @touchstart="handlers($event,'bottom')"></div></div>
	</div>
</template>

<script>
export default {
	name: 'Square',
	props:['box','square'],
	mounted(){
		let handles=document.querySelectorAll(".handle");			
			let positions=["left","right","top","bottom"];
			//contador para asignar los elementos del positions en el for 
			let p=0;
			for(let h of handles){
				//asignamos la propiedad position al elemento
				h.position=positions[p];
				//asignamos el mismo string del array positions como propiedad de un objeto handle
				//en lugar de añadirlos a un array handle con push()
				//this.handle.push(h);
				// para asignar un string como propiedad al objeto: se encierra entre corchetes
				this.handle[positions[p]]=h;
				this.resize(h);
				p++;
		}		
	},
	destroyed(){		
		window.removeEventListener("mouseup",this.inactiveMove2);
		window.removeEventListener("touchend",this.inactiveMove2);
	},
	data(){
		return {
			moveActive:false,
			//handle:[ ],
			handle:{},
			position:null,
			xInit:null,
			yInit:null,			
			prop:null,			
		}
	},
	methods:{
		resize(element){
			element.className+=" "+element.position;
		},		
		handlers(e,position){
			this.position=position;
			if(e.touches){
				this.xInit = e.touches[0].clientX;
				this.yInit = e.touches[0].clientY;
				//initLeft y initRight es la pequeña diferencia que existe entre el 
				//botón pulsado (left o right) y el punto del eje exacto 
				//del lado del cuadrado(left o right), como el botón tiene 
				//20 puede ser entre 0 y 20
				this.initLeft = e.touches[0].clientX-this.square.getBoundingClientRect().left;
				this.initRight = e.touches[0].clientX-this.square.getBoundingClientRect().right;
				this.initTop = e.touches[0].clientY-this.square.getBoundingClientRect().top;
				this.initBottom = e.touches[0].clientY-this.square.getBoundingClientRect().bottom;
			}else{
				this.xInit = e.clientX;
				this.yInit = e.clientY;
				this.initLeft = e.clientX-this.square.getBoundingClientRect().left;
				this.initRight = e.clientX-this.square.getBoundingClientRect().right;			
				this.initTop = e.clientY-this.square.getBoundingClientRect().top;
				this.initBottom = e.clientY-this.square.getBoundingClientRect().bottom;
			}

			this.prop=this.handleCSS(this.square);
			this.w=this.prop[0];
			this.h=this.prop[1];
			
			if(e.touches){
				window.addEventListener("touchmove",this.move2,{passive:false});
			}else{
				window.addEventListener("mousemove",this.move2);	
			}
			
		},
		//inactive event
		inactiveMove2(e){			
			if(e && e.touches){
				window.removeEventListener("touchmove",this.move2);	
			}else{
				window.removeEventListener("mousemove",this.move2);
			}
		},
		//event mov
		move2(e){
			e.preventDefault();
				let movementX,movementX2;
				if(e.touches){
					movementX=e.touches[0].clientX-(this.initLeft+this.square.getBoundingClientRect().left);
					movementX2= e.touches[0].clientX-this.xInit;
					
				}else{
					movementX=e.clientX-(this.initLeft+this.square.getBoundingClientRect().left);
					
					movementX2= e.clientX-this.xInit;					
				}
				
				const boxBounding = this.box.getBoundingClientRect();
				const squareBounding = this.square.getBoundingClientRect();
				
				let boxImg=document.querySelector(".box-img");
				if(this.position=="left"){
					//newPosition es el punto del eje x izquierdo + movimiento de 1 en 1
					const newPosition = parseInt(this.square.style.left)+movementX;
					const newSpace = squareBounding.left + movementX;
					const matchLeft = newSpace >= boxBounding.left;

					//con CSS min-width y min-height asignamos un mínimo al 
					//ancho y al alto, pero en el lado izquierdo y arriba, 
					//al llegar a ese mínimo desplaza el cuadrado hacia el 
					//lado derecho o hacia abajo, corregir					
						if(matchLeft){
							//this.w es el ancho al pulsar y se mantiene el mismo hasta que se deja de pulsar
							this.square.style.width=parseInt(this.w)-movementX2+"px";
							this.square.style.left = newPosition+"px";
							//clip						
							boxImg.style.left = -newPosition+"px";
						}else{						
							this.square.style.left=newPosition-(newSpace-boxBounding.left)+"px";
							this.square.style.width=parseInt(this.w)-movementX2+(newSpace-boxBounding.left)+"px";
							//clip
							let newPositiontmp = newPosition - (newSpace-boxBounding.left);							
							boxImg.style.left = - newPositiontmp+"px";
						}
				}
				if(this.position=="right"){
					//movimiento de 1 en 1
					let movementX3;
					if(e.touches){						
						movementX3 = e.touches[0].clientX-(this.initRight+this.square.getBoundingClientRect().right);					
					}else{
						movementX3 = e.clientX-(this.initRight+this.square.getBoundingClientRect().right);
					}

					const newSpace = squareBounding.right + movementX3;
					const matchRight = newSpace <= boxBounding.right;
					
		//creamos una variable para no repetir lo mismo, revisar los otros bucles para hacer lo mismo		

					let m = parseInt(this.w)+movementX2;
					if(matchRight){
						this.square.style.width=parseInt(this.w)+movementX2+"px";
					}else{
						this.square.style.width=m-(newSpace-boxBounding.right)+"px";
					}
				}
				let movementY,movementY2;
				if(e.touches){
					movementY = e.touches[0].clientY- (this.initTop+this.square.getBoundingClientRect().top);
					movementY2 = e.touches[0].clientY - this.yInit;
				}else{
					movementY = e.clientY- (this.initTop+this.square.getBoundingClientRect().top);
					movementY2 = e.clientY - this.yInit;
				}

				if(this.position=="top"){
					const newPosition = parseInt(this.square.style.top)+movementY;
					const newSpace = squareBounding.top + movementY;
					const matchTop = newSpace >= boxBounding.top;
				
					if(matchTop){
						this.square.style.top = newPosition+"px";
						this.square.style.height = parseInt(this.h)-movementY2+"px";
						//clip						
						boxImg.style.top = -newPosition+"px";
					}else{
						this.square.style.top = newPosition-(newSpace-boxBounding.top)+"px";
						this.square.style.height = parseInt(this.h)-movementY2+(newSpace-boxBounding.top)+"px";

						//clip
						let newPositiontmp = newPosition - (newSpace-boxBounding.top);
						boxImg.style.top = -newPositiontmp+"px";				
					}
				}
					let movementY3;
				if(e.touches){
					movementY3 = e.touches[0].clientY-(this.initBottom+this.square.getBoundingClientRect().bottom);
				}else{
					movementY3 = e.clientY-(this.initBottom+this.square.getBoundingClientRect().bottom);
				}

				if(this.position=="bottom"){
					const newSpace = squareBounding.bottom+movementY3;
					const matchBottom = newSpace <= boxBounding.bottom;				
					let h = parseInt(this.h)+movementY2;
					
					if(matchBottom){
						this.square.style.height = parseInt(this.h)+movementY2+"px";
					}else{
						this.square.style.height = h-(newSpace-boxBounding.bottom)+"px";
					}
				}
				if(e.touches){
					window.addEventListener("touchend",this.inactiveMove2);
				}else{
					window.addEventListener("mouseup",this.inactiveMove2);	
				}
		},
		handleCSS(elemento){
			var prop=[];
			if(document.defaultView && document.defaultView.getComputedStyle){   
			var a=["width","height","top","left","margin-top","margin-left","margin-right","right","border-right-width","border-left-width","border-top-width","border-bottom-width"];
				for(var i in a){    
					prop[i]=parseInt(document.defaultView.getComputedStyle(elemento,null).getPropertyValue(a[i]));
				}
				return prop;
			}
			else{
				//falta currentStyle para IE
				alert("Error document.defaultView (handleCSS method)");
			}
		}
	}
}
</script>