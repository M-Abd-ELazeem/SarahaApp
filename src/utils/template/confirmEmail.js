export const confirmEmailTemplate=({link}={})=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Email</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
    <div style="background-color: #ffffff; width: 90%; max-width: 600px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden; text-align: center;">
        <div style="background-color: #4caf50; color: #ffffff; padding: 20px;">
            <h1 style="margin: 0; font-size: 24px;">Welcome to Our Service!</h1>
        </div>
        <div style="padding: 20px; color: #333333;">
            <p style="margin: 10px 0; font-size: 16px;">Hello,</p>
            <p style="margin: 10px 0; font-size: 16px;">Thank you for signing up! Please confirm your email address by clicking the button below:</p>
            <a href="${link}" style="display: inline-block; background-color: #4caf50; color: #ffffff; text-decoration: none; padding: 12px 20px; font-size: 16px; border-radius: 4px; margin: 20px 0; transition: background-color 0.3s ease;">Confirm Email</a>
        </div>
        <div style="background-color: #f4f4f4; color: #888888; padding: 10px 20px; font-size: 14px;">
            <p style="margin: 10px 0;">If you didn't request this, please ignore this email.</p>
            <p style="margin: 10px 0;">&copy; 2024 Our Service, All Rights Reserved</p>
        </div>
    </div>
</body>
</html>
`
}