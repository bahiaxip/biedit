export default {
	//métodos para el cambio de color de los botones activados o desactivados del componente Effect	
	methods:{

		//devuelve al color inicial un botón pintado pero solo de los botones 
		//pasado por parámetro (rotate: solo los botones de rotación ,filter: solor el filter,...)
		//Nota: El botón filter y polygon se pintan al abrir el desplegable pero 
		//sin activarse el efecto, mientras que el reflex y el rotate se pintan y se activan al 
		//pulsar el botón, por eso se requiere realizar el switch-case y solo se comprueba
		//de un solo tipo
		desactiveBtnByType(type){
			let btn=this.btnActive;
			switch (type){
				case 'rotate':
					//testrotate
					if(btn.rotateLeft)
						btn.rotateLeft=false;
					else if(btn.rotateRight)
						btn.rotateRight=false;
					else if(btn.rotateBottom)
						btn.rotateBottom=false;					
					break;
				case 'reflex':					
					//testreflex
					if(btn.reflexVertical)
						btn.reflexVertical=false;
					else if(btn.reflexHorizontal)
						btn.reflexHorizontal=false;					
					break;
				case 'filter':
					//test filter
					if(btn.filter)
						btn.filter=false;
					break;
				case 'polygon':
					//test polygon
					if(btn.polygon)
						btn.polygon=false;
					break;

			}
		},


		//revisa el color de los botones del grupo de botones 1(rotate,reflex,filter,
		//polygon, effect) y si algún botón está pintado pero su efecto no está activado
		//lo devuelve al color inicial.
		//Nota: Como el rotate y el reflex no pueden asignarse los 2 a la vez
		//se pasa el parámetro type	(que puede ser filter o polygon), si no existe
		//parámetro se tendrán en cuenta todos, si existe no se tendrá 
		//en cuenta ni el rotate ni el reflex, ni el botón del propio parámetro. 
		testGButton1(type=null){

			if(!type){
				if(this.rotateActivated)
					this.desactiveBtnByType('rotate');			
				if(this.reflexActivated)
					this.desactiveBtnByType('reflex');	
			}
			//despinta el filter y el polygon si están pintados pero no activados
			if(type!='filter')
				if(!this.filterActivated )
					this.desactiveBtnByType('filter');
			if(type!='polygon')
				if(!this.polygonActivated)
					this.desactiveBtnByType('polygon');
			if(type!='effect')				
				this.btnActive.effect=false;
			//si el parámetro es dials (proviene de los desplegables speed-dial)
			//no se ejecuta el método hideDials() ya que al abrir el desplegable, lo 
			//volvería a cerrar
			if(type!='dials')
				//desactiva 
				this.hideDials();
		},
		//devuelve una lista con los botones que tienen el color pintado 		
		testBtn(param=null){
			let dato=[];
			for(let btn in this.btnActive){
				if(param=='activated'){
					//si es true (si está pintado)
					if(this.btnActive[btn])					
						dato.push(btn);
				}else
					dato.push(btn);
			}			
			if(dato.length>0)						
				return dato;
			return false;
		},
		//desactiva el color de cada botón de la lista pasada como parámetro
		//(devuelta por testBtn())
		desactiveBtn(listBtn){
			listBtn.forEach((btn) => {
				this.btnActive[btn]=false;
			})
		},
	}
}