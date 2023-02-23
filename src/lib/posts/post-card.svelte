<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	// @ts-nocheck
	export let post;
	export let editable = false;
	export let deletable = false;

	export let collectable = false;
	let collections = []; // { _id: "123", title: "TIKTOK", checked: true }

	onMount(async () => {
		if (collectable) {
			const res = await fetch('/api/collections/my', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			collections = await res.json();
			collections.forEach((element) => {
				element.checked = false;
				element.checked = element?.posts?.includes(post._id);
			});
			collections = collections;
		}
		if (post.author === $page.data.user.id) {
			editable = true;
			deletable = true;
		}
		else {
			editable = false;
			deletable = false;
		}

		editable = editable;
		deletable = deletable;
	});

	/* function addPostToCollection() {
		let cls = [];
		collections.forEach((element) => {
			cls.push({ id: element._id, checked: element.checked });
		});
		fetch('/api/collections/my', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				postId: post._id,
				collections: cls
			})
		}).then((res) => {
			if (res.status === 200) {

			} else {
				console.log('error');
			}
		});
	} */
	function addPostToCollection(collection, checked)
	{
		let xxx = { id: collection._id, checked: checked };
		console.log(checked)
		fetch('/api/collections/my', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				postId: post._id,
				collections: [xxx],
			})
		}).then((res) => {
			if (res.status === 200) {

			} else {
				console.log('error');
			}
		});
	}
</script>

<div class="card">
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
			<a href="/posts/{post._id}/edit" class="btn btn-info text-decoration-none">Edit</a>
		{/if}
		{#if deletable === true}
			<form action="?/delete" method="post">
				<input type="hidden" name="_method" value="delete" />
				<button type="submit" class="btn btn-danger">Delete</button>
			</form>
		{/if}
		{#if collectable === true}
			<form class="form" method="post" action="/collections/{post._id}/add">
				{#each collections as collection}
					<div class="form-check">
						<input
							class="form-check-input"
							type="checkbox"
							name="collections[]"
							value={collection._id}
							id={collection._id}
							bind:checked={collection.checked}
							on:click={() => addPostToCollection(collection, !collection.checked)}
						/>
						<label class="form-check-label" for={collection._id}>
							{collection.title}
						</label>
					</div>
				{/each}
			</form>
		{/if}
	</div>
	<div class="card-footer">
		<small class="text-muted">Posted by <a href="/profiles/{post.author._id}">{post.author.username}</a></small>
		Themes:
		<div class="btn-group align-right" role="group">
		{#each post.themes as theme}
			<a class="btn btn-outline-secondary btn-sm" href="/themes/{theme}">{theme}</a>
		{/each}
	</div>
	</div>
</div>
