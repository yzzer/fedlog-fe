"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[37],{93696:function($e,K){var e={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"}}]},name:"info-circle",theme:"outlined"};K.Z=e},34994:function($e,K,e){e.d(K,{A:function(){return C}});var S=e(1413),d=e(8232),M=e(67294),T=e(78733),fe=e(9105),P=e(4942),te=e(97685),ne=e(87462),ge=e(50756),ve=e(57080),Z=function(v,E){return M.createElement(ve.Z,(0,ne.Z)({},v,{ref:E,icon:ge.Z}))},me=M.forwardRef(Z),Q=me,he=e(21770),s=e(86333),i=e(28459),z=e(78957),pe=e(93967),R=e.n(pe),F=e(66758),b=e(2514),ae=e(98082),k=function(v){return(0,P.Z)({},v.componentCls,{"&-title":{marginBlockEnd:v.marginXL,fontWeight:"bold"},"&-container":(0,P.Z)({flexWrap:"wrap",maxWidth:"100%"},"> div".concat(v.antCls,"-space-item"),{maxWidth:"100%"}),"&-twoLine":(0,P.Z)((0,P.Z)((0,P.Z)((0,P.Z)({display:"block",width:"100%"},"".concat(v.componentCls,"-title"),{width:"100%",margin:"8px 0"}),"".concat(v.componentCls,"-container"),{paddingInlineStart:16}),"".concat(v.antCls,"-space-item,").concat(v.antCls,"-form-item"),{width:"100%"}),"".concat(v.antCls,"-form-item"),{"&-control":{display:"flex",alignItems:"center",justifyContent:"flex-end","&-input":{alignItems:"center",justifyContent:"flex-end","&-content":{flex:"none"}}}})})};function xe(g){return(0,ae.Xj)("ProFormGroup",function(v){var E=(0,S.Z)((0,S.Z)({},v),{},{componentCls:".".concat(g)});return[k(E)]})}var f=e(85893),D=M.forwardRef(function(g,v){var E=M.useContext(F.Z),$=E.groupProps,m=(0,S.Z)((0,S.Z)({},$),g),Fe=m.children,Ie=m.collapsible,we=m.defaultCollapsed,t=m.style,Ve=m.labelLayout,Le=m.title,_=Le===void 0?g.label:Le,ee=m.tooltip,ye=m.align,se=ye===void 0?"start":ye,Te=m.direction,Re=m.size,be=Re===void 0?32:Re,Ae=m.titleStyle,Be=m.titleRender,V=m.spaceProps,Se=m.extra,Ze=m.autoFocus,Oe=(0,he.Z)(function(){return we||!1},{value:g.collapsed,onChange:g.onCollapse}),Ne=(0,te.Z)(Oe,2),oe=Ne[0],He=Ne[1],Ue=(0,M.useContext)(i.ZP.ConfigContext),Xe=Ue.getPrefixCls,ze=(0,b.zx)(g),Ee=ze.ColWrapper,We=ze.RowWrapper,Y=Xe("pro-form-group"),le=xe(Y),Ke=le.wrapSSR,ie=le.hashId,Ge=Ie&&(0,f.jsx)(Q,{style:{marginInlineEnd:8},rotate:oe?void 0:90}),De=(0,f.jsx)(s.G,{label:Ge?(0,f.jsxs)("div",{children:[Ge,_]}):_,tooltip:ee}),ce=(0,M.useCallback)(function(n){var a=n.children;return(0,f.jsx)(z.Z,(0,S.Z)((0,S.Z)({},V),{},{className:R()("".concat(Y,"-container ").concat(ie),V==null?void 0:V.className),size:be,align:se,direction:Te,style:(0,S.Z)({rowGap:0},V==null?void 0:V.style),children:a}))},[se,Y,Te,ie,be,V]),Qe=Be?Be(De,g):De,Ye=(0,M.useMemo)(function(){var n=[],a=M.Children.toArray(Fe).map(function(r,A){var p;return M.isValidElement(r)&&r!==null&&r!==void 0&&(p=r.props)!==null&&p!==void 0&&p.hidden?(n.push(r),null):A===0&&M.isValidElement(r)&&Ze?M.cloneElement(r,(0,S.Z)((0,S.Z)({},r.props),{},{autoFocus:Ze})):r});return[(0,f.jsx)(We,{Wrapper:ce,children:a},"children"),n.length>0?(0,f.jsx)("div",{style:{display:"none"},children:n}):null]},[Fe,We,ce,Ze]),Ce=(0,te.Z)(Ye,2),Je=Ce[0],ke=Ce[1];return Ke((0,f.jsx)(Ee,{children:(0,f.jsxs)("div",{className:R()(Y,ie,(0,P.Z)({},"".concat(Y,"-twoLine"),Ve==="twoLine")),style:t,ref:v,children:[ke,(_||ee||Se)&&(0,f.jsx)("div",{className:"".concat(Y,"-title ").concat(ie).trim(),style:Ae,onClick:function(){He(!oe)},children:Se?(0,f.jsxs)("div",{style:{display:"flex",width:"100%",alignItems:"center",justifyContent:"space-between"},children:[Qe,(0,f.jsx)("span",{onClick:function(a){return a.stopPropagation()},children:Se})]}):Qe}),(0,f.jsx)("div",{style:{display:Ie&&oe?"none":void 0},children:Je})]})}))});D.displayName="ProForm-Group";var re=D,q=e(4499);function C(g){return(0,f.jsx)(T.I,(0,S.Z)({layout:"vertical",contentRender:function(E,$){return(0,f.jsxs)(f.Fragment,{children:[E,$]})}},g))}C.Group=re,C.useForm=d.Z.useForm,C.Item=q.Z,C.useWatch=d.Z.useWatch,C.ErrorList=d.Z.ErrorList,C.Provider=d.Z.Provider,C.useFormInstance=d.Z.useFormInstance,C.EditOrReadOnlyContext=fe.A},86333:function($e,K,e){e.d(K,{G:function(){return pe}});var S=e(1413),d=e(4942),M=e(87462),T=e(67294),fe=e(93696),P=e(78370),te=function(F,b){return T.createElement(P.Z,(0,M.Z)({},F,{ref:b,icon:fe.Z}))},ne=T.forwardRef(te),ge=ne,ve=e(28459),Z=e(83062),me=e(93967),Q=e.n(me),he=e(98082),s=function(F){return(0,d.Z)({},F.componentCls,{display:"inline-flex",alignItems:"center",maxWidth:"100%","&-icon":{display:"block",marginInlineStart:"4px",cursor:"pointer","&:hover":{color:F.colorPrimary}},"&-title":{display:"inline-flex",flex:"1"},"&-subtitle ":{marginInlineStart:8,color:F.colorTextSecondary,fontWeight:"normal",fontSize:F.fontSize,whiteSpace:"nowrap"},"&-title-ellipsis":{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",wordBreak:"keep-all"}})};function i(R){return(0,he.Xj)("LabelIconTip",function(F){var b=(0,S.Z)((0,S.Z)({},F),{},{componentCls:".".concat(R)});return[s(b)]})}var z=e(85893),pe=T.memo(function(R){var F=R.label,b=R.tooltip,ae=R.ellipsis,k=R.subTitle,xe=(0,T.useContext)(ve.ZP.ConfigContext),f=xe.getPrefixCls,D=f("pro-core-label-tip"),re=i(D),q=re.wrapSSR,C=re.hashId;if(!b&&!k)return(0,z.jsx)(z.Fragment,{children:F});var g=typeof b=="string"||T.isValidElement(b)?{title:b}:b,v=(g==null?void 0:g.icon)||(0,z.jsx)(ge,{});return q((0,z.jsxs)("div",{className:Q()(D,C),onMouseDown:function($){return $.stopPropagation()},onMouseLeave:function($){return $.stopPropagation()},onMouseMove:function($){return $.stopPropagation()},children:[(0,z.jsx)("div",{className:Q()("".concat(D,"-title"),C,(0,d.Z)({},"".concat(D,"-title-ellipsis"),ae)),children:F}),k&&(0,z.jsx)("div",{className:"".concat(D,"-subtitle ").concat(C).trim(),children:k}),b&&(0,z.jsx)(Z.Z,(0,S.Z)((0,S.Z)({},g),{},{children:(0,z.jsx)("span",{className:"".concat(D,"-icon ").concat(C).trim(),children:v})}))]}))})},71078:function($e,K,e){e.r(K),e.d(K,{default:function(){return ke}});var S=e(15009),d=e.n(S),M=e(97857),T=e.n(M),fe=e(99289),P=e.n(fe),te=e(5574),ne=e.n(te),ge=e(39418),ve=e(2618),Z=e(80854);function me(n,a){return Q.apply(this,arguments)}function Q(){return Q=P()(d()().mark(function n(a,r){return d()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.abrupt("return",(0,Z.request)("/api/login/captcha",T()({method:"GET",params:T()({},a)},r||{})));case 1:case"end":return p.stop()}},n)})),Q.apply(this,arguments)}var he=e(87547),s=e(1413),i=e(67294),z={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"}}]},name:"lock",theme:"outlined"},pe=z,R=e(91146),F=function(a,r){return i.createElement(R.Z,(0,s.Z)((0,s.Z)({},a),{},{ref:r,icon:pe}))},b=i.forwardRef(F),ae=b,k={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M744 62H280c-35.3 0-64 28.7-64 64v768c0 35.3 28.7 64 64 64h464c35.3 0 64-28.7 64-64V126c0-35.3-28.7-64-64-64zm-8 824H288V134h448v752zM472 784a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"mobile",theme:"outlined"},xe=k,f=function(a,r){return i.createElement(R.Z,(0,s.Z)((0,s.Z)({},a),{},{ref:r,icon:xe}))},D=i.forwardRef(f),re=D,q=e(91),C=e(10915),g=e(28459),v=e(93967),E=e.n(v),$=e(34994),m=e(4942),Fe=e(98082),Ie=function(a){return(0,m.Z)((0,m.Z)({},a.componentCls,{"&-container":{display:"flex",flex:"1",flexDirection:"column",height:"100%",paddingInline:32,paddingBlock:24,overflow:"auto",background:"inherit"},"&-top":{textAlign:"center"},"&-header":{display:"flex",alignItems:"center",justifyContent:"center",height:"44px",lineHeight:"44px",a:{textDecoration:"none"}},"&-title":{position:"relative",insetBlockStart:"2px",color:"@heading-color",fontWeight:"600",fontSize:"33px"},"&-logo":{width:"44px",height:"44px",marginInlineEnd:"16px",verticalAlign:"top",img:{width:"100%"}},"&-desc":{marginBlockStart:"12px",marginBlockEnd:"40px",color:a.colorTextSecondary,fontSize:a.fontSize},"&-main":{minWidth:"328px",maxWidth:"580px",margin:"0 auto","&-other":{marginBlockStart:"24px",lineHeight:"22px",textAlign:"start"}}}),"@media (min-width: @screen-md-min)",(0,m.Z)({},"".concat(a.componentCls,"-container"),{paddingInline:0,paddingBlockStart:32,paddingBlockEnd:24,backgroundRepeat:"no-repeat",backgroundPosition:"center 110px",backgroundSize:"100%"}))};function we(n){return(0,Fe.Xj)("LoginForm",function(a){var r=(0,s.Z)((0,s.Z)({},a),{},{componentCls:".".concat(n)});return[Ie(r)]})}var t=e(85893),Ve=["logo","message","contentStyle","title","subTitle","actions","children","containerStyle","otherStyle"];function Le(n){var a,r=n.logo,A=n.message,p=n.contentStyle,W=n.title,w=n.subTitle,H=n.actions,ue=n.children,X=n.containerStyle,G=n.otherStyle,B=(0,q.Z)(n,Ve),de=(0,C.YB)(),je=B.submitter===!1?!1:(0,s.Z)((0,s.Z)({searchConfig:{submitText:de.getMessage("loginForm.submitText","\u767B\u5F55")}},B.submitter),{},{submitButtonProps:(0,s.Z)({size:"large",style:{width:"100%"}},(a=B.submitter)===null||a===void 0?void 0:a.submitButtonProps),render:function(x,N){var l,y=N.pop();if(typeof(B==null||(l=B.submitter)===null||l===void 0?void 0:l.render)=="function"){var I,o;return B==null||(I=B.submitter)===null||I===void 0||(o=I.render)===null||o===void 0?void 0:o.call(I,x,N)}return y}}),h=(0,i.useContext)(g.ZP.ConfigContext),Me=h.getPrefixCls("pro-form-login"),Pe=we(Me),J=Pe.wrapSSR,O=Pe.hashId,c=function(x){return"".concat(Me,"-").concat(x," ").concat(O)},u=(0,i.useMemo)(function(){return r?typeof r=="string"?(0,t.jsx)("img",{src:r}):r:null},[r]);return J((0,t.jsxs)("div",{className:E()(c("container"),O),style:X,children:[(0,t.jsxs)("div",{className:"".concat(c("top")," ").concat(O).trim(),children:[W||u?(0,t.jsxs)("div",{className:"".concat(c("header")),children:[u?(0,t.jsx)("span",{className:c("logo"),children:u}):null,W?(0,t.jsx)("span",{className:c("title"),children:W}):null]}):null,w?(0,t.jsx)("div",{className:c("desc"),children:w}):null]}),(0,t.jsxs)("div",{className:c("main"),style:(0,s.Z)({width:328},p),children:[(0,t.jsxs)($.A,(0,s.Z)((0,s.Z)({isKeyPressSubmit:!0},B),{},{submitter:je,children:[A,ue]})),H?(0,t.jsx)("div",{className:c("main-other"),style:G,children:H}):null]})]}))}var _=e(5966),ee=e(74165),ye=e(15861),se=e(97685),Te=e(8232),Re=e(55102),be=e(14726),Ae=e(90789),Be=["rules","name","phoneName","fieldProps","onTiming","captchaTextRender","captchaProps"],V=i.forwardRef(function(n,a){var r=Te.Z.useFormInstance(),A=(0,i.useState)(n.countDown||60),p=(0,se.Z)(A,2),W=p[0],w=p[1],H=(0,i.useState)(!1),ue=(0,se.Z)(H,2),X=ue[0],G=ue[1],B=(0,i.useState)(),de=(0,se.Z)(B,2),je=de[0],h=de[1],Me=n.rules,Pe=n.name,J=n.phoneName,O=n.fieldProps,c=n.onTiming,u=n.captchaTextRender,j=u===void 0?function(y,I){return y?"".concat(I," \u79D2\u540E\u91CD\u65B0\u83B7\u53D6"):"\u83B7\u53D6\u9A8C\u8BC1\u7801"}:u,x=n.captchaProps,N=(0,q.Z)(n,Be),l=function(){var y=(0,ye.Z)((0,ee.Z)().mark(function I(o){return(0,ee.Z)().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return U.prev=0,h(!0),U.next=4,N.onGetCaptcha(o);case 4:h(!1),G(!0),U.next=13;break;case 8:U.prev=8,U.t0=U.catch(0),G(!1),h(!1),console.log(U.t0);case 13:case"end":return U.stop()}},I,null,[[0,8]])}));return function(o){return y.apply(this,arguments)}}();return(0,i.useImperativeHandle)(a,function(){return{startTiming:function(){return G(!0)},endTiming:function(){return G(!1)}}}),(0,i.useEffect)(function(){var y=0,I=n.countDown;return X&&(y=window.setInterval(function(){w(function(o){return o<=1?(G(!1),clearInterval(y),I||60):o-1})},1e3)),function(){return clearInterval(y)}},[X]),(0,i.useEffect)(function(){c&&c(W)},[W,c]),(0,t.jsxs)("div",{style:(0,s.Z)((0,s.Z)({},O==null?void 0:O.style),{},{display:"flex",alignItems:"center"}),ref:a,children:[(0,t.jsx)(Re.Z,(0,s.Z)((0,s.Z)({},O),{},{style:(0,s.Z)({flex:1,transition:"width .3s",marginRight:8},O==null?void 0:O.style)})),(0,t.jsx)(be.ZP,(0,s.Z)((0,s.Z)({style:{display:"block"},disabled:X,loading:je},x),{},{onClick:(0,ye.Z)((0,ee.Z)().mark(function y(){var I;return(0,ee.Z)().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:if(L.prev=0,!J){L.next=9;break}return L.next=4,r.validateFields([J].flat(1));case 4:return I=r.getFieldValue([J].flat(1)),L.next=7,l(I);case 7:L.next=11;break;case 9:return L.next=11,l("");case 11:L.next=16;break;case 13:L.prev=13,L.t0=L.catch(0),console.log(L.t0);case 16:case"end":return L.stop()}},y,null,[[0,13]])})),children:j(X,W)}))]})}),Se=(0,Ae.G)(V),Ze=Se,Oe=e(22270),Ne=e(84567),oe=e(53086),He=["options","fieldProps","proFieldProps","valueEnum"],Ue=i.forwardRef(function(n,a){var r=n.options,A=n.fieldProps,p=n.proFieldProps,W=n.valueEnum,w=(0,q.Z)(n,He);return(0,t.jsx)(oe.Z,(0,s.Z)({ref:a,valueType:"checkbox",valueEnum:(0,Oe.h)(W,void 0),fieldProps:(0,s.Z)({options:r},A),lightProps:(0,s.Z)({labelFormatter:function(){return(0,t.jsx)(oe.Z,(0,s.Z)({ref:a,valueType:"checkbox",mode:"read",valueEnum:(0,Oe.h)(W,void 0),filedConfig:{customLightMode:!0},fieldProps:(0,s.Z)({options:r},A),proFieldProps:p},w))}},w.lightProps),proFieldProps:p},w))}),Xe=i.forwardRef(function(n,a){var r=n.fieldProps,A=n.children;return(0,t.jsx)(Ne.Z,(0,s.Z)((0,s.Z)({ref:a},r),{},{children:A}))}),ze=(0,Ae.G)(Xe,{valuePropName:"checked"}),Ee=ze;Ee.Group=Ue;var We=Ee,Y=e(38925),le=e(2453),Ke=e(48096),ie=e(62679),Ge=e(73935),De=e(67610),ce=(0,ie.kc)(function(n){var a=n.token;return{action:{marginLeft:"8px",color:"rgba(0, 0, 0, 0.2)",fontSize:"24px",verticalAlign:"middle",cursor:"pointer",transition:"color 0.3s","&:hover":{color:a.colorPrimaryActive}},lang:{width:42,height:42,lineHeight:"42px",position:"fixed",right:16,borderRadius:a.borderRadius,":hover":{backgroundColor:a.colorBgTextHover}},container:{display:"flex",flexDirection:"column",height:"100vh",overflow:"auto",backgroundImage:"url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",backgroundSize:"100% 100%"}}}),Qe=function(){var a=ce(),r=a.styles;return _jsxs(_Fragment,{children:[_jsx(AlipayCircleOutlined,{className:r.action},"AlipayCircleOutlined"),_jsx(TaobaoCircleOutlined,{className:r.action},"TaobaoCircleOutlined"),_jsx(WeiboCircleOutlined,{className:r.action},"WeiboCircleOutlined")]})},Ye=function(){var a=ce(),r=a.styles;return(0,t.jsx)("div",{className:r.lang,"data-lang":!0,children:Z.SelectLang&&(0,t.jsx)(Z.SelectLang,{})})},Ce=function(a){var r=a.content;return(0,t.jsx)(Y.Z,{style:{marginBottom:24},message:r,type:"error",showIcon:!0})},Je=function(){var a=(0,i.useState)({}),r=ne()(a,2),A=r[0],p=r[1],W=(0,i.useState)("account"),w=ne()(W,2),H=w[0],ue=w[1],X=(0,Z.useModel)("@@initialState"),G=X.initialState,B=X.setInitialState,de=ce(),je=de.styles,h=(0,Z.useIntl)(),Me=function(){var c=P()(d()().mark(function u(){var j,x;return d()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,G==null||(j=G.fetchUserInfo)===null||j===void 0?void 0:j.call(G);case 2:x=l.sent,x&&(0,Ge.flushSync)(function(){B(function(y){return T()(T()({},y),{},{currentUser:x})})});case 4:case"end":return l.stop()}},u)}));return function(){return c.apply(this,arguments)}}(),Pe=function(){var c=P()(d()().mark(function u(j){var x,N,l,y;return d()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,(0,ve.x4)(T()(T()({},j),{},{type:H}));case 3:if(x=o.sent,x.status!=="ok"){o.next=12;break}return N=h.formatMessage({id:"pages.login.success",defaultMessage:"\u767B\u5F55\u6210\u529F\uFF01"}),le.ZP.success(N),o.next=9,Me();case 9:return l=new URL(window.location.href).searchParams,window.location.href=l.get("redirect")||"/dashboard",o.abrupt("return");case 12:console.log(x),p(x),o.next=21;break;case 16:o.prev=16,o.t0=o.catch(0),y=h.formatMessage({id:"pages.login.failure",defaultMessage:"\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\uFF01"}),console.log(o.t0),le.ZP.error(y);case 21:case"end":return o.stop()}},u,null,[[0,16]])}));return function(j){return c.apply(this,arguments)}}(),J=A.status,O=A.type;return(0,t.jsxs)("div",{className:je.container,children:[(0,t.jsx)(Z.Helmet,{children:(0,t.jsxs)("title",{children:[h.formatMessage({id:"menu.login",defaultMessage:"\u767B\u5F55\u9875"}),"- ",De.Z.title]})}),(0,t.jsx)(Ye,{}),(0,t.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"90vh"},children:(0,t.jsx)("div",{style:{flex:"1",padding:"32px 0"},children:(0,t.jsxs)(Le,{contentStyle:{minWidth:280,maxWidth:"75vw"},logo:(0,t.jsx)("img",{alt:"logo",src:"/logo.svg"}),title:"FedLog",subTitle:h.formatMessage({id:"pages.layouts.userLayout.title"}),initialValues:{autoLogin:!0},onFinish:function(){var c=P()(d()().mark(function u(j){return d()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,Pe(j);case 2:case"end":return N.stop()}},u)}));return function(u){return c.apply(this,arguments)}}(),children:[(0,t.jsx)(Ke.Z,{activeKey:H,onChange:ue,centered:!0,items:[{key:"account",label:h.formatMessage({id:"pages.login.accountLogin.tab",defaultMessage:"\u8D26\u6237\u5BC6\u7801\u767B\u5F55"})},{key:"mobile",label:h.formatMessage({id:"pages.login.phoneLogin.tab",defaultMessage:"\u624B\u673A\u53F7\u767B\u5F55"})}]}),J==="error"&&O==="account"&&(0,t.jsx)(Ce,{content:h.formatMessage({id:"pages.login.accountLogin.errorMessage",defaultMessage:"\u8D26\u6237\u6216\u5BC6\u7801\u9519\u8BEF(admin/ant.design)"})}),H==="account"&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(_.Z,{name:"username",fieldProps:{size:"large",prefix:(0,t.jsx)(he.Z,{})},placeholder:h.formatMessage({id:"pages.login.username.placeholder",defaultMessage:"\u7528\u6237\u540D: admin or user"}),rules:[{required:!0,message:(0,t.jsx)(Z.FormattedMessage,{id:"pages.login.username.required",defaultMessage:"\u8BF7\u8F93\u5165\u7528\u6237\u540D!"})}]}),(0,t.jsx)(_.Z.Password,{name:"password",fieldProps:{size:"large",prefix:(0,t.jsx)(ae,{})},placeholder:h.formatMessage({id:"pages.login.password.placeholder",defaultMessage:"\u5BC6\u7801: ant.design"}),rules:[{required:!0,message:(0,t.jsx)(Z.FormattedMessage,{id:"pages.login.password.required",defaultMessage:"\u8BF7\u8F93\u5165\u5BC6\u7801\uFF01"})}]})]}),J==="error"&&O==="mobile"&&(0,t.jsx)(Ce,{content:"\u9A8C\u8BC1\u7801\u9519\u8BEF"}),H==="mobile"&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(_.Z,{fieldProps:{size:"large",prefix:(0,t.jsx)(re,{})},name:"mobile",placeholder:h.formatMessage({id:"pages.login.phoneNumber.placeholder",defaultMessage:"\u624B\u673A\u53F7"}),rules:[{required:!0,message:(0,t.jsx)(Z.FormattedMessage,{id:"pages.login.phoneNumber.required",defaultMessage:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7\uFF01"})},{pattern:/^1\d{10}$/,message:(0,t.jsx)(Z.FormattedMessage,{id:"pages.login.phoneNumber.invalid",defaultMessage:"\u624B\u673A\u53F7\u683C\u5F0F\u9519\u8BEF\uFF01"})}]}),(0,t.jsx)(Ze,{fieldProps:{size:"large",prefix:(0,t.jsx)(ae,{})},captchaProps:{size:"large"},placeholder:h.formatMessage({id:"pages.login.captcha.placeholder",defaultMessage:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801"}),captchaTextRender:function(u,j){return u?"".concat(j," ").concat(h.formatMessage({id:"pages.getCaptchaSecondText",defaultMessage:"\u83B7\u53D6\u9A8C\u8BC1\u7801"})):h.formatMessage({id:"pages.login.phoneLogin.getVerificationCode",defaultMessage:"\u83B7\u53D6\u9A8C\u8BC1\u7801"})},name:"captcha",rules:[{required:!0,message:(0,t.jsx)(Z.FormattedMessage,{id:"pages.login.captcha.required",defaultMessage:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801\uFF01"})}],onGetCaptcha:function(){var c=P()(d()().mark(function u(j){var x;return d()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,me({phone:j});case 2:if(x=l.sent,x){l.next=5;break}return l.abrupt("return");case 5:le.ZP.success("\u83B7\u53D6\u9A8C\u8BC1\u7801\u6210\u529F\uFF01\u9A8C\u8BC1\u7801\u4E3A\uFF1A1234");case 6:case"end":return l.stop()}},u)}));return function(u){return c.apply(this,arguments)}}()})]}),(0,t.jsxs)("div",{style:{marginBottom:24},children:[(0,t.jsx)(We,{noStyle:!0,name:"autoLogin",children:(0,t.jsx)(Z.FormattedMessage,{id:"pages.login.rememberMe",defaultMessage:"\u81EA\u52A8\u767B\u5F55"})}),(0,t.jsx)("a",{style:{float:"right"},children:(0,t.jsx)(Z.FormattedMessage,{id:"pages.login.forgotPassword",defaultMessage:"\u5FD8\u8BB0\u5BC6\u7801"})})]})]})})}),(0,t.jsx)(ge.$_,{})]})},ke=Je}}]);
