import Navbar from "@/component/Navbar/navbar";
import { useState } from "react";
import * as xlsx from 'xlsx';
import { useCookies } from "react-cookie"

export default function Upload() {
    const [cookie, setCookie] = useCookies(["user"]);
    const [data, setData] = useState();
    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName1 = workbook.SheetNames[0];
                const worksheet1 = workbook.Sheets[sheetName1];
                const json1 = xlsx.utils.sheet_to_json(worksheet1);
                setData(json1);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }

    async function sendData() {
        try {

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${cookie.user}`);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "materials": data
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch("http://localhost:3001/materials/", requestOptions);
            const jsonResponse = await response.json();

            if (response.status == 201) {
                alert("Successful")
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div style={{ backgroundColor: "#FFF", height: "100vh" }}>
            <Navbar />
            <div style={{ marginLeft: "360px", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <form>
                    <label htmlFor="upload" style={{ color: "black", marginRight: "20px" }}>Upload Additive inventory File</label>
                    <input
                        type="file"
                        name="upload"
                        id="upload"
                        onChange={readUploadFile}
                        style={{ color: "black" }}
                    />
                </form>
                <button onClick={sendData}>Send File</button>
            </div>
        </div>
    );
}