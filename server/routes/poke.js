export default defineEventHandler(async (event, number) => {
  const data = await fetch(`https://pokeapi.glitch.me/v1/pokemon/657`);
  // console.log(data);
  return data;
});
