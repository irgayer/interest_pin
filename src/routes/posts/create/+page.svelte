<script>
	import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
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
    <h2>Create Post</h2>
    <form class="form" method="post" use:enhance>
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" name="title" id="title"/>
        </div>
        <div class="form-group">
            <label for="upload">Image</label>
            <input type="file" class="form-control" name="upload" id="upload" on:change={fileChanged}/>
        </div>
        <input type="hidden" name="image" id="image" bind:value={imageBase}/>
        <div class="form-group">
            <label for="description">Description</label>
            <input type="text" class="form-control" name="description" id="description"/>
        </div>
        <button type="submit" class="btn btn-primary">Create</button>
    </form>
    {#if form?.success === true}
        <p>Post Created!</p>
        <a href="/posts/{form.id}/edit">Add themes?</a>
    {/if}
</main>
