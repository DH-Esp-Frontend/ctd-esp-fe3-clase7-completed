import * as jose from 'jose'
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    token: string;
    expiresIn: number;
} | {
    error: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "POST"){

        const algorithm = 'ES256'
        const pkcs8 = `-----BEGIN PRIVATE KEY-----
    MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgiyvo0X+VQ0yIrOaN
    nlrnUclopnvuuMfoc8HHly3505OhRANCAAQWUcdZ8uTSAsFuwtNy4KtsKqgeqYxg
    l6kwL5D4N3pEGYGIDjV69Sw0zAt43480WqJv7HCL0mQnyqFmSrxj8jMa
    -----END PRIVATE KEY-----`
        const ecPrivateKey = await jose.importPKCS8(pkcs8, algorithm);

        const token = await new jose.SignJWT({ 'user': true })
            .setProtectedHeader({ alg: 'ES256' })
            .setIssuedAt()
            .setIssuer('DH')
            .setExpirationTime('2h')
            .sign(ecPrivateKey)

        res.status(200).json({ token: token, expiresIn: 3600 });
    }else {
        res.status(405).json({ error: "Method not allowed" });
    }
}