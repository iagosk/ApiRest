<script lang="ts" setup>
import api from '@/services/api'
import { onBeforeMount, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Alert from "@/components/Alert.vue"

const props = defineProps(['id'])

const router = useRouter()

interface User {
    fullName: String,
    nameUser: String,
    age: String,
    password: String,
    is_admin: String,
}

const user = ref<User>({
    fullName: '',
    nameUser: '',
    age: '',
    password: '',
    is_admin: '',
})

onBeforeMount(async () => {
    const result = await api.get('user-admin/users-list/' + props.id)
    console.log(result)
    if (result.status == 200) {
        const resposta = result.data
        console.log(resposta)
        user.value = {
            nameUser: resposta.nameUser,
            fullName: resposta.fullName,
            age: resposta.age,
            password: resposta.password,
            is_admin: resposta.is_admin,
        }
    } else {
        router.push('/admin')
    }
})
</script>
<template>
    <main>
        <div class="userInfoArea">
            <div class="userInfo">
                <h2>Edição de Usuário.</h2>
                <br />
                <hr />
                <br>
                <label for="fullName">Nome Completo:</label>
                <br>
                <br>
                <input type="text" name="fullName" class="inputForm" placeholder="Nome Completo..." :value="user.fullName" />
                <label for="age">Idade:</label>
                <br>
                <br>
                <input type="text" name="age" class="inputForm" placeholder="Idade..." :value="user.age" />
                <label for="nameUser">Nome de Usuário:</label>
                <br>
                <br>
                <input type="text" name="nameUser" class="inputForm" placeholder="Nome de Usuário..." :value="user.nameUser" />
                <label for="password">Senha:</label>
                <br>
                <br>
                <input type="text" name="password" class="inputForm" placeholder="Senha..." :value="user.password" />
                <div class="buttonsForm">
                    <RouterLink class="buttonFormEdit buttonBack" to="/admin">Voltar</RouterLink>
                    <input type="submit" class="buttonFormEdit" />
                </div>
            </div>
        </div>
        <div class="sidebar">
            <ul>
                <li>
                    <RouterLink to="">Usuários</RouterLink>
                </li>
                <li>
                    <RouterLink to="">Produtos</RouterLink>
                </li>
            </ul>
        </div>
    </main>
</template>