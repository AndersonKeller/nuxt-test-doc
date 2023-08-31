export default class StorageTable {
  // TYPE: Class: Storage()

  constructor() {
    this.DEBUG = false;
    // this.isDebug();
  }

  isDebug() {
    //FUNC: isDebug()

    var debug = document.location.href;

    if (debug.indexOf("DEBUG") != -1 && !this.DEBUG) {
      this.DEBUG = true;
      let css = window.document.createElement("style");
      css.setAttribute("type", "text/css");
      css.innerHTML = " * { border: 1px solid red; }";
      document.head.appendChild(css);
    }
  }

  setLocal(nome, dados) {
    //FUNC: setLocal(nome, dados)

    this.isDebug();

    let setElement = `__${window.btoa(nome)}`;
    let output = window.btoa(
      window.unescape(
        window.encodeURIComponent(
          JSON.stringify({ session: new Date().getTime(), data: dados })
        )
      )
    );

    if (["token", "session", "enderecos"].includes(nome)) {
      window.localStorage.setItem(setElement, output);
    } else {
      window.sessionStorage.setItem(setElement, output);
    }
  }

  getLocal(nome) {
    //FUNC: getLocal(nome)

    this.isDebug();

    let getElement = `__${window.btoa(nome)}`;

    if (["token", "session", "enderecos", "lang"].includes(nome)) {
      if (getElement in localStorage) {
        return JSON.parse(
          window.decodeURIComponent(
            window.escape(window.atob(window.localStorage.getItem(getElement)))
          )
        ).data;
      }
    } else {
      if (getElement in sessionStorage) {
        return JSON.parse(
          window.decodeURIComponent(
            window.escape(
              window.atob(window.sessionStorage.getItem(getElement))
            )
          )
        ).data;
      }
    }

    return false;
  }

  removeLocal(nome) {
    //FUNC: removeLocal(nome)
    let getElement = `__${window.btoa(nome)}`;

    if (nome == "session") {
      if (getElement in localStorage) {
        window.localStorage.removeItem(getElement);
      }
    } else {
      if (getElement in sessionStorage) {
        window.sessionStorage.removeItem(getElement);
      }
    }

    return false;
  }

  destroyLocal() {
    //FUNC: destroyLocal()

    let lang = "pt-BR";

    if ("lang" in localStorage) {
      lang = localStorage.getItem("lang");
    }

    if ("isApp" in sessionStorage) {
      return;
    }

    if ("isAppLogin" in sessionStorage) {
      return;
    }

    sessionStorage.clear();
    localStorage.clear();

    localStorage.setItem("lang", lang);

    setTimeout(() => {
      // document.location.reload();
    }, 500);

    return false;
  }
}
