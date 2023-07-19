import Navbar from '@/component/Navbar/navbar'
import styles from '../component/Alert/alert.module.css'
import Additive from '@/component/Inventory/additive';

export default function Inventory({ materials }) {
    return (
        <div style={{ backgroundColor: "#FFF", height: "100vh" }}>
            <Navbar />
            <div style={{ marginLeft: "360px" }}>
                <div className={styles.background}>
                    <div className={styles.border}>
                        <div className={styles.alert}>Additive Inventory</div>
                        <div className={styles.alertBoxOuter}>
                            {materials.map((material) => {
                                return (
                                    <Additive material={material} />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ query, req }) {
    let materials;
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:3001/materials/inven", requestOptions);
        const jsonResponse = await response.json();
        materials = jsonResponse;
    } catch (err) {
        console.log(err);
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            }
        }
    }
    return {
        props: {
            materials
        },
    };
}