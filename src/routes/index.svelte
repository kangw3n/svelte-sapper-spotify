

<script>
import ListSearch from "../components/ListSearch.svelte";
import { debounce } from './_utils';

let accessToken = document.querySelector('.main').dataset.token;
let searchString = '';
let queryType = 'track';

let tracks;

async function search() {
  if (searchString === '') {
    tracks = null;
    return;
  };
  let url = `https://api.spotify.com/v1/search?query=${searchString}&offset=0&limit=20&type=${queryType}&market=TW`;
  tracks = fetch(url, {
    headers: {
    'Authorization' :  `Bearer ${accessToken}`
    }
  })
  .then(res => res.json())
}



</script>

<style>

</style>

<svelte:head>
	<title>Sapper Spotify Project</title>
</svelte:head>



<div class="container">
  <h1>Need Music?</h1>
  <div class="lead">Use Spotify to listen music!</div>
  <form>
    <div class="form-group">
      <input type="text" class="form-control" bind:value={searchString} placeholder="Search Music..." on:keyup={debounce(search, 1000)} />
    </div>
    <div class="form-group">
      <label for="type">Select Type:</label>
      <select bind:value="{queryType}" on:change={search} class="form-control">
        <option value="track">track</option>
        <option value="album">album</option>
        <option value="artist">artist</option>
      </select>
    </div>
  </form>

  {#if tracks}
    {#await tracks}
      <p>loading....</p>
    {:then data}
      {#each data[queryType + 's'].items as item}
        <ListSearch id={item.id} name={item.name} genres={item.genres} artists={item.artists} album={item.album} />
      {/each}
    {:catch error}
      <p>Awww...</p>  
    {/await}
  {/if}


</div>