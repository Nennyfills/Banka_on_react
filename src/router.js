import Loadable from 'react-loadable';
// import Profile from './components/client/profile';
// import Account from './components/client/account';
// import Transaction from './components/client/transaction';


import AppSpinner from './components/global/spinner';


const Profile = Loadable({
  loader: () => import('./components/container/profile'),
  loading: AppSpinner
});

const CreateAccount = Loadable({
  loader: () => import('./components/container/createAccount'),
  loading: AppSpinner
});

const TransactionHistory = Loadable({
  loader: () => import('./components/container/transactionHistory'),
  loading: AppSpinner
});

const Account = Loadable({
  loader: () => import('./components/container/accounts'),
  loading: AppSpinner
});

const Dashboard = Loadable({
  loader: () => import('./components/container/dashboard'),
  loading: AppSpinner
});

const Transactions = Loadable({
  loader: () => import('./components/container/transactions'),
  loading: AppSpinner
});

const CreateStaffAdmin = Loadable({
  loader: () => import('./components/container/createStaffAdmin'),
  loading: AppSpinner
});
const routes = [
  {
    path: '/portal', exact: true, name: 'Home', component: Profile
  },
  {
    path: '/portal/client/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/portal/client/account/create',
    name: 'create Account',
    component: CreateAccount
  },
  {
    path: '/portal/client/transaction/history',
    name: 'Transaction',
    component: TransactionHistory
  },
  {
    path: '/portal/accounts',
    name: 'view Accounts',
    component: Account
  },
  {
    path: '/portal/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/portal/transaction',
    name: 'Debit and create accounts',
    component: Transactions
  },
  {
    path: '/portal/new',
    name: 'View Accounts',
    component: CreateStaffAdmin
  }
];

export default routes;
