import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import Button from "@material-ui/core/Button"
import Modal from "./modal.js";
import "./styles.css";
import dataSource from './data.json'

const AdvancedPaginationTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState("Max Bid");
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const big_data = useRef([]);
  const small_data = useRef([]);

  const fetchUsers = async () => {
    setLoading(true);

    // const response = await axios.get(
    //   // `https://reqres.in/api/users`
    //   `https://nex-g.herokuapp.com`,
    //   {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*"
    //     }
    //   }
    // );
    const response = dataSource;
    console.log("I am  here")
    console.log(response.data);
    big_data.current = JSON.parse(JSON.stringify(response.Data));
    small_data.current = JSON.parse(JSON.stringify(response.Data));
    big_data.current.forEach((item) => {
      item.Customer.bid = Math.max(...item.Customer.bids)
    });
    small_data.current.forEach((item) => {
      item.Customer.bid = Math.min(...item.Customer.bids)
    });
    // setData(response.data.Data);
    setData(big_data.current);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeB = () => {
    if(button === "Min Bid"){
      setButton("Max Bid");
      setData(big_data.current);
    }
    else{
      setButton("Min Bid");
      setData(small_data.current);
    }
  };

  const onRowClicked = (row, event) => { 
    console.log("iiieeeeee")
    console.log(row)
    console.log(event)
    setModalData(row.Bid);
    handleOpenModal();
  };

  const Avatar = ({ row }) => (
    <img height="48px" width="48px" src={row.Customer.avatarUrl} alt=""/>
  );

  const handleOpenModal = () => {
    setOpen(!open);
  };


  const columns = useMemo(
    () => [
      {
        name: "Customer Name",
        selector: `Customer.firstname`,
        cell:  row => <div className="avatarname"><Avatar row={row} /> {row.Customer.firstname} {row.Customer.lastname}</div>,
        sortable: false
      },
      {
        name: "Email",
        selector: 'Customer.email',
        sortable: false
      },
      {
        name: "Phone",
        selector: "Customer.phone",
        sortable: false
      },
      {
        name: "Premium",
        selector: "Customer.hasPremium",
        sortable: false
      },
      {
        name: button,
        selector: "Customer.bid",
        cell: row => <div>{Math.max(...row.Customer.bids)}</div>,
        sortable: true
      }
    ],
  );


  return (
    <>
    <DataTable
      title="Customers"
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      subHeader
      subHeaderComponent={
        <Button variant="contained" color="primary" onClick={changeB}>
          {button}
        </Button>
      }
      onRowClicked={onRowClicked}
    />
    <Modal
      isOpen={open}
      onRequestClose={handleOpenModal}
      data={modalData}
    />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <AdvancedPaginationTable />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
