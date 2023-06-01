import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { auth,  } from '../../../pages/_firebase';



const Verify = () => {

  const router = useRouter();
  //console.log(router.query)
  const { token } = router.query;
  if(token !== undefined){}



  useEffect(() => {
  const verifyToken = () => {
    
  };
  
  // Listen for changes in the user's sign-in state
  
  verifyToken();
 
}, [router.query]); 

};

export default Verify;