<template>
    <div class="container py-5 min-h-screen">
        <div>
            <h1>Profile</h1>
            <button
                @click="signOut"
                class=" px-3 py-2 rounded-md bg-red-500 text-white inline-flex items-center justify-center">
                Sign Out
            </button>
            <pre>{{ userStore.user }}</pre>
        </div>
    </div>
</template>
<script lang="ts" setup>
    const userStore = useUserStore();
    definePageMeta({
        middleware: 'auth',
    });
    const signOut = () => {
        userStore.logout();
        useRouter().go(0);
    };
</script>