import * as React from "react";
import { getApi } from "../api/config/utils";
import { useSubstrate } from "../api/providers/connectContext";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {web3FromAddress } from '@polkadot/extension-dapp';
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
   const [lptoken0, setlptoken0] = useState(0);
   const handlelptoken0 = (event: any) => {
    setlptoken0(event.target.value);
   };

   const [amountlptoken0, setamountlptoken0] = useState(0);
   const handleamountlptoken0 = (event: any) => {
    setamountlptoken0(event.target.value);
   };

   const [lptoken1, setlptoken1] = useState(0);
   const handlelptoken1 = (event: any) => {
    setlptoken1(event.target.value);
   };

   const [amountlptoken1, setamountlptoken1] = useState(0);
   const handleamountlptoken1 = (event: any) => {
    setamountlptoken1(event.target.value);
   };

   const [burnlpassetid, setburnlpassetid] = useState(0);
   const handleburnlpassetid = (event: any) => {
    setburnlpassetid(event.target.value);
   };

   const [burnlpamount, setburnlpamount] = useState(0);
   const handleburnlpamount = (event: any) => {
    setburnlpamount(event.target.value);
   };

   const [swapassetidfrom, setswapassetidfrom] = useState(0);
   const handleswapassetidfrom = (event: any) => {
    setswapassetidfrom(event.target.value);
   };

   const [swapamount, setswapamount] = useState(0);
   const handleswapamount = (event: any) => {
    setswapamount(event.target.value);
   };

   const [swapassetidto, setswapassetidto] = useState(0);
   const handleswapassetidto = (event: any) => {
    setswapassetidto(event.target.value);
   };

   const [pairsassetid1, setpairsassetid1] = useState(0);
   const handlepairsassetid1 = (event: any) => {
    setpairsassetid1(event.target.value);
   };

   const [pairsassetid2, setpairsassetid2] = useState(0);
   const handlepairsassetid2 = (event: any) => {
    setpairsassetid2(event.target.value);
   };

   const [reserveslpid, setreserveslpid] = useState(0);
   const handlereserveslpid = (event: any) => {
    setreserveslpid(event.target.value);
   };

   const [rewardslpid, setrewardslpid] = useState(0);
   const handlerewardslpid = (event: any) => {
    setrewardslpid(event.target.value);
   };
 
    // Thêm phần show kết quả 
   const [result1, setResult1] = useState();
   const [result2, setResult2] = useState();
   const [result3, setResult3] = useState();


  const mintLiquidity = async (arg1: any, arg2: any, arg3: any, arg4: any) => {
    console.log("Call api");
    console.log("Current account:{}", accounts);
    if (accounts !== null ) {
      console.log("current Account:", accounts);
      const injector = await web3FromAddress(accounts[0].address);
    const events = new Promise(async (resolve, reject) => {
      //ordered param
      console.log(arg1, arg2, arg3, arg4)
      await apiBC.tx.marketModule
      // fixed value
      // dynamic value
        .mintLiquidity(arg1, arg2, arg3, arg4)
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
                if (section == 'marketModule') {
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

  const burnLiquidity = async (arg1: any, arg2: any) => {
    console.log("Call api");
    console.log("Current account:{}", accounts);
    if (accounts !== null ) {
      console.log("current Account:", accounts);
      const injector = await web3FromAddress(accounts[0].address);
    const events = new Promise(async (resolve, reject) => {
      //ordered param
      console.log(arg1, arg2)
      await apiBC.tx.marketModule
      // fixed value
      // dynamic value
        .burnLiquidity(arg1, arg2)
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
                if (section == 'marketModule') {
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

  const swap = async (arg1: any, arg2: any, arg3: any) => {
    console.log("Call api");
    console.log("Current account:{}", accounts);
    console.log(arg1,arg2,arg3);
    if (accounts !== null ) {
      console.log("current Account:", accounts);
      const injector = await web3FromAddress(accounts[0].address);
    const events = new Promise(async (resolve, reject) => {
      //ordered param
      await apiBC.tx.marketModule
      // fixed value
      // dynamic value
        .swap(arg1, arg2, arg3)
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
                if (section == 'marketModule') {
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

  const pairs = async (arg1: number, arg2: number) =>{
    const res = await apiBC.query.marketModule.pairs([arg1,arg2]);
    setResult1(res.toHuman())

  }

  const reserves = async (arg1: number) =>{
    const res = await apiBC.query.marketModule.reserves(arg1);
    setResult2(res.toString())
  }

  const rewards = async (arg1: number) =>{
    const res = await apiBC.query.marketModule.rewards(arg1);
    setResult3(res.toString())
  }

  return <div>
    <h1>Extrinsics</h1> 
    <p> <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} 
    onClick={()=>mintLiquidity(lptoken0, amountlptoken0, lptoken1, amountlptoken1)}>
      mintLiquidity
    </Button> 
    Enter Token0: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handlelptoken0}
      />

    {' '} Enter Amount0: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handleamountlptoken0}
      />

    {' '} Enter Token1: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handlelptoken1}
      />

    {' '} Enter Amount1: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handleamountlptoken1}
      />
    </p>

    <p> <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} 
    onClick={()=>burnLiquidity(burnlpassetid, burnlpamount)}>
      burnLiquidity
    </Button> 
    Enter AssetId of lpt: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handleburnlpassetid}
      />

    {' '} Enter Balance: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handleburnlpamount}
      />
    </p>


    <p> <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} 
    onClick={()=>swap(swapassetidfrom, swapamount, swapassetidto)}>
      Swap
    </Button> 
    Enter From AssetId: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handleswapassetidfrom}
      />

    {' '} Enter Balance: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handleswapamount}
      />

    {' '} Enter To AssetId: {' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handleswapassetidto}
      />
    </p>

    <h1>Query and check</h1>
    <p>
    <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={() => pairs(pairsassetid1,pairsassetid2)}>
      Pairs
    </Button>
    Enter AssetId 1:{' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handlepairsassetid1}
      />
     {' '} Enter AssetId 2:{' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handlepairsassetid2}
      />
      {' '}Result: {result1}
    </p>

    <p>
    <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={() => reserves(reserveslpid)}>
      Reserves
    </Button>
    Enter Lpt AssetId:{' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handlereserveslpid}
      />
      {' '}Result: {result2}
    </p>

    <p>
    <Button style={{
      backgroundColor: '#B6BBB8',
      marginRight: 10
    }} onClick={() => rewards(rewardslpid)}>
      Rewards
    </Button>
    Enter Lpt AssetId:{' '}
    <input 
        type="number" pattern="[0-9]*"
        onChange={handlerewardslpid}
      />
      {' '}Result: {result3}
    </p>
  </div>;
}
