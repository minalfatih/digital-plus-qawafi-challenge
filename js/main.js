document.querySelector(".navbar-toggler").onclick = function () {
  this.classList.toggle("active");
  if (this.classList.contains("active")) {
    document.querySelector("header .navbar-collapse").classList.add("active");
    document.querySelector("header .navbar-nav").classList.add("active");
  } else {
    document
      .querySelector("header .navbar-collapse")
      .classList.remove("active");
    document.querySelector("header .navbar-nav").classList.remove("active");
  }
};

const players = document.querySelectorAll(".audio-box");
let currentPlaying = null;

players.forEach((player, index) => {
  const audio = player.querySelector("audio");
  const playBtn = player.querySelector(".play-btn");
  const playPauseImg = playBtn.querySelector("img"); // **** هنا التغيير الأساسي ****
  const progressBar = player.querySelector(".progress-bar");
  const timeText = player.querySelector("small");

  audio.addEventListener("timeupdate", () => {
    const percent = audio.currentTime / audio.duration;
    const offset = 157 - percent * 157;
    progressBar.style.strokeDashoffset = offset;

    let curr = formatTime(audio.currentTime);
    let dur = formatTime(audio.duration);
    timeText.textContent = `${curr} / ${dur}`;
  });

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      if (currentPlaying && currentPlaying !== audio) {
        currentPlaying.pause();
        // عند إيقاف تشغيل الصوت السابق، نحتاج لتغيير صورة زر التشغيل الخاص به
        const prevPlayerBox = currentPlaying.closest(".audio-box");
        if (prevPlayerBox) {
            const prevPlayPauseImg = prevPlayerBox.querySelector(".play-btn img");
            if (prevPlayPauseImg) {
                prevPlayPauseImg.src = "./images/play-button-svgrepo-com.svg";
            }
        }
      }
      audio.play();
      currentPlaying = audio;
      playPauseImg.src = "./images/pause-svgrepo-com.svg"; // **** استخدام playPauseImg هنا ****
    } else {
      audio.pause();
      playPauseImg.src = "./images/play-button-svgrepo-com.svg"; // **** استخدام playPauseImg هنا ****
    }
  });

  audio.addEventListener("ended", () => {
    playPauseImg.src = "./images/play-button-svgrepo-com.svg"; // **** استخدام playPauseImg هنا ****
    progressBar.style.strokeDashoffset = 157;
    currentPlaying = null; // إعادة تعيين currentPlaying عند انتهاء الصوت
  });
});

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

