<script>
	import PostCard from '$lib/posts/post-card.svelte';

	export let data;
</script>

<main>
	<h2>Posts</h2>

	{#each data.posts as post}
	<div class="row">
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
		<div class="col-lg-12 mb-4">

			<PostCard post={post} editable={false} collectable={true}/>
		</div>
	</div>
	{/each}
</main>
