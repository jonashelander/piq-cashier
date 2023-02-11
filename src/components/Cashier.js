import _PaymentIQCashier from 'paymentiq-cashier-bootstrapper'
import { useEffect } from 'react';


const cashierInstanse = () => {
  new _PaymentIQCashier('#cashier',
    {
      merchantId: '2906',
      userId: 'Han Solo',
      sessionId: '66',
      environment: 'test', // if not set, defaults to production
      method: 'deposit' // if not set, defaults to deposit
    },
    (api) => {
      console.log('Cashier intialized and ready to take down the empire')

      // register callbacks
      api.on({
        cashierInitLoad: () => console.log('The cashier successfully loaded and is ready'),
        success: data => console.log('Successful transaction completed', data)
      })
    }
  )
}

function Cashier() {
  useEffect(() => { cashierInstanse() });

  return (
    <div id="cashier">
    </div>
  );
}

export default Cashier;