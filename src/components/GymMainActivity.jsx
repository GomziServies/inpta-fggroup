import React, { useState, useEffect } from "react";
import { businessListingAxiosInstance } from "../js/api";
import Dummy_img from "../assets/dummy-image-square.jpg";
import User_img from "../assets/user-profile.png";
import "../index.css";
import { Link } from "react-router-dom";

const GymMainActivity = ({ searchData }) => {
    const [businessData, setBusinessData] = useState([]);
    const [loadingOne, setLoadingOne] = useState(false);

    const fetchBusinessData = async () => {
        setLoadingOne(true);
        try {
            const requestData = {
                filter: {
                    business_type: ["personal", "business"],
                },
                sort: {
                    business_name: "desc",
                    rating: "desc",
                },
                page: 1,
                limit: 6,
            };

            const response = await businessListingAxiosInstance.post(
                "/get-businesses",
                requestData
            );
            let fetchedBusinessData = response.data.data;

            console.log("searchData :- ", searchData);

            if (searchData) {
                fetchedBusinessData = fetchedBusinessData.filter(
                    (addressData) => addressData.locations[0].city === searchData
                );
            }

            setBusinessData(fetchedBusinessData);
        } catch (error) {
            console.error("Error in Getting Business Data:", error);
        }
        setLoadingOne(false);
    };

    useEffect(() => {
        fetchBusinessData();
    }, [searchData]);

    const handleCall = (number) => {
        window.location.href = `tel:${number}`;
    };

    const handleChat = (number) => {
        const whatsappNumber = number;
        if (whatsappNumber) {
            const message = encodeURIComponent("I want to know about your services.");
            window.location.href = `https://wa.me/${whatsappNumber}?text=${message}`;
        }
    };

    const handleBusinessClick = (id) => {
        window.location.href = `/list/company-view?business_id=${id}`;
    };

    return (
        <>
            <section className="space">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="sec_title position-relative mb-5">
                                <h6 className="text-muted mb-0">Recent Listings</h6>
                                <h2 className="ft-bold">
                                    Browse Recent <span className="theme-cl">Listings</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center text-start">
                        {businessData.map((business) => {
                            const description = business?.description;
                            const truncatedDescription =
                                description?.length > 150
                                    ? description?.substring(0, 150) + "..."
                                    : description;

                            const facilityLimit = 5;
                            const validFacilities = business.services
                                .map((service) => {
                                    switch (service) {
                                        case "WiFi":
                                            return (
                                                <li key={service}>
                                                    <img
                                                        src="/images/service/wi-fi.png"
                                                        alt="WiFi"
                                                        className="service-img"
                                                    />
                                                </li>
                                            );
                                        case "Steam Bath":
                                            return (
                                                <li key={service}>
                                                    <img
                                                        src="/images/service/steam-bath.png"
                                                        alt="Steam Bath"
                                                        className="service-img"
                                                    />
                                                </li>
                                            );
                                        case "Air Conditioner":
                                            return (
                                                <li key={service}>
                                                    <img
                                                        src="/images/service/air-conditioner.png"
                                                        alt="Air Conditioner"
                                                        className="service-img"
                                                    />
                                                </li>
                                            );
                                        case "Parking":
                                            return (
                                                <li key={service}>
                                                    <img
                                                        src="/images/service/parking.png"
                                                        alt="Parking"
                                                        className="service-img"
                                                    />
                                                </li>
                                            );
                                        case "Locker":
                                            return (
                                                <li key={service}>
                                                    <img
                                                        src="/images/service/locker.png"
                                                        alt="Locker"
                                                        className="service-img"
                                                    />
                                                </li>
                                            );
                                        case "Changing room":
                                            return (
                                                <li key={service}>
                                                    <img
                                                        src="/images/service/changing-room.png"
                                                        alt="Changing Room"
                                                        className="service-img"
                                                    />
                                                </li>
                                            );
                                        case "Lounge area":
                                            return (
                                                <li key={service}>
                                                    <img
                                                        src="/images/service/waiting-room.png"
                                                        alt="Lounge Area"
                                                        className="service-img"
                                                    />
                                                </li>
                                            );
                                        case "Personal trainers":
                                            return (
                                                <li key={service}>
                                                    <img
                                                        src="/images/service/personal-trainer.png"
                                                        alt="Personal Trainers"
                                                        className="service-img"
                                                    />
                                                </li>
                                            );
                                        case "Massage":
                                            return (
                                                <li key={service}>
                                                    <img
                                                        src="/images/service/massage.png"
                                                        alt="Massage"
                                                        className="service-img"
                                                    />
                                                </li>
                                            );
                                        default:
                                            return null;
                                    }
                                })
                                .filter((item) => item !== null);

                            const displayedFacilities = validFacilities.slice(
                                0,
                                facilityLimit
                            );
                            const remainingCount = validFacilities.length - facilityLimit;

                            return (
                                <>
                                    <div className="grouping-listings-single">
                                        <div className="vrt-list-wrap">
                                            <div className="vrt-list-wrap-head">
                                                <div className="vrt-list-thumb col-md-4">
                                                    <div className="vrt-list-thumb-figure">
                                                        <Link
                                                            to={`/gym-listing-view?business_id=${business._id}`}
                                                            className="d-block text-center m-auto"
                                                        >
                                                            <img
                                                                src={`https://files.fggroup.in/${business.business_images[0]}`}
                                                                className="img-fluid"
                                                                onError={(e) => {
                                                                    e.target.src = Dummy_img;
                                                                }}
                                                                alt={business.business_name}
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="vrt-list-content col-md-8">
                                                    <h4 className="mb-0 ft-bold">
                                                        <Link
                                                            to={`/gym-listing-view?business_id=${business._id}`}
                                                            className="text-dark fs-md"
                                                        >
                                                            {business.business_name &&
                                                                business.business_name.length > 30
                                                                ? business.business_name.substring(0, 30) +
                                                                "..."
                                                                : business.business_name}

                                                            <span className="verified-badge">
                                                                <i className="fas fa-check-circle" />
                                                            </span>
                                                        </Link>
                                                    </h4>
                                                    <div className="Goodup-ft-first mt-2">
                                                        <div className="Goodup-rating">
                                                            <div
                                                                className="Goodup-rates"
                                                                style={{ fontSize: "15px" }}
                                                            >
                                                                {[...Array(5)].map((_, index) => (
                                                                    <i
                                                                        className="fas fa-star"
                                                                        key={index}
                                                                        style={{
                                                                            color:
                                                                                index <
                                                                                    business.review_stats.average_rating
                                                                                    ? "#F09000"
                                                                                    : "#ccc",
                                                                        }}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="Goodup-price-range">
                                                            <span className="small ft-bold">
                                                                {business.review_stats.total_ratings} Rating
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="vrt-list-features mt-2 mb-2">
                                                        <ul>
                                                            <li>
                                                                <a href="javascript:void(0);">Gym</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="vrt-list-desc mt-3 mb-3">
                                                        <p className="vrt-qgunke">{truncatedDescription}</p>
                                                    </div>

                                                    <div className="vrt-list-amenties">
                                                        <div className="Goodup-facilities-wrap mb-0">
                                                            <div
                                                                className="Goodup-facility-title mr-3"
                                                                style={{ fontSize: "17px" }}
                                                            >
                                                                Facilities :
                                                            </div>
                                                            <div className="Goodup-facility-list">
                                                                <ul className="no-list-style">
                                                                    {business.services.length === 0 ? (
                                                                        <li className="remaining-service">
                                                                            <span>No Facilities Found</span>
                                                                        </li>
                                                                    ) : (
                                                                        <>
                                                                            {displayedFacilities}

                                                                            {remainingCount > 0 && (
                                                                                <li className="remaining-service">
                                                                                    <span>+{remainingCount}</span>
                                                                                </li>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Goodup-location">
                                                        <i className="fas fa-map-marker-alt me-2 theme-cl" />
                                                        {business.locations[0].city +
                                                            ", " +
                                                            business.locations[0].state}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                        {businessData.length === 0 && !loadingOne && (
                            <div className="w-100 d-flex justify-content-center">
                                <h4>No Data Found</h4>
                            </div>
                        )}
                        {loadingOne && (
                            <div className="w-100 d-flex justify-content-center">
                                <div class="spinner-box">
                                    <div class="three-quarter-spinner"></div>
                                </div>
                            </div>
                        )}
                        <div className="col-12 d-flex justify-content-center mt-3">
                            <Link to="/all-gym-listing" class="view-list-btn me-2">
                                <i class="fas fa-eye me-2"></i>View More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default GymMainActivity;
