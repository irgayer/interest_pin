<script>
	import PostCard from '$lib/posts/post-card.svelte';

	export let data;
</script>

<main>
	<h2>Posts</h2>
	{#each data.posts as post}
		<!-- <div class="card">
			<div class="card-header">
				<h5><a href="/posts/{post._id}" class="link-dark">{post.title}</a></h5>
			</div>
			<a href="/posts/{post._id}" class="link-dark">
				<img src={post.image} class="card-img-top" alt={post.title} />
			</a>
			<div class="card-body">
				 <h5 class="card-title"><a href="/posts/{post._id}">{post.title}</a></h5>
				<p class="card-text">
					{post.description}
				</p>
				<a href="/posts/{post._id}/edit" class="btn btn-info">Edit</a>
			</div>
		</div> -->
		<PostCard post={post} editable={false} collectable={true}/>
	{/each}
</main>
