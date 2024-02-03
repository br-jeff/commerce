import settings from '../../external/config/settings'
import { sign, verify } from 'jsonwebtoken'

type AcessTokenData = {
    id: string
    username: string
}

type VerifyToken = {
    user: { id: string, username: string },
    iat: number,
    exp: number
}

export class JWTProvider {
    createAcessToken(data: AcessTokenData) {
        const payload = {
            user: data
        }

        return sign(
            payload,
            settings.ACESS_TOKEN_SECRET,
            { expiresIn: '20m' }
        )
    }

    verifyToken(token: string): VerifyToken {
        return verify(token, settings.ACESS_TOKEN_SECRET) as VerifyToken
    }

}