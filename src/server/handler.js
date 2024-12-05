const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");
//const storeData = require("../services/storeData");

async function postPredictHandler(request, h) {
  try {
    const { inputText } = request.payload; // Sesuaikan nama input dengan kode sebelumnya
    const { model } = request.server.app;

    // Validasi input dari payload
    if (!inputText || typeof inputText !== "string") {
      return h
        .response({
          status: "fail",
          message: "Input teks tidak valid. Pastikan Anda mengirimkan string berisi 3 angka yang dipisahkan spasi.",
        })
        .code(400);
    }

    const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, input_layer);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
      id: id,
      result: label,
      explanation: explanation,
      suggestion: suggestion,
      confidenceScore: confidenceScore,
      createdAt: createdAt,
    };

    //await storeData(id, data);

    const response = h.response({
      status: "success",
      message: confidenceScore > 99 ? "Model is predicted successfully." : "Model is predicted successfully but under threshold. Please use the correct picture",
      data,
    });
    response.code(201);
    return response;
  } catch (error) {
    // Tangani error dengan memberikan respon kesalahan
    const response = h.response({
      status: "fail",
      message: `Terjadi kesalahan saat memproses prediksi: ${error.message}`,
    });
    response.code(500);
    return response;
  }
}
module.exports = postPredictHandler;
