
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


const ManageProduct = () => {
    const {account, saveAccount} = useAccount()

    const [f5, setF5] = useState(false)
    const [warning, setWarning] = useState(false)
    const [productselected, setProductSelected] = useState({})
    const [add_product, setAddProduct] = useState(false)
    const [edit_product, setEditProduct] = useState(false)
 
    const [branch_id, setBranchId] = useState(account.branch ? account.branch.branch_id : "")
    const [partner_id, setPartnerId] = useState("")
    const [product_name, setProductName] = useState("")
    const [ctrprice, setCtrPricePro] = useState(0)
    const [outprice, setOutPrice] = useState(0)
    

    const [partners, setPartners] = useState([])

    const [products, setProducts] = useState(
        [ ]
    )
    const [branchs, setBranchs] = useState([])

    useEffect (() =>
    {
        getBranchs()
        getPartners()
        getProduct()
       
    } , [f5])

    async function getBranchs() {
        var rs = await axios.post("/api/get_branch")
        var rs = rs.data
        var data = rs.data
        console.log(data)
        setBranchs(data)
    }


    async function getPartners() {
        var rs = await axios.post("/api/getpartners")
         var rs = rs.data
         var data = rs.data

         setPartners(data)
    }

     async function getProduct ()
     {
         var rs = await axios.post("/api/getproducts")
         var rs = rs.data
         var data = rs.data
 
         console.log(rs)
 
         setProducts(data)
     }

     async function deleteProduct({product_id})
    {
        var data = {
            "id" : product_id
        }
        var rs = await axios.post("/api/delete_product", data)
        setF5(!f5)
    }

    async function addProduct()
    {
        var data ={
            "partner_id": partner_id,
            "name" : product_name,
            "branch_id" : branch_id ,
            "ctrprice" : ctrprice
        }
        var rs = await axios.post("/api/add_product", data)
        setProductName("")
        setPartnerId("")
        setCtrPricePro(0)

        setF5(!f5)

        console.log(data)
    }
    async function editProduct (item) {
        setProductSelected(item);
        setProductName(item.name)
        setPartnerId(item.partner_id)
        setCtrPricePro(item.ctrprice)
        setOutPrice(item.outprice)
        
        
        
    }

    async function editProductApi () {
        var data = {
            
            "id": productselected.product_id,
            "name" : product_name,
            "branch_id" : productselected.branch_id.branch_id,
            "partner_id": partner_id,
            "ctrprice" : ctrprice,
            "numinbranch": productselected.numinbranch,
            "outprice" : outprice
        }
        var rs = await axios.post("/api/edit_product_info", data)
        setF5(!f5)

        console.log(data)
    }

    return (
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
                    <CButton color="warning" onClick={() => {deleteProduct(productselected); setWarning(!warning)}}>Xóa</CButton>{' '}
                    <CButton color="secondary" onClick={() => setWarning(!warning)}>Hủy</CButton>
                </CModalFooter>

            </CModal>

        {/* Add Product */}
            <CModal 
                show={add_product} 
                onClose={() => setAddProduct(!add_product)}
                color="primary"
                size="lg"
                centered
                >
                <CModalHeader closeButton className="text-center">
                    <CModalTitle className="w-100 addcustom ">Thêm sản phẩm</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="form-horizontal">
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Tên sản phẩm</CLabel>
                            </CCol>
                            <CCol >
                                <CInput id="text-input" name="text-input" value={product_name} onChange={(e) => setProductName(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>

                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel> Chi nhánh</CLabel>
                            </CCol>
                            <CCol >
                            {
                                account.type == "Chiefmanager" ? <>
                                    <CSelect value={branch_id} onChange={(e) => setBranchId(e.target.value)}>
                                        <option value="" >Chọn chi nhánh</option>
                                        {
                                            branchs.map((item) => 
                                                <option value={item.branch_id}>{item.branch_location}</option>
                                            )
                                        }
                                    </CSelect>
                                </> : <>
                                    <CInput id="text-input" name="text-input" value={account.branch.branch_location} readOnly/>
                                </>
                            }
                                
                            </CCol>
                        </CFormGroup>

                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Đối tác </CLabel>
                            </CCol>
                            <CCol >
                                <CSelect value={partner_id} onChange={(e) => setPartnerId(e.target.value)}>
                                    <option value="">Chọn đối tác</option>
                                    {
                                        partners.map((item) => 
                                            <option value={item.partner_id} >{item.partnername}</option>
                                        )
                                    }
                                </CSelect>
                                
                            </CCol>
                        </CFormGroup>
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel> Giá mua cố định </CLabel>
                            </CCol>
                            <CCol >
                                <CInput type="number" name="number-input" value={ctrprice} onChange={(e) => setCtrPricePro(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>
                    
                    </CForm>
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="primary" onClick={(e) => addProduct()} >
                    Thêm
                    </CButton>{' '}
                    <CButton color="secondary" onClick={() => setAddProduct(!add_product)}>
                    Hủy
                    </CButton>
                </CModalFooter>
            </CModal>


        {/* Edit Product */}
        <CModal 
              show={edit_product} 
              onClose={() => setEditProduct(!edit_product)}
              color="primary"
              size="lg"
              centered
            >
              <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">Sửa sản phẩm</CModalTitle>
              </CModalHeader>
              <CModalBody>
                    <CForm className="form-horizontal">
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Tên sản phẩm</CLabel>
                            </CCol>
                            <CCol >
                                <CInput id="text-input" name="text-input" value={product_name} onChange={(e) => setProductName(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>

                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel> Chi nhánh</CLabel>
                            </CCol>
                            <CCol >
                                {
                                    account.type == "Chiefmanager" ? <>
                                        <CSelect value={branch_id} onChange={(e) => setBranchId(e.target.value)}>
                                            <option value="" >Chon chi nhanh</option>
                                            {
                                                branchs.map((item) => 
                                                    <option value={item.branch_id}>{item.branch_location}</option>
                                                )
                                            }
                                        </CSelect>
                                    </> : <>
                                        <CInput id="text-input" name="text-input" value={account.branch.branch_location} readOnly/>
                                    </>
                                }
                            </CCol>
                        </CFormGroup>

                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Đối tác </CLabel>
                            </CCol>
                            <CCol >
                                <CSelect value={partner_id} onChange={(e) => setPartnerId(e.target.value)}>
                                    <option value="">Chon partner</option>
                                    {
                                        partners.map((item) => 
                                            <option value={item.partner_id} >{item.partnername}</option>
                                        )
                                    }
                                </CSelect>
                                
                            </CCol>
                        </CFormGroup>
                        <CFormGroup  row>
                            
                                <CCol xs="2">
                                    <CLabel> Giá mua cố định </CLabel>
                                </CCol>
                                <CCol >
                                    <CInput type="number" name="number-input" value={ctrprice} onChange={(e) => setCtrPricePro(e.target.value)}/>
                                    
                                </CCol>
                            
                        </CFormGroup>
                        <CFormGroup  row>
                            
                            <CCol xs="2">
                                <CLabel> Giá bán </CLabel>
                            </CCol>
                            <CCol >
                                <CInput type="number" name="number-input" value={outprice} onChange={(e) => setOutPrice(e.target.value)}/>
                                
                            </CCol>
                        
                    </CFormGroup>
                    
                    </CForm>
                </CModalBody>
                <CModalFooter className="justify-content-center">
                <CButton color="primary" onClick={() => editProductApi()}>
                  Sửa
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setEditProduct(!edit_product)}>
                  Hủy
                </CButton>
              </CModalFooter>
            </CModal>

        


        {/* Table */}
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CButton color="primary" onClick={()=> {setAddProduct(!add_product)}}>Thêm sản phẩm</CButton>
                        </CCardHeader>
                        <CCardBody>
                                <table class="table table-striped text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col"> Mã </th>
                                            <th scope="col"> Tên sản phẩm</th>
                                            <th scope="col">Chi nhánh</th>
                                            <th scope="col">Đối tác</th>
                                            <th scope="col">Giá mua cố định </th>
                                            <th scope="col">Giá mua gần nhất</th>
                                            <th scope="col">Giá bán</th>
                                            <th scope="col">Số lượng</th>
                                            
                                            <th scope="col">Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((item) => 
                                                <>
                                                    <tr>
                                                        <td scope="row">{item.product_id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.branch_id.branch_location}</td>
                                                        <td>{item.partner_id.partnername}</td>
                                                        <td>{item.ctrprice.toLocaleString('en-US')} VNĐ</td>
                                                        <td>{item.inprice ? item.inprice.toLocaleString('en-US')+"VNĐ" : ""} </td>
                                                        <td>{item.outprice ? item.outprice.toLocaleString('en-US')+"VNĐ":""} </td>
                                                        <td>{item.numinbranch}</td>
                                                        <td>
                                                            <CButton color="info" onClick = { () => {editProduct(item); setEditProduct(!edit_product)}}>Sửa</CButton>
                                                            <CButton color="danger" onClick = { () => {setProductSelected(item); setWarning(!warning)}} >Xóa</CButton>
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

export default ManageProduct