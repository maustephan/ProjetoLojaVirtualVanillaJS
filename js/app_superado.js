const produtos = [
    { id: 1, nome: "TV", imagem: 'https://picsum.photos/200', preco: 2999, quantidade: 3 },
    { id: 2, nome: "CELULAR", imagem: 'https://picsum.photos/200/', preco: 3000, quantidade: 4 },
    { id: 3, nome: "BORRACHA", imagem: 'https://picsum.photos/200//', preco: 0.8, quantidade: 25  },
    { id: 4, nome: "COMPUTADOR", imagem: 'https://picsum.photos/200///', preco: 2200, quantidade: 5 },
    { id: 5, nome: "HD", imagem: 'https://picsum.photos/200////', preco: 200, quantidade: 5 },
    { id: 6,nome: "MOUSE", imagem: 'https://picsum.photos/200/////', preco: 60, quantidade: 30 },
    // { id: 7, nome: "TECLADO GAMER", imagem: 'https://picsum.photos/200//////', preco: 170, quantidade: 5 },
    // { id: 8,nome: "MONITOR", imagem: 'https://picsum.photos/200///////', preco: 1999, quantidade: 2 },
    // { id: 9, nome: "FONE DE OUVIDO", imagem: 'https://picsum.photos/200////////', preco: 199, quantidade: 6},
    // { id: 10, nome: "CARREGADOR CELULAR", imagem: 'https://picsum.photos/200/////////', preco: 15, quantidade: 20 },
    // { id: 11, nome: "CAIXAS DE SOM", imagem: 'https://picsum.photos/200//////////', preco: 48, quantidade: 10  },
    // { id: 12, nome: "MEMORIA", imagem: 'https://picsum.photos/200///////////', preco: 400, quantidade: 4 },
    // { id: 13, nome: "HD SSD", imagem: 'https://picsum.photos/200////////////', preco: 370, quantidade: 7 },
    // { id: 14,nome: "PLAYSTATION 4", imagem: 'https://picsum.photos/200////////', preco: 10, quantidade: 5 },
    { id: 15, nome: "IPHONE 11", imagem: 'https://picsum.photos/200//////////', preco: 7000, quantidade: 3 },
    { id: 16,nome: "ROTEADOR", imagem: 'https://picsum.photos/200/////////////', preco: 230, quantidade: 10 }
];

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

let hoje = new Date();
let mensagem = document.getElementById('saudacao');
let btnBuscar = document.getElementById('btnBuscar');
let campoBusca = document.getElementById('search');
let btnAdicionar = document.getElementById('btnAdicionar');
let btnListar = document.getElementById('btnListar');

localStorage.setItem('produtos', JSON.stringify(produtos));

class ProdutosPrateleira {
    constructor(id, nome, imagem, preco, quantidade) {
        this.id = id
        this.nome = nome;
        this.imagem = imagem;
        this.preco = parseFloat(preco).toFixed(2);
        this.quantidade = quantidade;
    }

    adicionaElementoDom(elemento) {
        elemento.innerHTML = `
            <img src=${this.imagem}>
            <h3>${this.nome}</h3>
            <p>R$${this.preco}</p>
            Quantidade:
            `

        const input = document.createElement('input');
        input.id = 'qtdProduto';
        input.type = 'number';
        input.value = 1;
        input.min = 1;
        
        elemento.appendChild(input);

        const button = document.createElement('button');
        button.className = 'btn btn-primary';
        button.innerText = 'Adicionar Carrinho';

        
        
        button.addEventListener('click', () => {
            
            const result = carrinho.find( (a) => a.id === this.id );                 
            if ( result ){
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'O produto já existe no seu carrinho de compras!!!',
                    // footer: '<a href="">Why do I have this issue?</a>'
                  })
            } else {
                carrinho.push({
                    id: this.id,
                    nome: this.nome,
                    preco: this.preco,
                    quantidade: input.value
                });
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Produto adiconado ao carrinho de compras!!!',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }

            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            carrinhoCompras();
        })
        
        elemento.appendChild(button);
        
    }
}

function listarProdutos(){

    const produtosStorage = JSON.parse(localStorage.getItem('produtos'));
    const prateleira = document.getElementById('prateleira');

    prateleira.innerHTML ='';

        for (const produto of produtosStorage) {
            const prodPrateleira = new ProdutosPrateleira(produto.id, produto.nome, produto.imagem, produto.preco);

            const div = document.createElement('div');
            div.className = 'produto';
            prodPrateleira.adicionaElementoDom(div);

            prateleira.appendChild(div);
            
        }
}


function carrinhoCompras(){
    const carrinhoElemento = document.getElementById('carrinho');
    let totalCarrinho = document.getElementById('total');
    
    carrinhoElemento.innerHTML = '';
    let total = 0;
    let item = 1;
    
    
    for (const produto of carrinho) {
        let totalProdutos = (parseFloat(produto.preco))*(parseInt(produto.quantidade));
        
        let tr = document.createElement('tr');
        tr.innerHTML = `<tr><td>${item}</td>
        <td>${produto.nome}</td>
        <td>R$${produto.preco}</td>
        </tr>`;
        tr.className = 'produtoCarrinho';

        let inputCarrinho = document.createElement('input');
        let td = document.createElement('td');
        inputCarrinho.value = produto.quantidade;
        inputCarrinho.className = 'input';
        inputCarrinho.id = 'qtdCarrinhoProduto';
        inputCarrinho.min = '1';
        inputCarrinho.type = 'number';
        
        let tdTotal = document.createElement('td');
        tdTotal.innerHTML = `<td>R$${totalProdutos.toFixed(2)}</td>`

        let btnExclui = document.createElement('td');      
        btnExclui.innerHTML = '<i class="fa-solid fa-xmark excluir"></i>';
        btnExclui.id = 'excluir'; 
        
             
        btnExclui.addEventListener('click',()=>{
            const posicao = carrinho.find((o) => {
                return o.id === produto.id;
            });
            carrinho.splice(carrinho.indexOf(posicao),1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            carrinhoCompras();
        });

        inputCarrinho.addEventListener('change', ()=>{
            const posicao = carrinho.find((o) => {
                return o.id === produto.id;
            });
        
            carrinho[carrinho.indexOf(posicao)].quantidade = inputCarrinho.value;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            carrinhoCompras();
        });
          
        carrinhoElemento.appendChild(tr);
        tr.appendChild(td);
        td.appendChild(inputCarrinho);        
        tr.appendChild(tdTotal);
        tr.appendChild(btnExclui);
        
        total = carrinho.reduce( ( soma, produto ) => soma + (parseFloat(produto.preco)*(parseInt(produto.quantidade))), 0);

        item++;
        
    }   
    
    let limpaCarrinho = document.getElementById('apagarCarrinho');
    limpaCarrinho.addEventListener('click', () => {
        Swal.fire({
            title: 'Limpar o carrinho de compras???',
            text: "Você tem certeza que deseja limpar seu carrinho.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, Apagar Carrinho!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Carrinho Apagado!',
                'Seu carrinho está vazio.',
                'success'
                )
                carrinhoElemento.innerHTML = `<p>Carrinho Vazio - Adicione produtos no carrinho!!!</p>`;
                carrinho = [];
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                totalCarrinho.innerHTML = `O valor total da sua compra é de R$ 0.00`;
            }
          })
    });
    
    totalCarrinho.innerHTML = `O valor total da sua compra é de R$ ${total.toFixed(2)}`;

}


btnBuscar.addEventListener('click', buscarProdutos);
campoBusca.addEventListener('click', () => {pesquisa.innerHTML = '';});
pesquisa.addEventListener('click', () => {pesquisa.innerHTML = '';});
btnAdicionar.addEventListener('click', cadastroProduto);




function saudacao(){
    let hora = hoje.getHours();
    let nome = localStorage.getItem('seuNome');
    

    if ( !nome ){
        nome = prompt(`Olá, seja bem vindo a Loja InfoTEC, digite seu nome:`);
        localStorage.setItem('seuNome', nome);
    }
    
    if ( hora >= 6 && hora <= 11 ){
        mensagem.innerHTML = `<h5>Olá ${nome}, Bom dia!!!</h5>`;
    } else if ( hora >= 12 && hora <= 17 ){
        mensagem.innerHTML = `<h5>Olá ${nome}, Boa tarde!!!</h5>`;
    } else if ( hora >= 18 && hora >= 5 ){
        mensagem.innerHTML = `<h5>Olá ${nome}, Boa noite!!!</h5>`;
    }

}

function buscarProdutos(e){
    e.preventDefault();
        
    let nomeProduto = document.getElementById('search').value;
    let pesquisa = document.getElementById('pesquisa');
    nomeProduto = nomeProduto.toUpperCase();
    let consulta = produtos.find((consultaProduto) => consultaProduto.nome === nomeProduto);

    if ( consulta !== undefined ) {
        
        pesquisa.innerHTML = `<h2>Produto encontrado: ${consulta.nome}<br>Valor R$ ${consulta.preco.toFixed(2)}</h2>`;
        pesquisa.style = 'background-color:rgb(130, 255, 159);';
        
        // carrinhoCompras()
    } else {
        pesquisa.innerHTML = '<h2>Produto não encontrado</h2>';
        pesquisa.style = 'background-color: rgb(246, 111, 111);';
        
    }
}


function cadastroProduto(){
    let idProduto = document.getElementById('id');
    let nomeProduto = document.getElementById('nome');
    let precoProduto = document.getElementById('preco');
    let imagemProduto = document.getElementById('imagemLink');
    let quantidadeProduto = document.getElementById('quantidade');
    let erroId = document.getElementById('erroId');

    idProduto = parseInt(idProduto.value);

    
    if ( idProduto && nomeProduto.value && precoProduto.value && imagemProduto.value && quantidadeProduto.value ){
        
        let consulta = produtos.find((consultaId) => consultaId.id === idProduto);
        
        if ( consulta ){
            // erroId.innerText = "Produto Id Existente, escolha outro Id para o produto.";
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Produto Id Existente, escolha outro Id para o produto.',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
        } else {
            produtos.push({id: idProduto, nome: nomeProduto.value.toUpperCase(), imagem: imagemProduto.value.toLowerCase(), preco: parseFloat(precoProduto.value), quantidade: parseInt(quantidadeProduto.value)});
        
            // erroId.innerText = "";
            
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Produto adiconado com sucesso!!!',
                showConfirmButton: false,
                timer: 1500
              })

            localStorage.setItem('produtos', JSON.stringify(produtos));
            listarProdutos()
            
        }

    } else {
        // erroId.innerText = "Favor inserir valores nos campos, para cadastro!!!";
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Favor inserir valores nos campos, para cadastro!!!',
          })
    }
    idProduto.value = 0;
    nomeProduto.value = '';
    precoProduto.value = '';
    imagemProduto.value = '';
    quantidadeProduto.value = '';

}

const btnMostrarCarrinho = document.getElementById('mostrarCarrinho');

btnMostrarCarrinho.addEventListener('click', ()=>{
    let modal = document.getElementById('modal');
    modal.className = "modal fade modal-lg show";
    modal.style = "display: block;";

    carrinhoCompras();

    let btnFecharModal = document.getElementById('fecharModal');
    btnFecharModal.addEventListener('click', ()=>{
        modal.className = "modal modal-lg fade";
        modal.style = "display: none;";
    })
    
})


saudacao();
carrinhoCompras();
listarProdutos();
