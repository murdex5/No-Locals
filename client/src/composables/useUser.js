import {ref, computed } from 'vue';

const currentUser = ref(null);
const token = ref(null);


export function useUser() {
    const initializeUser =  () => {
        const savedToken = localStorage.getItem('token');
        const savedUsername = localStorage.getItem('username');

        if (savedToken && savedUsername) {
            token.value = savedToken;
            currentUser.value = { username: savedUsername };
        }
    };

    const login = (userData, userToken) => {
        currentUser.value = userData;
        token.value = userToken;
        localStorage.setItem('token', userToken);
        localStorage.setItem('username', userData.username);
    };

    const logout = () => {
        currentUser.value = null;
        token.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };
    const isLoggedIn = computed(() => !!token.value);
    const username = computed(() => currentUser.value?.username || null);

    return {
        currentUser,
        token,
        isLoggedIn,
        username,
        login,
        initializeUser
    };
}