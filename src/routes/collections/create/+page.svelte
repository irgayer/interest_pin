<script>
    let imageBase = 'no';
    function fileChanged(event) {
        let reader = new FileReader();
  		reader.onloadend = function() {imageBase = reader.result}
        imageBase = imageBase;
  		if (event.target.files[0]) {reader.readAsDataURL(event.target.files[0]);}
    }
    export let form;
</script>

<main>
    <h2>Create Collection</h2>
	<form class="form" method="post">
		<div class="form-group">
			<label for="title">Title</label>
			<input type="text" class="form-control" name="title" id="title" />
		</div>
		<div class="form-group">
			<label for="description">Description</label>
			<textarea class="form-control" name="description" id="description" />
		</div>
		<div class="form-group">
            <label for="upload">Cover</label>
            <input type="file" class="form-control" name="upload" id="upload" on:change={fileChanged}/>
        </div>
        <div class="form-group">
            <div class="form-check">
                <input class="form-check-input" type='radio' name="type" id="type1" value="public" checked />
                <label class="form-check-label" for="type1">Public</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type='radio' name="type" id="type2" value="private" />
                <label class="form-check-label" for="type2">Private</label>
            </div>
        </div>
        <input type="hidden" name="image" id="image" bind:value={imageBase}/>
        <button type="submit" class="btn btn-primary">Create</button>
	</form>
    {#if form?.success}
        <p>Collection created!</p>
    {/if}
</main>
