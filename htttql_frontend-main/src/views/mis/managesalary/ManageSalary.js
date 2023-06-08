
import React, { useEffect, useState } from 'react'
import {
    CRow,
    CCol,
   CButton,
   CCard,
   CCardBody, 
   CCardHeader,
   CModal,
   CModalBody,
   CModalFooter,
   CModalHeader,
   CModalTitle,
   CForm,
   CFormGroup,
   CLabel,
   CInput,
   CFormText,
   CTextarea,
   CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios'
import useAccount from 'src/useAccount'
import { func } from 'prop-types'
import moment from 'moment'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


const ManageSalary = () => {
    const {account, saveAccount} = useAccount()

    const [f5, setF5] = useState(false)
    const [warning, setWarning] = useState(false)
    const [salaryselected, setSalarySelected] = useState({})
    const [add_salary, setAddSalary] = useState(false)

    const [branch_id, setBranchId] = useState(account.branch.branch_id)
    const [viewsalary, setViewSalary] = useState([])
    const [employee, setEmployee] = useState([])
    const [department_id, setDepartmentId] = useState("")
    const [department_name, setDepartmentName] = useState("")
    const [departments, setDepartments] = useState([])

    const [employee_id, setEmployeeId] = useState("")
    const [salary_table, setSalaryTable] = useState("")
    const [workingday, setWorkingday] = useState(0)
    const [fine, setFine] = useState(0)
    const [reward, setReward] = useState(0)
    const [print_salary, setPrintSalary] = useState(false)

    useEffect (() =>
    {
        viewSalary()
        getDepartment()
        getEmployee()
    } , [f5])

    useEffect(() => {
        viewSalary()
    }, [salary_table, department_id])

    async function viewSalary()
    {
        var input_time = {
            "salary_table": salary_table == "" ? moment().format("MM/YYYY") : moment(salary_table).format("MM/YYYY")
        }
        console.log(input_time)
        var rs = await axios.post("/api/get_salary_table",input_time )
        rs = rs.data
        var data = rs.data
        var datatmp = []
        
        for(var i=0; i<data.length; i++) {
            if (department_id != "") {
                if (data[i].employeeid.department_id.department_id == department_id) {
                    datatmp.push(data[i])
                }
            } else {
                datatmp.push(data[i])
            }
        }
        
        setViewSalary(datatmp)

    }
    async function deleteSalary({salary_id})
    {
        var input = {
            "salary_id": salary_id
        }
        console.log(input)
        var rs = await axios.post("/api/delete_salary", input)
        setF5(!f5)
    }

    async function getDepartment ()
    {
        var rs = await axios.post("/api/get_department")
        var rs = rs.data
        var data = rs.data

        console.log(rs)
        setDepartments(data)
    }

    async function getEmployee()
    {
        var branch_id = account.branch.branch_id
        var rs = await axios.post("/api/get_employee")
        var rs = rs.data
        var data = rs.data
        console.log(branch_id)

        console.log(rs)
        var datatmp = []
        for(var i=0; i<data.length; i++) {
            
            if (data[i].department_id.branch.branch_id == branch_id) {
                datatmp.push(data[i])
            }
        }
        console.log(datatmp)

        setEmployee(datatmp)

    }
    async function addSalary()
    {
        var data =  {
        "employee_id": employee_id,
        "salary_table": moment(salary_table).format("MM/YYYY"),
        "workingday" : parseFloat(workingday),
        "fine":  parseFloat(fine),
        "reward": parseFloat(reward)}

        console.log(data)

        var rs = await axios.post("/api/add_salary", data)

        setFine(0)
        setReward(0)
        setEmployeeId("")
        // setSalaryTable("")
        
        setF5(!f5)
    }
    const canvasRef = React.useRef(null)

    const exportPDF = (element) => {
        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF({
                orientation: "landscape",
              })
            pdf.addImage(imgData, 'JPEG', 0, 0)
            pdf.save(`bangluong-${viewsalary[0].salary_id}.pdf`)
        })
    }
   
    return(
        <>
             {/* Confirm Delete */}
            <CModal
                show={warning} 
                onClose={() => setWarning(!warning)}
                color="warning"
                centered
                >
                
                <CModalBody>
                    Bạn có chắc chắn muốn xóa?
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="warning" onClick={() => {deleteSalary(salaryselected); setWarning(!warning)}}>Xóa</CButton>{' '}
                    <CButton color="secondary" onClick={() => setWarning(!warning)}>Hủy</CButton>
                </CModalFooter>

            </CModal>

            {/* Print salary */}
            <CModal 
                show={print_salary} 
                onClose={() => setPrintSalary(!print_salary)}
                color="primary"
                size="xl"
                centered
                > 
                <CModalBody>
                <CModalBody>
                <div class="page-content container">
                    <div class="page-header text-right text-blue-d2">
                        <div class="page-tools">
                            <div class="action-buttons ">
                        
                                <button onClick={() => exportPDF(canvasRef.current)} class="btn btn-success mx-1px text-95" color="success" data-title="PDF">
                                    <i class="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
                                    PDF
                                </button>
                                <button onClick={() => setPrintSalary(!print_salary)} class="btn mx-1px text-95 btn-secondary" href="#" data-title="Print">
                                    <i class="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                    <div ref={canvasRef}>
                    <div class="container px-0 pt-2">
                        <div class="row mt-4">
                            <div class="col-12 col-lg-10 offset-lg-1">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="text-center text-150">
                                            <i class="fa fa-book fa-2x text-success-m2 mr-1"></i>
                                            <span class="text-default-d3"> BẢNG LƯƠNG</span>
                                        </div>
                                        <div class="my-2 text-center "><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> 
                                            <span class="text-600 text-90">Tháng: </span> {salary_table}
                                        </div>
                                        
                                    </div>
                                </div>

                                <hr class="row brc-default-l1 mx-n1 mb-4" />

                                <div class="row">
                                    <div class="col-sm-8">
                                        <div>
                                            <span class="text-sm text-grey-m2 align-middle">Chi nhánh:</span>
                                            <span class="text-600 text-110 text-blue align-middle"> {account.branch.branch_location}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-grey-m2 align-middle">Phòng ban:</span>
                                            <span class="text-600 text-110 text-blue align-middle">{department_id}</span>
                                        </div>
                                        
                                        
                                    </div>

                                </div>
                                <table class="table table-striped text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col-1"> Mã NV </th>
                                           
                                            <th scope="col">Nhân viên</th>
                                            <th scope="col">Lương cứng</th>
                                            <th scope="col">Số ngày công</th>
                                            <th scope="col">Thưởng</th>
                                            <th scope="col">Phạt</th>
                                            <th scope="col">Tổng lương</th>
                                      
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            viewsalary.map((item)=>
                                            <>
                                            <tr>
                                                        <td scope="row">{item.employeeid.employee_id}</td>
                                                        
                                                        <td className="text-left">- Họ tên: {item.employeeid.employee_name} <br/>
                                                            - SĐT: {item.employeeid.employ_phone} <br/>
                                                    
                                                            - Số tài khoản: {item.employeeid.bankid} <br/>
                                                            - Ngân hàng: {item.employeeid.bankname}
                                                        </td>
                                                        <td>{item.employeeid.employee_salary ? item.employeeid.employee_salary.toLocaleString('en-US')+ " VNĐ" : ""}</td>
                                                        <td>{item.workingday}</td>
                                                        <td>{item.reward ? item.reward.toLocaleString('en-US')+ " VNĐ" : ""}</td>
                                                        <td>{item.fine ? item.fine.toLocaleString('en-US')+" VNĐ" : ""} </td>
                                                        <td>{item.total ? item.total.toLocaleString('en-US')+" VNĐ":""} </td>
                                                        
                                                    </tr>
                                            </>
                                            )
                                        }
                                        
                                    
                                    </tbody>
                                </table>
                                <hr />

                                    <div>
                                        <span class="text-secondary-d1 text-105"> <i>Chú ý: Tổng lương đã trừ thuế TNCN!</i></span>
                                      
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                </CModalBody>

                </CModalBody>

            </CModal>

             {/* Add Product */}
             <CModal 
                show={add_salary} 
                onClose={() => setAddSalary(!add_salary)}
                color="primary"
                size="lg"
                centered
                >
                <CModalHeader closeButton className="text-center">
                    <CModalTitle className="w-100 addcustom ">Thêm lương</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="form-horizontal">
                        <CRow>
                            <CCol xs="5">
                                <CFormGroup>
                                <CLabel>Chọn tháng</CLabel>
                                <CInput type="month" value={salary_table} onChange={(e) => setSalaryTable(e.target.value)}/>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="7">
                                <CLabel>Chọn nhân viên </CLabel>
                                <CSelect value={employee_id} onChange={(e) => setEmployeeId(e.target.value)}>
                                    <option value="">Chọn nhân viên</option>
                                    {
                                        employee.map((item) => 
                                            <option value={item.employee_id} >{item.employee_id}</option>
                                        )
                                    }
                                </CSelect>
                                
                            </CCol>
                        </CRow>
                        
                        <CRow>
                            <CCol xs="4">
                                <CFormGroup>
                                <CLabel> Số ngày công </CLabel>
                                <CInput type="number" name="number-input" value={workingday} onChange={(e) => setWorkingday(e.target.value)}/>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="4">
                                <CFormGroup>
                                <CLabel> Thưởng </CLabel>
                                <CInput type="number" name="number-input" value={reward} onChange={(e) => setReward(e.target.value)}/>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="4">
                                <CFormGroup>
                                <CLabel> Phạt </CLabel>
                                <CInput type="number" name="number-input" value={fine} onChange={(e) => setFine(e.target.value)}/>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    
                    </CForm>
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="primary" onClick={() => addSalary()}>
                    Thêm
                    </CButton>{' '}
                    <CButton color="secondary" onClick={() => setAddSalary(!add_salary)}>
                    Hủy
                    </CButton>
                </CModalFooter>
            </CModal>
            {/* View Salary */}


            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol xs="2">
                                    <CButton color="primary" onClick={() => setAddSalary(!add_salary)}>Thêm lương</CButton>
                                </CCol>
                                <CCol>
                                    <CFormGroup>
                                        <CInput type="month" value={salary_table} onChange={(e) => setSalaryTable(e.target.value)} ></CInput>
                                    </CFormGroup>
                                </CCol>
                                <CCol>
                                    <CSelect value={department_id} onChange={(e) => setDepartmentId(e.target.value)}>
                                        <option value="">Chọn phòng ban</option>
                                        {
                                            departments.map((item) => 
                                                <option value={item.department_id}>{item.department_name}</option>
                                                
                                            )
                                        }
                                    </CSelect>
                                </CCol>
                                <CCol xs="2">
                                    <CButton color="success" onClick={() => setPrintSalary(!print_salary)}>Xuất bảng lương</CButton>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                                <table class="table table-striped text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col"> Mã nhân viên </th>
                                            <th scope="col">Phòng ban</th>
                                            <th scope="col">Thông tin nhân viên</th>
                                            <th scope="col">Lương cứng</th>
                                            <th scope="col">Số ngày công</th>
                                            <th scope="col">Thưởng</th>
                                            <th scope="col">Phạt</th>
                                            <th scope="col">Tổng lương</th>
                                            <th scope="col">Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            viewsalary.map((item, idx)=>
                                            <>
                                            <tr>
                                                        <td scope="row">{item.employeeid.employee_id}</td>
                                                        <td >{item.employeeid.department_id.department_name}</td>
                                                        <td className="text-left">- Họ tên: {item.employeeid.employee_name} <br/>
                                                            - SĐT: {item.employeeid.employ_phone} <br/>
                                                            - Email: {item.employeeid.employee_email} <br/>
                                                            - Số tài khoản: {item.employeeid.bankid} <br/>
                                                            - Ngân hàng: {item.employeeid.bankname}
                                                        </td>
                                                        <td>{item.employeeid.employee_salary}</td>
                                                        <td>{item.workingday}</td>
                                                        <td>{item.reward ? item.reward.toLocaleString('en-US')+ " VNĐ" : ""}</td>
                                                        <td>{item.fine ? item.fine.toLocaleString('en-US')+" VNĐ" : ""} </td>
                                                        <td>{item.total ? item.total.toLocaleString('en-US')+" VNĐ":""} </td>
                                                       
                                                        <td>
                                                            
                                                            <CButton color="danger" onClick={() => {setSalarySelected(item); setWarning(!warning)}} >Xóa</CButton>
                                                        </td>
                                                        
                                                    </tr>
                                            </>
                                            )
                                        }
                                        
                                    
                                    </tbody>
                                </table>
                        </CCardBody>
                    </CCard>

                </CCol>
            </CRow>


        </>

    )
}
export default ManageSalary