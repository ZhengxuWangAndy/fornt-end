import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import axios from "axios";
import Swal from 'sweetalert2'



function App() {
  // You will need to use more of these!
  const [rowsPerPage, setRowsPerPage] = React.useState(10); // set how many rows per page
  const [page, setPage] = React.useState(0);  // set page
  const [table, setTable] = useState<Array<any>>([]); // table state

  let rows : Array<any> = [];  // save grid table rows


  const [warehouseIDValue, setWarehouseIDValue] = useState('');
  const [shippingPOValue, setShippingPOValue] = useState('');
  const [shipmentIDValue, setShipmentIDValue] = useState('');
  const [boxesRcvdValue, setBoxesRcvdValue] = useState('');
  const [shipperIDValue, setShipperIDValue] = useState('');



  
  const handleWarehouseIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWarehouseIDValue(e.target.value);
  };

  const handleShippingPOChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingPOValue(e.target.value);
  };

  const handleShipmentIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipmentIDValue(e.target.value);
  };

  const handleBoxesRcvdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoxesRcvdValue(e.target.value);
  };

  const handleShipperIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipperIDValue(e.target.value);
  };

  const handlePostButtonClick = () => {
    // Validate that none of the input values are empty
    if (!warehouseIDValue || !shippingPOValue || !shipmentIDValue || !boxesRcvdValue || !shipperIDValue) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all input fields!',
      })
      return;
    }



    // Call POST API with input values
    const postApi = async () => {
      const key = await import('./key.json');
      // console.log(key.value);

      const url = "https://warehousejs.azurewebsites.net/api/HttpTriggerPost?code=" + key.value;
      const body = {
        "WarehouseID": warehouseIDValue,
        "ShippingPO": shippingPOValue,
        "ShipmentID": shipmentIDValue,
        "BoxesRcvd": boxesRcvdValue,
        "ShipperID": shipperIDValue
      };
    
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
    
      const data = await response.status;

      if(data === 200){
        Swal.fire(
          'Good job!',
          'Post Successed!',
          'success'
        )
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Post failed!',
        })
      }
    
      // console.log(data);
    };

    postApi();

  };


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
    const key = await import('./key.json');
    try {
      const response = await axios(`https://warehousejs.azurewebsites.net/api/HttpTriggerGet?code=${key.value}&ShipperID=${inputValue}`);
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
    if (rows.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No this shipper id in DB!',
      })
    }

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
        <div>
        <Typography variant="h4" gutterBottom>
            Post
          </Typography>
      <label>
        WarehouseID:
        <input type="text" value={warehouseIDValue} onChange={handleWarehouseIDChange} />
      </label>
      <br />
      <label>
        ShippingPO:
        <input type="text" value={shippingPOValue} onChange={handleShippingPOChange} />
      </label>
      <br />
      <label>
        ShipmentID:
        <input type="text" value={shipmentIDValue} onChange={handleShipmentIDChange} />
      </label>
      <br />
      <label>
        BoxesRcvd:
        <input type="text" value={boxesRcvdValue} onChange={handleBoxesRcvdChange} />
      </label>
      <br />
      <label>
        ShipperID:
        <input type="text" value={shipperIDValue} onChange={handleShipperIDChange} />
      </label>
      <br />
      <button onClick={handlePostButtonClick}>Post</button>
    </div>
        
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
