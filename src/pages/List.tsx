import { useEffect, useState } from "react";
import { Box, Card } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const List = () => {
  const [users, setUser] = useState<any[]>();
  const [buttonClick, setClick] = useState<number>(0);
  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        console.log(response);

        setUser(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, [buttonClick]);

  const handleDeleteItem = (id: any) => {
    axios
      .delete(`http://localhost:3001/users/${id}`)
      .then((response) => {
        console.log(response);
        setClick(buttonClick + 1);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  return (
    <Box>
      <Link to="/create">
        <Button variant="contained">Add</Button>
      </Link>
      {users &&
        users.length !== 0 &&
        users.map((a: any, idx: number) => (
          <Box key={idx}>
            <Link to={`/edit/${a.id}`}>
              <Button variant="outlined">{a.name}</Button>
            </Link>{" "}
            <Button
              color="error"
              variant="outlined"
              onClick={() => handleDeleteItem(a.id)}
            >
              Delete
            </Button>
          </Box>
        ))}
    </Box>
  );
};

export default List;
