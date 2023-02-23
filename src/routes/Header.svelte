<script>
	import { page } from '$app/stores';
</script>

<header>
	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container-fluid">
			<a class="navbar-brand" href="/posts">InterestPin</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon" />
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="/posts">Recent posts</a>
					</li>
					{#if $page.data.user}
					<li class="nav-item">
						<a class="nav-link active" href="/posts/my">My posts</a>
					</li>
					<li class="nav-item">
						<a class="nav-link active" href="/posts/create">Create post</a>
					</li>
					{/if}
					<li class="nav-item">
						<a class="nav-link active" href="/collections">Recent Collections</a>
					</li>
					{#if $page.data.user}
					<li class="nav-item">
						<a class="nav-link active" href="/collections/my">My collections</a>
					</li>
					<li class="nav-item">
						<a class="nav-link active" href="/collections/create">Create collection</a>
					</li>
					{/if}
					<li class="nav-item">
						<a class="nav-link active" href="/themes">Themes</a>
					</li>
				</ul>
				<ul class="navbar-nav mb-2 mb-lg-0">
					{#if !$page.data.user}
						<div class="btn-group" role="group" aria-label="Basic example">
							<li class="nav-item">
								<a class="btn btn-primary active text-decoration-none" href="/auth/login">Login</a>
							</li>
							<li class="nav-item">
								<a class="btn btn-success active text-decoration-none" href="/auth/register"
									>Register</a
								>
							</li>
						</div>
					{/if}
					{#if $page.data.user}
						<li class="nav-item">
							<a class="btn btn-primary active text-decoration-none" href="/profiles/{$page.data.user.id}">{$page.data.user.username}</a>
						</li>
						<li class="nav-item">
							<form action="/auth/logout" method="POST">
								<button
									type="submit"
									class="btn btn-danger active text-decoration-none"
									href="/profile">Logout</button
								>
							</form>
						</li>
					{/if}
				</ul>
				<!-- <form class="d-flex" role="search">
			  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
			  <button class="btn btn-outline-success" type="submit">Search</button>
			</form> -->
			</div>
		</div>
	</nav>
</header>

<style>
</style>
