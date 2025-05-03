// hooks/useMedia.js
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { apiClient, fileClientUpload } from '@/config/request';
import { useNotification } from '@/components/CustomNotification/NotificationProvider';
import { useProjectSettings } from '../settings/useProjectSettings';

// Helper function to calculate file hash
const calculateFileHash = async (file) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};

export const useMedia = (endpoint, notify = true) => {
    const { settings: {
        project,
    } } = useProjectSettings();


    const prefix = `/en/${project}`;



    const queryClient = useQueryClient();
    const { sendNotification } = useNotification();


    const [uploadProgress, setUploadProgress] = useState(0);

    // Search for existing image by hash
    const searchByHash = useCallback(async (hash) => {
        try {
            const response = await apiClient.get(`${prefix}${endpoint}/?hash=${hash}`);
            return response.data.results.length > 0 ? {
                id: response.data.results[0].id,
                path: response.data.results[0].path

            } : null;
        } catch (error) {
            console.error('Error searching by hash:', error);
            return null;
        }
    }, [prefix, endpoint]);

    // Upload mutation
    const uploadMutation = useMutation(
        async ({ file, hash }) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('hash', hash);

            const response = await fileClientUpload.post(`${prefix}${endpoint}/`, formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                },
            });

            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['media']);
                if (notify) sendNotification('File uploaded successfully', 'success');
                setUploadProgress(0);
            },
            onError: (error) => {
                if (notify) {
                    sendNotification(`Upload failed: ${error.message}`, 'error');
                }
                setUploadProgress(0);
            },
        }
    );

    // Main upload handler
    const uploadMedia = useCallback(async (file) => {
        try {
            // Step 1: Calculate hash
            const hash = await calculateFileHash(file);

            // Step 2: Search for existing image
            const result = await searchByHash(hash);

            // Handle case where result.id is null or falsy
            if (!result?.id) {

                // Step 3: Upload if not found
                const uploadResult = await uploadMutation.mutateAsync({
                    file,
                    hash,
                });

                return {
                    id: uploadResult.id,
                    path: uploadResult.path,
                    isExisting: false,
                };
            }

            // If result.id exists, return the existing image details
            if (notify) {
                sendNotification('Image already exists', 'info');
            }
            return { id: result.id, path: result.path, isExisting: true };

        } catch (error) {
            if (notify) {
                sendNotification(`Upload process failed: ${error.message}`, 'error');
            }
            throw error;
        }
    }, [searchByHash, uploadMutation, notify]);

    return {
        uploadMedia,
        uploadProgress,
        isUploading: uploadMutation.isLoading,
        error: uploadMutation.error,
    };
};

export default useMedia;