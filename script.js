async function handleSearch() {
    const query = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');
    
    // Aapki Gemini API Key yahan set hai
    const apiKey = "AIzaSyCZ4NZMhDsg8m_3B-cIUSYtl9ymGKkLFnM"; 

    if (!query) {
        resultDiv.innerHTML = "<p style='color:red;'>Please enter your question.</p>";
        return;
    }

    resultDiv.innerHTML = "<p style='color: #1a472a;'>Searching authentic references (Quran & Hadith)...</p>";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `You are an Islamic Scholar. Answer the user's question: "${query}" using only authentic Sahih al-Bukhari, Sahih Muslim, and Quranic references. Give the answer in Roman Urdu/Hindi (for the explanation) but keep the Arabic/English references very clear. If you don't find a direct reference, say so honestly.` }]
                }]
            })
        });

        const data = await response.json();
        const answer = data.candidates[0].content.parts[0].text;

        // Jawab ko sundar tareeke se dikhana
        resultDiv.innerHTML = `
            <div style="background:#fff; border-left:6px solid #c5a059; padding:20px; border-radius:10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-top:20px;">
                <h4 style="color:#1a472a; margin-top:0;">Search Result:</h4>
                <div style="line-height:1.6; color:#333; white-space: pre-wrap;">${answer}</div>
            </div>`;
    } catch (error) {
        resultDiv.innerHTML = "<p style='color:red;'>System busy ya key ka masla hai. Ek baar check karein ya thodi der baad koshish karein.</p>";
        console.error(error);
    }
}
