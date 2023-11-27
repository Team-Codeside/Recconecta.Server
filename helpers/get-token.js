const getToken = (req) => {
    const authHeader = req.headers.authorization;
    
    // Dividir a string do cabeçalho de autorização usando espaços em branco
    const tokenArray = authHeader.split(" ");

    // O token estará no segundo elemento do array (índice 1)
    const token = tokenArray[1];

    return token;
}

module.exports = getToken;