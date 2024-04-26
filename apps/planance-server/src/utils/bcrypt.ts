import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hash(password, salt);
    
}

export function comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
}