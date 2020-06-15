const Table = require("../models/tables.model.js");
const multer = require('multer');

let path = 'public';

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

let uploadFile = multer({ storage: storage }).array('file');

exports.bulkCreate = (req, res) => {
  const csvFilePath= path + '/' + req.body.filename;
    csvFilePath.toString();
    Table.bulkCreate(req, csvFilePath, req.body.filename, (err, data) => {
      console.log(data);
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while sending data.",
        });
      else res.send(data);
    });
};

exports.upload = (req, res) => {
  uploadFile(req, res, (err)=> {
    if(err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }

    return res.status(200).send(req.file)
  })
}

exports.createTable = async (req, res) => {

  const csv = require('csv-parser');
  const fs = require('fs');

  const csvFilePath= path + '/' + req.body.filename;
    csvFilePath.toString();


  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('headers', (headers) =>  {
      Table.createTable(headers, req.body.filename, (err, data) => {
        console.log("MIL", data);
        if (err)
          res.status(500).send({
            message: err.message || "Some error",
          });
        else
          res.send({message: "Done"});
      })
    } )
}

exports.findAll = (req, res) => {
  Table.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers data.",
      });
    else res.send(data);
  });
};

