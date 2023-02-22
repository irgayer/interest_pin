<script>
	import PostCard from "../../../lib/posts/post-card.svelte";

	// @ts-nocheck
	export let data;
</script>

<main>
    <h2>My Posts</h2>
    {#each data.posts as post}
	<!-- <div class="card" style="width: 18rem;">
		<img src={post.image} class="card-img-top" alt="..." />
		<div class="card-body">
			<h5 class="card-title">{post.title}</h5>
			<p class="card-text">
				{post.description}
			</p>
			<a href="/posts/{post._id}/edit" class="btn btn-info">Edit</a>
		</div>
	</div> -->
	<PostCard post={post} editable={true} collectable={true}/>
    {/each}
</main>