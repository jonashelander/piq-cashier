import './styles/App.css';
import _PaymentIQCashier from 'paymentiq-cashier-bootstrapper'
import Cashier from './components/Cashier';
import Navbar from './components/Navbar';

function App() {

  return (
    <div className='container'>
      <Navbar />
      <Cashier />
    </div>
  );
}

export default App;
