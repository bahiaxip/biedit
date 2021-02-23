export default {
	methods:{
		getWidthAccordingWindow(){
			//test device to set maxWidthDefault
			//obtenemos un ancho máximo tomando como referencia el ancho del dispositivo y
			//restándole una cantidad que permita mostrarse correctamente,  mediante el 
			//método getWidthDefault().
			
			let width;
			if(window.innerWidth){
				width =this.setWidthDefault(window.innerWidth);
			}else{			
				width =this.setWidthDefault(document.body.clientWidth);
			}
			return width;		
		},
		//devuelve un valor algo menor, según unos posibles rangos de resoluciones de pantalla.
		setWidthDefault(width){
			let size;
			if(width>1630){
				size=1280;
			}else if(width<1630 && width>=1500){
				size=1200;
			}else if(width<1500 && width>=1280){
				size=1000;				
			}else if(width<1280 && width>=1024){
				size=800;
			}else if(width<1080 && width>=768){
				size=600;
			}else if(width<768 && width>=640){ 
				//a partir de esta medida es necesario reducir tb el widthDefault
				size=500;
			}else if(width<640 && width>=430){
				size=300;
			}else if(width<430){
				size=300;
			}else{
				
				size=width-350;
			}
			return size;
		},
		//se obtiene el ancho y el alto de una imagen (mateniendo las proporciones)
		//estableciendo un ancho máximo y un alto máximo.		
		//método destinado al panel de recorte, 
		getMaxResize(width,height,maxWidth,maxHeight){
			//console.log("desde resizeUploadedImg: ",image);
			//se calcula el ratio del ancho y alto respecto a los máximos asignados
			let xRatio = maxWidth/width,
				yRatio = maxHeight/height,
				finalWidth = null,
				finalHeight = null;
			//Si el ancho y el alto de la imagen original no superan los máximos 
			//establecidos, el ancho final y el alto final son los originales
            if(width<=maxWidth && height<=maxHeight){
				finalWidth = width;
				finalHeight = height;
			//si el ratio del ancho máximo establecido multiplicado por la altura 
			//original es menor al alto máximo establecido:
			//se asigna el ancho máximo y se calcula el alto correspondiente
            }else if((xRatio * height) < maxHeight){
			//se puede procesar con Math.round()
				finalHeight = Math.ceil(xRatio * height);
				finalWidth = maxWidth;
			//si no es ninguna de las anteriores: se asigna el alto máximo y se 
			//calcula el ancho correspondiente
            }else{
				finalWidth = Math.ceil(yRatio*width);
				finalHeight = maxHeight;
            }
            return {width:finalWidth,height:finalHeight};
            
		},
		//ḿétodo que obtiene el alto de una imagen (mateniendo las proporciones)
		//estableciendo un nuevo ancho. Devuelve un array con el ancho y el alto.	
		getNewHeight(newWidth,width,height){			
			let newHeight = Math.round((newWidth*height)/width);
			console.log("desde getNewHeight: ", newHeight)
			return newHeight;			
		},
		getNewWidth(newHeight,width,height){
			let newWidth = Math.round((newHeight*width)/height);
			return newWidth;
		},
		//ḿétodo de validación de imagen al subir archivo
		validateImage(inputFile,size){
			if(!(/\.(jpg|png|gif|jpeg)$/i).test(inputFile.name)){
				alert("El archivo seleccionado no es una imagen válida");
				return false;
			}
			if(inputFile.size>size){
				alert("El archivo es demasiado grande");
				return false;
			}
		},
		//anulada y sustituida por getWidthMin(): 
		//si el alto es muy bajo el ancho es demasiado grande, solo establecer
		//mínimo el ancho independientemente del alto

		//comprueba si el ancho o el alto es menor al mínimo establecido (128)
		//si alguno es menor devuelve la propiedad width y height 
		//aumenta las dimensiones proporcionalmente si el ancho o el alto es 
			//menor al mínimo establecido	
	//anulada, en imágenes con un alto mucho menor que el ancho o viceversa, al redimensionar
	//genera un ancho o un alto enorme, difícil de manejar.
		/*
		getWidthHeightMin(width,height,min){
			let sizes;
			if(width<min || height<min){
				//si el ancho es menor se asigna el nuevo ancho y se obtiene el nuevo alto
				if(width<min){					
					let newHeight=this.getNewHeight(min,width,height);
				//si después de obtener las nuevas dimensiones el alto aun continúa //siendo menor al mínimo, eso indica que el alto siempre es menor
				//al ancho y, por tanto, se asigna el alto como mínimo y se obtiene 
				//el ancho
					if(newHeight<min){						
						let newWidth=this.getNewWidth(min,width,height);
						sizes={width:newWidth,height:min};
					}else{
						sizes={width:min,height:newHeight};
					}
				//si el ancho no es menor a mínimo es que es el alto el que es menor
				// y se obtiene directamente el ancho con el alto asignado como mínimo
				}else{					
					let newWidth=this.getNewWidth(min,width,height);
					sizes = {width:newWidth,height:min};
				}				
			return sizes;
			}
		},
		*/
		//obtiene el alto estableciendo un mínimo de ancho, devuelve un objeto
		getWidthMin(width,height,min){
			let sizes;
			if(width<min){
				sizes={width:min,height:this.getNewHeight(min,width,height)};
			}
			return sizes;
		},
		
	//devuelve width y height con las comprobaciones necesarias para mostrar en MainPanel
		setSizeToMainPanel(w,h,min,widthDefault){
			let sizes;
			sizes=this.getWidthMin(w,h,min);

		//si sizes es null es que ni el ancho ni el alto son menores a los mínimos
			if(!sizes){
				//console.log("ni el ancho ni el alto están por debajo de los mínimos, devuelve null");
		//si el ancho de la imagen es menor al ancho establecido (600)
		//por defecto se asignan las medidas originales
				if(w<widthDefault){
					sizes={
						width:w,
						height:h
					}

		//si el ancho de la imagen es igual o mayor al ancho 
		//establecido por defecto (600) se asigna el ancho por defecto y se obtiene el alto
				}else{
					sizes={
						width:widthDefault,
						height:this.getNewHeight(widthDefault,w,h)
					}
					console.log("desde setSizeToMainPanel: ",w);
				}
			}
			return sizes;
		},
		setSizeToCutPanel(w,h,min,maxW,maxH){
			let sizes;
			sizes=this.getWidthMin(w,h,min);
			if(!sizes){
				sizes=this.getMaxResize(w,h,maxW,maxH);
			}
			return sizes;
		},

		//obtiene una propiedad de un elemento mediante getComputedStyle()
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
		},
	}
}