function initStrictAdBlockDetector(){let t=window.location.pathname.split("/").pop()||"index.html",e=Object.assign({},ADBLOCK_CONFIG_V2,PAGE_CONFIGS[t]||{});window.adBlockDetector=new AdBlockDetectorV2(e)}window.ADBLOCK_CONFIG_V2={totalBlock:!0,showPopup:!0,preventClose:!0,debugMode:!1,threshold:3,title:"AdBlock Deve Essere Disattivato ⚠️",subtitle:"Accesso Richiesto per Associazione Santa Barbara APS",description:`
        <strong style="color: #E10600;">ATTENZIONE:</strong> Per accedere al sito dell'Associazione Santa Barbara APS \xe8 <strong>obbligatorio disattivare AdBlock</strong>.
        <br><br>
        <div style="background: #FEF2F2; border-left: 4px solid #E10600; padding: 12px; margin: 16px 0; border-radius: 4px;">
            La pubblicit\xe0 ci permette di:
            <br>• 🎭 <strong>Finanziare il Corteo Storico</strong> di Santa Barbara
            <br>• 🤝 <strong>Sostenere i progetti sociali</strong> per la comunit\xe0  
            <br>• 📚 <strong>Mantenere attivo</strong> questo sito web gratuito
            <br>• 🏛️ <strong>Promuovere la cultura locale</strong> di Grumo Appula
        </div>
        <strong style="color: #B91C1C;">Il sito rimarr\xe0 completamente bloccato fino alla disattivazione di AdBlock.</strong>
    `,instructions:"\uD83D\uDD27 Istruzioni Obbligatorie per Continuare:",buttonText:"\uD83D\uDD04 Ho Disattivato AdBlock - Sblocca Sito",styles:{overlayColor:"rgba(225, 6, 0, 0.95)",popupBackground:"#ffffff",primaryColor:"#E10600",textColor:"#333333",maxWidth:"900px",maxHeight:"85vh"},contentSelectors:["main",".content",".container","article","section","nav","header","footer",".hero",".gallery",".events",".about",".contacts","body > *:not(.adblock-popup-overlay):not(script):not(style)"]},window.PAGE_CONFIGS={"index.html":{title:"\uD83C\uDFE0 AdBlock Blocca l'Accesso alla Home",subtitle:"Benvenuto in Associazione Santa Barbara - Disattiva AdBlock"},"galleria.html":{title:"\uD83C\uDFAD AdBlock Blocca la Galleria del Corteo",subtitle:"Foto e Video del Corteo Storico - Disattiva AdBlock",description:`
            <strong style="color: #E10600;">La Galleria \xe8 Protetta!</strong>
            <br><br>
            Per visualizzare le <strong>foto e video del Corteo Storico di Santa Barbara</strong>, 
            devi disattivare AdBlock. I nostri contenuti multimediali sono protetti per:
            <br>• 📸 Preservare la qualit\xe0 delle immagini storiche
            <br>• 🎬 Garantire la riproduzione video senza interruzioni  
            <br>• 💰 Finanziare la conservazione del patrimonio culturale
            <br><br>
            <strong>Disattiva AdBlock per accedere alla galleria completa.</strong>
        `},"eventi.html":{title:"\uD83D\uDCC5 AdBlock Blocca gli Eventi",subtitle:"Calendario Eventi Associazione - Disattiva AdBlock"},"area-soci.html":{title:"\uD83D\uDC65 AdBlock Blocca l'Area Soci",subtitle:"Area Riservata Soci - Disattiva AdBlock",description:`
            <strong style="color: #E10600;">Area Soci Protetta!</strong>
            <br><br>
            L'<strong>Area Soci</strong> dell'Associazione Santa Barbara richiede 
            la disattivazione di AdBlock per accedere a:
            <br>• 📋 Documentazione riservata ai soci
            <br>• 📊 Verbali e comunicazioni ufficiali
            <br>• 🎟️ Prenotazioni eventi esclusivi
            <br>• 💳 Servizi dedicati ai membri
            <br><br>
            <strong>Disattiva AdBlock per accedere all'area riservata.</strong>
        `}},window.testAdBlockDetection=function(){if(!ADBLOCK_CONFIG_V2.debugMode){return}let t=Object.assign({},ADBLOCK_CONFIG_V2,{debugMode:!0,threshold:1});return new AdBlockDetectorV2(t)},window.bypassAdBlockDetection=function(t){if("santabarbara2025"!==t||!ADBLOCK_CONFIG_V2.debugMode)return!1;let e=document.querySelector(".adblock-popup-overlay");return e&&e.remove(),ADBLOCK_CONFIG_V2.contentSelectors.forEach(t=>{document.querySelectorAll(t).forEach(t=>{t.style.display="",t.style.visibility=""})}),!0},document.addEventListener("DOMContentLoaded",initStrictAdBlockDetector),("complete"===document.readyState||"interactive"===document.readyState)&&initStrictAdBlockDetector(),"undefined"!=typeof module&&module.exports&&(module.exports={ADBLOCK_CONFIG_V2,PAGE_CONFIGS,initStrictAdBlockDetector,testAdBlockDetection,bypassAdBlockDetection});