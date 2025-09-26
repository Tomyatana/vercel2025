import "dotenv/config"

export const VERY_SECRET_JWT_KEY = process.env.VERY_SECRET_JWT_KEY;

export const JWT_OPTS = {
    expiresIn: '1h',
}

