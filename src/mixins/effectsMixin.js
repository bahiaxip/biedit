export default {

	//métodos para efectos con vista previa desde client-side
	methods: {

		
		//rotación con transform de todo el div e intercambiando el width por el 
		//height del div si la rotación es lateral, para que no se solape
		rotate(side){
			//this.testBtn();

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
						//console.log(newMargin);
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
			//let imaStyle2=this.$refs.div_effect_image.style;
				//imaStyle.width=this.imaEffect.width+"px";
				//imaStyle.height=this.imaEffect.height+"px";
			if(range==0 || range==1){				
				imaStyle.backgroundSize="100%";
				imaStyle.backgroundRepeat="no-repeat";
				this.rangeTexturize=1;
			}else{
				//asignamos las medidas de la repetición en función del rango que se 
				//pasa como parámetro
				let width=this.imaEffect.width/range;				
				let height=this.getNewHeight(width,this.imaEffect.width,this.imaEffect.height);
				//console.log("imaEffectwidth: ",this.imaEffect.width);
				//console.log("imaEffectheight: ",this.imaEffect.height);
		//anulado
		/*
				//si el efecto de rotación está activado y no es la rotación vertical, 
				//es decir, está volcado para uno de los lados, se invierte el ancho x 
				//el alto en el div padre y se establece un margin al div hijo
				if(this.rotateActivated && imaStyle2.transform!="rotate(180deg)"){
					imaStyle2.width=this.imaEffect.height+"px";
					imaStyle2.height=this.imaEffect.width+"px";
					imaStyle.width=this.imaEffect.width+"px";
					imaStyle.height=this.imaEffect.height+"px";
					//imaStyle.width=this.imaEffect.height+"px";
					let newMargin=this.getMarginToCenter(this.imaEffect.width,this.imaEffect.height);

					imaStyle.margin=newMargin+"px auto";
					
				}else{
					//
				}
				//imaStyle2.width=this.imaEffect.width+"px";
				//imaStyle2.height=this.imaEffect.width+"px";
				//imaStyle.width=this.imaEffect.width+"px";
				//imaStyle.height=this.imaEffect.height+"px";
				//imaStyle.width=this.imaEffect.height+"px";
				//let newMargin=this.getMarginToCenter(this.imaEffect.width,this.imaEffect.height);
		*/
				//heightBackground=this.getNewHeight(this.imaEffect.width,)
					imaStyle.width=this.imaEffect.width+"px";
					imaStyle.height=this.imaEffect.height+"px";
				//imaStyle.margin="auto";
				imaStyle.backgroundSize=width+"px "+height+"px";
				//imaStyle.backgroundImage="url(http://localhost/biedit_backend/api/get-image/"+this.ima.src+")";
				imaStyle.backgroundRepeat="repeat";
				//this.$refs.image.style.opacity="0";	
				//imaStyle.display="block";
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
			//console.log("drawPolygon: ",this.polygonActivated);
			
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
						//console.log("llega aui");				
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
							//console.log(x+"->"+y);
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
			//cambiamos this.ima.width por el 
			//canvas.width=this.ima.width; 
			canvas.width=this.imaEffect.width;
			this.polygonActivated=false;
			//tb se puede usar el método clearrect pero no funciona en este caso
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

		//prueba redondeo esquinas, sin acabar
		/*
		roundCorners(){
			let canvas=this.$refs.canvas;

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
					//ratio
					var r=10;
					//coordenadas del rectángulo
					let x0=50, y0=50,
						x1=200,y1=50,
						x2=200,y2=150,
						x3=50,y3=150;
					ctx.beginPath();
					ctx.moveTo(x3,y3-r);
					ctx.arcTo(x0,y0,x1,y1,r);
					ctx.arcTo(x1,y1,x2,y2,r);
					ctx.arcTo(x2,y2,x3,y3,r);
					ctx.arcTo(x3,y3,x0,y0,r);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
				}
			}
		},
		*/
	}
}