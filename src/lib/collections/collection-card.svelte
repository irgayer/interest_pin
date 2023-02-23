<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let collection;
	let copied;
	let subscribed;

	function copyCollection() {
		fetch('/api/collections/copy', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				collectionId: collection._id
			})
		}).then((res) => {
			if (res.status === 200) {
				copied = true;
			} else {
				console.log('error');
			}
		});
	}

	function inheritCollection() {
		fetch('/api/collections/inherit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				collectionId: collection._id,
				userId: $page.data.user.id
			})
		}).then((res) => {
			if (res.status === 200) {
				subscribed = true;
			}
		});
	}

	function unInheritCollection() {
		fetch('/api/collections/inherit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				collectionId: collection._id,
				userId: $page.data.user.id
			})
		}).then((res) => {
			if (res.status === 200) {
				subscribed = false;
			}
			if (res.status === 204)
			{
				subscribed = true;
			}
			else {
				console.log('error');
			}
		});
	}

	onMount(async () => {
		//let params = new URLSearchParams({
		// 	collectionId: collection._id,
		// 	userId: $page.data.user.id
		// }).toString();
		// const url = '/api/collections/copy?' + params;
		// const s = await fetch(url).then(async (res) => {
		// 	let data = await res.json();
		// 	copied = data.copied;
		// });

		let params = new URLSearchParams({
			collectionId: collection._id,
			userId: $page.data.user.id
		}).toString();
		const url2 = '/api/collections/inherit?' + params;
		const s2 = await fetch(url2).then(async (res) => {
			let data = await res.json();
			subscribed = data.subscribed;
		});
		// const res2 = await fetch('/api/collections/inherit?' + params, {
		//     method: 'GET',
		//     headers: {
		//         'Content-Type': 'application/json'
		//     }
		// });
		// const data2 = await res2.json();
		// inherited = data2.inherited;
	});
</script>

<div class="card">
	<div class="card-header">
		<h5>{collection.title}</h5>
	</div>
	<img src={collection.cover.image} class="card-img-top" alt="..." />
	<div class="card-body">
		<p class="card-text">{collection.description}</p>
		<a href="/collections/{collection._id}" class="btn btn-primary text-decoration-none"
			>View {collection.posts.length} posts</a
		>
		<div class="btn-group" role="group" aria-label="Basic example">
			{#if !copied}
				<button type="button" class="btn btn-secondary" on:click={copyCollection}>Copy</button>
			{/if}
			{#if copied}
				<button type="button" class="btn btn-secondary" disabled>Copied</button>
			{/if}

			{#if collection.author._id !== $page.data.user.id}
				{#if !subscribed}
					<button type="button" class="btn btn-secondary" on:click={inheritCollection}
						>Follow</button
					>
				{/if}
				{#if subscribed}
					<button type="button" class="btn btn-secondary" on:click={unInheritCollection}
						>Following</button
					>
				{/if}
			{/if}
		</div>
	</div>

	<div class="card-footer text-muted">
		<p>
			{collection.type} collection. Created by:
			<a href="/profiles/{collection.author._id}">{collection.author.username}.</a>
		</p>
		{#if collection.type === 'copy'}
			<p>Copied on <a href="/collections/{collection.parent}/">this</a> collection</p>
		{/if}
		{#if collection.author._id === $page.data.user.id}
			<form class="form-inline" action="/collections/{collection._id}/delete" method="post">
				<button type="submit" class="btn btn-primary">delete</button>
			</form>
		{/if}
	</div>
</div>
