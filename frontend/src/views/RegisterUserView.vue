<script>
import api from '@/services/api'
import axios from 'axios'
import Alert from '@/components/Alert.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

export default {
    components: {
        Alert
    },
    data() {
        return {
            fullName: '',
            age: '',
            userName: '',
            password: '',
            c_password: '',
            success_register: false,
            error_password: false,
            error_input: false,
            error_server: false,
        }
    },
    methods: {
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
                    } else {
                        this.error_password = true
                        console.log("As senhas não são iguais.")
                    }
                }
            } catch (error) {
                this.error_server = true
                console.log('Error: ', error.response.data)
            }
        }
    }
}
</script>
<template>
    <main>
        <div class="users">
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
                        <input type="submit" value="Registrar-se" class="buttonFormRegister" @click="registerUser">
                    </p>
                </form>
            </div>
        </div>
        
        <Alert v-if="this.error_input" titulo="Campos vazios!" cor="rgb(164, 34, 34)" msg="Preencha todos os campos do formulário!" @fechar="this.error_input = false" />
        <Alert v-if="this.success_register" titulo="Usuário Registrado!" cor="green" msg="O usuário foi registrado com sucesso. " @fechar="this.$router.push('login-user')" />
        <Alert v-if="this.error_password" titulo="Erro de Senha!" cor="rgb(164, 34, 34)" msg="As senha não são iguais. Verifique se você preencheu os campos de senha corretamente." @fechar="this.error_password = false" />
        <Alert v-if="this.error_server" titulo="Erro do Servidor!" cor="rgb(164, 34, 34)" msg="Houve um erro no servidor da API." @fechar="this.error_server = false" />
    </main>
</template>