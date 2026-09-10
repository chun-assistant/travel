(() => {
  'use strict';

  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const KEY = 'aurora-shopping-list-v1';
  let items = [];
  let editing = -1;

  function esc(s){
    return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  try{
    items=JSON.parse(localStorage.getItem(KEY)||'[]');
    if(!Array.isArray(items))items=[];
  }catch(e){items=[]}

  function setBackupStatus(message){
    const el=$('#shoppingBackupStatus');
    if(el)el.textContent=message||'';
  }

  function backupFilename(){
    const d=new Date(),pad=n=>String(n).padStart(2,'0');
    return `極光旅行購物清單_${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}.json`;
  }

  function backupPayload(){
    return {type:'aurora-shopping-list-backup',version:1,exportedAt:new Date().toISOString(),items};
  }

  async function backupToDevice(){
    const json=JSON.stringify(backupPayload(),null,2),name=backupFilename(),file=new File([json],name,{type:'application/json'});
    try{
      if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){
        await navigator.share({title:'極光旅行購物清單備份',files:[file]});
        setBackupStatus('已開啟系統儲存／分享選單；請確認選擇手機本機資料夾。');
        return;
      }
    }catch(e){if(e&&e.name==='AbortError')return}
    const url=URL.createObjectURL(file),a=document.createElement('a');
    a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    setBackupStatus('備份檔已下載；請確認檔案保存在手機本機資料夾。');
  }

  function normalizeBackupItems(rows){
    if(!Array.isArray(rows))throw new Error('備份格式不正確');
    return rows.filter(x=>x&&typeof x.name==='string'&&x.name.trim()).map(x=>({
      name:String(x.name).trim().slice(0,80),country:String(x.country||'其他').slice(0,20),
      city:String(x.city||'').slice(0,40),qty:Math.max(1,Math.min(999,Number(x.qty)||1)),
      budget:String(x.budget||'').slice(0,30),forWho:String(x.forWho||'').slice(0,50),
      note:String(x.note||'').slice(0,180),done:!!x.done
    }));
  }

  async function restoreFromFile(file){
    try{
      const parsed=JSON.parse(await file.text()),rows=Array.isArray(parsed)?parsed:parsed&&parsed.items,restored=normalizeBackupItems(rows);
      if(!confirm(`將以備份檔的 ${restored.length} 項取代目前 ${items.length} 項購物清單，確定還原嗎？`)){
        setBackupStatus('已取消還原，原本清單沒有變更。');return;
      }
      items=restored;save();resetForm();setBackupStatus(`還原完成：共 ${items.length} 項。`);
    }catch(e){setBackupStatus('無法還原：請確認選擇的是本頁匯出的 JSON 備份檔。')}
  }

  function shoppingShareText(){
    if(!items.length)return '🛍️ 2026 極光旅行購物清單\n目前沒有購物項目。';
    const groups={};
    items.forEach(x=>(groups[x.country||'其他']||(groups[x.country||'其他']=[])).push(x));
    const lines=['🛍️ 2026 極光旅行購物清單'];
    Object.entries(groups).forEach(([country,rows])=>{
      lines.push('',`【${country}】`);
      rows.forEach(x=>lines.push(`${x.done?'☑':'☐'} ${x.name} × ${Number(x.qty)||1}${x.city?'｜'+x.city:''}${x.forWho?'｜給 '+x.forWho:''}${x.budget?'｜預算 '+x.budget:''}${x.note?'｜'+x.note:''}`));
    });
    return lines.join('\n');
  }

  async function shareShoppingList(){
    const text=shoppingShareText();
    try{
      if(navigator.share){
        await navigator.share({title:'極光旅行購物清單',text});
        setBackupStatus('已開啟分享選單。');return;
      }
    }catch(e){if(e&&e.name==='AbortError')return}
    try{
      await navigator.clipboard.writeText(text);
      setBackupStatus('此瀏覽器未提供分享選單，已將清單複製到剪貼簿。');
    }catch(e){
      const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';
      document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();
      setBackupStatus('已將清單複製到剪貼簿。');
    }
  }

  function render(){
    const box=$('#shoppingList');
    $('#shoppingCount').textContent=`${items.filter(x=>!x.done).length} 待買／${items.length} 總項目`;
    if(!items.length){box.innerHTML='<div class="empty-list">目前沒有購物項目。可自行新增，或從「伴手禮推薦」一鍵加入。</div>';return}
    box.innerHTML=items.map((x,i)=>`<div class="shopping-item ${x.done?'done':''}"><input type="checkbox" data-done="${i}" ${x.done?'checked':''} aria-label="${x.done?'取消已購買':'標示已購買'}"><div class="shopping-name"><b>${esc(x.name)} × ${Number(x.qty)||1}</b><div class="shopping-detail">${[x.country,x.city,x.forWho&&'給 '+x.forWho,x.budget&&'預算 '+x.budget,x.note].filter(Boolean).map(esc).join(' · ')}</div></div><div class="item-actions"><button class="item-action" type="button" data-edit="${i}">編輯</button><button class="item-action delete" type="button" data-delete="${i}">刪除</button></div></div>`).join('')
  }

  function save(){localStorage.setItem(KEY,JSON.stringify(items));render()}

  function resetForm(){
    editing=-1;$('#shoppingFormTitle').textContent='＋ 新增購物項目';$('#saveShopItem').textContent='加入清單';$('#cancelShopEdit').hidden=true;
    $('#shopName').value='';$('#shopCountry').value='奧地利';$('#shopCity').value='';$('#shopQty').value='1';$('#shopBudget').value='';$('#shopFor').value='';$('#shopNote').value=''
  }

  function fillForm(i){
    const x=items[i];if(!x)return;editing=i;$('#shoppingFormTitle').textContent='編輯購物項目';$('#saveShopItem').textContent='儲存修改';$('#cancelShopEdit').hidden=false;
    $('#shopName').value=x.name||'';$('#shopCountry').value=x.country||'其他';$('#shopCity').value=x.city||'';$('#shopQty').value=x.qty||1;$('#shopBudget').value=x.budget||'';$('#shopFor').value=x.forWho||'';$('#shopNote').value=x.note||'';
    $('#food-shopping').scrollIntoView({behavior:'smooth',block:'start'})
  }

  $('#saveShopItem').addEventListener('click',()=>{
    const name=$('#shopName').value.trim();if(!name){$('#shopName').focus();return}
    const obj={name,country:$('#shopCountry').value,city:$('#shopCity').value.trim(),qty:Math.max(1,Math.min(999,Number($('#shopQty').value)||1)),budget:$('#shopBudget').value.trim(),forWho:$('#shopFor').value.trim(),note:$('#shopNote').value.trim(),done:editing>=0?!!items[editing].done:false};
    if(editing>=0)items[editing]=obj;else items.push(obj);save();resetForm()
  });
  $('#cancelShopEdit').addEventListener('click',resetForm);
  $('#shoppingList').addEventListener('change',e=>{const i=Number(e.target.dataset.done);if(Number.isInteger(i)&&items[i]){items[i].done=e.target.checked;save()}});
  $('#shoppingList').addEventListener('click',e=>{if(e.target.dataset.edit!==undefined)fillForm(Number(e.target.dataset.edit));if(e.target.dataset.delete!==undefined){const i=Number(e.target.dataset.delete);if(items[i]){items.splice(i,1);save();if(editing===i)resetForm()}}});
  $('#clearBought').addEventListener('click',()=>{items=items.filter(x=>!x.done);save();resetForm()});
  $('#backupShoppingList').addEventListener('click',backupToDevice);
  $('#restoreShoppingList').addEventListener('click',()=>{const input=$('#shoppingRestoreFile');input.value='';input.click()});
  $('#shoppingRestoreFile').addEventListener('change',e=>{const file=e.target.files&&e.target.files[0];if(file)restoreFromFile(file)});
  $('#shareShoppingList').addEventListener('click',shareShoppingList);
  $('#souvenirList').addEventListener('click',e=>{const b=e.target.closest('[data-add-item]');if(!b)return;items.push({name:b.dataset.addItem,country:b.dataset.addCountry||'其他',city:'',qty:1,budget:'',forWho:'',note:'',done:false});save();$$('#foodSegments .segment').find(x=>x.dataset.foodView==='shopping').click()});

  window.TravelShoppingList = Object.freeze({render});
  render();
})();
