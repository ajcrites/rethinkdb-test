import r from 'rethinkdb';
import issues from './seed-db';

(async () => {
    try {
        let conn = await r.connect({port: process.env.PORT || 28015});

        // Ensure db/table/key creation
        await r.dbCreate("issues").run(conn);
        await r.db("issues").tableCreate("issues").run(conn);
        await r.db("issues").table("issues").insert(issues).run(conn);

        await conn.close();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
