async function handleSearch() {
    const query = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');
    
    if (!query) {
        resultDiv.innerHTML = "<p class='error-msg'>Please enter a topic to search.</p>";
        return;
    }

    resultDiv.innerHTML = "<p style='color: #1a472a;'>Searching in Sahih Collections...</p>";

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '681a044e6fmsh0d04b9c03a990d9p1c6216jsn79d78c361496',
            'x-rapidapi-host': 'hadiths-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch('https://hadiths-api.p.rapidapi.com/collections/639caf9a9ba6cf29e8b8c221', options);
        const data = await response.json();

        if (data && data.hadiths) {
            const filtered = data.hadiths.filter(h => 
                h.english.toLowerCase().includes(query.toLowerCase())
            );

            if (filtered.length > 0) {
                let html = "<h4>Results Found:</h4>";
                filtered.slice(0, 5).forEach(h => {
                    html += `
                        <div class="hadith-card">
                            <span class="source-label">Sahih Bukhari/Muslim</span>
                            <p style="font-size: 1.1rem; line-height: 1.6;">${h.english}</p>
                            <p style="color: #888; font-size: 12px;">ID: ${h.id}</p>
                        </div>`;
                });
                resultDiv.innerHTML = html;
            } else {
                resultDiv.innerHTML = "<p>Maaf kijiye, koi reference nahi mila. Try keywords like 'Water', 'Hell', or 'Prayer'.</p>";
            }
        }
    } catch (error) {
        resultDiv.innerHTML = "<p class='error-msg'>Connection Error. Please check your API quota.</p>";
        console.error(error);
    }
}
