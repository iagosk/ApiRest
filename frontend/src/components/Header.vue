<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
<header>
    <div class="title">
        <h2>API - <span class="letter">R</span>est</h2>
    </div>
    <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><a href="http://127.0.0.1:8000/users/users/" target="_blank">API</a></li>
    </ul>
    <ul>
        <li><RouterLink class="buttonHeader" to="/register-user">Registrar-se</RouterLink></li>
    </ul>
</header>
</template>