// Lets Initialize our variables
// The following varibales will be needed

const width = 320 ;
let height = 0;
let streaming = false;

let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let photo = document.getElementById("photo");
let auth_button = document.getElementById("authenticate");
let enroll_button = document.getElementById("click-photo");


// Prediction Result Variables
let prediction = " ";
let predictionResult = document.querySelector(".prediction_result");
let userImage = document.querySelector(".user-image");
let userName = document.querySelector(".user-name");
let userStudentNum = document.querySelector(".user-student-number");

//Create a an array with objects that represent a single user

const systemUsers = [
    {name: "Derbey",

    studentNumber: 22213456,

image: "../images/Users/derbey.jpg" 
},

    {name: "Hash",

    studentNumber: 22012669,

image: "../images/Users/hash.jpg"},

    {name: "Mbasa",

    studentNumber: 22038192,

image: "../images/Users/mbasa.jpg" },

    {name: "Prince",

    studentNumber: 22001527,

image: "../images/Users/prince.jpg"}

];

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
            
            // Make adjustments to the photo and video stream for different deveices
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

//Create an eventlistener to trigger inference when Authenticate button is pressed
auth_button.addEventListener("click", async function(){

    takepicture();

    const toPredict = tf.browser.fromPixels(canvas).resizeBilinear([224, 224]).expandDims()

    // Load the model 
    const model = await tf.loadLayersModel("model.json");
    prediction = model.predict(toPredict).dataSync();
    let result = tf.argMax(prediction)
    tf.print(result);
    console.log(systemUsers[result.dataSync()].image);
    userImage.innerHTML = `<img class = "userImage" src = "${systemUsers[result.dataSync()].image}" style="width:200px;height:200px;">`
    userName.innerHTML = systemUsers[result.dataSync()].name
    userStudentNum.innerHTML = systemUsers[result.dataSync()].studentNumber
    
    
    //Change the display of the prediction results div

    //predictionResult.style.display = "Flex";

    //Get the MTCNN Model, to do preprocessing

    //await faceapi.loadSsdMobilenetv1Model('/models');
    //const detections = await faceapi.detectAllFaces(photo);

    // resize the detected boxes in case your displayed image has a different size then the original
    //const detectionsForSize = await faceapi.resizeResults(detections, { width: photo.width, height: photo.height })
    // draw them into a canvas
    //canvas.width = photo.width
    //canvas.height = photo.height
    //faceapi.drawDetection(canvas, detectionsForSize, { withScore: true })

    

    //Make predictions

    //Change photo into tensor and reshape into desired size:

    //

});


// Load the model 
//const model = await tf.loadLayersModel("/tfjs_model/model.json");




