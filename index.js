document.addEventListener("DOMContentLoaded", function () {
    const cepInput = document.getElementById("cep");

    cepInput.addEventListener("input", function () {
        let valor = cepInput.value.replace(/\D/g, "");
        if (valor.length > 5) {
            valor = valor.slice(0, 5) + "-" + valor.slice(5, 8);
        }
        cepInput.value = valor;
    });
});

cepInput.addEventListener("blur", function () {
    if (cepInput.value.length < 9) {
        alert("CEP incompleto. Digite no formato 00000-000.");
    }
});

const campoBusca = document.getElementById('campodebusca');
const produtos = document.querySelectorAll('.produtocard');

campoBusca.addEventListener('input', function () {
    const termo = this.value.trim().toLowerCase();

    produtos.forEach(produto => {
        const nome = produto.dataset.nome?.toLowerCase() || '';
        const marca = produto.dataset.marca?.toLowerCase() || '';
        const corresponde = nome.includes(termo) || marca.includes(termo);
        produto.style.display = corresponde || termo === '' ? 'block' : 'none';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const seletor = document.getElementById('seletorloja');
    const lojaSelecionada = document.getElementById('loja-selecionada');
    const lojaSalva = localStorage.getItem('lojaSelecionada');
    if (lojaSalva) {
        lojaSelecionada.textContent = `Consultando a loja de: ${lojaSalva}`;
        seletor.value = lojaSalva;
    }

    seletor.addEventListener('change', function () {
        const loja = seletor.value;
        localStorage.setItem('lojaSelecionada', loja);
        lojaSelecionada.textContent = `Consultando a loja de: ${loja}`;
    });
});

const modalRastreio = document.getElementById("meuModal");
const btnAbrirModalRastreio = document.getElementById("abrirModal");
const spanFecharRastreio = document.getElementsByClassName("fechar")[0];
const inputCodigoRastreamento = document.getElementById("codigoRastreamento");
const btnRastrear = document.getElementById("rastrear");

if (btnAbrirModalRastreio) {
    btnAbrirModalRastreio.onclick = function(event) {
        event.preventDefault();
        modalRastreio.style.display = "flex";
        inputCodigoRastreamento.focus();
    }
}

if (spanFecharRastreio) {
    spanFecharRastreio.onclick = function() {
        modalRastreio.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == modalRastreio) {
        modalRastreio.style.display = "none";
    }
}

if (btnRastrear) {
    btnRastrear.onclick = function() {
        const codigo = inputCodigoRastreamento.value.trim();
        if (codigo) {
            window.open(`https://rastreamento.correios.com.br/app/index.php?id=${codigo}`, '_blank');
            alert(`Rastreando o código: ${codigo}`);
            modalRastreio.style.display = "none";
        } else {
            alert("Por favor, insira um código de rastreamento.");
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5, 8);
            }
            e.target.value = value;
        });
    }

    const seletorLoja = document.getElementById('seletorloja');
    const lojaSelecionadaDiv = document.getElementById('loja-selecionada');

    if (seletorLoja && lojaSelecionadaDiv) {
        const savedStore = localStorage.getItem('selectedStore');
        if (savedStore) {
            seletorLoja.value = savedStore;
            lojaSelecionadaDiv.textContent = `Loja selecionada: ${savedStore}`;
        } else {
            lojaSelecionadaDiv.textContent = 'Nenhuma loja selecionada.';
        }

        seletorLoja.addEventListener('change', function() {
            const selectedStore = seletorLoja.value;
            lojaSelecionadaDiv.textContent = `Loja selecionada: ${selectedStore}`;
            localStorage.setItem('selectedStore', selectedStore);
        });
    }

    let slideIndex = 0;
    const slides = document.querySelectorAll('.carrossel .textos');
    if (slides.length > 0) {
        function showSlides() {
            slides.forEach((slide, index) => {
                slide.style.display = 'none';
            });
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            slides[slideIndex - 1].style.display = 'block';
            setTimeout(showSlides, 5000);
        }
        showSlides();
    }
});

