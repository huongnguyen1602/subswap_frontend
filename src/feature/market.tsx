import * as React from "react";
import { getApi } from "../api/config/utils";
import { useSubstrate } from "../api/providers/connectContext";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {web3FromAddress } from '@polkadot/extension-dapp';

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

  const mintLiquidity = async () => {
    console.log("Call api");
    console.log("Current account:{}", accounts);
    if (accounts !== null ) {
      console.log("current Account:", accounts);
      const injector = await web3FromAddress(accounts[0].address);
    const events = new Promise(async (resolve, reject) => {
      //ordered param
      await apiBC.tx.marketModule
      // fixed value
      // dynamic value
        .mintLiquidity(0, 1000, 1, 2000)
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
    console.log(await events);
  }
  
  }

  const handleQuery = async () =>{

    const res = await apiBC.query.marketModule.something();
    console.log(res.toHuman());

  }


  return <div>
    <h1></h1>
    <Button onClick={mintLiquidity}>
    mintLiquidity
    </Button>

    <Button onClick={handleQuery}>
      Query me
    </Button>
  </div>;
}
