(window.webpackJsonp=window.webpackJsonp||[]).push([[2],[,function(t,e,n){"use strict";n.r(e);var a=n(63),i=n(65);const r=window.innerWidth,o=window.innerHeight,c=i.a().x((function(t,e){return p(e)})).y((function(t){return u(t)}));let d,s=i.c("#graph").append("svg").attr("width",r).attr("height",o),p=i.b().domain([0,512]).range([0,r]),u=i.b().domain([0,300]).range([o/2,0]);const w=()=>{s.select("path").datum(d).attr("d",c)},h=()=>{s.append("path").datum(d).attr("fill","none").attr("stroke","white").attr("stroke-width",2).attr("d",c)};!async function(){const t=await navigator.mediaDevices.getUserMedia({audio:!0}),e=new AudioContext,n=e.createMediaStreamSource(t),i=e.createScriptProcessor(1024,1,1);n.connect(i),i.connect(e.destination),i.onaudioprocess=t=>{let e=a.a(t.inputBuffer.getChannelData(0));d=e.slice(0,512),s.select("path").empty()?h():w()}}()}]]);