async function handleSearch() {
    const query = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');
    
    // Aapki Key yahan hai
    const apiKey = "AIzaSyCZ4NZMhDsg8m_3B-cIUSYtl9ymGKkLFnM"; 

    if (!query) {
        resultDiv.innerHTML = "<p style='color:red;'>Kuch sawal likhein...</p>";
        return;
    }

    resultDiv.innerHTML = "<p style='color:#1a472a;'>Searching in Quran & Sahih Hadith...</p>";

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `You are an Islamic Scholar. Answer the question: "${query}" using only authentic Sahih al-Bukhari, Sahih Muslim, and Quranic references. Answer in Roman Urdu/Hindi but keep the Arabic/English references clear.` }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `<p style='color:red;'>Key Error: ${data.error.message}. Please check if Gemini API is enabled in Google AI Studio.</p>`;
            return;
        }

        const answer = data.candidates[0].content.parts[0].text;
        resultDiv.innerHTML = `
            <div style="background:#fff; border-left:6px solid #c5a059; padding:20px; border-radius:10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-top:20px;">
                <h4 style="color:#1a472a; margin:0 0 10px 0;">Search Result:</h4>
                <div style="line-height:1.6; color:#333; white-space: pre-wrap;">${answer}</div>
            </div>`;
            
    } catch (error) {
        resultDiv.innerHTML = "<p style='color:red;'>System busy. Check your internet or API key settings.</p>";
    }
}
