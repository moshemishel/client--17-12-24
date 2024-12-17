export type TransactionData = {
    id: number, //id of transaction
    storeName: string;
    idStore: string,
    time: string; // Date and Time in format  ISO 8601 
    transactionAmount: number; // Total transaction amount
    currency: string; // Currency code (e.g., USD, EUR)
    status: number; // Status of transaction
    lastFourDigits: number;
    type: "Debit" | "Credit"; // Transaction type: Debit or Credit
    installments: number; // Number of installments
    firstPayment: number; // Amount for the first payment
    subsequentPayments: number; // Amount for each subsequent payment
  }



export type MetaDataItem = {
    title: string;
    total: number;
    count: number;
    color: string;
  };
