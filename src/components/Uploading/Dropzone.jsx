import React from 'react';

const Dropzone = ({ drag = false, setDrag, actionOnUpload, multiply }) => {

    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true)
    }
    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false)
    }
    function onDropHandler(e, file) {
        e.preventDefault()
        actionOnUpload(e, file)
    }
    return (
        <div style={{ width: '60%', margin: '20px auto',height: '300px', border: '1px dotted black', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
            {drag
                ? <div
                    onDragStart={(e) => dragStartHandler(e)}
                    onDragOver={(e) => dragStartHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDrop={(e) => onDropHandler(e)}
                    className='drop-area'>drag {multiply ? 'files' : 'file'} here</div>
                : <div
                    onDragStart={(e) => dragStartHandler(e)}
                    onDragOver={(e) => dragStartHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    className='drop-area'>drag {multiply ? 'files' : 'file'} here</div>
            }
        </div>
    );
}

export default Dropzone;