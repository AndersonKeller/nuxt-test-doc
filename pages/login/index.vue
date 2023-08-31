<script setup>
import { useRouter } from "nuxt/app";
// import {h} from "nuxt/app"
const router = useRouter();
definePageMeta({
  layout: false,
});
</script>
<template>
  <NuxtLayout name="login">
    <div>Login</div>
    <a @click="router.push('/')">Home</a>
  </NuxtLayout>
</template>
