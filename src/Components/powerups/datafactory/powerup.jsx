import React, { useEffect, useState } from 'react';
import {get} from 'lodash';
import DatafactorySearch from './children/Search'; 
import DatafactoryView from './children/View';
import DatafactoryEdit from './children/Edit';

const DatafactoryPowerUp = () => {
   const [ actionID, setActionID ] = useState('');

   const getActionParam = () => {
       const actionHash = get(window, 'location.hash', 'NONE');
       setActionID(actionHash.toUpperCase());
   }

   useEffect(() => getActionParam(), []);


   return (
       <div>
           { actionID.includes('#SEARCH') && <DatafactorySearch /> }
           { actionID.includes('#VIEW') && <DatafactoryView /> }
           { actionID.includes('#EDIT') && <DatafactoryEdit />}
       </div>
   )
}

export default DatafactoryPowerUp;