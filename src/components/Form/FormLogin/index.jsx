import AddBot from '../AddBot'

import styles from './styles.module.sass'



export default function AddApiPage() {
    return (
        <>
            <div className={styles.api}>

                {/* <h1 className='h3'>
                    Animation
                </h1> */}

                


                    <main className={styles.api_content}>

                        <div className="" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <AddBot />  
                        </div>
                      

                    </main>
                 
               
            </div>
        </>
    )
}
