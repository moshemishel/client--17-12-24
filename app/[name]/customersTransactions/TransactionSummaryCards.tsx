import { Box, Card, Typography, Paper } from "@mui/material";
import {TransactionData, MetaDataItem} from '@/types/dashboards/TransactionsTable';




export const processMetaData = (data: TransactionData[]) => {
        
  let verifiedCredits: MetaDataItem  = {title: 'verified Credits' ,total: 0, count: 0, color: "#4CAF50"}
  let verifiedDebit: MetaDataItem = {title: 'verified Debits' ,total: 0, count: 0, color: "#2196F3"};
  let rejectedDebit: MetaDataItem = {title: 'rejected Debits',total: 0, count: 0, color: "#FFC107"};
  let rejectedCredits: MetaDataItem = {title: 'rejected Credits',total: 0, count: 0, color: "#F44336"};
  
  data.forEach((transaction)=> {
      let temp: MetaDataItem | undefined;
      if (transaction.status == 0){
          if (transaction.type === 'Credit'){temp = verifiedCredits} 
          else if (transaction.type == 'Debit'){temp = verifiedDebit}
        }
          else if (transaction.type === 'Credit') {temp = rejectedCredits}
          else if (transaction.type == 'Debit'){temp = rejectedDebit};
      
      if (temp) {
          temp.total += transaction.transactionAmount;
          temp.count += 1;
      }
  });
  
  return [verifiedCredits, verifiedDebit, rejectedCredits, rejectedDebit]
};

type TransactionSummaryCardsProps = {
  metaData: MetaDataItem[];
};

export const TransactionSummaryCards: React.FC<TransactionSummaryCardsProps> = ({ metaData }) => {
  return (
    <Paper sx={{ width: '100%'}}>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      sx={{ gap: '10px' }} 
    >
      {metaData.map((item, index) => (
        <Card
          key={index}
          sx={{
            backgroundColor: item.color,
            color: "#fff",
            height: "15vh",
            flex: "1 1 calc(25% - 10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: '0', 
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              padding: "15px",
              width: "90%", 
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontSize: "clamp(1rem, 1.2vw, 1.4rem)",
                margin: "0 0 5px 0", 
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                margin: "0 0 5px 0",
              }}
            >
              {parseFloat(item.total.toFixed(1))} USD
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "clamp(0.8rem, 1vw, 1rem)",
                margin: "0",
              }}
            >
              {item.count} Transactions
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  </Paper>
  );
};

