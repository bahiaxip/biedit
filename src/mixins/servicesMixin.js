import axios from 'axios';
export default {

	methods: {
		//identifica si el usuario ha iniciado sesión y en caso afirmativo devuelve
		//las variables de sessionStorage
		testSession:()=>{
			//el mismo status error lo utilizamos para 2 errores: soporte sessionStorage
			//y no autenticado (se podría asignar un status 401 para no autenticado)
			if(!sessionStorage){
				return {
					status:"error",
					message:"El navegador no soporta sessionStorage"
				}
			}

			if(!sessionStorage.getItem("biedit_apitoken") || !sessionStorage.getItem("biedit_email") || !sessionStorage.getItem("biedit_name"))
				return {
					status:"error",
					message:"El usuario no está autenticado"					
				}
			
			return {
				status:"success",
				api_token:sessionStorage.getItem("biedit_apitoken"),
				email:sessionStorage.getItem("biedit_email"),
				name:sessionStorage.getItem("biedit_name"),
				message:"El usuario está autenticado correctamente"
			}
		},
		//comprueba si el mensaje del dialog es usuario no autenticado y en 
		//consecuencia se va a home
		testMessage(msge){
			if(msge=="El usuario no está autenticado")
				this.$router.push("/")
		},

//Effect Panel	
		//procesa solicitud al server de compresión de imagen
		setCompress(range){
			let session=this.testSession();
			if(!session){				
				return;
			}
			if(session.status=="error"){
				this.msgeDialogAlert=session.message;
				this.dialogErrorActive=true;
				return;
			}
			let api_token=session.api_token,
				email=session.email;				
			let data={
				range:range,
				email:email,
				image:this.ima.src
			}
			let headers={
				headers:{
					Authorization: 'Bearer '+api_token
				}
			}
			axios.post(this.url+'compress',data,headers).then((res)=> {
				console.log(res);
				if(res.data.image){
					this.dialogImage=true;						
					this.tmpImage=res.data.image;					
				}else{					
					console.log("hubo un error");
				}
			});
		},
		//método de reflejo de imagen (componente EffectPanel)
		setReflex(type){			
			let session=this.testSession();
			if(!session){				
				return;
			}
			if(session.status=="error"){
				this.msgeDialogAlert=session.message;
				this.dialogErrorActive=true;
				return;
			}
			let api_token=session.api_token,
				name=session.name,
				email=session.email;
			let data={
				data:{
					name:name,
					email:email,
					effect:type
				}
			}
			let headers={
				headers:{
					'Authorization': 'Bearer '+api_token
				}
			}
			axios.post("effect",data,headers).then(res=> {
				console.log(res);
			})

		},

		//procesa la solicitud de efecto filtro al server
		setFilter(name=null){
			return new Promise((resolve,reject)=> {				
				let session=this.testSession();
				if(!session){				
					return;
				}
				if(session.status=="error"){
					this.msgeDialogAlert=session.message;
					this.dialogErrorActive=true;
					return;
				}
				let api_token=session.api_token,
					email=session.email;
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
				if(name)
					data.name=name;				
				//desactivamos el filtro de la imagen creado con JavaScript
				this.filter();					
				
				axios.post(this.url+'filter',data,headers).then(res=>{
					if(res.data.image){
					console.log("effectMultiple: ",this.effectMultiple)						
						if(!this.effectMultiple){
							this.dialogImage=true;
							this.tmpImage=res.data.image;	
						}else{
							resolve(res.data.image);
						}
					}else{
						reject(Error("Error en effect"));
					}
				}).catch(error=>{
					this.msgeDialogAlert="Se generó un error al procesar el filtro";
					this.dialogErrorActive=true;
					console.log("Error server: ",error);
				})
				
			})		
		},
//falta despintar botón polygon y effect
		//almacenar imagen con la forma geométrica seleccionada
		setPolygon(name=null){
			return new Promise((resolve,reject) => {			
				let session=this.testSession();
				if(!session)
					return;
				
				if(session.status=="error"){
					this.msgeDialogAlert=session.message;
					this.dialogErrorActive=true;
					return;
				}
				let api_token=session.api_token,
					email=session.email;
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
				if(name)
					data.name=name;				
				//desactivamos el polígono mostrado en el canvas creado con JavaScript
				this.deleteDrawCanvas();
				//despintamos botón
				this.btnActive.polygon=false;				
				this.dialogImage=true;				
				axios.post(this.url+'polygon',data,headers).then(res=>{
					if(res.data.image){
						//comprobar si el origen es processAll()
						if(!this.effectMultiple){
							this.dialogImage=true;
							this.tmpImage=res.data.image;	
						}else{
							resolve(res.data.image);
						}
					}else{
						reject(Error("Error en effect"));
					}
				}).catch(error=>{
					this.msgeDialogAlert="Se generó un error al procesar el efecto de forma";
					this.dialogErrorActive=true;
					console.log("Error server: ",error);
				})				
			})
		},

		//procesa la solicitud de creación de efecto con imagick(polaroid,viñeta,onda...)
		setEffect(type_effect,params=null){
			//la promesa tan solo es necesaria para el efecto rotate, ya que, al 
			//pertenecer al primer grupo requiere asincronía para el processAll()
			return new Promise((resolve,reject)=>{
				let session=this.testSession();
				if(!session)
					return;
				
				if(session.status=="error"){
					this.msgeDialogAlert=session.message;
					this.dialogErrorActive=true;
					return;
				}
				let api_token=session.api_token,
				email=session.email;
				let headers={
					headers:{
						Authorization:'Bearer '+api_token
					}
				};				
				let data={
					name:this.ima.src,
					effect:type_effect,
					email:email,
					params:params
				};				
				//despintamos botón
				this.btnActive.effect=false;
				axios.post(this.url+'effect',data,headers).then(res=>{
					
					if(res.data.message){
						this.msgeDialogAlert=res.data.message;
						this.dialogErrorActive=true;
						return;
					}
					if(res.data.image){
						if(!this.effectMultiple){
							this.dialogImage=true;
							this.tmpImage=res.data.image;
							//si es para el array de processAll() devolvemos con resolve()
						}else{
							resolve(res.data.image);
						}
					}else{
						reject(Error("Error en effect"));
					}
				}).catch(error=>{
					this.msgeDialogAlert="Se generó un error al procesar el efecto";
					this.dialogErrorActive=true;
					console.log("Error server: ",error);
				})				
			})
		},

		//obtiene las imágenes para el desplegable destinado al efecto de fusión y 
		//marca de agua
		getTotalImages(){			
			let session=this.testSession();
			if(!session)
				return;
			
			if(session.status=="error"){
				this.msgeDialogAlert=session.message;
				this.dialogErrorActive=true;
				return;
			}
			let api_token=session.api_token,
				email=session.email;			
				let data={
					params:{
						api_token:api_token,
						email:email,
						total:"true"
					}
				};
				let headers={
					headers: {
						Authorization: 'Bearer '+sessionStorage.getItem("biedit_apitoken")
					}
				};
				axios.get(this.url+'images',data,headers).then(res=>{
					this.images=res.data.images;
					console.log("las imagenes: ",this.images);
				})			
		},
		//elimina una lista de imagenes del server y de la db, destinado al proceso de
		//actualización de varios efectos de una vez
		deleteImages(images_list){			
			
			let session=this.testSession();
			if(!session)
				return;
			
			if(session.status=="error"){
				this.msgeDialogAlert=session.message;
				this.dialogErrorActive=true;
				return;
			}
			let api_token=session.api_token,
				email=session.email;

			let data={
				email:email,
				images:images_list
			}
			let headers={
				headers:{
					'Authorization': 'Bearer '+api_token
				}
			}
			axios.post(this.url+"images/delete",data,headers)			
		},

		//solicita procesar los efectos de fusión, watermark y create-watermark al server
		//identificando el tipo de efecto mediante la variable typeAction
		setComposite(){
			if(this.typeAction){
				console.log("typeAction desde setComposite: ",this.typeAction);
				let session=this.testSession();
				if(!session)
					return;
				
				if(session.status=="error"){
					this.msgeDialogAlert=session.message;
					this.dialogErrorActive=true;
					return;
				}
				let api_token=session.api_token,
					email=session.email;
				//comprobamos si se han seleccionado datos del desplegable de ímágenes,

				if(this.compositeSelectedHtml && this.compositeSelectedId){

					let data={
						email:email,
						imageSrc:this.ima.src,
						imageId:this.compositeSelectedId
					}
					let headers={
						withCredentials:false,
						headers:{
							'Authorization': 'Bearer '+api_token,							
							"Access-Control-Allow-Origin" : "*",							
							'Access-Control-Allow-Headers': " Origin, X-Requested-With, Content-Type, Accept",							
						},						
					}
					//identificamos si es el efecto de fusión o el watermark
					if(this.typeAction=="fussion"){
						axios.post(this.url+'composite',data,headers).then(res => {
							console.log("llega: ",res);
							if(res.data.message){
								console.log(res.data.message)
							}
							if(res.data.image){								
								this.dialogImage=true;
								this.tmpImage=res.data.image;
							}else{
								//
							}
						}).catch(error=>{
							this.msgeDialogAlert="Se generó un error al procesar el efecto de fusión";
							this.dialogErrorActive=true;
							console.log("Error server: ",error);
						})
					}else if(this.typeAction=="watermark"){
						data.position=this.compPos;
						axios.post(this.url+'watermark',data,headers).then(res => {
							if(res.data.message){
								console.log(res.data.message)
							}
							if(res.data.image){								
								this.dialogImage=true;
								this.tmpImage=res.data.image;
							}else{
								//
							}
						}).catch(error=>{
							this.msgeDialogAlert="Se generó un error al procesar el efecto de marca de agua";
							this.dialogErrorActive=true;
							console.log("Error server: ",error);
						})
					}
				//identificamos si es el create-watermark y si se ha introducido texto 
				//en el input destinado a la creación de marca de agua			
				}else if(this.inputWm){
					let data={
						email:email,
						inputWm:this.inputWm,
						fontSize:this.rangeWmFontSize,
						fontFamily:this.fontFamilySelected,
						color:this.color
					}
					let headers={
						headers:{
							'Authorization': 'Bearer '+api_token
						}
					}
					console.log(this.inputWm);
					if(this.typeAction=="create-watermark"){
						
						axios.post(this.url+'watermark/create',data,headers).then(res=>{
							if(res.data.message){
								console.log(res.data.message)
							}
							if(res.data.image){								
								this.dialogImage=true;
								this.tmpImage=res.data.image;
								this.getTotalImages();
							}else{
								//
							}
						}).catch(error=>{
							this.msgeDialogAlert="Se generó un error al crear la marca de agua";
							this.dialogErrorActive=true;
							console.log("Error server: ",error);
						})
					}
				}
			}
			else{
				console.log("Faltan datos por seleccionar");
			}
		},

//MainPanel
		//redimensionar la imagen con las dimensiones seleccionadas
		confirmResize(){
			let session=this.testSession();
			if(!session){				
				return;
			}
			if(session.status=="error"){
				this.msgeDialogAlert=session.message;
				this.dialogErrorActive=true;
				return;
			}
			
			let api_token=sessionStorage.getItem("biedit_apitoken");
			let email=sessionStorage.getItem("biedit_email");
			let formdata=new FormData();
			formdata.append("src",this.ima.src);
			formdata.append("width",this.ima.width);
			formdata.append("height",this.ima.height);
			formdata.append("email",email);
			//si se ha seleccionado la redimensión libre.
			if(this.freeResize)
				formdata.append("freeResize",this.freeResize);
			let headers={
				headers:{Authorization:'Bearer '+api_token}
			}
			axios.post(this.url+'resize',formdata,headers).then(res => {
				if(res.data.error){
					this.msgeDialogAlert=res.data.error;
					this.dialogErrorActive=true;
					return;		
				}
				if(res.data.message){
					this.msgeDialogAlert=res.data.message;
					this.dialogSuccessActive=true;
				}					
			}).catch(error=>{
				this.msgeDialogAlert="Se generó un error al redimensionar la imagen";
				this.dialogErrorActive=true;
				console.log("Error server: ",error);
			});
			
		},
//CutPanel
		//proceso de recorte
		cropImage(){
			//si la ruta actual no es cutout detenemos
			if(this.$route.name!="cutout"){
				return;
			}
			if(this.ima.widthCut<100 || this.ima.heightCut<100){
				//console.log("no es posible recortar ")
			}
			var self=this;
			if(sessionStorage && sessionStorage.getItem("biedit_apitoken")){

				let api_token = sessionStorage.getItem("biedit_apitoken");
				let email = sessionStorage.getItem("biedit_email");
				let square = document.querySelector("#square-panel");				
				square.className="flash animated";

				let prop = {
					x : square.offsetLeft,
					y : square.offsetTop,
					width : square.offsetWidth,
					height : square.offsetHeight,
					resizeWidth:this.ima.widthCut,
					resizeHeight:this.ima.heightCut,
					src : this.ima.src,
					email: email
				}
				let data = {
					data: JSON.stringify(prop)
				}
				let headers= {
					headers:{Authorization: "Bearer "+api_token}
				}
				axios.post(this.url+"crop",data,headers).then(res => {
					if(res.data.error){
						this.titleDialogAlert="Ocurrió un error";
						this.msgeDialogAlert=res.data.error;						
						this.dialogErrorActive=true;
						return;		
					}
					if(res.data.message){
						const cloneBoxSquare=this.cloneBoxSquare();
						//realizamos un setTimeout para que funcione el transition
						setTimeout(function(){
							square.className="";
							cloneBoxSquare.style.top="-1000px";
							setTimeout(function(){
								//cloneBoxSquare.style.display="none";
								self.titleDialogAlert="Recorte aplicado correctamente";								
								self.msgeDialogAlert=res.data.message;
								self.dialogSuccessActive=true;
							},1000);
						},100);
					}
				}).catch(error=>{
					this.msgeDialogAlert="Se generó un error al procesar la nueva imagen";
					this.dialogErrorActive=true;
					console.log("Error server: ",error);
				})

				this.playSound();
			}else{
				console.log("El usuario no está logueado o el navegador no soporta sessionStorage");
			}
		},
	
		//Collections component eliminar una sola imagen 
		//pasa el objeto image que se ha seleccionado para eliminar y se pasa el objeto
		//el image del componente principal si es que existe
		deleteImage(imagetmp,imagetmpmain){
			console.log("desde deleteImage: ",imagetmp)
			console.log("desde deleteImage: ",imagetmpmain)
			this.dialogSuccessActive=false;
			let session=this.testSession();
			if(!session){				
				return;
			}
			if(session.status=="error"){
				this.msgeDialogAlert=session.message;
				this.dialogErrorActive=true;
				return;
			}
			//console.log("No ha sido posible eliminar la imagen, el usuario no ha iniciado sesión");
			let api_token=session.api_token;
				//email=session.email;
			
			let headers = {
				headers:{
					Authorization: 'Bearer '+api_token
				}
			};
			//mostramos loading...
			this.loading=true;
			axios.post(this.url+'image/'+imagetmp.id,{dato:this.actualPage},headers).then(res => {				
				//manejo de errores en api
				if(res.data.error){
					this.titleDialogAlert="No se ha podido eliminar la imagen";
					this.msgeDialogAlert=res.data.error;
					//console.log(res.data.error);
					this.dialogErrorActive=true;
				//error con el servidor
				}else if(res.status!=200){
					this.titleDialogAlert="No se ha podido eliminar la imagen";
					this.msgeDialogAlert="No se ha podido conectar con el servidor";
					this.dialogErrorActive=true;
				//eliminada correctamente
				}else{
					this.titleDialogAlert="Imagen eliminada correctamente";
					this.msgeDialogAlert=res.data.message;
					this.dialogErrorActive=true;					

					//ocultamos loading...
					this.loading=false;
				//anulamos si existe imageMain, ya que al recargar página en collections,
				//no existiría imageMain y es necesario comprobar si la imagen a eliminar se ha
				//enviado al panel principal, para eso usamos imagetmpmain, si es así, vaciamos
					if(imagetmpmain && imagetmpmain.random_name==imagetmp.random_name 
						|| this.imageMain && this.imageMain.src==imagetmp.random_name){
					
						console.log("la misma imgawen")
						if(this.imageMain){
							console.log("desde deleteImage borrando: ",this.imageMain)
							this.dropImage(this.imageMain);
						}
							this.$emit("setnav",true);	
					}					
				//llamamos al método getImages() para volver a ordenar la 
				//lista de imágenes, si se llama desde la paginación se pasa
				//el número de página							
					if(res.data.page)
					{
						this.getImages(res.data.page)
					}else{
						this.getImages();	
					}							
				}				
				this.imagetmp=null;
				if(this.imageMain)
					console.log("final de eliminar imagen: ",this.imageMain)
			}).catch(error=> {				
				this.titleDialogAlert="No se ha podido eliminar la imagen";
				this.msgeDialogAlert=error.response.data.error;
				this.dialogErrorActive=true;
			})
			
		},

		//obtener lista de imágenes
		getImages(page=null){

			let linkPage=1;
			if(page){
				linkPage=page;				
			}

			let session=this.testSession();
			if(!session){				
				return;
			}
			if(session.status=="error"){
				this.msgeDialogAlert=session.message;
				this.dialogErrorActive=true;
				return;
			}

			let api_token=session.api_token,
				email=session.email;			
			let data={
				params:{
					api_token:api_token,
					email:email	
				}
				
			};
			let headers={
				headers: {					
					Authorization: 'Bearer '+api_token
				}
			};			
			axios.get(this.url+'images?page='+linkPage,data,headers).then(res=>{

				this.images=res.data.data;
				this.totalPages=res.data.last_page;
				this.actualPage=res.data.current_page;
				this.totalImages=res.data.total;				
			}).catch(error => {
				this.titleDialogAlert="No se han podido obtener las imágenes";
				this.msgeDialogAlert=error.response.data.message;
				this.dialogErrorActive=true;
			})
			
		},
//HeaderComponent
		//faltan datos por subir(title,detail,...)
		//subida de archivo al servidor, dependiente de resizeImageToWidth()
		uploadImageToServer(){

			//no es necesario comprobar FormData, ya está comprobado anteriormente en resizeImageToWidth()			
			let session=this.testSession();
			if(!session){				
				return;
			}
			if(session.status=="error"){
				this.msgeDialogAlert=session.message;
				this.dialogErrorActive=true;
				return;
			}					
			let api_token=sessionStorage.getItem("biedit_apitoken"),
				email=sessionStorage.getItem("biedit_email"),
				formdata= new  FormData();
				formdata.append("images[]",this.image.file);
				formdata.append("email",email);
				//formdata.append("api_token",api_token);
				//si la original es mayor se establece un máximo de ancho y alto por defecto(maxWidthDefault), si no se mantiene ancho y alto original	
			if(this.image.widthInitial>this.maxWidthDefault){
				formdata.append("width",this.maxWidthDefault);
				formdata.append("height",this.maxHeightDefault);
			}else{
				formdata.append("width",this.image.widthInitial);
				formdata.append("height",this.image.heightInitial);
			}

			//cabeceras
			let headers={
				headers:{					
					Authorization: 'Bearer '+api_token 
				}
			};

			axios.post(this.url+"images",formdata,headers).then(res=> {
//Al guardar la imagen en el servidor actualizamos los datos del objeto 
//image, pero mateniendo la imagen base64 en el MainPanel y asignamos 
//los datos para el panel de recorte (resizedImg)
				
				//el objeto resizedImg pasa los datos de ancho y alto al panel de recorte.
				//Para pasar los datos en lugar de anular el objeto ima 
				//como prop,indicados como params en la redirección se 
				//puede  anular el resizedImg.src pasando el objeto ima 
				//como prop (que contiene tb el src) 
				this.resizedImg.src=res.data.image.random_name;
				this.image.src=res.data.image.random_name;
				//no están en data y por tanto no prevalecen
				this.image.size=res.data.image.size;
				this.image.spaceColor=res.data.image.space_color;					
	//comprobaciones para asignar el resizedImg (destinado al CutPanel e hijos)
				let sizes = this.setSizeToCutPanel(res.data.image.width,res.data.image.height,this.minWidthHeight,this.maxWidthDefault,this.maxHeightDefault);
				
				this.image.widthCut=sizes.width;
				this.image.heightCut=sizes.height;
				this.resizedImg.width=sizes.width;
				this.resizedImg.height=sizes.height;
				//habilitamos botones
				this.mainImage=false;
				this.mainBigImage=false;
				//habilitamos botón effect y Acerca de..
				this.sessionState=false;
			}).catch(error => {
				this.titleDialogAlert="Se ha generado un error";
				this.msgeDialogAlert=error.response.data.message;
				this.dialogErrorActive=true;
			})
		},

		uploadImageBase64(image){
			
			let session=this.testSession();
			if(!session){				
				return;
			}
			if(session.status=="error"){
				this.msgeDialogAlert=session.message;
				this.dialogErrorActive=true;
				return;
			}					
			let api_token=sessionStorage.getItem("biedit_apitoken"),
				email=sessionStorage.getItem("biedit_email"),
				formdata3= new FormData();
				formdata3.append("base64",image);
				formdata3.append("email",email);
			let headers={
				headers:{
					Authorization: 'Bearer '+api_token
				}
			};
			this.imageCam=null			
			axios.post(this.url+'images',formdata3,headers).then(res => {
				console.log("llega bien: ",res)
				if(res.data.message){
					console.log(res.data.message)
				}
				if(res.data.image){
					this.dialogImageCam=false;
					this.dialogSuccessActive=true;	
				}
				
			}).catch(error => {
				this.titleDialogAlert="No se ha podido guardar la imagen";
				this.msgeDialogAlert=error.response.data.message;
				this.dialogErrorActive=true;
			})

		}
	}
}