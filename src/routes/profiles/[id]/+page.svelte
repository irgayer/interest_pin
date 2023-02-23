<script>
	import CollectionCard from '../../../lib/collections/collection-card.svelte';
	import PostCard from '../../../lib/posts/post-card.svelte';

	export let data;
</script>

<div class="container">
	<p>Username: {data.user.username}</p>
	<p>Id: {data.user._id}</p>
</div>
<div class="container">
	<h1>Posts</h1>
	{#each data.posts as post}
		<PostCard {post} />
	{/each}
</div>

<div class="container">
	<h1>Collections</h1>
	{#each data.collections as collection}
			<CollectionCard {collection}/>
	{/each}
</div>
