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
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import moment from 'moment'

const ManageSellBill = () => {

    const {account, saveAccount} = useAccount()

    const [f5, setF5] = useState(false)
    const [warning, setWarning] = useState(false)

    const [viewbill, setViewBill] = useState(false)
    const [addbill, setAddbill] = useState(false)
    const [sellbillselected, setSellBillSelected] = useState(null)

    const [product_id, setProductId] = useState("")
    const [productchoose, setProductChoose] = useState({})
    const [time, setBillDate] = useState("")
    const [product_price, setProductPrice] = useState(0)
    const [product_num, setProductNum] = useState(0)
    const [productbranch, setProductBranch] = useState([])
    const [list_product, setListProduct] = useState([])
    const [payment, setPayment] = useState("")
    const [customer, setCustomer] = useState("")
    const [cusphone, setCusphone] = useState("")
    const [cusaddress, setCusAddress] = useState("")
    const [taxid, setTaxId] = useState("")

    const [buybill, setSellBill] = useState(
        []
    )
    useEffect (() =>
    {
        getProduct()
        getSellBill()
    } , [f5]
    )

    async function getSellBill()
    {
        var rs = await axios.post("/api/getsellbill")
        var rs = rs.data
        var data = rs.data

        for(var i=0; i<data.length; i++) {
            var products = data[i].list_product
            var total_price = 0.0
            var total_num = 0
            for (var j=0; j<products.length; j++) {
                total_num += products[j].numinbill
                total_price += (products[j].numinbill*products[j].outprice)
            }
            data[i].total_price = total_price
            data[i].total_num = total_num
        }
        // console.log(data)

        setSellBill(data)

    }
    async function getProduct() {
        var rs = await axios.post("/api/getproducts")
        var rs = rs.data
        var data = rs.data

        var producttmp = []
        for (var i=0; i<data.length; i++){
            if (data[i].branch_id.branch_id == account.branch.branch_id) {
                producttmp.push(data[i])
            }
        }
        console.log(producttmp)

        setProductBranch(producttmp)


    }



    async function chooseProduct(product_id) {
        if (product_id != "") {
            setProductId(product_id)
            for (var i=0; i<productbranch.length; i++){
                if (productbranch[i].product_id == product_id) {
                    setProductPrice(productbranch[i].ctrprice)
                    setProductChoose(productbranch[i])
                    break
                }
            }
        } else {
            setProductId("")
            setProductChoose({})
        }
    }

    async function addProductView() {
        var producttmp = [...list_product]  //copy array
        var check = false
        for (var i = 0; i<producttmp.length; i++) {
            if (producttmp[i].product.product_id == productchoose.product_id) {
                check = true
                producttmp[i].number += parseInt(product_num)
                break;
            }
        }
        if (check == false) {
            producttmp.push({
                "product": productchoose,
                "number": parseInt(product_num),
                "price": parseFloat(productchoose.outprice)
            })
        }
        console.log(producttmp)
        setListProduct(producttmp)
    }

    async function removeProductView(index) {
        var producttmp = []  //copy array
        for (var i=0; i<list_product.length; i++) {
            if (i!=index) {
                producttmp.push(list_product[i])
            }
        }
        setListProduct(producttmp)
    }



    const canvasRef = React.useRef(null)

    const exportPDF = (element) => {
        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF()
            pdf.addImage(imgData, 'JPEG', 0, 0)
            pdf.save(`hoadonmua-${sellbillselected.documentid.id}.pdf`)
        })
    }

    async function addSellBill() {
        var rq = {
            "userid": account.user_id,
            // "time": moment(time).format("DD/MM/YYYY"),
            "branchid": account.branch.branch_id,
            "list_product": [],
            "number_product": [],
            "name": "Hóa đơn mua",
            "content": "Hóa đơn mua",
            "payment": payment,
            "customer": customer,
            "cusaddress": cusaddress,
            "cusphone": cusphone,
            "taxid": "10000000"
        }

        for (var i=0; i<list_product.length; i++) {
            rq.list_product.push(list_product[i].product.product_id)
            // rq.list_price.push(parseFloat(list_product[i].price))
            rq.number_product.push(parseInt(list_product[i].number))
        }

        console.log(rq)
        var rs = await axios.post("/api/addsellbill", rq)
        // setBillDate("")
        setListProduct([])
        setPayment("")
        // setPartnerId("")
        setProductId("")
        setCusAddress("")
        setCusphone("")
        setCustomer("")
        // setProductPrice(0)
        setProductNum(0)
        setF5(!f5)

    }
    async function deleteSellBill(sellbill)
    {
        var data = {
            "id" : sellbill.documentid.id
        }
        var rs = await axios.post("/api/deletedocument", data)
        setF5(!f5)
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
                    Bạn có chắc chắn muốn hủy?
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="warning" onClick={() => {deleteSellBill(sellbillselected); setWarning(!warning)}}>Hủy</CButton>{' '}
                    <CButton color="secondary" onClick={() => setWarning(!warning)}>Không</CButton>
                </CModalFooter>

            </CModal>
            {/* Add bill */}
            <CModal
              show={addbill}
              onClose={() => setAddbill(!addbill)}
              color="primary"
              size="lg"
              centered
            >
                <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">Thêm hóa đơn bán</CModalTitle>
              </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow>
                            <CCol>
                                <CFormGroup>
                                    <CLabel>Khách hàng</CLabel>

                                    <CInput type="text-vale" value={customer} onChange={ (e) => setCustomer(e.target.value)}></CInput>
                                    {/* <CInput type="text-value" value={time} onChange={(e) => setBillDate(e.target.value)}></CInput> */}
                                </CFormGroup>
                            </CCol>
                            <CCol>
                                 <CFormGroup>
                                    <CLabel>Số điện thoại</CLabel>
                                    <CInput type="text-input" value={cusphone} onChange={(e) => setCusphone(e.target.value)}></CInput>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CFormGroup>
                                    <CLabel>Địa chỉ</CLabel>
                                    <CInput type="text-input" value={cusaddress} onChange={(e)=> setCusAddress(e.target.value)}></CInput>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="7">
                                <CLabel>Sản phẩm</CLabel>
                            </CCol>
                            <CCol>
                                <CLabel>Số lượng</CLabel>
                            </CCol>

                        </CRow>
                        <CRow>
                            <CCol  xs="7">
                                <CSelect value={product_id} onChange={(e) => chooseProduct(e.target.value)}>
                                    <option value="">Chọn sản phẩm</option>
                                    {
                                        productbranch.map((item) =>
                                            <option value={item.product_id}>{item.name}</option>
                                        )
                                    }
                                </CSelect>
                            </CCol>
                            <CCol>
                                <CInput type="number" value={product_num} onChange={(e) => setProductNum(e.target.value)}></CInput>
                            </CCol>

                        </CRow>
                        <br></br>
                        <CRow>
                            <CCol>
                                <CLabel>Hình thức thanh toán</CLabel>
                            </CCol>
                            <CCol xs="6">
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="6">
                                <CInput type="text-input" value={payment} onChange={(e) => setPayment(e.target.value)}></CInput>
                            </CCol>
                            <CCol className="text-center" xs="6">
                                <CButton color="success" onClick={(e) => addProductView()}>Thêm</CButton>
                            </CCol>
                        </CRow>

                    </CForm>

                    <CRow>
                        <CCol>
                        <table className="table table-striped text-center mt-3">
                            <thead>
                                <th scope="col">  # </th>
                                <th scope="col">  Sản phẩm </th>
                                <th scope="col">  Số lượng</th>
                                <th scope="col">  Giá bán </th>
                                <th scope="col">  x </th>
                            </thead>
                            <tbody>
                                {
                                    list_product.map((item, idx) =>
                                        <>
                                            <tr>
                                                <td scope="row">{idx+1}</td>
                                                <td>{item.product.name}</td>
                                                <td>{item.number}</td>
                                                <td>{item.price}</td>
                                                <td onClick={() => removeProductView(idx)}><CButton color="danger">x</CButton></td>
                                            </tr>
                                        </>
                                    )
                                }
                            </tbody>
                        </table>
                        </CCol>
                    </CRow>

                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="primary" onClick={() => addSellBill()}>Thêm hóa đơn</CButton>{' '}
                    <CButton color="secondary" onClick={() => setAddbill(!addbill)}>Hủy</CButton>
              </CModalFooter>
            </CModal>

            {/* View bill */}
            <CModal
              show={viewbill}
              onClose={() => setViewBill(!viewbill)}
              color="primary"
              size="lg"
              centered
            >
                <CModalBody>
                <div class="page-content container">
                    <div class="page-header text-blue-d2">
                        <h1 class="page-title text-secondary-d1">
                            Mã:
                            <small class="page-info">
                                <i class="fa fa-angle-double-right text-80"></i>
                                {sellbillselected ? sellbillselected.documentid.id: ""}
                            </small>
                        </h1>

                        <div class="page-tools">
                            <div class="action-buttons">

                                <button onClick={() => exportPDF(canvasRef.current)} class="btn btn-success mx-1px text-95" color="success" data-title="PDF">
                                    <i class="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
                                    PDF
                                </button>
                                <button onClick={() => setViewBill(!viewbill)} class="btn mx-1px text-95 btn-secondary" href="#" data-title="Print">
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
                                            <span class="text-default-d3"> HÓA ĐƠN BÁN HÀNG</span>

                                        </div>
                                        <div class="my-2 text-center "><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-90">Ngày tháng: </span> {sellbillselected ? sellbillselected.documentid.time : ""}</div>
                                    </div>
                                </div>

                                <hr class="row brc-default-l1 mx-n1 mb-4" />

                                <div class="row">
                                    <div class="col-sm-6">
                                        <div>
                                            <span class="text-sm text-grey-m2 align-middle">Đơn vị bán:</span>
                                            <span class="text-600 text-110 text-blue align-middle"> Công ty TNHH SVM </span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-grey-m2 align-middle">Mã số thuế:</span>
                                            <span class="text-600 text-110 text-blue align-middle"> 0800004797</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-grey-m2 align-middle">Địa chỉ: </span>
                                            <span class="text-600 text-110 text-blue align-middle"> {sellbillselected ? sellbillselected.documentid.user.branch.branch_location: ""}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-grey-m2 align-middle">Số điện thoại: </span>
                                            <span class="text-600 text-110 text-blue align-middle"> {sellbillselected ? sellbillselected.documentid.user.branch.branch_phone: ""}</span>
                                        </div>
                                        {/* <div>
                                            <span class="text-sm text-grey-m2 align-middle">Email: </span>
                                            <span class="text-600 text-110 text-blue align-middle"> httql@team2.</span>
                                        </div> */}

                                    </div>
                                    <div class="col-sm-6">
                                        {/* <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-90">Ngày mua: </span> {sellbillselected ? sellbillselected.documentid.time : ""}</div> */}
                                        <div>
                                            <span class="text-sm text-grey-m2 align-middle">Khách hàng:</span>
                                            <span class="text-600 text-110 text-blue align-middle"> {sellbillselected ? sellbillselected.customer : ""}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-grey-m2 align-middle">Số điện thoại:</span>
                                            <span class="text-600 text-110 text-blue align-middle"> {sellbillselected ? sellbillselected.cusphone : ""}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-grey-m2 align-middle">Địa chỉ: </span>
                                            <span class="text-600 text-110 text-blue align-middle"> {sellbillselected ? sellbillselected.cusaddress: ""}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-grey-m2 align-middle">NV thanh toán: </span>
                                            <span class="text-600 text-110 text-blue align-middle"> {sellbillselected ? sellbillselected.documentid.user.user_id: ""}</span>
                                        </div>

                                    </div>

                                </div>

                                <div class="mt-4">
                                    <div class="row text-600 text-white bgc-default-tp1 py-25">
                                        <div class="d-none d-sm-block col-1">#</div>
                                        <div class="col-9 col-sm-4">Sản phẩm</div>
                                        <div class="d-none d-sm-block col-4 col-sm-2">Số lượng</div>
                                        <div class="d-none text-center d-sm-block col-sm-2">Giá mua</div>
                                        <div class="col-3 text-center">Tổng giá</div>
                                    </div>

                                    <div class="text-95 text-secondary-d3">
                                        <div class="row mb-2 mb-sm-0 py-25">
                                            {
                                                sellbillselected ? sellbillselected.list_product.map((item, idx) =>
                                                 <>
                                                    <div class="d-none d-sm-block col-1">{idx+1}</div>
                                                    <div class="col-9 col-sm-4">{item.name}</div>
                                                    <div class="d-none d-sm-block text-center col-1">{item.numinbill}</div>
                                                    <div class="d-none d-sm-block text-right col-3 text-95">{item.outprice.toLocaleString('en-US')+"VNĐ"}</div>
                                                    <div class="col-3 text-right text-secondary-d2">{(item.numinbill * item.outprice).toLocaleString('en-US')+"VNĐ"}</div>
                                                </>
                                                ) : ""
                                            }

                                        </div>
                                    </div>

                                    <div class="row border-b-2 brc-default-l2"></div>

                                    {/* thue */}
                                    <div class="row mt-3">
                                        <div class="col-12 col-sm-5 text-grey-d2 text-95 mt-2 mt-lg-0">

                                        </div>

                                        <div class="col-12 col-sm-7 text-grey text-90 order-first order-sm-last">
                                            <div class="row my-2">
                                                <div class="col-5 text-left">
                                                    Tổng
                                                </div>
                                                <div class="col-7 text-right">
                                                    <span class="text-120 text-secondary-d1">{(sellbillselected ? sellbillselected.documentid.amount : "").toLocaleString('en-US')+" VNĐ"}</span>
                                                </div>
                                            </div>

                                            <div class="row my-2">
                                                <div class="col-5 text-left">
                                                    VAT (10%)
                                                </div>
                                                <div class="col-7 text-right">
                                                    <span class="text-120 text-secondary-d1">{parseFloat(sellbillselected ? (sellbillselected.documentid.amount*sellbillselected.tax.percentage/100) : "").toLocaleString('en-US')+" VNĐ"}</span>
                                                </div>
                                            </div>

                                            <div class="row my-2 align-items-center bgc-primary-l3">
                                                <div class="col-5 text-left text-danger">
                                                    Tổng thanh toán
                                                </div>
                                                <div class="col-7 text-right">
                                                    <span class="text-150 text-success-d3 opacity-2 font-weight-bold text-danger">{parseFloat(sellbillselected ? (sellbillselected.documentid.amount*sellbillselected.tax.percentage/100 + sellbillselected.documentid.amount) : "").toLocaleString('en-US')+" VNĐ"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>




                                    <hr />

                                    <div>
                                        <span class="text-secondary-d1 text-105">Xin chân thành cảm ơn quý khách!</span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </CModalBody>
            </CModal>
            {/* Table */}
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CButton color="primary" onClick={() => setAddbill(!addbill)}  >Thêm hóa đơn bán</CButton>
                        </CCardHeader>
                        <CCardBody>
                            <table className="table table-striped text-center">
                                <thead>
                                    <th scope="col">  Mã hóa đơn </th>
                                    <th scope="col">  Thông tin khách hàng </th>
                                    <th scope="col">  Số lượng sản phầm </th>
                                    <th scope="col">  Tổng giá </th>
                                    <th scope="col">  Nhân viên thanh toán </th>

                                    <th>Chức năng</th>
                                </thead>
                                <tbody>
                                    {
                                        buybill.map((item) =>
                                        <>
                                            <tr>
                                                <td scope="row">{item.documentid.id}</td>
                                                <td className="text-left"> - Họ tên:  {item.customer} <br/> - Địa chỉ:  {item.cusaddress} <br/> - Số điện thoại:  {item.cusphone}</td>
                                                <td>{item.total_num}</td>
                                                <td className="text-right">{item.total_price ? item.total_price.toLocaleString('en-US')+"VNĐ": ""}</td>
                                                <td>{item.documentid.user.user_id}</td>
                                                <td>
                                                    <CButton color="info" onClick = { () => { setSellBillSelected(item); setViewBill(!viewbill)}}>Xem chi tiết</CButton>
                                                    <CButton color="danger" onClick = { () => {setSellBillSelected(item); setWarning(!warning)}}>Hủy</CButton>
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

export default ManageSellBill
