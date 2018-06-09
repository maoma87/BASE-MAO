<template lang="pug">
    .section.grey.portfolio
        .titulo
            h2 PORTFOLIO
        .portfolio__content-cont
            .portfolio__item-orange.title
                span web
            .portfolio__item-orange(v-for='(item,index) in datos.web', :key="'port-'+ index")
                a.portfolio__link(href='', :l-box='item.id')
                    img.portfolio__img(:src='item.thumb_src', :alt='item.nombre')
                .item-hover
                    span
                        | {{item.name}}
                        br
                        | {{item.description}}
            .portfolio__item-blue.title
                span brand
            .portfolio__item-blue(v-for='(item,index) in datos.branding', :key="'brand-'+ index")
                a.portfolio__link(href='', :l-box='item.id')
                    img.portfolio__img(:src='item.thumb_src', :alt='item.nombre')
                .item-hover
                    span
                        | {{item.name}}
                        br
                        | {{item.description}}
            .portfolio__item-red.title
                span print
            .portfolio__item-red(v-for='(item,index) in datos.print', :key="'print-'+ index")
                a.portfolio__link(:href='item.link', target='_blank')
                    img.portfolio__img(:src='item.thumb_src', :alt='item.nombre')
                .item-hover
                    span
                        | {{item.name}}
                        br
                        | {{item.description}}
</template>

<script>
export default {
    name: "vportfolio",
    props:['datos'],
    data(){
        return{

        }
    }
}
</script>

<style lang="sass">

</style>