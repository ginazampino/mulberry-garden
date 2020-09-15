<template>
    <div class="app">
        <!-- Lightbox: -->
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>

        <div class="wrapper">

            <!-- Header: -->
            <header>
                <div class="heading">
                    <router-link 
                        tag="h1" 
                        v-bind:to="'/'"
                    >
                        <i class="fal fa-seedling accent"></i>Mulberry Garden
                    </router-link>
                    <p class="subheading">
                        Watch mulberries and their friends grow.
                    </p>
                </div>
            </header>

            <!-- Content: -->
            <div class="gallery">
                <router-link 
                    tag="figure" 
                    class="post" 
                    v-for="item in pageOfItems" 
                    v-bind:key="item.id"
                    v-bind:style="{ 'background-image': 'url(http://167.172.26.128' + item.image.formats.thumbnail.url + ')' }"
                    v-bind:to="'/' + (item.plant.name).toLowerCase() + '/' + item.image.id"
                >
                    <figcaption>
                        <span class="post-title">{{ item.plant.name }}</span>
                        <span class="post-date">{{ item.date }}</span>
                    </figcaption>
                </router-link>
            </div>

            <!-- Pagination: -->
            <div class="gallery-pagination">
                <jw-pagination :items="postItems" @changePage="onChangePage" :pageSize="12" :maxPages="5"></jw-pagination>
            </div>

            <!-- Footer: -->
            <footer>
                Copyright <i class="far fa-copyright accent" alt="©" title="©"></i> <a href="https://www.ginazampino.com">Gina Zampino</a>. All rights reserved.
            </footer>
        </div>
    </div>
</template>

<script>
    import lightbox from './lightbox.vue';

    const axios = require('axios');
    const api = 'http://167.172.26.128/posts';
    const postItems = [];

    export default {
        components: {
            'lightbox': lightbox
        },
        
        data() {
            return {
                postItems,
                pageOfItems: []
            }
        },
        
        mounted() {
            axios.get(api).then(response => {
                this.postItems = response.data.sort(function(a, b) {
                    return b.id - a.id;
                });
            })
        },

        methods: {
            onChangePage(pageOfItems) {
                this.pageOfItems = pageOfItems;
            }
        }
    };
</script>