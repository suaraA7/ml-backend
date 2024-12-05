const postPredictHandler = require("../server/handler");

const routes = [
  {
    path: "/predict",
    method: "POST",
    handler: postPredictHandler,
    // options: {
    //   payload: {
    //     parse: true, // Mengaktifkan parsing data
    //     allow: "multipart/form-data", // Mengizinkan form-data
    //     output: "data", // Mengatur agar data form tersedia di request.payload
    //   },
    // },
  },
  // {
  //   path: "/predict/histories",
  //   method: "GET",
  //   handler: getPredictHistories,
  // },
];

module.exports = routes;
