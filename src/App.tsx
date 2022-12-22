import { Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import OFP from "./pages/OFP";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Accounts />} />
      <Route path="/transactions/:id" element={<Transactions />} />
      <Route path="/ofp/:id" element={<OFP />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
}

export default App;
