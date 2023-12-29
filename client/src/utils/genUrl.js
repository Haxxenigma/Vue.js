export const genGoogleUrl = () => {
    const url = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        redirect_uri: process.env.VUE_APP_GOOGLE_REDIRECT_URI,
        response_type: 'code',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
        access_type: 'offline',
        prompt: 'consent',
    };
    const qs = new URLSearchParams(options);

    return `${url}?${qs.toString()}`;
};

export const genGithubUrl = () => {
    const url = 'https://github.com/login/oauth/authorize';
    const options = {
        client_id: process.env.VUE_APP_GITHUB_CLIENT_ID,
        scope: 'user:email',
    };

    const qs = new URLSearchParams(options);

    return `${url}?${qs.toString()}`;
};