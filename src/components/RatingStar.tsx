import React, {useEffect, useState} from 'react';
import {FaRegStar, FaStar } from 'react-icons/fa';

interface RatingStarsProps {
    rating: number;
    onChange: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, onChange }) => {
    const [tempRating, setTempRating] = useState(rating);
    const handleMouseEnter = (index: number) => {
        setTempRating(index + 1);
    };

    const handleMouseLeave = () => {
        setTempRating(rating);
    };

    const handleClick = (index: number) => {
        onChange(index + 1);
        setTempRating(index+1)
    };

    const stars = [];
    for (let i = 0; i < 5; i++) {
        let className = 'star';
        if (tempRating >= i + 1) {
            className += ' filled';
        }
        stars.push(
            <span
                key={i}
                className={className}
                onClick={() => handleClick(i)}
            >
        {'star filled' == className ?<FaStar/>: <FaRegStar/>}
      </span>
        );
    }
    return <div style={{display:'contents'}}>{stars}</div>;
};

export default RatingStars;