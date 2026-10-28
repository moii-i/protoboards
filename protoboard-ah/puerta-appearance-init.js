// Apply saved appearance before the first paint; assembly progress has its own key.
(()=>{
 const root=document.documentElement;
 try{
  const p=JSON.parse(localStorage.getItem('protoboards:appearance:v1')||'{}');
  root.dataset.workspaceTheme=['paper','night','contrast'].includes(p.theme)?p.theme:'paper';
  root.dataset.workspaceDensity=p.density==='compact'?'compact':'comfortable';
  root.dataset.workspaceText=['normal','large','larger'].includes(p.text)?p.text:'normal';
  root.dataset.workspaceMotion=['full','reduced','off'].includes(p.effects)?p.effects:'system';
 }catch{root.dataset.workspaceTheme='paper';}
})();
