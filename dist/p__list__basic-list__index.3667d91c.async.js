"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[202],{34804:function(Y,M,e){var u=e(1413),h=e(67294),p=e(66023),P=e(91146),F=function(B,D){return h.createElement(P.Z,(0,u.Z)((0,u.Z)({},B),{},{ref:D,icon:p.Z}))},E=h.forwardRef(F);M.Z=E},51042:function(Y,M,e){var u=e(1413),h=e(67294),p=e(42110),P=e(91146),F=function(B,D){return h.createElement(P.Z,(0,u.Z)((0,u.Z)({},B),{},{ref:D,icon:p.Z}))},E=h.forwardRef(F);M.Z=E},22452:function(Y,M,e){var u=e(1413),h=e(91),p=e(67294),P=e(66758),F=e(53086),E=e(85893),j=["fieldProps","proFieldProps"],B="dateTime",D=p.forwardRef(function(L,b){var m=L.fieldProps,$=L.proFieldProps,I=(0,h.Z)(L,j),c=(0,p.useContext)(P.Z);return(0,E.jsx)(F.Z,(0,u.Z)({ref:b,fieldProps:(0,u.Z)({getPopupContainer:c.getPopupContainer},m),valueType:B,proFieldProps:$,filedConfig:{valueType:B,customLightMode:!0}},I))});M.Z=D},64317:function(Y,M,e){var u=e(1413),h=e(91),p=e(22270),P=e(67294),F=e(66758),E=e(53086),j=e(85893),B=["fieldProps","children","params","proFieldProps","mode","valueEnum","request","showSearch","options"],D=["fieldProps","children","params","proFieldProps","mode","valueEnum","request","options"],L=function(g,w){var C=g.fieldProps,Z=g.children,O=g.params,H=g.proFieldProps,x=g.mode,W=g.valueEnum,_=g.request,o=g.showSearch,K=g.options,y=(0,h.Z)(g,B),ae=(0,P.useContext)(F.Z);return(0,j.jsx)(E.Z,(0,u.Z)((0,u.Z)({valueEnum:(0,p.h)(W),request:_,params:O,valueType:"select",filedConfig:{customLightMode:!0},fieldProps:(0,u.Z)({options:K,mode:x,showSearch:o,getPopupContainer:ae.getPopupContainer},C),ref:w,proFieldProps:H},y),{},{children:Z}))},b=P.forwardRef(function(c,g){var w=c.fieldProps,C=c.children,Z=c.params,O=c.proFieldProps,H=c.mode,x=c.valueEnum,W=c.request,_=c.options,o=(0,h.Z)(c,D),K=(0,u.Z)({options:_,mode:H||"multiple",labelInValue:!0,showSearch:!0,suffixIcon:null,autoClearSearchValue:!0,optionLabelProp:"label"},w),y=(0,P.useContext)(F.Z);return(0,j.jsx)(E.Z,(0,u.Z)((0,u.Z)({valueEnum:(0,p.h)(x),request:W,params:Z,valueType:"select",filedConfig:{customLightMode:!0},fieldProps:(0,u.Z)({getPopupContainer:y.getPopupContainer},K),ref:g,proFieldProps:O},o),{},{children:C}))}),m=P.forwardRef(L),$=b,I=m;I.SearchSelect=$,I.displayName="ProFormComponent",M.Z=I},90672:function(Y,M,e){var u=e(1413),h=e(91),p=e(67294),P=e(53086),F=e(85893),E=["fieldProps","proFieldProps"],j=function(D,L){var b=D.fieldProps,m=D.proFieldProps,$=(0,h.Z)(D,E);return(0,F.jsx)(P.Z,(0,u.Z)({ref:L,valueType:"textarea",fieldProps:b,proFieldProps:m},$))};M.Z=p.forwardRef(j)},37476:function(Y,M,e){e.d(M,{Y:function(){return w}});var u=e(74165),h=e(15861),p=e(1413),P=e(97685),F=e(91),E=e(73177),j=e(28459),B=e(28248),D=e(55917),L=e(21770),b=e(80334),m=e(67294),$=e(73935),I=e(78733),c=e(85893),g=["children","trigger","onVisibleChange","onOpenChange","modalProps","onFinish","submitTimeout","title","width","visible","open"];function w(C){var Z,O,H=C.children,x=C.trigger,W=C.onVisibleChange,_=C.onOpenChange,o=C.modalProps,K=C.onFinish,y=C.submitTimeout,ae=C.title,ve=C.width,X=C.visible,oe=C.open,i=(0,F.Z)(C,g);(0,b.ET)(!i.footer||!(o!=null&&o.footer),"ModalForm \u662F\u4E00\u4E2A ProForm \u7684\u7279\u6B8A\u5E03\u5C40\uFF0C\u5982\u679C\u60F3\u81EA\u5B9A\u4E49\u6309\u94AE\uFF0C\u8BF7\u4F7F\u7528 submit.render \u81EA\u5B9A\u4E49\u3002");var J=(0,m.useContext)(j.ZP.ConfigContext),pe=(0,m.useState)([]),Q=(0,P.Z)(pe,2),n=Q[1],fe=(0,m.useState)(!1),me=(0,P.Z)(fe,2),le=me[0],U=me[1],he=(0,L.Z)(!!X,{value:oe||X,onChange:_||W}),k=(0,P.Z)(he,2),q=k[0],R=k[1],ee=(0,m.useRef)(null),se=(0,m.useCallback)(function(v){ee.current===null&&v&&n([]),ee.current=v},[]),N=(0,m.useRef)(),ie=(0,m.useCallback)(function(){var v,l,a,t=(v=(l=i.form)!==null&&l!==void 0?l:(a=i.formRef)===null||a===void 0?void 0:a.current)!==null&&v!==void 0?v:N.current;t&&o!==null&&o!==void 0&&o.destroyOnClose&&t.resetFields()},[o==null?void 0:o.destroyOnClose,i.form,i.formRef]);(0,m.useImperativeHandle)(i.formRef,function(){return N.current},[N.current]),(0,m.useEffect)(function(){(oe||X)&&(_==null||_(!0),W==null||W(!0))},[X,oe]);var ue=(0,m.useMemo)(function(){return x?m.cloneElement(x,(0,p.Z)((0,p.Z)({key:"trigger"},x.props),{},{onClick:function(){var v=(0,h.Z)((0,u.Z)().mark(function a(t){var s,r;return(0,u.Z)().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:R(!q),(s=x.props)===null||s===void 0||(r=s.onClick)===null||r===void 0||r.call(s,t);case 2:case"end":return f.stop()}},a)}));function l(a){return v.apply(this,arguments)}return l}()})):null},[R,x,q]),xe=(0,m.useMemo)(function(){var v,l,a,t,s,r;return i.submitter===!1?!1:(0,D.Z)({searchConfig:{submitText:(v=(l=o==null?void 0:o.okText)!==null&&l!==void 0?l:(a=J.locale)===null||a===void 0||(a=a.Modal)===null||a===void 0?void 0:a.okText)!==null&&v!==void 0?v:"\u786E\u8BA4",resetText:(t=(s=o==null?void 0:o.cancelText)!==null&&s!==void 0?s:(r=J.locale)===null||r===void 0||(r=r.Modal)===null||r===void 0?void 0:r.cancelText)!==null&&t!==void 0?t:"\u53D6\u6D88"},resetButtonProps:{preventDefault:!0,disabled:y?le:void 0,onClick:function(f){var S;R(!1),o==null||(S=o.onCancel)===null||S===void 0||S.call(o,f)}}},i.submitter)},[(Z=J.locale)===null||Z===void 0||(Z=Z.Modal)===null||Z===void 0?void 0:Z.cancelText,(O=J.locale)===null||O===void 0||(O=O.Modal)===null||O===void 0?void 0:O.okText,o,i.submitter,R,le,y]),Ee=(0,m.useCallback)(function(v,l){return(0,c.jsxs)(c.Fragment,{children:[v,ee.current&&l?(0,c.jsx)(m.Fragment,{children:(0,$.createPortal)(l,ee.current)},"submitter"):l]})},[]),de=(0,m.useCallback)(function(){var v=(0,h.Z)((0,u.Z)().mark(function l(a){var t,s,r;return(0,u.Z)().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return t=K==null?void 0:K(a),y&&t instanceof Promise&&(U(!0),s=setTimeout(function(){return U(!1)},y),t.finally(function(){clearTimeout(s),U(!1)})),f.next=4,t;case 4:return r=f.sent,r&&R(!1),f.abrupt("return",r);case 7:case"end":return f.stop()}},l)}));return function(l){return v.apply(this,arguments)}}(),[K,R,y]),Pe=(0,E.X)(q);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(B.Z,(0,p.Z)((0,p.Z)((0,p.Z)({title:ae,width:ve||800},o),Pe),{},{onCancel:function(l){var a;y&&le||(R(!1),o==null||(a=o.onCancel)===null||a===void 0||a.call(o,l))},afterClose:function(){var l;ie(),q&&R(!1),o==null||(l=o.afterClose)===null||l===void 0||l.call(o)},footer:i.submitter!==!1?(0,c.jsx)("div",{ref:se,style:{display:"flex",justifyContent:"flex-end"}}):null,children:(0,c.jsx)(I.I,(0,p.Z)((0,p.Z)({formComponentType:"ModalForm",layout:"vertical"},i),{},{onInit:function(l,a){var t;i.formRef&&(i.formRef.current=a),i==null||(t=i.onInit)===null||t===void 0||t.call(i,l,a),N.current=a},formRef:N,submitter:xe,onFinish:function(){var v=(0,h.Z)((0,u.Z)().mark(function l(a){var t;return(0,u.Z)().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,de(a);case 2:return t=r.sent,r.abrupt("return",t);case 4:case"end":return r.stop()}},l)}));return function(l){return v.apply(this,arguments)}}(),contentRender:Ee,children:H}))})),ue]})}},54713:function(Y,M,e){e.r(M),e.d(M,{BasicList:function(){return v},default:function(){return l}});var u=e(5574),h=e.n(u),p=e(34804),P=e(51042),F=e(45629),E=e(80854),j=e(78045),B=e(55102),D=e(38703),L=e(28248),b=e(85418),m=e(4393),$=e(71230),I=e(15746),c=e(2487),g=e(7134),w=e(14726),C=e(27484),Z=e.n(C),O=e(67294),H=e(15009),x=e.n(H),W=e(99289),_=e.n(W),o=e(37476),K=e(5966),y=e(22452),ae=e(64317),ve=e(90672),X=e(29905),oe=e(9783),i=e.n(oe),J=e(62679),pe=(0,J.kc)(function(a){var t=a.token;return{standardList:i()({".ant-card-head":{borderBottom:"none"},".ant-card-head-title":{padding:"24px 0",lineHeight:"32px"},".ant-card-extra":{padding:"24px 0"},".ant-list-pagination":{marginTop:"24px",textAlign:"right"},".ant-avatar-lg":{width:"48px",height:"48px",lineHeight:"48px"}},"@media screen and (max-width: ".concat(t.screenXS,"px)"),{".ant-list-item-content":{display:"block",flex:"none",width:"100%"},".ant-list-item-action":{marginLeft:"0"}}),headerInfo:i()({position:"relative",textAlign:"center","& > span":{display:"inline-block",marginBottom:"4px",color:t.colorTextSecondary,fontSize:t.fontSize,lineHeight:"22px"},"& > p":{margin:"0",color:t.colorTextHeading,fontSize:"24px",lineHeight:"32px"},"& > em":{position:"absolute",top:"0",right:"0",width:"1px",height:"56px",backgroundColor:t.colorSplit}},"@media screen and (max-width: ".concat(t.screenSM,"px)"),{marginBottom:"16px","& > em":{display:"none"}}),listContent:i()(i()(i()(i()(i()({fontSize:"0"},"@media screen and (max-width: ".concat(t.screenXS,"px)"),{marginLeft:"0","& > div":{marginLeft:"0"}}),"@media screen and (max-width: ".concat(t.screenMD,"px)"),{"& > div":{display:"block"},"& > div:last-child":{top:"0",width:"100%"}}),"@media screen and (max-width: ".concat(t.screenLG,"px) and (min-width: @screen-md)"),{"& > div":{display:"block"},"& > div:last-child":{top:"0",width:"100%"}}),"@media screen and (max-width: ".concat(t.screenXL,"px)"),{"& > div":{marginLeft:"24px"},"& > div:last-child":{top:"0"}}),"@media screen and (max-width: 1400px)",{textAlign:"right","& > div:last-child":{top:"0"}}),listContentItem:{display:"inline-block",marginLeft:"40px",color:t.colorTextSecondary,fontSize:t.fontSize,verticalAlign:"middle","> span":{lineHeight:"20px"},"> p":{marginTop:"4px",marginBottom:"0",lineHeight:"22px"}},extraContentSearch:i()({width:"272px",marginLeft:"16px"},"@media screen and (max-width: ".concat(t.screenSM,"px)"),{width:"100%",marginLeft:"0"}),listCard:i()(i()({},"@media screen and (max-width: ".concat(t.screenXS,"px)"),{".ant-card-head-title":{overflow:"open"}}),"@media screen and (max-width: ".concat(t.screenMD,"px)"),{".ant-radio-group":{display:"block",marginBottom:"8px"}}),standardListForm:{".ant-form-item":{marginBottom:"12px","&:last-child":{marginBottom:"32px",paddingTop:"4px"}}},formResult:{width:"100%","[class^='title']":{marginBottom:"8px"}}}}),Q=pe,n=e(85893),fe=function(t){var s=Q(),r=s.styles,T=t.done,f=t.open,S=t.current,te=t.onDone,z=t.onSubmit,Ce=t.children;return f?(0,n.jsx)(o.Y,{open:f,title:T?null:"\u4EFB\u52A1".concat(S?"\u7F16\u8F91":"\u6DFB\u52A0"),className:r.standardListForm,width:640,onFinish:function(){var V=_()(x()().mark(function ce(ne){return x()().wrap(function(re){for(;;)switch(re.prev=re.next){case 0:z(ne);case 1:case"end":return re.stop()}},ce)}));return function(ce){return V.apply(this,arguments)}}(),initialValues:S,submitter:{render:function(ce,ne){return T?null:ne}},trigger:(0,n.jsx)(n.Fragment,{children:Ce}),modalProps:{onCancel:function(){return te()},destroyOnClose:!0,bodyStyle:T?{padding:"72px 0"}:{}},children:T?(0,n.jsx)(X.ZP,{status:"success",title:"\u64CD\u4F5C\u6210\u529F",subTitle:"\u4E00\u7CFB\u5217\u7684\u4FE1\u606F\u63CF\u8FF0\uFF0C\u5F88\u77ED\u540C\u6837\u4E5F\u53EF\u4EE5\u5E26\u6807\u70B9\u3002",extra:(0,n.jsx)(w.ZP,{type:"primary",onClick:te,children:"\u77E5\u9053\u4E86"}),className:r.formResult}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(K.Z,{name:"title",label:"\u4EFB\u52A1\u540D\u79F0",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u4EFB\u52A1\u540D\u79F0"}],placeholder:"\u8BF7\u8F93\u5165"}),(0,n.jsx)(y.Z,{name:"createdAt",label:"\u5F00\u59CB\u65F6\u95F4",rules:[{required:!0,message:"\u8BF7\u9009\u62E9\u5F00\u59CB\u65F6\u95F4"}],fieldProps:{style:{width:"100%"}},placeholder:"\u8BF7\u9009\u62E9"}),(0,n.jsx)(ae.Z,{name:"owner",label:"\u4EFB\u52A1\u8D1F\u8D23\u4EBA",rules:[{required:!0,message:"\u8BF7\u9009\u62E9\u4EFB\u52A1\u8D1F\u8D23\u4EBA"}],options:[{label:"\u4ED8\u6653\u6653",value:"xiao"},{label:"\u5468\u6BDB\u6BDB",value:"mao"}],placeholder:"\u8BF7\u9009\u62E9\u7BA1\u7406\u5458"}),(0,n.jsx)(ve.Z,{name:"subDescription",label:"\u4EA7\u54C1\u63CF\u8FF0",rules:[{message:"\u8BF7\u8F93\u5165\u81F3\u5C11\u4E94\u4E2A\u5B57\u7B26\u7684\u4EA7\u54C1\u63CF\u8FF0\uFF01",min:5}],placeholder:"\u8BF7\u8F93\u5165\u81F3\u5C11\u4E94\u4E2A\u5B57\u7B26"})]})}):null},me=fe,le=e(97857),U=e.n(le);function he(a){return k.apply(this,arguments)}function k(){return k=_()(x()().mark(function a(t){return x()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",(0,E.request)("/api/get_list",{params:t}));case 1:case"end":return r.stop()}},a)})),k.apply(this,arguments)}function q(a){return R.apply(this,arguments)}function R(){return R=_()(x()().mark(function a(t){return x()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",(0,E.request)("/api/post_fake_list",{method:"POST",data:U()(U()({},t),{},{method:"delete"})}));case 1:case"end":return r.stop()}},a)})),R.apply(this,arguments)}function ee(a){return se.apply(this,arguments)}function se(){return se=_()(x()().mark(function a(t){return x()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",(0,E.request)("/api/post_fake_list",{method:"POST",data:U()(U()({},t),{},{method:"post"})}));case 1:case"end":return r.stop()}},a)})),se.apply(this,arguments)}function N(a){return ie.apply(this,arguments)}function ie(){return ie=_()(x()().mark(function a(t){return x()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",(0,E.request)("/api/post_fake_list",{method:"POST",data:U()(U()({},t),{},{method:"update"})}));case 1:case"end":return r.stop()}},a)})),ie.apply(this,arguments)}var ue=j.ZP.Button,xe=j.ZP.Group,Ee=B.Z.Search,de=function(t){var s=t.title,r=t.value,T=t.bordered,f=Q(),S=f.styles;return(0,n.jsxs)("div",{className:S.headerInfo,children:[(0,n.jsx)("span",{children:s}),(0,n.jsx)("p",{children:r}),T&&(0,n.jsx)("em",{})]})},Pe=function(t){var s=t.data,r=s.owner,T=s.createdAt,f=s.percent,S=s.status,te=Q(),z=te.styles;return(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{className:z.listContentItem,children:[(0,n.jsx)("span",{children:"Owner"}),(0,n.jsx)("p",{children:r})]}),(0,n.jsxs)("div",{className:z.listContentItem,children:[(0,n.jsx)("span",{children:"\u5F00\u59CB\u65F6\u95F4"}),(0,n.jsx)("p",{children:Z()(T).format("YYYY-MM-DD HH:mm")})]}),(0,n.jsx)("div",{className:z.listContentItem,children:(0,n.jsx)(D.Z,{percent:f,status:S,strokeWidth:6,style:{width:180}})})]})},v=function(){var t=Q(),s=t.styles,r=(0,O.useState)(!1),T=h()(r,2),f=T[0],S=T[1],te=(0,O.useState)(!1),z=h()(te,2),Ce=z[0],V=z[1],ce=(0,O.useState)(void 0),ne=h()(ce,2),Fe=ne[0],re=ne[1],ge=(0,E.useRequest)(function(){return he({count:50})}),De=ge.data,je=ge.loading,Be=ge.mutate,Se=(0,E.useRequest)(function(A,d){return A==="remove"?q(d):A==="update"?N(d):ee(d)},{manual:!0,onSuccess:function(d){Be(d)}}),Oe=Se.run,_e=(De==null?void 0:De.list)||[],Ze={showSizeChanger:!0,showQuickJumper:!0,pageSize:5,total:_e.length},Te=function(d){V(!0),re(d)},ye=function(d){Oe("remove",{id:d})},Re=function(d,G){d==="edit"?Te(G):d==="delete"&&L.Z.confirm({title:"\u5220\u9664\u4EFB\u52A1",content:"\u786E\u5B9A\u5220\u9664\u8BE5\u4EFB\u52A1\u5417\uFF1F",okText:"\u786E\u8BA4",cancelText:"\u53D6\u6D88",onOk:function(){return ye(G.id)}})},Ae=(0,n.jsxs)("div",{children:[(0,n.jsxs)(xe,{defaultValue:"all",children:[(0,n.jsx)(ue,{value:"all",children:"\u5168\u90E8"}),(0,n.jsx)(ue,{value:"progress",children:"\u8FDB\u884C\u4E2D"}),(0,n.jsx)(ue,{value:"waiting",children:"\u7B49\u5F85\u4E2D"})]}),(0,n.jsx)(Ee,{className:s.extraContentSearch,placeholder:"\u8BF7\u8F93\u5165",onSearch:function(){return{}}})]}),Le=function(d){var G=d.item;return(0,n.jsx)(b.Z,{menu:{onClick:function(Ke){var Ue=Ke.key;return Re(Ue,G)},items:[{key:"edit",label:"\u7F16\u8F91"},{key:"delete",label:"\u5220\u9664"}]},children:(0,n.jsxs)("a",{children:["\u66F4\u591A ",(0,n.jsx)(p.Z,{})]})})},Ie=function(){S(!1),V(!1),re({})},We=function(d){S(!0);var G=d!=null&&d.id?"update":"add";Oe(G,d)};return(0,n.jsxs)("div",{children:[(0,n.jsx)(F._z,{children:(0,n.jsxs)("div",{className:s.standardList,children:[(0,n.jsx)(m.Z,{bordered:!1,children:(0,n.jsxs)($.Z,{children:[(0,n.jsx)(I.Z,{sm:8,xs:24,children:(0,n.jsx)(de,{title:"\u6211\u7684\u5F85\u529E",value:"8\u4E2A\u4EFB\u52A1",bordered:!0})}),(0,n.jsx)(I.Z,{sm:8,xs:24,children:(0,n.jsx)(de,{title:"\u672C\u5468\u4EFB\u52A1\u5E73\u5747\u5904\u7406\u65F6\u95F4",value:"32\u5206\u949F",bordered:!0})}),(0,n.jsx)(I.Z,{sm:8,xs:24,children:(0,n.jsx)(de,{title:"\u672C\u5468\u5B8C\u6210\u4EFB\u52A1\u6570",value:"24\u4E2A\u4EFB\u52A1"})})]})}),(0,n.jsx)(m.Z,{className:s.listCard,bordered:!1,title:"\u57FA\u672C\u5217\u8868",style:{marginTop:24},bodyStyle:{padding:"0 32px 40px 32px"},extra:Ae,children:(0,n.jsx)(c.Z,{size:"large",rowKey:"id",loading:je,pagination:Ze,dataSource:_e,renderItem:function(d){return(0,n.jsxs)(c.Z.Item,{actions:[(0,n.jsx)("a",{onClick:function(Me){Me.preventDefault(),Te(d)},children:"\u7F16\u8F91"},"edit"),(0,n.jsx)(Le,{item:d},"more")],children:[(0,n.jsx)(c.Z.Item.Meta,{avatar:(0,n.jsx)(g.C,{src:d.logo,shape:"square",size:"large"}),title:(0,n.jsx)("a",{href:d.href,children:d.title}),description:d.subDescription}),(0,n.jsx)(Pe,{data:d})]})}})})]})}),(0,n.jsxs)(w.ZP,{type:"dashed",onClick:function(){V(!0)},style:{width:"100%",marginBottom:8},children:[(0,n.jsx)(P.Z,{}),"\u6DFB\u52A0"]}),(0,n.jsx)(me,{done:f,open:Ce,current:Fe,onDone:Ie,onSubmit:We})]})},l=v}}]);
