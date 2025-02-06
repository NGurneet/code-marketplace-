// // validationSchema.ts

// import * as Yup from 'yup';

// export const fileUploadValidationSchema = Yup.object({
//   title: Yup.string().required('Title is required'),
//   description: Yup.string().required('Description is required'),
//   file: Yup.mixed().required('File is required').test('fileFormat', 'Only .zip files are allowed', (value) => {
//     return value.type === 'application/zip';
//   }),
// });
