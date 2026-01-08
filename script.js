async function handleSearch() {
    const query = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');
    
    if (!query) {
        resultDiv.innerHTML = "<p class='error'>Please enter something!</p>";
        return;
    }

    resultDiv.innerHTML = "Searching for the truth...";

    try {
        // Yeh call Vercel ke backend functions par jayegi
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Agar API success hai toh result dikhao
            resultDiv.innerHTML = `<strong>Answer:</strong> ${data.answer || JSON.stringify(data)}`;
        } else {
            resultDiv.innerHTML = `<p class='error'>Error: ${data.error || "Something went wrong"}</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = "<p class='error'>Connection Failed. Make sure you are online.</p>";
    }
}
