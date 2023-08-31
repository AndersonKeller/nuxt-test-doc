import Service from "@/controllers/Service.controller";
export default defineEventHandler(async (event, number) => {
  // const gestaoSocio = new GestaoSocio();
  // const data = await gestaoSocio.getProximosJogos();
  const service = new Service();
  const classe = "GestaoSocio";
  const method = "gsEventosOnda";
  const params = [];
  const data = await $fetch(
    `${service.BASE_URL}router.php?method=${method}&class=${classe}`,

    {
      class: classe,
      method: "POST",
      params: params,
      body: { method: method },
    }
  );
  console.log(data);
  return data.result;
});
//this.getDados("gsEventosOnda", "GestaoSocio", []);
