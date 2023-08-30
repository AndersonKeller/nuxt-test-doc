<template>
  <div>
    <li v-for="item in numberArray">{{ item }}</li>
    <a @click="router.push('/login')">Login</a>
    Home
    <button @click="getClient">Cliente</button>
    <Container />

    <pre>{{ pokes }}</pre>
  </div>
</template>
<script setup>
import { useRouter } from "nuxt/app";
// import {h} from "nuxt/app"
const router = useRouter();

const { data } = await useFetch("/poke");

const pokes = data.value;
</script>
<script>
// const router = useRouter();
export default {
  components: {
    Container: () => import("@/components/Container.vue"),
  },
  data() {
    return {
      numberArray: [1, 2, 3],
    };
  },
  methods: {
    setCLiente() {
      const user = {
        name: "user",
      };
      localStorage.setItem("local-user", JSON.stringify(user));
    },
    getClient() {
      const local = localStorage.getItem("local-user");
      console.log(local);
    },
  },
  mounted() {
    this.setCLiente();
    this.getClient();
  },
};
</script>
