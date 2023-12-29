import { ref } from 'vue';
import axios from '@/utils/axios';
import router from '@/router/router';

const methods = {
    POST: axios.post,
    PATCH: axios.patch,
    DELETE: axios.delete,
    GET: axios.get,
};

export async function useSubmit(fields, url, { method = 'POST', headers = {}, redirect = false, redirectUrl }) {
    const data = ref({});
    const error = ref(null);
    fields.forEach((f) => data.value[f.id] = f.value);

    try {
        const res = await methods[method](
            url,
            !['DELETE', 'GET'].includes(method)
                ? data.value
                : { params: data.value },
            { headers },
        );
        res.data.token && localStorage.setItem('token', res.data.token);
        res.data.message && sessionStorage.setItem('popup', res.data.message);
        redirect && router.replace(redirectUrl ? redirectUrl : `/user/${res.data.name}`);
        setTimeout(() => {
            router.go(0);
        }, 100);
    } catch (err) {
        document.querySelector(`input#${err.response?.data[0]?.path}`)?.focus();
        const errorField = fields.find((elem) => elem.id === err.response?.data[0]?.path);
        if (errorField) errorField['error'] = err.response.data[0].msg;
        else error.value = err.response?.data.message;
    }

    return error.value;
}