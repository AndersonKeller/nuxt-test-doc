import moment from "moment";
import { createApp } from "vue";

// import '../plugins/languagen/index.js'
import "@/controllers/RegradeNegocio.controller";
import "@/controllers/SuperIngresso.controller.js";

import "@/controllers/Base64.controller.js";
import Storage from "@/controllers/Storage.controller.js";

createApp.prototype.$carrinho = new createApp({
  data() {
    // FUNC: VARIAVEIS
    return {
      $storage: new Storage(),
      legendas_: false,
      apresentacoes: [],
      interesseTermos: false,
      showAddPedido: false,
      showModalAjEndereco: false,
      showModalCarrinho: false,
      AddPedido: [],
      reservas: [],
      carrinho: [],
      carrinho_: [],
      carrinho_finalizar: [],
      carrinho_finalizar_select: [],
      pedidos: [],
      endereco: [],
      pagamento: [],
      bandeiraspagamento: [],
      dadoslocalhost: [],
      ingresso_select: "ETICKET",
      help: "",
      resumo: {
        qtd: 0,
        valor: 0,
        subtotal: 0,
        valor_cupom: 0,
        valor_taxa: 0,
        valor_combo: 0,
        cupom: "",
      },
      itensReservados: 0,
      exp: 0,
      pagamentoFail: false,
      botonactive: false,
      carrinhoVazio: false,
      loading: false,
      liberar: false,
      ApresencacoesArray: [],
      reserva: [],
      dados: {},
      card: {
        number: "",
        cvc: "",
        holderName: "",
        expiryMonth: "",
        expiryYear: "",
        bandeira: "",
        validade: "",
        fullyear_: "",
        validado: false,
        salvar: true,
      },
      modalCard: false,
      gateway: [],
      gateway_raw: [],
      gatewaySelected: [],
      modalPagamento: {
        show: false,
        persistent: false,
      },
      infoCartoes: {
        aura: {
          name: "Aura",
          numero: ["50"],
          numero_intervalo: [],
          numero_tamanho: [16],
          cvv_tamanho: [3],
          mask: "#### #### #### ####",
        },
        cabal: {
          name: "Cabal",
          numero: ["589657", "603522"],
          numero_intervalo: [
            ["604201", "604219"],
            ["604221", "604400"],
          ],
          numero_tamanho: [16],
          cvv_tamanho: [3],
          mask: "#### #### #### ####",
        },
        elo: {
          name: "ELO",
          numero: [
            "4011",
            "401178",
            "401179",
            "431274",
            "438935",
            "451416",
            "457393",
            "4576",
            "457631",
            "457632",
            "504175",
            "627780",
            "636297",
            "636368",
            "636369",
          ],
          numero_intervalo: [
            ["506699", "506778"],
            ["509000", "509999"],
            ["650031", "650033"],
            ["650035", "650051"],
            ["650405", "650439"],
            ["650485", "650538"],
            ["650541", "650598"],
            ["650700", "650718"],
            ["650720", "650727"],
            ["650901", "650920"],
            ["651652", "651679"],
            ["655000", "655019"],
            ["655021", "655058"],
          ],
          numero_tamanho: [16],
          cvv_tamanho: [3],
          mask: "#### #### #### ####",
        },
        discover: {
          name: "Discover",
          numero: ["6011", "622", "64", "65"],
          numero_intervalo: [],
          numero_tamanho: [16],
          cvv_tamanho: [4],
          mask: "#### #### #### ####",
        },
        diners: {
          name: "Diners Club",
          numero: ["301", "305", "36", "38"],
          numero_intervalo: [],
          numero_tamanho: [14, 16],
          cvv_tamanho: [3],
          mask: "#### #### #### ####",
        },
        amex: {
          name: "Americacan Express",
          numero: ["34", "37"],
          numero_intervalo: [],
          numero_tamanho: [15],
          cvv_tamanho: [4],
          mask: "#### ###### #####",
        },
        jcb: {
          name: "Jcb",
          numero: ["35"],
          numero_intervalo: [],
          numero_tamanho: [16],
          cvv_tamanho: [3],
          mask: "#### #### #### ####",
        },
        hipercard: {
          name: "Hipercard",
          numero: ["38", "60"],
          numero_intervalo: [],
          numero_tamanho: [13, 16, 19],
          cvv_tamanho: [3],
          mask: "#### #### #### #### ####",
        },
        visa: {
          name: "Visa",
          numero: ["4"],
          numero_intervalo: [],
          numero_tamanho: [13, 16],
          cvv_tamanho: [3],
          mask: "#### #### #### ####",
        },
        mastercard: {
          name: "Mastercard",
          numero: [
            "5",
            "6304",
            "6304",
            "6759",
            "6731",
            "6761",
            "6762",
            "6763",
            "6771",
            "508116",
          ], // numeros 6... é para os cartões maestro
          numero_intervalo: [["222100", "272099"]],
          numero_tamanho: [16],
          cvv_tamanho: [3],
          mask: "#### #### #### ####",
        },
      },
    };
  },
  watch: {
    async carrinho(e) {
      const root = await this.$util.getVue();
      root.loadingAdd = false;

      if (!e) {
        return;
      }

      // RESUMO CUPOM
      this.resumo = {
        qtd: 0,
        subtotal: 0,
        valor: 0,
        valor_cupom: 0,
        valor_taxa: 0,
        valor_combo: 0,
        cupom: "",
      };

      // REMOVE CUPOM QUANDO CARRINHO VAZIO

      if (e && e.length < 1) {
        this.$storage.removeLocal("cupom");
      }

      e.forEach((car) => {
        car.produtos.forEach((item) => {
          let taxa = Number(item.taxa) ? Number(item.taxa) : 0;
          let total = Number(item.total) ? Number(item.total) : 0;
          let valor = Number(item.valor)
            ? Number(item.valor)
            : Number(item.preco);
          let valor_cupom = Number(item.valor_cupom)
            ? Number(item.valor_cupom)
            : 0;
          let valor_sem_desconto = Number(item.valor_sem_desconto)
            ? Number(item.valor_sem_desconto)
            : 0;
          let subtotal =
            Number(
              item.tem_desconto || item.valor_cupom
                ? valor + valor_cupom
                : item.preco
            ) * Number(item.qtd);
          let valor_combo = item.combo
            ? Number(valor_sem_desconto - (valor + valor_cupom)) *
              Number(item.qtd)
            : 0;

          this.resumo.qtd += Number(item.qtd);
          this.resumo.subtotal += subtotal + valor_combo;
          this.resumo.valor += total
            ? total * Number(item.qtd)
            : Number(item.preco) * Number(item.qtd);
          car.valorTotal += total
            ? total * Number(item.qtd)
            : Number(item.preco) * Number(item.qtd);

          // atualizando valores do cupom quando tem sessão
          if (this.$storage.getLocal("session")) {
            this.resumo.cupom = item.cupom;
            this.resumo.valor_cupom += Number(item.qtd) * valor_cupom;
          }

          if (taxa > 0) {
            this.resumo.valor_taxa += Number(taxa) * Number(item.qtd);
            if (!this.$storage.getLocal("session")) {
              this.resumo.valor += Number(taxa) * Number(item.qtd);
            }
          }

          if (item.combo) {
            this.resumo.valor_combo += valor_combo;
          }
        });
      });
    },
  },
  methods: {
    async removeProdutoCarrinho(idmovimentacao, idprod) {
      // FUNC: removeProdutoCarrinho
      return await this.$superingresso.removeProdutoCarrinho(
        idmovimentacao,
        idprod
      );
    },

    async getReservas(reserva, request = true, movimentacao = false) {
      // FUNC: getReservas

      let pedidos = [];
      if (request == true) {
        reserva.forEach(async (i, ind) => {
          await this.$superingresso
            .getCarrinhoPageItens(i.idmovimentacao)
            .then((re) => {
              let produtos = [];
              let carrinho_venda = [];

              // REMOVE CUPOM QUANDO CARRINHO VAZIO
              if (re && re.length < 1) {
                // remove o cupom
                this.$storage.removeLocal("cupom");
              }

              // VARIÀVEIS PARA VERIFICAR CUPOM
              let existeCupomAplicado = false;
              let cupomParaAplicar = "";

              // ITENS DA RESERVA
              re.forEach((prod) => {
                prod.idapresentacao = prod.idapre;
                prod.dscproduto = prod.produto;
                prod.idproduto = prod.idprod;
                prod.preco = prod.valor;
                prod.idmovimentacao = i.idmovimentacao;
                // SE EXISTE CUPOM, VAI PEGAR O ÚLTIMO COM INFORMAÇÔES
                if (prod.cupom !== null && prod.cupom !== "") {
                  existeCupomAplicado = true;
                  cupomParaAplicar = prod.cupom;
                }

                produtos.push(prod);
              });

              // SETA O CUPOM NA SESSION STORAGE
              if (existeCupomAplicado)
                this.$storage.setLocal("cupom", cupomParaAplicar);

              produtos.forEach((prod) => {
                // CRIANDO O CARRINHO

                if (
                  prod.status == "RE" ||
                  prod.status == "AP" ||
                  prod.status == "TP"
                ) {
                  let temp_ = {
                    valorTotal: 0,
                    qtd: 0,
                    idapresentacao: prod.idapresentacao,
                    idmovimentacao: i.idmovimentacao,
                    status: prod.status,
                    res: i.dthr_reserva,
                    exp: prod.dthr_exp,
                    dscapre: prod.dscapre,
                    dt_apre: prod.dt_apre,
                    cancelar: [],
                    produtos: [],
                    boleto_url: i.boleto_url,
                    localizador: i.localizador,
                  };

                  carrinho_venda.push(temp_);
                }
              });

              /// DEIXANDO APENAS UMA IDAPRESENTAÇÃO POR CARRINHO
              carrinho_venda = carrinho_venda.filter(function (a) {
                return (
                  !this[JSON.stringify(a.idmovimentacao)] &&
                  (this[JSON.stringify(a.idmovimentacao)] = true)
                );
              }, Object.create(null));

              //  DEIXANDO APENAS UM ITEN AO CARRINHO

              let produtosFilter = produtos.filter(function (
                item,
                index,
                array
              ) {
                return (
                  !this[JSON.stringify(array[index])] &&
                  (this[JSON.stringify(item)] = true)
                );
              },
              Object.create(null));

              // CORRIGINDO QTD DE CADA ITEM

              produtosFilter.forEach((item) => {
                item.qtd = 0;
                // item.extra = item.extra && item.extra[0] ? item.extra : item.extra
              });

              produtosFilter.forEach((item) => {
                produtos.forEach((prod) => {
                  if (item.idproduto == prod.idproduto) {
                    item.qtd++;
                  }
                });
              });

              carrinho_venda.forEach((ca) => {
                ca.produtos = [];
                produtosFilter.forEach((pe) => {
                  if (ca.idmovimentacao == pe.idmovimentacao) {
                    ca.produtos.push(pe);
                    ca.qtd++;
                    ca.valorTotal += Number(pe.total);
                  }
                });
              });

              carrinho_venda.forEach((it) => {
                pedidos.push(it);
              });

              const self = this;

              var time = setInterval(() => {
                if (pedidos.length >= reserva.length) {
                  clearInterval(time);
                  self.reservas = pedidos.sort(function (a, b) {
                    if (
                      moment(a.dthr_pagamento).format("YYYYMMDD") >
                      moment(b.dthr_pagamento).format("YYYYMMDD")
                    )
                      return -1;
                    if (
                      moment(a.dthr_pagamento).format("YYYYMMDD") <
                      moment(b.dthr_pagamento).format("YYYYMMDD")
                    )
                      return 1;
                    return 0;
                  });
                }
              }, 1000);
            });
        });
      } else {
        let produtos = [];
        let carrinho_venda = [];

        // REMOVE CUPOM QUANDO CARRINHO VAZIO
        if (reserva && reserva.length < 1) {
          // remove o cupom
          this.$storage.removeLocal("cupom");
        }

        // VARIÀVEIS PARA VERIFICAR CUPOM
        let existeCupomAplicado = false;
        let cupomParaAplicar = "";

        // ITENS DA RESERVA
        reserva.forEach((prod) => {
          prod.idapresentacao = prod.idapre;
          prod.dscproduto = prod.produto;
          prod.idproduto = prod.idprod;
          prod.preco = prod.valor;
          prod.idmovimentacao = movimentacao.idmovimentacao;
          // SE EXISTE CUPOM, VAI PEGAR O ÚLTIMO COM INFORMAÇÔES
          if (prod.cupom !== null && prod.cupom !== "") {
            existeCupomAplicado = true;
            cupomParaAplicar = prod.cupom;
          }

          produtos.push(prod);
        });

        // SETA O CUPOM NA SESSION STORAGE
        if (existeCupomAplicado)
          this.$storage.setLocal("cupom", cupomParaAplicar);

        produtos.forEach((prod) => {
          // CRIANDO O CARRINHO

          if (
            prod.status == "RE" ||
            prod.status == "AP" ||
            prod.status == "TP"
          ) {
            let temp_ = {
              valorTotal: 0,
              qtd: 0,
              idapresentacao: prod.idapresentacao,
              idmovimentacao: movimentacao.idmovimentacao,
              status: prod.status,
              res: movimentacao.dthr_reserva,
              exp: prod.dthr_exp,
              dscapre: prod.dscapre,
              dt_apre: prod.dt_apre,
              cancelar: [],
              produtos: [],
              boleto_url: movimentacao.boleto_url,
              localizador: movimentacao.localizador,
            };

            carrinho_venda.push(temp_);
          }
        });

        /// DEIXANDO APENAS UMA IDAPRESENTAÇÃO POR CARRINHO
        carrinho_venda = carrinho_venda.filter(function (a) {
          return (
            !this[JSON.stringify(a.idmovimentacao)] &&
            (this[JSON.stringify(a.idmovimentacao)] = true)
          );
        }, Object.create(null));

        //  DEIXANDO APENAS UM ITEN AO CARRINHO

        let produtosFilter = produtos.filter(function (item, index, array) {
          return (
            !this[JSON.stringify(array[index])] &&
            (this[JSON.stringify(item)] = true)
          );
        }, Object.create(null));

        // CORRIGINDO QTD DE CADA ITEM

        produtosFilter.forEach((item) => {
          item.qtd = 0;
          // item.extra = item.extra && item.extra[0] ? item.extra : item.extra
        });

        produtosFilter.forEach((item) => {
          produtos.forEach((prod) => {
            if (item.idproduto == prod.idproduto) {
              item.qtd++;
            }
          });
        });

        carrinho_venda.forEach((ca) => {
          ca.produtos = [];
          produtosFilter.forEach((pe) => {
            if (ca.idmovimentacao == pe.idmovimentacao) {
              ca.produtos.push(pe);
              ca.qtd++;
              ca.valorTotal += Number(pe.total);
            }
          });
        });

        carrinho_venda.forEach((it) => {
          pedidos.push(it);
        });

        const self = this;

        var time = setInterval(() => {
          if (pedidos.length >= reserva.length) {
            clearInterval(time);
            self.reservas = pedidos.sort(function (a, b) {
              if (
                moment(a.dthr_pagamento).format("YYYYMMDD") >
                moment(b.dthr_pagamento).format("YYYYMMDD")
              )
                return -1;
              if (
                moment(a.dthr_pagamento).format("YYYYMMDD") <
                moment(b.dthr_pagamento).format("YYYYMMDD")
              )
                return 1;
              return 0;
            });
          }
        }, 1000);
      }
    },

    async getCarrinho(reserva, request = true, movimentacao = false) {
      // FUNC: getCarrinho

      if (request == true) {
        this.itensReservados = 0;
        let filtroReserva = [];
        reserva.forEach(async (i, ind) => {
          if (i.status != "AP" || !i.status) {
            this.itensReservados += i.qtd;
            filtroReserva.push(i);
          }
        });

        filtroReserva.forEach(async (i, ind) => {
          await this.$superingresso
            .getCarrinhoPageItens(i.idmovimentacao)
            .then(async (re) => {
              let produtos = [];
              let carrinho_venda = [];

              // REMOVE CUPOM QUANDO CARRINHO VAZIO
              if (re && re.length < 1) {
                // remove o cupom
                this.$storage.removeLocal("cupom");
              }

              // VARIÀVEIS PARA VERIFICAR CUPOM
              let existeCupomAplicado = false;
              let cupomParaAplicar = "";

              // ITENS DA RESERVA
              re.forEach((prod) => {
                prod.idapresentacao = prod.idapre;
                prod.dscproduto = prod.produto;
                prod.idproduto = prod.idprod;
                prod.preco = prod.valor;

                // SE EXISTE CUPOM, VAI PEGAR O ÚLTIMO COM INFORMAÇÔES
                if (prod.cupom !== null && prod.cupom !== "") {
                  existeCupomAplicado = true;
                  cupomParaAplicar = prod.cupom;
                }

                produtos.push(prod);
              });

              // SETA O CUPOM NA SESSION STORAGE
              if (existeCupomAplicado)
                this.$storage.setLocal("cupom", cupomParaAplicar);

              produtos.forEach((prod) => {
                // CRIANDO O CARRINHO

                if (prod.status == "RE" || prod.status == "TP") {
                  let temp_ = {
                    valorTotal: 0,
                    qtd: 0,
                    show: false,
                    idapresentacao: prod.idapresentacao,
                    idmovimentacao: i.idmovimentacao,
                    status: prod.status,
                    res: i.dthr_reserva,
                    exp: prod.dthr_exp,
                    dscapre: prod.dscapre,
                    dt_apre: prod.dt_apre,
                    cancelar: [],
                    produtos: [],
                  };

                  carrinho_venda.push(temp_);
                }
              });

              // DEIXANDO APENAS UMA IDAPRESENTAÇÃO POR CARRINHO

              carrinho_venda = carrinho_venda.filter(function (
                item,
                index,
                array
              ) {
                return (
                  !this[JSON.stringify(array[index])] &&
                  (this[JSON.stringify(item)] = true)
                );
              },
              Object.create(null));

              //  DEIXANDO APENAS UM ITEN AO CARRINHO

              produtos.forEach((item) => {
                if (typeof item.idapresentacao == "object") {
                  item.idapresentacao = item.idapresentacao[0];
                }
              });

              let produtosFilter = produtos.filter(function (
                item,
                index,
                array
              ) {
                return (
                  !this[
                    JSON.stringify(
                      array[index].idprod + array[index].idapresentacao
                    )
                  ] &&
                  (this[
                    JSON.stringify(item.idprod + item.idapresentacao)
                  ] = true)
                );
              },
              Object.create(null));

              // CORRIGINDO QTD DE CADA ITEM

              produtosFilter.forEach((item) => {
                item.qtd = 0;
              });

              produtosFilter.forEach((item) => {
                produtos.forEach((prod) => {
                  if (
                    item.idproduto == prod.idproduto &&
                    item.idapresentacao == prod.idapresentacao
                  ) {
                    item.qtd++;
                  }
                });
              });

              // GUARDA OS CANCELADOS

              carrinho_venda.forEach((car) => {
                produtos.forEach((prod) => {
                  if (car.idapresentacao == prod.idapresentacao) {
                    car.cancelar.push(prod);
                  }
                });
              });

              // AJUSTADOS OS PRODUTOS PRA CADA CARRINHO

              carrinho_venda.forEach((car) => {
                produtosFilter.forEach((item) => {
                  if (car.idapresentacao == item.idapresentacao) {
                    car.produtos.push(item);
                    car.qtd++;
                  }
                });
              });

              carrinho_venda.forEach((ii) => {
                if (typeof ii.dscapre == "object") {
                  ii.dscapre = ii.dscapre[0];
                  ii.dt_apre = ii.dt_apre[0];
                }
              });

              carrinho_venda = carrinho_venda.filter(function (
                item,
                index,
                array
              ) {
                return (
                  !this[
                    JSON.stringify(
                      array[index].res + array[index].idapresentacao
                    )
                  ] &&
                  (this[JSON.stringify(item.res + item.idapresentacao)] = true)
                );
              },
              Object.create(null));

              if (carrinho_venda.length > 0) {
                this.carrinho_.push(carrinho_venda);
              }

              if (this.carrinho_.length > 0) {
                let qtd_x = 0;
                let ite_x = [];
                this.carrinho_.forEach((item) => {
                  item.forEach((ii) => {
                    qtd_x += ii.cancelar.length;
                    ite_x.push(ii);
                  });
                });

                if (
                  qtd_x == this.itensReservados - 1 ||
                  qtd_x == this.itensReservados
                ) {
                  this.carrinho = [];
                  this.carrinho = ite_x;
                }

                this.$storage.setLocal("carrinho", this.carrinho);
              } else {
                this.carrinho_ = [];
                this.carrinho = [];
                this.$storage.removeLocal("carrinho");
              }

              const root = await this.$util.getVue();
              root.loadingAdd = false;
            });
        });
      } else {
        let produtos = [];
        let carrinho_venda = [];

        // REMOVE CUPOM QUANDO CARRINHO VAZIO
        if (reserva && reserva.length < 1) {
          // remove o cupom
          this.$storage.removeLocal("cupom");
        }

        // VARIÀVEIS PARA VERIFICAR CUPOM
        let existeCupomAplicado = false;
        let cupomParaAplicar = "";

        // ITENS DA RESERVA
        reserva.forEach((prod) => {
          prod.idapresentacao = prod.idapre;
          prod.dscproduto = prod.produto;
          prod.idproduto = prod.idprod;
          prod.preco = prod.valor;

          // SE EXISTE CUPOM, VAI PEGAR O ÚLTIMO COM INFORMAÇÔES
          if (prod.cupom !== null && prod.cupom !== "") {
            existeCupomAplicado = true;
            cupomParaAplicar = prod.cupom;
          }

          produtos.push(prod);
        });

        // SETA O CUPOM NA SESSION STORAGE
        if (existeCupomAplicado)
          this.$storage.setLocal("cupom", cupomParaAplicar);

        produtos.forEach((prod) => {
          // CRIANDO O CARRINHO

          if (prod.status == "RE" || prod.status == "TP") {
            let temp_ = {
              valorTotal: 0,
              qtd: 0,
              show: false,
              idapresentacao: prod.idapresentacao,
              idmovimentacao: movimentacao.idmovimentacao,
              status: prod.status,
              res: movimentacao.dthr_reserva,
              exp: prod.dthr_exp,
              dscapre: prod.dscapre,
              dt_apre: prod.dt_apre,
              cancelar: [],
              produtos: [],
            };

            carrinho_venda.push(temp_);
          }
        });

        // DEIXANDO APENAS UMA IDAPRESENTAÇÃO POR CARRINHO

        carrinho_venda = carrinho_venda.filter(function (item, index, array) {
          return (
            !this[JSON.stringify(array[index])] &&
            (this[JSON.stringify(item)] = true)
          );
        }, Object.create(null));

        //  DEIXANDO APENAS UM ITEN AO CARRINHO

        produtos.forEach((item) => {
          if (typeof item.idapresentacao == "object") {
            item.idapresentacao = item.idapresentacao[0];
          }
        });

        let produtosFilter = produtos.filter(function (item, index, array) {
          return (
            !this[
              JSON.stringify(array[index].idprod + array[index].idapresentacao)
            ] &&
            (this[JSON.stringify(item.idprod + item.idapresentacao)] = true)
          );
        }, Object.create(null));

        // CORRIGINDO QTD DE CADA ITEM

        produtosFilter.forEach((item) => {
          item.qtd = 0;
        });

        produtosFilter.forEach((item) => {
          produtos.forEach((prod) => {
            if (
              item.idproduto == prod.idproduto &&
              item.idapresentacao == prod.idapresentacao
            ) {
              item.qtd++;
            }
          });
        });

        // GUARDA OS CANCELADOS

        carrinho_venda.forEach((car) => {
          produtos.forEach((prod) => {
            if (car.idapresentacao == prod.idapresentacao) {
              car.cancelar.push(prod);
            }
          });
        });

        // AJUSTADOS OS PRODUTOS PRA CADA CARRINHO

        carrinho_venda.forEach((car) => {
          produtosFilter.forEach((item) => {
            if (car.idapresentacao == item.idapresentacao) {
              car.produtos.push(item);
              car.qtd++;
            }
          });
        });

        carrinho_venda.forEach((ii) => {
          if (typeof ii.dscapre == "object") {
            ii.dscapre = ii.dscapre[0];
            ii.dt_apre = ii.dt_apre[0];
          }
        });

        carrinho_venda = carrinho_venda.filter(function (item, index, array) {
          return (
            !this[
              JSON.stringify(array[index].res + array[index].idapresentacao)
            ] && (this[JSON.stringify(item.res + item.idapresentacao)] = true)
          );
        }, Object.create(null));

        if (carrinho_venda.length > 0) {
          this.carrinho_.push(carrinho_venda);
        }

        if (this.carrinho_.length > 0) {
          let qtd_x = 0;
          let ite_x = [];
          this.carrinho_.forEach((item) => {
            item.forEach((ii) => {
              qtd_x += ii.cancelar.length;
              ite_x.push(ii);
            });
          });

          if (
            qtd_x == this.itensReservados - 1 ||
            qtd_x == this.itensReservados
          ) {
            this.carrinho = [];
            this.carrinho = ite_x;
          }

          this.$storage.setLocal("carrinho", this.carrinho);
        } else {
          this.carrinho_ = [];
          this.carrinho = [];
          this.$storage.removeLocal("carrinho");
        }

        const root = await this.$util.getVue();
        root.loadingAdd = false;
      }
    },

    async getPedidos(reserva) {
      // FUNC: getPedidos
      const root = await this.$util.getVue();
      const pedidos = [];
      if (!["HubPedidos", "CartSuccess"].includes(root.$route.name)) {
        return;
      }

      if (["CartSuccess"].includes(root.$route.name)) {
        let idmovimentacao = window.$storage.getLocal("idmovimentacao_atual");
        let lastOrder = reserva.filter(function (pedido, index) {
          if (pedido.idmovimentacao == idmovimentacao) {
            return pedido;
          } else {
            return false;
          }
        });

        this.$superingresso
          .getCarrinhoPageItens(lastOrder[0].idmovimentacao)
          .then((re) => {
            let produtos = [];
            let carrinho_venda = [];

            // ITENS DA RESERVA
            re.forEach((prod) => {
              prod.idapresentacao = prod.idapre;
              prod.dscproduto = prod.produto;
              prod.idproduto = prod.idprod;
              prod.preco = prod.valor;
              prod.dthr_pagamento = prod.dthr_pagamento;
              produtos.push(prod);
            });

            produtos.forEach((prod) => {
              // CRIANDO O CARRINHO
              let temp_ = {
                valorTotal: 0,
                qtd: 0,
                show: false,
                idapresentacao: prod.idapresentacao,
                idmovimentacao: lastOrder[0].idmovimentacao,
                status: lastOrder[0].status,
                exp: lastOrder[0].dthr_reserva,
                produtos: [],
                dthr_pagamento: lastOrder[0].dthr_pagamento,
                localizador: lastOrder[0].localizador,
              };

              carrinho_venda.push(temp_);
            });

            /// DEIXANDO APENAS UMA IDAPRESENTAÇÃO POR CARRINHO

            carrinho_venda = carrinho_venda.filter(function (a) {
              return (
                !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true)
              );
            }, Object.create(null));

            //  DEIXANDO APENAS UM ITEN AO CARRINHO

            let produtosFilter = produtos.filter(function (item, index, array) {
              return (
                !this[JSON.stringify(array[index])] &&
                (this[JSON.stringify(item)] = true)
              );
            }, Object.create(null));

            // CORRIGINDO QTD DE CADA ITEM

            produtosFilter.forEach((item) => {
              item.qtd = 0;
              // item.extra = item.extra && item.extra[0] ? item.extra : item.extra
            });

            produtosFilter.forEach((item) => {
              produtos.forEach((prod) => {
                if (item.idproduto == prod.idproduto) {
                  item.qtd++;
                }
              });
            });

            // AJUSTADOS OS PRODUTOS PRA CADA CARRINHO

            carrinho_venda.forEach((car) => {
              produtosFilter.forEach((item) => {
                if (car.idapresentacao == item.idapresentacao) {
                  car.produtos.push(item);
                  car.qtd++;
                  car.valorTotal += Number(item.total);
                }
              });
            });

            carrinho_venda.forEach((it) => {
              pedidos.push(it);
            });

            const self = this;

            var time = setInterval(() => {
              if (pedidos.length >= 1) {
                clearInterval(time);
                self.pedidos = pedidos.sort(function (a, b) {
                  if (
                    moment(a.dthr_pagamento).format("YYYYMMDD") >
                    moment(b.dthr_pagamento).format("YYYYMMDD")
                  )
                    return -1;
                  if (
                    moment(a.dthr_pagamento).format("YYYYMMDD") <
                    moment(b.dthr_pagamento).format("YYYYMMDD")
                  )
                    return 1;
                  return 0;
                });
              }
            }, 1000);
          });
      } else {
        reserva.forEach(async (i, ind) => {
          this.$superingresso
            .getCarrinhoPageItens(i.idmovimentacao)
            .then((re) => {
              let produtos = [];
              let carrinho_venda = [];

              // ITENS DA RESERVA
              re.forEach((prod) => {
                prod.idapresentacao = prod.idapre;
                prod.dscproduto = prod.produto;
                prod.idproduto = prod.idprod;
                prod.preco = prod.valor;
                prod.dthr_pagamento = prod.dthr_pagamento;
                produtos.push(prod);
              });

              produtos.forEach((prod) => {
                // CRIANDO O CARRINHO
                let temp_ = {
                  valorTotal: 0,
                  qtd: 0,
                  show: false,
                  idapresentacao: prod.idapresentacao,
                  idmovimentacao: i.idmovimentacao,
                  status: i.status,
                  exp: i.dthr_reserva,
                  produtos: [],
                  dthr_pagamento: i.dthr_pagamento,
                  localizador: i.localizador,
                };

                carrinho_venda.push(temp_);
              });

              /// DEIXANDO APENAS UMA IDAPRESENTAÇÃO POR CARRINHO

              carrinho_venda = carrinho_venda.filter(function (a) {
                return (
                  !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true)
                );
              }, Object.create(null));

              //  DEIXANDO APENAS UM ITEN AO CARRINHO

              let produtosFilter = produtos.filter(function (
                item,
                index,
                array
              ) {
                return (
                  !this[JSON.stringify(array[index])] &&
                  (this[JSON.stringify(item)] = true)
                );
              },
              Object.create(null));

              // CORRIGINDO QTD DE CADA ITEM

              produtosFilter.forEach((item) => {
                item.qtd = 0;
                // item.extra = item.extra && item.extra[0] ? item.extra : item.extra
              });

              produtosFilter.forEach((item) => {
                produtos.forEach((prod) => {
                  if (item.idproduto == prod.idproduto) {
                    item.qtd++;
                  }
                });
              });

              // AJUSTADOS OS PRODUTOS PRA CADA CARRINHO

              carrinho_venda.forEach((car) => {
                produtosFilter.forEach((item) => {
                  if (car.idapresentacao == item.idapresentacao) {
                    car.produtos.push(item);
                    car.qtd++;
                    car.valorTotal += Number(item.total);
                  }
                });
              });

              carrinho_venda.forEach((it) => {
                pedidos.push(it);
              });

              const self = this;

              var time = setInterval(() => {
                if (pedidos.length >= reserva.length) {
                  clearInterval(time);
                  self.pedidos = pedidos.sort(function (a, b) {
                    if (
                      moment(a.dthr_pagamento).format("YYYYMMDD") >
                      moment(b.dthr_pagamento).format("YYYYMMDD")
                    )
                      return -1;
                    if (
                      moment(a.dthr_pagamento).format("YYYYMMDD") <
                      moment(b.dthr_pagamento).format("YYYYMMDD")
                    )
                      return 1;
                    return 0;
                  });
                }
              }, 1000);
            });
        });
      }
    },

    async selecao(item, apre, checkout = false) {
      // if(!this.$regras.add(item, apre)) {
      //     return
      // }

      if (
        !this.$storage.getLocal("session") &&
        this.$config.dados.carrinhoLocal
      ) {
        this.carrinhoLocal(item, apre, "selecao").then(() => {
          this.atualizaCarrinho(false);
        });

        return;
      }

      this.$facebook.addCarrinho(item);

      const root = await this.$util.getVue();
      root.loadingAdd = true;

      const i = { ...item };

      this.$util.snackbar(this.$t_("carrinho_atualizando"));

      await this.setCarrinho(i, apre, checkout, "selecao")
        .then(async (response) => {
          //window.scrollTo(0, document.body.scrollHeight);
          if (response.idmovimentacao) {
            // RESGATA O CUPOM AO ADCIONAR NO CARRINHO
            if (this.$storage.getLocal("cupom")) {
              await this.$superingresso.aplicarCupom(
                response.idmovimentacao,
                this.$storage.getLocal("cupom")
              );
            }
          }
          this.atualizaCarrinho(false);

          if (response.idmovimentacao) {
            this.showModalCarrinho = true;
          }

          root.loadingAdd = false;
          root.loading = false;
        })
        .catch((erro) => {
          root.loading = false;
          root.loadingAdd = false;
        });
    },

    async add(item, apre, checkout) {
      // FUNC: add

      // if(!this.$regras.add(item, apre)) {
      //     return
      // }

      if (
        !this.$storage.getLocal("session") &&
        this.$config.dados.carrinhoLocal
      ) {
        this.carrinhoLocal(item, apre, "add").then(() => {
          this.atualizaCarrinho(false);
        });

        return;
      }

      this.$facebook.addCarrinho(item);

      const root = await this.$util.getVue();
      root.loadingAdd = true;

      const i = item;
      await this.setCarrinho(i, apre, checkout, "add").then(
        async (response) => {
          if (response.idmovimentacao) {
            // item.qtd++;

            // RESGATA O CUPOM AO ADCIONAR NO CARRINHO
            if (this.$storage.getLocal("cupom")) {
              await this.$superingresso.aplicarCupom(
                response.idmovimentacao,
                this.$storage.getLocal("cupom")
              );
            }

            // this.atualizaCarrinho(false)
            // return
          }
          this.atualizaCarrinho(false);

          this.showModalCarrinho = true;

          root.loadingAdd = false;
          root.loading = false;
          // item.qtd-- // CASO PASSE DO LIMITE PARAMETRIZADO VOLTA -1
        }
      );
    },

    async minus(item, apre, checkout) {
      // FUNC: minus

      if (item.qtd > 0) {
        if (this.$config.dados.carrinhoLocal) {
          if (!this.$storage.getLocal("session")) {
            const i = item;
            this.carrinhoLocal(i, apre, "minus").then(() => {
              this.atualizaCarrinho(false);
            });

            return;
          }
        }

        item.qtd--;
        const i = item;
        await this.setCarrinho(i, apre, checkout, "minus").then((response) => {
          if (response.idmovimentacao) {
            this.atualizaCarrinho(false);
            return;
          }
        });
      }
    },

    async carrinhoLocal(produto, apre, tipo) {
      // FUNC: carrinhoLocal

      if (apre.dt_hora && apre.dt_hora.hora) {
        produto.dt_hora = apre.dt_hora.hora;
      }

      if (tipo == "add") {
        produto.qtd++;
      }

      if (tipo == "minus") {
        produto.qtd--;
      }

      let car_temp = [
        {
          valorTotal: 0,
          qtd: 0,
          idapresentacao: apre.idapresentacao,
          dt_apre: apre.dt_apre,
          dscapre: apre.dscapre,
          produtos: [produto],
        },
      ];

      if (this.$storage.getLocal("local_carrinho")) {
        let car = this.$storage.getLocal("local_carrinho");
        let exit = await car.find(
          (item) => item.idapresentacao == apre.idapresentacao
        );

        // INSERE NO CARRINHO CASO NÃO EXISTA A APRESENTAÇÃO

        if (exit === undefined) {
          car.push(car_temp[0]);
          this.$storage.setLocal("carrinho", car);
          this.$storage.setLocal("local_carrinho", car);
          return true;
        }

        // INSERE UM NOVO PRODUTO CASO NÃO EXISTA NA MESMA APRESENTAÇÃO
        else {
          let prodexit = await exit.produtos.find(
            (item) => item.idproduto == produto.idproduto
          );

          if (prodexit === undefined) {
            exit.produtos.push(produto);

            car.forEach((WE) => {
              if (WE.idapresentacao == apre.idapresentacao) {
                WE.produtos = exit.produtos;
              }
            });

            this.$storage.setLocal("carrinho", car);
            this.$storage.setLocal("local_carrinho", car);
            return true;
          }
        }

        // FAZ UPDATE CASO EXISTA A APRESENTAÇÃO E O PRODUTO NO CARRINHO LOCAL

        car_temp = car;

        car_temp.forEach((item, i, c) => {
          if (item.idapresentacao == apre.idapresentacao) {
            item.produtos.find((prod, index, object) => {
              if (prod.idproduto == produto.idproduto) {
                if (tipo == "add" && prod.qtd < 10) {
                  prod.qtd++;
                } else if (tipo == "minus" && prod.qtd > 0) {
                  prod.qtd--;
                }
              }

              if (prod.qtd == 0) {
                object.splice(index, 1);
              }
            });
            if (item.produtos.length == 0) {
              c.splice(i, 1);
            }
          }
        });
      }

      this.$storage.setLocal("carrinho", car_temp);
      this.$storage.setLocal("local_carrinho", car_temp);
      this.$carrinho.carrinho = car_temp;

      return true;
    },

    async setCarrinho(_item, apre, checkout, tipo) {
      // FUNC: setCarrinho

      const produto = { ..._item };
      const cartoes = [];

      if (
        this.AddPedido.info_compra &&
        this.AddPedido.info_compra.pessoa_cartoes &&
        this.AddPedido.info_compra.pessoa_cartoes.length > 0 &&
        produto.cartoes.length != produto.qtd &&
        produto.cartao_dsc
      ) {
        // this.$util.snackbar('Selecione os cartões de recarga ou retirada no local', 'error');

        for (let x = 0; x < produto.qtd; x++) {
          if (produto.cartoes.length != produto.qtd) {
            produto.cartoes.push({
              cartao: "Retirada",
              classe: null,
              codigo: null,
              dsccartao: null,
              idcartao: null,
              titular: null,
              disabled: false,
            });
          }
        }
      }

      let carrinho = {
        valorTotal: 0,
        qtd: 0,
        idapresentacao: null,
        idtipoproduto: null,
        idmovimentacao: null,
        exp: 0,
        produtos: [],
      };

      if (produto.cartoes && produto.cartoes.length > 0) {
        produto.cartoes.forEach((cards, inds) => {
          cartoes.push(cards);
          // if(cards.cartao == null) {
          //     delete cartoes[inds]
          // }
        });
      }

      // CANCELA OS PRODUTOS PARA DEPOIS ADICIONAR

      if (checkout) {
        carrinho.idapresentacao = apre.idapresentacao;
      } else if (this.carrinho) {
        carrinho.idapresentacao = this.$carrinho.AddPedido.idapresentacao;
      }

      if (tipo == "add") {
        carrinho.produtos.push({
          cartoes: cartoes || [],
          idproduto: produto.idproduto,
          qtd: 1,
          extra:
            typeof apre.dt_apre == "object"
              ? { segundo_dia: apre.dt_apre[1] }
              : null,
        });
      } else {
        let c_ = this.carrinho;
        let itemCancelado = { cancelar: [] };

        c_.forEach((item) => {
          if (
            item.idapresentacao == apre.idapresentacao ||
            item.idapresentacao == carrinho.idapresentacao
          ) {
            item.cancelar.forEach((prods) => {
              if (prods.idproduto == produto.idproduto) {
                itemCancelado.cancelar.push({ iditem: prods.iditem });
                itemCancelado.idmovimentacao = item.idmovimentacao;
              }
            });
          }
        });

        if (itemCancelado.cancelar.length > 0) {
          this.$google.removeCarrinho(itemCancelado.cancelar);
          await this.cancelarReservaDocarrinho(itemCancelado);
        }

        // if(cartoes.cartoes && cartoes.cartoes.length > 0){
        //     cartoes.forEach((cards, inds) => {
        //         if(cards.cartao == null) {
        //             cartoes[inds] = null
        //         }
        //     })
        // }

        if (tipo == "selecao") {
          carrinho.produtos.push({
            cartoes: cartoes || [],
            idproduto: produto.idproduto,
            qtd: produto.qtd,
            extra: cartoes || [],
          });
        } else {
          return true;
        }
      }

      this.showAddPedido = false;

      let bloco = this.AddPedido.bloco_ids ? this.AddPedido.bloco_ids : false;

      let param = [carrinho.produtos, carrinho.idapresentacao, bloco];

      this.$google.addCarrinho(carrinho.produtos);

      if (produto.qtd == 0) {
        return true;
      }
      return await this.$superingresso.setCarrinho(param);
    },

    async setCarrinhoLocal(carrinho) {
      // FUNC: setCarrinhoLocal

      let param = [carrinho.produtos, carrinho.idapresentacao, false];

      return await this.$superingresso.setCarrinho(param);
    },

    async atualizaCarrinho(item = false) {
      // FUNC: atualizaCarrinho
      if (this.$storage.getLocal("session")) {
        const root = await this.$util.getVue();
        root.loadingAdd = true;
        let reserva = [];
        await this.$superingresso.getCarrinhoPage().then(async (reservas) => {
          this.carrinho_ = [];
          this.pedidos = [];

          if (reservas.PA) {
            this.getPedidos(reservas.PA);
          }

          if (
            reservas.RE &&
            !["HubPedidosFinalizados", "CartSuccess"].includes(root.$route.name)
          ) {
            reserva = reservas.RE.filter((item) => {
              var dthr_reserva = new Date(item.dthr_reserva);
              var dateOffset = 24 * 60 * 60 * 1000 * 15; //5 days
              var dthr_15dias = new Date(new Date());
              dthr_15dias.setTime(dthr_15dias.getTime() - dateOffset);

              if (dthr_reserva == "Invalid Date") {
                dthr_reserva = Date.parse(Date(item.dthr_reserva));
                dthr_15dias = Date.parse(dthr_15dias);
              }

              if (
                item.status == "AP" ||
                item.status == "TP" ||
                dthr_15dias < dthr_reserva
              ) {
                return item;
              } else {
                return false;
              }
            });

            this.itensReservados = 0;

            reserva.forEach(async (i, ind) => {
              if (i.status != "AP" || !i.status) {
                this.itensReservados += i.qtd;
              }
            });

            reserva.forEach(async (i, ind) => {
              await this.$superingresso
                .getCarrinhoPageItens(i.idmovimentacao)
                .then((re) => {
                  this.getReservas(re, false, i);

                  if (i.status != "AP" || !i.status) {
                    this.getCarrinho(re, false, i);
                  }
                });
            });
          }

          if (!reserva || reserva.length == 0) {
            this.resumo.valor_cupom = 0;
            this.resumo.cupom = null;
            this.resumo.qtd = 0;
            this.resumo.valor = 0;
            this.carrinho = [];
            this.$storage.removeLocal("carrinho");
          }

          if (item) {
            this.getApresentacao(item);
          }

          return;
        });
      } else {
        // RESUMO CUPOM

        if (this.$storage.getLocal("carrinho")) {
          let carrinho_venda = this.$storage.getLocal("carrinho");

          carrinho_venda.forEach((WE) => {
            if (WE.produtos && WE.produtos.length > 0) {
              WE.produtos.forEach((valores) => {
                WE.valorTotal += Number(valores.preco) * Number(valores.qtd);
                WE.qtd += Number(valores.qtd);
              });
            }
          });

          if (carrinho_venda.length > 0) {
            this.carrinho = carrinho_venda;
          }
        }
      }

      if (item) {
        this.getApresentacao(item);
      }
    },

    cancelarReserva(RE) {
      // FUNC: cancelarReserva
      RE.forEach((item) => {
        this.$superingresso.cancelarReserva(item.idmovimentacao).then(() => {
          this.atualizaCarrinho();
        });
      });
    },

    cancelarReservaDocarrinho(RE) {
      // FUNC: cancelarReservaDocarrinho
      // return console.log(RE)
      let itens = [];

      RE.cancelar.forEach((item) => {
        itens.push(item.iditem);
      });

      this.$superingresso
        .removeProdutoCarrinho(RE.idmovimentacao, itens)
        .then(() => {
          this.atualizaCarrinho();
        });
    },

    async cancelarReservaDocarrinhoItem(idmovimentacao, itens) {
      // FUNC: cancelarReservaDocarrinhoItem
      const root = await this.$util.getVue();
      await this.$superingresso
        .removeProdutoCarrinho(idmovimentacao, [itens])
        .then(() => {
          this.$util.snackbar("Ingresso removido do carrinho");
          this.atualizaCarrinho();
        });
      setTimeout(() => {
        root.loadingSkeleton = false;
      }, 2500);
    },

    getApresentacao(item) {
      // FUNC: getApresentacao
      this.$superingresso
        .getTipoProdutos(item.idapresentacao)
        .then((response) => {
          if (response.mapa && response.mapa.help) {
            this.help = response.mapa.help;
          }
          if (response && response.tipo_produtos) {
            // LOADING INGRESSOS
            let res = response;
            this.AddPedido = [];

            let produtos = res.tipo_produtos;
            produtos.forEach((prod) => {
              prod.produtos.forEach((i) => {
                if (!i.qtd) {
                  i.qtd = 0;
                }
              });
            });

            // ATUALIZANDO O MODAL DE ACORDO COM O CARRINHO
            let qtd_total = 0;
            if (this.carrinho) {
              let car_temp = this.carrinho;

              produtos.forEach((prod) => {
                car_temp.find((car) => {
                  prod.produtos.forEach((produtos) => {
                    produtos.block_qtd = 0;
                    if (car.produtos && car.produtos.length > 0) {
                      car.produtos.forEach((produtos_temp) => {
                        if (produtos.idproduto == produtos_temp.idproduto) {
                          produtos.qtd = produtos_temp.qtd;
                          qtd_total += produtos_temp.qtd;
                        }
                      });
                    }
                  });
                });
              });
            }

            produtos.forEach((prod) => {
              prod.produtos.forEach((produtos) => {
                produtos.block_qtd = qtd_total;
              });
            });

            item.qtd = qtd_total;

            this.AddPedido = item;
            this.AddPedido.total = 0;
            this.showAddPedido = true;
            this.ApresencacoesArray.push(this.AddPedido);
          } else {
            // this.$util.snackbar(this.$t_('ingressos_esgotados'), 'error');
          }
          item.loading = false;
          this.atualizaCarrinho();
        });
    },

    cancelarReservaItem(car, item) {
      // FUNC: cancelarReservaDocarrinho

      let itens = [];
      let cancelar = car.cancelar.filter((i) => i.idprod == item.idproduto);

      cancelar.forEach((item) => {
        itens.push(item.iditem);
      });

      this.$superingresso
        .removeProdutoCarrinho(car.idmovimentacao, itens)
        .then(() => {
          this.atualizaCarrinho();
        });
    },
    cancelarReservaItemUnico(car, item) {
      // TODO: cancelarReservaDocarrinho
      let itens = [];

      let cancelar = car.cancelar.filter((i) => i.idprod == item.idproduto);

      cancelar.forEach((item) => {
        if (item.iditem && item.qtd > 0) {
          item.qtd--;
          itens.push(item.iditem);
          this.atualizaCarrinho();
        }
      });

      this.$superingresso
        .removeProdutoCarrinho(car.idmovimentacao, itens[0])
        .then(() => {
          this.atualizaCarrinho();
        });
    },

    getQtdPerApresentacao(idapresentacao) {
      // FUNC: getQtdPerApresentacao
      let qtd = 0;
      if (idapresentacao && this.$storage.getLocal("carrinho")) {
        let car_temp = this.$storage.getLocal("carrinho");
        car_temp.forEach((car) => {
          if (car.idapresentacao == idapresentacao) {
            qtd = car.qtd;
          }
        });
      }
      return qtd;
    },

    getFormaspagamento() {
      // FUNC: getFormaspagamento

      if (this.$storage.getLocal("carrinho")) {
        this.carrinho_finalizar = this.$storage.getLocal("carrinho");

        if (
          this.carrinho_finalizar_select &&
          this.carrinho_finalizar_select.idmovimentacao
        ) {
          this.carrinho_finalizar = [
            this.$storage
              .getLocal("carrinho")
              .find(
                (item) =>
                  item.idmovimentacao ==
                  this.carrinho_finalizar_select.idmovimentacao
              ),
          ];
        }

        if (!this.carrinho_finalizar) {
          return;
        }

        let formaPagamentos = [];
        // console.log(this.carrinho_finalizar, this.carrinho_finalizar_select)
        this.carrinho_finalizar.forEach((item) => {
          if (item.status != "EX") {
            this.$superingresso
              .getFormasPagamento(item.idmovimentacao)
              .then((response) => {
                if ((response && response.gateways.length == 0) || !response) {
                  this.$util.snackbar(this.$t_("carrinho_gateway"), "error");
                  return;
                }

                formaPagamentos = response.gateways;

                // REMOVENDO OS ARRAY REPETIDOS
                var novaArr = formaPagamentos.filter(function (este, i) {
                  return formaPagamentos.indexOf(este) === i;
                });

                novaArr.forEach((item, index) => {
                  item.nome = item.nome.toUpperCase();
                  if (item.nome.length > 18) {
                    item.nome = `${index + 1} - ${item.nome.substring(0, 18)}`;
                  }
                });

                this.gateway_raw = response;
                this.gateway = novaArr;
                this.gatewaySelected = this.gateway[0];
                this.setBandeiras(novaArr);

                this.gatewaySelected.parcelaSelect = 1;

                // IMPORTANDO O SDK NO NEO PAY

                let script = document.createElement("script");

                if (
                  this.gatewaySelected &&
                  this.gatewaySelected.files_include &&
                  this.gatewaySelected.files_include[0]
                ) {
                  if (
                    this.gatewaySelected.files_include[0].indexOf("http") == -1
                  ) {
                    this.gatewaySelected.files_include[0] =
                      window.$http.BASE_URL +
                      this.gatewaySelected.files_include[0];
                    this.modalCard = true;
                  }
                  script.src = this.gatewaySelected.files_include[0];
                  document.head.prepend(script);
                } else {
                  this.modalCard = true;
                }
              });
          }
        });
      }
    },

    setBandeiras(obj) {
      if (obj && obj.length > 0) {
        let bandeiras = obj.map((item) => item.bandeiras_aceitas);
        let flags = [];

        bandeiras = bandeiras.join(",");
        bandeiras = bandeiras.split(",");

        var novaArr = bandeiras.filter(function (este, i) {
          return bandeiras.indexOf(este) === i && i != "";
        });

        var arraySemVazios = novaArr.filter(function (i) {
          return i;
        });

        if (arraySemVazios && arraySemVazios.length > 0) {
          arraySemVazios.forEach((item) => {
            flags.push(`${item}.png`);
          });
        }

        this.bandeiraspagamento = flags;
      }
    },

    getBandeira(e) {
      e = e.replace(/\s/g, "");
      var n;
      var a = 0;

      for (var r in this.infoCartoes) {
        for (var u = 0; u < this.infoCartoes[r].numero.length; u++) {
          var o,
            l,
            s = this.infoCartoes[r].numero[u];
          if (s.length > e.length) {
            o = e;
            l = s.substring(0, e.length);
          } else {
            o = e.substring(0, s.length);
            l = s;
          }
          if (o == l && s.length > a) {
            n = r;
            a = s.length;
          }
        }
        for (var u = 0; u < this.infoCartoes[r].numero_intervalo.length; u++) {
          var o,
            l1,
            l2,
            s1 = this.infoCartoes[r].numero_intervalo[u][0];
          var s2 = this.infoCartoes[r].numero_intervalo[u][1];

          if (s1.length > e.length) {
            o = e;
            l1 = s1.substring(0, e.length);
            l2 = s2.substring(0, e.length);
          } else {
            o = e.substring(0, s1.length);
            l1 = s1;
            l2 = s2;
          }

          if (parseInt(o) >= l1 && parseInt(o) <= l2 && s1.length > a) {
            n = r;
            a = s1.length;
          }
        }
      }

      var CartaoSelecionado = n
        ? a <= e.length
          ? n == null
            ? "unknown"
            : n
          : "unknown"
        : "unknown";

      if (CartaoSelecionado == "unknown") {
        return CartaoSelecionado;
      }

      return {
        bandeira: CartaoSelecionado,
        cvv_tamanho: this.infoCartoes[CartaoSelecionado].cvv_tamanho[0],
        mask: this.infoCartoes[CartaoSelecionado].mask,
        name: this.infoCartoes[CartaoSelecionado].name,
      };
    },

    async pagar() {
      // FUNC: pagar

      // VALIDANDO

      if (!this.$storage.getLocal("session")) {
        this.$usuario.showModalLogin = true;
        this.$storage.setLocal("gorouter", "Checkout");
        return false;
      }

      // this.carrinho_finalizar = this.$storage.getLocal('carrinho') || this.carrinho;

      // VERIFICA SE EXISTE PORTADORES PREENCHIDOS

      let carx = [this.carrinho_finalizar_select];
      let portadorObrigatorio = false;
      // console.log(this.carrinho_finalizar_select)
      carx.forEach((item) => {
        if (item && item.produtos) {
          let portadorx = item.produtos.find((item) => item.portador);
          if (portadorx && typeof portadorx.portador[0].nome == "undefined") {
            portadorObrigatorio = true;
          }
        }
      });

      if (this.gatewaySelected.length == 0 || portadorObrigatorio) {
        this.$util.snackbar(this.$t_("carrinho_controller_vincular"));
        return;
      }
      if (this.interesseTermos == false) {
        this.$util.snackbar(this.$t_("carrinho_aceitar"));
        document
          .getElementById("termos-compra")
          .scrollIntoView({ behavior: "smooth", block: "end" });
        return;
      }

      if (
        !this.modalPagamento.show &&
        this.modalCard &&
        (this.gatewaySelected.id.indexOf("cred") != -1 ||
          this.gatewaySelected.id.indexOf("deb") != -1)
      ) {
        this.modalPagamento.show = true;
        return false;
      }

      const root = await this.$util.getVue();

      // PREPARANDO OS DADOS PARA O ENVIO DO PAGAMENTO

      let dados = {
        idpag: "",
        token: "",
        idmovimentacao: this.carrinho_finalizar_select.idmovimentacao,
        idformapagamento: this.gatewaySelected.id_criptografado,
        params:
          this.ingresso_select == "ETICKET"
            ? null
            : { idendereco: this.endereco.idendereco },
        gateway: this.gatewaySelected,
        card: {
          number: this.card.number
            ? this.$util.removerCaracteres(this.card.number)
            : null,
          card: this.card.number
            ? this.$util.removerCaracteres(this.card.number)
            : null,
          bin: this.card.number
            ? this.$util.removerCaracteres(this.card.number).substring(0, 6)
            : null,
          cvc: this.card.cvc || null,
          bandeira: this.card.bandeira || null,
          holderName: this.card.holderName || null,
          nome: this.card.holderName || this.card.nome,
          expiryMonth: this.card.expiryMonth || null,
          expiryYear: this.card.expiryYear || null,
          validade: this.card.fullyear_ || null,
          idccredit: this.card.idccredit || null,
          save_card_token: this.card.salvar,
          generationtime: new Date().toISOString(),
          parcela: this.gatewaySelected.parcelaSelect,
        },
      };

      /*if(window.adyen){
                var cseInstance = adyen.encrypt.createEncryption(window.$base64.encode(this.gatewaySelected.keydescription), {});
                dados.card = cseInstance.encrypt(dados.card);
            }*/

      if ((!this.card.cvc || this.card.cvc == "") && !this.card.idccredit) {
        dados.card = { parcela: 1 };
      }

      this.$facebook.addInfoPgto();
      this.$facebook.eventoPersonalizado("GatewayPagamento", {
        name: this.gatewaySelected.nome,
        value: this.resumo.valor,
      });

      this.$google.checkoutStepPagamento(
        this.carrinho_finalizar[0].produtos,
        this.resumo.cupom
      );

      this.loading = true;

      this.$superingresso
        .iniciarPagamento(
          dados.idmovimentacao,
          dados.idformapagamento,
          dados.card,
          dados.params
        )
        .then((response) => {
          this.modalPagamento.show = false;

          if (response && response.token) {
            this.ImplyPayNeo(response.token);
            return;
          }

          if (response && response.idpag && response.url && response.redirect) {
            document.location.href = response.url;
            return;
          }

          if (response && !response.token && response.idpag) {
            this.$google.checkoutStepFinalizarCarrinho(
              this.carrinho_finalizar[0].produtos,
              this.carrinho_finalizar[0].idmovimentacao,
              this.resumo.cupom
            );
            this.$facebook.concluirCompra(this.resumo);
            this.$superingresso
              .concluirPagamento(dados.idmovimentacao)
              .then((res) => {
                this.$util.go("CartSuccess", {
                  pagina: root.$route.params.pagina,
                });
              });
            this.$carrinho.resumo.qtd = 0;
            this.$carrinho.resumo.valor = 0;
            this.$storage.removeLocal("cupom");
            this.$storage.removeLocal("carrinho");
            return;
          }

          this.loading = false;
        })
        .catch((error) => {
          //console.log(error)
        });
    },

    async ImplyPayNeo(token) {
      // FUNC: ImplyPayNeo
      const root = await this.$util.getVue();
      let ambiente = this.gatewaySelected.ambiente;
      let wsUrl = "wss://payws.imply.com.br/";
      let httpUrl = "https://pay.imply.com.br/";

      switch (ambiente) {
        case "dev":
          ambiente = "test";
          wsUrl = "ws://payneohomologacao.imply.com.br/test";
          if (location.protocol === "https:") {
            wsUrl = "wss://payneohomologacao.imply.com.br/test";
          }
          if (
            location.href.indexOf("localhost") != -1 &&
            this.$util.getBrowser() == "Mozilla Firefox"
          ) {
            wsUrl = "wss://payneohomologacao.imply.com.br/test";
          }
          httpUrl =
            "https://y86eq337g3.execute-api.us-east-1.amazonaws.com/test";
          break;
        case "sandbox":
          ambiente = "staging";
          wsUrl = "wss://payneohomologacao.imply.com.br/staging";

          if (location.protocol === "https:") {
            wsUrl = "wss://payneohomologacao.imply.com.br/staging";
          }
          httpUrl =
            "https://y86eq337g3.execute-api.us-east-1.amazonaws.com/staging";

          break;
        case "live":
          ambiente = "prod";
          break;
      }

      const self = this;
      const ImplyPay = new window.imply.Pay({
        token: token,
        wsUrl: wsUrl,
        httpUrl: httpUrl,
        language: "pt",
        ambiente: ambiente, // Alterar conforme o back
        colors: {
          primary: "#60B33A",
        },
        onClose: (response) => {
          switch (response.status) {
            case "fail":
              console.warn("Falha no pagamento");
              location.reload();
              break;

            case "success":
              this.$superingresso
                .concluirPagamento(this.carrinho_finalizar[0].idmovimentacao)
                .then((response) => {
                  if (response) {
                    console.warn("Sucesso no pagamento");
                    // Captura os dados da compra e envia ao Google Analytics
                    self.$google.checkoutStepFinalizarCarrinho(
                      this.carrinho_finalizar.produtos,
                      this.carrinho_finalizar.idmovimentacao,
                      this.resumo.cupom
                    );
                    self.$carrinho.resumo.qtd = 0;
                    self.$carrinho.resumo.valor = 0;
                    self.$storage.removeLocal("cupom");
                    self.$storage.removeLocal("carrinho");
                    self.$util.go("CartSuccess", {
                      pagina: root.$route.params.pagina,
                    });
                  }
                });
              break;

            case "pending":
              console.warn("Pagamento pendente");
              this.$superingresso
                .concluirPagamento(this.carrinho_finalizar.idmovimentacao)
                .then((response) => {
                  if (response) {
                    self.$util.go("HubPedidos");
                  }
                });

              break;
          }
        },
      });
    },
    async setAgendamento(dados) {
      // FUNC: setAgendamento
      return await this.$http.post("SETAGENDAMENTO", dados);
    },
    async getAgendamento(dados) {
      return await this.$http.post("GETAGENDAMENTO", dados);
    },
    async getQtdAgenda(dados) {
      return await this.$http.post("GETQTD", dados);
    },
  },
});

// Vue.prototype.$carrinho.getIntencao();
// Vue.prototype.$carrinho.cancelarReserva([{ idmovimentacao: 'b1143cd13efa3ac08c9c06d83fce9cc6bf09e76f' }]);
