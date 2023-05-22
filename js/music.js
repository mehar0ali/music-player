
// All necessary refrences
const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area"),
musicName = wrapper.querySelector(".song-detail .name"),
musicArtist = wrapper.querySelector(".song-detail .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressBar = wrapper.querySelector(".progress-bar"),
progressArea = wrapper.querySelector(".progress-area"),
musicList = wrapper.querySelector(".music-list"),
showMusicBtn = wrapper.querySelector("#more-music"),
hideMusicBtn = musicList.querySelector("#close")





// song index number
// let musicIndex = 2;
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);





// ON window load
window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playingNow();  
})


//changing the pics, song & artist name
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb -1].name;
    musicArtist.innerText = allMusic[indexNumb -1].artist;
    musicImg.src = `.images/${allMusic[indexNumb -1].img}.jpg`;
    mainAudio.src = `music/${allMusic[indexNumb -1].src}.mp3`;
}
















// Music ko play ke liye
function playMusic(){
    wrapper.classList.add("paused")
    playPauseBtn.querySelector("i").innerText = "pause"
    mainAudio.play();
}


//Music ko pause karne ke liye
function pausedMusic(){
    wrapper.classList.remove("paused")
    playPauseBtn.querySelector("i").innerText = "play_arrow"
    mainAudio.pause();
}

//Next song play karne ke liye
function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

//Previous song play karne ke liye
function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();

}



// Play Pause button ka function
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = wrapper.classList.contains("paused")
    isMusicPaused ? pausedMusic() : playMusic();
    playingNow();
})


// Next button par click karne par
nextBtn.addEventListener("click", ()=>{
    nextMusic();
})


// Prvious button par click karne par
prevBtn.addEventListener("click", ()=>{
    prevMusic();
})













// Song ke starting aur ending time ke liye function

mainAudio.addEventListener("timeupdate", (e)=>{
    // console.log(e);

    // song ka total duration or current time liya hai
    const currenttime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currenttime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;


    // Current time or total duration ka refrence liya hai
    const musicCurrentTime = wrapper.querySelector(".currentime"),
    musicDuration = wrapper.querySelector(".duration");


    // Total duration ko sahi se show karwane ka function
    mainAudio.addEventListener("loadeddata", ()=>{
        // Song ki total duration ko audioDuration variable me save kiya hai
        let audioDuration = mainAudio.duration;
        // Song duration ko seconds me convert kiya hai
        let totalMin = Math.floor(audioDuration / 60);
        // Song duration ko Millieseconds me convert kiya hai (jo ke time me second ke : ke baad show hote hai like 3: =>05)
        let totalSec = Math.floor(audioDuration % 60);
        // Ager seconds ya millieseconds ki value 10 se chhoti ho to value se phle 0 add ho haye
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    })

    // Starting time ko sahi se show karwane ka function

        // Song duration ko seconds me convert kiya hai
        let currMin = Math.floor(currenttime / 60);
        // Song duration ko Millieseconds me convert kiya hai (jo ke time me second ke : ke baad show hote hai like 3: =>05)
        let currSec = Math.floor(currenttime % 60);
        // Ager seconds ya millieseconds ki value 10 se chhoti ho to value se phle 0 add ho haye
        if(currSec < 10){
            currSec = `0${currSec}`;
        }
        musicCurrentTime.innerText = `${currMin}:${currSec}`;
        

})





// Progress Bar ke upr progress line ko time ke accoding chalane ka function
progressArea.addEventListener("click", (e)=>{
    // Progress area ki width lete huwe
    let progressWidthVal = progressArea.clientWidth;
    let clickOffSetX = e.offsetX;

    // Song ki total duration ko songDuration variable me store kiya hai
    let songDuration = mainAudio.duration;
    
    mainAudio.currentTime = (clickOffSetX /  progressWidthVal) * songDuration;
    // playMusic() ke formula ko idher chalaya hai ke song ki current time ke brabar progress area chale
    playMusic()
})















// Song ko bar bar ya loop par chalane ke liye ye function banaya hai
const repeatBtn = document.querySelector("#repeat-plist");


// Repeat Button par click karne par ye logos show hon
repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerText;
    // Repeat button par different case lagaye hain
    switch(getText){

        // Ek bar click karne par ye logo show ho
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song Looped")
            break;

        // 2 bar click karne par ye logo show ho
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback Shuffle")
            break;

        // 3 bar click karne par ye logo show ho
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist Looped")
            break;
    }
})




// Repeat Button par click karne par ye formulas chale
mainAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText;   
    
    switch(getText){
        // Ager Repeat button par click nahi kiya to next song chal jaye
        case "repeat":
            nextMusic();
            break;

        // Repeat button par ek bar click karne par wahi song dubara dubara chalta rahe
        case "repeat_one":
            mainAudio.currentTime = 0;    
            loadMusic(musicIndex);
            playMusic();
            break;

        //Repeat button par 2 bar click karne par shuffle start ho or random song chale
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do{
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            }while(musicIndex == randIndex)
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            playingNow();
            break;

}})











// Music list show karwane ke liye (CSS me show class style ki hui hai)
showMusicBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show")
})


// Music list ko hide karne ke liye
hideMusicBtn.addEventListener("click", ()=>{
    showMusicBtn.click();
})








// UL me ka refrence liya hai or is me LI ko add liya hai HTML se lists item delete karne ke baad
const ulTag = document.querySelector("ul")

// For Loop ka formula lagaya hai ke li ki sari item i me add ho jaye
for(let i = 0; i < allMusic.length; i++){
    // LIST tah ko javascript ke help se HTML ki UL me add kiya hai
    // AllMusic ke data ke liye COCNTENT.JS ke naam se alg file banayi hai
    let liTag = `<li li-index="${i + 1}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class="${allMusic[i].src}" src="music/${allMusic[i].src}.mp3"></audio>
                    <span id="${allMusic[i].src}"    class="audio-duration">3:40</span>
                </li>`

    // List items ko Un-Order List me add kiya hai
    ulTag.insertAdjacentHTML("beforeend", liTag);

    // Music List me song ki duration show karwane ke liye Song ka refrence as a ID liya hai
    let liAudioTagDuration = ulTag.querySelector(`#${allMusic[i].src}`);
    // Music List me song ki duration show karwane ke liye Song ka refrence as a CLASS liya hai
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);


    // Music List me song ki duration show karwane ke liye formual lagaya hai
    liAudioTag.addEventListener("loadeddata", ()=>{
        let audioDuration = liAudioTag.duration;
        // Song duration ko seconds me convert kiya hai
        let totalMin = Math.floor(audioDuration / 60);
        // Song duration ko Millieseconds me convert kiya hai (jo ke time me second ke : ke baad show hote hai like 3: =>05)
        let totalSec = Math.floor(audioDuration % 60);
        // Ager seconds ya millieseconds ki value 10 se chhoti ho to value se phle 0 add ho haye
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }

        // Music list me song ki duration add kr di hai
        liAudioTagDuration.innerText = `${totalMin}:${totalSec}`;
        // T-Duration as a setAttribute liya hai ke playing option ke baad song ki duration wapis show ho
        liAudioTagDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`)
       
    })
}












// Ul ke andhr mojood LI ka refrence liya hai
const allLiTags = ulTag.querySelectorAll("li");


// Music List me kisi song par click karne par us song ki time duration ki jagha playing word show ho ke liye formula
function playingNow(){

    for(let j = 0; j < allLiTags.length; j++){
        // Jo song chal raha hai us par duration ki jagha playing word show karwane ke liye refrence liya hai
        let audioTag =  allLiTags[j].querySelector(".audio-duration");
        //conntains mean ke ager playing ki class mojud hai kisi list me
        if(allLiTags[j].classList.contains("playing")){
            // ager playing class hai to use remove kar do
            allLiTags[j].classList.remove("playing");
            // song ki duration lene ke liye t-duration ko gerAttribute kiya hai (t-duration ka setAttribute upe likha hai)
            let adDuration = audioTag.getAttribute("t-duration")
            audioTag.innerText = adDuration;
        }
    
        // Ager list me li-index ki class MusicIndex ke brabar hai
        if(allLiTags[j].getAttribute("li-index") == musicIndex){
            allLiTags[j].classList.add("playing");  //  to playing ki class ki list me add kr do
            audioTag.innerText = "Playing"  // song duration ki jagha par playing word likh do
        }
    
        // clicked(this) ka formual neeche likha hai
        allLiTags[j].setAttribute("onclick", "clicked(this)")
    }
}





// Music List me kisi song par click karne par wo song chal jaye us ke liye  clicked(this) ka formula banaya hai
function clicked(element){
    let getLiIndex = element.getAttribute("li-index")
    musicIndex = getLiIndex;
    loadMusic(musicIndex); // Music List me kisi song par click karne par loadMusic(musicIndex) ka formula b idher chale
    playMusic(); // Music List me kisi song par click karne par playMusic() ka formula b idher chale
    playingNow(); // Music List me kisi song par click karne par playingNow() ka formula b idher chale
}




