const lista = document.getElementById('lista')
const apiUrl = 'http://localhost:3000/filmes';

let edicao = false;
let idEdicao = 0;

let nome = document.getElementById('nome');
let genero = document.getElementById('genero');
let imagem = document.getElementById('imagem');
let nota = document.getElementById('nota');

const getFilmes = async () => {

    const response = await fetch(apiUrl)

    const filmes = await response.json();

    console.log(filmes);


    filmes.map((filme) => {
        lista.insertAdjacentHTML('beforeend', `
        <div class="col">
            <div class="card">
            <h5 class="card-title">${filme.nome}</h5>
            <img src="${filme.imagem}" class="card-img-top">
            <div class="card-body">
                <span class="badge bg-primary">${filme.nota}</span>
                <span class="badge bg-primary">${filme.genero}</span>
                <div>
                    <button class="btn btn-primary" onclick="editFilme('${filme.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="deleteFilme('${filme.id}')">Excluir</button>
                </div>
            </div>
            </div>
        </div>
        `)
    })
}


const submitForm = async (event) => {

    event.preventDefault();

    const filme = {
        nome: nome.value,
        genero: genero.value,
        imagem: imagem.value,
        nota: parseFloat(nota.value),
    }


    if(edicao) {
        putFilme(filme, idEdicao);
    } else {
        createFilme(filme);
    }

    clearFields();
    lista.innerHTML = '';
}

const createFilme = async(filme) => {
    
    const request = new Request(`${apiUrl}/add`, {
        method: 'POST',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })


    const response = await fetch(request);

    const result = await response.json();
    
    alert(result.message)
    
    getFilmes();

}

const putFilme = async(filme, id) => {
    
    const request = new Request(`${apiUrl}/edit/${id}`, {
        method:  'PUT',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    
    const response = await fetch(request);

    const result = await response.json();
    
    alert(result.message)
    edicao = false;
    idEdicao = 0;
    getFilmes();
}



const deleteFilme = async (id) => {
    const request = new Request(`${apiUrl}/delete/${id}`, {
        method: 'DELETE'
    })

    const response = await fetch(request);
    const result = await response.json();

    alert(result.message);
    
    lista.innerHTML = '';
    getFilmes();
}



const getFilmeById = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
}



const editFilme = async (id) => {
 
    edicao = true;
    idEdicao = id;

    const filme = await getFilmeById(id);

    nome.value = filme.nome;
    genero.value =  filme.genero;
    imagem.value = filme.imagem;
    nota.value = filme.nota;
}


const clearFields = () => {
    nome.value = '';
    genero.value = '';
    imagem.value = '';
    nota.value = '';
}

getFilmes();

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Desenvolvido por Felipe Ortiz" , "Projeto 1 Módulo Full Stack"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});