const sql = require("./db.js");


const Table = function(table) {
  this.table_id = table.id;
};

Table.createTable = (headers,filename, result) => {
  console.log(filename)
  filename = filename.split(' ').join('_')
  filename = filename.slice(0,filename.length-4);
  console.log(filename);
  var fields = '';
  var fieldnms = '';
  var qs = '';
  headers.forEach(hdr => {
      hdr = hdr.replace(' ', '_');
      if (fields !== '') fields += ',';
      if (fieldnms !== '') fieldnms += ','
      if (qs !== '') qs += ',';
      fields += ` ${hdr} TEXT`;
      fieldnms += ` ${hdr}`;
      qs += ' ?';
  });
  sql.query(`CREATE TABLE IF NOT EXISTS ${filename} ( ${fields} )`,
  [ ], (err,res) => {
    if (err) {
      result(err, null);
      return;
    }
    console.log("created table: ", {name: filename})
    result(null, {name: filename, status: 'Success'})
  })
}


Table.bulkCreate = (req, path, filename, result) =>{
  filename = filename.split(' ').join('_')
  filename = filename.slice(0,filename.length-4);

  path.toString();
  console.log("\n\n" + path + "\n\n");
  sql.query(`LOAD DATA LOCAL INFILE ? INTO TABLE ${filename} FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'`, [path],(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      console.log("created customer: ", { id: res.insertId, number_of_records: req.length });
      result(null, {records:req.length, status:'Sucess'});
    });
};

Table.getAll = result => {
  sql.query("SELECT * FROM anytable", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

module.exports = Table;
