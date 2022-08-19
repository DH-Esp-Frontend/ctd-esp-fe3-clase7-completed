import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    data: any[];
} | {
    error: string;
}

// GET /api/profile/15

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "GET"){
        const {id}=req.query
        fetch(`https://randomuser.me/api/?results=1&seed=abc&page=` + id).then(async (response) => {
            const data = await response.json();
            res.status(200).json( {data: data.results[0]});
        }).catch(err => {
            res.status(500).json({ error: "Server error" });
        });
    }else {
        res.status(405).json({ error: "Method not allowed" });
    }
}