import { useEffect, useState } from "react";
import { Box, TableContainer } from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>();
  const [account, setAccount] = useState<any>();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/accounts/${id}`)
      .then((response) => {
        console.log(response.data[0]);

        setAccount(response.data[0]);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/transactions/${id}`)
      .then((response) => {
        console.log(response.data);

        setTransactions(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  if (transactions)
    return (
      <Box sx={{ height: "100vh" }}>
        <Container sx={{ paddingTop: "100px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Sender</StyledTableCell>
                  <StyledTableCell>Receiver</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Time</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((a) => (
                  <StyledTableRow key={a.id}>
                    <StyledTableCell component="th" scope="row">
                      {a.id}
                    </StyledTableCell>
                    <StyledTableCell>{account.account_no}</StyledTableCell>
                    <StyledTableCell>{a.account_no}</StyledTableCell>
                    <StyledTableCell>{a.amount}</StyledTableCell>
                    <StyledTableCell>
                      {formatDate(a.trans_time)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    );
  return <CircularProgress />;
};

export default Transactions;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F5f5f5",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const formatDate = (d: string) => {
  const event = new Date(d);
  return event.toLocaleDateString();
};
