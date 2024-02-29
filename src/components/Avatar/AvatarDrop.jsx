import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { connect } from 'react-redux';
import { actionSetAvatar } from "../../redux/actions/actionsMe";
import { CFileUploader } from "../Uploading/FileUploader";

function DropzoneAvatar({ onLoadAvatar }) {

    const onDrop = useCallback((acceptedFiles) => {
        setSelectedFile(acceptedFiles[0])
    }, []);

    const { getRootProps, getInputProps, avatar } = useDropzone({ onDrop });

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)

        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
    }

    return (
        <>
            <div className='dropzone' {...getRootProps()}>
                {selectedFile &&
                    <img src={preview}
                        alt={'preview'}
                        className='preview-img' />}
                <input {...getInputProps()} />
                {selectedFile === undefined ?
                    <CFileUploader multiply={false} /> : null
                }
            </div>
            <button onClick={() => onLoadAvatar(selectedFile)}
                disabled={!selectedFile}
                className='primeBtn'>
                Submit
            </button>
        </>

    );
}

export const CDropzoneAvatar = connect(
    (state) => ({
        avatar: state?.promise?.me?.payload?.avatar?.url
    }),
    {
        onLoadAvatar: actionSetAvatar,
    }
)(DropzoneAvatar);