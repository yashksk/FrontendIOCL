import { useEffect, useState } from 'react';
import styles from './navbar.module.css'
import Image from "next/image";
import Link from 'next/link';
import * as XLSX from 'xlsx';

export default function Navbar() {
    const [selected, setSelected] = useState('');
    useEffect(() => {
        const page = window.location.href;
        const pageName = page.split("/")[3];
        setSelected(pageName)
    })
    async function downloadData() {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const response = await fetch("http://localhost:3001/materials/inven", requestOptions);
            const jsonResponse = await response.json();
            const worksheet = XLSX.utils.json_to_sheet(jsonResponse);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "Additive Inventory.xlsx");
        } catch (err) {
            console.log(err);
            return {
                redirect: {
                    destination: "/404",
                    permanent: false,
                }
            }
        }
    }
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <Image src="/images/logo.svg" width={138} height={93} />
                <div style={{ position: "relative" }}>
                    <Image style={{ marginLeft: "-30px" }} src='/images/tag.svg' width={260} height={37} />
                    <div className={styles.title}>Inventory Management</div>
                </div>
            </div>
            <div className={styles.verticaldiv}></div>
            <Link href='/'>
                <div className={styles.navlink} style={selected == '' ? { backgroundColor: "#D9D9D9" } : {}}>Alert</div>
            </Link>
            <div className={styles.verticaldiv}></div>
            <Link href='/inventory'>
                <div className={styles.navlink} style={selected == 'inventory' ? { backgroundColor: "#D9D9D9" } : {}}>Additive Inventory</div></Link>
            <Link href='/upload'>
                <div className={styles.upload}>Upload</div>
            </Link>
            <div className={styles.download} onClick={downloadData}>Download</div>
        </div>
    );
}