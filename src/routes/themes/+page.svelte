<script>
	import PostCard from "../../lib/posts/post-card.svelte";

	export let data;

	let search; // search input
    let posts = []; // posts to display
    let valid = false; // if the search is valid

	async function searchThemes(themeToSearch) {
        search = themeToSearch;
        await fetch(`/api/posts/themes?theme=${themeToSearch}`)
            .then((response) => response.json())
            .then((data) => {
                posts = data;
                posts = posts;
                valid = true;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
	}
</script>

<div class="container">
	<h1>Top 10 themes:</h1>
	<div class="list-group list-group-numbered">
		{#each data.themes as theme}
			<button class="list-group-item list-group-item-action btn-outline-primary"
				on:click={() => searchThemes(theme._id)}>{theme._id} <span class="badge bg-primary rounded-pill">{theme.count}</span></button
			>
		{/each}
	</div>
</div>

<div class="container">
	<form class="d-flex" role="search">
		<input
			class="form-control me-2"
			type="search"
			placeholder="Search"
			aria-label="Search"
			bind:value={search}
		/>
		<button class="btn btn-outline-success" type="button" on:click={() => searchThemes(search)}>Search</button>
	</form>
</div>

{#if valid}
<div class="container">

    <h1>Results for #{search}</h1>
    {#if posts.length === 0}
        <p>No results found</p>
    {/if}
    {#each posts as post}
        <PostCard {post} />
    {/each}
</div>
{/if}