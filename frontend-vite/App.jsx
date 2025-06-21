import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShowContact from './pages/ShowContact';
import AllContacts from './pages/AllContacts';
import DeletedContacts from './pages/DeletedContacts';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show" element={<ShowContact />} />
        <Route path="/all" element={<AllContacts />} />
        <Route path="/deleted" element={<DeletedContacts />} />
      </Routes>
    </Router>
  );
}
export default App;