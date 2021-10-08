const { readFileSync, writeFile } = require("fs");

const tours = JSON.parse(
  readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  let id = req.params.id * 1;
  let tour = tours.find((el) => el.id === id);
  console.log(id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  //console.log(req.body)
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign(
    {
      id: newID,
    },
    req.body
  );

  tours.push(newTour);

  writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  if (Number(req.params.id) < tours.length) {
    res.status(200).json({
      status: "success",
      data: {
        tour: "<h1>Updated tour here<h1>",
      },
    });
  }
};

exports.deleteTour = (req, res) => {};
