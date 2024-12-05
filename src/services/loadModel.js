const tf = require("@tensorflow/tfjs-node");

async function loadModel() {
  //return tf.loadLayersModel(process.env.MODEL_URL);
  const modelUrl = "file://models/model.json";
  console.log("Loading model from URL:", modelUrl);
  try {
    const model = await tf.loadLayersModel(modelUrl);
    console.log("Model successfully loaded!");
    return model;
  } catch (error) {
    console.error("Error loading model:", error);
  }
}
module.exports = loadModel;
