document.querySelector("#download-btn").addEventListener("click",async function(){
let video = document.querySelector("#video-link").value;
if(video.length == 0){
    return;
}
try {
document.querySelector(".loader").classList.add("show");

let  res = await fetch ("/videoInfo?videoURL="+video);
let data = await res.json();

document.querySelector(".loader").classList.remove("show");

let audios = data.formats.filter(function(obj){
 return obj.mimeType.includes("audio/webm");
});
let filename = data.videoDetails.title.replace(/\s{1,}/,"-") + ".mp3";
let itag = audios[0].itag;
notify(`"${filename}"Descarga automatica `);

document.querySelector("#download-frame").src = `/download?videoURL=${video}&itag=${itag}&filename=${filename}`;
} catch(msg){
    document.querySelector(".loader").classList.remove("show");
    alert("Disculpa pero por el momento el servicio no esta funcionando de la manera mas optima. Intenta nuevamente o mas tarde.");
}
});

function notify(message){
    let notificacion = document.createElement("div");
    notificacion.classList.add("notificacion");
    notificacion.innerText = message;

    document.body.appendChild(notificacion);
    setTimeout(function(){
        notificacion.classList.add("show");
    },100);
    setTimeout(function(){
        notificacion.classList.remove("show");
        setTimeout(function(){
            document.body.removeChild(notificacion);

        },300);
    },4000);
}