import React from "react";
import Button from "./Button";


export default function OperationalCard({ title, desc, image }) {
    return (
        <>
            <div className="grid place-items-center shadow-lg border-t p-8 mt-10 rounded-lg">
                <div className="grid gap-6">
                    <img src={image} alt={title} />
                    <h2 className="text-[1.5rem] font-bold uppercase">{title}</h2>
                    <p>{desc}</p>
                    <Button>Detail</Button>
                </div>
            </div>
        </>
    );
}
