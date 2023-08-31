import Configuracoes from "@/controllers/Config.controller.js";
import Service from "@/controllers/Service.controller.js";
import StorageTable from "@/controllers/Storage.controller.js";
import Util from "@/controllers/Util.controller.js";
// import Lang from "@/plugins/languagen/index.js";

import config from "@/app.config.json";

export default class Usuario extends StorageTable {
  // TYPE: Class: Usuario()

  constructor() {
    super();

    this.$http = new Service();
    this.$util = new Util();
    this.$root = [];
    this.login = { email: "", senha: "" };

    // this.$t_ = function (chave) {
    //     return new Lang()._traslater(chave);
    // };
  }

  async rotasEmails() {
    // FUNC: rotasEmails() :ok
    this.$root = await this.$util.getVue();
    this.setParams();
    await this.getloginSocialCadastro();
    await this.confirmEmail();
  }

  setParams() {
    // FUNC: confirmEmail() :ok

    if (document.location.search != "") {
      sessionStorage.setItem("params", document.location.search.substring(1));
    }
  }
  async bannerTransmissaoConselho() {
    //PASSANDO BANNER DINÂMICO DO CMS
    await this.$http
      .get("GETCONTEUDOS", "banner_transmissao_conselho")
      .then((response) => {
        sessionStorage.setItem(
          "banner_transmissao_conselho",
          JSON.stringify(response)
        );
        return;
      });
  }

  async todosBanners() {
    let bannersStorage = sessionStorage.getItem("banners_internacional");
    if (!bannersStorage) {
      await this.$http
        .get("GETCONTEUDOS", "banners_intenacional")
        .then((response) => {
          sessionStorage.setItem(
            "banners_internacional",
            JSON.stringify(response)
          );
          return;
        });
    }
  }
  async Noticias() {
    return await this.$http
      .get("GETCONTEUDOS", "noticias_categoria")
      .then((response) => {
        response.filter((item) => {
          if (item.ordem == 0) {
            item.destaque = true;
          } else {
            item.destaque = false;
          }
        });
        // console.log(response)
        sessionStorage.setItem("carrousel_noticias", JSON.stringify(response));
        return;
      });
  }
  async getJogadores() {
    await this.$http.get("GETCONTEUDOS", "jogadores").then((response) => {
      sessionStorage.setItem("jogadores", JSON.stringify(response));
      return;
    });
  }
  async getFotos() {
    await this.$http
      .get("GETCONTEUDOS", "galeria_de_fotos")
      .then((response) => {
        sessionStorage.setItem("galeria-fotos", JSON.stringify(response));
        return;
      });
  }
  async bannersFutebol() {
    await this.$http.get("GETCONTEUDOS", "banners_futebol").then((response) => {
      sessionStorage.setItem("banners_futebol", JSON.stringify(response));
      return;
    });
  }
  async confirmEmail() {
    // FUNC: confirmEmail() :ok

    let token = await this.$util.getSearchParams(
      document.location.href,
      "validatemail"
    );

    if (token) {
      this.$http.post("CONFIRMAREMAIL", { token: token });
      this.$util.go("Confirmar");
    }
  }

  async esqueceuSenha() {
    // FUNC: esqueceuSenha() :ok

    if (
      await this.$util.getSearchParams(document.location.href, "esqueceusenha")
    ) {
      this.$root.modalSenha.show = true;
    }
  }

  async getTermoCompra() {
    // FUNC: getTermoCompra()
    return await this.$http.get("GETTERMOCOMPRA");
  }

  async getLogins() {
    // FUNC: getLogins() :ok
    return await this.$http.get("GETLOGINS");
  }

  async getloginSocialCadastro() {
    // FUNC: getloginSocialCadastro() :ok

    let token = await this.$util.getSearchParams(
      document.location.href,
      "access_token"
    );

    if (token) {
      this.setLocal("token", token);
      this.getPerfil().then((response) => {
        history.pushState({}, "Home", "/");
        this.setLocal("session", response);
        if ("URI" in sessionStorage) {
          const uri = sessionStorage.getItem("URI");
          sessionStorage.removeItem("URI");
          location.pathname = uri;
        } else {
          this.$util.go("Login");
          location.reload();
        }
      });
      return true;
    }

    this.requesitos();

    return false;
  }

  async requesitos() {
    const session = this.getLocal("session");

    if (session && session.token) {
      this.destroyLocal();
      return;
    }

    if (session && typeof session.nome != "undefined") {
      if (session && !session.cpf && !session.passaporte) {
        this.$util.snackbar(this.$t_("usuario_login_preencha"));
        this.$util.go("Cadastro", { tipo: this.getLocal("primeiro_cadastro") });
        window.$storage.removeLocal("tipo_login");
        window.$storage.removeLocal("primeiro_cadastro");
        return;
      }

      window.$storage.removeLocal("tipo_login");

      let local_carrinho = this.getLocal("local_carrinho");

      if (local_carrinho) {
        local_carrinho.forEach((item) => {
          this.$carrinho.setCarrinhoLocal(item).then(() => {
            window.$storage.removeLocal("local_carrinho");
            setTimeout(() => {
              this.$util.go("Checkout");
            }, 1000);
          });
        });
      }

      return true;
    }

    return false;
  }
  async verificaAcessoLiberado() {
    return await this.$http.get("GETACESSOLIBERADO");
  }

  async getLogin(login) {
    // FUNC: getLogin()
    // BUG: verificar o termo

    login = Object.assign({}, login);
    this.login = login;

    let dados = { _username: login.email.trim(), _password: login.senha };

    if (login.termo) {
      dados._termo = true;
      this.aceiteTermo(login.email)
        // this.$superingresso.aceiteTermo(login.email)
        .then(() => {
          this.fazerLogin(dados);
        });
      return;
    }

    this.fazerLogin(dados);
  }

  async testLogin(dados, idcliente) {
    if (!idcliente) {
      this.$util.snackbar(this.$t_("usuario_controller_atualize"), "error");
      return false;
    }

    return await this.$http.post("LOGIN", dados, idcliente);
  }

  async fazerLogin(dados) {
    // FUNC: fazerLogin()

    let idlogin;
    switch (process.env.NODE_ENV) {
      case "development":
        if (
          !this.$root.modalUsuario.id_homolog ||
          this.$root.modalUsuario.id_homolog == ""
        ) {
          this.$util.snackbar(this.$t_("usuario_controller_atualize"), "error");
          return;
        }
        idlogin = this.$root.modalUsuario.id_homolog;
        break;
      case "preproduction":
        if (
          !this.$root.modalUsuario.id_homolog ||
          this.$root.modalUsuario.id_homolog == ""
        ) {
          this.$util.snackbar(this.$t_("usuario_controller_atualize"), "error");
          return;
        }
        idlogin = this.$root.modalUsuario.id_homolog;
        break;
      case "production":
        if (
          !this.$root.modalUsuario.id_prod ||
          this.$root.modalUsuario.id_prod == ""
        ) {
          this.$util.snackbar(this.$t_("usuario_controller_atualize"), "error");
          return;
        }
        idlogin = this.$root.modalUsuario.id_prod;
        break;
    }

    this.$http.post("LOGIN", dados, idlogin).then(async (response) => {
      let dados = response.user;
      if (response && response.access_token) {
        this.$root.modalUsuario.show = false;
        this.$root.modalLogin.show = false;
        this.setLocal("token", response.access_token);
        const confi = new Configuracoes(true);
        if (dados) {
          dados.idpessoa = response.user.idpessoa;

          this.setLocal("session", dados);

          this.setLocal("confirm_login", true);

          this.$root.loading = false;
          if (
            this.getLocal("primeiro_cadastro") &&
            this.getLocal("primeiro_cadastro") == "socio"
          ) {
            this.$util.go("Planos");
          } else {
            if (
              (this.getLocal("primeiro_cadastro") &&
                this.getLocal("primeiro_cadastro") == "visitante") ||
              this.getLocal("primeiro_cadastro") == "publicogeral"
            ) {
              this.$util.go("BoasVindas");
            } else if ($root.$route.params.rota) {
              this.$util.go(
                $root.$route.params.rota[0],
                $root.$route.params.rota[1]
              );
            } else {
              this.$util.go("Hub");
            }
            // this.$util.go('Hub');
          }
        } else {
          if (location.pathname != "Home") {
            this.$util.go("Login");
          } else {
            this.$util.scroll();
          }
        }
      }
    });
  }

  loginSocial(login) {
    // FUNC: loginSocial
    if (login.tipo == "superingresso") {
      this.$root.modalUsuario.id = login.id;
      this.$root.modalUsuario.cor = login.cor;
      this.$root.modalUsuario.logo = login.icone;
      this.$root.modalUsuario.show = true;
      return;
    }

    sessionStorage.setItem("URI", document.location.pathname);

    setTimeout(() => {
      document.location.href = login.url;
    }, 500);
  }

  async recuperarSenha(email) {
    // FUNC: recuperarSenha :ok

    this.$root.loading = true;
    this.$http
      .post("RECUPERARSENHA", { username: email })
      .then((response) => {
        this.$root.loading = false;
        if (response && response.sucesso) {
          this.$root.modal.titulo = `
                    <div class="d-flex align-center justify-center">
                        <span style="font-size: 100px; letter-spacing: 0.2rem; font-family: fontSecundaria !important; color: var(--app-corprimaria); ">Feito!</span>
                    </div>
                    <div class="text-center" style="font-size:16px; color: var(--dl-color-gray-light); font-weight: bold">
                        ${this.$t_("instrucoes_enviadas")}
                    </div>
                `;
          this.$root.modal.descricao = `
                    <div class="pa-3 text-center">
                        <p>${this.$t_("modal_senha_instrucoes")}</p>
                        <p>${this.$t_("card_tipo_email")}</p>
                    </div>
                `;
          this.$root.modal.botao = "Voltar para o início";
          this.$root.modal.link = "back";
          return;
        } else {
          if (response && response.data.error) {
          }
        }
      })
      .catch(() => {});
  }

  recoverySenha(dados) {
    // FUNC: recoverySenha()

    this.$http.post("RECUPERARSENHANOVASENHA", dados).then((response) => {
      if (response) {
        this.$util.go("Login");
      }
    });
  }

  trocarSenha(cadastro) {
    // FUNC: trocarSenha

    if (cadastro.old_password.length == 0) {
      this.$util.snackbar(this.$t_("login_atual"));
      return;
    }
    if (this.$util.validarSenha(cadastro.senha).rating < 60) {
      this.$util.snackbar(this.$t_("perfil_preencha_senha_corret"));
      return;
    }
    if (cadastro.senha2 != cadastro.senha) {
      this.$util.snackbar(this.$t_("login_incompativeis"));
      return;
    }
    if (cadastro.old_password == cadastro.senha) {
      this.$util.snackbar(this.$t_("senhas_iguais"));
      return;
    }
    this.$root.loading = true;
    this.$http
      .post("TROCARSENHA", {
        oldpassword: cadastro.old_password,
        password: cadastro.senha,
      })
      .then((response) => {
        if (response) {
          sessionStorage.removeItem("token");
          localStorage.removeItem("token");
          window.$storage.destroyLocal(true);
          this.$util.go("Login");

          this.$root.loading = false;
          this.$root.modal.show = true;
          this.$root.modal.titulo = `
                    <div class="d-flex align-center justify-center">
                        <img src="/img/800px-Sign-check-icon.png" height="100" class="my-3"/>
                    </div>
                    <div class="text-center" style="font-size:20px; color: var(--dl-color-primary); font-weight: bold">
                        NOVA SENHA CADASTRADA
                    </div>
                `;
          this.$root.modal.descricao = `
                    <div class="pa-3 text-center">
                        <p style="font-weight:bold; font-size: 20px !important;"><strong>Sua nova senha foi cadastrada com sucesso!</strong></p>
                    </div>
                `;
        }
      });
  }

  //REFERENTE AOS INGRESSOS DO CONSULADO
  pedidoConsul(dados) {
    // FUNC: trocarSenha
    // console.log(dados)
    this.$http
      .post("QUANTIDADECONSUL", {
        idpessoa: dados.idpessoa,
        qtde: dados.qtde,
        idapresentacao: dados.idapresentacao,
      })
      .then((response) => {
        this.$root.modal.show = response;
        this.$root.modal.titulo = `
                    <div class="d-flex align-center justify-center">
                        <img src="/img/800px-Sign-check-icon.png" height="100" class="my-3"/>
                    </div>
                    <div class="text-center" style="font-size:20px; color: var(--dl-color-primary); font-weight: bold">
                        ${this.$t_("solicitacao_consul_success")}
                    </div>
                `;
        this.$root.modal.descricao = `
                    <div class="pa-3 text-center">
                        <p>${this.$t_("consul_modal_instrucoes")}</p>
                    </div>
                `;
        setTimeout(() => {
          location.reload(true);
        }, 3500);
        return;
      });
  }
  async getConsul(dados) {
    // FUNC: getConsul()
    return await this.$http.post("GETQUANTCONSUL", {
      idapresentacao: dados.idapresentacao,
      idpessoa: dados.idpessoa,
    });
  }

  async validarCadastro(cadastro, local) {
    // FUNC: validarCadastro() :ok

    cadastro = this.$util.clone(cadastro);

    cadastro = this.$util.clone(cadastro);

    let instance = await this.$util.getVue();
    let route = instance.$route;

    // if(cadastro.nacionalidade == true){
    //     cadastro.end_pais = 'Brasil'
    // } else {
    //     // delete cadastro.cpf
    // }

    if (
      cadastro.nome.length < 2 ||
      cadastro.nome == "" ||
      cadastro.nome.indexOf(" ") == -1
    ) {
      this.$root.loading = false;
      this.$util.snackbar(this.$t_("perfil_preencha_nome_corret"), "error");
      this.$util.scroll("form-nome");
      return;
    }

    if (
      (!cadastro.complementar || cadastro.complementar.length == 0) &&
      local == "cadastro"
    ) {
      this.$root.loading = false;
      this.$util.snackbar(this.$t_("perfil_preencha_time_corret"), "error");
      this.$util.scroll("form-time");
      return;
    }

    if (!cadastro.editar) {
      const testDoc = await this.onchangerDoc(cadastro);
      if (testDoc == "SIM") {
        this.$root.loading = false;
        this.$root.modal.titulo = `
                <div class="d-flex align-center justify-center">
                        <span style="font-size: 140px; font-family: fontSecundaria !important; color: var(--app-corprimaria);">Ops!</span>
                    </div>
                    <div class="text-center text-uppercase" style="font-size:20px; color: var(--dl-color-primary); font-weight: bold">
                        ${"DOCUMENTO JÁ CADASTRADO"}
                    </div>
                `;
        this.$root.modal.descricao = `
                    <div class="pa-3 text-center">
                        <p>Este documento já está vinculado a uma conta em nossa plataforma.</p>
                        <p><strong>Quer recuperar a senha para acessar?</strong></p>
                    </div>
                `;
        this.$root.modal.botao = "RECUPERAR SENHA";
        this.$root.modal.link = "Esquecisenha";

        return;
      }
    }

    if (this.$util.getIdade(cadastro.dt_nascimento) < 0) {
      this.$root.loading = false;
      this.$util.snackbar(this.$t_("idade_error"), "error");
      this.$util.scroll("form-dt_nascimento");
      return;
    }

    if (cadastro.estrangeiro == true) {
      if (
        !cadastro.nacionalidade ||
        cadastro.nacionalidade.length < 2 ||
        cadastro.nacionalidade == ""
      ) {
        this.$root.loading = false;
        this.$util.snackbar(this.$t_("perfil_preencha_nacionalidade"), "error");
        this.$util.scroll("form-nacionalidade");
        return;
      }

      if (
        !cadastro.passaporte ||
        cadastro.passaporte.length < 3 ||
        cadastro.passaporte == ""
      ) {
        this.$root.loading = false;
        this.$util.snackbar(this.$t_("perfil_preencha_documento"), "error");
        this.$util.scroll("form-documento");
        return;
      }

      if (!cadastro.foto_documento1 || cadastro.foto_documento1 == "") {
        this.$root.loading = false;
        this.$util.snackbar(this.$t_("perfil_anexar_documento"), "error");
        this.$util.scroll("form-foto_documento1");
        return;
      }
    } else {
      if (
        (!cadastro.cpf && !cadastro.passaporte) ||
        (cadastro.cpf && !this.$util.validarCPF(cadastro.cpf))
      ) {
        this.$root.loading = false;
        this.$util.snackbar(this.$t_("perfil_preencha_documento"), "error");
        this.$util.scroll("form-cpf");
        return;
      }
    }

    if (cadastro.sexo == "" || cadastro.sexo > 4) {
      this.$root.loading = false;
      this.$util.snackbar(this.$t_("perfil_preencha_sexo_corret"), "error");
      this.$util.scroll("form-sexo");
      return;
    }

    if (
      local == "cadastro" || local == "meusdados"
        ? !cadastro.celularComCodigoPais ||
          (cadastro.celular != null
            ? cadastro.celular.length != cadastro.limiteCelular
            : true) ||
          cadastro.celularComCodigoPais == ""
        : !cadastro.celular || cadastro.celular == ""
    ) {
      this.$root.loading = false;
      this.$util.snackbar(this.$t_("perfil_preencha_celular_corret"), "error");
      this.$util.scroll("form-celular");
      return;
    }

    if (cadastro.email == "" || !this.$util.validarEmail(cadastro.email)) {
      this.$root.loading = false;
      this.$util.snackbar(this.$t_("perfil_preencha_email_corret"), "error");
      this.$util.scroll("form-email");
      return;
    }

    if (!cadastro.editar) {
      const testEmail = await this.onchangerEmail(cadastro.email);
      if (testEmail == "SIM") {
        this.$root.loading = false;

        this.$root.modal.titulo = `
                    <div class="d-flex align-center justify-center">
                        <span style="font-size: 140px; font-family: fontSecundaria !important; color: var(--app-corprimaria);">Ops!</span>
                    </div>
                    <div class="text-center text-uppercase" style="font-size:20px; color: var(--dl-color-primary); font-weight: bold">
                        ${this.$t_("email_cadastrado")}
                    </div>
                `;
        this.$root.modal.descricao = `
                    <div class="pa-3 text-center">
                        <p>${this.$t_("modal_email_ok_vinculado")}</p>
                        <p style="font-weight:bold; font-size: 20px !important;"><strong>${this.$t_(
                          "modal_email_ok_rec_senha"
                        )}</strong></p>
                    </div>
                `;
        this.$root.modal.botao = "RECUPERAR SENHA";
        this.$root.modal.link = "Esquecisenha";

        this.$root.modal.botao1 = "VOLTAR";
        this.$root.modal.link1 = "Cadastro";

        return;
      }
    }

    if (!cadastro.editar && !this.getLocal("token")) {
      if (this.$util.validarSenha(cadastro.senha).rating < 60) {
        this.$root.loading = false;
        this.$util.snackbar(this.$t_("perfil_preencha_senha_corret"), "error");
        this.$util.scroll("form-senha");
        return;
      }

      if (cadastro.senha != cadastro.senha2) {
        this.$root.loading = false;
        this.$util.snackbar(this.$t_("login_incompativeis"), "error");
        this.$util.scroll("form-senha2");
        return;
      }
    }

    if (config.globalConfigs.editarEndereco || cadastro.end_editar) {
      if (
        !cadastro.end_cep ||
        cadastro.end_cep.length < 5 ||
        cadastro.end_cep == ""
      ) {
        this.$root.loading = false;
        this.$util.snackbar(this.$t_("perfil_preencha_cep"), "error");
        this.$util.scroll("form-end_cep");
        return;
      }

      if (
        !cadastro.end_pais ||
        cadastro.end_pais.length < 2 ||
        cadastro.end_pais == ""
      ) {
        this.$root.loading = false;
        this.$util.snackbar(this.$t_("perfil_preencha_pais_corret"), "error");
        this.$util.scroll("form-end_pais");
        return;
      }

      if (
        !cadastro.end_estado ||
        cadastro.end_estado.length < 2 ||
        cadastro.end_estado == ""
      ) {
        this.$root.loading = false;
        this.$util.snackbar(this.$t_("perfil_preencha_estado_corret"), "error");
        this.$util.scroll("form-end_estado");
        return;
      }

      if (
        !cadastro.end_cidade ||
        cadastro.end_cidade.length < 2 ||
        cadastro.end_cidade == ""
      ) {
        this.$root.loading = false;
        this.$util.snackbar(this.$t_("perfil_preencha_cidade_corret"), "error");
        this.$util.scroll("form-end_cidade");
        return;
      }

      if (!cadastro.passaporte || cadastro.passaporte == "") {
        if (
          !cadastro.end_bairro ||
          cadastro.end_bairro.length < 2 ||
          cadastro.end_bairro == ""
        ) {
          this.$root.loading = false;
          this.$util.snackbar(this.$t_("perfil_preencha_end_corret"), "error");
          this.$util.scroll("form-end_bairro");
          return;
        }
      }

      if (
        !cadastro.end_logradouro ||
        cadastro.end_logradouro.length < 2 ||
        cadastro.end_logradouro == ""
      ) {
        this.$root.loading = false;
        this.$util.snackbar(this.$t_("perfil_preencha_end_corret"), "error");
        this.$util.scroll("form-end_logradouro");
        return;
      }

      if (
        !cadastro.end_numero ||
        cadastro.end_numero.length < 1 ||
        cadastro.end_numero == ""
      ) {
        this.$root.loading = false;
        this.$util.snackbar(this.$t_("perfil_preencha_end_corret"), "error");
        this.$util.scroll("form-end_numero");
        return;
      }
    }

    if (cadastro.termos == "" || cadastro.termos == false) {
      this.$root.loading = false;
      this.$util.snackbar(this.$t_("footer_termos"), "error");
      return;
    }

    if (!cadastro.editar) {
      cadastro.password = cadastro.senha.trim();
    }

    if (cadastro.complementar && typeof cadastro.complementar == "object") {
      cadastro.complementar = JSON.stringify(cadastro.complementar);
    }

    if (cadastro.estrangeiro == true) {
      cadastro.rg = "000000";
      cadastro.rg_uf = "RS";
      cadastro.nome_mae = "Estrangeiro";
      cadastro.cpf = "";
    } else if (!cadastro.editar) {
      cadastro.end_pais = "Brasil";
      cadastro.nacionalidade = cadastro.end_pais;
    }

    cadastro.nome = cadastro.nome.trim();
    cadastro.email = cadastro.email.toLowerCase().trim();
    cadastro.rg = this.$util.removerCaracteres(cadastro.rg);
    cadastro.newsletter = cadastro.newsletter ? 1 : 0;

    if (!cadastro.nacionalidade) {
      delete cadastro.nacionalidade;
    }

    cadastro.username = cadastro.email;
    if (local != "editarEndereco") {
      cadastro.celular = cadastro.celularComCodigoPais;
    }

    cadastro.idioma = this.getLocal("lang")
      ? this.getLocal("lang").substring(0, 2)
      : "pt";

    // cadastro.dt_nascimento = this.getLocal('lang') && this.getLocal('lang') == 'en-US' ? moment(cadastro.dt_nascimento).format('YYYY-MM-DD') : moment(cadastro.dt_nascimento).format('YYYY-MM-DD')

    delete cadastro.sobrenome;
    delete cadastro.email2;
    // delete cadastro.senha
    delete cadastro.senha2;
    delete cadastro.showsenha;
    delete cadastro.showsenha2;
    delete cadastro.celularComCodigoPais;
    delete cadastro.limiteCelular;
    delete cadastro.dt_nascimento_temp;
    delete cadastro.loading;

    let dados = {};

    Object.keys(cadastro).forEach((key) => {
      dados[`_${key}`] = `${cadastro[key]}`;
    });

    if (this.getLocal("token")) {
      dados.senha = "";
      dados.senha2 = "";
      this.setEdit(cadastro);
      return;
    }

    if (cadastro.estrangeiro == true) {
      this.$http.post("CADASTROESTRANGEIRO", cadastro).then((response) => {
        this.$root.loading = false;
        if (response == true) {
          this.$util.go("CadastroEstrangeiro");
        }
      });
    } else {
      this.cadastrarPessoa(dados);
    }
  }

  async cadastrarPessoa(cadastro) {
    // FUNC: cadastrarPessoa()
    let idlogin;
    switch (process.env.NODE_ENV) {
      case "development":
        if (
          !this.$root.modalUsuario.id_homolog ||
          this.$root.modalUsuario.id_homolog == ""
        ) {
          this.$util.snackbar(this.$t_("usuario_controller_atualize"), "error");
          return;
        }
        idlogin = this.$root.modalUsuario.id_homolog;
        break;
      case "preproduction":
        if (
          !this.$root.modalUsuario.id_homolog ||
          this.$root.modalUsuario.id_homolog == ""
        ) {
          this.$util.snackbar(this.$t_("usuario_controller_atualize"), "error");
          return;
        }
        idlogin = this.$root.modalUsuario.id_homolog;
        break;
      case "production":
        if (
          !this.$root.modalUsuario.id_prod ||
          this.$root.modalUsuario.id_prod == ""
        ) {
          this.$util.snackbar(this.$t_("usuario_controller_atualize"), "error");
          return;
        }
        idlogin = this.$root.modalUsuario.id_prod;
        break;
    }

    this.$http
      .post("CADASTROPESSOA", cadastro, idlogin)
      .then(async (response) => {
        if (response) {
          this.setLocal("confirmCadastro", true);
          await this.$http
            .post("CRIARUSUARIOOTT", cadastro)
            .then(async (responseOtt) => {});

          if (this.getLocal("token")) {
            this.$util.go("Login");
          } else {
            this.fazerLogin({
              _username: this.$util.removerCaracteres(cadastro._cpf.trim()),
              _password: cadastro._password,
            });
          }
        }
      })
      .catch(() => {});
  }

  async getPerfil() {
    // FUNC: getPerfil()
    return await this.$http.get("DADOSCADASTRAIS");
  }

  getSexo() {
    // FUNC: getSexo
    return [
      { dsc: this.$t_("card_naoinformado"), value: "1" },
      { dsc: this.$t_("card_masculino"), value: "2" },
      { dsc: this.$t_("card_feminino"), value: "3" },
      { dsc: this.$t_("card_outros"), value: "4" },
    ];
  }

  getStatusSocial() {
    // FUNC: getStatusSocial
    return [
      { dsc: this.$t_("card_solteiro"), value: "1" },
      { dsc: this.$t_("card_casado"), value: "2" },
      { dsc: this.$t_("card_divorciado"), value: "3" },
      { dsc: this.$t_("card_viuvo"), value: "4" },
      { dsc: this.$t_("card_separado"), value: "5" },
    ];
  }

  async onchangerEmail(email) {
    // FUNC: onchangerEmail
    // BUG: verificar nos outros projetos, pois não existe no user Apps
    return await this.$http.post("VALIDAREMAIL", { email: email });
  }

  async onchangerDoc(cadastro) {
    // FUNC: onchangerEmail
    // BUG: verificar nos outros projetos, pois não existe no user Apps
    return await this.$http.post("VALIDARDOC", {
      doc: cadastro.cpf
        ? this.$util.removerCaracteres(cadastro.cpf)
        : cadastro.passaporte,
    }); // pode ser e-mail ou passaporte
  }

  getDocs() {
    return [
      { name: "CONTRACHEQUE", subtitle: "", key: "contra_cheque", show: true },
      {
        name: "CARTEIRA DE TRABALHO",
        subtitle: "Para comprovar a renda indiv",
        key: "carteira_trabalho",
        show: true,
      },
      {
        name: "CADASTRO ÚNICO DO GOVERNO FEDERAL",
        subtitle: "Para comprovar a situação ativa.",
        key: "cadastro_federal",
        show: true,
      },
      {
        name: "COMPROVANTE DE MATRÍCULA",
        subtitle: "Estudantes de escola pública.",
        key: "comprovante_matricula",
        show: true,
      },
      {
        name: "COMPROVANTE DE RESIDÊNCIA",
        subtitle: "",
        key: "comprovante_residencia",
        show: true,
      },
    ];
  }

  async aceiteTermo(email) {
    return await this.$http.post("ACEITETERMO", { username: email });
  }

  async envioDoc(dados) {
    // FUNC: onchangerEmail
    return await this.$http
      .post("RECEBERDOC", {
        idpessoa: dados.idpessoa,
        doc: dados.doc,
        name_arquivo: dados.name_arquivo,
      }) //PASSA O ID PESSOA DA SESSÃO E O TIPO DO DOC
      .then((response) => {
        if (response == true) {
          new Util().snackbar(
            `Envio do(s) documento(s) realizado com sucesso!`,
            "success"
          );
          setTimeout(() => {
            this.$root.loading = false;
            this.$util.go("SerSocioCheckout");
          }, 1000);
        }
      });
  }

  setEdit(dados) {
    // FUNC: setEdit

    this.$http.post("DADOSCADASTRAIS", dados).then((response) => {
      this.$root.loading = true;
      this.setLocal("session", dados);
      if (response) {
        this.setLocal("confirmEdit", true);
        this.$root.loading = false;
        this.$util.snackbar(this.$t_("usuario_cadastro"), "success");
        if ((dados && dados.end_cep == "") || dados.end_cep == null) {
          return this.$util.go("HubEndereco");
        } else {
          if (this.getLocal("pagina_retorno")) {
            let pagina = this.getLocal("pagina_retorno");
            this.$util.go(pagina.nome, pagina.params);
          } else {
            setTimeout(() => {
              window.scrollTo(0, 0);
            }, 1000);
          }
        }
      }
    });
  }
}
