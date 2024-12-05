const tf = require("@tensorflow/tfjs-node");
async function loadModel() {
  //return tf.loadLayersModel(process.env.MODEL_URL);
  console.log("Loading model from URL:", process.env.MODEL_URL);
  try {
    const model = await tf.loadLayersModel(process.env.MODEL_URL);
    console.log("Model successfully loaded!");
    return model;
  } catch (error) {
    console.error("Error loading model:", error);
  }
}
module.exports = loadModel;
