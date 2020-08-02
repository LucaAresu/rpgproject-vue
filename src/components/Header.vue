<template>
    <div id="nav">
        <ul>
                <router-link to="/"  tag="li" active-class="active" exact><a>Home</a></router-link>
                <router-link to="/about" tag="li" active-class="active"><a>About</a></router-link>
        </ul>
    </div>
</template>

<style scoped>
    a {
        text-decoration: none;
        padding: 1rem;
        color: black;
    }
    li.active {
        border-bottom: 2px solid #3c6e71;
    }
    ul {
        list-style: none;
        display: flex;
        justify-content: center;
    }
    li {
        display: inline-block;
        padding: 1rem;
    }
    li:hover {
        border-bottom: 2px solid  #3c6e71;
    }
</style>
