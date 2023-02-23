<script>
	import PostCard from "../../../lib/posts/post-card.svelte";

    export let data;
    export let form;

    function deleteFromCollection(collectionId, postId)
    {
        fetch('/api/collections/my', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: postId,
                collections: [{id: collectionId, checked: false}],
            })
        }).then((res) => {
            if (res.status === 200) {
                data.posts = data.posts.filter((post) => post._id !== postId);
            } else {
            }
        });
    }
</script>



<h1>{data.collection.title}</h1>

{#if data.collection.posts.length === 0}
    <p>No posts in this collection</p>
{/if}
{#each data.collection.posts as post}
<div>
    <button class="btn btn-danger" on:click={() => deleteFromCollection(data.collection._id, post._id)}>Delete</button>
    <PostCard post={post} collectable={true}/>
</div>
{#if form?.success === true}
    <p>Post Deleted!</p>
{/if}
{#if form?.success === false}
    <p>Post not deleted! Error: {form.body}</p>
{/if}

{/each}
