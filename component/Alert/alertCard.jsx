import { useEffect, useState } from "react";
import styles from "./alert.module.css"
import Link from 'next/link';

export default function AlertCard({ material }) {
    const [border, setBorder] = useState("1.5px solid #EDD8D8");
    const [background, setBackground] = useState("#FEF5F6");
    useEffect(() => {
        if (material.daysLeft < 45) {
            setBorder("1.5px solid #EDD8D8");
            setBackground("#FEF5F6");
        }
        else if (45 <= material.daysLeft < 90) {
            setBorder("1.5px solid #F1E0CE");
            setBackground("#FFF5EB");
        }
        if (90 <= material.daysLeft) {
            console.log("here");
            setBorder("1.5px solid #E3F1EB");
            setBackground("#F4FCF7");
        }
    })
    return (
        <Link href={`/${material._id}`}>
            <div className={styles.alertOuter} style={{ border: `${border}`, background: `${background}` }}>
                <div className={styles.alertColumn}>
                    <div className={styles.alertRow}>
                        <div className={styles.alertIndiA}>Material Code</div>
                        <div className={styles.alertIndiB}>{material.materialCode}</div>
                    </div>
                    <div className={styles.alertRow}>
                        <div className={styles.alertIndiA}>Avg Yearly Con.</div>
                        <div className={styles.alertIndiB}>{material.avgConsumption.toFixed(3)}</div>
                    </div>
                </div>
                <div className={styles.alertColumn}>
                    <div className={styles.alertRow}>
                        <div className={styles.alertIndiA}>3 Month req.</div>
                        <div className={styles.alertIndiB}>{material.reqForThreeMonths.toFixed(3)}</div>
                    </div>
                    <div className={styles.alertRow}>
                        <div className={styles.alertIndiA}>3 Month actual</div>
                        <div className={styles.alertIndiB}>{material.actualReqForThree.toFixed(3)}</div>
                    </div>
                </div>
                <div className={styles.alertColumn}>
                    <div className={styles.alertRow}>
                        <div className={styles.alertIndiA}>Stock in Hand</div>
                        <div className={styles.alertIndiB}>{material.stockInHand.toFixed(3)}</div>
                    </div>
                    <div className={styles.alertRow}>
                        <div className={styles.alertIndiA}>Days left</div>
                        <div className={styles.alertIndiB}>{material.daysLeft.toFixed(0)}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
}