const btnNewNota = document.querySelector('.btn');
const container = document.querySelector('.container');
const nota = document.querySelector('.nota');
const btnDelete = document.querySelector('.btn-delete');
let listaNotas = [];

btnNewNota.addEventListener('click', () => newNota());

function newNota(){
    const note = document.createElement('div');

    const nota = {
        id : Date.now(),
        texto :note,
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
                <textarea class="titulo" style="resize:none" maxlength="14">titulo nota</textarea>
                <button class="material-symbols-outlined btn-delete">delete</button>
                <button class="material-symbols-outlined btn-edit">edit</button>
            </div>
            <div class="note-body">
               <textarea class="tuNota"></textarea>
            </div>
            `;
            const btnDelete = note.querySelector('.btn-delete')
            btnDelete.addEventListener('click', (e) => {
                note.remove();
                id = e.target.parentElement.parentElement.dataset.notaId;
                //filter trae todo los elementos execpto el filtrado creando una nueva array sin el elemento seleccionado
                listaNotas = listaNotas.filter(nota => nota.id != id);
                
                console.log(listaNotas);
            })
            const text = note.querySelector('.tuNota');
            const btnEdit = note.querySelector('.btn-edit');
            btnEdit.addEventListener('click', () => {
                text.classList.toggle('hidden')
            })

            container.appendChild(note);
        })
    }
}

function borrarLista(){
    while(listaNotas.firstChild){
        listaNotas.removeChild(listaNotas.firstChild);
    }
    console.log(listaNotas);
}