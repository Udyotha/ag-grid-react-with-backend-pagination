import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
    
ModuleRegistry.registerModules([ AllCommunityModule ]);

const Grid = () => {
  const [rowData, setRowData] = useState([]);
  const [paginationProps, setPaginationProps] = useState({
    limit: 20,
    skip:0
  })

  useEffect(() => {
    setPaginationProps({
      limit: 20,
      skip: 0
    });
  }, []);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products?limit=${paginationProps.limit}&skip=${paginationProps.skip}`).then((response) => {
      const products = response.data.products;
      setRowData(products);
    });
  }, [paginationProps]);

  const columnDefs = [
    { headerName: 'Title', field: 'title', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true },
    { headerName: 'Stock', field: 'stock', sortable: true, filter: true },
  ];

  // Pagination options
  const paginationPageSize = 20; // Number of rows per page
  const defaultColDef = {
    sortable: true,
    filter: true,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={paginationPageSize}
        domLayout='autoHeight'
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default Grid;