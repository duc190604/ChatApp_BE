import { Router } from 'express';
import multer from 'multer';
import { uploadController } from '~/controllers/uploadController';
const router = Router();
const upload = multer({ storage: multer.diskStorage({}) });
router.post('/file', upload.single('file'), uploadController.uploadFile);
router.post('/files', upload.array('files'), uploadController.uploadMultipleFiles);

export default router;
