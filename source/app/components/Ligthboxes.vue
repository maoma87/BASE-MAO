<template>
    <div class="lightboxes">

        <div class="imagen-portafolio-container" v-for="(item,index) in datos.web" :key="'lb-web-'+ index" :id="item.id">
            <div class="imagen-portafolio">
                <img :src="item.img_src" :alt="item.name">
            </div>
            <div class="imagen-footer">
                <a class="btn-website" :href="item.link" target="_blank">launch website</a>
            </div>
        </div>

        <div class="imagen-portafolio-container" v-for="(item,index) in datos.branding" :key="'lb-brand-'+ index" :id="item.id">
            <div class="imagen-portafolio">
                <img :src="item.img_src" :alt="item.name">
            </div>
        </div>

    </div>
</template>


<script>
export default {
    name: "vligthboxes",
    props:['datos'],
    data(){
        return{

        }
    },
    methods:{
    }
}
</script>

<style lang="sass">

</style>
