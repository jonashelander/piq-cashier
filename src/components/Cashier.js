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
      userId: localStorage.getItem('userId'),
      sessionId: localStorage.getItem('sessionId'),
      environment: 'test', // if not set, defaults to production
      method: props.method, // if not set, defaults to deposit
      containerHeight: '800px',
      containerWidth: '400px',
      autoOpenFirstPaymentMethod: false,
      // providerType: 'creditcard',
      //listType: 'grid',
      // lastUsedDepositAmount: true,  
      // predefinedValues: false,
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

    <div className='cashierContainer'>
      <div className="txLog">
        <h2>Transaction log</h2>
      </div>
      <div id="cashier"></div>
    </div>
  );
}

export default Cashier;
