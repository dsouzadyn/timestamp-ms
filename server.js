const Hapi = require('hapi');
const Joi = require('joi');

const server = Hapi.Server({
  host: 'localhost',
  port: Number(process.argv[2] || 8080),
});


server.route({
  path: '/api/timestamp/{date_string?}',
  method: 'GET',
  handler(req) {
    let date;
    if (req.params.date_string === '' || req.params.date_string === undefined) {
      date = new Date();
    } else {
      date = new Date(req.params.date_string);
    }
    if (date.toDateString() !== 'Invalid Date') {
      return {
        unix: date.valueOf(),
        utc: date.toUTCString(),
      };
    }
    return {
      error: 'Invalid Date',
    };
  },
  options: {
    validate: {
      params: {
        date_string: Joi.alternatives().try(
          Joi.date().iso(),
          Joi.date().timestamp(), Joi.any().optional(),
        ),
      },
    },
  },
});

const init = async () => {
  await server.start();
  console.log(`Server started at ${server.info.uri}`);
};

init();

module.exports = server;
