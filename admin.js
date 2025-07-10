const form = document.getElementById('formproduto');
const lista = document.getElementById('listadeprodutos');
const imagemInput = document.getElementById('imagem');
let produtos = [];
let indiceEditando = null;

imagemInput.addEventListener('change', function () {
    const file = imagemInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            const preview = document.getElementById('preview');
            if (preview) {
                preview.src = reader.result;
                preview.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
    }
});

function renderizarProdutos() {
    lista.innerHTML = '';
    produtos.forEach((produto, index) => {
        const div = document.createElement('div');
        div.style.border = '1px solid #ccc';
        div.style.margin = '10px 0';
        div.style.padding = '10px';

        div.innerHTML = `
            <strong>${produto.nome}</strong> - ${produto.marca}<br>
            R$ ${produto.preco}<br>
            Loja: ${produto.seletorloja}<br>
            <img src="${produto.imagem}" alt="${produto.nome}" style="max-width: 100px;"><br>
            ${produto.descricao}<br>
            <button onclick="editarProduto(${index})">Editar</button>
            <button onclick="excluirProduto(${index})">Excluir</button>
        `;
        lista.appendChild(div);
    });
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const file = imagemInput.files[0];

    if (!file) {
        alert("Selecione uma imagem para o produto.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const produto = {
            nome: document.getElementById('nome').value,
            marca: document.getElementById('marca').value,
            imagem: reader.result, // imagem base64
            preco: document.getElementById('preco').value,
            descricao: document.getElementById('descricao').value,
            seletorloja: document.getElementById('seletorloja').value
        };

        if (indiceEditando !== null) {
            produtos[indiceEditando] = produto;
            indiceEditando = null;
        } else {
            produtos.push(produto);
        }

        renderizarProdutos();
        form.reset();

       
        const preview = document.getElementById('preview');
        if (preview) preview.style.display = 'none';
    };

    reader.readAsDataURL(file);
});

function excluirProduto(index) {
    produtos.splice(index, 1);
    renderizarProdutos();
}

function editarProduto(index) {
    const produto = produtos[index];

    document.getElementById('nome').value = produto.nome;
    document.getElementById('marca').value = produto.marca;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('descricao').value = produto.descricao;
    document.getElementById('seletorloja').value = produto.seletorloja;


    alert("Edite os outros campos e selecione a imagem novamente.");

    indiceEditando = index;

    const preview = document.getElementById('preview');
    if (preview) {
        preview.src = produto.imagem;
        preview.style.display = 'block';
    }
}
