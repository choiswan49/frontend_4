const html = (brand)=>{
    const str = `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>${brand}</h1>
        </body>
        </html>
    `

    return str;
}

module.exports = html;