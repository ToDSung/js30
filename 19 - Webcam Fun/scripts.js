const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    })

    .then(localMediaStream => {
        video.src = window.URL.createObjectURL(localMediaStream);
        video.play();
    })
    .catch(err => {
        console.error(`ERROR: `, err);
    })
}

function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        let pixels =redEffect(pixels);

        ctx.putImageData(pixels, 0, 0);

    }, 16)
}

function takePhoto(){
    snap.currentTime = 0;
    snap.play();
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');

    link.href = data;
    link.setAttribute('download', 'photo');
    link.innerHTML = `<img src="${data}" alt="photo" />`;
    strip.insertBefore(link, strip.firstChild);
}

// 濾鏡
function redEffect(pixels) {
    // 透過迴圈將取回的所有像素資料跑一次，i +=4 是因為四個一組(r,g,b,alpha）
    for (let i = 0; i < pixels.data.length; i += 4) {
      // 下面組合就是單純把R(紅色)增強達到紅色濾鏡的效果
      pixels.data[i + 0] = pixels.data[i + 0] + 100;
      pixels.data[i + 1] = pixels.data[i + 1] - 50;
      pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
    }
    return pixels;
  }
