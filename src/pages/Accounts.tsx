import { useEffect, useState } from "react";
import { Box, TableContainer } from "@mui/material";
import axios from "axios";

import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

const Accounts = () => {
  const [accounts, setAccounts] = useState<any[]>();
  const [buttonClick, setClick] = useState<number>(0);
  useEffect(() => {
    axios
      .get("http://localhost:3001/accounts")
      .then((response) => {
        console.log(response);

        setAccounts(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, [buttonClick]);


  if (accounts)
    return (
      <Box sx={{ height: "100vh" }}>
        <Container sx={{ paddingTop: "100px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Account</StyledTableCell>
                  <StyledTableCell>Owner</StyledTableCell>
                  <StyledTableCell>Balance</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts.map((a) => (
                  <StyledTableRow key={a.id}>
                    <StyledTableCell component="th" scope="row">
                      {a.id}
                    </StyledTableCell>
                    <StyledTableCell>{a.account_no}</StyledTableCell>
                    <StyledTableCell>{a.owner}</StyledTableCell>
                    <StyledTableCell>{a.balance}</StyledTableCell>
                    <StyledTableCell>
                      <Link to={`/ofp/${a.id}`}>Make an OFP</Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Link to={`/transactions/${a.id}`}>
                        View transactions
                      </Link>
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

export default Accounts;

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

