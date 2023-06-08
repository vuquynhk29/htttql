import React, { useEffect, useState } from 'react'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CSelect,
    CLabel,
} from '@coreui/react'
import Plot from 'react-plotly.js';
import useAccount from 'src/useAccount';
import axios from 'axios'


const StatisticBranch = () => {
    const {account, saveAccount} = useAccount()


    const [branch_id, setBranchId] = useState("")
    const [branchs, setBranchs] = useState(
        []
    )

    const [salarychart, setSalaryChart] = React.useState([{
        x: [],
        y: [],
        name: "Luong theo thang",
        type: 'bar'
    }])

    const [taxid, setTaxId] = React.useState("")
    const [taxs, setTaxs] = React.useState([])
    const [taxchart, setTaxChart] = React.useState([{
        x: [],
        y: [],
        name: "Tax",
        type: 'bar'
    }])
    const [sellchart, setSellChart] = React.useState([{
        x: [],
        y: [],
        name: "Sell",
        type: 'bar'
    }])
    const [buychart, setBuyChart] = React.useState([{
        x: [],
        y: [],
        name: "Buy",
        type: 'bar'
    }])
    const [receiptchart, setReceiptChart] = React.useState([{
        x: [],
        y: [],
        name: "Receipt",
        type: 'bar'
    }])

    const [inoutchart, setInOutChart] = React.useState([{
        x: [],
        y: [],
        name: "InOut",
        type: 'lines+markers'
    }])

    useEffect(() => {
        getBranchs()
    }, [])

    useEffect(() => {
        getInOutByBranch()
        getReceiptByBranch()
        getBuyByBranch()
        getSellByBranch()
        getTaxByBranch()
        getStatisticByBranch()
        getTax()
    }, [branch_id])

    useEffect(() => {
        getTaxByBranch()
    }, [taxid])


    async function getBranchs() {
        var rs = await axios.post("/api/get_branch")
        var rs = rs.data
        var data = rs.data
        console.log(data)
        setBranchs(data)
    }

    async function getTax ()
    {
        var rs = await axios.post("/api/get_tax")
        var rs = rs.data
        var data = rs.data

        console.log(rs)

        setTaxs(data)
    }

    async function getStatisticByBranch () {
        var rq = {
            branchid: branch_id,
            userid: account.user_id
        }
        var rs = await axios.post("/api/salarystatisticbybranch", rq)
        var rs = rs.data
        var data = rs.data
        var tmp = [...salarychart]
        tmp[0].x = []
        tmp[0].y = []
        for(var i=0; i<data.statistic.length; i++){
            tmp[0].x.push(data.statistic[i].date)
            tmp[0].y.push(data.statistic[i].value)
        }
        console.log(tmp)
        setSalaryChart(tmp)
    }

    async function getTaxByBranch () {
        var rq = {
            branchid: branch_id,
            userid: account.user_id,
            taxid: taxid
        }
        var rs = null
        if (taxid == "") {
            rs = await axios.post("/api/GetAllTaxStatisticByBranch", rq)
        }
        else {
            rs = await axios.post("/api/taxstatisticbybranch", rq)
        }
        var rs = rs.data
        var data = rs.data
        console.log(data)
        var tmp = [...taxchart]
        tmp[0].x = []
        tmp[0].y = []
        for(var i=0; i<data.statistic.length; i++){
            tmp[0].x.push(data.statistic[i].date)
            tmp[0].y.push(data.statistic[i].value)
        }
        console.log(tmp)
        setTaxChart(tmp)
    }

    async function getBuyByBranch () {
        var rq = {
            branchid: branch_id,
            userid: account.user_id
        }
        var rs = await axios.post("/api/summary_buy_product_by_branch", rq)
        var rs = rs.data
        var data = rs.data
        var tmp = [...buychart]
        tmp[0].x = []
        tmp[0].y = []
        for(var i=0; i<data.statistic.length; i++){
            tmp[0].x.push(data.statistic[i].data)
            tmp[0].y.push(data.statistic[i].value)
        }
        console.log(tmp)
        setBuyChart(tmp)
    }

    async function getSellByBranch () {
        var rq = {
            branchid: branch_id,
            userid: account.user_id
        }
        var rs = await axios.post("/api/summary_sell_product_by_branch", rq)
        var rs = rs.data
        var data = rs.data
        var tmp = [...sellchart]
        tmp[0].x = []
        tmp[0].y = []
        for(var i=0; i<data.statistic.length; i++){
            tmp[0].x.push(data.statistic[i].data)
            tmp[0].y.push(data.statistic[i].value)
        }
        console.log(tmp)
        setSellChart(tmp)
    }

    async function getReceiptByBranch () {
        var rq = {
            branchid: branch_id,
            userid: account.user_id
        }
        var rs = await axios.post("/api/summary_receipt_by_branch", rq)
        var rs = rs.data
        var data = rs.data
        var tmp = [...receiptchart]
        tmp[0].x = []
        tmp[0].y = []
        for(var i=0; i<data.statistic.length; i++){
            tmp[0].x.push(data.statistic[i].data)
            tmp[0].y.push(data.statistic[i].value)
        }
        console.log(tmp)
        setReceiptChart(tmp)
    }

    async function getInOutByBranch () {
        var rq = {
            branchid: branch_id,
            userid: account.user_id
        }
        var rs = await axios.post("/api/statisticinoutcomebybranch", rq)
        var rs = rs.data
        var data = rs.data
        var tmp = [...inoutchart]
        tmp[0].x = []
        tmp[0].y = []
        for(var i=0; i<data.statistic.length; i++){
            tmp[0].x.push(data.statistic[i].date)
            tmp[0].y.push(data.statistic[i].value.interest)
        }
        setInOutChart(tmp)
    }

    return (
    <>
        <CRow>
            <CCol>
                <CCard>
                    <CCardBody>
                        <CSelect value={branch_id} onChange={(e) => setBranchId(e.target.value)}>
                            <option value="">Chọn chi nhánh</option>
                            {
                                branchs.map((item) =>
                                    <option value={item.branch_id}>{item.branch_location}</option>
                                )
                            }
                        </CSelect>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <CRow>

            <CCol xs="6">
                <CCard>
                    <CCardHeader>
                        <div style={{height: "calc(1.5em + 0.75rem + 2px)"}}>Thống kê  lương</div>
                    </CCardHeader>
                    <CCardBody>
                        <Plot
                            divId={"salarychart"}
                            data={salarychart}
                            useResizeHandler={true}
                            style={{width: "100%", height: "100%"}}
                        />
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs="6">
                <CCard>
                    <CCardHeader>
                        <CRow>
                            <CCol xs="3">
                                Thống kê thuế:
                            </CCol>
                            <CCol>
                                <CSelect value={taxid} onChange={(e) => setTaxId(e.target.value)}>
                                    <option value="">Tất cả</option>
                                    {
                                        taxs.map((item) =>
                                            <option value={item.tax_id}>{item.taxtype}</option>
                                        )
                                    }
                                </CSelect>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <Plot
                            divId={"taxchart"}
                            data={taxchart}
                            useResizeHandler={true}
                            style={{width: "100%", height: "100%"}}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

        <CRow>
            <CCol xs="6">
                <CCard>
                    <CCardHeader>
                        Thống kê mua sản phẩm
                    </CCardHeader>
                    <CCardBody>
                        <Plot
                            divId={"buychart"}
                            data={buychart}
                            useResizeHandler={true}
                            style={{width: "100%", height: "100%"}}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol xs="6">
                <CCard>
                    <CCardHeader>
                        Thống kê bán sản phẩm
                    </CCardHeader>
                    <CCardBody>
                        <Plot
                            divId={"sellchart"}
                            data={sellchart}
                            useResizeHandler={true}
                            style={{width: "100%", height: "100%"}}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

        <CRow>
            <CCol xs="6">
                <CCard>
                    <CCardHeader>
                        Thống kê chi phí phát sinh
                    </CCardHeader>
                    <CCardBody>
                        <Plot
                            divId={"receiptchart"}
                            data={receiptchart}
                            useResizeHandler={true}
                            style={{width: "100%", height: "100%"}}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol xs="6">
                <CCard>
                    <CCardHeader>
                        Thống kê lãi/lỗ
                    </CCardHeader>
                    <CCardBody>
                        <Plot
                            divId={"inoutchart"}
                            data={inoutchart}
                            useResizeHandler={true}
                            style={{width: "100%", height: "100%"}}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </>
    )
}

export default StatisticBranch
