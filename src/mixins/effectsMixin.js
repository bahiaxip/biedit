export default {
	//métodos para efectos con vista previa desde client-side
	methods: {
		//rotación con transform de todo el div e intercambiando el width por el 
		//height del div si la rotación es lateral, para que no se solape
		rotate(side){
			let d=this.$refs.image_effect.style;
			let d2=this.$refs.div_effect_image.style;
			//desactivamos color de botón activo en rotate
			//this.desactiveBtnByType('rotate');
			this.testGButton1();

			//desactivar rotate (devolver a estado inicial)
			if(side==0){
				d2.transform="rotate(0deg)";
				//establecemos ancho y alto al div padre
				d2.width=this.imaEffect.width+"px";
				d2.height=this.imaEffect.height+"px";
				//devolvemos el margin anterior
				d.margin="auto";				
				this.$refs.canvas.style.margin='auto';
				//se actualiza el identificador de rotate
				this.rotateActivated=false;
				return;
			}
			if(side=="left" || side=="right"){
				if(side=="left"){					
					if(d2.transform=="rotate(270deg)"){
						d2.transform="rotate(0deg)";
						//establecemos ancho y alto al div padre
						d2.width=this.imaEffect.width+"px";
						d2.height=this.imaEffect.height+"px";
						//devolvemos el margin anterior
						d.margin="auto";				
						this.$refs.canvas.style.margin='auto';

					}else{
						//desactivamos color de botón activo en rotate
						this.btnActive.rotateLeft=true;
						d2.transform="rotate(270deg)";
						//establecemos ancho y alto inverso al div padre
						d2.width=this.imaEffect.height+"px";
						d2.height=this.imaEffect.width+"px";
						
						//obtenemos el margin de cada lado para centrar el canvas
						let newMargin=this.getMarginToCenter(this.imaEffect.width,this.imaEffect.height);						
						d.margin=newMargin+"px auto";
						this.$refs.canvas.style.margin=newMargin+'px auto';
					}
				}else if(side=="right"){
					if(d2.transform=="rotate(90deg)"){						
						d2.transform="rotate(0deg)";
						//devolvemos el ancho y alto del div padre
						d2.width=this.imaEffect.width+"px";
						d2.height=this.imaEffect.height+"px";
						d.margin="auto";
						//devolvemos el margin anterior						
						this.$refs.canvas.style.margin='auto';
					}else{
						this.btnActive.rotateRight=true;
						d2.transform="rotate(90deg)";
						//establecemos ancho y alto inverso al div padre
						d2.width=this.imaEffect.height+"px";
						d2.height=this.imaEffect.width+"px";						
						//obtenemos el margin de cada lado para centrar el canvas
						let newMargin=this.getMarginToCenter(this.imaEffect.width,this.imaEffect.height);
						d.margin=newMargin+"px auto";				
						this.$refs.canvas.style.margin=newMargin+'px auto';
					}						
				}
			}else{
				if(d2.transform=="rotate(180deg)" || side==null){					
					d2.transform="rotate(0deg)"
				}else{
					this.btnActive.rotateBottom=true;
					d2.transform="rotate(180deg)";
				}	
				//devolvemos margin y dimensiones anteriores
				d.margin="auto";
				d2.width=this.imaEffect.width+"px";
				d2.height=this.imaEffect.height+"px";
				this.$refs.canvas.style.margin='auto';
			}
			//activamos/desactivamos rotate, no es necesario comprobar null pk si es 
			//null es que aun no se ha activado el identificador de rotate
			if(d2.transform=="rotate(0deg)"){				
				this.rotateActivated=false
				this.rotateSide=null;
			}else{
				this.rotateActivated=true;
				this.rotateSide=side;
			}			
		},

		//crea un efecto de textura 
		//oculta el image y genera un background con la imagen, el range 0,
		//está destinado a la cancelación y vuelve al estado anterior(original).
		texturize(range){
			let imaStyle=this.$refs.image_effect.style;			
			if(range==0 || range==1){				
				imaStyle.backgroundSize="100%";
				imaStyle.backgroundRepeat="no-repeat";
				this.rangeTexturize=1;
			}else{
				//asignamos las medidas de la repetición en función del rango que se 
				//pasa como parámetro
				let width=this.imaEffect.width/range;				
				let height=this.getNewHeight(width,this.imaEffect.width,this.imaEffect.height);
				
					imaStyle.width=this.imaEffect.width+"px";
					imaStyle.height=this.imaEffect.height+"px";
				
				imaStyle.backgroundSize=width+"px "+height+"px";
				
				imaStyle.backgroundRepeat="repeat";				
			}
			(imaStyle.backgroundRepeat!="no-repeat") ? 
				this.texturizeActivated=true:this.texturizeActivated=false;			
		},

		//asignamos el filtro solo en pantalla
		filter(prop){			
			//asignamos la existencia de una activación de filtro
			this.filterActivated=true;
			let ima=this.$refs.image_effect;
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
			//asignamos el color del botón siguiendo filterActivated
			this.btnActive.filter=this.filterActivated;
		},

		drawPolygon(sides)
		{
			if(this.polygonActivated)
				//elimina el dibujo canvas, por si existía uno anteriormente
				this.deleteDrawCanvas();
			this.polygonActivated=true;
			this.btnActive.polygon=this.polygonActivated;
			this.polygonProp=sides;
			var ratio;
			//definimos el ratio en función del ancho o el alto más corto
			if(this.imaEffect){
				if(this.imaEffect.width<=this.imaEffect.height)
				{
					ratio =this.imaEffect.width/2;
				}
				else
				{
					ratio=this.imaEffect.height/2;
				}	
			}
			
			var canvas = document.getElementById("canvas");

			if(canvas && canvas.getContext){
				var ctx= canvas.getContext("2d");
				if(ctx){					
					//relleno
					ctx.fillStyle = "rgba(0,0,0,.1)";					
					//borde
					ctx.strokeStyle="rgba(0,0,0)";
					ctx.lineWidth=3;
					
					var X= 0;					
					var Y= 0;
					var R= ratio;
					//el número de lados del polígono
					var L=sides;
					//en caso de circumferencia usamos el método arc(x,y,ratio,0,2*Math.PI,false)            
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
					}
					else
					{						
						let rad=(2*Math.PI)/L;					
						ctx.translate(canvas.width/2,canvas.height/2);						
						if(L==4)							
							ctx.rotate(Math.PI/2);
						else
							ctx.rotate(3*Math.PI/2);
						//dibuja el trazado
						ctx.beginPath();
						for(let i=0;i<L;i++)
						{
							const x=X+R*Math.cos(rad*i);
							const y=Y+R*Math.sin(rad*i);
							ctx.lineTo(x,y);							
						}
					}

				ctx.closePath();
				ctx.fill();
				ctx.stroke();
				}
			}
			else
			{
				console.log("Not support canvas");return;
			}
		},

		//resetea un dibujo en canvas y desactiva el identificador polygon
		deleteDrawCanvas(){
			//pasamos a null polygonProp
			this.polygonProp=null;
			var canvas = document.getElementById("canvas");
			var ctx= canvas.getContext("2d");
			ctx.beginPath();
			canvas.width=this.imaEffect.width;
			this.polygonActivated=false;			
		},

		//reflejo horizontal y vertical de la imagen
		reflex(type){
			//para evitar errores si el efecto rotación está activado se deshace
			if(this.rotateActivated){
				this.undoTask("rotate");
				this.desactiveBtnByType('rotate');				
			}
			//revisamos el color de los botones  
			this.testGButton1();			

			let d=this.$refs.div_effect_image.style;
			if(!type){
				d.transform="scaleX(1)";
				d.transform="scaleY(1)";
				this.reflexActivated=false;
			}
			if(type=="vertical"){
				if(d.transform=="scaleY(-1)"){
					d.transform="scaleY(1)"
				}else{
					this.btnActive.reflexVertical=true;
					d.transform="scaleY(-1)";
				}
					
				d.width=this.imaEffect.width+"px";
				d.height=this.imaEffect.height+"px";
			}else if(type=="horizontal"){
				if(d.transform=="scaleX(-1)"){
					d.transform="scaleX(1)";					
				}else{
					this.btnActive.reflexHorizontal=true;
					d.transform="scaleX(-1)";
				}

			}
			//actualizamos el identificador de reflex
			if(d.transform=="scaleX(-1)" || d.transform=="scaleY(-1)"){
				this.reflexActivated=true;
				this.typeReflex=type;
			}else{
				this.reflexActivated=false;
				this.typeReflex=null;
			}
		},

		//método que devuelve el margin de cada lado para centrar un elemento dentro de 
		//un div
		getMarginToCenter(totalSize,sizeToCenter){
			return (parseInt(totalSize)-sizeToCenter)/2;
		},
	}
}