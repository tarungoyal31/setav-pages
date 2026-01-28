import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Terms from "./pages/Terms.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import CSAE from "./pages/CSAE.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/csae" element={<CSAE />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
