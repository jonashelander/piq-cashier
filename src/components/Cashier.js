import _PaymentIQCashier from 'paymentiq-cashier-bootstrapper'
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoggedInContext from '../contexts/LoggedInContext';
import '../styles/App.css'


const cashierInstance = (props) => {
  console.log("cashier instance " + props.method);
  new _PaymentIQCashier('#cashier',
    {
      merchantId: '2906',
      userId: 'Han Solo',
      sessionId: '66',
      environment: 'test', // if not set, defaults to production
      method: props.method, // if not set, defaults to deposit
      containerHeight: '500px',
      containerWidth: '400px',
      autoOpenFirstPaymentMethod: 'false',
      listType: 'grid'
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
  const location = useLocation();
  console.log(location.state.method);
  useEffect(() => { cashierInstance(location.state) });

  return (
    <div id="cashier">

    </div>
  );
}

export default Cashier;
