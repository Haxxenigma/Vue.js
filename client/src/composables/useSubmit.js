import router from '@/router';
import axios from '@/utils/axios';

const methods = {
    POST: axios.post,
    PATCH: axios.patch,
    DELETE: axios.delete,
    GET: axios.get,
};

export async function useSubmit(payload, url, {
    method = 'POST',
    headers = {},
    redirectUrl = null,
    redirect = false,
    refresh = true,
}) {
    let body = {};
    let data = null;
    let err = null;

    const valid = Boolean(Array.isArray(payload));
    if (valid) {
        payload.forEach((item) => body[item.id] = item.value);
    } else {
        body = payload;
    }

    try {
        data = (await methods[method](
            url,
            !['DELETE', 'GET'].includes(method)
                ? body : { params: body },
            { headers },
        )).data;

        if (data.token) localStorage.setItem('token', data.token);
        if (data.message) sessionStorage.setItem('popup', data.message);

        if (redirectUrl) router.replace(redirectUrl);
        else if (redirect) router.replace(data.redirect);

        if (refresh) {
            setTimeout(() => {
                router.go(0);
            }, 100);
        }
    } catch (e) {
        document.querySelector(`input#${e.response?.data[0]?.path}`)?.focus();
        let errorField = null;
        if (valid) {
            errorField = payload.find((item) => item.id === e.response?.data[0]?.path);
        }
        if (errorField) errorField['error'] = e.response.data[0].msg;
        else err = e.response?.data.message;
    }

    return { data, err };
}