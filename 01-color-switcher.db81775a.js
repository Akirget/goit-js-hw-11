const t=document.querySelector("body"),e=document.querySelector("[data-start]"),r=document.querySelector("[data-stop]");let d=null;e.addEventListener("click",(function(){e.setAttribute("disabled",!0),r.removeAttribute("disabled"),d=setInterval((()=>{t.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),r.addEventListener("click",(function(){r.setAttribute("disabled",!0),e.removeAttribute("disabled"),clearInterval(d)}));
//# sourceMappingURL=01-color-switcher.db81775a.js.map
