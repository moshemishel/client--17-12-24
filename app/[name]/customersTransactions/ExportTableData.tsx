import { useState } from 'react';
import { Box, Button, Paper, Tooltip} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {TransactionData} from '@/types/dashboards/TransactionsTable';
import {type MRT_Row, type MRT_ColumnDef} from 'material-react-table';




const ExportButton = ({ table}: any) => {

  const handleExportRows = (rows: MRT_Row<TransactionData>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = table.getAllColumns().map((column: MRT_ColumnDef<TransactionData>) => column.Header);
  
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });
  
    doc.save('transactions.pdf');
  };


  const [open, setOpen] = useState(false); 

  const toggleMenu = () => {
    setOpen(!open); 
  };

  return (
    <Box sx={{ display: 'inline-block' }}>
      <Button onClick={toggleMenu} 
      sx={{
        color: open ? 'primary.main' : 'text.secondary', 
        backgroundColor: open ? 'primary.light' : 'transparent', 
        '&:hover': {
          backgroundColor: open ? 'primary.main' : 'transparent', 
        },
        boxSizing: '2px',
      }}>
        <Tooltip 
            title={open ? 'Hide download menu' : 'Show download menu'}  
            >
                <FileDownloadIcon />
        </Tooltip>
      </Button> 
      
      {open && (
        <Paper>
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            padding: '8px',
            flexWrap: 'wrap',
            marginTop: '0', 
            position: 'absolute', 
            left: '8%', 
            top: '5px', 
            marginLeft: '8px', 
          }}
        >

          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export All Rows
          </Button>

          <Button
            disabled={table.getRowModel().rows.length === 0}
            onClick={() => handleExportRows(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export Page Rows
          </Button>

          <Button
            disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export Selected Rows
          </Button>

        </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ExportButton;
