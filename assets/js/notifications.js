function createNotificationSystem(){let e=document.createElement("div");return e.id="notification-container",e.style.cssText=`
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        pointer-events: none;
    `,document.body.appendChild(e),{show:function(t,n="info",o=5e3){let i=document.createElement("div");i.style.cssText=`
                margin-bottom: 10px;
                padding: 12px 16px;
                border-radius: 8px;
                color: white;
                font-size: 14px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                pointer-events: auto;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            `;let r={success:"#28a745",danger:"#dc3545",error:"#dc3545",warning:"#ffc107",info:"#17a2b8"};i.style.backgroundColor=r[n]||r.info;let s={success:"✓",danger:"✗",error:"✗",warning:"⚠",info:"ℹ"},a=s[n]||s.info;return i.innerHTML=`
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span><strong>${a}</strong> ${t}</span>
                    <span style="margin-left: 12px; opacity: 0.7; font-size: 16px; cursor: pointer;">\xd7</span>
                </div>
            `,e.appendChild(i),i.addEventListener("click",function(){i.parentNode&&(i.style.opacity="0",i.style.transform="translateX(100%)",setTimeout(()=>{i.parentNode&&i.remove()},300))}),setTimeout(()=>{i.style.opacity="1",i.style.transform="translateX(0)"},10),o>0&&setTimeout(()=>{i.parentNode&&(i.style.opacity="0",i.style.transform="translateX(100%)",setTimeout(()=>{i.parentNode&&i.remove()},300))},o),i},success:function(e,t=4e3){return this.show(e,"success",t)},error:function(e,t=7e3){return this.show(e,"error",t)},warning:function(e,t=5e3){return this.show(e,"warning",t)},info:function(e,t=4e3){return this.show(e,"info",t)}}}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",function(){window.notify=createNotificationSystem()}):window.notify=createNotificationSystem();