<template>
  <div class="login">
    <transition name="pop" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style scoped>
.login {
  margin-top: 3rem;
  width: 100%;
}

@media (min-width: 800px){
  .login {
    width: 50%;
    margin: 3rem auto;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 2px #ccc;
    padding: 1rem;
  }
}
@media (min-width: 1400px) {
  .login {
    width: 30%;
  }
}

.pop-enter-active {
  animation: pop-in 200ms ease-out forwards
}
@keyframes pop-in {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(100%);
  }
}
</style>
