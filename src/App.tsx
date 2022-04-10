import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Permit Signer
      </header>
      <form style={{width: "50%"}}>
          <div className="form-group">
            <label htmlFor="permitNameInput" style={{display: "flex", alignItems: "left"}}>Permit Name</label>
            <input className="form-control" id="permitNameInput" aria-describedby="permitName" placeholder="permit123" />
          </div>
          <div className="form-group">
              <label htmlFor="addressInput"  style={{display: "flex", alignItems: "left"}}>Address</label>
              <input className="form-control" id="addressInput" aria-describedby="address" placeholder="secret1..." />
          </div>
              <label htmlFor="permissionsInput"  style={{display: "flex", alignItems: "left"}}>Permissions</label>
              <input className="form-control" id="permissionsInput" aria-describedby="permissions" placeholder="owner, balance, ..." />
          <div className="form-group">
          </div>
          <div className="form-group">
              <label htmlFor="memoInput"  style={{display: "flex", alignItems: "left"}}>Memo</label>
              <input className="form-control" id="memoInput" aria-describedby="memo" placeholder="" />
          </div>
          <div className="form-group">
              <label htmlFor="chainIdInput"  style={{display: "flex", alignItems: "left"}}>Chain ID</label>
              <input className="form-control" id="chainIdInput" aria-describedby="chainId" placeholder="secret-4" />
          </div>
          <button type="submit" className="btn btn-primary">Sign</button>
      </form>
    </div>
  );
}

export default App;
