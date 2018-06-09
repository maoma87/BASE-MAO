<template>
    <header class="header" v-if="datos" v-on:mousemove="logoRotation">
        <div class="header__logo-cont">
            <div class="header__logo__bubble">
                <span v-if="datos.greetings">{{datos.greetings[greetingRndm(datos.greetings)]}}</span>
            </div>
            <img :src="datos.logo" alt="">
        </div>
        <div class="header__content">
            <span class="nombre">{{datos.name}}</span>
            <span v-html="datos.under_name"></span>
        </div>
    </header>
</template>

<script>
export default {
	name: "vheader",
    props:['datos'],
    data(){
        return{

        }
    },
    methods:{
        greetingRndm: array => {
            var rndmNum = Math.floor((Math.random() * array.length))            
            return rndmNum
        },

        logoRotation: cords => {
            var $header = $('.header');
            var $header_logo_cont = $('.header__logo-cont');

            var x = cords.clientX - $header.position().left;
            var y = cords.clientY - $header.position().top;
            var dx = $header.innerWidth()/2 - x;
            var dy = $header.innerHeight()/2 - y;
            var dxp = dx/($header.innerWidth()/2);
            var dyp = dy/($header.innerHeight()/2);

            var newTransformRotateXY = "rotateY(" + 20*Math.tan(dxp) + "deg) rotateX(" + -20*Math.tan(dyp) + "deg)";

            $header_logo_cont.css({
                'transform': newTransformRotateXY
            });
        }


    },

    mounted: function(){
    }
}
</script>

<style>

</style>
