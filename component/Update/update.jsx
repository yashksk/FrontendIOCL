import { useState, useRef } from 'react';
import styles from '../Alert/alert.module.css'
import { useCookies } from "react-cookie"

export default function Update({ material }) {
    const [cookie, setCookie] = useCookies(["user"]);
    const Yearly = useRef();
    const reqMonth = useRef();
    const Month = useRef();
    const Stock = useRef();
    const [threeMonth, setThreeMonth] = useState(material.actualReqForThree);
    const [stock, setStock] = useState(material.stockInHand);
    const [days, setDays] = useState(material.daysLeft.toFixed(0));
    function handleChange() {
        setStock(Stock.current.value);
        setThreeMonth(Month.current.value);
        setDays((stock / threeMonth) * 3 * 26);
    }

    async function handleUpdate() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${cookie.user}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "avgConsumption": Yearly.current.value,
            "reqForThreeMonths": reqMonth.current.value,
            "actualReqForThree": threeMonth,
            "stockInHand": stock,
            "daysLeft": days
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        console.log(material._id);
        const response = await fetch(`http://localhost:3001/materials/${material._id}`, requestOptions);
        console.log(await response.json());
        if (response.status == 201) {
            alert("Successful")
        } else {
            alert("Something went wrong");
        }
    }
    return (
        <div className={styles.alertOuter2} style={{ border: `1.5px dotted black`, background: `white` }}>
            <div className={styles.alertColumn3}>
                <div className={styles.alertRow}>
                    <div className={styles.alertIndiA}>Material Code</div>
                    <div className={styles.alertIndiB}>{material.materialCode}</div>
                </div>
                <div className={styles.alertRow}>
                    <div className={styles.alertIndiA}>Avg Yearly Con.</div>
                    <input style={{ background: "transparent", border: "none" }} ref={Yearly} className={styles.alertIndiB} defaultValue={material.avgConsumption} type='Number' />
                </div>
            </div>
            <div className={styles.alertColumn3}>
                <div className={styles.alertRow}>
                    <div className={styles.alertIndiA}>3 Month req.</div>
                    <input style={{ background: "transparent", border: "none" }} ref={reqMonth} className={styles.alertIndiB} defaultValue={material.reqForThreeMonths} type='Number' />
                </div>
                <div className={styles.alertRow}>
                    <div className={styles.alertIndiA}>3 Month actual</div>
                    <input style={{ background: "transparent", border: "none" }} className={styles.alertIndiB} defaultValue={threeMonth} type='Number' ref={Month} onChange={handleChange} />
                </div>
            </div>
            <div className={styles.alertColumn3}>
                <div className={styles.alertRow}>
                    <div className={styles.alertIndiA}>Stock in Hand</div>
                    <input style={{ background: "transparent", border: "none" }} className={styles.alertIndiB} defaultValue={stock} type='Number' ref={Stock} onChange={handleChange} />
                </div>
                <div className={styles.alertRow}>
                    <div className={styles.alertIndiA}>Days left</div>
                    <div className={styles.alertIndiB}>{days}</div>
                </div>
            </div>
            <button className={styles.sendButton} onClick={handleChange}>Set</button>
            <button className={styles.sendButton} onClick={handleUpdate}>Update</button>
        </div>
    );
}