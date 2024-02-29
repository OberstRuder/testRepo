import React from 'react';
import Carousel from "react-material-ui-carousel";
import { backendUrl } from "../../gql/backendUrl";

export const ImagesSlider = ({ images, className }) => {

    return (
        <div style={{ width: '100%' }}>
            <Carousel
                navButtonsAlwaysVisible={true}
                swipe={false}
                autoPlay={false}
                navButtonsProps={{
                    style: {
                        backgroundColor: '#ffffff80',
                        color: 'grey'
                    }
                }}
                className='carousel'>
                {images.map((item) => {
                    return (
                        <div className='carousel-box'
                            key={Math.random() * 1000}>
                            <img className={className}
                                src={backendUrl + item.url}
                                alt={'carousel-item'} />
                        </div>
                    )
                }
                )}
            </Carousel>
        </div>
    );
}