<script>
	export let data;
	export let form;
</script>

<form method="post" action="?/edit">
	<div class="form-group">
		<label for="title">Title</label>
		<input type="text" class="form-control" name="title" id="title" bind:value={data.post.title} />
	</div>
	<div class="form-group">
		<img src={data.post.image} alt={data.post.title} />
	</div>
	<div class="form-group">
		<label for="description">Description</label>
		<input
			type="text"
			class="form-control"
			name="description"
			id="description"
			bind:value={data.post.description}
		/>
	</div>
	<div class="btn-group">
		<button type="submit" class="btn btn-primary">Update</button>
		<form class="d-inline" action="?/delete" method="post">
			<input type="hidden" name="_method" value="delete" />
			<button type="submit" class="btn btn-danger">Delete</button>
		</form>
	</div>
	{#if form?.success === true}
		<p>Post Updated!</p>
	{/if}
</form>
