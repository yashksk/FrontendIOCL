import Link from 'next/link';

export default function ErrorPage(){
    return(
        <div>
            Something went wrong
            <Link href={"/"}>
            <button>Go Back</button>
            </Link>
        </div>
    );
}