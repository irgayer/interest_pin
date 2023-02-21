<script>
	import { onMount } from "svelte";


	// @ts-nocheck
	export let post;
	export let editable;
	export let deletable = false;

	export let collectable = false;
	let collections = []; // { _id: "123", title: "TIKTOK", checked: true }

	onMount(async () => {
		if (collectable) {
			const res = await fetch("/api/collections/my", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			collections = await res.json();

			console.log(collections);
			collections = collections;
		}
	});

	function addPostToCollection() {
		console.log("addPostToCollection");
	}
</script>

<div class="card" style="width: 18rem;">
	<div class="card-header">
		<h5><a href="/posts/{post._id}" class="link-dark">{post.title}</a></h5>
	</div>
	<a href="/posts/{post._id}" class="link-dark">
		<img src={post.image} class="card-img-top" alt={post.title} />
	</a>
	<div class="card-body">
		<p class="card-text">
			{post.description}
		</p>
		{#if editable === true}
			<a href="/posts/{post._id}/edit" class="btn btn-info">Edit</a>
		{/if}
		{#if deletable === true}
			<form action="?/delete" method="post">
				<input type="hidden" name="_method" value="delete" />
				<button type="submit" class="btn btn-danger">Delete</button>
			</form>
		{/if}
	</div>
	{#if collectable === true}
	<form class="form" method="post" action="/collections/{post._id}/add">
		{#each collections as collection }
			<div class="form-check">
				<input class="form-check-input" type="checkbox" name="collections[]" value="{collection._id}" id="{collection._id}" bind:checked={collection.checked}/>
				<label class="form-check-label" for="{collection._id}">
					{collection.title}
				</label>
			</div>
		{/each}
		<input type="hidden" name="_method" value="put" />
		<button type="button" on:click={addPostToCollection} class="btn btn-primary">Add to collection</button>
	</form>
	{/if}
</div>
