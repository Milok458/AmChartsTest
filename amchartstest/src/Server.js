//Creating express application
const express = require('express');
const app = express();


// Setting express connection to mssql
app.get("/", (request, response) =>{
    const sql = require("mssql");

    //Database configuration
    const config = {
        user: "sa",
        password: "lepanto",
        server:"localhost",
        database:"NodeTesting"
    }


    //MMSQL connection
    //Connect method requires the previsouly created config object
    //Second argument is the error object of the connection (if exists).
    sql.connect(config, (error) =>{
        if(error)
            console.log(error)
        
        //MSSQL Request Object Declaration
        request = new sql.Request();

        const QUERY = "SELECT first_name FROM MOCK WHERE gender = 'female';";
        
        //Requesting data from a MSSQL TABLE
        //Request.query() method requires the query string, the second parameter is
        //how errors are going to be handled (if any) and 'recordset' is the
        //corresponding result from the query (if valid). 
        request.query(QUERY, (error, result) =>{
            if(error)
                console.log("Query Error: " + error)
            
            response.send(result.recordset);
        });

    }) 

});

const server = app.listen(5000,()=>{
    console.log("Server is listening on port 5000");
});