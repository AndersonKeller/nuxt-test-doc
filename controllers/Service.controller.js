import { endpoints } from "@/app.config.json";
import StorageTable from "@/controllers/Storage.controller.js";
import Util from "@/controllers/Util.controller";
import a from "axios";
// import ModalEndereco from "@/components/perfil/Card-endereco.vue";

let endpoint = endpoints.producao;

switch (process.env.NODE_ENV) {
  case "development":
    endpoint = endpoints.homologacao;
    break;
  case "production":
    endpoint = endpoints.homologacao;
    break;
  case "preproduction":
    endpoint = endpoints.preproducao;
    break;
}

// if ("ambiente" in sessionStorage) {
//   switch (sessionStorage.getItem("ambiente")) {
//     case "development":
//       endpoint = endpoints.homologacao;
//       break;
//     case "production":
//       endpoint = endpoints.producao;
//       break;
//     case "preproduction":
//       endpoint = endpoints.preproducao;
//       break;
//   }
// }

export default class Service extends StorageTable {
  // TYPE: Class: Service()

  constructor(BASE_URL) {
    super();

    this.axios = a.create({ baseURL: BASE_URL ? BASE_URL : endpoint });
    this.BASE_URL = endpoint || BASE_URL;

    const ID_LOGIN_SI = ""; // vai ser dinamico
    const ORIGEM = window.location.origin;

    this.ENDPOINTS = {
      GETLOGINS: "logins?url=" + ORIGEM,
      LOGIN: "login/" + ID_LOGIN_SI, // ID do login do SI Dinamico
      ACEITETERMO: "CustomUserApps/aceiteTermo",
      // GETTERMOCOMPRA            : 'pessoa/cadastro/termo?tipo=2',
      ATUALIZASESSAO: "CustomUserApps/atualizaSessao",

      DADOSCADASTRAIS: "pessoa/cadastro/dados",
      TROCARSENHA: "pessoa/cadastro/trocar/senha",
      RECUPERARSENHA: "pessoa/cadastro/recuperar/senha",
      RECUPERARSENHANOVASENHA: "pessoa/cadastro/recuperar/nova",
      CONFIRMAREMAIL: "pessoa/cadastro/confirmar/email",

      GETCONTEUDOS: "cms/conteudos/",
      GETCONTEUDO: "cms/conteudo/",

      GETSACPERGUNTAS: "SAC/perguntas-frequentes",
      CADASTROPESSOA: "cadastro/" + ID_LOGIN_SI, // ID do login do SI Dinamico

      CONFIGS: "CustomUserApps/Configs",
      SETCONTATO: "CustomUserApps/Contato",
      NEWSLETTER: "CustomUserApps/Newsletter",
      VALIDAREMAIL: "CustomUserApps/ValidaEmail",
      VALIDARDOC: "CustomUserApps/ValidaDoc",
      RECEBERDOC: "CustomUserApps/receberDoc",
      GETDOCS: "CustomUserApps/getDocs",
      SETDOCS: "CustomUserApps/setDocs",
      REMOVEDOCS: "CustomUserApps/removeDocs",
      ESCUDOS: "CustomUserApps/Escudos",
      GETROLDANAS: "CustomUserApps/getSubcategorias",
      VALIDARCARTOES: "CustomUserApps/consultaCartaoSocio",
      BOTOESPLANOS: "CustomUserApps/getAcoesDisponiveis",
      GETCOMPRASCUSTOM: "CustomUserApps/PedidosPaginado",
      GETJOGOSQUEFUI: "CustomUserApps/jogosQueFui",
      GETACESSOLIBERADO: "customUserApps/AcessoLiberado",
      GETCONTRATOSVINCULOCADEIRA:
        "CustomUserApps/consultaContratosVinculoCadeira",
      GETCUPOMDESCONTO: "CustomUserApps/getCuponsDesconto",
      CADASTROESTRANGEIRO: "CustomUserApps/cadastroEstrangeiro",

      // SUPERINGRESSO

      GETEVENTOS: "getEventos",
      GETAPRESENTACOES: "getApresentacoes",
      GETAPRESENTACAO: "getApresentacao",
      GETPRODUTOS: "getProdutos",
      SETCARRINHO: "iniciarReserva",
      GETCARRINHOPAGE: "getCarrinhoPage",
      GETCARRINHOPAGEITENS: "getCarrinhoPageItens",
      CANCELARRESERVA: "cancelarReserva",
      CANCELACOMPRA: "cancelaCompra",
      GETIMPRESSAO: "getImpressao",
      SETPORTADORITEM: "portadorSetItem",
      INICIARTROCAVOUCHER: "iniciarTrocaVoucher",
      GETGATEWAYPAGAMENTO: "getGatewayPagamento",
      VALIDARENDERECO: "TransportadoraValidaEnderecoEntrega/",
      VALIDARPORTADORVARIAVEIS: "portadorGetVariaveisTemplate",

      //ENVIO CONSULADO

      QUANTIDADECONSUL: "solicitacaoConsulado",
      GETQUANTCONSUL: "ingressosConsulado",

      // GESTÃO SÓCIO
      FORMAPAGCONTRATO: "CustomUserApps/getFormaPagamento",
      FORMAPAGALTERAR: "CustomUserApps/getFormasAlterar",

      // OTT
      LOGINOTT: "CustomUserApps/OTT/login",
      GETRECOMENDACOES: "CustomUserApps/OTT/getVideos",
      CRIARUSUARIOOTT: "CustomUserApps/OTT/createUser",
      ALTERARPLANOOTT: "CustomUserApps/OTT/changeSubscription",

      //CHECK-IC
      SETORECHECKIN: "CustomUserApps/getSetoresCheckin",
      REALIZARCHECKIN: "CustomUserApps/realizarCheckin",

      // GAMEFICAÇÃO
      CADASTROGAMEFICACAO: "gamification/registerPerson",
      CONSULTARITEMRESGATADO: "gamification/getRescuedItem",
      CONSULTARRESGATES: "gamification/getRescueds",
      RESGATARITEM: "gamification/redeemItem",
      CONSULTARITEMCATALOGO: "gamification/getCatalogItem",
      CONSULTARCATALOGO: "gamification/getCatalog",
      CONSULTARNIVEIS: "gamification/getLevels",
      CONSULTARNIVEL: "gamification/getPersonLevel",
      CONSULTARPESSOA: "gamification/getPerson",
      CONSULTARPONTOS: "gamification/getPointsExtract",
      CONSULTAREVENTOSFIXOS: "gamification/fixedChallenges",
      CONSULTAREVENTOSMENSAIS: "gamification/monthlyChallenges	",

      // FILA
      GETFILA: "queue/position",

      //ADMIN CONTEÚDOS
      CRIARCONTEUDO: "cms/criarConteudo",
      EDITARCONTEUDO: "cms/editarConteudo",
    };
  }

  async getHeaders() {
    // FUNC: getHeaders()
    let headers = {
      "Content-Type": "application/json",
      "Ipy-CustomFrontend": "true",
    };

    if (this.getLocal("token")) {
      headers.Authorization = "Bearer " + this.getLocal("token");
    }

    if (this.getLocal("queueid")) {
      headers["Ipy-Queueid"] = this.getLocal("queueid");
    }

    return headers;
  }

  setParams(data) {
    if (!data) {
      return data;
    }

    let params = "";

    if ("params" in sessionStorage) {
      params =
        (data.indexOf("?") != -1 ? "&" : "?") +
        sessionStorage.getItem("params");
    }

    if (this.getLocal("lang")) {
      let l = this.getLocal("lang").data;

      if (data.indexOf("?") != -1) {
        return data + "&lang=" + l.replace("-", "_") + params; // + '&ambiente=' + ENV_CONF.AMBIENTE
      } else {
        return data + "?lang=" + l.replace("-", "_") + params; // + '&ambiente=' + ENV_CONF.AMBIENTE
      }
    }
    return data + (params.length > 3 ? params : "");
  }

  async get(url = "", param = "") {
    const root = await new Util().getVue();

    return await new Promise(async (resolve, reject) => {
      url = this.setParams(this.ENDPOINTS[url])
        ? this.setParams(this.ENDPOINTS[url] + param)
        : url + param;
      if (!url || url == "") {
        return false;
      }

      var response = [];

      try {
        response = await this.axios({
          method: "get",
          url: url,
          responseType: "json",
          responseEncoding: "utf8",
          headers: await this.getHeaders(),
        });
      } catch {
        return;
      }

      if (response != undefined) {
        if (response.headers["ipy-queueid"]) {
          this.setLocal("queueid", response.headers["ipy-queueid"]);
          // root.queueid = response.headers['ipy-queueid']
        }

        if (
          response &&
          response.headers &&
          response.headers.authorization &&
          response.headers.authorization != ""
        ) {
          let token = response.headers.authorization.split(" ");
          if (token && token[1]) {
            this.setLocal("token", token[1]);
          }
        }

        root.requisicoes--;

        if (response.data && response.data.queue) {
          root.fila = response.data.queue.position;
          return;
        }

        if (response.data && typeof response.data.error == "string") {
          new Util().snackbar(
            `Error: ${JSON.stringify(response.data.error.message)}`,
            "error"
          );
          reject(response);
        }

        if (response.data && typeof response.data.erro == "string") {
          new Util().snackbar(
            `Error: ${JSON.stringify(response.data.erro.message)}`,
            "error"
          );
          reject(response);
        }

        if (response.data && response.data.result) {
          if (
            response.data.result.error &&
            response.data.result.error.message
          ) {
            new Util().snackbar(
              `Error: ${JSON.stringify(response.data.result.error.message)}`,
              "error"
            );
          }
          resolve(response.data.result);
        }
        //TRÁS A MENSAGEM DE AVISO DO PEDIDO EM APROVAÇÃO PARA OS INGRESSOS DO CONSULADO
        if (response.data && typeof response.data.error == "object") {
          resolve(response.data);
        }

        //TRÁS A MENSAGEM DE AVISO DO PEDIDO EM APROVAÇÃO PARA OS INGRESSOS DO CONSULADO
        /* if(response.data){
                    resolve(response.data)
                } */
      } else {
        new Util().snackbar(`Error: ${JSON.stringify(response)}`);
        reject(response);
      }
    });
  }

  async post(url = "", dados = [], param = "") {
    const root = await new Util().getVue();

    root.requisicoes++;

    return await new Promise(async (resolve, reject) => {
      url = this.setParams(this.ENDPOINTS[url])
        ? this.setParams(this.ENDPOINTS[url] + param)
        : url + param;
      if (!url || url == "") {
        return false;
      }

      var response = [];

      // dados.id = await new Util().getBrowserUUID()

      try {
        response = await this.axios({
          method: "post",
          url: this.setParams(url),
          data: dados,
          withCredentials: false,
          responseType: "json",
          responseEncoding: "utf8",
          headers: await this.getHeaders(),
        }).catch((error) => {
          new Util().snackbar(
            `Error: ${error.response.data.error.message}`,
            "error"
          );
          reject(false);
        });
      } catch {
        return false;
      }

      if (response != undefined) {
        if (response.headers["ipy-queueid"]) {
          this.setLocal("queueid", response.headers["ipy-queueid"]);
          // root.queueid = response.headers['ipy-queueid']
        }

        if (
          response &&
          response.headers &&
          response.headers.authorization &&
          response.headers.authorization != ""
        ) {
          let token = response.headers.authorization.split(" ");
          if (token && token[1]) {
            this.setLocal("token", token[1]);
          }
        }

        root.requisicoes--;

        if (response.data && response.data.queue) {
          root.fila = response.data.queue.position;
          return;
        }

        if (response.data && response.data.error) {
          root.loadingAdd = false;
          root.loadingApp = false;
          root.loading = false;
          root.loadingSkeleton = false;

          if (response.data.error.code == 4) {
            root.$superingresso.getTermoNovo().then(async (res) => {
              new Util().snackbar(
                `${JSON.stringify(response.data.error.message)}`,
                "success"
              );

              if (res && res[0]) {
                let termo = res[0];
                root.modal.titulo = `<h1 class="d-flex align-center justify-center" style="margin-top:25px; color: var(--app-corterciaria)">${termo.dsctermo}</h1>`;
                root.modal.descricao = termo.termo;
                root.modal.botao = "Aceitar!";
                root.modal.link = root.$route.name;
                root.modal.persistent = true;
                root.modal.show = true;

                await new Util().sleep(2);

                let botao = document.getElementById("modal-botao");
                botao.addEventListener(
                  "click",
                  async () => {
                    root.$usuario.aceiteTermo(root.$usuario.login.email);
                    let cadastro = Object.assign({}, root.$usuario.login);
                    await new Util().sleep(1);
                    root.$usuario.getLogin(cadastro);
                  },
                  false
                );
              }
            });
            return;
          }

          if (response.data.error.code == 0) {
            if (
              response.data.error.message == "Cupom não encontrado" ||
              response.data.error.message == "Usuário ou senha incorreta" ||
              response.data.error.message == "Cupom inválido"
            ) {
              new Util().snackbar(
                `Error: ${JSON.stringify(response.data.error.message)}`,
                "error"
              );
              reject(false);
              return;
            }
            if (response.data.error.message == "E-mail ainda não confirmado") {
              root.modal.titulo = `
                                <img src="img/800px-Sign-check-icon.png" height="100" class="mx-auto">
                                <strong>Sucesso!!!</strong>
                            `;
              root.modal.conteudo = `
                                <p><strong>${response.data.error.message}</strong></p>
                                <small>Foi encaminhado para que você realize a autenticação do seu e-mail!</small>
                            `;

              root.modal.show = true;
              root.modalCadastro.show = false;
              root.modalUsuario.show = false;
              resolve(response);
              return;
            }
            if (
              response.data.error.message == "Dia de cobrança não permitido"
            ) {
              new Util().snackbar(
                `Error: ${JSON.stringify(response.data.error.message)}`,
                "error"
              );
              reject(false);
              return;
            }
            // if(JSON.parse(response.data.error.message).message == "Informe um cartão para vincular no ingresso"){
            //     new Util().snackbar(`Error: ${JSON.parse(response.data.error.message).message}`, 'error')
            //     return
            // }
            // // return console.log(JSON.parse(response.data.error.message).message)
            // if(JSON.parse(response.data.error.message).message == "Produto não liberado para o seu plano de sócio"){
            //     new Util().snackbar(`Error: ${JSON.parse(response.data.error.message).message}`, 'error')
            //     return
            // }
            // if(JSON.parse(response.data.error.message).message == "Limite do produto atingido"){
            //     new Util().snackbar(`Error: ${JSON.parse(response.data.error.message).message}`, 'error')
            //     return
            // }
            window.sessionStorage.removeItem("@we-login-admin");
            new Util().snackbar(
              `Error: ${JSON.stringify(response.data.error.message)}`,
              "error"
            );
            // new Util().go('Home')
            // this.removeLocal('carrinho');
            // this.removeLocal('carrinho_local');
            //reject(false)
            // resolve(response)
            return;
          }
          if (response.data.error.code == 1) {
            new Util().go("Login");
            const self = this;
            setTimeout(() => {
              self.destroyLocal(true);
            }, 1000);
            return;
          }
          if (response.data.error.code == 13121) {
            new Util().go("HubDados");
            new Util().snackbar(
              `Error: ${JSON.stringify(response.data.error.message)}`,
              "error"
            );
            reject(false);
            return;
          }
          if (
            response.data.error.code == 13225 ||
            response.data.error.code == 13227 ||
            response.data.error.code == 13089
          ) {
            if (response.data.error.code == 13089) {
              const menssage = JSON.parse(response.data.error.message);
              if (menssage && menssage.info && menssage.info.end) {
                new Util().snackbar(`Error: ${menssage.message}`, "error");
                root.modal.titulo = "<h1>Preencha os dados</h1>";
                root.modal.descricao = menssage.message;
                root.modal.component = ModalEndereco;
                return;
              }
              if (menssage.message.indexOf("RG") != -1) {
                new Util().snackbar(`Error: ${menssage.message}`, "error");
                root.modalRG.show = true;
                root.modalRG.persistent = true;
                return;
              } else {
                new Util().snackbar(`Error: ${menssage.message}`, "error");
                reject(false);
                return;
              }
            } else {
              new Util().go("HubDados");
              new Util().snackbar(
                `Error: ${JSON.stringify(response.data.error.message)}`,
                "error"
              );
              reject(false);
              return;
            }
          }
          if (response.data.error.code == 13124) {
            reject(false);
            return;
          }
          if (
            response.data.error.code == 13020 ||
            response.data.error.code == 13005
          ) {
            new Util().go("Jogos");
            reject(false);
          }

          if (
            response.data.error.code >= 6661 &&
            response.data.error.code <= 6668
          ) {
            resolve(response);
            return;
          }

          if (response.data.error.code == 80405) {
            root.openAdicionarCartao = true;
            reject(false);
          }

          if (response.data.error.code === 13001) {
            resolve(response);
            return;
          }

          if (response.data.error.code == 555) {
            new Util().snackbar(
              "Complete todos os campos obrigatórios para prosseguir!",
              "error"
            );
            return;
          }

          if (response.data.error.code == 80405) {
            root.openAdicionarCartao = true;
            reject(false);
          }

          if (response.data.error.code == 13087) {
            new Util().snackbar(
              `${JSON.stringify(response.data.error.message)}`,
              "error"
            );
            root.$router.push({
              name: "Cart",
              params: { pagina: root.$route.params.pagina },
            });
            return;
          }

          if (response.data.error.msg) {
            new Util().snackbar(
              `Error: ${JSON.stringify(response.data.error.message)}`,
              "error"
            );
            reject(false);
          }

          if (response.data.error.message) {
            new Util().snackbar(
              `Error: ${JSON.stringify(response.data.error.message)}`,
              "error"
            );
            return;
          }
        }

        if (response.data && response.data.maintenance) {
          root.manutencao = response.data.maintenance.info;
          resolve(true);
          return;
        }

        if (response.data && response.data.result) {
          if (
            response.data.result.error &&
            response.data.result.error.message
          ) {
            new Util().snackbar(
              `Error: ${JSON.stringify(response.data.result.error.message)}`,
              "error"
            );
          }
          resolve(response.data.result);
          return;
        }

        resolve(response.data.result);
      } else {
        if (response) {
          root.loadingApp = false;
          root.requisicoes--;

          new Util().snackbar(
            `${JSON.stringify(response.data.error.message)}`,
            "error"
          );
          reject(response);
        }
      }
    });
  }
}
