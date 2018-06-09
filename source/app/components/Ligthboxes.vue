<template lang="pug">
    .lightboxes
        .imagen-portafolio-container(v-for='(item,index) in datos.web', :key="'lb-web-'+ index", :id='item.id')
            .imagen-portafolio
                img(:src='item.img_src', :alt='item.name')
            .imagen-footer
                a.btn-website(:href='item.link', target='_blank') launch website
        .imagen-portafolio-container(v-for='(item,index) in datos.branding', :key="'lb-brand-'+ index", :id='item.id')
            .imagen-portafolio
                img(:src='item.img_src', :alt='item.name')

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
