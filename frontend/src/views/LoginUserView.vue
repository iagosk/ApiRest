<script>
import Alert from '@/components/Alert.vue'
import api from '@/services/api';
import { useRouter } from 'vue-router'

export default {
    components: {
        Alert,
    },
    data() {
        return {
            users: [],
            username: '',
            password: '',
            router: useRouter()
        }
    },
    methods: {
        async loginUser() {
            try {
                console.log(this.username)
                console.log(this.password)

                const resposta = await api.post('/login/', {
                    nameUser: this.username,
                    password: this.password
                })

                const token = resposta.data.access
                localStorage.setItem('access_token', token)
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                console.log("Usuário logado com sucesso!")
                console.log(resposta.data)
                this.$router.push('/admin/')
            }catch(error) {
                console.log("Erro de servidor...")
            }
        },
        checkFields(event) {
            event.preventDefault()

            // Verificação dos campos do formulário.
            if (this.username == '' && this.password == '') {
                console.log('Preencha os campos do formulário com os seus dados')
                return
            } else if (this.username == '') {
                console.log('Preencha o campo com o seu nome de usuário.')
                return
            } else if (this.password == '') {
                console.log('Preencha o campo com a sua senha.')
                return
            }

            // Invoca a função de login.
            console.log("Realizando o login...")
            this.loginUser()
        },
    }
}
</script>
<template>
    <main>
        <div class="users">
            <div class="loginUser">
                <form class="formLoginUser">
                    <h2>Login de Usuário.</h2>
                    <br />
                    <hr />
                    <br />
                    <p>
                        <input type="text" v-model="username" name="username" id="username" class="inputForm"
                            placeholder="Como era o seu nome mesmo?" required>
                    </p>
                    <p>
                        <input type="password" v-model="password" name="password" id="password" class="inputForm"
                            placeholder="Você havia nos dito uma senha..." required>
                    </p>
                    <br />
                    <hr />
                    <br />
                    <p>
                        <input type="submit" value="Entrar" class="buttonFormLogin" @click="checkFields">
                    </p>
                </form>
            </div>
        </div>
    </main>
</template>