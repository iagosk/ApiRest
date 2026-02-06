<script setup lang="ts">
import api from '@/services/api'
import { onBeforeMount, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const props = defineProps(['id'])

const router = useRouter()

const user = ref()

onBeforeMount(async () => {
    const result = await fetch('http://127.0.0.1:8000/users/'+props.id)

    if(result.status == 200) {
        const resposta = await result.json()
        user.value = {
            fullname: resposta.fullName,
            age: resposta.age,
            userName: resposta.userName,
            password: resposta.password,
        }
    }else {
        router.push('/users')
    }
})
</script>
<template>
    <main>
        <div class="userInfo">
            <h2>Nome Completo: {{ user.fullName }}</h2>
            <h2>Nome de Usuário: {{ user.userName }}</h2>
            <h2>Idade: {{ user.age }}</h2>
        </div>
    </main>
</template>