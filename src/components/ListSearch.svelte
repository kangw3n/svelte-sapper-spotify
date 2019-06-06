    
<script>
  export let id = "";
  export let name = "";

  export let genres = "";
  export let artists = "";
  export let album = "";

  // $: songPath = `/track/${id}`;
  // $: artistsPath = artists.length ? artists.map(el => {
  //   return {
  //     id: el.id,
  //     path: `/artist/${el.id}`,
  //     name: el.name
  //   };
  // }) : [];

  // $: albumPath = `/album/${album.id}`;
</script>



<div class="row">
  <div class="col-md-12">
    <div class="search-res card">
      <h4 class="card-header">
        <a href="/track/{id}">{name}</a>
      </h4>

      <div class="card-body">
        {#if genres}
          <div>
            <strong>Genres:</strong>
            {#each genres as genre}
              <span class="spacer">{genre}</span>
            {/each}
          </div>
        {/if}

        {#if artists}
          <div>
            <strong>Artists:</strong>
            {#each artists as artist}
              <span class="spacer">
                <a href="/artist/{artist.id}">{artist.name}</a>
              </span>
            {/each}
          </div>
        {/if}

        {#if album}
          <div>
            <strong>Album:</strong>
            <span class="spacer">
               <a href="/album/{album.id}">{album.name}</a>
            </span>
          </div>
        {/if}
      </div>

    </div>
  </div>
</div>