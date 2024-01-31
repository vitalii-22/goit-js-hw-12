import{a as c,S as p,i as u}from"./assets/vendor-726d25c3.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m=document.querySelector(".feedback-form"),f=document.querySelector(".gallery"),l=document.querySelector(".wrap-loader");c.defaults.baseURL="https://pixabay.com/";const h="api/";let g=new p(".gallery a",{captionsData:"alt",captionDelay:250});m.addEventListener("submit",L);async function y(i){return(await c.get(`${h}`,{params:{key:"42046594-dc9dc59be7e95573d854c379a",q:`${i}`,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:9}})).data}async function L(i){i.preventDefault();const r=i.currentTarget;let o=r.elements.search.value.trim();l.classList.remove("hiden");try{const{hits:s}=await y(o);s.length===0&&u.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",messageSize:"16px",backgroundColor:"#EF4040",position:"topRight"}),n(s),f.innerHTML=n(s),g.refresh()}catch(s){console.log(s)}finally{l.classList.add("hiden"),r.reset}}function n(i){return i.map(({webformatURL:r,largeImageURL:o,tags:s,likes:e,views:t,comments:a,downloads:d})=>`<li class="gallery-item">
           <a class="gallery-link" href="${o}">
          <img
            class="gallery-image"
            src="${r}"
            alt="${s}"
          />

            <ul class = "description-list">

              <li class = "description-item">
               <h3 class = "description-title">Likes</h3>
               <p class = "description-text">${e}</p>
              </li>

              <li class = "description-item">
               <h3 class = "description-title">Views</h3>
               <p class = "description-text">${t}</p>
              </li>
          
              <li class = "description-item">
               <h3 class = "description-title">Comments</h3>
               <p class = "description-text">${a}</p>
              </li>

              <li class = "description-item">
               <h3 class = "description-title">Downloads</h3>
               <p class = "description-text">${d}</p>
               </li>
          
             </ul>
           </a>

      </li>
      `).join("")}
//# sourceMappingURL=commonHelpers.js.map
