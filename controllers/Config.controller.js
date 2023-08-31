import Service from "@/controllers/Service.controller.js";
import StorageTable from "@/controllers/Storage.controller.js";
import Util from "@/controllers/Util.controller.js";

import config from "@/app.config.json";

export default class Config extends StorageTable {
  // TYPE: Class: Config()
  constructor(atualizar = false) {
    super();
    this.$http = new Service();
    this.$util = new Util();
    this.$root = [];
    this.dados = config.globalConfigs;

    this.regrasDoNegocio = config.regrasDoNegocio;
    this.getConfig(atualizar);
  }

  async getConfig(atualizar = false) {
    // FUNC: getConfig
    this.$root = await this.$util.getVue();

    let configs_local = this.getLocal("config");
    if (configs_local && !atualizar) {
      this.$root.config = configs_local;
      this.$root.isSocio = this.$util
        .replaceSpecialChars(this.$root.config.tipo_pessoa.toLowerCase())
        .includes("publico socio")
        ? true
        : false;
      // if(this.$root.config.tipo_pessoa == 'PÚBLICO GERAL'){
      //     this.$root.config.tipo_pessoa = ''
      // }
    }
    // if (!configs_local || atualizar) {
    if (atualizar || !configs_local) {
      this.$http
        .post("CONFIGS", { idpessoa_tipo: "" })
        .then(async (response) => {
          if (!response.isLogado && this.$root.$route.name != "Home") {
            window.$storage.destroyLocal(true);
          }

          this.$root.config = response;
          this.$root.isSocio = this.$util
            .replaceSpecialChars(this.$root.config.tipo_pessoa.toLowerCase())
            .includes("publico socio")
            ? true
            : false;
          // if(this.$root.config.tipo_pessoa == 'PÚBLICO GERAL'){
          //     this.$root.config.tipo_pessoa = ''
          // }
          this.setLocal("config", this.$root.config);
        })
        .catch((error) => {
          console.error("Falha ao consultar configurações");
        });
    }
    // }
  }

  async getSacPerguntas() {
    // TODO: getSacPerguntas
    return await this.$http.get("GETSACPERGUNTAS");
  }

  async getConteudo(param = "semconteudo") {
    // TODO: getConteudo

    // privacidade
    // cookies
    // condicoes_site
    // condicoes_ingresso
    // popup
    // hospitalidade
    // patrocinadores

    let response = await this.$http.get("GETCONTEUDOS", param, {
      "Access-Control-Allow-Origin":
        "https://socio.internacional.com.br" ||
        "https://socio.internacional.com" ||
        "https://socio.internacional.com/cms/conteudos/" ||
        "https://socio.internacional.com/cms/conteudo/",
    });

    if (response && response.length > 0 && response[0].idconteudo) {
      return await this.$http.get("GETCONTEUDO", response[0].idconteudo);
    }

    return false;
  }

  async getTermos(param = "semconteudo") {
    this.$root = await this.$util.getVue();

    this.$root.loading = true;

    this.getConteudo(param).then((response) => {
      this.$root.loading = false;
      if (response) {
        this.$root.modal.titulo = `
                    <div class="text-center" style="font-size:20px; color: var(--dl-color-primary); font-weight: bold">
                        ${response.titulo}
                    </div>
                `;
        this.$root.modal.descricao = `
                    <div class="pa-3 text-center">${response.html}</div>
                `;
        this.$root.modal.botao = response.subtitulo;
        this.$root.modal.link = response.link;
      }
    });
  }
}

// Vue.prototype.$config = new Config();
