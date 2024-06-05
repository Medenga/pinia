import { defineStore } from 'pinia'
import type { Customer, User } from '~/types';

export const useMyUserStore = defineStore("user", () => {
    const user = ref();
    const token = useCookie('MY COOKIES', {
        maxAge: 60*60,
    })
    const setToken = (data?: string) => (token.value = data);
    const setUser = (data?: any) => (user.value = data);

    const signIn = async (data: any ) => {
        try {
            const res = await $fetch<User>("https://dummyjson.com/auth/login",{
                method: 'POST',
                body: data,
            });
            setToken(res.token);
        } catch (error) {
            setToken();
            setUser();
            console.log();
        }
    };
    const fetchCustomer = async () => {
        if (token.value) {
            try {
                const res = await $fetch<Customer>("https://dummyjson.com/users/1")
            } catch (error) {
                setUser();
                console.log(error);
            }
        }
    };
});