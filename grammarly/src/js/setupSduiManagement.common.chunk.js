(self.webpackChunk=self.webpackChunk||[]).push([[1196],{94415:(e,t,i)=>{i.r(t),i.d(t,{PlagiarismViewModelImpl:()=>he,createPlagiarismEntities:()=>Ie,createPlagiarismViewModels:()=>pe,setupSduiManagement:()=>p});var a=i(43752),s=i(75449),r=i(18009),l=i(84051),n=i(25394),o=i(57312),c=i(9731),d=i(44127),u=i(5314);function p(e,t,i){const p=e.view((e=>(0,c.zG)(e,n.UI((e=>e.sduiBufferService.capiEvents.pipe(d.h(a.h.is("sdui_add","sdui_remove","sdui_update")),d.h(s.e.isSduiEvent),u.U(r.al.fromSource(r.i5.CAPI))))),o.MH))).get(),g=new l.A(i,p,t),{sduiFeedbackService:m,capiClient:h}=e.view((e=>(0,c.zG)(e,n.UI((e=>({sduiFeedbackService:e.sduiFeedbackService,capiClient:e.capiClient}))),o.MH))).get();return{sduiFeedbackService:m,capiClient:h,sduiManager:g}}var g=i(8806),m=i(33982),h=i(85953),v=i(51082),f=i(48521),A=i(40860),b=i(45920),I=i(20401),P=i(62008),S=i(48765),C=i(22156),w=i(96031),y=i(97249),E=i(96928),M=i(636),k=i(19026),R=i(33874),B=i(93963),F=i(95590),U=i(34124),L=i(6835),D=i(10292),G=i(68910),z=i(78615),T=i(18643),q=i(96996),x=i(45327),H=i(68896),O=i(24613),V=i(45603),W=i(50683),j=i(95346),Q=i(1212),Y=i(19467),_=i(62437),Z=i(13058),K=i(74256),N=i(65324),X=i(61442),$=i(49914),J=i(50201),ee=i(69212),te=i(71303),ie=i(65872),ae=i(79759),se=i(17050),re=i(51451),le=i(21350),ne=i(7447),oe=i(55760),ce=i(31937),de=i(16983),ue=i(68627);const pe=({sduiEngine:e,engine:t,capiProxy:i,ded:a,showPlagiarismAlerts:s,environment:r})=>{const l=te.C8.Logging.getLogger("gDocs.PlagiarismEngine"),c=new F.w.Keeper,d=new g._(e.sduiManager.state),p={features:new Set([E.IG.Features.showCardLabelInOutcomes]),cardLayoutDensityMode:B.j.Density.minimal,shouldAnimateAlertApply:E.IG.Default.shouldAnimateAlertApply,cardVisualMode:w.h.create(B.j.CardVisualMode.RegularLightMode)},S=(0,E.Ls)((()=>A.left({kind:"default",error:new Error("should not use hydration to render sdui cards")})),t.alertsReader,p,(()=>U.of(n.YP)),n.YP),C=y.p.getCapabilities(S,t.alertsReader),W=(0,Z.a9)(Z.yR),ee=e=>W,pe=N.t.create(N.t.defaultLensFilters,{...N.t.defaultTextFilters,[k.R.SpecialId.Closed]:Z.jv,[k.R.SpecialId.AllAlerts]:R.bZ.belongsToAllAlerts}),he=w.h.create(K.A.defaultState),ve=new se.t(he.view("lenses"),pe,t.sessionModel.scoreStatus),fe={create:(e,t)=>M.v.WithSuccess.create(e,t,y.p.equatable.structEq,y.p.defaultOrd(C))},Ae=Q.v.createWithExternalItems(fe,C),be=new ue.F.Impl(t.alertsList.state,t.positionManager,t.alertsReader,pe.alertCanBeDisplayed),Ie=new _.oq(t.alertsList.state,t.alertsReader,he.view("lenses"),be,ve,((e,t,i,a,s)=>((e=>{(0,Z.zG)(e,o.bw((e=>{c.push(d.feed.pipe(L.q(1),D.j("cards"),G.b((0,Z.ls)(b.v.filter(Z.jv,Z.jv,(t=>t.alertIds.includes((0,Z.MZ)(e.alert.id)))),b.v.foldMap(I.uZ())((0,Z.a9)(I.cS),(0,Z.a9)(I.cS),I.of),I.YM,o.bw((e=>{requestAnimationFrame((()=>{(0,Z.zG)(d.focusCard(e.id),A.fold((e=>l.warn("Error on focusing SDUI item in a new lens",e)),Z.Q1))}))}))))).subscribe())})))})(a),Ae(e,t,i,a,(0,Z.zG)(s,n.hX((e=>k.R.isWithAlertsId(e.id))))))),ee,C,pe),Pe=w.h.create(Ie.emptyState(k.R.SpecialId.Plagiarism).patch({alertSource:R.l$.sidebar})),Se=M.v.Items.getRemoveDisposedItemsTransformer(C),Ce=m.i.DisablePrevNextButtons.create(C),we=M.v.Items.getItemsPositionsUpdateTransformer(C),ye=J.Py.getDefaultBehavior(y.p.getActiveFocusableItem,C),Ee=w.h.create(!0),Me=w.h.create(k.R.SpecialId.AllAlerts),ke=(0,J.u0)((()=>a.getCursor().index),Ie),Re=(0,J.VC)(Ie,ke,Me,C,(()=>!1),(()=>!1)),Be=J.sR.getStateTransformer(ye,Re,C,J.sR.getShouldAutoFocus(Ee,t.alertsReader,y.p.getActiveItemWithAlert),Z.Q1,Me),Fe=(0,Z.ls)(Se,P.L9(Be),P.L9(Ce),P.L9(we)),Ue=new $.Xx({flush:()=>a.flushChanges()},new z.xQ,S,t.alertsService,t.alertsReader,(()=>Promise.resolve()),(()=>Promise.resolve()),(0,Z.zG)(t.mutedAlertsCategoriesModel,n.UI((e=>({model:e,openSuggestionsManagement:()=>self.open((0,f.Um)().suggestionsSettings)})))),n.YP,Z.jv,y.p.getActiveFocusableItem,C,r,{bufferTransitions:!0,showGbPrompt:!1}),Le=new h.q(e.sduiFeedbackService,C,Pe,e.sduiManager,d,t.alertsReader,{...e.capiClient,...t.writingExpertClient},Ue,r),De=(0,Z.zG)(J.sR.focusFirstCardAfterBigCheck(Pe,w.h.create(i.checkingState),w.h.create(!0),{bigPaste:T.E}),(e=>J.sR.getSideEffect(e,C))),Ge=(0,re.xl)(Pe,pe,U.of(),w.h.create(!1),w.h.create(!0)),ze=q.aj([Ge,s]).pipe(u.U((([e,t])=>t?e:Z.jv))),Te=new re.o$(t.alertsList,t.alertsReader,t.positionManager,t.alertsService,a,Pe,ze,y.p.getActiveFocusableItem,w.h.create(!1),U.of(void 0),!1),qe=new ie.o((()=>A.right(void 0))),xe=(0,le.hp)(Pe,Te,w.h.create(16),qe,a,l),He=t.alertsReader,Oe=Pe.view(j.nL.getActiveAlertHighlight(y.p.getActiveFocusableItem)),Ve=new oe.mN(a,Te,t.alertsReader,Oe,Pe.view((e=>e.currentLens.meta.filter))),We=[De,v.P.SideEffects.createSDUIFeedSideEffect({...C,findNextAlert:(0,Z.a9)(n.YP),selectItemByAlert:()=>Z.yR},d.feed.pipe(u.U(n.G),x.O(n.YP),H.G(),u.U((([e,t])=>(0,Z.zG)(o.gz(e,t),n.hX((([e,t])=>e.feedId===t.feedId)),n.UI((([,e])=>({...e,cards:(0,Z.zG)(e.cards,b.v.filter(Z.jv,Z.W8,Z.W8))}))),n.wp((()=>t))))),O.oA),y.p.sduiToChecksFeedOrd(C),t.alertsReader),ge(d,C),...Le.getApplicatorEffects(),...Ue.getApplicatorEffects(),$.dv.changeAlertEffect(Pe,Ue,S,y.p.getActiveFocusableItem,t.alertsReader,n.G(xe),ke,l.getLogger("CardsViewModelEffects.changeAlertEffect")),ae.R7(Pe,qe,C,(0,Z.MZ)(Ue.actionEvents)),me(Le.sduiActionEvents,U.of(!0),C),(0,ce.A7)(Ve,Pe,!0),ne.EQ.focusMarkByActiveAlert(Pe,Te,He,y.p.getActiveFocusableItem,l.getLogger("MarksEffects.focusMarkByActiveAlert")),ne.EQ.highlightMarkByHighlightedCard(Ue,Pe,Te,He,C,l.getLogger("MarksEffects.highlightMarkByHighlightedCard")),(je=Le.sduiActionEvents,Qe=de.u,{id:"sduiCopyToClipboardEffect",when:k.R.isWithAlertsId,what:j.nL.Effect.Applicator.create(je.pipe(u.U((e=>t=>(e.actions.forEach((e=>{"copyToClipboard"===e.type&&(0,X.vQ)(e.text).then((()=>Qe.enqueue("referenceCopied")))})),t)))))})];var je,Qe;const Ye=new Y.l(Pe,Ie,t.alertsReader,t.alertsService,We,y.p.getActiveFocusableItem,Fe),_e=new V.t;return{...e,checksFeedFlow:()=>y.p.createCardListFlow(Ue)(Ue,Pe.lens(j.nL.Prism.getLens()),_e,U.of(!1),C,y.p.listItemOrd),sduiFeedManager:d,handleSduiAction:e=>{Le.sduiActionEvents.next(e)},capabilities:C,lensState:Pe,trackPlagiarismAlertsEditing:Te.getPlagiarismAlertsEditingTracker(),dispose:()=>{Ye.dispose(),Ue.dispose(),Le.dispose(),c.dispose()}}};function ge(e,t){return{id:"SDUIItemRemoveSideEffect",when:k.R.isWithAlertsId,what:j.nL.Effect.Applicator.create(e.feed.pipe(u.U((e=>i=>{const a=(0,Z.zG)(e.cards,b.v.reduce([],((e,a)=>(0,Z.zG)(i.currentLens.items.get(a.id),n.UI(S.ei("value")),n.hX((0,C.Kg)((0,Z.ff)(ee.o.isAnimatable),(0,Z.ff)(ee.o.isAnimatingRemoval))),n.UI(t.remove(Z.W8,Z.W8)),n.g_((()=>e),(t=>(e.push(t),e))))),Z.yR,Z.yR));if(a.length>0){const e=i.currentLens.items.add(a);return j.nL.Prism.getLens().compose(M.v.Prism.items).set(e,i)}return i}))))}}function me(e,t,i){return{id:"sduiFocusEffect",when:k.R.isWithAlertsId,what:j.nL.Effect.Applicator.create(e.pipe(W.M(t),u.U((([{actions:e,cardId:t},a])=>s=>a&&Boolean(e.find((e=>"notify"===e.type&&"focus"===e.userAction)))&&j.nL.hasItems(s)?(0,Z.zG)(j.In.getActiveItemOfType(y.p.isAlertRefSDUI)(s.currentLens),n.hX((e=>!["focused","removed"].includes(e.visualState.transition.type))),n.UI((()=>j.nL.Prism.getLensWithItems().modify(i.selectItemById((0,Z.MZ)(t)),s))),n.fS((0,Z.a9)(s))):s))))}}class he{constructor(e,t){this._plagiarismViewModelsFactory=e,this._wrapNotifyPayload=t,this.isShouldShowPlagiarismButton=w.h.create(!1),this.plagiarismButtonActions=w.h.create(n.YP),this.plagiarismEngine=w.h.create(n.YP)}setShowPlagiarismButton(e){this.isShouldShowPlagiarismButton.set(e)}setPlagiarismButtonActions(e){this.plagiarismButtonActions.set(n.G(e))}setPlagiarismEngine(e){this.plagiarismEngine.set(n.G(e))}openPlagiarismPage(){const e=this._plagiarismViewModelsFactory();this.setPlagiarismEngine(e),n.pC(this.plagiarismButtonActions.get())&&(0,c.zG)(this.plagiarismButtonActions.get(),o.MH,e.handleSduiAction)}closePlagiarismPage(){(0,c.zG)(this.plagiarismEngine.get(),o.bw((e=>e.handleSduiAction(this._wrapNotifyPayload([{type:"disablePlagiarismCheck"}],"")))))}}var ve=i(19287),fe=i(74675),Ae=i(51705),be=i(11224);function Ie(e,t,i){const a=(e,t,i,s)=>s.forEach((s=>{switch(s.type){case"notify":return void t.sduiFeedbackService.sendUserAction(s.sourceId||i.sourceId,s.userAction);case"enablePlagiarismCheck":return void e.openPlagiarism();case"closePopover":return void t.sduiManager.popoverManager.removePopover(s.rootPopoverId);case"interactPopover":switch((0,Z.zG)(t.sduiManager.popoverManager.getInteractionActions(s.rootPopoverId,s.popoverViewId,s.interaction),(s=>a(e,t,i,s))),s.interaction){case be.fP.Fulfill:case be.fP.Dismiss:t.sduiManager.popoverManager.removePopover(s.rootPopoverId)}return;default:return}})),s=t=>({handleGButtonPopoverAction:i=>{n.pC(e)&&a(t,e.value,i,i.actions)}});return(0,Z.zG)(e,n.g_((()=>n.YP),(e=>{const a=t({sduiEngine:e,...i});return n.G({plagiarismVM:new he((0,ve.of)(a),Ae.Zq),plagiarismButtonSub:e.sduiManager.state.pipe(u.U((e=>fe.D1.GButton.getPlagiarismContent(e)))),popover:(r=e.sduiManager,r.popoverManager.activePopoverView.view(n.tS((e=>"component"===e.anchor.kind&&"gButton:plagiarism"===e.anchor.id?n.G(e):n.YP)))),popoverActionsHandler:s,trackPlagiarismAlertsEditing:a.trackPlagiarismAlertsEditing});var r})))}},97249:(e,t,i)=>{i.d(t,{p:()=>a});var a,s=i(13058),r=i(26074),l=i(9731),n=i(74675),o=i(33874),c=i(93672),d=i(2452),u=i(69212),p=i(95346),g=i(636),m=i(25394),h=i(39905),v=i(22156),f=i(32559),A=i(69053),b=i(51082),I=i(57970),P=i(99597),S=i(42400);!function(e){const t=e=>(0,l.zG)(p.In.getActiveItemOfType(a)(e),m.tS(b.P.Capabilities.toAlertItem));function i(e){return p.nL.Items.mapper((e=>e.kind),{[b.P.Kind]:e})}function a(e){return e.kind===b.P.Kind}function C(){return{viewState:()=>e=>e.kind===b.P.Kind?{view:e,kind:"alertRefSDUI"}:{}}}e.isSelectableItem=a,e.getActiveItemWithAlert=t,e.getActiveFocusableItem=e=>t(e),e.checksFeedItemsMapper=i,e.isAlertRefSDUI=a,e.defaultOrd=t=>(0,r.g_)(h.iP())([(0,l.zG)(h.C2,h.Uz((0,v.ff)(b.P.Item.isBulkAcceptSDUI))),(0,l.zG)(h.C2,h.Uz(b.P.Item.isBulkDismissSDUI)),e.getByActiveAlertPositionOrd(t)]),e.sduiToChecksFeedOrd=function(t){return i=>h.Zt(((a,s)=>I.e.isSDUIItem(a)&&I.e.isSDUIItem(s)?I.e.getOrd(i).compare(a,s):e.getByActiveAlertPositionOrd(t).compare(a,s)))},e.getByActiveAlertPositionOrd=e=>(0,r.g_)(h.iP())([(0,l.zG)(o.h$.ordHRange,h.Uz((t=>(0,l.zG)(e.hasActiveAlert(t),m.UI((e=>e.alert)),m.fS((()=>({getHighlightRanges:()=>[{start:0,end:0}]})))))))]),e.item=()=>A.UI.Union.make("kind",{alertRefSDUI:P.p.SquashedListCard(),empty:S.Q.Empty}),e.viewState=C,e.createCardListFlow=e=>(0,c.sJ)((t=>{switch(t.key){case"empty":break;case"alertRefSDUI":e.actionEvents.next(t.action);break;default:(0,f.L0)(t)}})),e.listItemOrd=e=>h.Uz((e=>e.cell.item.view))(e).compare;const w={equals:(e,t)=>e.kind===t.kind&&d.s.eqById.equals(e,t)},y=e=>({equals:(t,i)=>{const a={[b.P.Kind]:e};return w.equals(t,i)&&(s=e=>e.kind,r=a,(e,t)=>r[s(e)].equals(e,t))(t,i);var s,r}});function E(){return{changePosition:e=>i(b.P.Capabilities.changePosition(e))}}function M(){return{completeTransition:e=>i(b.P.Capabilities.animatable.completeTransition(e)),transitionTo:e=>i(b.P.Capabilities.animatable.transitionTo(e)),changeVisualState:e=>i(b.P.Capabilities.animatable.changeVisualState(e))}}function k(){return{select:(e,t)=>i(b.P.Capabilities.select.select(e,t)),selectByAlert:(e,t,a)=>i(b.P.Capabilities.select.selectByAlert(e,t,a)),unselect:(e,t)=>i(b.P.Capabilities.select.unselect((0,s.MZ)(e),t))}}function R(){return{removeAlertFromItem:(e,t)=>i((i=>i.id===n.D1.SuccessReport.ID?i:b.P.Capabilities.removeAlert.removeAlertFromItem(e,t)(i)))}}function B(){return{remove:(e,t)=>i(b.P.Capabilities.remove.remove(e,t))}}function F(){return{updateWithAlerts:e=>i(s.yR)}}function U(){return{nextAlert:i((()=>m.YP)),prevAlert:i((()=>m.YP))}}function L(){return{updateUserInput:e=>i(s.yR)}}e.equatable={structEq:y(b.P.eq),idEq:y(w),visualStateEq:y(b.P.eq)},e.changePosition=E,e.disposable={isScheduledToDispose:i(b.P.Capabilities.disposable.isScheduledToDispose)},e.hidable={isHidden:i(u.o.isHidden)},e.animatableItem=M,e.hasAlertsQueries={isSelectableByAlert:e=>i(b.P.Capabilities.hasAlerts.isSelectableByAlert(e)),hasAlert:e=>i(b.P.Capabilities.hasAlerts.hasAlert(e)),hasActiveAlert:i(b.P.Capabilities.hasAlerts.hasActiveAlert)},e.changePositionStrategyQueries={useReferenceHeightOnRemove:i(s.jv)},e.select=k,e.removeAlert=R,e.remove=B,e.updateWithAlert=F,e.releaseAlert=()=>g.v.Capabilities.getAlertReleaser({...R(),...e.disposable}),e.unselectable=()=>g.v.Capabilities.getUnselectable(p.In.getActiveItem,{...k(),isScheduledToDispose:s.jv}),e.selectableByAlert=()=>g.v.Capabilities.getSelectableByAlert(p.In.getActiveItem,{...e.hasAlertsQueries,...k(),...g.v.Capabilities.getHasChecksFeed(),...e.disposable}),e.selectableById=()=>g.v.Capabilities.getSelectableById(p.In.getActiveItem,{...k(),isScheduledToDispose:s.jv}),e.updateMeta=()=>({updateMeta:g.v.Capabilities.getMetaUpdatable().updateMeta}),e.animatableFeed=e=>g.v.Capabilities.getAnimatable(e,{...R(),...M(),...g.v.Capabilities.getHasChecksFeed()}),e.alignable={isValidToAlign:i((t=>!e.disposable.isScheduledToDispose(t)))},e.alertIterator=U,e.itemReleaser=()=>g.v.Capabilities.getItemReleaser(),e.hasAlerts=g.v.Capabilities.getHasAlerts,e.hasUserInput=L,e.verifiable=()=>g.v.Capabilities.getVerifiable(e.disposable),e.cloneable=()=>({clone:i(d.s.Capabilities.getPojoCloneable().clone)});const D={getFeatures:i((e=>b.P.Item.isBulkDismissSDUI(e)?[b.P.Features.BulkDismiss]:b.P.Item.isBulkAcceptSDUI(e)?[b.P.Features.BulkAccept]:[]))};e.getCapabilities=function(t,i){return{...C(),...e.disposable,...e.hidable,...e.equatable,...L(),...e.cloneable(),...E(),...M(),...k(),...B(),...R(),...F(),...e.hasAlertsQueries,...e.changePositionStrategyQueries,...e.alignable,...e.releaseAlert(t),...e.unselectable(t),...e.selectableByAlert(t),...e.selectableById(t),...e.updateMeta(t),...e.animatableFeed(t),...e.itemReleaser(),...D,shouldAnimatePositionChange:()=>()=>!1,...e.verifiable(),...e.cloneable(),...e.hasAlerts(U(),i,(()=>e.isSelectableItem),{...e.hasAlertsQueries,...e.disposable})}}}(a||(a={}))},61442:(e,t,i)=>{i.d(t,{Sz:()=>r,vQ:()=>s});var a=i(40860);async function s(e,t=self){if(function(e=self){var t,i;return!!(null===(i=null===(t=e.navigator)||void 0===t?void 0:t.clipboard)||void 0===i?void 0:i.writeText)}(t))return t.navigator.clipboard.writeText(e);throw new Error("Clipboard API not supported")}function r(e,t=self){return s(e,t).then((()=>a.right(void 0))).catch((e=>a.left(e instanceof Error?e:new Error(String(e)))))}}}]);