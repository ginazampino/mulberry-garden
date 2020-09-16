<template>
    <router-link tag="div" class="lightbox"  v-bind:to="'/'">
        <img :src="imageURL">
        <div class="lightbox-content"></div>
    </router-link>
</template>

<script>
    const axios = require('axios');
    let id = null;

    export default {
        data() {
            return { 
                posts: this.$parent.posts,
                imageURL: '',
                returnURL: ''
             };
        },
        
        mounted() {
            axios.get('https://strapi.mulberry.garden/upload/files/' + this.$route.params.id).then(response => {
                var image = response.data;
                this.imageURL = 'https://strapi.mulberry.garden' + image.url;
            });
        }
    }
</script>