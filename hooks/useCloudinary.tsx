// import crypto from 'crypto';
// import axios from 'axios';
// import { useLoading } from '@/contexts';

// const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
// const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
// const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// const useCloudinary = () => {
//   const { setIsUploading, setIsGenerating, setIsDeleting } = useLoading();
//   console.log(process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, "PP")
//   const uploadToCloudinary = async (file: File): Promise<{ id: string; secure_url: string }> => {
//     const timestamp = Math.round(new Date().getTime() / 1000);
//     const signature = crypto
//       .createHash('sha1')
//       .update(`timestamp=${timestamp}${apiSecret}`)
//       .digest('hex');

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('timestamp', timestamp.toString());
//     formData.append('api_key', apiKey || "");
//     formData.append('signature', signature);
//     // const formData = new FormData();
//     // formData.append('file', file);
//     // formData.append('upload_preset', 'zurucrm');

//     setIsUploading(true);
//     try {
//       const { data } = await axios.post(
//         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?api_key=${apiKey}`,
//         formData
//       );

//       return { id: data?.public_id, secure_url: data?.secure_url };
//     } catch (error) {
//       throw new Error('Failed to upload file to Cloudinary');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const generateSignature = (publicId: string) => {
//     const timestamp = Math.floor(Date.now() / 1000);
//     const signaturePayload = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
//     const signature = crypto
//       .createHash('sha1')
//       .update(signaturePayload)
//       .digest('hex');

//     return {
//       signature,
//       timestamp,
//     };
//   };

//   const deleteFromCloudinary = async (publicId: string): Promise<void> => {
//     const { signature, timestamp } = generateSignature(publicId);

//     setIsDeleting(true);
//     try {
//       const response = await axios.post(
//         `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
//         {
//           public_id: publicId,
//           api_key: apiKey,
//           timestamp,
//           signature,
//         }
//       );

//       return response.data;
//     } catch (error) {
//       throw new Error('Failed to delete file from Cloudinary');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return {
//     uploadToCloudinary,
//     deleteFromCloudinary,
//   };
// };


// export default useCloudinary;
import crypto from 'crypto';
import axios from 'axios';
import { useLoading } from '@/contexts';

const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

type FileUploadResult = {
  id: string;
  secure_url: string;
  resource_type: 'image' | 'raw';
};

const useCloudinary = () => {
  const { setIsUploading, setIsGenerating, setIsDeleting } = useLoading();

  const getResourceType = (file: File): 'image' | 'raw' => {
    if (file.type.startsWith('image/')) {
      return 'image';
    }
    return 'raw';
  };

  const uploadToCloudinary = async (file: File): Promise<FileUploadResult> => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = crypto
      .createHash('sha1')
      .update(`timestamp=${timestamp}${apiSecret}`)
      .digest('hex');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('timestamp', timestamp.toString());
    formData.append('api_key', apiKey || "");
    formData.append('signature', signature);

    const resourceType = getResourceType(file);
    setIsUploading(true);
    
    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload?api_key=${apiKey}`,
        formData
      );
      return { 
        id: data?.public_id, 
        secure_url: data?.secure_url,
        resource_type: resourceType
      };
    } catch (error) {
      throw new Error(`Failed to upload ${resourceType} file to Cloudinary`);
    } finally {
      setIsUploading(false);
    }
  };

  const generateSignature = (publicId: string) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const signaturePayload = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto
      .createHash('sha1')
      .update(signaturePayload)
      .digest('hex');
    return {
      signature,
      timestamp,
    };
  };

  const deleteFromCloudinary = async (publicId: string, resourceType: 'image' | 'raw'): Promise<void> => {
    const { signature, timestamp } = generateSignature(publicId);
    setIsDeleting(true);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`,
        {
          public_id: publicId,
          api_key: apiKey,
          timestamp,
          signature,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete ${resourceType} file from Cloudinary`);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    uploadToCloudinary,
    deleteFromCloudinary,
  };
};

export default useCloudinary;