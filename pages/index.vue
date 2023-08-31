<template>
  <div>
    <li v-for="item in numberArray">{{ item }}</li>
    <a @click="router.push('/login')">Login</a>
    Home
    <button @click="getClient">Cliente</button>
    <Container />
    <pre>{{ partidas }}</pre>
    <pre>{{ pokes }}</pre>
  </div>
</template>
<script setup>
import { useRouter } from "nuxt/app";
// import {h} from "nuxt/app"
const router = useRouter();

const { data } = await useFetch("/poke");
const pokes = data.value;
const { data: response } = await useFetch("/getProximosJogos");
const partidas = response.value;
</script>
<script>
// const router = useRouter();
import Configs from "@/controllers/Config.controller";
import StorageTable from "@/controllers/Storage.controller";
import Util from "@/controllers/Util.controller";
export default {
  data() {
    return {
      numberArray: [1, 2, 3],
    };
  },
  methods: {
    setCLiente() {
      const storage = new StorageTable();
      const user = {
        name: "user",
      };
      storage.setLocal("local-user", JSON.stringify(user));
    },
    async getClient() {
      const configs = new Configs();
      const util = new Util();
      const app = util.isApp();

      console.log("app", app);
      const storage = new StorageTable();

      const local = storage.getLocal("local-user");
      console.log(local);
      const user = await configs.getConfig();
      console.log("config", user);
    },
  },
  mounted() {
    this.setCLiente();
    this.getClient();
  },
};
</script>
