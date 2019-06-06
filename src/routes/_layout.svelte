<script context="module">
	export async function preload({ params, query }) {
    const res = await this.fetch(`index.json`);
    const data = await res.json();
    if (res.status === 200) {
      return { token: data.access_token };
    } else {
      this.error(res.status, data.message);
    }
	}
</script>


<script>
	import Nav from '../components/Nav.svelte';

  export let segment;
  export let token;
</script>

<style>
</style>

<Nav {segment}/>

<main class="content main" data-token="{token}">
	<slot></slot>
</main>