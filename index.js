const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const sql = require("mssql");
const config = require("./config");

app.get("/api", (req, res) => {
  console.log("Get API");
});

app.use("/", express.static("public"));
app.use(express.json());

app.post("/api", (req, res) => {
  const conn = sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    request.query("select * from credenciales", (err, { recordset }) => {
      if (err) console.log(err);
      console.log(recordset);
      let login = false;
      if (
        recordset[0].UserName === req.body.user &&
        recordset[0].Pass === req.body.pass
      ) {
        login = true;
      }
      res.json({
        login: login,
      });
    });
  });
  console.log("Post API");
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
