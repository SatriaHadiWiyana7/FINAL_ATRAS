import React from "react";

export default function Heading({title, description}) {
    return (
        <>
            <h1 className="text-5xl font-medium text-center ">{title}</h1>
            <p className="text-xl text-center">
               {description}
            </p>
        </>
    );
}
