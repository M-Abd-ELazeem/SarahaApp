

export const seccessResponse = ({ res, message = "Done", data = {}, status = 200 } = {}) => {
    return res.status(status).json({ message: message, data: { ...data } });
} 