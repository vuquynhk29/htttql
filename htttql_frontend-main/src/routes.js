import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const KetLaiLo = React.lazy(() => import('./views/mis/statistic/statisticbranch/KetLaiLo'));
const StatisticBranch = React.lazy(() => import('./views/mis/statistic/statisticbranch/StatisticBranch'));
const ReportBranch = React.lazy(() => import('./views/mis/statistic/statisticbranch/ReportBranch'));
const AccountManager = React.lazy(() => import('./views/mis/manageaccount/AccountManager'));
const AccountAccountant = React.lazy(() => import('./views/mis/manageaccount/AccountAccountant'));
const AccountChiefmanager = React.lazy(() => import('./views/mis/manageaccount/AccountChiefmanager'));
const ManageBranch = React.lazy(() => import('./views/mis/managebranch/ManageBranch'));
const ManagePartner = React.lazy(() => import('./views/mis/managecategory/managepartner/ManagePartner'));
const ManageDepartment = React.lazy(() => import('./views/mis/managecategory/managedepartment/ManageDepartment'));
const ManageProduct = React.lazy(() => import('./views/mis/managecategory/manageproduct/ManageProduct'));
const ManageTax = React.lazy(() => import('./views/mis/managecategory/managetax/ManageTax'));
const ManageEmployee = React.lazy(() => import('./views/mis/managecategory/manageemployee/ManageEmployee'));
const ManageBuyBill = React.lazy(() => import('./views/mis/managebuybill/ManageBuyBill'));
const ManageSellBill = React.lazy(() => import('./views/mis/managesellbill/ManageSellBill'));
const ManageSalary = React.lazy(() => import('./views/mis/managesalary/ManageSalary'));
const ManageLend = React.lazy(() => import('./views/mis/managelend/ManageLend'));

const ManageReciept = React.lazy(() => import('./views/mis/managereciept/ManageReciept'));
const ManageBalance = React.lazy(() => import('./views/mis/managebalance/ManageBalance'));


const routes = [

  { path: '/statisticbranch', name: 'Thống kê tài chính chi nhánh', component: StatisticBranch,roles: ["Chiefmanager"] },
  { path: '/ketlailo', name: 'Tổng kết lãi/lỗ', component: KetLaiLo,roles: ["Chiefmanager"] },
  { path: '/reportbranch', name: 'Báo cáo tài chính chi nhánh', component: ReportBranch,roles: ["Manager"] },
  { path: '/accountmanager', name: 'Tài khoản quản lý', component: AccountManager, roles: ["Admin"] },
  { path: '/accountaccountant', name: 'Tài khoản nhân viên', component: AccountAccountant, roles: ["Admin"] },
  { path: '/accountchiefmanager', name: 'Tài khoản quản lý trưởng', component: AccountChiefmanager, roles: ["Admin"] },
  { path: '/managebranch/', name: 'Quản lý chi nhánh', component: ManageBranch,roles: ["Chiefmanager"] },

  { path: '/managepartner/', name: 'Quản lý thông tin đối tác', component: ManagePartner,roles: ["Chiefmanager", "Manager"] },
  { path: '/managedepartment/', name: 'Quản lý phòng ban', component: ManageDepartment,roles: ["Chiefmanager", "Manager"] },
  { path: '/manageproduct/', name: 'Quản lý sản phẩm', component: ManageProduct,roles: ["Chiefmanager", "Manager"]},
  { path: '/managetax/', name: 'Quản lý thuế', component: ManageTax,roles: ["Chiefmanager", "Manager"]},

  { path: '/manageemployee/', name: 'Quản lý nhân viên', component: ManageEmployee,roles: ["Chiefmanager", "Manager"]},
  { path: '/managebuybill/', name: 'Quản lý hóa đơn mua', component: ManageBuyBill, roles: ["Accountant"]},
  { path: '/managesellbill/', name: 'Quản lý hóa đơn bán', component: ManageSellBill, roles: ["Accountant"]},
  { path: '/managesalary/', name: 'Quản lý lương', component: ManageSalary, roles: ["Accountant"]},
  { path: '/managereciept/', name: 'Quản lý chi phí phát sinh', component: ManageReciept, roles: ["Accountant"]},
  { path: '/managelend/', name: 'Quản lý cho vay', component: ManageLend, roles: ["Chiefmanager"]},
  { path: '/managebalance/', name: 'Nhập số dư đầu kỳ', component: ManageBalance, roles: ["Accountant"]},


  { path: '/', exact: true, name: 'Trang chủ' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
];

export default routes;
