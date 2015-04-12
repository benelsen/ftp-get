# ftpget
Will promise to get you some text file from a ftp.

```js
import ftpget from 'ftpget';

ftpget('ftp.example.com', '/pub/file.txt')
  .then(function(content) {
    console.log(content);
  });
