import r from 'rethinkdb';

(async () => {
    try {
        let conn = await r.connect({port: process.env.PORT || 28015});
        let cursor = await r.db("issues").table("issues").run(conn);

        await cursor.eachAsync(row => console.log(row));
        cursor = await r.db("issues").table("issues").changes().run(conn);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
