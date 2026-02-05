<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
<header>
    <div class="title">
        <h2>API - Rest</h2>
    </div>
    <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/users">Users</RouterLink></li>
    </ul>
</header>
</template>