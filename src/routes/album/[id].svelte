<script context="module">
  export async function preload({ params, query }) {
    const { id } = params;
    const tokenData = await this.fetch(`index.json`);
    const {access_token: accessToken} = await tokenData.json();

    const albumsRes = await this.fetch(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const albums = await albumsRes.json();

    if (albumsRes.status === 200) {
      return { albums };
    } else {
      this.error(res.status);
    }
  }
</script>


<script>

  export let albums;


</script>

<div class="container">
  <div id="album">
    <header class="album-header">
      <div class="row">
        <div class="col-md-4">
          <div><img class="album-thumb" src="{albums.images[0].url}" alt=""></div>
        </div>
        
        <div class="col-md-8">
          <h4>
          {#each albums.artists as artist}
             <!-- content here -->
             <span class="spacer"><a href="/artist/{artist.id}" class="deep-link btn btn-link">{artist.name}</a></span>
          {/each}
          </h4>
          <h2>{albums.name}</h2>
          <h5>Release Date: {albums.release_date}</h5>
          <a href="{albums.external_urls.spotify}" target="_blank" class="btn btn-primary">View in Spotify</a>
        </div>
      </div>
    </header>
    
    <div class="album-tracks">
      <h2>Album Tracks</h2>
        <div>	
         {#each albums.tracks.items as track}
            <div class="card text-white bg-secondary mb-3">
            <h5 class="card-header">
              {track.track_number} - <a href="/track/{track.id}" class="deep-link">{track.name}</a>
              {#each track.artists as artist}
                <span class="spacer"><a href="/artist/{artist.id}" class="deep-link btn btn-link">{artist.name}</a></span>
              {/each}
            </h5>
            <div class="card-body">
              <figure class="flex">
                <figcaption>Listen to the {track.name}:</figcaption>
                <audio
                    controls
                    src="{track.preview_url}">
                        Your browser does not support the
                        <code>audio</code> element.
                </audio>
              </figure>
            </div> 
          </div>
         {/each}
        </div>
    </div>
    
  </div>
</div>