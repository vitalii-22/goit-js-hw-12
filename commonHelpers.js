import{S,i as u,a as x}from"./assets/vendor-726d25c3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const F=document.querySelector(".feedback-form"),m=document.querySelector(".gallery"),p=document.querySelector(".wrap-loader"),a=document.querySelector(".button-load-more"),h=document.querySelector(".wrap-loader-more"),d=document.querySelector(".form-button");let n="",f=0,c=1,g=new S(".gallery a",{captionsData:"alt",captionDelay:250});F.addEventListener("submit",k);async function y(i,t=1){return(await x.get("https://pixabay.com/api/",{params:{key:"42046594-dc9dc59be7e95573d854c379a",q:`${i}`,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15}})).data}async function k(i){i.preventDefault(),m.innerHTML="",c=1,d.disabled=!0;const t=i.currentTarget;if(n=t.elements.search.value.trim(),n==="")return d.disabled=!1,u.show({message:"Please add value!",messageColor:"#FAFAFB",messageSize:"16px",backgroundColor:"#EF4040",position:"topRight"});try{const{hits:o,totalHits:r}=await y(n);p.classList.remove("is-hidden"),f=Math.ceil(r/15),o.length===0?u.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",messageSize:"16px",backgroundColor:"#EF4040",position:"topRight"}):(b(o),g.refresh(),a.classList.remove("is-hidden"),a.addEventListener("click",L))}catch(o){console.log(o)}finally{p.classList.add("is-hidden"),t.reset,d.disabled=!1}}async function L(i){c+=1,h.classList.remove("is-hidden"),a.classList.add("is-hidden");try{const{hits:t}=await y(n,c);b(t),g.refresh();const{height:o}=m.firstElementChild.getBoundingClientRect();window.scrollBy(0,o*2)}catch(t){console.log(t)}finally{h.classList.add("is-hidden"),a.classList.remove("is-hidden"),f===c&&(u.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"#FAFAFB",messageSize:"16px",backgroundColor:"#4a55eb",position:"topRight"}),a.classList.add("is-hidden"),a.removeEventListener("click",L))}}function b(i){const t=i.map(({webformatURL:o,largeImageURL:r,tags:e,likes:s,views:l,comments:v,downloads:w})=>`<li class="gallery-item">
           <a class="gallery-link" href="${r}">
          <img
            class="gallery-image"
            src="${o}"
            alt="${e}"
          />

            <ul class = "description-list">

              <li class = "description-item">
               <h3 class = "description-title">Likes</h3>
               <p class = "description-text">${s}</p>
              </li>

              <li class = "description-item">
               <h3 class = "description-title">Views</h3>
               <p class = "description-text">${l}</p>
              </li>
          
              <li class = "description-item">
               <h3 class = "description-title">Comments</h3>
               <p class = "description-text">${v}</p>
              </li>

              <li class = "description-item">
               <h3 class = "description-title">Downloads</h3>
               <p class = "description-text">${w}</p>
               </li>
          
             </ul>
           </a>

      </li>
      `).join("");m.insertAdjacentHTML("beforeend",t)}
//# sourceMappingURL=commonHelpers.js.map
