const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");

async function predictClassification(model, inputText) {
  try {
    // Validasi: Input harus berupa 3 angka yang dipisahkan oleh spasi
    const inputArray = inputText.split(" ").map(parseFloat);
    if (inputArray.length !== 3 || inputArray.some(isNaN)) {
      throw new InputError("Input harus terdiri dari 3 angka yang valid dan dipisahkan oleh spasi.");
    }

    // Bentuk tensor dengan shape [1, 3] (batch size = 1)
    const inputTensor = tf.tensor2d([inputArray], [1, 3]);

    // Validasi: Pastikan model tersedia
    if (!model || typeof model.predict !== "function") {
      throw new Error("Model tidak valid atau belum dimuat.");
    }

    // Prediksi menggunakan model
    const prediction = model.predict(inputTensor);

    // Ambil hasil prediksi sebagai array
    const score = await prediction.data();
    inputTensor.dispose(); // Membersihkan tensor input
    prediction.dispose(); // Membersihkan tensor hasil prediksi

    // Definisi kelas output model
    const classes = ["Kelas 1", "Kelas 2", "Kelas 3", "Kelas 4"];

    // Tentukan confidence score dan label prediksi
    const confidenceScore = Math.max(...score) * 100;
    const classIndex = score.indexOf(Math.max(...score));
    const label = classes[classIndex];

    // Penjelasan hasil prediksi
    const explanation = `Model memprediksi kelas: ${label}`;
    const suggestion = `Confidence: ${confidenceScore.toFixed(2)}%. Pastikan input valid.`;

    return { confidenceScore, label, explanation, suggestion };
  } catch (error) {
    // Penanganan error
    if (error instanceof InputError) {
      throw error;
    }
    throw new InputError(`Terjadi kesalahan saat memproses prediksi: ${error.message}`);
  }
}

module.exports = predictClassification;
