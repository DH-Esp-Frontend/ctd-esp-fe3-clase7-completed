import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose'

export async function middleware(req: NextRequest) {

    const algorithm = 'ES256'
    const spki = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEFlHHWfLk0gLBbsLTcuCrbCqoHqmM
YJepMC+Q+Dd6RBmBiA41evUsNMwLeN+PNFqib+xwi9JkJ8qhZkq8Y/IzGg==
-----END PUBLIC KEY-----`
    const ecPublicKey = await jose.importSPKI(spki, algorithm)


    const { pathname } = req.nextUrl; // /api/users 
    console.log("Pathname: " + pathname);

    const authorization = req.headers.get("authorization");

    if (!authorization) return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
    
    try{
        const { payload, protectedHeader } = 
            await jose.jwtVerify(authorization, ecPublicKey, {
            issuer: 'DH'
        })

        console.log(protectedHeader)
        console.log(payload)
    } catch(err){
        console.log(err)
        return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/profile/:path*']
};