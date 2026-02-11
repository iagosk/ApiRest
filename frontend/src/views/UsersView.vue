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
            exibir: false,
            searchUser: "",
            userFinded: null,
        };
    },

    async mounted() {
        const resposta = await api.get('users/')
        this.users = resposta.data
    },
    methods: {
        exibirAlert() {
            this.exibir = true
        },
        searchID() {
            this.userFinded = this.users.filter(user => user.id == this.searchUser)
        }
    }
}
</script>
<template>
    {{ searchID() }}
    {{ console.log(this.userFinded.length) }}
    <main class="users">
        <div class="listUsers">
            <h2 class="titleList">Lista de Usuários.</h2>
            <br />
            <hr />
            <br />
            <form>
                <p class="searchArea">
                    <input type="search" v-model="searchUser" class="inputSearch"
                        placeholder="Informe o id do usuário..." />
                </p>
            </form>
            <br />
            <hr />
            <br />
            <table>
                <thead>
                    <tr>
                        <th><h4>Id</h4></th>
                        <th><h4>Nome Completo</h4></th>
                        <th><h4>Ações</h4></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="this.searchUser == ''" v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.fullName }}</td>
                        <td>
                            <RouterLink class="buttonTable buttonEdit"
                                :to="{ name: 'userInfo', params: { id: user.id } }"><i class="fi fi-sr-file-edit"></i>
                            </RouterLink>
                            <button v-if="!componenteExiste" class="buttonDelete" @click="exibirAlert">
                                <RouterLink><i class="fi fi-sr-delete-document"></i>
                                </RouterLink>
                            </button>
                            <Alert titulo="Deletar usuário..." cor="rgb(164, 34, 34)"
                                text="Deseja mesmo deletar este usuário?" v-if="exibir"
                                @fechar="exibir = false" />
                        </td>
                    </tr>
                    <tr v-else-if="this.userFinded != undefined && this.userFinded != null"
                        v-for="user in this.userFinded">
                        <td>{{ user.id }}</td>
                        <td>{{ user.fullName }}</td>
                        <td>
                            <RouterLink class="buttonTable buttonEdit"
                                :to="{ name: 'userInfo', params: { id: user.id } }"><i class="fi fi-sr-file-edit"></i>
                            </RouterLink>
                            <button v-if="!componenteExiste" class="buttonDelete" @click="exibirAlert">
                                <RouterLink><i class="fi fi-sr-delete-document"></i>
                                </RouterLink>
                            </button>
                        </td>
                    </tr>

                    <tr v-if="this.searchUser != '' && this.userFinded.length == 0">
                        <td colspan="3">
                            <h4 style="color: red">Usuário não encontrado!</h4>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="registerUser">
            <form class="formRegisterUser">
                <h2>Registro de Usuário.</h2>
                <br />
                <hr />
                <br />
                <p>
                    <input type="text" name="fullname" id="fullname" class="inputForm" placeholder="Nome Completo..."
                        required>
                </p>
                <p>
                    <input type="number" name="age" id="age" class="inputForm" placeholder="Idade..." required>
                </p>
                <p>
                    <input type="text" name="username" id="username" class="inputForm"
                        placeholder="Crie um nome de Usuário..." required>
                </p>
                <p>
                    <input type="password" name="password" id="password" class="inputForm"
                        placeholder="Crie uma senha..." required>
                </p>
                <p>
                    <input type="password" name="c_password" id="c_password" class="inputForm"
                        placeholder="Confirme a senha..." required>
                </p>
                <br />
                <p>
                    <input type="submit" value="Registrar-se" class="buttonForm">
                </p>
            </form>
        </div>
        <div class="sidebar">
            <ul>
                <li>Usuários</li>
                <li>Produtos</li>
            </ul>
        </div>
    </main>
</template>