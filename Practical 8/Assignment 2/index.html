let webcam;
let net;
let classifier;

let dataset = {
  Apple: [],
  Banana: [],
  Orange: []
};

let labels = ["Apple", "Banana", "Orange"];
let currentClass = null;
let interval;

// Setup Webcam
async function setupWebcam() {
  const webcamElement = document.getElementById('webcam');
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  });
  webcamElement.srcObject = stream;

  return new Promise(resolve => {
    webcamElement.onloadedmetadata = () => resolve(webcamElement);
  });
}

// Load MobileNet
async function loadModel() {
  net = await mobilenet.load();
  console.log("MobileNet loaded");
}

// Init
async function init() {
  webcam = await setupWebcam();
  await loadModel();
}
init();

// Select Class
function setClass(name) {
  currentClass = name;
  document.getElementById("classList").innerText = `Current Class: ${name}`;
}

// Capture Image
function capture() {
  if (!currentClass) {
    alert("Select a class first!");
    return;
  }

  const activation = net.infer(webcam, true);
  dataset[currentClass].push(activation);

  console.log(`Captured ${currentClass}: ${dataset[currentClass].length}`);
}

// Train Model (with validation split)
async function train() {

  let trainXs = [];
  let trainYs = [];
  let testXs = [];
  let testYs = [];

  labels.forEach((label, index) => {
    const data = dataset[label];

    if (!data || data.length < 5) {
      alert(`Capture at least 5 images for ${label}`);
      return;
    }

    const splitIndex = Math.floor(data.length * 0.8);

    const trainData = data.slice(0, splitIndex);
    const testData = data.slice(splitIndex);

    trainData.forEach(d => {
      trainXs.push(d);
      trainYs.push(index);
    });

    testData.forEach(d => {
      testXs.push(d);
      testYs.push(index);
    });
  });

  if (trainXs.length === 0) {
    alert("No training data available!");
    return;
  }

  const xsTrain = tf.concat(trainXs);
  const ysTrain = tf.oneHot(tf.tensor1d(trainYs, 'int32'), labels.length);

  classifier = tf.sequential();

  classifier.add(tf.layers.dense({
    inputShape: [xsTrain.shape[1]],
    units: 100,
    activation: 'relu'
  }));

  classifier.add(tf.layers.dense({
    units: labels.length,
    activation: 'softmax'
  }));

  classifier.compile({
    optimizer: tf.train.adam(0.0001),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  });

  document.getElementById("results").innerText = "Training... ⏳";

  await classifier.fit(xsTrain, ysTrain, {
    epochs: 20,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        document.getElementById("results").innerText =
          `Epoch ${epoch + 1} | Loss: ${logs.loss.toFixed(4)}`;
      }
    }
  });

  document.getElementById("results").innerText = "✅ Training Completed!";
}

// Predict
function predict() {
  if (!classifier) {
    alert("Train model first!");
    return;
  }

  if (interval) clearInterval(interval);

  interval = setInterval(async () => {
    const activation = net.infer(webcam, true);
    const prediction = classifier.predict(activation);

    const result = await prediction.data();
    const maxIndex = result.indexOf(Math.max(...result));

    document.getElementById("results").innerText =
      `Prediction: ${labels[maxIndex]} | Confidence: ${(result[maxIndex] * 100).toFixed(2)}%`;

    const bar = document.getElementById("confidenceBar");
    if (bar) {
      bar.value = result[maxIndex] * 100;
    }

  }, 1000);
}