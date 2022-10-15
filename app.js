console.log("Welcome to Rhythmify");
// initialize the variables 
let songIndex = 0;
let audio = new Audio('util/songs/1.mp3') 
let masterPlay = document.getElementById("masterPlay")
let myProgressBar = document.getElementById("myProgressBar")
let gif = document.getElementById("gif")
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName")
let songItemPlay = document.getElementsByClassName("songItemPlay")

const songs = [
    {songName: "Stereo Love - Edward Maya, Vika Jigulina", filePath:"util/songs/1.mp3", coverPath:"util/covers/1.jpg"},
    {songName: "Guns N Roses - Sweet Child O Mine", filePath:"util/songs/2.mp3", coverPath:"util/covers/2.jpg"},
    {songName: "Save Your Tears - Weekend, Ariana Grande", filePath:"util/songs/3.mp3", coverPath:"util/covers/3.jpg"},
]




Array.from(songItemPlay).forEach((element ) =>{
    element.addEventListener("click", (e)=>{
        if (audio.paused) {
            songIndex = parseInt(e.target.id);
            audio.src = `util/songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audio.play();
            gif.style.opacity = 1;
            Array.from(songItemPlay).forEach((element)=>{
                element.innerHTML = "play_circle"
            })
            console.log("Playing",songs[songIndex].songName);
            e.target.innerText = "pause_circle"
            masterPlay.innerText = "pause_circle"
            Array.from(document.getElementsByClassName("songItem")).forEach((element)=>{
                element.style.opacity = 0.75
                if(element.id[1]==songIndex){
                    element.style.opacity = 1;
                }
            })
        }
        
        else{
            var cur = audio.currentSrc.match(/([\d.]+) *.mp3/)[1];
            audio.pause()
            e.target.innerText = "play_circle"
            masterPlay.innerText = "play_circle"
            gif.style.opacity = 0;
            if(cur-1 != e.target.id){
                console.log("Playing",songs[songIndex].songName);
                songIndex = parseInt(e.target.id)
                audio.src = `util/songs/${songIndex+1}.mp3`;
                masterSongName.innerText = songs[songIndex].songName;
                audio.play();
                gif.style.opacity = 1;
                Array.from(songItemPlay).forEach((element)=>{
                    element.innerHTML = "play_circle"
                })
                e.target.innerText = "pause_circle"
                masterPlay.innerText = "pause_circle"
                Array.from(document.getElementsByClassName("songItem")).forEach((element)=>{
                    element.style.opacity = 0.75
                    if(element.id[1]==songIndex){
                        element.style.opacity = 1;
                    }
                })
                
            }
            
            
        }
    })
})



masterPlay.addEventListener("click", ()=>{
    if (audio.paused || audio.currentTime<=0) {
        console.log("Playing",songs[songIndex].songName);
        audio.play();
        masterPlay.innerText = "pause_circle"
        gif.style.opacity = 1;
        Array.from(songItemPlay).forEach((element)=>{
            element.innerHTML = "play_circle"
            if (element.id == songIndex){
                masterSongName.innerText = songs[songIndex].songName;
                element.innerText ="pause_circle"
            }
        })
        Array.from(document.getElementsByClassName("songItem")).forEach((element)=>{
            element.style.opacity = 0.75
            if(element.id[1]==songIndex){
                element.style.opacity = 1;
            }
        })
        
        
    }
    
    else{
        masterPlay.innerText = "play_circle"
        Array.from(songItemPlay).forEach((element)=>{
            element.innerHTML = "play_circle"
        })
        audio.pause()
        gif.style.opacity = 0;
        
        
        
    }
    
})


audio.addEventListener("timeupdate", ()=> {
    // Update Seekbar
    
    progress = parseInt((audio.currentTime/audio.duration)*100) 
    myProgressBar.value = progress;
    document.getElementById("duration").innerText ="0"+parseInt(audio.currentTime/60)+ ":"+ parseInt((audio.currentTime%60/10))+parseInt(audio.currentTime%10)
    
    if(audio.currentTime == audio.duration){
        if(songIndex+1>=songs.length){
            songIndex = 0
        }
        else{
            songIndex += 1;
        }
        audio.src = `util/songs/${songIndex+1}.mp3`;
        console.log("Playing",songs[songIndex].songName);
        masterSongName.innerText = songs[songIndex].songName;
        audio.currentTime = 0;
        audio.play();
        masterPlay.innerText = "pause_circle"
        
        Array.from(songItemPlay).forEach((element)=>{
            element.innerHTML = "play_circle"
            if (element.id == songIndex){
                masterSongName.innerText = songs[songIndex].songName;
                element.innerText ="pause_circle"
            }
        })
        Array.from(document.getElementsByClassName("songItem")).forEach((element)=>{
            element.style.opacity = 0.75
            if(element.id[1]==songIndex){
                element.style.opacity = 1;
            }
        })
    }
})

myProgressBar.addEventListener("change", ()=>{
    audio.currentTime = (audio.duration*myProgressBar.value/100)
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex+1>=songs.length){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audio.src = `util/songs/${songIndex+1}.mp3`;
    console.log("Playing",songs[songIndex].songName);
    masterSongName.innerText = songs[songIndex].songName;
    audio.currentTime = 0;
    audio.play();
    masterPlay.innerText = "pause_circle"
    
    Array.from(songItemPlay).forEach((element)=>{
        element.innerHTML = "play_circle"
        if (element.id == songIndex){
            masterSongName.innerText = songs[songIndex].songName;
            element.innerText ="pause_circle"
        }
    })
    Array.from(document.getElementsByClassName("songItem")).forEach((element)=>{
        element.style.opacity = 0.75
        if(element.id[1]==songIndex){
            element.style.opacity = 1;
        }
    })
    
    
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = songs.length-1
    }
    else{
        songIndex -= 1;
    }
    audio.src = `util/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audio.currentTime = 0;
    audio.play();
    console.log("Playing",songs[songIndex].songName);
    masterPlay.innerText = "pause_circle"
    Array.from(songItemPlay).forEach((element)=>{
        element.innerHTML = "play_circle"
        if (element.id == songIndex){
            masterSongName.innerText = songs[songIndex].songName;
            element.innerText ="pause_circle"
        }
    })
    Array.from(document.getElementsByClassName("songItem")).forEach((element)=>{
        element.style.opacity = 0.75
        if(element.id[1]==songIndex){
            element.style.opacity = 1;
        }
    })
})