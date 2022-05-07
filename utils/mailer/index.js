require('dotenv').config();

module.exports.Config = {
    pass_mailer: `${process.env.PASS_MAILER}`,
}