import Service from "@/controllers/Service.controller.js";
import Util from "@/controllers/Util.controller.js";
export default class SuperIngresso extends Util {
  // TYPE: Class: Superingresso()
  constructor() {
    super();
    this.$http = new Service();
    this.evento = [];
    this.apresentacoes = [];
  }

  async getDados(method, classe = "SuperIngresso", params = []) {
    // FUNC: getDados()
    return await this.$http.post(
      `router.php?method=${method}&class=${classe}`,
      { class: classe, method: method, params: params }
    );
  }

  async getShowEmail(idemail) {
    return await this.getDados("viewMail", "BaseEmailClass", [
      { email: idemail },
    ]);
  }

  async loginOAuth(params) {
    // FUNC: LoginOAuth2()
    return await this.getDados("login", "OAuth2", params);
  }

  async getConfigWeb() {
    // FUNC: getConfigWeb()
    return await this.getDados("getConfigs", "SuperIngressoWeb", [false]);
  }

  async getPerfil(params) {
    // FUNC: getPerfil()
    return await this.getDados("getPessoa", "BasePessoaClass", params);
  }

  async getEventos() {
    // FUNC: getEventos()
    return await this.getDados("getEventos");
  }

  async getEscudos() {
    // FUNC: getEscudos()
    return await this.$http.get("ESCUDOS");
  }
  async setoresCheckin(params) {
    // FUNC: setoresCheckin()
    return await this.$http.post("SETORECHECKIN", params);
  }
  async realizarCheckin(params) {
    // FUNC: realizarCheckin()
    return await this.$http.post("REALIZARCHECKIN", params);
  }

  // async aceiteTermo(email) { // FUNC: aceiteTermo()
  //     console.log(email)
  //     return await this.getDados('aceiteTermo', 'BasePessoaClass', [email])
  //     return await this.getDados('aceiteTermo', 'BasePessoaClass', [email])
  // }

  async cancelarCartao(idcartao) {
    // FUNC: aceiteTermo()
    return await this.getDados("cancelarCartao", "Pagamentos", [idcartao]);
  }

  async getApresentacoes(idevento, single = false) {
    // FUNC: getApresentacoes()

    if (single) {
      return await this.getDados("getApresentacoes", "SuperIngresso", [
        idevento,
      ]);
    }

    this.getDados("getApresentacoes", "SuperIngresso", [idevento]).then(
      (response) => {
        if (response) {
          this.apresentacoes = [];
          let datas = [];
          let res = response;

          if (res.dates) {
            res.dates.forEach((item) => {
              datas.push(item.dia);
            });

            let apresentacoes = res.apresentacoes.filter((apre) => {
              let date = apre.dthr_apresentacao.split(" ")[0];
              if (datas.includes(date)) return apre;
            });

            res.apresentacoes = apresentacoes;
          }

          this.apresentacoes = res;
        }
      }
    );
  }

  async getApresentacao(idapresentacao) {
    // FUNC: getApresentacao()
    return await this.getDados("getApresentacao", "SuperIngresso", [
      idapresentacao,
    ]);
  }

  async getApresentacoesHorarios(idevento, data) {
    // FUNC: getApresentacao
    return await this.getDados("getApresentacoesHorarios", "SuperIngresso", [
      idevento,
      data,
    ]);
  }

  async getProdutos(idapresentacao) {
    // FUNC: getProdutos()
    return await this.getDados("getProdutos", "SuperIngresso", [
      idapresentacao,
    ]);
  }

  async getTipoProdutos(idapresentacao) {
    // FUNC: getTipoProdutos()
    return await this.getDados("getProdutos", "SuperIngresso", [
      idapresentacao,
    ]);
  }

  async getProdutosLugar(
    $idapresentacao,
    $idmapa_fis,
    $idmapa_bloco_fis,
    $idmapa_assento_fis,
    $idpessoa = null
  ) {
    return await this.getDados("getProdutosLugar", "SuperIngresso", [
      $idapresentacao,
      $idmapa_fis,
      $idmapa_bloco_fis,
      $idmapa_assento_fis,
      $idpessoa,
    ]);
  }

  async getMapBlocos(idmapa, blocos, idapresentacao) {
    // FUNC: getMapBlocos()
    return await this.getDados("carregarBlocos", "MapaClass", [
      idmapa,
      JSON.stringify(blocos),
      "V",
      idapresentacao,
      null,
      null,
    ]);
  }

  async getMapAssentos(idmapa) {
    // FUNC: getMapAssentos()
    return await this.getDados("carregarAssentos", "MapaClass", [idmapa]);
  }

  async getProdutosBloco(params) {
    return await this.getDados("getProdutosBloco", "SuperIngresso", params);
  }

  async getMapLugaresDisponiveis(params) {
    // FUNC: getMapLugaresDisponiveis()
    return await this.getDados("qtdLugaresDisponiveis", "MapaClass", params);
  }

  async getMapa(idmapa) {
    // FUNC: getMapa()
    return await this.getDados("carregar", "MapaClass", [idmapa]);
  }

  async setCarrinho(params) {
    // FUNC: setCarrinho()
    return await this.getDados("iniciarReserva", "SuperIngresso", params);
  }

  async getCarrinhoPage() {
    // FUNC: getCarrinhoPage()
    return await this.getDados("getCarrinhoPage");
  }

  async getCarrinhoPageItens(idmovimentacao) {
    // FUNC: getCarrinhoPageItens()
    return await this.getDados("getCarrinhoPageItens", "SuperIngresso", [
      idmovimentacao,
      null,
      { api: true },
    ]);
  }

  async cancelarReserva(idMovimentacao) {
    // FUNC: cancelarReserva()
    return await this.getDados("cancelarReserva", "SuperIngresso", [
      idMovimentacao,
      null,
      false,
      false,
    ]);
  }

  async cancelarBoleto(idMovimentacao) {
    // FUNC: cancelarBoleto()
    return await this.getDados("cancelarBoleto", "SuperIngresso", [
      idMovimentacao,
    ]);
  }

  async removeProdutoCarrinho(idmovimentacao, idprod) {
    // FUNC: removeProdutoCarrinho()
    return await this.getDados("removeProdutoCarrinho", "SuperIngresso", [
      idmovimentacao,
      idprod,
      false,
      false,
    ]);
  }

  async cancelarCompra(idmovimentacao, items) {
    // FUNC: cancelarCompra()
    // console.log(idmovimentacao)
    // console.log(items)
    return await this.getDados("cancelaCompra", "SuperIngresso", [
      idmovimentacao,
      items,
    ]).then((response) => {
      return response.aguarde;
    });
  }

  async getTermoCorrente(idTermo) {
    // FUNC: getTermoCorrente()
    return await this.getDados("getTermoCorrente", "BaseTermoClass", [
      2,
      idTermo,
    ]);
  }

  async getTermoNovo() {
    // FUNC: getTermoCorrente()
    return await this.getDados("get", "BaseTermoClass", [{}]);
  }

  async getImpressao(idmovimentacao) {
    // FUNC: getImpressao()
    return await this.getDados("getImpressao", "SuperIngresso", [
      idmovimentacao,
    ]);
  }

  async setPortadorItem(params) {
    // FUNC: setPortadorItem()
    return await this.getDados("portadorSetItem", "SuperIngresso", params);
  }

  async trocarVoucher(idLocalizador, idpessoa) {
    // FUNC: trocarVoucher()
    return await this.getDados("iniciarTrocaVoucher", "SuperIngresso", [
      idLocalizador,
      idpessoa,
    ]);
  }

  async getFormasPagamento(idmovimentacao) {
    // FUNC: getFormasPagamento()
    return await this.getDados("GetGatewayPagamento", "SuperIngresso", [
      idmovimentacao,
    ]);
  }
  async validaPortadorVariaveis(idregra) {
    // FUNC: validaPortadorVariaveis()
    return await this.getDados(
      "portadorGetVariaveisTemplate",
      "SuperIngresso",
      [idregra]
    );
  }

  async validaPortadorVariaveis(idregra) {
    // FUNC: validaPortadorVariaveis()
    return await this.getDados(
      "portadorGetVariaveisTemplate",
      "SuperIngresso",
      [idregra]
    );
  }

  async getEnderecosEntrega() {
    // FUNC: getEnderecosEntrega()
    return await this.getDados(
      "getEnderecosEntrega",
      "BasePessoaEnderecoEntregaClass"
    );
  }

  async setEnderecoEntrega(params) {
    // FUNC: setEnderecoEntrega()
    return await this.getDados(
      "setEnderecoEntrega",
      "BasePessoaEnderecoEntregaClass",
      params
    );
  }

  async iniciarPagamento(idmovimentacao, idformapagamento, card, params) {
    // FUNC: iniciarPagamento()
    return await this.getDados("iniciarPagamento", "SuperIngresso", [
      idmovimentacao,
      idformapagamento,
      this.addGetInfoUrl({ simodalexternaliframe: "closeAll" }),
      card,
      params,
    ]);
  }

  async concluirPagamento(idmovimentacao) {
    // FUNC: concluirPagamento()
    return await this.getDados("concluirPagamento", "SuperIngresso", [
      { idmovimentacao: idmovimentacao },
    ]);
  }

  async vincularPortador(idmovimentacaoitem, dadoswallet) {
    // FUNC: vincularPortador()
    return await this.getDados("elevenWallet", "SuperIngressoWeb", [
      idmovimentacaoitem,
      dadoswallet,
    ]);
  }

  async getImpressaoNovo(idmovimentacaoitem) {
    // FUNC: getImpressaoNovo()
    return await this.getDados("getImpressao", "SuperIngresso", [
      idmovimentacaoitem,
    ]);
  }

  async desVincularPortador(idmovimentacaoitem) {
    // FUNC: desVincularPortador()
    return await this.getDados("removeElevenWallet", "SuperIngressoWeb", [
      idmovimentacaoitem,
    ]);
  }

  async aplicarCupom(idmovimentacao, cupom) {
    // FUNC: aplicarCupom()
    return await this.getDados("aplicarCupom", "SuperIngresso", [
      idmovimentacao,
      cupom,
    ]);
  }

  async validarEmail(email) {
    // FUNC: validarEmail()
    return await this.getDados("validaemail", "SuperIngressoWeb", [
      email,
      null,
    ]);
  }

  async CadastroPessoa(params) {
    // FUNC: CadastroPessoa()
    return await this.getDados("setPessoa", "BasePessoaClass", params);
  }

  async getDownloadURLPkPassWallet(tokenIngresso, idmovimentacaoitem) {
    // FUNC: getDownloadURLPkPassWallet()
    return await this.getDados("imprimirWallet", "SuperIngressoWeb", [
      tokenIngresso,
      idmovimentacaoitem,
    ]);
  }
}

// Vue.prototype.$superingresso = new SuperIngresso()

// window.$superingresso = new SuperIngresso()
