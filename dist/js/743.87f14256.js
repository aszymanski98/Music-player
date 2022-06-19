"use strict";(self["webpackChunkmusic"]=self["webpackChunkmusic"]||[]).push([[743],{2743:function(e,t,n){n.r(t),n.d(t,{default:function(){return I}});var s=n(3396);const o=(0,s.uE)('<section class="mb-8 py-20 text-white text-center relative"><div class="absolute inset-0 w-full h-full bg-contain introduction-bg" style="background-image:url(assets/img/header.png);"></div><div class="container mx-auto"><div class="text-white main-header-content"><h1 class="font-bold text-3xl lg:text-5xl mb-5">Listen to Great Music!</h1><p class="w-full md:w-8/12 mx-auto"> This is the coolest music player made in Vue 3 </p></div></div><img alt="" class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full" src="assets/img/introduction-music.png"></section>',1),i={class:"container mx-auto"},a={class:"bg-white rounded border border-gray-200 relative flex flex-col"},l={class:"px-6 pt-6 pb-5 font-bold border-b border-gray-200"},r=(0,s._)("span",{class:"card-title"},"Songs",-1),c=[r],d={id:"playlist"};function g(e,t,n,r,g,m){const u=(0,s.up)("AppSongItem"),h=(0,s.Q2)("icon-secondary");return(0,s.wg)(),(0,s.iD)("main",null,[o,(0,s._)("section",i,[(0,s._)("div",a,[(0,s.wy)(((0,s.wg)(),(0,s.iD)("div",l,c)),[[h,{icon:"headphones-alt",right:!0}]]),(0,s._)("ol",d,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(g.songs,(e=>((0,s.wg)(),(0,s.j4)(u,{key:e.docID,song:e},null,8,["song"])))),128))])])])])}var m=n(8771),u=n(7139);const h=["id"],p={class:"text-gray-600 text-lg whitespace-nowrap"},f=["onClick"],w=(0,s._)("i",{class:"fa fa-comments text-gray-600"},null,-1);function b(e,t,n,o,i,a){const l=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("li",{class:"flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50",id:`song-id-${n.song.docID}`},[(0,s._)("div",null,[(0,s.Wm)(l,{to:{name:"song",params:{id:n.song.docID}},class:"font-bold block text-gray-600 composition-name"},{default:(0,s.w5)((()=>[(0,s.Uk)((0,u.zw)(n.song.modified_name),1)])),_:1},8,["to"])]),(0,s._)("div",p,[(0,s.Wm)(l,{custom:"",to:{name:"song",params:{id:n.song.docID},hash:"#comments"}},{default:(0,s.w5)((({navigate:e})=>[(0,s._)("span",{class:"comments",onClick:e},[w,(0,s.Uk)(" "+(0,u.zw)(n.song.comment_count),1)],8,f)])),_:1},8,["to"])])],8,h)}var v={name:"SongItem",props:{song:{type:Object,required:!0}}},x=n(89);const y=(0,x.Z)(v,[["render",b]]);var _=y,k={beforeMount(e,t){let n=`fa fa-${t.value.icon} text-green-400 text-xl`;t.value.right&&(n+=" float-right"),e.innerHTML+=`<i class="${n}"></i>`}},S={name:"Home",components:{AppSongItem:_},directives:{IconSecondary:k},data(){return{songs:[],maxPerPage:3,pendingRequest:!1}},async created(){await this.getSongs(),window.addEventListener("scroll",this.handleScroll)},beforeUnmount(){window.removeEventListener("scroll",this.handleScroll)},methods:{handleScroll(){const{scrollTop:e,offsetHeight:t}=document.documentElement,{innerHeight:n}=window,s=Math.round(e)+n===t;s&&this.getSongs()},async getSongs(){let e;if(!0!==this.pendingRequest){if(this.pendingRequest=!0,this.songs.length){const t=await m.GX.doc(this.songs[this.songs.length-1].docID).get();e=await m.GX.orderBy("modified_name").startAfter(t).limit(this.maxPerPage).get()}else e=await m.GX.orderBy("modified_name").limit(this.maxPerPage).get();e.forEach((e=>{this.songs.push({docID:e.id,...e.data()})})),this.pendingRequest=!1}}}};const D=(0,x.Z)(S,[["render",g]]);var I=D}}]);
//# sourceMappingURL=743.87f14256.js.map