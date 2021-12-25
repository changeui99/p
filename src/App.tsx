import './App.css';

import PatientList from './components/patientList'
import PatientChart from './components/patientChart'

function App() {
  const api = "" //enter the api

  return (
    <div className="App">
      <div className="main_container">
        <PatientChart api={api}/>
        <PatientList api={api}/>
      </div>
    </div>
  );
}

export default App;
