<script lang="ts" setup>
import api from '@/services/api'
import { onBeforeMount, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Alert from "@/components/Alert.vue"

const props = defineProps(['id'])

const router = useRouter()

const user = ref()

onBeforeMount(async () => {
    const result = await fetch('http://127.0.0.1:8000/users/users/'+props.id)

    if(result.status == 200) {
        const resposta = await result.json()
        user.value = {
            fullname: resposta.fullName,
            age: resposta.age,
            nameUser: resposta.nameUser,
            password: resposta.password,
        }
    }else {
        router.push('/users')
    }
})
</script>
<template>
    <main class="userInfoArea">
        <div class="userInfo">
            <h2>Edição de Usuário.</h2>
            <br />
            <hr />
            <br />
            <input type="text" class="inputForm" placeholder="Nome Completo..." :value="user.fullname" />
            <input type="text" class="inputForm" placeholder="Idade..." :value="user.age" />
            <input type="text" class="inputForm" placeholder="Nome de Usuário..." :value="user.nameUser"/>
            <input type="text" class="inputForm" placeholder="Senha..." :value="user.password" />
            <div class="buttonsForm">
                <RouterLink class="buttonForm buttonBack" to="/users">Voltar</RouterLink>
                <input type="submit" class="buttonForm" />
            </div>
        </div>
    </main>
</template>