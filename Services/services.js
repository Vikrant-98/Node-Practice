const requestAccepter1 = (request, response, next) => {
  const { method, url } = request;
  console.log(method, url);
//   response.setHeader('Content-Type', 'text/plain');
  response.write('Hello, World this is requestAccepter1!\n');
  response.send('<h1>Hello, World this is requestAccepter3!</h1>');
//   next();
};

const requestAccepter2 = (request, response, next) => {
  const { method, url } = request;
  console.log(method, url);
//   response.setHeader('Content-Type', 'text/plain');
  response.write('Hello, World this is requestAccepter2!\n');
  next();
};

const requestAccepter3 = (request, response, next) => {
  const { method, url } = request;
  console.log(method, url);
//   response.setHeader('Content-Type', 'text/plain');
  response.write('Hello, World this is requestAccepter3!\n');
  response.send('<h1>Hello, World this is requestAccepter3!</h1>');
};

exports.requestAccepter1 = requestAccepter1;
exports.requestAccepter2 = requestAccepter2;
exports.requestAccepter3 = requestAccepter3;