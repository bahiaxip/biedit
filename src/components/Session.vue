<template>
	<div >
		<!--<md-progress-spinner md-mode="indeterminate" v-if="displayLoading"></md-progress-spinner>-->
<!--dialog session register y login -->
	<md-dialog :md-active.sync="dialog" :md-click-outside-to-close="closeDialog" class="session-panel-dialog" v-if="!displayLoading">

			<md-dialog-title>Sesión de usuario</md-dialog-title>
			<md-tabs md-dynamic-height>
				<md-tab md-label="Inicio de sesión">
					<form novalidate class="md-layout" @submit.prevent="loginUser()">
						<div class="md-layout-item">
							<md-field :class="getValidationClass('email','login')">
								<label for="name">Email</label>
								<md-input name="email" id="email" v-model="login.email" :disabled="sending" />
								<span class="md-error" v-if="!$v.login.email.required">El email es requerido</span>
								<span class="md-error" v-if="!$v.login.email.email">El email no es válido</span>
							</md-field>
							<md-field :class="getValidationClass('password','login')">
								<label for="password">Contraseña</label>
								<md-input name="password" id="password" v-model="login.password" :disabled="sending"/>
								<span class="md-error" v-if="!$v.login.password.required">La contraseña es requerida</span>
								<span class="md-error" v-if="!$v.login.password.minLength">La contraseña debe contener al menos 8 caracteres</span>
							</md-field>							
							<md-button name="envio" class="md-primary md-raised" @click="changeDialog()" disabled>Cancelar</md-button>
							<md-button name="envio" type="submit" class="md-primary md-raised">Enviar</md-button>
						</div>
					</form>
				</md-tab>
				
				<md-tab md-label="Registro" >
					<form novalidate class="md-layout" @submit.prevent="registerUser()">
						<div class="md-layout-item">
							<md-field :class="getValidationClass('name','register')">
								<label for="name">Nombre</label>
								<md-input name="name" id="name" v-model="register.name" :disabled="sending"/>
								<span class="md-error" v-if="!$v.register.name.required">El nombre es requerido</span>
								<span class="md-error" v-if="!$v.register.name.minLength">El nombre debe contener al menos 3 caracteres</span>
							</md-field>
							<md-field :class="getValidationClass('email','register')">
								<label for="email">Email</label>
								<md-input name="email" id="email" v-model="register.email" :disabled="sending"/>
								<span class="md-error" v-if="!$v.register.email.required">El email es requerido</span>
								<span class="md-error" v-if="!$v.register.email.email">El email no es válido</span>								
							</md-field>
							<md-field :class="getValidationClass('password','register')">
								<label for="password">Contraseña</label>
								<md-input name="password" id="password" v-model="register.password"/>
								<span class="md-error" v-if="!$v.register.password.required">La contraseña es requerida</span>
								<span class="md-error" v-if="!$v.register.password.minLength">La contraseña debe contener al menos 8 caracteres</span>
							</md-field>							
							<md-button name="envio" class="md-primary md-raised" @click="changeDialog()" disabled>Cancelar</md-button>
							<md-button name="submit" type="submit" class="md-primary md-raised">Enviar</md-button>
						</div>
					
					</form>
				</md-tab>
			</md-tabs>			
		</md-dialog>
<!-- dialog session logout y perfil de usuario(editar solo nombre)-->
		<md-dialog :md-active.sync="dialogLogout" :md-click-outside-to-close="closeDialog" class="session-panel-dialog">
			<md-dialog-title>Salir - Perfil de usuario</md-dialog-title>								<md-tabs md-dynamic-height>					
					<md-tab md-label="Salir">
						<md-button name="envio" class="md-primary md-raised" @click="changeDialog()">Cancelar</md-button>
						<md-button name="envio" class="md-primary md-raised" @click="sessionLogout()">Salir</md-button>
					</md-tab>
					<md-tab md-label="Perfil">
						<form class="md-layout" @submit.prevent="sessionUser()">
						<div class="md-layout-item">
							<md-field :class="getValidationClass('name','session')">
								<label for="name">Nombre</label>
								<md-input name="name" id="name" v-model="session.name" :disabled="sending"/>
								<span class="md-error" v-if="!$v.session.name.required">El nombre es requerido</span>
								<span class="md-error" v-if="!$v.session.name.minLength">El nombre debe contener al menos 3 caracteres</span>
							</md-field>
							<md-field >
								<label for="email">Email</label>
								<md-input name="email" id="email" v-model="session.email" disabled="disabled" />								
							</md-field>													
							<md-button name="envio" class="accent md-raised" @click="changeDialog()" >Cancelar</md-button>
							<md-button name="envio" type="submit" class="md-primary md-raised">Actualizar</md-button>
						</div>
					</form>
					</md-tab>
				</md-tabs>
		</md-dialog>
	<!-- ḿodal de confirmación de registro satisfactorio -->
		<md-dialog-alert :md-active.sync="acceptDialog" :md-content="msge" md-confirm-text="Ok" @click="redirect()" :md-click-outside-to-close="false" style="z-index:110"/>
	<!-- ḿodal de confirmación de registro fallido -->
		<md-dialog-alert class="dialog-alert-email" :md-active.sync="errorDialog" :md-content="msge" md-confirm-text="Ok" />

	<!--efecto de carga (loading...) -->
		<md-dialog  class="dialog_spinner t_center m_auto" :md-active.sync="displayLoading">
			<div class="t_center m_auto" style="background-color:transparent !important">
			<md-progress-spinner class="md-accent"  md-mode='indeterminate'></md-progress-spinner>
			</div>
		</md-dialog>
		
	</div>
</template>
<script>
import {validationMixin } from 'vuelidate';
import servicesMixin from '../mixins/servicesMixin';
import {required,minLength,email} from 'vuelidate/lib/validators';
import Global from '../Global.js';
import axios from 'axios';
export default {
	name:'Session',
	mixins:[validationMixin,servicesMixin],
	props:["dialog","dialogLogout"],
	data(){
		return{
			displayLoading:false,
			url:Global.url,
			closeDialog:false,
			register:{
				name:null,
				email:null,
				password:null,				
			},
			login:{
				email:null,
				password: null
			},
			session:{
				name:null,
				email:null
			},
			acceptDialog:false,
			errorDialog:false,
			sending:false,
			msge:"",
			msges:{
				onRegister:"Su registro se ha creado correctamente",
				offRegister:"No ha podido registrarse, el email introducido ya existe",
				errorRegister:"Ocurrió un error durante el registro",
				offLogin:"No se ha podido iniciar sesión",
				onUpdate: "Los datos se han actualizado correctamente",
				offUpdate: "No ha sido posible actualizar los datos",
				errorData: "Los datos no son correctos",
				logout: "Se ha cerrado la sesión",
			},
			message:{
				acceptRegister:"Su registro se ha creado correctamente",
				errorEmail:"No ha podido registrarse, el email introducido ya existe"
			},
			//Contador de sesión 
			//3600 (1 hora) sin mover el ratón en toda la ventana
			time:3600,
			timer:null,
			timerSessionData:"",
			dialogSession:true,
			
			//clear:null,
		}	
	},
	validations:{
		register:{
			name:{
				required,
				minLength:minLength(3)
			},
			email:{
				required,
				email
			},
			password:{
				required,
				minLength:minLength(8)
			}
		},
		login:{
			email:{
				required,
				email
			},
			password:{
				required,
				minLength:minLength(8)
			}
		},
		session:{
			name:{
				required,
				minLength:minLength(3)
			}
		}
	},	
	mounted(){
		//actualizamos los datos de sessionStorage en objeto session para mostrar datos en perfil de usuario
		if(sessionStorage.getItem("biedit_name") && sessionStorage.getItem("biedit_email")){
			this.session.name=sessionStorage.getItem("biedit_name");
			this.session.email=sessionStorage.getItem("biedit_email");
			//actualizamos tiempo del contador
			this.timer=this.time;
			//reiniciamos el contador
			this.timerSession();
		}
		//actualizamos el timersession con el evento mousemove		
		window.addEventListener("mousemove",()=> {
			//actualizamos tiempo del contador
			this.timer=this.time;
		},false);
	},

	destroyed(){
	//anulado
		//no necesario, se puede prescindir en session y md-drawer de headerComponent
		//this.$emit("btn","settings");
	},
	methods:{
		//contador de sesión: se cierra la sesión al cabo de un tiempo determinado
		//contador de sesión almacenado en la variable timerSessionData, una opción para 
		//poder realizar el clearInterval (método clear())  desde cualquier lugar.
		timerSession(){
			this.timerSessionData=setInterval(()=>{
				if(this.timer<=0){						
					this.sessionLogout();						
				}
				this.timer--;				
			},1000);			
		},
		//detiene el contador de sesión
		clear(){
			clearInterval(this.timerSessionData);
		},
		resetear(){
			//console.log("reset");
		},
		//método que cambia el color del formulario para indicar las validaciones con vuelidate
		getValidationClass(fieldName,data){
			//Para no repetir método se comprueba el origen del campo con el parámetro data
			let field=null;
			switch(data){
				case 'register':
					field=this.$v.register[fieldName];
					break;
				case 'login':
					field=this.$v.login[fieldName];
					break;
				case 'session':
					field=this.$v.session[fieldName];
					break;
			}
			//const field= this.$v.obj[fieldName]
			if(field){
				return {
					'md-invalid':field.$invalid && field.$dirty
				}
			}
		},
		clearForm(){
			this.$v.$reset();
			this.register.name=null;
			this.register.email=null;
			this.register.password=null;			
			this.login.email=null;
			this.login.password=null;			
		},

		registerUser(){
			var self=this;
			this.$v.register.$touch();
			//console.log(this.$v);
			if(!this.$v.register.$invalid){
				//con sending impedimos escritura en todos los input del formulario
				this.sending=true;				
					//setTimeout para prueba, en su lugar llamada a la API
					/*window.setTimeout(()=> {
						this.sending=false
						this.clearForm()
					},3000);*/
				this.register.password_confirmation =this.register.password;
				
				//this.dialog=false;
				//efecto de carga en on
				this.displayLoading=true;
				//console.log("pasó");
				axios.post(this.url+"register",this.register).then(function(res){
					//console.log("pasó2");
					//efecto de carga en off
					self.displayLoading=false;
					if(res.data.data){
										
						//Establecer el api_token en sessionStorage				
						sessionStorage.setItem("biedit_name",res.data.data.name);
						sessionStorage.setItem("biedit_email",res.data.data.email);
						sessionStorage.setItem("biedit_apitoken",res.data.data.api_token);
						self.addAndActiveMsge("on",self.msges.onRegister);
						self.changeDialog();
						//establecemos botones disabled
						this.$emit("setnav",true);
						
					}else{
						if(res.data.message){
							self.addAndActiveMsge("off",self.msges.offRegister);
						}else{							
							self.addAndActiveMsge("off",self.msges.errorRegister);
							self.changeDialog();
						}
					}
				})
				this.sending=false;
			}
		},
		//login de usuario	
		loginUser(){
			var self=this;
			this.$v.login.$touch();
			//console.log(this.$v);
			//al haber varios formularios es necesario especificar, no es suficiente con:
			//if(!this.$v.$invalid) -> es necesario indicar si es login,register...,
			//lo mismo con $touch más arriba
			if(!this.$v.login.$invalid){
				this.sending=true;
				let headers={
					headers:{
						"Access-Control-Allow-Origin":'*',
						//"Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS",
						//"Access-Control-Allow-Headers":"X-Requested-With,Content-Type,X-Token-Auth,Authorization,Origin,Accept",
						//"Allow":"GET,POST,OPTIONS,PUT,DELETE"
					}
				};
				//efecto de carga en on
				this.displayLoading=true;
				axios.post(this.url+"login",this.login,headers).then(res => {
					console.log("res: ",res.data.data);
					//efecto de carga en off
					self.displayLoading=false;
					if(res.data.data.api_token){						
						sessionStorage.setItem("biedit_name",res.data.data.name);
						sessionStorage.setItem("biedit_email",res.data.data.email);
						sessionStorage.setItem("biedit_apitoken",res.data.data.api_token);
						sessionStorage.setItem("biedit_audio",0.1);
						//console.log("res.data.data1: ",res.data.data);
						self.session.name=res.data.data.name;
						self.session.email=res.data.data.email;
						this.changeDialog();						
						this.timerSession();
						//establecemos botones disabled
						this.$emit("setnav",true);
						
					}else if(res.data.data){						
						self.addAndActiveMsge("off",res.data.data);
					}else{						
						self.addAndActiveMsge("off",self.msges.offLogin);
						this.changeDialog();
					}
					this.sending=false;
				});
			}
		},
		//actualizar perfil de usuario
		sessionUser(){
			var self=this;
			this.$v.session.$touch();
			if(!this.$v.session.$invalid){
				this.sending=true;
				if(sessionStorage.getItem("biedit_apitoken")){
					let api_token=sessionStorage.getItem("biedit_apitoken");
					let headers={
						headers:{ Authorization: 'Bearer '+api_token }
					};
					//efecto de carga en on
					this.displayLoading=true;
					axios.post(this.url+"update",this.session,headers)
						.then(res => {
							//efecto de carga en off
							self.displayLoading=false;
							if(res.data.data){
								sessionStorage.setItem("biedit_name",res.data.data.name);
								self.addAndActiveMsge("on",self.msges.onUpdate);
								
							}else{
								self.addAndActiveMsge("off",self.msges.offUpdate);
								self.changeDialog();
							}
						})
				}else{
					self.addAndActiveMsge("off",self.msges.offUpdate);
					this.changeDialog();
				}
			}else{				
				//self.message.errorRegister="Los datos no son correctos";
				//self.errorDialog=true;
				self.addAndActiveMsge("off",self.msges.errorData);
			}
			this.sending=false;
		},
		sessionLogout(){			
			var self=this;
			if(sessionStorage && sessionStorage.getItem("biedit_apitoken")){
				let api_token= sessionStorage.getItem("biedit_apitoken");
				let headers= {
					headers:{Authorization: 'Bearer '+api_token}
				};
				//efecto de carga en on
				this.displayLoading=true;
				axios.post(this.url+"logout",{},headers).then(res => {
					//efecto de carga en off
					self.displayLoading=false;
					if(res.data.data){

						//eliminamos datos de sessionStorage
						sessionStorage.removeItem("biedit_name");
						sessionStorage.removeItem("biedit_email");
						sessionStorage.removeItem("biedit_apitoken");
						//enviamos mensaje
						self.addAndActiveMsge("on",self.msges.logout);
						//establecemos botones disabled
						this.$emit("setnav",true);


					}else{
						self.addAndActiveMsge("off","No se ha podido cerrar la sesión");
					}
				});
				//detenemos el contador de sesión
				this.clear();
				//ocultamos el panel de diálogo
				this.changeDialog();
				this.clearData();
			}
		},
		//limpiar datos
		clearData(){
			let resizedImg=this.$parent.resizedImg;
			let image=this.$parent.image;			
			for(let d in resizedImg){
				resizedImg[d]=null;
			}
			for(let d in image){
				image[d]=null;
			}
		},
		changeDialog(state=null){
			console.log("llega a changeDialog ",state);
			//da error con el registro
			//en el dialog de "perfil de usuario" añadimos la característica de que si se cierra la ventana se actualiza el nombre
			if(sessionStorage && sessionStorage.getItem("biedit_name"))
				this.session.name=sessionStorage.getItem("biedit_name");
			//anulamos esta comprobación y desde el padre simplemente pasamos las 2 variables a false
				
			//limpiamos formulario
			this.clearForm();
			if(!state)
				state=false;
			//emitimos evento al padre para cambiar el valor de showDialog a false
			this.$emit("offdialog",state);			
		},
		addAndActiveMsge(bol,msge){
			this.msge=msge;
			if(bol=="on"){
				this.acceptDialog=true;
			}else{
				this.errorDialog=true;
			}
		},		
//revisar en producción
		redirect(){
			let session=this.testSession();
			if(session != "success"){
				//necesario para evitar error  "NavigationDuplicated: Avoided...", esto ocurre si se realiza un push() redirigiendo al mismo lugar donde se encuentra, si devuelve null es que se encuentra en la raíz
				if(this.$route.name!=null){
					console.log("fuera de raíz")
					this.$router.push("/");
				}
				//volvemos a mostrar el dialogo de session para no acceder sin registrarse o loguearse
				this.changeDialog(true)
			}
			
						
		}
	}
}
</script>
<style>
/*
.dialog-alert-email .md-ripple{
	color:white;
	background-color:red;
}
.md-dialog.dialog_spinner{
	background-color:rgba(255,255,255);
	margin-top:50px;
	position:absolute;
	z-index:5;
}
.dialog_spinner>:first-child {
	background:transparent !important;
	box-shadow:none;
}
*/
</style>
