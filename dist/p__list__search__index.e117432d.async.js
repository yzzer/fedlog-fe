"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[733],{70789:function(b,c,n){n.r(c);var l=n(45629),e=n(80854),h=n(55102),s=n(85893),u=[{key:"articles",tab:"\u6587\u7AE0"},{key:"projects",tab:"\u9879\u76EE"},{key:"applications",tab:"\u5E94\u7528"}],d=function(){var r=(0,e.useLocation)(),a=(0,e.useMatch)(r.pathname),p=function(t){var i=(a==null?void 0:a.pathname)==="/"?"":a==null?void 0:a.pathname.substring(0,a.pathname.lastIndexOf("/"));switch(t){case"articles":e.history.push("".concat(i,"/articles"));break;case"applications":e.history.push("".concat(i,"/applications"));break;case"projects":e.history.push("".concat(i,"/projects"));break;default:break}},_=function(t){console.log(t)},v=function(){var t=r.pathname.substring(r.pathname.lastIndexOf("/")+1);return t&&t!=="/"?t:"articles"};return(0,s.jsx)(l._z,{content:(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)(h.Z.Search,{placeholder:"\u8BF7\u8F93\u5165",enterButton:"\u641C\u7D22",size:"large",onSearch:_,style:{maxWidth:522,width:"100%"}})}),tabList:u,tabActiveKey:v(),onTabChange:p,children:(0,s.jsx)(e.Outlet,{})})};c.default=d}}]);
