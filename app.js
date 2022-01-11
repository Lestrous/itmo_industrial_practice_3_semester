export default (express, bodyParser, http, mongoose, Term) => {
    const app = express();

    const CORS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type,Accept,Access-Control-Allow-Headers'
    };

    const styles = `
        <style>
            body {
                background-color: lightyellow;
            }
            
            h1 {
                
            }
            
            .term_container {
                
            }
            
            .link {
                
            }
        </style>
    `;

    app
        .use((r, res, next) => { r.res.set(CORS); next(); })
        .use(bodyParser.urlencoded({ extended: true }))
        .use(bodyParser.json())

        .get('/', async (req, res) => {
            const terms = await Term.find();

            let layout = `
                <!DOCTYPE html>
                <html lang="ru">
                <head>
                    <meta charset="UTF-8">
                    <title>Глоссарий</title>
                    ${styles}
                </head>
                <body>
                    <h1>Глоссарий</h1>
                    <div class="term_container">
            `;

            terms.forEach(term => {
                layout += `
                    <a class="link" href="/${term['name']}">${term['title']}</a>
                    <br>
                `;
            });

            layout += `
                    </div>
                </body>
                </html>
            `;

            res.send(layout);
        })
        .get('/:name', async (req, res) => {
            const { name } = req.params;

            const termInfo = await Term.find({ name });

            if (termInfo.length > 0) {
                res.send(`<!DOCTYPE html>
                    <html lang="ru">
                    <head>
                        <meta charset="UTF-8">
                        <title>${termInfo[0]['title']}</title>
                        ${styles}
                    </head>
                    <body>
                        <div class="term_container">
                            <h1>${termInfo[0]['title']}</h1>
                            <p>${termInfo[0]['description']}</p>
                            <br>
                            <a class="link" href="/">На главную</a>
                        </div>
                    </body>
                    </html>
                `);
            } else {
                res.send('Нет такого термина');
            }
        })
        .all('/*', (req, res) => res
            .send('Shtol Leonid')
        );

    return app;
}
