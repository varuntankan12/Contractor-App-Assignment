import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";


function App() {

    const isLoggedIn = true;

    return (
        <div className="font-inter">
            <Header isLoggedIn={isLoggedIn} />
            <AppRoutes />
        </div>
    );
}

export default App;
