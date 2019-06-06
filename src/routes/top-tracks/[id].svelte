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
    const artist = await res.json();

    const topTrackRes = await this.fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=TW`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const topTrack = await topTrackRes.json();

    if (topTrackRes.status === 200) {
      return { artist, topTrack: topTrack.tracks };
    } else {
      this.error(topTrackRes.status);
    }
  }
</script>

<script>
  import { msMinute } from '../_utils'; 
 
  export let artist;
  export let topTrack;
</script>



<div class="container">
  <div id="track">
    <header class="album-header">
      <div class="row">
        <div class="col-md-4">
          `<div><img src="{artist.images[0].url}" class="album-thumb" alt=""></div>
        </div>
        <div class="col-md-8">
          <h2>{artist.name}</h2>
          <h4>Follower: {artist.followers.total}</h4>
          <h5>Popularity: {artist.popularity}</h5>
          <a href="{artist.external_urls.spotify}" target="_blank" class="btn btn-primary">View Artist In Spotify</a>
        </div>
      </div>
    </header>
    
    
    <div class="album-tracks">
      <h2>Album Tracks</h2>
      <div>
        {#each topTrack as track}
          <div class="well">
						<div class="row">
							<div class="col-md-2">
								<img src="{track.album.images[0].url}" class="album-thumb" alt="">
								<span>{track.album.name}</span>
								<br>
								<a href="/album/{track.album.id}" class="deep-link">View Album</a>
							</div>
							
							<div class="col-md-10">
								<h4>{track.name}</h4>
								<a href="{track.preview_url}" target="_blank" class="btn btn-primary">Preview Track</a>
								<div>{msMinute(track.duration_ms)} - Popularity: {track.popularity}</div>
							</div>
						</div>
					</div>
        {/each}
      </div>
    
    </div>
  </div>
  
</div>

