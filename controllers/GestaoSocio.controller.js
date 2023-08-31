import Service from "@/controllers/Service.controller.js";
import Util from "@/controllers/Util.controller.js";

export default class GestaoSocio extends Util {
  // TYPE: Class: GestaoSocio()
  constructor() {
    super();
    this.$http = new Service();
  }

  async getDados(method, classe = "GestaoSocio", params = []) {
    // FUNC: getDados()
    return await this.$http.post(
      `router.php?method=${method}&class=${classe}`,
      { class: classe, method: method, params: params }
    );
  }

  async getEnderecosEntrega(idendereco = null) {
    // FUNC: getEnderecosEntrega()
    return await this.getDados(
      "getEnderecosEntrega",
      "BasePessoaEnderecoEntregaClass",
      [idendereco]
    );
  }

  async validarCupom(
    cupom = "",
    idplano = "",
    acao = "assinar",
    idcontrato_anterior = null
  ) {
    // FUNC: validarCupom()
    const idpessoa = window.$storage.getLocal("session").idpessoa || null;
    if (window.$storage.getLocal("upgrade")) {
      acao = "upgrade";
      idcontrato_anterior = window.$storage.getLocal("idcontrato_upgrade");
    }
    return await this.getDados("validarCupom", "GestaoSocio", [
      cupom,
      idplano,
      idpessoa,
      acao,
      idcontrato_anterior,
    ]);
  }

  async setEnderecoEntrega(dados) {
    // FUNC: setEnderecoEntrega()

    // {
    //     end_bairro: "",
    //     end_cep: "",
    //     end_cidade: "",
    //     end_complemento: "",
    //     end_estado: "",
    //     end_logradouro: "",
    //     end_numero: "",
    //     end_pais: "",
    //     preferencial: 1,
    // }

    return await this.getDados(
      "setEnderecoEntrega",
      "BasePessoaEnderecoEntregaClass",
      [dados]
    );
  }

  async removeEndereco(dados) {
    // FUNC: removeEndereco()

    // {
    //     idpessoa: "",
    //     idendereco: "",
    // }

    return await this.getDados(
      "removeEndereco",
      "BasePessoaEnderecoEntregaClass",
      [dados]
    );
  }

  async setPreferencialEntrega(dados) {
    // FUNC: setPreferencialEntrega()

    // {
    //     idpessoa: "",
    //     idendereco: "",
    // }

    return await this.getDados(
      "setPreferencialEntrega",
      "BasePessoaEnderecoEntregaClass",
      [dados]
    );
  }

  async getGruposPlanos() {
    // FUNC: getGruposPlanos()
    return await this.getDados("getGruposPlanos", "GestaoSocio", []);
  }

  async getPlanos(idgrupo_planos) {
    // FUNC: getPlanos()
    return await this.getDados("getPlanos", "GestaoSocio", [
      null,
      null,
      null,
      idgrupo_planos,
      false,
      false,
      true,
    ]);
  }

  async getPlano(idplano) {
    // FUNC: getPlano()
    return await this.getDados("getPlano", "GestaoSocio", [
      idplano,
      false,
      true,
      true,
    ]);
  }

  async getProximosJogos() {
    // FUNC: getPlgetProximosJogosano()
    return await this.getDados("gsEventosOnda", "GestaoSocio", []);
  }

  async getFormasPagamentoDesconto(params) {
    // FUNC: getFormasPagamento()
    return await this.getDados(
      "getFormaPagamentoDesconto",
      "GestaoSocio",
      params
    );
  }

  async assinarPlano(assinatura) {
    // FUNC: assinarPlano()
    return await this.getDados("novoContrato", "GestaoSocio", [assinatura]);
  }

  async gsUpgradePlano(assinatura) {
    // FUNC: assinarPlano()
    return await this.getDados("upgrade", "GestaoSocio", [assinatura]);
  }

  async cancelarContrato(idcontrato, idmotivo_cancelamento) {
    // FUNC: assinarPlano()
    return await this.getDados("cancelarContrato", "GestaoSocio", [
      idcontrato,
      idmotivo_cancelamento,
    ]);
  }

  async getChaveAdyen() {
    // FUNC: getChaveAdyen()
    return await this.getDados("getChaveAdyen", "Pagamentos", []);
  }

  async getChavePagseguro() {
    // FUNC: getChavePagseguro()
    return await this.getDados(
      "getChavePagSeguroTransparenteNovaApi",
      "Pagamentos",
      []
    );
  }

  async getAvatar() {
    // FUNC: getAvatar()
    return await this.getDados("getPessoaFoto", "CMS");
  }

  async setAvatar(file) {
    // FUNC: setAvatar()
    return await this.getDados("setPessoaFoto", "CMS", [file]);
  }

  async getQtdContratosAtivosPessoa() {
    return await this.getDados("getQtdContratosAtivosPessoa", "GestaoSocio");
  }

  async getQtdContratosValidosPessoa() {
    return await this.getDados("getQtdContratosValidosPessoa", "GestaoSocio");
  }

  async gsContratos() {
    return await this.getDados("gsContratos", "GestaoSocio", [
      null,
      null,
      null,
    ]);
  }

  async gsContratosStatus() {
    return await this.getDados("gsContratos", "GestaoSocio", [
      [200, 201, 202, 203, 204, 205, 401, 402],
      null,
      null,
    ]);
  }

  async gsParcelas(idcontrato, idpessoa) {
    if (idpessoa == null || idpessoa == undefined || idpessoa == "") {
      idpessoa = null;
    }
    return await this.getDados("gsParcelas", "GestaoSocio", [
      idcontrato,
      null,
      idpessoa,
    ]);
  }

  async gsParcelasPaginado(params) {
    return await this.getDados("contasPagar", "GsContasReceberClass", [params]);
  }

  async gsParcela(idcontrato, idconta_receber, idpessoa) {
    if (idpessoa == null || idpessoa == undefined || idpessoa == "") {
      idpessoa = null;
    }
    return await this.getDados("gsParcelas", "GestaoSocio", [
      idcontrato,
      idconta_receber,
      idpessoa,
    ]);
  }

  async gsFormasPagamentoContaRefis(idconta_receber) {
    return await this.getDados("getFormasPagamentoConta", "GestaoSocio", [
      idconta_receber,
      [1, 3, 6],
      true,
    ]);
  }

  async gsFormasPagamentoConta(idconta_receber) {
    return await this.getDados("getFormasPagamentoConta", "GestaoSocio", [
      idconta_receber,
      [1, 3, 6],
      false,
    ]);
  }

  async gsFormasPagamentoContaPremiere(idconta_receber) {
    return await this.getDados("getFormasPagamentoConta", "GestaoSocio", [
      idconta_receber,
      [1, 6],
    ]);
  }

  async gsSimularPagamentoParcelas(idconta_receber, idformapag, refis) {
    return await this.getDados("simularPagamentoParcelas", "GestaoSocio", [
      idconta_receber,
      idformapag,
      null,
      refis,
    ]);
  }

  async gsSimularNovoContrato(contrato) {
    return await this.getDados("simularNovoContrato", "GestaoSocio", [
      contrato,
    ]);
  }

  async gsCartoes(params = []) {
    return await this.getDados("gsCartoes", "GestaoSocio", [params]);
  }

  async iniciarPagamentoContaReceberCMS(
    idconta_receber,
    idformapag,
    card_credito,
    parcelas,
    refis
  ) {
    if (
      card_credito == null ||
      card_credito == undefined ||
      card_credito == ""
    ) {
      card_credito = null;
    }

    if (parcelas == null || parcelas == undefined || parcelas == "") {
      parcelas = 1;
    }

    if (refis == null || refis == undefined || refis == "") {
      refis = false;
    }

    return await this.getDados(
      "iniciarPagamentoContaReceberCMS",
      "GestaoSocio",
      [
        idconta_receber,
        idformapag,
        null,
        null,
        null,
        null,
        card_credito,
        null,
        parcelas,
        refis,
      ]
    );
  }

  async getCartoesCreditoAtivo() {
    return await this.getDados(
      "getCartoesAtivos",
      "BasePessoaCartaoCreditoClass",
      []
    );
  }

  async salvarCartaoCredito(cartao_credito) {
    return await this.getDados("salvarCartaoCredito", "GestaoSocio", [
      cartao_credito,
    ]);
  }

  async gsCartaoCreditoPrioridade(idccredit) {
    return await this.getDados(
      "tooglePrioridade",
      "BasePessoaCartaoCreditoClass",
      [{ idccredit: idccredit }]
    );
  }

  async gsCartaoCreditoInativar(idccredit) {
    return await this.getDados("inativarCartao", "GestaoSocio", [
      { idccredit: idccredit },
    ]);
  }

  async gsLugaresReservados(idplano, acao) {
    return await this.getDados("gsLugaresReservados", "GestaoSocio", [
      idplano,
      null,
      null,
      acao,
    ]);
  }

  async carregarMapa(idmapa) {
    return await this.getDados("carregar", "MapaClass", [idmapa]);
  }

  async carregarBlocos(idmapa_fis, ids_blocos, idstatus, idusuario) {
    return await this.getDados("carregarBlocos", "MapaClass", [
      idmapa_fis,
      ids_blocos,
      idstatus,
      null,
      idusuario,
      null,
    ]);
  }

  async carregarAssentos(idmapa_fis, idblocofisico, idusuario) {
    return await this.getDados("carregarAssentos", "MapaClass", [
      idmapa_fis,
      idblocofisico,
      "",
      null,
      idusuario,
    ]);
  }

  async carregarAssentosAll(
    $idmapa_fis,
    $idblocofisico,
    $idbloco = null,
    $idapresentacao = null,
    $idusuario = null
  ) {
    return await this.getDados("carregarAssentos", "MapaClass", [
      $idmapa_fis,
      $idblocofisico,
      $idbloco,
      $idapresentacao,
      $idusuario,
    ]);
  }

  async reservarAssento(
    idplano,
    idmapa_assento_fis,
    idpessoa,
    validar_mapa_si
  ) {
    return await this.getDados("reservarAssento", "GestaoSocio", [
      idplano,
      idmapa_assento_fis,
      idpessoa,
      validar_mapa_si,
    ]);
  }

  async liberarAssento(idplano, idmapa_assento_fis, idpessoa) {
    return await this.getDados("liberarAssento", "GestaoSocio", [
      idplano,
      idmapa_assento_fis,
      idpessoa,
    ]);
  }

  async gsMotivosCancelamentoContrato() {
    let params = { visivel_site: true };
    return await this.getDados(
      "getGsContratoMotivosCancelamento",
      "GsContratoClass",
      [params]
    );
  }

  async getCheckout(idcontrato) {
    return await this.getDados("getConfigCheckout", "GestaoSocio", [
      idcontrato,
    ]);
  }

  async getCheckouts(idscontrato) {
    return await this.getDados("getConfigCheckout", "GestaoSocio", idscontrato);
  }

  async fazerCheckout(idcontrato, idapresentacao) {
    return await this.getDados("inserirCheckout", "GestaoSocio", [
      idcontrato,
      idapresentacao,
    ]);
  }

  async getFormasPagamentoAlterar(idcontrato) {
    return await this.getDados("getFormasPagamentoAlterar", "GsContratoClass", [
      idcontrato,
    ]);
  }

  async alterarFormaPagamentoContrato(idcontrato, idformapag, dia_cobranca) {
    return await this.getDados(
      "alterarFormaPagamentoContrato",
      "GsContratoClass",
      [idcontrato, idformapag, dia_cobranca]
    );
  }

  async getContasCorrentes(idpessoa) {
    return await this.getDados("getContasBancarias", "BasePessoaContaClass", [
      idpessoa,
    ]);
  }

  async salvarContaCorrente(conta) {
    return await this.getDados("salvarContaCorrente", "GestaoSocio", [
      conta,
      null,
    ]);
  }

  async getDiasCobranca(idformapag) {
    return await this.getDados("getDias", "GsContratoClass", [idformapag]);
  }
}
