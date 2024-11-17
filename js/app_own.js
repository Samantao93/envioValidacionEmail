document.addEventListener('DOMContentLoaded',() => {

    objeto = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    const inputEmail = document.querySelector("#email");
    const inputCC = document.querySelector("#cc");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#formulario");
    const btnEnviar = document.querySelector("button[type=submit]");
    const btnReset = document.querySelector("button[type=reset]");        

    inputEmail.addEventListener('blur',readValue);
    inputCC.addEventListener('blur',readValue);
    inputAsunto.addEventListener('blur',readValue);
    inputMensaje.addEventListener('blur',readValue);
    formulario.addEventListener('submit',activarSpinner);
    btnReset.addEventListener('click', (e) => {
        e.preventDefault();
        resetearTodo();
    })


    function readValue (e) {
        const id = e.target.id
        if(id !== 'cc') {
            objeto[id] = e.target.value
        }
        
        const referencia = e.target.parentElement;
        const alerta = referencia.querySelector('.alerta');
        const mensaje = document.createElement('P');
        mensaje.classList.add("bg-red-600","p-2", "text-white","text-center","alerta");

        if(id !== 'cc' && e.target.value.trim()===''){
            mensaje.textContent = `El campo ${id} es obligatorio`;
            comprobarAlerta(alerta,referencia,mensaje);
            objeto[id] = ''
            activarEnviar(objeto);
            return;
        }

        if((id === 'email' || id === 'cc') && !validarEmail(e.target.value.trim())){
            mensaje.textContent = `El campo ${id} no es válido`;
            comprobarAlerta(alerta,referencia,mensaje);
            if(id !== 'cc') {
                objeto[id] = ''
                activarEnviar(objeto);
            }
            return;
        }       
        console.log(objeto)

        limpiarAlerta(referencia);
        
        activarEnviar(objeto);        
    }

    function activarEnviar(objeto) {
        if(Object.values(objeto).includes('')){
            btnEnviar.classList.add('opacity-50');
            btnEnviar.disabled=true;
            return;
        }
        btnEnviar.classList.remove('opacity-50');
        btnEnviar.disabled=false;
    }

    function comprobarAlerta(alerta,referencia,mensaje){
        if(!alerta){
            referencia.appendChild(mensaje);
        } else {
            limpiarAlerta(referencia);
            referencia.appendChild(mensaje);
        } 
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.alerta');
        if(alerta){
            alerta.remove();
        }
    }
    
    function validarEmail(texto){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(texto);        
    }

    function resetearTodo(){
        objeto.email = '';
        objeto.asunto = '';
        objeto.mensaje = '';

        formulario.reset();

        activarEnviar(objeto);
        
        const alertas = document.querySelectorAll('.alerta');
        alertas.forEach(alerta => alerta.remove());
    }
    
    function activarSpinner(e) {
        e.preventDefault();
        const spinner = document.querySelector('.spinner');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.add('hidden');
            const mensajeFinal = document.createElement('P');
            mensajeFinal.classList.add('bg-green-500','text-white','font-bold','text-center','uppercase');
            mensajeFinal.textContent = 'El mensaje se ha enviado correctamente';
            formulario.appendChild(mensajeFinal);
            resetearTodo();

            setTimeout(() => {
                formulario.removeChild(mensajeFinal);

            }, 3000);
          }, 3000);
        
         
    }

})