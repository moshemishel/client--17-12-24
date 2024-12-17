'use client';
import {useState, useEffect, useMemo, } from 'react';
import {
    MaterialReactTable, 
    useMaterialReactTable, 
    type MRT_ColumnDef,
    type MRT_Cell
} from 'material-react-table';
import {TransactionSummaryCards, processMetaData} from './TransactionSummaryCards';
import ExportButton from './ExportTableData';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import {TransactionData, MetaDataItem} from '@/types/dashboards/TransactionsTable';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

function TransactionsTable(){

    const [data, setData] =  useState<TransactionData[]>([]);
    const [metaData, setMetaData] = useState<MetaDataItem[]>(processMetaData(data));
   

  //   useEffect(() => {
  //     async function fetchDeals() {
  //         try {
  //             const response = await fetch('https://b625-2a01-6502-a56-46b9-00-1.ngrok-free.app/Transactions', {
  //                 method: 'GET',
  //                 mode: 'no-cors',
  //                 headers: {
  //                     'Content-Type': 'application/json',
  //                 },
  //             });

  //             if (!response.ok) {
  //                 throw new Error(`HTTP error! status: ${response.status}`);
  //             }
  //             console.log("response", response);
              
  //             const result = await response.json();
  //             console.log('Response Data:', result);
  //             setData(result); // שמירת המידע ב-state
              
  //         } catch (error) {
  //             console.error('Fetch Error:', error.message);
  //         }
  //     }

  //     fetchDeals();
  // }, []); // הפעלה פעם אחת בלבד

    
    
  const generateRandomTransactions = (num: number): TransactionData[] => {
    const randomStores = ["Store X", "Store Y", "Store Z", "Super A", "Mega B"];
    const currencies = ["USD", "EUR", "GBP"];
    const types = ["Credit", "Debit"] as const;
  
    return Array.from({ length: num }, (_, i) => {
      const storeName = randomStores[Math.floor(Math.random() * randomStores.length)];
      const idStore = `ID-${Math.floor(1000 + Math.random() * 9000)}`;
      const transactionAmount = parseFloat((Math.random() * 1000).toFixed(2));
      const installments = Math.random() > 0.7 ? Math.ceil(Math.random() * 5) : 1;
      const firstPayment = installments > 1 ? parseFloat((Math.random() * 100).toFixed(2)) : transactionAmount;
      const subsequentPayments = installments > 1 
        ? parseFloat(((transactionAmount - firstPayment) / (installments - 1)).toFixed(2)) 
        : 0;
  
      return {
        id: i + 1, // ID רץ
        storeName,
        idStore,
        time: dayjs().subtract(i, "days").toISOString(),
        transactionAmount,
        currency: currencies[Math.floor(Math.random() * currencies.length)],
        status: Math.random() > 0.5 ? 1 : 0,
        lastFourDigits: Math.floor(1000 + Math.random() * 9000),
        type: types[Math.floor(Math.random() * types.length)],
        installments,
        firstPayment,
        subsequentPayments,
      };
    });
  };
  
    const randomTransactions = generateRandomTransactions(30);
    console.log(randomTransactions);
    
    useEffect(()=>setData(randomTransactions), [])
    

  
  



    const columns = useMemo<MRT_ColumnDef<TransactionData>[]>(
        ()=>[
            {
            accessorKey: 'storeName',
            header: 'Store Name',
            size: 150,
            },
            {
              accessorFn: (originalRow) => {
                // ממיר את השדה `time` לאובייקט dayjs ומחזיר את הפורמט DD/MM/YYYY
                return dayjs(originalRow.time).format('DD/MM/YYYY');
              },
              accessorKey: 'date', // שם השדה החדש בטבלה
              header: 'Date',
              size: 110,
              filterVariant: 'date-range',
              filterFn: (row, columnId, filterValue) => {
                const rowDateStr = row.getValue(columnId) as string; // השגת הערך בתור מחרוזת
                const rowDate = dayjs(rowDateStr, 'DD/MM/YYYY'); // המרה ל-dayjs
                const [start, end] = filterValue; // טווח תאריכים
                const startDate = dayjs(start, 'DD/MM/YYYY');
                const endDate = dayjs(end, 'DD/MM/YYYY');
                return rowDate.isBetween(startDate, endDate, 'day', '[]'); // בדיקה אם התאריך בטווח כולל הקצוות
              },
              Cell: ({ cell }) => {
                const dateStr = cell.getValue<string>(); // מקבל את התאריך כמחרוזת
                const date = dayjs(dateStr, 'DD/MM/YYYY'); // המרה ל-dayjs
                return date.isValid() ? date.format('DD/MM/YYYY') : ''; // הצגת התאריך בפורמט DD/MM/YYYY אם תקין
              },
            },

{
  accessorFn: (originalRow) => {
    // ממיר את הערך ל-dayjs ומחזיר את הפורמט HH:mm
    return dayjs(originalRow.time).format('HH:mm');
  },
  accessorKey: 'time', // שם השדה החדש שאנחנו רוצים להציג בטבלה
  header: 'Time',
  size: 100,
  filterVariant: 'time-range',
  filterFn: (row, columnId, filterValue) => {
    const timeValue = row.getValue(columnId) as string; // שדה הזמן
    const formattedTime = dayjs(timeValue).format('HH:mm'); // מעצב לפורמט HH:mm
    return (
      formattedTime >= filterValue[0] && formattedTime <= filterValue[1] // משווה לטווח הרצוי
    );
  },
  Cell: ({ cell }) => {
    const timeValue = cell.getValue<string>(); // מקבל את הזמן כמחרוזת
    const time = dayjs(timeValue); // ממיר ל-dayjs
    return time.isValid() ? time.format('HH:mm') : ''; // הצגת השעה בפורמט HH:mm אם התקין
  },
},
            {
            accessorKey: 'transactionAmount',
            header: 'Amount',
            size: 100,
            },
            {
            accessorKey: 'currency',
            header: 'Currency',
            size: 70,
            },
            {
            accessorKey: 'status',
            header: 'Status',
            size: 10,
            },
            {
            accessorKey: 'lastFourDigits',
            header: 'Last 4',
            size: 50,
            },
            {
            accessorKey: 'type',
            header: 'Type',
            size: 70,
            filterVariant: 'checkbox',
            filterFn: (row, columnId, filterValue) => {
              const cellValue = row.getValue(columnId);    
              return filterValue.includes(cellValue); 
              },
            },
            {
            accessorKey: 'installments',
            header: 'Installments',
            size: 10,
            },
            {
            accessorKey: 'firstPayment',
            header: 'First Payment',
            size: 100,
            },
            {
            accessorKey: 'subsequentPayments',
            header: 'Subsequent Payments',
            size: 100,
            },
        ], 
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data, 
        enableColumnFilters: true,
        enableStickyHeader: true,
        columnFilterDisplayMode: 'popover',
        enableRowSelection: true,
        initialState: {
          pagination: {pageSize: 10, pageIndex: 0},
        },
        muiPaginationProps: {
          rowsPerPageOptions: [10, 50, 100],
        },
        renderTopToolbarCustomActions: ({ table }) => (
          <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}>
            <ExportButton table={table} />
          </Box>
          )   
    });
    
    return(
        <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MaterialReactTable table={table}/>
        </LocalizationProvider>
            <TransactionSummaryCards metaData={metaData}/>
        </>
  )};

  export default TransactionsTable;

