import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "axios";

const OFP = () => {
  const [sender, setSender] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [senderBalance, setSenderBalance] = useState<number>(0);
  const [receiverBalance, setReceiverBalance] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [accounts, setAccounts] = useState<any[]>();

  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:3001/accounts")
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    axios
      .get(`http://localhost:3001/accounts/${id}`)
      .then((response) => {
        setSender(response.data[0].id);
        setSenderBalance(response.data[0].balance);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  const handleSenderChange = (e: any) => {
    setSender(e.target.value);
  };
  const handleReceiverChange = (e: any) => {
    setReceiver(e.target.value);
    axios
      .get(`http://localhost:3001/accounts/${e.target.value}`)
      .then((response) => {
        setReceiverBalance(response.data[0].balance);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    getData(sender, receiver, amount);
    return <Navigate to={`/transactions/${id}`} />;
  };

  const getData = (sender: string, receiver: string, amount: number) => {
    axios
      .post(`http://localhost:3001/ofp`, {
        _from: sender,
        _to: receiver,
        amount,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .patch(`http://localhost:3001/accounts/${sender}`, {
        balance: senderBalance - amount,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .patch(`http://localhost:3001/accounts/${receiver}`, {
        balance: receiverBalance + amount,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => handleSubmit(e)}
      sx={{
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        paddingTop: "60px",
      }}
    >
      <FormControl required sx={{ m: 2 }}>
        <Select
          disabled
          label="Sender"
          value={sender}
          onChange={(e) => handleSenderChange(e)}
          sx={{ color: "#000" }}
        >
          <MenuItem value="none"></MenuItem>
          {accounts &&
            accounts.map((a) => (
              <MenuItem key={a.id} value={a.id}>
                {a.account_no}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl required sx={{ m: 2 }}>
        <Select
          label="Receiver"
          value={receiver}
          onChange={(e) => handleReceiverChange(e)}
        >
          {accounts &&
            accounts
              .filter((a) => a.id !== sender)
              .map((a) => (
                <MenuItem key={a.id} value={a.id}>
                  {a.account_no}
                </MenuItem>
              ))}
        </Select>
      </FormControl>

      <TextField
        required
        sx={{ m: 2 }}
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
        variant="outlined"
      />
      <Button variant="contained" type="submit">
        Make an OFP
      </Button>
    </Box>
  );
};

export default OFP;
