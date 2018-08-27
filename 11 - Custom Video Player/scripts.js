/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.innerHTML = icon;
    video[method]();
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

function handleRangeUpdate(){
    video[this.name] = this.value;
}

ranges.forEach(range=> { 
    range.addEventListener('change', handleRangeUpdate);
    range.addEventListener('mousemove', handleRangeUpdate);
})

function skip(){
    let skipTime = 0;
    skipTime = this.dataset.skip;
    console.log(skipTime);
    video.currentTime += parseFloat(skipTime);
} 
skipButtons.forEach(skipButton => {
    skipButton.addEventListener('click', skip);
})

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
    console.log(progressBar.style.flexBasis);
}

video.addEventListener('progress', handleProgress);

let mousedown = false;
function scrunb(e) {
  const mouseType = e.type;
  if (mouseType === 'mousedown') { mousedown = true; }
  if (mouseType === 'mouseup') { mousedown = false; }
  if (mouseType === 'click' || mouseType === 'mousemove' && mousedown) {
    //offsetX 設置或獲取滑鼠指針位置相對觸發事件對象的 x 座標
    const scrunbTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrunbTime;
  }
}
const progressEvents = ['click', 'mousemove', 'mousedown', 'mouseup'];
progressEvents.forEach(progressEvent => {
  progress.addEventListener(progressEvent, scrunb);
})