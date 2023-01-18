const { promises: fs } = require('fs');

const getNumFiles = async (dir) => {
    const files = await fs.readdir(dir);
    return files.length;
};

exports.getById = async (req, res, next) => {
    let fileName = req.params._id;
    let numberOfFiles = await getNumFiles(`${__dirname}/../data/`);

    if (Number(fileName) > Number(numberOfFiles)) fileName = 1;

    if (Number(fileName) <= 0 ) fileName = numberOfFiles;

    const file = await fs.readFile(
        `${__dirname}/../data/${fileName}.json`,
        'utf8',
        function (err) {
            if (err) {
                console.log('Error reading JSON: ', err);
                res.status(200).json({
                    status: 'error',
                });
                return;
            }
        }
    );
    

    res.status(200).json({
        status: 'ok',
        file,
    });
};

exports.create = async (req, res, next) => {
    const numberOfFiles = await getNumFiles(`${__dirname}/../data/`);
    const fileName = Number(1 + numberOfFiles);
    const jsonContent = JSON.stringify({ fileName, body: req.body });

    fs.writeFile(
        `${__dirname}/../data/${fileName}.json`,
        jsonContent,
        'utf8',
        function (err) {
            if (err) {
                console.log('Error writing JSON: ', err);
                res.status(200).json({
                    status: 'error',
                });
                return;
            }
        }
    );

    res.status(201).json({
        status: 'ok',
    });
};
