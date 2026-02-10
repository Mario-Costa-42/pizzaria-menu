function changeQuantity(button, amount) {
    const span = button.parentElement.querySelector("span");
    let value = parseInt(span.textContent) + amount;
    if (value < 0) value = 0;
    span.textContent = value;
  }

    window.onload = function () {
    if (typeof atualizarBadgeCarrinho === "function") {
      atualizarBadgeCarrinho();
    }

    const editIndex = localStorage.getItem("editarIndex");
    if (editIndex === null) return;

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const item = carrinho[editIndex];

    if (!item || item.produto !== "Acompanhamento") return;

    document.querySelectorAll(".item").forEach(el => {
      const nome = el.querySelector(".item-name").textContent;
      if (nome === item.nome) {
        el.querySelector(".quantity-control span").textContent = item.quantidade;
      }
    });

    document.querySelector(".btn-carrinho").textContent = "Salvar Alterações";
  };


  function adicionarCarrinho() {
       const items = document.querySelectorAll(".item");
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const editIndex = localStorage.getItem("editarIndex");

    // 🔴 REMOVE item antigo se estiver editando
    if (editIndex !== null) {
      carrinho.splice(editIndex, 1);
      localStorage.removeItem("editarIndex");
    }

    items.forEach(item => {
      const nome = item.querySelector(".item-name").textContent;
      const precoTexto = item.querySelector(".item-price")
        .textContent.replace("R$", "")
        .replace(",", ".")
        .trim();
      const preco = parseFloat(precoTexto);
      const quantidade = parseInt(
        item.querySelector(".quantity-control span").textContent
      );

      if (quantidade > 0) {
        carrinho.push({
          produto: "Acompanhamento",
          nome,
          quantidade,
          preco,
          subtotal: quantidade * preco
        });
      }
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    window.location.href = "carrinho.html";
  }

  document
    .querySelector(".btn-carrinho")
    .addEventListener("click", adicionarCarrinho);

  // atualiza badge se você já usa isso no utils.js
  if (typeof atualizarBadgeCarrinho === "function") {
    atualizarBadgeCarrinho();
  }
