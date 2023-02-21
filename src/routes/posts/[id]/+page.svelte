<script>
	import PostCard from "../../../lib/posts/post-card.svelte";

	// @ts-nocheck
	export let data;
</script>

<main>
	<!-- <div class="card" style="width: 18rem;">
		<img src={data.post.image} class="card-img-top" alt="..." />
		<div class="card-body">
			<h5 class="card-title">{data.post.title}</h5>
			<p class="card-text">
				{data.post.description}
			</p>
			<a href="/posts/{data.post._id}/edit" class="btn btn-info">Edit</a>
		</div>
	</div> -->
	<PostCard post={data.post} editable={true} deletable={true}/>
</main>
