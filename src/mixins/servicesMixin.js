import axios from 'axios';
export default {

	methods: {

		//identifica si el usuario ha iniciado sesión y en caso afirmativo devuelve
		//las variables de sessionStorage
		testSession:()=>{
			if(!sessionStorage){
				return {
					status:"error",
					message:"El navegador no soporta sessionStorage"
				}
			}

			if(!sessionStorage.getItem("biedit_apitoken") || !sessionStorage.getItem("biedit_email") || !sessionStorage.getItem("biedit_name"))
				return {
					status:"error",
					message:"Faltan datos o no son correctos"
				}
			
			return {
				status:"success",
				api_token:sessionStorage.getItem("biedit_apitoken"),
				email:sessionStorage.getItem("biedit_email"),
				name:sessionStorage.getItem("biedit_name"),
				message:"Los datos son correctos"
			}
		},
		
	//procesa solicitud al server de compresión de imagen
		setCompress(range){
			let session=this.testSession();
			if(!session)
				return;
			if(session.status=="error"){
				console.log("session.message: ",session.message);
				return;
			}
			let api_token=session.api_token,
				email=session.email;
				//let apitoken=sessionStorage.getItem("biedit_apitoken");
				//let email=sessionStorage.getItem("biedit_email");
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
					console.log("tmpImage2: ",this.tmpImage);
					//console.log(this.tmpImage);
					console.log("dialog_image",res.data.image);
				}else{
					//console.log(res.data.data);
					console.log("hubo un error");
				}
			});
			
		},

		setReflex(type){			
			let session=this.testSession();
				if(!session || !type)
					return;
				if(session.status=="error"){
					console.log("session.message: ",session.message);
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
				//console.log("llega a setFilter");
				let session=this.testSession();
				if(!session)
					return;
				if(session.status=="error"){
					console.log("session.message: ",session.message);
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
				console.log(this.filterProp);				
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

		//almacenar imagen con la forma geométrica seleccionada
		setPolygon(name=null){
			return new Promise((resolve,reject) => {
			//	console.log("llega a setPolygon");
				//if(sessionStorage.getItem("biedit_apitoken")){
				//	let api_token=sessionStorage.getItem("biedit_apitoken");
				//	let email=sessionStorage.getItem("biedit_email");
				let session=this.testSession();
				if(!session)
				return;
				if(session.status=="error"){
					console.log("session.message: ",session.message);
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
				console.log("lados: ",this.polygonProp);
				//desactivamos el polígono mostrado en el canvas creado con JavaScript
				this.deleteDrawCanvas();				
				this.dialogImage=true;
				console.log("tmpImage: ",this.tmpImage);
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
				//}
			})
		},

		//procesa la solicitud de creación de efecto con imagick(polaroid,viñeta,onda...)
		setEffect(type_effect,params=null){
			//la promesa tan solo es necesaria para el efecto rotate, ya que, al 
			//pertenecer al primer grupo requiere asincronía para el processAll()
			return new Promise((resolve,reject)=>{
				//if(sessionStorage){
					//if(sessionStorage.getItem("biedit_apitoken")){						
					//	let api_token=sessionStorage.getItem("biedit_apitoken");
					//	let email=sessionStorage.getItem("biedit_email");
				let session=this.testSession();
				if(!session)
					return;
				if(session.status=="error"){
					console.log("session.message: ",session.message);
					return;
				}
				let api_token=session.api_token,
				email=session.email;
				let headers={
					headers:{
						Authorization:'Bearer '+api_token
					}
				};
				//pòdemos pasar datos en el params y pasar el name temporal para el
				//array, por ejemplo...
				//if(params.name) data.name=params.name
				/*
				if(params && params.name){
				}
				*/
				let data={
					name:this.ima.src,
					effect:type_effect,
					email:email,
					params:params
				};
				console.log("params: ",params);
				axios.post(this.url+'effect',data,headers).then(res=>{
					//si es para el array de processAll() devolvemos							
					console.log(res);
					if(res.data.message){
						console.log(res.data.message)
					}
					if(res.data.image){
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
					this.msgeDialogAlert="Se generó un error al procesar el efecto";
					this.dialogErrorActive=true;
					console.log("Error server: ",error);
				})
					//}
				//}
			})
		},

		getTotalImages(){
			let session=this.testSession();
			if(!session)
				return;
			if(session.status=="error"){
				console.log("session.message: ",session.message);
				return;
			}
			let api_token=session.api_token,
				email=session.email;
			//if(sessionStorage.getItem("biedit_apitoken")){
			//	let api_token=sessionStorage.getItem("biedit_apitoken");
			//	let email=sessionStorage.getItem("biedit_email");
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
			//}
		},
		//elimina una lista de imagenes del server y de la db
		deleteImages(images_list){			
			
			let session=this.testSession();
			if(!session)
				return;
			if(session.status=="error"){
				console.log("session.message: ",session.message);
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
			//.then(res => {
			//	console.log(res);
			//})
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
					console.log("session.message: ",session.message);
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
							//'Content-Type':'application/json',
							"Access-Control-Allow-Origin" : "*",
							//"crossorigin":true,
							//'Access-Control-Allow-Methods': "GET,POST,PUT,DELETE,OPTIONS",
							'Access-Control-Allow-Headers': " Origin, X-Requested-With, Content-Type, Accept",
							//'Access-Control-Allow-Credentials':true,
							//'cache-control':'no-cache',
						},
						header:{

						}
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
	}
}