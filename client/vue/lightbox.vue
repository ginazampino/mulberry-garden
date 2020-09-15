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
            axios.get('http://167.172.26.128/upload/files/' + this.$route.params.id).then(response => {
                var image = response.data;
                this.imageURL = 'http://167.172.26.128' + image.url;
            });
        }
    }
</script>