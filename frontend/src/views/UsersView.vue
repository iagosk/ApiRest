<script>
import api from '@/services/api'

export default {
    data() {
        return {
            users: []
        };
    },

    async mounted() {
        const resposta = await api.get('users/')
        this.users = resposta.data
    }
}
</script>
<template>
    <main>
        <div class="listUsers">
            <h2>Lista de Usuários cadastrados:</h2>
            <br />
            <hr />
            <br />
            <ul v-for="user in users" :key="user.id">
                <li>
                    {{ user.id }} - <RouterLink :to="{ name: 'userInfo', params: { id: user.id } }">{{ user.fullName }}
                    </RouterLink>
                </li>
            </ul>
        </div>
    </main>
</template>