import React, { useEffect, useState } from 'react'
import {
    CCarousel,
    CCarouselItem,
    CModal,
    CModalBody,
    CImage,
} from '@coreui/react'
import Header from 'components/Header'
import CustomLoader from 'components/CustomLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSearchParams } from 'react-router-dom'
import { useEdit } from './EditProvider'

const useInitialPhoto = (setImages) => {
    const [searchParams] = useSearchParams()
    useEffect(() => {
        const images = [...new Array(12).fill(1)].map((_, index) => ({
            src: `https://flowbite.s3.amazonaws.com/docs/gallery/square/image${
                index ? '-' + index : ''
            }.jpg`,
            filename: `Image-${index}`,
            tags: [],
        }))
        setImages(images)
        return () => {
            setImages([])
        }
    }, [setImages, searchParams])
}
const Library = () => {
    const { onEdit } = useEdit()
    const [images, setImages] = useState([])
    useInitialPhoto(setImages)
    const [activeIndex, setActiveIndex] = React.useState(null)
    const onCarousel = (index) => {
        setActiveIndex(index)
    }

    const fetchData = () => {
        const moreImages = [...new Array(12).fill(1)].map((_, index) => ({
            src: `https://flowbite.s3.amazonaws.com/docs/gallery/square/image${
                index ? '-' + index : ''
            }.jpg`,
            filename: `Image-${index}`,
            tags: [],
        }))
        setImages((previousImages) => [...previousImages, ...moreImages])
    }

    const handleOnMouseDown = (evt, photo) => {
        if (evt.nativeEvent.button === 1) {
            evt.preventDefault()
            onEdit(photo)
        }
    }

    return (
        <>
            <Header />
            <InfiniteScroll
                dataLength={images.length}
                next={fetchData}
                hasMore={images.length < 24} // Replace with a condition based on your data source
                // loader={<CustomLoader />}
                endMessage={<p>Δεν ύπαρχουν άλλες φωτογραφίες.</p>}
            >
                <div class="library">
                    {images.map((photo, index) => (
                        <CImage
                            onClick={() => onCarousel(index)}
                            key={photo.src}
                            className="library-img"
                            src={photo.src}
                            alt={photo.filename}
                            tags={photo.tags}
                            onMouseDown={(evt) => handleOnMouseDown(evt, photo)}
                        />
                    ))}
                </div>
            </InfiniteScroll>
            <CModal
                alignment="center"
                onClose={() => setActiveIndex(null)}
                visible={!(activeIndex == null)}
                fullscreen="xl"
                size="lg"
            >
                <CModalBody alignment="center">
                    <CCarousel
                        interval={false}
                        activeIndex={activeIndex}
                        controls
                        dark
                    >
                        {images.map((imgSrc, index) => (
                            <CCarouselItem key={`carousel-${index}`}>
                                <CImage
                                    className="carousel-library-img"
                                    src={imgSrc}
                                    alt={imgSrc}
                                />
                            </CCarouselItem>
                        ))}
                    </CCarousel>
                </CModalBody>
            </CModal>
        </>
    )
}

export default Library
