(this.webpackJsonpphase10=this.webpackJsonpphase10||[]).push([[0],{15:function(e,t,a){e.exports=a(32)},20:function(e,t,a){},21:function(e,t,a){},32:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(13),o=a.n(c),s=(a(20),a(3)),u=(a(21),a(14));var l=function(e){var t=e.userList,a=e.isHost,n=e.removeUser;return r.a.createElement("ul",null,t.map((function(e,t){return r.a.createElement("li",{className:"".concat(e.uid," ").concat(e.host&&"host"),key:"userList-".concat(t)},r.a.createElement("span",null,e.displayName),a&&!e.host&&r.a.createElement("button",Object(u.a)({key:"remove-".concat(e.uid),className:"remove-user",onClick:function(){return n(e.uid)}},"key","remove-".concat(e.uid)),"Remove user"))})))};var i=function(e){var t=e.error,a=e.isLoading,n=e.isNewUser,c=e.displayName,o=e.onDisplayNameSubmit,s=e.startGame,u=e.userList,i=e.isHost,d=e.removeUser;return r.a.createElement(r.a.Fragment,null,r.a.createElement("header",{className:"App-header"},r.a.createElement("h1",null,"Phase 10")),t&&r.a.createElement("p",{dangerouslySetInnerHTML:{__html:t}}),a?r.a.createElement("p",null,"loading..."):n?n&&r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Welcome!"),r.a.createElement("p",null,"Please enter a username to join the game"),r.a.createElement("label",{htmlFor:"display-name"},"Name:"),r.a.createElement("input",{id:"display-name",type:"text",placeholder:"Display Name"}),r.a.createElement("button",{onClick:o},"Submit")):r.a.createElement("p",null,c),i&&!n&&u.length>0&&r.a.createElement("button",{onClick:s},"Everybody's In"),r.a.createElement(l,{userList:u,isHost:i,removeUser:d}))};var d=function(e){var t=e.card,a=e.onClick,n=t[1]||t,c=n.color,o=n.value,s=n.corners;return r.a.createElement("div",{onClick:a?function(){return a(t)}:function(){},"data-card-id":t[0],className:"card ".concat(c)},r.a.createElement("div",{className:"card-value"},o),r.a.createElement("div",{className:"card-top-left-value"},s),r.a.createElement("div",{className:"card-bottom-right-value"},s))},f=a(10),m=a.n(f);m.a.initializeApp({apiKey:"AIzaSyD7owlkcXvzdS8vHY2s3mt_Me-93ma2NZI",authDomain:"phase10-pemo.firebaseapp.com",databaseURL:"https://phase10-pemo.firebaseio.com",projectId:"phase10-pemo",storageBucket:"phase10-pemo.appspot.com",messagingSenderId:"879568671948",appId:"1:879568671948:web:fcf63e12d457b22afade69",measurementId:"G-M6NSG0LYQ8"});var v=m.a,h=v.database();function p(){h.ref("game/state").set("round-end")}function b(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),n=[e[a],e[t]];e[t]=n[0],e[a]=n[1]}return e}function g(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,n=e.splice(0,a);n.forEach((function(e){h.ref("game/userList/".concat(t,"/currentHand")).push(e)}))}var y={initializePhase10:function(e){return h.ref("game/userList").once("value").then((function(t){var a=0;t.forEach((function(t){a++,t.child("gameScore").ref.set(0),t.child("currentPhase").ref.set(1),t.child("hasLaidPhaseThisRound").ref.set(!1),t.child("currentHand").ref.remove(),t.child("turnOrder").ref.set(a),t.child("isCurrentTurn").ref.set(!1),t.child("hasDrawnThisTurn").ref.set(!1),t.child("scoreAddedThisRound").ref.set(0),e.find((function(e){return e.uid===t.val().uid})).turnOrder=a})),h.ref("game/currentRound").set(0),function(e){var t=e.length;h.ref("game/currentRound").once("value",(function(a){var n=a.val();h.ref("game/currentRound").set(n++);var r=function(){for(var e=[],t=["red","yellow","green","blue"],a=0;a<t.length;a++){var n=t[a];e.push({value:"Skip",color:"black",corners:"S"});for(var r=1;r<=12;r++)e.push({value:r,color:n,corners:r}),e.push({value:r,color:n,corners:r}),1!==r&&2!==r||e.push({value:"Wild",color:"black",corners:"W"})}return b(e)}(),c=10*t;for(h.ref("game/discardPile").set(r.splice(c,1)),e.forEach((function(e){g(r,e.uid,10)})),h.ref("game/drawPile").set(r);n>t;)n-=t;var o=e.find((function(e){return e.turnOrder===n})).uid;h.ref("game/userList/".concat(o,"/isCurrentTurn")).set(!0)}))}(e)}))},drawFromPile:function(e,t){h.ref("game/".concat(e)).once("value",(function(a){var n=a.val();g(n,t),0===n.length&&"drawPile"===e&&h.ref("game/discardPile").once("value",(function(e){n=b(e.val()),h.ref("game/discardPile").set([])})),h.ref("game/".concat(e)).set(n),h.ref("game/userList/".concat(t,"/hasDrawnThisTurn")).set(!0)}))},discardFromHand:function(e,t,a,n){var r="game/userList/".concat(e,"/currentHand/").concat(a);if(h.ref(r).once("value",(function(e){var t=e.val();h.ref("game/discardPile").once("value",(function(e){var a=e.val()||[];a.unshift(t),h.ref("game/discardPile").set(a)}))})),h.ref(r).remove(),t<=1)p();else{var c=n.find((function(e){return e.isCurrentTurn})),o=n.find((function(e){return e.turnOrder===c.turnOrder+1}))||n.find((function(e){return 1===e.turnOrder}));!function(e,t){h.ref("game/userList/".concat(e,"/isCurrentTurn")).set(!1),h.ref("game/userList/".concat(t,"/hasDrawnThisTurn")).set(!1),h.ref("game/userList/".concat(t,"/isCurrentTurn")).set(!0)}(c.uid,o.uid)}},layDownPhase:function(e,t,a){var n=a.reduce((function(e,t){return e+t.cards.length}),0);h.ref("game/userList/".concat(e,"/hasLaidPhaseThisRound")).set(!0),a.forEach((function(t){t.cards.forEach((function(t){h.ref("game/userList/".concat(e,"/currentHand/").concat(t[0])).remove()}))})),h.ref("game/laidPhases/".concat(e)).set(a),n===t&&p()}};var E=function(e){var t=e.setIsDiscardDrawDisabled,a=e.onClick,c=v.database(),o=Object(n.useState)({color:null,value:null}),u=Object(s.a)(o,2),l=u[0],i=u[1];return Object(n.useEffect)((function(){return c.ref("game/discardPile").on("value",(function(e){var a=e.val(),n=a?a[0]:{color:"black",value:"X",corners:""};i(n),"S"!==n.value&&a?t(!1):t(!0)})),function(){c.ref("game/discardPile").off()}}),[]),r.a.createElement(d,{onClick:a,card:l})};var O=function(e){var t=e.currentHand,a=e.onClick;return r.a.createElement("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center"}},t.map((function(e,t){return r.a.createElement(d,{card:e,key:"card-".concat(t,"-").concat(e[1].value),onClick:a})})))};var j=function(e){var t=e.onClick,a=v.database(),c=Object(n.useState)(0),o=Object(s.a)(c,2),u=o[0],l=o[1];Object(n.useEffect)((function(){return a.ref("game/drawPile").on("value",(function(e){var t=e.val()||[];l(t.length)})),function(){a.ref("game/drawPile").off()}}),[]);var i={color:"black draw-pile",value:"Draw Pile (".concat(u,")")};return r.a.createElement(d,{card:i,onClick:t,className:"draw-pile"})};var x=function(e){var t=e.closeModal,a=e.children;return r.a.createElement("div",{style:{position:"fixed",top:0,bottom:0,left:0,right:0,backgroundColor:"#282c34",zIndex:10,overflowY:"scroll",paddingBottom:"50px"}},r.a.createElement("div",{style:{height:"20px",top:0}},r.a.createElement("div",{style:{position:"absolute",right:0,padding:"10px",fontWeight:"bold"},onClick:t},"X")),a)},S={1:{rules:[{type:"set",number:3,text:"first set of 3"},{type:"set",number:3,text:"second set of 3"}],text:["2 sets of 3"]},2:{rules:[{type:"set",number:3,text:"set of 3"},{type:"run",number:4,text:"run of 4"}],text:["1 set of 3","1 run of 4"]},3:{rules:[{type:"set",number:4,text:"set of 4"},{type:"run",number:4,text:"run of 4"}],text:["1 set of 4","1 run of 4"]},4:{rules:[{type:"run",number:7,text:"run of 7"}],text:["1 run of 7"]},5:{rules:[{type:"run",number:8,text:"run of 8"}],text:["1 run of 8"]},6:{rules:[{type:"run",number:9,text:"run of 9"}],text:["1 run of 9"]},7:{rules:[{type:"set",number:4,text:"first set of 4"},{type:"set",number:4,text:"second set of 4"}],text:["2 sets of 4"]},8:{rules:[{type:"color",number:7,text:"7 cards of one color"}],text:["7 cards of one color"]},9:{rules:[{type:"set",number:5,text:"set of 5"},{type:"set",number:2,text:"set of 2"}],text:["1 set of 5","1 set of 2"]},10:{rules:[{type:"set",number:5,text:"set of 5"},{type:"set",number:3,text:"set of 3"}],text:["1 set of 5","1 set of 3"]}},k=y.drawFromPile,w=y.discardFromHand,L=y.layDownPhase,P=v.database();var N=function(e){var t=e.currentHand,a=e.userId,c=e.userList,o=Object(n.useState)(!1),u=Object(s.a)(o,2),l=u[0],i=u[1],d=Object(n.useState)(1),f=Object(s.a)(d,2),m=f[0],v=f[1],h=Object(n.useState)(!1),p=Object(s.a)(h,2),b=p[0],g=p[1],y=Object(n.useState)(!1),N=Object(s.a)(y,2),C=N[0],T=N[1],H=Object(n.useState)(!1),I=Object(s.a)(H,2),D=I[0],W=I[1],R=Object(n.useState)([]),A=Object(s.a)(R,2),F=A[0],M=A[1],U=Object(n.useState)(0),z=Object(s.a)(U,2),B=z[0],Y=z[1],G=Object(n.useState)(!1),_=Object(s.a)(G,2),X=_[0],J=_[1],K=Object(n.useState)(""),Q=Object(s.a)(K,2),Z=Q[0],$=Q[1],q=Object(n.useState)([]),V=Object(s.a)(q,2),ee=V[0],te=V[1],ae=Object(n.useState)([]),ne=Object(s.a)(ae,2),re=ne[0],ce=ne[1];function oe(e){w(a,t.length,e[0],c),me()}function se(e){b||k(e,a)}function ue(e){var t=F.findIndex((function(t){return t[0]===e[0]})),a=F.map((function(e){return e}));-1===t?a.push(e):a.splice(t,1),M(a)}function le(){var e=S[m].rules,n="",r=e[B].number;if(F.length<r)return n="Not enough cards selected",void console.log(n);if(-1!==F.findIndex((function(e){return"Skip"===e[1].value})))return n="Skips cannot be played in phases",void console.log(n);var c=e[B].type,o=F.findIndex((function(e){return"Wild"!==e[1].value})),s=e[B],u={cards:F,rule:s,possiblePlays:{valueType:"",options:[]}};if("run"===c){for(var l=F[o][1].value,i=l,d=o;d<F.length;d++){var f=F[d][1].value;if(i!==f&&"Wild"!==f)return n="These cards to do not make a run or may be out of order",void console.log(n);i++}var v=l-o;if(v<=0||i-1>=13)return void(n="These cards to do not make a run or may be out of order");u.possiblePlays.valueType="value",u.possiblePlays.options.push(v-1),u.possiblePlays.options.push(i)}if("set"===c){for(var h=F[o][1].value,p=o;p<F.length;p++){var b=F[p][1].value;if(h!==b&&"Wild"!==b)return void(n="These cards to do not make a run or may be out of order")}u.possiblePlays.valueType="value",u.possiblePlays.options.push(h)}if("color"===c){for(var g=F[o][1].color,y=o;y<F.length;y++){var E=F[y][1],O=E.color,j=E.value;if(g!==O&&"Wild"!==j)return void(n="These cards to do not make a run or may be out of order")}u.possiblePlays.valueType="color",u.possiblePlays.options.push(g)}if(re.push(u),e[B+1]){Y(B+1);var x=ee.filter((function(e){return-1===F.findIndex((function(t){return t[0]===e[0]}))}));te(x),M([])}else L(a,t.length,re),me()}function ie(){var e=S[m].rules;return r.a.createElement("div",null,r.a.createElement("h1",null,"Select ",e[B].text),"run"===e[B].type&&r.a.createElement("p",null,"Please choose cards in order"),r.a.createElement(O,{currentHand:ee,onClick:ue}),r.a.createElement("p",null,"Selected:"),r.a.createElement("div",{style:{minHeight:"84px"}},r.a.createElement(O,{currentHand:F,onClick:ue})),r.a.createElement("button",{onClick:le},B===e.length-1?"Lay down phase":"Next"))}function de(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Select card to discard"),r.a.createElement(O,{currentHand:t,onClick:oe}))}function fe(e){Y(0),M([]),ce([]),$(e),te(t),J(!0)}function me(){J(!1)}return Object(n.useEffect)((function(){return te(t),P.ref("/game/userList/".concat(a,"/")).on("value",(function(e){var t=e.val();i(t.isCurrentTurn||!1),g(t.hasDrawnThisTurn||!1),T(t.hasLaidPhaseThisRound||!1),v(t.currentPhase)})),function(){P.ref("/game/userList/".concat(a,"/isCurrentTurn")).off()}}),[]),r.a.createElement("div",null,X&&r.a.createElement(x,{closeModal:me},"laying"===Z?r.a.createElement(ie,null):"discarding"===Z&&r.a.createElement(de,null)),r.a.createElement("div",{className:"round-middle"},r.a.createElement("div",{className:"card-piles-wrapper ".concat(!b&&"highlight")},r.a.createElement("div",{className:"card-piles"},r.a.createElement(j,{onClick:function(){return se("drawPile")}}),r.a.createElement(E,{onClick:D?function(){}:function(){return se("discardPile")},setIsDiscardDrawDisabled:W}))),r.a.createElement("div",{className:"players-phase"},r.a.createElement("p",null,"Your phase:"),C?r.a.createElement("p",null,"placeholder for successful laydown"):S[m].text.map((function(e){return r.a.createElement("p",{key:"".concat(a,"-").concat(e),className:"phase-text"},e)})))),r.a.createElement("p",{className:"your-hand"},"Your hand:"),r.a.createElement(O,{currentHand:t}),l&&b?r.a.createElement("div",null,C?r.a.createElement("button",null,"Hit on laid phase"):r.a.createElement("button",{onClick:function(){return fe("laying")}},"Lay down phase"),r.a.createElement("button",{onClick:function(){return fe("discarding")}},"Discard and end turn")):r.a.createElement(r.a.Fragment,null))};var C=function(){var e=v.database(),t=Object(n.useState)(""),a=Object(s.a)(t,2),c=(a[0],a[1]),o=Object(n.useState)(!1),u=Object(s.a)(o,2),l=u[0],d=u[1],f=Object(n.useState)(!0),m=Object(s.a)(f,2),h=m[0],p=m[1],b=Object(n.useState)(""),g=Object(s.a)(b,2),E=g[0],O=g[1],j=Object(n.useState)(!1),x=Object(s.a)(j,2),S=x[0],k=x[1],w=Object(n.useState)(0),L=Object(s.a)(w,2),P=L[0],C=L[1],T=Object(n.useState)([]),H=Object(s.a)(T,2),I=H[0],D=H[1],W=Object(n.useState)(""),R=Object(s.a)(W,2),A=R[0],F=R[1],M=Object(n.useState)([]),U=Object(s.a)(M,2),z=U[0],B=U[1];function Y(t){e.ref("/game/userList/".concat(t)).once("value",(function(e){var a=e.val();a?(c(a.displayName),p(!1),G(t,a.displayName),B(Object.entries(a.currentHand||{})||[])):(d(!0),p(!1))}))}function G(t,a){e.ref("/game/userList").once("value",(function(n){var r=[];if(n.forEach((function(e){var a=e.val();r.push(a),a.host&&t===a.uid&&k(!0)})),r.length>=6)F("There are already 6 people in this game.<br>An update is coming soon to allow watching matches.");else if(!(-1!==r.findIndex((function(e){return e.uid===t})))){var c=!r.length;k(c),e.ref("/game/userList/").child(t).set({displayName:a,uid:t,host:c,score:0,gameScore:0,currentPhase:1,hasLaidPhaseThisRound:!1})}}))}return Object(n.useEffect)((function(){var t=localStorage.getItem("p10-user-id"),a=t;return t?(C(t),Y(t)):(v.auth().signInAnonymously().then((function(e){var t=e.user;localStorage.setItem("p10-user-id",t.uid)})).catch((function(e){var t=e.code,a=e.message;console.log(a,t)})),v.auth().onAuthStateChanged((function(e){if(e){var t=e.uid;C(t),a=t}})),Y(P)),e.ref("/game/userList").on("value",(function(e){var t=[];e.forEach((function(e){t.push(e.val())})),D(t)})),e.ref("/game/userList").on("child_changed",(function(e){var t=e.val();I.find((function(e){return e.uid===t.uid}))})),e.ref("/game/state").on("value",(function(e){O(e.val())})),e.ref("/game/userList/".concat(a,"/currentHand")).on("value",(function(e){B(Object.entries(e.val()||{}))})),function(){e.ref("/game/userList/".concat(a,"/currentHand")).off(),e.ref("/game/state").off(),e.ref("/game/userList").off()}}),[]),r.a.createElement("div",{className:"App ".concat(P)},r.a.createElement("style",null,"\n        li.".concat(P," {\n          font-weight: bold;\n          color: seagreen;\n        }\n\n        li.").concat(P,'::after {\n          content: " (you)"\n        }\n\n        li.host::after {\n          content: " (host)"\n        }\n\n        li.').concat(P,'.host::after {\n          content: " (you, host)"\n        }\n        ')),r.a.createElement("main",null,h?r.a.createElement("p",null,"loading..."):"pregame"===E||l?r.a.createElement(i,{error:A,isNewUser:l,onDisplayNameSubmit:function(t){t.preventDefault();var a=document.getElementById("display-name").value;e.ref("/users/".concat(P,"/displayName")).set(a),c(a),G(P,a),d(!1)},isHost:S,userList:I,startGame:function(){y.initializePhase10(I).then((function(){e.ref("game/state").set("round")}))},removeUser:function(t){e.ref("game/userList/".concat(t)).remove(),e.ref("users/".concat(t)).remove()}}):"round"===E?r.a.createElement(N,{currentHand:z,userList:I,userId:P}):r.a.createElement("p",null,"Loading...")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.96fe0c54.chunk.js.map