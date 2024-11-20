export default function Footer() {
    return (
        <div className="flex flex-col justify-center items-center gap-5 bg-[--primary] text-white p-5 ">

            <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48"><g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}><path fill="white" d="M13 19a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v19s0 6-6 6h-8c-6 0-6-6-6-6z"></path><path d="M18 12h10v5H18zm0 0V9c0-3 3-5 6-5h11s-7 2-7 6v2"></path></g></svg>
                <div className="text-2xl font-bold">True Skin</div>
            </div>

            <div className="text-xs">Copyright © 2024 True Skin. All rights reserved</div>

        </div>
    )
}