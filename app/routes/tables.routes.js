module.exports = app => {
  const tables = require("../controllers/tables.controller.js");

  app.post("/bulkcreate", tables.bulkCreate);

  app.post("/upload", tables.upload);

  app.post('/createTable', tables.createTable);

  app.get("/alltables", tables.findAll);
};
