import { app as app } from "./app.js";
import { db as db } from "./database/database.js";
import 'dotenv/config'

db.sequelize.sync({ alter: false }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`listening on: http://localhost:${process.env.PORT}`);
  });
});
