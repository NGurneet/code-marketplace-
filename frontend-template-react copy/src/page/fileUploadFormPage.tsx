import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Paper, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useUploadProjectForSaleMutation } from '../services/apiSlice';  // Adjust import path as needed

interface UploadFileFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  technologies: string;
  file: FileList;
}

const UploadFileForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UploadFileFormData>();
  const [uploadFileForSale, { isLoading, isSuccess, isError, error }] = useUploadProjectForSaleMutation();

  const onSubmit = async (data: UploadFileFormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('category', data.category);
    formData.append('technologies', data.technologies);
    formData.append('file', data.file[0]);

    try {
      await uploadFileForSale(formData).unwrap();
      // Reset the form on successful upload
      console.log('File uploaded successfully');
    } catch (error) {
      // Handle error during upload
      console.error('File upload failed', error);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Upload File for Sale
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          {...register('title', { required: 'Title is required' })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          label="Description"
          fullWidth
          margin="normal"
          {...register('description', { required: 'Description is required' })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          {...register('price', { required: 'Price is required', min: { value: 1, message: 'Price must be at least 1' } })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />

        {/* Category Select Field */}
        <FormControl fullWidth margin="normal" error={!!errors.category}>
          <InputLabel>Category</InputLabel>
          <Select
            {...register('category', { required: 'Category is required' })}
            defaultValue=""
          >
            <MenuItem value="web">Web Development</MenuItem>
            <MenuItem value="mobile">Mobile Development</MenuItem>
            <MenuItem value="desktop">Desktop Application</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {errors.category && <Typography color="error">{errors.category.message}</Typography>}
        </FormControl>

        {/* Technologies Text Field */}
        <TextField
          label="Technologies (comma separated)"
          fullWidth
          margin="normal"
          {...register('technologies', { required: 'Technologies are required' })}
          error={!!errors.technologies}
          helperText={errors.technologies?.message}
        />

        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Choose File
          <input
            type="file"
            hidden
            {...register('file', { required: 'File is required' })}
          />
        </Button>
        {errors.file && <Typography color="error">{errors.file.message}</Typography>}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 3 }}
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </Button>

        {isSuccess && <Typography color="success.main">File uploaded successfully!</Typography>}
        {isError && <Typography color="error.main">Error uploading file. Please try again.</Typography>}

        {isError && error && (
          <Typography color="error.main">
            {error?.data?.message || 'An unexpected error occurred.'}
          </Typography>
        )}
      </form>
    </Paper>
  );
};

export default UploadFileForm;
