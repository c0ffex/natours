const fs = require('fs');
const express = require('express');
const http = require('http');
const ejs = require('ejs');

const app = express();
const PORT = 8080;
const HOST = 'localhost';

app.use(express.json());
app.set('view engine', 'ejs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// HTTP Methods

const getAllTours = (req, res, err) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res, err) => {
  const id = parseInt(req.params.id);
  console.log(test);
  const tour = tours.find((el) => el.id === id);
  if (id > tours.length) {
    res.status(404).json({
      status: 'sorry ma`am i`m casado✋😔',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }
};

const createTour = (req, res) => {
  //console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'error',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const patchTour = (req, res) => {
  const id = parseInt(req.params.id);
  if (id > tours.length) {
    res.status(404).json({
      status: 'sorry ma`am i`m casado✋😔',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here:>',
    },
  });
};

const deleteTour = (req, res) => {
  const id = parseInt(req.params.id);
  if (id > tours.length) {
    res.status(404).json({
      status: 'sorry ma`am i`m casado✋😔',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Deleted Tour:',
    },
  });
};
/////////////////////////////////////

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).delete(deleteTour).patch(patchTour);
//listen
app.listen(PORT, HOST, () => {
  console.log(`Listening on port test ${PORT}`);
});

module.exports = app;
