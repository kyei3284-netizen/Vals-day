const correctPassword = "Zaddy";
const herName = "My Queen";
const text = "You are my peace, my joy, my forever choice ❤️";

let index = 0;
let currentSlide = 0;
let slides;
let mediaRecorder;
let audioChunks = [];

document.getElementById("herName").innerText = herName;
document.getElementById("herName2").innerText = herName;

/* Countdown */
const targetDate = new Date("Feb 14, 2026").getTime();
setInterval(()=>{
  const now = new Date().getTime();
  const distance = targetDate - now;
  const days = Math.floor(distance / (1000*60*60*24));
  document.getElementById("countdown").innerText =
    "Countdown: " + days + " days ❤️";
},1000);

/* LOCK */
let isUnlocked = false;
function checkPassword(){
  const input = document.getElementById("password").value;
  if(input === correctPassword){
    isUnlocked = true;
    document.getElementById("lockScreen").style.display="none";
    document.getElementById("mainContent").style.display="flex";
  } else alert("Wrong code ❤️");
}

/* SURPRISE */
function startSurprise(){
  document.getElementById("music").play();
  document.getElementById("loveLetter").classList.remove("hidden");
  typeWriter();
}

/* Typing effect */
function typeWriter(){
  if(index < text.length){
    document.getElementById("typedText").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter,40);
  } else startSlideshow();
}

/* SLIDESHOW */
function startSlideshow(){
  document.getElementById("slideshow").classList.remove("hidden");
  slides = document.querySelectorAll(".slides img");

  setInterval(()=>{
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  },3000);

  setTimeout(()=>{
    document.getElementById("proposal").classList.remove("hidden");
  },9000);
}

/* Proposal buttons */
document.getElementById("noBtn").addEventListener("mouseover",function(){
  this.style.position="absolute";
  this.style.left=Math.random()*window.innerWidth+"px";
  this.style.top=Math.random()*window.innerHeight+"px";
});

function sayYes(){
  document.getElementById("finalScreen").classList.remove("hidden");
  document.getElementById("voiceSection").classList.remove("hidden");
  document.getElementById("chatSection").classList.remove("hidden");
  launchConfetti();
  startFireworks();
}

/* CONFETTI */
function launchConfetti() {
  const container = document.getElementById("confettiContainer");

  for (let i = 0; i < 100; i++) {
    let div = document.createElement("div");
    div.classList.add("confettiDot");
    div.style.left = Math.random() * window.innerWidth + "px";
    div.style.top = Math.random() * window.innerHeight + "px";
    div.style.background = `hsl(${Math.random()*360},100%,70%)`;
    container.appendChild(div);

    let fallDuration = 3000 + Math.random() * 2000;
    div.animate(
      [
        { transform: `translateY(0px) rotate(0deg)` },
        { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random()*720}deg)` }
      ],
      { duration: fallDuration, iterations:1, easing:"ease-out" }
    );

    setTimeout(() => container.removeChild(div), fallDuration);
  }
}

/* FIREWORKS */
const canvas=document.getElementById("fireworks");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
function startFireworks(){
  for(let i=0;i<50;i++){
    ctx.fillStyle = `hsl(${Math.random()*360},100%,70%)`;
    ctx.beginPath();
    ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height,3,0,Math.PI*2);
    ctx.fill();
  }
}

/* VOICE */
async function startRecording(){
  const stream=await navigator.mediaDevices.getUserMedia({audio:true});
  mediaRecorder=new MediaRecorder(stream);
  mediaRecorder.start();
  mediaRecorder.ondataavailable=e=>audioChunks.push(e.data);
}
function stopRecording(){
  mediaRecorder.stop();
  mediaRecorder.onstop=()=>{
    const blob=new Blob(audioChunks,{type:"audio/mp3"});
    document.getElementById("audioPlayback").src=URL.createObjectURL(blob);
  };
}

/* CHAT + ALBERT VIEW */
function sendMessage(){
  const input=document.getElementById("chatInput");
  const chatBox=document.getElementById("chatBox");
  const msg=input.value;

  chatBox.innerHTML += "<p><b>sarah:</b> "+msg+"</p>";

  // Save secretly for Albert view
  let logs = JSON.parse(localStorage.getItem("herMessages")) || [];
  logs.push(msg);
  localStorage.setItem("herMessages", JSON.stringify(logs));

  let reply="You make my world brighter ❤️";
  if(msg.toLowerCase().includes("love"))
    reply="I love you more than yesterday 💕";

  chatBox.innerHTML += "<p><b>Albert:</b> "+reply+"</p>";
  input.value="";
}

/* ALBERT ADMIN VIEW */
document.addEventListener("keydown", function(e){
  if(e.key==="A"){ // Press A to see all her messages
    let logs = JSON.parse(localStorage.getItem("herMessages")) || [];
    alert("Albert Admin View 👀\n\n" + logs.join("\n"));
  }
});
