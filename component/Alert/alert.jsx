import styles from "./alert.module.css"
import AlertCard from "./alertCard";

export default function AlertBox({ materials }) {
    return (
        <div className={styles.background}>
            <div className={styles.border}>
                <div className={styles.alert}>Alert</div>
                <div className={styles.alertBoxOuter}>
                    {materials.map((material) => {
                        return (
                            <AlertCard material={material} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}