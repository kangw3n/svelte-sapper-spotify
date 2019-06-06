<script context="module">
  export async function preload({ params, query }) {
    const { id } = params;
    const tokenData = await this.fetch(`index.json`);
    const {access_token: accessToken} = await tokenData.json();

    const res = await this.fetch(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const artists = await res.json();

    const albumsRes = await this.fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const albums = await albumsRes.json();

    if (albumsRes.status === 200) {
      return { artists, albums: albums.items };
    } else {
      this.error(albumsRes.status);
    }
  }
</script>

<script>
  export let artists;
  export let albums;
  let term = '';

  $: filteredTerm = (albums && term !== '') ? albums.filter((album) => {
    return album.name.indexOf(term.toLowerCase()) > -1;
  }) : albums;
  

</script>

<div class="container">
  <header class="artist-header clearfix">
    <h1>
    <span>
      <img src="{artists.images[0].url}" class="artist-thumb img-circle" alt="">
    </span>
      {artists.name}
    </h1>
    <p>
      Genres: 
      {#each artists.genres as genre}
          <span class="spacer">{genre}</span>
      {/each}
    </p>
    <div class="col-md-3">
      <a href="/top-tracks/{artists.id}" class="btn btn-success">View All Tracks</a>
    </div>
  </header>

  <form id="albumFilter">
    <div class="form-group">
      <label class="control-label" for="inputDefault">Filter Album</label>
      <input type="text" bind:value="{term}" name="albumFilter" class="form-control">
    </div>
  </form>

  <div class="artist-albums">
    <div class="row flexy">

      {#each filteredTerm as album}
        <div class="col-md-3 well">
          {#if album.images.length}
            <div class="album">
              <img class="album-thumb img-thumbnail" src="{album.images[0].url}" alt="">
              <h4>{album.name}</h4>
              <a href="/album/{album.id}" class="btn btn-default btn-block">Album Details</a>
            </div>
          {/if}    
        </div>
      {/each}


    </div>
  </div>
</div>

