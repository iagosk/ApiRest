<script>
import { ref } from "vue"
import Alert from '@/components/Alert.vue'
import api from '@/services/api'

const componenteExiste = ref(false)

export default {
    components: {
        Alert
    },
    data() {
        return {
            users: [],
            exibir: false
        };
    },

    async mounted() {
        const resposta = await api.get('users/')
        this.users = resposta.data
    },
    methods: {
        exibirAlert() {
            this.exibir = true
        }
    }
}

let exibir = ref(false)
</script>
<template>
    <main class="users">
        <div class="listUsers">
            <h2>Lista de Usuários cadastrados:</h2>
            <br />
            <hr />
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome Completo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.fullName }}</td>
                        <td>
                            <RouterLink class="buttonTable buttonEdit"
                                :to="{ name: 'userInfo', params: { id: user.id } }"><i class="fi fi-sr-file-edit"></i>
                            </RouterLink>
                            <button v-if="!componenteExiste"  class="buttonDelete" @click="exibirAlert">
                                <RouterLink><i class="fi fi-sr-delete-document"></i>
                                </RouterLink>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Alert titulo="Apagar usuário..." cor="rgb(164, 34, 34)" text="Deseja mesmo apagar o usuário: ." v-if="exibir" @fechar="exibir = false"/>
        </div>
    </main>
</template>