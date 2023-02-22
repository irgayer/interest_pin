<script>
    export let form;
</script>

<main>
    <h1>Register</h1>
    <form class="form" method="post" action="?/register">
        <div class="mb-3">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" class="form-control" />
        </div>
    </div>
    <div class="mb-3">
        <label for="username">Username</label>
        <div class="input-group">
            <span class="input-group-text">@</span>
            <input type="text" name="username" id="username" class="form-control" />
        </div>
    </div>
    <div class="mb-3">
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" class="form-control" />
        </div>
    </div>
        <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <p>Already have an account? Login <a href="/auth/login">here</a></p>
    {#if form?.success}
        <p>Welcome to our club!</p>
    {/if}
    {#if form?.success === false}
        <p>{form.body.message}</p>
    {/if}
</main>