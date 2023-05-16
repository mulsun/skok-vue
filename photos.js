// based on https://stackoverflow.com/a/31831122/3479395
import fs from 'fs';
import path from 'path';

const directoryTreeToObj = function (dir, done) {
  let results = [];

  fs.readdir(dir, function (err, list) {
    if (err)
      return done(err);

    let pending = list.length;

    if (!pending)
      return done(null, { name: path.basename(dir), children: results });

    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          directoryTreeToObj(file, function (err, res) {
            results.push({
              name: path.basename(file),
              children: res
            });
            if (!--pending)
              done(null, results);
          });
        }
        else {
          results.push(path.basename(file));
          if (!--pending)
            done(null, results);
        }
      });
    });
  });
};


directoryTreeToObj('./photos/', function (err, res) {
  if (err)
    console.error(err);
  else
    fs.writeFileSync('./src/photos.json', JSON.stringify(res));
})