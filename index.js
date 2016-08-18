import {createServer} from 'http';
import r from 'rethinkdb';


(async () => {
    try {
        const conn = await r.connect({port: 28015, db: "todo"});
        const cursor = await r.table("todo").changes().run(conn);

        cursor.each((err, row) => console.log(row));

        const server = createServer(async (req, res) => {
            if ("/" === req.url) {
                const lists = await r.table("todo").eqJoin("user", r.table("users"))
                    .without({left: "user"}).zip().run(conn);
                return res.end(JSON.stringify(await lists.toArray()));
            }

            const args = req.url.split("/");
            if (2 == args.length) {
                const user = args[2];
                await r.table("todo").get;
            }
            res.end();
        });

        server.listen(process.env.PORT || 8000);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
