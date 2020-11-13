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
                        @click.native="onClear()"
                    >
                        <i class="fal fa-seedling accent"></i><span>Mulberry</span> <span>Garden</span>
                    </router-link>
                    <p class="subheading">
                        <span>Watch mulberries</span> <span>and their friends grow.</span>
                    </p>
                </div>

                <nav>
                    <select id="gallery-select" @change="onFilter($event.target.value)">
                        <option>All Specimens</option>
                        <optgroup label="Seedlings">
                            <option>Black Mulberries</option>
                            <option>Dragon's Blood</option>
                            <option>Turtle Shells</option>
                        </optgroup>
                        <optgroup label="Ficus Carica">
                            <option>Frank</option>
                        </optgroup>
                    </select><i class="fal fa-caret-down accent"></i>
                </nav>
            </header>

            <!-- Content: -->
            <div class="gallery">
                <router-link 
                    tag="figure" 
                    class="post" 
                    v-for="item in pageOfItems" 
                    v-bind:key="item.id"
                    v-bind:style="{ 'background-image': 'url(https://strapi.mulberry.garden' + item.image.formats.thumbnail.url + ')' }"
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
                <span>Copyright <i class="far fa-copyright accent" alt="©" title="©"></i> <a href="https://www.ginazampino.com">Gina Zampino</a>.</span> <span>All rights reserved.</span>
            </footer>
        </div>
    </div>
</template>

<script>
    import lightbox from './lightbox.vue';

    const axios = require('axios');
    const api = 'https://strapi.mulberry.garden/posts';
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
            axios.get(api).then(response => { // Get all the posts.
                this.postItems = response.data.sort(function(a, b) { // Change the value of postItems.
                    return b.id - a.id; // Sort posts by ID in descending order.
                });
            })
        },

        methods: {
            onChangePage(pageOfItems) {
                this.pageOfItems = pageOfItems;
            },

            onFilter(value) { // When the dropdown value changes, run this method.
                if (value.includes('All')) { // Check if the dropdown value includes the word "All".
                    axios.get(api).then(response => { // Get all the posts.
                        this.postItems = response.data.sort(function(a, b) { // Change the value of postItems.
                            return b.id - a.id; // Sort posts by ID in descending order.
                        });
                    });
                } else {
                    axios.get(api).then(response => { // Get all the posts.
                        let posts = response.data; // Temporarily store the posts.
                        let filteredPosts = posts.filter(post => post.plant.name.includes(value)); // Filter posts by name against the dropdown value.
                        let sortedPosts = filteredPosts.sort(function(a, b) { // Set the value of sortedPosts.
                            return b.id - a.id; // Sort posts by ID in descending order.
                        });
                        this.postItems = sortedPosts; // Change the value of postItems.
                    })
                }
            },

            onClear() { // When the link is clicked, run this method.
                axios.get(api).then(response => { // Get all the posts.
                    this.postItems = response.data.sort(function(a, b) { // Change the value of postItems.
                        return b.id - a.id; // Sort posts by ID in descending order.
                    });
                });
                document.getElementById("gallery-select").value = "All Specimens"; // Change the value of the HTML select element.
            }
        }
    };
</script>