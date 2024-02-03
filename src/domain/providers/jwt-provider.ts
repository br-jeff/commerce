import settings from '../../external/config/settings'
import { sign, verify } from 'jsonwebtoken'

type AcessTokenData = {
    id: string
    username: string
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

    verifyToken(token: string) {
        return verify(token, settings.ACESS_TOKEN_SECRET)
    }

}