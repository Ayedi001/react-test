import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Model from "./componenets/model"

const App: React.FC = () => (
    <div className=" w-full h-full  bg-blue-50 ">
        <div className=" flex justify-center items-center text-blue-700  text-1xl font-bold ">
            <h2 className=" font-light  m-5 ">
                Lets plan your <span className=" font-bold  ">loan</span>.
            </h2>
        </div>

        <Model />
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"))
