import{S as w,i as u,a as x}from"./assets/vendor-726d25c3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const q=document.querySelector(".feedback-form"),f=document.querySelector(".gallery"),m=document.querySelector(".wrap-loader"),a=document.querySelector(".button-load-more"),p=document.querySelector(".wrap-loader-more"),h=document.querySelector(".form-button");let c="",d=0,n=1,g=new w(".gallery a",{captionsData:"alt",captionDelay:250});q.addEventListener("submit",F);async function y(o,t=1){return(await x.get("https://pixabay.com/api/",{params:{key:"42046594-dc9dc59be7e95573d854c379a",q:`${o}`,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15}})).data}async function F(o){o.preventDefault(),f.innerHTML="",n=1,h.disabled=!0,m.classList.remove("is-hidden");const t=o.currentTarget;if(c=t.elements.search.value.trim(),c==="")return u.show({message:"Please add value!",messageColor:"#FAFAFB",messageSize:"16px",backgroundColor:"#EF4040",position:"topRight"});try{const{hits:i,totalHits:r}=await y(c);d=Math.ceil(r/15),console.log(d),i.length===0?u.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",messageSize:"16px",backgroundColor:"#EF4040",position:"topRight"}):(d===n&&(b(i),g.refresh()),a.classList.remove("is-hidden"),a.addEventListener("click",L))}catch(i){console.log(i)}finally{m.classList.add("is-hidden"),t.reset,h.disabled=!1}}async function L(o){n+=1,p.classList.remove("is-hidden"),a.classList.add("is-hidden");try{const{hits:t}=await y(c,n);b(t),g.refresh()}catch(t){console.log(t)}finally{p.classList.add("is-hidden"),a.classList.remove("is-hidden"),d===n&&(a.classList.add("is-hidden"),a.removeEventListener("click",L))}}function b(o){const t=o.map(({webformatURL:i,largeImageURL:r,tags:e,likes:s,views:l,comments:v,downloads:S})=>`<li class="gallery-item">
           <a class="gallery-link" href="${r}">
          <img
            class="gallery-image"
            src="${i}"
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
               <p class = "description-text">${S}</p>
               </li>
          
             </ul>
           </a>

      </li>
      `).join("");f.insertAdjacentHTML("beforeend",t)}
//# sourceMappingURL=commonHelpers.js.map
