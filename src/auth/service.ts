import bcrypt from 'bcrypt';


export const createPasswordHash = async (password: string) => {
    try {
        return await bcrypt.hash(password, 12);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const validatePasswordHash = async (password: string, hashedPassword: string) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error(error);
        throw error;
    }
}