import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { initFirebase } from '../../../pages/_firebase';

initFirebase();

const Verify = () => {

  const router = useRouter();
  //console.log(router.query)

  useEffect(() => {
    const verifyToken = async () => {
      const { token } = router.query;
      //console.log(token)

      if(token !== undefined){
        try {
            // Verify the token on the other site
            const response = await fetch(`${process.env.REFERRER}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token }),
            });
    
            if (response.ok) {
              //alert('TRUE')
              console.log('User is authenticated on the other site');
              // Perform further actions or redirect the user
            } else {
              //alert('FALSE')
              console.log('User is not authenticated on the other site');
              // Handle authentication failure
            }
          } catch (error) {
            console.error(error);
          }
      }

    };

    //verifyToken();
  }, [router.query]);

};

export default Verify;