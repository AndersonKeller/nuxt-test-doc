import { createApp } from "vue";
// BUG: FALTA IMPORTAR O STORAGE E O CONFIG
createApp.prototype.$regras = new createApp({
  methods: {
    add(item, apre) {
      let res = [];

      if (item.qtd >= this.$config.regrasDoNegocio.limitCompraDia) {
        window.$storage.modalBar("", "Limite de compra atingido");
        return false;
      }

      if (
        !window.$storage.getLocal("session") &&
        window.$storage.getLocal("carrinho")
      ) {
        let carrinho = window.$storage.getLocal("carrinho");
        carrinho.forEach((car) => {
          res.push({
            idapresentacao: car.idapresentacao,
            qtd: car.produtos
              .map((prod) => prod.qtd)
              .reduce((total, currentElement) => total + currentElement),
          });
        });
      }

      if (
        res.length > 0 &&
        res.find(
          (carr) =>
            carr.qtd >= this.$config.regrasDoNegocio.limitCompraDia &&
            carr.idapresentacao == apre.idapresentacao
        )
      ) {
        window.$storage.modalBar("", "Limite de compra atingido");
        return false;
      }

      return true;
    },
  },
});
