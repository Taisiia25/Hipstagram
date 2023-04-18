import axios from 'axios';
import { logOut } from '../reducers/authReducer/reducer';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://52.3.249.107:9000';

class HipsatgramApi {
    constructor(){
        this.API_URL = API_URL;
        this.api = axios.create({
            baseURL: API_URL,
        });

        this.api.interceptors.request.use(config => {
            const token = localStorage.getItem('userToken') || '';
            config.headers.Authorization = token;

            if(config.method === 'post' && config.url === '/posts') {
                delete config.headers['Content-Type'];
            } else {
                config.headers['Content-Type'] = 'application/json';
            }

            return config;
        });

        this.api.interceptors.response.use(function (response) {
            return response;
          }, function (error) {
            console.log(error)
            if (error.response.status === 401) {
                localStorage.setItem('userToken', '') 
                window.location.href = '/'
            }
            return Promise.reject(error);
          });
    }



    async login(data) {
        const response = await this.api.post('/auth/login', data);
        return response.data;
    }

    async registration(data) {
        const response = await this.api.post('/auth/registration', data);
        return response.data;
    }
    async currentUser() {
        const response = await this.api.get('/users/current');
        return response.data;
    }
    async followUser(user_id) {
        const response = await this.api.get(`users/follow/${user_id}`);
        return response.data;
    }

    async getFollowUserById(user_id) {
        const response = await this.api.get(`/users/followersAndFollowing/${user_id}`);
        return response.data;
    }

    async feedPosts() {
        const response = await this.api.get('/posts/feed');
        return response.data;
    }

    async getUsers(serchName) {
        console.log(serchName)
        const response = await this.api.get('/users', {params: {search: serchName}});
        return response.data;
    }

    async getUserById(userId) {
        const response = await this.api.get('/users/'+userId);
        return response.data;
    }
   

    async createPost(data) {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('image', data.image);

        const response = await this.api.post('/posts', formData);
        return response.data;
    }

    async getPostById(postId) {
        const response = await this.api.get('/posts/'+postId);
        return response.data;
    }

    async updateCurrentUser(data) {
        const response = await this.api.patch('/users/current', data);
        return response.data;
    }
    async updateUserPassword(data) {
        const response = await this.api.post('/auth/updatePassword', data);
        return response.data;
    }
}

const hipsatgramApi = new HipsatgramApi()
export default hipsatgramApi;

