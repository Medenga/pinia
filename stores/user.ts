import { defineStore } from 'pinia'
import type { Customer, Login, User } from '~/types';

export const useUserStore = defineStore("user", () => {
    const user = ref();
    const token = useCookie('MY_COOKIES', {
        maxAge: 60 * 60,
    })
    const setToken = (data?: string) => (token.value = data);
    const setUser = (data?: any) => (user.value = data);

    const signIn = async (data: Login ) => {
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
                const res = await $fetch<Customer>("https://dummyjson.com/users/1");
                setUser(res);
            } catch (error) {
                setUser();
                console.log(error);
            }
        }
    };
    const logout = () => {
        setToken();
        setUser();
    };
        
    return {user, token, logout, signIn, fetchCustomer, setUser, setToken} ;
});