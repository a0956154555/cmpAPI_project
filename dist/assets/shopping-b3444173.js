import{d,u,r as g,o as n,c as l,F as v,l as m,e as h,n as C,b as e,t as _,m as f,q as b,p as k,h as L,_ as R}from"./index-463f7f08.js";const y=c=>(k("data-v-40ea336a"),c=c(),L(),c),B={class:"cards"},x=["onClick"],M=b('<div class="card__info-hover" data-v-40ea336a><svg class="card__like" viewBox="0 0 24 24" data-v-40ea336a><path fill="#000000" d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" data-v-40ea336a></path></svg><div class="card__clock-info" data-v-40ea336a><svg class="card__clock" viewBox="0 0 24 24" data-v-40ea336a><path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" data-v-40ea336a></path></svg><span class="card__time" data-v-40ea336a>15 min</span></div></div><div class="card__img" data-v-40ea336a></div><a href="#" class="card_link" data-v-40ea336a><div class="card__img--hover" data-v-40ea336a></div></a>',3),S={class:"card__info"},w=y(()=>e("span",{class:"card__category"},"飾品",-1)),A={class:"card__title"},V={class:"card__by"},H={href:"#",class:"card__author",title:"author"},j=d({__name:"shopping",setup(c){const s=u(),p=(o,t,a)=>{if(s.person.point<t){alert("點數不足");return}if(confirm(`是否購買${o}? `)){s.person.point-=t;const i={src:a,name:o,date:`${new Date().getMonth()+1}/${new Date().getDate()}`,price:t};s.allBuyList.push(i),console.log(s.allBuyList)}};let r=g([{name:"圓嘟嘟藍藍豚鑰匙圈",picRoute:"../../public/all_images/6526c327c3284.png",price:10},{name:"湛藍海豚抱枕",picRoute:"../../public/all_images/6526c1ff572ac.jpg",price:25},{name:"微笑鯊魚娃娃",picRoute:"../../public/all_images/6526c4dba72fe.jpg",price:50},{name:"粉紅海豹抱枕",picRoute:"../../public/all_images/6526c6aa3718a.png",price:120},{name:"黑鯊抱枕",picRoute:"../../public/all_images/6526c27c7cb13.jpg",price:333},{name:"艾利鯊鯊枕",picRoute:"../../public/all_images/6526ce01edd19.png",price:450},{name:"QQ長長橘橘",picRoute:"../../public/all_images/6526ce347f0fa.png",price:20},{name:"水水藍藍",picRoute:"../../public/all_images/6526ce742341b.jpg",price:111}]);return(o,t)=>(n(),l("section",B,[(n(!0),l(v,null,m(h(r),(a,i)=>(n(),l("article",{class:C(["card","card--"+(i+1)]),onClick:D=>p(a.name,a.price,a.picRoute)},[M,e("div",S,[w,e("h3",A,_(a.name),1),e("span",V,[f("點數 "),e("a",H,_(a.price)+"點",1)])])],10,x))),256))]))}});const $=R(j,[["__scopeId","data-v-40ea336a"]]);export{$ as default};
