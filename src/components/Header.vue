<template>
    <div id="nav">
        <ul>
                <router-link :to="{name: 'Home' }" v-if="$store.getters.getLogged" tag="li" active-class="active" exact key="home"><a>Home</a></router-link>
                <router-link :to="{name: 'About'}" v-if="$store.getters.getLogged" tag="li" active-class="active" key="about"><a>About</a></router-link>
                <router-link :to="{name: 'Login' }" v-if="! $store.getters.getLogged" tag="li" active-class="active" key="login"><a>Login</a></router-link>
                <router-link :to="{name: 'Register'}" v-if="! $store.getters.getLogged" tag="li" active-class="active" key="register"><a>Register</a></router-link>
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
