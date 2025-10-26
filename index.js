import{a as h,S as v,i as l}from"./assets/vendor-GN5hr8qZ.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(e){if(e.ep)return;e.ep=!0;const a=n(e);fetch(e.href,a)}})();const b="https://pixabay.com/api/",L="29734791-3fd561d0afce25ff9315d455c",w=h.create({baseURL:b,timeout:1e4,params:{key:L,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15}});async function S(r,t=1,n=15){const{data:i}=await w.get("",{params:{q:r.trim(),page:t,per_page:n}});return i}function q(r){return r.map(({webformatURL:t,largeImageURL:n,tags:i,likes:e,views:a,comments:s,downloads:y})=>`
        <li class="gallery-item">
          <a href="${n}">
            <div class="img-wrapper">
              <img class="card-image" src="${t}" alt="${i}" />
            </div>
            <div class="card-bottom">
              <div class="info">
                <p>Likes</p>
                <span>${e}</span>
              </div>
              <div class="info">
                <p>Views</p>
                <span>${a}</span>
              </div>
              <div class="info">
                <p>Comments</p>
                <span>${s}</span>
              </div>
              <div class="info">
                <p>Downloads</p>
                <span>${y}</span>
              </div>
            </div>
          </a>
        </li>
        `).join("")}const o={form:document.querySelector(".form"),input:document.querySelector(".search-input"),submitBtn:document.querySelector(".search-button"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader-wrapper"),loadMoreBtn:document.querySelector(".load-more-button")};let P=new v(".gallery a",{captions:!0,captionsData:"alt",captionDelay:200}),c="",d=1;const B=15;let u=0,p=0;function A(){o.loader.classList.remove("visually-hidden")}function M(){o.loader.classList.add("visually-hidden")}function m(r){o.input.disabled=r,o.submitBtn.disabled=r,o.loadMoreBtn.disabled=r}function E(){o.loadMoreBtn.classList.remove("visually-hidden")}function f(){o.loadMoreBtn.classList.add("visually-hidden")}function R(){o.gallery.innerHTML=""}function $(r){const t=q(r);o.gallery.insertAdjacentHTML("beforeend",t),P.refresh()}function O(){const r=o.gallery.querySelector(".gallery-item");if(!r)return;const{height:t}=r.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}async function g(r,t=!1){if(t||(c=r.trim(),d=1,u=0,p=0,R(),f()),!c){l.warning({message:"Please enter a search query!",position:"topRight"});return}try{m(!0),A();const n=await S(c,d,B),{hits:i=[],totalHits:e=0}=n;if(t||(u=e),i.length===0){l.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),f();return}$(i),p+=i.length,p<u?E():(f(),t&&l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),d+=1,t&&O()}catch(n){console.error(n),l.error({message:"Something went wrong. Please try again later",position:"topRight"})}finally{M(),m(!1)}}o.form.addEventListener("submit",r=>{r.preventDefault();const t=o.input.value;g(t,!1),o.input.value=""});o.loadMoreBtn.addEventListener("click",()=>{g(c,!0)});
//# sourceMappingURL=index.js.map
