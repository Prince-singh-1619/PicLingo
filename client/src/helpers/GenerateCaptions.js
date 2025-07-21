const GenerateCaptions = async () => {
    try {
        const res = await fetch('/captions.json');
        const data = await res.json();

        // Get all unique keywords
        const allKeywords = new Set();
        data.forEach(item => item.keywords.forEach(k => allKeywords.add(k)));

        // Pick 4 to 6 random keywords, or as many as available if fewer
        const keywordsArray = Array.from(allKeywords);
        const minKeywords = Math.min(4, keywordsArray.length);
        const maxKeywords = Math.min(6, keywordsArray.length);
        const count = keywordsArray.length === 0 ? 0 : (keywordsArray.length < 4 ? keywordsArray.length : Math.floor(Math.random() * (maxKeywords - minKeywords + 1)) + minKeywords);
        const selectedKeywords = [];
        while (selectedKeywords.length < count) {
            const k = keywordsArray[Math.floor(Math.random() * keywordsArray.length)];
            if (!selectedKeywords.includes(k)) selectedKeywords.push(k);
        }

        // Find captions matching the selected keywords
        const matches = data.filter(item =>
            item.keywords.some(k => selectedKeywords.includes(k))
        );

        // Shuffle and select up to 5 captions, but at least 1 if available
        const shuffled = matches.sort(() => 0.5 - Math.random());
        const captions = shuffled.slice(0, Math.max(1, Math.min(5, shuffled.length))).map(item => item.caption);

        return {
            keywords: selectedKeywords,
            title: captions
        };
    } 
    catch (err) {
        console.error("Error generating captions:", err);
        return null;
    }
};

export default GenerateCaptions