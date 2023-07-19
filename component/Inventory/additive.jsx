import styles from '../Alert/alert.module.css'
import Link from 'next/link';

export default function Additive({ material }) {
    return (
        <Link href={`/${material._id}`}>
            <div className={styles.alertOuter} style={{ border: `1.5px solid black`, background: `white` }}>
                <div className={styles.alertColumn}>
                    <div className={styles.alertRow}>
                        <div className={styles.alertIndiB}>{material.materialCode}</div>
                    </div>
                </div>
                <div className={styles.alertColumn}>
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
                </div>
                <div className={styles.alertColumn}>
                    <div className={styles.alertRow}>
                        <div className={styles.alertIndiA}>Coverage(Days)</div>
                        <div className={styles.alertIndiB}>{material.daysLeft.toFixed(0)}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
}