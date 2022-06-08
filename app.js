const btnNewNota = document.querySelector('.btn');
const container = document.querySelector('.container');
const btnDelete = document.querySelector('.btn-delete');
let listaNotas = [];

btnNewNota.addEventListener('click', () => newNota());

document.addEventListener('DOMContentLoaded', () => {
    listaNotas = JSON.parse( localStorage.getItem('listaNotas') ) || []  ;
    
    crearHtml();
});

function newNota(){
    const note = document.createElement('div');
    const nota = {
        id : Date.now(),
        newNote :note, 
    }
    listaNotas = [...listaNotas, nota]; 

    crearHtml();
}

function crearHtml(){
    borrarLista();
    if(listaNotas){
        while(container.firstChild){
            container.removeChild(container.firstChild);
        }
        listaNotas.forEach(nota => {
            
            const note = document.createElement('div'); 
            note.classList.add('nota');
            note.dataset.notaId = nota.id;    
            note.innerHTML = `
            <div class="tools">
                <textarea class="titulo" style="resize:none" maxlength="14">Titulo...</textarea>
                <button class="material-symbols-outlined btn-delete">delete</button>
                <button class="material-symbols-outlined btn-edit">edit</button>
            </div>
            <div class="note-body">
            <textarea class="tuNota" id="contenido" style="resize:none" maxlength="600" spellcheck="false"></textarea>
            </div>
            `;

            const noteBody = note.querySelector('.note-body');
            let text = noteBody.querySelector('.tuNota');
            noteBody.addEventListener('input', (e) =>{
                e.preventDefault;
                let text = noteBody.querySelector('.tuNota');
                nota['text'] = text.value;
            })
            
            const btnDelete = note.querySelector('.btn-delete')
            btnDelete.addEventListener('click', (e) => {
                note.remove();
                id = e.target.parentElement.parentElement.dataset.notaId;
                //filter trae todo los elementos excepto el filtrado creando una nueva array sin el elemento seleccionado
                listaNotas = listaNotas.filter(nota => nota.id != id)
                eliminar();
    
                console.log(listaNotas);
                
            })

            const btnEdit = note.querySelector('.btn-edit');
            btnEdit.addEventListener('click', () => {
                text.classList.toggle('hidden')
            })
            
            localStorage.setItem('listaNotas', JSON.stringify(listaNotas));    
        
            text.value = nota['text'] || '';
            container.appendChild(note);
        })
    }
}

function eliminar(){
    localStorage.setItem('listaNotas', JSON.stringify(listaNotas));
}

function borrarLista(){
    while(listaNotas.firstChild){
        listaNotas.removeChild(listaNotas.firstChild);
    }
    console.log(listaNotas);
}

