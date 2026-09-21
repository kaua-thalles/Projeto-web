const carrinho =
    JSON.parse(localStorage.getItem("carrinho")) || [];


// ELEMENTOS DO HTML

const quantidadeTotal =
    document.getElementById("quantidade-total");

const subtotalElemento =
    document.getElementById("subtotal");

const descontoElemento =
    document.getElementById("desconto");

const totalFinalElemento =
    document.getElementById("total-final");

const parcelamentoElemento =
    document.getElementById("parcelamento");

const carrinhoVazio =
    document.getElementById("carrinho-vazio");

const botaoCheckout =
    document.getElementById("botao-checkout");


// FORMATAR VALORES EM REAL

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}


// CALCULAR QUANTIDADE TOTAL

function calcularQuantidadeTotal() {

    let quantidade = 0;

    for (
        let i = 0;
        i < carrinho.length;
        i++
    ) {

        quantidade++;
    }

    return quantidade;
}


// CALCULAR SUBTOTAL

function calcularSubtotal() {

    let subtotal = 0;

    for (
        let i = 0;
        i < carrinho.length;
        i++
    ) {

        subtotal += Number(
            carrinho[i].preco
        );

    }

    return subtotal;
}


// CALCULAR DESCONTO

function calcularDesconto(subtotal) {

    let desconto = 0;


    if (subtotal >= 300) {

        desconto =
            subtotal * 0.10;

    } else {

        desconto = 0;

    }


    return desconto;
}


// CALCULAR TOTAL

function calcularTotal(
    subtotal,
    desconto
) {

    return subtotal - desconto;
}


// ATUALIZAR RESUMO

function atualizarResumo() {

    const quantidade =
        calcularQuantidadeTotal();


    const subtotal =
        calcularSubtotal();


    const desconto =
        calcularDesconto(
            subtotal
        );


    const total =
        calcularTotal(
            subtotal,
            desconto
        );


    quantidadeTotal.textContent =
        quantidade;


    subtotalElemento.textContent =
        formatarMoeda(
            subtotal
        );


    descontoElemento.textContent =
        formatarMoeda(
            desconto
        );


    totalFinalElemento.textContent =
        formatarMoeda(
            total
        );


    // PARCELAMENTO

    if (total > 0) {

        const parcela =
            total / 6;

        parcelamentoElemento.textContent =
            "ou até 6x de " +
            formatarMoeda(parcela) +
            " sem juros";

    } else {

        parcelamentoElemento.textContent =
            "ou até 6x sem juros";
    }


    // VERIFICAR CARRINHO VAZIO

    if (quantidade === 0) {

        carrinhoVazio.style.display =
            "block";

        botaoCheckout.disabled =
            true;

        botaoCheckout.style.opacity =
            "0.5";

        botaoCheckout.style.cursor =
            "not-allowed";

    } else {

        carrinhoVazio.style.display =
            "none";

        botaoCheckout.disabled =
            false;

        botaoCheckout.style.opacity =
            "1";

        botaoCheckout.style.cursor =
            "pointer";
    }

}


// BOTÃO CHECKOUT

botaoCheckout.addEventListener(
    "click",
    function () {

        const quantidade =
            calcularQuantidadeTotal();


        if (quantidade === 0) {

            alert(
                "Seu carrinho está vazio."
            );

            return;
        }


        const subtotal =
            calcularSubtotal();


        const desconto =
            calcularDesconto(
                subtotal
            );


        const total =
            calcularTotal(
                subtotal,
                desconto
            );


        alert(
            "Compra pronta para finalizar!\n\n" +

            "Subtotal: " +
            formatarMoeda(subtotal) +

            "\nDesconto: " +
            formatarMoeda(desconto) +

            "\nTotal: " +
            formatarMoeda(total)
        );

    }
);


// INICIALIZAR

atualizarResumo();