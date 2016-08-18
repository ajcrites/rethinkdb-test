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
            if (2 === args.length) {
                const user = args[1];
                const todos = await r.table("todo").filter({user}).without("user").run(conn);
                return res.end(JSON.stringify(await todos.toArray()));
            }
            if (
                4 === args.length && "POST" === req.method.toUpperCase()
                && args[1] === "todo"
            ) {
                const id = args[2];
                const complete = args[3] === "complete";
                await r.table("todo").get(id).update({complete}).run(conn);
                return res.end();
            }

            res.writeHead(404);
            res.end();
        });

        server.listen(process.env.PORT || 8000);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
