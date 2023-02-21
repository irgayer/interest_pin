<script>
	export let form;
</script>

<main>
	<form class="form" method="post">
		<div class="form-group">
			<label for="email">Email</label>
			<input type="email" name="email" id="email" class="form-control" />
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input type="password" name="password" id="password" class="form-control" />
		</div>
        <button type="submit" class="btn btn-primary">Login</button>
	</form>
	<p>Don't have an account? Register <a href="/auth/register">here</a></p>
	{#if form?.success}
        <p>Welcome back!</p>
    {/if}
    {#if form?.success === false}
        <p>{form.body}</p>
    {/if}
</main>
