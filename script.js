async function handleSearch() {
    const query = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');
    
    if (!query) {
        resultDiv.innerHTML = "<p style='color:red;'>Please enter a topic to search.</p>";
        return;
    }

    resultDiv.innerHTML = "<p>Searching authentic sources...</p>";

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '681a044e6fmsh0d04b9c03a990d9p1c6216jsn79d78c361496',
            'x-rapidapi-host': 'hadiths-api.p.rapidapi.com'
        }
    };

    try {
        // Aapki di hui collection URL
        const response = await fetch('https://hadiths-api.p.rapidapi.com/collections/639caf9a9ba6cf29e8b8c221', options);
        const data = await response.json();

        if (data && data.hadiths) {
            // User ke topic ke hisaab se filter karna
            const filtered = data.hadiths.filter(h => 
                h.english.toLowerCase().includes(query.toLowerCase())
            );

            if (filtered.length > 0) {
                let html = "";
                filtered.slice(0, 5).forEach(h => {
                    html += `
                        <div class="hadith-card">
                            <span class="ref">Source: Sahih Collection</span>
                            <p>${h.english}</p>
                        </div>`;
                });
                resultDiv.innerHTML = html;
            } else {
                resultDiv.innerHTML = "<p>No exact match found in this collection. Try keywords like 'Faith', 'Love', or 'Water'.</p>";
            }
        }
    } catch (error) {
        resultDiv.innerHTML = "<p style='color:red;'>Error: Could not connect to API. Please check your key quota.</p>";
        console.error(error);
    }
}
