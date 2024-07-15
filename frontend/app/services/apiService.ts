import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function(url: string): Promise<any> {
        console.log('get', url)
        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            const headers: { [key: string]: string } = {
                'Accept': 'application/json'
            }

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: headers
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    post: async function(url: string, data:any, contentType: string = ''): Promise<any> {
        console.log('post', url, data);
        const token = await getAccessToken();

        return new Promise((resolve, reject) => { 
            const headers: { [key: string]: string } = {
                'Accept': 'application/json'
            }

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            if (contentType) {
                headers['Content-type'] = contentType;
            }

            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                headers: headers,
                body: data
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }
}

export default apiService;
