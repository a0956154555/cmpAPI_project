import{d as I,u as R,g as j,r as m,o as r,c as p,b as s,G as u,H as v,t as d,q as w,w as h,p as B,A as g,I as $,C as L,D as P,_ as S}from"./index-9a8c914e.js";const x=i=>(L("data-v-3f4f01f4"),i=i(),P(),i),M={class:"chooseTypeAll"},b=["onClick"],T={class:"cards"},H=["onClick"],D={class:"card__info-hover"},V={class:"card__like",viewBox:"0 0 24 24"},q=["fill"],E=x(()=>s("div",{class:"card__clock-info"},[s("svg",{class:"card__clock",viewBox:"0 0 24 24"},[s("path",{d:"M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z"})]),s("span",{class:"card__time"},"15 min")],-1)),F={href:"#",class:"card_link"},z=["onClick"],N={class:"card__category"},O={class:"card__title"},Q={class:"card__by"},Z={href:"#",class:"card__author",title:"author"},G=I({__name:"shopping",setup(i){const a=R(),y=j(()=>{const c=new Set;_.value.forEach(e=>{c.add(e.type)});const t=Array.from(c);return t.unshift("所有種類"),t}),f=c=>{c=="高到低"?n.value.sort((t,e)=>e.price-t.price):c=="低到高"&&n.value.sort((t,e)=>t.price-e.price)},n=m([]),C=c=>{if(n.value=[],c=="所有種類"){n.value=_.value;return}_.value.forEach(t=>{t.type==c&&(n.value.push(t),console.log(n.value))})},k=(c,t,e,l)=>{for(let o=0;o<a.fav_list.length;o++)if(a.fav_list[o].name==t){a.fav_list.splice(o,1);return}a.fav_list.push({name:t,type:c,point:e,src:l}),console.log(a.fav_list)},A=(c,t,e)=>{if(a.person.point<t){alert("點數不足");return}if(confirm(`是否購買${c}? `)){a.person.point-=t;const l={src:e,name:c,date:`${new Date().getMonth()+1}/${new Date().getDate()}`,price:t};a.allBuyList.push(l),console.log(a.allBuyList)}};let _=m([{name:"圓嘟嘟藍藍豚鑰匙圈",type:"飾品",picRoute:"/cmpAPI_project/all_images/6526c327c3284.png",price:10},{name:"湛藍海豚抱枕",type:"抱枕",picRoute:"/cmpAPI_project/all_images/6526c1ff572ac.jpg",price:25},{name:"微笑鯊魚娃娃",type:"娃娃",picRoute:"/cmpAPI_project/all_images/6526c4dba72fe.jpg",price:50},{name:"粉紅海豹抱枕",type:"抱枕",picRoute:"/cmpAPI_project/all_images/6526c6aa3718a.png",price:120},{name:"黑鯊抱枕",type:"抱枕",picRoute:"/cmpAPI_project/all_images/6526c27c7cb13.jpg",price:333},{name:"艾利鯊鯊枕",type:"抱枕",picRoute:"/cmpAPI_project/all_images/6526ce01edd19.png",price:450},{name:"QQ長長橘橘",type:"娃娃",picRoute:"/cmpAPI_project/all_images/6526ce347f0fa.png",price:20},{name:"水水藍藍",type:"娃娃",picRoute:"/cmpAPI_project/all_images/6526ce742341b.jpg",price:111}]);return n.value=_.value,(c,t)=>(r(),p(u,null,[s("div",M,[(r(!0),p(u,null,v(y.value,(e,l)=>(r(),p("div",{key:l,class:"singleType",onClick:o=>C(e)},d(e),9,b))),128)),s("div",{class:"priceBtn",onClick:t[0]||(t[0]=e=>f("高到低"))},"價錢高->低"),s("div",{class:"priceBtn",onClick:t[1]||(t[1]=e=>f("低到高"))},"價錢低->高")]),s("section",T,[(r(!0),p(u,null,v(n.value,(e,l)=>(r(),p("article",{class:w(["card","card--"+(l+1)]),key:e.name,ref_for:!0,ref:"card",onClick:h(o=>k(e.type,e.name,e.price,e.picRoute),["prevent","stop"])},[s("div",D,[(r(),p("svg",V,[s("path",{fill:B(a).fav_list.findIndex(o=>o.name==e.name)>-1?"#FF0000":"#000000",d:"M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"},null,8,q)])),E]),s("div",{class:"card__img",style:g({backgroundImage:`url(${e.picRoute})`})},null,4),s("a",F,[s("div",{class:"card__img--hover",style:g({backgroundImage:`url(${e.picRoute})`})},null,4)]),s("div",{class:"card__info",onClick:h(o=>A(e.name,e.price,e.picRoute),["stop"])},[s("span",N,d(e.type),1),s("h3",O,d(e.name),1),s("span",Q,[$("點數 "),s("a",Z,d(e.price)+"點",1)])],8,z)],10,H))),128))])],64))}});const J=S(G,[["__scopeId","data-v-3f4f01f4"]]);export{J as default};
