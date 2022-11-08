// Lets Initialize our variables
// The following varibales will be needed

const width = 320 ;
let height = 0;
let streaming = false;

let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let photo = document.getElementById("photo");
let enroll_button = document.getElementById("enroll-btn");

// Initialization Function
function initialise(){
    //Get the media stream
    navigator.mediaDevices
        .getUserMedia({video: true, audio: false})
        .then((stream)=> {video.srcObject=stream; video.onplay();})
        .catch((err) => {
            console.error(`An error occurred: ${err}`);
        });

    // Add video eventlistner
    video.addEventListener("canplay", (ev) => {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);
  
            // Firefox currently has a bug where the height can't be read from
            // the video, so we will make assumptions if this happens.
  
            if (isNaN(height)) {
              height = width / (4 / 3);
            }
  
            video.setAttribute("width", width);
            video.setAttribute("height", height);
            canvas.setAttribute("width", width);
            canvas.setAttribute("height", height);
            streaming = true;
          }
        },
        false

    );

    enroll_button.addEventListener(
        "click",
        (ev) => {
          takepicture();
          ev.preventDefault();
        },
        false
      );
  
      clearphoto();

};

// Fill the photo with an indication that none has been
    // captured.
  
function clearphoto() {
    const context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
}
    
// Capture a photo by fetching the current contents of the video
// and drawing it into a canvas, then converting that to a PNG
// format data URL. By drawing it on an offscreen canvas and then
// drawing that to the screen, we can change its size and/or apply
// other changes before drawing it.
    
function takepicture() {
    const context = canvas.getContext("2d");
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
    
        const data = canvas.toDataURL("image/png");
        photo.setAttribute("src", data);
    } else {
        clearphoto();
    }
};

// Set up our event listener to run the startup process
// once loading is complete.
window.addEventListener("load", initialise, false);





