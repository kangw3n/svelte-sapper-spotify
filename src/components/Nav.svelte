<script>
  export let segment;
  let activeClass = 'active';
</script>

<style>
	a {
		color: #2ebd59;
	}
</style>


<nav class="navbar navbar-inverse">
	<div class="container">
		<div class="navbar-header">
      <a class='navbar-brand {segment === undefined ? activeClass : ""}' href='.'>Sapper Svelte Spotify</a>
		</div>
		<div id="navbar" class="collapse navbar-collapse">
			<ul class="nav navbar-nav">
				<li>
          <a class='{segment === undefined ? activeClass : ""}' href='.'>home</a>
				</li>
        <li>
          <a rel=prefetch class='{segment === "about" ? activeClass : ""}' href='about'>about</a>
        </li>
			</ul>
		</div>
	</div>
</nav>

