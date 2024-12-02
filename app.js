const convertCurrency = async (baseCurrency, targetCurrency, amount) => {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const data = await response.json();
        const rate = data.rates[targetCurrency];
        
        if (!rate) throw new Error('Invalid currency');
        
        return {
            rate: rate,
            convertedAmount: amount * rate
        };
    } catch (error) {
        console.error('Conversion error:', error);
        return null;
    }
};

// Example usage
async function handleConversion() {
    const result = await convertCurrency('USD', 'EUR', 100);
    if (result) {
        console.log(`Rate: ${result.rate}`);
        console.log(`Converted Amount: ${result.convertedAmount}`);
    }
}

handleConversion();