/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react"

interface props {
    id: string
    interest: string
    name: string
    min_amount: string
    max_amount: string
    min_tenure: string
    max_tenure: string
    image: string
}
interface Loan {
    LId: string
    Months: number
    amount: any
    totalAmount: any
    monthlyInstallment: any
    targetMonth: any
}

const Model: React.FC<props> = () => {
    const [data, setdata] = React.useState([
        {
            id: "20",
            interest: "4.500",
            name: "Cash Loan",
            min_amount: "1500.000",
            max_amount: "25000.000",
            min_tenure: "24",
            max_tenure: "60",
            image: "https://cdn.pixabay.com/photo/2018/10/01/22/57/dollar-3717534_960_720.png",
        },
    ])

    const [loan, setLoan] = useState<Loan[]>({
        LId: "20",
        Months: "1",
        amount: "10000",
        totalAmount: "1",
        monthlyInstallment: "1",
        targetMonth: "1",
    })
    const IdHandler = (id: any, min_amount: any, min_tenure: any, loan: any) => {
        setLoan({
            LId: id,
            Months: parseInt(min_tenure),
            amount: parseInt(min_amount),
            totalAmount: total,
            monthlyInstallment: monthlyinstallment(total, months),
            targetMonth: months,
        })

        setmonths((prev: any) => (prev = loan.Months))
        setLoanamount((prev: any) => (prev = loan.amount))
    }
    console.log(loan)
    const [product, setProduct] = React.useState<any>([])
    useEffect(() => {
        fetch("/products.json")
            .then((res) => res.json())
            .then((data) => JSON.stringify(data))
            .then((data) => JSON.parse(data))
            .then((data) => {
                setProduct(data)
            })
    }, [])

    const [months, setmonths] = React.useState(loan.Months)
    const inc = () => {
        setmonths((prev: number) => prev + 1)
    }
    const dec = () => {
        setmonths((prev: number) => prev - 1)
    }
    const cli = (loan: any) => {}
    const [loanamount, setLoanamount] = useState(parseInt(loan.amount))

    const t = new Date().getTime() + 2592000000 * months
    const r = new Date(t).toString().split(" ")

    const totalamount = (loanamount: any, data: any) => {
        return parseFloat(loanamount) + parseFloat(loanamount) * parseFloat(data[0].interest)
    }
    const total: number = totalamount(loanamount, data)

    const monthlyinstallment = (total: any, months: any) => {
        return parseFloat(total) / parseFloat(months)
    }
    const monthly: any = monthlyinstallment(total, months)

    return (
        <>
            <div className=" flex items-center justify-center  ">
                <div className="w-[450px] h-[500px] shadow-lg rounded-md p-6  bg-white ">
                    <div className="flex justify-center m-3 pt-6 ">
                        {product.map(({ image, id, min_amount, min_tenure }) => (
                            <img
                                src={image}
                                key={id}
                                className="h-10"
                                onClick={() => {
                                    IdHandler(id, min_amount, min_tenure, loan)
                                }}
                            />
                        ))}
                    </div>
                    <div className=" grid gap-4 pb-4 grid-cols-3 ">
                        <div className="col-span-2 ">
                            <span className="text-xs font-semibold  text-gray-600 ">
                                {" "}
                                Loan Amount{" "}
                            </span>
                            <div className="rounded h-14 flex  container border   ">
                                <span className="px-3 pt-3 text-gray-500	  font-bold text-2xl ">
                                    $
                                </span>
                                <input
                                    type="number"
                                    className="text-left overflow-hidden outline-none text-gray-500 font-bold text-2xl "
                                    value={loanamount}
                                    onChange={(e) => setLoanamount(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-start-3 ">
                            <div className="text-xs  font-semibold text-gray-600">
                                Number Of Months
                            </div>
                            <div className="grid grid-cols-5 border rounded h-14">
                                <button className="m-3" onClick={dec}>
                                    <span className="text-sm text-gray-600 "> &lt; </span>
                                </button>

                                <input
                                    className="text-center col-span-3 outline-none  text-gray-600"
                                    type="text"
                                    name="Months"
                                    value={months}
                                />

                                <button className="m-3" onClick={inc}>
                                    <span className="text-sm text-gray-600"> &gt; </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="container border rounded-lg   ">
                        <div className="flex m-6 pl-3 pr-6 justify-between items-end">
                            <div className=" text-base text-gray-600  ">Monthly Amount</div>
                            <div className=" text-blue-600 font-bold font-sans  text-2xl">
                                <span> ${parseInt(monthly)} </span>
                            </div>
                        </div>

                        <p className=" font-sans text-sm bg-clip-border bg-blue-50 p-3 pl-4 ">
                            you re planning <span className="font-bold ">{months}</span> monthly
                            deposits to reach your <span className="font-bold  ">{loanamount}</span>{" "}
                            goal by <span className="font-bold  ">{r[1] + " " + r[3]}</span>
                            .the total amount loadned will be{" "}
                            <span className="font-bold  "> {total}</span>.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <button className=" grid grid-cols-3 w-[320px] h-[50px] ml-2 mr-2 m-6  bg-blue-500  text-white font-bold  py-3 rounded-full">
                            <span className=" col-start-2 text-basic rounded-2xl text-white ">
                                Apply Now
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Model
