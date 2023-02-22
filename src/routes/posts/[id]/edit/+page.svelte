<script>
	import { onMount } from 'svelte';

	export let data;
	export let form;
	let themes = [];
	onMount(() => {
		themes = data.post.themes ? data.post.themes : [];
		themes = themes;
	});
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
	<div class="form-group">
		<p>Themes</p>
		{#each themes as theme}
			<div class="d-flex">
				<input type="text" class="form-control" name="themeName" bind:value={theme} disabled />
				<form action="?/deleteTheme" method="post">
					<input type="hidden" name="_method" value="delete" />
					<input type="hidden" name="themeName" bind:value={theme} />
					<button type="submit" class="btn btn-danger">Delete</button>
				</form>
			</div>
		{/each}
		<form class="d-flex" action="?/addTheme" method="post">
			<input type="hidden" name="_method" value="post" />
			<input class='form-control' name="themeName" />
			<button type="submit" class="btn btn-primary">Add</button>
		</form>
	</div>
	<div class="btn-group">
		<button type="submit" class="btn btn-primary">Update</button>
		<form class="d-inline" action="?/delete" method="post">
			<button type="submit" class="btn btn-danger">Delete</button>
		</form>
	</div>
	{#if form?.success === true}
		<p>Post Updated!</p>
	{/if}
</form>
