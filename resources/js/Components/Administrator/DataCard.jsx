import React from "react";
import { Card, CardContent } from "@mui/material";

export default function DataCard(data) {
    const { title, value } = data;
    return (
        <Card sx={{ width: '100%', color: '#fff' }} className="gradient">
            <CardContent>
				<span className="text-3xl font-bold">{value}</span>
                <h1 className="text-white text-xl mt-2">{title}</h1>
            </CardContent>
        </Card>
    );
}
