

 let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('myProggressbar');
let gif = document.getElementById('playgif');
 let track = new Audio('/songs/1.mp3');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songIndex = 0;
let currentSong = document.getElementById("currentSong");

let songs = [
  { songName: "sri raghavam" },
  { songName: "pushpa pushpa" },
  { songName: "hey baby" },
  { songName: "adigadigobadragiri" },
  { songName: "gangs of godavari" },
  { songName: "pranam"}
];

songItems.forEach((element, i)=>{ 
  
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 
masterPlay.addEventListener('click',()=>{
      
  if(track.paused || track.currentTime<=0){
    track.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity=1;
    currentSong.innerText = songs[songIndex].songName;
  }else{
    track.pause();
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.add('fa-play');
    gif.style.opacity=0;
  }
});

track.addEventListener('timeupdate',()=>{
    progress = parseInt((track.currentTime / track.duration)*100);
    progressBar.value=progress;
});
progressBar.addEventListener('change',()=>{
    track.currentTime = parseInt((progressBar.value*track.duration)/100); 
})


let playAll=()=>{
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
      element.classList.remove('fa-pause-circle');
      element.classList.add('fa-play-circle');
  });
}
 


Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
  element.addEventListener('click',(e)=>{
    var selectedEle = e.target.getAttribute("class");
    var classAr = selectedEle.split(" ");
    if(classAr[2] === 'fa-play-circle'){
    
    playAll();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    track.src=`/songs/${songIndex+1}.mp3`;
    track.currentTime=0;
    track.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity=1;
    currentSong.innerText = songs[songIndex].songName;
    }else{
      e.target.classList.remove('fa-pause-circle');
      e.target.classList.add('fa-play-circle');
      track.pause();
      gif.style.opacity=0;
      masterPlay.classList.remove('fa-pause');
      masterPlay.classList.add('fa-play');
      
     
    }
  })
})



document.getElementById('next').addEventListener('click',()=>{
  if(songIndex >= 5){
    songIndex = 0;
  }else{
    songIndex += 1;
  }
   track.src=`/songs/${songIndex+1}.mp3`;
   track.currentTime = 0;
   track.play();
  masterPlay.classList.remove('fa-play');
  masterPlay.classList.add('fa-pause');
  gif.style.opacity=1;
  currentSong.innerText = songs[songIndex].songName;
});
document.getElementById('previous').addEventListener('click',()=>{
  if(songIndex <= 0){
    songIndex = 5;
  }else{
    songIndex -= 1;
  }
  track.src=`/songs/${songIndex+1}.mp3`;
  track.currentTime = 0;
  track.play();
  masterPlay.classList.remove('fa-play');
  masterPlay.classList.add('fa-pause');
  gif.style.opacity=1;
  currentSong.innerText = songs[songIndex].songName;
})