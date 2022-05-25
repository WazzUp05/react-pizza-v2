import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    {/* <Home /> */}
                    <NotFound />
                </div>
            </div>
        </div>
    );
}

export default App;
