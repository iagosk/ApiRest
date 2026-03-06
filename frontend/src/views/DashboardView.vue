<script>
import api from '@/services/api'
import { useRouter } from 'vue-router'

export default {
    data() {
        return {
            info: {},
            router: useRouter(),
        }
    },
    async created() {
        try {
            const response = await api.get('dashboard/user-dashboard/')
            this.info = response.data[0]
            console.log(this.info)
        }catch(error) {
            localStorage.removeItem('access_token')
            this.$router.push('/login-user')
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            this.$router.push('/login-user')
        }
    }
}
</script>
<template>
    <main class="dashboard">
        <div class="blockData">
            <div class="title">
                <h2>{{ this.info.nameUser }}</h2>
            </div>
            <br />
            <hr />
            <br />
            <p>Nome Completo: {{ this.info.fullName }}</p> 
            <p>Idade: {{ this.info.age }}</p> 
            <p v-if="this.is_admin == true">Tipo de usuário: Administrador.</p> 
            <p v-if="this.is_admin == false">Tipo de usuário: Customer.</p> 
            <button @click="logout">Sair</button>
        </div>
    </main>
</template>