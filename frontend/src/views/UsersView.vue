<script>
import Alert from '@/components/Alert.vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

export default {
    components: {
        Alert
    },
    data() {
        return {
            user_info: {},
            router: useRouter(),
            users: [],
            exibir: false,
            searchUser: "",
            userFinded: null,
            fullName: '',
            age: '',
            nameUser: '',
            password: '',
            c_password: '',
            error_input: false,
            error_password: false,
            error_server: false,
            success_register: false,
            componenteExiste: false,
        };
    },
    async created() {
        try {
            const response = await api.get('user-admin/users-list')
            this.info = response.data
        } catch (error) {
            if (error.status === 403) {
                console.log("Este usuário não tem permissões de adiministrador, acesso negado.")
                this.$router.push('/user-dashboard')
            }
            // localStorage.removeItem('access_token')
        }
    },
    async mounted() {
        this.buscarDados()
    },
    methods: {
        logout() {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            this.$router.push('/login-user')
        },
        async buscarDados() {
            const resposta = await api.get('user-admin/users-list')
            this.users = resposta.data
            console.log(this.users)
        },
        exibirAlert() {
            this.exibir = true
        },
        searchID() {
            this.userFinded = this.users.filter(user => user.id == this.searchUser)
            console.log(this.userFinded)
        },
        async registerUser(event) {
            event.preventDefault()
            try {
                if (this.fullName == '' || this.age == '' || this.nameUser == '' || this.password == '' || this.c_password == '') {
                    this.error_input = true
                    console.log("Preencha todos os campos do formulário!")
                } else {
                    if (this.c_password === this.password) {
                        const response = await api.post('users/', {
                            fullName: this.fullName,
                            age: this.age,
                            nameUser: this.nameUser,
                            password: this.password,
                        })
                        this.success_register = true
                        console.log("Usuário criado: ", response.data)
                        this.fullName = ''
                        this.age = ''
                        this.nameUser = ''
                        this.password = ''
                        this.c_password = ''
                        this.buscarDados()
                    } else {
                        this.error_password = true
                        console.log("As senha não são iguais, verifique se preencheu os campos de senha corretamente.")
                    }
                }
            } catch (error) {
                if (error.response.data.nameUser[0]) {
                    this.error_server = "Já existe um usuário com este nome registrado no sistema! Por favor escolha outro nome de usuário."
                } else {
                    this.error_server = error
                }

                console.log('Error: ', error.response.data)
            }
        }
    }
}
</script>
<template>
    {{ searchID() }}
    <main>
        <div class="users">
            <div class="listUsers">
                <h2 class="titleList">Lista de Usuários.</h2>
                <br />
                <hr />
                <br />
                <form>
                    <p class="searchArea">
                        <input type="search" v-model="searchUser" class="inputSearch"
                            placeholder="Busque o usuário pelo seu número de id..." />
                    </p>
                </form>
                <br />
                <hr />
                <br />
                <table>
                    <thead>
                        <tr>
                            <th>
                                <h4>ID</h4>
                            </th>
                            <th>
                                <h4>Nome de Usuário</h4>
                            </th>
                            <th colspan="2">
                                <h4>Ações</h4>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="this.searchUser == ''" v-for="user in this.users" :key="user.id">
                            <!-- Carrega os usuários que já estão cadastrados no sistema assim que a página carrega. -->
                            <td>{{ user.id }}</td>
                            <td>{{ user.nameUser }}</td>
                            <td class="buttonsActionTable buttonEditTable">
                                <RouterLink class="buttonTable buttonEdit"
                                    :to="{ name: 'user-info', params: { id: user.id } }"><i
                                        class="fi fi-sr-file-edit"></i>
                                </RouterLink>
                            </td>
                            <td class="buttonsActionTable buttonDeleteTable" @click="exibirAlert">
                                <button v-if="!componenteExiste" class="buttonDelete">
                                    <RouterLink><i class="fi fi-sr-delete-document"></i>
                                    </RouterLink>
                                </button>
                            </td>
                        </tr>
                        <tr v-else-if="this.userFinded != undefined && this.userFinded != null"
                            v-for="user in this.userFinded">
                            <!-- Carrega apenas o usuário cujo id for igual ao id buscado na barra de pesquisa. -->
                            <td>{{ user.id }}</td>
                            <td>{{ user.nameUser }}</td>
                            <td class="buttonsActionTable buttonEditTable">
                                <RouterLink class="buttonTable buttonEdit"
                                    :to="{ name: 'user-info', params: { id: user.id } }"><i
                                        class="fi fi-sr-file-edit"></i>
                                </RouterLink>
                            </td>
                            <td class="buttonsActionTable buttonDeleteTable">
                                <button v-if="!componenteExiste" class="buttonDelete" @click="exibirAlert">
                                    <RouterLink><i class="fi fi-sr-delete-document"></i>
                                    </RouterLink>
                                </button>
                            </td>
                        </tr>
                        <tr v-if="this.searchUser != '' && this.userFinded.length == 0">
                            <!-- Retorna uma mensagem de erro, caso não exista um usuário com o id informado. -->
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
                        <input type="text" v-model="fullName" id="fullname" class="inputForm"
                            placeholder="Nome Completo..." required>
                    </p>
                    <p>
                        <input type="number" v-model="age" id="age" class="inputForm" placeholder="Idade..." required>
                    </p>
                    <p>
                        <input type="text" v-model="nameUser" id="username" class="inputForm"
                            placeholder="Crie um nome de Usuário..." required>
                    </p>
                    <p>
                        <input type="password" v-model="password" id="password" class="inputForm"
                            placeholder="Crie uma senha..." required>
                    </p>
                    <p>
                        <input type="password" v-model="c_password" id="c_password" class="inputForm"
                            placeholder="Confirme a senha..." required>
                    </p>
                    <br />
                    <hr />
                    <br />
                    <p>
                        <input type="submit" value="Registrar" class="buttonFormRegister" @click="registerUser">
                    </p>
                </form>
            </div>
        </div>
        <div class="sidebar">

        </div>
        <Alert v-if="this.error_input" titulo="Campos vazios!" cor="rgb(164, 34, 34)"
            msg="Preencha todos os campos do formulário!" @fechar="this.error_input = false" />
        <Alert v-if="this.success_register" titulo="Usuário Registrado!" cor="green"
            msg="O usuário foi registrado com sucesso!" @fechar="this.success_register = false" />
        <Alert v-if="this.error_password" titulo="Erro de Senha!" cor="rgb(164, 34, 34)" msg="As senha não são iguais!"
            @fechar="this.error_password = false" />
        <Alert v-if="this.error_server != false" titulo="Erro do Servidor!" cor="rgb(164, 34, 34)"
            :msg="this.error_server" @fechar="this.error_server = false" />
        <Alert v-if="this.exibir" titulo="Deletar usuário..." cor="rgb(164, 34, 34)"
            msg="Deseja mesmo deletar este usuário?" type="confirm" @fechar="this.exibir = false" />
    </main>
</template>