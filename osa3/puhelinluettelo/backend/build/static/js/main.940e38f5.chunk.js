(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(13),u=n.n(c),l=n(2),r=function(e){var t=e.persons,n=e.filter,a=e.removePerson;return t.map(function(e){return-1!==e.name.toLowerCase().indexOf(n.toLowerCase())&&""!==n?o.a.createElement("li",{key:e.name},e.name," ",e.number+"  ",o.a.createElement("button",{type:"submit",onClick:function(){a(e.name)}},"delete")):""===n?o.a.createElement("li",{key:e.name},e.name," ",e.number+"  ",o.a.createElement("button",{type:"submit",onClick:function(){a(e)}},"delete")):null})},i=n(3),m=n.n(i),s="/api/persons",f=function(){return m.a.get(s).then(function(e){return e.data})},b=function(e){return m.a.post(s,e)},d=function(e,t){return m.a.put("".concat(s,"/").concat(e),t)},v=function(e,t){return m.a.delete("".concat(s,"/").concat(e),t)},E=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],c=t[1],u=Object(a.useState)(""),i=Object(l.a)(u,2),m=i[0],s=i[1],E=Object(a.useState)(""),p=Object(l.a)(E,2),g=p[0],h=p[1],j=Object(a.useState)(""),w=Object(l.a)(j,2),O=w[0],y=w[1],C=Object(a.useState)(""),S=Object(l.a)(C,2),k=S[0],D=S[1];Object(a.useEffect)(function(){x()},[]);var x=function(){console.log("Get Data"),f().then(function(e){c(e.data)})},L={persons:n,filter:m,removePerson:function(e){console.log(e),window.confirm("Delete "+e.name+"?")&&v(e.id,e).then(function(e){console.log(e),x(),P("Deleted")})}},P=function(e){D(e),setTimeout(function(){D(null)},2500)};return o.a.createElement("div",null,o.a.createElement("h2",null,"Puhelinluettelo"),k&&o.a.createElement("div",{className:"error"},k),o.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4 ",o.a.createElement("input",{value:m,onChange:function(e){console.log(e.target.value),s(e.target.value)}})),o.a.createElement("h2",null,"Lis\xe4\xe4 uusi"),o.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t=!1;if(n.forEach(function(e){e.name===g&&(t=!0,e.number!==O?window.confirm(e.name+" already exists, replace number?")&&(e.number=O,d(e.id,e).then(function(e){console.log(e)})):alert("".concat(g," on jo luettelossa")))}),!t){var a={name:g,number:O};b(a).then(function(e){console.log(e),a.id=e.data.id,c(n.concat(a)),P("Success")})}h(""),y("")}},o.a.createElement("div",null," nimi: ",o.a.createElement("input",{value:g,onChange:function(e){console.log(e.target.value),h(e.target.value)}}),o.a.createElement("div",null,"numero: ",o.a.createElement("input",{value:O,onChange:function(e){console.log(e.target.value),y(e.target.value)}}))),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"lis\xe4\xe4"))),o.a.createElement("h2",null,"Numerot"),o.a.createElement(r,L))};n(37);u.a.render(o.a.createElement(E,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.940e38f5.chunk.js.map