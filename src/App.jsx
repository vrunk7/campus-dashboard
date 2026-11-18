
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/Overview";
import StudentRecords from "./pages/StudentRecords";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/students" element={<StudentRecords />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
