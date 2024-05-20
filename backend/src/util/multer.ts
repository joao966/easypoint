import { diskStorage } from 'multer';

export const diskConfig = diskStorage({
  destination: 'upload',
  filename: (_req, file, cb) => {
    let extArray = file.mimetype.split('/');
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  },
});
