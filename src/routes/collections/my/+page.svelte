<script>
	import CollectionCard from "../../../lib/collections/collection-card.svelte";

    export let data;
</script>

<main>
    <h1>My Collections</h1>
    {#each data.collections as collection}
        <!-- <div class="card">
            <div class="card-header">
				<h5>{collection.title}</h5>
			</div>
            <img src={collection.cover.image} class="card-img-top" alt="..." />
            <div class="card-body">
                <p class="card-text">{collection.description}</p>
                <a href="/collections/{collection._id}" class="btn btn-primary">View</a>
            </div>
            <div class="card-footer text-muted">
                <p>{collection.type} collection</p>
            </div>
        </div> -->
        <CollectionCard {collection}/>
    {/each}
</main>