// Soft UI Dashboard React layouts
import Dashboard from 'pages/authenticated/dashboard';
import FirstLogin from 'pages/authenticated/firstLogin';
import TableProdutos from 'pages/authenticated/produtos/table';
import TableUsuario from 'pages/authenticated/usuarios/table';
import TableClientes from 'pages/authenticated/clientes/table';
import ProdutosForm from 'pages/authenticated/produtos/form';
import FormUsuario from 'pages/authenticated/usuarios/form';
import FormClientes from 'pages/authenticated/clientes/form';
import Profile from 'pages/authenticated/profile';
import SignIn from 'pages/unauthenticated/sign-in';
import ResetPassword from 'pages/unauthenticated/forgotPassword';
import EditRoles from 'pages/authenticated/roles/editRoles';
import Closed from 'pages/authenticated/closed';
import LancamentoTable from 'pages/authenticated/lancamento/table';
import CashOutTable from 'pages/authenticated/cashout-pedidos/table';
import LancamentoForm from 'pages/authenticated/lancamento/form';

// Icons
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CarteiraIcon from '@mui/icons-material/AccountBalanceWallet';
import CampaignIcon from '@mui/icons-material/Campaign';
import GroupIcon from '@mui/icons-material/Group';
import LancamentosIcon from '@mui/icons-material/Addchart';
import HomeIcon from '@mui/icons-material/Home';

const routes = [
  //Páginas sem Autenticação
  {
    authenticated: false,
    type: 'hidden',
    name: 'Login',
    key: 'login',
    route: '/login',
    component: <SignIn />,
    noCollapse: true,
  },
  {
    authenticated: false,
    type: 'hidden',
    name: 'Reset de Senha',
    key: 'resetpassword',
    route: '/resetpassword',
    component: <ResetPassword />,
    noCollapse: true,
  },
  // Menu pages
  {
    authenticated: true,
    type: 'collapse',
    name: 'Página inicial',
    key: '',
    route: '/',
    icon: <HomeIcon size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  { type: 'title', title: 'Painel', key: 'record-pages' },
  {
    authenticated: true,
    type: 'collapse',
    name: 'Clientes',
    key: 'clientes',
    route: '/clientes',
    icon: <ContactPageIcon size="12px" />,
    component: <TableClientes />,
    noCollapse: true,
  },
  {
    authenticated: true,
    type: 'collapse',
    name: 'Produtos',
    key: 'produtos',
    route: '/produtos',
    icon: <ProductionQuantityLimitsIcon size="12px" />,
    component: <TableProdutos />,
    noCollapse: true,
  },

  {
    authenticated: true,
    type: 'collapse',
    name: 'Colaboradores',
    key: 'usuarios',
    route: '/usuarios',
    icon: <GroupIcon size="12px" />,
    component: <TableUsuario />,
    noCollapse: true,
  },
  { type: 'title', title: 'Comandas', key: 'company-pages' },
  {
    authenticated: true,
    type: 'collapse',
    name: 'Abertas',
    key: 'lancamento',
    route: '/lancamento',
    icon: <LancamentosIcon size="12px" />,
    component: <LancamentoTable />,
    noCollapse: true,
  },
  {
    authenticated: true,
    type: 'collapse',
    name: 'Fechadas',
    key: 'closed',
    route: '/closed',
    icon: <CarteiraIcon size="12px" />,
    component: <Closed />,
    noCollapse: true,
  },
  { type: 'title', title: 'Campanhas', key: 'cash-out' },
  {
    authenticated: true,
    type: 'collapse',
    name: 'Nova campanha',
    key: 'neworder',
    route: '/neworder',
    icon: <CampaignIcon size="12px" />,
    component: <CashOutTable />,
    noCollapse: true,
  },
  // {
  //   authenticated: true,
  //   type: 'collapse',
  //   name: 'Relatórios',
  //   key: 'wallets',
  //   route: '/wallets',
  //   icon: <AlignVerticalBottomIcon size="12px" />,
  //   component: <Carteira />,
  //   noCollapse: true,
  // },
  // { type: "title", title: "Configurações", key: "config-pages" },
  // {
  //   authenticated: true,
  //   type: "collapse",
  //   name: "Roles",
  //   key: "roles",
  //   route: "/roles",
  //   icon: <RolesIcon size="12px" />,
  //   component: <EditRoles />,
  //   noCollapse: true,
  // },
  //Páginas que não aparecem no menu
  {
    authenticated: true,
    type: 'hidden',
    name: 'Reset de Senha',
    key: 'resetpassword',
    route: '/firstLogin',
    component: <FirstLogin />,
    noCollapse: true,
  },
  {
    authenticated: true,
    type: 'hidden',
    name: 'Perfil',
    key: 'perfil',
    route: '/perfil',
    component: <Profile />,
    noCollapse: true,
  },
  {
    authenticated: true,
    type: 'hidden',
    name: 'Novo COlaborador',
    key: 'nova-empresa',
    route: '/usuarios/novo',
    component: <FormUsuario />,
    noCollapse: true,
  },
  {
    authenticated: true,
    type: 'hidden',
    name: 'Novo Produto',
    key: 'novo-produto',
    route: '/produtos/novo',
    component: <ProdutosForm />,
    noCollapse: true,
  },
  {
    authenticated: true,
    type: 'hidden',
    name: 'Novo Cliente',
    key: 'nova-cliente',
    route: '/clientes/novo',
    component: <FormClientes />,
    noCollapse: true,
  },
  {
    authenticated: true,
    type: 'hidden',
    name: 'Novo Lancamento',
    key: 'nova-lancamento',
    route: '/lancamento/novo',
    component: <LancamentoForm />,
    noCollapse: true,
  },

  {
    authenticated: true,
    type: 'hidden',
    name: 'Editar Empresa',
    key: 'edit-empresa',
    route: '/usuarios/edit',
    component: <FormUsuario />,
    noCollapse: true,
  },
  {
    authenticated: true,
    type: 'hidden',
    name: 'Editar Usuário',
    key: 'edit-usuario',
    route: '/empresas/edit',
    component: <ProdutosForm />,
    noCollapse: true,
  },
  {
    authenticated: true,
    type: 'hidden',
    name: 'Editar Cliente',
    key: 'edit-cliente',
    route: '/clientes/edit',
    component: <FormClientes />,
    noCollapse: true,
  },
];

export default routes;
