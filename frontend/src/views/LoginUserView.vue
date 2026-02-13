<script setup lang="ts">

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
                        <input type="text" name="username" id="username" class="inputForm"
                            placeholder="Como era o seu nome mesmo?" required>
                    </p>
                    <p>
                        <input type="password" name="password" id="password" class="inputForm"
                            placeholder="Você havia nos dito uma senha..." required>
                    </p>
                    <br />
                    <hr />
                    <br />
                    <p>
                        <input type="submit" value="Entrar" class="buttonFormLogin">
                    </p>
                </form>
            </div>
        </div>  
    </main>
</template>