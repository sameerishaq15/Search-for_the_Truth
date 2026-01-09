async function handleSearch() {
    const query = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');
    
    // Aapki Gemini API Key
    const apiKey = "AIzaSyCZ4NZMhDsg8m_3B-cIUSYtl9ymGKkLFnM"; 

    if (!query) {
        resultDiv.innerHTML = "<p style='color:red;'>Kuch sawal likhein...</p>";
        return;
    }

    resultDiv.innerHTML = "<p style='color:#1a472a;'>Searching in Quran & Sahih Hadith...</p>";

    try {
        // Humne yahan version 'v1beta' se badal kar 'v1' kar diya hai jo zyada stable hai
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;
        
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
            // Agar abhi bhi error aaye toh humein wajh saaf dikhegi
            resultDiv.innerHTML = `<p style='color:red;'>API Error: ${data.error.message}</p>`;
            return;
        }

        if (data.candidates && data.candidates[0].content) {
            const answer = data.candidates[0].content.parts[0].text;
            resultDiv.innerHTML = `
                <div style="background:#fff; border-left:6px solid #c5a059; padding:20px; border-radius:10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-top:20px;">
                    <h4 style="color:#1a472a; margin:0 0 10px 0;">Search Result:</h4>
                    <div style="line-height:1.6; color:#333; white-space: pre-wrap;">${answer}</div>
                </div>`;
        } else {
            resultDiv.innerHTML = "<p style='color:red;'>No answer found. Try rephrasing your question.</p>";
        }
            
    } catch (error) {
        resultDiv.innerHTML = "<p style='color:red;'>Connection issue. Please check your internet or key.</p>";
    }
}
