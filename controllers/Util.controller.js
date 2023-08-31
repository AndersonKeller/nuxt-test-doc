import Service from "@/controllers/Service.controller.js";
import StorageTable from "@/controllers/Storage.controller.js";

import { FEATURE_FLAGS_ALLOWED } from "../util/constants";
export default class Util extends StorageTable {
  // TYPE: Class: Util()
  constructor() {
    super();
    this.width = window.screen.width;
    this.modal = {
      show: false,
      titulo: "",
      conteudo: "",
    };
    (this.$root = false),
      (this.celmask = [
        {
          code: 55,
          mask: 11,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 34,
          mask: 9,
        },
        {
          code: 93,
          mask: 9,
        },
        {
          code: 355,
          mask: 9,
        },
        {
          code: 213,
          mask: 9,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 376,
          mask: 6,
        },
        {
          code: 244,
          mask: 9,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 54,
          mask: 12,
        },
        {
          code: 374,
          mask: 8,
        },
        {
          code: 297,
          mask: 7,
        },
        {
          code: 61,
          mask: 9,
        },
        {
          code: 43,
          mask: 9,
        },
        {
          code: 994,
          mask: 9,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 973,
          mask: 8,
        },
        {
          code: 880,
          mask: 10,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 375,
          mask: 11,
        },
        {
          code: 32,
          mask: 9,
        },
        {
          code: 501,
          mask: 7,
        },
        {
          code: 229,
          mask: 8,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 975,
          mask: 8,
        },
        {
          code: 591,
          mask: 8,
        },
        {
          code: 387,
          mask: 8,
        },
        {
          code: 267,
          mask: 8,
        },
        {
          code: 246,
          mask: 7,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 673,
          mask: 7,
        },
        {
          code: 359,
          mask: 8,
        },
        {
          code: 226,
          mask: 8,
        },
        {
          code: 257,
          mask: 8,
        },
        {
          code: 855,
          mask: 8,
        },
        {
          code: 237,
          mask: 9,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 238,
          mask: 7,
        },
        {
          code: 599,
          mask: 7,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 236,
          mask: 8,
        },
        {
          code: 235,
          mask: 8,
        },
        {
          code: 56,
          mask: 9,
        },
        {
          code: 86,
          mask: 11,
        },
        {
          code: 61,
          mask: 9,
        },
        {
          code: 61,
          mask: 9,
        },
        {
          code: 57,
          mask: 10,
        },
        {
          code: 269,
          mask: 7,
        },
        {
          code: 243,
          mask: 9,
        },
        {
          code: 242,
          mask: 8,
        },
        {
          code: 682,
          mask: 5,
        },
        {
          code: 506,
          mask: 8,
        },
        {
          code: 225,
          mask: 7,
        },
        {
          code: 385,
          mask: 9,
        },
        {
          code: 53,
          mask: 8,
        },
        {
          code: 599,
          mask: 8,
        },
        {
          code: 357,
          mask: 8,
        },
        {
          code: 420,
          mask: 9,
        },
        {
          code: 45,
          mask: 8,
        },
        {
          code: 253,
          mask: 8,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 593,
          mask: 9,
        },
        {
          code: 20,
          mask: 10,
        },
        {
          code: 503,
          mask: 8,
        },
        {
          code: 240,
          mask: 9,
        },
        {
          code: 291,
          mask: 7,
        },
        {
          code: 372,
          mask: 8,
        },
        {
          code: 251,
          mask: 9,
        },
        {
          code: 500,
          mask: 5,
        },
        {
          code: 298,
          mask: 6,
        },
        {
          code: 679,
          mask: 7,
        },
        {
          code: 358,
          mask: 9,
        },
        {
          code: 33,
          mask: 9,
        },
        {
          code: 594,
          mask: 9,
        },
        {
          code: 689,
          mask: 8,
        },
        {
          code: 241,
          mask: 7,
        },
        {
          code: 220,
          mask: 7,
        },
        {
          code: 995,
          mask: 9,
        },
        {
          code: 49,
          mask: 11,
        },
        {
          code: 233,
          mask: 9,
        },
        {
          code: 350,
          mask: 8,
        },
        {
          code: 30,
          mask: 10,
        },
        {
          code: 299,
          mask: 6,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 590,
          mask: 9,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 502,
          mask: 8,
        },
        {
          code: 44,
          mask: 10,
        },
        {
          code: 224,
          mask: 9,
        },
        {
          code: 245,
          mask: 9,
        },
        {
          code: 592,
          mask: 7,
        },
        {
          code: 509,
          mask: 8,
        },
        {
          code: 504,
          mask: 8,
        },
        {
          code: 852,
          mask: 8,
        },
        {
          code: 36,
          mask: 10,
        },
        {
          code: 354,
          mask: 7,
        },
        {
          code: 91,
          mask: 10,
        },
        {
          code: 62,
          mask: 9,
        },
        {
          code: 98,
          mask: 10,
        },
        {
          code: 964,
          mask: 10,
        },
        {
          code: 353,
          mask: 9,
        },
        {
          code: 44,
          mask: 10,
        },
        {
          code: 972,
          mask: 9,
        },
        {
          code: 39,
          mask: 10,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 81,
          mask: 10,
        },
        {
          code: 44,
          mask: 10,
        },
        {
          code: 962,
          mask: 9,
        },
        {
          code: 7,
          mask: 11,
        },
        {
          code: 254,
          mask: 9,
        },
        {
          code: 686,
          mask: 8,
        },
        {
          code: 383,
          mask: 8,
        },
        {
          code: 965,
          mask: 8,
        },
        {
          code: 996,
          mask: 9,
        },
        {
          code: 856,
          mask: 10,
        },
        {
          code: 371,
          mask: 8,
        },
        {
          code: 961,
          mask: 8,
        },
        {
          code: 266,
          mask: 8,
        },
        {
          code: 231,
          mask: 9,
        },
        {
          code: 218,
          mask: 9,
        },
        {
          code: 423,
          mask: 9,
        },
        {
          code: 370,
          mask: 9,
        },
        {
          code: 352,
          mask: 9,
        },
        {
          code: 853,
          mask: 8,
        },
        {
          code: 389,
          mask: 8,
        },
        {
          code: 261,
          mask: 9,
        },
        {
          code: 265,
          mask: 9,
        },
        {
          code: 60,
          mask: 9,
        },
        {
          code: 960,
          mask: 7,
        },
        {
          code: 223,
          mask: 8,
        },
        {
          code: 356,
          mask: 8,
        },
        {
          code: 692,
          mask: 7,
        },
        {
          code: 596,
          mask: 9,
        },
        {
          code: 222,
          mask: 8,
        },
        {
          code: 230,
          mask: 8,
        },
        {
          code: 262,
          mask: 9,
        },
        {
          code: 52,
          mask: 10,
        },
        {
          code: 691,
          mask: 7,
        },
        {
          code: 373,
          mask: 8,
        },
        {
          code: 377,
          mask: 9,
        },
        {
          code: 976,
          mask: 8,
        },
        {
          code: 382,
          mask: 8,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 212,
          mask: 9,
        },
        {
          code: 258,
          mask: 9,
        },
        {
          code: 95,
          mask: 8,
        },
        {
          code: 264,
          mask: 9,
        },
        {
          code: 674,
          mask: 7,
        },
        {
          code: 977,
          mask: 10,
        },
        {
          code: 31,
          mask: 9,
        },
        {
          code: 687,
          mask: 6,
        },
        {
          code: 64,
          mask: 9,
        },
        {
          code: 505,
          mask: 8,
        },
        {
          code: 227,
          mask: 8,
        },
        {
          code: 234,
          mask: 10,
        },
        {
          code: 683,
          mask: 7,
        },
        {
          code: 672,
          mask: 6,
        },
        {
          code: 850,
          mask: 10,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 47,
          mask: 8,
        },
        {
          code: 968,
          mask: 8,
        },
        {
          code: 92,
          mask: 10,
        },
        {
          code: 680,
          mask: 7,
        },
        {
          code: 970,
          mask: 9,
        },
        {
          code: 507,
          mask: 8,
        },
        {
          code: 675,
          mask: 8,
        },
        {
          code: 595,
          mask: 9,
        },
        {
          code: 51,
          mask: 9,
        },
        {
          code: 63,
          mask: 10,
        },
        {
          code: 48,
          mask: 9,
        },
        {
          code: 351,
          mask: 9,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 974,
          mask: 8,
        },
        {
          code: 262,
          mask: 9,
        },
        {
          code: 40,
          mask: 9,
        },
        {
          code: 7,
          mask: 11,
        },
        {
          code: 250,
          mask: 9,
        },
        {
          code: 590,
          mask: 9,
        },
        {
          code: 290,
          mask: 5,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 590,
          mask: 9,
        },
        {
          code: 508,
          mask: 6,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 685,
          mask: 7,
        },
        {
          code: 378,
          mask: 8,
        },
        {
          code: 239,
          mask: 7,
        },
        {
          code: 966,
          mask: 9,
        },
        {
          code: 221,
          mask: 9,
        },
        {
          code: 381,
          mask: 9,
        },
        {
          code: 248,
          mask: 7,
        },
        {
          code: 232,
          mask: 8,
        },
        {
          code: 65,
          mask: 8,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 421,
          mask: 9,
        },
        {
          code: 386,
          mask: 8,
        },
        {
          code: 677,
          mask: 7,
        },
        {
          code: 252,
          mask: 8,
        },
        {
          code: 27,
          mask: 9,
        },
        {
          code: 82,
          mask: 10,
        },
        {
          code: 211,
          mask: 9,
        },
        {
          code: 94,
          mask: 9,
        },
        {
          code: 249,
          mask: 9,
        },
        {
          code: 597,
          mask: 7,
        },
        {
          code: 47,
          mask: 8,
        },
        {
          code: 268,
          mask: 8,
        },
        {
          code: 46,
          mask: 9,
        },
        {
          code: 41,
          mask: 9,
        },
        {
          code: 963,
          mask: 9,
        },
        {
          code: 992,
          mask: 9,
        },
        {
          code: 886,
          mask: 9,
        },
        {
          code: 255,
          mask: 9,
        },
        {
          code: 66,
          mask: 9,
        },
        {
          code: 670,
          mask: 8,
        },
        {
          code: 228,
          mask: 8,
        },
        {
          code: 690,
          mask: 4,
        },
        {
          code: 676,
          mask: 7,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 216,
          mask: 8,
        },
        {
          code: 90,
          mask: 10,
        },
        {
          code: 993,
          mask: 9,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 688,
          mask: 6,
        },
        {
          code: 1,
          mask: 10,
        },
        {
          code: 256,
          mask: 9,
        },
        {
          code: 380,
          mask: 9,
        },
        {
          code: 971,
          mask: 9,
        },
        {
          code: 44,
          mask: 10,
        },
        {
          code: 598,
          mask: 8,
        },
        {
          code: 998,
          mask: 10,
        },
        {
          code: 678,
          mask: 7,
        },
        {
          code: 39,
          mask: 10,
        },
        {
          code: 58,
          mask: 10,
        },
        {
          code: 84,
          mask: 9,
        },
        {
          code: 681,
          mask: 6,
        },
        {
          code: 212,
          mask: 9,
        },
        {
          code: 967,
          mask: 9,
        },
        {
          code: 260,
          mask: 9,
        },
        {
          code: 263,
          mask: 9,
        },
        {
          code: 358,
          mask: 9,
        },
      ]);
  }

  async getVue() {
    if (this.$root) {
      return this.$root;
    }
    await this.sleep(1);
    this.$root = document.querySelector("#__nuxt");
    return this.$root;
  }

  async getBrowserUUID() {
    var navigator_info = window.navigator;
    var screen_info = window.screen;
    var uid = navigator_info.mimeTypes.length;
    uid += navigator_info.userAgent.replace(/\D+/g, "");
    uid += navigator_info.plugins.length;
    uid += screen_info.height || "";
    uid += screen_info.width || "";
    uid += screen_info.pixelDepth || "";
    return this.uuidTohex(uid);
  }

  uuidTohex(uuid) {
    if (uuid) {
      let uid = uuid.toString().replace(/\D+/g, "");
      if (uid.length < 40) {
        for (let i = 0; i < 40; i++) {
          uid += 0;
        }
      }
      uid = uid.substring(0, 40);
      return uid.toString();
    }
    return false;
  }

  isNavigator() {
    // FUNC: isNavegador()
    // CC: detecta qual o navegador está usando

    let navegador = "";
    let navegadores = [
      { name: "os/", value: "Opera" },
      { name: "msie/", value: "Edge" },
      { name: "firefox/", value: "Mozilla Firefox" },
      { name: "epiphany/", value: "Epiphany" },
      { name: "chrome/", value: "Google Chrome" },
      { name: "safari/", value: "Safari" },
    ];

    const getBrowser = (item) => {
      if (navigator.userAgent.toLowerCase().indexOf(item.name) != -1) {
        return item.value;
      }
    };

    navegadores.every((item) => {
      if ((navegador = getBrowser(item))) return false;
      return true;
    });

    return navegador;
  }
  // FUNÇÃO RESPONSÁVEL POR FILTRAR O NOME E SOBRENOME
  filtraNome(nomeFilter) {
    var nomeCompleto = nomeFilter;
    var nome = nomeCompleto.split(" ")[0];
    var qtdnome = nomeCompleto.split(" ").length;
    var sobrenome = nomeCompleto.split(" ")[qtdnome - 1];
    let retornoNome = nome + " " + sobrenome;
    return retornoNome;
  }

  getBrowser() {
    var sBrowser,
      sUsrAg = navigator.userAgent;

    if (sUsrAg.indexOf("Chrome") > -1) {
      sBrowser = "Google Chrome";
    } else if (sUsrAg.indexOf("Safari") > -1) {
      sBrowser = "Apple Safari";
    } else if (sUsrAg.indexOf("Opera") > -1) {
      sBrowser = "Opera";
    } else if (sUsrAg.indexOf("Firefox") > -1) {
      sBrowser = "Mozilla Firefox";
    } else if (sUsrAg.indexOf("MSIE") > -1) {
      sBrowser = "Microsoft Internet Explorer";
    }
    return sBrowser;
  }

  async go(name, params = {}, query = {}) {
    //FUNC: go(name, params = {}, query = {})
    // CC: Usa o Vue router para mudar de página

    if (!name) {
      return;
    }

    const root = await this.getVue();
    root.menumobile = false;

    let instance = await this.getVue();
    let route = instance.$route;
    let router = instance.$router;

    if (name == "back") {
      router.go(-1);
      return;
    }

    if (typeof name == "object") {
      if (route.params.pagina == undefined && name.params == undefined) {
        if (name.length > 1) {
          router.push({ name: name[0], params: name[1] });
          this.scroll();
        }
      } else {
        if (route.params.pagina != name.params.pagina) {
          router.push(name);
          this.scroll();
        }
      }
      return;
    }

    if (name.length == 0) {
      console.warn("Não existe link por favor verificar!");
      return false;
    }

    if (name.indexOf("http") != -1) {
      params == "_blank" ? window.open(name) : (location.href = name);
      return false;
    }
    if (name == "sair") {
      this.destroyLocal();
      setTimeout(() => {
        document.location.reload();
      }, 800);
      router.push({ name: "Home" });
      return;
    }
    if (name == "sac") {
      instance.$sac.startFlowSac();
      return;
    }
    if (name == "ModalTrocaSenha") {
      this.$root.modalTrocaSenha.show = !this.$root.modalTrocaSenha.show;
      return;
    }
    if (route.name != name) {
      if (name.substring(0, 1) == "/") {
        router.push(name);
      } else {
        router.push({ name: name, params: params, query: query });
        this.scroll();
      }
    }
    return true;
  }

  async sleep(segundos) {
    //FUNC: sleep(segundos)
    // CC: Pausa "segundos" a leiturta asynconica do js.
    return new Promise((resolve) => setTimeout(resolve, segundos * 1000));
  }

  scroll(id) {
    // FUNC: scroll()
    // CC: ScrollSmooting
    if (id) {
      document.getElementById(id).scrollIntoView(true);
      return;
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  clone(object) {
    //FUNC: clone(object)
    // CC: Clona o objeto e as alterações não afeta o objeto original.
    return Object.assign({}, object);
  }

  order(object, key) {
    // FUNC: order(object or array)
    // CC: Ordena o array ou objeto crescente.
    if (key) {
      object.sort(function (a, b) {
        if (a[key] > b[key]) {
          return 1;
        }
        if (a[key] < b[key]) {
          return -1;
        }
        return 0;
      });
    }

    object.sort(function (a, b) {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });

    return object;
  }

  orderByDate(lista) {
    // FUNC: order(object com data em string)
    // Utilizada nas página de institucional
    lista.map((res) => {
      res.subtitulo = JSON.parse(res.subtitulo);
    });

    // Transforma a Data em formato MM/DD/YYYY
    lista.forEach((item) => {
      item.subtitulo.data = item.subtitulo.data.split("/");
      item.subtitulo.data = new Date(
        +item.subtitulo.data[2],
        item.subtitulo.data[1] - 1,
        +item.subtitulo.data[0]
      );
    });

    lista.sort((a, b) => {
      if (a.subtitulo.data > b.subtitulo.data) {
        return -1;
      }
      if (a.subtitulo.data < b.subtitulo.data) {
        return 1;
      }
      return 0;
    });

    // Retorna para o modelo de string
    lista.map((res) => {
      res.subtitulo.data = res.subtitulo.data.toLocaleDateString("pt-BR");
      // res.subtitulo = JSON.stringify(res.subtitulo);
    });

    return lista;
  }

  addGetInfoUrl(object) {
    // FUNC: addGetInfoUrl()
    let url = window.location.href.split("#");

    let urlcomplete = url[0];
    let params = urlcomplete.indexOf("?") > -1 ? "&" : "?";

    for (let i in object) {
      params = params + i + "=" + object[i];
    }

    urlcomplete = urlcomplete + params;
    return urlcomplete;
  }

  tratarLink(str) {
    // FUNC: tratarLink
    // CC: Remove os acentos, e substitue espaços por hífem
    console.log(str);
    str = str.replace(/[^\w\-]+/g, "-");
    str = this.replaceSpecialChars(str);
    return str.toLowerCase();
  }

  replaceSpecialChars(str) {
    // FUNC: replaceSpecialChars(str)
    // CC: Remove os acentos, aspas e caracteres especiais.
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  removerCaracteres(caracteres) {
    // FUNC: removerCaracteres(caracteres)
    // CC: Retorna apenas números.
    if (!caracteres) return "";
    return caracteres.toString().replace(/\D+/g, "");
  }

  removeHTML(str) {
    // FUNC: removeHTML(str)
    // CC: Remove as tags HTML
    if (str && str.includes("<", ">")) {
      str = str.replace(/<.*?>/g, "");
      str = str.replace(/&nbsp;/g, "");
      return str.replace(/\n/g, "").trim();
    }
    return str;
  }

  replaceAcentosHTML(str) {
    // FUNC: replaceAcentosHTML(str)
    // CC: Substitui os acentos HTML pelos corretos
    if (str && str.includes("&atilde;")) {
      // A
      str = str.replace(/&Aacute;/g, "Á");
      str = str.replace(/&aacute;/g, "á");
      str = str.replace(/&Acirc;/g, "Â");
      str = str.replace(/&acirc;/g, "â");
      str = str.replace(/&Agrave;/g, "À");
      str = str.replace(/&agrave;/g, "à");
      str = str.replace(/&Atilde;/g, "Ã");
      str = str.replace(/&atilde;/g, "ã");
      // E
      str = str.replace(/&Eacute;/g, "É");
      str = str.replace(/&eacute;/g, "é");
      str = str.replace(/&Ecirc;/g, "Ê");
      str = str.replace(/&ecirc;/g, "ê");
      // I
      str = str.replace(/&Iacute;/g, "Í");
      str = str.replace(/&iacute;/g, "í");
      // O
      str = str.replace(/&Oacute;/g, "Ó");
      str = str.replace(/&oacute;/g, "ó");
      str = str.replace(/&Ocirc;/g, "Ô");
      str = str.replace(/&ocirc;/g, "ô");
      str = str.replace(/&Otilde;/g, "Õ");
      str = str.replace(/&otilde;/g, "õ");
      // U
      str = str.replace(/&Uacute;/g, "Ú");
      str = str.replace(/&uacute;/g, "ú");
      // Ç
      str = str.replace(/&Ccedil;/g, "Ç");
      str = str.replace(/&ccedil;/g, "ç");

      str = str.replace(/&nbsp;/g, " ");
      return str.replace(/\n/g, "").trim();
    }
    return str;
  }

  asMoney(string) {
    // FUNC: asMoney(string)
    // CC: Converte em moeda brasileira com sifrão e centavos.
    if (!window.Intl) return "R$ " + parseFloat(string).toFixed(2);
    var formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formatter.format(string);
  }

  asDate(data) {
    // FUNC: asDate(data)
    // CC: Retorna a data formatava para xx/xx/xxxx
    data = data.split(" ")[0];
    data = data.split("/");
    const dateObject = new Date(data[2], data[1] - 1, data[0]);
    if (this.getLocal("lang")) {
      return `${dateObject.toLocaleDateString(this.getLocal("lang"))}`;
    }
    return `${dateObject.toLocaleDateString("pt-BR")}`;
  }

  asDateHour(data) {
    // FUNC: asDateHour(data)
    // CC: Retorna a data e hora formatava para xx/xx/xxxx 00:00:00
    if (this.getLocal("lang")) {
      return `${new Date(data).toLocaleDateString(
        this.getLocal("lang")
      )} ${new Date(data).toLocaleTimeString(this.getLocal("lang"))}`;
    }
    return `${new Date(data).toLocaleDateString("pt-BR")} ${new Date(
      data
    ).toLocaleTimeString("pt-BR")}`;
  }

  mascaraCPF(value) {
    // FUNC: mascaraCPF(value)
    // CC: Retorna a mascara do CPF.
    if (!value) {
      return null;
    }

    let res;
    let noformt = this.replaceSpecialChars(value);

    res = noformt.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      function (regex, argumento1, argumento2, argumento3, argumento4) {
        return (
          argumento1 + "." + argumento2 + "." + argumento3 + "-" + argumento4
        );
      }
    );

    return res;
  }

  mascaraCNPJ(value) {
    // FUNC: mascaraCNPJ(value)
    // CC: Retorna a mascara do CNPJ.
    if (!value) {
      return null;
    }

    let res;
    let noformt = this.replaceSpecialChars(value);

    res = noformt.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      function (
        regex,
        argumento1,
        argumento2,
        argumento3,
        argumento4,
        argumento5
      ) {
        return (
          argumento1 +
          "." +
          argumento2 +
          "." +
          argumento3 +
          "/" +
          argumento4 +
          "-" +
          argumento5
        );
      }
    );

    return res;
  }

  validarEmail(email) {
    // FUNC: validarEmail(email)
    // CC: Valida o email no front end
    return /\S+@\S+\.\S+/.test(email);
  }

  validarSenha(
    senha,
    regra = {
      numeros: 1,
      maicusculo: 1,
      minusculo: 1,
      especiais: 1,
      mincaractere: 6,
    }
  ) {
    // FUNC: validarSenha(senha, regra)
    // CC: validando a senha por regra

    let password = senha.toString();
    let rating = 0;
    let numregra = 100 / Object.keys(regra).length;

    const numeros = password.toString().replace(/[^0-9]/g, "").length;
    const minusculo = password.toString().replace(/[^A-Z]/g, "").length;
    const maicusculo = password.toString().replace(/[^a-z]/g, "").length;
    const especiais = password.toString().replace(/[a-zA-Z0-9]/g, "").length;

    const ratingSomar = (key, value) => {
      let x = Number(numregra / regra[key]) * Number(value);
      rating += x <= numregra ? x : numregra;
    };

    ratingSomar("mincaractere", password.length);
    ratingSomar("numeros", numeros);
    ratingSomar("minusculo", minusculo);
    ratingSomar("maicusculo", maicusculo);
    ratingSomar("especiais", especiais);

    let error = {
      numeros: !(numeros >= regra.numeros),
      minusculo: !(minusculo >= regra.minusculo),
      maicusculo: !(maicusculo >= regra.maicusculo),
      especiais: !(especiais >= regra.especiais),
      mincaractere: !(password.length >= regra.mincaractere),
    };

    let obj = Object.keys(error);

    for (let i = 0; i < obj.length; i++) {
      if (!error[obj[i]]) {
        delete error[obj[i]];
      }
    }

    return { rating, error };
  }

  validarCPF(value) {
    // FUNC: validarCPF(value)
    // CC: Valida o CPF.
    const cpf = value.replace(/\D/g, "");
    let result = true;

    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    [9, 10].forEach((item) => {
      let soma = 0;
      let res = 0;

      cpf
        .split(/(?=)/)
        .splice(0, item)
        .forEach((e, i) => {
          soma += parseInt(e) * (item + 2 - (i + 1));
        });

      res = soma % 11;
      res = res < 2 ? 0 : 11 - res;

      if (res != cpf.substring(item, item + 1)) {
        result = false;
      }
    });

    return result;
  }

  validarCNPJ(value) {
    // FUNC: validarCNPJ(value)
    // CC: Valida o CNPJ.
    const cnpj = value.replace(/\D/g, "");

    if (cnpj.toString().length != 14 || /^(\d)\1{10}$/.test(cnpj)) {
      return false;
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado != digitos.charAt(0)) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado != digitos.charAt(1)) {
      return false;
    }

    return true;
  }

  getIdade(nascimento) {
    // FUNC: getIdade(data)
    // CC: Retorna a idade da pessoa

    let data_nascimento =
      new Date(nascimento + "T00:00:00").getTime() - new Date().getTime();
    if (Math.sign(data_nascimento) != -1) {
      return 0;
    }
    return Math.floor(
      Math.ceil(Math.abs(data_nascimento) / (1000 * 3600 * 24)) / 365.25
    );
  }

  createdElement(
    type,
    params = { title: "", id: "elvazio" },
    value = "",
    state = "body"
  ) {
    //FUNC: createdElement(type, params = { title: '' }, state = 'body')
    // CC: Cria um elemento HTML dinamicamente
    document.getElementById(params.id)
      ? document.getElementById(params.id).remove()
      : null;
    let el = document.createElement(type);
    Object.entries(params).forEach((item) => {
      el.setAttribute(item[0], item[1]);
    });
    el.innerHTML = value;
    document[state].appendChild(el);
  }

  isFeatureEnabled(key) {
    return FEATURE_FLAGS_ALLOWED.actives.includes(key);
  }

  isMobile() {
    // FUNC: isMobile()
    // CC: Retorna true ou false se é mobile ou não
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /iOS/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  async responsive() {
    // FUNC: responsive()
    // CC: Retorna o tamanho da tela dinamicamente.
    const self = this;
    const root = await this.getVue();
    window.addEventListener(
      "resize",
      async () => {
        root.responsive = await window.innerWidth;
      },
      true
    );

    return root.responsive;
  }

  getSearchParams(link, parametro) {
    // FUNC: getSearchParams(link, parametro)
    // CC: Pesquisa o paramentro na url solicitada.
    const url = new URL(decodeURI(link));
    return url.searchParams.get(parametro);
  }

  getNomeSobrenome(nome) {
    // FUNC: getNomeSobrenome(nome)
    // CC: Separa o nome do sobrenome
    if (!nome) return false;

    let name = nome.split(" ");
    let dados = { nome: "", sobrenome: "" };

    if (name.length > 1) {
      dados.nome = name[0];
      dados.sobrenome = name[1];
    } else [(dados.nome = name[0])];

    return dados;
  }

  getDATA(data) {
    // FUNC:getDATA()
    if (!document.querySelectorAll(`[data-${data}]`)[0]) {
      return;
    }
    return document.querySelectorAll(`[data-${data}]`)[0];
  }

  setDATA(data, conteudo) {
    // FUNC:setDATA()
    if (!document.querySelectorAll(`[data-${data}]`)[0]) {
      return;
    }
    document.querySelectorAll(`[data-${data}]`)[0].innerHTML = conteudo
      ? conteudo
      : "";
  }

  customApp(dados) {
    if (!this.isApp()) {
      return;
    }

    let config = dados;

    // ADICIONA A FONTE NO PROJETO

    if (config.font_link && config.font_family) {
      this.$util.createdElement(
        "link",
        { rel: "stylesheet", href: config.font_lin },
        false,
        "head"
      );
      window.document.body.setAttribute(
        "style",
        `font-family: ${config.font_family} !important`
      );
    }

    //@import url('${config.fonteImport}');
    let style = `
                
            * { box-sizing: border-box;
                border-width: 0;
                border-style: solid;
                font-size: ${config.fontSize};
                font-family: ${config.fonteName} !important;
                line-height: 1.6em;
            }

            :root {
                --app-corprimaria: ${config.corprimaria};
                --app-corsecundaria: ${config.corsecundaria};
                --app-corterciaria: ${config.corterciaria};
                --app-corquarternaria: ${config.corquarternaria};
                --app-corquinquenario: ${config.corquinquenario};
                --app-corsenario: ${config.corsenario};
                --app-logobg-img: '${config.logoFooter}';
                --app-logo-img: '${config.logoNavBar}';
            }

            html, body { 
                font-family: ${config.fonteName} !important;
            }

            h1, h2, h3, h4, h5, h6 { 
                /* border-bottom: 3px solid var(--app-corsecundaria) !important; */
                color: var(--app-corprimaria); 
                margin-bottom: 16px;
                margin-top: 16px; 
                text-transform: uppercase; 
                font-family: ${config.fonteNameBold} !important;
            }
            
            label, a, button, strong, .resume-list-column, .tag.color-green, .tag, .tag.color-red, .tag.color-grey {
                font-family: ${config.fonteNameBold} !important;
            }

            .sci-name-user, .sci-rights, .sci-alert.type-warning, .sci-alert.type-problem, .sci-header-table {
                font-family: ${config.fonteNameBold} !important;
            }

            ::-webkit-scrollbar {
                width: 6px;
                height: 8px;
            }

            ::-webkit-scrollbar-track {
                background-color: var(--app-corsenario) !important;
            }
            
            ::-webkit-scrollbar-thumb {
                background: var(--app-corprimaria) !important;
                border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: #b30000 !important;
            }
            
            .BotaoGradiente {
                border: solid 1px black;
                cursor: pointer;
                background: var(--app-corprimaria) !important;
            }

            .BotaoGradiente:hover {
                background: var(--app-corsecundaria) !important;
            }

            .BotaoGradiente:active {
                background:  var(--app-corprimaria)
            }

            .card-pedidos-titles {
                color: var(--app-corprimaria) !important;
            }

            .app-logobg-img:after { content:url('${config.logoFooter}'); }
            .app-logo-img:after { content:url('${config.logoNavBar}'); }

            .text-corprimaria { color: var(--app-corprimaria) !important}
            .text-corsecundaria { color: var(--app-corsecundaria) !important}
            .text-corterciaria { color: var(--app-corterciaria) !important}
            .text-corquarternaria { color: var(--app-corquarternaria) !important}
            .text-white { color: white !important }

            .bg-corprimaria { background-color: var(--app-corprimaria) !important}
            .bg-corsecundaria { background-color: var(--app-corsecundaria) !important}
            .bg-corterciaria { background-color: var(--app-corterciaria) !important}
            .bg-corquarternaria { background-color: var(--app-corquarternaria) !important}

            .app-container { width: 1024px; margin: 0px auto }

            @media screen and (max-width: 1024px) {
                .app-container { width: 100% }
            }

            @keyframes gradienteAnimater {
                from { background-position: 0% 100%; }
                to { background-position: 100% 100%; }
            }
            .app-identidadevisual { 
                height: 5px;
                background: rgb(0,255,179);
                background: linear-gradient(90deg, rgba(0,255,179,1) 0%, rgba(232,255,0,1) 25%, rgba(236,114,215,1) 55%, rgba(255,0,104,1) 80%, rgba(0,255,179,1) 100%); 
                background-size: 50% 100%;
                animation: gradienteAnimater 3s linear infinite;
            }

        `;
    this.createdElement("style", { type: "text/css" }, style, "head");
  }

  async snackbar(mensagem, type, time = 5000) {
    this.createdElement(
      "style",
      {
        id: "snackbarStyle",
      },
      `
            .app-snackbar {
                position: fixed; 
                top: 0px; 
                width: 350px;
                padding: 10px; 
                margin: 10px; 
                left: calc(50% - 175px);
                z-index: 99999; 
                text-align: center;
                background-color: #1d1d1d;
                color: white;
                box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
            }

            .app-snackbar-add {
                animation: snackbar 1s;
            }

            .app-snackbar-remove {
                animation: snackbaremove 1s;
            }

            @keyframes snackbar {
                0% {
                    top: -60px;
                    opacity: 0;
                }
                40% {
                    top: -60px;
                    opacity: 0;
                }
                100% {
                    top: 0px;
                    opacity: 1;
                }
            }

            @keyframes snackbaremove {
                to {
                    top: -60px;
                    opacity: 0;
                }
                from {
                    top: 0px;
                    opacity: 1;
                }
            }

            .app-snackbar-error {
                background: #ff1e1e !important;
                color: rgb(255 255 255) !important;
            }

            .app-snackbar-success {
                background: #76962E !important;
                color: rgb(0 0 0) !important;
            }

            .app-snackbar-warring {
                background: orange !important;
                color: black !important;
            }

        `,
      "head"
    );

    this.createdElement(
      "div",
      {
        id: "snackbar",
        class: `app-snackbar app-snackbar-add app-snackbar-${type}`,
      },
      mensagem
    );

    await this.sleep(1 / 3);

    let snackbar = document.getElementById("snackbar");

    setTimeout(function () {
      snackbar.classList.remove("app-snackbar-add");
      snackbar.classList.add("app-snackbar-remove");

      setTimeout(function () {
        snackbar.remove();
      }, 900);
    }, time - 1);
  }

  modalBar(titulo, conteudo) {
    this.modal.show = true;
    this.modal.titulo = titulo;
    this.modal.conteudo = conteudo;
  }

  getInputs = (array) => {
    // FUNC: getInputs()
    // CC: Cria imputs padronizados com o projeto

    let elementos = "";

    array.forEach((item, index) => {
      let inputs = `
            <div class="col-span-full sm:col-span-3">
                <label required="${item.required}"><small for="${item.dataset}">${item.label}</small></label>
                <input id="${item.dataset}" type="${item.type}" placeholder="${item.placeholder}" class="${item.class} px-4 w-full rounded-full focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:text-coolGray-900 h-10" required="${item.required}" data-${item.dataset} tabindex="${index}" />
            </div>`;
      elementos += inputs;
    });

    return elementos;
  };

  serialize(obj) {
    // FUNC: serialize(obj)
    // CC: converte objeto em json em querystring EX: ?nome=Nilson&idade=33
    var str = [];
    for (var p in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  }

  removeCache(versao) {
    // FUNC: serialize(obj)
    // CC: Remove o cache do site anterior
    if (process.env.VUE_APP_VERSION != versao) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          caches.delete(cacheName);
        });
      });
      localStorage.clear();
      sessionStorage.clear();
      console.warn("removendo o cache de arquivos!");
    }

    console.warn(`versão atual: ${process.env.VUE_APP_VERSION}`);
  }

  getInputs = (array) => {
    // FUNC: getInputs()
    // CC: Cria imputs padronizados com o projeto

    let elementos = "";

    array.forEach((item, index) => {
      let inputs = `
            <div class="col-span-full sm:col-span-3">
                <label required="${item.required}"><small for="${item.dataset}">${item.label}</small></label>
                <input id="${item.dataset}" type="${item.type}" placeholder="${item.placeholder}" class="${item.class} px-4 w-full rounded-full focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:text-coolGray-900 h-10" required="${item.required}" data-${item.dataset} tabindex="${index}" />
            </div>`;
      elementos += inputs;
    });

    return elementos;
  };

  getLangWE() {
    // CC: usado apenas para converter o tipo de lang do WE.
    let lang = "pt_BR";
    if (this.getLocal("lang")) lang = this.getLocal("lang").replace("-", "_");
    return lang;
  }

  async getCEP(cep) {
    // FUNC: getCEP(cep)
    // CC: Retorna os dados do CEP informado.
    return await new Service(`https://viacep.com.br/`).axios.get(
      `ws/${cep}/json/`
    );
  }

  async getPaises() {
    // FUNC: getPaises
    // CC: Retorna um obejeto com os paises
    return await new Service(`https://api.eleventickets.com/`).axios.get(
      `BuscaEnderecos/paises/?lang=${this.getLangWE()}`
    );
  }

  async getEstados(idpais) {
    // FUNC: getEstados(idpais)
    // CC: Retorna um objetos com os estados.
    return await new Service(`https://api.eleventickets.com/`).axios.get(
      `BuscaEnderecos/estados/${idpais}?lang=${this.getLangWE()}`
    );
  }

  async getCidades(idestado) {
    // FUNC: getCidades(idestado)
    // CC: Retorna um objeto com as cidades.
    return await new Service(`https://api.eleventickets.com/`).axios.get(
      `BuscaEnderecos/cidades/${idestado}?lang=${this.getLangWE()}`
    );
  }

  getEscudos() {
    return [
      {
        nome: "Internacional",
        flag: "https://internacional.s3.sa-east-1.amazonaws.com/brasao_gauchao/inter.png",
      },
      {
        nome: "Internacional Sub-20",
        flag: "https://internacional.s3.sa-east-1.amazonaws.com/brasao_gauchao/inter.png",
      },
      {
        nome: "Inter",
        flag: "https://internacional.s3.sa-east-1.amazonaws.com/brasao_gauchao/inter.png",
      },
      {
        nome: "Grêmio",
        flag: "https://internacional.s3.sa-east-1.amazonaws.com/brasao_gauchao/gremio.png",
      },
      {
        nome: "Ypiranga",
        flag: "https://internacional.s3.sa-east-1.amazonaws.com/brasao_gauchao/ypiranga.png",
      },
      {
        nome: "União Frederiquense",
        flag: "https://internacional.s3.sa-east-1.amazonaws.com/brasao_gauchao/uniaofrederiquense.png",
      },
      {
        nome: "São Luiz",
        flag: "https://internacional.s3.sa-east-1.amazonaws.com/brasao_gauchao/saoluiz.png",
      },
      {
        nome: "São José",
        flag: "https://internacional.s3.sa-east-1.amazonaws.com/brasao_gauchao/saojose.png",
      },
      {
        nome: "Novo Hamburgo",
        flag: "https://internacional.s3.sa-east-1.amazonaws.com/brasao_gauchao/novohamburgo.png",
      },
      {
        nome: "Guarany",
        flag: "https://internacional.s3.sa-east-1.amazonaws.com/brasao_gauchao/guarany.png",
      },
      {
        nome: "Caxias",
        flag: "https://internacional.s3.sa-east-1.amazonaws.com/brasao_gauchao/caxias.png",
      },
      {
        nome: "Brasil de Pelotas",
        flag: "https://internacional.s3.sa-east-1.amazonaws.com/brasao_gauchao/brasilpelotas.png",
      },
      {
        nome: "Aimoré",
        flag: "https://internacional.s3.sa-east-1.amazonaws.com/brasao_gauchao/aimore.png",
      },
      {
        nome: "Juventude",
        flag: "https://internacional.s3.sa-east-1.amazonaws.com/brasao_gauchao/Juventude-2021-01.png",
      },
      {
        nome: "Remo-PA Sub-20",
        flag: "https://internacionalcloudfront.eleventickets.com/remo_logo.png",
      },
      {
        nome: "Elite",
        flag: "https://internacionalcloudfront.eleventickets.com/150x150elite.png",
      },
      {
        nome: "Avenida",
        flag: "https://internacionalcloudfront.eleventickets.com/avenida_150x150.png",
      },
      {
        nome: "Esportivo",
        flag: "https://internacionalcloudfront.eleventickets.com/brasao_gauchao/esportivo_150x150.png",
      },
      {
        nome: "Real Brasília",
        flag: "https://internacionalcloudfront.eleventickets.com/brasao_brasilia_resized_150x150.png",
      },
      {
        nome: "Avaí Kindermann",
        flag: "https://internacionalcloudfront.eleventickets.com/escudos/avaikindermann150x150.png",
      },
      {
        nome: "Flamengo",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/flamengo150x150.png",
      },
      {
        nome: "América-MG",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/America-MG-150x150.png",
      },
      {
        nome: "Atletico GO",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Atletico-GO-150X150.png",
      },
      {
        nome: "Atletico-MG",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Atletico-MG-preto-150x150.png",
      },
      {
        nome: "Atlético-MG",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Atletico-MG-preto-150x150.png",
      },
      {
        nome: "Athlético PR",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Atletico-PR-150x150.png",
      },
      {
        nome: "Athlético - PR",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Atletico-PR-150x150.png",
      },
      {
        nome: "Athlético-PR",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Atletico-PR-150x150.png",
      },
      {
        nome: "Avai FC",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/avai-futebol-clube-150x150.png",
      },
      {
        nome: "Botafogo",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/botafogo-svg-150x150.png",
      },
      {
        nome: "Bragantino",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/bragantino-150x150.png",
      },
      {
        nome: "Ceará",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/ceara-150x150.png",
      },
      {
        nome: "Corinthians",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Corinthians-150x150.png",
      },
      {
        nome: "Coritiba",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/coritiba-150x150.png",
      },
      {
        nome: "Cuiabá",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Cuiaba_EC-150x150.png",
      },
      {
        nome: "Fluminense",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/fluminense-150x150.png",
      },
      {
        nome: "Fortaleza",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Fortaleza-150x150.png",
      },
      {
        nome: "Goiás",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/GOIAS-150x150.png",
      },
      {
        nome: "Internacional",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/internacional-150x150.png",
      },
      {
        nome: "Juventude",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Juventude-150x150.png",
      },
      {
        nome: "Palmeiras",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Palmeiras-150x150.png",
      },
      {
        nome: "Santos",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Santos-150x150.png",
      },
      {
        nome: "São Paulo",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/sao-paulo-150x150.png",
      },

      //SERIE B

      {
        nome: "Bahia",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/bahia150x150.png",
      },
      {
        nome: "Brusque",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/brusque150x150.png",
      },
      {
        nome: "Chapecoense",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/CHAPECOENSE-150x150.png",
      },
      {
        nome: "CRB",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/crb-150x150.png",
      },
      {
        nome: "Criciuma",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/criciuma-150x150.png",
      },
      {
        nome: "Cruzeiro",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/cruzeiro-150x150.png",
      },
      {
        nome: "CSA",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/csa-150x150.png",
      },
      {
        nome: "Gremio",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/gremio-150x150.png",
      },
      {
        nome: "Guarani",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/guarani-150x150.png",
      },
      {
        nome: "Ituano FC ",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Ituano_Futebol_Clube150x150.png",
      },
      {
        nome: "Londrina",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/londrina-150x150.png",
      },
      {
        nome: "Nautico",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Nautico150x150.png",
      },
      {
        nome: "Gremio Novorizontino",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Novohorizontino150x150.png",
      },
      {
        nome: "OFEC",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Oper%C3%83%C2%A1rio-PR150x150.png",
      },
      {
        nome: "Ponte Preta",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/ponte-preta-150x150.png",
      },
      {
        nome: "Sampaio Correa",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/sampaio-correa150x150.png",
      },
      {
        nome: "Sport",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/sport150x150.png",
      },
      {
        nome: "Tombense",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Tombense150x150.png",
      },
      {
        nome: "Vasco",
        flag: "https://internacionalcloudfront.eleventickets.com/escudos/vasco-logo-escudo.png",
      },
      {
        nome: "Vila Nova FC",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/vilanova150x150.png",
      },

      //EUROPA

      {
        nome: "Arsenal",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/arsenal150x150.png",
      },
      {
        nome: "Atletico de Madrid",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/atletico-madrid-new150x150.png",
      },
      {
        nome: "Bayern de Munchen",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/bayern-de-munique150x150.png",
      },
      {
        nome: "Benfica",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/benfica150x150.png",
      },
      {
        nome: "Borussua Dortmund",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/borussia-dortmund150x150.png",
      },
      {
        nome: "Chelsea",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/chelsea150x150.png",
      },
      {
        nome: "Inter de Milao",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Inter_de_Mil%C3%83%C2%A3o_150x150.png",
      },
      {
        nome: "Juventus Italia",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/juventus-italia-svg150x150.png",
      },
      {
        nome: "Liverpool",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/liverpool150x150.png",
      },
      {
        nome: "Manchester City",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/manchester-city150x150.png",
      },
      {
        nome: "Manchester United",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/manchester-united150x150.png",
      },
      {
        nome: "Milan",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/milan150x150.png",
      },
      {
        nome: "Napoli",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/NAPOLI_SVG150x150.png",
      },
      {
        nome: "Olympique Lyonnais",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Olympique_Lyonnais-150x150.png",
      },
      {
        nome: "Paris Saint Germain",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/paris-saint-germain150x150.png",
      },
      {
        nome: "Porto",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/porto-150x150.png",
      },
      {
        nome: "Real Madrid",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/real-madrid150x150.png",
      },
      {
        nome: "Roma",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/roma150x150.png",
      },
      {
        nome: "Tottenham",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/tottenham-150x150.png",
      },

      //CAMPEONATO CARIOCA

      {
        nome: "Audax",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Audax150x150.png",
      },
      {
        nome: "Bangu",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Bangu150x150.png",
      },
      {
        nome: "Boa Vista FC",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/BoaVistaFC150x150.png",
      },
      {
        nome: "Madureira",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/madureira150x150.png",
      },
      {
        nome: "Nova Iguacu",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/NovaIgua%C3%83%C2%A7uFC150x150.png",
      },
      {
        nome: "Portuguesa",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/portuguesa150x150.png",
      },
      {
        nome: "Resende FC",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/ResendeFC150x150.png",
      },
      {
        nome: "Volta Redonda FC",
        flag: "https://flamengoingressos.s3.sa-east-1.amazonaws.com/escudos/Volta-redonda-FC150x150.png",
      },

      //SULAMERICANOS

      {
        nome: "Independiente Medellín",
        flag: "https://internacionalcloudfront.eleventickets.com/escudos/Medellin.png",
      },
      {
        nome: "Ind Medellín",
        flag: "https://internacionalcloudfront.eleventickets.com/escudos/Medellin.png",
      },
      {
        nome: "Metropolitanos",
        flag: "https://internacionalcloudfront.eleventickets.com/escudos/Metropolitanos.png",
      },
      {
        nome: "Nacional",
        flag: "https://internacionalcloudfront.eleventickets.com/escudos/Nacional_Uruguai.png",
      },
      {
        nome: "River Plate",
        flag: "https://internacionalcloudfront.eleventickets.com/escudos/150x150_river.png",
      },
      {
        nome: "Bolívar",
        flag: "https://internacionalcloudfront.eleventickets.com/escudos/logo-bolivar.png",
      },
      //OUTROS

      {
        nome: "Nova Prata",
        flag: "https://internacionalcloudfront.eleventickets.com/escudos/Nova_Prata.png",
      },
      {
        nome: "Oriente",
        flag: "https://internacionalcloudfront.eleventickets.com/escudos/oriente150x150.png",
      },
      {
        nome: "Sul Brasil",
        flag: "https://internacionalcloudfront.eleventickets.com/escudos/Sul_Brasil2-removebg-preview.png",
      },
      {
        nome: "Ferroviária",
        flag: "https://internacionalcloudfront.eleventickets.com/escudos/ferroviaria.png",
      },
      {
        nome: "Gramadense",
        flag: "https://internacionalcloudfront.eleventickets.com/escudos/escudo_gramadense.png",
      },
      {
        nome: "Cruzeiro RS",
        flag: "https://internacionalcloudfront.eleventickets.com/escudos/cruzeiro-rs.png",
      },
      {
        nome: "Enner Valencia",
        flag: "	https://internacionalcloudfront.eleventickets.com/escudos/enner_valencia (1).png",
      },
    ];
  }

  isApp() {
    return "isApp" in sessionStorage ? true : false;
  }
}
