<template>
    <div class="section grey portfolio">
        <div class="titulo">
            <h2>PORTFOLIO</h2>
        </div>
        <div class="portfolio__content-cont"  >

            <div class="portfolio__item-orange title">
                <span>web</span>
            </div>
            <div class="portfolio__item-orange" v-for="(item,index) in datos.web" :key="'port-'+ index">
                <a href class="portfolio__link" :l-box="item.id" >
                    <img class="portfolio__img" :src="item.thumb_src" :alt="item.nombre">
                </a>
                <div class="item-hover">
                    <span>
                        {{item.name}}
                        <br>
                        {{item.description}}
                    </span>
                </div>
            </div>


            <div class="portfolio__item-blue title">
                <span>brand</span>
            </div>
            <div class="portfolio__item-blue" v-for="(item,index) in datos.branding" :key="'brand-'+ index">
                <a href class="portfolio__link" :l-box="item.id" >
                    <img class="portfolio__img" :src="item.thumb_src" :alt="item.nombre">
                </a>
                <div class="item-hover">
                    <span>
                        {{item.name}}
                        <br>
                        {{item.description}}
                    </span>
                </div>
            </div>


            <div class="portfolio__item-red title">
                <span>print</span>
            </div>
            <div class="portfolio__item-red" v-for="(item,index) in datos.print" :key="'print-'+ index">
                <a class="portfolio__link" :href="item.link" target="_blank">
                    <img class="portfolio__img" :src="item.thumb_src" :alt="item.nombre">
                </a>
                <div class="item-hover">
                    <span>
                        {{item.name}}
                        <br>
                        {{item.description}}
                    </span>
                </div>
            </div>

        </div>


    </div>
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

<style>

</style>
