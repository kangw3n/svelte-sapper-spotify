<script context="module">
  export async function preload({ params, query }) {
    const { id } = params;
    const tokenData = await this.fetch(`index.json`);
    const {access_token: accessToken} = await tokenData.json();

    const res = await this.fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();

    if (res.status === 200) {
      return { data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let data;
</script>



<div class="container">
{#await data}
  <p>loading....</p>
{:then data}
  <header class="album-header">
    <div class="row">
      <div class="col-md-4">

        <div>
          <img
            class="album-thumb"
            src="{data.album.images[0].url}"
            alt="" />
        </div>

      </div>
      <div class="col-md-8">

        <h4>
          {#each data.artists as artist}
            <span class="spacer">
              <a class="deep-link" href="/artist/{artist.id}">
                {artist.name}
              </a>
            </span>
          {/each}
        </h4>

        <h2>{data.name}</h2>
        <h5>
          Album Name:
          <a class="deep-link" href="/album/{data.album.id}">{data.album.name}</a>
        </h5>
        <a
          href="{data.external_urls.spotify}"
          target="_blank"
          class="btn btn-primary">
          View In Spotify
        </a>
        <figure>
          <figcaption>Listen to the 等你下課:</figcaption>
          <audio
            controls
            src="{data.preview_url}">
            Your browser does not support the
            <code>audio</code>
            element.
          </audio>
        </figure>
      </div>
    </div>
  </header>
  {:catch error}
  <p>Awww...</p>
  {/await}
</div>

