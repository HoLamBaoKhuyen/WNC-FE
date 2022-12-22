import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "axios";

const Create = () => {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<number>(1);
  const { id } = useParams();

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/users/${id}`)
  //     .then((response) => {
  //       console.log(response);
  //       setUser(response.data[0]);
  //     })
  //     .catch((error) => {
  //       // handle error
  //       console.log(error);
  //     });
  // }, [id]);

  const handleGenderChange = (e: any) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    getData(name, gender);
  };

  const getData = (name: string, gender: number) => {
    console.log(name, gender);
    axios
      .post(`http://localhost:3001/users`, {
        name: name,
        gender: gender,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Box component="form" onSubmit={(e) => handleSubmit(e)}>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
      />
      <FormControl>
        <Select
          value={gender}
          label="Age"
          onChange={(e) => handleGenderChange(e)}
        >
          <MenuItem value={1}>Nam</MenuItem>
          <MenuItem value={0}>Nữ</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit">Submit</Button>
    </Box>
  );
};

export default Create;
