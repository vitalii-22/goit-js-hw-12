import{S as h,i as n,a as g}from"./assets/vendor-726d25c3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const y=document.querySelector(".feedback-form"),b=document.querySelector(".gallery"),c=document.querySelector(".wrap-loader"),d=document.querySelector(".button-load-more");let l="",L=new h(".gallery a",{captionsData:"alt",captionDelay:250});y.addEventListener("submit",S);async function p(r,t=1){return(await g.get("https://pixabay.com/api/",{params:{key:"42046594-dc9dc59be7e95573d854c379a",q:`${r}`,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15}})).data}async function S(r){r.preventDefault();const t=r.currentTarget;if(l=t.elements.search.value.trim(),l==="")return n.show({message:"Please add value!",messageColor:"#FAFAFB",messageSize:"16px",backgroundColor:"#EF4040",position:"topRight"});try{const{hits:s}=await p(l);console.log(s),c.classList.remove("is-hidden"),s.length===0&&n.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",messageSize:"16px",backgroundColor:"#EF4040",position:"topRight"}),x(s,b),L.refresh(),d.classList.remove("is-hidden"),d.addEventListener("click",w)}catch(s){console.log(s)}finally{c.classList.add("is-hidden"),t.reset}}async function w(r,t,s){s+=1;try{const{hits:i}=await p(t,s);console.log(t)}catch(i){console.log(i)}}function x(r,t){const s=r.map(({webformatURL:i,largeImageURL:e,tags:o,likes:a,views:u,comments:m,downloads:f})=>`<li class="gallery-item">
           <a class="gallery-link" href="${e}">
          <img
            class="gallery-image"
            src="${i}"
            alt="${o}"
          />

            <ul class = "description-list">

              <li class = "description-item">
               <h3 class = "description-title">Likes</h3>
               <p class = "description-text">${a}</p>
              </li>

              <li class = "description-item">
               <h3 class = "description-title">Views</h3>
               <p class = "description-text">${u}</p>
              </li>
          
              <li class = "description-item">
               <h3 class = "description-title">Comments</h3>
               <p class = "description-text">${m}</p>
              </li>

              <li class = "description-item">
               <h3 class = "description-title">Downloads</h3>
               <p class = "description-text">${f}</p>
               </li>
          
             </ul>
           </a>

      </li>
      `).join("");t.insertAdjacentElement("beforeend",s)}
//# sourceMappingURL=commonHelpers.js.map
