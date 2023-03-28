const form = document.getElementById('novoItem') // Inputs
const lista = document.getElementById('lista') // Lista HTML
let itens = JSON.parse(localStorage.getItem('itens')) || [] // Lista js

// Se houver algo no localStorage é carregado para a página
if(localStorage.length > 0){
    itens.forEach(element => {
        criaElemento(element)
    });
}

// Adiciona comportamento no submit do formulário
form.addEventListener('submit', (evento) => {
    evento.preventDefault() // O submit possui um comportamento padrão que pode interferir no restante do código

    // Pega os valores, criar um objeto e verifica se o item já existe na lista de itens
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    const posLista = itens.findIndex( elemento => elemento.nome === itemAtual.nome)

    // Se o elemento não existir ele é criado e adicionado na pilha
    if(posLista === -1){
        itens.push(itemAtual)
        criaElemento(itemAtual)
    } else {
        // Se o elemento existir ele é atualizado
        atualizaElemento(posLista, itemAtual.quantidade)
        atualizaLista(posLista, itens[posLista].quantidade)
    }

    // Salva alterações no localStorage
    localStorage.setItem("itens", JSON.stringify(itens))
    
    // Limpa os campos do formulário
    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item){
    const lista = document.getElementById('lista')
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome
    novoItem.appendChild(criaBotaoDeleta())

    lista.appendChild(novoItem)
}

function criaBotaoDeleta(){
    const botaoDeleta = document.createElement('button')
    botaoDeleta.innerText = 'x'
    botaoDeleta.addEventListener('click', function() { ///////////
        deletaElemento(this)
    })
    return botaoDeleta
}

function deletaElemento(tag){
    const texto = tag.previousSibling.textContent
    const element = itens.findIndex( e => e.nome === texto)
    itens.splice(element, 1)
    localStorage.setItem("itens", JSON.stringify(itens))
    tag.parentNode.remove()
}

function atualizaElemento(posicao, quantidade) {
    itens[posicao].quantidade = Number(itens[posicao].quantidade) + Number(quantidade)
}

function atualizaLista(posicao, quantidade){
    lista.children[posicao].querySelector('strong').innerText = quantidade
}
/*
function verificaLista(nome){
    for(let i = 0; i < itens.length; i++){
        if(itens[i].nome === nome){
            return i
        }
    }
    return -1
}
*/

/* const objetos = [
    {
        nome: "livro",
        quantidade: 2
    },
    {
        nome: "bolsa",
        quantidae: 3
    }
]

console.log(objetos)
console.log(objetos.findIndex( e => e.nome === "bols")) */