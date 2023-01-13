import * as React from "react";
import { getApi } from "../api/config/utils";
import { useSubstrate } from "../api/providers/connectContext";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {web3FromAddress } from '@polkadot/extension-dapp';
import { text } from "stream/consumers";
import { useState } from 'react';


export interface IRegisterProps {}

export default function Register(props: IRegisterProps) {
  const { getExtension, accounts } = useSubstrate();

  const [apiBC, setApiBC] = React.useState<any>();
  const callApi = async () => {
    const api = await getApi();

    setApiBC(api);
  };
  
  React.useEffect(() => {
    callApi();
    getExtension();
  }, []);


  // Thêm vào phần nhập số
  const [issuetotal, setissue] = useState(0);
  const handleissuetotal = (event: any) => {
    setissue(event.target.value);
  };

  const [mintid, setmintid] = useState(0);
  const handlemintid = (event: any) => {
    setmintid(event.target.value);
  };

  const [mintamount, setmintamount] = useState(0);
  const handlemintamount = (event: any) => {
    setmintamount(event.target.value);
  };

  const [transferassetid, settransferasetid] = useState(0);
  const handletransferassetid = (event: any) => {
    settransferasetid(event.target.value);
  };

  const [transfertargetaddress, settransfertargetaddress] = useState('');
  const handletransfertargetaddress = (event: any) => {
    settransfertargetaddress(event.target.value);
  };

  const [transferamount, settransferamount] = useState(0);
  const handletransferamount = (event: any) => {
    settransferamount(event.target.value);
  };

  const [burnassetid, setburnassetid] = useState(0);
  const handleburnassetid = (event: any) => {
    setburnassetid(event.target.value);
  };

  const [burnamount, setburnamount] = useState(0);
  const handleburnamount = (event: any) => {
    setburnamount(event.target.value);
  };

  const [destroyassetid, setdestroyassetid] = useState(0);
  const handledestroyassetid = (event: any) => {
    setdestroyassetid(event.target.value);
  };

  const [totalsupplyassetid, settotalsupplyassetid] = useState(0);
  const handletotalsupplyassetid = (event: any) => {
    settotalsupplyassetid(event.target.value);
  };

  const [balanceassetid, setbalanceassetid] = useState(0);
  const handlebalanceassetid = (event: any) => {
    setbalanceassetid(event.target.value);
  };

  const [balanceaccountid, setbalanceaccountid] = useState(0);
  const handlebalanceaccountid = (event: any) => {
    setbalanceaccountid(event.target.value);
  };

  const [creatorassetid, setcreatorassetid] = useState('');
  const handlecreatorassetid = (event: any) => {
    setcreatorassetid(event.target.value);
  };
/////////

  // const [number1, setnumber1] = useState(0);
  // const handlenumber1 = (event: any) => {
  //     setnumber1(event.target.value);
  // };

  // const [number2, setnumber2] = useState(0);
  // const handlenumber2 = (event: any) => {
  //     setnumber2(event.target.value);
  // };

  // const [address, setaddress] = useState('');
  // const handleaddress = (event: any) => {
  //     setaddress(event.target.value);
  // };


   // Thêm phần show kết quả

  const [result1, setResult1] = useState();
  const [result2, setResult2] = useState();
  const [result3, setResult3] = useState();
  const [result4, setResult4] = useState();

 

  //-----------------------------

  const issue = async (number: number) => {
    console.log("Call api");
    console.log("Current account:{}", accounts);
    console.log(number);
    if (accounts !== null ) {
      console.log("current Account:", accounts);
      const injector = await web3FromAddress(accounts[0].address);
    const events = new Promise(async (resolve, reject) => {
      //ordered param
      await apiBC.tx.tokenModule
      // fixed value
      // dynamic value
        .issue(number)
        .signAndSend(
          accounts[0].address,
          { signer: injector?.signer },
          ({ status, events, dispatchError }: any) => {
            if (dispatchError) {
              if (dispatchError.isModule) {
                // for module errors, we have the section indexed, lookup
                const decoded = apiBC.registry.findMetaError(dispatchError.asModule);
                const { docs, name, section } = decoded;
                const res = 'Error'.concat(':', section, '.', name);
                //console.log(`${section}.${name}: ${docs.join(' ')}`);
                resolve(res);
              } else {
                // Other, CannotLookup, BadOrigin, no extra info
                //console.log(dispatchError.toString());
                resolve(dispatchError.toString());
              }
            } else {
              events.forEach(({ event, phase }: any) => {
                const { data, method, section } = event;
                //console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                if (section == 'tokenModule') {
                  const res = 'Success'.concat(':', section, '.', method);
                  resolve(res);
                }
              });
            }
          }
        );
    });
    // console.log(await events);
    window.alert(await events);
  }
  }

  const mint = async (arg1: any, arg2: any) => {
    console.log("Call api");
    console.log("Current account:{}", accounts);
    if (accounts !== null ) {
      console.log("current Account:", accounts);
      const injector = await web3FromAddress(accounts[0].address);
    const events = new Promise(async (resolve, reject) => {
      //ordered param
      await apiBC.tx.tokenModule
      // fixed value
      // dynamic value
        .mint(arg1, accounts[0].address, arg2)
        .signAndSend(
          accounts[0].address,
          { signer: injector?.signer },
          ({ status, events, dispatchError }: any) => {
            if (dispatchError) {
              if (dispatchError.isModule) {
                // for module errors, we have the section indexed, lookup
                const decoded = apiBC.registry.findMetaError(dispatchError.asModule);
                const { docs, name, section } = decoded;
                const res = 'Error'.concat(':', section, '.', name);
                //console.log(`${section}.${name}: ${docs.join(' ')}`);
                resolve(res);
              } else {
                // Other, CannotLookup, BadOrigin, no extra info
                //console.log(dispatchError.toString());
                resolve(dispatchError.toString());
              }
            } else {
              events.forEach(({ event, phase }: any) => {
                const { data, method, section } = event;
                //console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                if (section == 'tokenModule') {
                  const res = 'Success'.concat(':', section, '.', method);
                  resolve(res);
                }
              });
            }
          }
        );
    });
    window.alert(await events);
  }
  }

  const transfer = async (arg1: any, arg2: any, arg3: any) => {
    console.log("Call api");
    console.log("Current account:{}", accounts);
    if (accounts !== null ) {
      console.log("current Account:", accounts);
      const injector = await web3FromAddress(accounts[0].address);
    const events = new Promise(async (resolve, reject) => {
      //ordered param
      await apiBC.tx.tokenModule
      // fixed value
      // dynamic value
        .transfer(arg1, arg2, arg3)
        .signAndSend(
          accounts[0].address,
          { signer: injector?.signer },
          ({ status, events, dispatchError }: any) => {
            if (dispatchError) {
              if (dispatchError.isModule) {
                // for module errors, we have the section indexed, lookup
                const decoded = apiBC.registry.findMetaError(dispatchError.asModule);
                const { docs, name, section } = decoded;
                const res = 'Error'.concat(':', section, '.', name);
                //console.log(`${section}.${name}: ${docs.join(' ')}`);
                resolve(res);
              } else {
                // Other, CannotLookup, BadOrigin, no extra info
                //console.log(dispatchError.toString());
                resolve(dispatchError.toString());
              }
            } else {
              events.forEach(({ event, phase }: any) => {
                const { data, method, section } = event;
                //console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                if (section == 'tokenModule') {
                  const res = 'Success'.concat(':', section, '.', method);
                  resolve(res);
                }
              });
            }
          }
        );
    });
    window.alert(await events);
  }
  }

  const burn = async (arg1: any, arg2: any) => {
    console.log("Call api");
    console.log("Current account:{}", accounts);
    if (accounts !== null ) {
      console.log("current Account:", accounts);
      const injector = await web3FromAddress(accounts[0].address);
    const events = new Promise(async (resolve, reject) => {
      //ordered param
      await apiBC.tx.tokenModule
      // fixed value
      // dynamic value
        .burn(arg1, arg2)
        .signAndSend(
          accounts[0].address,
          { signer: injector?.signer },
          ({ status, events, dispatchError }: any) => {
            if (dispatchError) {
              if (dispatchError.isModule) {
                // for module errors, we have the section indexed, lookup
                const decoded = apiBC.registry.findMetaError(dispatchError.asModule);
                const { docs, name, section } = decoded;
                const res = 'Error'.concat(':', section, '.', name);
                //console.log(`${section}.${name}: ${docs.join(' ')}`);
                resolve(res);
              } else {
                // Other, CannotLookup, BadOrigin, no extra info
                //console.log(dispatchError.toString());
                resolve(dispatchError.toString());
              }
            } else {
              events.forEach(({ event, phase }: any) => {
                const { data, method, section } = event;
                //console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                if (section == 'tokenModule') {
                  const res = 'Success'.concat(':', section, '.', method);
                  resolve(res);
                }
              });
            }
          }
        );
    });
    window.alert(await events);
  }
  }

  const destroy = async (arg1: any) => {
    console.log("Call api");
    console.log("Current account:{}", accounts);
    if (accounts !== null ) {
      console.log("current Account:", accounts);
      const injector = await web3FromAddress(accounts[0].address);
    const events = new Promise(async (resolve, reject) => {
      //ordered param
      await apiBC.tx.tokenModule
      // fixed value
      // dynamic value
        .destroy(arg1)
        .signAndSend(
          accounts[0].address,
          { signer: injector?.signer },
          ({ status, events, dispatchError }: any) => {
            if (dispatchError) {
              if (dispatchError.isModule) {
                // for module errors, we have the section indexed, lookup
                const decoded = apiBC.registry.findMetaError(dispatchError.asModule);
                const { docs, name, section } = decoded;
                const res = 'Error'.concat(':', section, '.', name);
                //console.log(`${section}.${name}: ${docs.join(' ')}`);
                resolve(res);
              } else {
                // Other, CannotLookup, BadOrigin, no extra info
                //console.log(dispatchError.toString());
                resolve(dispatchError.toString());
              }
            } else {
              events.forEach(({ event, phase }: any) => {
                const { data, method, section } = event;
                //console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                if (section == 'tokenModule') {
                  const res = 'Success'.concat(':', section, '.', method);
                  resolve(res);
                }
              });
            }
          }
        );
    });
    window.alert(await events);
  }
  }
  

  const totalSupply = async (number: number) =>{
    const res = await apiBC.query.tokenModule.totalSupply(number);
    setResult1(res.toHuman())
  }

  const nextAssetId = async () =>{
    const res = await apiBC.query.tokenModule.nextAssetId();
    setResult2(res.toHuman())
  }
  
  const balances = async (arg: any) =>{
    const res = await apiBC.query.tokenModule.balances(arg);
    setResult3(res.toHuman());
  }

  const creator = async (arg: any) =>{
    const res = await apiBC.query.tokenModule.creator(arg);
    setResult4(res.toHuman());
  }

  return <div>
    <h1>Extrinsics</h1> 
    <p> <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={()=>issue(issuetotal)}>
      issue
    </Button> 
    Enter Balances: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handleissuetotal}
      />
    </p>
    
    <p> <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={()=>mint(mintid,mintamount)}>
      mint
    </Button> 
    Enter AssetId: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handlemintid}
      />
    
    {' '}Enter Balance: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handlemintamount}
      />
    </p>

    <p> <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={()=>transfer(transferassetid,transfertargetaddress,transferamount)}>
      transfer
    </Button> 
    Enter AssetId: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handletransferassetid}
      />
    {' '}Enter AccountId:{' '}
    <input 
        type="string"
        onChange={handletransfertargetaddress}
      />
    {' '}Enter Balance: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handletransferamount}
      />
    </p>

    <p> <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={()=>burn(burnassetid,burnamount)}>
      burn
    </Button> 
    Enter AssetId: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handleburnassetid}
      />
    {' '}Enter Balance: {' '}
    <input 
        type="number" pattern="[0-9]*"
        id="message"
        name="message"
        onChange={handleburnamount}
      />
    </p>

    <p> <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={()=>destroy(destroyassetid)}>
      destroy
    </Button> 
    Enter AssetId: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handledestroyassetid}
      />
    </p>
    {/* =========================================== */}
    <h1>Query and check</h1>

    <p>
    <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={() => totalSupply(totalsupplyassetid)}>
      totalSupply
    </Button>
    Enter AssetId:{' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handletotalsupplyassetid}
      />
      {' '}Result: {result1}
    </p>

    <p>
    <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={() => nextAssetId()}>
      nextAssetId
    </Button>
    {' '} Result: {result2}
    </p>

    <p>
    <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={
      () => balances([balanceassetid,balanceaccountid])}>
      balances
    </Button>
    Enter AssetId:{' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handlebalanceassetid}
      />
    {' '}Enter AccountId:{' '}
    <input 
        type="string"
        onChange={handlebalanceaccountid}
      />
    {' '} Result: {result3}
    </p> 

    <p>
    <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={
      () => creator(creatorassetid)}>
      creator
    </Button>
    Enter AssetId:{' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handlecreatorassetid}
      />
    {' '} Result: {result4}
    </p> 

    
  </div>;
}
