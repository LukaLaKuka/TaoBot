const Rhytmes = require("../config/rhytms.json");

async function rhytmsFunction(message) {
    if (message.author.bot) {
        return;
    }

    Rhytmes.rhythms.forEach(rhytme => {
        let regexp = new RegExp(rhytme.pattern)

        if (regexp.test(message.content.toLowerCase())) {
            let nRandom = Math.floor(Math.random() * rhytme.responses.length);

            message.reply(rhytme.responses[nRandom]);
        }
    })
}

module.exports = rhytmsFunction