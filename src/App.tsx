import React, {useState} from 'react';
import logo from './logo.svg';
import {SecretNetworkClient, Permission, Permit, validatePermit} from "secretjs";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Keplr } from "@keplr-wallet/types";


function App() {

    const [chainId, setChainId] = useState<string>("secret-4");
    const [mnemonics, setMnemonics] = useState<string>("");

    const [address, setAddress] = useState<string>("secret1p0vgghl8rw4ukzm7geyy0f0tl29glxrtnlalue");
    //const [memo, setMemo] = useState<string>("");
    const [contract, setContract] = useState<string>("secret1p0vgghl8rw4ukzm7geyy0f0tl29glxrtnlalue");
    const [permissions, setPermissions] = useState<string>("owner");
    const [permitName, setPermitName] = useState<string>("default");
    const [permit, setPermit] = useState<Permit | undefined | string>(undefined);
    //
    // const setPermissionsValidation = (perms: string): Permission[] => {
    //     const strs = perms.split(',');
    //
    //     strs.map(
    //         (str) => {
    //
    //         }
    //     )
    //
    //     return ["owner"]
    // }

    return (
    <div className="App">
      <header className="App-header">
        Permit Signer
      </header>
        <div style={{display: "flex", justifyContent: "space-around"}}>
        <div style={{ width: "50%" }}>
          <form >
              {/*<div className="form-group">*/}
              {/*    <label htmlFor="mnemonics" style={{display: "flex", alignItems: "left"}}>Permit Name</label>*/}
              {/*    <input className="form-control" id="mnemonicsInput" aria-describedby="mnemonics" placeholder="sword board hoard..."*/}
              {/*           onChange={(event) => {*/}
              {/*               if (event?.target?.value) {*/}
              {/*                   setMnemonics(event.target.value)*/}
              {/*               }*/}
              {/*           }}*/}
              {/*    />*/}
              {/*</div>*/}
              <div className="form-group">
                <label htmlFor="permitNameInput" style={{display: "flex", alignItems: "left"}}>Permit Name</label>
                <input className="form-control" id="permitNameInput" aria-describedby="permitName" placeholder="default"
                       onChange={(event) => {
                           if (event?.target?.value) {
                               setPermitName(event.target.value)
                           }
                       }}
                />
              </div>
              <div className="form-group">
                  <label htmlFor="addressInput"  style={{display: "flex", alignItems: "left"}}>Address</label>
                  <input className="form-control" id="addressInput" aria-describedby="address" placeholder="secret1p0vgghl8rw4ukzm7geyy0f0tl29glxrtnlalue"
                         onChange={(event) => {
                             if (event?.target?.value) {
                                 setAddress(event.target.value)
                             }
                         }}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="setContract"  style={{display: "flex", alignItems: "left"}}>Contract</label>
                  <input className="form-control" id="setContract" aria-describedby="contract" placeholder="secret1p0vgghl8rw4ukzm7geyy0f0tl29glxrtnlalue"
                         onChange={(event) => {
                             if (event?.target?.value) {
                                 setContract(event.target.value)
                             }
                         }}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="permissionsInput"  style={{display: "flex", alignItems: "left"}}>Permissions</label>
                  <input className="form-control" id="permissionsInput" aria-describedby="permissions" placeholder="owner"
                         onChange={(event) => {
                             if (event?.target?.value) {
                                 setPermissions(event.target.value)
                             }
                         }}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="chainIdInput"  style={{display: "flex", alignItems: "left"}}>Chain ID</label>
                  <input className="form-control" id="chainIdInput" aria-describedby="chainId" placeholder="secret-4"
                    onChange={(event) => {
                        if (event?.target?.value) {
                            setChainId(event.target.value)
                        }
                    }}
                  />
              </div>

          </form>

        <button type="submit" className="btn btn-primary" onClick={async () => {

            const keplrOfflineSigner = (window as unknown as Keplr).getOfflineSignerOnlyAmino(chainId);

            let accts = await keplrOfflineSigner.getAccounts();

            console.log(accts);
            let secretjs = new SecretNetworkClient({
              url: process.env.REACT_APP_LCD_NODE || "",
              chainId,
              wallet: keplrOfflineSigner,
              walletAddress: address
            });

            console.log(`secretjs: ${secretjs.address}`)
            if (!secretjs) {
                setPermit("Failed to initiate keplr");
            }

            try {
                let permitPermissions = permissions.toLowerCase().split(",") as Permission[];
                let permit = await secretjs.utils.accessControl.permit.sign(
                    address,
                    chainId,
                    permitName,
                    [contract],
                    permitPermissions,
                );

                // console.log(`${JSON.stringify(permit)}`);
                //let res = validatePermit(permit, address, "secret1p0vgghl8rw4ukzm7geyy0f0tl29glxrtnlalue", ["owner"]);

                secretjs.utils.accessControl.permit.verify(permit, address, contract, permitPermissions);
                setPermit(permit);
            } catch (e) {
                setPermit(`Failed to sign: ${e}`);
            }

        }}>Sign</button>
        </div>
            <div className="form-group" style={{width: "40%", alignSelf: "center"}}>
                <textarea className="form-control" rows={10} id="messageArea" value={JSON.stringify(permit)} defaultValue={""} />
            </div>
        </div>
    </div>
  );
}

export default App;
