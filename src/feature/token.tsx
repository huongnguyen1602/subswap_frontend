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
  const [number1, setnumber1] = useState(0);
  const handlenumber1 = (event: any) => {
    if (event.key === 'Enter') {
      setnumber1(event.target.value);
    }
    return number1
  };

  const [number2, setnumber2] = useState(0);
  const handlenumber2 = (event: any) => {
    if (event.key === 'Enter') {
      setnumber2(event.target.value);
    }
    return number2
  };

  const [number3, setnumber3] = useState(0);
  const handlenumber3 = (event: any) => {
    if (event.key === 'Enter') {
      setnumber3(event.target.value);
    }
    return number3
  };

  const [address, setaddress] = useState('');
  const handleaddress = (event: any) => {
    if (event.key === 'Enter') {
      setaddress(event.target.value);
    }
    return address
  };

  const [totalBalance, setBalance] = useState(0);
  const settotalBalance = (event: any) => {
          setBalance(event.target.value);
    return totalBalance
  };

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

  const mint = async () => {
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
        .mint(0,accounts[0].address,200000)
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
    console.log(await events);
  }
  }

  const totalSupply = async (number: number) =>{
    const res = await apiBC.query.tokenModule.totalSupply(number);
    window.alert(res.toHuman());
  }

  const nextAssetId = async () =>{
    const res = await apiBC.query.tokenModule.nextAssetId();
    window.alert(res.toHuman());
  }
  
  const balances = async (arg: any) =>{
    console.log(arg);
    const totalBalance = await apiBC.query.tokenModule.balances(arg);
    console.log(totalBalance.toHuman());
    // window.alert(totalBalance.toHuman());
    setBalance(totalBalance.toHuman());
  }
  console.log(totalBalance);
  return <div>
    <h1>Issue a new class of fungible assets</h1> 
    <p> <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={()=>issue(number1)}>
      issue
    </Button> 
    Enter Balances: {' '}
    <input 
        type="number" pattern="[0-9]*"
        id="message"
        name="message"
        onKeyDown={handlenumber1}
      />
    </p>
    
    <p>
    <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={() => totalSupply(number1)}>
      totalSupply
    </Button>
    Enter AssetId:{' '}
    <input 
        type="number" pattern="[0-9]*"
        id="message"
        name="message"
        onKeyDown={handlenumber1}
      />
    </p>

    <p>
    <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={() => nextAssetId()}>
      nextAssetId
    </Button>
    </p>

    <p>
    <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={
      () => balances([number1,address])}>
      balances
    </Button>
    Enter AssetId:{' '}
    <input 
        type="number" pattern="[0-9]*"
        id="message"
        name="message"
        onKeyDown={handlenumber1}
      />
    {' '}Enter AccountId:{' '}
    <input 
        type="string"
        id="message"
        name="message"
        onKeyDown={handleaddress}
      />
    </p> 

    <div><p>{totalBalance}</p></div>   



    <h1>Mint any assets of `id` owned by `origin`.</h1>
    <Button onClick={mint}>
      mint
    </Button>
    
  </div>;
}
