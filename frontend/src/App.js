import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/protected">Protected</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/protected" element={<ProtectedComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
