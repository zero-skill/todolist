import Heading from "./components/heading";
import TaskList from "./components/tasklist";

function App() {
    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <div className="col-7 m-auto mt-3 d-flex justify-content-center">
                        <Heading />
                    </div>
                </div>
                <div className="row">
                    <div className="col-7 mt-2 m-auto d-flex justify-content-center">
                        <TaskList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
