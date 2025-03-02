 console.log("Lets start with some JS")
 let curentSong= new Audio();

 function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00"; //jjwjw
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


 async function getSongs() {         //getting songs from folder
  let a = await fetch("http://127.0.0.1:5501/songs/")  
  let response= await a.text();
  let div=document.createElement("div")
  div.innerHTML=response;
  let as=div.getElementsByTagName("a")
  let songs=[]
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
        songs.push(element.href.split("/songs/")[1])
    }

    
  }
  return songs
 }
 const playMusic=(track)=>{
    curentSong.src= "/songs/"+track;
    curentSong.play()
    play.src="pause.svg"
    document.querySelector(".songinfo").innerHTML=track
    document.querySelector(".songtime").innerHTML="00:00 / 00:00"
 }
 async function main(){
    let songs=await getSongs()      
    console.log(songs)

    let songUL=document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        // songUL.innerHTML=songUL+song
        songUL.innerHTML=songUL.innerHTML+ `
        <li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div>Song Artist</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div>
                        </li>
        
        ` ;
    }
    //Attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
    })

    //Attach event listener to prev,play and next button
    play.addEventListener("click",()=>{
        if (curentSong.paused) {
            curentSong.play()
            play.src="pause.svg"
        }
        else{
            curentSong.pause()
            play.src="play.svg"
        }
    })

    //Listen for timeupdate event
    curentSong.addEventListener("timeupdate",()=>{
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(curentSong.currentTime)} / ${secondsToMinutesSeconds(curentSong.duration)}`
    })
 }
 main()