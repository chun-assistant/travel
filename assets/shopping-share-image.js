/* 購物清單分享：主畫面只顯示一個「分享我的購物清單」，再選圖文或純文字。 */
(function(){
  var KEY='aurora-shopping-list-v1';
  var currentShareFile=null,currentShareUrl='';

  function normalizeCountry(value){
    return String(value||'其他').replace(/^[^A-Za-z\u3400-\u9fff]+/,'').trim()||'其他';
  }
  function readItems(){
    try{var rows=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(rows)?rows:[];}catch(e){return [];}
  }
  function setStatus(message){
    var el=document.getElementById('shoppingBackupStatus');if(el)el.textContent=message||'';
  }
  function countryTitle(country){
    var c=normalizeCountry(country);
    if(c==='維也納'||c==='奧地利')return '維也納 Austria';
    if(c==='芬蘭')return '芬蘭 Finland';
    if(c==='挪威')return '挪威 Norway';
    if(c==='荷蘭'||c==='阿姆斯特丹')return '荷蘭 Netherlands';
    return c;
  }
  function countryTextTitle(country){
    var c=normalizeCountry(country);
    if(c==='奧地利')return '維也納';
    if(c==='阿姆斯特丹')return '荷蘭';
    return c;
  }
  function countryTint(country){
    var c=normalizeCountry(country);
    if(c==='維也納'||c==='奧地利')return '#fff1ed';
    if(c==='芬蘭')return '#eef7ff';
    if(c==='挪威')return '#eef8f4';
    if(c==='荷蘭'||c==='阿姆斯特丹')return '#fff6e8';
    return '#f4f3ef';
  }
  function allProducts(){
    var data=window.AURORA_SHOPPING_DATA||{},rows=[];
    (data.supermarkets||[]).forEach(function(section){
      (section.groups||[]).forEach(function(group){
        (group.products||[]).forEach(function(product){rows.push({product:product,country:normalizeCountry(section.city)});});
      });
    });
    (data.souvenirs||[]).forEach(function(product){rows.push({product:product,country:normalizeCountry(product.country)});});
    return rows;
  }
  function productFor(item,products){
    var name=String(item.name||'').trim(),country=normalizeCountry(item.country),exact=null,fallback=null;
    for(var i=0;i<products.length;i++){
      var row=products[i],p=row.product||{};
      if(String(p.item||'').trim()!==name)continue;
      if(!fallback)fallback=p;
      if(row.country===country){exact=p;break;}
    }
    return exact||fallback||null;
  }
  function imageUrlFor(item,products){
    var p=productFor(item,products);return p&&(p.image||p.imageFull)||'';
  }
  function roundedRect(ctx,x,y,w,h,r){
    r=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();
  }
  function wrapLines(ctx,text,maxWidth,maxLines){
    var chars=Array.from(String(text||'')),lines=[],line='';
    for(var i=0;i<chars.length;i++){
      var test=line+chars[i];
      if(line&&ctx.measureText(test).width>maxWidth){lines.push(line);line=chars[i];if(lines.length===maxLines)break;}else line=test;
    }
    if(lines.length<maxLines&&line)lines.push(line);
    if(lines.length===maxLines){
      var consumed=lines.join('').length;
      if(consumed<chars.length){
        var last=lines[maxLines-1];
        while(last&&ctx.measureText(last+'…').width>maxWidth)last=last.slice(0,-1);
        lines[maxLines-1]=last+'…';
      }
    }
    return lines;
  }
  function drawContain(ctx,img,x,y,w,h){
    var scale=Math.min(w/img.naturalWidth,h/img.naturalHeight),dw=img.naturalWidth*scale,dh=img.naturalHeight*scale;
    ctx.drawImage(img,x+(w-dw)/2,y+(h-dh)/2,dw,dh);
  }
  function loadImage(url){
    if(!url)return Promise.resolve(null);
    var absolute;
    try{absolute=new URL(url,location.href).href;}catch(e){return Promise.resolve(null);}
    var sameOrigin=false;try{sameOrigin=new URL(absolute).origin===location.origin;}catch(e){}
    var controller='AbortController' in window?new AbortController():null;
    var timer=setTimeout(function(){if(controller)controller.abort();},sameOrigin?2600:1400);
    return fetch(absolute,{mode:'cors',credentials:'omit',cache:'force-cache',signal:controller&&controller.signal}).then(function(response){
      if(!response.ok)throw new Error('image fetch failed');return response.blob();
    }).then(function(blob){
      return new Promise(function(resolve){
        var objectUrl=URL.createObjectURL(blob),img=new Image();
        img.onload=function(){URL.revokeObjectURL(objectUrl);resolve(img);};
        img.onerror=function(){URL.revokeObjectURL(objectUrl);resolve(null);};
        img.decoding='async';img.src=objectUrl;
      });
    }).catch(function(){
      if(!sameOrigin)return null;
      return new Promise(function(resolve){
        var img=new Image();img.onload=function(){resolve(img);};img.onerror=function(){resolve(null);};img.decoding='async';img.src=absolute;
      });
    }).finally(function(){clearTimeout(timer);});
  }
  function canvasBlob(canvas){
    return new Promise(function(resolve,reject){canvas.toBlob(function(blob){if(blob)resolve(blob);else reject(new Error('image export failed'));},'image/jpeg',0.9);});
  }
  function filename(){
    var d=new Date(),pad=function(n){return String(n).padStart(2,'0');};
    return '極光旅行購物清單_'+d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'_'+pad(d.getHours())+pad(d.getMinutes())+'.jpg';
  }
  function ensureCommonStyle(){
    if(document.getElementById('shoppingShareUiStyle'))return;
    var style=document.createElement('style');style.id='shoppingShareUiStyle';style.textContent=[
      '#shoppingSharePreview,#shoppingShareChoice{position:fixed;inset:0;z-index:220;background:rgba(8,24,33,.72);display:grid;place-items:center;padding:calc(14px + env(safe-area-inset-top,0px)) 14px calc(14px + env(safe-area-inset-bottom,0px))}',
      '#shoppingSharePreview[hidden],#shoppingShareChoice[hidden]{display:none}',
      '#shoppingSharePreview .share-preview-card,#shoppingShareChoice .share-choice-card{width:min(94vw,620px);box-sizing:border-box;background:#fffdf8;border-radius:22px;padding:16px;box-shadow:0 18px 50px rgba(0,0,0,.24)}',
      '#shoppingSharePreview .share-preview-card{max-height:94dvh;display:grid;gap:10px}',
      '#shoppingSharePreview img{display:block;max-width:100%;max-height:74dvh;justify-self:center;object-fit:contain;border-radius:12px;border:1px solid #dce7e6;background:#f7faf9}',
      '#shoppingSharePreview .share-preview-actions{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap}',
      '#shoppingSharePreview .share-preview-actions button,#shoppingShareChoice button{font:inherit;cursor:pointer}',
      '#shoppingSharePreview .share-preview-actions button{border:0;border-radius:999px;min-height:42px;padding:8px 15px;font-weight:800}',
      '#shoppingSharePreview .share-preview-close{background:#f4f2ed;color:#174a69;border:1px solid #d8e1df!important}',
      '#shoppingSharePreview .share-preview-send{background:#174a69;color:#fff}',
      '#shoppingShareChoice .share-choice-title{margin:0;color:#174a69;font-size:21px;font-weight:850}',
      '#shoppingShareChoice .share-choice-sub{margin:5px 0 14px;color:#71838b;font-size:13px}',
      '#shoppingShareChoice .share-choice-options{display:grid;gap:10px}',
      '#shoppingShareChoice .share-choice-option{width:100%;display:grid;grid-template-columns:44px minmax(0,1fr);gap:11px;align-items:center;text-align:left;border:1px solid #d8e3e1;border-radius:17px;background:#fff;padding:13px}',
      '#shoppingShareChoice .share-choice-option:active{background:#f4f8f7}',
      '#shoppingShareChoice .share-choice-icon{width:44px;height:44px;border-radius:13px;background:#eef7f6;display:grid;place-items:center;font-size:24px}',
      '#shoppingShareChoice .share-choice-copy{min-width:0}',
      '#shoppingShareChoice .share-choice-name{display:flex;align-items:center;gap:7px;color:#174a69;font-weight:850;font-size:16px}',
      '#shoppingShareChoice .share-choice-badge{display:inline-block;border-radius:999px;background:#dff4f5;color:#2a6685;padding:2px 7px;font-size:10px;font-weight:850}',
      '#shoppingShareChoice .share-choice-desc{display:block;margin-top:4px;color:#71838b;font-size:12px;line-height:1.45}',
      '#shoppingShareChoice .share-choice-cancel{width:100%;margin-top:12px;border:0;background:transparent;color:#5f7885;font-weight:800;min-height:40px}'
    ].join('');document.head.appendChild(style);
  }
  function ensurePreviewModal(){
    var modal=document.getElementById('shoppingSharePreview');if(modal)return modal;
    ensureCommonStyle();
    modal=document.createElement('div');modal.id='shoppingSharePreview';modal.hidden=true;
    modal.innerHTML='<div class="share-preview-card" role="dialog" aria-modal="true" aria-label="購物清單圖片預覽"><img alt="購物清單分享圖片預覽"><div class="share-preview-actions"><button class="share-preview-close" type="button">關閉</button><button class="share-preview-send" type="button">分享此圖片</button></div></div>';
    document.body.appendChild(modal);
    function close(){modal.hidden=true;document.body.style.overflow='';}
    modal.querySelector('.share-preview-close').addEventListener('click',close);
    modal.addEventListener('click',function(e){if(e.target===modal)close();});
    modal.querySelector('.share-preview-send').addEventListener('click',async function(){
      if(!currentShareFile)return;
      try{
        if(navigator.share&&navigator.canShare&&navigator.canShare({files:[currentShareFile]})){
          await navigator.share({title:'2026 極光旅行購物清單',files:[currentShareFile]});setStatus('已開啟系統分享選單。');close();return;
        }
      }catch(e){if(e&&e.name==='AbortError')return;}
      var a=document.createElement('a');a.href=currentShareUrl;a.download=currentShareFile.name;document.body.appendChild(a);a.click();a.remove();setStatus('此瀏覽器不支援圖片直接分享，已改為儲存圖片。');
    });
    return modal;
  }
  async function buildShareImage(){
    var items=readItems();if(!items.length)throw new Error('empty');
    var products=allProducts(),imageUrls=items.map(function(item){return imageUrlFor(item,products);}),unique=[],seen={};
    imageUrls.forEach(function(url){if(url&&!seen[url]&&unique.length<24){seen[url]=1;unique.push(url);}});
    var loaded=await Promise.all(unique.map(loadImage)),imageMap={};unique.forEach(function(url,i){imageMap[url]=loaded[i]||null;});
    var groups=[],map={};items.forEach(function(item){var country=normalizeCountry(item.country);if(!map[country]){map[country]={country:country,items:[]};groups.push(map[country]);}map[country].items.push(item);});
    var W=1080,margin=54,headerH=190,countryH=68,itemH=166,gap=18,footerH=86;
    var H=headerH+footerH+groups.length*(countryH+18)+items.length*(itemH+gap)+40;H=Math.min(12000,Math.max(900,H));
    var canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;var ctx=canvas.getContext('2d');if(!ctx)throw new Error('canvas');
    ctx.fillStyle='#f8f6f0';ctx.fillRect(0,0,W,H);
    roundedRect(ctx,26,24,W-52,140,30);ctx.fillStyle='#dff4f5';ctx.fill();
    ctx.fillStyle='#174a69';ctx.font='800 48px "PingFang TC","Noto Sans TC","Microsoft JhengHei",sans-serif';ctx.fillText('2026 極光旅行購物清單',margin,82);
    var pending=items.filter(function(x){return !x.done;}).length,bought=items.length-pending;
    ctx.font='650 25px "PingFang TC","Noto Sans TC","Microsoft JhengHei",sans-serif';ctx.fillStyle='#5f7885';ctx.fillText('待買 '+pending+' 項・已買 '+bought+' 項・共 '+items.length+' 項',margin,126);
    var y=headerH,failed=0;
    groups.forEach(function(group){
      roundedRect(ctx,margin,y,W-margin*2,countryH,22);ctx.fillStyle=countryTint(group.country);ctx.fill();ctx.fillStyle='#174a69';ctx.font='800 34px "PingFang TC","Noto Sans TC","Microsoft JhengHei",sans-serif';ctx.fillText(countryTitle(group.country),margin+24,y+44);y+=countryH+18;
      group.items.forEach(function(item){
        roundedRect(ctx,margin,y,W-margin*2,itemH,22);ctx.fillStyle=item.done?'#f2f3f1':'#fff';ctx.fill();ctx.strokeStyle='#d8e3e1';ctx.lineWidth=2;ctx.stroke();
        var imgX=margin+18,imgY=y+18,imgS=130,url=imageUrlFor(item,products),img=imageMap[url];
        roundedRect(ctx,imgX,imgY,imgS,imgS,18);ctx.fillStyle='#f5f7f4';ctx.fill();
        if(img){ctx.save();roundedRect(ctx,imgX,imgY,imgS,imgS,18);ctx.clip();drawContain(ctx,img,imgX+8,imgY+8,imgS-16,imgS-16);ctx.restore();}
        else{if(url)failed++;ctx.fillStyle='#8aa0a8';ctx.font='800 44px "PingFang TC",sans-serif';ctx.textAlign='center';ctx.fillText((String(item.name||'?').trim().charAt(0)||'?'),imgX+imgS/2,imgY+82);ctx.textAlign='left';}
        var textX=imgX+imgS+24,textW=W-margin-26-textX-118;
        ctx.fillStyle=item.done?'#6f8086':'#174a69';ctx.font='800 31px "PingFang TC","Noto Sans TC","Microsoft JhengHei",sans-serif';
        var nameLines=wrapLines(ctx,item.name||'未命名商品',textW,2);nameLines.forEach(function(line,index){ctx.fillText(line,textX,y+48+index*38);});
        ctx.fillStyle='#4e6c78';ctx.font='700 27px "PingFang TC","Noto Sans TC","Microsoft JhengHei",sans-serif';ctx.fillText('× '+(Number(item.qty)||1),W-margin-102,y+48);
        var meta=[item.city,item.forWho&&'給 '+item.forWho,item.budget&&'預算 '+item.budget,item.note].filter(Boolean).join('・');
        if(meta){ctx.fillStyle='#748990';ctx.font='600 22px "PingFang TC","Noto Sans TC","Microsoft JhengHei",sans-serif';var metaLines=wrapLines(ctx,meta,textW+90,1);ctx.fillText(metaLines[0]||'',textX,y+137);}
        roundedRect(ctx,W-margin-106,y+98,82,38,19);ctx.fillStyle=item.done?'#dce9e3':'#e7f2f7';ctx.fill();ctx.fillStyle=item.done?'#426b5b':'#2a6685';ctx.font='800 20px "PingFang TC","Noto Sans TC","Microsoft JhengHei",sans-serif';ctx.textAlign='center';ctx.fillText(item.done?'已買':'待買',W-margin-65,y+124);ctx.textAlign='left';
        y+=itemH+gap;
      });
    });
    ctx.fillStyle='#7a8d93';ctx.font='600 20px "PingFang TC","Noto Sans TC","Microsoft JhengHei",sans-serif';ctx.fillText('18天歐洲極光之旅・購物清單由手機本機產生，不會上傳網站',margin,H-40);
    return {blob:await canvasBlob(canvas),failed:failed};
  }
  async function prepareShareImage(button){
    var items=readItems();if(!items.length){setStatus('目前沒有購物項目，先加入商品後再分享。');return;}
    var original=button.textContent;button.disabled=true;button.textContent='正在產生圖文清單…';setStatus('正在整理圖文清單，請稍候…');
    try{
      var result=await buildShareImage();if(currentShareUrl)URL.revokeObjectURL(currentShareUrl);currentShareFile=new File([result.blob],filename(),{type:'image/jpeg'});currentShareUrl=URL.createObjectURL(result.blob);
      var modal=ensurePreviewModal(),img=modal.querySelector('img'),send=modal.querySelector('.share-preview-send');img.src=currentShareUrl;send.textContent=(navigator.canShare&&navigator.canShare({files:[currentShareFile]}))?'分享此圖片':'儲存圖片';modal.hidden=false;document.body.style.overflow='hidden';
      setStatus(result.failed?'圖文清單已完成；有 '+result.failed+' 張商品圖無法載入，已以文字卡代替。':'圖文清單已完成，可以預覽後分享。');
    }catch(e){setStatus(e&&e.message==='empty'?'目前沒有購物項目。':'圖文清單產生失敗，請改用「純文字清單」。');}
    finally{button.disabled=false;button.textContent=original;}
  }
  function buildCleanShareText(){
    var items=readItems();
    if(!items.length)return '🛍️ 2026 極光旅行購物清單\n\n目前沒有購物項目。';
    var pending=items.filter(function(item){return !item.done;}).length,bought=items.length-pending;
    var groups=[],map={};
    items.forEach(function(item){
      var key=countryTextTitle(item.country||'其他');
      if(!map[key]){map[key]={country:key,items:[]};groups.push(map[key]);}
      map[key].items.push(item);
    });
    var lines=['🛍️ 2026 極光旅行購物清單','待買 '+pending+' 項・已買 '+bought+' 項・共 '+items.length+' 項'];
    groups.forEach(function(group){
      lines.push('','📍 '+group.country);
      var waiting=group.items.filter(function(item){return !item.done;}),done=group.items.filter(function(item){return item.done;});
      if(waiting.length){lines.push('待買');waiting.forEach(function(item){appendTextItem(lines,item);});}
      if(done.length){if(waiting.length)lines.push('');lines.push('已買');done.forEach(function(item){appendTextItem(lines,item);});}
    });
    return lines.join('\n');
  }
  function appendTextItem(lines,item){
    lines.push('・'+String(item.name||'未命名商品')+' × '+(Number(item.qty)||1));
    var meta=[];
    if(item.city)meta.push('地點：'+item.city);
    if(item.forWho)meta.push('給：'+item.forWho);
    if(item.budget)meta.push('預算：'+item.budget);
    if(item.note)meta.push('備註：'+item.note);
    if(meta.length)lines.push('　'+meta.join('｜'));
  }
  async function shareCleanText(){
    var text=buildCleanShareText();
    try{
      if(navigator.share){await navigator.share({title:'2026 極光旅行購物清單',text:text});setStatus('已開啟系統分享選單。');return;}
    }catch(e){if(e&&e.name==='AbortError')return;}
    try{await navigator.clipboard.writeText(text);setStatus('已將純文字清單複製到剪貼簿。');}
    catch(e){var ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();setStatus('已將純文字清單複製到剪貼簿。');}
  }
  function ensureChoiceModal(mainButton){
    var modal=document.getElementById('shoppingShareChoice');if(modal)return modal;
    ensureCommonStyle();
    modal=document.createElement('div');modal.id='shoppingShareChoice';modal.hidden=true;
    modal.innerHTML='<div class="share-choice-card" role="dialog" aria-modal="true" aria-labelledby="shoppingShareChoiceTitle"><h3 class="share-choice-title" id="shoppingShareChoiceTitle">選擇分享方式</h3><p class="share-choice-sub">選擇最適合這次分享的清單格式。</p><div class="share-choice-options"><button class="share-choice-option" type="button" data-share-choice="image"><span class="share-choice-icon">🖼️</span><span class="share-choice-copy"><span class="share-choice-name">圖文清單 <span class="share-choice-badge">推薦</span></span><span class="share-choice-desc">有商品圖片、品名與數量，適合分享給同行家人</span></span></button><button class="share-choice-option" type="button" data-share-choice="text"><span class="share-choice-icon">📝</span><span class="share-choice-copy"><span class="share-choice-name">純文字清單</span><span class="share-choice-desc">方便複製、轉貼、搜尋與修改</span></span></button></div><button class="share-choice-cancel" type="button">取消</button></div>';
    document.body.appendChild(modal);
    function close(){modal.hidden=true;document.body.style.overflow='';}
    modal.querySelector('.share-choice-cancel').addEventListener('click',close);
    modal.addEventListener('click',function(e){if(e.target===modal)close();});
    modal.querySelector('[data-share-choice="image"]').addEventListener('click',function(){close();prepareShareImage(mainButton);});
    modal.querySelector('[data-share-choice="text"]').addEventListener('click',function(){close();shareCleanText();});
    return modal;
  }
  function openChoice(mainButton){
    if(!readItems().length){setStatus('目前沒有購物項目，先加入商品後再分享。');return;}
    var modal=ensureChoiceModal(mainButton);modal.hidden=false;document.body.style.overflow='hidden';
  }
  function init(){
    var shareButton=document.getElementById('shareShoppingList');if(!shareButton)return;
    var legacyImage=document.getElementById('shareShoppingImage');if(legacyImage)legacyImage.remove();
    var legacyNote=document.getElementById('shoppingShareImageNote');if(legacyNote)legacyNote.remove();
    shareButton.textContent='分享我的購物清單';
    shareButton.setAttribute('aria-haspopup','dialog');
    document.addEventListener('click',function(event){
      var target=event.target&&event.target.closest?event.target.closest('#shareShoppingList'):null;
      if(!target)return;
      event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
      openChoice(shareButton);
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
