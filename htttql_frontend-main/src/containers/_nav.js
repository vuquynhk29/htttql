import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý tài khoản'],
    roles: ['Admin']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tài khoản nhân viên',
    to: '/accountaccountant',
    icon: 'cil-user',
    roles: ['Admin']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tài khoản quản lý',
    to: '/accountmanager',
    icon: 'cil-user',
    roles: ['Admin']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tài khoản quản lý trưởng',
    to: '/accountchiefmanager',
    icon: 'cil-user',
    roles: ['Admin']
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý chi nhánh'],
    roles: ["Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý chi nhánh',
    to: '/managebranch',
    icon: 'cil-building',
    roles: ["Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý danh mục'],
    roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý thông tin đối tác',
    to: '/managepartner',
    icon: 'cil-briefcase',
    roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý phòng ban',
    to: '/managedepartment',
    icon: 'cil-room',
    roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý sản phẩm',
    to: '/manageproduct',
    icon: 'cil-tags',
    roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý thuế',
    to: '/managetax',
    icon: 'cil-check-circle',
    roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý nhân viên',
    to: '/manageemployee',
    icon: 'cil-address-book',
    roles: ["Manager", "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Kế toán viên'],
    roles: ["Accountant"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Nhập số dư đầu kỳ',
    to: '/managebalance',
    icon: 'cil-cash',
    roles: ["Accountant"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý hóa đơn mua',
    to: '/managebuybill',
    icon: 'cil-library',
    roles: ["Accountant"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý hóa đơn bán',
    to: '/managesellbill',
    icon: 'cil-library',
    roles: ["Accountant"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý chi phí phát sinh',
    to: '/managereciept',
    icon: 'cil-color-border',
    roles: ["Accountant"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý lương',
    to: '/managesalary',
    icon: 'cil-dollar',
    roles: ["Accountant"]
  },
  
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý vay'],
   roles: [ "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý cho vay',
    to: '/managelend',
    icon: 'cil-clipboard',
    roles: [ "Chiefmanager"]
  },
  
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Tổng hợp tài chính chi nhánh'],
    roles: [  "Manager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Báo cáo tài chính',
    to: '/reportbranch',
    icon: 'cil-fax',
    roles: [ "Manager"]
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Thống kê thu chi'],
    roles: [  "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Thống kê tài chính',
    to: '/statisticbranch',
    icon: 'cil-chart-line',
    roles: [ "Chiefmanager"]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tổng kết lãi/lỗ',
    to: '/ketlailo',
    icon: 'cil-chart-line',
    roles: [ "Chiefmanager"]
  },

  
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
