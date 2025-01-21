import React from "react";
import "../index.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SuccessStoryImages = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    };
    return (
        <>
            <section className="text-start my-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="sec_title position-relative text-center mb-3">
                                <h2 className="ft-bold">Gomzi ki Success Stories!</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 text-left">
                            <Slider {...settings}>
                                <div className="px-2">
                                    <div className="gup_blg_grid_box">
                                        <div className="gup_blg_grid_thumb">
                                            <img
                                                src="images/success-story-images-1.webp"
                                                className="img-fluid"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <div className="gup_blg_grid_box">
                                        <div className="gup_blg_grid_thumb">
                                            <img
                                                src="images/success-story-images-2.webp"
                                                className="img-fluid"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <div className="gup_blg_grid_box">
                                        <div className="gup_blg_grid_thumb">
                                            <img
                                                src="images/success-story-images-3.webp"
                                                className="img-fluid"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <div className="gup_blg_grid_box">
                                        <div className="gup_blg_grid_thumb">
                                            <img
                                                src="images/success-story-images-4.webp"
                                                className="img-fluid"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <div className="gup_blg_grid_box">
                                        <div className="gup_blg_grid_thumb">
                                            <img
                                                src="images/success-story-images-5.webp"
                                                className="img-fluid"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <div className="gup_blg_grid_box">
                                        <div className="gup_blg_grid_thumb">
                                            <img
                                                src="images/success-story-images-6.webp"
                                                className="img-fluid"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <div className="gup_blg_grid_box">
                                        <div className="gup_blg_grid_thumb">
                                            <img
                                                src="images/success-story-images-7.webp"
                                                className="img-fluid"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SuccessStoryImages;
