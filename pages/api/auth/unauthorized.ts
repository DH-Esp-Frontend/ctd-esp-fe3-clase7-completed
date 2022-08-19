import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { error: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(401).json( {error: "Acceso invalido"}); 
};