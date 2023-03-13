import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import axios from "axios";


function App() {
  // You will need to use more of these!
  const [rowsPerPage, setRowsPerPage] = React.useState(10); // set how many rows per page
  const [page, setPage] = React.useState(0);  // set page
  const [table, setTable] = useState<Array<any>>([]); // table state

  let rows : Array<any> = [];  // save grid table rows

  // handle data grid change page
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  // handle data grid change rows per page
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios(`https://warehousejs.azurewebsites.net/api/HttpTriggerGet?code=LKizu74xB22pCTSwToVvv207SozXfCsP7vQkBjGZLa4OAzFu8CahUg==&ShipperID=${inputValue}`);
      // setData(response.data);
      console.log(response.data);
      rows = response.data.map((item: { Date: any; WarehouseID: any; ShippingPO: any; ShipmentID: any; BoxesRcvd: any; ShipperID: any; }) => {
        // console.log(item)
        return {
          Date: item.Date,
          WarehouseID: item.WarehouseID,
          ShippingPO: item.ShippingPO,
          ShipmentID: item.ShipmentID,
          BoxesRcvd: item.BoxesRcvd,
          ShipperID: item.ShipperID
        }
      });
      setTable(rows);
    } catch (error) {
      console.error(error);
    }
    setTable(rows);

  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Assignment 4
          </Typography>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            Search
          </Typography>
                  <div>
              <input type="text" value={inputValue} onChange={handleInputChange} />
              <p>The input value is: {inputValue}</p>
              <p>e.g. S1</p>
              <button onClick={handleButtonClick}>Search</button>
            </div>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Final Grades
          </Typography>
          <TableContainer>
            <Table sx={{minWidth:650}} arail-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="left">WarehouseID</TableCell>
                  <TableCell align="left">ShippingPO</TableCell>
                  <TableCell align="left">ShipmentID</TableCell>
                  <TableCell align="left">BoxesRcvd</TableCell>
                  <TableCell align="left">ShipperID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {table.map((row) => (
                  <TableRow
                    // key = {row.studentId}
                    sx ={{ '&:last-child td, &:last-child th': { border:0}}}>
                      <TableCell component="th" scope="row">
                        {row.Date}
                      </TableCell>
                      <TableCell align="left">{row.WarehouseID}</TableCell>
                      <TableCell align="left">{row.ShippingPO}</TableCell>
                      <TableCell align="left">{row.ShipmentID}</TableCell>
                      <TableCell align="left">{row.BoxesRcvd}</TableCell>
                      <TableCell align="left">{row.ShipperID}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination rowsPerPageOptions={[5, 25, 100]}
            component="div"
            count={table.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
